#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

/**
 * Resolved path to the monorepo root folder
 * @type {string}
 */
const __dirname = path.dirname(fileURLToPath(import.meta.url));
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
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m'
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

/**
 * Get file and directory name of meta url
 * @param {ImportMeta} meta import meta
 * @returns {Object} objects directory name and filename of meta url
 */
const fileDirName = (meta) => {
  const fileName = fileURLToPath(meta.url);
  const dirName = path.dirname(fileName);
  return { dirName, fileName };
};

/**
 * Get JSON data from url path
 * @param {string} url the absolute or relative input URL to parse
 * @param {ImportMeta} meta import meta for url resolution
 * @returns {JSON} json
 */
const getJSON = async (url, meta = undefined) => {
  const _url = pathToFileURL(url);
  return JSON.parse(await fs.promises.readFile(new URL(_url, meta ? meta.url : undefined)));
};

export {
  log,
  error,
  info,
  success,
  errorHandler,
  getJSON,
  fileDirName,
  ROOT,
  PACKAGES,
  PACKAGES_ROOT,
  RELEASE_SCRIPTS_PATH
};
