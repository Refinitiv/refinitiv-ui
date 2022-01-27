<!--
type: page
title: Swing Gauge
location: ./elements/swing-gauge
layout: default
-->

# Swing Gauge
::
```javascript
::swing-gauge::
let value1;
let value2;
const min = 20;
const gauge = document.querySelector('ef-swing-gauge');

setInterval(() => {
  value1 = min + (100 - min * 2) * Math.random();
  value2 = 100 - value1;
  gauge.primaryValue = value1;
  gauge.secondaryValue = value2;
}, 2000);
```
```css
ef-swing-gauge {
  height: 150px;
  margin-top: 20px;
}
```
```html
<ef-swing-gauge
  primary-value="29"
  primary-label="Private"
  secondary-value="95"
  secondary-label="Public">
</ef-swing-gauge>
```
::

`ef-swing-gauge` is a data visualization element used to display the percentage comparison of two values.

### Usage
Values can be set to the gauge using the `primary-value` and `secondary-value` attributes. The percentage values shown in the gauge will be calculated by comparing `primary-value` and `secondary-value`. To show labels in the gauge, set the text to the  `primary-label` and `secondary-label` attributes.

::
```javascript
::swing-gauge::
```
```css
ef-swing-gauge {
  height: 150px;
}
```
```html
<ef-swing-gauge
  primary-value="30"
  secondary-value="70"
  primary-label="Private"
  secondary-label="Public">
</ef-swing-gauge>
```
::

```html
<ef-swing-gauge
  primary-value="30"
  secondary-value="70"
  primary-label="Private"
  secondary-label="Public">
</ef-swing-gauge>
```

### Legend
To show any legends in the gauge you can set the text to `primary-legend` and `secondary-legend` attributes. Legends will show on top of the gauge.

::
```javascript
::swing-gauge::
```
```html
<ef-swing-gauge
  primary-value="550"
  secondary-value="770"
  primary-label="Private"
  secondary-label="Public"
  primary-legend="Private companies in United States"
  secondary-legend="Public companies in United States">
</ef-swing-gauge>
```
::

```html
<ef-swing-gauge
  primary-value="550"
  secondary-value="770"
  primary-label="Private"
  secondary-label="Public"
  primary-legend="Private companies in United States"
  secondary-legend="Public companies in United States">
</ef-swing-gauge>
```

### Sizing
Swing Gauge has default size but you can customize `width` or `height` by using CSS.

::
```javascript
::swing-gauge::
```
```css
ef-swing-gauge {
  height: 100px;
}
```
```html
<div>
  <ef-swing-gauge
    small-gauge
    primary-value="30"
    secondary-value="70"
    primary-label="Private"
    secondary-label="Public">
  </ef-swing-gauge>
</div>
```
::

```css
ef-swing-gauge {
  height: 100px;
}
```

### Customize value format
The value that shows on Swing Gauge can be custom via the `valueFormatter` property. The first parameter will be the percentage that calculates by the input value. The second parameter will be the raw value of your input.

::
```javascript
::swing-gauge::

const el = document.getElementById('customValueFormat');
el.valueFormatter = (value, rawValue) => value.toFixed(0) + '%';
```
```html
<ef-swing-gauge id="customValueFormat" primary-value="15" secondary-value="69" primary-label="Private" secondary-label="Public"></ef-swing-gauge>
```
::

```javascript
const el = document.getElementById('customValueFormat');
el.valueFormatter = (value, rawValue) => value.toFixed(0) + '%';
};
```

### CSS Variables
Colors and center line of Swing Gauge are managed by theme but can be overridden by using CSS variables.

::
```javascript
::swing-gauge::
```
```css
ef-swing-gauge[custom-color] {
  --primary-color: #ff9933;
  --secondary-color: #9933ff;
  --border-color: transparent;
  --center-line: dashed;
  --center-line-color: #42f48c;
  --center-line-opacity: 1;
}
```
```html
<ef-swing-gauge
  custom-color
  primary-label="Private"
  secondary-label="Public"
  primary-value="40"
  secondary-value="60">
</ef-swing-gauge>
```
::

| CSS Variables Name    | Description                                          |
| --------------------- | ---------------------------------------------------- |
| --primary-color       | Color of primary gauge                               |
| --secondary-color     | Color of secondary gauge                             |
| --border-color        | Color of border                                      |
| --center-line         | Style of center line (solid, dotted, dashed or none) |
| --center-line-color   | Color of center line                                 |
| --center-line-opacity | Opacity/Transparency of center line                  |
