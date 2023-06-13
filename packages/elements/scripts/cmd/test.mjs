#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { useTestOptions } from '../../../../scripts/tests/cli-options.mjs';
import { getElements, errorHandler } from '../helpers/index.mjs';
import { hideBin } from 'yargs/helpers';

const elements =  ['elements', ...getElements()];

export const command = 'test [element]';
export const desc = 'Test elements';
export const builder = yargs => {
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
  let params = hideBin(process.argv).slice(1)

  try {
    // Build before run test everytime.
    spawnSync('node cli.mjs build --sourceMap --declarationMap', {
      stdio: 'inherit',
      shell: true
    });

    // Run main test script.
    const command = ['node ../../scripts/tests/run.mjs', ...params];
    spawnSync(command.join(' '), { stdio: 'inherit', shell: true });
  }
  catch (error) {
    errorHandler(error);
    // Exit current process if child process error
    process.exit(1);
  }
};
