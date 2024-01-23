<!--
type: page
title: Number Field
location: ./elements/number-field
layout: default
language_tabs: [javascript, typescript]
-->

# Number Field
::
```javascript
::import-elements::
const curr1 = document.getElementById("curr1");
const cf = document.getElementById("cf");
const out = document.getElementById("out");

curr1.addEventListener("value-changed", () => {
  out.value = (curr1.value * cf.value).toFixed(2);
});
cf.addEventListener("value-changed", () => {
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

## Getting a value
Just like the HTML native input, the number field input value is a `string` which can be accessed using the `value` property.

```html
<label for="input">Input</label>
<ef-number-field id="input" value="3"></ef-number-field>
```

```javascript
const numberField = document.getElementById("input");
console.log(numberField.value); // "3"
```

You can listen for the `value-changed` event that is triggered whenever the value changes due to user interactions.

::
```javascript
::import-elements::
const numberField = document.getElementById("input");
const valueText = document.getElementById("value-text");

numberField.addEventListener("value-changed", (event) => {
  valueText.textContent = event.detail.value;
});
```
```html
<label for="input">Input</label>
<ef-number-field
  id="input"
  placeholder="Use spinner or type to change value.">
</ef-number-field>
<p>Value: <code id="value-text"></code></p>
```
::

```html
<label for="input">Input</label>
<ef-number-field
  id="input"
  placeholder="Use spinner or type to change value.">
</ef-number-field>
<p>Value: <code id="value-text"></code></p>
```

```javascript
const numberField = document.getElementById("input");
const valueText = document.getElementById("value-text");

numberField.addEventListener("value-changed", (event) => {
  valueText.textContent = event.detail.value;
});
```

```typescript
import { ValueChangedEvent } from "@refinitiv-ui/elements";

const numberField = document.getElementById("input");
const valueText = document.getElementById("value-text");

numberField?.addEventListener("value-changed", (event) => {
  if (valueText) {
    valueText.textContent = (event as ValueChangedEvent).detail.value;
  }
});
```

## Input validation
`ef-number-field` has validation logic similar to a [native input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number). When a user types an invalid value into the control, error style will be shown to notify the user.

You can call `reportValidity()` to trigger the validation anytime and it will set error style if input is invalid. In case that the input is initialised with an invalid value and you need to show the error style, you must call `reportValidity()` once the input is defined on the page.

Whenever input is invalid, the `error` attribute will be added to the element. You can use the `error` property to check whether input is currently in the error state or not.

::
```javascript
::import-elements::
const numberField = document.getElementById("input");
const errorText = document.getElementById("error-text");

numberField.addEventListener("blur", () => {
 errorText.textContent = numberField.error ? "Value must be between 0 - 10." : "";
});
numberField.addEventListener("input", () => {
  if (!numberField.error) {
    errorText.textContent = "";
  }
});
```
```html
<label for="input">Input</label>
<ef-number-field
  id="input"
  placeholder="0 - 10"
  min="0"
  max="10">
</ef-number-field>
<p id="error-text"></p>
```
::

```html
<label for="input">Input</label>
<ef-number-field
  id="input"
  placeholder="0 - 10"
  min="0"
  max="10">
</ef-number-field>
<p id="error-text"></p>
```

```javascript
const numberField = document.getElementById("input");
const errorText = document.getElementById("error-text");

numberField.addEventListener("blur", () => {
  errorText.textContent = numberField.error ? "Value must be between 0 - 10." : "";
});

numberField.addEventListener("input", () => {
  if (!numberField.error) {
    errorText.textContent = "";
  }
});
```
```typescript
import type { NumberField } from "@refinitiv-ui/elements/number-field";

const numberField = document.getElementById("input") as NumberField;
const errorText = document.getElementById("error-text");

numberField?.addEventListener("blur", () => {
  if (!errorText) {
    return;
  }
  errorText.textContent = numberField.error ? "Value must be between 0 - 10." : "";
});

numberField?.addEventListener("input", () => {
  if (!errorText) {
    return;
  }
  if (!numberField.error) {
    errorText.textContent = "";
  }
});
```

### Setting min or max
Minimum and maximum values can be set to limit input values when the user interacts. If a value exceeds the min or max set programmatically, the component will display an error state.

```html
<label for="input">Input</label>
<ef-number-field
  id="input"
  min="-12"
  max="16">
