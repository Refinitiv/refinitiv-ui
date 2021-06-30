#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const {
  log,
  error,
  info,
  success,
  errorHandler,
  ROOT,
  PACKAGES,
  PACKAGES_ROOT
} = require('../../../../scripts/helpers');

const PACKAGE_NAME = 'elements';

/**
 * Resolved path to elements package root
 * @type {string}
 */
const ELEMENTS_ROOT = path.resolve(PACKAGES_ROOT, PACKAGE_NAME);

/**
 * Elements name as defined in monorepo. Used when root is required
 * @type {string}
 */
const MONOREPO_ELEMENTS = path.join(PACKAGES, PACKAGE_NAME);

const DEMO_FOLDER_NAME = '__demo__';

/**
 * Get path to element folder
 * @param {string} name Element name
 * @returns {string} path
 */
const getElementPath = (name) => path.join('src', name);

/**
 * Get path to demo folder
 * @param {string} name Element name
 * @returns {string} path
 */
const getDemoPath = (name) => path.join(getElementPath(name), DEMO_FOLDER_NAME);

/**
 * Check that provided element exists and can be demoed
 *
 * @param {string} name Element name
 * @returns {boolean} exists True if element and __demo__ exists
 */
const checkElement = (name) => {
  return !!name && fs.existsSync(path.resolve(ELEMENTS_ROOT, getDemoPath(name), 'index.html'));
};

/**
 * Get a list of all elements that can be demoed
 * @returns {Array} elements
 */
const getElements = () => fs.readdirSync(path.resolve(ELEMENTS_ROOT, 'src')).filter(checkElement);

module.exports = {
  ELEMENTS_ROOT,
  ROOT,
  MONOREPO_ELEMENTS,
  checkElement,
  getDemoPath,
  getElementPath,
  getElements,
  log,
  error,
  info,
  success,
  errorHandler
};
