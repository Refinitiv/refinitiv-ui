<!--
type: page
title: Tree
location: ./elements/tree
layout: default
-->

# Tree

::
```javascript
::import-elements::
const tree = document.querySelector('ef-tree');
tree.data = [{
  label: 'Group 1',
  expanded: true,
  items: [{
    label: 'Item 1.1',
    value: '1.1'
  },
  {
    label: 'Item 1.2',
    value: '1.2'
  },
  {
    label: 'Item 1.3',
    value: '1.3',
    selected: true
  }]
},
{
  label: 'Group 2',
  items: [{
    label: 'Item 2.1',
    value: '2.1'
  },
  {
    label: 'Item 2.2',
    value: '2.2'
  },
  {
    label: 'Item 2.3',
    value: '2.3'
  }]
}]
```
```html
<ef-tree></ef-tree>
```
::

Displays a nested data structure as a tree menu. Useful for navigating grouped/categorized data.

## Usage

The data of `ef-tree` can be set by passing an array of objects to the element's `data` property.

```html
<ef-tree></ef-tree>
```
```javascript
const tree = document.querySelector('ef-tree');
const data = [
  {
    label: 'Group 1',
    expanded: true,
    items: [
      {
        label: 'Item 1.1',
        value: '1.1'
      },
      {
        label: 'Item 1.2',
        value: '1.2'
      },
      {
        label: 'Item 1.3',
        value: '1.3',
        selected: true
      }
    ]
  },
  {
    label: 'Group 2',
    items: [
      {
        label: 'Item 2.1',
        value: '2.1'
      },
      {
        label: 'Item 2.2',
        value: '2.2'
      },
      {
        label: 'Item 2.3',
        value: '2.3'
      }
    ]
  }
];

tree.data = data;
```

The data of Tree is an array of `TreeDataItem`.

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

## Tree item with icon
Icon can be set to show on each node in tree by using icon key in item object. You can pass icon name, url of icon svg file or empty string.


::
```javascript
::import-elements::
const basicTree = document.getElementById('basic');
const multipleTree = document.getElementById('multiple');
basicTree.data = [
  {
    label: 'Request 5 Rank 1: custom leage table',
    icon: 'list',
    expanded: true,
    items: [{
        label: 'Req. 5 Rnk. 1 Dr.Req. 1: Goldman Sachs & Co',
        value: '1.1',
        icon: 'https://cdn.refinitiv.net/public/libs/elf/assets/elf-theme-halo/resources/icons/grid.svg'
      },
      {
        label: 'Req. 5 Rnk. 1 Dr.Req. 2: Allen & Co Inc',
        value: '1.2',
        icon: 'https://cdn.refinitiv.net/public/libs/elf/assets/elf-theme-halo/resources/icons/grid.svg'
      }]
  },
  {
    label: 'Session Details',
    icon: 'sendfeed',
  }
];
multipleTree.data = [
  {
    label: 'Request 5 Rank 1: custom leage table',
    icon: 'list',
    expanded: true,
    items: [{
      label: 'Req. 5 Rnk. 1 Dr.Req. 1: Goldman Sachs & Co',
      value: '1.1',
      icon: 'https://cdn.refinitiv.net/public/libs/elf/assets/elf-theme-halo/resources/icons/grid.svg'
    },
    {
      label: 'Req. 5 Rnk. 1 Dr.Req. 2: Allen & Co Inc',
      value: '1.2',
      icon: 'https://cdn.refinitiv.net/public/libs/elf/assets/elf-theme-halo/resources/icons/grid.svg'
    }]
  },
  {
    label: 'Session Details',
    icon: 'sendfeed',
  }
];
```
```css
.container {
  display: flex;
}
ef-tree {
  margin-right: 20px;
}
```
```html
<div class="container">
  <ef-tree id="basic"></ef-tree>
  <ef-tree multiple id="multiple"></ef-tree>
</div>
```
::

