# Supporting Legacy Browsers
Element Framework (EF) is built on top of Lit framework and published as ES2020. The features are supported by latest versions of all modern browsers and build tools.

For legacy browsers, such as IE11 or old Chrome, it is required to compile code to ES5 and include polyfills. Lit has provided [documentation](https://lit.dev/docs/tools/requirements) for better understanding of the topic.

This guideline does not provide definite instructions to make your application working in old browsers, but rather focuses on essential information related to EF.

Legacy browsers require the following features:

* Polyfills for Web Components
* Convert ES2020 syntax into ES5
* Polyfills for ES2020
* Polyfills for i18n

## Polyfills for Web Components
EF is built using [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) standards. Old browsers may not support _Web Components_ natively, therefore polyfills are required. EF curates necessary polyfills as `@refinitiv-ui/polyfills`.

```bash
npm install @refinitiv-ui/polyfills
```

You must import this module in your app before any EF components.

```js
import '@refinitiv-ui/polyfills';
```

## Convert ES2020 syntax into ES5
EF components are published using ES2020 syntax and many old browsers do not support it. `Babel` is popular tools to convert modern JavaScript to ES5.

```bash
npm install @babel/core --save-dev
```

Create or edit `.browserslistrc` at your application root directory to include environments that you need to support. See more about [browserslist](https://github.com/browserslist/browserslist). For instance, if your application need to support IE11 add this line:

```text
IE >= 11
```

Configure your build tool, to include these modules into Babel compilation list:

- @refinitiv-ui
- @webcomponents
- @lit
- lit
- lit-element
- lit-html
- d3-color
- lightweight-charts

> The new versions of other dependencies might be published as modules in the future. Includes them if that is the case.

## Polyfills for ES2020
Old browsers do not support many features of ES2020. `core-js` is a standard library that includes polyfills for ES2020+:

While you can manually include core-js polyfills, we recommend to use [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env) to automatically inject required polyfills based on your code and supported environments.

```bash
npm install core-js
```

```bash
npm install @babel/preset-env --save-dev
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

## Polyfills for i18n
Some EF components use [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) features, which may not be available in old browsers so the polyfills are required.

These polyfills significantly increase the size of the bundle. We recommend to only include the supported languages.

```sh
npm install @formatjs/intl-getcanonicallocales @formatjs/intl-locale @formatjs/intl-numberformat @formatjs/intl-pluralrules @formatjs/intl-datetimeformat
```

Import polyfills into your app:

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

## Configuration examples
### Webpack 5
`Webpack` uses [babel-loader](https://www.npmjs.com/package/babel-loader) to transpile JavaScript.

Install babel-loader and other necessary dependencies.

```bash
npm install core-js
```

```bash
npm install babel-loader @babel/core @babel/preset-env --save-dev
```

Create or edit `.browserslistrc` at your app root directory as per instructions in the previous section.

Merge this configuration with your WebPack configuration:

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
