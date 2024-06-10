<!--
type: page
title: Text Field
location: ./elements/text-field
layout: default
language_tabs: [javascript, typescript]
-->

# Text Field
::

```javascript
::import-elements::
```

```css
ef-panel {
  max-width: 450px;
}
ef-text-field {
  width: 250px;
}
p {
  margin-bottom: 4px;
}
```

```html
<ef-panel spacing>
  <label for="first-name">First Name</label>
  <ef-text-field
    id="first-name"
    placeholder="Must be letters and at least 5 characters"
    pattern="[a-zA-Z]{5,}">
  </ef-text-field>
  <br/>
  <br/>
  <label for="last-name">Last Name</label>
  <ef-text-field
    id="last-name"
    placeholder="Must be letters and at least 5 characters"
    pattern="[a-zA-Z]{5,}">
  </ef-text-field>
</ef-panel>
```

::

`ef-text-field` is a form element for text.

## Usage
Text field is used to accept text input from users and has similar behaviors to the native text input.

```html
<label for="full-name">Full Name</label>
<ef-text-field
  id="full-name"
  placeholder="Your name as shown on your passport">
</ef-text-field>
```

## Getting a value
The field's value can be accessed using the `value` property.

You can also listen for the `value-changed` event. This event triggers when user interactions change the value.

```html
<label for="full-name">full Name</label>
<ef-text-field
  id="full-name"
  placeholder="Your name as shown on your passport">
</ef-text-field>
```

```javascript
const textField = document.getElementById("full-name");
textField.addEventListener("value-changed", (event) => {
  console.log(event.detail.value);
});
```

```typescript
import { ValueChangedEvent } from "@refinitiv-ui/elements";

const textField = document.getElementById("full-name");
textField?.addEventListener("value-changed", (event) => {
  console.log((event as ValueChangedEvent).detail.value);
});
```

## Input validation
`ef-text-field` has validation logic similar to a [native input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text). When a user types an invalid value into the control, error style will be shown to notify the user.

You can call `reportValidity()` to trigger the validation anytime and it will set error style if input is invalid. In case that the input is initially or programmatically set to an invalid value, you must call `reportValidity()` to show the error style. Make sure that the element has been defined before calling the method.

Whenever input is invalid, the `error` attribute will be added to the element. You can use the `error` property to check whether input is currently in the error state or not.

### Input length
The `maxlength` attribute limits the number of characters that users can type into the input, and the `minlength` attribute sets the minimum number of characters required. `ef-text-field` will show error styles if a condition is not met.

