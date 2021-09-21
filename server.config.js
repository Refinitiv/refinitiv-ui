#!/usr/bin/env node
/**
 * Generic configuration for web-server.
 * Extend as required
 */
const { legacyPlugin } = require('@web/dev-server-legacy');
const { ROOT } = require('./scripts/helpers');

module.exports = {
  rootDir: ROOT,
  open: true,
  watch: false,
  nodeResolve: true,
  preserveSymlinks: true,
  appIndex: '/',
  plugins: [
    legacyPlugin({
      polyfills: {
        webcomponents: true,
        shadyCssCustomStyle: true
      }
    }) // IE11 support
  ]
};
