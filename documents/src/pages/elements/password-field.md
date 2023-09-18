<!--
type: page
title: Password Field
location: ./elements/password-field
layout: default
language_tabs: [javascript, typescript]
-->

# Password Field
::
```javascript
::password-field::
const pw = document.getElementById('pw');
const confirmedPw = document.getElementById('confirmedPw');
const passwordMatchError = document.getElementById('password-error');
const patternError = document.getElementById('pattern-error');

passwordMatchError.style.display = 'none';
patternError.style.display = 'none';


confirmedPw.addEventListener('value-changed', (e) => {
  if (e.detail.value !== pw.value) {
    passwordMatchError.style.display = 'list-item';
  }
  else {
    passwordMatchError.style.display = 'none';
  }
});

confirmedPw.addEventListener('error-changed', (e) => {
  if (e.detail.value) {
    patternError.style.display = 'list-item';
  }
  else {
    patternError.style.display = 'none';
  }
});
```
```css
ef-panel {
  max-width: 450px;
}
ef-password-field{
  width: 250px;
}
label {
  display: block;
  margin: 4px 0;
}
ul {
  padding-inline-start: 24px;
}
#password-error, #pattern-error {
  color: #d94255;
}
```
```html
<ef-panel>
  <ef-header level="3">Password Recommendation</ef-header>
  <ul>
    <li>At least 8 characters—the more characters, the better.</li>
    <li>At least one uppercase and lowercase letters.</li>
    <li>At least one number.</li>
    <li>At least one special character.</li>
  </ul>
</ef-panel>

<label for="pw">Password</label>
<ef-password-field id="pw" pattern="^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$"></ef-password-field>
<br/>
<label for="confirmedPw">Confirm password</label>
<ef-password-field id="confirmedPw" pattern="^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$"></ef-password-field>

<ul id="error-list">
  <li id="password-error">Password does not match</li>
  <li id="pattern-error">Password does not meet criteria</li>
</ul>
```
::

`ef-password-field` is a form control for passwords with a built-in show/hide toggle functionality.

## Usage

`ef-password-field` behaves similarly to the native password input. It has password masking that allows users to securely type their passwords into the input.

```html
<ef-password-field></ef-password-field>
```

## Getting value

The value can be accessed through the `value` property.

```html
<ef-password-field></ef-password-field>
```

```javascript
const passwordField = document.querySelector("ef-password-field");
console.log(passwordField.value); // User's input password
```

You can also listen for the `value-changed` event, which triggers whenever the value changes due to user interactions.

::
```javascript
::password-field::
const passwordField = document.querySelector("ef-password-field");
const valueText = document.getElementById('value-text');

passwordField.addEventListener("value-changed", (event) => {
  valueText.innerHTML = event.detail.value;
});
```
```css
ef-password-filed {
  width: 172px;
}
```
```html
<ef-password-field></ef-password-field>
<p>Value: <code id="value-text"></code></p>
```
::

```html
<ef-password-field></ef-password-field>
<p>Value: <code id="value-text"></code></p>
```

```javascript
const passwordField = document.querySelector("ef-password-field");
const valueText = document.getElementById("value-text");

passwordField.addEventListener("value-changed", (event) => {
  valueText.innerHTML = event.detail.value;
});
```
```typescript
import { ValueChangedEvent } from '@refinitiv-ui/elements';

const passwordField = document.querySelector("ef-password-field");
const valueText = document.getElementById("value-text");

passwordField?.addEventListener("value-changed", (event) => {
  if (valueText) {
    valueText.innerHTML = (event as ValueChangedEvent).detail.value;
  }
});
```

## Input validation

`ef-password-field` has validation logic similar to a native input. When a user types the invalid value into the control, error style will be shown to notify the user. However, if the control is being initialised with an invalid value, `reportValidity()` must be called to ensure the error style is applied.

Whenever input is invalid, the error attribute will be added to the element. You can use the `error` property to check if input is currently in the error state.

You can add the event listener `error-changed` to the element and it will dispatch whenever the error state changes.

