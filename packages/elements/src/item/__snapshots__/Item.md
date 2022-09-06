# `item/Item`

## `Defaults`

####   `Should have correct Shadow DOM structure`

```html
<div part="left">
  <slot name="left">
  </slot>
</div>
<div part="center">
  <slot>
  </slot>
</div>
<div part="right">
  <slot name="right">
  </slot>
</div>

```

####   `Should have correct Shadow DOM structure with icon`

```html
<div part="left">
  <ef-icon
    icon="tick"
    part="icon"
  >
  </ef-icon>
  <slot name="left">
  </slot>
</div>
<div part="center">
  <slot>
  </slot>
</div>
<div part="right">
  <slot name="right">
  </slot>
</div>

```

####   `Should have correct Shadow DOM structure with empty icon`

```html
<div part="left">
  <ef-icon
    icon=""
    part="icon"
  >
  </ef-icon>
  <slot name="left">
  </slot>
</div>
<div part="center">
  <slot>
  </slot>
</div>
<div part="right">
  <slot name="right">
  </slot>
</div>

```

####   `Header item should have correct Shadow DOM structure with subLabel`

```html
<div part="left">
  <slot name="left">
  </slot>
</div>
<div part="center">
  tiger
  <slot>
  </slot>
  <div part="sub-label">
    tiger
  </div>
</div>
<div part="right">
  <slot name="right">
  </slot>
</div>

```

####   `Default item should have correct Shadow DOM structure with label and subLabel`

```html
<div part="left">
  <slot name="left">
  </slot>
</div>
<div part="center">
  tiger
  <slot>
  </slot>
  <div part="sub-label">
    tiger
  </div>
</div>
<div part="right">
  <slot name="right">
  </slot>
</div>

```

####   `Default item should have correct Shadow DOM structure with content and subLabel`

```html
<div part="left">
  <slot name="left">
  </slot>
</div>
<div part="center">
  <slot>
  </slot>
</div>
<div part="right">
  <slot name="right">
  </slot>
</div>

```

####   `Default item should have correct Shadow DOM structure with subLabel, if there is no content or label`

```html
<div part="left">
  <slot name="left">
  </slot>
</div>
<div part="center">
  <slot>
  </slot>
  <div part="sub-label">
    tiger
  </div>
</div>
<div part="right">
  <slot name="right">
  </slot>
</div>

```

####   `Default item should have correct Shadow DOM structure with label, sub-label and ignorable default slot children`

```html
<div part="left">
  <slot name="left">
  </slot>
</div>
<div part="center">
  tiger
  <slot>
  </slot>
  <div part="sub-label">
    tiger
  </div>
</div>
<div part="right">
  <slot name="right">
  </slot>
</div>

```

####   `Slots are correctly populated`

```html
<div
  class="left"
  slot="left"
>
  Left Item
</div>
<div class="center">
  Center Item
</div>
<div
  class="right"
  slot="right"
>
  Right Item
</div>

```

## `Special Attributes`

####   `Check property for`

```html
<div part="left">
  <slot name="left">
  </slot>
</div>
<div part="center">
  <slot>
  </slot>
</div>
<div part="right">
  <slot name="right">
  </slot>
  <ef-icon icon="right">
  </ef-icon>
</div>

```

####   `Check property multiple`

```html
<div part="left">
  <ef-checkbox
    aria-checked="false"
    part="checkbox"
    role="checkbox"
    tabindex="-1"
  >
  </ef-checkbox>
  <slot name="left">
  </slot>
</div>
<div part="center">
  <slot>
  </slot>
</div>
<div part="right">
  <slot name="right">
  </slot>
</div>

```

```html
<div part="left">
  <ef-checkbox
    aria-checked="true"
    checked=""
    part="checkbox"
    role="checkbox"
    tabindex="-1"
  >
  </ef-checkbox>
  <slot name="left">
  </slot>
</div>
<div part="center">
  <slot>
  </slot>
</div>
<div part="right">
  <slot name="right">
  </slot>
</div>

```

```html
<div part="left">
  <slot name="left">
  </slot>
</div>
<div part="center">
  <slot>
  </slot>
</div>
<div part="right">
  <slot name="right">
  </slot>
</div>

```

