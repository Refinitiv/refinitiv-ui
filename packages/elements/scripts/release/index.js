#!/usr/bin/env node
const { fork } = require('child_process');
const path = require('path');
const { ELEMENTS_ROOT, RELEASE_SCRIPTS_PATH } = require('../helpers');

const scripts = [
  path.resolve(RELEASE_SCRIPTS_PATH, 'api-analyzer.js'),
  path.resolve(RELEASE_SCRIPTS_PATH, 'jsxdts-generator.js'),
  path.resolve(RELEASE_SCRIPTS_PATH, 'theme-extractor.js'),
  path.resolve(RELEASE_SCRIPTS_PATH, 'versioning.js')
];

scripts.forEach(script => fork(script, {
  stdio: 'inherit',
  env: {
    PACKAGE_ROOT: ELEMENTS_ROOT
  }
}));
