# Toggle

```live(preview)
  <style>
    .container {
      max-width: 200px;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-direction: column;
    }
    .item {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .label {
      margin-right: 2em;
    }
    ef-toggle {
      height: 20px;
      width: 36px;
    }
  </style>
  <div class="container">
    <p class="item">
      <span class="label">WiFi</span><ef-toggle></ef-toggle>
    </p>
    <p class="item">
      <span class="label">Bluetooth</span><ef-toggle checked></ef-toggle>
    </p>
    <p class="item">
      <span class="label">Do not disturb</span><ef-toggle></ef-toggle>
    </p>
    <p class="item">
      <span class="label" disabled>Airplane mode</span><ef-toggle></ef-toggle>
    </p>
  </div>
```

`ef-toggle` is a form control element that can toggle between two states.

## Using Toggle

Toggle can switch between 2 states by setting attribute/property `checked` or by tapping.

```live
  <p><ef-toggle></ef-toggle></p>
  <p><ef-toggle checked></ef-toggle></p>
```

```html
  <ef-toggle></ef-toggle>
  <ef-toggle checked></ef-toggle>
```

## Labels
Toggle provides the `label` and `checked-label` attributes to set the property and show the label inside the toggle by `checked` states.

```live
  <ef-toggle label="OFF" checked-label="ON"></ef-toggle>
```

```html
  <ef-toggle label="OFF" checked-label="ON"></ef-toggle>
```

## Events

Toggle dispatches `checked-changed` whenever the `checked` value changes due to user interaction.

```live
  <div style="display: flex; align-items: center;">
    <ef-toggle id="toggle"></ef-toggle><div style="margin-left: 1em;">Switch <span id="text"></span></div>
  </div>
  <script>
    var text = document.getElementById('text');
    var toggle = document.getElementById('toggle');

    text.innerHTML = 'OFF';

    toggle.addEventListener('checked-changed', function (e) {
      text.innerHTML = e.target.checked ? 'ON' : 'OFF';
    });
  </script>
```

```html
  <div>
    <ef-toggle id="toggle"></ef-toggle>
    <div>Switch <span id="text"></span></div>
  </div>
```

```js
  var text = document.getElementById('text');
  var toggle = document.getElementById('toggle');

  text.innerHTML = 'OFF';

  toggle.addEventListener('checked-changed', function (e) {
    text.innerHTML = e.target.checked ? 'ON' : 'OFF';
  });
```
