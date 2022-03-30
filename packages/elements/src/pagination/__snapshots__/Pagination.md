# `pagination/Pagination`

## `Snapshots`

####   `DOM structure is correct`

```html
<label
  for="input"
  part="label"
>
  Page 1
</label>
<ef-layout
  flex=""
  nowrap=""
  part="container"
>
  <ef-button-bar
    aria-hidden="true"
    part="buttons"
    role="toolbar"
    tabindex="-1"
  >
    <ef-button
      aria-disabled="true"
      disabled=""
      empty=""
      icon="skip-to-start"
      id="first"
      role="button"
      style="pointer-events: none;"
      tabindex="-1"
      textpos="after"
    >
    </ef-button>
    <ef-button
      aria-disabled="true"
      disabled=""
      empty=""
      icon="left"
      id="previous"
      role="button"
      style="pointer-events: none;"
      tabindex="-1"
      textpos="after"
    >
    </ef-button>
  </ef-button-bar>
  <input
    aria-valuemin="1"
    aria-valuenow="1"
    id="input"
    part="input"
    role="spinbutton"
  >
  <ef-button-bar
    aria-hidden="true"
    part="buttons"
    role="toolbar"
    tabindex="-1"
  >
    <ef-button
      empty=""
      icon="right"
      id="next"
      role="button"
      tabindex="0"
      textpos="after"
    >
    </ef-button>
    <ef-button
      aria-disabled="true"
      disabled=""
      empty=""
      icon="skip-to-end"
      id="last"
      role="button"
      style="pointer-events: none;"
      tabindex="-1"
      textpos="after"
    >
    </ef-button>
  </ef-button-bar>
</ef-layout>

```

