# `select/Template`

## `Template Parts`

####   `Empty DOM has all required parts`

```html
<div
  aria-controls="menu"
  aria-expanded="false"
  aria-haspopup="listbox"
  aria-invalid="false"
  aria-required="false"
  id="box"
  role="combobox"
  tabindex="0"
>
  <div id="text">
    <div part="placeholder">
    </div>
  </div>
  <ef-icon
    aria-hidden="true"
    icon="down"
    part="icon"
  >
  </ef-icon>
</div>
<div id="trigger">
</div>
<div>
  <slot>
  </slot>
</div>

```

####   `Placeholder is rendered`

```html
<div
  aria-controls="menu"
  aria-expanded="false"
  aria-haspopup="listbox"
  aria-invalid="false"
  aria-required="false"
  id="box"
  placeholder="Placeholder"
  role="combobox"
  tabindex="0"
>
  <div id="text">
    <div part="placeholder">
      Placeholder
    </div>
  </div>
  <ef-icon
    aria-hidden="true"
    icon="down"
    part="icon"
  >
  </ef-icon>
</div>
<div id="trigger">
</div>
<div>
  <slot>
  </slot>
</div>

```

```html
<div
  aria-controls="menu"
  aria-expanded="false"
  aria-haspopup="listbox"
  aria-invalid="false"
  aria-required="false"
  id="box"
  placeholder="New Placeholder"
  role="combobox"
  tabindex="0"
>
  <div id="text">
    <div part="placeholder">
      New Placeholder
    </div>
  </div>
  <ef-icon
    aria-hidden="true"
    icon="down"
    part="icon"
  >
  </ef-icon>
</div>
<div id="trigger">
</div>
<div>
  <slot>
  </slot>
</div>

```

```html
<div
  aria-controls="menu"
  aria-expanded="false"
  aria-haspopup="listbox"
  aria-invalid="false"
  aria-required="false"
  id="box"
  role="combobox"
  tabindex="0"
>
  <div id="text">
    <div part="placeholder">
    </div>
  </div>
  <ef-icon
    aria-hidden="true"
    icon="down"
    part="icon"
  >
  </ef-icon>
</div>
<div id="trigger">
</div>
<div>
  <slot>
  </slot>
</div>

```

####   `Lazy Render: options`

```html
<div
  aria-controls="menu"
  aria-expanded="false"
  aria-haspopup="listbox"
  aria-invalid="false"
  aria-required="false"
  id="box"
  role="combobox"
  tabindex="0"
>
  <div id="text">
    <div part="placeholder">
    </div>
  </div>
  <ef-icon
    aria-hidden="true"
    icon="down"
    part="icon"
  >
  </ef-icon>
</div>
<div id="trigger">
</div>
<div>
  <slot>
  </slot>
</div>

```

```html
<div
  aria-controls="menu"
  aria-expanded="true"
  aria-haspopup="listbox"
  aria-invalid="false"
  aria-required="false"
  id="box"
  role="combobox"
  tabindex="0"
>
  <div id="text">
    <div part="placeholder">
    </div>
  </div>
  <ef-icon
    aria-hidden="true"
    icon="down"
    part="icon"
  >
  </ef-icon>
</div>
<div id="trigger">
</div>
<ef-overlay-viewport>
</ef-overlay-viewport>
<ef-overlay
  first-resize-done=""
  focused="visible"
  id="menu"
  lock-position-target=""
  opened=""
  part="list"
  role="listbox"
  tabindex="-1"
  with-shadow=""
>
  <slot>
  </slot>
</ef-overlay>

```

```html
<div
  aria-controls="menu"
  aria-expanded="false"
  aria-haspopup="listbox"
  aria-invalid="false"
  aria-required="false"
  id="box"
  role="combobox"
  tabindex="0"
>
  <div id="text">
    <div part="placeholder">
    </div>
  </div>
  <ef-icon
    aria-hidden="true"
    icon="down"
    part="icon"
  >
  </ef-icon>
</div>
<div id="trigger">
</div>
<ef-overlay
  focused="visible"
  id="menu"
  lock-position-target=""
  part="list"
  role="listbox"
  tabindex="-1"
  with-shadow=""
>
  <slot>
  </slot>
</ef-overlay>

```

####   `Lazy Render: data`

```html
<div
  aria-controls="menu"
  aria-expanded="false"
  aria-haspopup="listbox"
  aria-invalid="false"
  aria-required="false"
  id="box"
  role="combobox"
  tabindex="0"
>
  <div id="text">
    <div part="placeholder">
    </div>
  </div>
  <ef-icon
    aria-hidden="true"
    icon="down"
    part="icon"
  >
  </ef-icon>
</div>
<div id="trigger">
</div>
<div>
  <slot>
  </slot>
</div>

```

```html
<div
  aria-controls="menu"
  aria-expanded="true"
  aria-haspopup="listbox"
  aria-invalid="false"
  aria-required="false"
  id="box"
  role="combobox"
  tabindex="0"
>
  <div id="text">
    <div part="placeholder">
    </div>
  </div>
  <ef-icon
    aria-hidden="true"
    icon="down"
    part="icon"
  >
  </ef-icon>
</div>
<div id="trigger">
</div>
<ef-overlay-viewport>
</ef-overlay-viewport>
<ef-overlay
  first-resize-done=""
  focused="visible"
  id="menu"
  lock-position-target=""
  opened=""
  part="list"
  role="listbox"
  tabindex="-1"
  with-shadow=""
>
  <ef-item
    aria-selected="false"
    part="item"
    role="presentation"
    tabindex="-1"
    type="header"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="option"
    tabindex="0"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="option"
    tabindex="0"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="presentation"
    tabindex="-1"
    type="divider"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="option"
    tabindex="0"
  >
  </ef-item>
</ef-overlay>

```

