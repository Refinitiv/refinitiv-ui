# `card/Card`

## `DOM structure`

####   `DOM structure is correct`

```html
<div part="body">
  <slot>
  </slot>
</div>

```

####   `DOM structure with header and footer is correct`

```html
<div part="header">
  <ef-label
    max-line="3"
    part="header-text"
    style="--max-line:3;"
  >
    Sample Card
  </ef-label>
</div>
<div part="body">
  <slot>
  </slot>
</div>
<ef-label
  max-line="3"
  part="footer"
  style="--max-line:3;"
>
  Footer Info
</ef-label>

```

