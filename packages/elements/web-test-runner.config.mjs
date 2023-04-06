#!/usr/bin/env node
import { env } from 'node:process';
import path from 'node:path';
import { ELEMENTS_ROOT } from './scripts/helpers/index.mjs';

// Get test script options passed from test.mjs via environment variables
const element = env.testElement;
const testAll = element === 'all';

const config = {
  concurrentBrowsers: 3,
  files: [
    path.join(ELEMENTS_ROOT, 'src', `${ testAll ? '*' : element }/__test__/**/*.test.js`),
    '!**/node_modules/**/*', // exclude any node modules
  ],
  coverageConfig: {
    reportDir: 'coverage/elements'
  }
};

// Replace coverage config if testing on single element.
if (env.testCoverage && !testAll){
  // Coverage include paths must be glob pattern (Absolute path does not work on Windows).
  config.coverageConfig.include = [`**/lib/${ element }/**/*.js`];
  config.coverageConfig.reportDir = `coverage/${ element }`;
}

export default config;
