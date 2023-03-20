#!/usr/bin/env node
import path from 'node:path';
import wtrConfig from '../../web-test-runner.config.mjs';
import { ELEMENTS_ROOT } from './scripts/helpers/index.mjs';

const ELEMENT = process.env.ELEMENT;
const BROWSERS = process.env.BROWSERS;
const COVERAGE = process.env.COVERAGE === 'true' ? true : false;
const testAll = ELEMENT === 'all' || ELEMENT === undefined;
const browserLists = [];

// Update configs for running elements package
wtrConfig.files = [
  path.join(ELEMENTS_ROOT, 'src', `${ testAll ? '*' : ELEMENT }/__test__/**/*.test.js`),
  '!**/node_modules/**/*', // exclude any node modules
];

// Coverage include paths must be glob pattern (Absolute path does not work on Windows)
wtrConfig.coverage = COVERAGE;
if (COVERAGE && !testAll){
  wtrConfig.coverageConfig.include = [`**/lib/${ ELEMENT }/**/*.js`];
  wtrConfig.coverageConfig.reportDir = `coverage/${ ELEMENT }`;
} else {
  wtrConfig.coverageConfig.reportDir = 'coverage/elements';
}

// Specific browser to run the unit test
if (BROWSERS) {
  BROWSERS.split(" ").forEach((browser) => {
    browserLists.push(wtrConfig.browsers.filter((browsers) => {
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
  wtrConfig.browsers = browserLists.flat();
}

export default wtrConfig;
