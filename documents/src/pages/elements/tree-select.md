<!--
type: page
title: Tree Select
location: ./elements/tree-select
layout: default
-->

# Tree Select
::
```javascript
::tree-select::
const el = document.querySelector("ef-tree-select");
el.data = [{
  'value': 'AFR',
  'label': 'Africa',
  'selected': false,
  'expanded': true,
  'items': [{
    'value': 'DZA',
    'label': 'Algeria',
    'selected': false,
    'expanded': true,
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
setTimeout(() => { el.opened = true; }, 1000);
```
```css
.wrapper {
  padding: 5px;
  height: 450px;
}
```
```html
<div class="wrapper">
  <ef-tree-select opened></ef-tree-select>
</div>
```
::

Tree Select provides an interface for displaying, navigating and selecting items from a nested data structure.

## Usage
Tree Select is designed to work with multiple items and as such has a commit model. A selection is made using the interface and then committed, or cancelled. The result of the committed selection can be accessed using the `values` property. This is an array of selected item values.

::
```javascript
::tree-select::
const el = document.querySelector("ef-tree-select");
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
```
```css
.wrapper {
  padding: 5px;
  height: 450px;
}
```
```html
<div class="wrapper">
  <ef-tree-select opened></ef-tree-select>
</div>
```
::

The `data` property of the `ef-tree-elect` uses the [TreeSelectData](https://github.com/Refinitiv/refinitiv-ui/blob/v6/packages/elements/src/tree-select/helpers/types.ts) type for its data items. Each of this item defaults to type [TreeSelectDataItem](https://github.com/Refinitiv/refinitiv-ui/blob/v6/packages/elements/src/tree-select/helpers/types.ts). It could also be anything extended from [DataItem](./custom-components/utils/data-management#data-item).

## Show pills
Optionally, Tree Select can display selected items as pills by adding the `show-pills` attribute. Items can also be de-selected by removing the pill.

::
```javascript
::tree-select::
const el = document.querySelector("ef-tree-select");
el.data = [{
  'value': 'AFR',
  'label': 'Africa',
  'expanded': true,
  'items': [{
    'value': 'DZA',
    'label': 'Algeria',
    'expanded': true,
    'items': [{
      'value': 'ADR',
      'label': 'Adrar',
      'selected': true,
      'items': []
    }, {
      'value': 'TAM',
      'label': 'Tamanghasset',
      'selected': true,
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
setTimeout(() => { el.opened = true; }, 1000);
```
```css
.wrapper {
  padding: 5px;
  height: 450px;
}
```
```html
<div class="wrapper">
  <ef-tree-select show-pills opened></ef-tree-select>
</div>
```
::

```html
<ef-tree-select show-pills opened></ef-tree-select>
```

*> If the number of selected items is likely to be large, pills may not be a good choice for display or performance.

## Filtering
Tree select has built in text filtering and selection editing.

By clicking the `Selected` button, Tree Select allows the items to be filtered by selected state, and that subset to be operated on in isolation from the main item list.

For custom filtering, Tree Select provides an identical interface as Combo Box. You provide a predicate function that tests an item. Please consult the [Combo Box docs](./elements/combo-box) for details on how to construct a compatible filter.

## Limiting Selected Items
Tree Select offers a convenient way to limit the number of selected items using `max` property. If users attempt to select more items than the specified limit, "Done" button will be automatically disabled.

::
```javascript
::tree-select::
const el = document.querySelector("ef-tree-select");
el.data = [{
  'value': 'AFR',
  'label': 'Africa',
  'expanded': true,
  'items': [{
    'value': 'DZA',
    'label': 'Algeria',
    'expanded': true,
    'items': [{
      'value': 'ADR',
      'label': 'Adrar',
      'selected': true,
      'items': []
    }, {
      'value': 'TAM',
      'label': 'Tamanghasset',
      'selected': true,
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
setTimeout(() => { el.opened = true; }, 1000);
```
```css
.wrapper {
  padding: 5px;
  height: 450px;
}
```
```html
<div class="wrapper">
  <ef-tree-select max="3" opened></ef-tree-select>
</div>
```
::

```html
<ef-tree-select max="3" opened></ef-tree-select>
```

## UI Controls
Tree Select has several controls.

::
```javascript
::tree-select::
const el = document.querySelector("ef-tree-select");
el.data = [{
  'value': 'AFR',
  'label': 'Africa',
  'items': [{
    'value': 'DZA',
    'label': 'Algeria',
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
```
```css
.wrapper {
  padding: 5px;
  height: 450px;
}
```
```html
<div class="wrapper">
  <ef-tree-select opened></ef-tree-select>
</div>
```
::

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

## CSS Variables

The theme manages the size of popup panel, but can be overridden by using CSS variables.

```css
ef-select {
  --list-max-width: 70px;
  --list-max-height: 120px;
}
```

| CSS Variables Name | Description                  |
| ------------------ | ---------------------------- |
| --list-max-width   | Max width of popup panel     |
| --list-max-height  | Max height of selection tree |

## Accessibility
::a11y-intro::

Tree select is assigned `role="combo-box"` and it supports similar aria attributes as Combo box such as `aria-multiselectable`, `aria-label` or `aria-labelledby`. It has a modal which has `role="dialog"` and it contains Tree, its filter and controls. When opened, focus is managed within the dialog itself.

`ef-tree-select` has already managed role and keyboard navigation but you should set accessible name to the element by using `aria-label` or `aria-labelledby`.

```html
<ef-tree-select aria-label="Choose countries"></ef-tree-select>
```

```html
<label id="country_list">Choose Countries</label>
<ef-tree-select aria-labelledby="country_list"></ef-tree-select>
```

::a11y-end::
