#!/usr/bin/env node
const { fork } = require('child_process');
const path = require('path');
const { RELEASE_SCRIPTS_PATH, PACKAGES_ROOT } = require('../../../../scripts/helpers/index.js');

const scripts = [path.resolve(RELEASE_SCRIPTS_PATH, 'versioning.js')];

scripts.forEach((script) =>
  fork(script, {
    stdio: 'inherit',
    env: {
      PACKAGE_ROOT: path.resolve(PACKAGES_ROOT, 'core')
    }
  })
);
