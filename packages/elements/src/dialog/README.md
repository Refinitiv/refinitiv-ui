# Dialog

```live(preview)
<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 300px;
  }
</style>
<ef-dialog id="d1" header="System Permissions" draggable opened>
  <p>Grant geolocation permissions?</p>
  <p>This will allow the application to see your real-time location at any point in time.</p>
</ef-dialog>
<div class="container">
  <ef-button onclick="document.querySelector('#d1').opened = true;">Open Dialog</ef-button>
</div>
```

`ef-dialog` is a popup window, designed to contain and show any HTML content. It provides modal and dragging functionality, and also allows custom footers and control buttons to be used.

### Basic usage

Dialog can easily be used by adding it into your app and then using `opened` property to open the dialog. You can add `opened` attribute to `ef-dialog` if you want the dialog opens by default.

```html
<ef-dialog id="dlg1" header="System Permissions">
  <p>Grant geolocation permissions?</p>
  <p>This will allow the application to see your real-time location at any point in time.</p>
</ef-dialog>
```
```js
var dlg = document.getElementById('dlg1');
function showDialog(open) {
  dlg.opened = open;
}
```

Default behavior of `ef-dialog` is to show at center of viewport and not be draggable. You can enable dragging easily by adding `draggable` attribute or using property setting.

```live
<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 300px;
  }
  ef-button {
    margin: 0 5px;
  }
</style>
<script>
  function openDialog(id, dragMode) {
    var dlg = document.getElementById(id);
    dlg.draggable = dragMode;
    dlg.opened = true;
  }
</script>
<ef-dialog id="d1" header="System Permissions">
  <p>Grant geolocation permissions?</p>
  <p>This will allow the application to see your real-time location at any point in time.</p>
</ef-dialog>
<div class="container">
  <ef-button onclick="openDialog('d1', true)">Draggable</ef-button>
  <ef-button onclick="openDialog('d1', false)">Fixed</ef-button>
</div>
```

```html
<ef-dialog id="dlg1" header="System Permissions" draggable>
  <p>Grant geolocation permissions?</p>
  <p>This will allow the application to see your real-time location at any point in time.</p>
</ef-dialog>
```

### Confirmed vs cancelled

You may want to detect if user closed the dialog by clicking OK or Cancel button. You can listen to `opened-changed` event and check value of `confirmed` property. It will be set to `true` if user clicked OK button to close the dialog.

```live
<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 300px;
  }
</style>
<ef-dialog id="d1" header="System Permissions" draggable opened>
  <p>Grant geolocation permissions?</p>
  <p>This will allow the application to see your real-time location at any point in time.</p>
</ef-dialog>
<div class="container">
  <ef-button onclick="document.getElementById('d1').opened = true;">Open Dialog</ef-button>
  <p id="close-result"><p>
</div>
<script>
var dlg = document.getElementById('d1');
dlg.addEventListener('opened-changed', function (e) {
  document.getElementById('close-result').innerHTML = dlg.confirmed ? 'User clicked OK' : 'User clicked Cancel';
});
</script>
```

```html
<ef-dialog id="d1" header="System Permissions">
  <p>Grant geolocation permissions?</p>
  <p>This will allow the application to see your real-time location at any point in time.</p>
</ef-dialog>
```
```js
var dlg = document.getElementById('d1');
dlg.addEventListener('opened-changed', function (e) {
  if (dlg.confirmed) {
    // user clicked OK button
  }
  else {
    // user clicked Cancel button
  }
});
```

### Customize footer content

The dialog provides default OK and Cancel buttons when `footer` slot is not assigned. To replace those buttons with your own content, assign content to the `footer` slot.

```live
<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 300px;
  }
</style>
<ef-dialog id="d1" header="System Permissions">
  <p>Grant geolocation permissions?</p>
  <p>This will allow the application to see your real-time location at any point in time.</p>
  <div slot="footer" style="padding: 15px 25px;">
      <ef-button style="width:100%" cta onclick="accept()">Accept</ef-button>
  </div>
</ef-dialog>
<div class="container">
  <ef-button onclick="document.getElementById('d1').opened = true;">Custom Dialog</ef-button>
</div>
<script>
  function accept () {
    document.getElementById('d1').opened = false;
  }
</script>
```

```html
<ef-dialog id="d1" header="System Permissions">
  <p>Grant geolocation permissions?</p>
  <p>This will allow the application to see your real-time location at any point in time.</p>
  <div slot="footer" style="padding: 15px 25px;">
      <ef-button style="width:100%" cta onclick="accept()">Accept</ef-button>
  </div>
</ef-dialog>
```
```js
function accept () {
  // user clicked accept button, close dialog.
  document.getElementById('d1').opened = false;
}
```

### Customize close behaviors

By default, `ef-dialog` will only close when user clicks OK or Cancel button, or presses ESC key. However, you can allow the dialog to close when the user clicks outside the dialog, or prevent dialog closing when ESC key is pressed.

To close dialog when user clicked outside the dialog, set `noCancelOnOutsideClick` property to `false`.

```html
<ef-dialog id="d1" header="System Permissions">
  <p>Grant geolocation permissions?</p>
  <p>This will allow the application to see your real-time location at any point in time.</p>
</ef-dialog>
```
```js
document.getElementById('d1').noCancelOnOutsideClick = false;
```

To prevent dialog closing on ESC key press, add `no-cancel-on-esc-key` attribute to `ef-dialog`.

```html
<ef-dialog id="d1" header="System Permissions" no-cancel-on-esc-key>
  <p>Grant geolocation permissions?</p>
  <p>This will allow the application to see your real-time location at any point in time.</p>
</ef-dialog>
```
