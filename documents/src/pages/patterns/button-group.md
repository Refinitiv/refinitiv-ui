<!--
type: page
title: Button Group
location: ./patterns/button-group
layout: default
-->

# Button Group

```html
<ui-pattern-button-group>
  <ui-button variant="primary">Sign In</ui-button>
  <ui-button>Cancel</ui-button>
</ui-pattern-button-group>
```

::
```html
<link href="./resources/components.css" rel="stylesheet"/>
<ui-pattern-button-group>
  <ui-button variant="primary">Sign In</ui-button>
  <ui-button>Cancel</ui-button>
</ui-pattern-button-group>
```
```js
import "./resources/components.js"
```
::


## Density = Dense
::
```html
<link href="./resources/components.css" rel="stylesheet"/>
<ui-pattern-button-group>
  <ui-button variant="primary">Sign In</ui-button>
  <ui-button>Cancel</ui-button>
</ui-pattern-button-group>
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
<ui-pattern-button-group>
  <ui-button variant="primary">Sign In</ui-button>
  <ui-button>Cancel</ui-button>
</ui-pattern-button-group>
```
```js
import "./resources/components.js"
document.documentElement.setAttribute("prefers-density", "compact")
```
::