<!--
type: page
title: Combo Box
location: ./elements/combo-box
layout: default
language_tabs: [javascript, typescript]
-->

# Combo Box

::
```javascript
::import-elements::
const comboBox = document.querySelector('ef-combo-box');
comboBox.data = [
  { label: 'EMEA', type: 'header' },
  { label: 'France', value: 'fr' },
  { label: 'Russian Federation', value: 'ru' },
  { label: 'Spain', value: 'es' },
  { label: 'United Kingdom', value: 'gb', selected: true },
  { label: 'APAC', type: 'header' },
  { label: 'China', value: 'ch' },
  { label: 'Australia', value: 'au' },
  { label: 'India', value: 'in' },
  { label: 'Thailand', value: 'th' },
  { label: 'AMERS', type: 'header' },
  { label: 'Canada', value: 'ca' },
  { label: 'United States', value: 'us' },
  { label: 'Brazil', value: 'br' },
  { label: 'Argentina', value: 'ar' }
];
```
```css
.wrapper {
  padding: 5px;
  height: 300px;
}
```
```html
<div class="wrapper">
  <ef-combo-box opened></ef-combo-box>
</div>
```
::

`ef-combo-box` displays a text input and an associated pop-up element that helps users set a value.

## Usage
Items in ComboBox can by populated by passing an array of `ItemData` to `data` property.


```javascript
const comboBox = document.querySelector('ef-combo-box');
const data = [
  { label: 'EMEA', type: 'header' },
  { label: 'France', value: 'fr' },
  { label: 'United Kingdom', value: 'gb', selected: true }
  // ...
];

comboBox.data = data;
```

```typescript
import { ComboBoxData } from '@refinitiv-ui/elements/combo-box';

const comboBox = document.querySelector('ef-combo-box');
const data: ComboBoxData = [
  { label: 'EMEA', type: 'header' },
  { label: 'France', value: 'fr' },
  { label: 'United Kingdom', value: 'gb', selected: true }
  // ...
];

if (comboBox) {
  comboBox.data = data;
}
```

The `ComboBoxData` is an array of `ItemData`.

```typescript
interface ItemData {
  /**
   * The text for the label indicating the meaning of the item.
   */
  label: string;
  /**
   * Value of the item
   */
  value: string;
  /**
   * The`subLabel` property represents the text beneath the label.
   * Not applicable if item is header or divider.
   */
  subLabel?: string;
  /**
   * Type of item. Value can be `text` (default), `header`, `divider`
   */
  type?: ItemType;
  /**
   * Sets the selection state of the item.
   */
  selected?: boolean;
  /**
   * Sets the item to be disabled.
   * Prevents the item from users interaction.
   */
  disabled?: boolean;
  /**
   * Set the icon name from the ef-icon list
   */
  icon?: string;
  /**
   * Set the tooltip text
   */
  tooltip?: string;
  /**
   * Whether to show or hide
   * the item from the renderer.
   */
  hidden?: boolean;
}
```

## Value
Setter and getter are slightly different in `single` and `multiple` mode.

### Single mode
Value can be preset using `selected` when set `data`.

```javascript
comboBox.data = [
  // ...
  { label: 'United Kingdom', value: 'gb', selected: true }
  // ...
];
```

You can also use `values` to get or set value of combo box.

```javascript
comboBox.value = 'gb';
```

### Multiple mode
Value can be preset using `selected` in multiple items when set `data`.

```javascript
comboBox.data = [
  // ...
  { label: 'United Kingdom', value: 'gb', selected: true },
  { label: 'Thailand', value: 'th', selected: true }
  // ...
];
```

You can also use `values` to get or set multiple values in form of Array.

```javascript
comboBox.values = ['gb', 'th'];
```

@> Combo Box only allows setting value that available in its dataset.

## Free text mode
Set `free-text` to allow Combo Box to contain any arbitrary value. This mode is designed to cover a search input with suggestions scenario.

