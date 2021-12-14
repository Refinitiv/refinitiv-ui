# `pagination/Pagination`

## `Snapshots`

####   `DOM structure is correct`

```html
<ef-layout
  flex=""
  nowrap=""
  part="container"
>
  <div
    id="info"
    part="info"
  >
    1 - 10 of 10 items
  </div>
  <ef-button-bar part="buttons">
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
  <ef-text-field
    id="input"
    no-spinner=""
    part="input"
    tabindex="0"
  >
  </ef-text-field>
  <ef-button-bar part="buttons">
    <ef-button
      aria-disabled="true"
      disabled=""
      empty=""
      icon="right"
      id="next"
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

