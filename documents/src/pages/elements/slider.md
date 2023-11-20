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

To get the value of slider, access it using the `value` property.

```html
<ef-slider value="1" min="0" max="10"></ef-slider>
```
```javascript
const slider = document.querySelector("ef-slider");
console.log(slider.value); // "1"
```

You can add an event listener to the element for the `value-changed` event. The event will be triggered when users change the value of the slider.

## Range slider

Add a `range` attribute to make the slider support `from` and `to` instead of a single value.

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

## Show input field
Input fields can be set to display on the side of slider. They show the current value of the slider and also allow users to set it with their keyboard.

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

## Set steps
The `step` attribute specifies the size of each increment or decrement on the slider control. By default, the slider will not show step marks but this can be set using `show-steps`.

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

## Custom markers
You can add markers emphasizing specific values of the sliders with `ef-slider-marker`. The markers could be labelled by adding contents inside `ef-slider-marker`.

Slider progress could be hidden by setting `--progress-color` CSS variable value to `transparent`.

::
```javascript
::slider::
```
```css
ef-slider {
  --progress-color: transparent;
  width: 50%;
  margin: 20px;
  margin-left: 30px;
}

.container {
  display: flex;
  align-items: center;
  margin-left: 10px;
}
```
```html
<div class="container">
  <label for="temperature">Temperature</label>
  <ef-slider id="temperature">
    <ef-slider-marker value="0">0°C</ef-slider-marker>
    <ef-slider-marker value="20">20°C</ef-slider-marker>
    <ef-slider-marker value="70">70°C</ef-slider-marker>
    <ef-slider-marker value="100">100°C</ef-slider-marker>
  </ef-slider>
</div>
<div class="container">
  <label for="tracking-speed">Tracking speed</label>
  <ef-slider id="tracking-speed" step="25">
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
<div class="container">
  <label for="temperature">Temperature</label>
  <ef-slider id="temperature">
    <ef-slider-marker value="0">0°C</ef-slider-marker>
    <ef-slider-marker value="20">20°C</ef-slider-marker>
    <ef-slider-marker value="70">70°C</ef-slider-marker>
    <ef-slider-marker value="100">100°C</ef-slider-marker>
  </ef-slider>
</div>
<div class="container">
  <label for="tracking-speed">Tracking speed</label>
  <ef-slider id="tracking-speed" step="25">
    <ef-slider-marker value="0">Slow</ef-slider-marker>
    <ef-slider-marker value="25"></ef-slider-marker>
    <ef-slider-marker value="50">Medium</ef-slider-marker>
    <ef-slider-marker value="75"></ef-slider-marker>
    <ef-slider-marker value="100">Fast</ef-slider-marker>
  </ef-slider>  
</div>
```
```css
ef-slider {
  --progress-color: transparent;
  ...
}
```

## CSS Variables
Colors of slider are managed by the theme but can be overridden using CSS variables.

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
| --thumb-color       | Color of slider thumb and filled track color |
| --step-color        | Slider step color                            |
| --marker-color      | Marker color                                 |
| --input-field-width | Set input field width                        |

## Accessibility
::a11y-intro::

`ef-slider` is an interactive element similar to `<input type="range">`. Each slider thumb has `role="slider"` and is focusable and its value can be updated by using `Arrow keys`, `Home` and `End`. Accessible name of `ef-slider` must be provided through aria attributes such as `aria-label`, `aria-labelledby` to accurately describe its objectives.

Like the other control elements, it supports `disabled` or `readonly` to match the element’s visual state.

::a11y-end::
