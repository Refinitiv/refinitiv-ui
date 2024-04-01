<!-- 
title: Tree Node
location: ./custom-components/utils/tree-node
type: page
layout: default
language_tabs: [javascript, typescript]
-->

# Tree Node

Tree Node provides an easy way to programmatically manipulate items in [Tree](/elements/tree) & [Tree Select](/elements/tree-select) components. Simply read or update item properties similar how one would do so on an object. It works in conjunction with [Tree Manager](/custom-components/utils/tree-manager).

```javascript
// expand all of the selected items in a Tree component
const tree = document.querySelector('ef-tree');
const treeNodes = tree.manager.getTreeNodes();
const selectedNodes = treeNodes.filter(treeNode => treeNode.selected);
selectedNodes.forEach(node => node.expanded = true);
```

```typescript
import type { Tree } from '@refinitiv-ui/elements/tree';

// expand all of the selected items in a Tree component
const tree = document.querySelector<Tree>('ef-tree')!;
const treeNodes = tree.manager.getTreeNodes();
const selectedNodes = treeNodes.filter(treeNode => treeNode.selected);
selectedNodes.forEach(node => node.expanded = true);
```

## Custom Renderer

Tree Node's simple APIs make customising renderers for [Tree](/elements/tree) & [Tree Select](/elements/tree-select) components a breeze. Note that for performance sensitive use cases, consider using [Collection Composer](/custom-components/utils/data-management#collection-composer) instead.

```javascript
// implement Tree component's default render with Tree Node


```

```typescript

```
