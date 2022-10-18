#!/usr/bin/env node
/**
 * Generic configuration for web-server.
 * Extend as required
 */
const { ROOT } = require('./scripts/helpers');

module.exports = {
  rootDir: ROOT,
  open: true,
  watch: false,
  nodeResolve: true,
  preserveSymlinks: true,
  appIndex: '/',
};
