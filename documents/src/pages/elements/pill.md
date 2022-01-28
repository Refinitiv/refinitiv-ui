<!--
type: page
title: Pill
location: ./elements/pill
layout: default
-->

# Pill
::
```javascript
::pill::
```
```html
<ef-pill>Default</ef-pill>
<ef-pill toggles>Toggles</ef-pill>
<ef-pill clears>Clear</ef-pill>
```
::

`ef-pill` is a small button style component which is used to show one or multiple selected items. It is nearly always used to visualize multiple item selections inside UI components.

### Usage
You can display a pill with text inside.

```html
<ef-pill>Banana</ef-pill>
<ef-pill>Raspberry</ef-pill>
<ef-pill>Mango</ef-pill>
```

### Toggle pills
Toggle pills are used to switch between two states. To create a toggle pill, add the `toggles` attribute.

::
```javascript
::pill::
```
```html
<ef-pill toggles>Toggles</ef-pill>
<ef-pill toggles active>Active Toggles</ef-pill>
```
::

```html
<ef-pill toggles>Toggles</ef-pill>
<ef-pill toggles active>Active Toggles</ef-pill>
```

### Pill with clear button
A pill can display a clear button, or a small cross icon, when the `clears` attribute is added. You can also add an event listener for when the clear button is clicked.

::
```javascript
::pill::
```
```html
<ef-pill>Default</ef-pill>
<ef-pill clears>Clears Pill</ef-pill>
```
::

```html
<ef-pill>Default</ef-pill>
<ef-pill clears>Clears Pill</ef-pill>
```

