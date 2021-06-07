# Canvas

```live(preview)
<ef-canvas></ef-canvas>
<style>
ef-canvas {
  height: 200px;
  width: 100%;
  font-size: 60px;
}
</style>
<script>
var canvas = document.querySelector('ef-canvas');

var x;
var y;
var tShift;
var amplitude;
var frequency;
var tStart = performance.now();
var frameId;

var loop = (t) => {
  
  cancelAnimationFrame(frameId);

  var ctx = canvas.getContext('2d');
  var style = getComputedStyle(canvas);

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

canvas.addEventListener('resize', function () {
  loop(performance.now());
});
</script>
```

## Styling

`ef-canvas` starts life like any other block element. This means that it fills its container width and has a height of `0px`.

In order to be able to see anything, we must set its size. To do this, we just use CSS.
***Note:*** *There is no need for setting the `width` and `height` attributes on the element*.

```
ef-canvas {
  width: 600px;
  height: 250px;
}
```

### Rendering

`ef-canvas` works like the normal `HTML5 Canvas` element does. To use it, you must first get its context.

Unlike the normal canvas, `ef-canvas` only supports the `CanvasRenderingContext2D` and therefore, instantly provides a context object for you to use.

### Basic example
```
<ef-canvas></ef-canvas>

<script type="text/javascript">

  var canvas = document.querySelector('ef-canvas');
  var ctx = canvas.ctx || canvas.context || canvas.getContext('2d'); // All valid

  var draw = function () {
    ctx.fillStyle = '#888';
    ctx.fillRect(10, 10, 100, 100);
  }

  // Draw on resize
  canvas.addEventListener('resize', draw);

</script>
```


### Animation loop

`ef-canvas` provides an automatic animation loop. This loop can either be enabled constantly, or only enabled when the canvas needs to be modified/animated.

To use it, just set the `autoloop` attribute and listen to the `frame` event.
```
<ef-canvas autoloop></ef-canvas>

<script type="text/javascript">

  var canvas = document.querySelector('ef-canvas');
  var ctx = canvas.ctx || canvas.context || canvas.getContext('2d'); // All valid

  var x;
  var y;
  var factor;

  var draw = function (e) {

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

</script>
```
