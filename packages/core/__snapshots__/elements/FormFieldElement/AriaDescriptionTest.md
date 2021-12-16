# `elements/FormFieldElement/AriaDescriptionTest`

#### `aria-description is propagated`

```html
<input
  aria-description="Description"
  autocomplete="off"
>

```

```html
<input autocomplete="off">

```

#### `aria-describedby is propagated`

```html
<input
  aria-description="Described By"
  autocomplete="off"
>

```

#### `aria-description is updated on error`

```html
<input
  aria-description="!ERROR! Described By"
  aria-invalid="true"
  autocomplete="off"
>

```

