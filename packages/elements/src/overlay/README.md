# Overlay

```live(preview)
<style>
  section {
    display:flex;
    justify-content: center;
    align-items: center;
    height: 300px;
  }
  #overlay {
    height: 200px;
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
</style>
<ef-overlay id="overlay" with-backdrop with-shadow>
  <h3>Hello!</h3>
  <p>Click grey area to close this overlay.</p>
</ef-overlay>
<section>
  <ef-button cta id="open-overlay">Open</ef-button>
</section>
<script>
  var openButton = document.getElementById('open-overlay');
  var overlay = document.getElementById('overlay');
  openButton.addEventListener('click', function () {
    overlay.opened = true;
  });
</script>
```

`ef-overlay` is a base modal container for components. It helps create dialogs, tooltips, menus and other elements that should appear on top of the main application window. It is highly configurable, including positioning, attaching to elements, transition styles, backdrops and many others.

### Basic usage
[Using overlay](#using-overlay)
[Position against window](#position-against-window)
[Attach to target](#attach-to-target)
[Position against target](#position-against-target)
[Customize behavior](#customize-behavior)

### Advanced usage
[Advanced attributes](#advanced-attributes)
[Control focus behavior](#control-focus-behavior)

---

## Using overlay

`ef-overlay` is typically initiated by a user action. The overlay can be opened by setting the `opened` property. Remove the property to close the overlay. In addition, the user can close the overlay by clicking outside overlay area or by pressing ESC key.

```live
<style>
  section {
    display:flex;
    justify-content: center;
    align-items: center;
    height: 200px;
  }
  #overlay {
    height: 150px;
    width: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
<ef-overlay id="overlay">Default</ef-overlay>
<section>
  <ef-button cta id="open-overlay">Open</ef-button>
</section>
<script>
  var openButton = document.getElementById('open-overlay');
  var overlay = document.getElementById('overlay');
  openButton.addEventListener('click', function () {
    overlay.opened = true;
  });
</script>
```

```html
<ef-overlay id="overlay">Default</ef-overlay>

<!-- button to initiate the overlay -->
<ef-button cta id="open-overlay">Open</ef-button>
```

```js
var openButton = document.getElementById('open-overlay');
var overlay = document.getElementById('overlay');
openButton.addEventListener('click', function () {
  overlay.opened = true;
});
```

### Position against window

By default `ef-overlay` appears at the centre of the window. You can set `position-target` to change that behavior.

| Position Target    | Description                                                            |
| ------------------ | ---------------------------------------------------------------------- |
| `top`              | Top side of the screen (same as `top center` or `center top`)          |
| `top left`         | Top left corner of the screen (same as `left top`)                     |
| `top right`        | Top right corner of the screen (same as `right top`)                   |
| `right`            | Right side of the screen (same as `right center` or `center right`)    |
| `bottom`           | Bottom side of the screen (same as `bottom center` or `center bottom`) |
| `bottom left`      | Bottom left corner of the screen (same as `left bottom`)               |
| `bottom right`     | Bottom right corner of the screen (same as `right bottom`)             |
| `left`             | Left side of the screen (same as `left center` or `center left`)       |
| `center` (default) | Center of the screen (same as `center center`)                         |

`ef-overlay` supports `x` and `y` attributes, which define an offset in pixels based on the position target. For instance, if `position-target="top left"`, offset is calculated from the top left corner. If position `position-target="bottom right"` offset is calculated from the bottom right corner.

```live
<style>
  section {
    display:flex;
    justify-content: center;
    align-items: center;
    height: 300px;
  }
  #overlay {
    height: 100px;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
</style>
<ef-overlay id="overlay" with-shadow></ef-overlay>
<section>
  <ef-button cta id="open-overlay">Open</ef-button>
</section>
<script>
  var openButton = document.getElementById('open-overlay');
  var overlay = document.getElementById('overlay');
  var idx = 0;
  var x;
  var y;

  var positions = ['top', 'top left', 'left', 'bottom left', 'bottom', 'bottom right', 'right', 'top right', 'center'];

  var setPositionTarget = function () {
    if (overlay.opened) {
      var position = positions[idx];
      overlay.positionTarget = position;

      x = position === 'center' || position === 'top' || position === 'bottom' ? 0 : 20;
      y = position === 'center' || position === 'left' || position === 'right' ? 0 : 20; 

      overlay.innerHTML = position + '<br><br>x: ' + x + '<br>y: ' + y;
      overlay.x = x;
      overlay.y = y;
      overlay.fit();
      setTimeout(function () {
        idx += 1;
        if (idx >= positions.length) {
          idx = 0;
        }
        setPositionTarget();
      }, 1000);
    }
  };

  openButton.addEventListener('click', function () {
    overlay.opened = true;
    setPositionTarget();
  });
</script>
```

```html
<ef-overlay position-target="top right" x="20" y="40"></ef-overlay>
```

### Attach to target

Overlay can be attached to an element by setting `positionTarget` property to an `HTMLElment` object.

```live
<style>
  section {
    display:flex;
    justify-content: center;
    align-items: center;
    height: 200px;
  }
  #overlay {
    min-width: 152px;
  }
</style>
<ef-overlay id="overlay" spacing no-autofocus with-shadow offset="4"></ef-overlay>
<section>
  <ef-text-field id="target" placeholder="Type to trigger overlay"></ef-text-field>
</section>
<script>
  var target = document.getElementById('target');
  var overlay = document.getElementById('overlay');
  overlay.positionTarget = target;
  target.addEventListener('value-changed', function () {
    if (target.value) {
      overlay.opened = true;
      overlay.innerHTML = target.value;
    }
    else {
      overlay.opened = false;
    }
  });
</script>
```

```js
var target = document.getElementById('target');
var overlay = document.getElementById('overlay');
overlay.positionTarget = target;
```

### Position against target

Position strategies are set using `position` property. `ef-overlay` picks the best strategy to show maximum content without overlapping the target element. If none of the position strategies can be used, the overlay may overlap the target element or restrict overlay size.

``` javascript
overlay.position = ['bottom-end', 'bottom-start', 'right-end', 'center-middle'];
```

#### Position strategy
The first part defines *position*. The optional second part defines *align*. For instance: `bottom`, `top-start`, `right-middle`.

| Position | Description                                       |
| ---------| ------------------------------------------------- |
| `top`    | Above target (same as `top-start`)                |
| `right`  | After target (same as `right-middle`)             |
| `bottom` | Below target (same as `bottom-start`)             |
| `left`   | Before target (same as `left-middle`)             |
| `center` | At the center of target (same as `center-middle`) |

| Align    | Description                               |
| -------- | ----------------------------------------- |
| `start`  | Target is aligned at the start of overlay |
| `middle` | Target is aligned at the middle of overlay|
| `end`    | Target is aligned at the end of overlay   |

```live
<style>
  section {
    display:flex;
    justify-content: center;
    align-items: center;
    height: 300px;
  }
  #overlay {
    height: 100px;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
<ef-overlay id="overlay" lock-position-target with-shadow offset="4"></ef-overlay>
<section>
  <ef-button cta id="open-overlay">Open</ef-button>
</section>
<script>
  var openButton = document.getElementById('open-overlay');
  var overlay = document.getElementById('overlay');
  overlay.positionTarget = openButton;

  var idx = 0;
  var positions = [
    'bottom-end', 'bottom-middle', 'bottom-start',
    'right-start', 'right-middle', 'right-end',
    'top-start', 'top-middle', 'top-end',
    'left-end', 'left-middle', 'left-start',
    'center-end', 'center-middle', 'center-start'
  ];

  var setPosition = function () {
    if (overlay.opened) {
      overlay.position = [positions[idx]];
      overlay.innerHTML = positions[idx];
      overlay.fit();
      setTimeout(function () {
        idx += 1;
        if (idx >= positions.length) {
          idx = 0;
        }
        setPosition();
      }, 1000);
    }
  };

  openButton.addEventListener('click', function () {
    overlay.opened = true;
    setPosition();
  });
</script>
```

Use `no-overlap` to ensure that the overlay never overlaps the target element. If there is not enough space, the overlay will restrict its size.

```html
<ef-overlay no-overlap></ef-overlay>
```

Use `offset` to add pixel offset from the target element.

```html
<ef-overlay offset="4"></ef-overlay>
```

### Customize behavior

It is easy to customize overlay behavior. The styles are driven by theme.

```live
<style>
  section {
    display:flex;
    justify-content: center;
    align-items: center;
    height: 200px;
  }
  #configuration {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 20px;
    left: 20px;
  }
  #overlay {
    min-height: 150px;
    min-width: 150px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
</style>
<ef-overlay id="overlay" with-shadow spacing>
  <ef-button id="close-overlay">Close</ef-button>
</ef-overlay>
<section>
  <div id="configuration">
    <ef-checkbox ref="fullScreen">full-screen</ef-checkbox>
    <ef-checkbox ref="transparent">transparent</ef-checkbox>
    <ef-checkbox ref="withShadow" checked>with-shadow</ef-checkbox>
    <ef-checkbox ref="withBackdrop">with-backdrop</ef-checkbox>
    <ef-checkbox ref="spacing" checked>spacing</ef-checkbox>
  </div>
  <ef-button cta id="open-overlay">Open</ef-button>
</section>
<script>
  var openButton = document.getElementById('open-overlay');
  var overlay = document.getElementById('overlay');
  openButton.addEventListener('click', function () {
    overlay.opened = true;
  });
  document.getElementById('close-overlay').addEventListener('click', function () {
    overlay.opened = false;
  });
  var setCheckboxProperty = function (ch) {
    var set = function () {
      overlay[ch.getAttribute('ref')] = ch.checked;
    };
    ch.addEventListener('checked-changed', set);
  };
  document.querySelectorAll('ef-checkbox[ref]').forEach(setCheckboxProperty);
</script>
```

Use `full-screen` to make overlay full screen.

```html
<ef-overlay full-screen></ef-overlay>
```

Use `transparent` to make overlay background transparent.

```html
<ef-overlay transparent></ef-overlay>
```

Use `with-shadow` to show shadow for overlay.

```html
<ef-overlay with-shadow></ef-overlay>
```

Use `with-backdrop` to show backdrop when overlay is shown.

```html
<ef-overlay with-backdrop></ef-overlay>
```

Use `spacing` to add spacing inside overlay. Spacing is controlled by the theme.

```html
<ef-overlay spacing></ef-overlay>
```

Use `transition-style` to add transition.

```live
<style>
  section {
    display:flex;
    justify-content: center;
    align-items: center;
    height: 200px;
  }
  #overlay {
    height: 100px;
    width: 212px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
<ef-overlay id="overlay" with-shadow transition-style="zoom"></ef-overlay>
<section>
  <ef-select id="transition">
    <ef-item value="fade">fade</ef-item>
    <ef-item value="zoom" selected>zoom</ef-item>
    <ef-item value="slide">slide</ef-item>
    <ef-item value="slide-down">slide-down</ef-item>
    <ef-item value="slide-up">slide-up</ef-item>
    <ef-item value="slide-right">slide-right</ef-item>
    <ef-item value="slide-left">slide-left</ef-item>
    <ef-item value="slide-right-up">slide-right-up</ef-item>
    <ef-item value="slide-left-up">slide-left-up</ef-item>
    <ef-item value="slide-right-down">slide-right-down</ef-item>
    <ef-item value="slide-left-down">slide-left-down</ef-item>
  </ef-select>
  <ef-button cta id="open-overlay">Open</ef-button>
</section>
<script>
  var openButton = document.getElementById('open-overlay');
  var transitionStyle = document.getElementById('transition');
  var overlay = document.getElementById('overlay');
  overlay.attachTarget = transitionStyle;
  openButton.addEventListener('click', function () {
    overlay.transitionStyle = transitionStyle.value;
    overlay.innerHTML = transitionStyle.value;
    overlay.opened = true;
  });
</script>
```

```html
<ef-overlay transition-style="fade"></ef-overlay>
```

| Transition Styles | Description                                  |
| ----------------- | -------------------------------------------- |
| fade              | Fade overlay in                              |
| slide             | Slide overlay from center in                 |
| zoom              | Zoom overlay from center in                  |
| slide-down        | Slide down from top                          |
| slide-up          | Slide up from bottom                         |
| slide-right       | Slide in from right                          |
| slide-left        | Slide in from left                           |
| slide-right-down  | Slide down from the top left to bottom right |
| slide-right-up    | Slide up from the bottom left to top right   |
| slide-left-down   | Slide down from the top right to bottom left |
| slide-left-up     | Slide up from the bottom right to top left   |

## Advanced usage

### Applying exotic CSS properties

`ef-overlay` calculates `x` and `y` coordinates based on screen dimension and position target (if any). An overlay using `position: fixed` is removed from the normal document flow and is positioned relative to the initial containing block established by the viewport. The positioning algorithm assumes that overlay, viewport and positionTarget are located within the same coordinate system.

However, there are exceptions when positioning algorithm may behave differently or may not work at all. According to [CSS Transforms Specs](https://www.w3.org/TR/css-transforms-1/#propdef-transform), if `transform`, `perspective` or `filter` properties are set to something other than `none`, then that ancestor behaves as the containing block. In addition, if `zoom` property is set on anything other that `html` or `body` tag, then the coordinate system will be different for different parts of the document, and the overlay may not be positioned correctly.

While above is true for most modern browsers, the actual implementation may be different for browsers and versions.

Below is a brief summary of supported use cases.


|   | CSS Property | Status | Notes |
| - | ------------ | ------ | ----- |
| ✓ | zoom | Partial Support | Property is only supported on `html` and `body` elements. |
| ✓ | filter | Partial Support | Overlay position/size is relative to the _filter container_.<br/><br/>If filter is applied to `html` element, overlay size is not restricted by window size. |
| ✓ | transform:translate<br/>transform:translate3d<br/> | Partial Support | Overlay position/size is relative to the _transform container_.<br/><br/>If transform is applied to `html` element, overlay size is not restricted by window size.<br/><br/>Translating z-axis is not supported. |
| ✗ | transform:rotate<br/>transform:rotate3d | No Support | - |
| ✗ | transform:matrix<br/>transform:matrix3d | No Support | - |
| ✗ | transform:scale<br/>transform:scale3d | No Support | - |
| ✗ | transform:skew | No Support | - |
| ✗ | transform:perspective | No Support | - |
| ✗ | perspective | No Support | - |

### Advanced attributes

To create a modal overlay, use `no-cancel-on-outside-click`, `no-cancel-on-esc-key`, and `with-backdrop` attributes together.

```html
<ef-overlay no-cancel-on-outside-click no-cancel-on-esc-key with-backdrop></ef-overlay>
```

By default `ef-overlay` sets *z-index=103* automatically. If there are other absolutely positioned elements, which are not controlled by ELF, you can override the initial value by setting `z-index` attribute.

```html
<ef-overlay z-index="1000"></ef-overlay>
```

By default `ef-overlay` locks document level interaction. This allows only the content inside the overlay to be scrollable and clickable. To change the behavior set `no-interaction-lock`.

```html
<ef-overlay no-interaction-lock></ef-overlay>
```

If the developer needs to keep multiple elements interactive, then `interactiveElements` property is used.

``` javascript
overlay.interactiveElements = [
  htmlElement1,
  htmlElement2
];
```

### Control focus behavior

`ef-overlay` controls the tabbing and focus behavior. When the overlay is opened, only elements inside the overlay can be tabbed through. In addition, the overlay puts the focus on itself when opened.

Use `no-autofocus` to stop overlay focusing on its content when opened.

```html
<ef-overlay no-autofocus></ef-overlay>
```

When overlay is attached to position target element, the user can still interact with target element. Use `lock-position-target` to change default behavior.

```html
<ef-overlay lock-position-target></ef-overlay>
```

When the overlay is opened, only the elements inside the overlay can be tabbed through. You can change the default by setting `focusBoundary` property.

In the example below the focus boundary is kept within *custom-element*. Even when the overlay is opened, the user is still able to focus and tab on *ef-text-field*.

```html
<custom-element id="customElement">
  <ef-text-field id="input"></ef-text-field>
  <ef-overlay id="overlay" no-autofocus></ef-overlay>
</custom-element>
```

```js
var customElement = document.getElementById('customElement');
var input = document.getElementById('input');
var overlay = document.getElementById('overlay');

overlay.positionTarget = input;
overlay.focusBoundary = customElement;
```
