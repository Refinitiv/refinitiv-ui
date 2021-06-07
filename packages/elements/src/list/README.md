# List

```live(preview)
<ef-list></ef-list>
<style>
ef-list {
  max-height: 200px;
}
</style>
<script>
var makeData = function () {
  return Array(1000).fill(0).map(function (_, i) {
    return {
      type: i % 10 === 0 ? 'header' : 'item',
      label: i % 10 === 0 ? i + '\'s' : 'Item number ' + i,
      value: i.toString(),
      disabled: i % 10 === 7,
      hidden: i % 10 === 9
    };
  });
};
document.querySelector('ef-list').data = makeData();
</script>
```

Renders a collection of data items and provides single and multiple selection modes.

## Setting array-based data

The easiest way to populate the list is to pass it an array of data items. Items must adhere to the [DataItem](../upgrade/data-property.html) interface.

```js
const el = document.querySelector('ef-list');

const data = [{
  label: 'Item One',
  value: '1'
},
{
  label: 'Item Two',
  value: '2'
},
{
  label: 'Item Three',
  value: '3'
}];

el.data = data;
```

## Using a composer to set and manage data

Setting data using a [CollectionComposer](../more-resources/collection-composer.html) can be useful when data needs to be managed externally.

```js
import { CollectionComposer } from '@refinitiv-ui/utils';

const el = document.querySelector('ef-list');

const data = [{
  label: 'Item One',
  value: '1'
},
{
  label: 'Item Two',
  value: '2'
},
{
  label: 'Item Three',
  value: '3'
}];

const composer = new CollectionComposer(data);

el.data = composer;
```

## Default renderer

By default, the list renders items using [Item](./ef-item.html) and therefore can be controlled by passing data of type [ItemData](https://git.sami.int.thomsonreuters.com/elf/ef-item/blob/v4/src/types.ts).

## Extending the default renderer

Extending the default renderer is the easiest way to display custom content, while retaining all of the default selection states and item types.

> Renders are currently being upgraded and should only be used for testing purposes.

```js
import { List, DefaultRenderer } from '@refinitiv-ui/list';

const el = document.querySelector('ef-list');
const defaultRenderer = new DefaultRenderer(el);

el.renderer = function (item, composer, element) {
  const el = defaultRenderer.apply(this, arguments);
  // do something extra
  return el;
};
```

## Creating a fully custom renderer

Creating a fully custom renderer gives you ultimate flexibility, however, you will have to manually handle all of the different item states.

```js
const el = document.querySelector('ef-list');

el.renderer = function (item, composer, element) {

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
