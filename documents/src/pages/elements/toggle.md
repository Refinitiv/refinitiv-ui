<!--
type: page
title: Toggle
location: ./elements/toggle
layout: default
-->

# Toggle

::
```javascript
::toggle::
```
```css
.container {
  max-width: 200px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
}
.item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.label {
  margin-right: 2em;
}
ef-toggle {
  height: 20px;
  width: 36px;
}
```
```html
<div class="container">
  <p class="item">
    <span class="label">WiFi</span><ef-toggle></ef-toggle>
  </p>
  <p class="item">
    <span class="label">Bluetooth</span><ef-toggle checked></ef-toggle>
  </p>
  <p class="item">
    <span class="label">Do not disturb</span><ef-toggle></ef-toggle>
  </p>
  <p class="item">
    <span class="label" disabled>Airplane mode</span><ef-toggle></ef-toggle>
  </p>
</div>
```
::

`ef-toggle` is a form control element that allows users to toggle between two states.

## Usage
Toggle can switch between two states when the user taps or through setting the attribute/property `checked`.

```html
<ef-toggle></ef-toggle>
<ef-toggle checked></ef-toggle>
```

## Inside labels
Set `label` and `checked-label` attributes to display labels inside the toggle in both checked and unchecked state.

::
```javascript
::toggle::
```
```html
<ef-toggle label="OFF" checked-label="ON"></ef-toggle>
```
::

```html
<ef-toggle label="OFF" checked-label="ON"></ef-toggle>
```

## Handle checked state change
Toggle dispatches `checked-changed` whenever user interaction changes the `checked` value.

```javascript
toggle.addEventListener('checked-changed', (e) => {
  // console.log(e.target.checked)
});
```

## Accessibility
::a11y-intro::

`ef-toggle` is assigned `role="switch"` and can include the `aria-checked` state. States such as `disabled` and `checked` are programmatically updated to match the element’s visual state. It is best to include a label that visually impaired users can see with the element, making the Toggle more perceivable. 

`ef-toggle` manages the role and states but you must ensure that the element has associated label by using`aria-label` or `aria-labelledby`.

```html
<ef-toggle
  aria-label="Aeroplane Mode">
</ef-toggle>
```
```html
<label id="aeroplaneMode">Aeroplane Mode</label>
<ef-toggle
  aria-labelledby="aeroplaneMode">
</ef-toggle>
```

::a11y-end::
