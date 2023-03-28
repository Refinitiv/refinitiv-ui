<!--
type: page
title: Card
location: ./components/card
layout: default
-->

# Card

```html
<ui-card>
  <div>Card Content</div>
</ui-card>
```

::
```html
<link href="./resources/components.css" rel="stylesheet"/>
<ui-card>
  <div>Card Content</div>
</ui-card>
```
```js
import "./resources/components.js"
```
::

## Density = Dense
::
```html
<link href="./resources/components.css" rel="stylesheet"/>
<ui-card>
  <div>Card Content</div>
</ui-card>
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
<ui-card>
  <div>Card Content</div>
</ui-card>
```
```js
import "./resources/components.js"
document.documentElement.setAttribute("prefers-density", "compact")
```
::