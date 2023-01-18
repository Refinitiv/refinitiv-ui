#!/usr/bin/env node
const path = require('path');
const { playwrightLauncher } = require('@web/test-runner-playwright');
const { ROOT, PACKAGES_ROOT, PACKAGES } = require('./scripts/helpers');
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

module.exports = {
  files: [path.join(PACKAGES_ROOT, `${ testAll ? '*' : packageName }/__test__/**/*.test.js`)],
  nodeResolve: true,
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
