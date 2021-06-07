# Tree Select

```live(preview)
  <style>
      .wrapper {
        padding: 5px;
        height: 450px;
      }
  </style>
  <div class="wrapper">
    <ef-tree-select opened></ef-tree-select>
  </div>
  <script>
    var el = document.querySelector('ef-tree-select');
    el.data = [{
                'value': 'AFR',
                'label': 'Africa',
                'selected': false,
                'items': [{
                  'value': 'DZA',
                  'label': 'Algeria',
                  'selected': false,
                  'items': [{
                    'value': 'ADR',
                    'label': 'Adrar',
                    'selected': false,
                    'items': []
                  }, {
                    'value': 'TAM',
                    'label': 'Tamanghasset',
                    'selected': false,
                    'items': []
                  }, {
                    'value': 'GUE',
                    'label': 'Guelma',
                    'selected': false,
                    'items': []
                  }]
                }, {
                  'value': 'AGO',
                  'label': 'Angola',
                  'selected': false,
                  'items': []
                }, {
                  'value': 'BEN',
                  'label': 'Benin',
                  'selected': false,
                  'items': []
                }, {
                  'value': 'BWA',
                  'label': 'Botswana',
                  'selected': false,
                  'items': []
                }]
              }];
              setTimeout(function () { el.opened = true; }, 1000);
  </script>
```

Tree Select provides an interface for displaying, navigating and selecting items from a nested data structure.

## Usage

```live
  <style>
      .wrapper {
        padding: 5px;
        height: 450px;
      }
  </style>
  <div class="wrapper">
    <ef-tree-select opened></ef-tree-select>
  </div>
  <script>
    var el = document.querySelector('ef-tree-select');
    el.data = [{
                'value': 'AFR',
                'label': 'Africa',
                'selected': false,
                'items': [{
                  'value': 'DZA',
                  'label': 'Algeria',
                  'selected': false,
                  'items': [{
                    'value': 'ADR',
                    'label': 'Adrar',
                    'selected': false,
                    'items': []
                  }, {
                    'value': 'TAM',
                    'label': 'Tamanghasset',
                    'selected': false,
                    'items': []
                  }, {
                    'value': 'GUE',
                    'label': 'Guelma',
                    'selected': false,
                    'items': []
                  }]
                }, {
                  'value': 'AGO',
                  'label': 'Angola',
                  'selected': false,
                  'items': []
                }, {
                  'value': 'BEN',
                  'label': 'Benin',
                  'selected': false,
                  'items': []
                }, {
                  'value': 'BWA',
                  'label': 'Botswana',
                  'selected': false,
                  'items': []
                }]
              }];
  </script>
```

Provide tree structured data using the [Collection Composer](https://elf.int.refinitiv.com/more-resources/collection-composer) data model.

Tree Select is designed to work with multiple items and as such has a commit model. A selection is made using the interface and then committed, or cancelled.

The result of the committed selection can be accessed using the `values` property. This is an array of selected item values.

### Pills

Optionally, Tree Select can display selected items as pills by adding the `show-pills` attribute. Items can also be de-selected by removing the pill.

```html
<ef-tree-select show-pills opened></ef-tree-select>
```
```javascript
var el = document.querySelector('ef-tree-select');
el.data = [{
            'value': 'AFR',
            'label': 'Africa',
            'selected': false,
            'items': [{
              'value': 'DZA',
              'label': 'Algeria',
              'selected': true,
              'items': [{
                'value': 'ADR',
                'label': 'Adrar',
                'selected': false,
                'items': []
              }]
            }, {
              'value': 'AGO',
              'label': 'Angola',
              'selected': false,
              'items': []
            }]
          }];
```

> If the number of selected items is likely to be large, pills may not be a good choice for display or performance.

## Filtering

Tree select has built in text filtering and selection editing.

By clicking the `Selected` button, Tree Select allows the items to be filtered by selected state, and that subset to be operated on in isolation from the main item list.

For custom filtering, Tree Select provides an identical interface as Combo Box. You provide a predicate function that tests an item. Please consult the [Combo Box docs](https://elf.int.refinitiv.com/elements/ef-combo-box.html) for details on how to construct a compatible filter. 

### UI Controls

Tree Select has several controls.

```live
  <style>
      .wrapper {
        padding: 5px;
        height: 450px;
      }
  </style>
  <div class="wrapper">
    <ef-tree-select opened></ef-tree-select>
  </div>
  <script>
    var el = document.querySelector('ef-tree-select');
    el.data = [{
                'value': 'AFR',
                'label': 'Africa',
                'selected': false,
                'items': [{
                  'value': 'DZA',
                  'label': 'Algeria',
                  'selected': false,
                  'items': [{
                    'value': 'ADR',
                    'label': 'Adrar',
                    'selected': false,
                    'items': []
                  }, {
                    'value': 'TAM',
                    'label': 'Tamanghasset',
                    'selected': false,
                    'items': []
                  }, {
                    'value': 'GUE',
                    'label': 'Guelma',
                    'selected': false,
                    'items': []
                  }]
                }, {
                  'value': 'AGO',
                  'label': 'Angola',
                  'selected': false,
                  'items': []
                }, {
                  'value': 'BEN',
                  'label': 'Benin',
                  'selected': false,
                  'items': []
                }, {
                  'value': 'BWA',
                  'label': 'Botswana',
                  'selected': false,
                  'items': []
                }]
              }];
  </script>
```

**Full and Selected**

These controls will filter the list by selected state.

**Select All/Deselect**

This is a toggle control which will change the selected state of all items accordingly.

**Collapse All/Expand All**

This is a toggle control which will change the expanded state of all items accordingly.

**Done**

This control will save the current selection, and result of the firing of the `value-changed` event.

**Cancel**

This control will abort any current selection changes and go back to the tree state when first opened.

### Customize size

The theme manages the size of popup panel, but can be overridden by using CSS variables.

| CSS Variables Name   | Description                  |
| -------------------- | ---------------------------- |
| --list-max-width     | Max width of popup panel     |
| --list-max-height    | Max height of selection tree |
