# `number-field/NumberField`

## `Dom Structure`

####   `DOM structure is correct`

```html
<input
  aria-hidden="true"
  aria-invalid="false"
  aria-required="false"
  autocomplete="off"
  inputmode="decimal"
  part="input"
  pattern="^[-+]?[0-9]*.?[0-9]+([eE][-+]?[0-9]+)?$"
  type="text"
>
<div part="spinner">
  <ef-icon
    icon="up"
    part="spinner-up"
  >
  </ef-icon>
  <ef-icon
    icon="down"
    part="spinner-down"
  >
  </ef-icon>
</div>

```

####   `DOM structure without spinner is correct`

```html
<input
  aria-hidden="true"
  aria-invalid="false"
  aria-required="false"
  autocomplete="off"
  inputmode="decimal"
  part="input"
  pattern="^[-+]?[0-9]*.?[0-9]+([eE][-+]?[0-9]+)?$"
  type="text"
>

```

