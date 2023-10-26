#!/usr/bin/env node
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

import { commands } from './scripts/cmd/index.js';
import { errorHandler, info } from './scripts/helpers/index.js';

yargs(hideBin(process.argv))
  .usage('Element Framework CLI Commands\n\nUsage: $0 <command> [options]')
  .command(commands)
  .demandCommand(1, 'You need at least one command.')
  .version(false)
  .help('help')
  .alias('help', 'h')
  .fail(function (msg, err, yargs) {
    if (msg) {
      errorHandler(msg);
    }

    info('\nSpecify --help for available options.\n');
    process.exit(1);
  })
  .parse();