See the [Input Length](/elements/password-field#input-length) example below for more detail.

## Input length

The `maxlength` attribute limits the number of characters that can be typed into the input, and the `minlength` attribute sets the minimum of characters. `ef-password-field` will show error styles if a condition is not met.

::
```javascript
::password-field::
const passwordField = document.querySelector("ef-password-field");
const errorText = document.getElementById('error-text');
passwordField.addEventListener("error-changed", (event) => {
  if (event.detail.value) {
    errorText.innerHTML = "Password length must be between 8 - 16 characters";
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
ef-password-field {
  width: 200px;
}
```
```html
<ef-password-field minlength="8" maxlength="16" placeholder="Between 8 to 16 characters"></ef-password-field>
<p id="error-text"></p>
```
::

```html
<ef-password-field minlength="8" maxlength="16" placeholder="Between 8 to 16 characters"></ef-password-field>
<p id="error-text"></p>
```

```javascript
const passwordField = document.querySelector("ef-password-field");
const errorText = document.getElementById("error-text");

passwordField.addEventListener("error-changed", (event) => {
  if (event.detail.value) {
    errorText.innerHTML = "Password length must be between 8 - 16 characters.";
  }
  else {
    errorText.innerHTML = "";
  }
});
```

```typescript
import { ErrorChangedEvent } from '@refinitiv-ui/elements';

const passwordField = document.querySelector("ef-password-field");
const errorText = document.getElementById("error-text");

passwordField?.addEventListener("error-changed", (event) => {
  if (!errorText) {
    return;
  }
  if ((event as ErrorChangedEvent).detail.value) {
    errorText.innerHTML = "Password length must be between 8 - 16 characters.";
  }
  else {
    errorText.innerHTML = "";
  }
});
```

## Validate input using pattern

You can use a regular expression to validate the input value by setting it to the `pattern` attribute.

::
```javascript
::password-field::
const passwordField = document.querySelector("ef-password-field");
const errorText = document.getElementById("error-text");
passwordField.addEventListener("error-changed", (event) => {
  if (event.detail.value) {
    errorText.innerHTML = "Password is too weak.";
  } else {
    errorText.innerHTML = "";
  }
});
```
```css
#error-text {
  color:#d94255;
}
ef-password-field {
  width: 275px;
}
```
```html
<ul>
  <li>At least 8 characters—the more characters, the better.</li>
  <li>At least one uppercase and lowercase letters.</li>
  <li>At least one number.</li>
  <li>At least one special character.</li>
</ul>
<ef-password-field pattern="^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$" placeholder="Password .."></ef-password-field>
<p id="error-text"></p>
```
::

```html
<ef-password-field pattern="^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$">
</ef-password-field>
<p id="error-text"></p>
```

```javascript
const passwordField = document.querySelector("ef-password-field");
const errorText = document.getElementById("error-text");
passwordField.addEventListener("error-changed", (event) => {
  if (event.detail.value) {
    errorText.innerHTML = "Password is too weak.";
  }
  else {
    errorText.innerHTML = "";
  }
});
```

```typescript
import { ErrorChangedEvent } from '@refinitiv-ui/elements';

const passwordField = document.querySelector("ef-password-field");
const errorText = document.getElementById("error-text");
passwordField?.addEventListener("error-changed", (event) => {
  if (!errorText) {
    return;
  }
  if ((event as ErrorChangedEvent).detail.value) {
    errorText.innerHTML = "Password is too weak.";
  }
  else {
    errorText.innerHTML = "";
  }
});
```

## Accessibility
::a11y-intro::

`ef-password-field` is assigned  `role="textbox"`. States such as `disabled` and `pressed` are updated to match the visual state of the Password Field element and its “Show password” button. The password recommendation can be communicated to screen readers through a live region whenever the context changes.

`ef-password-field` has already managed the role and states but you must ensure that the element has associated label by using `placeholder`, `aria-label`, `aria-labelledby` or `label[for="<element.id>"]`

```html
<ef-password-field placeholder="Enter your password"></ef-password-field>
```
```html
<ef-password-field 
  aria-label="Enter your password"
  placeholder="Enter your password">
</ef-password-field>
```
```html
<label id="password">Enter your password</label>
<ef-password-field 
  aria-labelledby="password"
  placeholder="Enter your password">
</ef-password-field>
```
```html
<label for="password">Enter your password</label>
<ef-password-field
  id="password"
  placeholder="Enter your password">
</ef-password-field>
```

::a11y-end::