::
```javascript
::import-elements::
const comboBox = document.querySelector('ef-combo-box');
comboBox.data = [
  { label: 'EMEA', type: 'header' },
  { label: 'France', value: 'France' },
  { label: 'Russian Federation', value: 'Russian Federation' },
  { label: 'Spain', value: 'Spain' },
  { label: 'United Kingdom', value: 'United Kingdom' },
  { label: 'APAC', type: 'header' },
  { label: 'China', value: 'China' },
  { label: 'Australia', value: 'Australia' },
  { label: 'India', value: 'India' },
  { label: 'Thailand', value: 'Thailand' },
  { label: 'AMERS', type: 'header' },
  { label: 'Canada', value: 'Canada' },
  { label: 'United States', value: 'United States' },
  { label: 'Brazil', value: 'Brazil' },
  { label: 'Argentina', value: 'Argentina' }
];
```
```css
.wrapper {
  padding: 5px;
  height: 300px;
}
```
```html
<div class="wrapper">
  <ef-combo-box free-text></ef-combo-box>
</div>
```
::

```html
<ef-combo-box free-text></ef-combo-box>
```

## Filtering
Default filtering is applied on the data `label` property. Filtering happens when the user modifies the input text.

The developer may wish to do their own filtering by implementing the `filter` property.

A typical example is to apply filter on multiple data properties (e.g. `label` and `value` as in the example below).

::
```javascript
::import-elements::
const comboBox = document.querySelector('ef-combo-box');
comboBox.data = [
  { label: 'EMEA', type: 'header' },
  { label: 'France', value: 'fr' },
  { label: 'Russian Federation', value: 'ru' },
  { label: 'Spain', value: 'es' },
  { label: 'United Kingdom', value: 'gb' },
  { label: 'APAC', type: 'header' },
  { label: 'China', value: 'ch' },
  { label: 'Australia', value: 'au' },
  { label: 'India', value: 'in' },
  { label: 'Thailand', value: 'th' },
  { label: 'AMERS', type: 'header' },
  { label: 'Canada', value: 'ca' },
  { label: 'United States', value: 'us' },
  { label: 'Brazil', value: 'br' },
  { label: 'Argentina', value: 'ar' }
];
const customFilter = (comboBox) => {
  let query = '';
  let queryRegExp;
  const getRegularExpressionOfQuery = () => {
    if (comboBox.query !== query || !queryRegExp) {
      query = comboBox.query || '';
      // Non-word characters are escaped to prevent ReDoS attack.
      // This serves as a demo only. 
      // For production, use a proven implementation instead.
      queryRegExp = new RegExp(query.replace(/(\W)/g, '\\$1'), 'i');
    }
    return queryRegExp;
  };
  return (item) => {
    const regex = getRegularExpressionOfQuery();
    const result =  regex.test(item.value) || regex.test(item.label);
    return result;
  };
};

comboBox.filter = customFilter(comboBox);
```
```css
.wrapper {
  padding: 5px;
  height: 300px;
}
```
```html
<div class="wrapper">
  <ef-combo-box placeholder="Type &quot;th&quot; or &quot;Thailand&quot;"></ef-combo-box>
</div>
```
::

```javascript
const comboBox = document.querySelector('ef-combo-box');

// Make a scoped re-usable filter for performance
const customFilter = (comboBox) => {
  let query = ''; // reference query string for validating queryRegExp cache state
  let queryRegExp; // cache RegExp

  // Get current RegExp, or renew if out of date
  // this is fetched on demand by filter/renderer
  // only created once per query
  const getRegularExpressionOfQuery = () => {
    if (comboBox.query !== query || !queryRegExp) {
      query = comboBox.query || '';
      // Non-word characters are escaped to prevent ReDoS attack.
      // This serves as a demo only. 
      // For production, use a proven implementation instead.
      queryRegExp = new RegExp(query.replace(/(\W)/g, '\\$1'), 'i');
    }
    return queryRegExp;
  };

  // return scoped custom filter
  return (item) => {
    const regex = getRegularExpressionOfQuery();
    const result = regex.test(item.value) || regex.test(item.label);
    return result;
  };
};

comboBox.filter = customFilter(comboBox);
```

