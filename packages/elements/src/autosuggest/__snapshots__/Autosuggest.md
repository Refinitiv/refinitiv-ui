# `autosuggest/Autosuggest`

#### `DOM structure is correct`

```html
<div part="header">
  <slot
    id="headerSlot"
    name="header"
  >
  </slot>
</div>
<div part="content">
  <slot>
  </slot>
  <ef-item
    aria-selected="false"
    id="moreResults"
    part="more-results"
    tabindex="0"
  >
    <span part="more-results-text">
      More results for
      <mark>
      </mark>
    </span>
    <span
      part="more-results-keys"
      slot="right"
    >
      <kbd>
        SHIFT
      </kbd>
      +
      <kbd>
        ENTER
      </kbd>
    </span>
  </ef-item>
</div>
<div part="footer">
  <slot
    id="footerSlot"
    name="footer"
  >
  </slot>
</div>
<div part="loader">
  <div part="backdrop">
  </div>
  <ef-loade>
  </ef-loade>
</div>

```

