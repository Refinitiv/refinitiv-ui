<!--
type: page
title: Element Framework v5
description: Welcome to Element Framework
location: ./quick-start
layout: default
-->

# Quick Start

Using a build tool, like [Vite](https://vitejs.dev) or [Parcel](https://parceljs.org/) is recommended to get started quickly. These allow you to quickly prototype and serve your application with minimal to no configuration.

## Installation

Components are published as a single package and provide all foundational building blocks required to build an application. Themes must be installed in order to initialize the components.

```bash
npm install @refinitiv-ui/elements
npm install @refinitiv-ui/halo-theme
```

@> Halo is the official theme for Refinitiv products.

## Usage

Start using an element by importing the element and its theme in your app.

```javascript
// import elements
import '@refinitiv-ui/elements/button';
import '@refinitiv-ui/elements/panel';
// import native styles for typography, css variables, etc.
import '@refinitiv-ui/halo-theme/dark/imports/native-elements';
// import element's Halo dark theme
import '@refinitiv-ui/elements/button/themes/halo/dark';
import '@refinitiv-ui/elements/panel/themes/halo/dark';
```

Now, you can use the elements in your app.

```html
<ef-panel spacing>
  <h2>Hello EF!</h2>
  <ef-button cta>OK</ef-button>
</ef-panel>
```

## Legacy Bundlers
Many legacy bundlers, like Webpack 4, do not support [package exports](https://webpack.js.org/guides/package-exports/). Therefore, the developer needs to resolve paths manually.

For WebPack 4 this can be done providing `alias` in `webpack.config.js`:

```javascript
const path = require('path');

// Ensure the correct directory for `@refinitiv-ui` package
const modulePath = path.resolve(process.cwd(), 'node_modules');

module.exports = {
  /// ...
  resolve: {
    alias: {
      '@refinitiv-ui/elements': path.resolve(modulePath, '@refinitiv-ui/elements/lib'),
      '@refinitiv-ui/core': path.resolve(modulePath, '@refinitiv-ui/core/lib'),
      '@refinitiv-ui/utils': path.resolve(modulePath, '@refinitiv-ui/utils/lib')
    }
  }
}
```

## Font licensing
::proximanovawarning::

## Build your first app
Start building your first application using EF with your favourite frameworks: [Angular](/integrations/angular), [React](/integrations/react), [Vue](/integrations/vue) or without using framework, [Vanilla](/integrations/javascript).


::footer::