```typescript
import { ItemData } from '@refinitiv-ui/elements/item';
import { ComboBox, ComboBoxFilter } from '@refinitiv-ui/elements/combo-box';

const comboBox = document.querySelector('ef-combo-box');

// Make a scoped re-usable filter for performance
const customFilter = (comboBox: ComboBox): ComboBoxFilter => {
  let query = ''; // reference query string for validating queryRegExp cache state
  let queryRegExp: RegExp; // cache RegExp

  // Get current RegExp, or renew if out of date
  // this is fetched on demand by filter/renderer
  // only created once per query
  const getRegularExpressionOfQuery = () => {
    if (comboBox.query !== query || !queryRegExp) {
      query = comboBox.query || '';
      // Non-word characters are escaped to prevent ReDoS attack.
      // This serves as a demo only. 
      // For production, use a proven implementation instead.
      queryRegExp = new RegExp(query.replace(/(\W)/g, '\\$1'), 'i');
    }
    return queryRegExp;
  };

  // return scoped custom filter
  return (item: ItemData) => {
    const regex = getRegularExpressionOfQuery();
    const result = regex.test(item.value) || regex.test(item.label as string);
    return result;
  };
};

if (comboBox) {
  comboBox.filter = customFilter(comboBox);
}
```

@> Regardless of filter configuration Combo Box always treats `type: 'header'` items as group headers, which persist as long as at least one item within the group is visible.

## Asynchronous filtering

The component's built-in filter can only be used with pre-loaded data. However, you can still implement Asynchronous filtering by following these simple steps.

First, you need to remove the default filter:

```javascript
comboBox.filter = null;
```

If the Combo Box value is set, you must ensure that the corresponding data item is **always** present.

```javascript
if (comboBox.value) {
  comboBox.data = await fetch(`/give-me-data?v=${comboBox.value}`);
}
```

To avoid excessive calls to the server you may want to set `query-debounce-rate`.

```html
<ef-combo-box query-debounce-rate="200"></ef-combo-box>
```

Finally, listen for the `query-changed` event to make calls to the server and set the `data` property. Combo Box moves itself to the *loading* state.

```javascript
comboBox.addEventListener('query-changed', async () => {
  comboBox.data = await fetch(`/give-me-data?q=${comboBox.query}&v=${comboBox.value}`);
});
```

In the example below we mimic asynchronous filtering with *setTimeout*.

::
```javascript
::import-elements::
// A collection of data our search is based on
const data = [
  { label: 'France', value: 'fr' },
  { label: 'Russian Federation', value: 'ru' },
  { label: 'Spain', value: 'es' },
  { label: 'United Kingdom', value: 'gb' },
  { label: 'China', value: 'ch' },
  { label: 'Australia', value: 'au' },
  { label: 'India', value: 'in' },
  { label: 'Thailand', value: 'th' },
  { label: 'Canada', value: 'ca' },
  { label: 'United States', value: 'us' },
  { label: 'Brazil', value: 'br' },
  { label: 'Argentina', value: 'ar' }
];

const comboBox = document.querySelector('ef-combo-box');

// You **must** reset the default filter
comboBox.filter = null;

// A function to make request. In real life scenario it may wrap fetch
const request = (query, value) => {
  // Non-word characters are escaped to prevent ReDoS attack.
  // This serves as a demo only. 
  // For production, use a proven implementation instead.
  const regex = new RegExp(query.replace(/(\W)/g, '\\$1'), 'i');

  // Always keep a promise to let Combo Box know that the data is loading
  return new Promise((resolve) => {
    let filterData = [];
    if (query || value) {
      for (let i = 0; i < data.length; i += 1) {
        let item = data[i];
        // Include element itself
        // Mark value hidden if it does not match search query
        if (value && item.value === value) {
          filterData.push(Object.assign({}, item, {
            selected: true,
            hidden: query ? !regex.test(item.label) : false
          }));
          continue;
        }

        if (query && regex.test(item.label)) {
          filterData.push(item);
        }
      }
    }
    setTimeout(() => {
      resolve(filterData);
    }, 500);
  });
}

// Populate self with the initial value
comboBox.data = request('', 'gb');

// Listen for query change event and make the request
comboBox.addEventListener('query-changed', (event) => {
  comboBox.data = request(comboBox.query, comboBox.value);
});
```
```css
.wrapper {
  padding: 5px;
  height: 300px;
}
```
```html
<div class="wrapper">
  <ef-combo-box value="gb" query-debounce-rate="200"></ef-combo-box>
</div>
```
::