</ef-number-field>
```

### Setting input step
The step attribute specifies the interval between valid numbers. For instance, when `step="2"`, valid values would only be even numbers e.g. 2,4,6,8... Alternatively, specify the `step="any"` to allow any value.

::
```javascript
::import-elements::
```
```html
<label for="even" style="display:block">Even Numbers</label>
<ef-number-field
  id="even"
  placeholder="Even numbers only" step="2">
</ef-number-field>
<br>
<label for="any" style="display:block">Any Number</label>
<ef-number-field
  id="any"
  placeholder="Step any allow any number"
  step="any">
</ef-number-field>
```
::

```html
<label for="even">Even Numbers Only</label>
<ef-number-field id="even" step="2"></ef-number-field>
<label for="any">Any Numbers</label>
<ef-number-field id="any" step="any"></ef-number-field>
```

### Custom validation

For advance use cases, default validation and error state of the field can be overridden. To do this, make sure that `max` & `min` are not set and `step` is set to `any`, then validate with your customised validation logic and update `error` property accordingly.

::

```javascript
::import-elements::
const numberField = document.getElementById("prime-number");
const errorText = document.getElementById("error-text");

const isPrime = (n) => {
  if (n <= 1) {
    return false;
  }

  if (n === 2 || n === 3) {
    return true;
  }

  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
};

numberField.addEventListener("blur", () => {
  const value = Number(numberField.value);
  const error = !isPrime(value);
  numberField.error = error;
  errorText.textContent = error ? "Start value must be a prime number" : "";
});

numberField.addEventListener("input", () => {
  const value = Number(numberField.value);
  if (isPrime(value)) {
    errorText.textContent = "";
  }
});
```

```css
#error-text {
  color:#d94255;
}
ef-number-field {
  width: 250px;
}
label {
  display: block;
}
```

```html
<label for="prime-number">Prime number</label>
<ef-number-field
  id="prime-number"
  aria-describedby="error-text"
  step="any"
  placeholder="Please input a prime number">
</ef-number-field>
<p id="error-text"></p>
```

::

```html
<label for="prime-number">Start value</label>
<ef-number-field
  id="prime-number"
  aria-describedby="error-text"
  step="any"
  placeholder="any prime number such as 2, 3 and 5">
</ef-number-field>
<p id="error-text"></p>
```

```javascript
const numberField = document.getElementById("prime-number");
const errorText = document.getElementById("error-text");

const isPrime = (n) => {
  if (n <= 1) {
    return false;
  }

  if (n === 2 || n === 3) {
    return true;
  }

  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
};

numberField.addEventListener("blur", () => {
  const value = Number(numberField.value);
  const error = !isPrime(value);
  numberField.error = error;
  errorText.textContent = error ? "Start value must be a prime number" : "";
});

numberField.addEventListener("input", () => {
  const value = Number(numberField.value);
  if (isPrime(value)) {
    errorText.textContent = "";
  }
});
```

```typescript
import type { NumberField } from "@refinitiv-ui/elements/number-field";

const numberField = document.getElementById("prime-number") as NumberField;
const errorText = document.getElementById("error-text") as HTMLElement;

const isPrime = (n: number) => {
  if (n <= 1) {
    return false;
  }

  if (n === 2 || n === 3) {
    return true;
  }

  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
};

numberField.addEventListener("blur", () => {
  const value = Number(numberField.value);
  const error = !isPrime(value);
  numberField.error = error;
  errorText.textContent = error ? "Start value must be a prime number" : "";
});

numberField.addEventListener("input", () => {
  const value = Number(numberField.value);
  if (isPrime(value)) {
    errorText.textContent = "";
  }
});
```

## Accessibility
::a11y-intro::

`ef-number-field` is assigned `role="spinbutton"`. States such as `disabled` or `readonly` are programmatically updated to match the element’s visual state. 

`ef-number-field` has already managed the role and states but you must ensure that the element has associated label by using `placeholder`, `aria-label`, `aria-labelledby` or `label[for="<element.id>"]`

```html
<ef-number-field 
  aria-label="Total items"
  placeholder="Enter total items">
</ef-number-field>
```
```html
<label id="total">Total items</label>
<ef-number-field 
  aria-labelledby="total"
  placeholder="Enter total items">
</ef-number-field>
```
```html
<label for="total">Total items</label>
<ef-number-field
  id="total"
  placeholder="Enter total items">
</ef-number-field>
```

::a11y-end::
