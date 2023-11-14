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
<label for="search">Search</label>
<ef-search-field 
  id="search"
  placeholder="Search keywords ...">
</ef-search-field>
```
::

`ef-search-field` is a form control input designed to receive search query input from users.

## Usage
`ef-search-field` has identical behavior to native text input and `ef-text-field`, except that the icon isn't customizable.

```html
<label for="search">Search</label>
<ef-search-field
  id="search"
  placeholder="Type a keyword to search ...">
</ef-search-field>
```

## Getting a value
The value can be accessed using the `value` property.

You can also listen to the `value-changed` event, which triggers whenever user interactions change the value.

::
```javascript
::search-field::
const searchField = document.getElementById("search");
const valueText = document.getElementById("value-text");

searchField.addEventListener("value-changed", (event) => {
  valueText.textContent = event.detail.value;
});
```
```html
<label for="search">Search</label>
<ef-search-field
  id="search"
  placeholder="Type something here ..">
</ef-search-field>
<p>Value: <code id="value-text"></code></p>
```
::

```html
<label for="search">Search</label>
<ef-search-field
  id="search"
  placeholder="Type something here ..">
</ef-search-field>
<p>Value: <code id="value-text"></code></p>
```

```javascript
const searchField = document.getElementById("search");
const valueText = document.getElementById("value-text");

searchField.addEventListener("value-changed", (event) => {
  valueText.textContent = event.detail.value;
});
```
```typescript
import { ValueChangedEvent } from "@refinitiv-ui/elements";

const searchField = document.getElementById("search");
const valueText = document.getElementById("value-text");

searchField?.addEventListener("value-changed", (event) => {
  if (valueText) {
    valueText.textContent = (event as ValueChangedEvent).detail.value;
  }
});
```

## Input validation
`ef-search-field` has validation logic similar to a [native input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/search). When a user types an invalid value into the control, error style will be shown to notify the user.

You can call `reportValidity()` to trigger the validation anytime and it will set error style if input is invalid. In case that the input is initialised with an invalid value and you need to show the error style, you must call `reportValidity()` once the input is defined on the page.

Whenever input is invalid, the `error` attribute will be added to the element. You can use the `error` property to check whether input is currently in the error state or not.

### Input length
The `maxlength` attribute limits the number of characters that users can enter and the `minlength` attribute sets the minimum number of characters required. `ef-search-field` will show error styles if a condition is not met.

@> `maxlength` and `minlength` constraint validations are only applied when the value is changed by the user. [See input search](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/search#maxlength).

::
```javascript
::search-field::
const searchField = document.getElementById("search");
const errorText = document.getElementById("error-text");

searchField.addEventListener("blur", () => {
  errorText.textContent = searchField.error ? "Value length must be between 2 - 4 characters." : "";
});

