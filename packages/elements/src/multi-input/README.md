# Multi Input

```live(preview)
<style>
#fruits {
  margin-bottom: 20px;
}
</style>

<ef-multi-input id="fruits" placeholder="Enter text here"></ef-multi-input>
<ef-multi-input id="cats" pills-only></ef-multi-input>
<script>
  var el = document.getElementById('fruits');
  var fruits = [
    { id: '1', value: 'banana', label: 'Banana' },
    { id: '2', value: 'orange', label: 'Orange' },
    { id: '3', value: 'grapes', label: 'Grapes' }
  ];
  el.data = fruits;

  var catEl = document.getElementById('cats');
  var cats = [
    { label: 'Tiger' },{ label: 'Raven' },{ label: 'Olive' },{ label: 'Pearl' },{ label: 'Dusky' },{ label: 'Luna' },{ label: 'Minna' },{ label: 'Dice' },{ label: 'Dixie' },{ label: 'Oreo' },{ label: 'Ash' },{ label: 'Taffy' },{ label: 'Soot' },{ label: 'Orca' },{ label: 'Chess' },{ label: 'Panther' },{ label: 'Sana' },{ label: 'Esme' }
  ];
  catEl.data = cats;
</script>
```

`ef-multi-input` is an input field control that displays multiple items of data as an individual pill. Users can add new pills by using the keyboard, or remove any pills from the control.

### Basic usage

`ef-multi-input` can be created and `data` property used to set an initial list of pills.

```live
<ef-multi-input placeholder="Enter text here"></ef-multi-input>
<script>
  var el = document.querySelector('ef-multi-input');
  var fruits = [
    { id: '1', value: 'banana', label: 'Banana' },
    { id: '2', value: 'orange', label: 'Orange' },
    { id: '3', value: 'grapes', label: 'Grapes' }
  ];
el.data = fruits;
</script>
```

```html
<ef-multi-input placeholder="Enter text here"></ef-multi-input>
<script>
  var el = document.querySelector('ef-multi-input');
  var fruits = [
    { id: '1', value: 'banana', label: 'Banana' },
    { id: '2', value: 'orange', label: 'Orange' },
    { id: '3', value: 'grapes', label: 'Grapes' }
  ];
el.data = fruits;
</script>
```

By default, users are allowed to type any value in a text field and it will be created as a new pill when users press the enter key. You can disable the text field input by using `pills-only` attribute or set `pillsOnly` using API property.

### MultiDataItem

`data` is array of `MultiDataItem` object which has description as below.


| Name     | Type    | Description                                                  |
| -------- | ------- | ------------------------------------------------------------ |
| id       | string  | Item's unique id (optional)                                  |
| label    | string  | Item's label                                                 |
| value    | string  | Value of an item                                             |
| readonly | boolean | Hide clear icon of pill but still able to remove by keyboard |
| disabled | disable | Not applicable for Multi Input yet                     |

The `data` property is only used for initializing the `ef-multi-input`. It's immutable and used for keeping a reference to a source array of objects. Value of `data` won't be changed when using add or remove pills API.

### Getting values

Value of input text field can be accessed using `value`. To get list of pills in the input, use `values` property. It will return an array of `value` property of every pill.

```live
<ef-multi-input readonly></ef-multi-input>
<div style="margin-top: 5px;">Values: <span id="result-values"></span></div>

<script>
    var el = document.querySelector('ef-multi-input');
    var result = document.getElementById('result-values');
    
    window.customElements.whenDefined('ef-button').then(function () {
      var fruits = [
        { id: '1', value: 'banana', label: 'Banana' },
        { id: '2', value: 'orange', label: 'Orange' },
        { id: '3', value: 'grapes', label: 'Grapes' }
      ];
      el.data = fruits;
      result.innerHTML = JSON.stringify(el.values);
    })
</script>
```

```html
<ef-multi-input id="multiInput"></ef-multi-input>
```
```js
var el = document.getElementById('multiInput');
console.log(el.values); // array of value of each pills
```

### Add new items
You can add new items to `ef-multi-input` by using an API. Uses `add` method by passing [MultiDataItem](#multidataitem) as a parameter to add the new pill.

```html
<ef-multi-input id="multi-input"></ef-multi-input>
```
```js
var el = document.getElemetnById('multi-input');
var ret = el.add({
  value: 'newItemValue',
  label: 'New Item'
});

console.log(ret); // newly added item or null if new item is invalid
```

`ef-multi-input` provides `item-added` event to listen when users add a new item to the control when the enter key is pressed on their keyboard. In the event object, you can access `item` for an item object that is newly added and `items` for an array of items currently shown in the control.

For example, if users type `Mango` and press enter key in `ef-multi-input`.

```js
el.addEventListener('item-added', function(e) {
  console.log(e.detail.item) // Mango object.
  console.log(e.detail.items) // Array of item in control before mango is added.
});
```

The event can be cancelled so you can add custom logic to prevent some items being added to the control.

```js
el.addEventListener('item-added', function(e) => {
  if (e.detail.item.value === 'Mango') {
    e.preventDefault(); // Prevent  Mango to be added to the list
  } else {
    // Anything else can be added
  }
});
```

### Remove Items
Items in `ef-multi-input` can be removed by using an API. You can remove only last item, remove item by index of pill, or remove all items that match a given value. See API section below for more detail.

You can listen to `item-removed` event, which is fired when users remove any item using their keyboard, or click the clear icon on a pill. In the event object, you can access `item` for object of item removed and `items` for an array of items currently shown in the control.

```live
<ef-multi-input placeholder="Enter text here"></ef-multi-input>
<script>
  var el = document.querySelector('ef-multi-input');
  var fruits = [
    { id: '1', value: 'banana', label: 'Banana' },
    { id: '2', value: 'orange', label: 'Orange' },
    { id: '3', value: 'grapes', label: 'Grapes' }
  ];
  el.data = fruits;
  el.addEventListener('item-removed', (e) => {
    var item = e.detail.item;
    el.value = item.label;
  });
</script>
```

### Text Field value changed
When users type or change value in text field, `value-changed` event will be triggered. Value of text field is accessed using `value` in event object.

