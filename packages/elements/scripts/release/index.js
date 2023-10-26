#!/usr/bin/env node
import { fork } from 'node:child_process';
import path from 'node:path';

import { ELEMENTS_ROOT, RELEASE_SCRIPTS_PATH } from '../helpers/index.js';

const scripts = [
  path.resolve(RELEASE_SCRIPTS_PATH, 'api-analyzer.cjs'),
  path.resolve(RELEASE_SCRIPTS_PATH, 'jsxdts-generator.js'),
  path.resolve(RELEASE_SCRIPTS_PATH, 'theme-extractor.js'),
  path.resolve(RELEASE_SCRIPTS_PATH, 'versioning.js')
];

scripts.forEach((script) =>
  fork(script, {
    stdio: 'inherit',
    env: {
      PACKAGE_ROOT: ELEMENTS_ROOT
    }
  })
);
