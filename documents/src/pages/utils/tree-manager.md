<!-- 
title: Tree Manager
location: ./custom-components/utils/tree-manager
type: page
layout: default
language_tabs: [javascript, typescript]
-->

# Tree Manager

Tree Manager is a simplified version of Collection Composer providing an ability to manage nested items in [Tree](/elements/tree)/[Tree Select](/elements/tree-select) component with APIs for reading and updating item properties. It works in conjunction with [Tree Node](/custom-components/utils/tree-node). Most of the time, getTreeNodes(), getTreeNode() and TreeNode are all you need.

@> Tree Manager supports type generic defining the type of its items. In this document, this generic type is noted as `T`.

```javascript
// Here is an example how to use TreeManager in Tree to log all current selected items.
const tree = document.querySelector('ef-tree');
tree.data = [
  {
    label: 'Item 1',
    value: '1',
    expanded: true,
    items: [
      {
        label: 'Item 1.1',
        value: '1.1',
        selected: true
      },
      {
        label: 'Item 1.2',
        value: '1.2',
      },
      {
        label: 'Item 1.3',
        value: '1.3',
        selected: true
      }
    ]
  }
];
tree.addEventListener('value-changed', () => {
  const content = tree.manager.checkedItems.reduce((result, item) => {
    const value = item.value || '';
    if (result.length === 0) {
      result = value;
    } else {
      result += `, ${value}`;
    }
      return result;
  }, '');
  console.log(`Current selected items: ${content}`);// Expected output: '1.1, 1.3'.
});
```

```typescript
// Here is an example how to use TreeManager in Tree to log all current selected items.
import { Tree } from '@refinitiv-ui/elements/tree';
const tree: Tree = document.querySelector('ef-tree')!;
tree.data = [
  {
    label: 'Item 1',
    value: '1',
    expanded: true,
    items: [
      {
        label: 'Item 1.1',
        value: '1.1',
        selected: true
      },
      {
        label: 'Item 1.2',
        value: '1.2',
      },
      {
        label: 'Item 1.3',
        value: '1.3',
        selected: true
      }
    ]
  }
];
tree.addEventListener('value-changed', () => {
  const content = tree.manager.checkedItems.reduce((result, item) => {
    const value = item.value || '';
    if (result.length === 0) {
      result = value;
    } else {
      result += `, ${value}`;
    }
      return result;
  }, '');
  console.log(`Current selected items: ${content}`);// Expected output: '1.1, 1.3'.
});
```