searchField.addEventListener("input", () => {
  if (!searchField.error) {
    errorText.textContent = "";
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
<label for="search">Search</label>
<ef-search-field
  id="search"
  minlength="2"
  maxlength="4"
  placeholder="Between 2 to 4 characters">
</ef-search-field>
<p id="error-text"></p>
```
::

```html
<label for="search">Search</label>
<ef-search-field
  id="search"
  minlength="2"
  maxlength="4"
  placeholder="Between 2 to 4 characters">
</ef-search-field>
<p id="error-text"></p>
```

```javascript
const searchField = document.getElementById("search");
const errorText = document.getElementById("error-text");

searchField.addEventListener("blur", () => {
  errorText.textContent = searchField.error ? "Value length must be between 2 - 4 characters." : "";
});

searchField.addEventListener("input", () => {
  if (!searchField.error) {
    errorText.textContent = "";
  }
});
```

```typescript
import { SearchField } from "@refinitiv-ui/elements/search-field";

const searchField = document.getElementById("search") as SearchField;
const errorText = document.getElementById("error-text");

searchField?.addEventListener("blur", () => {
  if (!errorText) {
    return;
  }
  errorText.textContent = searchField.error ? "Value length must be between 2 - 4 characters." : "";
});

searchField?.addEventListener("input", () => {
  if (!errorText) {
    return;
  }
  if (!searchField?.error) {
    errorText.textContent = "";
  }
});
```

### Using a pattern
You can use a regular expression to validate the input value by setting it to the `pattern` attribute.

::
```javascript
::search-field::
const searchField = document.getElementById("search-pattern");
const errorText = document.getElementById("error-text");

searchField.addEventListener("blur", () => {
  errorText.textContent = searchField.error ? "Value must be uppercase letters and has 2 - 5 characters." : "";
});

searchField.addEventListener("input", () => {
  if (!searchField.error) {
    errorText.textContent = "";
  }
});
```
```css
#error-text {
  color:#d94255;
}
ef-search-field {
  width: 280px;
}
```
```html
<label for="search-pattern">Search</label>
<ef-search-field
  id="search-pattern"
  pattern="[A-Z]{2,5}"
  placeholder="Enter uppercase letters and 2-5 characters">
</ef-search-field>
<p id="error-text"></p>
```
::

```html
<label for="search-pattern">Search</label>
<ef-search-field
  id="search-pattern"
  pattern="[A-Z]{2,5}"
  placeholder="Enter uppercase letters and 2-5 characters">
</ef-search-field>
<p id="error-text"></p>
```

```javascript
const searchField = document.getElementById("search-pattern");
const errorText = document.getElementById("error-text");

searchField.addEventListener("blur", () => {
  errorText.textContent = searchField.error ? "Value must be uppercase letters and has 2 - 5 characters." : "";
});

searchField.addEventListener("input", () => {
  if (!searchField.error) {
    errorText.textContent = "";
  }
});
```

```typescript
import { SearchField } from "@refinitiv-ui/elements/search-field";

const searchField = document.getElementById("search-pattern") as SearchField;
const errorText = document.getElementById("error-text");

searchField?.addEventListener("blur", () => {
  if (!errorText) {
    return;
  }
  errorText.textContent = searchField?.error ? "Value must be uppercase letters and has 2 - 5 characters." : "";
});

searchField?.addEventListener("input", () => {
  if (!errorText) {
    return;
  }
  if (!searchField?.error) {
    errorText.textContent = "";
  }
});
```

### Custom validation

For advance use cases, default validation and error state of the field can be overridden. To do this, make sure that `maxLength`, `minLength` and `pattern` are not set, then validate with your customised validation logic and update `error` property accordingly.

::

```javascript
::search-field::
const searchField = document.getElementById("search");
const errorText = document.getElementById("error-text");

const isRestricted = (query) => {
  const restrictedKeywords = ['war', 'crime', 'murder', 'marijuana', 'beer', 'vodka'];
  return restrictedKeywords.some((keyword) => query.includes(keyword));
};

searchField.addEventListener("blur", () => {
  const value = searchField.value.trim();
  const error = isRestricted(value);
  searchField.error = error;
  errorText.textContent = error ? "Unable to search for restricted content" : "";
});

searchField.addEventListener("input", () => {
  const value = searchField.value.trim();
  if (!isRestricted(value)) {
    errorText.textContent = "";
  }
});
```

```css
#error-text {
  color:#d94255;
}
ef-search-field {
  width: 250px;
}
label, code {
  display: block;
}
```

```html
<label for="search">Search for kids</label>
<code>keyword such as "war" are restricted.</code>
<ef-search-field
  id="search"
  aria-describedby="error-text"
  placeholder="What would like to learn today?">
</ef-search-field>
<p id="error-text"></p>
```

::

```html
<label for="search">Search for kids</label>
<code>keyword such as "war" are restricted.</code>
<ef-search-field
  id="search"
  aria-describedby="error-text"
  placeholder="what would like to learn today?">
</ef-search-field>
<p id="error-text"></p>
```

```javascript
const searchField = document.getElementById("search");
const errorText = document.getElementById("error-text");

const isRestricted = (query) => {
  const restrictedKeywords = ['war', 'crime', 'murder', 'marijuana', 'beer', 'vodka'];
  return restrictedKeywords.some((keyword) => query.includes(keyword));
};

searchField.addEventListener("blur", () => {
  const value = searchField.value.trim();
  const error = isRestricted(value);
  searchField.error = error;
  errorText.textContent = error ? "Unable to search for restricted content" : "";
});

searchField.addEventListener("input", () => {
  const value = searchField.value.trim();
  if (!isRestricted(value)) {
    errorText.textContent = "";
  }
});
```

```typescript
import type { SearchField } from "@refinitiv-ui/elements/search-field";

const searchField = document.getElementById("search") as SearchField;
const errorText = document.getElementById("error-text") as HTMLElement;

const isRestricted = (query: string) => {
  const restrictedKeywords = ['war', 'crime', 'murder', 'marijuana', 'beer', 'vodka'];
  return restrictedKeywords.some((keyword) => query.includes(keyword));
};

searchField.addEventListener("blur", () => {
  const value = searchField.value.trim();
  const error = isRestricted(value);
  searchField.error = error;
  errorText.textContent = error ? "Unable to search for restricted content" : "";
});

searchField.addEventListener("input", () => {
  const value = searchField.value.trim();
  if (!isRestricted(value)) {
    errorText.textContent = "";
  }
});
```

## Icon action
The search icon can become actionable by adding the `icon-has-action` attribute to the element, so that `ef-search-field` will fire an `icon-click` event when a user clicks on the icon. You can add an event listener to this event to execute your code.

::
```javascript
::search-field::
const searchField = document.getElementById("search");
const text = document.getElementById("text");

searchField.addEventListener("icon-click", () => {
  text.textContent = "icon is clicked";
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
<label for="search">Search</label>
<ef-search-field
  id="search"
  placeholder="Try clicking at the icon..."
  icon-has-action>
</ef-search-field>
<p id="text"></p>
```
::

```html
<label for="search">Search</label>
<ef-search-field
  id="search"
  placeholder="Try clicking at the icon..."
  icon-has-action>
</ef-search-field>
<p id="text"></p>
```

```javascript
const searchField = document.getElementById("search");
const text = document.getElementById("text");

searchField.addEventListener("icon-click", () => {
  text.textContent = "icon is clicked";
});
```

```typescript
const searchField = document.getElementById("search");
const text = document.getElementById("text");

searchField?.addEventListener("icon-click", () => {
  if (text) {
    text.textContent = "icon is clicked";
  }
});
```

## Searching on keypress
By listening to the `keyup` event, you can add a search action when the user presses a certain key.

```javascript
const searchField = document.getElementById("search");
searchField.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    // action
  }
});
```

## Searching on type
Search on type or search autocomplete can be implemented by adding a search action to the `value-changed` event. However, if the user types too quickly it can put a heavy load on the server and search results could prove to be irrelevant. It is a recommended practice to use either **debounce** or **throttle** to limit the times the application calls for expensive operations like API requests.

```javascript
const searchField = document.getElementById("search");
searchField.addEventListener("value-changed", (event) => {
    debounce(search(event.detail.value), 1500) // debounce search() for 1.5 seconds
});
```

## Accessibility
::a11y-intro::

`ef-search-field` is assigned `role="textbox"`. States such as `disabled` or `readonly` are programmatically updated to match the element’s visual state. Dynamic updates such as a validation message are communicated to screen readers through a live region.

`ef-search-field` has managed the role and states but you must ensure that the element has associated label by using `placeholder`, `aria-label`, `aria-labelledby` or `label[for="<element.id>"]`

```html
<ef-search-field 
  aria-label="Search"
  placeholder="Enter word to search">
</ef-search-field>
```
```html
<label id="keyword">Search</label>
<ef-search-field 
  aria-labelledby="keyword"
  placeholder="Enter word to search">
</ef-search-field>
```
```html
<label for="keyword">Search</label>
<ef-search-field
  id="keyword"
  placeholder="Enter word to search">
</ef-search-field>
```

::a11y-end::
