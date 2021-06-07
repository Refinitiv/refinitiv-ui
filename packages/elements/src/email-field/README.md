# Email Field

```live(preview)
<style>
  ef-panel {
    max-width: 450px;
  }
  ef-email-field{
    width: 250px;
  }
  p {
    margin-bottom: 4px;
  }
</style>
<ef-panel spacing>
  <p>Email</p>
  <ef-email-field placeholder="Business email address" icon="email"></ef-email-field>
</ef-panel>
```

`ef-email-field` is a form control to get an email input from users.

## Basic usage

`ef-email-field` has similar behaviors to the native input type email.

```html
<ef-email-field placeholder="Business email address"></ef-email-field>
```

## Getting value

The value can be accessed directly using `value` property.

```html
<ef-email-field
  id="email-input"
  value="awesome@tmail.com"
></ef-email-field>
```

```js
var emailInput = document.getElementById("email-input");
emailInput.value; // "awesome@tmail.com"
```

You can also listen to `value-changed` event that dispatches when the value changes due to user interactions.

```live
<ef-email-field id="input" placeholder="Type an email ..."></ef-email-field>
<p>Value: <code id="value-text"></code></p>
<script>
  var element = document.getElementById("input");
  var valueChangedText = document.getElementById('value-text');

  element.addEventListener("value-changed", function (e) {
    valueChangedText.innerHTML = e.detail.value;
  });
</script>
```

```html
<ef-email-field id="input"></ef-email-field>
<p>Value: <code id="value-text"></code></p>
```

```js
var element = document.getElementById("input");
var valueChangedText = document.getElementById("value-text");

element.addEventListener("value-changed", function (e) {
  valueChangedText.innerHTML = e.detail.value;
});
```

## Input validation

Validation occurs when the constraints are provided and whenever the value changes. If the error state changes, it will dispatch `error-changed` event along with current error state.

Alternatively, you can check `error` property to check if the input is valid or not.

### Input length

`maxlength` attribute limits the number of characters that users can type into the input and `minlength` attribute is used to set minimum of characters requires. `ef-email-field` will show error styles if the condition is not met.

```live
<style>
  #error-text {
    color:#d94255;
  }
  ef-email-field {
    width: 275px;
  }
</style>
<ef-email-field id="email-input" minlength="8" maxlength="14" placeholder="Length between 8 to 14 characters"></ef-email-field>
<p id="error-text"></p>
<script>
  var element = document.getElementById("email-input");
  var errorChangedText = document.getElementById('error-text');
  element.addEventListener("error-changed", function (e) {
      if (e.detail.value) {
        errorChangedText.innerHTML = "Must be in standard email format with between 8-14 characters.";
      }
      else {
        errorChangedText.innerHTML = "";
      }
  });
</script>
```

```html
<ef-email-field
  id="email-input"
  minlength="8"
  maxlength="14"
></ef-email-field>
<p id="error-text"></p>
```

```js
var element = document.getElementById("email-input");
var errorChangedText = document.getElementById("error-text");
element.addEventListener("error-changed", function (e) {
  if (e.detail.value) {
    errorChangedText.innerHTML =
      "Must be in standard email format with between 8-14 characters.";
  } else {
    errorChangedText.innerHTML = "";
  }
});
```

### Pattern

You can use a regular expression to validate the input value by setting it to `pattern` attribute.

```live
<style>
  #error-text {
    color:#d94255;
  }
  ef-email-field {
    width: 275px;
  }
</style>
<ef-email-field id="email" pattern=".+@mail.com" placeholder="Type email ending with '@mail.com'"></ef-email-field>
<p id="error-text"></p>
<script>
  var element = document.getElementById("email");
  var errorChangedText = document.getElementById("error-text");
  element.addEventListener("error-changed", function (e) {
    if (e.detail.value) {
      errorChangedText.innerHTML = "Email must end with '@mail.com'.";
    } else {
      errorChangedText.innerHTML = "";
    }
  });
</script>
```

```html
<ef-email-field id="email" pattern=".+@mail.com"></ef-email-field>
<p id="error-text"></p>
```

```js
var element = document.getElementById("email");
var errorChangedText = document.getElementById("error-text");
element.addEventListener("error-changed", function (e) {
  if (e.detail.value) {
    errorChangedText.innerHTML = "Email must end with '@mail.com'.";
  } else {
    errorChangedText.innerHTML = "";
  }
});
```

## Icon

Inline icon can be set to show inside input by using `icon`.

```live
<style>
  ef-email-field {
    width: 275px;
  }
</style>
<ef-email-field icon="individual" placeholder="Add your personal email .."></ef-email-field>
```

```html
<ef-email-field icon="individual"></ef-email-field>
```

Icon can become actionable by adding `icon-has-action` attribute to the element and `ef-email-field` will fire `icon-click` event when users click on the icon. You can add event listener to this event to execute your code.

```live
<style>
  #error-text {
    color:#d94255;
  }
  ef-email-field {
    width: 275px;
  }
</style>
<ef-email-field id="email-list-input" placeholder="Type email and then click the icon ..." icon="msgr-adduser" icon-has-action pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"></ef-email-field>
<p id="error-text"></p>
<p id="email-added"></p>
<script>
  var element = document.getElementById('email-list-input');
  var emailList = document.getElementById('email-added');
  var errorChangedText = document.getElementById("error-text");

  element.addEventListener('icon-click', function (e) {
    if (!element.error && element.value.length > 0) {
      emailList.innerHTML = element.value + " is added.";
    }
  });
  element.addEventListener("error-changed", function (e) {
    if (e.detail.value) {
      errorChangedText.innerHTML = "Invalid email format.";
      emailList.innerHTML = "";
    } else {
      errorChangedText.innerHTML = "";
    }
  });
</script>
```

```html
<ef-email-field
  id="email-list-input"
  icon="msgr-adduser"
  pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
  icon-has-action
></ef-email-field>
<p id="email-added"></p>
```

```js
var element = document.getElementById("email-list-input");
var emailList = document.getElementById("email-added");

element.addEventListener("icon-click", function (e) {
    if (!element.error && element.value.length > 0) {
      emailList.innerHTML = element.value + " is added.";
    }
});
```
