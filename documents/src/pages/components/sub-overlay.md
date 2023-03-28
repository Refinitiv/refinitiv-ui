<!--
type: page
title: Sub Overlay
location: ./components/sub-overlay
layout: default
-->

# Sub Overlay

```html
<ui-sub-overlay opened>
  <div>Overlay Content</div>
</ui-sub-overlay>
```

::
```html
<link href="./resources/components.css" rel="stylesheet"/>
<style>
  body {
    height: 300px;
  }
</style>
<ui-sub-overlay opened>
  <div>Overlay Content</div>
</ui-sub-overlay>
```
```js
import "./resources/components.js"
```
::


## Density = Dense
::
```html
<link href="./resources/components.css" rel="stylesheet"/>
<style>
  body {
    height: 300px;
  }
</style>
<ui-sub-overlay opened>
  <div>Overlay Content</div>
</ui-sub-overlay>
```
```js
import "./resources/components.js"
document.documentElement.setAttribute("prefers-density", "dense")
```
::

## Density = Compact
::
```html
<link href="./resources/components.css" rel="stylesheet"/>
<style>
  body {
    height: 300px;
  }
</style>
<ui-sub-overlay opened>
  <div>Overlay Content</div>
</ui-sub-overlay>
```
```js
import "./resources/components.js"
document.documentElement.setAttribute("prefers-density", "compact")
```
::