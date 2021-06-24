#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const config = require('../../server.config');
const pluginCommonJs = require('../../transform-commonjs-plugin');
const elementRootDir = 'packages/elements';
const { legacyPlugin } = require('@web/dev-server-legacy');


const argv = yargs(hideBin(process.argv)).option('element', {
  alias: 'e',
  type: 'string',
  description: 'Element to start'
}).argv;

module.exports = Object.assign(config, {
  appIndex: '/',
  plugins: [
    pluginCommonJs(),
    legacyPlugin()
  ],
  middleware: [
    function rewriteDemoIndex (context, next) {
      const url = context.url;
      if (url === '/' || url === '/index.html') {
        context.url = `${elementRootDir}/src/${argv.element}/__demo__/index.html`;
      }
      else if (url.startsWith('/lib') || url.startsWith('/src')) {
        context.url = `${elementRootDir}${url}`;
      }

      return next();
    },
    function rewriteDemoResources (context, next) {
      const url = context.url;
      if (url.startsWith('/') && !url.startsWith('/node_modules')) {
        context.url = `${elementRootDir}/src/${argv.element}/__demo__${url}`;
      }
      return next();
    }
  ]
});