@> `maxlength` and `minlength` constraint validations are only applied when the value is changed by the user. [See input text](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text#maxlength).

::
```javascript
::import-elements::
const textField = document.getElementById("username");
const errorText = document.getElementById("error-text");

textField.addEventListener("blur", () => {
  errorText.textContent = textField.error ? "Value length must be between 5-8 characters." : "";
});

textField.addEventListener("input", () => {
  if (!textField.error) {
    errorText.textContent = "";
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
<label for="username">Username</label>
<ef-text-field
  id="username"
  aria-describedby="error-text"
  minlength="5"
  maxlength="8"
  placeholder="Between 5 to 8 characters">
</ef-text-field>
<p id="error-text"></p>
```

::

```html
<label for="username">Username</label>
<ef-text-field
  id="username"
  aria-describedby="error-text"
  minlength="5"
  maxlength="8"
  placeholder="Between 5 to 8 characters">
</ef-text-field>
<p id="error-text"></p>
```

```javascript
const textField = document.getElementById("username");
const errorText = document.getElementById("error-text");

textField.addEventListener("blur", () => {
  errorText.textContent = textField.error ? "Value length must be between 5-8 characters." : "";
});

textField.addEventListener("input", () => {
  if (!textField.error) {
    errorText.textContent = "";
  }
});
```

```typescript
import type { TextField } from "@refinitiv-ui/elements/text-field";

const textField = document.getElementById("username") as TextField;
const errorText = document.getElementById("error-text");

textField?.addEventListener("blur", () => {
  if (!errorText) {
    return;
  }
  errorText.textContent = textField.error ? "Value length must be between 5-8 characters." : "";
});

textField?.addEventListener("input", () => {
  if (!errorText) {
    return;
  }
  if (!textField.error) {
    errorText.textContent = "";
  }
});
```

### Using a pattern
You can use a regular expression to validate the input value by setting it with the `pattern` attribute.

::

```javascript
::import-elements::
const textField = document.getElementById("nickname");
const errorText = document.getElementById("error-text");

textField.addEventListener("blur", () => {
  errorText.textContent = textField.error ? "Nickname must be lowercase letters between 4-8 characters." : "";
});

textField.addEventListener("input", () => {
  if (!textField.error) {
    errorText.textContent = "";
  }
});
```

```css
#error-text {
  color:#d94255;
}
ef-text-field {
  width: 300px;
}
label {
  display: block;
}
```

```html
<label for="nickname">Nickname</label>
<ef-text-field
  id="nickname"
  aria-describedby="error-text"
  pattern="[a-z]{4,8}"
  placeholder="Must be lowercase letters between 4-8 characters">
</ef-text-field>
<p id="error-text"></p>
```

::

```html
<label for="nickname">Nickname:</label>
<ef-text-field
  id="nickname"
  aria-describedby="error-text"
  pattern="[a-z]{4,8}"
  placeholder="Must be lowercase letters between 4-8 characters">
</ef-text-field>
<p id="error-text"></p>
```

```javascript
const textField = document.getElementById("nickname");
const errorText = document.getElementById("error-text");

textField.addEventListener("blur", () => {
  errorText.textContent = textField.error ? "Nickname must be lowercase letters between 4-8 characters." : "";
});

textField.addEventListener("input", () => {
  if (!textField.error) {
    errorText.textContent = "";
  }
});
```

```typescript
import type { TextField } from "@refinitiv-ui/elements/text-field";

const textField = document.getElementById("nickname") as TextField;
const errorText = document.getElementById("error-text");

textField?.addEventListener("blur", () => {
  if (!errorText) {
    return;
  }
  errorText.textContent = textField.error ? "Nickname must be lowercase letters between 4-8 characters." : "";
});

textField?.addEventListener("input", () => {
  if (!errorText) {
    return;
  }
  if (!textField.error) {
    errorText.textContent = "";
  }
});
```

### Custom validation

For advance use cases, default validation and error state of the field can be overridden. To do this, make sure that `maxLength`, `minLength` and `pattern` are not set, then validate with your customised validation logic and update `error` property accordingly.

::

```javascript
::import-elements::
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const responseText = document.getElementById("response-text");
const save = document.getElementById("button");

save.addEventListener("tap", () => {
  const isPartial = Boolean(firstName.value) !== Boolean(lastName.value);
  firstName.error = isPartial ? !firstName.value : false;
  lastName.error = isPartial ? !lastName.value : false;
  if (isPartial) {
    responseText.classList.add('error');
  }
  responseText.textContent = isPartial ? "First name & last name must be provided together" : "Saved";
});

const inputHandler = () => {
  responseText.classList.remove('error');
  firstName.error = false;
  lastName.error = false;
  responseText.textContent = "";
};

firstName.addEventListener("input", inputHandler);
lastName.addEventListener("input", inputHandler);
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

#response-text {
  min-height: 18px;
}
```

```html
<p>Please provide referrer name if available</p>
<label for="first-name">First name</label>
<ef-text-field
  id="first-name"
  aria-describedby="response-text"
  placeholder="First name as shown on the passport">
</ef-text-field>
<label for="last-name">Last name</label>
<ef-text-field
  id="last-name"
  aria-describedby="response-text"
  placeholder="Last name as shown on the passport">
</ef-text-field>
<p id="response-text"></p>
<ef-button id="button">Save</ef-button>
```

::

```html
<p>Please provide referrer name if available</p>
<label for="first-name">First name</label>
<ef-text-field
  id="first-name"
  aria-describedby="response-text"
  placeholder="First name as shown on the passport">
</ef-text-field>
<label for="last-name">Last name</label>
<ef-text-field
  id="last-name"
  aria-describedby="response-text"
  placeholder="Last name as shown on the passport">
</ef-text-field>
<p id="response-text"></p>
<ef-button id="button">Save</ef-button>
```

```javascript
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const responseText = document.getElementById("response-text");
const save = document.getElementById("button");

save.addEventListener("tap", () => {
  const isPartial = Boolean(firstName.value) !== Boolean(lastName.value);
  firstName.error = isPartial ? !firstName.value : false;
  lastName.error = isPartial ? !lastName.value : false;
  if (isPartial) {
    responseText.classList.add('error');
  }
  responseText.textContent = isPartial ? "First name & last name must be provided together" : "Saved";
});

const inputHandler = () => {
  responseText.classList.remove('error');
  firstName.error = false;
  lastName.error = false;
  responseText.textContent = "";
};

firstName.addEventListener("input", inputHandler);
lastName.addEventListener("input", inputHandler);
```

```typescript
import type { TextField } from "@refinitiv-ui/elements/text-field";
import type { Button } from "@refinitiv-ui/elements/button";

const firstName = document.getElementById("first-name") as TextField;
const lastName = document.getElementById("last-name") as TextField;
const responseText = document.getElementById("response-text") as HTMLElement;
const save = document.getElementById("button") as Button;

save.addEventListener("tap", () => {
  const isPartial = Boolean(firstName.value) !== Boolean(lastName.value);
  firstName.error = isPartial ? !firstName.value : false;
  lastName.error = isPartial ? !lastName.value : false;
  if (isPartial) {
    responseText.classList.add('error');
  }
  responseText.textContent = isPartial ? "First name & last name must be provided together" : "Saved";
});

const inputHandler = () => {
  responseText.classList.remove('error');
  firstName.error = false;
  lastName.error = false;
  responseText.textContent = "";
};

firstName.addEventListener("input", inputHandler);
lastName.addEventListener("input", inputHandler);
```

## Showing an icon
An inline icon can be set to display inside the input using the `icon` attribute.

::

```javascript
::import-elements::
```

```css
ef-text-field {
  width: 200px;
}
```

```html
<label for="feedback">Feedback</label>
<ef-text-field
  id="feedback"
  icon="email"
  placeholder="We appreciate your feedback!">
</ef-text-field>
```

::

```html
<label for="feedback">Feedback</label>
<ef-text-field
  id="feedback"
  icon="email"
  placeholder="We appreciate your feedback!">
</ef-text-field>
```

The icon can become actionable by adding the `icon-has-action` attribute to the element, so that `ef-text-field` will fire the `icon-click` event when users click on the icon. You can add an event listener to this event to execute your code.

::

```javascript
::import-elements::
const urlInput = document.getElementById("urlInput");
const label = document.getElementById("actionResult");
urlInput.addEventListener("icon-click", (e) => {
  navigator.clipboard.writeText(urlInput.value)
  label.textContent = 'URL copied'
});
```

```css
ef-text-field {
  width: 250px;
}
```

```html
<label for="urlInput">URL</label>
<ef-text-field
  id="urlInput"
  value="https://ui.refinitiv.com/"
  placeholder="Type URL to copy"
  icon="copy"
  icon-has-action>
</ef-text-field>
<p id="actionResult"></p>
```

::

```html
<label for="urlInput">URL</label>
<ef-text-field
  id="urlInput"
  value="https://ui.refinitiv.com/"
  placeholder="Type URL to copy"
  icon="copy"
  icon-has-action>
</ef-text-field>
<p id="actionResult"></p>
```

```javascript
const urlInput = document.getElementById("urlInput");
const label = document.getElementById("actionResult");
urlInput.addEventListener("icon-click", (e) => {
  navigator.clipboard.writeText(urlInput.value)
  label.textContent = 'URL copied'
});
```

## Accessibility
::a11y-intro::

`ef-text-field` is assigned `role="textbox"`. States such as `disabled` or `readonly` are programmatically updated to match the element’s visual state.

`ef-text-field` has already managed the role and states but you must ensure that the element has associated label by using `label[for="<element.id>"]`, `aria-label` or `aria-labelledby`.

`placeholder` should be used for supporting information only.

If there is an element displaying error of `ef-text-field`, `aria-describedby` should be added to the text field.

```html
<label for="name">Full Name</label>
<ef-text-field
  id="name"
  placeholder="Your name as shown on your passport">
</ef-text-field>
```

```html
<ef-text-field
  aria-label="Full name"
  placeholder="Your name as shown on your passport">
</ef-text-field>
```

```html
<label id="name">Full Name</label>
<ef-text-field
  aria-labelledby="name"
  placeholder="Your name as shown on your passport">
</ef-text-field>
```

```html
<label for="name">Full Name</label>
<ef-text-field
  id="name"
  aria-describedby="error-text"
  pattern="[a-zA-Z]{3,}"
  placeholder="Your name as shown on your passport">
</ef-text-field>
<p id="error-text">Must be letters at least 3 characters</p>
```

::a11y-end::
