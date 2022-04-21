#!/usr/bin/env node
const path = require('path');
const { ROOT, PACKAGES } = require('./scripts/helpers');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { injectLitPolyfill } = require('./scripts/karma/plugins/inject-lit-polyfill')
const { defaultBrowsers, availableBrowsers, BrowserStackBrowser } = require('./browsers.config');

const argv = yargs(hideBin(process.argv))
  .option('include-snapshots', {
    type: 'boolean',
    default: true,
    description: 'Include snapshot testing'
  })
  .option('include-coverage', {
    type: 'boolean',
    default: true,
    description: 'Include coverage testing'
  })
  .option('snapshots', {
    type: 'boolean',
    default: false,
    description: 'Update and prune snapshots'
  })
  .option('package', {
    type: 'string',
    alias: 'p',
    description: 'Package name'
  })
  .option('watch', {
    type: 'boolean',
    default: false,
    description: 'Run test and watch file change'
  })
  .option('browsers', {
    type: 'array',
    alias: 'b',
    default: defaultBrowsers,
    choices: availableBrowsers,
    description: 'Specific browser(s) to run units test'
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
const packagePath = path.join(ROOT, PACKAGES, packageName);

// Files to include for testing
const files = [{
  pattern: path.join(packagePath, '__test__/**/*.test.js'),
  type: 'module'
}];

// Parsers
const frameworks = [
  'esm',
  'mocha',
  'source-map-support',
];

// Preprocessors
const preprocessors = {};

// Plugins
const plugins = [
  // resolve plugins relative to this config so that they don't always need to exist
  // at the top level
  require.resolve('./scripts/karma/karma-esm'),
  require.resolve('karma-mocha'),
  require.resolve('karma-mocha-reporter'),
  require.resolve('karma-source-map-support'),
  require.resolve('karma-chrome-launcher'),
  require.resolve('karma-firefox-launcher'),
  require.resolve('karma-browserstack-launcher'),
  require.resolve('karma-ie-launcher'),

  // fallback: resolve any karma- plugins
  'karma-*'
];

// Reporters
const reporters = ['mocha'];

const baseConfig = {
  autoWatch: argv.watch,
  singleRun: !argv.watch,
  basePath: ROOT, // must be in the root in order for node_modules to be resolved correctly
  concurrency: 1, // Set the value to `1`, When Karma has a problem to connect a test browser on Windows.
  // IE 11 require extra time to loading all scripts when testing concurrently.
  captureTimeout: 3e5,
  browserDisconnectTolerance: 0,
  browserDisconnectTimeout: 3e5,
  browserSocketTimeout: 1.2e5,
  browserNoActivityTimeout: 3e5,
  files,
  esm: {
    coverage: argv.includeCoverage,
    coverageExclude: ['**/__test__/**', '**/__snapshots__/**', '**/__demo__/**'],
    nodeResolve: true,
    compatibility: 'auto',
    preserveSymlinks: true,

    // prevent compiling es5 libs
    babelExclude: [
      '**/node_modules/mocha/**/*',
      '**/node_modules/chai/**/*',
      '**/node_modules/sinon-chai/**/*',
      '**/node_modules/chai-dom/**/*',
      '**/node_modules/core-js-bundle/**/*'
    ],
    // sinon is not completely es5...
    babelModernExclude: ['**/node_modules/sinon/**/*'],
    // prevent compiling non-module libs
    babelModuleExclude: [
      '**/node_modules/mocha/**/*',
      '**/node_modules/core-js-bundle/**/*'
    ],
    // exclude files served via Karma internally
    karmaExclude: [
      '**/__snapshots__/**'
    ],
    plugins: [
      injectLitPolyfill()
    ]
  },
  plugins,
  frameworks,
  preprocessors,
  reporters,
  mochaReporter: {
    showDiff: true,
    output: argv.output
  },
  restartOnFileChange: false,
  client: {
    captureConsole: argv.output === 'minimal' ? false : true,
    mocha: {
      reporter: 'html',
      timeout: 3000, // Some test case run more than 2000ms on BrowserStack
    }
  },
  colors: true
};

// Do not run headless browsers in watch mode, it significantly slow down debugging
if (!argv.watch) {
  baseConfig.browsers = argv.browsers;
  baseConfig.customLaunchers = {
    firefox: {
      base: 'Firefox',
        flags: ['-headless']
    },
    chrome: {
      base: 'ChromeHeadless',
        flags: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-translate',
        '--disable-extensions'
      ]
    },
    ie: {
      base: 'IE',
        flags: ['-extoff']
    }
  };
}

// Snapshots needs specific configuration
if (argv.includeSnapshots) {
  files.push({
    pattern: path.join(packagePath, '__snapshots__/**/*.md'),
    type: 'js'
  });
  frameworks.unshift('snapshot', 'mocha-snapshot');
  preprocessors['**/__snapshots__/**/*.md'] =  ['snapshot'];
  baseConfig.snapshot = {
    update: argv.snapshots,
    prune: argv.snapshots,
    pathResolver: (basePath, suiteName) => path.join(basePath, PACKAGES, packageName, `__snapshots__/${suiteName}.md`)
  };
  plugins.push(
    require.resolve('karma-snapshot'),
    require.resolve('karma-mocha-snapshot')
  );
}

// Coverage configurations
if (argv.includeCoverage) {
  baseConfig.coverageIstanbulReporter = {
    reports: ['html', 'lcovonly', 'text-summary'],
      dir: 'coverage',
      combineBrowserReports: true,
      skipFilesWithNoCoverage: false,
      thresholds: {
      global: {
        statements: 80,
          branches: 80,
          functions: 80,
          lines: 80
      }
    }
  };
  reporters.push('coverage-istanbul');
  plugins.push(require.resolve('karma-coverage-istanbul-reporter'));
}

// Create BrowserStack config when browsers CLI `browsers` param has `browserstack`
if (argv.browsers.includes('browserstack') && !argv.watch) {

  // Remove `browserstack` browser which come from `argv.browsers` because it is the flag variable using for enable BrowserStack testing only.
  baseConfig.browsers = baseConfig.browsers.filter((browser) => browser !== 'browserstack');


  // Setting BowserStack config
  baseConfig.browserStack = {
    username: process.env.BROWSERSTACK_USERNAME,
    accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
    build: process.env.BROWSERSTACK_BUILD,
    project: 'Element Framework',
    name: packageName,
    timeout: 1000,
    retryLimit: 3
  };
  reporters.push('BrowserStack');

  // Add BrowserStack launchers to config
  baseConfig.customLaunchers = {
    ...baseConfig.customLaunchers,
    ...BrowserStackBrowser('bs_chrome', 'Windows', '11', 'Chrome', 'latest'),
    ...BrowserStackBrowser('bs_firefox', 'Windows', '11', 'Firefox', 'latest'),
    ...BrowserStackBrowser('bs_edge', 'Windows', '11', 'Edge', 'latest'),
    // ...BrowserStackBrowser('bs_chrome_previous', 'Windows', '10', 'Chrome', 'latest-1'),
    // ...BrowserStackBrowser('bs_firefox_previous', 'Windows', '10', 'Firefox', 'latest-1'),
    // ...BrowserStackBrowser('bs_safari', 'OS X', 'Monterey', 'Safari'),
    // ...BrowserStackDevice('bs_iphone13', 'ios', '15', 'iPhone 13'),
    // ...BrowserStackDevice('bs_google_pixel6', 'android', '12.0', 'Google Pixel 6')
  };

  // Add BrowserStack browsers to config
  baseConfig.browsers = baseConfig.browsers.concat([
    'bs_chrome',
    'bs_firefox',
    'bs_edge',
    // 'bs_chrome_previous',
    // 'bs_firefox_previous',
    // 'bs_safari',
    // 'bs_iphone13',
    // 'bs_google_pixel6',
  ]);
}

module.exports = async function (config) {
  config.set(baseConfig);
};
