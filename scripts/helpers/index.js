#!/usr/bin/env node
const path = require('path');

/**
 * Resolved path to the monorepo root folder
 * @type {string}
 */
const ROOT = path.resolve(__dirname, '../../');

/**
 * A folder name where monorepo packages are placed
 * @type {string}
 */
const PACKAGES = 'packages';

/**
 * Resolved path to monorepo packages folder
 * @type {string}
 */
const PACKAGES_ROOT = path.resolve(ROOT, PACKAGES);

/**
 * Resolved path to release scripts folder.
 * Tools to publish elements
 * @type {string}
 */
const RELEASE_SCRIPTS_PATH = path.resolve(ROOT, 'scripts', 'release');

/**
 * Show log with optional colour
 *
 * @param {string} message Message to show
 * @param {string} [color=white] Optional colour
 * @returns {void}
 */
const log = (message, color) => {
  const reset = '\x1b[0m';
  const colors = {
    'black': '\x1b[30m',
    'red': '\x1b[31m',
    'green': '\x1b[32m',
    'yellow': '\x1b[33m',
    'blue': '\x1b[34m',
    'magenta': '\x1b[35m',
    'cyan': '\x1b[36m',
    'white': '\x1b[37m'
  };

  // eslint-disable-next-line no-console
  console.log(`\n${colors[color || 'white']}${message}${reset}`);
};

/**
 * Show error message
 * @param {string} message Message to show
 * @returns {void}
 */
const error = (message) => log(message, 'red');

/**
 * Show success message
 * @param {string} message Message to show
 * @returns {void}
 */
const success = (message) => log(message, 'green');

/**
 * Show info message
 * @param {string} message Message to show
 * @returns {void}
 */
const info = (message) => log(message, 'cyan');

/**
 * Basic error handler
 * @param {Error|string} message An error message
 * @returns {void}
 */
const errorHandler = (message) => {
  if (message instanceof Error) {
    message = `${message.name}: ${message.message}`;
  }
  error(message);
};

module.exports = {
  log,
  error,
  info,
  success,
  errorHandler,
  ROOT,
  PACKAGES,
  PACKAGES_ROOT,
  RELEASE_SCRIPTS_PATH
};