## Custom renderer

Combo Box supports custom rendering by providing a renderer function to the `renderer` property. The renderer receives a data item, Collection Composer and previously mapped item elements (if any), and must return an `HTMLElement`.

The preferred approach is to create new renderer reference with `createComboBoxRenderer` that comes with Combo Box. The default renderer uses [Item](./elements/item) elements, and supports highlighted, selected, disabled, hidden and readonly states.

```javascript
import { createComboBoxRenderer } from '@refinitiv-ui/elements/combo-box';

// import flag to use in custom renderer
import '@refinitiv-ui/elements/flag';
import '@refinitiv-ui/elements/flag/themes/halo/dark';

// Keep the reference to the default renderer
const itemRenderer = createComboBoxRenderer(comboBox);
// Keep track flag elements after creating to avoid memory leak and re-render the same flag
const flagMap = new WeakMap();

// Create a re-useable renderer that shows Flags next to the country
comboBox.renderer = (item, composer, element) => {
  element = itemRenderer(item, composer, element);
  const type = composer.getItemPropertyValue(item, 'type');
  let flagElement = flagMap.get(element);
  if (!flagElement && (!type || type === 'text')) {
    // Text items
    flagElement = document.createElement('ef-flag');
    flagElement.slot = 'left';
    element.appendChild(flagElement);
    flagMap.set(element, flagElement);
  } else if (flagElement && type && type !== 'text') {
    // Header items, which should not have a flag
    // Make sure that flag element is removed
    flagElement.parentNode.removeChild(flagElement);
    flagMap.delete(element);
    flagElement = null;
  }

  // Make sure that you can re-use the same element with new data item
  if (flagElement) {
    flagElement.flag = composer.getItemPropertyValue(item, 'value');
  }

  return element;
};
```

```typescript
import { ItemData } from '@refinitiv-ui/elements/item';
import { ListItem } from '@refinitiv-ui/elements/list';
import { createComboBoxRenderer } from '@refinitiv-ui/elements/combo-box';

import { CollectionComposer } from '@refinitiv-ui/utils';

// import flag to use in custom renderer
import '@refinitiv-ui/elements/flag';
import '@refinitiv-ui/elements/flag/themes/halo/dark';

// Keep the reference to the default renderer
const itemRenderer = createComboBoxRenderer(comboBox);
// Keep track flag elements after creating to avoid memory leak and re-render the same flag
const flagMap = new WeakMap();

// Create a re-useable renderer that shows Flags next to the country
comboBox.renderer = (item: ItemData, composer: CollectionComposer, element: ListItem) => {
  element = itemRenderer(item, composer, element);
  const type = composer.getItemPropertyValue(item, 'type');
  let flagElement = flagMap.get(element);
  if (!flagElement && (!type || type === 'text')) {
    // Text items
    flagElement = document.createElement('ef-flag');
    flagElement.slot = 'left';
    element.appendChild(flagElement);
    flagMap.set(element, flagElement);
  } else if (flagElement && type && type !== 'text') {
    // Header items, which should not have a flag
    // Make sure that flag element is removed
    flagElement.parentNode.removeChild(flagElement);
    flagMap.delete(element);
    flagElement = null;
  }

  // Make sure that you can re-use the same element with new data item
  if (flagElement) {
    flagElement.flag = composer.getItemPropertyValue(item, 'value');
  }

  return element;
};
```

