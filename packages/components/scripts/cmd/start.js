#!/usr/bin/env node
const concurrently = require('concurrently');
const {
  execSync
} = require('child_process');

const {
  getElements,
  error,
  info,
  errorHandler
} = require('../helpers');

exports.command = 'start [element]';
exports.desc = 'Starting the development server';
exports.builder = yargs => {
  yargs
    .require('element')
    .positional('element', {
      desc: 'Element name',
      type: 'string',
      choices: getElements()
    })
    .completion('completion', () => getElements());
};
exports.handler = (argv) => {
  const element = argv.element;

  info(`Start: ${element}`);

  const commands = [
    {
      command: `web-dev-server --config server.config.js --element=${element}`,
      prefixColor: '#D5B60A',
      name: `${element}: WebDevServer`,
      env: {
        ELEMENT: element
      }
    }, {
      command: 'node cli build --watch --sourceMap --declarationMap',
      prefixColor: '#007ACC',
      name: `${element}: TypeScript`
    }
  ];

  try {
    // Must do this step first to make sure that the first
    // start of the server contains up to date code
    execSync('node cli build --sourceMap --declarationMap');

    concurrently(
      commands,
      { killOthers: ['failure', 'success'] }
    ).then(
      () => info(`Stop: ${element}`),
      () => error(`Cannot start ${element}`)
    );
  }
  catch (err) {
    errorHandler(err);
    process.exit(1);
  }
};
