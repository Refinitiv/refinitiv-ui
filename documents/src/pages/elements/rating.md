<!--
type: page
title: Rating
location: ./elements/rating
layout: default
-->

# Rating
::
```javascript
::rating::
```
```css
ef-rating {
  margin-right: 25px;
}
```
```html
<ef-rating value="2"></ef-rating>
<ef-rating value="4" interactive></ef-rating>
<ef-rating value="7.5" max="10"></ef-rating>
```
::

`ef-rating` is a star visualization component that is typically used for ranking.

## Usage
By default, `ef-rating` is displayed with no stars selected. Setting `value` selects/highlights stars.

::
```javascript
::rating::
```
```css
ef-rating {
  margin-right: 25px;
}
```
```html
<ef-rating></ef-rating>
<ef-rating value="2"></ef-rating>
<ef-rating value="3.5"></ef-rating>
```
::

```html
<ef-rating></ef-rating>
<ef-rating value="2"></ef-rating>
<ef-rating value="3.5"></ef-rating>
```

## Customize number of stars and size
The maximum number of stars can be overridden by setting `max`.

::
```javascript
::rating::
```
```html
<ef-rating max="10"></ef-rating>
```
::

```html
<ef-rating max="10"></ef-rating>
```

The size of the stars can be changed using standard CSS styles.

::
```javascript
::rating::
```
```css
#custom {
  font-size:30px;
}
```
```html
<ef-rating id="custom" value="2.5"></ef-rating>
```
::

```css
#custom {
  font-size:30px;
}
```
```html
<ef-rating id="custom" value="2.5"></ef-rating>
```

## Interactive rating
By default users cannot change the value of `ef-rating`. Specifying `interactive` makes it possible for users to change the value.

::
```javascript
::rating::

const customRating = document.getElementById('rateRestaurant');
let previousValue = customRating.value;

// clear existing rating if users tap the same rating
customRating.addEventListener('tap', () => {
  if ((customRating.value === previousValue)) {
    customRating.value = '0';
    document.getElementById('result').textContent = '';
  }
  previousValue = customRating.value
});

customRating.addEventListener('value-changed', (event) => {
  document.getElementById('result').textContent = 'You have selected: ' + event.detail.value;
});
```
```html
<ef-rating id="rateRestaurant" max="10" value="7" interactive></ef-rating>
<pre id="result"></pre>
```
::

```html
<ef-rating max="10" value="7" interactive></ef-rating>
<pre id="result"></pre>
```
```javascript
const customRating = document.getElementById('rateRestaurant');
let previousValue = el.value;

// clear existing rating if users tap the same rating
customRating.addEventListener('tap', () => {
  if ((customRating.value === previousValue)) {
    customRating.value = '0';
    document.getElementById('result').textContent = '';
  }
  previousValue = customRating.value
});

customRating.addEventListener('value-changed', (event) =>  {
  document.getElementById('result').textContent = 'You have selected: ' + event.detail.value;
});
```

## Accessibility
::a11y-intro::

`ef-rating` does not assign any roles as it's not an actionable component.

However, in the interactive mode, rating will be assigned `role="slider"`. Users can use arrow keys to update value. Current value of the rating will be updated to `aria-valuenow`. You can assign `aria-label` and `aria-valuetext` to `ef-rating` to give the component an assistive name for screen reader.

::a11y-end::
