<!--
type: page
title: Slider
location: ./elements/slider
layout: default
-->

# Slider

::
```javascript
::slider::
```
```css
ef-slider{
  width:50%;
  margin:5px 10px;
}
```
```html
<ef-slider min="0" max="100" value="45"></ef-slider>
<ef-slider range min="0" max="100" from="25" to="75" min-range="1"></ef-slider>
<ef-slider show-input-field min="0" max="100" value="45"></ef-slider>
<ef-slider show-input-field range min="0" max="100" from="25" to="75"  min-range="1"></ef-slider>
```
::

## Usage
Sliders allow users to make selections from a range of values. The component's `min` and `max` values set the range. A default value can be set using the `value` attribute.

```html
<ef-slider min="0" max="100" value="60"></ef-slider>
```

## Getting value

To get the value of Slider, access it using the `value` property.

```html
<ef-slider value="1" min="0" max="10"></ef-slider>
```
```javascript
const slider = document.querySelector("ef-slider");
console.log(slider.value); // "1"
```

You can add an event listener to the element for the `value-changed` event. The event will be triggered when users change the value of Slider.

## Range slider

Add a `range` attribute to make Slider support `from` and `to` instead of a single value.

::
```javascript
::slider::
```
```css
ef-slider{
  width:50%;
  margin:15px 15px;
}
ef-slider:first-child{
  margin:25px 15px 10px 15px;
}
```
```html
<ef-slider min="0" max="100" from="10" to="50" range></ef-slider>
```
::

```html
<ef-slider min="0" max="100" from="10" to="50" range></ef-slider>
```

In range mode, the control will provide values between `from` and `to`. You can use `from-changed` and `to-changed` events to get notified when those values are changed.

In some use cases, you may need to set a minimum number of values between `from` and `to`. For example, you might want users to set at least 10 values in a range. To do that, set `min-range` to 10.

::
```javascript
::slider::
```
```html
<ef-slider min="0" max="100" from="10" to="50" range min-range="10"></ef-slider>
```
::

```html
<ef-slider min="0" max="100" from="10" to="50" range min-range="10"></ef-slider>
```

## Showing input field
Input fields can be set to display on the side of Slider. They show the current value of Slider and also allow users to set it with their keyboard.

::
```javascript
::slider::
```
```css
ef-slider{
  width:50%;
  margin:15px 15px;
}
ef-slider:first-child{
  margin:25px 15px 10px 15px;
}
```
```html
<ef-slider show-input-field min="0" max="100" value="40"></ef-slider>
<ef-slider show-input-field min="0" max="100" from="10" to="50" range></ef-slider>
```
::

```html
<ef-slider show-input-field min="0" max="100" value="40"></ef-slider>
<ef-slider show-input-field min="0" max="100" from="10" to="50" range></ef-slider>
```

## Setting steps
The `step` attribute specifies the size of each increment or decrement on Slider control. By default, Slider will not show step marks but this can be set using `show-steps`.

::
```javascript
::slider::
```
```css
ef-slider{
  width:50%;
  margin:5px 10px;
}
```
```html
<ef-slider min="0" max="10" value="5" step="0.5" show-steps show-input-field></ef-slider>
<ef-slider min="0" max="100" from="60" to="80" step="20" range show-steps show-input-field></ef-slider>
```
::

```html
<ef-slider min="0" max="10" value="5" step="0.5" show-steps show-input-field></ef-slider>
<ef-slider min="0" max="100" from="60" to="80" step="20" range show-steps show-input-field></ef-slider>
```

## Markers
You can show markers to provide more context to users on any specific values of Slider. The markers can show with or without label.

Defines each marker with `ef-slider-marker`. Position of the marker is set by `value`.

