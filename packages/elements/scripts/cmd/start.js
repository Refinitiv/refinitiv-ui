#!/usr/bin/env node
import concurrently from 'concurrently';
import { execSync } from 'node:child_process';

import { error, errorHandler, getElements, info } from '../helpers/index.js';

export const command = 'start [element]';
export const desc = 'Starting the development server';
export const builder = (yargs) => {
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
      command: `vite src/${element}/__demo__ --open --force --host`,
      prefixColor: '#D5B60A',
      name: `${element}: WebDevServer`,
      env: {
        ELEMENT: element
      }
    },
    {
      command: 'node cli.js build --watch --sourceMap --declarationMap',
      prefixColor: '#007ACC',
      name: `${element}: TypeScript`
    }
  ];

  try {
    // Must do this step first to make sure that the first
    // start of the server contains up to date code
    execSync('node cli.js build --sourceMap --declarationMap');

    const { result } = concurrently(commands, { killOthers: ['failure', 'success'] });

    result.then(
      () => info(`Stop: ${element}`),
      () => error(`Cannot start ${element}`)
    );
  } catch (err) {
    errorHandler(err);
    process.exit(1);
  }
};
