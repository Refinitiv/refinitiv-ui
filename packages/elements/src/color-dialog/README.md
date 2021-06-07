# Color Dialog

```live(preview)
<style>
  .dialog-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 450px;
  }
</style>
<script>
  function openDialog() {
    var dlg = document.getElementById('d1');
    dlg.opened = true;
  }
</script>
<ef-color-dialog id="d1" opened></ef-color-dialog>
<div class="dialog-container">
  <button onclick="openDialog()">Open Color Dialog</button>
</div>
```

`ef-color-dialog` is a component that allows users to select any colors. You can set value as hex color code (also supports short hex) or value of Red/Green/Blue (0 - 255). Users can choose color directly from palletes UI or using input boxes on the dialog.

### Basic usage

Color dialog can be opened and closed just like any popup window, This can be done by setting the attribute/property `opened`.

```html
<ef-color-dialog opened id="colorDialog"></ef-color-dialog>
```

### Preset default value
Color Dialog also accepts initial color value. To set default value, use `value` attribute.

```live
<style>
  .dialog-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 450px;
  }
</style>
<script>
  function openDialog() {
    var dlg = document.getElementById('d1');
    dlg.opened = true;
  }
</script>
<ef-color-dialog id="d1" opened value="#9966ff"></ef-color-dialog>
<div class="dialog-container">
  <button onclick="openDialog()">Open Color Dialog</button>
</div>
```

```html
<ef-color-dialog value="#9966ff"></ef-color-dialog>
```

### 'No Color' option
In some circumstances, it might be necessary that the component should allow user to select "no color". This can be done by using a property/attribute `allow-nocolor` to activate this feature.  

Color dialog will set attribute/property `value` to `null` when users select no-color from the UI.

```live
<style>
  .dialog-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 450px;
  }
</style>
<ef-color-dialog id="d1" opened allow-nocolor></ef-color-dialog>
<div class="dialog-container">
  <button onclick="openDialog()">Open Color Dialog</button>
</div>
<script>
  var d1 = document.getElementById('d1');

  function openDialog() {
    var dlg = document.getElementById('d1');
    dlg.opened = true;
  }
</script>
```

```html
<ef-color-dialog allow-nocolor></ef-color-dialog>
```
