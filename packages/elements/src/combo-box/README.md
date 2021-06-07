# Combo Box

```live(preview)
<style>
  .wrapper {
    padding: 5px;
    height: 300px;
  }
</style>
<div class="wrapper">
  <ef-combo-box opened></ef-combo-box>
</div>
<script>
  var comboBox = document.querySelector('ef-combo-box');

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
</script>
```

`ef-combo-box` displays a text input and an associated pop-up element that helps users to set the value.

## Basic usage

`ef-combo-box` uses the `data` property, and the same data format as [List](./ef-list.md).

``` live
<style>
  .wrapper {
    padding: 5px;
    height: 300px;
  }
</style>
<div class="wrapper">
  <ef-combo-box></ef-combo-box>
</div>
<script>
  var comboBox = document.querySelector('ef-combo-box');
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
</script>
```

``` html
<ef-combo-box></ef-combo-box>
```

``` js
const comboBox = document.querySelector('ef-combo-box');
comboBox.data = [
  { label: 'EMEA', type: 'header' },
  { label: 'France', value: 'fr' },
  { label: 'United Kingdom', value: 'gb', selected: true }
  // ...
];
```

## Value

When an item is selected, the `value` property of the item will become Combo Box's new `value`.

Value can be set using `selected` property or programmatically by setting the Combo Box `value` property.

``` js
comboBox.data = [
  // ...
  { label: 'United Kingdom', value: 'gb', selected: true }
  // ...
]; 
```

``` js
comboBox.value = 'gb';
```

### Values

When Combo Box is in `multiple` mode it uses the `values` property to return multiple values.

Values can be set using `selected` property or programmatically by setting Combo Box `values` property.

``` js
comboBox.data = [
  // ...
  { label: 'United Kingdom', value: 'gb', selected: true },
  { label: 'Thailand', value: 'th', selected: true }
  // ...
];
```

``` js
comboBox.values = ['gb', 'th'];
```

> Combo Box can only select data it already has.

## Free Text mode
Set `free-text` to allow Combo Box to contain any arbitrary value. This mode is designed to cover a search input with suggestions scenario.

``` html
<ef-combo-box free-text></ef-combo-box>
```

``` live
<style>
  .wrapper {
    padding: 5px;
    height: 300px;
  }
</style>
<div class="wrapper">
  <ef-combo-box free-text></ef-combo-box>
</div>
<script>
  var comboBox = document.querySelector('ef-combo-box');
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
</script>
```

## Filtering
The default filtering is applied on data `label` property. Filtering happens when the user modifies input text.

The developer may wish to do their own filtering by implementing `filter` property.

A typical example is to apply filter on multiple data properties (e.g. `label` and `value` as in the example below).

``` js
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

``` live
<style>
  .wrapper {
    padding: 5px;
    height: 300px;
  }
</style>
<div class="wrapper">
  <ef-combo-box placeholder="Type &quot;th&quot; or &quot;Thailand&quot;"></ef-combo-box>
</div>
<script>
  var comboBox = document.querySelector('ef-combo-box');
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
  var customFilter = function (comboBox) {
    var query = '';
    var queryRegExp;
    var getRegularExpressionOfQuery = function () {
      if (comboBox.query !== query || !queryRegExp) {
        query = comboBox.query || '';
        queryRegExp = new RegExp(query.replace(/(\W)/g, '\\$1'), 'i');
      }
      return queryRegExp;
    };
    return function (item) {
      var regex = getRegularExpressionOfQuery();
      var result = query === item.value || regex.test(item.label);
      regex.lastIndex = 0; // do not forget to reset last index
      return result;
    };
  };

  comboBox.filter = customFilter(comboBox);
