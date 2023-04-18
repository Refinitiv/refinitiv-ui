#!/usr/bin/env node
import { pluginJsBufferToString } from './scripts/dev-server/index.mjs';
/**
 * Generic configuration for web-server.
 * Extend as required
 */
import { ROOT } from './scripts/helpers/esm.mjs';

export default {
  rootDir: ROOT,
  open: true,
  watch: false,
  nodeResolve: true,
  preserveSymlinks: true,
  appIndex: '/',
  plugins: [pluginJsBufferToString]
};
