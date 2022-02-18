<!--
type: page
title: Loader
location: ./elements/loader
layout: default
-->

# Loader
::
```javascript
::loader::
```
```css
.container {
  height: 100px;
}
```
```html
<div class="container">
  <ef-loader></ef-loader>
</div>
```
::

`ef-loader` is an animated graphical component used to show that an app is performing an action in the background, such as downloading content.

## Usage
Add `ef-loader` into your document, and the animation will begin. When the loader is no longer needed, hide it with `display: none`.

@> If the loader is only used once, it can be also be removed from the DOM.

::
```javascript
::loader::
```
```css
.item {
  position: relative;
  height: 50px;
}
```
```html
<div class="item"><ef-loader></ef-loader></div>
```
::

```html
<ef-loader></ef-loader>
```

## Accessibility
::a11y-intro::

The Loader component is a live region and has the property `aria-busy`.

::a11y-end::
