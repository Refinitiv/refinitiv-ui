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
::import-themes::
<ui-sub-footer>
  <div>Footer Content</div>
</ui-sub-footer>
```
```js
::import-components::
```
::


## Density = Dense
::
```html
::import-themes::
<ui-sub-footer>
  <div>Footer Content</div>
</ui-sub-footer>
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
<ui-sub-footer>
  <div>Footer Content</div>
</ui-sub-footer>
```
```js
::import-components::
document.documentElement.setAttribute("prefers-density", "compact")
```
::