<!--
type: page
title: Text Field
location: ./elements/text-field
layout: default
-->

# Text Field

::
```javascript
::text-field::
```
```css
ef-panel {
  max-width: 450px;
}
ef-text-field{
  width: 250px;
}
p {
  margin-bottom: 4px;
}
```
```html
<ef-panel spacing>
  <p>First name</p>
  <ef-text-field placeholder="Must be letters and at least 5 characters"  pattern="[a-zA-Z]{5,}"></ef-text-field>
  <br/>
  <br/>
  <p>Last name</p>
  <ef-text-field placeholder="Must be letters and at least 5 characters" pattern="[a-zA-Z]{5,}"></ef-text-field>
</ef-panel>
```
::

`ef-text-field` is a form element for text.

### Usage

Text field is used to accept text input from users and has similar behaviors to the native text input.

```html
<ef-text-field placeholder="Type something..."></ef-text-field>
```

### Getting value

The field's value can be accessed using the `value` property.

```html
<ef-text-field id="text-input" value="Hello World"></ef-text-field>
```
```javascript
const textInput = document.getElementById("text-input");
console.log(textInput.value); // "Hello World"
```

You can also listen for the `value-changed` event, which triggers when user interactions change the value.

::
```javascript
::text-field::
const element = document.getElementById("input");
const valueChangedText = document.getElementById('value-text');

element.addEventListener("value-changed", (e) => {
  valueChangedText.innerHTML = e.detail.value;
});
```
```html
<ef-text-field id="input" placeholder="Type something here .."></ef-text-field>
<p>Value: <code id="value-text"></code></p>
```
::

```html
<ef-text-field id="input"></ef-text-field>
<p>Value: <code id="value-text"></code></p>
```

```javascript
const element = document.getElementById("input");

element.addEventListener("value-changed", (e) => {
  console.log(e.detail.value);
});
```

### Input validation

Validation occurs when constraints are provided and the value changes. If the error state changes, it will dispatch an `error-changed` event along with current error state.

Alternatively, you can check the `error` property to confirm if the input is valid or not.

### Input length

The `maxlength` attribute limits the number of characters that users can type into the input, and the `minlength` attribute sets the minimum number of characters required. `ef-text-field` will show error styles if a condition is not met.

::
```javascript
::text-field::
const element = document.getElementById("textInput");
const errorChangedText = document.getElementById("error-text");
element.addEventListener("error-changed", (e) => {
    if (e.detail.value) {
      errorChangedText.innerHTML = "Value length must be between 5 -8 characters";
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
ef-text-field {
  width: 200px;
}
```
```html
<ef-text-field id="textInput" minlength="5" maxlength="8" placeholder="Between 5 to 8 characters"></ef-text-field>
<p id="error-text"></p>
```
::

```html
<ef-text-field minlength="5" maxlength="8"></ef-text-field>
<p id="error-text"></p>
```

```javascript
const element = document.getElementById("textInput");
const errorChangedText = document.getElementById("error-text");
element.addEventListener("error-changed", (e) => {
  if (e.detail.value) {
    errorChangedText.innerHTML = "Value length must be between 5 -8 characters.";
  }
  else {
    errorChangedText.innerHTML = "";
  }
});
```

### Validate input using pattern

You can use a regular expression to validate the input value by setting it with the `pattern` attribute.

::
```javascript
::text-field::
const element = document.getElementById("nickname");
const errorChangedText = document.getElementById("error-text");
element.addEventListener("error-changed", (e) => {
  if (e.detail.value) {
    errorChangedText.innerHTML = "Nickname must be lowercase letters and 4-8 characters.";
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
ef-text-field {
  width: 275px;
}
```
```html
<div>Nickname</div>
<ef-text-field id="nickname" pattern="[a-z]{4,8}" placeholder="Must be lowercase letters and 4-8 characters"></ef-text-field>
<p id="error-text"></p>
```
::

```html
Nickname: <ef-text-field id="nickname" pattern="[a-z]{4,8}"></ef-text-field>
<p id="error-text"></p>
```

```javascript
const element = document.getElementById("nickname");
const errorChangedText = document.getElementById("error-text");
element.addEventListener("error-changed", (e) => {
  if (e.detail.value) {
    errorChangedText.innerHTML = "Nickname must be lowercase letters and 4-8 characters.";
  }
  else {
    errorChangedText.innerHTML = "";
  }
});
```

### Show icon

An inline icon can be set to display inside the input using the `icon` attribute.

::
```javascript
::text-field::
```
```css
ef-text-field {
  width: 200px;
}
```
```html
<ef-text-field icon="email" placeholder="We appreciate your feedback!"></ef-text-field>
```
::

```html
<ef-text-field icon="email"></ef-text-field>
```

The icon can become actionable by adding the `icon-has-action` attribute to the element, so that `ef-text-field` will fire the `icon-click` event when users click on the icon. You can add an event listener to this event to execute your code.

::
```javascript
::text-field::
const element = document.getElementById("feedback");
element.addEventListener("icon-click", (e) => {
  element.value = ""
  element.placeholder = "Feedback sent. Thanks!";
  element.icon = "tick";
});
```
```css
ef-text-field {
  width: 250px;
}
```
```html
<ef-text-field id="feedback" placeholder="Type your feedback and click the icon" icon="email" icon-has-action></ef-text-field>
```
::

```html
<ef-text-field
  id="feedback"
  placeholder="Type your feedback and click the icon"
  icon="email"
  icon-has-action>
</ef-text-field>
```

```javascript
const element = document.getElementById("feedback");
element.addEventListener("icon-click", (e) => {
    element.value = ""
    element.placeholder = "Feedback sent. Thanks!";
    element.icon = "tick";
});
```

## Accessibility
::a11y-intro::

The Text Field is assigned `role="textbox"`. States such as `disabled` or `read-only` are programmatically updated to match the element’s visual state. 

::a11y-end::
