<!--
type: page
title: Datetime Picker
location: ./elements/datetime-picker
layout: default
-->

# Datetime Picker

::
```javascript
::datetime-picker::
```
```css
section {
  height: 315px;
  padding: 0 3px;
}
[range][timepicker] {
  width: 400px;
}
```
```html
<section>
  <ef-datetime-picker></ef-datetime-picker>
  <ef-datetime-picker range duplex timepicker opened></ef-datetime-picker>
</section>
```
::

`ef-datetime-picker` allows the user to select a date or date range, and optionally a time, and display the selection in a specific format.

## Usage

By default, Datetime Picker only allows the user to select the date. Use the `timepicker` attribute to allow the user to select both a date and time.

An initial value for the Datetime Picker can be set using the `value` attribute/property.

::
```javascript
::datetime-picker::
  document.querySelector('[timepicker]').value = '2019-03-20';
```
```css
section {
  height: 315px;
  padding: 0 3px;
}
```
```html
<section>
  <ef-datetime-picker value="2019-03-20" opened></ef-datetime-picker>
  <ef-datetime-picker timepicker></ef-datetime-picker>
</section>
```
::

```html
<ef-datetime-picker value="2019-03-20"></ef-datetime-picker>
<ef-datetime-picker timepicker></ef-datetime-picker>
```

```javascript
datetimePicker.value = '2019-03-20';
```

## Setting the date

The displayed date is based on `format` and user language. However, `value` must be in `yyyy-MM-dd` format (e.g. "2019-03-20").
If `timepicker` is on, `value` must be in `yyyy-MM-ddTHH:mm` or `yyyy-MM-ddTHH:mm:ss` format (e.g. "2019-03-20T23:40" or "2019-03-20T23:40:59").

x>Wrong
x>```html
x><!-- Value must be in "yyyy-MM-dd" format. `format` is only for displayed date -->
x><ef-datetime-picker format="dd-MM-yyyy" value="03-20-2019" opened></ef-datetime-picker>
x>
x><!-- If `timepicker` is not set you must not pass time information -->
x><ef-datetime-picker value="2019-03-20T23:40"></ef-datetime-picker>
x>
x><!-- If `timepicker` is set you must pass time information -->
x><ef-datetime-picker timepicker value="2019-03-20"></ef-datetime-picker>
x>
x><!-- `value`, `min` and `max` must always follow the same format -->
x><ef-datetime-picker timepicker value="2019-03-20T09:00" min="2019-03-20"></ef-datetime-picker>
x>
x><!-- The value must not contain any time-zone information -->
x><ef-datetime-picker timepicker value="2019-03-20T23:40:34Z"></ef-datetime-picker>
x>```

o>Correct
o>```html
o><ef-datetime-picker value="2019-03-20"></ef-datetime-picker>
o><ef-datetime-picker timepicker value="2019-03-20T23:40"></ef-datetime-picker>
o><ef-datetime-picker value="2019-03-20"></ef-datetime-picker>
o><ef-datetime-picker timepicker value="2019-03-20T09:00" min="2019-03-20T00:00"></ef-datetime-picker>
o><ef-datetime-picker timepicker value="2019-03-20T23:40:34"></ef-datetime-picker>
o>```

x>Wrong
x>```javascript
x>// Date object is an invalid input
x>datetimePicker.value = new Date(2019, 02, 20);
x>// `toLocaleString()` is based on current locale and might not give correct results in different regions
x>datetimePicker.value = new Date(2019, 02, 20).toLocaleString();
x>// `toISOString()` contains time-zone information and cannot be used
x>datetimePicker.value = new Date(2019, 02, 20).toISOString();
x>```

o>Correct
o>```javascript
o>datetimePicker.value = '2019-03-20'; /* if `timepicker` is off */
o>datetimePicker.value = '2019-03-20T09:00'; /* if `timepicker` is on */
o>```

## Range select

Use `range` to switch the Datetime Picker to date range selection mode. By default, `range` provides a single calendar that allows users to choose start and end dates.

Datetime Picker provides an optional attribute, `duplex` and `duplex="split"`, where it will popup with 2 calendars.

* Use `duplex` to show two calendars that are automatically shifted together when users navigate to the next month.
* Use `duplex="split"` to show two calendars such that each can be navigated independently.

An initial range value for Datetime Picker can be set using `values`.

::
```javascript
::datetime-picker::
document.querySelector('[timepicker]').values = ['2019-01-01T12:01', '2019-01-07T14:54'];
```
```css
section {
  height: 315px;
  padding: 0 3px;
}
[range][timepicker] {
  width: 400px;
}
```
```html
<section>
  <ef-datetime-picker range duplex values="2019-01-01,2019-01-07" opened></ef-datetime-picker>
  <ef-datetime-picker range duplex="split" timepicker></ef-datetime-picker>
</section>
```
::

```html
<ef-datetime-picker range duplex values="2019-01-01,2019-01-07"></ef-datetime-picker>
<ef-datetime-picker range duplex="split" timepicker></ef-datetime-picker>
```

```javascript
datetimePicker.values = ['2019-01-01T12:01', '2019-01-07T14:54'];
```

## Custom formats

Custom date and time formats can be set using `format` attribute/property. Use `show-seconds` to allow the user to select second. Use `am-pm` to switch time picker into AM/PM time format.

