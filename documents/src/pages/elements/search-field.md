<!--
type: page
title: Search Field
location: ./elements/search-field
layout: default
language_tabs: [javascript, typescript]
-->

# Search Field

::
```javascript
::search-field::
```
```html
<ef-search-field placeholder="Search keywords ..."></ef-search-field>
```
::

`ef-search-field` is a form control input designed to receive search query input from users.

## Usage

`ef-search-field` has identical behavior to native text input and `ef-text-field`, except that the icon isn't customizable.

```html
<ef-search-field placeholder="Type a keyword to search ..."></ef-search-field>
```

## Getting value

The value can be accessed using the `value` property.

```html
<ef-search-field
  value="keywords"
  placeholder="Search keywords ...">
</ef-search-field>
```

```javascript
const searchField = document.querySelector("ef-search-field");
console.log(searchField.value); // "keywords"
```

You can also listen to the `value-changed` event, which triggers whenever user interactions change the value.

::
```javascript
::search-field::
const searchField = document.querySelector("ef-search-field");
const valueText = document.getElementById("value-text");

searchField.addEventListener("value-changed", (event) => {
  valueText.innerHTML = event.detail.value;
});
```
```html
<ef-search-field placeholder="Type something here .."></ef-search-field>
<p>Value: <code id="value-text"></code></p>
```
::

```html
<ef-search-field placeholder="Type something here .."></ef-search-field>
<p>Value: <code id="value-text"></code></p>
```

```javascript
const searchField = document.querySelector("ef-search-field");
const valueText = document.getElementById("value-text");

searchField.addEventListener("value-changed", (event) => {
  valueText.innerHTML = event.detail.value;
});
```
```typescript
import { ValueChangedEvent } from '@refinitiv-ui/elements';

const searchField = document.querySelector("ef-search-field");
const valueText = document.getElementById("value-text");

searchField?.addEventListener("value-changed", (event) => {
  if (valueText) {
    valueText.innerHTML = (event as ValueChangedEvent).detail.value;
  }
});
```

## Input validation

Validation occurs when constraints are provided and the value changes. If the error state changes, it will dispatch the `error-changed` event along with the current error state.

Alternatively, the `error` property can be checked to confirm if the input is valid or not.

## Input length

The `maxlength` attribute limits the number of characters that users can enter and the `minlength` attribute sets the minimum number of characters required. `ef-search-field` will show error styles if a condition is not met.

::
```javascript
::search-field::
const searchField = document.querySelector("ef-search-field");
const errorText = document.getElementById("error-text");
searchField.addEventListener("error-changed", (event) => {
  if (event.detail.value) {
    errorText.innerHTML = "Value length must be between 2 - 4 characters";
  }
  else {
    errorText.innerHTML = "";
  }
});
```
```css
#error-text {
  color:#d94255;
}
ef-search-field {
  width: 200px;
}
```
```html
<ef-search-field minlength="2" maxlength="4" placeholder="Between 2 to 4 characters"></ef-search-field>
<p id="error-text"></p>
```
::

```html
<ef-search-field
  minlength="2"
  maxlength="4"
  placeholder="Between 2 to 4 characters">
</ef-search-field>
<p id="error-text"></p>
```

```javascript
const searchField = document.querySelector("ef-search-field");
const errorText = document.getElementById("error-text");

searchField.addEventListener("error-changed", (event) => {
  if (event.detail.value) {
    errorText.innerHTML = "Value length must be between 2 - 4 characters.";
  }
  else {
    errorText.innerHTML = "";
  }
});
```

```typescript
import { ErrorChangedEvent } from '@refinitiv-ui/elements';

const searchField = document.querySelector("ef-search-field");
const errorText = document.getElementById("error-text");

searchField?.addEventListener("error-changed", (event) => {
  if (!errorText) {
    return;
  }
  if ((event as ErrorChangedEvent).detail.value) {
    errorText.innerHTML = "Value length must be between 2 - 4 characters.";
  }
  else {
    errorText.innerHTML = "";
  }
});
```

## Validate value using pattern

You can use a regular expression to validate the input value by setting it to the `pattern` attribute.

