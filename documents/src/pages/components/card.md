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
::import-themes::
<ui-card>
  <div>Card Content</div>
</ui-card>
```
```js
::import-components::
```
::

## Density = Dense
::
```html
::import-themes::
<ui-card>
  <div>Card Content</div>
</ui-card>
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
<ui-card>
  <div>Card Content</div>
</ui-card>
```
```js
::import-components::
document.documentElement.setAttribute("prefers-density", "compact")
```
::