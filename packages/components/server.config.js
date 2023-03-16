#!/usr/bin/env node
const path = require('path');
const deepmerge = require('deepmerge');
const { middlewareOverrideDemoPath } = require('../../scripts/dev-server');
const baseConfig = require('../../server.config');
const { getDemoPath, MONOREPO_ELEMENTS, ROOT } = require('./scripts/helpers');

const ELEMENT = process.env.ELEMENT;
const demoPath = path.join(MONOREPO_ELEMENTS, getDemoPath(ELEMENT));

const ELEMENT_THEMES = 
`<link type="text/css" rel="stylesheet" media="" href="../../../node_modules/@refinitiv-ui/tokens/lib/base.tokens.css">
<link type="text/css" rel="stylesheet" media="(max-width: 768px)" href="../../../node_modules/@refinitiv-ui/tokens/lib/mobile.tokens.css">
<link type="text/css" rel="stylesheet" media="(prefers-color-scheme: dark)" href="../../../node_modules/@refinitiv-ui/tokens/lib/dark.palette.css">
<link type="text/css" rel="stylesheet" media="(prefers-color-scheme: light)" href="../../../node_modules/@refinitiv-ui/tokens/lib/light.palette.css">
`

module.exports = deepmerge(baseConfig, {
  rootDir: ROOT,
  middleware: [
    middlewareOverrideDemoPath(MONOREPO_ELEMENTS, demoPath),
    
  ],
  // TODO: improve this later because It's too black box
  plugins: [
    {
      name: 'theme-plugin',
      transform(context) {
        if (context.path.includes('__demo__')) {
          const transformedBody = context.body.replace(
            '</head>',
            `${ELEMENT_THEMES}</head>`
          );
          return transformedBody;
        }
      },
    },
  ]
});
