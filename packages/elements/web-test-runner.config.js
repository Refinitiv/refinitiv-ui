#!/usr/bin/env node
const path = require('path');
const { playwrightLauncher } = require('@web/test-runner-playwright');
const { ROOT, ELEMENTS_ROOT, checkElement } = require('./scripts/helpers');
const ELEMENT = process.env.ELEMENT;
const testAll = ELEMENT === 'all' || ELEMENT === undefined;

module.exports = {
  files: [path.join(ELEMENTS_ROOT, 'src', `${ testAll ? '*' : ELEMENT }/__test__/**/*.test.js`)],
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
