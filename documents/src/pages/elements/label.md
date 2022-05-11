<!--
type: page
title: Label
location: ./elements/label
layout: default
-->

# Label

::
```javascript
::label::
```
```css
@keyframes resize {
  from {
    width: 95%;
  }
  to {
    width: 60%;
  }
}
.wrapper {
  display: flex;
  flex-direction: column;
  border: 1px solid #9ea8f4;
  width: 100%;
  animation: resize ease-in-out 3s alternate infinite;
  height: 120px;
}
ef-label.animation {
  padding: 0px 20px;
  margin: 10px 0px;
}
hr {
  background: #9ea8f4;
  margin: 0px;
  width: 100%;
  height: 1px;
}
```
```html
<div class="wrapper">
  <ef-label class="animation">
    Universal basic income (UBI) is a government program in which every adult citizen receives a set amount of money on a regular basis. The goals of a basic income system are to alleviate poverty and replace other need-based social programs that potentially require greater bureaucratic involvement.
  </ef-label>
  <hr>
  <ef-label line-clamp="1" class="animation">
    Universal basic income (UBI) is a government program in which every adult citizen receives a set amount of money on a regular basis. The goals of a basic income system are to alleviate poverty and replace other need-based social programs that potentially require greater bureaucratic involvement.
  </ef-label>
  <hr>
  <ef-label line-clamp="2" class="animation">
    Universal basic income (UBI) is a government program in which every adult citizen receives a set amount of money on a regular basis. The goals of a basic income system are to alleviate poverty and replace other need-based social programs that potentially require greater bureaucratic involvement.
  </ef-label>
</div>
```
::

`ef-label` is a responsive text container that provides automatic ellipsis and middle truncation. A tooltip is shown if the text does not fit.

## Usage

Wrap the text with `ef-label`. Middle truncation and tooltip are applied automatically.

::
```javascript
::label::
```
```css
ef-label {
  margin: 10px 0 120px 0;
  width:400px;
}
```
```html
<ef-label>
  Universal basic income (UBI) is a government program in which every adult citizen receives a set amount of money on a regular basis. The goals of a basic income system are to alleviate poverty and replace other need-based social programs that potentially require greater bureaucratic involvement.
</ef-label>
```
::

```html
<ef-label style="width:400px">
  Universal basic income (UBI) is a government program in which every adult citizen receives a set amount of money on a regular basis. The goals of a basic income system are to alleviate poverty and replace other need-based social programs that potentially require greater bureaucratic involvement.
</ef-label>
```

## Line clamp

Use `line-clamp` attribute to handle the maximum number of lines to display.

::
```javascript
::label::
```
```css
ef-label {
  margin: 5px 0px 45px;
  width:400px;
}
```
```html
<ef-label line-clamp="1">
    Universal basic income (UBI) is a government program in which every adult citizen receives a set amount of money on a regular basis. The goals of a basic income system are to alleviate poverty and replace other need-based social programs that potentially require greater bureaucratic involvement.
</ef-label>
<br/>
<ef-label line-clamp="2">
    Universal basic income (UBI) is a government program in which every adult citizen receives a set amount of money on a regular basis. The goals of a basic income system are to alleviate poverty and replace other need-based social programs that potentially require greater bureaucratic involvement.
</ef-label>
```
::

```html
<ef-label style="width:400px" line-clamp="1">
    Universal basic income (UBI) is a government program in which every adult citizen receives a set amount of money on a regular basis. The goals of a basic income system are to alleviate poverty and replace other need-based social programs that potentially require greater bureaucratic involvement.
</ef-label>
<br/>
<ef-label style="width:400px" line-clamp="2">
    Universal basic income (UBI) is a government program in which every adult citizen receives a set amount of money on a regular basis. The goals of a basic income system are to alleviate poverty and replace other need-based social programs that potentially require greater bureaucratic involvement.
</ef-label>
```