@> Format is based on [date-fns](https://date-fns.org/docs/format).

::
```javascript
::datetime-picker::
```
```css
section {
  height: 315px;
  padding: 0 3px;
}
ef-datetime-picker {
  width: 180px;
}
```
```html
<section>
  <ef-datetime-picker format="do MMMM yyyy" opened></ef-datetime-picker>
  <ef-datetime-picker format="yyyy-MM-dd HH:mm:ss" timepicker show-seconds></ef-datetime-picker>
  <ef-datetime-picker format="d MMMM yyyy"></ef-datetime-picker>
  <ef-datetime-picker format="dd, yyyy, MMMM, h:mm a" timepicker am-pm></ef-datetime-picker>
</section>
```
::

```html
<ef-datetime-picker format="do MMMM yyyy"></ef-datetime-picker>
<ef-datetime-picker format="yyyy-MM-dd HH:mm:ss" timepicker show-seconds></ef-datetime-picker>
<ef-datetime-picker format="d MMMM yyyy"></ef-datetime-picker>
<ef-datetime-picker format="dd, yyyy, MMMM, h:mm a" timepicker am-pm></ef-datetime-picker>
```

## Defining min and max values

You can restrict the available date range by passing in `min` and `max` values.

*> If `timepicker` is on, `min` and `max` must contain time information.

::
```javascript
::datetime-picker::
```
```css
section {
  height: 315px;
  padding: 0 3px;
}
```
```html
<section>
  <ef-datetime-picker min="2015-01-01" max="2022-12-31" opened></ef-datetime-picker>
  <ef-datetime-picker timepicker min="2015-01-01T00:00" max="2022-12-31T23:59"></ef-datetime-picker>
</section>
```
::

```html
<ef-datetime-picker min="2015-01-01" max="2022-12-31"></ef-datetime-picker>
<ef-datetime-picker timepicker min="2015-01-01T00:00" max="2022-12-31T23:59"></ef-datetime-picker>
```

## Setting locale
Datetime Picker uses system default locale (or US-English if locale is not present). You can change the locale by setting [lang](https://www.w3.org/International/questions/qa-html-language-declarations) attribute either globally on *document* tag or locally.

The first day of the week is defined by the locale. You can override it by setting `first-day-of-week`.

::
```javascript
::datetime-picker::
```
```css
section {
  height: 290px;
  padding: 0 3px;
}
```
```html
<section>
  <ef-datetime-picker lang="zh" value="2019-05-21" opened></ef-datetime-picker>
  <ef-datetime-picker first-day-of-week="3" value="2019-05-21"></ef-datetime-picker>
</section>
```
::

```html
<ef-datetime-picker lang="zh" value="2019-05-21"></ef-datetime-picker>
<ef-datetime-picker first-day-of-week="3" value="2019-05-21"></ef-datetime-picker>
```

## Set content to slots
Use slots to add additional content into the Datetime Picker.

::
```javascript
::datetime-picker::
const pad = (number, size) => {
  let s = String(Math.abs(number));
  while (s.length < size) {
    s = '0' + s;
  }
  return (number < 0 ? '-' : '') + s;
};

const formatToDateTime = (value) => {
  value = new Date(value);
  const year = pad(value.getFullYear(), 4);
  const month = pad(value.getMonth() + 1, 2);
  const date = pad(value.getDate(), 2);
  const hours = pad(value.getHours(), 2);
  const minutes = pad(value.getMinutes(), 2);
  const seconds = pad(value.getSeconds(), 2);
  return year + '-' + month + '-' + date + 'T' + hours + ':' + minutes + ':' + seconds;
};

const toValues = (from, to) => [formatToDateTime(from), formatToDateTime(to)];
const rangePicker = document.querySelector('ef-datetime-picker');
document.getElementById('today').addEventListener('tap', () => {
  const to = new Date().setSeconds(0, 0);
  const from = new Date(to).setHours(0, 0, 0, 0);
  rangePicker.values = toValues(from, to);
});
document.getElementById('1-week').addEventListener('tap', () => {
  const to = new Date().setSeconds(0, 0);
  const from = new Date(to) - 7 * 24 * 60 * 60 * 1000;
  rangePicker.values = toValues(from, to);
});
document.getElementById('1-month').addEventListener('tap', () => {
  const now = new Date();
  const to = now.setSeconds(0, 0);
  const from = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate(), now.getHours(), now.getMinutes());
  rangePicker.values = toValues(from, to);
});
document.getElementById('3-months').addEventListener('tap', () => {
  const now = new Date();
  const to = now.setSeconds(0, 0);
  const from = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate(), now.getHours(), now.getMinutes());
  rangePicker.values = toValues(from, to);
});
```
```css
section {
  height: 315px;
  padding: 0 3px;
}
[range][timepicker] {
  width: 400px;
}
.range-nav-bar {
  display: flex;
  flex-direction: column;
  padding: 10px;
}
.range-nav-bar ef-button {
  padding: 5px;
  margin: 5px 0;
  height: 25px;
  min-width: 50px;
  font-size: 75%;
}
```
```html
<section>
  <ef-datetime-picker range duplex="split" timepicker opened>
    <div slot="left" class="range-nav-bar">
      <ef-button id="today">Today</ef-button>
      <ef-button id="1-week">1 Week</ef-button>
      <ef-button id="1-month">1 Month</ef-button>
      <ef-button id="3-months">3 Months</ef-button>
    </div>
  </ef-datetime-picker>
</section>
```
::

```html
<ef-datetime-picker range duplex="split" timepicker>
  <div slot="left">
    <ef-button id="today">Today</ef-button>
    <ef-button id="1-week">1 Week</ef-button>
    <ef-button id="1-month">1 Month</ef-button>
    <ef-button id="3-months">3 Months</ef-button>
  </div>
</ef-datetime-picker>
```

## Accessibility
::a11y-intro::

Datetime Picker serves as a container for the Date Picker and Time Picker components, so it does not itself receive keyboard focus.

::a11y-end::
