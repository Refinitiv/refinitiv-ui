#!/usr/bin/env node

/**
 * The plugin is used to transform commonjs plugins into
 * esm modules. Once full ESM support is added the plugin can be deprecated
 */
const storage = {};

async function build (packageName, moduleName) {
  const rollup = require('rollup');
  const resolve = require('@rollup/plugin-node-resolve').nodeResolve;
  const commonjs = require('@rollup/plugin-commonjs');
  const json = require('@rollup/plugin-json');

  // create a bundle
  const bundle = await rollup.rollup({
    onwarn(warning, warn) {
      // ignore warnings, as cannot do anything with 3rd party packages
    },
    input: {
      [moduleName]: packageName,
    },
    plugins: [
      json(),
      resolve(),
      commonjs({
        sourceMap: false,
      }),
    ],
  });

  // need to be valid JS name
  const exportsName = moduleName.replace(/-([a-z])/g, (g) =>
    g[1].toUpperCase()
  );

  const outputOptions = {
    format: 'esm',
    name: exportsName,
    exports: 'named',
    compact: true,
  };

  const { output } = await bundle.generate(outputOptions);

  // Output should not contain multiple chunks, as we supply the module
  // If this stops working, we need revisit the approach (e.g. store output in files)
  return output[0].code;
}

const babelTransformPlugin = () => {
  const micromatch = require('micromatch');
  const includePackages = [
    ['**/node_modules/intl-messageformat/**', 'intl-messageformat'],
    [
      '**/node_modules/@formatjs/intl-getcanonicallocales/polyfill.js*',
      '@formatjs/intl-getcanonicallocales/polyfill',
      'intl-getcanonicallocales',
    ],
    [
      '**/node_modules/@formatjs/intl-pluralrules/polyfill.js*',
      '@formatjs/intl-pluralrules/polyfill',
      'intl-pluralrules',
    ],
    [
      '**/node_modules/@formatjs/intl-relativetimeformat/polyfill.js*',
      '@formatjs/intl-relativetimeformat/polyfill',
      'intl-relativetimeformat',
    ],
    [
      '**/node_modules/@formatjs/intl-numberformat/polyfill.js*',
      '@formatjs/intl-numberformat/polyfill',
      'intl-numberformat',
    ],
    [
      '**/node_modules/@formatjs/intl-datetimeformat/polyfill.js*',
      '@formatjs/intl-datetimeformat/polyfill',
      'intl-datetimeformat',
    ],
  ];

  return {
    async transform(context) {
      if (context.response.is('js')) {
        for (let i = 0; i < includePackages.length; i += 1) {
          const packageConf = includePackages[i];
          if (micromatch.isMatch(context.originalUrl, packageConf[0])) {
            const packageName = packageConf[1];
            const moduleName = packageConf[2] || packageName;
            const code =
              storage[moduleName] || (await build(packageName, moduleName));
            storage[moduleName] = code;
            return {
              body: code,
            };
          }
        }
      }
    },
  };
};

module.exports = babelTransformPlugin;
