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
::import-themes::
<ui-pattern-button-group>
  <ui-button variant="primary">Sign In</ui-button>
  <ui-button>Cancel</ui-button>
</ui-pattern-button-group>
```
```js
::import-components::
```
::


## Density = Dense
::
```html
::import-themes::
<ui-pattern-button-group>
  <ui-button variant="primary">Sign In</ui-button>
  <ui-button>Cancel</ui-button>
</ui-pattern-button-group>
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
<ui-pattern-button-group>
  <ui-button variant="primary">Sign In</ui-button>
  <ui-button>Cancel</ui-button>
</ui-pattern-button-group>
```
```js
::import-components::
document.documentElement.setAttribute("prefers-density", "compact")
```
::