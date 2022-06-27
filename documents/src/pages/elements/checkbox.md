<!--
type: page
title: Checkbox
location: ./elements/checkbox
layout: default
-->

# Checkbox

::
```javascript
::checkbox::
```
```css
.container {
  display: flex;
  flex-direction: column;
}
ef-checkbox {
  margin-left: 3px;
}
```
```html
<div class="container">
  <ef-checkbox>Unchecked</ef-checkbox>
  <ef-checkbox checked>Checked</ef-checkbox>
  <ef-checkbox indeterminate>Partially checked</ef-checkbox>
  <ef-checkbox style="width: 80px;">Fixed width</ef-checkbox>
</div>
```
::

`ef-checkbox` is a form control for selecting one or several options. States of check box can be checked, unchecked, and indeterminate.

## Usage
Checkbox can be set to the checked state by adding the `checked` attribute. You can also use the attrribute to determine the current state of a checkbox. The indeterminate state can only be set by code, not by user interaction.

::
```javascript
::checkbox::
```
```css
ef-checkbox {
  margin-left: 3px;
}
```
```html
<ef-checkbox>Unchecked</ef-checkbox>
<ef-checkbox checked>Checked</ef-checkbox>
<ef-checkbox indeterminate>Partially checked</ef-checkbox>
```
::

```html
<ef-checkbox>Unchecked</ef-checkbox>
<ef-checkbox checked>Checked</ef-checkbox>
<ef-checkbox indeterminate>Partially checked</ef-checkbox>
```

## Disabled and readonly
`ef-checkbox` can be set to disabled or readonly by using the associated attributes.

::
```javascript
::checkbox::
```
```css
ef-checkbox {
  margin-left: 3px;
}
```
```html
<ef-checkbox checked>Default</ef-checkbox>
<ef-checkbox disabled checked>Disabled</ef-checkbox>
<ef-checkbox readonly checked>Readonly</ef-checkbox>
```
::

```html
<ef-checkbox checked>Default</ef-checkbox>
<ef-checkbox disabled checked>Disabled</ef-checkbox>
<ef-checkbox readonly checked>Readonly</ef-checkbox>
```

## Handle when check state changed
The `checked-changed` event can be used to recognize when the state of a checkbox has been changed. In code, the event can also check if the state is set to `checked` or `indeterminate` by querying the associated property.

```javascript
const checkbox = document.getElementById("Checkbox");
checkbox.addEventListener('checked-changed', (e) => {
  // console.log(e.target.checked)
});
```

## Accessibility
::a11y-intro::

`ef-checkbox` is assigned `role="checkbox"` and can have a `checked` state. Assistive technology users ascertain the purpose that a checkbox serves through its accessible name, which is computed from the element’s visual label or `aria-label` and `aria-labelledby` attribute. The element’s state programmatically updates to match its visual state. 

The `role="group"` should be used to associate the grouping with the element’s group label. 

`ef-checkbox` handles role and aria value but for checkbox group, you need to assign `role="group"` yourself.

```html
<div role="group" aria-labelledby="header">
  <h6 id="header">Sandwich Condiments</h6>  
  <ef-checkbox>Lettuce</ef-checkbox>
  <ef-checkbox>Tomato</ef-checkbox>
  <ef-checkbox checked>Mustard</ef-checkbox>
  <ef-checkbox>Sprouts</ef-checkbox>
</div>
```

::a11y-end::
