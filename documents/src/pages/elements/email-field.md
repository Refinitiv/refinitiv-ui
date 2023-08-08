<!--
type: page
title: Email Field
location: ./elements/email-field
layout: default
language_tabs: [javascript, typescript]
-->

# Email Field
::
```javascript
::email-field::
```
```css
ef-panel {
  max-width: 450px;
}
ef-email-field{
  width: 250px;
}
p {
  margin-bottom: 4px;
}
```
```html
<ef-panel spacing>
  <p>Email</p>
  <ef-email-field placeholder="Business email address" icon="email"></ef-email-field>
</ef-panel>
```
::

`ef-email-field` is a form control to confidently obtain an email input from users.

## Usage
`ef-email-field` has similar behaviors to the native email input type.

```html
<ef-email-field placeholder="Business email address"></ef-email-field>
```

## Getting value

The field's value can be accessed directly using the `value` property.

```html
<ef-email-field
  value="awesome@tmail.com"
  placeholder="Business email address">
</ef-email-field>
```

```javascript
const emailField = document.querySelector("ef-email-field");
console.log(emailField.value); // "awesome@tmail.com"
```

You can also listen for the `value-changed` event that triggers when the value changes due to user interactions.

::
```javascript
::email-field::
const emailField = document.querySelector("ef-email-field");
const valueChangedText = document.getElementById('value-text');

emailField.addEventListener("value-changed", (e) => valueChangedText.innerHTML = e.detail.value);
```
```html
<ef-email-field placeholder="Type an email ..."></ef-email-field>
<p>Value: <code id="value-text"></code></p>
```
::

```javascript
const emailField = document.querySelector("ef-email-field");

emailField.addEventListener("value-changed", (event) => {
  console.log(event.detail.value);
});
```

```typescript
import { ValueChangedEvent } from '@refinitiv-ui/elements';

const emailField = document.querySelector("ef-email-field");

emailField?.addEventListener("value-changed", (event) => {
  console.log((event as ValueChangedEvent).detail.value);
});
```

## Input validation
Validation occurs when the constraints are provided and the value changes. If the error state changes, it will dispatch the `error-changed` event along with the current error state.

Alternatively, you can check the `error` property to confirm if the input is valid.

## Input length
The `maxlength` attribute limits the number of characters that users can type into the input and the `minlength` attribute is used to set the minimum of characters required. `ef-email-field` will show error styles if the condition is not met.

::
```javascript
::email-field::
const emailField = document.querySelector("ef-email-field");
const errorChangedText = document.getElementById('error-text');
emailField.addEventListener("error-changed", (event) => {
    if (event.detail.value) {
      errorChangedText.innerHTML = "Must be in standard email format with between 8-14 characters.";
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
ef-email-field {
  width: 275px;
}
```
```html
<ef-email-field minlength="8" maxlength="14" placeholder="Length between 8 to 14 characters"></ef-email-field>
<p id="error-text"></p>
```
::

```html
<ef-email-field
  minlength="8"
  maxlength="14"
  placeholder="Length between 8 to 14 characters">
</ef-email-field>
<p id="error-text"></p>
```

```javascript
const emailField = document.querySelector("ef-email-field");
const errorChangedText = document.getElementById("error-text");
emailField.addEventListener("error-changed", (event) => {
  if (event.detail.value) {
    errorChangedText.innerHTML = "Must be in standard email format with between 8-14 characters.";
  }
  else {
    errorChangedText.innerHTML = "";
  }
});
```

```typescript
import { ErrorChangedEvent } from '@refinitiv-ui/elements';
import { EmailField } from '@refinitiv-ui/elements/email-field';

const emailField = document.querySelector("ef-email-field");
const errorChangedText = document.getElementById("error-text");
emailField?.addEventListener("error-changed", (event) => {
  if ((event as ErrorChangedEvent).detail.value) {
    errorChangedText.innerHTML = "Must be in standard email format with between 8-14 characters.";
  }
  else {
    errorChangedText.innerHTML = "";
  }
});
```

## Validate input using pattern
You can use a regular expression to validate the input value by adding the `pattern` attribute.

