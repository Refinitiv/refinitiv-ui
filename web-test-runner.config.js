#!/usr/bin/env node
const path = require('path');
const { playwrightLauncher } = require('@web/test-runner-playwright');
const { ROOT, PACKAGES_ROOT } = require('./scripts/helpers');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
  .option('package', {
    type: 'string',
    alias: 'p',
    description: 'Package name'
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
    include: [path.join(basePath , 'lib/**/*.js')],
    report: true,
    reportDir: 'coverage',
    threshold: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
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
