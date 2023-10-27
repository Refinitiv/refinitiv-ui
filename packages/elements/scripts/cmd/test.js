#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { hideBin } from 'yargs/helpers';

import { useTestOptions } from '../../../../scripts/tests/cli-options.js';
import { getElements } from '../helpers/index.js';

const elements = ['elements', ...getElements()];

export const command = 'test [element]';
export const desc = 'Test elements';
export const builder = (yargs) => {
  yargs
    .positional('element', {
      desc: 'Element name',
      type: 'string',
      choices: elements
    })
    .completion('completion', () => elements);

  // Use shared test options for the CLI
  useTestOptions(yargs);
};
export const handler = () => {
  // Remove command and forward all test options to main test file
  let params = hideBin(process.argv).slice(1);

  // Build before run test everytime.
  const buildProcess = spawnSync('node cli.js build --sourceMap --declarationMap', {
    stdio: 'inherit',
    shell: true
  });
  if (buildProcess.status !== 0) {
    process.exit(testProcess.status);
  }

  // Run main test script.
  const command = ['node ../../scripts/tests/run.js', ...params].join(' ');
  const testProcess = spawnSync(command, { stdio: 'inherit', shell: true });
  process.exit(testProcess.status);
};
