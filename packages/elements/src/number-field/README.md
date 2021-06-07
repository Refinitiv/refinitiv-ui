# Number Field

```live(preview)
<style>
  .label:not(:first-child) {
    margin-top: 8px;
  }
  .label {
    margin-bottom: 4px;
  }
  ef-number-field {
    max-width: 160px;
    text-align: right;
  }
</style>

<ef-panel spacing>
  <div>Pound Sterling (£)</div>
  <ef-number-field value="1000" step="1" min="1" id="curr1"></ef-number-field>
  <div class="label">Conversion Rate</div>
  <ef-number-field value="38.62" min="0" step="0.01" id="cf"></ef-number-field>
  <div class="label">Thai Baht (฿)</div>
  <ef-number-field readonly value="12000" no-spinner id="out"></ef-number-field>
</ef-panel>

<script>
  var curr1 = document.getElementById('curr1');
  var cf = document.getElementById('cf');
  var out = document.getElementById('out');

  out.value = (curr1.value * cf.value).toFixed(2);
  curr1.addEventListener('value-changed', function () { out.value = (curr1.value * cf.value).toFixed(2); });
  cf.addEventListener('value-changed', function () { out.value = (curr1.value * cf.value).toFixed(2); });
</script>

```

`ef-number-field` is a form control element for number.

## Basic usage

Number field can be used in a similar fashion to native number input.

```html
<ef-number-field value="1000"></ef-number-field>
```

## Getting value

Same as HTML native input, input value is `string`. The value can be accessed through `value` property.

```html
<ef-number-field id="number-input" value="3"></ef-number-field>
```

```js
var numberInput = document.getElementById('number-input');
numberInput.value; // "3"
```

You can listen to `value-changed` event that is triggered when the value changes due to user interactions.

```live
<ef-number-field id="event" placeholder="Use spinner or type number to change value."></ef-number-field>
<p>Value: <code id="value-text"></code></p>

<script>
  var element = document.getElementById('event');
  var valueChangedText = document.getElementById('value-text');

  element.addEventListener('value-changed', function (e) {
    valueChangedText.innerHTML = e.detail.value;
  });
</script>
```

```html
<ef-number-field id="event"></ef-number-field>
<p>Value: <code id="value-text"></code></p>
```

```js
var element = document.getElementById('event');
var valueChangedText = document.getElementById('value-text');

element.addEventListener('value-changed', function (e) {
  valueChangedText.innerHTML = e.detail.value;
});
```

## Input validation

`ef-number-field` provides similar features to a native input to validate input from users. When users assign invalid input to the control, it will automatically apply error style to notify the users.

> Validation of user input of `ef-number-field` is consistent with a native input. [See native input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number).

### Set min or max value

The minimum and maximum values can be set to limit values when the user interacts. If a value exceeds min or max set programmatically, it will change to error state.

```live
<ef-number-field placeholder="Min/Max" min="-12" max="16" id="mm"></ef-number-field>

<script>
  document.getElementById('mm').value = '-15';
</script>
```

```html
<ef-number-field min="-12" max="16"></ef-number-field>
```

### Step

The step attribute specifies the interval between valid numbers. For instance, when `step="2"` valid values must be even numbers e.g. 2,4,6,8....

```live
<ef-number-field placeholder="Even numbers only" step="2"></ef-number-field>
```

```html
<ef-number-field step="2"></ef-number-field>
```

When the input is invalid, the error attribute will be added to the element. You can use `error` property to check if input is currently in the error state.

```html
<ef-number-field id="number-input" value="3" max="2"></ef-number-field>
```

```js
var numberInput = document.getElementById('number-input');
numberInput.error; // "true"
```

You can add event listener `error-changed` to the element and it will dispatch whenever the error state changes.

```live
<ef-number-field id="input" min="0" max="10"></ef-number-field>
<p>Error: <code id="error-text"></code></p>
<script>
  var element = document.getElementById('input');
  var errorChangedText = document.getElementById('error-text');
  element.value = "-1"

  element.addEventListener('error-changed', function(e) {
    if (e.detail.value) {
      errorChangedText.innerHTML = "Value must be between 0 - 10.";
    }
    else {
      errorChangedText.innerHTML = "";
    }
  });
</script>
```

```html
<ef-number-field id="input" min="0" max="10"></ef-number-field>
<p>Error: <code id="error-text"></code></p>
```

```js
var element = document.getElementById('input');
var errorChangedText = document.getElementById('error-text');
element.value = '-1';

element.addEventListener('error-changed', function (e) {
  if (e.detail.value) {
    errorChangedText.innerHTML = 'Value must be between 0 - 10.';
  } else {
    errorChangedText.innerHTML = '';
  }
});
```
