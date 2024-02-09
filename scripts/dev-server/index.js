#!/usr/bin/env node

const middlewareOverrideDemoPath = require('./middleware/override-demo-path.js');
const server = require('@web/dev-server');

module.exports = {
  server,
  middlewareOverrideDemoPath
};
