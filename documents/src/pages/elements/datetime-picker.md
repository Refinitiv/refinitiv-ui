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
```
```html
<section>
  <ef-datetime-picker timepicker opened></ef-datetime-picker>
</section>
```
::

Datetime Picker allows the user to enter a date and time either through text input, or by choosing from the calendar.

## Usage

Datetime Picker allows the user to enter a date. Use the `timepicker` attribute to enter both date and time.

The value of the Datetime Picker is set and got using `value`.

```html
<ef-datetime-picker value="2019-03-20"></ef-datetime-picker>
<ef-datetime-picker value="2019-03-20T12:24" timepicker></ef-datetime-picker>
<ef-datetime-picker value="2019-03-20T12:24:48" show-seconds></ef-datetime-picker>
```

*> The value must confirm [ISO8601](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats) for date and datetime strings.

## Range integration

Use `range` attribute to switch Datetime Picker into range select mode.

Datetime Picker supports two range modes: single calendar (default); and dual calendar. The latter is set using `duplex`.

Range value is set and got using `values`.

```html
<ef-datetime-picker range values="2019-03-07,2019-03-20"></ef-datetime-picker>
<ef-datetime-picker range duplex values="2019-03-07,2019-03-20"></ef-datetime-picker>
```

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
  width: 400px;
}
```
```html
<section>
  <ef-datetime-picker range values="2019-03-07,2019-03-20"></ef-datetime-picker>
  <ef-datetime-picker range duplex values="2019-03-07,2019-03-20"></ef-datetime-picker>
</section>
```
::

## Date format

Datetime Picker format is based on [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat).

Custom date and time formats are set using `formatOptions` property. The values correspond to `Intl.DateTimeFormat` `options` property.

```javascript
dateTimePicker.formatOptions = {
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

::
```javascript
::datetime-picker::

const dateTimePicker = document.getElementById('formatOptions');
dateTimePicker.formatOptions = {
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
  width: 400px;
}
```
```html
<section>
  <ef-datetime-picker id="formatOptions"></ef-datetime-picker>
</section>
```
::

## Setting locale

Datetime Picker uses system default locale. You can override the locale by setting [lang](https://www.w3.org/International/questions/qa-html-language-declarations) attribute on control or globally on *document*.

```html
<ef-datetime-picker lang="zh"></ef-datetime-picker>
```

## Defining min and max

You can restrict the available date range by passing in `min` and `max` values.

*> `min` and `max` values must confirm picker formatting.

```html
<ef-datetime-picker min="2015-01-01" max="2022-12-31"></ef-datetime-picker>
<ef-datetime-picker timepicker show-seconds min="2015-01-01T00:00:00" max="2022-12-31T23:59:59"></ef-datetime-picker>
```

## Set content to slots

Use slots to add additional content into the Datetime Picker.

::
```javascript
::datetime-picker::
import { format, parse, addUnit, DateTimeFormat } from 'https://cdn.skypack.dev/@refinitiv-ui/utils/date.js?min';

const toValue = (date) => format(date, DateTimeFormat.yyyMMddTHHmmss);
const today = () => toValue(new Date());

const rangePicker = document.querySelector('ef-datetime-picker');

document.getElementById('today').addEventListener('tap', () => {
  const to = today();
  const startOfToday = parse(to);
  startOfToday.setHours(0, 0);
  const from = toValue(startOfToday);
  rangePicker.values = [from, to];
});
document.getElementById('1-week').addEventListener('tap', () => {
  const to = today();
  const from = addUnit(to, 'day', -7);
  rangePicker.values = [from, to];
});
document.getElementById('1-month').addEventListener('tap', () => {
  const to = today();
  const from = addUnit(to, 'month', -1);
  rangePicker.values = [from, to];
});
document.getElementById('3-months').addEventListener('tap', () => {
  const to = today();
  const from = addUnit(to, 'month', -3);
  rangePicker.values = [from, to];
});
```
```css
section {
  height: 315px;
  padding: 0 3px;
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
ef-datetime-picker {
  width: 400px;
}
```
```html
<section>
  <ef-datetime-picker range timepicker>
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

## Additional parameters

Datetime picker allows [filtering dates](./calendar#filtering-dates) and setting [views](./calendar#defining-the-view).

## Accessibility

::a11y-intro::

Datetime Picker provides input field for users to enter date/datetime string values either by typing the value or by using navigation keys.

Users can open the calendar popup and use keyboard navigation to select the date.

The developer must ensure that the element has associated `aria-label` or `aria-labelledby`.

```html
<ef-datetime-picker
  aria-label="Enter departure date">
</ef-datetime-picker>
```
```html
<label id="range">Enter start/end date</label>
<ef-datetime-picker
  range
  aria-labelledby="range">
</ef-datetime-picker>
```

::a11y-end::
