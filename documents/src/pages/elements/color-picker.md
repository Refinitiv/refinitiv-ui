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

## Accessibility
::a11y-intro::

`ef-color-picker` is assigned `role="button"`. States such as `disabled` or `readonly` are programmatically updated to match the element’s visual state. Users can open the dialog with color dialog element and use keyboard navigation to select the color from the color dialog.

`ef-color-picker` has implemented by using [readableColor](https://github.com/Refinitiv/refinitiv-ui/tree/v6/packages/utils#color-helper) util as `aria-label` to describe a color.

::a11y-end::
