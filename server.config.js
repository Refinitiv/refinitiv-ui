#!/usr/bin/env node
/**
 * Generic configuration for web-server.
 * Extend as required
 */
const { legacyPlugin } = require('@web/dev-server-legacy');
const { ROOT } = require('./scripts/helpers');
const path = require('path');

module.exports = {
  rootDir: ROOT,
  open: true,
  watch: false,
  nodeResolve: {
    exportConditions: ['development'],
  },
  preserveSymlinks: true,
  appIndex: '/',
  plugins: [
    legacyPlugin({
      polyfills: {
        webcomponents: true,
        shadyCssCustomStyle: true,
        // Inject lit's polyfill-support module into test files, which is required
        // for interfacing with the webcomponents polyfills
        custom: [
          {
            name: 'lit-polyfill-support',
            path: path.resolve(ROOT, 'node_modules/lit/polyfill-support.js'),
            test: "!('attachShadow' in Element.prototype)",
            module: false,
          }
        ]
      }
    }) // IE11 support
  ]
};
