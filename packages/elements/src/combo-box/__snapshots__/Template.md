# `combo-box/Template`

## `Template Parts`

####   `Empty DOM has all required parts`

```html
<div part="input-wrapper">
  <input
    aria-autocomplete="list"
    aria-expanded="false"
    aria-haspopup="listbox"
    aria-owns="internal-list"
    autocomplete="off"
    part="input"
    role="combobox"
    type="text"
  >
  <div
    id="toggle-button"
    part="button button-toggle"
  >
    <ef-icon
      icon="down"
      part="icon icon-toggle"
    >
    </ef-icon>
  </div>
</div>

```

####   `Placeholder is rendered`

```html
<div part="input-wrapper">
  <input
    aria-autocomplete="list"
    aria-expanded="false"
    aria-haspopup="listbox"
    aria-owns="internal-list"
    autocomplete="off"
    part="input"
    placeholder="Placeholder"
    role="combobox"
    type="text"
  >
  <div
    id="toggle-button"
    part="button button-toggle"
  >
    <ef-icon
      icon="down"
      part="icon icon-toggle"
    >
    </ef-icon>
  </div>
</div>

```

```html
<div part="input-wrapper">
  <input
    aria-autocomplete="list"
    aria-expanded="false"
    aria-haspopup="listbox"
    aria-owns="internal-list"
    autocomplete="off"
    part="input"
    placeholder="New Placeholder"
    role="combobox"
    type="text"
  >
  <div
    id="toggle-button"
    part="button button-toggle"
  >
    <ef-icon
      icon="down"
      part="icon icon-toggle"
    >
    </ef-icon>
  </div>
</div>

```

```html
<div part="input-wrapper">
  <input
    aria-autocomplete="list"
    aria-expanded="false"
    aria-haspopup="listbox"
    aria-owns="internal-list"
    autocomplete="off"
    part="input"
    role="combobox"
    type="text"
  >
  <div
    id="toggle-button"
    part="button button-toggle"
  >
    <ef-icon
      icon="down"
      part="icon icon-toggle"
    >
    </ef-icon>
  </div>
</div>

```

####   `Lazy Render: data`

```html
<div part="input-wrapper">
  <input
    aria-activedescendant="AF"
    aria-autocomplete="list"
    aria-expanded="true"
    aria-haspopup="listbox"
    aria-owns="internal-list"
    autocomplete="off"
    part="input"
    role="combobox"
    type="text"
  >
  <div
    id="toggle-button"
    part="button button-toggle"
  >
    <ef-icon
      icon="down"
      part="icon icon-toggle"
    >
    </ef-icon>
  </div>
</div>
<ef-overlay-viewport>
</ef-overlay-viewport>
<ef-overlay
  first-resize-done=""
  no-autofocus=""
  no-focus-management=""
  no-overlap=""
  opened=""
  part="list"
  tabindex="-1"
  with-shadow=""
>
  <ef-list
    aria-multiselectable="false"
    id="internal-list"
    role="listbox"
    tabindex=""
  >
    <ef-list-item
      aria-selected="false"
      role="presentation"
      type="header"
    >
    </ef-list-item>
    <ef-list-item
      aria-selected="false"
      highlighted=""
      id="AF"
      role="option"
    >
    </ef-list-item>
    <ef-list-item
      aria-selected="false"
      id="AX"
      role="option"
    >
    </ef-list-item>
    <ef-list-item
      aria-selected="false"
      id="AL"
      role="option"
    >
    </ef-list-item>
  </ef-list>
</ef-overlay>

```

```html
<div part="input-wrapper">
  <input
    aria-autocomplete="list"
    aria-expanded="false"
    aria-haspopup="listbox"
    aria-owns="internal-list"
    autocomplete="off"
    part="input"
    role="combobox"
    type="text"
  >
  <div
    id="toggle-button"
    part="button button-toggle"
  >
    <ef-icon
      icon="down"
      part="icon icon-toggle"
    >
    </ef-icon>
  </div>
</div>
<ef-overlay
  no-autofocus=""
  no-focus-management=""
  no-overlap=""
  part="list"
  tabindex="-1"
  with-shadow=""
>
  <ef-list
    aria-multiselectable="false"
    id="internal-list"
    role="listbox"
    tabindex=""
  >
    <ef-list-item
      aria-selected="false"
      role="presentation"
      type="header"
    >
    </ef-list-item>
    <ef-list-item
      aria-selected="false"
      highlighted=""
      id="AF"
      role="option"
    >
    </ef-list-item>
    <ef-list-item
      aria-selected="false"
      id="AX"
      role="option"
    >
    </ef-list-item>
    <ef-list-item
      aria-selected="false"
      id="AL"
      role="option"
    >
    </ef-list-item>
  </ef-list>
</ef-overlay>

```