::
```javascript
::slider::
```
```css
ef-slider {
  width: 50%;
  margin: 10px;
}

#tracking-speed {
  --progress-color: transparent;
}

.container {
  margin: 20px;
  margin-left: 30px;
  margin-bottom: 35px;
}

```
```html
<div class="container">
  <label for="temperature">Temperature</label>
  <ef-slider id="temperature" value="70">
    <ef-slider-marker value="0">0°C</ef-slider-marker>
    <ef-slider-marker value="20">20°C</ef-slider-marker>
    <ef-slider-marker value="70">70°C</ef-slider-marker>
    <ef-slider-marker value="100">100°C</ef-slider-marker>
  </ef-slider>
</div>
<div class="container">
  <label for="tracking-speed">Tracking Speed</label>
  <ef-slider id="tracking-speed" step="25" value="50">
    <ef-slider-marker value="0">Slow</ef-slider-marker>
    <ef-slider-marker value="25"></ef-slider-marker>
    <ef-slider-marker value="50">Medium</ef-slider-marker>
    <ef-slider-marker value="75"></ef-slider-marker>
    <ef-slider-marker value="100">Fast</ef-slider-marker>
  </ef-slider>  
</div>
```
::

```html
<ef-slider id="temperature" value="70">
  <ef-slider-marker value="0">0°C</ef-slider-marker>
  <ef-slider-marker value="20">20°C</ef-slider-marker>
  <ef-slider-marker value="70">70°C</ef-slider-marker>
  <ef-slider-marker value="100">100°C</ef-slider-marker>
</ef-slider>
```

Markers can be used with `step` for a similar use case as radio button but in Slider style. To hide slider progress, set `--progress-color` CSS variables to `transparent`.

```css
#tracking-speed {
  --progress-color: transparent;
}
```

```html
<ef-slider id="tracking-speed" step="25" value="50">
  <ef-slider-marker value="0">Slow</ef-slider-marker>
  <ef-slider-marker value="25"></ef-slider-marker>
  <ef-slider-marker value="50">Medium</ef-slider-marker>
  <ef-slider-marker value="75"></ef-slider-marker>
  <ef-slider-marker value="100">Fast</ef-slider-marker>
</ef-slider>
```

### Marker label alignment
You can set `label-align` to each `ef-slider-marker` to customise the position of its label. The value can be `center`, `left` or `right`.

```html
<ef-slider id="click" value="2" min="1" max="3">
  <ef-slider-marker label-align="center" value="1">Light</ef-slider-marker>
  <ef-slider-markerfds value="2">Medium</ef-slider-marker>
  <ef-slider-marker label-align="center" value="3">Firm</ef-slider-marker>
</ef-slider>
```

### Responsive marker
In some situations, there might be insufficient space for every markers. You can wrap Slider in [Layout](./elements/layout) and listen to its `resize` event to hide some of these markers as needed.

```javascript
const container = document.getElementById("container");
const slider = document.getElementById("movement-speed");

container.addEventListener("resize", (event) => {
  const containerWidth = event.detail.width;
  containerWidth <= 200 ? slider.setAttribute("small", "") : slider.removeAttribute("small");
  containerWidth <= 400 ? slider.setAttribute("medium", "") : slider.removeAttribute("medium");
});
```
```css
ef-slider[medium] > ef-slider-marker[important-low] {
  display: none;
}
ef-slider[small] > ef-slider-marker[important-med] {
  display: none;
}
```
```html
<label for="movement-speed">Movement Speed</label>
<ef-layout id="container">
  <ef-slider id="movement-speed" value="50">
    <ef-slider-marker value="0">Slowest</ef-slider-marker>
    <ef-slider-marker important-low value="15">Slower</ef-slider-marker>
    <ef-slider-marker important-med value="30">Slow</ef-slider-marker>
    <ef-slider-marker value="50">Medium</ef-slider-marker>
    <ef-slider-marker important-med value="70">Fast</ef-slider-marker>
    <ef-slider-marker important-low value="85">Faster</ef-slider-marker>
    <ef-slider-marker value="100">Fastest</ef-slider-marker>
  </ef-slider>
<ef-layout>
```

