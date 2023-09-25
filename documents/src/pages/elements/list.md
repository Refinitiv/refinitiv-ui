<!--
type: page
title: List
location: ./elements/list
layout: default
language_tabs: [javascript, typescript]
-->

# List

::
```javascript
::list::
const makeData = () => {
  return Array(1000).fill(0).map((_, i) => {
    return {
      type: i % 10 === 0 ? 'header' : 'text',
      label: i % 10 === 0 ? i + '\'s' : 'Item number ' + i,
      value: i.toString(),
      disabled: i % 10 === 7,
      hidden: i % 10 === 9
    };
  });
};
document.querySelector('ef-list').data = makeData();
```
```css
ef-list {
  max-height: 200px;
}
```
```html
<ef-list></ef-list>
```
::

Renders a collection of data items and provides single and multiple selection modes.

## Usage

The easiest way to populate the list is to pass an array of data items to `data` property. Items must adhere to the [Data Item](./custom-components/utils/data-management#data-item) interface.

```javascript
const list = document.querySelector('ef-list');
const data = [
  { label: 'Item One', value: '1' },
  { label: 'Item Two', value: '2' },
  { label: 'Item Three', value: '3' }
];

list.data = data;
```

```typescript
import { List, ListData } from '@refinitiv-ui/elements/list';

const list: List | null = document.querySelector('ef-list');
const data: ListData = [
  { label: 'Item One', value: '1' },
  { label: 'Item Two', value: '2' },
  { label: 'Item Three', value: '3' }
];

if (list) {
  list.data = data;
}
```

The `data` property of the `ef-list` use the [ListData](https://github.com/Refinitiv/refinitiv-ui/blob/v7/packages/elements/src/list/helpers/types.ts) type for its data items. Each of this item defaults to type `ItemData`. It could also be anything extended [DataItem](./custom-components/utils/data-management#data-item).

## Using a composer to set and manage data

Setting data using a [CollectionComposer](./custom-components/utils/data-management#collection-composer) can be useful when data needs to be managed externally.

```javascript
import { CollectionComposer } from '@refinitiv-ui/utils';

const list = document.querySelector('ef-list');
const data = [
  { label: 'Item One', value: '1' },
  { label: 'Item Two', value: '2' },
  { label: 'Item Three', value: '3' }
];

const composer = new CollectionComposer(data);
list.data = composer;
```

```typescript
import { CollectionComposer } from '@refinitiv-ui/utils';
import { List, ListData } from '@refinitiv-ui/elements/list';

const list: List | null = document.querySelector('ef-list');
const data: ListData = [
  { label: 'Item One', value: '1' },
  { label: 'Item Two', value: '2' },
  { label: 'Item Three', value: '3' }
];

const composer = new CollectionComposer(data);

if (list) {
  list.data = composer;
}
```

## Default renderer

By default, the list renders items using [Item](./elements/item) and therefore can be controlled by passing data of type `ItemData`.

## Extending the default renderer

Extending the default renderer is the easiest way to display custom content, while retaining all of the default selection states and item types.

!> Renders are currently being upgraded and should only be used for testing purposes.

```javascript
import { ListRenderer } from '@refinitiv-ui/elements/list';

const list = document.querySelector('ef-list');
const itemRenderer = new ListRenderer(list);

list.renderer = (item, composer, element) => {
  const itemElement = itemRenderer(item, composer, element);
  // do something extra
  return itemElement;
};
```

```typescript
import { CollectionComposer } from '@refinitiv-ui/utils';
import { List, ListItem, ListRenderer } from '@refinitiv-ui/elements/list';

const list: List | null = document.querySelector('ef-list');

if (list) {
  const itemRenderer = new ListRenderer(list);
  list.renderer = (item: ListItem, composer: CollectionComposer, element: HTMLElement) => {
    const itemElement = itemRenderer(item, composer, element);
    // do something extra
    return itemElement;
  };
}
```

## Creating a fully custom renderer

Creating a fully custom renderer gives you ultimate flexibility, however, you will have to manually handle all of the different item states.

```javascript
const list = document.querySelector('ef-list');
list.renderer = (item, composer, element) => {
  // Reuse/create element for rendering content
  const customItem = element || document.createElement('ef-item');

  // Setup the element if it hasn't already been created
  if (!element) {
    const efItem = document.createElement('ef-item');
    const sparkline = document.createElement('ef-sparkline');

    customItem.appendChild(efItem).textContent = item.label;
    customItem.appendChild(sparkline).data = getLineData(item.value)
  }

  // Get element states
  // These values should be retrieved from the composer, as they can change.
  const selected = composer.getItemPropertyValue(item, 'selected') === true;
  const disabled = composer.getItemPropertyValue(item, 'disabled') === true;

  // Update the element states
  customItem.selected = selected;
  customItem.disabled = disabled;

  return customItem;
};
```
```typescript
import { CollectionComposer } from '@refinitiv-ui/utils';

import { List } from '@refinitiv-ui/elements/list';
import { Item, ItemData } from '@refinitiv-ui/elements/item';
import { Sparkline } from '@refinitiv-ui/elements/sparkline';

const list: List | null = document.querySelector('ef-list');
if (list) {
  list.renderer = (item: ItemData, composer: CollectionComposer, element?: Item | undefined) => {
    // Reuse/create element for rendering content
    const customItem: Item = element || document.createElement('ef-item');

    // Setup the element if it hasn't already been created
    if (!element) {
      const efItem = document.createElement('ef-item');
      const sparkline: Sparkline = document.createElement('ef-sparkline');

      customItem.appendChild(efItem).textContent = item.label as string;
      customItem.appendChild(sparkline).data = getLineData(item.value);
    }

    // Get element states
    // These values should be retrieved from the composer, as they can change.
    const selected = composer.getItemPropertyValue(item, 'selected') === true;
    const disabled = composer.getItemPropertyValue(item, 'disabled') === true;

    // Update the element states
    customItem.selected = selected;
    customItem.disabled = disabled;

    return customItem;
  };
}

```

## Accessibility
::a11y-intro::

`ef-list` is assigned `role="listbox"` and can include properties such as `aria-labelledby`, `aria-activedescendant` and `aria-multiselectable`. The data items are assigned the `role="option"` and can include properties such as `aria-selected` in single mode or `aria-checked` in `multiple` mode and `aria-disabled`. The element’s properties programmatically update to match its visual state. It receives focus once at host and it is navigable through items using `Up` and `Down` arrow keys.

`ef-list` has already provided role and aria attributes for itself and items in the list. It also has implemented keyboard navigation following accessibility guideline.

::a11y-end::
