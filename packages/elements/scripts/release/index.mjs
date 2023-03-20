#!/usr/bin/env node
import { fork } from 'node:child_process';
import path from 'path';
import { ELEMENTS_ROOT, RELEASE_SCRIPTS_PATH } from '../helpers/index.mjs';

const scripts = [
  path.resolve(RELEASE_SCRIPTS_PATH, 'api-analyzer.cjs'),
  path.resolve(RELEASE_SCRIPTS_PATH, 'jsxdts-generator.mjs'),
  path.resolve(RELEASE_SCRIPTS_PATH, 'theme-extractor.mjs'),
  path.resolve(RELEASE_SCRIPTS_PATH, 'versioning.mjs')
];

scripts.forEach(script => fork(script, {
  stdio: 'inherit',
  env: {
    PACKAGE_ROOT: ELEMENTS_ROOT
  }
}));
