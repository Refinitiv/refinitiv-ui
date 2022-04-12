<!--
type: page
title: Vue
location: ./integrations/vue
layout: default
-->

<div style="float:right">
  <a href="https://vuejs.org/" target="_blank">vuejs.org</a>
</div>

# Vue Guide

@>This guideline uses Vue 3 and Vue CLI v4.5.13

Install Vue CLI.

```sh
npm install -g @vue/cli
```

## Initialize your project

Create your new Vue application using the `vue create` command.

```sh
vue create my-app
cd my-app
```

Once your application has been created and configured using the command line prompts, you should be able to serve the application.

```sh
npm run serve
```

## Install ELF elements and themes

Install EF elements and themes.

```sh
npm install @refinitiv-ui/elements
npm install @refinitiv-ui/halo-theme
```

Import elements that you want to use and themes in `src/main.js`.

```javascript
import '@refinitiv-ui/elements/loader';
import '@refinitiv-ui/elements/button';
import '@refinitiv-ui/elements/panel';
import '@refinitiv-ui/elements/text-field';
import '@refinitiv-ui/elements/password-field';

import '@refinitiv-ui/halo-theme/dark/imports/native-elements';
import '@refinitiv-ui/elements/loader/themes/halo/dark';
import '@refinitiv-ui/elements/button/themes/halo/dark';
import '@refinitiv-ui/elements/panel/themes/halo/dark';
import '@refinitiv-ui/elements/text-field/themes/halo/dark';
import '@refinitiv-ui/elements/password-field/themes/halo/dark';
```

If you're already migrated or using Webpack 5, you can import module by using a shorter path.

```javascript
import '@refinitiv-ui/elements/loader';
import '@refinitiv-ui/elements/button';
import '@refinitiv-ui/elements/panel';
import '@refinitiv-ui/elements/text-field';
import '@refinitiv-ui/elements/password-field';

import '@refinitiv-ui/halo-theme/dark/imports/native-elements';
import '@refinitiv-ui/elements/loader/themes/halo/dark';
import '@refinitiv-ui/elements/button/themes/halo/dark';
import '@refinitiv-ui/elements/panel/themes/halo/dark';
import '@refinitiv-ui/elements/text-field/themes/halo/dark';
import '@refinitiv-ui/elements/password-field/themes/halo/dark';
```

Components can be used like any other native `HTMLElement`. Try replacing content in `src/App.vue` with the code below.

```html
<template>
  <ef-panel id="login-page" spacing>
    <ef-loader v-if="loading"></ef-loader>
    <template v-else>
      <h1>{{ title }}</h1>
      <ef-text-field placeholder="Username"></ef-text-field>
      <ef-password-field placeholder="Password"></ef-password-field>
      <div id="button-group">
        <ef-button @click="login">Login</ef-button>
        <ef-button>Cancel</ef-button>
      </div>
    </template>
  </ef-panel>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      title: 'Hello!',
      loading: false,
    };
  },
  methods: {
    login() {
      this.loading = true;

      setTimeout(() => {
        this.title = 'Done!';
        this.loading = false;
      }, 3000);
    },
  },
};
</script>

<style>
#login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 450px;
  height: 200px;
  margin: 40px auto;
}

#button-group {
  margin: 10px 0;
}
</style>
```

Finally, try starting your app and it should be available to access through `http://localhost:8080/`.

```sh
npm run serve
```

## Testing with Jest

To use the Jest on your Vue project, you need to add Jest plugin to your application by the following command.

```sh
vue add unit-jest
```

### Jest configuration

By default, Jest doesn't transform dependencies inside `/node_modules` folder, it will not understand the code and resulting in syntax error. You need to use `transformIgnorePatterns` to allow transpiling EF modules, and other modules if requires [see more](https://jestjs.io/docs/configuration#transformignorepatterns-arraystring).
Additionally, Jest doesn't support package exports feature in package.json yet – this has been supported in new modern bundlers e.g. WebPack 5. As a result, Jest wouldn't be able to find importing modules in your application. You can resolve this by using `moduleNameMapper` in Jest configuration, `jest.config.js`.

```js
  transformIgnorePatterns: ["node_modules/(?!@refinitiv-ui)/"],
  moduleNameMapper: {
    "@refinitiv-ui/elements/((?!lib).*)$": "<rootDir>/node_modules/@refinitiv-ui/elements/lib/$1"
  }
```

::footer::
