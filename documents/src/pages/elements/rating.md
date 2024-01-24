<!--
type: page
title: Rating
location: ./elements/rating
layout: default
language_tabs: [javascript, typescript]
-->

# Rating
::
```javascript
::import-elements::
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
::import-elements::
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
::import-elements::
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
::import-elements::
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
::import-elements::

const rating = document.querySelector('ef-rating');
const result = document.getElementById('result');

let previousValue = rating.value;

// clear existing rating if users tap the same rating
rating.addEventListener('tap', () => {
  if (rating.value === previousValue) {
    rating.value = '0';
    result.textContent = '';
  }
  previousValue = rating.value;
});

rating.addEventListener('value-changed', (event) => {
  result.textContent = 'You have selected: ' + event.detail.value;
});
```
```html
<ef-rating max="10" value="7" interactive></ef-rating>
<pre id="result"></pre>
```
::

```html
<ef-rating max="10" value="7" interactive></ef-rating>
<pre id="result"></pre>
```

```javascript
const rating = document.querySelector('ef-rating');
const result = document.getElementById('result');

let previousValue = rating.value;

// clear existing rating if users tap the same rating
rating.addEventListener('tap', () => {
  if (rating.value === previousValue) {
    rating.value = '0';
    result.textContent = '';
  }
  previousValue = rating.value;
});

rating.addEventListener('value-changed', (event) => {
  result.textContent = 'You have selected: ' + event.detail.value;
});
```

```typescript
import { ValueChangedEvent } from '@refinitiv-ui/elements';
import { Rating } from '@refinitiv-ui/elements/rating';

const rating: Rating | null = document.querySelector('ef-rating');
const result: HTMLElement | null = document.getElementById('result');

if (result && rating) {
  let previousValue = rating.value;

  // clear existing rating if users tap the same rating
  rating.addEventListener('tap', () => {
    if (rating.value === previousValue) {
      rating.value = '0';
      result.textContent = '';
    }
    previousValue = rating.value;
  });

  rating.addEventListener('value-changed', (event) => {
    result.textContent = 'You have selected: ' + (event as ValueChangedEvent).detail.value;
  });
}
```

## Accessibility
::a11y-intro::

`ef-rating` does not assign any roles as it's not an actionable component.

However, in the interactive mode, rating will be assigned `role="slider"`. Users can use arrow keys to update value. Current value of the rating will be updated to `aria-valuenow`. You can assign `aria-label` and `aria-valuetext` to `ef-rating` to give the component an assistive name for screen reader.

::a11y-end::
