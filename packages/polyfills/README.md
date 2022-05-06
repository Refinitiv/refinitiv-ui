# Supporting Legacy Browsers
Element Framework (EF) is built on top of Lit framework and published as the new JavaScript standards (ES2020). The features are supported by latest versions of all modern browsers and in latest version of most popular tools such as Rollup, Webpack, Babel, and Terser.

For older version of browsers or legacy browsers such as IE11, it is required to compile code to ES5 and include polyfills. Lit has provided a good [documentation](https://lit.dev/docs/tools/requirements) for better understanding of the topic.

Following guidelines are not completed instructions to make your application supports in legacy browsers but focuses on essential information that related to EF.

The most important things to use EF in legacy browsers are :-

* Polyfills for Web Components
* Compiling JavaScript to ES5 syntax and polyfills for ES2020
* Polyfills for i18N features in EF

## Polyfills for Web Components
EF components are Web Components and old browsers does not support _Web Components_ natively. Thus, polyfills is required and EF curates necessary polyfills as `@refinitiv-ui/polyfills`.

Install polyfills for Web Components.

```bash
npm install @refinitiv-ui/polyfills
```

Import this module in your app. You must ensure that the polyfills are imported or loaded before any EF components.

```js
import '@refinitiv-ui/polyfills';
```

## Compiling JavaScript to ES5 syntax and polyfills for ES2020
EF components are published as ES2020. Old browsers may not understand this new syntax or does not support some features of ES2020. Babel is popular tools to compile JavaScript to ES5 syntax and we recommend core-js to polyfills missing features of ES2020.

Install Babel and core-js.

```bash
npm install @babel/core @babel/preset-env core-js --save-dev
```

Configures Babel to compile EF modules and its dependencies that not published as ES5 to be ES5 syntax.

- @refinitiv-ui
- @webcomponents
- @lit
- lit
- lit-element
- lit-html
- d3-color
- lightweight-charts

>The new versions of other dependencies might be published as ES2019/ES2020 in the future. Includes them if it is the case.


Uses [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env) to manage syntax transform and handle polyfills using core-js.

Create or edit `.browserslistrc` at your app root directory to include browsers that you need to support. This file is used by Babel. See more about [browserslist](https://github.com/browserslist/browserslist).

For instance, if your app need to support IE11, you need to add this line in `.browserslistrc`.

```text
IE >= 11
```

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

EF components is required `regenerator-runtime/runtime` so your `babel` configuration would need to include [@babel/plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime) plugin.

```json
{
  "plugins": ["@babel/plugin-transform-runtime"]
}
```

## Polyfills for i18N features in EF
Some EF components uses [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) features in JavaScript. These features may not be available in old browsers so polyfills are required.

As these polyfills could make size of your app significantly bigger and so it will impact on performance, we recommend to include only ones that are required.

```sh
npm install @formatjs/intl-getcanonicallocales @formatjs/intl-locale @formatjs/intl-numberformat @formatjs/intl-pluralrules @formatjs/intl-datetimeformat
```

Import them into your app.

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

## Configuration examples for some bundlers
### Webpack 5
`Webpack` uses [babel-loader](https://www.npmjs.com/package/babel-loader) to transpile JavaScript.

Install babel-loader and other necessary dependencies.

```bash
npm install babel-loader @babel/core @babel/preset-env core-js --save-dev
```

Create or edit `.browserslistrc` at your app root directory to include browsers that you need to support.  For example, add this line if you need to support IE11.

```text
IE >= 11
```

Include this configuration to webpack configuration in your application.

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
