#!/usr/bin/env node
import { env } from 'node:process';
import path from 'node:path';
import { ELEMENTS_ROOT } from './scripts/helpers/index.mjs';

// Get test script options passed from test.mjs via environment variables
const element = env.testElement;
const testAll = element === 'all';

const files = [
  '!**/node_modules/**/*', // exclude any node modules
]

const config = {
  concurrency: 1,
  concurrentBrowsers: 3,
  coverageConfig: {
    reportDir: 'coverage/elements'
  }
};

if (!testAll) {
  config.files = [
    path.join(ELEMENTS_ROOT, 'src', `${ element }/__test__/**/*.test.js`),
    ...files
  ];
}

// Replace coverage config if testing on single element.
if (env.testCoverage && !testAll){
  // Coverage include paths must be glob pattern (Absolute path does not work on Windows).
  config.coverageConfig.include = [`**/lib/${ element }/**/*.js`];
  config.coverageConfig.reportDir = `coverage/${ element }`;
}

export default config;