``` html
<ef-tree></ef-tree>
```
```javascript
const tree = document.querySelector('ef-tree');
const data = [
  {
    label: 'Request 5 Rank 1: custom leage table',
    icon: 'list',
    expanded: true,
    items: [
      {
        label: 'Req. 5 Rnk. 1 Dr.Req. 1: Goldman Sachs & Co',
        value: '1.1',
        icon: 'https://cdn.refinitiv.net/public/libs/elf/assets/elf-theme-halo/resources/icons/grid.svg'
      },
      {
        label: 'Req. 5 Rnk. 1 Dr.Req. 2: Allen & Co Inc',
        value: '1.2',
        icon: 'https://cdn.refinitiv.net/public/libs/elf/assets/elf-theme-halo/resources/icons/grid.svg'
      }
    ]
  },
  {
    label: 'Session Details',
    icon: 'sendfeed'
  }
];

tree.data = data;
```

## Multiple selection

Tree uses single selection mode by default. Use the `multiple` attribute if you need multiple selections.

::
```javascript
::import-elements::
const tree = document.querySelector('ef-tree');
tree.data = [
  {
    label: 'Group 1',
    items: [{
      label: 'Item 1.1',
      value: '1.1'
    },
    {
      label: 'Item 1.2',
      value: '1.2'
    },
    {
      label: 'Item 1.3',
      value: '1.3',
      selected: true
    }]
  },
  {
    label: 'Group 2',
    items: [{
      label: 'Item 2.1',
      value: '2.1'
    },
    {
      label: 'Item 2.2',
      value: '2.2'
    },
    {
      label: 'Item 2.3',
      value: '2.3'
    }]
  }
];
```
```html
<ef-tree multiple></ef-tree>
```
::

```html
<ef-tree multiple></ef-tree>
```

## Turn off parent/child relationship

For multiple selection mode, Tree manages the relationship between parent and child items. Use the `no-relation` attribute to turn this feature off.

::
```javascript
::import-elements::
const tree = document.querySelector('ef-tree');
tree.data = [
  {
    label: 'Group 1',
    items: [{
      label: 'Item 1.1',
      value: '1.1'
    },
    {
      label: 'Item 1.2',
      value: '1.2'
    },
    {
      label: 'Item 1.3',
      value: '1.3',
      selected: true
    }]
  },
  {
    label: 'Group 2',
    items: [{
      label: 'Item 2.1',
      value: '2.1'
    },
    {
      label: 'Item 2.2',
      value: '2.2'
    },
    {
      label: 'Item 2.3',
      value: '2.3'
    }]
  }
];
```
```html
<ef-tree multiple no-relation></ef-tree>
```
::

```html
<ef-tree multiple no-relation></ef-tree>
```

## Tree value(s) and events

Use the `value-changed` event to know when the user has changed any selection in Tree. Tree provides `value` and `values` properties for accessing selected item(s).

Typically, you can just use the `values` property, as it will work for both multiple and single selection mode. With single selection mode, `value` represents a single value, whereas in multiple selection mode, it will store the first value of the `values` array.

```javascript
const tree = document.querySelector('ef-tree');

tree.addEventListener('value-changed', (event) => {
  console.log(event.detail); // value that users changed
  console.log(tree.values); // access selected items
});
```

## Accessibility
::a11y-intro::

`ef-tree` is assigned `role="tree"` and can include properties such as `aria-multiselectable`, `aria-label`, or `aria-labelledby`. It receives focus once at host and it is navigable through items using `Up` and `Down` arrow keys and expandable or collapsable using `Left` and `Right`. Each item is assigned `role="treeitem"` and can include properties such as `aria-selected` or `aria-checked` in `multiple` mode. 

`ef-tree` has already provided role and aria attributes for itself and items in the list. It also has implemented keyboard navigation following accessibility guidelines.

::a11y-end::
