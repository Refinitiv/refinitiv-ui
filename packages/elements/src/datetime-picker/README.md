# Datetime Picker

```live(preview)
<style>
  section {
    height: 315px;
    padding: 0 3px;
  }
  [range][timepicker] {
    width: 400px;
  }
</style>
<section>
  <ef-datetime-picker></ef-datetime-picker>
  <ef-datetime-picker range duplex timepicker opened></ef-datetime-picker>
</section>
```

`ef-datetime-picker` control allows the user to select a date or date range, and optionally a time, and to display this selection in the specific format.

### Basic usage

By default, Datetime Picker allows the user to select only the date. Use `timepicker` attribute to allow the user to select a date and time.

An initial value of Datetime Picker can be set by `value` attribute/property.

```html
<ef-datetime-picker value="2019-03-20"></ef-datetime-picker>
<ef-datetime-picker timepicker></ef-datetime-picker>
```

```js
datetimePicker.value = '2019-03-20';
```

```live
<style>
  section {
    height: 315px;
    padding: 0 3px;
  }
</style>
<section>
  <ef-datetime-picker value="2019-03-20"></ef-datetime-picker>
  <ef-datetime-picker timepicker></ef-datetime-picker>
</section>
<script>
  document.querySelector('[timepicker]').value = '2019-03-20';
</script>
```

#### Setting the date

> The displayed date is based on `format` and user language. However, `value` must be in `yyyy-MM-dd` format (e.g. "2019-03-20").
>
> If `timepicker` is on, `value` must be in `yyyy-MM-ddTHH:mm` or `yyyy-MM-ddTHH:mm:ss` format (e.g. "2019-03-20T23:40" or "2019-03-20T23:40:59").

***✗ Wrong***
```html
<!-- Value must be in "yyyy-MM-dd" format. `format` is only for displayed date -->
<ef-datetime-picker format="dd-MM-yyyy" value="03-20-2019"></ef-datetime-picker>

<!-- If `timepicker` is not set you must not pass time information -->
<ef-datetime-picker value="2019-03-20T23:40"></ef-datetime-picker>

<!-- If `timepicker` is set you must pass time information -->
<ef-datetime-picker timepicker value="2019-03-20"></ef-datetime-picker>

<!-- `value`, `min` and `max` must always follow the same format -->
<ef-datetime-picker timepicker value="2019-03-20T09:00" min="2019-03-20"></ef-datetime-picker>

<!-- The value must not contain any time-zone information -->
<ef-datetime-picker timepicker value="2019-03-20T23:40:34Z"></ef-datetime-picker>
```

***✓ Correct***
```html
<ef-datetime-picker value="2019-03-20"></ef-datetime-picker>
<ef-datetime-picker timepicker value="2019-03-20T23:40"></ef-datetime-picker>
<ef-datetime-picker value="2019-03-20"></ef-datetime-picker>
<ef-datetime-picker timepicker value="2019-03-20T09:00" min="2019-03-20T00:00"></ef-datetime-picker>
<ef-datetime-picker timepicker value="2019-03-20T23:40:34"></ef-datetime-picker>
```

***✗ Wrong***
```js
// Date object is an invalid input
datetimePicker.value = new Date(2019, 02, 20);
// `toLocaleString()` is based on current locale and might not give correct results in different regions
datetimePicker.value = new Date(2019, 02, 20).toLocaleString();
// `toISOString()` contains time-zone information and cannot be used
datetimePicker.value = new Date(2019, 02, 20).toISOString();
```

***✓ Correct***
```js
datetimePicker.value = '2019-03-20'; /* if `timepicker` is off */
datetimePicker.value = '2019-03-20T09:00'; /* if `timepicker` is on */
```

### Range select

Uses `range` to switch the Datetime Picker to date range selection mode. By default, `range` provides a single calendar that allows users to choose start and end data.

Datetime Picker provides an optional attribute, `duplex` and `duplex="split"`, where it will popup with 2 calendars.

* Uses `duplex` to show two calendars that are automatically shifted together when users navigate to the next month.
* Uses `duplex="split"` to show two calendars in a way that each can be navigated independently.

An initial value of range Datetime Picker can be set using `values`.

```html
<ef-datetime-picker range duplex values="2019-01-01,2019-01-07"></ef-datetime-picker>
<ef-datetime-picker range duplex="split" timepicker></ef-datetime-picker>
```

```js
datetimePicker.values = ['2019-01-01T12:01', '2019-01-07T14:54'];
```

```live
<style>
  section {
    height: 315px;
    padding: 0 3px;
  }
  [range][timepicker] {
    width: 400px;
  }
</style>
<section>
  <ef-datetime-picker range duplex values="2019-01-01,2019-01-07"></ef-datetime-picker>
  <ef-datetime-picker range duplex="split" timepicker></ef-datetime-picker>
</section>
<script>
  document.querySelector('[timepicker]').values = ['2019-01-01T12:01', '2019-01-07T14:54'];
</script>
```

### Custom formats

Custom date and time formats can be set using `format` attribute/property. Use `show-seconds` to allow the user to select second. Use `am-pm` to switch time picker into AM/PM time format.

