# Radio Button

```live(preview)
<ef-radio-button name="group" checked>Option A</ef-radio-button>
<ef-radio-button name="group">Option B</ef-radio-button>
<ef-radio-button name="group">Option C</ef-radio-button>
<ef-radio-button name="group" style="width: 60px; padding: 20px 0;">Fixed width</ef-radio-button>
```

`ef-radio-button` is a form control for selecting one option from many options within the same group.

### Grouping radio buttons
Multiple `ef-radio-button` can be grouped by setting the same value to `name` attribute. Only one option in the same group can be selected. Once a group item is checked, you cannot uncheck a radio group unless setting the value through property or attribute.

```live
<ef-radio-button name="dairy" checked>Skimmed Milk</ef-radio-button>
<ef-radio-button name="dairy">Whole Milk</ef-radio-button>
<ef-radio-button name="dairy">Soya</ef-radio-button>
```

```html
<ef-radio-button name="dairy" checked>Skimmed Milk</ef-radio-button>
<ef-radio-button name="dairy">Whole Milk</ef-radio-button>
<ef-radio-button name="dairy">Soya</ef-radio-button>
```

### Disabled and readonly
`ef-radio-button` can be set to be disabled or readonly by using `disabled` or `readonly` attribute.

```live
<ef-radio-button checked>Default</ef-radio-button>
<ef-radio-button disabled checked>Disabled</ef-radio-button>
<ef-radio-button readonly checked>Readonly</ef-radio-button>
```

```html
<ef-radio-button checked>Default</ef-radio-button>
<ef-radio-button disabled checked>Disabled</ef-radio-button>
<ef-radio-button readonly>Readonly</ef-radio-button>
```

### Events
`checked-changed` is the **only** event fires from ef-radio-button. It is dispatched whenever the state has been changed from one to another by user interaction, such as a click or keyboard event.

```live
<style>
  #container {
    display: flex;
    align-items: center;
  }
  #label {
    margin-left: 30px;
    font-style: italic;
  }
</style>
<div id="container">
  <ef-radio-button name="dairy" checked>Skimmed</ef-radio-button>
  <ef-radio-button name="dairy">Whole</ef-radio-button>
  <ef-radio-button name="dairy">Soya</ef-radio-button>
  <div id="label"></div>
</div>
<script>
var label = document.getElementById('label');
var container = document.getElementById('container');
container.addEventListener('checked-changed', function (e) {
  if (e.target.checked) {
    label.textContent = '"I love ' + e.target.textContent + ' Milk!"';
  }
}, true);
</script>
```

```html
<div id="container">
  <ef-radio-button name="dairy" checked>Skimmed</ef-radio-button>
  <ef-radio-button name="dairy">Whole</ef-radio-button>
  <ef-radio-button name="dairy">Soya</ef-radio-button>
  <div id="label"></div>
</div>
<script>
var label = document.getElementById('label');
var container = document.getElementById('container');
container.addEventListener('checked-changed', function (e) {
  if (e.target.checked) {
    label.textContent = '"I love ' + e.target.textContent + ' Milk!"';
  }
}, true);
</script>
```
