<!--
type: page
title: Counter
location: ./elements/counter
layout: default
-->

# Counter

::
```javascript
::counter::
```
```html
<ef-counter value="20"></ef-counter>
<ef-counter max="100" value="150"></ef-counter>
<ef-counter value="1999"></ef-counter>
<ef-counter max="1000" value="1999"></ef-counter>
```
::

`ef-counter` is a badge component which can be used to show a number of selected items.

## Usage
The number that displays on the counter can be set via the `value` attribute/property. If `value` is unset, negative or not a string number, it will display '0'. Any decimal value will be truncated e.g. '9.9' will be converted to '9'.

::
```javascript
::counter::
```
```html
<ef-counter></ef-counter>
<ef-counter value="9"></ef-counter>
<ef-counter value="9.9"></ef-counter>
<ef-counter value="XYZ"></ef-counter>
<ef-counter value="-10"></ef-counter>
```
::

```html
<ef-counter></ef-counter>
<ef-counter value="9"></ef-counter>
<ef-counter value="9.9"></ef-counter>
<ef-counter value="XYZ"></ef-counter>
<ef-counter value="-10"></ef-counter>
```
## Set maximum value
Use the `max` attribute/property to limit the value displayed. The counter will display the maximum value with a plus sign suffix `+` when `value` is greater than `max`.

If `max` is unset, negative or not a string number, it will reset to the default and the counter will not apply the max to its value. If `max` is set with a decimal, it will be truncated e.g. '99.9' will be converted to '99'.


::
```javascript
::counter::
```
```html
<ef-counter value="100"></ef-counter>
<ef-counter max="99.9" value="100"></ef-counter>
<ef-counter max="XYZ" value="100"></ef-counter>
<ef-counter max="-99" value="100"></ef-counter>
<ef-counter max="199" value="200"></ef-counter>
```
::

```html
<ef-counter value="100"></ef-counter>
<ef-counter max="99.9" value="100"></ef-counter>
<ef-counter max="XYZ" value="100"></ef-counter>
<ef-counter max="-99" value="100"></ef-counter>
<ef-counter max="199" value="200"></ef-counter>
```

## Compact notation
`ef-counter` supports compact notation to minimize large number formats. Numbers greater than 999 will be formatted as abbreviated numbers.

::
```javascript
::counter::
```
```html
<ef-counter value="9999"></ef-counter>
<ef-counter value="99999"></ef-counter>
<ef-counter value="999999"></ef-counter>
<ef-counter value="9999999"></ef-counter>
<ef-counter value="99999999"></ef-counter>
<ef-counter value="999999999"></ef-counter>
<ef-counter value="9999999999"></ef-counter>
<ef-counter value="99999999999"></ef-counter>
<ef-counter value="999999999999"></ef-counter>
<ef-counter value="9999999999999"></ef-counter>
<ef-counter value="99999999999999"></ef-counter>
<ef-counter value="999999999999999"></ef-counter>
```
::

```html
<ef-counter value="9999"></ef-counter>
<ef-counter value="99999"></ef-counter>
<ef-counter value="999999"></ef-counter>
<ef-counter value="9999999"></ef-counter>
<ef-counter value="99999999"></ef-counter>
<ef-counter value="999999999"></ef-counter>
<ef-counter value="9999999999"></ef-counter>
<ef-counter value="99999999999"></ef-counter>
<ef-counter value="999999999999"></ef-counter>
<ef-counter value="9999999999999"></ef-counter>
<ef-counter value="99999999999999"></ef-counter>
<ef-counter value="999999999999999"></ef-counter>
```

Compact notation also work with the `max` attribute.

::
```javascript
::counter::
```
```html
<ef-counter max="9000" value="9999"></ef-counter>
<ef-counter max="90000" value="99999"></ef-counter>
<ef-counter max="900000" value="999999"></ef-counter>
<ef-counter max="9000000" value="9999999"></ef-counter>
<ef-counter max="90000000" value="99999999"></ef-counter>
<ef-counter max="900000000" value="999999999"></ef-counter>
<ef-counter max="9000000000" value="9999999999"></ef-counter>
<ef-counter max="90000000000" value="99999999999"></ef-counter>
<ef-counter max="900000000000" value="999999999999"></ef-counter>
<ef-counter max="9000000000000" value="9999999999999"></ef-counter>
<ef-counter max="90000000000000" value="99999999999999"></ef-counter>
<ef-counter max="900000000000000" value="999999999999999"></ef-counter>
```
::

```html
<ef-counter max="9000" value="9999"></ef-counter>
<ef-counter max="90000" value="99999"></ef-counter>
<ef-counter max="900000" value="999999"></ef-counter>
<ef-counter max="9000000" value="9999999"></ef-counter>
<ef-counter max="90000000" value="99999999"></ef-counter>
<ef-counter max="900000000" value="999999999"></ef-counter>
<ef-counter max="9000000000" value="9999999999"></ef-counter>
<ef-counter max="90000000000" value="99999999999"></ef-counter>
<ef-counter max="900000000000" value="999999999999"></ef-counter>
<ef-counter max="9000000000000" value="9999999999999"></ef-counter>
<ef-counter max="90000000000000" value="99999999999999"></ef-counter>
<ef-counter max="900000000000000" value="999999999999999"></ef-counter>
```

## Accessibility
::a11y-intro::

`ef-counter` can be read by screen readers in a similar way to a generic text HTML element. It isn't meant to be an actionable element so, generally, it shouldn't be focusable and it's not necessary for it to be assigned any roles.

::a11y-end::
