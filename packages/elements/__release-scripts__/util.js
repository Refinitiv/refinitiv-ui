const fs = require('fs');
const fg = require('fast-glob');

// Element built files
const ELEMENT_DIST = 'lib';

/**
 * Get element tag name from file path
 * @param {string} path element's path
 * @returns {string} element tag name
 */
const getElementTagName = (path) => {
  if (!fs.existsSync(path)) {
    return;
  }

  const content = fs.readFileSync(path, { encoding: 'utf-8' });
  const tagName = content.split(`${DECORATE_SYNTAX}('`)[1].split("'")[0];

  return tagName && tagName.length ? tagName.trim() : '';
};

// This is a compiled syntax of decorator we used to define our elements
// This will help to detect if the JavaScript file is an element or not
const DECORATE_SYNTAX = '__decorate([\n    customElement';

/**
 * Get list of element file path which contain element defining syntax
 * @param {string} directory directory's name
 * @returns {string[]} a list of element file path
 */
const getElementList = async (directory) => {
  // All js files in source folder
  const files = await fg([`${directory}/**/*.js`], { unique: true });

  // Filter out incompatible elements
  return files
    .filter((file) => !file.includes('__'))
    .filter((file) =>
      fs.readFileSync(file, { encoding: 'utf-8' }).includes(DECORATE_SYNTAX)
    );
};

module.exports = { ELEMENT_DIST, getElementTagName, getElementList };
