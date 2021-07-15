#!/usr/bin/env node

const middlewareOverrideDemoPath = require('./middleware/override-demo-path');
const pluginTransformCommonJS = require('./plugins/transform-commonjs');
const server = require('@web/dev-server');

module.exports = {
  server,
  pluginTransformCommonJS,
  middlewareOverrideDemoPath
};
