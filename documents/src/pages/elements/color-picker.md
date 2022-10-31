<!--
type: page
title: Color Picker
location: ./elements/color-picker
layout: default
-->

# Color Picker
::
```javascript
::color-picker::
```
```css
section {
  display:flex;
  justify-content: left;
  align-items: baseline;
  height: 380px;
  padding: 4px;
}
ef-color-picker {
  margin-right: 2px;
}
```
```html
<section>
  <ef-color-picker></ef-color-picker>
  <ef-color-picker value="#ff3300"></ef-color-picker>
  <ef-color-picker value="#00ff99"></ef-color-picker>
  <ef-color-picker value="#0066ff" opened></ef-color-picker>
</section>
```
::

`ef-color-picker` allows users to pick any colours from colour dialog.

### Basic usage
You can set an initial value via `value` attribute. The `value` must be a string of hex colour code.

```html
<ef-color-picker value="#001EFF"></ef-color-picker>
```

### Getting value
A value of Color picker can be accessed through `value` property. It will fire `value-changed` event when users picked a new colour. `value` will be an empty string if users choose No Color.

### 'No Color' option
In some circumstances, it might be necessary that the component should allow user to select "no color". This can be done by using a property/attribute `allow-nocolor` to activate this feature.

Color picker will set attribute/property `value` to `""` when users select no-color from the colour dialog.

```html
<ef-color-picker allow-nocolor></ef-color-picker>
```
