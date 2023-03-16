#!/usr/bin/env node
import path from 'node:path';
import { playwrightLauncher } from '@web/test-runner-playwright';
import { browserstackLauncher } from '@web/test-runner-browserstack';
import { defaultReporter, summaryReporter } from '@web/test-runner';
import { ROOT, PACKAGES_ROOT } from './scripts/helpers/index.mjs';
import { BrowserStack } from './browsers.config.mjs';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv))
  .option('package', {
    type: 'string',
    alias: 'p',
    description: 'Package name'
  })
  .option('include-coverage', {
    type: 'boolean',
    default: true,
    description: 'Include coverage testing'
  })
  .option('watch', {
    type: 'boolean',
    default: false,
    description: 'Run test and watch file change'
  })
  .option('browserstack', {
    type: 'array',
    alias: 'bs',
    choices: BrowserStack.availableBrowsers,
    description: 'Run units test on BrowserStack and specific browser(s)'
  })
  .option('output', {
    type: 'string',
    alias: 'o',
    default: 'full',
    choices: ['full', 'minimal'],
    description: 'Print output to the console'
  })
  .argv

const packageName = argv.package || path.basename(process.cwd()); // if no package provided, try to guess
const testAll = packageName === 'all' || packageName === undefined;
const basePath = path.join(PACKAGES_ROOT, testAll ? '*' : packageName);
const browserstack = argv.browserstack && !argv.watch;
let browsers = [];

// Test on BrowserStack`
if (browserstack) {

  const sharedCapabilities = {
    'browserstack.user': process.env.BROWSERSTACK_USERNAME,
    'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY,
    project: process.env.BROWSERSTACK_PROJECT_NAME || 'Refinitiv UI',
    name: packageName,
    build: `build ${process.env.BROWSERSTACK_BUILD || 'unknown'}`,
    timeout: 1800, // Maximum
  };

  /**
   * TODO: Check this issue and the fix still has the problem in playwright or not, if not remove code below
   * Reusing only one local tunnel,
   * The two config `startTunnel` and `localIdentifier` are required
   * to prevent `browserstack launcher` create multiple tunnel and test will failed
   * when using `NX` run `Test runner` paralleling.
   */
  // if (process.env.BROWSERSTACK_LOCAL_IDENTIFIER) {
  //   baseConfig.browserStack.startTunnel = false;
  //   baseConfig.browserStack.localIdentifier = process.env.BROWSERSTACK_LOCAL_IDENTIFIER;
  // }

  // Add BrowserStack launchers to config
  const launchers = [];
  argv.browserstack.forEach((option) => {
    switch (option) {
      case 'default':
        BrowserStack.defaultBrowsers.forEach(browser => {
          launchers.push(BrowserStack.config[browser]);
        });
        break;
      case 'supported':
        BrowserStack.supportedBrowsers.forEach(browser => {
          // Disable testing on Safari, we have to check all test cases are passed before enabling it again
          if (!browser.includes('safari')) {
            launchers.push(BrowserStack.config[browser]);
          }
        });
        break;
      default:
        launchers.push(BrowserStack.config[option]);
        break;
    }
  });

  // Add BrowserStack launchers to config
  launchers.forEach(launcher => {
    browsers.push(browserstackLauncher({ capabilities: { ...sharedCapabilities, ...launcher } }));
  })
} else {
  // Test on Playwright, add launchers to config
  browsers = [
    playwrightLauncher({ product: 'chromium' }, {
      headless: true,
      args: [
        '--disable-setuid-sandbox',
        '--disable-extensions'
      ]
    }),
    playwrightLauncher({ product: 'firefox' }, { headless: true }),
    playwrightLauncher({ product: 'webkit' }, { headless: true }),
  ];
}

export default {
  files: [path.join(basePath , '/__test__/**/*.test.js')],
  nodeResolve: true,
  preserveSymlinks: true,
  coverage:  argv.includeCoverage,
  coverageConfig: {
    include: [`**/${ packageName }/lib/**/*.js`],
    report: true,
    reportDir: 'coverage',
    threshold: { statements: 80, branches: 80, functions: 80, lines: 80 },
  },
  reporters: [
    defaultReporter({ reportTestResults: true, reportTestProgress: true }),
    argv.output === 'full' ? summaryReporter() : ''
  ],
  concurrentBrowsers: 3,
  browsers: browsers,
  // in a monorepo you need to set set the root dir to resolve modules
  rootDir: ROOT,
};
