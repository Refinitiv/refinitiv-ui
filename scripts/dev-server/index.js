#!/usr/bin/env node

const middlewareOverrideDemoPath = require('./middleware/override-demo-path');
const server = require('@web/dev-server');

module.exports = {
  server,
  middlewareOverrideDemoPath
};
