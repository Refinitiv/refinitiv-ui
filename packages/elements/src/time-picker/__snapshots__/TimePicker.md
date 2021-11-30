# `time-picker/TimePicker`

## `Time Picker Snapshot Testing`

####   `DOM structure: readonly`

```html
<ef-number-field
  aria-readonly="true"
  id="hours"
  max="23"
  min="0"
  no-spinner=""
  part="input"
  placeholder="00"
  readonly=""
  role="textbox"
  tabindex="0"
  transparent=""
>
</ef-number-field>
<span part="divider">
</span>
<ef-number-field
  aria-readonly="true"
  id="minutes"
  max="59"
  min="0"
  no-spinner=""
  part="input"
  placeholder="00"
  readonly=""
  role="textbox"
  tabindex="0"
  transparent=""
>
</ef-number-field>
<span part="divider">
</span>
<ef-number-field
  aria-readonly="true"
  id="seconds"
  max="59"
  min="0"
  no-spinner=""
  part="input"
  placeholder="00"
  readonly=""
  role="textbox"
  tabindex="0"
  transparent=""
>
</ef-number-field>

```

####   `DOM structure: disabled`

```html
<ef-number-field
  aria-disabled="true"
  disabled=""
  id="hours"
  max="23"
  min="0"
  no-spinner=""
  part="input"
  placeholder="00"
  role="textbox"
  style="pointer-events: none;"
  tabindex="-1"
  transparent=""
>
</ef-number-field>
<span part="divider">
</span>
<ef-number-field
  aria-disabled="true"
  disabled=""
  id="minutes"
  max="59"
  min="0"
  no-spinner=""
  part="input"
  placeholder="00"
  role="textbox"
  style="pointer-events: none;"
  tabindex="-1"
  transparent=""
>
</ef-number-field>
<span part="divider">
</span>
<ef-number-field
  aria-disabled="true"
  disabled=""
  id="seconds"
  max="59"
  min="0"
  no-spinner=""
  part="input"
  placeholder="00"
  role="textbox"
  style="pointer-events: none;"
  tabindex="-1"
  transparent=""
>
</ef-number-field>

```

####   `DOM structure: value, no seconds`

```html
<ef-number-field
  id="hours"
  max="23"
  min="0"
  no-spinner=""
  part="input"
  placeholder="08"
  role="textbox"
  tabindex="0"
  transparent=""
>
</ef-number-field>
<span part="divider">
</span>
<ef-number-field
  id="minutes"
  max="59"
  min="0"
  no-spinner=""
  part="input"
  placeholder="16"
  role="textbox"
  tabindex="0"
  transparent=""
>
</ef-number-field>

```

####   `DOM structure: value, with seconds`

```html
<ef-number-field
  id="hours"
  max="23"
  min="0"
  no-spinner=""
  part="input"
  placeholder="08"
  role="textbox"
  tabindex="0"
  transparent=""
>
</ef-number-field>
<span part="divider">
</span>
<ef-number-field
  id="minutes"
  max="59"
  min="0"
  no-spinner=""
  part="input"
  placeholder="16"
  role="textbox"
  tabindex="0"
  transparent=""
>
</ef-number-field>
<span part="divider">
</span>
<ef-number-field
  id="seconds"
  max="59"
  min="0"
  no-spinner=""
  part="input"
  placeholder="32"
  role="textbox"
  tabindex="0"
  transparent=""
>
</ef-number-field>

```

####   `DOM structure: value, am/pm no seconds`

```html
<ef-number-field
  id="hours"
  max="12"
  min="1"
  no-spinner=""
  part="input"
  placeholder="01"
  role="textbox"
  tabindex="0"
  transparent=""
>
</ef-number-field>
<span part="divider">
</span>
<ef-number-field
  id="minutes"
  max="59"
  min="0"
  no-spinner=""
  part="input"
  placeholder="30"
  role="textbox"
  tabindex="0"
  transparent=""
>
</ef-number-field>
<div
  id="toggle"
  part="toggle"
  tabindex="0"
>
  <div part="toggle-item">
    AM
  </div>
  <div
    active=""
    part="toggle-item"
  >
    PM
  </div>
</div>

```

