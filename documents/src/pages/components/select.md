<!--
type: page
title: Select
location: ./components/select
layout: default
-->

# Select

```html
<ui-select label="Tropical Fruits" value="mango">
  <ui-option value="banana">Banana</ui-option>
  <ui-option value="mango">Mango</ui-option>
</ui-select>
```

::
```html
<link href="./resources/components.css" rel="stylesheet"/>
<style>
  body {
    height: 300px;
  }
</style>
<ui-select label="Tropical Fruits" value="mango">
  <ui-option value="banana">Banana</ui-option>
  <ui-option value="mango">Mango</ui-option>
</ui-select>
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
<ui-select label="Tropical Fruits" value="mango">
  <ui-option value="banana">Banana</ui-option>
  <ui-option value="mango">Mango</ui-option>
</ui-select>
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
<ui-select label="Tropical Fruits" value="mango">
  <ui-option value="banana">Banana</ui-option>
  <ui-option value="mango">Mango</ui-option>
</ui-select>
```
```js
import "./resources/components.js"
document.documentElement.setAttribute("prefers-density", "compact")
```
::