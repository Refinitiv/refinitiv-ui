# `color-dialog/ColorDialog`

## `Default Color Dialog`

####   `DOM structure is correct`

```html
<ef-header
  drag-handle=""
  level="2"
  part="header"
  style="cursor: move;"
>
  Color Picker
  <ef-icon
    aria-hidden="true"
    icon="cross"
    part="close"
    slot="right"
  >
  </ef-icon>
</ef-header>
<ef-panel
  part="content"
  spacing=""
  transparent=""
>
  <div part="content-section">
    <div part="palettes-container">
      <ef-color-palettes
        aria-hidden="true"
        part="color-palettes"
      >
      </ef-color-palettes>
      <ef-grayscale-palettes
        aria-hidden="true"
        part="grayscale-palettes"
      >
      </ef-grayscale-palettes>
    </div>
    <div part="inputs-container">
      <div
        no-color=""
        part="preview-color"
        style=""
      >
      </div>
      <div>
        <label for="redInput">
          R :
        </label>
        <ef-number-field
          id="redInput"
          max="255"
          min="0"
          no-spinner=""
          part="color-input"
        >
        </ef-number-field>
      </div>
      <div>
        <label for="greenInput">
          G :
        </label>
        <ef-number-field
          id="greenInput"
          max="255"
          min="0"
          no-spinner=""
          part="color-input"
        >
        </ef-number-field>
      </div>
      <div>
        <label for="blueInput">
          B :
        </label>
        <ef-number-field
          id="blueInput"
          max="255"
          min="0"
          no-spinner=""
          part="color-input"
        >
        </ef-number-field>
      </div>
      <div>
        <label
          aria-label="Hex"
          for="hexInput"
          id="hexLabel"
        >
          # :
        </label>
        <ef-text-field
          aria-label="Hex"
          id="hexInput"
          maxlength="6"
          part="color-input"
          pattern="^([0-9a-fA-F]{3}){1,2}$"
        >
        </ef-text-field>
      </div>
    </div>
  </div>
</ef-panel>
<div part="footer">
  <ef-button
    aria-disabled="true"
    cta=""
    disabled=""
    id="confirmButton"
    part="button"
    role="button"
    style="pointer-events: none;"
    textpos="after"
  >
    Apply
  </ef-button>
  <ef-button
    id="closeButton"
    part="button"
    role="button"
    textpos="after"
  >
    Close
  </ef-button>
</div>

```