::
```javascript
::search-field::
const searchField = document.querySelector("ef-search-field");
const errorText = document.getElementById("error-text");
searchField.addEventListener("error-changed", (event) => {
  if (event.detail.value) {
    errorText.innerHTML = "Value must be uppercase letters and has 2 - 5 characters.";
  }
  else {
    errorText.innerHTML = "";
  }
});
```
```css
#error-text {
  color:#d94255;
}
ef-search-field {
  width: 80px;
}
```
```html
<p>Uppercase letters and 2-5 characters</p>
<ef-search-field pattern="[A-Z]{2,5}" placeholder="TRI"></ef-search-field>
<p id="error-text"></p>
```
::

```html
<label for="search-pattern">Enter uppercase letters and 2-5 characters</label>
<ef-search-field pattern="[A-Z]{2,5}"></ef-search-field>
<p id="error-text"></p>
```

```javascript
const searchField = document.querySelector("ef-search-field");
const errorText = document.getElementById("error-text");
searchField.addEventListener("error-changed", (event) => {
  if (event.detail.value) {
    errorText.innerHTML = "Value must be uppercase letters and has 2 - 5 characters.";
  }
  else {
    errorText.innerHTML = "";
  }
});
```

```typescript
import { ErrorChangedEvent } from '@refinitiv-ui/elements';

const searchField = document.querySelector("ef-search-field");
const errorText = document.getElementById("error-text");
searchField?.addEventListener("error-changed", (event) => {
  if (!errorText) {
    return;
  }
  if ((event as ErrorChangedEvent).detail.value) {
    errorText.innerHTML = "Value must be uppercase letters and has 2 - 5 characters.";
  }
  else {
    errorText.innerHTML = "";
  }
});
```

## Icon action

The search icon can become actionable by adding the `icon-has-action` attribute to the element, so that `ef-search-field` will fire an `icon-click` event when a user clicks on the icon. You can add an event listener to this event to execute your code.

::
```javascript
::search-field::
const searchField = document.querySelector("ef-search-field");
const text = document.getElementById("text");

searchField.addEventListener("icon-click", () => {
  text.innerHTML = "icon is clicked";
});
```
```css
p {
  margin: 8px 0;
}
ef-search-field {
  width: 200px;
}
```
```html
<ef-search-field placeholder="Try clicking at the icon..." icon-has-action></ef-search-field>
<p id="text"></p>
```
::

```html
<ef-search-field placeholder="Try clicking at the icon..." icon-has-action></ef-search-field>
<p id="text"></p>
```

```javascript
const searchField = document.querySelector("ef-search-field");
const text = document.getElementById("text");

searchField.addEventListener("icon-click", () => {
  text.innerHTML = "icon is clicked";
});
```

```typescript
const searchField = document.querySelector("ef-search-field");
const text = document.getElementById("text");

searchField?.addEventListener("icon-click", () => {
  if (text) {
    text.innerHTML = "icon is clicked";
  }
});
```

## Search on keypress

By listening to the `keyup` event, you can add a search action when the user presses a certain key.

```javascript
const searchField = document.querySelector("ef-search-field");
searchField.addEventListener("keyup", (event) => {
  if (event.key === 'Enter') {
    // action
  }
});
```

## Search on type

Search on type or search autocomplete can be implemented by adding a search action to the `value-changed` event. However, if the user types too quickly it can put a heavy load on the server and search results could prove to be irrelevant. It is a recommended practice to use either **debounce** or **throttle** to limit the times the application calls for expensive operations like API requests.

```javascript
const searchField = document.querySelector("ef-search-field");
searchField.addEventListener("value-changed", (event) => {
    debounce(search(event.detail.value), 1500) // debounce search() for 1.5 seconds
});
```

## Accessibility
::a11y-intro::

`ef-search-field` is assigned `role="textbox"`. States such as `disabled` or `readonly` are programmatically updated to match the element’s visual state. Dynamic updates such as a validation message are communicated to screen readers through a live region. 

`ef-search-field` has managed the role and states but you must ensure that the element has associated label by using `placeholder`, `aria-label`, `aria-labelledby` or `label[for="<element.id>"]`

```html
<ef-search-field placeholder="Search .."></ef-search-field>
```
```html
<ef-search-field 
  aria-label="Enter word to search"
  placeholder="Search ..">
</ef-search-field>
```
```html
<label id="keyword">Enter word to search</label>
<ef-search-field 
  aria-labelledby="keyword"
  placeholder="Search ..">
</ef-search-field>
```
```html
<label for="keyword">Enter word to search</label>
<ef-search-field
  id="keyword"
  placeholder="Search ..">
</ef-search-field>
```

::a11y-end::
