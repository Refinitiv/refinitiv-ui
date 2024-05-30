<!--
type: page
title: Tree
location: ./elements/tree
layout: default
language_tabs: [javascript, typescript]
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

```typescript
import { Tree, TreeData } from '@refinitiv-ui/elements/tree';

const tree: Tree | null = document.querySelector('ef-tree');
const data: TreeData = [
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

if (tree) {
  tree.data = data;
}
```

The `TreeData` is an array of `TreeDataItem`.

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

```typescript
import { Tree, TreeData } from '@refinitiv-ui/elements/tree';

const tree: Tree | null = document.querySelector('ef-tree');
const data: TreeData = [
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

if (tree) {
  tree.data = data;
}
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

```typescript
import { Tree } from '@refinitiv-ui/elements/tree';
import { ValueChangedEvent } from '@refinitiv-ui/elements';

const tree: Tree | null = document.querySelector('ef-tree');

tree?.addEventListener('value-changed', (event) => {
  console.log((event as ValueChangedEvent).detail); // value that users changed
  console.log(tree.values); // access selected items
});
```

## Manipulating item properties

Item properties of Tree could be read and updated programmatically through its [Tree Manager](./custom-components/utils/tree-manager) which is available as `manager` property. Retrieve [TreeNode(s)](./custom-components/utils/tree-node) representing each item by calling `getTreeNode()` or `getTreeNodes()` of `manager`.

```javascript
// Select the item which value is '1.1'
const tree = document.querySelector('ef-tree');
tree.data = [
  {
    label: 'Group',
    value: '1.0',
    items: [{
      label: 'Item 1.1',
      value: '1.1'
    },
    {
      label: 'Item 1.2',
      value: '1.2'
    }]
  }
];
console.log(tree.values); // Expected output: []

const treeNodes = tree.manager.getTreeNodes();
const node = treeNodes.find(treeNode => treeNode.value === '1.1');
node.selected = true;
console.log(tree.values); // Expected output: ['1.1']
```

```typescript
import type { Tree } from '@refinitiv-ui/elements/tree';

// Select the item which value is '1.1'
const tree = document.querySelector<Tree>('ef-tree')!;
tree.data = [
  {
    label: 'Group',
    value: '1.0',
    items: [{
      label: 'Item 1.1',
      value: '1.1'
    },
    {
      label: 'Item 1.2',
      value: '1.2'
    }]
  }
];
console.log(tree.values); // Expected output: []

const treeNodes = tree.manager.getTreeNodes();
const node = treeNodes.find(treeNode => treeNode.value === '1.1');
node.selected = true;
console.log(tree.values); // Expected output: ['1.1']
```

## Custom renderer

Tree defines how each of its item is displayed with `renderer` property. You can customise this renderer by setting a callback function to the property. [Tree Node](/custom-components/utils/tree-node) is the easiest way to implement the function. Note that for performance sensitive use cases such as a large number of items, consider using [Collection Composer](/custom-components/utils/data-management#collection-composer) instead.

```javascript
import { uuid } from '@refinitiv-ui/utils/uuid.js';
import { CheckedState, TreeManager, TreeManagerMode } from '@refinitiv-ui/elements/tree';

