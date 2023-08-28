#!/usr/bin/env node
import fg from 'fast-glob';
import fs from 'fs';

// Element built files
const PACKAGE_ROOT = process.env.PACKAGE_ROOT || process.cwd();
const ELEMENT_SOURCE = 'src';
const ELEMENT_DIST = 'lib';

/**
 * Get element tag name from file path
 * @param {string} path element's path
 * @returns {string|void} element tag name
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
const DECORATE_SYNTAX = '@customElement';

/**
 * Get list of element file path which contain element defining syntax
 * @param {string} directory directory's name
 * @returns {string[]} a list of element file path
 */
const getElementList = async (directory) => {
  // All ts files in source folder
  const files = await fg([`${directory}/**/*.ts`], { unique: true });

  // Filter out incompatible elements
  return files
    .filter((file) => !file.includes('__'))
    .filter((file) => fs.readFileSync(file, { encoding: 'utf-8' }).includes(DECORATE_SYNTAX));
};

export { ELEMENT_SOURCE, ELEMENT_DIST, PACKAGE_ROOT, getElementTagName, getElementList };
