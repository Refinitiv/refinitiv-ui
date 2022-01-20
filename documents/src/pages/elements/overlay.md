<!--
type: page
title: Overlay
location: ./elements/overlay
layout: default
-->

# Overlay
::
```javascript
::overlay::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/button?min';
halo('button');

const openButton = document.getElementById('open-overlay');
const overlay = document.getElementById('overlay');
openButton.addEventListener('tap', () => {
  overlay.opened = true;
});
```
```css
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
```
```html
<ef-overlay id="overlay" with-backdrop with-shadow opened>
  <h3>Hello!</h3>
  <p>Click grey area to close this overlay.</p>
</ef-overlay>
<section>
  <ef-button cta id="open-overlay">Open</ef-button>
</section>
```
::

`ef-overlay` is a base modal container for components. It helps create dialogs, tooltips, menus and other elements that should appear on top of the main application window. It is highly configurable, including positioning, attaching to elements, transition styles, backdrops and much more.

### Usage

* [Position against window](./elements/overlay#position-against-window)
* [Attach to target](./elements/overlay#attach-to-target)
* [Position against target](./elements/overlay#position-against-target)
* [Position strategy](./elements/overlay#position-strategy)
* [Customize behavior](./elements/overlay#customize-behavior)

### Advanced usage
* [Advanced attributes](./elements/overlay#advanced-attributes)
* [Control focus behavior](./elements/overlay#control-focus-behavior)
* [Control focus behavior](./elements/overlay#control-focus-behavior)

---

<br>

### Using overlay

`ef-overlay` is typically initiated by a user action. The overlay can be opened by setting the `opened` property. Remove the property to close the overlay. In addition, the user can close the overlay by clicking outside overlay area or by pressing the ESC key.

```html
<ef-overlay id="overlay">Default</ef-overlay>
```

```javascript
const overlay = document.getElementById('overlay');
overlay.opened = true;
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

<br>

`ef-overlay` supports `x` and `y` attributes, which define an offset in pixels based on the position target. For instance, if `position-target="top left"`, offset is calculated from the top left corner. If `position-target="bottom right"`, offset is calculated from the bottom right corner.

::
```javascript
::overlay::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/button?min';
halo('button');

const openButton = document.getElementById('open-overlay');
const overlay = document.getElementById('overlay');
let idx = 0;
let x;
let y;

const positions = ['top', 'top left', 'left', 'bottom left', 'bottom', 'bottom right', 'right', 'top right', 'center'];

const setPositionTarget = () => {
  if (overlay.opened) {
    const position = positions[idx];
    overlay.positionTarget = position;

    x = position === 'center' || position === 'top' || position === 'bottom' ? 0 : 20;
    y = position === 'center' || position === 'left' || position === 'right' ? 0 : 20;

    overlay.innerHTML = position + '<br><br>x: ' + x + '<br>y: ' + y;
    overlay.x = x;
    overlay.y = y;
    overlay.fit();
    setTimeout(() => {
      idx += 1;
      if (idx >= positions.length) {
        idx = 0;
      }
      setPositionTarget();
    }, 1000);
  }
};

openButton.addEventListener('tap', () => {
  overlay.opened = true;
  setPositionTarget();
});
```
```css
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
```
```html
<ef-overlay id="overlay" with-shadow></ef-overlay>
<section>
  <ef-button cta id="open-overlay">Open</ef-button>
</section>
```
::

```html
<ef-overlay position-target="top right" x="20" y="40"></ef-overlay>
```

### Attach to target

Overlay can be attached to an element by setting the `positionTarget` property to an `HTMLElment` object.

::
```javascript
::overlay::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/text-field?min';
halo('text-field');

const target = document.getElementById('target');
const overlay = document.getElementById('overlay');

overlay.positionTarget = target;
target.addEventListener('value-changed', () => {
  if (target.value) {
    overlay.opened = true;
    overlay.innerHTML = target.value;
  }
  else {
    overlay.opened = false;
  }
});
```
```css
section {
  display:flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}
#overlay {
  min-width: 152px;
}
```
```html
<ef-overlay id="overlay" spacing no-autofocus with-shadow offset="4"></ef-overlay>
<section>
  <ef-text-field id="target" placeholder="Type to trigger overlay"></ef-text-field>
</section>
```
::

```javascript
const target = document.getElementById('target');
const overlay = document.getElementById('overlay');
overlay.positionTarget = target;
```

### Position against target

Position strategies are set using the `position` property. `ef-overlay` picks the best strategy to show maximum content without overlapping the target element. If none of the position strategies can be used, the overlay may overlap the target element or restrict the overlay size.

```javascript
overlay.position = ['bottom-end', 'bottom-start', 'right-end', 'center-middle'];
```

### Position strategy
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

::
```javascript
::overlay::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/button?min';
halo('button');

const openButton = document.getElementById('open-overlay');
const overlay = document.getElementById('overlay');
overlay.positionTarget = openButton;

let idx = 0;
const positions = [
  'bottom-end', 'bottom-middle', 'bottom-start',
  'right-start', 'right-middle', 'right-end',
  'top-start', 'top-middle', 'top-end',
  'left-end', 'left-middle', 'left-start',
  'center-end', 'center-middle', 'center-start'
];

const setPosition = () => {
  if (overlay.opened) {
    overlay.position = [positions[idx]];
    overlay.innerHTML = positions[idx];
    overlay.fit();
    setTimeout(() => {
      idx += 1;
      if (idx >= positions.length) {
        idx = 0;
      }
      setPosition();
    }, 1000);
  }
};

openButton.addEventListener('tap', () => {
  overlay.opened = true;
  setPosition();
});


```
```css
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
```
```html
<ef-overlay id="overlay" lock-position-target with-shadow offset="4"></ef-overlay>
<section>
  <ef-button cta id="open-overlay">Try It</ef-button>
</section>
```
::

Use `no-overlap` to ensure that the overlay never overlaps the target element. If there is not enough space, the overlay will restrict its size.

```html
<ef-overlay no-overlap></ef-overlay>
```

Use `offset` to add pixel offset from the target element.

```html
<ef-overlay offset="4"></ef-overlay>
```

### Customize behavior
Behavior of overlay is customized easily by using attributes, e.g. `with-shadow`, `full-screen`, `with-backdrop`, etc.
You can use `transition-style` to add a transition.

::
```javascript
::overlay::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/button?min';
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/select?min';
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/item?min';
halo('button');
halo('select');
halo('item');

const openButton = document.getElementById('open-overlay');
const transitionStyle = document.getElementById('transition');
const overlay = document.getElementById('overlay');

overlay.attachTarget = transitionStyle;
openButton.addEventListener('tap', () => {
  overlay.transitionStyle = transitionStyle.value;
  overlay.innerHTML = transitionStyle.value;
  overlay.opened = true;
});
```
```css
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
```
```html
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
```
::

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

<br>

### Advanced Usage

---
### Applying exotic CSS properties

`ef-overlay` calculates `x` and `y` coordinates based on screen dimension and position target (if any). An overlay using `position: fixed` is removed from the normal document flow and is positioned relative to the initial containing block established by the viewport. The positioning algorithm assumes that overlay, viewport and positionTarget are located within the same coordinate system.

However, there are exceptions when the positioning algorithm may behave differently, or may not work at all. According to [CSS Transforms Specs](https://www.w3.org/TR/css-transforms-1/#propdef-transform), if `transform`, `perspective` or `filter` properties are set to something other than `none`, then that ancestor behaves as the containing block. In addition, if the `zoom` property is set on anything other than the `html` or `body` tag, then the coordinate system will be different for different parts of the document, and the overlay may not be positioned correctly.

While the above is true for most modern browsers, the actual implementation may differ between browsers and versions.

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

To create a modal overlay, use the `no-cancel-on-outside-click`, `no-cancel-on-esc-key`, and `with-backdrop` attributes together.

```html
<ef-overlay no-cancel-on-outside-click no-cancel-on-esc-key with-backdrop></ef-overlay>
```

By default `ef-overlay` automatically sets *z-index=103*. If there are other absolutely positioned elements not controlled by the Element Framework, you can override the initial value by setting the `z-index` attribute.

```html
<ef-overlay z-index="1000"></ef-overlay>
```

By default `ef-overlay` locks document level interaction. This allows only the content inside the overlay to be scrollable and clickable. To change this behavior, set `no-interaction-lock`.

```html
<ef-overlay no-interaction-lock></ef-overlay>
```

If the developer needs to keep multiple elements interactive, then the `interactiveElements` property is used.

```javascript
overlay.interactiveElements = [
  htmlElement1,
  htmlElement2
];
```

### Control focus behavior

`ef-overlay` controls the tabbing and focus behavior. When the overlay is opened, only elements inside the overlay can be tabbed through. In addition, the overlay puts the focus on itself when opened.

Use `no-autofocus` to stop the overlay from focusing on its content when opened.

```html
<ef-overlay no-autofocus></ef-overlay>
```

When the overlay is attached to a position target element, the user can still interact with the target element. Use `lock-position-target` to change this default behavior.

```html
<ef-overlay lock-position-target></ef-overlay>
```

When the overlay is open, only the elements inside the overlay can be tabbed through. You can change the default by setting the `focusBoundary` property.

In the example below, the focus boundary is kept within *custom-element*. Even when the overlay is open, the user is still able to focus and tab on *ef-text-field*.

```html
<custom-element id="customElement">
  <ef-text-field id="input"></ef-text-field>
  <ef-overlay id="overlay" no-autofocus></ef-overlay>
</custom-element>
```

```javascript
const customElement = document.getElementById('customElement');
const input = document.getElementById('input');
const overlay = document.getElementById('overlay');

overlay.positionTarget = input;
overlay.focusBoundary = customElement;
```

## Accessibility
::a11y-intro::

The Overlay component is assigned `role="dialog"` and has property of `aria-labelledby`, `aria-describedby` and `aria-modal`.

Focus is automatically directed to the modal dialog when it appears. When the component is active, focus is restricted to the dialog and returned to the triggering button when dismissed. 

::a11y-end::
