<!--
type: page
title: Number Field
location: ./elements/number-field
layout: default
-->

# Number Field
::
```javascript
::number-field::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/panel?min';
halo('panel');
const curr1 = document.getElementById('curr1');
const cf = document.getElementById('cf');
const out = document.getElementById('out');

curr1.addEventListener('value-changed', () => {
  out.value = (curr1.value * cf.value).toFixed(2);
});
cf.addEventListener('value-changed', () => {
  out.value = (curr1.value * cf.value).toFixed(2);
});
```
```css
.label:not(:first-child) {
  margin-top: 8px;
}
.label {
  display: block;
  margin-bottom: 4px;
}
ef-number-field {
  max-width: 160px;
  text-align: right;
}
```
```html
<ef-panel spacing>
  <label for="curr1" class="label">Pound Sterling (£)</label>
  <ef-number-field value="1000" step="1" min="1" id="curr1"></ef-number-field>
  <label for="cf" class="label">Conversion Rate</label>
  <ef-number-field value="38.62" min="0" step="0.01" id="cf"></ef-number-field>
  <label for="out" class="label">Thai Baht (฿)</label>
  <ef-number-field readonly value="38620.00" no-spinner id="out"></ef-number-field>
</ef-panel>
```
::

`ef-number-field` is a form control element for numerical values.

## Usage
Number field can be used in a similar fashion to the native number input.

```html
<label for="total">Total Items</label>
<ef-number-field id="total" value="1000"></ef-number-field>
```

## Getting value
Just like the HTML native input, the number field input value is a `string` which can be accessed via the `value` property.

```html
<ef-number-field id="number-input" placehoder="Total items" value="3"></ef-number-field>
```

```javascript
const numberInput = document.getElementById('number-input');
console.log(numberInput.value); // "3"
```

You can listen for the `value-changed` event that is triggered whenever the value changes due to user interactions.

::
```javascript
::number-field::
const element = document.getElementById('event');
const valueChangedText = document.getElementById('value-text');

element.addEventListener('value-changed', (e) => {
  valueChangedText.innerHTML = e.detail.value;
});
```
```html
<ef-number-field id="event" placeholder="Use spinner or type number to change value."></ef-number-field>
<p>Value: <code id="value-text"></code></p>
```
::

```html
<ef-number-field
  id="event"
  placeholder="Use spinner or type number to change value.">
</ef-number-field>
<p>Value: <code id="value-text"></code></p>
```

```javascript
const element = document.getElementById('event');
const valueChangedText = document.getElementById('value-text');

element.addEventListener('value-changed', (e) => {
  valueChangedText.innerHTML = e.detail.value;
});
```

## Input validation
To validate input from users `ef-number-field` provides similar features to a native input. When a user assigns an invalid input to the control, it will automatically apply an error style to alert the user.

@> Validation of user input of `ef-number-field` is consistent with a native input. [See native input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number).

## Set min or max value
Minimum and maximum values can be set to limit input values when the user interacts. If a value exceeds the min or max set programmatically, the component will change to dipslay an error state.

::
```javascript
::number-field::
document.getElementById('mm').value = '-15';
```
```html
<ef-number-field placeholder="Min/Max" min="-12" max="16" id="mm"></ef-number-field>
```
::

```html
<ef-number-field placeholder="Min/Max" min="-12" max="16"></ef-number-field>
```

## Set input step
The step attribute specifies the interval between valid numbers. For instance, when `step="2"`, valid values would only be even numbers e.g. 2,4,6,8... Alternatively, specify the `step="any"` to allow any value. 

::
```javascript
::number-field::
```
```html
<ef-number-field placeholder="Even numbers only" step="2"></ef-number-field>

<ef-number-field placeholder="Step any allow any number" step="any"></ef-number-field>
```
::

```html
<ef-number-field placeholder="Even numbers only" step="2"></ef-number-field>
```

Whenever input is invalid, the error attribute will be added to the element. You can use the `error` property to check if input is currently in the error state.

```html
<ef-number-field
  placeholder="Enter number less than 2"
  id="number-input"
  value="3"
  max="2">
</ef-number-field>
```

```javascript
const numberInput = document.getElementById('number-input');
console.log(numberInput.error); // "true"
```

You can add the event listener `error-changed` to the element and it will dispatch whenever the error state changes.

::
```javascript
::number-field::
const element = document.getElementById('input');
const errorChangedText = document.getElementById('error-text');
element.value = "-1"

element.addEventListener('error-changed', (e) => {
  if (e.detail.value) {
    errorChangedText.innerHTML = "Value must be between 0 - 10.";
  }
  else {
    errorChangedText.innerHTML = "";
  }
  });
```
```html
<ef-number-field id="input" placeholder="Enter number between 0 - 10" min="0" max="10"></ef-number-field>
<p>Error: <code id="error-text"></code></p>
```
::

```html
<ef-number-field
  id="input"
  placeholder="Enter number between 0 - 10"
  min="0"
  max="10">
</ef-number-field>
<p>Error: <code id="error-text"></code></p>
```

```javascript
const element = document.getElementById('input');
const errorChangedText = document.getElementById('error-text');
element.value = '-1';

element.addEventListener('error-changed', (e) => {
  if (e.detail.value) {
    errorChangedText.innerHTML = 'Value must be between 0 - 10.';
  }
  else {
    errorChangedText.innerHTML = '';
  }
});
```

## Accessibility
::a11y-intro::

`ef-number-field` is assigned `role="spinbutton"`. States such as `disabled` or `readonly` are programmatically updated to match the element’s visual state. 

`ef-number-field` has already managed the role and states but you must ensure that the element has associated label by using `placeholder`, `aria-label`, `aria-labelledby` or `label[for="<element.id>"]`

```html
<ef-number-field placeholder="Total items"></ef-number-field>
```
```html
<ef-number-field 
  aria-label="Enter total items"
  placeholder="Total items">
</ef-number-field>
```
```html
<label id="total">Enter total items</label>
<ef-number-field 
  aria-labelledby="total"
  placeholder="Total items">
</ef-number-field>
```
```html
<label for="total">Enter total items</label>
<ef-number-field
  id="total"
  placeholder="Total items">
</ef-number-field>
```

::a11y-end::
