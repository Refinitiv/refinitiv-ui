<!--
type: page
title: Search Field
location: ./elements/search-field
layout: default
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

### Usage
`ef-search-field` has identical behavior to native text input and `ef-text-field`, except that the icon isn't customizable.

```html
<ef-search-field placeholder="Type a keyword to search ..."></ef-search-field>
```

### Getting value
The value can be accessed using the `value` property.

```html
<ef-search-field id="search-input" value="keywords"></ef-search-field>
```

```javascript
const searchInput = document.getElementById("search-input");
console.log(searchInput.value); // "keywords"
```

You can also listen to the `value-changed` event, which triggers whenever user interactions change the value.

::
```javascript
::search-field::
const element = document.getElementById("input");
const valueChangedText = document.getElementById("value-text");

element.addEventListener("value-changed", (e) => {
  valueChangedText.innerHTML = e.detail.value;
});
```
```html
<ef-search-field id="input" placeholder="Type something here .."></ef-search-field>
<p>Value: <code id="value-text"></code></p>
```
::

```html
<ef-search-field id="input"></ef-search-field>
<p>Value: <code id="value-text"></code></p>
```

```javascript
const element = document.getElementById("input");
const valueChangedText = document.getElementById("value-text");

element.addEventListener("value-changed", (e) => {
  valueChangedText.innerHTML = e.detail.value;
});
```

### Input validation
Validation occurs when constraints are provided and the value changes. If the error state changes, it will dispatch the `error-changed` event along with the current error state.

Alternatively, the `error` property can be checked to confirm if the input is valid or not.

### Input length
The `maxlength` attribute limits the number of characters that users can enter and the `minlength` attribute sets the minimum number of characters required. `ef-search-field` will show error styles if a condition is not met.

::
```javascript
::search-field::
const element = document.getElementById("search-input");
const errorChangedText = document.getElementById("error-text");
element.addEventListener("error-changed", (e) => {
  if (e.detail.value) {
    errorChangedText.innerHTML = "Value length must be between 2 - 4 characters";
  }
  else {
    errorChangedText.innerHTML = "";
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
<ef-search-field id="search-input" minlength="2" maxlength="4" placeholder="Between 2 to 4 characters"></ef-search-field>
<p id="error-text"></p>
```
::

```html
<ef-search-field id="search-input" minlength="2" maxlength="4"></ef-search-field>
<p id="error-text"></p>
```

```javascript
const element = document.getElementById("search-input");
const errorChangedText = document.getElementById("error-text");

element.addEventListener("error-changed", (e) => {
  if (e.detail.value) {
    errorChangedText.innerHTML = "Value length must be between 2 - 4 characters.";
  }
  else {
    errorChangedText.innerHTML = "";
  }
});
```

### Validate value using pattern
You can use a regular expression to validate the input value by setting it to the `pattern` attribute.

::
```javascript
::search-field::
const element = document.getElementById("search-pattern");
const errorChangedText = document.getElementById("error-text");
element.addEventListener("error-changed", (e) => {
  if (e.detail.value) {
    errorChangedText.innerHTML = "Value must be uppercase letters and has 2 - 5 characters.";
  }
  else {
    errorChangedText.innerHTML = "";
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
<ef-search-field id="search-pattern" pattern="[A-Z]{2,5}" placeholder="TRI"></ef-search-field>
<p id="error-text"></p>
```
::

```html
<ef-search-field id="search-pattern" pattern="[A-Z]{2,5}"></ef-search-field>
<p id="error-text"></p>
```

```javascript
const element = document.getElementById("search-pattern");
const errorChangedText = document.getElementById("error-text");
element.addEventListener("error-changed", (e) => {
  if (e.detail.value) {
    errorChangedText.innerHTML = "Value must be uppercase letters and has 2 - 5 characters.";
  }
  else {
    errorChangedText.innerHTML = "";
  }
});
```

### Icon action

The search icon can become actionable by adding the `icon-has-action` attribute to the element, so that `ef-search-field` will fire an `icon-click` event when a user clicks on the icon. You can add an event listener to this event to execute your code.

::
```javascript
::search-field::
const element = document.getElementById("icon-action");
const result = document.getElementById("result");

element.addEventListener("icon-click", (e) => {
  result.innerHTML = "icon is clicked";
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
<ef-search-field id="icon-action" placeholder="Try clicking at the icon..." icon-has-action></ef-search-field>
<p id="result"></p>
```
::

```html
<ef-search-field id="icon-action" placeholder="Try clicking at the icon..." icon-has-action></ef-search-field>
<p id="result"></p>
```

```javascript
const element = document.getElementById("icon-action");
const result = document.getElementById("result");

element.addEventListener("icon-click", (e) => {
  result.innerHTML = "icon is clicked";
});
```

### Search on keypress

By listening to the `keyup` event, you can add a search action when the user presses a certain key.

```javascript
const searchInput = document.querySelector("ef-search-field");
searchInput.addEventListener("keyup", (e) => {
  // keyCode 13 is the "Enter" key
  if (e.keyCode === 13) {
    // Calls search API
  }
});
```

### Search on type

Search on type or search autocomplete can be implemented by adding a search action to the `value-changed` event. However, if the user types too quickly it can put a heavy load on the server and search results could prove to be irrelevant. It is a recommended practice to use either **debounce** or **throttle** to limit the times the application calls for expensive operations like API requests.

```javascript
const searchInput = document.querySelector("ef-search-field");
searchInput.addEventListener("value-changed", (e) => {
    debounce(search(e.detail.value), 1500) // debounce search() for 1.5 seconds
});
```

## Accessibility
::a11y-intro::

The Search Field is assigned `role="textbox"`. States such as `disabled` or `read-only` are programmatically updated to match the element’s visual state. Dynamic updates such as a validation message are communicated to screen readers through a live region. 

::a11y-end::
