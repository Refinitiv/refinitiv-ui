<!--
type: page
title: Check Box
location: ./components/checkbox
layout: default
-->

# Check Box

```html
<ui-checkbox checked>Task 1</ui-checkbox>
<ui-checkbox>Task 2</ui-checkbox>
```

::
```html
::import-themes::
<ui-checkbox checked>Task 1</ui-checkbox>
<ui-checkbox>Task 2</ui-checkbox>

```
```js
::import-components::
```
::

## Density = Dense
::
```html
::import-themes::
<ui-checkbox checked>Task 1</ui-checkbox>
<ui-checkbox>Task 2</ui-checkbox>
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
<ui-checkbox checked>Task 1</ui-checkbox>
<ui-checkbox>Task 2</ui-checkbox>
```
```js
::import-components::
document.documentElement.setAttribute("prefers-density", "compact")
```
::