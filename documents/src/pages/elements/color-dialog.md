<!--
type: page
title: Color Dialog
location: ./elements/color-dialog
layout: default
-->

# Color Dialog

::
```javascript
::color-dialog::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/button?min';
halo('button');
document.getElementById('button').addEventListener('click', () => {
  let dlg = document.getElementById('d1');
  dlg.opened = true;
});
```
```css
.dialog-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 450px;
}
```
```html
<ef-color-dialog id="d1" opened></ef-color-dialog>
<div class="dialog-container">
  <ef-button id="button">Open Color Dialog</ef-button>
</div>
```
::

`ef-color-dialog` allows users to select any color. You can set the value as a hex color code (short hex is also supported) or as Red/Green/Blue (0 - 255). Users can choose a color directly from a pallete UI or via input boxes in the dialog.

### Usage

Color dialog can be opened and closed just like any popup window, by setting the attribute/property `opened`.

```html
<ef-color-dialog opened id="colorDialog"></ef-color-dialog>
```

### Preset default value

Color Dialog also accepts an initial color value. To set the default value, use the `value` attribute.

::
```javascript
::color-dialog::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/button?min';
halo('button');
document.getElementById('button').addEventListener('click', () => {
  let dlg = document.getElementById('d1');
  dlg.opened = true;
});
```
```css
.dialog-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 450px;
}
```
```html
<ef-color-dialog id="d1" opened value="#9966ff"></ef-color-dialog>
<div class="dialog-container">
  <ef-button id="button">Open Color Dialog</ef-button>
</div>
```
::

```html
<ef-color-dialog value="#9966ff"></ef-color-dialog>
```

### 'No Color' option

In some circumstances, it might be necessary for the component to allow a user to select "no color." This option can be activated using the `allow-nocolor` property/attribute.  

When users select "no color" from the UI, the color dialog sets the attribute/property `value` to `null`.

::
```javascript
::color-dialog::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/button?min';
halo('button');
document.getElementById('button').addEventListener('click', () => {
  let dlg = document.getElementById('d1');
  dlg.opened = true;
});
```
```css
.dialog-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 450px;
}
```
```html
<ef-color-dialog id="d1" opened allow-nocolor></ef-color-dialog>
<div class="dialog-container">
  <ef-button id="button">Open Color Dialog</ef-button>
</div>
```
::

```html
<ef-color-dialog allow-nocolor></ef-color-dialog>
```
