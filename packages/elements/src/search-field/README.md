# Search Field

```live(preview)
<ef-search-field placeholder="Search keywords ..."></ef-search-field>
```

`ef-search-field` is a form control input designed to get search queries input from user.

## Basic usage

It has identical behavior as native text input and `ef-text-field` except that the icon isn't customizable.

```html
<ef-search-field placeholder="Type a keyword to search ..."></ef-search-field>
```

## Getting value

The value can be accessed using `value` property.

```html
<ef-search-field id="search-input" value="keywords"></ef-search-field>
```

```js
var searchInput = document.getElementById("search-input");
searchInput.value; // "keywords"
```

You can also listen to `value-changed` event which triggers when the value changes due to user interactions.

```live
<ef-search-field id="input" placeholder="Type something here .."></ef-search-field>
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
<ef-search-field id="input"></ef-search-field>
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

`maxlength` attribute limits the number of characters that users can enter and `minlength` attribute sets the minimum number of characters required. `ef-search-field` will show error styles if the condition is not met.

```live
<style>
  #error-text {
    color:#d94255;
  }
  ef-search-field {
    width: 200px;
  }
</style>
<ef-search-field id="search-input" minlength="2" maxlength="4" placeholder="Between 2 to 4 characters"></ef-search-field>
<p id="error-text"></p>
<script>
  var element = document.getElementById("search-input");
  var errorChangedText = document.getElementById('error-text');
  element.addEventListener("error-changed", function (e) {
    if (e.detail.value) {
      errorChangedText.innerHTML = "Value length must be between 2 - 4 characters";
    }
    else {
      errorChangedText.innerHTML = "";
    }
  });
</script>
```

```html
<ef-search-field id="search-input" minlength="2" maxlength="4"></ef-search-field>
<p id="error-text"></p>
```

```js
var element = document.getElementById("search-input");
var errorChangedText = document.getElementById("error-text");

element.addEventListener("error-changed", function (e) {
  if (e.detail.value) {
    errorChangedText.innerHTML =
      "Value length must be between 2 - 4 characters.";
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
  ef-search-field {
    width: 80px;
  }
</style>
<p>Uppercase letters and 2-5 characters</p>
<ef-search-field id="search-pattern" pattern="[A-Z]{2,5}" placeholder="TRI"></ef-search-field>
<p id="error-text"></p>
<script>
  var element = document.getElementById("search-pattern");
  var errorChangedText = document.getElementById("error-text");
  element.addEventListener("error-changed", function (e) {
    if (e.detail.value) {
      errorChangedText.innerHTML = "Value must be uppercase letters and has 2 - 5 characters.";
    } else {
      errorChangedText.innerHTML = "";
    }
  });
</script>
```

```html
<ef-search-field id="search-pattern" pattern="[A-Z]{2,5}"></ef-search-field>
<p id="error-text"></>
```

```js
var element = document.getElementById("search-pattern");
var errorChangedText = document.getElementById("error-text");
element.addEventListener("error-changed", function (e) {
  if (e.detail.value) {
    errorChangedText.innerHTML = "Value must be uppercase letters and has 2 - 5 characters.";
  } else {
    errorChangedText.innerHTML = "";
  }
});
```

## Icon action

Search icon can become actionable by adding `icon-has-action` attribute to the element and `ef-search-field` will fire `icon-click` event when users click on the icon. You can add event listener to this event to execute your code.

```live
<style>
  p {
    margin: 8px 0;
  }
  ef-search-field {
    width: 200px;
  }
</style>
<ef-search-field id="icon-action" placeholder="Try clicking at the icon..." icon-has-action></ef-search-field>
<p id="result"></p>
<script>
  var element = document.getElementById('icon-action');
  var result = document.getElementById('result');

  element.addEventListener('icon-click', function (e) {
    result.innerHTML = 'icon is clicked';
  });
</script>
```

```html
<ef-search-field id="icon-action" placeholder="Try clicking at the icon..." icon-has-action></ef-search-field>
<p id="result"></p>
```

```js
var element = document.getElementById('icon-action');
var result = document.getElementById('result');

element.addEventListener('icon-click', function (e) {
  result.innerHTML = 'icon is clicked';
});
```

## Search on keypress

By listening to `keyup` event, you can add search action when user makes a certain key press.

```js
var searchInput = document.querySelector("ef-search-field");
searchInput.addEventListener("keyup", function(e) {
  // keyCode 13 is the "Enter" key
  if (e.keyCode === 13) {
    // Calls search API
  }
});
```

## Search on type

Search on type or search autocomplete can be implemented by adding a search action to `value-changed` event. However, if the user types really fast it's going to put a heavy load on the server and search results could be irrelevant. It is a recommended practice to use either **debounce** or **throttle** to limit the times the application calls for expensive operations like API requests.

```js
var searchInput = document.querySelector("ef-search-field");
searchInput.addEventListener("value-changed", function (e) {
    debounce(search(e.detail.value), 1500) // debounce search() for 1.5 seconds
});
```
