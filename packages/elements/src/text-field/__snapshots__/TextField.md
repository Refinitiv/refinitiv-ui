# `text-field/TextField`

#### `Default DOM structure and properties are correct`

```html
<input
  autocomplete="off"
  part="input"
  type="text"
>
```

#### `DOM structure and properties are correct`

```html
<input
  aria-invalid="true"
  autocomplete="off"
  maxlength="10"
  minlength="5"
  part="input"
  pattern="[a-z]"
  placeholder="Placeholder"
  type="text"
>
<ef-icon
  icon="menu"
  part="icon"
>
</ef-icon>
```

#### `DOM structure with clears is correct`

```html
<input
  autocomplete="off"
  part="input"
  type="text"
>
<div
  id="clears-button"
  part="button button-clear"
>
  <ef-icon
    icon="cross"
    part="icon icon-clear"
  >
  </ef-icon>
</div>

```

