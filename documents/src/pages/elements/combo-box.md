<!--
type: page
title: Combo Box
location: ./elements/combo-box
layout: default
-->

# Combo Box

::
```javascript
::combo-box::
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

### Usage
The `ef-combo-box` uses the `data` property that follow [ComboBoxData](https://github.com/Refinitiv/refinitiv-ui/blob/develop/packages/elements/src/combo-box/helpers/types.ts) interface.


```javascript
const comboBox = document.querySelector('ef-combo-box');
comboBox.data = [
  { label: 'EMEA', type: 'header' },
  { label: 'France', value: 'fr' },
  { label: 'United Kingdom', value: 'gb', selected: true }
  // ...
];
```

The `ef-combo-box` uses the [ComboBoxData](https://github.com/Refinitiv/refinitiv-ui/blob/develop/packages/elements/src/combo-box/helpers/types.ts) interface for its data items.

### Getting value on single and multiple mode
When an item is selected, the item's `value` will set to Combo Box's `value`.

Value can be preset via `selected` field when set data or by programmatically setting the Combo Box `value` property.

```javascript
comboBox.data = [
  // ...
  { label: 'United Kingdom', value: 'gb', selected: true }
  // ...
];
```

```javascript
comboBox.value = 'gb';
```

In `multiple` mode, uses the `values` property to get selected values.

```javascript
comboBox.data = [
  // ...
  { label: 'United Kingdom', value: 'gb', selected: true },
  { label: 'Thailand', value: 'th', selected: true }
  // ...
];
```

```javascript
comboBox.values = ['gb', 'th'];
```

@> By default, Combo Box allows setting value that available in its data set.

### Free text mode
Set `free-text` to allow Combo Box to contain any arbitrary value. This mode is designed to cover a search input with suggestions scenario.

::
```javascript
::combo-box::
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

### Filtering
Default filtering is applied on the data `label` property. Filtering happens when the user modifies the input text.

The developer may wish to do their own filtering by implementing the `filter` property.

A typical example is to apply filter on multiple data properties (e.g. `label` and `value` as in the example below).

::
```javascript
::combo-box::
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
      queryRegExp = new RegExp(query.replace(/(\W)/g, '\\$1'), 'i');
    }
    return queryRegExp;
  };
  return (item) => {
    const regex = getRegularExpressionOfQuery();
    const result = query === item.value || regex.test(item.label);
    regex.lastIndex = 0; // do not forget to reset last index
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
      queryRegExp = new RegExp(query.replace(/(\W)/g, '\\$1'), 'i');
    }
    return queryRegExp;
  };

  // return scoped custom filter
  return (item) => {
    const regex = getRegularExpressionOfQuery();
      // test on value or label
      const result = query === item.value || regex.test(item.label);
      regex.lastIndex = 0; // do not forget to reset last index
      return result;
    };
};

comboBox.filter = customFilter(comboBox);
```


@> Regardless of filter configuration Combo Box always treats `type: 'header'` items as group headers, which persist as long as at least one item within the group is visible.

### Asynchronous filtering

The component's built-in filter can only be used with pre-loaded data. However, you can still implement Asynchronous filtering by following these simple steps.

First, you need to remove the default filter:

```javascript
comboBox.filter = null;
```

If the Combo Box value is set, you must ensure that the corresponding data item is **always** present.

```javascript
if (comboBox.value) {
  comboBox.data = fetch(`/give-me-data?v=${comboBox.value}`);
}
```

To avoid excessive calls to the server you may want to set `query-debounce-rate`.

```html
<ef-combo-box query-debounce-rate="200"></ef-combo-box>
```

Finally, listen for the `query-changed` event to make calls to the server and set the `data` property. Combo Box moves itself to the *loading* state.

```javascript
combo.addEventListener('query-changed', async () => {
  comboBox.data = fetch(`/give-me-data?q=${comboBox.query}&v=${comboBox.value}`);
});
```

