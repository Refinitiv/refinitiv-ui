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
  <label for="email">Email</p>
  <ef-email-field 
    id="email"
    placeholder="Business email address"
    icon="email">
  </ef-email-field>
</ef-panel>
```
::

`ef-email-field` is a form control to confidently obtain an email input from users.

## Usage
`ef-email-field` has similar behaviors to the native email input type.

```html
<label for="email">Email</label>
<ef-email-field
  id="email"
  placeholder="Business email address">
</ef-email-field>
```

## Getting value
The field's value can be accessed directly using the `value` property.

```html
<label for="email">Email</label>
<ef-email-field
  id="email"
  value="awesome@tmail.com"
  placeholder="Business email address">
</ef-email-field>
```

```javascript
const emailField = document.getElementById("email");
console.log(emailField.value); // "awesome@tmail.com"
```

You can also listen for the `value-changed` event that triggers when the value changes due to user interactions.

::
```javascript
::email-field::
const emailField = document.getElementById("email");
const valueChangedText = document.getElementById("value-text");

emailField.addEventListener("value-changed", (e) => valueChangedText.textContent = e.detail.value);
```
```html
<label for="email">Email</label>
<ef-email-field id="email" placeholder="Type an email ..."></ef-email-field>
<p>Value: <code id="value-text"></code></p>
```
::

```javascript
const emailField = document.getElementById("email");

emailField.addEventListener("value-changed", (event) => {
  console.log(event.detail.value);
});
```

```typescript
import { ValueChangedEvent } from "@refinitiv-ui/elements";

const emailField = document.getElementById("email");

emailField?.addEventListener("value-changed", (event) => {
  console.log((event as ValueChangedEvent).detail.value);
});
```

## Input validation
`ef-email-field` has validation logic similar to a [native input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email). When a user types an invalid value into the control, error style will be shown to notify the user.

You can call `reportValidity()` to trigger the validation anytime and it will set error style if input is invalid. In case that the input is initialised with an invalid value and you need to show the error style, you must call `reportValidity()` once the input is defined on the page.

Whenever input is invalid, the `error` attribute will be added to the element. You can use the `error` property to check whether input is currently in the error state or not.

### Input length
The `maxlength` attribute limits the number of characters that users can type into the input and the `minlength` attribute is used to set the minimum of characters required. `ef-email-field` will show error styles if the condition is not met.

@> `maxlength` and `minlength` constraint validations are only applied when the value is changed by the user. [See input email](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#maxlength).

::
```javascript
::email-field::
const emailField = document.getElementById("email");
const errorText = document.getElementById("error-text");

