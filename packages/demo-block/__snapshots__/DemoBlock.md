# `DemoBlock`

## `DOM structure`

####   `DOM structure is correct`

```html
<div part="body">
  <slot>
  </slot>
</div>

```

####   `DOM structure with tags is correct`

```html
<div part="header">
  <div part="tags">
    <div part="tag">
      tag one
    </div>
    <div part="tag">
      tag two
    </div>
  </div>
</div>
<div part="body">
  <slot>
  </slot>
</div>

```

####   `DOM structure with header is correct`

```html
<div part="header">
  <div part="header-label">
    Header text
  </div>
</div>
<div part="body">
  <slot>
  </slot>
</div>

```

####   `DOM structure with layout is correct`

```html
<div part="body">
  <slot>
  </slot>
</div>

```

####   `DOM structure with custom height is correct`

```html
<div part="body">
  <slot>
  </slot>
</div>

```

