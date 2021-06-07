#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

yargs(hideBin(process.argv))
  .usage('MonoRepo - Element Framework CLI Commands\n\nUsage: $0 <command> [options]')
  .commandDir('bin')
  .demandCommand(1, 'You need at least one command.')
  .version(false)
  .help('help').alias('help', 'h')
  .fail(function (msg, err, yargs) {
    if (msg) {
      console.error(msg);
    }
    console.log('Specify --help for available options.');
    process.exit(1);
  })
  .argv;
