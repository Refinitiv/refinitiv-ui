const osType = require('os').type();
const path = require('path');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const pluginCommonJs = require('./transform-commonjs-plugin');

const argv = yargs(hideBin(process.argv)).option('element', {
  alias: 'e',
  type: 'string',
  description: 'Element to start',
}).argv;

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
        pattern: path.join(process.cwd(), `**/${argv.element || ''}/__test__/**/*.test.js`),
        type: 'module',
      },
    ],
    esm: {
      coverage: true,
      coverageExclude: argv.element ? ['**/__test__/**', `!**/${argv.element}/**/*`]: ['**/__test__/**'],
      nodeResolve: true,
      compatibility: 'auto',
      preserveSymlinks: true,
      plugins: [pluginCommonJs()],

      // prevent compiling es5 libs
      babelExclude: [
        '**/node_modules/mocha/**/*',
        '**/node_modules/chai/**/*',
        '**/node_modules/sinon-chai/**/*',
        '**/node_modules/chai-dom/**/*',
        '**/node_modules/core-js-bundle/**/*',
      ],
      // sinon is not completely es5...
      babelModernExclude: ['**/node_modules/sinon/**/*'],
      // prevent compiling non-module libs
      babelModuleExclude: [
        '**/node_modules/mocha/**/*',
        '**/node_modules/core-js-bundle/**/*',
      ],
      exclude: ['**/__snapshots__/**/*'],
    },
    snapshot: {
      update: updateSnapshots,
      prune: pruneSnapshots,
      pathResolver(basePath, suiteName) {
        return path.join(process.cwd(), `__snapshots__/${suiteName}.md`); // required in order for snapshots to prune and update correctly
      },
    },
    plugins: [
      // resolve plugins relative to this config so that they don't always need to exist
      // at the top level
      require.resolve('@open-wc/karma-esm'),
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
      'esm',
      'mocha',
      'snapshot',
      'mocha-snapshot',
      'source-map-support',
    ],
    preprocessors: {
      '**/__snapshots__/**/*.md': ['snapshot'],
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
