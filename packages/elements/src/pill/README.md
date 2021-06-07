# Pill

```live(preview)
<ef-pill>Default</ef-pill>
<ef-pill toggles>Toggles</ef-pill>
<ef-pill clears>Clear</ef-pill>
```

`ef-pill` is a small button style component which is used to show one or multiple selected items. It is nearly always used to visualize multiple item selections inside UI components.

### Basic usage
You can show pill with text inside.

```live
<ef-pill>Banana</ef-pill>
<ef-pill>Raspberry</ef-pill>
<ef-pill>Mango</ef-pill>
```

```html
<ef-pill>Banana</ef-pill>
<ef-pill>Raspberry</ef-pill>
<ef-pill>Mango</ef-pill>
```

### Toggle pills
Toggle pills are used to switch between two states. To create a toggle pills, add `toggles` attribute.

```live
<ef-pill toggles>Toggles</ef-pill>
<ef-pill toggles active>Active Toggles</ef-pill>
```

```html
<ef-pill toggles>Toggles</ef-pill>
<ef-pill toggles active>Active Toggles</ef-pill>
```

### Pill with clear button
Pill can show a clear button, or a small cross icon by adding `clears` attribute. You can add an event listener for when the clear button is clicked.

```live
<ef-pill>Default</ef-pill>
<ef-pill clears>Clears Pill</ef-pill>
```

```html
<ef-pill>Default</ef-pill>
<ef-pill clears>Clears Pill</ef-pill>
```

### Events
To get notification when toggle pill state changes, you can add `click` event listener to the pill and check the state from `active` property.

```live
  <style>
  .container {
    display: inline-flex;
    align-items: center;
  }
  #text {
    padding-left: 20px;
  }
</style>
<div class="container">
  <ef-pill id="Banana">Banana</ef-pill>
  <ef-pill id="Raspberry">Raspberry</ef-pill>
  <ef-pill id="Mango">Mango</ef-pill>
  <span id="text"></span>
</div>
<script>
  var elementsArray = document.querySelectorAll('ef-pill');
  for (var i=0; i < elementsArray.length; i++) {
    elementsArray[i].addEventListener('click', function (e) {
      document.getElementById('text').textContent = e.target.id + ' is clicked!';
    });
  };
</script>
```

```html
<ef-pill id="Banana">Banana</ef-pill>
<ef-pill id="Raspberry">Raspberry</ef-pill>
<ef-pill id="Mango">Mango</ef-pill>
```

```js
var elementsArray = document.querySelectorAll('ef-pill');
for (var i=0; i < elementsArray.length; i++) {
  elementsArray[i].addEventListener('click', function (e) {
    document.getElementById('text').textContent = e.target.id + ' is clicked!';
  });
};
```

