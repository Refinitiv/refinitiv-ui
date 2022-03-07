<!--
type: page
title: Element Framework v5
description: Welcome to Element Framework
location: ./start/installation
layout: default
-->

# What is EF?

Element Framework (EF) is reusable UI components which is part of [Refinitiv Workspace](https://www.refinitiv.com/en/products/refinitiv-workspace)'s SDK family. EF provides a collection of UI elements that includes theming capability with the Refinitiv's design system.

It aims to create a consistent approach to building, reusing and sharing UI components in a modular way to reduce duplication of effort and increase efficiency.

EF elements are built with web components which is a standard web technology that can be utilized across all browsers and can be used with any JavaScript frameworks.

### Installation
EF elements are published as one package. You are also require installing theme package as it will provide essential native styles for typography, theme css variables, etc.

```bash
npm install @refinitiv-ui/elements
npm install @refinitiv-ui/halo-theme
```

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

```css
.content {
  width:100%;
  height: 500px;
}
```

```html
<ef-panel class="content" spacing>
  <h2>Hello EF!</h2>
  <ef-button cta>OK</ef-button>
</ef-panel>
```

### Legacy Bundlers
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

### Font licensing
::proximanovawarning::

### Build your first app
Start building your first application using EF with your favourite frameworks: [Angular](/integrations/angular), [React](/integrations/react), [Vue](/integrations/vue) or without using framework, [Vanilla](/integrations/javascript).


::footer::
