# Clock

```live(preview)
<style>
  div {
    padding: 30px 0 20px;
    display: flex;
  }
  ef-clock:not(last-child) {
    margin-right: 40px;
  }
</style>
<div>
  <ef-clock></ef-clock>
  <ef-clock am-pm></ef-clock>
  <ef-clock show-seconds></ef-clock>
  <ef-clock am-pm show-seconds></ef-clock>
</div>
```

Clock component displays a clock with the `00:00:00`. It can be configured to show a custom time.

## Basic Usage

The clock is set to display the time with `00:00:00` by default. You can configure to show seconds segment or display it in a 12-hour format or tick the clock.

```live
<style>
  div {
    padding: 30px 0 20px;
    display: flex;
  }
  ef-clock:not(last-child) {
    margin-right: 40px;
  }
</style>
<div>
<ef-clock></ef-clock>
<ef-clock show-seconds></ef-clock>
<ef-clock show-seconds tick></ef-clock>
<ef-clock am-pm></ef-clock>
</div>
```

```html
<ef-clock></ef-clock>
<ef-clock show-seconds></ef-clock>
<ef-clock show-seconds tick></ef-clock>
<ef-clock am-pm></ef-clock>
```

## Custom initial time

You can customize `ef-clock` to initial time using the `value`.

```live
<style>
  div {
    padding: 30px 0 20px;
    display: flex;
  }
  ef-clock:not(last-child) {
    margin-right: 40px;
  }
</style>
<div>
  <ef-clock value="6:5"></ef-clock>
  <ef-clock value="06:05"></ef-clock>
  <ef-clock value="6:05:20"></ef-clock>
  <ef-clock value="06:05:20"></ef-clock>
</div>
```

```html
<ef-clock value="06:05"></ef-clock>
<ef-clock value="06:05:20"></ef-clock>
```

> Valid time formats are `hh:mm` and `hh:mm:ss`. This component does not support milliseconds.

## Offset

You can shift the time by setting the `offset` attribute in seconds. The clock will display time by calculating the `value` and `offset` without affecting the original `value` data.

```live
<style>
  div {
    padding: 30px 0 20px;
    display: flex;
  }
  ef-clock:not(last-child) {
    margin-right: 40px;
  }
</style>
<div>
  <ef-clock offset="3600"></ef-clock>
  <ef-clock offset="9000"></ef-clock>
  <ef-clock offset="19800"></ef-clock>
</div>
```

```html
<ef-clock offset="3600"></ef-clock>
<ef-clock offset="9000"></ef-clock>
<ef-clock offset="19800"></ef-clock>
```

## Interactive mode

Sets `interactive` attribute to `ef-clock` to allows users to interact with clock. Users can click on clock segments to change the `offset` values.

```live
<style>
  div {
    padding: 30px 0 20px;
    display: flex;
    align-items: center;
  }
  ef-clock:not(last-child) {
    margin-right: 40px;
  }
</style>
<div>
  <ef-clock id="clock" interactive></ef-clock>
  <ef-button onclick="resetClock()">Reset</ef-button>
</div>
<script>
  function resetClock() {
    document.getElementById('clock').offset = 0;
  }
</script>
```

```html
<ef-clock interactive></ef-clock>
```

## Responsive size

Clock size can be responsive if you set `font-size` style with viewport units.

```live
<style>
  div {
    display: flex;
    flex-wrap: nowrap;
    align-item: center;
    padding: 30px 0 20px;
  }

  ef-clock {
    flex-grow: 0.1;
    margin: 5px;
  }
</style>
<div>
  <ef-clock style="font-size: 2vw;"></ef-clock>
  <ef-clock style="font-size: 5vw;"></ef-clock>
  <ef-clock style="font-size: 10vw;"></ef-clock>
</div>
```

```html
<ef-clock style="font-size: 2vw;" am-pm></ef-clock>
<ef-clock style="font-size: 5vw;" am-pm></ef-clock>
<ef-clock style="font-size: 10vw;" am-pm></ef-clock>
```
## Analogue (Beta)

Analogue is currently in beta.

```live
<ef-clock analogue tick show-seconds></ef-clock>
```

```html
<ef-clock analogue tick show-seconds></ef-clock>
```
