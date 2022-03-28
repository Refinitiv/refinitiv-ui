<!--
type: page
title: LED Gauge
location: ./elements/led-gauge
layout: default
-->

# LED Gauge

::
```javascript
::led-gauge::
```
```html
<ef-led-gauge top-label="Sector Avg." bottom-label="Current Price" top-value="-75" bottom-value="75"></ef-led-gauge>
<ef-led-gauge top-label="50.25" top-value="-30" range-label="Daily Range" range="[-80, -30]"></ef-led-gauge>
<ef-led-gauge zero="left" neutral-color top-label="150.50" top-value="50"></ef-led-gauge>
```
::

An LED gauge is used to show one or two values in an LED-like horizontal bar visualization. It is suited to display values where users can see and compare information such as industry average values, or 52-week high and 52-week low values.

## Usage
`ef-led-gauge` shows data in a scale of -100.00 to +100.00, with a mid-point of 0.00. By default, scales are divided equally and represented by 5 different colors -- Negative, Low-negative, Neutral, Low-positive, and Positive.

::
```javascript
::led-gauge::
```
```html
<ef-led-gauge top-label="0.00" top-value="0.00"></ef-led-gauge>
```
::

```html
<ef-led-gauge top-label="0.00" top-value="0.00"></ef-led-gauge>
```

To use `ef-led-gauge`, data has to be normalized to a -100.00 to +100.00 scale.

For example, to show data of 36.00 where the highest value is 60.00 and the lowest value is 90.00, the data needs to be normalized and set to `ef-led-gauge` as below.

| Raw value | LED gauge value |
| --------- | --------------- |
| 60.00     | -100.00         |
| 36.00     | -60.00          |
| 90.00     | +100.00         |

::
```javascript
::led-gauge::
```
```html
<ef-led-gauge top-label="36.00" top-value="-60.00"></ef-led-gauge>
```
::

```html
<ef-led-gauge top-label="36.00" top-value="-60.00"></ef-led-gauge>
```

## Mono color
`ef-led-gauge` can be wet to use only one color by adding the attribute `neutral-color`.

::
```javascript
::led-gauge::
```
```html
<ef-led-gauge neutral-color top-label="36.00" top-value="-60.00"></ef-led-gauge>
```
::

```html
<ef-led-gauge neutral-color top-label="36.00" top-value="-60.00"></ef-led-gauge>
```

## Showing range bar
Range bar mode can be used to show a range bar within the LED gauge. When Range bar mode is used, `ef-led-gauge` will automatically switch to using mono color.

The size of the range bar can be set using the `range` attribute where the values of range need to be normalized to the 100.00 to +100.00 scale.

To display a text label beneath the range bar, add the `range-label` attribute.

::
```javascript
::led-gauge::
```
```html
<ef-led-gauge neutral-color top-label="36.00" top-value="-60.00" range="[-70,-20]"></ef-led-gauge>
```
::

```html
<ef-led-gauge neutral-color top-label="36.00" top-value="-60.00" range="[-70,-20]"></ef-led-gauge>
```

## CSS Variables
The colors of the LED gauge are managed by the theme but can be overridden using CSS variables.

::
```javascript
::led-gauge::
```
```css
ef-led-gauge {
  --center-right-segment-color: rgba(60, 60, 200, 0.65);
  --right-segment-color: rgba(60, 60, 200, 1);
}
```
```html
<ef-led-gauge red-blue-scale></ef-led-gauge>
```
::

| CSS Variables Name           | Description                                               |
| ---------------------------- | --------------------------------------------------------- |
| --top-selected-color         | Color of top-value bar                                    |
| --clash-color                | Color of bar when top-value and bottom-value are the same |
| --bottom-selected-color      | Color of bottom-value bar                                 |
| --range-color                | Color of range bar                                        |
| --neutral-color              | Bars color in mono color mode                             |
| --left-segment-color         | Bars color of most left segment                           |
| --center-left-segment-color  | Bars color of center left segment                         |
| --center-segment-color       | Bars color of center segment                              |
| --center-right-segment-color | Bars color of center right segment                        |
| --right-segment-color        | Bars color of most right segment                          |

