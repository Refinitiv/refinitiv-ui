const fs = require('fs');
const path = require('path');

const PACKAGES_PATH = path.resolve(process.cwd(), 'packages');
const ELEMENTS_PATH = path.resolve(PACKAGES_PATH, 'elements', 'src');

const getPackageName = function (elementName) {
  const packageJsonStr = fs.readFileSync(path.resolve(PACKAGES_PATH, elementName, 'package.json'));
  return JSON.parse(packageJsonStr).name;
}

const isPackages = function (name) {
  return getPackages().includes(name);
}

const isElements = function (name) {
  return getElements().includes(name);
}

/**
 * Get package list
 *
 * @returns array
 */
const getPackages = function () {
  return fs.readdirSync(path.resolve(PACKAGES_PATH));
};

const getDemoablePackages = function () {
    return getPackages().filter(pack => fs.existsSync(path.resolve(PACKAGES_PATH, pack, '__demo__')));
}

/**
 * Get element list
 *
 * @returns array
 */
const getElements = function () {
    return fs.readdirSync(path.resolve(ELEMENTS_PATH));
};

const autoComplete = function () {
  return [...getElements(), ...getDemoablePackages()];
}

/**
 * Get elements path
 *
 * @param {string} element name
 * @returns string
 */
const elementsPath = function (element = '') {
  return path.resolve(ELEMENTS_PATH, element);
}

/**
 * Get packages path
 *
 * @param {string} package name
 * @returns string
 */
const packagesPath = function (package = '') {
  return path.resolve(PACKAGES_PATH, package);
}

/**
 * Show text with colors
 *
 * @param {string} message
 * @param {string} color
 */
const message = function (message, color) {
  const reset = '\x1b[0m'
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
  console.log(`${colors[color]}${message}${reset}`);
}

module.exports = {
  elementsPath,
  packagesPath,
  getElements,
  getPackages,
  getDemoablePackages,
  message,
  isPackages,
  isElements,
  getPackageName,
  autoComplete
};
