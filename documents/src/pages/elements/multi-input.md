<!--
type: page
title: Multi Input
location: ./elements/multi-input
layout: default
-->

# Multi Input

::
```javascript
::multi-input::
const el = document.getElementById('fruits');
const fruits = [
  { id: '1', value: 'banana', label: 'Banana' },
  { id: '2', value: 'orange', label: 'Orange' },
  { id: '3', value: 'grapes', label: 'Grapes' }
];
el.data = fruits;

const catEl = document.getElementById('cats');
const cats = [
  { label: 'Tiger' },
  { label: 'Raven' },
  { label: 'Olive' },
  { label: 'Pearl' },
  { label: 'Dusky' },
  { label: 'Luna' },
  { label: 'Minna' },
  { label: 'Dice' },
  { label: 'Dixie' },
  { label: 'Oreo' },
  { label: 'Ash' },
  { label: 'Taffy' },
  { label: 'Soot' },
  { label: 'Orca' },
  { label: 'Chess' },
  { label: 'Panther' },
  { label: 'Sana' },
  { label: 'Esme' }
];
catEl.data = cats;
```
```css
#fruits {
  margin-bottom: 20px;
}
```
```html
<ef-multi-input id="fruits" placeholder="Enter text here"></ef-multi-input>
<ef-multi-input id="cats" pills-only></ef-multi-input>
```
::

`ef-multi-input` is an input field control that displays multiple items of data as an individual pill. Users can add new pills by using the keyboard, or remove any pills from the control.

## Usage

`ef-multi-input` can be created by setting an initial list of pills via `data` property.

```javascript
const el = document.querySelector('ef-multi-input');
const fruits = [
  { id: '1', value: 'banana', label: 'Banana' },
  { id: '2', value: 'orange', label: 'Orange' },
  { id: '3', value: 'grapes', label: 'Grapes' }
];
el.data = fruits;
```

By default, users are allowed to type any value in a text field and it will be created as a new pill when users press the enter key. You can disable the text field input using the `pills-only` attribute or set `pillsOnly` property to be true.

`data` is an array of [MultiInputData](https://github.com/Refinitiv/refinitiv-ui/blob/develop/packages/elements/src/multi-input/helpers/types.ts) interface. It is only used for initializing `ef-multi-input`. It's immutable and used for keeping a reference to a source array of objects. The value of `data` won't be changed when using the add or remove pills API.
## Getting values

The value of the input text field can be accessed using `value`. To get a list of pills in the input, use the `values` property - it will return an array of the `value` properties of every pill.

```html
<ef-multi-input id="multiInput"></ef-multi-input>
```
```javascript
const el = document.getElementById('multiInput');
console.log(el.values); // array of value of each pills
```

## Add new items
You can add new items to `ef-multi-input` using an API. To add a new pill, use the `add` method by passing [MultiDataItem](https://github.com/Refinitiv/refinitiv-ui/blob/develop/packages/elements/src/multi-input/helpers/types.ts) as a parameter.

```html
<ef-multi-input id="multi-input"></ef-multi-input>
```
```javascript
const el = document.getElemetnById('multi-input');
const result = el.add({
  value: 'newItemValue',
  label: 'New Item'
});

console.log(result); // newly added item or null if new item is invalid
```

`ef-multi-input` provides `item-added` event. The event will fire when users add a new item to the control by pressing the enter key on their keyboard. In the event object, you can access `item` for an item object that is newly added and `items` for an array of items currently shown in the control.

For example, if a user types `Mango` and presses the enter key in `ef-multi-input`.

```javascript
el.addEventListener('item-added', (event) => {
  console.log(event.detail.item) // Mango object.
  console.log(event.detail.items) // Array of items in control before mango is added.
});
```

The event can be cancelled so you can add custom logic to prevent some items from being added to the control.

```javascript
el.addEventListener('item-added', (event) => {
  if (event.detail.item.value === 'Mango') {
    event.preventDefault(); // Prevent  Mango to be added to the list
  } else {
    // Anything else can be added
  }
});
```

## Remove Items
Items in `ef-multi-input` can be removed using an API. You can remove only the last item, remove an item by the index of the pill, or remove all items that match a given value. See the API section below for more details.

You can listen to the `item-removed` event, which is fired when users remove any items using keyboard or by clicking the clear icon on a pill. In the event object, you can access `item` for the object of the item that has been removed and `items` for an array of items currently shown in the control.

## Text Field value changed
When users type or change the value in the text field, the `value-changed` event will be triggered. The value of the text field is accessed using `value` in the event object.

