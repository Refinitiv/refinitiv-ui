# `tab-bar/Template`

#### `DOM structure is correct`

```html
<ef-button
  aria-hidden="true"
  empty=""
  icon="left"
  part="left-btn"
  role="button"
  tabindex="-1"
  textpos="after"
>
</ef-button>
<div part="content">
  <slot>
  </slot>
</div>
<ef-button
  aria-hidden="true"
  empty=""
  icon="right"
  part="right-btn"
  role="button"
  tabindex="-1"
  textpos="after"
>
</ef-button>

```