::
```javascript
::email-field::
const emailField = document.querySelector("ef-email-field");
const errorChangedText = document.getElementById("error-text");
emailField.addEventListener("error-changed", (e) => {
  if (e.detail.value) {
    errorChangedText.innerHTML = "Email must end with '@mail.com'.";
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
ef-email-field {
  width: 275px;
}
```
```html
<ef-email-field
  pattern=".+@mail.com"
  placeholder="Type email ending with '@mail.com'">
</ef-email-field>
<p id="error-text"></p>
```
::

```html
<ef-email-field
  pattern=".+@mail.com"
  placeholder="Type email ending with '@mail.com'">
</ef-email-field>
<p id="error-text"></p>
```

```javascript
const emailField = document.querySelector("ef-email-field");
const errorChangedText = document.getElementById("error-text");
emailField.addEventListener("error-changed", (event) => {
  if (event.detail.value) {
    errorChangedText.innerHTML = "Email must end with '@mail.com'.";
  }
  else {
    errorChangedText.innerHTML = "";
  }
});
```

```typescript
import { ErrorChangedEvent } from '@refinitiv-ui/elements';

const emailField = document.querySelector('ef-email-field');
const errorChangedText = document.getElementById('error-text');
emailField?.addEventListener('error-changed', (event) => {
  if (!errorChangedText) {
    return;
  }
  
  if ((event as ErrorChangedEvent).detail.value) {
    errorChangedText.innerHTML = "Email must end with '@mail.com'.";
  } else {
    errorChangedText.innerHTML = '';
  }
});
```

## Show icon

An inline icon can be displayed inside the input using `icon`.

```html
<ef-email-field icon="individual" placeholder="Enter email"></ef-email-field>
```

An icon can become actionable by adding the `icon-has-action` attribute to the element, and `ef-email-field` will fire the `icon-click` event when a user clicks on the icon. You can add an event listener to this event to execute your code.

::
```javascript
::email-field::
const emailField = document.querySelector('ef-email-field');
const emailList = document.getElementById('email-added');
const errorChangedText = document.getElementById("error-text");

emailField.addEventListener('icon-click', (e) => {
  if (!emailField.error && emailField.value.length > 0) {
    emailList.innerHTML = emailField.value + " is added.";
  }
});
emailField.addEventListener("error-changed", (e) => {
  if (e.detail.value) {
    errorChangedText.innerHTML = "Invalid email format.";
    emailList.innerHTML = "";
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
ef-email-field {
  width: 275px;
}
```
```html
<ef-email-field placeholder="Type email and then click the icon ..." icon="msgr-adduser" icon-has-action pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"></ef-email-field>
<p id="error-text"></p>
<p id="email-added"></p>
```
::

```html
<ef-email-field
  icon="msgr-adduser"
  pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
  icon-has-action
  placeholder="Type email and then click the icon ..."
></ef-email-field>
<p id="email-added"></p>
```

```javascript
const emailField = document.querySelector('ef-email-field');
const emailList = document.getElementById("email-added");

emailField.addEventListener("icon-click", () => {
  if (!emailField.error && emailField.value.length > 0) {
    emailList.innerHTML = emailField.value + " is added.";
  }
});
```

```typescript
const emailField = document.querySelector('ef-email-field');
const emailList = document.getElementById("email-added");

emailField?.addEventListener("icon-click", () => {
  if (emailList && !emailField.error && emailField.value.length > 0) {
    emailList.innerHTML = emailField.value + " is added.";
  }
});
```

## Accessibility
::a11y-intro::

`ef-email-field` is assigned `role="textbox"`. States such as `disabled` or `readonly` are programmatically updated to match the element’s visual state.

`ef-email-field` has already managed the role and states but you must ensure that the element has associated label by using `placeholder`, `aria-label`, `aria-labelledby` or `label[for="<element.id>"]`

```html
<ef-email-field placeholder="Enter your email"></ef-email-field>
```
```html
<ef-email-field 
  aria-label="Enter your email"
  placeholder="Enter your email">
</ef-email-field>
```
```html
<label id="email">Enter your email</label>
<ef-email-field 
  aria-labelledby="email"
  placeholder="Enter your email">
</ef-email-field>
```
```html
<label for="email">Enter your email</label>
<ef-email-field
  id="email"
  placeholder="Enter your email">
</ef-email-field>
```

::a11y-end::
