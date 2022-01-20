<!--
type: page
title: Canvas
location: ./elements/canvas
layout: default
-->

# Canvas

::
```javascript
::canvas::

const canvas = document.querySelector('ef-canvas');

let x;
let y;
let tShift;
let amplitude;
let frequency;
let tStart = performance.now();
let frameId;

const loop = (t) => {

  cancelAnimationFrame(frameId);

  const ctx = canvas.getContext('2d');
  const style = getComputedStyle(canvas);

  tShift = (t - tStart) / 1000;
  amplitude = canvas.height * 0.8;
  frequency = 15 / canvas.width;
  frequency = frequency < 0.02 ? 0.02 : frequency > 0.03 ? 0.03 : frequency;
  ctx.lineWidth = 7;
  ctx.lineJoin = 'round';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.strokeStyle = 'hsl(' + (tShift + 2) * 10 + ', 100%, 50%)';
  for (x = -ctx.lineWidth; x < canvas.width + ctx.lineWidth * 2; x++) {
    y = (Math.sin(x * frequency + tShift) * amplitude / 2
        + canvas.height / 2 * 0.8) + canvas.height * 0.1; // 10% offset
    if (x === -ctx.lineWidth) {
      ctx.moveTo(x, x % 2 ? canvas.height : y);
    }
    ctx.lineTo(x, y);
  }
  ctx.stroke();

  ctx.fillStyle = style.getPropertyValue('color');
  ctx.font = style.getPropertyValue('font-size') + ' ' + style.getPropertyValue('font-family');
  ctx.fillText(canvas.tagName, canvas.width / 2 - ctx.measureText(canvas.tagName).width / 2, canvas.height / 2 + 30);

  frameId = window.requestAnimationFrame(loop);
}

canvas.addEventListener('resize', () => {
  loop(performance.now());
});
```
```css
ef-canvas {
  height: 200px;
  width: 100%;
  font-size: 60px;
}
```
```html
<ef-canvas></ef-canvas>
```
::

### Usage

`ef-canvas` works like the normal `HTML5 Canvas` element. To use it, you must first get its context.

!> Unlike the normal canvas, `ef-canvas` only supports `CanvasRenderingContext2D`, and therefore instantly provides a context object for you to use.

```html
<ef-canvas></ef-canvas>
```
```javascript
const canvas = document.querySelector('ef-canvas');
const ctx = canvas.ctx || canvas.context || canvas.getContext('2d'); // All valid

const draw = () => {
  ctx.fillStyle = '#888';
  ctx.fillRect(10, 10, 100, 100);
}

// Draw on resize
canvas.addEventListener('resize', draw);
```

### Styling

`ef-canvas` starts out like any other block element, in that it fills its container width and has a default height of `0px`. In order to be able to see anything, we must set its size. To do this, we just use CSS.

@> There is no need for setting the `width` and `height` attributes on the element*.

```css
ef-canvas {
  width: 600px;
  height: 250px;
}
```

### Animation loop

`ef-canvas` provides an automatic animation loop. This loop can either be enabled constantly or only when the canvas needs to be modified/animated.

To use the animation loop, just set the `autoloop` attribute and listen to the `frame` event.

```html
<ef-canvas autoloop></ef-canvas>
```
```javascript
  const canvas = document.querySelector('ef-canvas');
  const ctx = canvas.ctx || canvas.context || canvas.getContext('2d'); // All valid

  let x;
  let y;
  let factor;

  const draw = (e) => {

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Do some drawing
    factor = e.detail.timestamp / 100 % 100 / 100;
    x = factor * canvas.width - 100 + 100 * factor;
    y = canvas.height / 2;
    ctx.fillStyle = '#888';
    ctx.fillRect(x, y - 50, 100, 100);

  }

  // Draw on every animation frame
  canvas.addEventListener('frame', draw);
```

## Accessibility
::a11y-intro::

The Canvas component has a neutral role. Canvas includes functionality to pause, stop or hide animated content. 

::a11y-end::
