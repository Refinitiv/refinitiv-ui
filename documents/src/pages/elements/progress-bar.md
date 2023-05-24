<!--
type: page
title: Progress Bar
location: ./elements/progress-bar
layout: default
-->

# Progress Bar

::
```javascript
::progress-bar::

let val;
let bar;
const bars = document.body.querySelectorAll('ef-progress-bar');
let i = 0;
let shift = 0;
const max = bars.length;
setInterval(() => {
  val = 100 / max * ((i + shift) % max + 1);
  bar = bars[i++ % max];
  bar.value = val;
  if (i % max === 0) {
    shift++;
  }
}, 333);
```
```css
.red {
  color: #F44336;
}
.pink {
  color: #E91E63;
}
.purple {
  color: #9C27B0;
}
.indigo {
  color: #3F51B5;
}
.navy {
  color: #334e96;
}
ef-progress-bar {
  margin-bottom: 10px;
  max-width: 600px;
}
```
```html
<ef-progress-bar class="red"></ef-progress-bar>
<ef-progress-bar class="pink"></ef-progress-bar>
<ef-progress-bar class="purple"></ef-progress-bar>
<ef-progress-bar class="indigo"></ef-progress-bar>
<ef-progress-bar class="navy"></ef-progress-bar>
```
::

`ef-progress-bar` is a simple visualization to display a single bar. It accepts a value between 0-100 and uses it as a percentage to fill the bar.

## Set bar length
The length of the bar can be set using the `value` attribute, which can be any decimal number between 0 and 100.

::
```javascript
::progress-bar::
```
```css
ef-progress-bar {
  margin-bottom: 10px;
}
```
```html
<ef-progress-bar value="100"></ef-progress-bar>
<ef-progress-bar value="75"></ef-progress-bar>
<ef-progress-bar value="50"></ef-progress-bar>
<ef-progress-bar value="25"></ef-progress-bar>
```
::

```html
<ef-progress-bar value="100"></ef-progress-bar>
<ef-progress-bar value="75"></ef-progress-bar>
<ef-progress-bar value="50"></ef-progress-bar>
<ef-progress-bar value="25"></ef-progress-bar>
```

## Show label
You can set the `label` attribute to display text at the end of a bar. To prevent a label from going outside of a container, apply the `margin-right` attribute.

```css
ef-progress-bar {
  margin-right: 45px;
}
```
```html
<ef-progress-bar value="100" label="100"></ef-progress-bar>
```

::
```javascript
::progress-bar::
```
```css
ef-progress-bar {
  margin-top: 10px;
  margin-right: 45px;
  margin-bottom: 45px
}
```
```html
<ef-progress-bar value="100" label="100"></ef-progress-bar>
```
::

## Customize height and color
Bar color and height have default values from the theme, but you can override them using CSS.

::
```javascript
::progress-bar::
```
```css
ef-progress-bar {
  height: 16px;
}
.highlighted {
  color: #000000;
}
ef-progress-bar {
  margin-right: 45px;
  margin-bottom: 10px
}
```
```html
<ef-progress-bar value="20" label="Potato Croquettes"></ef-progress-bar>
<ef-progress-bar value="50" label="Hamburger"></ef-progress-bar>
<ef-progress-bar class="highlighted" value="70" label="Sushi"></ef-progress-bar>
<ef-progress-bar value="35" label="Toast"></ef-progress-bar>
```
::

```css
ef-progress-bar {
  height: 16px;
}
.highlighted {
  color: #000000;
}
```
```html
<ef-progress-bar value="20" label="Potato Croquettes"></ef-progress-bar>
<ef-progress-bar value="50" label="Hamburger"></ef-progress-bar>
<ef-progress-bar class="highlighted" value="70" label="Sushi"></ef-progress-bar>
<ef-progress-bar value="65" label="Toast"></ef-progress-bar>
```

## Label slot
The `label` attribute supports only text. You can use slot to include any content e.g. icons or customize your label colour.

You may have to add some CSS to your content, to ensure that it looks nice.

::
```javascript
::progress-bar::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements@next/icon?min';
halo('icon');
```
```css
ef-progress-bar {
  margin-top: 5px;
  margin-bottom: 10px;
}
ef-progress-bar .thumb {
  position: absolute;
  top: -8px;
}
```
```html
<ef-progress-bar value="85">
  <ef-icon class="thumb" slot="label" icon="like-empty"></ef-icon>
</ef-progress-bar>
<ef-progress-bar value="15">
  <ef-icon class="thumb" slot="label" icon="dislike-empty"></ef-icon>
</ef-progress-bar>
```
::

```css
ef-progress-bar .thumb {
  position: absolute;
  top: -8px;
}
```

```html
<ef-progress-bar value="85">
  <ef-icon class="thumb" slot="label" icon="like-empty"></ef-icon>
</ef-progress-bar>
<ef-progress-bar value="15">
  <ef-icon class="thumb" slot="label" icon="dislike-empty"></ef-icon>
</ef-progress-bar>
```

