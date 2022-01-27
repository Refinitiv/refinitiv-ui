<!--
type: page
title: Button Bar
location: ./elements/button-bar
layout: default
-->

# Button Bar

::
```javascript
::button-bar::
```
```css
div {
  display: flex;
  flex-direction: column;
}
```
```html
<div>
  <ef-button-bar>
    <ef-button>One</ef-button>
    <ef-button>Two</ef-button>
    <ef-button>Three</ef-button>
    <ef-button>Four</ef-button>
    <ef-button>Five</ef-button>
  </ef-button-bar>

  <ef-button-bar managed>
    <ef-button active toggles>One</ef-button>
    <ef-button toggles>Two</ef-button>
    <ef-button toggles>Three</ef-button>
    <ef-button toggles>Four</ef-button>
    <ef-button toggles>Five</ef-button>
  </ef-button-bar>

  <ef-button-bar>
    <ef-button toggles active icon="bold"></ef-button>
    <ef-button toggles icon="italic"></ef-button>
    <ef-button toggles icon="underline"></ef-button>
    <ef-button-bar managed>
      <ef-button toggles active icon="text-left"></ef-button>
      <ef-button toggles icon="text-center"></ef-button>
      <ef-button toggles icon="text-right"></ef-button>
      <ef-button toggles icon="text-center"></ef-button>
    </ef-button-bar>
    <ef-button icon="increase-indent"></ef-button>
    <ef-button icon="decrease-indent"></ef-button>
    <ef-button icon="image"></ef-button>
    <ef-button icon="print"></ef-button>
  </ef-button-bar>
</div>
```
::

`ef-button-bar` is used to display multiple buttons to create a list of commands bar.

### Usage
Button Bar can be created by using `ef-button` as content inside `ef-button-bar`. You can use it to create a button with an additional menu on the side, or to create different styles of toolbar control.

The Button Bar control aims to provide a simple array of buttons. You can use it together with Overlay Menu to create a dropdown menu.

::
```javascript
::button-bar::
```
```html
<ef-button-bar>
	<ef-button>Reply All</ef-button>
  <ef-button icon="down"></ef-button>
</ef-button-bar>
```
::

```html
<ef-button-bar>
  <ef-button>Reply All</ef-button>
  <ef-button icon="down"></ef-button>
</ef-button-bar>
```

### Creating multiple buttons toolbar
You can use Button Bar to create a simple toolbar.

::
```javascript
::button-bar::
```
```html
<ef-button-bar>
  <ef-button icon="skip-to-start"></ef-button>
  <ef-button icon="play"></ef-button>
  <ef-button icon="skip-to-end"></ef-button>
  <ef-button icon="sound-mute"></ef-button>
  <ef-button icon="sound-decrease"></ef-button>
  <ef-button icon="sound-increase"></ef-button>
  <ef-button icon="sound-on"></ef-button>
</ef-button-bar>
```
::

```html
<ef-button-bar>
  <ef-button icon="skip-to-start"></ef-button>
  <ef-button icon="play"></ef-button>
  <ef-button icon="skip-to-end"></ef-button>
  <ef-button icon="sound-mute"></ef-button>
  <ef-button icon="sound-decrease"></ef-button>
  <ef-button icon="sound-increase"></ef-button>
  <ef-button icon="sound-on"></ef-button>
</ef-button-bar>
```

### Toggle buttons
Buttons can be set to a toggled mode by using the `toggles` attribute. Each button can be toggled independently.

::
```javascript
::button-bar::
```
```html
<ef-button-bar>
  <ef-button toggles icon="candle-chart"></ef-button>
  <ef-button toggles icon="chart-line-bar"></ef-button>
  <ef-button toggles icon="pie-chart"></ef-button>
  <ef-button toggles icon="grid"></ef-button>
</ef-button-bar>
```
::

```html
<ef-button-bar>
  <ef-button toggles icon="candle-chart"></ef-button>
  <ef-button toggles icon="chart-line-bar"></ef-button>
  <ef-button toggles icon="pie-chart"></ef-button>
  <ef-button toggles icon="grid"></ef-button>
</ef-button-bar>
```

If only one button can be active at a time, add the `managed` attribute to `ef-button-bar`.

::
```javascript
::button-bar::
```
```html
<ef-button-bar managed>
  <ef-button toggles icon="candle-chart"></ef-button>
  <ef-button toggles icon="chart-line-bar"></ef-button>
  <ef-button toggles icon="pie-chart"></ef-button>
  <ef-button toggles icon="grid"></ef-button>
</ef-button-bar>
```
::

```html
<ef-button-bar managed>
  <ef-button toggles icon="candle-chart"></ef-button>
  <ef-button toggles icon="chart-line-bar"></ef-button>
  <ef-button toggles icon="pie-chart"></ef-button>
  <ef-button toggles icon="grid"></ef-button>
</ef-button-bar>
```

### Mixing different styles
`ef-button-bar` supports more complex use cases, such as including managed buttons along with other types.

::
```javascript
::button-bar::
```
```html
<ef-button-bar>
  <ef-button toggles active icon="bold"></ef-button>
  <ef-button toggles icon="italic"></ef-button>
  <ef-button toggles icon="underline"></ef-button>
  <ef-button-bar managed>
    <ef-button toggles active icon="text-left"></ef-button>
    <ef-button toggles icon="text-center"></ef-button>
    <ef-button toggles icon="text-right"></ef-button>
    <ef-button toggles icon="text-center"></ef-button>
  </ef-button-bar>
  <ef-button icon="increase-indent"></ef-button>
  <ef-button icon="decrease-indent"></ef-button>
  <ef-button icon="image"></ef-button>
  <ef-button icon="print"></ef-button>
</ef-button-bar>
```
::

```html
<ef-button-bar>
  <ef-button toggles active icon="bold"></ef-button>
  <ef-button toggles icon="italic"></ef-button>
  <ef-button toggles icon="underline"></ef-button>
  <ef-button-bar managed>
    <ef-button toggles active icon="text-left"></ef-button>
    <ef-button toggles icon="text-center"></ef-button>
    <ef-button toggles icon="text-right"></ef-button>
    <ef-button toggles icon="text-center"></ef-button>
  </ef-button-bar>
  <ef-button icon="increase-indent"></ef-button>
  <ef-button icon="decrease-indent"></ef-button>
  <ef-button icon="image"></ef-button>
  <ef-button icon="print"></ef-button>
</ef-button-bar>
```

### Handle users click event
To listen to the tap event on the button, add the `tap` event listener to an individual `ef-button` or `ef-button-bar`.

```html
<ef-button-bar id="button-bar" managed>
  <ef-button id="Dislike" icon="dislike-empty"></ef-button>
  <ef-button id="Like" icon="like-empty"></ef-button>
</ef-button-bar>
```
```javascript
const buttonBar = document.getElementById('button-bar');
buttonBar.addEventListener('tap', (e) => {
  console.log(e.target.getAttribute('id'));
});
```
