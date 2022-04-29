<!--
type: page
title: Element Framework
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

Halo is the official theme for Refinitiv products. It's provided to correctly initialise your application with correct styling and typography.

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

## Font licensing

::proximanovawarning::

## Build your first app
Start building your first application using EF with your favourite frameworks: [Angular](./tutorials/angular), [React](./tutorials/react), [Vue](./tutorials/vue) or without using framework, [Vanilla](./tutorials/vanilla-js).


::footer::
