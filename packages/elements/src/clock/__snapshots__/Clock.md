# `clock/Clock`

## `DOM structure`

####   `DOM structure is correct`

```html
<div part="segment hours">
  00
  <div
    aria-hidden="true"
    name="Up"
    part="increment-button"
  >
  </div>
  <div
    aria-hidden="true"
    name="Down"
    part="decrement-button"
  >
  </div>
</div>
<div
  aria-hidden="true"
  part="segment divider"
>
  :
</div>
<div part="segment minutes">
  00
  <div
    aria-hidden="true"
    name="Up"
    part="increment-button"
  >
  </div>
  <div
    aria-hidden="true"
    name="Down"
    part="decrement-button"
  >
  </div>
</div>

```

####   `DOM structure of analogue is correct`

```html
<div part="hands">
  <div part="digital">
    <div part="segment hours">
      00
      <div
        aria-hidden="true"
        name="Up"
        part="increment-button"
      >
      </div>
      <div
        aria-hidden="true"
        name="Down"
        part="decrement-button"
      >
      </div>
    </div>
    <div
      aria-hidden="true"
      part="segment divider"
    >
      :
    </div>
    <div part="segment minutes">
      00
      <div
        aria-hidden="true"
        name="Up"
        part="increment-button"
      >
      </div>
      <div
        aria-hidden="true"
        name="Down"
        part="decrement-button"
      >
      </div>
    </div>
  </div>
  <div
    part="hand hour"
    style="transform: rotate(0deg)"
  >
  </div>
  <div
    part="hand minute"
    style="transform: rotate(0deg)"
  >
  </div>
</div>

```

####   `DOM structure of small size analogue is correct`

```html
<div part="hands">
  <div
    part="hand hour"
    style="transform: rotate(0deg)"
  >
  </div>
  <div
    part="hand minute"
    style="transform: rotate(0deg)"
  >
  </div>
</div>

```

