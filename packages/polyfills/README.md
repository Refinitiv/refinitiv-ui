# Requirements for Legacy Browsers

Element Framework (EF) is built on top of Lit framework and is utilising the latest JavaScript standards. The features are supported by latest versions of all modern browsers (including Chrome, Edge, Safari, and Firefox) and most popular tools (such as Rollup, Webpack, Babel, and Terser).

@> You can read [Lit Requirements](https://lit.dev/docs/tools/requirements) for better understanding of the topic.

## Web Components

When developing an application using EF, either your target browsers need to support _WebComponents_ natively, or your tools need to handle them.

EF provides polyfills to help developers quickly adopt _WebComponents_ in legacy browsers:

```bash
npm install @refinitiv-ui/polyfills
```

!> You must ensure that the polyfills are loaded before any EF elements.

```js
import '@refinitiv-ui/polyfills';
```

## Modern JavaScript

Old browsers do not support many modern JavaScript features.

[@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env) allows to use the latest JavaScript without needing to micromanage which syntax transforms are needed by your target environment(s).

This is the minimum configuration for `@babel/preset-env`:

```json
{
  "corejs": {
    "version": 3,
    "proposals": true
  },
  "useBuiltIns": "usage"
}
```

### Manual `core-js` configuration

If you do not use `@babel/preset-env` you need to include `core-js` polyfills into the code yourself:

```javascript
import 'core-js/es/global-this';
import 'core-js/es/promise';
import 'core-js/es/symbol';
import 'core-js/es/array';
import 'core-js/es/map';
import 'core-js/es/number';
import 'core-js/es/string';
import 'core-js/es/math';
import 'core-js/es/object';
```

Your `babel` configuration would need to include [@babel/plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime) plugin as well:

```json
{
  "plugins": ["@babel/plugin-transform-runtime"]
}
```

## Localisation (Intl)

Legacy browsers lack some features in the `Intl` object. You can choose how to address this, but the simplest way is to install these polyfills:

```shell
npm install @formatjs/intl-getcanonicallocales @formatjs/intl-locale @formatjs/intl-numberformat @formatjs/intl-pluralrules @formatjs/intl-datetimeformat
```

and import them into your app:

```javascript
// Import polyfills required by specific element
import '@formatjs/intl-locale/polyfill.iife';
import '@formatjs/intl-getcanonicallocales/polyfill.iife';
import '@formatjs/intl-pluralrules/polyfill.iife';
import '@formatjs/intl-numberformat/polyfill.iife';
import '@formatjs/intl-datetimeformat/polyfill.iife';

// Import supported locales, for instance `en`
import '@formatjs/intl-pluralrules/locale-data/en';
import '@formatjs/intl-numberformat/locale-data/en';
import '@formatjs/intl-datetimeformat/locale-data/en';
```

There are additional polyfills available for more advanced translation messages. You can get additional information on [formatjs.io](https://formatjs.io/docs/polyfills).

## Compiling to ES5

Ensure that `IE11` is listed in the [supported browsers](https://github.com/browserslist/browserslist), for instance in `.browserslistrc`:

```text
IE >= 11
```

Install [Babel Compiler](https://babeljs.io/docs/en/) packages:

```bash
npm install @babel/core @babel/preset-env --save-dev
```

Unlike some packages, EF is published as a set of ES modules using modern ES2020 JavaScript. When you build your application for legacy browsers you must explicitly include the ES2020 packages. At least the following list must be transpiled:

- @refinitiv-ui
- @webcomponents
- @lit
- lit
- lit-element
- lit-html
- d3-color
- lightweight-charts

@> The new versions of dependant packages might be published as ES2020 and *must* be included as well.

### Webpack 5

`Webpack` uses [babel-loader](https://www.npmjs.com/package/babel-loader) to transpile JavaScript:

```bash
npm install babel-loader
```

Your `Webpack` need to include this configuration to compile into ES5:

```javascript
module.exports = {
  // Ensure that the output is targeted ES5 format
  target: ['web', 'es5'],
  module: {
    rules: [{
      test: /\.m?js$/,
      include: [
        // Do not forget to include own project if modern JavaScript us used
        path.resolve(__dirname, 'src'),
        // Include packages that must be transpiled
        path.resolve(__dirname, 'node_modules/@refinitiv-ui'),
        path.resolve(__dirname, 'node_modules/@webcomponents'),
        path.resolve(__dirname, 'node_modules/@lit'),
        path.resolve(__dirname, 'node_modules/lit'),
        path.resolve(__dirname, 'node_modules/lit-element'),
        path.resolve(__dirname, 'node_modules/lit-html'),
        path.resolve(__dirname, 'node_modules/d3-color'),
        path.resolve(__dirname, 'node_modules/lightweight-charts')
      ],
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                corejs: {
                  version: 3,
                  proposals: true
                },
                useBuiltIns: 'usage'
              }
            ]
          ]
        }
      }
    }]
   }
};
```
