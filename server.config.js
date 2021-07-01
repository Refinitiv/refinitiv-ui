#!/usr/bin/env node
/**
 * Generic configuration for web-server.
 * Extend as required
 */
const { legacyPlugin } = require('@web/dev-server-legacy');
const { ROOT } = require('./scripts/helpers');
const { pluginTransformCommonJS } = require('./scripts/dev-server');

module.exports = {
  rootDir: ROOT,
  open: true,
  watch: false,
  nodeResolve: true,
  preserveSymlinks: true,
  appIndex: '/',
  plugins: [
    legacyPlugin(), // IE11 support
    pluginTransformCommonJS()
  ],
  polyfillsLoader: {
    polyfills: {
      shadyCssCustomStyle: true
    }
  }
};
