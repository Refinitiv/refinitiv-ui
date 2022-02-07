# `collapse/Collapse`

## `Should Have Correct DOM`

####   `Label and DOM structure is correct`

```html
<div
  aria-level="2"
  part="header"
  role="heading"
>
  <ef-header
    aria-controls="content"
    aria-expanded="false"
    level="3"
    part="header-toggle"
    role="button"
    tabindex="0"
  >
    <ef-icon
      aria-hidden="true"
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
</div>
<div
  aria-labelledby="header-toggle"
  id="content"
  part="content"
  role="region"
>
  <ef-panel transparent="">
    <slot>
    </slot>
  </ef-panel>
</div>

```

####   `Label and DOM structure is correct with spacing`

```html
<div
  aria-level="2"
  part="header"
  role="heading"
>
  <ef-header
    aria-controls="content"
    aria-expanded="false"
    level="3"
    part="header-toggle"
    role="button"
    tabindex="0"
  >
    <ef-icon
      aria-hidden="true"
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
</div>
<div
  aria-labelledby="header-toggle"
  id="content"
  part="content"
  role="region"
>
  <ef-panel transparent="">
    <slot>
    </slot>
  </ef-panel>
</div>

```

####   `Label and DOM structure is correct with header`

```html
<div
  aria-level="2"
  part="header"
  role="heading"
>
  <ef-header
    aria-controls="content"
    aria-expanded="false"
    level="3"
    part="header-toggle"
    role="button"
    tabindex="0"
  >
    Header
    <ef-icon
      aria-hidden="true"
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
</div>
<div
  aria-labelledby="header-toggle"
  id="content"
  part="content"
  role="region"
>
  <ef-panel transparent="">
    <slot>
    </slot>
  </ef-panel>
</div>

```

####   `Label and DOM structure is correct with level`

```html
<div
  aria-level="2"
  part="header"
  role="heading"
>
  <ef-header
    aria-controls="content"
    aria-expanded="false"
    level="1"
    part="header-toggle"
    role="button"
    tabindex="0"
  >
    <ef-icon
      aria-hidden="true"
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
</div>
<div
  aria-labelledby="header-toggle"
  id="content"
  part="content"
  role="region"
>
  <ef-panel transparent="">
    <slot>
    </slot>
  </ef-panel>
</div>

```

####   `Label and DOM structure is correct without level`

```html
<div
  aria-level="2"
  part="header"
  role="heading"
>
  <ef-header
    aria-controls="content"
    aria-expanded="false"
    level=""
    part="header-toggle"
    role="button"
    tabindex="0"
  >
    <ef-icon
      aria-hidden="true"
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
</div>
<div
  aria-labelledby="header-toggle"
  id="content"
  part="content"
  role="region"
>
  <ef-panel transparent="">
    <slot>
    </slot>
  </ef-panel>
</div>

```

