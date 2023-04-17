#!/usr/bin/env node
import path from 'node:path';
import deepmerge from 'deepmerge';
import { middlewareOverrideDemoPath, pluginJsBufferToString } from '../../scripts/dev-server/index.mjs';
import baseConfig from '../../server.config.mjs';
import { getDemoPath, MONOREPO_ELEMENTS, ROOT } from './scripts/helpers/index.mjs';

const ELEMENT = process.env.ELEMENT;
const demoPath = path.join(MONOREPO_ELEMENTS, getDemoPath(ELEMENT));

export default deepmerge(baseConfig, {
  rootDir: ROOT,
  middleware: [
    middlewareOverrideDemoPath(MONOREPO_ELEMENTS, demoPath)
  ],
  plugins: [pluginJsBufferToString]
});
