# `Dialog`

#### `Should renders DOM structure correctly`

```html
<ef-header
  drag-handle=""
  level="2"
  part="header"
>
  Dialog
  <ef-icon
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
        aria-disabled="false"
        aria-readonly="false"
        cta=""
        part="default-button"
        textpos="after"
      >
        OK
      </ef-button>
      <ef-button
        aria-disabled="false"
        aria-readonly="false"
        part="default-button"
        textpos="after"
      >
        Cancel
      </ef-button>
    </div>
  </slot>
</div>

```

