# `color-picker/ColorPicker`

## `DOM structure`

####   `DOM structure is correct`

```html
<div
  aria-label=""
  aria-live="polite"
  part="aria-selection"
  role="status"
>
</div>
<div
  part="color-item"
  style="background-color:#001EFF;"
>
</div>

```

####   `DOM structure is correct when opened`

```html
<div
  aria-label=""
  aria-live="polite"
  part="aria-selection"
  role="status"
>
</div>
<div part="color-item">
</div>
<ef-overlay-viewport>
</ef-overlay-viewport>
<ef-color-dialog
  aria-modal="true"
  draggable=""
  offset="4"
  opened=""
  role="dialog"
  tabindex="-1"
  with-shadow=""
>
</ef-color-dialog>

```

