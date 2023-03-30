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
::import-themes::
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
::import-components::
```
::


## Density = Dense
::
```html
::import-themes::
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
::import-components::
document.documentElement.setAttribute("prefers-density", "dense")
```
::

## Density = Compact
::
```html
::import-themes::
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
::import-components::
document.documentElement.setAttribute("prefers-density", "compact")
```
::