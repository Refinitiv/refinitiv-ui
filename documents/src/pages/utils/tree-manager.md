<!-- 
title: Tree Manager
location: ./custom-components/utils/tree-manager
type: page
layout: default
-->

# Tree Manager

Tree Manager is a simplified version of Collection Composer class that provide an ability to manage the nested items in [Tree](/elements/tree)/[Tree Select](/elements/tree-select) component. The class has an API for reading and updating data to access item properties. This works in conjunction with [Tree Node](/custom-components/utils/tree-node). Most of the time, getTreeNodes(), getTreeNode() and TreeNode are all you need.

Tree manager supports for generic type which allow users to define the type of item. In this document, the generic type is noted as `T`.

```javascript
// Example: how to use TreeManager in Tree component to log all current selected items.
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
      },
      {
        label: 'Item 1.2',
        value: '1.2',
      }
    ]
  }
];
tree.addEventListener('value-changed', () => {
  const content = tree.manager.checkedItems.reduce((result, item) => {
    if (result.length === 0) {
      result = item.value;
    } else {
      result += `, ${item.value}`;
    }
    return result;
  }, '');
  console.log(`Current selected items: ${content}`)
});
```

```typescript
// Example: how to use TreeManager in Tree component to log all current selected items.
const tree = document.querySelector('ef-tree')!;
tree.data = [
  {
    label: 'Item 1',
    value: '1',
    expanded: true,
    items: [
      {
        label: 'Item 1.1',
        value: '1.1',
      },
      {
        label: 'Item 1.2',
        value: '1.2',
      }
    ]
  }
];
tree.addEventListener('value-changed', () => {
  const content = tree.manager.checkedItems.reduce((result, item) => {
    if (result.length === 0) {
      result = item.value;
    } else {
      result += `, ${item.value}`;
    }
    return result;
  }, '');
  console.log(`Current selected items: ${content}`)
});
```
