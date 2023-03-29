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
::import-themes::
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
<ui-sub-select>
  <ui-option value="a">Option A</ui-option>
  <ui-option value="b">Option B</ui-option>
</ui-sub-select>
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
<ui-sub-select>
  <ui-option value="a">Option A</ui-option>
  <ui-option value="b">Option B</ui-option>
</ui-sub-select>
```
```js
::import-components::
document.documentElement.setAttribute("prefers-density", "compact")
```
::