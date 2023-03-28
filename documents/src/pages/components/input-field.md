<!--
type: page
title: Input Field
location: ./components/input-field
layout: default
-->

# Input Field

```html
<ui-input-field label="User ID"></ui-input-field>
<ui-input-field label="Password" type="password"></ui-input-field>
```

::
```html
<link href="./resources/components.css" rel="stylesheet"/>
<ui-input-field label="User ID"></ui-input-field>
<ui-input-field label="Password" type="password"></ui-input-field>
```
```js
import "./resources/components.js"
```
::

## Density = Dense
::
```html
<link href="./resources/components.css" rel="stylesheet"/>
<ui-input-field label="User ID"></ui-input-field>
<ui-input-field label="Password" type="password"></ui-input-field>
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
<ui-input-field label="User ID"></ui-input-field>
<ui-input-field label="Password" type="password"></ui-input-field>
```
```js
import "./resources/components.js"
document.documentElement.setAttribute("prefers-density", "compact")
```
::