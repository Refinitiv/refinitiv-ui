<!--
type: page
title: Theme Switching
location: ./guides/theme-switching
layout: default
-->

# Theme Switching

EF provides packages for elements and themes separately. This decoupling allows more flexibility for applications to implement theme switching.

The techniques for implementing theme switching can vary, depending on how the application is structured. This guideline shows one approach.

In this example, we recommend splitting components and themes into different bundle files, so you can load another theme without having to reload the component bundle. That approach will reduce duplicate code in the bundle and keep the overall bundle size in your application smaller.

---

### 1. Install EF theme

```sh
 npm install @refinitiv-ui/halo-theme
```

### 2. Create theme entry point

The Halo theme contains **dark** and **light** variants. Let's make one entry point for one variant.

```javascript
// theme.dark.js

import '@refinitiv-ui/halo-theme/dark/imports/native-elements';
import '@refinitiv-ui/elements/panel/themes/halo/dark';
import '@refinitiv-ui/elements/header/themes/halo/dark';
```

```javascript
// theme.light.js

import '@refinitiv-ui/halo-theme/light/imports/native-elements';
import '@refinitiv-ui/elements/panel/themes/halo/light';
import '@refinitiv-ui/elements/header/themes/halo/light';
```

### 3. Create theme loader

We'll assume that your application sets the user preferred `theme` as the theme attribute in the document body. We will use this information to determine which theme entry point the app should load.

In the same directory, create a theme loader that dynamically imports the theme variant accordingly.

```javascript
// theme-loader.js
export function loadTheme() {
  const theme = document.body.getAttribute("theme"); // value can be `light` or `dark`
  return import(`./theme.${theme}`); // provided that theme.light.js & theme.dark.js are in the same directory
}
```

### 4. Add theme loader

Your application can add an event listener to the `theme` attribute and call `onThemeChanges()` whenever the value is changed.

```javascript
import '@refinitiv-ui/elements/panel';
import '@refinitiv-ui/elements/header';

import { loadTheme } from './theme-loader';

function onThemeChanges() {
  loadTheme();
}
```
