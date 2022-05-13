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

`ef-loader` is assigned `role="progressbar"` and can include `aria-label` with `aria-live` to announce loading state.

To describe the loading progress of the loader you can set `aria-valuenow` or `aria-valuetext` following [ARIA progressbar practices](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/progressbar_role).

```html
<ef-loader aria-label="loading" aria-live="assertive" aria-valuenow="20"></ef-button>
```

::a11y-end::
