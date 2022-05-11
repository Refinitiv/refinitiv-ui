<!--
type: page
title: Clock
location: ./elements/clock
layout: default
-->

# Clock

::
```javascript
::clock::
```
```css
div {
  padding: 30px;
  display: flex;
}
ef-clock:not(last-child) {
  margin-right: 40px;
}
```
```html
<div>
  <ef-clock></ef-clock>
  <ef-clock am-pm></ef-clock>
  <ef-clock show-seconds></ef-clock>
  <ef-clock am-pm show-seconds></ef-clock>
</div>
```
::

Clock component displays a clock with the time in HH:MM:SS format. It can be configured to show any custom time.

## Usage
The clock is set to display the time as `00:00:00` by default. You can configure the component to show the seconds segment, display it in a 12-hour format or tick the clock.

::
```javascript
::clock::
```
```css
div {
  padding: 30px;
  display: flex;
}
ef-clock:not(last-child) {
  margin-right: 40px;
}
```
```html
<div>
  <ef-clock></ef-clock>
  <ef-clock show-seconds></ef-clock>
  <ef-clock show-seconds tick></ef-clock>
  <ef-clock am-pm></ef-clock>
</div>
```
::

```html
<ef-clock></ef-clock>
<ef-clock show-seconds></ef-clock>
<ef-clock show-seconds tick></ef-clock>
<ef-clock am-pm></ef-clock>
```

## Custom initial time

You can customize the initial time of `ef-clock` using `value`.

::
```javascript
::clock::
```
```css
div {
  padding: 30px;
  display: flex;
}
ef-clock:not(last-child) {
  margin-right: 40px;
}
```
```html
<div>
  <ef-clock value="6:5"></ef-clock>
  <ef-clock value="06:05"></ef-clock>
  <ef-clock value="6:05:20"></ef-clock>
  <ef-clock value="06:05:20"></ef-clock>
</div>
```
::

```html
<ef-clock value="06:05"></ef-clock>
<ef-clock value="06:05:20"></ef-clock>
```

@> Valid time formats are `hh:mm` and `hh:mm:ss`. This component does not support milliseconds.

## Offset

You can shift the time displayed by setting the `offset` attribute in seconds. The clock will display the offset time by calculating `value` and `offset` together without affecting the original `value` data.

::
```javascript
::clock::
```
```css
div {
  padding: 30px;
  display: flex;
}
ef-clock:not(last-child) {
  margin-right: 40px;
}
```
```html
<div>
  <ef-clock offset="3600"></ef-clock>
  <ef-clock offset="9000"></ef-clock>
  <ef-clock offset="19800"></ef-clock>
</div>
```
::

```html
<ef-clock offset="3600"></ef-clock>
<ef-clock offset="9000"></ef-clock>
<ef-clock offset="19800"></ef-clock>
```

## Interactive mode
Set the `interactive` attribute of `ef-clock` to allow users to interact with it. When interactive is set, users can click on clock segments to set the `offset` values.

::
```javascript
::clock::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/button?min';
halo('button');

document.getElementById('reset').addEventListener('click', () => {
  document.getElementById('clock').offset = 0;
});
```
```css
div {
  padding: 30px;
  display: flex;
  align-items: center;
}
ef-clock:not(last-child) {
  margin-right: 40px;
}
```
```html
<div>
  <ef-clock id="clock" interactive></ef-clock>
  <ef-button id="reset">Reset</ef-button>
</div>
```
::

```html
<ef-clock interactive></ef-clock>
```

## Responsive size
Clock size can be responsive if you set the `font-size` style with viewport units.

::
```javascript
::clock::
```
```css
div {
  display: flex;
  flex-wrap: nowrap;
  align-item: center;
  padding: 30px;
}

ef-clock {
  flex-grow: 0.1;
  margin: 5px;
}
```
```html
<div>
  <ef-clock style="font-size: 2vw;"></ef-clock>
  <ef-clock style="font-size: 5vw;"></ef-clock>
  <ef-clock style="font-size: 10vw;"></ef-clock>
</div>
```
::

```html
<ef-clock style="font-size: 2vw;" am-pm></ef-clock>
<ef-clock style="font-size: 5vw;" am-pm></ef-clock>
<ef-clock style="font-size: 10vw;" am-pm></ef-clock>
```
## Analogue
Set `analogue` attribute will change digital clock to analogue display. When the size of analogue clock is smaller than the break point, It will switch to a simple clock face.

::
```javascript
::clock::
```
```css
div {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 35px 0;
}
ef-clock {
  margin:0px 20px;
}
#smallSize {
  width: 64px;
  height: 64px;
}
```
```html
<div>
  <ef-clock analogue tick show-seconds am-pm></ef-clock>
  <ef-clock id="smallSize" analogue tick show-seconds am-pm></ef-clock>
</div>
```
::

```html
<ef-clock analogue tick show-seconds am-pm></ef-clock>
```