// Implement Tree's default renderer with Tree Node instead of Collection Composer
// for comparison, check https://github.com/Refinitiv/refinitiv-ui/blob/v7/packages/elements/src/tree/helpers/renderer.ts
const createTreeRenderer = (context) => {
  const key = uuid();

  return (item, composer, element = document.createElement('ef-tree-item')) => {
    const multiple = context?.multiple === true;
    const noRelation = context?.noRelation === true;
    const mode = !multiple || !noRelation ? TreeManagerMode.RELATIONAL : TreeManagerMode.INDEPENDENT;
    const manager = context?.manager || context?.treeManager || new TreeManager(composer, mode);

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
tree.renderer = createTreeRenderer(tree)
```

```typescript
import { CheckedState, TreeManager, TreeManagerMode } from '@refinitiv-ui/elements/tree';
import { uuid } from '@refinitiv-ui/utils/uuid.js';
import type { CollectionComposer } from '@refinitiv-ui/utils/collection.js';
import type { TreeDataItem, TreeItem } from '@refinitiv-ui/elements/tree';

type RendererScope<T extends TreeDataItem> = {
  multiple?: boolean;
  noRelation?: boolean;
  manager?: TreeManager<T>;
  treeManager?: TreeManager<T>;
};

// Implement Tree's default renderer with Tree Node instead of Collection Composer
// for comparison, check https://github.com/Refinitiv/refinitiv-ui/blob/v7/packages/elements/src/tree/helpers/renderer.ts
export const createTreeRenderer = <T extends TreeDataItem = TreeDataItem>(
  context?: unknown
): ((item: T, composer: CollectionComposer<T>, element?: HTMLElement) => HTMLElement) => {
  const key: string = uuid();

  return (
    item: T,
    composer: CollectionComposer<T>,
    element: HTMLElement = document.createElement('ef-tree-item')
  ): HTMLElement => {
    const _context = context as RendererScope<T> | undefined;
    const _element = element as TreeItem;
    const multiple = _context?.multiple === true;
    const noRelation = _context?.noRelation === true;
    const mode = !multiple || !noRelation ? TreeManagerMode.RELATIONAL : TreeManagerMode.INDEPENDENT;
    const manager = _context?.manager || _context?.treeManager || new TreeManager(composer, mode);

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
tree.renderer = createTreeRenderer(tree)
```

## Filtering

Filtering happens when `query` property or attribute is not empty. By Default, the filter is applied on the data `label` property. Developers may wish to do their own filtering by implementing the `filter` property. A typical example is to apply filter on multiple data properties e.g. `label` and `value`.

::
```javascript
::import-elements::
const tree = document.querySelector('ef-tree');
tree.data = [
  { label: 'France', value: 'fr' },
  { label: 'Russian Federation', value: 'ru' },
  { label: 'Spain', value: 'es' },
  { label: 'United Kingdom', value: 'gb' },
  { label: 'China', value: 'ch' },
  { label: 'Australia', value: 'au' },
  { label: 'India', value: 'in' },
  { label: 'Thailand', value: 'th' },
  { label: 'Canada', value: 'ca' },
  { label: 'United States', value: 'us' },
  { label: 'Brazil', value: 'br' },
  { label: 'Argentina', value: 'ar' }
];
const createCustomFilter = (tree) => {
  let query = '';
  let queryRegExp;
  const getRegularExpressionOfQuery = () => {
    if (tree.query !== query || !queryRegExp) {
      query = tree.query || '';
      // Non-word characters are escaped to prevent ReDoS attack.
      // This serves as a demo only. 
      // For production, use a proven implementation instead.
      queryRegExp = new RegExp(query.replace(/(\W)/g, '\\$1'), 'i');
    }
    return queryRegExp;
  };
  return (item, manager) => {
    const treeNode = manager.getTreeNode(item);
    const { label, value } = treeNode;
    const regex = getRegularExpressionOfQuery();
    const result = regex.test(value) || regex.test(label);
    return result;
  };
};
tree.filter = createCustomFilter(tree);

const input = document.getElementById('query');
input.addEventListener('value-changed', e => {
  tree.query = e.detail.value;
});
```
```css
.wrapper {
  padding: 5px;
  width: 300px;
  height: 360px;
}

#query {
  width: 200px;
}
```
```html
<div class="wrapper">
  <label for="query">Filter</label>
  <ef-text-field id="query" placeholder="keyword to filter Tree's items"></ef-text-field>
  <br>
  <ef-tree></ef-tree>
</div>
```
::

```javascript
const tree = document.querySelector('ef-tree');

// Make a scoped re-usable filter for performance
const createCustomFilter = (tree) => {
  let query = ''; // reference query string for validating queryRegExp cache state
  let queryRegExp; // cache RegExp

  // Get current RegExp, or renew if out of date
  // this is fetched on demand by filter/renderer
  // only created once per query
  const getRegularExpressionOfQuery = () => {
    if (tree.query !== query || !queryRegExp) {
      query = tree.query || '';
      // Non-word characters are escaped to prevent ReDoS attack.
      // This serves as a demo only. 
      // For production, use a proven implementation instead.
      queryRegExp = new RegExp(query.replace(/(\W)/g, '\\$1'), 'i');
    }
    return queryRegExp;
  };

  // return scoped custom filter
  return (item, manager) => {
    const treeNode = manager.getTreeNode(item);
    const { label, value } = treeNode;
    const regex = getRegularExpressionOfQuery();
    const result = regex.test(value) || regex.test(label);
    return result;
  };
};

tree.filter = createCustomFilter(tree);
```

```typescript
import type { Tree, TreeFilter } from '@refinitiv-ui/elements/tree';

const tree = document.querySelector('ef-tree');

// Make a scoped re-usable filter for performance
const createCustomFilter = (tree: Tree): TreeFilter => {
  let query = ''; // reference query string for validating queryRegExp cache state
  let queryRegExp: RegExp; // cache RegExp

  // Get current RegExp, or renew if out of date
  // this is fetched on demand by filter/renderer
  // only created once per query
  const getRegularExpressionOfQuery = () => {
    if (tree.query !== query || !queryRegExp) {
      query = tree.query || '';
      // Non-word characters are escaped to prevent ReDoS attack.
      // This serves as a demo only. 
      // For production, use a proven implementation instead.
      queryRegExp = new RegExp(query.replace(/(\W)/g, '\\$1'), 'i');
    }
    return queryRegExp;
  };

  // return scoped custom filter
  return (item, manager) => {
    const treeNode = manager.getTreeNode(item)!;
    const { label, value } = treeNode;
    const regex = getRegularExpressionOfQuery();
    const result = regex.test(value) || regex.test(label);
    return result;
  };
};

if (tree) {
  tree.filter = createCustomFilter(tree);
}
```

@> Regardless of filter configuration, Tree always shows parent items as long as at least one of their child is visible.

## Accessibility

::a11y-intro::

`ef-tree` is assigned `role="tree"` and can include properties such as `aria-multiselectable`, `aria-label`, or `aria-labelledby`. It receives focus once at host and it is navigable through items using `Up` and `Down` arrow keys and expandable or collapsable using `Left` and `Right`. Each item is assigned `role="treeitem"` and can include properties such as `aria-selected` or `aria-checked` in `multiple` mode.

`ef-tree` has already provided role and aria attributes for itself and items in the list. It also has implemented keyboard navigation following accessibility guidelines.

::a11y-end::
