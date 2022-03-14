# `time-picker/TimePicker`

## `Time Picker Snapshot Testing`

####   `DOM structure: readonly`

```html
<ef-number-field
  aria-label="0 hours"
  id="hours"
  max="23"
  min="0"
  no-spinner=""
  part="input"
  readonly=""
  tabindex="0"
  transparent=""
>
</ef-number-field>
<span part="divider">
</span>
<ef-number-field
  aria-label="0 minutes"
  id="minutes"
  max="59"
  min="0"
  no-spinner=""
  part="input"
  readonly=""
  tabindex="0"
  transparent=""
>
</ef-number-field>
<span part="divider">
</span>
<ef-number-field
  aria-label="0 seconds"
  id="seconds"
  max="59"
  min="0"
  no-spinner=""
  part="input"
  readonly=""
  tabindex="0"
  transparent=""
>
</ef-number-field>
<div
  aria-label="Selected time is: 00:00:00"
  aria-live="polite"
  part="aria-selection"
  role="status"
>
</div>

```

####   `DOM structure: disabled`

```html
<ef-number-field
  aria-disabled="true"
  aria-label="0 hours"
  disabled=""
  id="hours"
  max="23"
  min="0"
  no-spinner=""
  part="input"
  style="pointer-events: none;"
  tabindex="-1"
  transparent=""
>
</ef-number-field>
<span part="divider">
</span>
<ef-number-field
  aria-disabled="true"
  aria-label="0 minutes"
  disabled=""
  id="minutes"
  max="59"
  min="0"
  no-spinner=""
  part="input"
  style="pointer-events: none;"
  tabindex="-1"
  transparent=""
>
</ef-number-field>
<span part="divider">
</span>
<ef-number-field
  aria-disabled="true"
  aria-label="0 seconds"
  disabled=""
  id="seconds"
  max="59"
  min="0"
  no-spinner=""
  part="input"
  style="pointer-events: none;"
  tabindex="-1"
  transparent=""
>
</ef-number-field>
<div
  aria-label="Selected time is: 00:00:00"
  aria-live="polite"
  part="aria-selection"
  role="status"
>
</div>

```

####   `DOM structure: value, no seconds`

```html
<ef-number-field
  aria-label="8 hours"
  id="hours"
  max="23"
  min="0"
  no-spinner=""
  part="input"
  tabindex="0"
  transparent=""
>
</ef-number-field>
<span part="divider">
</span>
<ef-number-field
  aria-label="16 minutes"
  id="minutes"
  max="59"
  min="0"
  no-spinner=""
  part="input"
  tabindex="0"
  transparent=""
>
</ef-number-field>
<div
  aria-label="Selected time is: 08:16"
  aria-live="polite"
  part="aria-selection"
  role="status"
>
</div>

```

####   `DOM structure: value, with seconds`

```html
<ef-number-field
  aria-label="8 hours"
  id="hours"
  max="23"
  min="0"
  no-spinner=""
  part="input"
  tabindex="0"
  transparent=""
>
</ef-number-field>
<span part="divider">
</span>
<ef-number-field
  aria-label="16 minutes"
  id="minutes"
  max="59"
  min="0"
  no-spinner=""
  part="input"
  tabindex="0"
  transparent=""
>
</ef-number-field>
<span part="divider">
</span>
<ef-number-field
  aria-label="32 seconds"
  id="seconds"
  max="59"
  min="0"
  no-spinner=""
  part="input"
  tabindex="0"
  transparent=""
>
</ef-number-field>
<div
  aria-label="Selected time is: 08:16:32"
  aria-live="polite"
  part="aria-selection"
  role="status"
>
</div>

```

####   `DOM structure: value, am/pm no seconds`

```html
<ef-number-field
  aria-label="1 hour"
  id="hours"
  max="12"
  min="1"
  no-spinner=""
  part="input"
  tabindex="0"
  transparent=""
>
</ef-number-field>
<span part="divider">
</span>
<ef-number-field
  aria-label="30 minutes"
  id="minutes"
  max="59"
  min="0"
  no-spinner=""
  part="input"
  tabindex="0"
  transparent=""
>
</ef-number-field>
<div
  aria-activedescendant="toggle-pm"
  aria-label="Toggle Time Period"
  id="toggle"
  part="toggle"
  role="listbox"
  tabindex="0"
>
  <div
    aria-label="Before Midday"
    id="toggle-am"
    part="toggle-item"
    role="option"
  >
    AM
  </div>
  <div
    active=""
    aria-label="After Midday"
    id="toggle-pm"
    part="toggle-item"
    role="option"
  >
    PM
  </div>
</div>
<div
  aria-label="Selected time is: 1:30 PM"
  aria-live="polite"
  part="aria-selection"
  role="status"
>
</div>

```

####   `DOM structure: role=none`

```html
<ef-number-field
  aria-label="Select hours"
  id="hours"
  max="23"
  min="0"
  no-spinner=""
  part="input"
  placeholder="--"
  tabindex="0"
  transparent=""
>
</ef-number-field>
<span part="divider">
</span>
<ef-number-field
  aria-label="Select minutes"
  id="minutes"
  max="59"
  min="0"
  no-spinner=""
  part="input"
  placeholder="--"
  tabindex="0"
  transparent=""
>
</ef-number-field>

```

