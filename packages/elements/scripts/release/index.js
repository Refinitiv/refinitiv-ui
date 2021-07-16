#!/usr/bin/env node
const { fork } = require('child_process');
const path = require('path');
const { ROOT, ELEMENTS_ROOT } = require('../helpers');

fork(path.resolve(ROOT, 'scripts', 'release', 'index.js'), {
  stdio: 'inherit',
  env: {
    PACKAGE_ROOT: ELEMENTS_ROOT
  }
});
