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

## Custom Marks
Enhance sliders with custom marks using `ef-slider-marker` as children.

::
```javascript
::slider::
```
```css
ef-slider {
  width:50%;
  margin-left: 20px;
}
```
```html
<ef-slider step="25">
  <ef-slider-marker value="0">Lowest</ef-slider-marker>
  <ef-slider-marker value="25">Low</ef-slider-marker>
  <ef-slider-marker value="50">Neutral</ef-slider-marker>
  <ef-slider-marker value="75">High</ef-slider-marker>
  <ef-slider-marker value="100">Highest</ef-slider-marker>
</ef-slider>
```
::

```html
<ef-slider step="25">
  <ef-slider-marker value="0">Lowest</ef-slider-marker>
  <ef-slider-marker value="25">Low</ef-slider-marker>
  <ef-slider-marker value="50">Neutral</ef-slider-marker>
  <ef-slider-marker value="75">High</ef-slider-marker>
  <ef-slider-marker value="100">Highest</ef-slider-marker>
</ef-slider>
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
| --thumb-color       | Color of slider thumb and filled track color |
| --step-color        | Slider step color                            |
| --marker-color      | Marker color                                 |
| --input-field-width | Set input field width                        |

## Accessibility
::a11y-intro::

`ef-slider` is an interactive element similar to `<input type="range">`. Each slider thumb has `role="slider"` and is focusable and its value can be updated by using `Arrow keys`, `Home` and `End`. Accessible name of `ef-slider` must be provided through aria attributes such as `aria-label`, `aria-labelledby` to accurately describe its objectives.

Like the other control elements, it supports `disabled` or `readonly` to match the element’s visual state.

::a11y-end::
