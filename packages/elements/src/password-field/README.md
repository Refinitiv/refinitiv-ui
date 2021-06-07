# Password Field

```live(preview)
<style>
  ef-panel {
    max-width: 450px;
  }
  ef-password-field{
    width: 250px;
  }
  p {
    margin: 4px 0;
  }
  ul {
    padding-inline-start: 24px;
  }
  #password-error, #pattern-error {
    color: #d94255;
  }
</style>
<ef-panel>
  <ef-header level="3">Password Recommendation</ef-header>
  <ul>
    <li>At least 8 characters—the more characters, the better.</li>
    <li>At least one uppercase and lowercase letters.</li>
    <li>At least one number.</li>
    <li>At least one special character.</li>
  </ul>
</ef-panel>

<p>Password</p>
<ef-password-field id="pw" pattern="^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$"></ef-password-field>
<br/>
<p>Confirm password</p>
<ef-password-field id="confirmedPw" pattern="^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$"></ef-password-field>

<ul id="error-list">
  <li id="password-error">Password does not match</li>
  <li id="pattern-error">Password does not meet criteria</li>
</ul>

<script>
  var pw = document.getElementById('pw');
  var confirmedPw = document.getElementById('confirmedPw');
  var passwordMatchError = document.getElementById('password-error');
  var patternError = document.getElementById('pattern-error');

  passwordMatchError.style.display = 'none';
  patternError.style.display = 'none';


  confirmedPw.addEventListener('value-changed', function (e) {
    if (e.detail.value !== pw.value) {
      passwordMatchError.style.display = 'list-item';
    }
    else {
      passwordMatchError.style.display = 'none';
    }
  });

  confirmedPw.addEventListener('error-changed', function (e) {
    if (e.detail.value) {
      patternError.style.display = 'list-item';
    }
    else {
      patternError.style.display = 'none';
    }
  });
</script>
```

`ef-password-field` is a form control for password with built-in show/hide toggle functionality.

## Basic usage

`ef-password-field` behaves similarly to the native password input. It has password masking that allows user to securely type the password into the input.

```html
<ef-password-field placeholder="Password ..."></ef-password-field>
```

## Getting value

The value can be accessed through `value` property.

```html
<ef-password-field id="password-input"></ef-password-field>
```

```js
var passwordInput = document.getElementById("password-input");
passwordInput.value; // User's input password
```

You can also listen to `value-changed` event which triggers when the value changes due to user interactions.

```live
<style>
  ef-password-filed {
    width: 172px;
  }
</style>
<ef-password-field id="password-input" placeholder="Type something here .."></ef-password-field>
<p>Value: <code id="value-text"></code></p>
<script>
  var element = document.getElementById("password-input");
  var valueChangedText = document.getElementById('value-text');

  element.addEventListener("value-changed", function (e) {
    valueChangedText.innerHTML = e.detail.value;
  });
</script>
```

```html
<ef-password-field id="password-input"></ef-password-field>
<p>Value: <code id="value-text"></code></p>
```

```js
var element = document.getElementById("password-input");
var valueChangedText = document.getElementById("value-text");

element.addEventListener("value-changed", function (e) {
  valueChangedText.innerHTML = e.detail.value;
});
```

## Input validation

Validation occurs when the constraints are provided and whenever the value changes. If the error state changes, it will dispatch `error-changed` event along with current error state.

Alternatively, you can check `error` property to check if the input is valid or not.

### Input length

`maxlength` attribute limits the number of characters that can be typed into the input and `minlength` attribute sets the minimum of characters. `ef-password-field` will show error styles if the condition is not met.

```live
<style>
  #error-text {
    color:#d94255;
  }
  ef-password-field {
    width: 200px;
  }
</style>
<ef-password-field id="passwordInput" minlength="8" maxlength="16" placeholder="Between 8 to 16 characters"></ef-password-field>
<p id="error-text"></p>
<script>
  var element = document.getElementById("passwordInput");
  var errorChangedText = document.getElementById('error-text');
  element.addEventListener("error-changed", function (e) {
    if (e.detail.value) {
      errorChangedText.innerHTML = "Password length must be between 8 - 16 characters";
    }
    else {
      errorChangedText.innerHTML = "";
    }
  });
</script>
```

```html
<ef-password-field id="passwordInput" minlength="8" maxlength="16"></ef-password-field>
<p id="error-text"></p>
```

```js
var element = document.getElementById("passwordInput");
var errorChangedText = document.getElementById("error-text");

element.addEventListener("error-changed", function (e) {
  if (e.detail.value) {
    errorChangedText.innerHTML = "Password length must be between 8 - 16 characters.";
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
  ef-password-field {
    width: 275px;
  }
</style>
<ul>
  <li>At least 8 characters—the more characters, the better.</li>
  <li>At least one uppercase and lowercase letters.</li>
  <li>At least one number.</li>
  <li>At least one special character.</li>
</ul>
<ef-password-field id="password" pattern="^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$"></ef-password-field>
<p id="error-text"></p>
<script>
  var element = document.getElementById("password");
  var errorChangedText = document.getElementById("error-text");
  element.addEventListener("error-changed", function (e) {
    if (e.detail.value) {
      errorChangedText.innerHTML = "Password is too weak.";
    } else {
      errorChangedText.innerHTML = "";
    }
  });
</script>
```

```html
<ef-password-field
  id="password"
  pattern="^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$"
></ef-password-field>
<p id="error-text"></>
```

```js
var element = document.getElementById("password");
var errorChangedText = document.getElementById("error-text");
element.addEventListener("error-changed", function (e) {
  if (e.detail.value) {
    errorChangedText.innerHTML = "Password is too weak.";
  } else {
    errorChangedText.innerHTML = "";
  }
});
```
