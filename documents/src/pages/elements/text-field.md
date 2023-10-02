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
::text-field::
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

## Getting value
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
`ef-text-field` has validation logic similar to a [native input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text). When a user types the invalid value into the control, error style will be shown to notify the user.

You can call `reportValidity()` to trigger the validation anytime and it will set error style if input is invalid. In case that the input is initialised with invalid value and you need to show the error style, you must call `reportValidity()` once the input in defined on the page.

Whenever input is invalid, the `error` attribute will be added to the element. You can use the `error` property to check if input is currently in the error state.

### Input length
The `maxlength` attribute limits the number of characters that users can type into the input, and the `minlength` attribute sets the minimum number of characters required. `ef-text-field` will show error styles if a condition is not met.

@> `maxlength` and `minlength` constraint validations are only applied when the value is changed by the user. [See input text](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text#maxlength).

::
```javascript
::text-field::
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

### Use pattern
You can use a regular expression to validate the input value by setting it with the `pattern` attribute.

::

```javascript
::text-field::
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

## Show icon
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
::text-field::
const feedback = document.getElementById("feedback");
feedback.addEventListener("icon-click", (e) => {
  feedback.value = "";
  feedback.icon = "";
  feedback.iconHasAction = false;
});
feedback.addEventListener("value-changed", (e) => {
  if (feedback.value) {
    feedback.icon = "cross";
    feedback.iconHasAction = true;
  } else {
    feedback.icon = "";
    feedback.iconHasAction = false;
  }
});
```

```css
ef-text-field {
  width: 250px;
}
```

```html
<label for="feedback">Feedback</label>
<ef-text-field
  id="feedback"
  value="nice job!"
  placeholder="Type your feedback and click the icon"
  icon="cross"
  icon-has-action>
</ef-text-field>
```

::

```html
<label for="feedback">Feedback</label>
<ef-text-field
  id="feedback"
  value="nice job!"
  placeholder="Type your feedback and click the icon"
  icon="cross"
  icon-has-action>
</ef-text-field>
```

```javascript
const feedback = document.getElementById("feedback");
feedback.addEventListener("icon-click", (e) => {
  feedback.value = "";
  feedback.icon = "";
  feedback.iconHasAction = false;
});
```

## Accessibility
::a11y-intro::

`ef-text-field` is assigned `role="textbox"`. States such as `disabled` or `readonly` are programmatically updated to match the element’s visual state.

`ef-text-field` has already managed the role and states but you must ensure that the element has associated label by using `aria-label`, `aria-labelledby` or `label[for="<element.id>"]`.

`placeholder` attributes should not be used as a label. Use `placeholder` for supporting information only.

If there is an element displaying error of `ef-text-field`, `aria-describedby` should be added to the text field.

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
