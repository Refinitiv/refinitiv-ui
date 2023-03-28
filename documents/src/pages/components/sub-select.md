<!--
type: page
title: Sub Select
location: ./components/sub-select
layout: default
-->

# Sub Select

```html
<ui-sub-select>
  <ui-option value="a">Option A</ui-option>
  <ui-option value="b">Option B</ui-option>
</ui-sub-select>

```

::
```html
<link href="./resources/components.css" rel="stylesheet"/>
<style>
  body {
    height: 300px;
  }
</style>
<ui-sub-select>
  <ui-option value="a">Option A</ui-option>
  <ui-option value="b">Option B</ui-option>
</ui-sub-select>

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
<ui-sub-select>
  <ui-option value="a">Option A</ui-option>
  <ui-option value="b">Option B</ui-option>
</ui-sub-select>
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
<ui-sub-select>
  <ui-option value="a">Option A</ui-option>
  <ui-option value="b">Option B</ui-option>
</ui-sub-select>
```
```js
import "./resources/components.js"
document.documentElement.setAttribute("prefers-density", "compact")
```
::