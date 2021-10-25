# `slider/Slider`

## `Test Default Structure`

####   `DOM structure is correct`

```html
<div part="slider-wrapper">
  <div part="slider">
    <div
      id="trackWrapper"
      part="track-wrapper"
    >
      <div
        id="trackFill"
        part="track-fill"
        style="width:0%;"
      >
      </div>
      <div
        id="stepContainer"
        part="step-container"
        style="transform:translateX(-0.5%);"
      >
        <div
          id="steps"
          part="step"
          style="transform:translateX(0.5%);background-size:1% 100%;"
        >
        </div>
      </div>
    </div>
    <div
      id="thumbContainer"
      name="value"
      part="thumb-container"
      style="left:0%;"
    >
      <div part="pin">
        <span
          id="pinMarker"
          part="pin-value-marker"
        >
          0
        </span>
      </div>
      <div
        draggable="true"
        id="thumb"
        part="thumb"
      >
      </div>
    </div>
  </div>
</div>

```

