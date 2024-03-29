<!-- 
title: TreeManager
location: ./custom-components/utils/tree-manager
type: page
layout: default
-->

# TreeManager

TreeManager class is a wrapper Collection Composer in term of the high level APIs that manage the nested collection item. The class contains APIs that are used to read and update property value from CollectionComposer to apply to components such as Trees.

::
```javascript
const tree = document.querySelector('ef-tree');
const textarea = document.querySelector('textarea');
const data = [
  {
    label: '1',
    value: '1',
    expanded: true,
    items: [
      {
        label: '1.1',
        value: '1.1',
      },
      {
        label: '1.2',
        value: '1.2',
      }
    ]
  }
];
tree.data = data;
tree.addEventListener('value-changed', () => {
  textarea.textContent = tree.manager.checkedItems.reduce((result, item) => {
    if (result.length === 0) {
      result = `Selected: ${item.value}`;
    } else {
      result += `, ${item.value}`;
    }
    return result;
  }, '');
});
```

```html
<ef-tree multiple></ef-tree>
<textarea></textarea>
```
::