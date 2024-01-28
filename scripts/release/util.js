#!/usr/bin/env node
import fg from 'fast-glob';
import fs from 'node:fs';

// Element built files
const PACKAGE_ROOT = process.env.PACKAGE_ROOT || process.cwd();
const ELEMENT_PREFIX = 'ef';
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

// Helper function to convert path separators
const normalizePathSeparators = (filePath) => filePath.replace(/\\/g, '/');

/**
 * Get list of element file path which contain element defining syntax
 * @param {string} directory directory's name
 * @returns {Promise<string[]>} a list of element file path
 */
const getElementList = async (directory) => {
  // All ts files in source folder
  const files = await fg([normalizePathSeparators(`${directory}/**/*.ts`)], { unique: true });

  // Filter out incompatible elements
  return files
    .filter((file) => !file.includes('__'))
    .filter((file) => {
      const fileContent = fs.readFileSync(file, { encoding: 'utf-8' });
      return fileContent.includes(DECORATE_SYNTAX);
    });
};

/*
 * List for generate document from TS.
 * Each item contains require fields.
 * entry - path of ts file that uses to generate doc.
 * tsconfig - tsconfig path.
 */
const generateDocList = [
  {
    entry: '../packages/elements/src/tree/managers/tree-manager.ts',
    tsconfig: '../packages/elements/tsconfig.json'
  }
];

export {
  ELEMENT_SOURCE,
  ELEMENT_DIST,
  ELEMENT_PREFIX,
  PACKAGE_ROOT,
  getElementTagName,
  generateDocList,
  getElementList,
  normalizePathSeparators
};
