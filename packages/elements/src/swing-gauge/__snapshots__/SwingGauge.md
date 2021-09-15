# `swing-gauge/SwingGauge`

## `Test Default Structure`

####   `Default gauge correct structure`

```html
<div part="canvas-container">
  <ef-canvas part="canvas">
  </ef-canvas>
  <div
    part="primary-container"
    style="width: 50px; left: -50px; bottom: 5px;"
  >
    <ef-label
      max-line="1"
      part="primary-value"
      style=""
    >
      0.00%
    </ef-label>
  </div>
  <div
    part="secondary-container"
    style="width: 50px; left: 0px; bottom: 5px;"
  >
    <ef-label
      max-line="1"
      part="secondary-value"
      style=""
    >
      0.00%
    </ef-label>
  </div>
</div>

```

####   `Correct structure`

```html
<canvas id="canvas">
</canvas>
```

