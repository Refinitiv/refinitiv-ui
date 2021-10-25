#!/usr/bin/env node
const fs = require('fs');
const { ROOT } = require('../../helpers');
const userAgentCompat = require('es-dev-server/dist/utils/user-agent-compat');
const path = require("path");

let polyfillScript = '';

/**
 * Inject Lit@2 polyfill for legacy browsers
 * TODO: a temporary solution to support IE11 testing
 */
const injectLitPolyfill = () => {
  return {
    async transform (context) {
      // check if we are serving a HTML file
      if (!context.response.is('html')) {
        return;
      }

      const uaCompat = userAgentCompat.getUserAgentCompat(context);

      if (uaCompat.modern) {
        return;
      }

      // IE11 only
      if (!polyfillScript) {
        polyfillScript = fs.readFileSync(path.resolve(ROOT, 'node_modules/lit/polyfill-support.js'), 'utf8');
      }

      return {
        body: context.body.replace(/<\/head>/, `<script type="text/javascript">${polyfillScript}</script></head>`)
      };
    }
  }
};

module.exports = {
  injectLitPolyfill
};
