# Tree

```live(preview)
<ef-tree></ef-tree>
<script>
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
</script>
```

Displays a nested data structure as a tree menu. Useful for navigating grouped/categorized data.

### Basic usage

Configure the element by passing a configuration object to the element's `data` property.

``` html
<ef-tree></ef-tree>
```
``` js
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

The tree uses the `TreeItemData` interface for its data items. This interface extends from the standard [DataItem](https://elf.int.refinitiv.com/more-resources/collection-composer#dataitem) interface.

``` ts
interface TreeItemData extends DataItem {
  /** Item label to display */
  label?: string,
  /** Expands groups to show their children */
  expanded?: boolean
}
```

### Multiple selection

Tree is using single selection mode by default. Uses `multiple` attribute if you need multiple selection.

```html
<ef-tree multiple></ef-tree>
```

```live
<ef-tree multiple></ef-tree>
<script>
  const tree = document.querySelector('ef-tree');
  tree.data = [{
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
  }]
</script>
```

### Turn off parent/child relationship

For multiple selection mode, Tree is managing a relationship between parent and child items. Uses `no-relation` attribute to turn this feature off.

```html
<ef-tree multiple no-relation></ef-tree>
```

```live
<ef-tree multiple no-relation></ef-tree>
<script>
  const tree = document.querySelector('ef-tree');
  tree.data = [{
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
  }]
</script>
```

### Tree value(s) and events

Uses `value-changed` event to get notified when users changed any selection in Tree. Tree provides `value` and `values` to access selected item(s).

Typically, you can use `values` property as it will work for both multiple and single selection mode. `value` can represent a single value so you can use with single selection mode and in multiple selection mode, it will store the first value in `values` array.

```javascript
const tree = document.querySelector('ef-tree');

tree.addEventListener('value-changed', (e) => {
  console.log(e.detail); // value that users changed
  console.log(tree.values); // access selected items
});
```


