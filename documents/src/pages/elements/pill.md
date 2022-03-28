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

## Usage
You can display a pill with text inside.

```html
<ef-pill>Banana</ef-pill>
<ef-pill>Raspberry</ef-pill>
<ef-pill>Mango</ef-pill>
```

## Toggle pills
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

## Pill with clear button
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

## Accessibility
::a11y-intro::

`ef-pill` is assigned `role="button"` and can have a `pressed` state. Assistive technology users ascertain the purpose that a pill serves via its accessible name, which is computed from the visual label. States such as `disabled` and `pressed` are programmatically updated to match the element’s visual state.

In some scenarios, pills are used for presenting a short text without any users interaction. For that, pill can be assigned `role="none"` or `role="presentation"`.

* `ef-pill` is assigned with `role="button"` by default, it's automatically managing related aria attributes e.g. pressed or when use `toggles` mode
* You can assign `role="none"` or `role="presentation"` to `ef-pill` if your pills do not have a button behavior i.e. not an actionable pill
* You can set `tabindex="-1"` to `ef-pill` if you do not want pill to be focusable at all

```html
<ef-pill tabindex="-1">Not Able To Focus This Pill</ef-pill>
<h3>List of tags</h3>
<ef-pill role="none" aria-label="Zelda Tag">Zelda</ef-pill>
<ef-pill role="none" aria-label="Mario Tag">Mario</ef-pill>
<ef-pill role="none" aria-label="Ninja Tag">Ninja</ef-pill>
```

* When pill is a removable pill, with `clears` attribute, users can trigger clears button by pressing a delete key. You can use `aria-label` to provide users for more detail.

```html
<h3 tabindex="0" aria-label="List of tags. You can press delete key to delete each tag">List of tags</h3>
<ef-pill clears aria-label="Zelda Tag">Zelda</ef-pill>
<ef-pill clears aria-label="Mario Tag">Mario</ef-pill>
<ef-pill clears aria-label="Ninja Tag">Ninja</ef-pill>
```

::a11y-end::
