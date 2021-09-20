# Collection Composer

Composes a collection of data items into a packaged, performant and practical low-level API.

It's designed to handle and manage a standard list collection, and allows for queries and updates to items, without modifying the original collection, or, item, in any way.

### Data Example

This is an example collection which adheres to the [`DataItem`](./data-item.ts) interface.
``` js
const data = [
  {
    label: 'Drinks',
    type: 'header'
  },
  {
    label: 'Tea',
    value: 'tea'
  },
  {
    label: 'Beer',
    value: 'beer',
    selected: true
  },
  {
    label: 'Ice Cream',
    type: 'header'
  },
  {
    label: 'Vanilla',
    value: 'vanilla',
    disabled: true
  },
  {
    label: 'Strawberry',
    value: 'Strawberry',
    hidden: true
  }
]
```

### Creating a composer

The composer takes the standard data collection and returns the composer API.

``` js
const cc = new CollectionComposer(data);

// Change item selection to false
cc.setItemPropertyValue(dataItem, 'selected', false);

// Change item disabled state to true
cc.setItemPropertyValue(dataItem, 'disabled', true);

// Query all items with selected set to true
const selectedItems = cc.queryItemsByPropertyValue(dataItem, 'selected', true);
```

### Creating proxy APIs

The API of the Collection Composer is very low-level, as theoretically, it can handle any type of data item.

This, although powerful, is quite limited, and only provides basic functionality. Therefore, you may wish to create proxies inside of your element.

A proxy, is a simplified function which proxies off to the composer, allowing for a more meaningful API inside of your element.

An example of this, is a list element. This element is interested in item selections. One way to cater for this, is to use the standard `queryItemsByPropertyValue()` function, however, this can be improved with a simple proxy.

``` js
// Get selected items
const getSelection = () => cc.queryItemsByPropertyValue('selected', true);

// Clear all selected items
const clearSelection = () => getSelection()
.forEach(item => cc.setItemPropertyValue('selected', false));

// Is the item currently selected?
const isSelected = (item) => cc.getItemPropertyValue(item, 'selected') === true;

// Get all non-hidden items
const visibleItems = () => cc.queryItems((item, composer) => {
  return composer.getItemPropertyValue(item, 'hidden') !== true;
});
```

### Nested Data

Collection Composer supports the handling of nested data and includes APIs to help traverse the structure.

``` js
const nestedData = [
  {
    label: 'Drinks',
    type: 'header',
    items: [{
      label: 'Tea',
      value: 'tea'
    },
    {
      label: 'Beer',
      value: 'beer',
      selected: true
    },
    {
      label: 'Ice Cream',
      type: 'header'
    },
    {
      label: 'Vanilla',
      value: 'vanilla',
      disabled: true
    },
    {
      label: 'Strawberry',
      value: 'Strawberry',
      hidden: true
    }]
  }
]
```

``` js
const cc = new CollectionComposer(nestedData);

// Get the parent item
cc.getItemParent(dataItem);

// Get a list of all ancestors
cc.getItemAncestors(dataItem);

// Get a list of all siblings
cc.getItemSiblings(dataItem);

// Get a list of all children
cc.getItemChildren(dataItem);

// Get a list of all descendants
cc.getItemDescendants(dataItem);
```

These APIs can be extended to do some powerful calculations.

For example, the below function takes a parent node and calculates its checked state by looking its descendants states.

```js
const calculateCheckedState = (item) => {
  const descendants = cc.getItemDescendants(item);
  const hasCheckedItems = descendants.some((descendant) => cc.getItemPropertyValue(descendant, 'selected') === true);
  const hasUncheckedItems = descendants.some((descendant) => cc.getItemPropertyValue(descendant, 'selected') !== true);
  const state = hasCheckedItems && hasUncheckedItems ? 'indeterminate' : hasCheckedItems ? 'checked' : '';
  return state;
}
```
