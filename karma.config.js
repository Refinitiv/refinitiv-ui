#!/usr/bin/env node
const path = require('path');
const { ROOT, PACKAGES } = require('./scripts/helpers');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { injectLitPolyfill } = require('./scripts/karma/plugins/inject-lit-polyfill')
const {
  defaultBrowsers,
  availableBrowsers,
  BrowserStack
} = require('./browsers.config');

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
  .option('browserstack', {
    type: 'array',
    alias: 'bs',
    choices: BrowserStack.availableBrowsers,
    description: 'Run units test on BrowserStack and specific browser(s)'
  })
  .requiresArg('browserstack')
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
  /**
   * Need to set `listenAddress` and `hostname` to prevent the `node-fetch` bug on `Node 17 and 18`
   * @link https://github.com/node-fetch/node-fetch/issues/1624
   */
  listenAddress: 'localhost',
  hostname: 'localhost',
  autoWatch: argv.watch,
  singleRun: !argv.watch,
  basePath: ROOT, // must be in the root in order for node_modules to be resolved correctly
  concurrency: 1, // Set the value to `1`, When Karma has a problem to connect a test browser on Windows.
  // IE 11 require extra time to loading all scripts when testing concurrently.
  captureTimeout: 3e5,
  browserDisconnectTolerance: 3,
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
if (argv.browserstack && !argv.watch) {
  const bsOption = argv.browserstack;
  // Setting BrowserStack config
  baseConfig.concurrency = 3;
  baseConfig.browserStack = {
    username: process.env.BROWSERSTACK_USERNAME,
    accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
    build: process.env.BROWSERSTACK_BUILD,
    project: process.env.BROWSERSTACK_PROJECT_NAME || 'Refinitiv UI',
    name: packageName,
    timeout: 1800, // Maximum
    retryLimit: 0
  };
  reporters.push('BrowserStack');

  /**
   * Reusing only one local tunnel,
   * The two config `startTunnel` and `localIdentifier` are required
   * to prevent `karma-browserstack-launcher` create multiple tunnel and test will failed
   * when using `NX` run `Karma` paralleling.
   */
  if (process.env.BROWSERSTACK_LOCAL_IDENTIFIER) {
    baseConfig.browserStack.startTunnel = false;
    baseConfig.browserStack.localIdentifier = process.env.BROWSERSTACK_LOCAL_IDENTIFIER;
  }

  // Add BrowserStack launchers to config
  const browserStackLaunchers = {};
  bsOption.forEach((option) => {
    if(option === 'default') {
      BrowserStack.defaultBrowsers.forEach(defaultBS => {
        browserStackLaunchers[defaultBS] = BrowserStack.config[defaultBS];
      });
    }
    else if(option === 'supported') {
      BrowserStack.supportedBrowsers.forEach(supportedBS => {
        // Disable testing on Safari, we have to check all test cases are passed before enabling it again
        if (!supportedBS.includes('safari')) {
          browserStackLaunchers[supportedBS] = BrowserStack.config[supportedBS];
        }
      });
    }
    else {
      browserStackLaunchers[option] = BrowserStack.config[option];
    }
  });

  // Replace all local launchers
  baseConfig.customLaunchers = browserStackLaunchers;

  // Add BrowserStack browsers to config
  baseConfig.browsers = []; // Clear default local browsers and test on BrowserStack only
  for (const key in browserStackLaunchers) {
    baseConfig.browsers.push(key);
  }
}

module.exports = async function (config) {
  config.set(baseConfig);
};
