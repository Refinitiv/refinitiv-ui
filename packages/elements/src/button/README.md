# Button

```live(preview)
<ef-button>Button</ef-button>
<ef-button cta >Button</ef-button>
<ef-button disabled>Disabled</ef-button>
<ef-button toggles active>Toggle</ef-button>
<ef-button icon="tick">Button</ef-button>
<ef-button icon="tick" textpos="before">Button</ef-button>
<ef-button icon="tick"></ef-button>
<ef-button icon="tick" transparent></ef-button>
```

Use `ef-button` for actions in forms, dialogs, and more with support for different states and styles.

### Basic usage
`ef-button` can be used similarly to `button`. Styling and sizing are managed by theme but can be customized by using CSS.

```live
<style>
  .large {
    height: 60px;
    min-width: 140px;
    font-size: 140%;
  }
</style>
<ef-button>Default</ef-button>
<ef-button class="large">Large</ef-button>
```

```css
.large {
  height: 33px;
  min-width: 100px;
  font-size: 140%;
}
```
```html
<ef-button>Default</ef-button>
<ef-button class="large">Large</ef-button>
```

### Change styles and types
 `ef-button` provides various styles to use for different scenarios, for example, call-to-action, disabled, toggles. To use a different style, add the attribute to the `ef-button`.

```live
<ef-button>Button</ef-button>
<ef-button disabled>Button</ef-button>
<ef-button cta>OK</ef-button>
<ef-button cta disabled>OK</ef-button>
<ef-button toggles>Toggle button</ef-button>
```

```html
<ef-button>Button</ef-button>
<ef-button disabled>Button</ef-button>
<ef-button cta>OK</ef-button>
<ef-button cta disabled>OK</ef-button>
<ef-button toggles>Toggle button</ef-button>
```

### Inline icon
To show icon inside `ef-button`, use the attribute `icon`. Lists of supported icons depends on the theme and can be seen from the icons page. A piece of text can be configured to display before or after the icon by using the `textpos` attribute.

```live
<ef-button icon="tick"></ef-button>
<ef-button icon="tick">Button</ef-button>
<ef-button icon="tick" textpos="before">Button</ef-button>
```

```html
<ef-button icon="tick"></ef-button>
<ef-button icon="tick">Button</ef-button>
<ef-button icon="tick" textpos="before">Button</ef-button>
```

### More contents in button
If button width needs to be fixed, and contents are more than one line, set `height: auto;` to show contents correctly inside the button.
```live
<style>
  .lines {
    height: auto;
    width: 180px;
  }
</style>
<ef-button icon="tick" class="lines">Fixed width 180px and more contents in button</ef-button>
```

```css
.lines {
  height: auto;
  width: 180px;
}
```
```html
<ef-button icon="tick" class="lines">Fixed width 180px and more contents in button</ef-button>
```

### Switching icon on mouse over
`ef-button` can display an icon for mouse hover by using `hover-icon` attribute.

```live
<ef-button icon="tick" hover-icon="cross"></ef-button>
<ef-button icon="cross" hover-icon="tick"></ef-button>
```

```html
<ef-button icon="tick" hover-icon="cross"></ef-button>
<ef-button icon="cross" hover-icon="tick"></ef-button>
```

### Handling click events on desktop and mobile

`ef-button` provides events that work on both desktop and mobile. Use `tap` to ensure that event will work on different platforms.

```live
<style>
  .container {
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
  }
  #text {
      padding-left: 10px;
  }
</style>
<div class="container">
  <ef-button id="button">Tap / Click Me</ef-button>
  <span id="text"></span>
</div>
<script>
  var btn = document.getElementById('button');
  btn.addEventListener('tap', function() {
    document.getElementById('text').textContent = 'Got event tap!';
  });
</script>
```

```html
<ef-button id="button">Click Me</ef-button>
```
```js
var btn = document.getElementById('button');
btn.addEventListener('tap', function () {
  document.getElementById('text').textContent = 'Clicked!';
});
```


