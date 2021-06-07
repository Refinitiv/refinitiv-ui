# Slider

```live(preview)
<style>
ef-slider{
  width:50%;
  margin:5px 10px;
}
</style>
<ef-slider min="0" max="100" value="45"></ef-slider>
<ef-slider range min="0" max="100" from="25" to="75" min-range="1"></ef-slider>
<ef-slider show-input-field min="0" max="100" value="45"></ef-slider>
<ef-slider show-input-field range min="0" max="100" from="25" to="75"  min-range="1"></ef-slider>
```

### Basic usage
Sliders allow users to make selections from a range of values. It assigns values to `min` and `max` to set the slider's range. The default value can be set using the `value` attribute.

```live
<style>
ef-slider{
  width:50%;
  margin:5px 10px;
}
</style>
<ef-slider min="0" max="100" value="60"></ef-slider>
```

```html
<ef-slider min="0" max="100" value="60"></ef-slider>
```

To get value for slider, you can access it using `value` property.

```html
<ef-slider id="level" value="1" min="0" max="10"></ef-slider>
```
```js
var el = document.getElementById('level');
el.value; // "1"
```

You can add event listener to the element for `value-changed` event. The event will be triggered when users change the value of the slider.

### Range slider
Adds `range` attribute to make slider support `from` and `to` instead of a single value.

```live
<style>
ef-slider{
  width:50%;
  margin:15px 15px;
}
ef-slider:first-child{
  margin:25px 15px 10px 15px;
}
</style>
<ef-slider min="0" max="100" from="10" to="50" range></ef-slider>
```

```html
<ef-slider min="0" max="100" from="10" to="50" range></ef-slider>
```

In the range mode, the control will provide values between `from` and `to`. You can use `from-changed` and `to-changed` events to get notified when those values are changed.

In some use cases, you may need to set a minimum number of values between `from` and `to`. For example, you might want users to set at least 10 values in a range. You can set `min-range` to 10.

```live
<ef-slider min="0" max="100" from="10" to="50" range min-range="10"></ef-slider>
```

```html
<ef-slider min="0" max="100" from="10" to="50" range min-range="10"></ef-slider>
```

### Input Field
Input fields can be set to show on the side of slider. It shows the current value of slider and allows users to set the value of the slider with their keyboard.

```live
<style>
ef-slider{
  width:50%;
  margin:15px 15px;
}
ef-slider:first-child{
  margin:25px 15px 10px 15px;
}
</style>
<ef-slider show-input-field min="0" max="100" value="40"></ef-slider>
<ef-slider show-input-field min="0" max="100" from="10" to="50" range></ef-slider>
```

```html
<ef-slider show-input-field min="0" max="100" value="40"></ef-slider>
<ef-slider show-input-field min="0" max="100" from="10" to="50" range></ef-slider>
```

### Steps
The `step` attribute specifies the size of each increment or decrement for the slider control. By default, the slider will not show step marks but this can be set using `show-steps`.

```live
<style>
ef-slider{
  width:50%;
  margin:5px 10px;
}
</style>
<ef-slider min="0" max="10" value="5" step="0.5" show-steps show-input-field></ef-slider>
<ef-slider min="0" max="100" from="60" to="80" step="20" range show-steps show-input-field></ef-slider>
```

```html
<ef-slider min="0" max="10" value="5" step="0.5" show-steps show-input-field></ef-slider>
<ef-slider min="0" max="100" from="60" to="80" step="20" range show-steps show-input-field></ef-slider>
```

### Customize colors
Colors of slider are managed by theme but can be overriden by using CSS variables.

```live
<style>
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
</style>

<!-- ELF supports Pride at Refinitiv -->
<ef-slider id="red" min="0" max="100" value="70"></ef-slider>
<ef-slider id="orange" min="0" max="100" value="80"></ef-slider>
<ef-slider id="yellow" min="0" max="100" value="95"></ef-slider>
<ef-slider id="green" min="0" max="100" value="90"></ef-slider>
<ef-slider id="blue" min="0" max="100" value="80"></ef-slider>
<ef-slider id="violet" min="0" max="100" value="70"></ef-slider>
```

| CSS Variables Name | Description                                                    |
| ------------------ | -------------------------------------------------------------- |
| --track-color      | Slider track color                                            |
| --thumb-color      | Color of slider thumb and filled track color                  |
| --step-color       | Slider step color                                             |
| --input-field-width| Set input field width                                          |

```css
#red {
  --thumb-color:#e40303;
}
```
```html
<ef-slider id="red" min="0" max="100" value="70"></ef-slider>
```
