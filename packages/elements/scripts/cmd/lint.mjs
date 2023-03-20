#!/usr/bin/env node
import { execSync } from 'node:child_process';

import {
  getElements,
  info,
  success,
  errorHandler,
  getElementPath,
  ELEMENTS_ROOT
} from '../helpers/index.mjs';

const elements = ['all', ...getElements()];

export const command = 'lint [element]';
export const desc = 'Linting';
export const builder = yargs => {
  yargs
    .positional('element', {
      desc: 'Element name',
      type: 'string',
      choices: elements
    })
    .option('fix', {
      alias: 'f',
      type: 'boolean',
      default: false,
      description: 'Automatically fix problems'
    })
    .completion('completion', () => elements);
};

export const handler = (argv) => {
  const element = argv.element || 'all';
  const fix = argv.fix;

  info(`Linting${fix ? ' and fixing' : ''}: ${ element }`);

  try {
    const command = ['eslint', element === 'all' ? ELEMENTS_ROOT : getElementPath(element)];
    fix && command.push('--fix');

    execSync(command.join(' '), { stdio: 'inherit' });
    success('Linting: Passed');
  }
  catch (error) {
    errorHandler(error);
    process.exit(1);
  }
};
