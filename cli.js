#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { PACKAGES_ROOT, errorHandler } = require('./scripts/helpers');

const argvNoBin = hideBin(process.argv);
const argv = yargs(argvNoBin)
  .command('$0 <reflect> <package>', 'reflect the command', yargs => {
    yargs.require('reflect')
    yargs.positional('reflect', {
      describe: 'npm command to reflect',
      type: 'string'
    })
    yargs.require('package')
    yargs.positional('package', {
      describe: 'Package or element name',
      type: 'string'
    })
  })
  .demandCommand()
  .help()
  .argv

const options = argvNoBin.slice(2);

// Element or package
try {
  const isElement = !fs.existsSync(path.resolve(PACKAGES_ROOT, argv.package));
  const workspace = isElement ? 'elements' : argv.package;
  const elementName = isElement ? argv.package : undefined;

  // For workspace package real name is required
  const packageJson = fs.readFileSync(path.resolve(PACKAGES_ROOT, workspace, 'package.json'));

  const packageName = JSON.parse(packageJson).name;

  const command = ['npm', 'run', argv.reflect, `--workspace=${packageName}`];
  elementName && command.push(elementName);
  options.length > 0 && command.push('--')
  command.push(...options);

  console.log(command.join(' '));

  execSync(command.join(' '), {
    stdio: 'inherit'
  });
}
catch (error) {
  errorHandler(error);
  process.exit(1);
}
