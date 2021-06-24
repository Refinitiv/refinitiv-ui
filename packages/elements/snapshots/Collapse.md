# `Collapse`

## `Should Have Correct DOM`

####   `Label and DOM structure is correct`

```html
<ef-header
  level="3"
  part="header"
>
  <ef-icon
    icon="right"
    part="toggle"
    slot="left"
  >
  </ef-icon>
  <slot
    name="header-left"
    slot="left"
  >
  </slot>
  <slot
    name="header-right"
    slot="right"
  >
  </slot>
</ef-header>
<div part="content">
  <ef-panel transparent="">
    <slot>
    </slot>
  </ef-panel>
</div>

```

####   `Label and DOM structure is correct with spacing`

```html
<ef-header
  level="3"
  part="header"
>
  <ef-icon
    icon="right"
    part="toggle"
    slot="left"
  >
  </ef-icon>
  <slot
    name="header-left"
    slot="left"
  >
  </slot>
  <slot
    name="header-right"
    slot="right"
  >
  </slot>
</ef-header>
<div part="content">
  <ef-panel transparent="">
    <slot>
    </slot>
  </ef-panel>
</div>

```

####   `Label and DOM structure is correct with header`

```html
<ef-header
  level="3"
  part="header"
>
  <ef-icon
    icon="right"
    part="toggle"
    slot="left"
  >
  </ef-icon>
  <slot
    name="header-left"
    slot="left"
  >
  </slot>
  <slot
    name="header-right"
    slot="right"
  >
  </slot>
  Header
</ef-header>
<div part="content">
  <ef-panel transparent="">
    <slot>
    </slot>
  </ef-panel>
</div>

```

####   `Label and DOM structure is correct with level`

```html
<ef-header
  level="1"
  part="header"
>
  <ef-icon
    icon="right"
    part="toggle"
    slot="left"
  >
  </ef-icon>
  <slot
    name="header-left"
    slot="left"
  >
  </slot>
  <slot
    name="header-right"
    slot="right"
  >
  </slot>
</ef-header>
<div part="content">
  <ef-panel transparent="">
    <slot>
    </slot>
  </ef-panel>
</div>

```

####   `Label and DOM structure is correct without level`

```html
<ef-header
  level=""
  part="header"
>
  <ef-icon
    icon="right"
    part="toggle"
    slot="left"
  >
  </ef-icon>
  <slot
    name="header-left"
    slot="left"
  >
  </slot>
  <slot
    name="header-right"
    slot="right"
  >
  </slot>
</ef-header>
<div part="content">
  <ef-panel transparent="">
    <slot>
    </slot>
  </ef-panel>
</div>

```

