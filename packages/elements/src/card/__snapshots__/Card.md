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
>
  Footer Info
</ef-label>

```

