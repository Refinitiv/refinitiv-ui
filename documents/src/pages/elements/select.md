<!--
type: page
title: Select
location: ./elements/select
layout: default
language_tabs: [javascript, typescript]
-->

# Select

::
```javascript
::select::
```
```css
section {
  height: 250px;
  padding: 0 3px;
}
ef-select {
  margin-right: 5px;
}
```
```html
<section>
  <ef-select placeholder="Pick item..." opened>
    <ef-item type="header">Drinks</ef-item>
    <ef-item value="1">Cola</ef-item>
    <ef-item value="2" disabled>Apple Juice</ef-item>
    <ef-item value="3">Iced Tea</ef-item>
    <ef-item type="header">Ice Cream</ef-item>
    <ef-item value="4">Vanilla</ef-item>
    <ef-item value="5">Chocolate</ef-item>
    <ef-item value="6">Honey &amp; Walnut</ef-item>
    <ef-item value="7">Raspberry</ef-item>
  </ef-select>
  <ef-select placeholder="Disabled..." disabled></ef-select>
  <ef-select placeholder="Default selected...">
    <ef-item type="header">Drinks</ef-item>
    <ef-item value="1">Cola</ef-item>
    <ef-item value="2" disabled>Apple Juice</ef-item>
    <ef-item selected value="3">Iced Tea</ef-item>
    <ef-item type="header">Ice Cream</ef-item>
    <ef-item value="4">Vanilla</ef-item>
    <ef-item value="5">Chocolate</ef-item>
    <ef-item value="6">Honey &amp; Walnut</ef-item>
    <ef-item value="7">Raspberry</ef-item>
  </ef-select>
  <ef-select disabled>
    <ef-item selected>Lemonade</ef-item>
  </ef-select>
</section>
```
::

## Usage

`ef-select` expands upon the native `select` element, providing a fully themeable dropdown element.

Choices can be defined using `ef-item`.

::
```javascript
::select::
```
```css
section {
  height: 155px;
  padding: 0 3px;
}
```
```html
<section>
  <ef-select>
    <ef-item value="1">Cola</ef-item>
    <ef-item value="2">Lemonade</ef-item>
    <ef-item value="3">Orange Juice</ef-item>
    <ef-item value="4" disabled>Apple Juice</ef-item>
    <ef-item value="5">Iced Tea</ef-item>
  </ef-select>
</section>
```
::

```html
<ef-select>
  <ef-item value="1">Cola</ef-item>
  <ef-item value="2">Lemonade</ef-item>
  <ef-item value="3">Orange Juice</ef-item>
  <ef-item value="4" disabled>Apple Juice</ef-item>
  <ef-item value="5">Iced Tea</ef-item>
</ef-select>
```

## Data property interface

