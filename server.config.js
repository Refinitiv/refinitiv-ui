#!/usr/bin/env node

/**
 * Generic configuration for web-server.
 * Extend as required
 */
const { legacyPlugin } = require('@web/dev-server-legacy');

module.exports = {
  open: true,
  watch: false,
  nodeResolve: true,
  preserveSymlinks: true,
  appIndex: '/',
  plugins: [
    legacyPlugin() // IE11 support
  ],
  polyfillsLoader: {
    polyfills: {
      shadyCssCustomStyle: true
    }
  }
};
