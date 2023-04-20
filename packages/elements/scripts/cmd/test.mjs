#!/usr/bin/env node
import { execSync } from 'node:child_process';
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
    execSync('node cli.mjs build --sourceMap --declarationMap');

    // Run main test script.
    const command = ['node ../../scripts/tests/run.mjs', ...params];
    execSync(command.join(' '), { stdio: 'inherit' });
  }
  catch (error) {
    errorHandler(error);
    // Handle child process error for using in current process
    process.on('exit', () => process.exit(1));
  }
};
