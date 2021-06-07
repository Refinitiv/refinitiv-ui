# `TimePicker`

## `Time Picker Snapshot Testing`

####   `DOM structure: readonly`

```html
<ef-number-field
  aria-disabled="false"
  aria-readonly="true"
  id="hours"
  max="23"
  min="0"
  no-spinner=""
  part="input"
  placeholder="00"
  readonly=""
  tabindex="0"
  transparent=""
>
</ef-number-field>
<span part="divider">
</span>
<ef-number-field
  aria-disabled="false"
  aria-readonly="true"
  id="minutes"
  max="59"
  min="0"
  no-spinner=""
  part="input"
  placeholder="00"
  readonly=""
  tabindex="0"
  transparent=""
>
</ef-number-field>
<span part="divider">
</span>
<ef-number-field
  aria-disabled="false"
  aria-readonly="true"
  id="seconds"
  max="59"
  min="0"
  no-spinner=""
  part="input"
  placeholder="00"
  readonly=""
  tabindex="0"
  transparent=""
>
</ef-number-field>

```

####   `DOM structure: disabled`

```html
<ef-number-field
  aria-disabled="true"
  aria-readonly="false"
  disabled=""
  id="hours"
  max="23"
  min="0"
  no-spinner=""
  part="input"
  placeholder="00"
  style="pointer-events: none;"
  tabindex="-1"
  transparent=""
>
</ef-number-field>
<span part="divider">
</span>
<ef-number-field
  aria-disabled="true"
  aria-readonly="false"
  disabled=""
  id="minutes"
  max="59"
  min="0"
  no-spinner=""
  part="input"
  placeholder="00"
  style="pointer-events: none;"
  tabindex="-1"
  transparent=""
>
</ef-number-field>
<span part="divider">
</span>
<ef-number-field
  aria-disabled="true"
  aria-readonly="false"
  disabled=""
  id="seconds"
  max="59"
  min="0"
  no-spinner=""
  part="input"
  placeholder="00"
  style="pointer-events: none;"
  tabindex="-1"
  transparent=""
>
</ef-number-field>

```

####   `DOM structure: value, no seconds`

```html
<ef-number-field
  aria-disabled="false"
  aria-readonly="false"
  id="hours"
  max="23"
  min="0"
  no-spinner=""
  part="input"
  placeholder="08"
  tabindex="0"
  transparent=""
>
</ef-number-field>
<span part="divider">
</span>
<ef-number-field
  aria-disabled="false"
  aria-readonly="false"
  id="minutes"
  max="59"
  min="0"
  no-spinner=""
  part="input"
  placeholder="16"
  tabindex="0"
  transparent=""
>
</ef-number-field>

```

####   `DOM structure: value, with seconds`

```html
<ef-number-field
  aria-disabled="false"
  aria-readonly="false"
  id="hours"
  max="23"
  min="0"
  no-spinner=""
  part="input"
  placeholder="08"
  tabindex="0"
  transparent=""
>
</ef-number-field>
<span part="divider">
</span>
<ef-number-field
  aria-disabled="false"
  aria-readonly="false"
  id="minutes"
  max="59"
  min="0"
  no-spinner=""
  part="input"
  placeholder="16"
  tabindex="0"
  transparent=""
>
</ef-number-field>
<span part="divider">
</span>
<ef-number-field
  aria-disabled="false"
  aria-readonly="false"
  id="seconds"
  max="59"
  min="0"
  no-spinner=""
  part="input"
  placeholder="32"
  tabindex="0"
  transparent=""
>
</ef-number-field>

```

####   `DOM structure: value, am/pm no seconds`

```html
<ef-number-field
  aria-disabled="false"
  aria-readonly="false"
  id="hours"
  max="12"
  min="1"
  no-spinner=""
  part="input"
  placeholder="01"
  tabindex="0"
  transparent=""
>
</ef-number-field>
<span part="divider">
</span>
<ef-number-field
  aria-disabled="false"
  aria-readonly="false"
  id="minutes"
  max="59"
  min="0"
  no-spinner=""
  part="input"
  placeholder="30"
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

