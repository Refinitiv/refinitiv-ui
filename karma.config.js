#!/usr/bin/env node
const osType = require('os').type();
const path = require('path');
const { pluginTransformCommonJS } = require('./scripts/dev-server');

/**
 * Browsers
 */
const isWin = osType === 'Windows_NT';
const isDarwin = osType === 'Darwin'; /* macOS, iOS, iPadOS */

const defaultBrowsers = ['chrome', 'firefox'];
const availableBrowsers = ['chrome', 'firefox', 'opera'];

// do not perform browser check as it is slow and never required

if (isWin) {
  defaultBrowsers.push('IE_no_addons');
  availableBrowsers.push('chrome');
}

if (isDarwin) {
  // defaultBrowsers.push('safari'); /* there is a bug https://github.com/karma-runner/karma-safari-launcher/issues/29, so do not include it by default  */
  availableBrowsers.push('safari');
}

const updateSnapshots = !!process.argv.find((arg) =>
  arg.includes('--update-snapshots')
);
const pruneSnapshots = !!process.argv.find((arg) =>
  arg.includes('--prune-snapshots')
);

module.exports = async function (config) {
  config.set({
    autoWatch: false,
    singleRun: true,
    concurrency: Infinity, // Set the value to `1`, When Karma has a problem to connect a test browser on Windows.
    browserNoActivityTimeout: 60000,
    browserDisconnectTimeout: 60000,
    browsers: defaultBrowsers,
    customLaunchers: {
      firefox: {
        base: 'Firefox',
        flags: ['-headless'],
      },
      chrome: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-translate',
          '--disable-extensions',
        ],
      },
      IE_no_addons: {
        base: 'IE',
        flags: ['-extoff'],
      },
    },
    files: [
      {
        pattern: path.join(process.cwd(), '**/__test__/**/*.test.js'),
        type: 'module'
      },
      path.join(process.cwd(), '**/snapshots/**/*.md')
    ],
    esm: {
      coverage: true,
      coverageExclude: ['**/__test__/**', '**/__snapshots__/**', '**/__demo__/**'],
      nodeResolve: true,
      compatibility: 'auto',
      preserveSymlinks: true,
      plugins: [pluginTransformCommonJS()],

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
      ]
    },
    snapshot: {
      update: updateSnapshots,
      prune: pruneSnapshots,
      pathResolver1(basePath, suiteName) {
        return path.join(process.cwd(), `snapshots/${suiteName}.md`); // required in order for snapshots to prune and update correctly
      },
    },
    plugins: [
      // resolve plugins relative to this config so that they don't always need to exist
      // at the top level
      require.resolve('./scripts/karma-server/karma-esm'),
      require.resolve('karma-mocha'),
      require.resolve('karma-mocha-reporter'),
      require.resolve('karma-source-map-support'),
      require.resolve('karma-coverage-istanbul-reporter'),
      require.resolve('karma-snapshot'),
      require.resolve('karma-mocha-snapshot'),
      require.resolve('karma-chrome-launcher'),
      require.resolve('karma-firefox-launcher'),
      require.resolve('karma-ie-launcher'),

      // fallback: resolve any karma- plugins
      'karma-*',
    ],
    frameworks: [
      'snapshot',
      'mocha-snapshot',
      'esm',
      'mocha',
      'source-map-support',
    ],
    preprocessors: {
      '**/__snapshots__/**/*.md': ['snapshot']
    },
    reporters: ['mocha', 'coverage-istanbul'],
    mochaReporter: {
      showDiff: true,
    },
    restartOnFileChange: false,
    client: {
      mocha: {
        reporter: 'html',
      },
    },
    colors: true,
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly', 'text-summary'],
      dir: 'coverage',
      combineBrowserReports: true,
      skipFilesWithNoCoverage: false,
      thresholds: {
        global: {
          statements: 80,
          branches: 80,
          functions: 80,
          lines: 80,
        },
      },
    },
  });
};
