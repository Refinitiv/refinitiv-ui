# Select

``` live(preview)
<section>
  <ef-select placeholder="Pick item..." opened>
    <ef-item type="header">Drinks</ef-item>
    <ef-item value="1">Cola</ef-item>
    <ef-item value="2" disabled>Apple Juice</ef-item>
    <ef-item value="3">Iced Tea</ef-item>
    <ef-item type="header">Ice Cream</ef-item>
    <ef-item value="4">Vanilla</ef-item>
    <ef-item value="5">Chocolate</ef-item>
    <ef-item value="6">Honey &amp; Walnut</ef-item>
    <ef-item value="7">Raspberry</ef-item>
  </ef-select>
  <ef-select placeholder="Disabled..." disabled></ef-select>
  <ef-select placeholder="Default selected...">
    <ef-item type="header">Drinks</ef-item>
    <ef-item value="1">Cola</ef-item>
    <ef-item value="2" disabled>Apple Juice</ef-item>
    <ef-item selected value="3">Iced Tea</ef-item>
    <ef-item type="header">Ice Cream</ef-item>
    <ef-item value="4">Vanilla</ef-item>
    <ef-item value="5">Chocolate</ef-item>
    <ef-item value="6">Honey &amp; Walnut</ef-item>
    <ef-item value="7">Raspberry</ef-item>
  </ef-select>
  <ef-select disabled>
    <ef-item selected>Lemonade</ef-item>
  </ef-select>
</section>
<style>
  section {
    height: 250px;
    padding: 0 3px;
  }
  ef-select {
    margin-right: 5px;
  }
</style>
```

### Basic Usage

`ef-select` expands upon the native `select` element, providing a fully themeable dropdown element.

Choices can be defined by using `ef-item`.

``` html
<ef-select>
  <ef-item value="1">Cola</ef-item>
  <ef-item value="2">Lemonade</ef-item>
  <ef-item value="3">Orange Juice</ef-item>
  <ef-item value="4" disabled>Apple Juice</ef-item>
  <ef-item value="5">Iced Tea</ef-item>
</ef-select>
```

``` live
<section>
  <ef-select>
    <ef-item value="1">Cola</ef-item>
    <ef-item value="2">Lemonade</ef-item>
    <ef-item value="3">Orange Juice</ef-item>
    <ef-item value="4" disabled>Apple Juice</ef-item>
    <ef-item value="5">Iced Tea</ef-item>
  </ef-select>
</section>
<style>
  section {
    height: 155px;
    padding: 0 3px;
  }
</style>
```

### Categorize into groups

Groups are also defined using `ef-item`. The only difference is that we add `type="header"` attribute onto the element.

``` html
<ef-select>
  <ef-item type="header">Drinks</ef-item>
  <ef-item value="1">Cola</ef-item>
  <ef-item value="2">Lemonade</ef-item>
  <ef-item value="3">Water</ef-item>
  <ef-item type="header">Ice Cream</ef-item>
  <ef-item value="4">Vanilla</ef-item>
  <ef-item value="5">Chocolate</ef-item>
  <ef-item value="6">Strawberry</ef-item>
  <ef-item value="7">Raspberry</ef-item>
</ef-select>
```

``` live
<section>
  <ef-select>
  <ef-item type="header">Drinks</ef-item>
  <ef-item value="1">Cola</ef-item>
  <ef-item value="2">Lemonade</ef-item>
  <ef-item value="3">Water</ef-item>
  <ef-item type="header">Ice Cream</ef-item>
  <ef-item value="4">Vanilla</ef-item>
  <ef-item value="5">Chocolate</ef-item>
  <ef-item value="6">Strawberry</ef-item>
  <ef-item value="7">Raspberry</ef-item>
  </ef-select>
</section>
<style>
  section {
    height: 250px;
    padding: 0 3px;
  }
</style>
```

### Adding a placeholder

Once you have your choices and groups defined, you can then add a placeholder to help your users understand what the list contains and what their choice is for.

``` html
<ef-select placeholder="Choose your refreshment...">
  ...
```

``` live
<section>
  <ef-select placeholder="Choose your refreshment...">
    <ef-item value="1">Cola</ef-item>
    <ef-item value="2">Lemonade</ef-item>
    <ef-item value="3">Orange Juice</ef-item>
    <ef-item value="4">Apple Juice</ef-item>
    <ef-item value="5">Iced Tea</ef-item>
  </ef-select>
</section>
<style>
  section {
    height: 155px;
    padding: 0 3px;
  }
</style>
```

