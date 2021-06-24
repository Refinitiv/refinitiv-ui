# `Heatmap`

## `DOM Structure`

####   `DOM structure is correct`

```html
<div id="container">
  <div id="canvas-container">
    <ef-canvas part="canvas">
    </ef-canvas>
  </div>
</div>

```

####   `DOM structure with tooltip config is correct`

```html
<div id="container">
  <div id="y-axis-container">
    <div part="cross-box">
    </div>
    <div part="y-axis">
    </div>
  </div>
  <div id="canvas-container">
    <div part="x-axis">
    </div>
    <ef-canvas part="canvas">
    </ef-canvas>
    <div id="tooltip-overlay">
    </div>
  </div>
</div>
<ef-tooltip>
</ef-tooltip>

```

####   `DOM structure with axes config is correct`

```html
<div id="container">
  <div id="y-axis-container">
    <div part="cross-box">
    </div>
    <div part="y-axis">
    </div>
  </div>
  <div id="canvas-container">
    <div part="x-axis">
    </div>
    <ef-canvas part="canvas">
    </ef-canvas>
  </div>
</div>

```

