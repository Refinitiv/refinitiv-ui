# `dialog/Dialog`

#### `Should renders DOM structure correctly`

```html
<ef-header
  aria-level="2"
  drag-handle=""
  level="2"
  part="header"
  role="heading"
>
  Dialog
  <ef-icon
    aria-label="close dialog"
    icon="cross"
    part="close"
    slot="right"
  >
  </ef-icon>
</ef-header>
<ef-panel
  part="content"
  spacing=""
  transparent=""
>
  <slot>
  </slot>
</ef-panel>
<div part="footer">
  <slot name="footer">
    <div part="default-buttons">
      <ef-button
        cta=""
        part="default-button"
        role="button"
        textpos="after"
      >
        OK
      </ef-button>
      <ef-button
        part="default-button"
        role="button"
        textpos="after"
      >
        Cancel
      </ef-button>
    </div>
  </slot>
</div>

```

