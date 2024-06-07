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
`ef-time-picker` has validation logic similar to a [native input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time). When a user types a partial value into the control, error style will be shown to notify the user.

You can call `reportValidity()` to trigger the validation anytime, and it will set error style if input is partial. In case that the input is initially or programmatically set to an invalid value, you must call `reportValidity()` to show the error style. Make sure that the element has been defined before calling the method.

Whenever input is invalid, the `error` attribute will be added to the element. You can use the `error` property to check whether input is currently in the error state or not.
If the error state is changed (not programmatically), an `error-changed` event will be dispatched along with the current error state.

::
```javascript
::import-elements::
const errorStatus = document.querySelector('p');
const el = document.querySelector('ef-time-picker');

el.addEventListener('error-changed', (event) => {
  errorStatus.textContent = event.detail.value ? 'error due to partial input' : '';
});
```
```css
p {
  color: red;
}
```
```html
<div>
  <ef-time-picker></ef-time-picker>
  <p></p>
</div>
```
::

### Custom validation
For advance use cases, default validation and error state of the field can be overridden.
To do this, make sure that `custom-validation` is set,
then validate with your customised validation logic and update `error` property accordingly.

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
