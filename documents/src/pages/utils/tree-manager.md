<!-- 
title: Tree Manager
location: ./custom-components/utils/tree-manager
type: page
layout: default
-->

# Tree Manager

Tree Manager is a simplified version of Collection Composer class that provide an ability to manage the nested items in [Tree](/elements/tree)/[Tree Select](/elements/tree-select) component. The class has an API for reading and updating data to access item properties. This works in conjunction with [Tree Node](/custom-components/utils/tree-node). 

::
```javascript
/**
 * Import paths and theme-loader used for demonstration purposes
 */

import '/resources/elements/index.js';
import { halo } from '/theme-loader.js';
halo();

const tree = document.querySelector('ef-tree');
const textElement = document.querySelector('span');
const data = [
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
tree.data = data;
tree.addEventListener('value-changed', () => {
  textElement.textContent = tree.manager.checkedItems.reduce((result, item) => {
    if (result.length === 0) {
      result = item.value;
    } else {
      result += `, ${item.value}`;
    }
    return result;
  }, '');
});
```

```html
<div>
  <label>Current selected items: </label>
  <span></span>
</div>
<ef-tree multiple></ef-tree>
```
::