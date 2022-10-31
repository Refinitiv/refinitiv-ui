<!--
type: page
title: Vanilla JavaScript
location: ./guides/bundling-configuration
layout: default
-->

# Bundling Configuration
EF elements are Web Component. They can be used with JavaScript frameworks or without a framework. This guideline provides how you can use EF elements with bundling tool.

## Vite
[Vite](https://vitejs.dev/) is a built tool for javascript and typescript project. It is very fast and provides a lot of features with minimum configuration to getting start with.

Create a new project and install Vite.

```
mkdir vite-sample
cd vite-sample
npm init
npm i @refinitiv-ui/elements @refinitiv-ui/halo-theme
npm i -D vite
```
Create `src` folder and main file, `index.js`, inside the `src` folder. Import EF elements in the main file.

```javascript
// Components
import '@refinitiv-ui/elements/button';
import '@refinitiv-ui/elements/panel';
import '@refinitiv-ui/elements/text-field';
import '@refinitiv-ui/elements/password-field';
// Themes
import '@refinitiv-ui/halo-theme/dark/imports/native-elements';
import '@refinitiv-ui/elements/button/themes/halo/dark';
import '@refinitiv-ui/elements/panel/themes/halo/dark';
import '@refinitiv-ui/elements/text-field/themes/halo/dark';
import '@refinitiv-ui/elements/password-field/themes/halo/dark';
```

Then at the root directory of the project, create `index.html` with following content.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <script type="module" src="./src/index.js"></script>
    <ef-panel class="panel" spacing>
      <h1>Hello!</h1>
      <ef-text-field class="input" placeholder="Username"></ef-text-field>
      <ef-password-field
        class="input"
        placeholder="Password"
      ></ef-password-field>
      <div class="btn-container">
        <ef-button cta disabled>Login</ef-button>
        <ef-button>Cancel</ef-button>
      </div>
    </ef-panel>
    <script>
      const username = document.querySelector("ef-text-field");
      const password = document.querySelector("ef-password-field");
      const loginButton = document.querySelector("ef-button");

      const onTextChanges = function () {
        if (username.value.length === 0 || password.value.length === 0) {
          loginButton.disabled = true;
        } else {
          loginButton.disabled = false;
        }
      };

      username.addEventListener("value-changed", onTextChanges);
      password.addEventListener("value-changed", onTextChanges);

      loginButton.addEventListener("tap", function () {
        document.querySelector("h1").textContent = "Done!";
      });
    </script>
    <style>
      .panel {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 400px;
        height: 300px;
        margin: 10em auto;
      }
      .input {
        margin-top: 8px;
      }
      .btn-container {
        display: flex;
        margin: 12px 0;
      }
      .btn-container ef-button {
        margin: 0 8px;
      }
    </style>
  </body>
</html>
```

Add scripts to `package.json`.

```json
"scripts": {
  "start": "vite --port=8888",
  "build": "vite build",
  "preview": "vite preview"
}
```

Run `npm start` to start development server and run your app. Use `npm build` to build production package.

## WebPack 5
[webpack](https://webpack.js.org/) is a static module bundler which helps to resolve modules import path, process and pack them into production-ready files. While `webpack-dev-server` will serves a webpack app and updates the browser on changes.

Create a new project and install webpack.

```sh
mkdir webpack-sample
cd webpack-sample
npm init
npm i @refinitiv-ui/elements @refinitiv-ui/halo-theme
npm i -D webpack webpack-cli webpack-dev-server
```

Create `src` folder, new main file in the `src` folder, `index.js` and import EF elements.

```javascript
// Components
import '@refinitiv-ui/elements/button';
import '@refinitiv-ui/elements/panel';
import '@refinitiv-ui/elements/text-field';
import '@refinitiv-ui/elements/password-field';
// Themes
import '@refinitiv-ui/halo-theme/dark/imports/native-elements';
import '@refinitiv-ui/elements/button/themes/halo/dark';
import '@refinitiv-ui/elements/panel/themes/halo/dark';
import '@refinitiv-ui/elements/text-field/themes/halo/dark';
import '@refinitiv-ui/elements/password-field/themes/halo/dark';
```

Then at the root directory of the project, create `index.html` with following content.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <script src="./dist/index.js"></script>
    <ef-panel class="panel" spacing>
      <h1>Hello!</h1>
      <ef-text-field class="input" placeholder="Username"></ef-text-field>
      <ef-password-field
        class="input"
        placeholder="Password"
      ></ef-password-field>
      <div class="btn-container">
        <ef-button cta disabled>Login</ef-button>
        <ef-button>Cancel</ef-button>
      </div>
    </ef-panel>
    <script>
      const username = document.querySelector("ef-text-field");
      const password = document.querySelector("ef-password-field");
      const loginButton = document.querySelector("ef-button");

      const onTextChanges = function () {
        if (username.value.length === 0 || password.value.length === 0) {
          loginButton.disabled = true;
        } else {
          loginButton.disabled = false;
        }
      };

      username.addEventListener("value-changed", onTextChanges);
      password.addEventListener("value-changed", onTextChanges);

      loginButton.addEventListener("tap", function () {
        document.querySelector("h1").textContent = "Done!";
      });
    </script>
    <style>
      .panel {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 400px;
        height: 300px;
        margin: 10em auto;
      }
      .input {
        margin-top: 8px;
      }
      .btn-container {
        display: flex;
        margin: 12px 0;
      }
      .btn-container ef-button {
        margin: 0 8px;
      }
    </style>
  </body>
</html>
```

Create a file name `webpack.config.js` at the project root and paste the following configuration.

```javascript
const path = require('path');

module.exports = {
  target: ['web', 'es6'],
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  // devtool: "inline-source-map", // add this if want to debug
  devServer: {
    static: {
      directory: path.resolve(__dirname, './'),
    }
  },
  module: {
    rules: [{
      test: /\.m?js$/,
      include: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'node_modules/@refinitiv-ui'),
        path.resolve(__dirname, 'node_modules/@webcomponents'),
        path.resolve(__dirname, 'node_modules/@lit'),
        path.resolve(__dirname, 'node_modules/lit-element'),
        path.resolve(__dirname, 'node_modules/lit-html'),
        path.resolve(__dirname, 'node_modules/d3-color'),
        path.resolve(__dirname, 'node_modules/lightweight-charts')
      ]
    }]
  }
};
```

Add scripts to `package.json`.

```json
"scripts": {
  "start": "webpack-cli serve --compress --host 0.0.0.0 --mode production",
  "build": "webpack --config webpack.config.js --mode production"
}
```

Finally, run `npm run build` and then `npm start`.

## WebPack 4
Legacy [webpack](https://webpack.js.org/) do not support package exports. Therefore, paths will need to be resolved manually by using `alias`. Additionally, it is required more configuration to use Babel to transform new ES syntax and include runtime code generator.

Create a new project and install webpack.

```sh
mkdir webpack-sample
cd webpack-sample
npm init
npm i @refinitiv-ui/elements @refinitiv-ui/halo-theme
npm i -D webpack@4 webpack-cli webpack-dev-server @babel/core @babel/plugin-transform-runtime @babel/preset-env babel-loader
```

Create `src` folder, new main file in the `src` folder, `index.js` and import EF elements.

```javascript
// Components
import '@refinitiv-ui/elements/button';
import '@refinitiv-ui/elements/panel';
import '@refinitiv-ui/elements/text-field';
import '@refinitiv-ui/elements/password-field';
// Themes
import '@refinitiv-ui/halo-theme/dark/imports/native-elements';
import '@refinitiv-ui/elements/button/themes/halo/dark';
import '@refinitiv-ui/elements/panel/themes/halo/dark';
import '@refinitiv-ui/elements/text-field/themes/halo/dark';
import '@refinitiv-ui/elements/password-field/themes/halo/dark';
```

Then at the root directory of the project, create `index.html` with following content.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <script src="./dist/index.js"></script>
    <ef-panel class="panel" spacing>
      <h1>Hello!</h1>
      <ef-text-field class="input" placeholder="Username"></ef-text-field>
      <ef-password-field
        class="input"
        placeholder="Password"
      ></ef-password-field>
      <div class="btn-container">
        <ef-button cta disabled>Login</ef-button>
        <ef-button>Cancel</ef-button>
      </div>
    </ef-panel>
    <script>
      const username = document.querySelector("ef-text-field");
      const password = document.querySelector("ef-password-field");
      const loginButton = document.querySelector("ef-button");

      const onTextChanges = function () {
        if (username.value.length === 0 || password.value.length === 0) {
          loginButton.disabled = true;
        } else {
          loginButton.disabled = false;
        }
      };

      username.addEventListener("value-changed", onTextChanges);
      password.addEventListener("value-changed", onTextChanges);

      loginButton.addEventListener("tap", function () {
        document.querySelector("h1").textContent = "Done!";
      });
    </script>
    <style>
      .panel {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 400px;
        height: 300px;
        margin: 10em auto;
      }
      .input {
        margin-top: 8px;
      }
      .btn-container {
        display: flex;
        margin: 12px 0;
      }
      .btn-container ef-button {
        margin: 0 8px;
      }
    </style>
  </body>
</html>
```

Create a file name `webpack.config.js` at the project root and paste the following configuration.

```javascript
const path = require('path');
// Ensure the correct directory for `@refinitiv-ui` package
const modulePath = path.resolve(process.cwd(), 'node_modules');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  // devtool: "inline-source-map", // add this if want to debug
  devServer: {
    static: {
      directory: path.resolve(__dirname, './'),
    }
  },
  module: {
    rules: [{
      test: /\.m?js$/,
      include: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'node_modules/@refinitiv-ui'),
        path.resolve(__dirname, 'node_modules/@webcomponents'),
        path.resolve(__dirname, 'node_modules/@lit'),
        path.resolve(__dirname, 'node_modules/lit-element'),
        path.resolve(__dirname, 'node_modules/lit-html'),
        path.resolve(__dirname, 'node_modules/d3-color'),
        path.resolve(__dirname, 'node_modules/lightweight-charts')
      ],
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
          plugins: ["@babel/plugin-transform-runtime"],
        },
      }
    }]
  },
  resolve: {
    alias: {
      '@refinitiv-ui/elements': path.resolve(modulePath, '@refinitiv-ui/elements/lib'),
      '@refinitiv-ui/core': path.resolve(modulePath, '@refinitiv-ui/core/lib'),
      '@refinitiv-ui/utils': path.resolve(modulePath, '@refinitiv-ui/utils/lib'),
      '@refinitiv-ui/phrasebook': path.resolve(modulePath, '@refinitiv-ui/phrasebook/lib'),
      '@refinitiv-ui/i18n': path.resolve(modulePath, '@refinitiv-ui/i18n/lib')
    }
  }
};
```

Add scripts to `package.json`.

```json
"scripts": {
  "start": "webpack-cli serve --compress --host 0.0.0.0 --mode production",
  "build": "webpack --config webpack.config.js --mode production"
}
```

Finally, run `npm run build` and then `npm start`.

::footer::