### Selecting a default option

You may wish to set an initial selected value. This can be achieved by adding a `selected` attribute to the option you would like to have selected by default.

Only one option can be selected at a time.

``` html
...
  <ef-item selected>Water</ef-item>
...
```

``` live
<section>
  <ef-select placeholder="Choose your refreshment...">
    <ef-item type="header">Drinks</ef-item>
    <ef-item value="1">Cola</ef-item>
    <ef-item value="2">Lemonade</ef-item>
    <ef-item value="6" selected>Water</ef-item>
    <ef-item type="header">Ice Cream</ef-item>
    <ef-item value="7">Vanilla</ef-item>
    <ef-item value="14">Strawberry</ef-item>
    <ef-item value="15">Raspberry</ef-item>
  </ef-select>
</section>
<style>
  section {
    height: 225px;
    padding: 0 3px;
  }
</style>
```

### Disabling an option

Options can be disabled by adding a `disabled` attribute to the options you wish to disable.

``` html
...
  <ef-item disabled>Iced Tea</ef-item>
  <ef-item disabled>Water</ef-item>
...
```

``` live
<section>
  <ef-select placeholder="Choose your refreshment...">
    <ef-item type="header">Drinks</ef-item>
    <ef-item value="4" disabled>Apple Juice</ef-item>
    <ef-item value="5" disabled>Iced Tea</ef-item>
    <ef-item value="6" disabled>Water</ef-item>
    <ef-item type="header">Ice Cream</ef-item>
    <ef-item value="7">Vanilla</ef-item>
    <ef-item value="8">Chocolate</ef-item>
  </ef-select>
</section>
<style>
  section {
    height: 200px;
    padding: 0 3px;
  }
</style>
```

### Configuring options using data object

Depending on your usage, you may wish to configure `ef-select` using its `data` object.

Here is a simple configuration object:

``` javascript
[
  {
    label: 'Drinks',
    type: 'header'
  },
  {
    label: 'Tea',
    value: 'tea'
  },
  {
    label: 'Beer',
    value: 'beer',
    selected: true
  },
  {
    label: 'Ice Cream',
    type: 'header'
  },
  {
    label: 'Vanilla',
    value: 'vanilla',
    disabled: true
  },
  {
    label: 'Strawberry',
    value: 'Strawberry'
  }
]
```

You can set this configuration object onto the `data` property of `ef-select`.

``` javascript
var el = document.querySelector('ef-select');
el.data = myConfigurationObject;
```

``` live
<section>
  <ef-select></ef-select>
</section>
<style>
  section {
    height: 180px;
    padding: 0 3px;
  }
</style>
<script>
var el = document.querySelector('ef-select');
el.data = [
  {
    label: 'Drinks',
    type: 'header'
  },
  {
    label: 'Tea',
    value: 'tea'
  },
  {
    label: 'Beer',
    value: 'beer',
    selected: true
  },
  {
    label: 'Ice Cream',
    type: 'header'
  },
  {
    label: 'Vanilla',
    value: 'vanilla',
    disabled: true
  },
  {
    label: 'Strawberry',
    value: 'Strawberry'
  }
];
</script>
```

### Restricting list height

The `max-height` of the list can be restricted by using the `--list-max-height` property.

``` css
ef-select {
  --list-max-height: 100px;
}
```

``` live
<section>
  <ef-select placeholder="Choose your refreshment...">
    <ef-item type="header">Drinks</ef-item>
    <ef-item value="4" disabled>Apple Juice</ef-item>
    <ef-item value="5" disabled>Iced Tea</ef-item>
    <ef-item value="6" disabled>Water</ef-item>
    <ef-item type="header">Ice Cream</ef-item>
    <ef-item value="7">Vanilla</ef-item>
    <ef-item value="8">Chocolate</ef-item>
  </ef-select>
</section>
<style>
  section {
    height: 130px;
    padding: 0 3px;
  }
  ef-select {
    --list-max-height: 100px;
  }
</style>
```

## CSS Variables

| Name              | Description                          |
| ----------------- | ------------------------------------ |
| --list-max-height | Maximum height of the drop-down list |
| --list-max-width  | Maximum width of the drop-down list  |

