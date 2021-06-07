const {
  getElements,
  getPackages,
  getDemoablePackages
} = require('../helpers');

/**
 * Validate element exist
 *
 * @param {string} name
 * @returns boolean
 */
const validateElementExist = function (name) {
  if (!name || !getElements().includes(name)) {
    throw new Error(`Element not found`);
  }
  return true;
};

/**
 * Validate package exist
 *
 * @param {string} name
 * @returns boolean
 */
 const validatePackageExist = function (name) {
  if (!name || !getPackages().includes(name)) {
    throw new Error(`Package not found`);
  }
  return true;
};

/**
 * Validate element can demo
 *
 * @param {string} name
 * @returns boolean
 */
 const validateDemoElement = function (name) {
  if (!name || (!getElements().includes(name) && !getDemoablePackages().includes(name))) {
    throw new Error(`Package or Element not found`);
  }
  return true;
};

/**
 * Validate package exist
 *
 * @param {string} name
 * @returns boolean
 */
 const validatePackageOrElementExist = function (name) {
  if (!name || (!getPackages().includes(name) && !getElements().includes(name))) {
    throw new Error(`Package or Element not found`);
  }
  return true;
};

module.exports = {
  validateElementExist,
  validatePackageExist,
  validatePackageOrElementExist,
  validateDemoElement
};
