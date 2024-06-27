# `number-field/NumberField`

## `Dom Structure`

####   `DOM structure is correct`

```html
<input
  aria-valuenow="0"
  aria-valuetext="0"
  autocomplete="off"
  inputmode="decimal"
  part="input"
  role="spinbutton"
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
  aria-valuenow="0"
  aria-valuetext="0"
  autocomplete="off"
  inputmode="decimal"
  part="input"
  role="spinbutton"
  type="text"
>

```

####   `DOM structure with clears is correct`

```html
<input
  aria-valuenow="1"
  aria-valuetext="1"
  autocomplete="off"
  inputmode="decimal"
  part="input"
  role="spinbutton"
  type="text"
>
<div
  aria-hidden="true"
  id="clears-button"
  part="button button-clear"
>
  <ef-icon
    icon="cross"
    part="icon icon-clear"
  >
  </ef-icon>
</div>
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

