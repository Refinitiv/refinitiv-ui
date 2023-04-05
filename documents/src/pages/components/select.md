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
::import-themes::
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
<ui-select label="Tropical Fruits" value="mango">
  <ui-option value="banana">Banana</ui-option>
  <ui-option value="mango">Mango</ui-option>
</ui-select>
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
<ui-select label="Tropical Fruits" value="mango">
  <ui-option value="banana">Banana</ui-option>
  <ui-option value="mango">Mango</ui-option>
</ui-select>
```
```js
::import-components::
document.documentElement.setAttribute("prefers-density", "compact")
```
::