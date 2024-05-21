<!--
type: page
title: Time Picker
location: ./elements/time-picker
layout: default
-->

# Time Picker

::
```javascript
::import-elements::
```
```css
div {
  display: flex;
}
ef-time-picker:not(last-child) {
  margin-right: 40px;
}
```
```html
<div>
  <ef-time-picker value="12:30"></ef-time-picker>
  <ef-time-picker></ef-time-picker>
  <ef-time-picker value="12:30:17"></ef-time-picker>
  <ef-time-picker value="12:30" am-pm></ef-time-picker>
</div>
```
::

This element allows users to input time and can be adjusted to show either a 12 or 24 hour format.

## Usage

A fixed time can be set by configuring attributes/properties.

::
```javascript
::import-elements::
```
```css
div {
  display: flex;
}
ef-time-picker:not(last-child) {
  margin-right: 40px;
}
```
```html
<div>
  <ef-time-picker></ef-time-picker>
  <ef-time-picker value="12:30"></ef-time-picker>
  <ef-time-picker hours="12" minutes="30"></ef-time-picker>
</div>
```
::

```html
<ef-time-picker></ef-time-picker>
<ef-time-picker value="12:30"></ef-time-picker>
<ef-time-picker hours="12" minutes="30"></ef-time-picker>
```

*> Valid time formats are `hh:mm` and `hh:mm:ss`. This component does not support milliseconds.

## Setting current time

You can set the current time using native `Date` object methods.

::
```javascript
::import-elements::
const date = new Date();
const localTimePicker = document.getElementById("local-time");
const utcTimePicker = document.getElementById("utc-time");

localTimePicker.hours = date.getHours();
localTimePicker.minutes = date.getMinutes();
utcTimePicker.hours = date.getUTCHours();
utcTimePicker.minutes = date.getUTCMinutes();
```
```css
div {
  display: flex;
}
ef-time-picker:not(last-child) {
  margin-right: 40px;
}
```
```html
<div>
  <ef-time-picker id="local-time"></ef-time-picker>
  <ef-time-picker id="utc-time"></ef-time-picker>
</div>
```
::

```javascript
const date = new Date();
const localTimePicker = document.getElementById("local-time");
localTimePicker.hours = date.getHours();
localTimePicker.minutes = date.getMinutes();
```

Similarly, you can set current time in the UTC timezone.

```javascript
const date = new Date();
const utcTimePicker = document.getElementById("utc-time");
utcTimePicker.hours = date.getUTCHours();
utcTimePicker.minutes = date.getUTCMinutes();
```

## Input validation
To validate input from users, `ef-time-picker` provides similar features to a native input.
When a user assigns an invalid input to the control, it will automatically apply an error style to alert the user.
However, if you define a default value that is invalid, you need to call `reportValidity()` during initialization to ensure the error style is applied.

@> Validation of user input of `ef-time-picker` is consistent with a native input. [See native input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time).

Whenever input is invalid, the `error` attribute will be added to the element. You can use the `error` property to check whether input is currently in the error state or not.
If the error state is changed (not programmatically), an `error-changed` event will be dispatched along with the current error state.

::
```javascript
::import-elements::
const errorStatus = document.querySelector('span');
const el = document.querySelector('ef-time-picker');

el.addEventListener('error-changed', (event) => {
  errorStatus.textContent = event.detail.value;
});

```
```css
span {
  color: red;
}
```
```html
<div>
  <ef-time-picker></ef-time-picker>
  <p>Error: <span></span></p>
</div>
```
::

### Custom validation
To customize validation, you require to set `custom-validation` attribute to disable build-in input validation. Moreover, you have responsible to manage error state of element base on your validation criteria.

::
```javascript
::import-elements::
const errorNotice = document.getElementById('error-notice');
const el = document.querySelector('ef-time-picker');

el.addEventListener('value-changed', (event) => {
  const targetEl = event.target;
  if ((targetEl.hours < 8) || (targetEl.hours >= 17 && targetEl.minutes > 0)) {
    errorNotice.textContent = 'Not in the working hour';
    targetEl.error = true;
  } else {
    errorNotice.textContent = '';
    targetEl.error = false;
  }
});

el.addEventListener('blur', (event) => {
  const targetEl = event.target;
  if (!targetEl.hours || !targetEl.minutes) {
    errorNotice.textContent = 'Please choose time';
    targetEl.error = true;
  }
});
```
```css
#error-notice {
  color: red;
}
```
```html
<div>
  <p>Please choose a time to receive service (Service hours 8:00-17:00)</p>
  <ef-time-picker></ef-time-picker>
  <p id="error-notice"></p>
</div>
```
::

## Combining time and date

Typically, the time value must be combined with a date object in order to use an API. To do this, use methods on the native `Date` object.

```javascript
const el = document.querySelector("ef-time-picker");
const date = new Date();
date.setHours(el.hours);
date.setMinutes(el.minutes);
date.setSeconds(el.seconds);
```

This is useful when implementing `ef-time-picker` with `ef-calendar`.

::
```javascript
::import-elements::

const calendar = document.querySelector("ef-calendar");
const timePicker = document.querySelector("ef-time-picker");
calendar.addEventListener("value-changed", () => {
  if (calendar.value && timePicker.value) {
    const date = new Date(calendar.value);
    date.setHours(timePicker.hours);
    date.setMinutes(timePicker.minutes);
    date.setSeconds(timePicker.seconds);
    console.log(date.toLocaleString());
  }
}, true);
```
```html
<ef-calendar>
  <ef-time-picker slot="footer"></ef-time-picker>
</ef-calendar>
```
::


```html
<ef-calendar>
  <ef-time-picker slot="footer"></ef-time-picker>
</ef-calendar>
```

```javascript
const calendar = document.querySelector("ef-calendar");
const timePicker = document.querySelector("ef-time-picker");

calendar.addEventListener("value-changed", () => {
  if (calendar.value && timePicker.value) {
    const date = new Date(calendar.value);
    date.setHours(timePicker.hours);
    date.setMinutes(timePicker.minutes);
    date.setSeconds(timePicker.seconds);
    console.log(date.toLocaleString());
  }
}, true);
```

## Accessibility
::a11y-intro::

The hours and minutes inputs have independent labels hidden for assistive technologies. The input fields that form the Time Picker control are programmatically grouped and associated with their group label. States such as `disabled` or `readonly` are programmatically updated to match the visual state. 

`ef-time-picker` has already managed the role and states.

::a11y-end::
