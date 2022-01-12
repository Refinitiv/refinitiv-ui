# `collapse/Collapse`

## `Should Have Correct DOM`

####   `Label and DOM structure is correct`

```html
<ef-header
  aria-controls="content"
  aria-expanded="false"
  id="header"
  level="3"
  part="header"
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
<div
  aria-labelledby="header"
  hidden=""
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
<ef-header
  aria-controls="content"
  aria-expanded="false"
  id="header"
  level="3"
  part="header"
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
<div
  aria-labelledby="header"
  hidden=""
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
<ef-header
  aria-controls="content"
  aria-expanded="false"
  id="header"
  level="3"
  part="header"
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
  Header
</ef-header>
<div
  aria-labelledby="header"
  hidden=""
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
<ef-header
  aria-controls="content"
  aria-expanded="false"
  id="header"
  level="1"
  part="header"
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
<div
  aria-labelledby="header"
  hidden=""
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
<ef-header
  aria-controls="content"
  aria-expanded="false"
  id="header"
  level=""
  part="header"
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
<div
  aria-labelledby="header"
  hidden=""
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