In the example below we mimic asynchronous filtering with *setTimeout*.

::
```javascript
::combo-box::
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
          regex.lastIndex = 0;
          continue;
        }

        if (query && regex.test(item.label)) {
          filterData.push(item);
          regex.lastIndex = 0;
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

### Custom renderer

Combo Box supports custom rendering by providing a renderer function to the `renderer` property. The renderer receives a data item, Collection Composer and previously mapped item elements (if any), and must return an `HTMLElement`.

The preferred approach is to extend the `ComboBoxRenderer` that comes with Combo Box. The default renderer uses [Item](./elements/item) elements, and supports highlighted, selected, disabled, hidden and readonly states.

```javascript
import { ComboBoxRenderer } from '@refinitiv-ui/elements/combo-box';

// Create a re-useable renderer that shows Flags next to the country
class FlagRender extends ComboBoxRenderer {
  constructor (comboBox) {
    // Keep the reference to the default renderer
    const defaultRenderer = super(comboBox);
    // store reference to flag for easy access.
    // Use WeakMap to not care about memory leaks
    const flagMap = new WeakMap();

    // Return the closure
    return (item, composer, element) => {
      element = defaultRenderer(item, composer, element);
      const type = composer.getItemPropertyValue(item, 'type');
      let flagElement = flagMap.get(element);
      if (!flagElement && (!type || type === 'text')) {
        // Text items
        flagElement = document.createElement('ef-flag');
        flagElement.slot = 'left'; // use ef-item slotted content
        element.appendChild(flagElement);
        flagMap.set(element, flagElement);
      }
      else if (flagElement && type && type !== 'text') {
        // Header items, which should not have a flag
        // Make sure that flag element is removed
        flagElement.parentNode.removeChild(flagElement);
        flagElement.remove(element, flagElement);
        flagElement = null;
      }

      // Make sure that you can re-use the same element with new data item
      if (flagElement) {
        flagElement.flag = composer.getItemPropertyValue(item, 'value');
      }

      return element;
    };
  }
}
comboBox.renderer = new FlagRender(comboBox);
```

As an alternative you can provide your own renderer. If you go that route, you must ensure that, at a minimum, the highlighted, selected and hidden states are covered.

```javascript
comboBox.renderer = (item, composer, element) => {
  // Make sure to re-use the same element for increased performance
  if (!element) {
    element = document.createElement('div');
    element.style.setProperty('margin', '5px 10px');
    element.style.setProperty('padding', '5px 0');
  }

  // All item properties are read using the Collection Composer
  const type = composer.getItemPropertyValue(item, 'type');
  const label = composer.getItemPropertyValue(item, 'label');
  const selected = composer.getItemPropertyValue(item, 'selected') === true;
  const highlighted = composer.getItemPropertyValue(item, 'highlighted') === true;
  const hidden = composer.getItemPropertyValue(item, 'hidden') === true;

  // Style the element accordingly
  element.style.setProperty('display', hidden ? 'none': 'block');
  element.textContent = label;

  let colour = 'grey';
  if (type === 'header') {
    colour = 'red';
  }
  else if (highlighted) {
    colour = 'green';
  }
  else if (selected) {
    colour = 'blue';
  }

  element.style.setProperty('color', colour);

  return element;
};
```
::
```javascript
::combo-box::
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

const createFlagRender = (context) => {
  // Keep the reference to the default renderer
  const defaultRenderer = context.renderer;

  // store reference to flag for easy access.
  // Use WeakMap to not care about memory leaks
  const flagMap = new WeakMap();

  // Return the closure
  return (item, composer, element) => {
    element = defaultRenderer(item, composer, element);
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
};

const setRenderer = () => comboBox.renderer = createFlagRender(comboBox);

if (customElements.get('ef-combo-box')) {
  setRenderer();
}
else {
  customElements.whenDefined('ef-combo-box').then(setRenderer);
}
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

### CSS Variables

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
