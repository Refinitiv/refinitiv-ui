# `card/Card`

## `DOM structure`

####   `Basic DOM structure`

```html
<div part="header">
  <div part="header-body">
    <slot name="header">
    </slot>
  </div>
</div>
<div part="body">
  <slot>
  </slot>
</div>
<div part="footer">
  <div part="footer-body">
    <slot name="footer">
    </slot>
  </div>
</div>

```

####   `DOM structure with header and footer`

```html
<div part="header has-content">
  <div part="header-body">
    <slot name="header">
    </slot>
    <ef-label
      line-clamp="3"
      part="header-text"
    >
      Header
    </ef-label>
  </div>
</div>
<div part="body">
  <slot>
  </slot>
</div>
<div part="footer has-content">
  <div part="footer-body">
    <slot name="footer">
    </slot>
    <ef-label line-clamp="3">
      Footer
    </ef-label>
  </div>
</div>

```

####   `DOM structure with slotted content`

```html
<div part="header has-content">
  <div part="header-body">
    <slot name="header">
    </slot>
  </div>
</div>
<div part="body">
  <slot>
  </slot>
</div>
<div part="footer has-content">
  <div part="footer-body">
    <slot name="footer">
    </slot>
  </div>
</div>

```

####   `DOM structure with menu`

```html
<div part="header has-content">
  <div part="header-body">
    <slot name="header">
    </slot>
  </div>
  <ef-button
    aria-disabled="false"
    aria-readonly="false"
    empty=""
    icon="more"
    part="menu-button"
    tabindex="0"
    textpos="after"
    transparent=""
  >
  </ef-button>
  <ef-overlay-menu
    part="menu-popup"
    position="bottom-end"
    tabindex="-1"
    with-shadow=""
  >
  </ef-overlay-menu>
</div>
<div part="body">
  <slot>
  </slot>
</div>
<div part="footer">
  <div part="footer-body">
    <slot name="footer">
    </slot>
  </div>
</div>

```

```html
<div part="header">
  <div part="header-body">
    <slot name="header">
    </slot>
  </div>
</div>
<div part="body">
  <slot>
  </slot>
</div>
<div part="footer">
  <div part="footer-body">
    <slot name="footer">
    </slot>
  </div>
</div>

```

