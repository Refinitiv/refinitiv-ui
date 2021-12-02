#!/usr/bin/env node
const { execSync } = require('child_process');
const browsersConfig = require('../../browsers.config');

const {
  getElements,
  info,
  errorHandler,
  PACKAGE_NAME
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
      description: 'Run test and watch file change'
    })
    .option('snapshots', {
      alias: 's',
      type: 'boolean',
      default: false,
      description: 'Update and prune snapshots'
    })
    .option('browsers', {
      alias: 'b',
      type: 'array',
      default: browsersConfig.defaultBrowsers,
      choices: browsersConfig.availableBrowsers,
      description: 'Specific browser(s) to run units test'
    })
    .completion('completion', () => elements);
};
exports.handler = (argv) => {
  const element = argv.element || 'all';
  const watch = !!argv.watch;
  const snapshots = !!argv.snapshots;
  const browsers = argv.browsers.join(' ');

  info(watch ? `Start Karma Server: ${ element }` : `Test: ${ element }`);

  if (snapshots) {
    info(`Update and prune snapshots: ${ element }`);
  }

  try {
    execSync('node cli build --sourceMap --declarationMap');

    const command = ['karma', 'start', 'karma.config.js', `--package=${PACKAGE_NAME}`];
    watch && command.push('--watch');
    snapshots && command.push('--snapshots');
    browsers && command.push(`-b ${browsers}`);

    execSync(command.join(' '), {
      stdio: 'inherit',
      env: Object.assign({}, process.env, {
        ELEMENT: element
      })
    });
  }
  catch (error) {
    errorHandler(error);
    process.exit(1);
  }
};
