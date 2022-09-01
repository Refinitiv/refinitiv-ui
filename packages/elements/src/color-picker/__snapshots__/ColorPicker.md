# `color-picker/ColorPicker`

## `DOM structure`

####   `DOM structure is correct`

```html
<div
  part="color-item"
  style="background-color:#001EFF;"
>
</div>

```

####   `DOM structure is correct when opened`

```html
<div
  part="color-item"
  style="background-color:#001EFF;"
>
</div>
<ef-overlay-viewport>
</ef-overlay-viewport>
<ef-overlay-backdrop style="z-index: 103;">
</ef-overlay-backdrop>
<ef-color-dialog
  aria-modal="true"
  draggable=""
  offset="4"
  opened=""
  part="dialog"
  role="dialog"
  style="z-index: 103; pointer-events: auto;"
  tabindex="-1"
  with-shadow=""
>
</ef-color-dialog>

```

