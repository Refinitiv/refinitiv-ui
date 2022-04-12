<!--
type: page
title: Vanilla JavaScript
location: ./integrations/javascript
layout: default
-->

# Without a framework
EF elements are Web Component. They can be used with JavaScript frameworks or without a framework (vanilla JavaScript). This guideline provides how you can use EF elements without a framework, either with bundling tool or without bundling tool.

## Without bundling
It's the simplest and the quickest way for creating a quick standalone demo and getting started with EF. However, without any extra tools it will only support browsers that natively support JavaScript module syntax. [[see list]](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).

EF elements are shipped as ES6 module. To use EF elements without a JavaScript framework, simply include a script with `type=module` into your HTML template.

The following tutorial will guide you through creating a simple login page using EF.

### Initialize your project
Create a new project folder.

```shell
mkdir project-demo
cd project-demo
```

Use `npm init` command to initialize the project. It will create `package.json` file which contains application information and its dependencies.

```shell
npm init
```

### Install EF dependencies
Install element and theme packages using npm.

```shell
npm i @refinitiv-ui/elements
npm i @refinitiv-ui/halo-theme
```

### Project setup
#### Initialize HTML template
Create file `index.html` with a typical HTML template.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>A Simple HTML</title>
  </head>
  <body></body>
</html>
```

#### Import components and theme modules
Create a script `type="module"` tag that imports EF dependencies, then include it to `index.html`.

```html
<script type="module">
  import '@refinitiv-ui/elements/button';
  import '@refinitiv-ui/elements/panel';
  import '@refinitiv-ui/elements/text-field';
  import '@refinitiv-ui/elements/password-field';

  import '@refinitiv-ui/halo-theme/dark/imports/native-elements';
  import '@refinitiv-ui/elements/button/themes/halo/dark';
  import '@refinitiv-ui/elements/panel/themes/halo/dark';
  import '@refinitiv-ui/elements/text-field/themes/halo/dark';
  import '@refinitiv-ui/elements/password-field/themes/halo/dark';
</script>
```

#### Create a login page
Now, we can start adding elements, styling and logics into `index.html`.

```html
<style>
  ef-panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 450px;
    height: 100%;
    margin: 40px auto;
    border: solid 1px #e1e1e1;
  }

  h1 {
    margin-top: 40px;
  }
</style>
<ef-panel spacing>
  <h1>Hello!</h1>
  <ef-text-field placeholder="Username"></ef-text-field>
  <ef-password-field placeholder="Password"></ef-password-field>
  <div>
    <ef-button disabled>Login</ef-button>
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
```

### Serving application
In order to correctly serve **bare modules**, we need a tool that rewrites the path. For the simplicity, we are going to use [es-dev-server](https://github.com/open-wc/es-dev-server)

@> In the browser, import must get either a relative or absolute URL. Modules without any path are called “bare” modules.

At root directory in your sample application, run this command to serve the app.

```bash
npx es-dev-server --node-resolve --watch
```

```live(preview,components,halo-theme-light)
<style>
  ef-panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 450px;
    height: 100%;
    margin: 40px auto;
  }

  ef-button {
    margin: 15px 5px;
  }

  h1 {
    margin-top: 40px;
  }
</style>
<ef-panel spacing>
  <h1>Hello!</h1>
  <ef-text-field placeholder="Username"></ef-text-field>
  <ef-password-field placeholder="Password"></ef-password-field>
  <div>
    <ef-button disabled>Login</ef-button>
    <ef-button>Cancel</ef-button>
  </div>
</ef-panel>
<script>
  const username = document.querySelector('ef-text-field');
  const password = document.querySelector('ef-password-field');
  const loginButton = document.querySelector('ef-button');

  const onTextChanges = function () {
    if (username.value.length === 0 || password.value.length === 0) {
      loginButton.disabled = true;
    } else {
      loginButton.disabled = false;
    }
  };

  username.addEventListener('value-changed', onTextChanges);
  password.addEventListener('value-changed', onTextChanges);

  loginButton.addEventListener('tap', function () {
    document.querySelector('h1').textContent = 'Done!';
  });
</script>
```

## With bundling
On this part of tutorial, you are going to take a step further and look into setting up bundle configuration. In this example, you will build your application to support legacy browsers which are not neither support ES6 nor Web Component.

We are going to use `webpack` as it is one of the most popular bundling tool. However, setup of the other bundling tools would be fundamentally similar.

`webpack` is going to resolve modules import path, process and pack them into production-ready files. While `webpack-dev-server` will serves a webpack app and updates the browser on changes.

```sh
npm i -D webpack@4 webpack-cli webpack-dev-server
```

### Project setup
In `src` folder, create `index.js` and then import EF elements.

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

If you're using any modern bundlers e.g. Webpack 5, you can import module by using a shorter path.

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
    <title>Webpack sample</title>
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

### Configurations
Create a file name `webpack.config.js` at the project root and paste the following configuration.

What this configuration does is setting `webpack` to bundle and transpile a `./src/index.js` and output it to `./dist/index.js`. It will also look for files with extension of `.mjs` and `.js` in the folders that specified in `include` section to transpile it down to ES5 by using babel (by default, babel will not transpile any folders in node_modules).

Note that you may need to update list of folders in the `include` section as some dependencies might has started to ship the module with ES6 instead of ES5.

```javascript
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, './'),
      watch: true
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        include: [
          path.resolve(__dirname, 'node_modules/@refinitiv-ui'),
          path.resolve(__dirname, 'node_modules/@webcomponents'),
          path.resolve(__dirname, 'node_modules/lit-element'),
          path.resolve(__dirname, 'node_modules/lit-html'),
          path.resolve(__dirname, 'node_modules/d3-interpolate')
        ]
      },
    ],
  },
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

You should be able to access the application at [http://localhost:8080/](http://localhost:8080/)

::footer::
