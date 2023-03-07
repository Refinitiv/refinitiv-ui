#!/usr/bin/env node
const path = require('node:path');
const config = require('../../web-test-runner.config');

const { ELEMENTS_ROOT } = require('./scripts/helpers');
const ELEMENT = process.env.ELEMENT;
const BROWSERS = process.env.BROWSERS;
const COVERAGE = process.env.COVERAGE === 'true' ? true : false;
const testAll = ELEMENT === 'all' || ELEMENT === undefined;
const browserLists = [];

// Update configs for running elements package
config.files = [
  path.join(ELEMENTS_ROOT, 'src', `${ testAll ? '*' : ELEMENT }/__test__/**/*.test.js`),
  '!**/node_modules/**/*', // exclude any node modules
];

// Coverage include paths must be glob pattern (Absolute path does not work on Windows)
config.coverage = COVERAGE;
if (COVERAGE && !testAll){
  config.coverageConfig.include = [`**/lib/${ ELEMENT }/**/*.js`];
  config.coverageConfig.reportDir = `coverage/${ ELEMENT }`;
} else {
  config.coverageConfig.reportDir = 'coverage/elements';
}

// Specific browser to run the unit test
BROWSERS.split(" ").forEach((browser) => {
  browserLists.push(config.browsers.filter((browsers) => {
    switch (browser) {
      case 'chrome':
        browser = 'chromium';
        break;
      case 'safari':
        browser = 'webkit';
        break;
      default:
        break;
    }
    return browsers.product === browser;
  }));
});
config.browsers = browserLists.flat();
config.testRunnerHtml = (testFramework) =>
  `<html>
    <link type="text/css" rel="stylesheet" href="./node_modules/@refinitiv-ui/tokens/lib/base.tokens.css">
    <body>
      <script type="module" src="${testFramework}"></script>
    </body>
  </html>`

module.exports = config;
