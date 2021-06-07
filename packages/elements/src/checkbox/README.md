# Checkbox

```live(preview)
<style>
  .container {
    display: flex;
    flex-direction: column;
  }
  ef-checkbox {
    margin-left: 3px;
  }
</style>
<div class="container">
  <ef-checkbox>Unchecked</ef-checkbox>
  <ef-checkbox checked>Checked</ef-checkbox>
  <ef-checkbox indeterminate>Partially checked</ef-checkbox>
  <ef-checkbox style="width: 80px;">Fixed width</ef-checkbox>
</div>
```

`ef-checkbox` is a form control for selecting one or several options. States of check box can be checked, unchecked, and indeterminate.

### Using checkbox
Checkbox can be set to checked state by adding `checked` attribute. You can also use it to determine a current state of the checkbox. An indeterminate state can only be set in code and not by user interaction.

```live
<style>
  ef-checkbox {
    margin-left: 3px;
  }
</style>
<ef-checkbox>Unchecked</ef-checkbox>
<ef-checkbox checked>Checked</ef-checkbox>
<ef-checkbox indeterminate>Partially checked</ef-checkbox>
```

```html
<ef-checkbox>Unchecked</ef-checkbox>
<ef-checkbox checked>Checked</ef-checkbox>
<ef-checkbox indeterminate>Partially checked</ef-checkbox>
```

### Disabled and readonly
`ef-checkbox` can be set to disabled or readonly by adding them as an attribute.

```live
<style>
  ef-checkbox {
    margin-left: 3px;
  }
</style>
<ef-checkbox checked>Default</ef-checkbox>
<ef-checkbox disabled checked>Disabled</ef-checkbox>
<ef-checkbox readonly checked>Readonly</ef-checkbox>
```

```html
<ef-checkbox checked>Default</ef-checkbox>
<ef-checkbox disabled checked>Disabled</ef-checkbox>
<ef-checkbox readonly checked>Readonly</ef-checkbox>
```

### Events
`checked-changed` event can be used to recognize when the state of a checkbox has been changed from one to another. In code, it can check if the state is checked or indeterminate by using `checked` or `indeterminate` property.

```live
<style>
  .container {
    display: inline-flex;
    align-items: center;
  }
  #text {
    padding-left: 20px;
  }
  ef-checkbox {
    margin-left: 3px;
  }
</style>
<div class="container">
  <ef-checkbox id="Checkbox">Click Me</ef-checkbox>
  <span id="text"></span>
</div>
<script>
  var checkbox = document.getElementById("Checkbox");
  checkbox.addEventListener('checked-changed', function (e) {
    var text = e.target.checked ? 'Checked!':'Unchecked!';
    document.getElementById('text').textContent = text;
  });
</script>
```

```html
<ef-checkbox id="Checkbox">Click Me</ef-checkbox>

<script>
  var checkbox = document.getElementById("Checkbox");
  checkbox.addEventListener('checked-changed', function (e) {
    e.target.checked ? console.log('Checked'):console.log('Unchecked')
    });
</script>
```
