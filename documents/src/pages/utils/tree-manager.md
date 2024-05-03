<!--
title: Tree Manager
location: ./custom-components/utils/tree-manager
type: page
layout: default
language_tabs: [javascript, typescript]
-->

# Tree Manager

Tree Manager is a simplified version of [Collection Composer](/custom-components/utils/data-management#collection-composer) providing an ability to manage nested items in [Tree](/elements/tree)/[Tree Select](/elements/tree-select) component with APIs for reading and updating item properties.

Tree Manager works great in conjunction with [Tree Node](/custom-components/utils/tree-node). Along with `getTreeNodes()` and `getTreeNode()`, they are all your need for most use cases.

```javascript
// Select the first item in Tree by using Tree Node.
const tree = document.querySelector('ef-tree');
const data = [
  { label: 'one', value: '1' },
  { label: 'two', value: '2', icon: 'info' }
];
tree.data = data;
console.log(tree.values); // Expected output: []

const firstItem = tree.manager.getTreeNode(data[0]);
firstItem.selected = true;
console.log(tree.values); // Expected output: ['1']
```

```typescript
import type { Tree } from '@refinitiv-ui/elements/tree';

// Select the first item in Tree by using Tree Node.
const tree = document.querySelector<Tree>('ef-tree')!;
tree.data = [
  { label: 'one', value: '1' },
  { label: 'two', value: '2', icon: 'info' }
];
console.log(tree.values); // Expected output: []

const firstItem = tree.manager.getTreeNode(data[0]);
firstItem.selected = true;
console.log(tree.values); // Expected output: ['1']
```

Alternately, Tree Manager can be used independently to manipulate item properties. Most of its APIs require the original data item as a parameter.

```javascript
// Select the first item in Tree by using only Tree Manager.
tree.manager.checkItem(data[0]);
console.log(tree.values); // Expected output: ['1']
```

@> Tree Manager supports type generic defining the type of its items. In this document, this generic type is denoted as `T`.
