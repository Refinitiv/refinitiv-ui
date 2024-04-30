<!--
title: Tree Manager
location: ./custom-components/utils/tree-manager
type: page
layout: default
language_tabs: [javascript, typescript]
-->

# Tree Manager

Tree Manager is a simplified version of [Collection Composer](/custom-components/utils/data-management#collection-composer) providing an ability to manage nested items in [Tree](/elements/tree)/[Tree Select](/elements/tree-select) component with APIs for reading and updating item properties.

```javascript
// Select the first item in Tree.
const tree = document.querySelector('ef-tree');
const data = [
  { label: 'one', value: '1' },
  { label: 'two', value: '2', icon: 'info' }
];
tree.data = data;
console.log(tree.values); // Expected output: []

tree.manager.checkItem(data[0]);
console.log(tree.values); // Expected output: ['1']
```

```typescript
import type { Tree } from '@refinitiv-ui/elements/tree';

// Select the first item in Tree.
const tree = document.querySelector<Tree>('ef-tree')!;
tree.data = [
  { label: 'one', value: '1' },
  { label: 'two', value: '2', icon: 'info' }
];
console.log(tree.values); // Expected output: []

tree.manager.checkItem(data[0]);
console.log(tree.values); // Expected output: ['1']
```

Alternatively, [Tree Node](/custom-components/utils/tree-node) is the suggested way to work with Tree Manager. Most of the time, getTreeNodes(), getTreeNode() and TreeNode are all you need.

```javascript
// Select the first item in Tree by using Tree Node
const firstItem = tree.manager.getTreeNode(data[0])
firstItem.selected = true
```

@> Tree Manager supports type generic defining the type of its items. In this document, this generic type is noted as `T`.
