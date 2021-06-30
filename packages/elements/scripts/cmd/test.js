#!/usr/bin/env node
const { execSync } = require('child_process');

const {
  getElements,
  info,
  errorHandler
} = require('../helpers');

const elements = ['all', ...getElements()];
exports.command = 'test [element]';
exports.desc = 'Test package';
exports.builder = yargs => {
  yargs
    .positional('element', {
      desc: 'Element name',
      type: 'string',
      choices: elements
    })
    .option('watch', {
      alias: 'w',
      type: 'boolean',
      default: false,
      description: 'Watch file change'
    })
    .option('snapshots', {
      alias: 's',
      type: 'boolean',
      default: false,
      description: 'Update Snapshots'
    })
    .option('prune-snapshots', {
      type: 'boolean',
      default: false,
      description: 'Prune Snapshots'
    })
    .completion('completion', () => elements);
};
exports.handler = (argv) => {
  const element = argv.element || 'all';
  const watch = !!argv.watch;
  const snapshots = !!argv.snapshots;
  const pruneSnapshots = !!argv['prune-snapshots'];

  info(watch ? `Start Karma Server: ${ element }` : `Test: ${ element }`);

  if (snapshots) {
    info(`Update Snapshots: ${ element }`);
  }

  if (pruneSnapshots) {
    info(`Prune Snapshots: ${ element }`);
  }

  try {
    execSync('node cli build', { stdio: 'inherit' });

    // linting
    execSync(`node cli lint ${element}`, { stdio: 'inherit' });

    const command = ['karma', 'start', 'karma.config.js'];
    watch && command.push('--auto-watch=true', '--single-run=false');
    snapshots && command.push('--update-snapshots');
    pruneSnapshots && command.push('--prune-snapshots');

    execSync(command.join(' '), {
      stdio: 'inherit',
      env: Object.assign({}, process.env, {
        ELEMENT: element
      })
    });
  }
  catch (error) {
    errorHandler(error);
    process.exit(0);
  }
};
