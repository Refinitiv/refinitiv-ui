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

### Usage

`ef-multi-input` can be created and the `data` property used to set an initial list of pills.

```javascript
const el = document.querySelector('ef-multi-input');
const fruits = [
  { id: '1', value: 'banana', label: 'Banana' },
  { id: '2', value: 'orange', label: 'Orange' },
  { id: '3', value: 'grapes', label: 'Grapes' }
];
el.data = fruits;
```

By default, users are allowed to type any value in a text field and it will be created as a new pill when users press the enter key. You can disable the text field input using the `pills-only` attribute or set `pillsOnly` using the API property.

### Data property interface

The `data` is an array of the object use the [MultiInputData](https://github.com/Refinitiv/refinitiv-ui/blob/develop/packages/elements/src/multi-input/helpers/types.ts) interface for its data items.

The `data` property is only used for initializing `ef-multi-input`. It's immutable and used for keeping a reference to a source array of objects. The value of `data` won't be changed when using the add or remove pills API.
### Getting values

The value of the input text field can be accessed using `value`. To get a list of pills in the input, use the `values` property - it will return an array of the `value` properties of every pill.

::
```javascript
::multi-input::
const el = document.querySelector('ef-multi-input');
const result = document.getElementById('result-values');

window.customElements.whenDefined('ef-button').then(() => {
  const fruits = [
    { id: '1', value: 'banana', label: 'Banana' },
    { id: '2', value: 'orange', label: 'Orange' },
    { id: '3', value: 'grapes', label: 'Grapes' }
  ];
  el.data = fruits;
  result.innerHTML = JSON.stringify(el.values);
})
```
```css
div {
  margin-top: 5px;
}
```
```html
<ef-multi-input readonly></ef-multi-input>
<div>Values: <span id="result-values"></span></div>
```
::

```html
<ef-multi-input id="multiInput"></ef-multi-input>
```
```javascript
const el = document.getElementById('multiInput');
console.log(el.values); // array of value of each pills
```

### Add new items
You can add new items to `ef-multi-input` using an API. To add a new pill, use the `add` method by passing [MultiDataItem](https://github.com/Refinitiv/refinitiv-ui/blob/develop/packages/elements/src/multi-input/helpers/types.ts) as a parameter.

```html
<ef-multi-input id="multi-input"></ef-multi-input>
```
```javascript
const el = document.getElemetnById('multi-input');
const ret = el.add({
  value: 'newItemValue',
  label: 'New Item'
});

console.log(ret); // newly added item or null if new item is invalid
```

`ef-multi-input` provides the `item-added` event to listen for when users add a new item to the control by pressing the enter key on their keyboard. In the event object, you can access `item` for an item object that is newly added and `items` for an array of items currently shown in the control.

For example, if a user types `Mango` and presses the enter key in `ef-multi-input`.

```javascript
el.addEventListener('item-added', (e) => {
  console.log(e.detail.item) // Mango object.
  console.log(e.detail.items) // Array of item in control before mango is added.
});
```

The event can be cancelled so you can add custom logic to prevent some items from being added to the control.

```javascript
el.addEventListener('item-added', (e) => {
  if (e.detail.item.value === 'Mango') {
    e.preventDefault(); // Prevent  Mango to be added to the list
  } else {
    // Anything else can be added
  }
});
```

### Remove Items
Items in `ef-multi-input` can be removed using an API. You can remove only the last item, remove an item by the index of the pill, or remove all items that match a given value. See the API section below for more details.

You can listen to the `item-removed` event, which is fired when users remove any item using their keyboard, or by clicking the clear icon on a pill. In the event object, you can access `item` for the object of the item removed and `items` for an array of items currently shown in the control.

::
```javascript
::multi-input::
const el = document.querySelector('ef-multi-input');
const fruits = [
  { id: '1', value: 'banana', label: 'Banana' },
  { id: '2', value: 'orange', label: 'Orange' },
  { id: '3', value: 'grapes', label: 'Grapes' }
];
el.data = fruits;
el.addEventListener('item-removed', (e) => {
  const item = e.detail.item;
  el.value = item.label;
});
```
```html
<ef-multi-input placeholder="Enter text here"></ef-multi-input>
```
::

### Text Field value changed
When users type or change the value in the text field, the `value-changed` event will be triggered. The value of the text field is accessed using `value` in the event object.

## Accessibility
::a11y-intro::

The Multi Input is assigned `role="textbox"`. Entered options are assigned `role="button"`, with an accessible name such as “remove [option]”. States such as `disabled` or `read-only` are programmatically updated to match the element’s visual state.

::a11y-end::
