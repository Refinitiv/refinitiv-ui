# `elements/FormFieldElement/AriaDescriptionTest`

#### `aria-description is propagated`

```html
<input
  aria-description="Description"
  aria-hidden="true"
  aria-invalid="false"
>

```

```html
<input
  aria-hidden="true"
  aria-invalid="false"
>

```

#### `aria-describedby is propagated`

```html
<input
  aria-description="Described By"
  aria-hidden="true"
  aria-invalid="false"
>

```

#### `aria-description is updated on error`

```html
<input
  aria-description="!ERROR! Described By"
  aria-hidden="true"
  aria-invalid="true"
>

```

