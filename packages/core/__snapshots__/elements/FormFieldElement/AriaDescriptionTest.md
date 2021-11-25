# `elements/FormFieldElement/AriaDescriptionTest`

#### `aria-description is propagated`

```html
<input
  aria-description="Description"
  aria-hidden="true"
  aria-invalid="false"
  aria-required="false"
  autocomplete="off"
>

```

```html
<input
  aria-hidden="true"
  aria-invalid="false"
  aria-required="false"
  autocomplete="off"
>

```

#### `aria-describedby is propagated`

```html
<input
  aria-description="Described By"
  aria-hidden="true"
  aria-invalid="false"
  aria-required="false"
  autocomplete="off"
>

```

#### `aria-description is updated on error`

```html
<input
  aria-description="!ERROR! Described By"
  aria-hidden="true"
  aria-invalid="true"
  aria-required="false"
  autocomplete="off"
>

```

