<!--
type: page
title: List
location: ./elements/list
layout: default
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

The easiest way to populate the list is to pass an array of data items to `data` property. Items must adhere to [DataItem](./custom-components/utils/data-management#data-item).

```javascript
const el = document.querySelector('ef-list');
const data = [
  { label: 'Item One', value: '1' },
  { label: 'Item Two', value: '2' },
  { label: 'Item Three', value: '3' }
];

el.data = data;
```

The `data` property of the `ef-list` use the [ListData](https://github.com/Refinitiv/refinitiv-ui/blob/v7/packages/elements/src/list/helpers/types.ts) type for its data items. Each of this item defaults to type `ItemData`. It could also be anything extended from [DataItem](./custom-components/utils/data-management#data-item).


## Using a composer to set and manage data

Setting data using a [CollectionComposer](./resources/collection-composer) can be useful when data needs to be managed externally.

```javascript
import { CollectionComposer } from '@refinitiv-ui/utils';

const el = document.querySelector('ef-list');

const data = [
  { label: 'Item One', value: '1' },
  { label: 'Item Two', value: '2' },
  { label: 'Item Three', value: '3' }
];
const composer = new CollectionComposer(data);

el.data = composer;
```

## Default renderer

By default, the list renders items using [Item](./elements/item) and therefore can be controlled by passing data of type `ItemData`.

## Extending the default renderer

Extending the default renderer is the easiest way to display custom content, while retaining all of the default selection states and item types.

!> Renders are currently being upgraded and should only be used for testing purposes.

```javascript
import { ListRenderer } from '@refinitiv-ui/elements/list';

const el = document.querySelector('ef-list');
const itemRenderer = new ListRenderer(el);

el.renderer = (item, composer, element) => {
  const el = itemRenderer(item, composer, element);
  // do something extra
  return el;
};
```

## Creating a fully custom renderer

Creating a fully custom renderer gives you ultimate flexibility, however, you will have to manually handle all of the different item states.

```javascript
const el = document.querySelector('ef-list');

el.renderer = (item, composer, element) => {

  // Reuse/create element for rendering content
  const el = element || document.createElement('div');

  // Setup the element if it hasn't already been created
  if (!element) {
    el.appendChild(document.createElement('div')).textContent = item.label;
    el.appendChild(document.createElement('ef-sparkline')).data = getLineData(item.value);
  }

  // Get element states
  // These values should be retrieved from the composer, as they can change.
  const selected = composer.getItemPropertyValue(item, 'selected') === true;
  const disabled = composer.getItemPropertyValue(item, 'disabled') === true;

  // Update the element states
  el.selected = selected;
  el.disabled = disabled;

  return el;

};
```

## Accessibility
::a11y-intro::

`ef-list` is assigned `role="listbox"` and can include properties such as `aria-labelledby`, `aria-activedescendant` and `aria-multiselectable`. The data items are assigned the `role="option"` and can include properties such as `aria-selected` in single mode or `aria-checked` in `multiple` mode and `aria-disabled`. The element’s properties programmatically update to match its visual state. It receives focus once at host and it is navigable through items using `Up` and `Down` arrow keys.

`ef-list` has already provided role and aria attributes for itself and items in the list. It also has implemented keyboard navigation following accessibility guideline.

::a11y-end::
