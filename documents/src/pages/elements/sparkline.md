<!--
type: page
title: Sparkline
location: ./elements/sparkline
layout: default
-->

# Sparkline
::
```javascript
::sparkline::
```
```css
ef-sparkline {
  width: 250px;
  height: 100px;
}
```
```html
<ef-sparkline reference-value="0" data="[-2, -3, 1, 1, 4, 6, -3, 1, 4, 6, 10, 9, 10, 9, 6, 4, 5, 0, 3, 2, 3, -1, -4, 2, 3, 4, 3, 6]"></ef-sparkline>
```
::

`ef-sparkline` is a small chart component for quickly representing historical data without axes.

### Usage
To create a sparkline, pass data as an array of numbers using the `data` attribute. The style of the sparkline is managed by the theme, but chart size can be customized using standard CSS.

::
```javascript
::sparkline::
```
```css
ef-sparkline {
  width: 200px;
  height: 100px;
}
```
```html
<ef-sparkline data="[-2, -3, 1, 1, 4, 6, -3, 1, 4, 6, 10, 9, 10, 9, 6, 4, 5, 0, 3, 2, 3, -1, -4, 2, 3, 4, 3, 6]"></ef-sparkline>
```
::

```css
ef-sparkline {
  width: 200px;
  height: 100px;
}
```

```html
<ef-sparkline data="[-2, -3, 1, 1, 4, 6, -3, 1, 4, 6, 10, 9, 10, 9, 6, 4, 5, 0, 3, 2, 3, -1, -4, 2, 3, 4, 3, 6]"></ef-sparkline>
```

### Reference line
Sparkline supports adding a reference line. The area above or below the reference line will be filled with different colors. The reference value can be set using the `reference-value` attribute or the `referenceValue` property.

::
```javascript
::sparkline::
```
```css
ef-sparkline {
  width: 200px;
  height: 100px;
}
```
```html
<ef-sparkline reference-value="0" data="[-2, -3, 1, 1, 4, 6, -3, 1, 4, 6, 10, 9, 10, 9, 6, 4, 5, 0, 3, 2, 3, -1, -4, 2, 3, 4, 3, 6]"></ef-sparkline>
```
::

```html
<ef-sparkline reference-value="0" data="[-2, -3, 1, 1, 4, 6, -3, 1, 4, 6, 10, 9, 10, 9, 6, 4, 5, 0, 3, 2, 3, -1, -4, 2, 3, 4, 3, 6]"></ef-sparkline>
```
### Display previous data
Sparkline can be set to display previous data with an inactive line color. It's common to use previous data for comparison with the current dataset.

When `previous-data` is provided, sparkline will use the value of last point in the dataset as a reference line. It is recommended to not set `reference-value` when previous data is used.

::
```javascript
::sparkline::
```
```css
ef-sparkline {
  width: 200px;
  height: 100px;
}
```
```html
<ef-sparkline previous-data="[-3, -2, 1, 0, 4, 2, -2, 4, 4, 6, -1]" data="[-2, -3, 1, 1, 4, 6, -3, 1, 4, 6, 10, 9, 10, 9, 3, 4, 3, 6]"></ef-sparkline>
```
::

```html
<ef-sparkline previous-data="[-3, -2, 1, 0, 4, 2, -2, 4, 4, 6, -1]" data="[-2, -3, 1, 1, 4, 6, -3, 1, 4, 6, 10, 9, 10, 9, 3, 4, 3, 6]"></ef-sparkline>
```

### CSS Variables
Sparkline colors and line width are managed by the theme but can be overridden using CSS variables.

::
```javascript
::sparkline::
```
```css
ef-sparkline[custom-line-color] {
  width: 200px;
  height: 100px;
  --line-color: #D94255;
  --line-width: 5px;
}
```
```html
<ef-sparkline custom-line-color data="[-2, -3, 1, 1, 4, 6, -3, 1, 4, 6, 10, 9, 10, 9, 6, 4, 5, 0, 3, 2, 3, -1, -4, 2, 3, 4, 3, 6]"></ef-sparkline>
```
::

| CSS Variables Name     | Description                                                          |
| ---------------------- | -------------------------------------------------------------------- |
| --line-color           | Line color                                                           |
| --line-width           | Line width                                                           |
| --reference-line-color | Reference line color                                                 |
| --previous-line-color  | Previous data line color                                             |
| --upper-line-color     | Color of line that is higher than the reference value                |
| --lower-line-color     | Color of line that is lower than the reference value                 |
| --fill-color-style     | Color style of higher and lower area. (e.g. gradient, solid or none) |


## Accessibility
::a11y-intro::

The Sparkline component has container and axes labels hidden from assistive technologies. Access to a data table is provided as a textual alternative for accessible users.

::a11y-end::
