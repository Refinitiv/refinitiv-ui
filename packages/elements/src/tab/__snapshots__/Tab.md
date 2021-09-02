# `tab/Tab`

## `DOM Structure`

####   `DOM structure is correct`

```html
<div part="label-container">
  <slot>
  </slot>
</div>

```

####   `DOM structure with label is correct`

```html
<div part="label-container">
  <ef-label part="label">
    Home
  </ef-label>
  <slot>
  </slot>
</div>

```

####   `DOM structure with sub label is correct`

```html
<div part="label-container">
  <ef-label part="label">
    Home
  </ef-label>
  <ef-label part="sub-label">
    Secondary Info
  </ef-label>
  <slot>
  </slot>
</div>

```

####   `DOM structure with slotted content is correct`

```html
<div part="label-container">
  <slot>
  </slot>
</div>

```

####   `DOM structure with icon is correct`

```html
<ef-icon
  icon="home"
  part="icon"
>
</ef-icon>
<div part="label-container">
  <slot>
  </slot>
</div>

```

####   `DOM structure with clear button is correct`

```html
<div part="label-container">
  <slot>
  </slot>
</div>
<div part="close-container">
  <ef-icon
    icon="cross"
    part="close"
  >
  </ef-icon>
</div>

```

