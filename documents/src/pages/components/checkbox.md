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
<link href="./resources/components.css" rel="stylesheet"/>
<ui-checkbox checked>Task 1</ui-checkbox>
<ui-checkbox>Task 2</ui-checkbox>

```
```js
import "./resources/components.js"
```
::

## Density = Dense
::
```html
<link href="./resources/components.css" rel="stylesheet"/>
<ui-checkbox checked>Task 1</ui-checkbox>
<ui-checkbox>Task 2</ui-checkbox>
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
<ui-checkbox checked>Task 1</ui-checkbox>
<ui-checkbox>Task 2</ui-checkbox>
```
```js
import "./resources/components.js"
document.documentElement.setAttribute("prefers-density", "compact")
```
::