The `data` property of the `ef-select` use the [SelectData](https://github.com/Refinitiv/refinitiv-ui/blob/v7/packages/elements/src/select/helpers/types.ts) interface that extend from [ItemData](https://github.com/Refinitiv/refinitiv-ui/blob/v7/packages/elements/src/item/helpers/types.ts)

```javascript
const select = document.querySelector('ef-select');
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
    value: 'Strawberry'
  }
];

select.data = data;
```

```typescript
import { Select, SelectData } from '@refinitiv-ui/elements/select';

const select: Select | null = document.querySelector('ef-select');
const data: SelectData = [
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
    value: 'Strawberry'
  }
];

if (select) {
  select.data = data;
}
```

## Categorize into groups

Groups are also defined using `ef-item`. The only difference is that we add a `type="header"` attribute onto the element.

::
```javascript
::select::
```
```css
section {
  height: 250px;
  padding: 0 3px;
}
```
```html
<section>
  <ef-select>
  <ef-item type="header">Drinks</ef-item>
  <ef-item value="1">Cola</ef-item>
  <ef-item value="2">Lemonade</ef-item>
  <ef-item value="3">Water</ef-item>
  <ef-item type="header">Ice Cream</ef-item>
  <ef-item value="4">Vanilla</ef-item>
  <ef-item value="5">Chocolate</ef-item>
  <ef-item value="6">Strawberry</ef-item>
  <ef-item value="7">Raspberry</ef-item>
  </ef-select>
</section>
```
::

``` html
<ef-select>
  <ef-item type="header">Drinks</ef-item>
  <ef-item value="1">Cola</ef-item>
  <ef-item value="2">Lemonade</ef-item>
  <ef-item value="3">Water</ef-item>
  <ef-item type="header">Ice Cream</ef-item>
  <ef-item value="4">Vanilla</ef-item>
  <ef-item value="5">Chocolate</ef-item>
  <ef-item value="6">Strawberry</ef-item>
  <ef-item value="7">Raspberry</ef-item>
</ef-select>
```

## Adding a placeholder

Once you have your choices and groups defined, you can then add placeholder text to help users understand what the list contains and what their choice is for.

::
```javascript
::select::
```
```css
section {
  height: 155px;
  padding: 0 3px;
}
```
```html
<section>
  <ef-select placeholder="Choose your refreshment...">
    <ef-item value="1">Cola</ef-item>
    <ef-item value="2">Lemonade</ef-item>
    <ef-item value="3">Orange Juice</ef-item>
    <ef-item value="4">Apple Juice</ef-item>
    <ef-item value="5">Iced Tea</ef-item>
  </ef-select>
</section>
```
::

``` html
<ef-select placeholder="Choose your refreshment...">
  ...
</ef-select>
```

## Selecting a default option

You may wish to set an initial selected value. This can be achieved by adding a `selected` attribute to the option you would like to have selected by default.

Only one option can be selected at a time.

::
```javascript
::select::
```
```css
section {
  height: 225px;
  padding: 0 3px;
}
```
```html
<section>
  <ef-select placeholder="Choose your refreshment...">
    <ef-item type="header">Drinks</ef-item>
    <ef-item value="1">Cola</ef-item>
    <ef-item value="2">Lemonade</ef-item>
    <ef-item value="6" selected>Water</ef-item>
    <ef-item type="header">Ice Cream</ef-item>
    <ef-item value="7">Vanilla</ef-item>
    <ef-item value="14">Strawberry</ef-item>
    <ef-item value="15">Raspberry</ef-item>
  </ef-select>
</section>
```
::

```html
...
  <ef-item selected>Water</ef-item>
...
```

## Disabling an option

Options can be disabled by adding a `disabled` attribute to the options you wish to disable.

::
```javascript
::select::
```
```css
section {
  height: 200px;
  padding: 0 3px;
}
```
```html
<section>
  <ef-select placeholder="Choose your refreshment...">
    <ef-item type="header">Drinks</ef-item>
    <ef-item value="4" disabled>Apple Juice</ef-item>
    <ef-item value="5" disabled>Iced Tea</ef-item>
    <ef-item value="6" disabled>Water</ef-item>
    <ef-item type="header">Ice Cream</ef-item>
    <ef-item value="7">Vanilla</ef-item>
    <ef-item value="8">Chocolate</ef-item>
  </ef-select>
</section>
```
::

```html
...
  <ef-item disabled>Iced Tea</ef-item>
  <ef-item disabled>Water</ef-item>
...
```

## Restricting list height

The `max-height` of the list can be restricted using the `--list-max-height` property.

::
```javascript
::select::
```
```css
section {
  height: 130px;
  padding: 0 3px;
}
ef-select {
  --list-max-height: 100px;
}
```
```html
<section>
  <ef-select placeholder="Choose your refreshment...">
    <ef-item type="header">Drinks</ef-item>
    <ef-item value="4" disabled>Apple Juice</ef-item>
    <ef-item value="5" disabled>Iced Tea</ef-item>
    <ef-item value="6" disabled>Water</ef-item>
    <ef-item type="header">Ice Cream</ef-item>
    <ef-item value="7">Vanilla</ef-item>
    <ef-item value="8">Chocolate</ef-item>
  </ef-select>
</section>
```
::

```css
ef-select {
  --list-max-height: 100px;
}
```

## CSS Variables

The max height and width can be overridden by CSS Variables.

```css
ef-select {
  --list-max-height: 100px;
  --list-max-width: 70px;
}
```

| CSS Variables Name | Description                          |
| ------------------ | ------------------------------------ |
| --list-max-height  | Maximum height of the drop-down list |
| --list-max-width   | Maximum width of the drop-down list  |

## Accessibility
::a11y-intro::

`ef-select` is assigned `role="button"` and also attribute `aria-expanded`. Select options are assigned `role="option"` and `aria-selected` which depends on item's selection state.

* `ef-select` manages the role and aria attributes automatically if you create `ef-select` using `data` property
* If you create select declaratively by using `ef-item`, assign `role="option"` to selectable `ef-item`.

```html
<ef-select placeholder="Pick item">
  <ef-item value="GBP" role="option" selected>GBP (£)</ef-item>
  <ef-item value="EUR" role="option">EUR (€)</ef-item>
  <ef-item value="USD" role="option">USD ($)</ef-item>
</ef-select>
```
* If you have header items, assign `role="presentation"` on the items

```html
<ef-select placeholder="Pick item...">
  <ef-item role="presentation" type="header">Drinks</ef-item>
  <ef-item role="option" value="1">Cola</ef-item>
  <ef-item role="option" selected value="2">Lemonade</ef-item>
  <ef-item role="option" value="3">Iced Tea</ef-item>
  <ef-item role="option" value="4">Water</ef-item>
  <ef-item role="presentation" type="header">Ice Cream</ef-item>
  <ef-item role="option" value="5">Vanilla</ef-item>
  <ef-item role="option" value="6">Chocolate</ef-item>
  <ef-item role="option" value="7">Pistachio</ef-item>
  <ef-item role="option" value="8">Salted Caramel</ef-item>
</ef-select>
```

::a11y-end::