> **Note:** format is based on [date-fns](https://date-fns.org/docs/format).

```html
<ef-datetime-picker format="do MMMM yyyy"></ef-datetime-picker>
<ef-datetime-picker format="yyyy-MM-dd HH:mm:ss" timepicker show-seconds></ef-datetime-picker>
<ef-datetime-picker format="d MMMM yyyy"></ef-datetime-picker>
<ef-datetime-picker format="dd, yyyy, MMMM, h:mm a" timepicker am-pm></ef-datetime-picker>
```

```live
<style>
  section {
    height: 315px;
    padding: 0 3px;
  }
  ef-datetime-picker {
    width: 180px;
  }
</style>
<section>
  <ef-datetime-picker format="do MMMM yyyy"></ef-datetime-picker>
  <ef-datetime-picker format="yyyy-MM-dd HH:mm:ss" timepicker show-seconds></ef-datetime-picker>
  <ef-datetime-picker format="d MMMM yyyy"></ef-datetime-picker>
  <ef-datetime-picker format="dd, yyyy, MMMM, h:mm a" timepicker am-pm></ef-datetime-picker>
</section>
```

### Defining min and max values

You can restrict the available date range by passing in `min` and `max` values.

> **Note:** if `timepicker` is on, `min` and `max` must contain time information.

```html
<ef-datetime-picker min="2015-01-01" max="2022-12-31"></ef-datetime-picker>
<ef-datetime-picker timepicker min="2015-01-01T00:00" max="2022-12-31T23:59"></ef-datetime-picker>
```

```live
<style>
  section {
    height: 315px;
    padding: 0 3px;
  }
</style>
<section>
  <ef-datetime-picker min="2015-01-01" max="2022-12-31"></ef-datetime-picker>
  <ef-datetime-picker timepicker min="2015-01-01T00:00" max="2022-12-31T23:59"></ef-datetime-picker>
</section>
```

### Setting locale
Datetime Picker uses system default locale (or US-English if locale is not present). You can change the locale by setting [lang](https://www.w3.org/International/questions/qa-html-language-declarations) attribute either globally on *document* tag or locally.

The first day of the week is defined by the locale. You can override it by setting `first-day-of-week`.

```html
<ef-datetime-picker lang="zh" value="2019-05-21"></ef-datetime-picker>
<ef-datetime-picker first-day-of-week="3" value="2019-05-21"></ef-datetime-picker>
```

```live
<style>
  section {
    height: 290px;
    padding: 0 3px;
  }
</style>
<section>
  <ef-datetime-picker lang="zh" value="2019-05-21"></ef-datetime-picker>
  <ef-datetime-picker first-day-of-week="3" value="2019-05-21"></ef-datetime-picker>
</section>
```

### Slots
Use slots to add additional content into the Datetime Picker.

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

```live
<style>
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
</style>
<section>
  <ef-datetime-picker range duplex="split" timepicker>
    <div slot="left" class="range-nav-bar">
      <ef-button id="today">Today</ef-button>
      <ef-button id="1-week">1 Week</ef-button>
      <ef-button id="1-month">1 Month</ef-button>
      <ef-button id="3-months">3 Months</ef-button>
    </div>
  </ef-datetime-picker>
</section>
<script>
  var pad = function (number, size) {
    var s = String(Math.abs(number));
    while (s.length < size) {
      s = '0' + s;
    }
    return (number < 0 ? '-' : '') + s;
  };

  var formatToDateTime = function (value) {
    value = new Date(value);
    var year = pad(value.getFullYear(), 4);
    var month = pad(value.getMonth() + 1, 2);
    var date = pad(value.getDate(), 2);
    var hours = pad(value.getHours(), 2);
    var minutes = pad(value.getMinutes(), 2);
    var seconds = pad(value.getSeconds(), 2);
    return year + '-' + month + '-' + date + 'T' + hours + ':' + minutes + ':' + seconds;
  };

  var toValues = function (from, to) {
    return [formatToDateTime(from), formatToDateTime(to)];
  };
  var rangePicker = document.querySelector('ef-datetime-picker');
  document.getElementById('today').addEventListener('tap', function () {
    var to = new Date().setSeconds(0, 0);
    var from = new Date(to).setHours(0, 0, 0, 0);
    rangePicker.values = toValues(from, to);
  });
  document.getElementById('1-week').addEventListener('tap', function () {
    var to = new Date().setSeconds(0, 0);
    var from = new Date(to) - 7 * 24 * 60 * 60 * 1000;
    rangePicker.values = toValues(from, to);
  });
  document.getElementById('1-month').addEventListener('tap', function () {
    var now = new Date();
    var to = now.setSeconds(0, 0);
    var from = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate(), now.getHours(), now.getMinutes());
    rangePicker.values = toValues(from, to);
  });
  document.getElementById('3-months').addEventListener('tap', function () {
    var now = new Date();
    var to = now.setSeconds(0, 0);
    var from = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate(), now.getHours(), now.getMinutes());
    rangePicker.values = toValues(from, to);
  });
</script>
```

## Slots
Slot is a placeholder inside a component that you can fill with your own content. This component provides slot as follows.

**header**
Header slot.

**right**
Right slot.

**footer**
Footer slot.

**left**
Left slot.
