# Time Picker

```live(preview)
<style>
  div {
    display: flex;
  }
  ef-time-picker:not(last-child) {
    margin-right: 40px;
  }
</style>
<div>
  <ef-time-picker value="12:30"></ef-time-picker>
  <ef-time-picker></ef-time-picker>
  <ef-time-picker value="12:30:17"></ef-time-picker>
  <ef-time-picker value="12:30" am-pm></ef-time-picker>
</div>
```

This element allows user input of time and can be adjusted to show either 12 or 24 hour format.

### Basic Usage

A fixed time can be set by configuring attributes/properties.

```live
<style>
  div {
    display: flex;
  }
  ef-time-picker:not(last-child) {
    margin-right: 40px;
  }
</style>
<div>
  <ef-time-picker></ef-time-picker>
  <ef-time-picker value="12:30"></ef-time-picker>
  <ef-time-picker hours="12" minutes="30"></ef-time-picker>
</div>
```

```html
<ef-time-picker></ef-time-picker>
<ef-time-picker value="12:30"></ef-time-picker>
<ef-time-picker hours="12" minutes="30"></ef-time-picker>
```

> Valid time formats are `hh:mm` and `hh:mm:ss`. This component does not support milliseconds.

### Setting current time

You can set the current time by using native `Date` object methods. 

```js
var date = new Date();
var localTimePicker = document.getElementById('local-time');
localTimePicker.hours = date.getHours();
localTimePicker.minutes = date.getMinutes();
```

Similarly, you can set current time in UTC timezone.

```js
var date = new Date();
var utcTimePicker = document.getElementById('utc-time');
utcTimePicker.hours = date.getUTCHours();
utcTimePicker.minutes = date.getUTCMinutes();
```

```live
<style>
  div {
    display: flex;
  }
  ef-time-picker:not(last-child) {
    margin-right: 40px;
  }
</style>
<div>
  <ef-time-picker id="local-time"></ef-time-picker>
  <ef-time-picker id="utc-time"></ef-time-picker>
</div>
<script>
  var date = new Date();
  var localTimePicker = document.getElementById('local-time');
  var utcTimePicker = document.getElementById('utc-time');

  localTimePicker.hours = date.getHours();
  localTimePicker.minutes = date.getMinutes();
  utcTimePicker.hours = date.getUTCHours();
  utcTimePicker.minutes = date.getUTCMinutes();
</script>
```

### Combining time and date

Usually you will need to combine your time value with a date object in order to use it with an API. To do this, you can use methods on the native `Date` object.

```js
var el = document.querySelector('ef-time-picker');
var date = new Date();
date.setHours(el.hours);
date.setMinutes(el.minutes);
date.setSeconds(el.seconds);
```

This is useful when using `ef-time-picker` with `ef-calendar`.

```live
<ef-calendar>
  <ef-time-picker slot="footer"></ef-time-picker>
</ef-calendar>
<script>
var calendar = document.querySelector('ef-calendar');
var timePicker = document.querySelector('ef-time-picker');
calendar.addEventListener('value-changed', function () {
  if (calendar.value && timePicker.value) {
    var date = new Date(calendar.value);
    date.setHours(timePicker.hours);
    date.setMinutes(timePicker.minutes);
    date.setSeconds(timePicker.seconds);
    console.log(date.toLocaleString());
  }
}, true);
</script>
```

```html
<ef-calendar>
  <ef-time-picker slot="footer"></ef-time-picker>
</ef-calendar>
```

```js
var calendar = document.querySelector('ef-calendar');
var timePicker = document.querySelector('ef-time-picker');

calendar.addEventListener('value-changed', function () {
  if (calendar.value && timePicker.value) {
    var date = new Date(calendar.value);
    date.setHours(timePicker.hours);
    date.setMinutes(timePicker.minutes);
    date.setSeconds(timePicker.seconds);
    console.log(date.toLocaleString());
  }
}, true);
```
