#!/usr/bin/env node

/**
 * The middleware used to shorted demo path.
 * This is particularly useful when the module is run from monorepo
 */

/**
 * Override demo path to shorten a short version e.g. `localhost:8001`
 * The plugin expect the following structure
 * elementDir - element root directory
 * |- lib - folder for TypeScript compilation result
 * |- src - folder for TypeScript source code used for maps
 * demoPath
 * |- index.html - a plugin expects index.html in demo folder
 * |- all other files, which are not in lib, src or node_modules are resolved from demoPath
 *
 * @param {string} elementDir An element root directory
 * @param {string} demoPath An element demo directory
 * @returns {Function} override function
 */
const overrideDemoPath = (elementDir, demoPath) => {
  return function (context, next) {
    const url = context.url;

    if (url.startsWith('/lib') || url.startsWith('/src')) {
      // src is used for source maps
      // lib is used for built code
      context.url = `${elementDir}${url}`;
    } else if (url === '/' || (url.startsWith('/') && !url.startsWith('/node_modules'))) {
      // unless served from node_modules, assume that the file served from demo page itself
      context.url = `${demoPath}${url}`;
    }

    return next();
  };
};

module.exports = overrideDemoPath;
