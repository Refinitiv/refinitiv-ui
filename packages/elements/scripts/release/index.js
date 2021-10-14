#!/usr/bin/env node
const { fork } = require('child_process');
const path = require('path');
const { ROOT, ELEMENTS_ROOT } = require('../helpers');

const RELEASE_PATH = path.resolve(ROOT, 'scripts', 'release');

const scripts = [
  path.resolve(RELEASE_PATH, 'api-analyzer.js'),
  path.resolve(RELEASE_PATH, 'jsxdts-generator.js'),
  path.resolve(RELEASE_PATH, 'theme-extractor.js')
];

scripts.forEach(script => fork(script, {
  stdio: 'inherit',
  env: {
    PACKAGE_ROOT: ELEMENTS_ROOT
  }
}));
