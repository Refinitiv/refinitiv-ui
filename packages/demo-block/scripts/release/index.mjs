#!/usr/bin/env node
import { fork } from 'node:child_process';
import path from 'node:path';
import {
  RELEASE_SCRIPTS_PATH,
  PACKAGES_ROOT
} from '../../../../scripts/helpers/index.mjs';

const scripts = [
  path.resolve(RELEASE_SCRIPTS_PATH, 'jsxdts-generator.mjs'),
  path.resolve(RELEASE_SCRIPTS_PATH, 'versioning.mjs')
];

scripts.forEach(script => fork(script, {
  stdio: 'inherit',
  env: {
    PACKAGE_ROOT: path.resolve(PACKAGES_ROOT, 'demo-block')
  }
}));