####   `Data is reflected to render`

```html
<div part="input-wrapper">
  <input
    aria-activedescendant="AF"
    aria-autocomplete="list"
    aria-expanded="true"
    aria-haspopup="listbox"
    aria-owns="internal-list"
    autocomplete="off"
    part="input"
    role="combobox"
    type="text"
  >
  <div
    id="toggle-button"
    part="button button-toggle"
  >
    <ef-icon
      icon="down"
      part="icon icon-toggle"
    >
    </ef-icon>
  </div>
</div>
<ef-overlay-viewport>
</ef-overlay-viewport>
<ef-overlay
  first-resize-done=""
  no-autofocus=""
  no-focus-management=""
  no-overlap=""
  opened=""
  part="list"
  tabindex="-1"
  with-shadow=""
>
  <ef-list
    aria-multiselectable="false"
    id="internal-list"
    role="listbox"
    tabindex=""
  >
    <ef-list-item
      aria-selected="false"
      role="presentation"
      type="header"
    >
    </ef-list-item>
    <ef-list-item
      aria-selected="false"
      highlighted=""
      id="AF"
      role="option"
    >
    </ef-list-item>
    <ef-list-item
      aria-selected="false"
      id="AX"
      role="option"
    >
    </ef-list-item>
    <ef-list-item
      aria-selected="false"
      id="AL"
      role="option"
    >
    </ef-list-item>
  </ef-list>
</ef-overlay>

```

```html
<div part="input-wrapper">
  <input
    aria-activedescendant="AL"
    aria-autocomplete="list"
    aria-expanded="true"
    aria-haspopup="listbox"
    aria-owns="internal-list"
    autocomplete="off"
    part="input"
    role="combobox"
    type="text"
  >
  <div
    id="toggle-button"
    part="button button-toggle"
  >
    <ef-icon
      icon="down"
      part="icon icon-toggle"
    >
    </ef-icon>
  </div>
</div>
<ef-overlay-viewport>
</ef-overlay-viewport>
<ef-overlay
  first-resize-done=""
  no-autofocus=""
  no-focus-management=""
  no-overlap=""
  opened=""
  part="list"
  tabindex="-1"
  with-shadow=""
>
  <ef-list
    aria-multiselectable="false"
    id="internal-list"
    role="listbox"
    tabindex=""
  >
    <ef-list-item
      aria-selected="false"
      highlighted=""
      id="AL"
      role="option"
    >
    </ef-list-item>
    <ef-list-item
      aria-selected="false"
      id="AX"
      role="option"
    >
    </ef-list-item>
    <ef-list-item
      aria-selected="false"
      id="AF"
      role="option"
    >
    </ef-list-item>
    <ef-list-item
      aria-selected="false"
      role="presentation"
      type="header"
    >
    </ef-list-item>
  </ef-list>
</ef-overlay>

```

```html
<div part="input-wrapper">
  <input
    aria-activedescendant=""
    aria-autocomplete="list"
    aria-expanded="true"
    aria-haspopup="listbox"
    aria-owns="internal-list"
    autocomplete="off"
    part="input"
    role="combobox"
    type="text"
  >
  <div
    id="toggle-button"
    part="button button-toggle"
  >
    <ef-icon
      icon="down"
      part="icon icon-toggle"
    >
    </ef-icon>
  </div>
</div>
<ef-overlay-viewport>
</ef-overlay-viewport>
<ef-overlay
  first-resize-done=""
  no-autofocus=""
  no-focus-management=""
  no-overlap=""
  opened=""
  part="list"
  tabindex="-1"
  with-shadow=""
>
  <ef-list-item
    aria-disabled="true"
    aria-selected="false"
    disabled=""
  >
    No results found.
  </ef-list-item>
</ef-overlay>

```

