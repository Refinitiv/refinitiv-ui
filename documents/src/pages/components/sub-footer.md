<!--
type: page
title: Sub Footer
location: ./components/sub-footer
layout: default
-->

# Sub Footer

```html
<ui-sub-footer>
  <div>Footer Content</div>
</ui-sub-footer>
```

::
```html
<link href="./resources/components.css" rel="stylesheet"/>
<ui-sub-footer>
  <div>Footer Content</div>
</ui-sub-footer>
```
```js
import "./resources/components.js"
```
::


## Density = Dense
::
```html
<link href="./resources/components.css" rel="stylesheet"/>
<ui-sub-footer>
  <div>Footer Content</div>
</ui-sub-footer>
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
<ui-sub-footer>
  <div>Footer Content</div>
</ui-sub-footer>
```
```js
import "./resources/components.js"
document.documentElement.setAttribute("prefers-density", "compact")
```
::