<!--
type: page
title: Radio Button
location: ./elements/radio-button
layout: default
-->

# Radio Button
::
```javascript
::radio-button::
```
```html
<ef-radio-button name="group" checked>Option A</ef-radio-button>
<ef-radio-button name="group">Option B</ef-radio-button>
<ef-radio-button name="group">Option C</ef-radio-button>
<ef-radio-button name="group" style="width: 60px; padding: 20px 0;">Fixed width</ef-radio-button>
```
::

`ef-radio-button` is a form control for selecting one option from many options within the same group.

## Usage
`ef-radio-button` is a simple radio button that similar to the type radio of native input.

```html
<ef-radio-button>Sushi</ef-radio-button>
<ef-radio-button checked>Steak</ef-radio-button>
<ef-radio-button>Noodle</ef-radio-button>
```

## Grouping radio buttons
More than one `ef-radio-button` can be grouped by setting the same value to the `name` attribute. Once an item in a group is checked, the user cannot uncheck a radio group unless the value is set through a property or attribute.

::
```javascript
::radio-button::
```
```html
<ef-radio-button name="dairy" checked>Skimmed Milk</ef-radio-button>
<ef-radio-button name="dairy">Whole Milk</ef-radio-button>
<ef-radio-button name="dairy">Soya</ef-radio-button>
```
::

```html
<ef-radio-button name="dairy" checked>Skimmed Milk</ef-radio-button>
<ef-radio-button name="dairy">Whole Milk</ef-radio-button>
<ef-radio-button name="dairy">Soya</ef-radio-button>
```

## Disabled and readonly
`ef-radio-button` can be set to be disabled or readonly using the `disabled` or `readonly` attributes.

::
```javascript
::radio-button::
```
```html
<ef-radio-button checked>Default</ef-radio-button>
<ef-radio-button disabled checked>Disabled</ef-radio-button>
<ef-radio-button readonly checked>Readonly</ef-radio-button>
```
::

```html
<ef-radio-button checked>Default</ef-radio-button>
<ef-radio-button disabled checked>Disabled</ef-radio-button>
<ef-radio-button readonly>Readonly</ef-radio-button>
```

## Handle check value changed
`checked-changed` is the **only** event fired by `ef-radio-button`. It is dispatched whenever the state has been changed by user interaction, such as a click, tap or keyboard event.

```javascript
radioButtonGroup.addEventListener('checked-changed', (e) => {
  if (e.target.checked) {
    // console.log(e.target.id);
  }
}, true);
```

## Accessibility
::a11y-intro::

The Radio Button element is assigned `role="radio"` and can include a `checked` state. Assistive technology users ascertain the purpose that a radio button serves through its accessible name, which is computed from the visual label or `aria-label` attribute. The radio state programmatically updates to match its visual state. 

The `role="radiogroup"` or `role="group"` should be used to associate the element’s grouping with its group label. 
### Notes for developers

`ef-radio-button` handles `role` and `aria-checked` attributes but for radio group, you need to assign `role="radiogroup"` by yourself.

```html
<div role="radiogroup" aria-labelledby="header">
  <h6 id="header">Pizza Crust</h6>
  <ef-radio-button name="crust" checked>Regular Crust</ef-radio-button>
  <ef-radio-button name="crust">Thin Crust</ef-radio-button>
</div>
```

::a11y-end::
