#!/usr/bin/env node
import { BrowserStack, DefaultBrowsers } from '../../browsers.config.mjs';

/**
 * Use standard options for the yargs CLI
 * @param {yargs.Argv} yargs argv
 * @returns {void}
 */
export const useTestOptions = yargs => {
  yargs.option('include-coverage', {
    type: 'boolean',
    default: true,
    description: 'Include coverage testing'
  })
  .option('watch', {
    type: 'boolean',
    alias: 'w',
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
    type: 'array',
    alias: 'b',
    choices: DefaultBrowsers,
    description: 'Run units test on specific browsers'
  })
  .option('browserstack', {
    type: 'array',
    alias: 'bs',
    choices: BrowserStack.availableBrowsers,
    description: 'Run units test on BrowserStack and specific browser(s)'
  })
  .option('output', {
    type: 'string',
    alias: 'o',
    default: 'full',
    choices: ['full', 'minimal'],
    description: 'Print output to the console'
  });
};
