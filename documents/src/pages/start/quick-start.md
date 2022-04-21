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

Components are published as a single package and provide all foundational building blocks required to build an application.

```bash
npm install @refinitiv-ui/elements
```

Halo is the official theme for Refinitiv products. It's provided to correctly initialize your application with correct styling and typography.

```bash
npm install @refinitiv-ui/halo-theme
```

## Usage

Start using components by importing their definitions and themes in your HTML file. Using `script[type=module]` allows us to import EF modules.

```html
<script type="module">
  // import elements
  import '@refinitiv-ui/elements/button';
  import '@refinitiv-ui/elements/panel';
  // import styles for typography, body and other native inbuilt elements.
  import '@refinitiv-ui/halo-theme/dark/imports/native-elements';
  // import element themes
  import '@refinitiv-ui/elements/button/themes/halo/dark';
  import '@refinitiv-ui/elements/panel/themes/halo/dark';
</script>
<ef-panel spacing>
  <h2>Hello EF!</h2>
  <ef-button cta>OK</ef-button>
</ef-panel>
```

## Legacy Bundlers
Many legacy bundlers, like Webpack 4, do not support [package exports](https://webpack.js.org/guides/package-exports/). Therefore, paths will need to be resolved manually.

For WebPack 4 this can be achieved by providing `alias` in `webpack.config.js`:

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
