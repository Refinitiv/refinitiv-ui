#!/usr/bin/env node
const { execSync } = require('child_process');

const {
  getElements,
  info,
  success,
  errorHandler,
  getElementPath,
  ELEMENTS_ROOT
} = require('../helpers');

const elements = ['all', ...getElements()];

exports.command = 'lint [element]';
exports.desc = 'Linting';
exports.builder = yargs => {
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

exports.handler = (argv) => {
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
