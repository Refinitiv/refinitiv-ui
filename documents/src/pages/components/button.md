<!--
type: page
title: Button
location: ./components/button
layout: default
-->

# Button

```html
<ui-button>Label</ui-button>
<ui-button icon-end="arrow-right">Label</ui-button>
<ui-button icon-end="arrow-right" variant="primary">Label</ui-button>
```

::
```html
<link href="./resources/components.css" rel="stylesheet"/>
<ui-button>Label</ui-button>
<ui-button icon-end="arrow-right">Label</ui-button>
<ui-button icon-end="arrow-right" variant="primary">Label</ui-button>
```
```js
import "./resources/components.js"
```
::

## Density = Dense
::
```html
<link href="./resources/components.css" rel="stylesheet"/>
<ui-button>Label</ui-button>
<ui-button icon-end="arrow-right">Label</ui-button>
<ui-button icon-end="arrow-right" variant="primary">Label</ui-button>
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
<ui-button>Label</ui-button>
<ui-button icon-end="arrow-right">Label</ui-button>
<ui-button icon-end="arrow-right" variant="primary">Label</ui-button>
```
```js
import "./resources/components.js"
document.documentElement.setAttribute("prefers-density", "compact")
```
::