emailField.addEventListener("blur", (event) => {
  errorText.textContent =  emailField.error
    ? "Must be in standard email format with between 8-14 characters."
    :  "";
});
emailField.addEventListener("input", () => {
  if (!emailField.error) {
    errorText.textContent = "";
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
<label for="email">Email</label>
<ef-email-field
  id="email"
  minlength="8"
  maxlength="14"
  placeholder="Length between 8 to 14 characters"
></ef-email-field>
<p id="error-text"></p>
```
::

```html
<label for="email">Email</label>
<ef-email-field
  id="email"
  minlength="8"
  maxlength="14"
  placeholder="Length between 8 to 14 characters">
</ef-email-field>
<p id="error-text"></p>
```

```javascript
const emailField = document.getElementById("email");
const errorText = document.getElementById("error-text");

emailField.addEventListener("blur", (event) => {
  errorText.textContent = emailField.error ? "Must be in standard email format with between 8-14 characters." : "";
});

emailField.addEventListener("input", () => {
  if (!emailField.error) {
    errorText.textContent = "";
  }
});
```

```typescript
import { EmailField } from "@refinitiv-ui/elements/email-field";

const emailField = document.getElementById("email") as EmailField;
const errorText = document.getElementById("error-text");

emailField?.addEventListener("blur", () => {
  if (!errorText) {
    return;
  }
  errorText.textContent = emailField?.error ? "Must be in standard email format with between 8-14 characters." : "";
});

emailField?.addEventListener("input", () => {
  if (!errorText) {
    return;
  }
  if (!emailField?.error) {
    errorText.textContent = "";
  }
});
```

### Use pattern
You can use a regular expression to validate the input value by adding the `pattern` attribute.

::
```javascript
::email-field::
const emailField = document.getElementById("email");
const errorText = document.getElementById("error-text");

emailField.addEventListener("blur", () => {
  errorText.textContent = emailField.error ? "Email must end with '@mail.com'." : "";
});

emailField.addEventListener("input", () => {
  if (!emailField.error) {
    errorText.textContent = "";
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
<label for="email">Email</label>
<ef-email-field
  id="email"
  pattern=".+@mail.com"
  placeholder="Type email ending with '@mail.com'">
</ef-email-field>
<p id="error-text"></p>
```
::

```html
<label for="email">Email</label>
<ef-email-field
  id="email"
  pattern=".+@mail.com"
  placeholder="Type email ending with '@mail.com'">
</ef-email-field>
<p id="error-text"></p>
```

```javascript
const emailField = document.getElementById("email");
const errorText = document.getElementById("error-text");

emailField.addEventListener("blur", () => {
  errorText.textContent = emailField.error ? "Email must end with '@mail.com'." : "";
});

emailField.addEventListener("input", () => {
  if (!emailField.error) {
    errorText.textContent = "";
  }
});
```

```typescript
import { EmailField } from "@refinitiv-ui/elements/email-field";

const emailField = document.getElementById("email") as EmailField;
const errorText = document.getElementById("error-text");

emailField?.addEventListener("blur", () => {
  if (!errorText) {
    return;
  }
  errorText.textContent =  emailField?.error ? "Email must end with '@mail.com'." :  "";
});

emailField?.addEventListener("input", () => {
  if (!errorText) {
    return;
  }
  if (!emailField?.error) {
    errorText.textContent = "";
  }
});
```

### Custom Validation

For advance use cases, apps can control validation and error state of the field manually. Do not set `maxLength` & `minLength` validation constrain and set `pattern` to `''`, then validate the field and update `error` property as needed.

::

```javascript
::text-field::
const fullNameField = document.getElementById("full-name");
const emailField = document.getElementById("email");
const responseText = document.getElementById("response-text");
const save = document.getElementById("save");

save.addEventListener("tap", () => {
  const incompleteError = Boolean(fullNameField.value) !== Boolean(emailField.value);
  fullNameField.error = incompleteError ? !Boolean(fullNameField.value) : false;
  emailField.error = incompleteError ? !Boolean(emailField.value) : false;
  if (incompleteError) {
    responseText.classList.add('error');
    responseText.innerHTML = "Full name & email must be provided together";
  } else if (emailField.value && !/^\w+@mail.com$/.test(emailField.value)) {
    emailField.error = true;
    responseText.innerHTML = "Email must be valid and end with @mail.com";
  } else {
    responseText.innerHTML = "Saved";
  }
});

const inputHandler = () => {
  responseText.classList.remove('error');
  fullNameField.error = false;
  emailField.error = false;
  responseText.innerHTML = "<br>";
};

fullNameField.addEventListener("input", inputHandler);
emailField.addEventListener("input", inputHandler);
```

```css
.error {
  color: #d94255;
}
ef-text-field {
  width: 300px;
}
label {
  display: block;
}
```

```html
<p>Please provide secondary contact if available</p>
<label for="full-name">Full name</label>
<ef-text-field
  id="full-name"
  aria-describedby="response-text"
  placeholder="Full name as shown on the passport">
</ef-text-field>
<label for="email">Email</label>
<ef-text-field
  id="email"
  aria-describedby="response-text"
  placeholder="Actively used email address">
</ef-text-field>
<p id="response-text"><br></p>
<ef-button id="save">Save</ef-button>
```

::

```html
<p>Please provide secondary contact if available</p>
<label for="full-name">Full name</label>
<ef-text-field
  id="full-name"
  aria-describedby="response-text"
  placeholder="Full name as shown on the passport">
</ef-text-field>
<label for="email">Email</label>
<ef-text-field
  id="email"
  aria-describedby="response-text"
  placeholder="Actively used email address">
</ef-text-field>
<p id="response-text"><br></p>
<ef-button id="save">Save</ef-button>
```

```javascript
const fullNameField = document.getElementById("full-name");
const emailField = document.getElementById("email");
const responseText = document.getElementById("response-text");
const save = document.getElementById("save");

save.addEventListener("tap", () => {
  const incompleteError = Boolean(fullNameField.value) !== Boolean(emailField.value);
  fullNameField.error = incompleteError ? !Boolean(fullNameField.value) : false;
  emailField.error = incompleteError ? !Boolean(emailField.value) : false;
  if (incompleteError) {
    responseText.classList.add('error');
    responseText.innerHTML = "Full name & email must be provided together";
  } else if (emailField.value && !/^\w+@mail.com$/.test(emailField.value)) {
    emailField.error = true;
    responseText.innerHTML = "Email must be valid and end with @mail.com";
  } else {
    responseText.innerHTML = "Saved";
  }
});

const inputHandler = () => {
  responseText.classList.remove('error');
  fullNameField.error = false;
  emailField.error = false;
  responseText.innerHTML = "<br>";
};

fullNameField.addEventListener("input", inputHandler);
emailField.addEventListener("input", inputHandler);
```

```typescript
import type { TextField } from "@refinitiv-ui/elements/text-field";
import type { EmailField } from "@refinitiv-ui/elements/email-field";
import type { Button } from "@refinitiv-ui/elements/button";

const fullNameField = document.getElementById("full-name") as TextField;
const emailField = document.getElementById("email") as EmailField;
const responseText = document.getElementById("response-text") as HTMLElement;
const save = document.getElementById("save") as Button;

save.addEventListener("tap", () => {
  const incompleteError = Boolean(fullNameField.value) !== Boolean(emailField.value);
  fullNameField.error = incompleteError ? !Boolean(fullNameField.value) : false;
  emailField.error = incompleteError ? !Boolean(emailField.value) : false;
  if (incompleteError) {
    responseText.classList.add('error');
    responseText.innerHTML = "Full name & email must be provided together";
  } else if (emailField.value && !/^\w+@mail.com$/.test(emailField.value)) {
    emailField.error = true;
    responseText.innerHTML = "Email must be valid and end with @mail.com";
  } else {
    responseText.innerHTML = "Saved";
  }
});

const inputHandler = () => {
  responseText.classList.remove('error');
  fullNameField.error = false;
  emailField.error = false;
  responseText.innerHTML = "<br>";
};

fullNameField.addEventListener("input", inputHandler);
emailField.addEventListener("input", inputHandler);
```

## Show icon
An inline icon can be displayed inside the input using `icon`.

```html
<label for="email">Email</label>
<ef-email-field
  id="email"
  icon="individual"
  placeholder="Enter email">
</ef-email-field>
```

An icon can become actionable by adding the `icon-has-action` attribute to the element, and `ef-email-field` will fire the `icon-click` event when a user clicks on the icon. You can add an event listener to this event to execute your code.

::
```javascript
::email-field::
const emailField = document.getElementById("email");
const emailList = document.getElementById("email-added");
const errorText = document.getElementById("error-text");

emailField.addEventListener("icon-click", (e) => {
  if (!emailField.error && emailField.value.length > 0) {
    emailList.textContent = emailField.value + " is added.";
  }
});
emailField.addEventListener("blur", () => {
  if (emailField.error) {
    errorText.textContent = emailField.error ? "Invalid email format." : "";
    emailList.textContent = "";
  }
});
emailField.addEventListener("input", () => {
  if (!emailField.error) {
    errorText.textContent = "";
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
<label for="email">Email</label>
<ef-email-field
  id="email"
  placeholder="Type email and then click the icon ..."
  icon="msgr-adduser"
  icon-has-action pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
></ef-email-field>
<p id="error-text"></p>
<p id="email-added"></p>
```
::

```html
<label for="email">Email</label>
<ef-email-field
  id="email"
  icon="msgr-adduser"
  pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
  icon-has-action
  placeholder="Type email and then click the icon ..."
></ef-email-field>
<p id="email-added"></p>
```

```javascript
const emailField = document.getElementById("email");
const emailList = document.getElementById("email-added");

emailField.addEventListener("icon-click", () => {
  if (!emailField.error && emailField.value.length > 0) {
    emailList.textContent = emailField.value + " is added.";
  }
});
```

```typescript
import { EmailField } from "@refinitiv-ui/elements/email-field";

const emailField = document.getElementById("email") as EmailField;
const emailList = document.getElementById("email-added");

emailField?.addEventListener("icon-click", () => {
  if (emailList && !emailField.error && emailField.value.length > 0) {
    emailList.textContent = emailField.value + " is added.";
  }
});
```

## Accessibility
::a11y-intro::

`ef-email-field` is assigned `role="textbox"`. States such as `disabled` or `readonly` are programmatically updated to match the element’s visual state.

`ef-email-field` has already managed the role and states but you must ensure that the element has associated label by using `placeholder`, `aria-label`, `aria-labelledby` or `label[for="<element.id>"]`

```html
<ef-email-field 
  aria-label="Email"
  placeholder="Enter your email">
</ef-email-field>
```
```html
<label id="email">Email</label>
<ef-email-field 
  aria-labelledby="email"
  placeholder="Enter your email">
</ef-email-field>
```
```html
<label for="email">Email</label>
<ef-email-field
  id="email"
  placeholder="Enter your email">
</ef-email-field>
```

::a11y-end::
