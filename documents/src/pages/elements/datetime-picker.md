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

The displayed date is formatted based on the locale of the user's browser, but the parsed value is always formatted according to ISO8601, described in [Format of a valid date string](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats)

@> The displayed date format will differ from the actual value — the displayed date is formatted based on the locale of the user's browser, but the parsed value is always formatted yyyy-mm-dd.

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

Custom date and time formats can be set using `formatOptions` property. 

@> Format options based on [Intl.DateTimeFormat]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat).

::
```javascript
::datetime-picker::
document.querySelector('#full').formatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
  dayPeriod: 'long'
}
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
  <ef-datetime-picker id="full" opened></ef-datetime-picker>
</section>
```
::

```html
<ef-datetime-picker id="full" opened></ef-datetime-picker>
```

```javascript
document.querySelector('#full').formatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
  dayPeriod: 'long'
}
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

`ef-datetime-picker` provides input fields for users to enter date string values or date with time values. Users can open the popup with calendar element and use keyboard navigation to select the date from the UI.

`ef-datetime-picker` has implemented keyboard navigation for users to navigate on the UI. You must ensure that the element has associated label by using `aria-label` or `aria-labelledby`.

```html
<ef-datetime-picker
  aria-label="Enter departure date">
</ef-datetime-picker>
```
```html
<label id="departure">Enter departure date</label>
<ef-datetime-picker 
  aria-labelledby="departure">
</ef-datetime-picker>
```

::a11y-end::
