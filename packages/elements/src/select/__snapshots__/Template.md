# `select/Template`

## `Template Parts`

####   `Empty DOM has all required parts`

```html
<div id="box">
  <div id="text">
    <div part="placeholder">
    </div>
  </div>
  <ef-icon
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
<div id="box">
  <div id="text">
    <div part="placeholder">
      Placeholder
    </div>
  </div>
  <ef-icon
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
<div id="box">
  <div id="text">
    <div part="placeholder">
      New Placeholder
    </div>
  </div>
  <ef-icon
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
<div id="box">
  <div id="text">
    <div part="placeholder">
    </div>
  </div>
  <ef-icon
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
<div id="box">
  <div id="text">
    <div part="placeholder">
    </div>
  </div>
  <ef-icon
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
<div id="box">
  <div id="text">
    <div part="placeholder">
    </div>
  </div>
  <ef-icon
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
  tabindex="-1"
  with-shadow=""
>
  <slot>
  </slot>
</ef-overlay>

```

```html
<div id="box">
  <div id="text">
    <div part="placeholder">
    </div>
  </div>
  <ef-icon
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
  tabindex="-1"
  with-shadow=""
>
  <slot>
  </slot>
</ef-overlay>

```

####   `Lazy Render: data`

```html
<div id="box">
  <div id="text">
    <div part="placeholder">
    </div>
  </div>
  <ef-icon
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
<div id="box">
  <div id="text">
    <div part="placeholder">
    </div>
  </div>
  <ef-icon
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
  tabindex="-1"
  with-shadow=""
>
  <ef-item
    part="item"
    tabindex="-1"
    type="header"
  >
  </ef-item>
  <ef-item
    part="item"
    tabindex="0"
  >
  </ef-item>
  <ef-item
    part="item"
    tabindex="0"
  >
  </ef-item>
  <ef-item
    part="item"
    tabindex="-1"
    type="divider"
  >
  </ef-item>
  <ef-item
    part="item"
    tabindex="0"
  >
  </ef-item>
</ef-overlay>

```

```html
<div id="box">
  <div id="text">
    <div part="placeholder">
    </div>
  </div>
  <ef-icon
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
  tabindex="-1"
  with-shadow=""
>
  <ef-item
    part="item"
    tabindex="-1"
    type="header"
  >
  </ef-item>
  <ef-item
    part="item"
    tabindex="0"
  >
  </ef-item>
  <ef-item
    part="item"
    tabindex="0"
  >
  </ef-item>
  <ef-item
    part="item"
    tabindex="-1"
    type="divider"
  >
  </ef-item>
  <ef-item
    part="item"
    tabindex="0"
  >
  </ef-item>
</ef-overlay>

```

####   `Data is reflected to render`

```html
<div id="box">
  <div id="text">
    <div part="placeholder">
    </div>
  </div>
  <ef-icon
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
  tabindex="-1"
  with-shadow=""
>
  <ef-item
    part="item"
    tabindex="-1"
    type="header"
  >
  </ef-item>
  <ef-item
    part="item"
    tabindex="0"
  >
  </ef-item>
  <ef-item
    part="item"
    tabindex="0"
  >
  </ef-item>
  <ef-item
    part="item"
    tabindex="-1"
    type="divider"
  >
  </ef-item>
  <ef-item
    part="item"
    tabindex="0"
  >
  </ef-item>
</ef-overlay>

```

```html
<div id="box">
  <div id="text">
    <div part="placeholder">
    </div>
  </div>
  <ef-icon
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
  tabindex="-1"
  with-shadow=""
>
  <ef-item
    part="item"
    tabindex="0"
  >
  </ef-item>
  <ef-item
    part="item"
    tabindex="-1"
    type="divider"
  >
  </ef-item>
  <ef-item
    part="item"
    tabindex="0"
  >
  </ef-item>
  <ef-item
    part="item"
    tabindex="0"
  >
  </ef-item>
  <ef-item
    part="item"
    tabindex="-1"
    type="header"
  >
  </ef-item>
</ef-overlay>

```

```html
<div id="box">
  <div id="text">
    <div part="placeholder">
    </div>
  </div>
  <ef-icon
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
  tabindex="-1"
  with-shadow=""
>
  <ef-item
    part="item"
    tabindex="0"
  >
  </ef-item>
  <ef-item
    part="item"
    tabindex="-1"
    type="divider"
  >
  </ef-item>
  <ef-item
    part="item"
    tabindex="0"
  >
  </ef-item>
  <ef-item
    part="item"
    tabindex="0"
  >
  </ef-item>
  <ef-item
    part="item"
    tabindex="-1"
    type="header"
  >
  </ef-item>
</ef-overlay>

```

```html
<div id="box">
  <div id="text">
    <div part="placeholder">
    </div>
  </div>
  <ef-icon
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
  tabindex="-1"
  with-shadow=""
>
  <slot>
  </slot>
</ef-overlay>

```

