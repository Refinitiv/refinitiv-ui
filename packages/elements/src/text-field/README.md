# Text Field

```live(preview)
<style>
  ef-panel {
    max-width: 450px;
  }
  ef-text-field{
    width: 250px;
  }
  p {
    margin-bottom: 4px;
  }
</style>
<ef-panel spacing>
  <p>First name</p>
  <ef-text-field placeholder="Must be letters and at least 5 characters"  pattern="[a-zA-Z]{5,}"></ef-text-field>
  <br/>
  <br/>
  <p>Last name</p>
  <ef-text-field placeholder="Must be letters and at least 5 characters" pattern="[a-zA-Z]{5,}"></ef-text-field>
</ef-panel>
```

`ef-text-field` is a form control element for text.

## Basic usage

Text field is used to accept text input from users and it has similar behaviors to the native text input.

```html
<ef-text-field placeholder="Type something..."></ef-text-field>
```

## Getting value

The value can be accessed using `value` property.

```html
<ef-text-field id="text-input" value="Hello World"></ef-text-field>
```

```js
var textInput = document.getElementById("text-input");
textInput.value; // "Hello World"
```

You can also listen to `value-changed` event which triggers when the value changes due to user interactions.

```live
<ef-text-field id="input" placeholder="Type something here .."></ef-text-field>
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
<ef-text-field id="input"></ef-text-field>
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

Alternatively, you can check `error` property to confirm if the input is valid or not.

### Input length

The `maxlength` attribute limits the number of characters that users can type into the input, and the `minlength` attribute sets the minimum number of characters. The `ef-text-field` will show error styles if the condition is not met.

```live
<style>
  #error-text {
    color:#d94255;
  }
  ef-text-field {
    width: 200px;
  }
</style>
<ef-text-field id="textInput" minlength="5" maxlength="8" placeholder="Between 5 to 8 characters"></ef-text-field>
<p id="error-text"></p>
<script>
  var element = document.getElementById("textInput");
  var errorChangedText = document.getElementById('error-text');
  element.addEventListener("error-changed", function (e) {
      if (e.detail.value) {
        errorChangedText.innerHTML = "Value length must be between 5 -8 characters";
      }
      else {
        errorChangedText.innerHTML = "";
      }
  });
</script>
```

```html
<ef-text-field minlength="5" maxlength="8"></ef-text-field>
<p id="error-text"></p>
```

```js
var element = document.getElementById("textInput");
var errorChangedText = document.getElementById("error-text");
element.addEventListener("error-changed", function (e) {
  if (e.detail.value) {
    errorChangedText.innerHTML =
      "Value length must be between 5 -8 characters.";
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
  ef-text-field {
    width: 275px;
  }
</style>
<div>Nickname</div>
<ef-text-field id="nickname" pattern="[a-z]{4,8}" placeholder="Must be lowercase letters and 4-8 characters"></ef-text-field>
<p id="error-text"></p>
<script>
  var element = document.getElementById("nickname");
  var errorChangedText = document.getElementById("error-text");
  element.addEventListener("error-changed", function (e) {
    if (e.detail.value) {
      errorChangedText.innerHTML = "Nickname must be lowercase letters and 4-8 characters.";
    } else {
      errorChangedText.innerHTML = "";
    }
  });
</script>
```

```html
Nickname: <ef-text-field id="nickname" pattern="[a-z]{4,8}"></ef-text-field>
<p id="error-text"></>
```

```js
var element = document.getElementById("nickname");
var errorChangedText = document.getElementById("error-text");
element.addEventListener("error-changed", function (e) {
  if (e.detail.value) {
    errorChangedText.innerHTML = "Nickname must be lowercase letters and 4-8 characters.";
  } else {
    errorChangedText.innerHTML = "";
  }
});
```

## Icon

Inline icon can be set to show inside input by using `icon`.

```live
<ef-text-field icon="email" placeholder="We appreciate your feedback!"></ef-text-field>
<style>
  ef-text-field {
    width: 200px;
  }
</style>
```

```html
<ef-text-field icon="email"></ef-text-field>
```

Icon can become actionable by adding `icon-has-action` attribute to the element and `ef-text-field` will fire `icon-click` event when users click on the icon. You can add event listener to this event to execute your code.

```live
<ef-text-field id="feedback" placeholder="Type your feedback and click the icon" icon="email" icon-has-action></ef-text-field>
<style>
  ef-text-field {
    width: 250px;
  }
</style>
<script>
  var element = document.getElementById("feedback");
  element.addEventListener("icon-click", function (e) {
    element.value = ""
    element.placeholder = "Feedback sent. Thanks!";
    element.icon = "tick";
  });
</script>
```

```html
<ef-text-field
  id="feedback"
  placeholder="Type your feedback and click the icon"
  icon="email"
  icon-has-action>
</ef-text-field>
```

```js
var element = document.getElementById("feedback");
element.addEventListener("icon-click", function (e) {
    element.value = ""
    element.placeholder = "Feedback sent. Thanks!";
    element.icon = "tick";
});
```
