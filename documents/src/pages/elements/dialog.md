<!--
type: page
title: Dialog
location: ./elements/dialog
layout: default
-->

# Dialog
::
```javascript
::dialog::
```
```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
}
```
```html
<ef-dialog id="d1" header="System Permissions" opened>
  <p>Grant geolocation permissions?</p>
  <p>This will allow the application to see your real-time location at any point in time.</p>
</ef-dialog>
<div class="container">
  <ef-button onclick="document.querySelector('#d1').opened = true;">Open Dialog</ef-button>
</div>
```
::

`ef-dialog` is a popup window designed to contain and display any HTML content. It provides modal and dragging functionality, and also allows custom footers and control buttons to be included.

### Usage

Dialog can easily be launched by adding the `opened` property. If you want the dialog to open by default, include the `opened` attribute when you embed `ef-dialog`.

```html
<ef-dialog id="dlg1" header="System Permissions">
  <p>Grant geolocation permissions?</p>
  <p>This will allow the application to see your real-time location at any point in time.</p>
</ef-dialog>
```
```javascript
const dlg = document.getElementById('dlg1');
dlg.opened = true;
```

The default behavior of `ef-dialog` is to display at the center of the viewport and to not be draggable. You can enable dragging by adding the `draggable` attribute or using the property setting.

::
```javascript
::dialog::
```
```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
}
```
```html
<ef-dialog id="d1" header="System Permissions" draggable opened>
  <p>Grant geolocation permissions?</p>
  <p>This will allow the application to see your real-time location at any point in time.</p>
</ef-dialog>
<div class="container">
  <ef-button onclick="document.querySelector('#d1').opened = true;">Open Dialog</ef-button>
</div>
```
::

```html
<ef-dialog id="dlg1" header="System Permissions" draggable>
  <p>Grant geolocation permissions?</p>
  <p>This will allow the application to see your real-time location at any point in time.</p>
</ef-dialog>
```

### Confirmed vs cancelled

You may want to detect if the user has closed the dialog by clicking the OK or Cancel button. You can listen to the `opened-changed` event and check the value of the `confirmed` property, which will be set to `true` if the user clicked the OK button to close the dialog.

::
```javascript
::dialog::
const dlg = document.getElementById('d1');
dlg.addEventListener('opened-changed', () => {
  document.getElementById('close-result').innerHTML = dlg.confirmed ? 'User clicked OK' : 'User clicked Cancel';
});
```
```css
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
}
```
```html
<ef-dialog id="d1" header="System Permissions" draggable opened>
  <p>Grant geolocation permissions?</p>
  <p>This will allow the application to see your real-time location at any point in time.</p>
</ef-dialog>
<div class="container">
  <ef-button onclick="document.getElementById('d1').opened = true;">Open Dialog</ef-button>
  <p id="close-result"><p>
</div>
```
::

```html
<ef-dialog id="d1" header="System Permissions">
  <p>Grant geolocation permissions?</p>
  <p>This will allow the application to see your real-time location at any point in time.</p>
</ef-dialog>
```
```javascript
const dlg = document.getElementById('d1');
dlg.addEventListener('opened-changed', () => {
  if (dlg.confirmed) {
    // user clicked OK button
  }
  else {
    // user clicked Cancel button
  }
});
```

### Customize footer content

The dialog provides default OK and Cancel buttons. To replace those buttons with your own content, assign content to the `footer` slot.

::
```javascript
::dialog::
```
```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
}
```
```html
<ef-dialog id="d1" header="System Permissions">
  <p>Grant geolocation permissions?</p>
  <p>This will allow the application to see your real-time location at any point in time.</p>
  <div slot="footer" style="padding: 15px 25px;">
    <ef-button style="width:100%" cta onclick="document.getElementById('d1').opened = false;">Accept</ef-button>
  </div>
</ef-dialog>
<div class="container">
  <ef-button onclick="document.getElementById('d1').opened = true;">Custom Dialog</ef-button>
</div>
```
::

```html
<ef-dialog id="d1" header="System Permissions">
  <p>Grant geolocation permissions?</p>
  <p>This will allow the application to see your real-time location at any point in time.</p>
  <div slot="footer" style="padding: 15px 25px;">
      <ef-button style="width:100%" cta onclick="document.getElementById('d1').opened = false;">Accept</ef-button>
  </div>
</ef-dialog>
```

### Customize close behaviors

By default, `ef-dialog` will only close when the user clicks the OK or Cancel button, or presses the ESC key. However, you can allow the dialog to close when the user clicks outside of the dialog, or prevent the dialog from closing when the ESC key is pressed.

To close the dialog when the user clicks outside of the dialog, set the `noCancelOnOutsideClick` property to `false`.

```html
<ef-dialog id="d1" header="System Permissions">
  <p>Grant geolocation permissions?</p>
  <p>This will allow the application to see your real-time location at any point in time.</p>
</ef-dialog>
```
```javascript
document.getElementById('d1').noCancelOnOutsideClick = false;
```

To prevent the dialog from closing on ESC key press, add the `no-cancel-on-esc-key` attribute to `ef-dialog`.
