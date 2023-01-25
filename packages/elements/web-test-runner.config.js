#!/usr/bin/env node
const path = require('node:path');
const config = require('../../web-test-runner.config');

const { ELEMENTS_ROOT } = require('./scripts/helpers');
const ELEMENT = process.env.ELEMENT;
const testAll = ELEMENT === 'all' || ELEMENT === undefined;

// Update configs for running elements package
config.files = [
  path.join(ELEMENTS_ROOT, 'src', `${ testAll ? '*' : ELEMENT }/__test__/**/*.test.js`),
  '!**/node_modules/**/*', // exclude any node modules
];

// Coverage include paths must be glob pattern (Absolute path does not work on Windows)
if (!testAll){
  config.coverageConfig.include = [`**/lib/${ ELEMENT }/**/*.js`];
  config.coverageConfig.reportDir = `coverage/${ ELEMENT }`;
} else {
  config.coverageConfig.reportDir = 'coverage/elements';
}

module.exports = config;
