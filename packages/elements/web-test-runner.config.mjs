#!/usr/bin/env node
import path from 'node:path';
import config from '../../web-test-runner.config.mjs';
import { ELEMENTS_ROOT } from './scripts/helpers/index.mjs';

// extract test script options passed from ./script/cmd/test.mjs via environment variables
const ELEMENT = process.env.ELEMENT;
const BROWSERS = process.env.BROWSERS;
const COVERAGE = process.env.COVERAGE === 'true';
const testAll = ELEMENT === 'all' || ELEMENT === undefined;
const browserLists = [];

// Update file list configs for testing elements package
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

// Specify browser to run the unit test & convert browser naming to playwright's one
if (BROWSERS) {
  BROWSERS.split(" ").forEach((optionBrowser) => {
    browserLists.push(config.browsers.filter((configBrowser) => {
      switch (optionBrowser) {
        case 'chrome':
          optionBrowser = 'chromium';
          break;
        case 'safari':
          optionBrowser = 'webkit';
          break;
        default:
          break;
      }
      return configBrowser.product === optionBrowser;
    }));
  });
  config.browsers = browserLists.flat();
}

export default config;
