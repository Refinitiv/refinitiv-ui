# `datetime-field/Default`

## `DOM structure`

####   `DOM structure is correct`

```html
<input
  autocomplete="off"
  part="input"
  type="text"
>

```

####   `DOM structure is correct when focused`

```html
<input
  autocomplete="off"
  part="input"
  type="text"
>
<div
  aria-label="Current value is 21 Apr 1988"
  aria-live="polite"
  role="status"
>
</div>

```

####   `DOM structure is correct when part selected`

```html
<input
  autocomplete="off"
  part="input"
  type="text"
>
<div
  aria-label="Pick Year"
  aria-live="polite"
  role="status"
>
</div>
<div
  aria-label="Current value is 21 Apr 1988"
  aria-live="polite"
  role="status"
>
</div>

```