```html
<div
  aria-controls="menu"
  aria-expanded="false"
  aria-haspopup="listbox"
  aria-invalid="false"
  aria-required="false"
  id="box"
  role="combobox"
  tabindex="0"
>
  <div id="text">
    <div part="placeholder">
    </div>
  </div>
  <ef-icon
    aria-hidden="true"
    icon="down"
    part="icon"
  >
  </ef-icon>
</div>
<div id="trigger">
</div>
<ef-overlay
  focused="visible"
  id="menu"
  lock-position-target=""
  part="list"
  role="listbox"
  tabindex="-1"
  with-shadow=""
>
  <ef-item
    aria-selected="false"
    part="item"
    role="presentation"
    tabindex="-1"
    type="header"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="option"
    tabindex="0"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="option"
    tabindex="0"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="presentation"
    tabindex="-1"
    type="divider"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="option"
    tabindex="0"
  >
  </ef-item>
</ef-overlay>

```

####   `Data is reflected to render`

```html
<div
  aria-controls="menu"
  aria-expanded="true"
  aria-haspopup="listbox"
  aria-invalid="false"
  aria-required="false"
  id="box"
  role="combobox"
  tabindex="0"
>
  <div id="text">
    <div part="placeholder">
    </div>
  </div>
  <ef-icon
    aria-hidden="true"
    icon="down"
    part="icon"
  >
  </ef-icon>
</div>
<div id="trigger">
</div>
<ef-overlay-viewport>
</ef-overlay-viewport>
<ef-overlay
  first-resize-done=""
  focused="visible"
  id="menu"
  lock-position-target=""
  opened=""
  part="list"
  role="listbox"
  tabindex="-1"
  with-shadow=""
>
  <ef-item
    aria-selected="false"
    part="item"
    role="presentation"
    tabindex="-1"
    type="header"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="option"
    tabindex="0"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="option"
    tabindex="0"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="presentation"
    tabindex="-1"
    type="divider"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="option"
    tabindex="0"
  >
  </ef-item>
</ef-overlay>

```

```html
<div
  aria-controls="menu"
  aria-expanded="true"
  aria-haspopup="listbox"
  aria-invalid="false"
  aria-required="false"
  id="box"
  role="combobox"
  tabindex="0"
>
  <div id="text">
    <div part="placeholder">
    </div>
  </div>
  <ef-icon
    aria-hidden="true"
    icon="down"
    part="icon"
  >
  </ef-icon>
</div>
<div id="trigger">
</div>
<ef-overlay-viewport>
</ef-overlay-viewport>
<ef-overlay
  first-resize-done=""
  focused="visible"
  id="menu"
  lock-position-target=""
  opened=""
  part="list"
  role="listbox"
  tabindex="-1"
  with-shadow=""
>
  <ef-item
    aria-selected="false"
    part="item"
    role="option"
    tabindex="0"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="presentation"
    tabindex="-1"
    type="divider"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="option"
    tabindex="0"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="option"
    tabindex="0"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="presentation"
    tabindex="-1"
    type="header"
  >
  </ef-item>
</ef-overlay>

```

```html
<div
  aria-controls="menu"
  aria-expanded="true"
  aria-haspopup="listbox"
  aria-invalid="false"
  aria-required="false"
  id="box"
  role="combobox"
  tabindex="0"
>
  <div id="text">
    <div part="placeholder">
    </div>
  </div>
  <ef-icon
    aria-hidden="true"
    icon="down"
    part="icon"
  >
  </ef-icon>
</div>
<div id="trigger">
</div>
<ef-overlay-viewport>
</ef-overlay-viewport>
<ef-overlay
  first-resize-done=""
  focused="visible"
  id="menu"
  lock-position-target=""
  opened=""
  part="list"
  role="listbox"
  tabindex="-1"
  with-shadow=""
>
  <ef-item
    aria-selected="false"
    part="item"
    role="option"
    tabindex="0"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="presentation"
    tabindex="-1"
    type="divider"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="option"
    tabindex="0"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="option"
    tabindex="0"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="presentation"
    tabindex="-1"
    type="header"
  >
  </ef-item>
</ef-overlay>

```

```html
<div
  aria-controls="menu"
  aria-expanded="true"
  aria-haspopup="listbox"
  aria-invalid="false"
  aria-required="false"
  id="box"
  role="combobox"
  tabindex="0"
>
  <div id="text">
    <div part="placeholder">
    </div>
  </div>
  <ef-icon
    aria-hidden="true"
    icon="down"
    part="icon"
  >
  </ef-icon>
</div>
<div id="trigger">
</div>
<ef-overlay-viewport>
</ef-overlay-viewport>
<ef-overlay
  first-resize-done=""
  focused="visible"
  id="menu"
  lock-position-target=""
  opened=""
  part="list"
  role="listbox"
  tabindex="-1"
  with-shadow=""
>
  <slot>
  </slot>
</ef-overlay>

```

