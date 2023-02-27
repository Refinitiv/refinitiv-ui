#!/usr/bin/env node
const path = require('path');
const deepmerge = require('deepmerge');
const { middlewareOverrideDemoPath } = require('../../scripts/dev-server');
const baseConfig = require('../../server.config');
const { getDemoPath, MONOREPO_ELEMENTS, ROOT } = require('./scripts/helpers');

const ELEMENT = process.env.ELEMENT;
const demoPath = path.join(MONOREPO_ELEMENTS, getDemoPath(ELEMENT));

module.exports = deepmerge(baseConfig, {
  rootDir: ROOT,
  middleware: [
    middlewareOverrideDemoPath(MONOREPO_ELEMENTS, demoPath)
  ]
});
