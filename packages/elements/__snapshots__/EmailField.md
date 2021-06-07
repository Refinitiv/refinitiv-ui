# `EmailField`

## `Should Have Correct DOM Structure`

####   `DOM structure is correct`

```html
<input
  autocomplete="off"
  maxlength="10"
  minlength="5"
  multiple=""
  part="input"
  pattern=".+@mail.com"
  placeholder="Placeholder"
  type="email"
>
<ef-icon
  icon="email"
  part="icon"
>
</ef-icon>

```

####   `Has correct DOM structure, when initialised with icon`

```html
<input
  autocomplete="off"
  part="input"
  type="email"
>
<ef-icon
  icon="email"
  part="icon"
>
</ef-icon>

```

####   `Has correct DOM structure, when set icon using element.setAttribute(icon)`

```html
<input
  autocomplete="off"
  part="input"
  type="email"
>
<ef-icon
  icon="email"
  part="icon"
>
</ef-icon>

```

####   `Has correct DOM structure, when initialised with maxlength value`

```html
<input
  autocomplete="off"
  maxlength="10"
  part="input"
  type="email"
>

```

####   `Has correct DOM structure, when set maxlength value using element.setAttribute(maxlength)`

```html
<input
  autocomplete="off"
  maxlength="5"
  part="input"
  type="email"
>

```

####   `Has correct DOM structure, when remove maxlength`

```html
<input
  autocomplete="off"
  part="input"
  type="email"
>

```

####   `Has correct DOM structure, when initialised with minlength value`

```html
<input
  autocomplete="off"
  minlength="10"
  part="input"
  type="email"
>

```

####   `Has correct DOM structure, when set minlength value using element.setAttribute(minlength)`

```html
<input
  autocomplete="off"
  minlength="5"
  part="input"
  type="email"
>

```

####   `Has correct DOM structure, when remove minlength`

```html
<input
  autocomplete="off"
  part="input"
  type="email"
>

```

####   `Has correct DOM structure, when initialised with read only state`

```html
<input
  autocomplete="off"
  part="input"
  readonly=""
  type="email"
>

```

####   `Has correct DOM structure, when no read only state initially but added later`

```html
<input
  autocomplete="off"
  part="input"
  readonly=""
  type="email"
>

```

####   `Has correct DOM structure, when removed read only state`

```html
<input
  autocomplete="off"
  part="input"
  type="email"
>

```

