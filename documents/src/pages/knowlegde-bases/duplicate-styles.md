<!--
type: page
title: Duplicate Styles
location: ./kb/duplicate-styles
layout: default
-->

# Duplicate Styles
## Potential Causes


You are trying to load a multiple variants of a theme or duplicate themes in your application bundle.

**Example of Loaded multiple variants of the theme**

x> Incorrect
```js
import '@refinitiv-ui/elements/button/themes/halo/dark';
import '@refinitiv-ui/elements/button/themes/halo/light';
```

**Example of Loaded duplicate file of the theme**

x> Incorrect
```js
import "@refinitiv-ui/elements/button/themes/halo/light";
import "@refinitiv-ui/halo-theme/light/ef-button.js";
```

**Only one theme can be loaded per element**

o>Correct
```js
import '@refinitiv-ui/elements/button/themes/halo/dark';
```


::footer::
