<!--
type: page
title: Password Field
location: ./elements/password-field
layout: default
-->

# Password Field
::
```javascript
::password-field::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/panel?min';
halo('panel');
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
<ef-password-field placeholder="Password ..."></ef-password-field>
```

## Getting value
The value can be accessed through the `value` property.

```html
<ef-password-field id="password-input" placeholder="Password ..."></ef-password-field>
```

```javascript
const passwordInput = document.getElementById("password-input");
console.log(passwordInput.value); // User's input password
```

You can also listen for the `value-changed` event, which triggers whenever the value changes due to user interactions.

::
```javascript
::password-field::
const element = document.getElementById("password-input");
const valueChangedText = document.getElementById('value-text');

element.addEventListener("value-changed", (e) => {
  valueChangedText.innerHTML = e.detail.value;
});
```
```css
ef-password-filed {
  width: 172px;
}
```
```html
<ef-password-field id="password-input" placeholder="Password ..."></ef-password-field>
<p>Value: <code id="value-text"></code></p>
```
::

```html
<ef-password-field id="password-input" placeholder="Password ..."></ef-password-field>
<p>Value: <code id="value-text"></code></p>
```

```javascript
const element = document.getElementById("password-input");
const valueChangedText = document.getElementById("value-text");

element.addEventListener("value-changed", (e) => {
  valueChangedText.innerHTML = e.detail.value;
});
```

## Input validation
Validation occurs when the constraints are provided and the value changes. If the error state changes, it will dispatch an `error-changed` event along with the current error state.

Alternatively, you can access the `error` property to check if the input is valid or not.

## Input length
The `maxlength` attribute limits the number of characters that can be typed into the input, and the `minlength` attribute sets the minimum of characters. `ef-password-field` will show error styles if a condition is not met.

::
```javascript
::password-field::
const element = document.getElementById("passwordInput");
const errorChangedText = document.getElementById('error-text');
element.addEventListener("error-changed", (e) => {
  if (e.detail.value) {
    errorChangedText.innerHTML = "Password length must be between 8 - 16 characters";
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
ef-password-field {
  width: 200px;
}
```
```html
<ef-password-field id="passwordInput" minlength="8" maxlength="16" placeholder="Between 8 to 16 characters"></ef-password-field>
<p id="error-text"></p>
```
::

```html
<ef-password-field 
  id="passwordInput"
  minlength="8"
  maxlength="16"
  placeholder="Between 8 to 16 characters">
</ef-password-field>
<p id="error-text"></p>
```

```javascript
const element = document.getElementById("passwordInput");
const errorChangedText = document.getElementById("error-text");

element.addEventListener("error-changed", (e) => {
  if (e.detail.value) {
    errorChangedText.innerHTML = "Password length must be between 8 - 16 characters.";
  }
  else {
    errorChangedText.innerHTML = "";
  }
});
```

## Validate input using pattern
You can use a regular expression to validate the input value by setting it to the `pattern` attribute.

::
```javascript
::password-field::
const element = document.getElementById("password");
const errorChangedText = document.getElementById("error-text");
element.addEventListener("error-changed", (e) => {
  if (e.detail.value) {
    errorChangedText.innerHTML = "Password is too weak.";
  } else {
    errorChangedText.innerHTML = "";
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
<ef-password-field id="password" pattern="^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$" placeholder="Password .."></ef-password-field>
<p id="error-text"></p>
```
::

```html
<ef-password-field
  id="password"
  pattern="^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$"
  placeholder="Password ..">
</ef-password-field>
<p id="error-text"></p>
```

```javascript
const element = document.getElementById("password");
const errorChangedText = document.getElementById("error-text");
element.addEventListener("error-changed", (e) => {
  if (e.detail.value) {
    errorChangedText.innerHTML = "Password is too weak.";
  }
  else {
    errorChangedText.innerHTML = "";
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
