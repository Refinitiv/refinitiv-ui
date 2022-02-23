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

## Installation
EF elements are published as one package. You are also require to install theme package as it will provide essential native styles for typography, theme css variables, etc.

```bash
npm install @refinitiv-ui/elements
npm install @refinitiv-ui/halo-theme
```

Start using an element by importing the element and its theme in your app.

```javascript
// import elements
import '@refinitiv-ui/elements/lib/button';
import '@refinitiv-ui/elements/lib/panel';
// import native styles for typography, css variables, etc.
import '@refinitiv-ui/halo-theme/dark/imports/native-elements';
// import element's Halo dark theme
import '@refinitiv-ui/elements/lib/button/themes/halo/dark';
import '@refinitiv-ui/elements/lib/panel/themes/halo/dark';
```

If you're using any modern bundlers e.g. Webpack 5, you can import module by using a shorter path.

```javascript
import '@refinitiv-ui/elements/button';
import '@refinitiv-ui/halo-theme/dark/imports/native-elements';
import '@refinitiv-ui/elements/button/themes/halo/dark';
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

## Font licensing
::proximanovawarning::

## Build your first app
Start building your first application using EF with your favourite frameworks: [Angular](/integrations/angular), [React](/integrations/react), [Vue](/integrations/vue) or without using framework, [Vanilla](/integrations/javascript).


::footer::
