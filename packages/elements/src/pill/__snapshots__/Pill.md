# `pill/Pill`

#### `Should have correct default Shadow DOM structure`

```html
<div
  part="content"
  role="none"
>
  <slot>
    ...
  </slot>
</div>

```

#### `Should have correct "clears" Shadow DOM structure`

```html
<div
  part="content"
  role="none"
>
  <slot>
    ...
  </slot>
</div>
<ef-icon
  aria-hidden="true"
  icon="cross"
  part="close"
>
</ef-icon>

```

#### `Should have correct default Light DOM structure for a slot`

```html
Tiger

```

#### `Should have correct "clears" Light DOM structure for a slot`

```html
Tiger

```

