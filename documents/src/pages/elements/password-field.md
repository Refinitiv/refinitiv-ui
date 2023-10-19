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
const pw = document.getElementById("pw");
const confirmedPw = document.getElementById("confirmedPw");
const passwordMatchError = document.getElementById("password-error");
const patternError = document.getElementById("pattern-error");

passwordMatchError.style.display = "none";
patternError.style.display = "none";


confirmedPw.addEventListener("value-changed", (e) => {
  if (e.detail.value !== pw.value) {
    passwordMatchError.style.display = "list-item";
  }
  else {
    passwordMatchError.style.display = "none";
  }
});

confirmedPw.addEventListener("error-changed", (e) => {
  if (e.detail.value) {
    patternError.style.display = "list-item";
  }
  else {
    patternError.style.display = "none";
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
<ef-password-field
  id="pw"
  pattern="^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$"
></ef-password-field>
<br/>
<label for="confirmedPw">Confirm password</label>
<ef-password-field 
  id="confirmedPw"
  pattern="^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$"
></ef-password-field>

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
<label for="password">Password</label>
<ef-password-field id="password"></ef-password-field>
```

## Getting value
The value can be accessed through the `value` property.

```html
<label for="password">Password</label>
<ef-password-field id="password"></ef-password-field>
```

```javascript
const passwordField = document.getElementById("password");
console.log(passwordField.value); // User's input password
```

You can also listen for the `value-changed` event, which triggers whenever the value changes due to user interactions.

::
```javascript
::password-field::
const passwordField = document.getElementById("password");
const valueText = document.getElementById("value-text");

passwordField.addEventListener("value-changed", (event) => {
  valueText.textContent = event.detail.value;
});
```
```css
ef-password-filed {
  width: 172px;
}
```
```html
<label for="password">Password</label>
<ef-password-field id="password"></ef-password-field>
<p>Value: <code id="value-text"></code></p>
```
::

```html
<label for="password">Password</label>
<ef-password-field id="password"></ef-password-field>
<p>Value: <code id="value-text"></code></p>
```

```javascript
const passwordField = document.getElementById("password");
const valueText = document.getElementById("value-text");

passwordField.addEventListener("value-changed", (event) => {
  valueText.textContent = event.detail.value;
});
```
```typescript
import { ValueChangedEvent } from "@refinitiv-ui/elements";

const passwordField = document.getElementById("password");
const valueText = document.getElementById("value-text");

passwordField?.addEventListener("value-changed", (event) => {
  if (valueText) {
    valueText.textContent = (event as ValueChangedEvent).detail.value;
  }
});
```

## Input validation
`ef-password-field` has validation logic similar to a [native input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/password). When a user types an invalid value into the control, error style will be shown to notify the user.

You can call `reportValidity()` to trigger the validation anytime and it will set error style if input is invalid. In case that the input is initialised with an invalid value and you need to show the error style, you must call `reportValidity()` once the input is defined on the page.

Whenever input is invalid, the `error` attribute will be added to the element. You can use the `error` property to check whether input is currently in the error state or not.

### Input length
The `maxlength` attribute limits the number of characters that can be typed into the input, and the `minlength` attribute sets the minimum of characters. `ef-password-field` will show error styles if a condition is not met.

@> `maxlength` and `minlength` constraint validations are only applied when the value is changed by the user. [See input password](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/password#maxlength).

::
```javascript
::password-field::
const passwordField = document.getElementById("password");
const errorText = document.getElementById("error-text");

passwordField.addEventListener("blur", () => {
  errorText.textContent = passwordField.error ? "Password length must be between 8 - 16 characters." : "";
});

passwordField.addEventListener("input", () => {
  if (!passwordField.error) {
    errorText.textContent = "";
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
<label for="password">Password</label>
<ef-password-field
  id="password"
  minlength="8"
  maxlength="16"
  placeholder="Between 8 to 16 characters">
</ef-password-field>
<p id="error-text"></p>
```
::

```html
<label for="password">Password</label>
<ef-password-field
  id="password"
  minlength="8"
  maxlength="16"
  placeholder="Between 8 to 16 characters">
</ef-password-field>
<p id="error-text"></p>
```

```javascript
const passwordField = document.getElementById("password");
const errorText = document.getElementById("error-text");

passwordField.addEventListener("blur", () => {
  errorText.textContent = passwordField.error ? "Password length must be between 8 - 16 characters." : "";
});

passwordField.addEventListener("input", () => {
  if (!passwordField.error) {
    errorText.textContent = "";
  }
});
```

```typescript
import { PasswordField } from "@refinitiv-ui/elements/password-field";

const passwordField = document.getElementById("password") as PasswordField;
const errorText = document.getElementById("error-text");

passwordField?.addEventListener("blur", () => {
  if (!errorText) {
    return;
  }
  errorText.textContent = passwordField.error ? "Password length must be between 8 - 16 characters." : "";
});

passwordField?.addEventListener("input", () => {
  if (!errorText) {
    return;
  }
  if (!passwordField?.error) {
    errorText.textContent = "";
  }
});
```

### Use pattern
You can use a regular expression to validate the input value by setting it to the `pattern` attribute.

::
```javascript
::password-field::
const passwordField = document.getElementById("password");
const errorText = document.getElementById("error-text");

passwordField.addEventListener("blur", (event) => {
  errorText.textContent = passwordField.error ? "Password is too weak." : "";
});

passwordField.addEventListener("input", (event) => {
  if (!passwordField.error) {
    errorText.textContent = "";
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
<label for="password">Password</label>
<ef-password-field
  id="password"
  pattern="^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$"
  placeholder="Password ..">
</ef-password-field>
<p id="error-text"></p>
```
::

```html
<ef-password-field
  id="password"
  pattern="^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$">
</ef-password-field>
<p id="error-text"></p>
```

```javascript
const passwordField = document.getElementById("password");
const errorText = document.getElementById("error-text");

passwordField.addEventListener("blur", () => {
  errorText.textContent = passwordField.error ? "Password is too weak." : "";
});

passwordField.addEventListener("input", () => {
  if (!passwordField.error) {
    errorText.textContent = "";
  }
});
```

```typescript
import { PasswordField } from "@refinitiv-ui/elements/password-field";

const passwordField = document.getElementById("password") as PasswordField;
const errorText = document.getElementById("error-text");

passwordField?.addEventListener("blur", () => {
  if (!errorText) {
    return;
  }
  errorText.textContent = passwordField?.error ? "Password is too weak." : "";
});

passwordField?.addEventListener("input", () => {
  if (!errorText) {
    return;
  }
  if (!passwordField?.error) {
    errorText.textContent = "";
  }
});
```

### Custom Validation

For advance use cases, apps can control validation and error state of the field manually. Do not set `maxLength`, `minLength` & `pattern` validation constraint, then validate the field and update `error` property as needed.

::

```javascript
::text-field::
const passwordField = document.getElementById("password");
const confirmPasswordField = document.getElementById("confirm-password");
const responseText = document.getElementById("response-text");
const save = document.getElementById("save");

save.addEventListener("tap", () => {
  passwordField.error = !Boolean(passwordField.value);
  confirmPasswordField.error = !Boolean(confirmPasswordField.value);
  if (passwordField.error || confirmPasswordField.error) {
    responseText.classList.add('error');
    responseText.innerHTML = "Please input matching password into both fields";
  } else if (passwordField.value !== confirmPasswordField.value) {
    passwordField.error = true;
    confirmPasswordField.error = true;
    responseText.classList.add('error');
    responseText.innerHTML = "Password doesn't match";
  } else {
    responseText.innerHTML = "Password updated";
  }
});

const inputHandler = () => {
  responseText.classList.remove('error');
  passwordField.error = false;
  confirmPasswordField.error = false;
  responseText.innerHTML = "<br>";
};

passwordField.addEventListener("input", inputHandler);
confirmPasswordField.addEventListener("input", inputHandler);
```

```css
.error {
  color: #d94255;
}
ef-password-field {
  width: 250px;
}
label {
  display: block;
}
```

```html
<p>Set your new password</p>
<label for="password">Password</label>
<ef-password-field
  id="password"
  aria-describedby="response-text"
  placeholder="pick a unique secret">
</ef-password-field>
<label for="confirm-password">Confirm password</label>
<ef-password-field
  id="confirm-password"
  aria-describedby="response-text"
  placeholder="pick a unique secret">
</ef-password-field>
<p id="response-text"><br></p>
<ef-button id="save">Save</ef-button>
```

::

```html
<p>Set your new password</p>
<label for="password">Password</label>
<ef-password-field
  id="password"
  aria-describedby="response-text"
  placeholder="pick a unique secret">
</ef-password-field>
<label for="confirm-password">Confirm password</label>
<ef-password-field
  id="confirm-password"
  aria-describedby="response-text"
  placeholder="pick a unique secret">
</ef-password-field>
<p id="response-text"><br></p>
<ef-button id="save">Save</ef-button>
```

```javascript
const passwordField = document.getElementById("password");
const confirmPasswordField = document.getElementById("confirm-password");
const responseText = document.getElementById("response-text");
const save = document.getElementById("save");

save.addEventListener("tap", () => {
  passwordField.error = !Boolean(passwordField.value);
  confirmPasswordField.error = !Boolean(confirmPasswordField.value);
  if (passwordField.error || confirmPasswordField.error) {
    responseText.classList.add('error');
    responseText.innerHTML = "Please input matching password into both fields";
  } else if (passwordField.value !== confirmPasswordField.value) {
    passwordField.error = true;
    confirmPasswordField.error = true;
    responseText.classList.add('error');
    responseText.innerHTML = "Password doesn't match";
  } else {
    responseText.innerHTML = "Password updated";
  }
});

const inputHandler = () => {
  responseText.classList.remove('error');
  passwordField.error = false;
  confirmPasswordField.error = false;
  responseText.innerHTML = "<br>";
};

passwordField.addEventListener("input", inputHandler);
confirmPasswordField.addEventListener("input", inputHandler);
```

```typescript
import type { PasswordField } from "@refinitiv-ui/elements/password-field";
import type { Button } from "@refinitiv-ui/elements/button";

const passwordField = document.getElementById("password") as PasswordField;
const confirmPasswordField = document.getElementById("confirm-password") as PasswordField;
const responseText = document.getElementById("response-text") as HTMLElement;
const save = document.getElementById("save") as Button;

save.addEventListener("tap", () => {
  passwordField.error = !Boolean(passwordField.value);
  confirmPasswordField.error = !Boolean(confirmPasswordField.value);
  if (passwordField.error || confirmPasswordField.error) {
    responseText.classList.add('error');
    responseText.innerHTML = "Please input matching password into both fields";
  } else if (passwordField.value !== confirmPasswordField.value) {
    passwordField.error = true;
    confirmPasswordField.error = true;
    responseText.classList.add('error');
    responseText.innerHTML = "Password doesn't match";
  } else {
    responseText.innerHTML = "Password updated";
  }
});

const inputHandler = () => {
  responseText.classList.remove('error');
  passwordField.error = false;
  confirmPasswordField.error = false;
  responseText.innerHTML = "<br>";
};

passwordField.addEventListener("input", inputHandler);
confirmPasswordField.addEventListener("input", inputHandler);
```

## Accessibility
::a11y-intro::

`ef-password-field` is assigned  `role="textbox"`. States such as `disabled` and `pressed` are updated to match the visual state of the Password Field element and its “Show password” button. The password recommendation can be communicated to screen readers through a live region whenever the context changes.

`ef-password-field` has already managed the role and states but you must ensure that the element has associated label by using `placeholder`, `aria-label`, `aria-labelledby` or `label[for="<element.id>"]`

```html
<ef-password-field 
  aria-label="Password"
  placeholder="Enter your password">
</ef-password-field>
```
```html
<label id="password">Password</label>
<ef-password-field 
  aria-labelledby="password"
  placeholder="Enter your password">
</ef-password-field>
```
```html
<label for="password">Password</label>
<ef-password-field
  id="password"
  placeholder="Enter your password">
</ef-password-field>
```

::a11y-end::
