#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { errorHandler, info } = require('./scripts/helpers');

yargs(hideBin(process.argv))
  .usage('Element Framework CLI Commands\n\nUsage: $0 <command> [options]')
  .commandDir('./scripts/cmd')
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
