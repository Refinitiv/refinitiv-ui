# `dialog/Dialog`

#### `Should renders DOM structure correctly`

```html
<ef-header
  drag-handle=""
  level="2"
  part="header"
>
  Dialog
  <ef-icon
    aria-hidden="true"
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