</script>
```

> Regardless of filter configuration Combo Box always treats `type: 'header'` items as group headers, which persist as long as at least one item within the group is visible.

### Asynchronous filtering

The built in filter can only be used with pre-loaded data. However you can still implement Asynchronous filtering by following simple steps. 

At first you need to remove the default filter:

``` js
comboBox.filter = null;
```

If Combo Box value is set, you must ensure that the corresponding data item is **always** present.

``` js
if (comboBox.value) {
  comboBox.data = fetch(`/give-me-data?v=${comboBox.value}`);
}
```

To avoid excessive calls to the server you may want to set `query-debounce-rate`.

``` html
<ef-combo-box query-debounce-rate="200"></ef-combo-box>
```

And finally you listen for `query-changed` event to make calls to the server and set `data` property. Combo Box moves itself to *loading* state.

``` js
combo.addEventListener('query-changed', async () => {
  comboBox.data = fetch(`/give-me-data?q=${comboBox.query}&v=${comboBox.value}`);
});
```

In the example below we mimic asynchronous filtering with *setTimeout*.

``` live
<style>
  .wrapper {
    padding: 5px;
    height: 300px;
  }
</style>
<div class="wrapper">
  <ef-combo-box value="gb" query-debounce-rate="200"></ef-combo-box>
</div>
<script>
  // A collection of data our search is based on
  var data = [
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
  
  var comboBox = document.querySelector('ef-combo-box');

  // You **must** reset the default filter
  comboBox.filter = null;

  // A function to make request. In real life scenario it may wrap fetch
  var request = function (query, value) {
    var regex = new RegExp(query.replace(/(\W)/g, '\\$1'), 'i');

    // Always keep a promise to let Combo Box know that the data is loading
    return new Promise(function (resolve) {
      var filterData = [];
      if (query || value) {
        for (var i = 0; i < data.length; i += 1) {
          var item = data[i];
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
      setTimeout(function () {
        resolve(filterData);
      }, 500);
    });
  }

  // Populate self with the initial value
  comboBox.data = request('', 'gb');
  
  // Listen for query change event and make the request
  comboBox.addEventListener('query-changed', function (event) {
    comboBox.data = request(comboBox.query, comboBox.value);
  });
</script>
```

## Custom renderer

Combo Box supports custom rendering. This is achieved by providing a renderer function to the `renderer` property. The renderer receives a data item, Collection Composer and previously mapped item elements (if any), and must return an `HTMLElement`.

The preferred way is to extend the `DefaultRender` that comes with Combo Box. The default render uses [Item](./ef-item.md) elements, and supports highlighted, selected, disabled, hidden and readonly states.

``` js
import { DefaultRenderer } from '../lib/ef-combo-box';

// Create a re-useable renderer that shows Flags next to the country
class FlagRender extends DefaultRenderer {
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

As an alternative you can provide your own render. In that case you must ensure that as a minium highlighted, selected and hidden states are covered.

```js
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

```live
<style>
  .wrapper {
    padding: 5px;
    height: 300px;
  }
</style>
<div class="wrapper">
  <ef-combo-box opened></ef-combo-box>
</div>
<script>
  var comboBox = document.querySelector('ef-combo-box');

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

  // Use ES5 syntax here for compatibility
  // If possible, use ESM import and classes instead:
  // import { DefaultRenderer } from '../lib/ef-combo-box';
  // class FlagRender extends DefaultRenderer { /* ... */ }
  var createFlagRender = function (context) {
    // Keep the reference to the default renderer
    var defaultRenderer = context.renderer;
    
    // store reference to flag for easy access.
    // Use WeakMap to not care about memory leaks
    var flagMap = new WeakMap();
    
    // Return the closure
    return function (item, composer, element) {
      element = defaultRenderer(item, composer, element);
      var type = composer.getItemPropertyValue(item, 'type');
      var flagElement = flagMap.get(element);
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

  var setRenderer = function () {
    comboBox.renderer = createFlagRender(comboBox);
  };

  if (customElements.get('ef-combo-box')) {
    setRenderer();
  }
  else {
    customElements.whenDefined('ef-combo-box').then(setRenderer);
  }
</script>
```

## Customize popup panel size

By default popup width is equivalent to the input box. However, it can be overridden by using CSS variables.

| CSS Variables Name | Description              |
| ------------------ | ------------------------ |
| --list-max-width   | Max width of popup list  |
| --list-max-height  | Max height of popup list |
