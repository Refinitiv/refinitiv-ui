#!/usr/bin/env node
import { env } from 'node:process';
import path from 'node:path';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { playwrightLauncher } from '@web/test-runner-playwright';
import { browserstackLauncher } from '@web/test-runner-browserstack';
import { startTestRunner, summaryReporter } from "@web/test-runner";
import { PACKAGES_ROOT, info, log } from '../helpers/esm.mjs';
import { BrowserStack } from '../../browsers.config.mjs';
import wtrConfig from '../../web-test-runner.config.mjs';
import { ELEMENTS_ROOT, getElements } from '../../packages/elements/scripts/helpers/index.mjs';
import { useTestOptions } from './cli-options.mjs';

// Create CLI
const cli = yargs(hideBin(process.argv))
  .option('package', {
    type: 'string',
    alias: 'p',
    description: 'Package name'
  });

// Use shared test options for the CLI
useTestOptions(cli);

const argv = cli.argv;
const packageName = argv.package || path.basename(process.cwd()); // if no package provided, try to guess
const testAll = packageName === 'all' || packageName === undefined;
const basePath = path.join(PACKAGES_ROOT, testAll ? '*' : packageName);
const watch = argv.watch;
const snapshots = argv.updateSnapshots;
const optionBrowser = argv.browsers;
let browserstack = argv.browserstack;
const useBrowserStack = argv.browserstack && !watch;
const testCoverage = argv.includeCoverage;
let testTarget = packageName;

/**
 * Environment variables to use for overriding test configuration in each package or sub directory.
 */
env.testCoverage = testCoverage; // use in packages elements/web-test-runner.mjs

// Target package or element
const target = argv._[0];

// Handle if target is test for element or all elements
if (getElements().includes(target)) {
  testTarget = target;
  env.testElement = target;
} else if (packageName === 'elements') {
  env.testElement = 'all';
}

const config = {
  ...wtrConfig,
  files: [path.join(basePath , '/__test__/**/*.test.js')],
  watch,
  coverage:  testCoverage,
  coverageConfig: {
    include: [`**/${ packageName }/lib/**/*.js`],
  }
};

if (argv.output === 'full') {
  config.reporters.push(summaryReporter());
} else {
  config.browserLogs = false;
}

// Test on BrowserStack`
if (useBrowserStack) {

  // Set default browsers if not specify any browsers
  browserstack = browserstack.length ? browserstack : BrowserStack.defaultBrowsers;

  const sharedCapabilities = {
    'browserstack.user': env.BROWSERSTACK_USERNAME,
    'browserstack.key': env.BROWSERSTACK_ACCESS_KEY,
    'browserstack.idleTimeout': 1800,
    project: env.BROWSERSTACK_PROJECT_NAME || 'Refinitiv UI',
    name: testTarget,
    build: `build ${env.BROWSERSTACK_BUILD || 'unknown'}`
  };

  // Add BrowserStack launchers to config
  const launchers = [];
  browserstack.forEach((option) => {
    switch (option) {
      case 'default':
        BrowserStack.defaultBrowsers.forEach(browser => launchers.push(BrowserStack.config[browser]));
        break;
      case 'supported':
        BrowserStack.supportedBrowsers.forEach(browser => launchers.push(BrowserStack.config[browser]));
        break;
      default:
        launchers.push(BrowserStack.config[option]);
        break;
    }
  });

  // Create BrowserStack launchers
  const browsers = [];
  launchers.forEach(launcher => {
    // Create browserName to show as a label in the progress bar reporter
    let browserName = `${ launcher.browser ?? launcher.browserName ?? launcher.device ?? 'unknown' }${
      launcher.browser_version ? ` ${launcher.browser_version}` : '' }` + ` (${launcher.os} ${launcher.os_version})`;
      browserName = browserName.charAt(0).toUpperCase() + browserName.slice(1);

    // Safari has the connection issue and test cases failed with BrowserStack, need to test Safari on PlayWright for now.
    if (launcher.browser.startsWith('safari')) {
      browsers.push(playwrightLauncher({ product: 'webkit' }, { headless: true }));
    } else {
      browsers.push(browserstackLauncher({ capabilities: { ...sharedCapabilities, ...launcher, browserName }}));
    }
  });

  config.browsers = browsers; // Set all browsers to use BrowserStack
}

// Specify browser to run the unit test & convert browser naming to playwright's one
if (optionBrowser && optionBrowser.length) {
  config.browsers = config.browsers.filter((configBrowser) => {
    let browser;
    switch (configBrowser.product) {
      case 'chromium':
        browser = 'chrome';
        break;
      case 'webkit':
        browser = 'safari';
        break;
      default:
        browser = configBrowser.product;
        break;
    }
    return optionBrowser.includes(browser);
  });
}

// Strip argv (options) out to prevent web-test-runner picking them up
process.argv = process.argv.slice(0, 2);

info(watch ? `Start Dev Server: ${ testTarget }` : `Test: ${ testTarget }`);

if (snapshots) {
  info(`Update and prune snapshots: ${ testTarget }`);
  // Web Test Runner does not provide a config to update snapshots, so the CLI option is the only way.
  process.argv.push('--update-snapshots');
}

// Handle runner stopping with correct exit code
let runner = undefined;
const stopRunner = () => {
  if (runner) {
    if (runner.running) runner.stop();
    runner.passed ? process.exit(0) : process.exit(1);
  }
};
process.on('SIGINT', stopRunner);
process.on('exit', stopRunner);


const startTest = async config => await startTestRunner({ config, autoExitProcess: false });

// Run testing
(async () => {
  // Test each element on individule test runner.
  if (testTarget === 'elements') {

    const startTestQueue = async function (element, config, testFiles) {
      log(`Element: ${element}`, 'magenta');

      // Setup BrowserStack session name
      config.browsers.forEach(launcher => {
        if (launcher.capabilities) {
          launcher.capabilities.name = `elements: ${element}`;
        }
      });

      config.element = element;
      config.files = testFiles; // Apply test file for the element

      // Start test runner
      runner = await startTest(config);
      runner.on('stopped', handleNextTest);

      return runner;
    }

    const handleNextTest = async () => {
      // Remove finished test runner from queue
      if (testQueue.has(runner.config.element)) {
        testQueue.delete(runner.config.element);
      }

      // Start next runner if still have runner in queue
      if (testQueue.size >= 1) {
        const [firstElement] = testQueue.keys();
        const nextTestFiles = testQueue.get(firstElement);
        runner = await startTestQueue(firstElement, config, nextTestFiles);
      }
    }

    const testQueue = new Map();
    const elements = getElements();
    for (const element of elements) {
      const elementTestFiles = [
        path.join(ELEMENTS_ROOT, 'src', `${ element }/__test__/**/*.test.js`),
        '!**/node_modules/**/*', // exclude any node modules
      ];

      // Start first runner or add it to queue
      if (!runner) {
        runner = await startTestQueue(element, config, elementTestFiles);
      } else {
        testQueue.set(element, elementTestFiles); // Add runner to queue
      }
    }
  } else {
    runner = await startTest(config);
  }

})();
