<!--
type: page
title: Tree Select
location: ./elements/tree-select
layout: default
language_tabs: [javascript, typescript]
-->

# Tree Select
::
```javascript
::import-elements::
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
::import-elements::
const treeSelect = document.querySelector("ef-tree-select");
treeSelect.data = [{
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

The `data` property of the `ef-tree-select` uses the `TreeSelectData`.

```javascript
const treeSelect = document.querySelector('ef-tree-select');
treeSelect.data = [
  {
    value: 'AFR',
    label: 'Africa',
    selected: false,
    items: [
      {
        value: 'DZA',
        label: 'Algeria',
        selected: false,
        items: [
          {
            value: 'ADR',
            label: 'Adrar',
            selected: false,
            items: []
          },
          {
            value: 'TAM',
            label: 'Tamanghasset',
            selected: false,
            items: []
          },
          {
            value: 'GUE',
            label: 'Guelma',
            selected: false,
            items: []
          }
        ]
      },
      {
        value: 'AGO',
        label: 'Angola',
        selected: false,
        items: []
      },
      {
        value: 'BEN',
        label: 'Benin',
        selected: false,
        items: []
      },
      {
        value: 'BWA',
        label: 'Botswana',
        selected: false,
        items: []
      }
    ]
  }
];
```

```typescript
import { TreeSelect, TreeSelectData } from '@refinitiv-ui/elements/tree-select';

const treeSelect: TreeSelect | null = document.querySelector('ef-tree-select');
const data: TreeSelectData = [
  {
    value: 'AFR',
    label: 'Africa',
    selected: false,
    items: [
      {
        value: 'DZA',
        label: 'Algeria',
        selected: false,
        items: [
          {
            value: 'ADR',
            label: 'Adrar',
            selected: false,
            items: []
          },
          {
            value: 'TAM',
            label: 'Tamanghasset',
            selected: false,
            items: []
          },
          {
            value: 'GUE',
            label: 'Guelma',
            selected: false,
            items: []
          }
        ]
      },
      {
        value: 'AGO',
        label: 'Angola',
        selected: false,
        items: []
      },
      {
        value: 'BEN',
        label: 'Benin',
        selected: false,
        items: []
      },
      {
        value: 'BWA',
        label: 'Botswana',
        selected: false,
        items: []
      }
    ]
  }
];

if (treeSelect) {
  treeSelect.data = data;
}
```


The `TreeSelectData` is an array of `TreeDataItem`.

```typescript
interface TreeDataItem {
  /**
   * The text for the label indicating the meaning of the item.
   */
  label: string;
  /**
   * Value of the item
   */
  value: string;
  /**
   * Sets the selection state of the item.
   */
  selected?: boolean;
  /**
   * Sets the item to be disabled.
   * Prevents the item from users interaction.
   */
  disabled?: boolean;
  /**
   * Set the icon name from the ef-icon list
   */
  icon?: string;
  /**
   * Whether to show or hide
   * the item from the renderer.
   */
  hidden?: boolean;
  /**
   * Expanded state of child items.
   * If `true`, child items will be visible
   */
  expanded?: boolean;
  /**
   * Used for nested TreeDataItem.
   */
  items?: TreeDataItem[];
}
```

## Show pills
Optionally, Tree Select can display selected items as pills by adding the `show-pills` attribute. Items can also be de-selected by removing the pill.

::
```javascript
::import-elements::
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
::import-elements::
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
::import-elements::
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

## Manipulating item properties

Item properties of Tree Select could be read and updated programmatically through its [TreeManager](./custom-components/utils/tree-manager) which is available as `treeManager` property. Retrieve [TreeNode(s)](./custom-components/utils/tree-node) representing each item by calling `getTreeNode()` or `getTreeNodes()` of `treeManager`.

```javascript
const treeSelect = document.querySelector('ef-tree-select');
treeSelect.data = [
  {
    label: 'Algeria',
    value: 'DZA',
    items: [{
      value: 'ADR',
      label: 'Adrar'
    }, {
      value: 'TAM',
      label: 'Tamanghasset'
    }]
  }
];
const firstNode = treeSelect.treeManager.getTreeNodes()[0]; // get the item at index number 0.
firstNode.label = 'DZ'; // edit label property which this will reflect to the component.
```

```typescript
const treeSelect = document.querySelector('ef-tree-select')!;
treeSelect.data = [
  {
    label: 'Algeria',
    value: 'DZA',
    items: [{
      value: 'ADR',
      label: 'Adrar'
    }, {
      value: 'TAM',
      label: 'Tamanghasset'
    }]
  }
];
const firstNode = treeSelect.treeManager.getTreeNodes()[0]; // get the item at index number 0.
firstNode.label = 'DZ'; // edit label property which this will reflect to the component.
```

