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

`ef-loader` is assigned `role="progressbar"` and can include `aria-label` with `aria-live` to announce loading and loaded states.

`aria-live` triggers screen readers when a loader with `aria-live` is added or removed from the DOM. In contrast, when you unhide a hidden loader with CSS, neither elements nor text are added or removed from the DOM, so the element's aria-live property doesn’t come into play.

```html
<ef-loader aria-label="loading" aria-live="assertive"></ef-button>
```

::a11y-end::
