#!/usr/bin/env node
import { fork } from 'node:child_process';
import path from 'node:path';

import { PACKAGES_ROOT, RELEASE_SCRIPTS_PATH } from '../../../../scripts/helpers/esm.mjs';

const scripts = [path.resolve(RELEASE_SCRIPTS_PATH, 'versioning.mjs')];

scripts.forEach((script) =>
  fork(script, {
    stdio: 'inherit',
    env: {
      PACKAGE_ROOT: path.resolve(PACKAGES_ROOT, 'core')
    }
  })
);
