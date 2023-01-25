#!/usr/bin/env node
const path = require('path');
const { playwrightLauncher } = require('@web/test-runner-playwright');
const { defaultReporter, summaryReporter } = require('@web/test-runner');
const { ROOT, PACKAGES_ROOT } = require('./scripts/helpers');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
  .option('package', {
    type: 'string',
    alias: 'p',
    description: 'Package name'
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

module.exports = {
  files: [path.join(basePath , '/__test__/**/*.test.js')],
  nodeResolve: true,
  coverage: true,
  coverageConfig: {
    include: [`**/${ packageName }/lib/**/*.js`],
    report: true,
    reportDir: 'coverage',
    threshold: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  reporters: [
    defaultReporter({ reportTestResults: true, reportTestProgress: true }),
    argv.output === 'full' ? summaryReporter() : ''
  ],
  concurrentBrowsers: 3,
  browsers: [
    playwrightLauncher({ product: 'chromium' }, {
      headless: true,
      args: [
        '--disable-setuid-sandbox',
        '--disable-extensions'
      ]
    }),
    playwrightLauncher({ product: 'firefox' }, {
      headless: true,
    }),
    playwrightLauncher({ product: 'webkit' }, {
      headless: true,
    }),
  ],
  // in a monorepo you need to set set the root dir to resolve modules
  rootDir: ROOT,
};