## Custom renderer

TreeSelect supports custom rendering by providing a renderer property that can define how each item is displayed. The renderer is a callback function that takes a data item, a Collection Composer, and previously mapped item elements (if any), and must return an HTMLElement. You can use TreeNode to provides access to the current item's data property. Note that for performance sensitive use cases such as a large number of items, consider using [Collection Composer](/custom-components/utils/data-management#collection-composer) instead.

```javascript
import { uuid } from '@refinitiv-ui/utils/uuid.js';
import { CheckedState, TreeManager, TreeManagerMode } from '@refinitiv-ui/elements/tree';

// Implement TreeSelect's default render with Tree Node instead of Collection Composer
// for comparison, check https://github.com/Refinitiv/refinitiv-ui/blob/v7/packages/elements/src/tree/helpers/renderer.ts
const createTreeRenderer = (context) => {
  const key = uuid();

  return (item, composer, element = document.createElement('ef-tree-item')) => {
    const multiple = context?.multiple === true;
    const noRelation = context?.noRelation === true;
    const mode = !multiple || !noRelation ? TreeManagerMode.RELATIONAL : TreeManagerMode.INDEPENDENT;
    const manager = context?.manager || new TreeManager(composer, mode);

    const treeNode = manager.getTreeNode(item);
    element.multiple = multiple;
    element.item = item;
    element.id = `${key}-${item.value || ''}`;
    element.depth = treeNode.getDepth();
    element.parent = treeNode.isParent();
    element.expanded = treeNode.expanded;
    element.checkedState =
      !multiple && element.parent ? CheckedState.UNCHECKED : treeNode.getCheckedState();
    element.icon = treeNode.icon;
    element.label = treeNode.label;
    element.disabled = treeNode.disabled;
    element.readonly = treeNode.readonly;
    element.highlighted = treeNode.highlighted;

    return element;
  };
};
treeSelect.renderer = createTreeRenderer(this)
```

```typescript
import { CheckedState, TreeManager, TreeManagerMode } from '@refinitiv-ui/elements/tree';
import { uuid } from '@refinitiv-ui/utils/uuid.js';
import type { CollectionComposer } from '@refinitiv-ui/utils/collection.js';
import type { TreeSelectDataItem, TreeSelectItem } from '@refinitiv-ui/elements/tree-select';

type RendererScope<T extends TreeSelectDataItem> = {
  multiple?: boolean;
  noRelation?: boolean;
  manager?: TreeManager<T>;
  treeManager?: TreeManager<T>;
};

// Implement Tree's default render with Tree Node instead of Collection Composer
// for comparison, check https://github.com/Refinitiv/refinitiv-ui/blob/v7/packages/elements/src/tree/helpers/renderer.ts
export const createTreeRenderer = <T extends TreeSelectDataItem = TreeSelectDataItem>(
  context?: unknown
): ((item: T, composer: CollectionComposer<T>, element?: HTMLElement) => HTMLElement) => {
  const key: string = uuid();

  return (
    item: T,
    composer: CollectionComposer<T>,
    element: HTMLElement = document.createElement('ef-tree-item')
  ): HTMLElement => {
    const _context = context as RendererScope<T> | undefined;
    const _element = element as TreeSelectItem;
    const multiple = _context?.multiple === true;
    const noRelation = _context?.noRelation === true;
    const mode = !multiple || !noRelation ? TreeManagerMode.RELATIONAL : TreeManagerMode.INDEPENDENT;
    const manager = _context?.treeManager || new TreeManager(composer, mode);

    const treeNode = manager.getTreeNode(item);
    _element.multiple = multiple;
    _element.item = item;
    _element.id = `${key}-${item.value || ''}`;
    _element.depth = treeNode.getDepth();
    _element.parent = treeNode.isParent();
    _element.expanded = treeNode.expanded;
    _element.checkedState =
      !multiple && _element.parent ? CheckedState.UNCHECKED : treeNode.getCheckedState();
    _element.icon = treeNode.icon;
    _element.label = treeNode.label;
    _element.disabled = treeNode.disabled;
    _element.readonly = treeNode.readonly;
    _element.highlighted = treeNode.highlighted;

    return _element;
  };
};
treeSelect.renderer = createTreeRenderer(this)
```

## CSS Variables

The theme manages the size of popup panel, but can be overridden by using CSS variables.

```css
ef-tree-select {
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
