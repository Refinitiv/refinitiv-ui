#!/usr/bin/env node
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { errorHandler, info } from './scripts/helpers/index.mjs';
import { commands } from './scripts/cmd/index.mjs';

yargs(hideBin(process.argv))
  .usage('Element Framework CLI Commands\n\nUsage: $0 <command> [options]')
  .command(commands)
  .demandCommand(1, 'You need at least one command.')
  .version(false)
  .help('help').alias('help', 'h')
  .fail(function (msg, err, yargs) {
    if (msg) {
      errorHandler(msg);
    }

    info('\nSpecify --help for available options.\n');
    process.exit(1);
  })
  .argv;
