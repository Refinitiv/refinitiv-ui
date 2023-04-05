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
::import-themes::
<ui-input-field label="User ID"></ui-input-field>
<ui-input-field label="Password" type="password"></ui-input-field>
```
```js
::import-components::
```
::

## Density = Dense
::
```html
::import-themes::
<ui-input-field label="User ID"></ui-input-field>
<ui-input-field label="Password" type="password"></ui-input-field>
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
<ui-input-field label="User ID"></ui-input-field>
<ui-input-field label="Password" type="password"></ui-input-field>
```
```js
::import-components::
document.documentElement.setAttribute("prefers-density", "compact")
```
::