::
```javascript
::import-elements::
import { createComboBoxRenderer } from '/resources/elements/index.js';

const comboBox = document.querySelector('ef-combo-box');
comboBox.data = [
  { label: 'EMEA', type: 'header' },
  { label: 'France', value: 'fr' },
  { label: 'Russian Federation', value: 'ru' },
  { label: 'Spain', value: 'es' },
  { label: 'United Kingdom', value: 'gb', selected: true },
  { label: 'APAC', type: 'header' },
  { label: 'China', value: 'cn' },
  { label: 'Australia', value: 'au' },
  { label: 'India', value: 'in' },
  { label: 'Thailand', value: 'th' },
  { label: 'AMERS', type: 'header' },
  { label: 'Canada', value: 'ca' },
  { label: 'United States', value: 'us' },
  { label: 'Brazil', value: 'br' },
  { label: 'Argentina', value: 'ar' }
];

const itemRenderer = createComboBoxRenderer(comboBox);
const flagMap = new WeakMap();

comboBox.renderer = (item, composer, element) => {
    element = itemRenderer(item, composer, element);
    const type = composer.getItemPropertyValue(item, 'type');
    let flagElement = flagMap.get(element);
    if (!flagElement && (!type || type === 'text')) {
      // Text items
      flagElement = document.createElement('ef-flag');
      flagElement.slot = 'left';
      element.appendChild(flagElement);
      
      flagMap.set(element, flagElement);
    }
    else if (flagElement && type && type !== 'text') {
      // Header items, which should not have a flag
      // Make sure that flag element is removed
      flagElement.parentNode.removeChild(flagElement);
      flagMap.remove(element, flagElement);
      flagElement = null;
    }

    // Make sure that you can re-use the same element with new data item
    if (flagElement) {
      flagElement.flag = composer.getItemPropertyValue(item, 'value');
    }

    return element;
  };
```
```css
.wrapper {
  padding: 5px;
  height: 300px;
}
```
```html
<div class="wrapper">
  <ef-combo-box opened></ef-combo-box>
</div>
```
::

## CSS Variables

By default, the popup width is equivalent to the input box. However, it can be overridden using CSS.

```css
ef-combo-box {
  --list-max-height: 100px;
  --list-max-width: 70px;
}
```

| CSS Variables Name | Description              |
| ----------------- | ------------------------ |
| --list-max-width  | Max width of popup list  |
| --list-max-height | Max height of popup list |

## Accessibility
::a11y-intro::

`ef-combo-box` is assigned `role="combobox"` and can include properties such as `aria-autocomplete`, `aria-controls`, `aria-expanded` and `aria-activedescendant`. The expanded list box is assigned `role="listbox"` while its items are assigned `role="option"` and `aria-selected` which depends on item's selection state.

Combo Box manages the role and aria attributes automatically but you must ensure that the element has associated label by using `placeholder`, `aria-label`, `aria-labelledby` or `label[for="<element.id>"]`

```html
<ef-combo-box placeholder="Select Country"></ef-combo-box>
```
```html
<ef-combo-box 
  aria-label="Select Country"
  placeholder="Select Country">
</ef-combo-box>
```
```html
<label id="countryList">Select Country</label>
<ef-combo-box 
  aria-labelledby="countryList"
  placeholder="Select Country">
</ef-combo-box>
```
```html
<label for="countryList">Select Country</label>
<ef-combo-box
  id="countryList"
  placeholder="Select Country">
</ef-combo-box>
```

::a11y-end::
