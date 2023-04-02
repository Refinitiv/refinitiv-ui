#!/usr/bin/env node
import { execSync } from 'node:child_process';
import concurrently from 'concurrently';
import {
  getElements,
  error,
  info,
  errorHandler
} from '../helpers/index.mjs';

export const command = 'start [element]';
export const desc = 'Starting the development server';
export const builder = yargs => {
  yargs
    .require('element')
    .positional('element', {
      desc: 'Element name',
      type: 'string',
      choices: getElements()
    })
    .completion('completion', () => getElements());
};
export const handler = (argv) => {
  const element = argv.element;

  info(`Start: ${element}`);

  const commands = [
    {
      command: `web-dev-server --config server.config.mjs --element=${element}`,
      prefixColor: '#D5B60A',
      name: `${element}: WebDevServer`,
      env: {
        ELEMENT: element
      }
    }, {
      command: 'node cli.mjs build --watch --sourceMap --declarationMap',
      prefixColor: '#007ACC',
      name: `${element}: TypeScript`
    }
  ];

  try {
    // Must do this step first to make sure that the first
    // start of the server contains up to date code
    execSync('node cli.mjs build --sourceMap --declarationMap');

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
