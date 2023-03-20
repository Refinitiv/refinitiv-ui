#!/usr/bin/env node
import { execSync } from 'node:child_process';
import { DefaultBrowsers, BrowserStack } from '../../browsers.config.mjs';
import {
  getElements,
  info,
  errorHandler,
  PACKAGE_NAME
} from '../helpers/index.mjs';

const elements = ['all', 'utils', ...getElements()];
export const command = 'test [element]';
export const desc = 'Test package';
export const builder = yargs => {
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
    .option('update-snapshots', {
      alias: 's',
      type: 'boolean',
      default: false,
      description: 'Update and prune snapshots'
    })
    .option('browsers', {
      alias: 'b',
      type: 'array',
      choices: DefaultBrowsers,
      description: 'Specific browser(s) to run units test'
    })
    .option('browserstack', {
      type: 'array',
      alias: 'bs',
      choices: BrowserStack.availableBrowsers,
      description: 'Run units test on BrowserStack and specific browser(s)'
    })
    .requiresArg('browserstack')
    .option('include-coverage', {
      type: 'boolean',
      default: true,
      description: 'Include coverage testing'
    })
    .option('output', {
      type: 'string',
      alias: 'o',
      default: 'full',
      choices: ['full', 'minimal'],
      description: 'Print output to the console'
    })
    .completion('completion', () => elements);
};
export const handler = (argv) => {

  const element = argv.element || 'all';
  const watch = argv.watch;
  const snapshots = argv.updateSnapshots;
  const browsers = argv.browsers ? argv.browsers.join(' '): '';
  const browserstack = argv.browserstack ? argv.browserstack.join(' ') : '';

  info(watch ? `Start Dev Server: ${ element }` : `Test: ${ element }`);

  if (snapshots) {
    info(`Update and prune snapshots: ${ element }`);
  }

  try {
    execSync('node cli.mjs build --sourceMap --declarationMap');
    const command = ['wtr', `--config="web-test-runner.config.mjs"`, `--package=${PACKAGE_NAME}`];

    watch && command.push('--watch');
    snapshots && command.push('--update-snapshots');

    command.push(`--output=${argv.output}`);

    execSync(command.join(' '), {
      stdio: 'inherit',
      env: Object.assign({}, process.env, {
        ELEMENT: element,
        BROWSERS: browsers,
        BROWSERSTACK: browserstack,
        COVERAGE: argv.includeCoverage
      })
    });
  }
  catch (error) {
    errorHandler(error);
    process.exit(1);
  }
};