::
```javascript
::slider::
const container = document.getElementById("container");
const slider = document.getElementById("movement-speed");

container.addEventListener("resize", (event) => {
  const containerWidth = event.detail.width;
  containerWidth <= 200 ? slider.setAttribute("small", "") : slider.removeAttribute("small");
  containerWidth <= 400 ? slider.setAttribute("medium", "") : slider.removeAttribute("medium");
});

function onChangeRadio(event) {
  container.style.width = event.target.value;
}

document.querySelectorAll("ef-radio-button").forEach((element) => {
  element.addEventListener('checked-changed', onChangeRadio);
});
```
```css
#radiogroup {
  margin: 10px;
}
#container {
  margin: 20px;
  width: 600px;
}
ef-slider {
  padding: 0 5px;
}
ef-slider {
  padding: 0 5px;
}
ef-slider[medium] > ef-slider-marker[important-low] {
  display: none;
}
ef-slider[small] > ef-slider-marker[important-med] {
  display: none;
}
```
```html
<div id="radiogroup" role="radiogroup" aria-labelledby="header">
  <p id="header">Slider width</p>
  <ef-radio-button name="size" value="200px">Small</ef-radio-button>
  <ef-radio-button name="size" value="400px">Medium</ef-radio-button>
  <ef-radio-button name="size" value="600px" checked>Large</ef-radio-button>
</div>
<ef-layout id="container">
  <label for="movement-speed">Movement Speed</label>
  <ef-slider id="movement-speed" value="50">
    <ef-slider-marker value="0">Slowest</ef-slider-marker>
    <ef-slider-marker important-low value="15">Slower</ef-slider-marker>
    <ef-slider-marker important-med value="30">Slow</ef-slider-marker>
    <ef-slider-marker value="50">Medium</ef-slider-marker>
    <ef-slider-marker important-med value="70">Fast</ef-slider-marker>
    <ef-slider-marker important-low value="85">Faster</ef-slider-marker>
    <ef-slider-marker value="100">Fastest</ef-slider-marker>
  </ef-slider>
<ef-layout>
```
::

Alternatively, you can use [CSS Container Queries](https://developer.mozilla.org/en-US/blog/getting-started-with-css-container-queries/) for better performance. Note that, this feature has been introduced recently. Check [CSS Container Queries compatibility table](https://caniuse.com/css-container-queries) to ensure that it's supported on your browser.

```css
#container {
  container: container / inline-size;
  ...
}
@container container (width < 200px) {
  ef-slider-marker[important-med] {
    display: none;
  }
}
@container container (width < 400px) {
  ef-slider-marker[important-low] {
    display: none;
  }
}
```

## CSS Variables
Colors of Slider are managed by the theme but can be overridden using CSS variables.

::
```javascript
::slider::
```
```css
ef-slider {
  max-width: 50%;
}
#red {
  --thumb-color:#e40303;
}
#orange {
  --thumb-color:#ff8c00;
}
#yellow {
  --thumb-color:#ffed00;
}
#green {
  --thumb-color:#008026;
}
#blue {
  --thumb-color:#004dff;
}
#violet {
  --thumb-color:#750787;
}
```
```html
<!-- EF supports Pride at LSEG -->
<ef-slider id="red" min="0" max="100" value="70"></ef-slider>
<ef-slider id="orange" min="0" max="100" value="80"></ef-slider>
<ef-slider id="yellow" min="0" max="100" value="95"></ef-slider>
<ef-slider id="green" min="0" max="100" value="90"></ef-slider>
<ef-slider id="blue" min="0" max="100" value="80"></ef-slider>
<ef-slider id="violet" min="0" max="100" value="70"></ef-slider>
```
::

| CSS Variables Name  | Description                                  |
| ------------------- | -------------------------------------------- |
| --track-color       | Slider track color                           |
| --progress-color    | Slider progress color                        |
| --thumb-color       | Color of Slider thumb and filled track color |
| --step-color        | Slider step color                            |
| --marker-color      | Marker color                                 |
| --input-field-width | Set input field width                        |

## Accessibility
::a11y-intro::

`ef-slider` is an interactive element similar to `<input type="range">`. Each Slider thumb has `role="slider"` and is focusable and its value can be updated by using `Arrow keys`, `Home` and `End`. Accessible name of `ef-slider` must be provided through aria attributes such as `aria-label`, `aria-labelledby` or `label[for="<element.id>"]` to accurately describe its objectives.

Like the other control elements, it supports `disabled` or `readonly` to match the element’s visual state.

::a11y-end::
