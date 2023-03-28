#!/usr/bin/env node
import path from 'node:path';
import fs from 'node:fs';
import { execSync } from 'node:child_process';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { PACKAGES_ROOT, errorHandler, getJSON } from './scripts/helpers/esm.mjs';

const nodeArgv = process.argv.filter(item => {
  return true;
});

console.log(nodeArgv);
const argvNoBin = hideBin(nodeArgv);
const argv = yargs(argvNoBin)
  .scriptName("refinitiv-ui")
  .command('$0 <reflect> <package>', 'reflect the command', yargs => {
    yargs.positional('reflect', {
      describe: 'npm command to reflect',
      type: 'string'
    })
    yargs.positional('package', {
      describe: 'Package or element name',
      type: 'string'
    })
  })
  .demandCommand()
  .help(false)
  .argv

const options = argvNoBin.slice(2);

// Element or package
try {
  const isElement = !fs.existsSync(path.resolve(PACKAGES_ROOT, argv.package));
  const workspace = isElement ? 'elements' : argv.package;
  const elementName = isElement ? argv.package : undefined;

  // For workspace package real name is required
  const packageName = (await getJSON(path.resolve(PACKAGES_ROOT, workspace, 'package.json'), import.meta)).name;
  const command = ['npm', 'run', argv.reflect, `--workspace=${packageName}`];

  // Add element name to command
  if (workspace === 'elements') {
    command.push(elementName ? elementName : 'elements');
  }

  options.length > 0 && command.push('--')
  command.push(...options);

  execSync(command.join(' '), { stdio: 'inherit' });
}
catch (error) {
  errorHandler(error);
  process.exit(1);
}
