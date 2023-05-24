/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["time-picker/TimePicker Time Picker Snapshot Testing DOM structure: value, no seconds"] = 
`<ef-number-field
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
`;
/* end snapshot time-picker/TimePicker Time Picker Snapshot Testing DOM structure: value, no seconds */

snapshots["time-picker/TimePicker Time Picker Snapshot Testing DOM structure: value, am/pm no seconds"] = 
`<ef-number-field
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
  id="toggle"
  part="toggle"
  role="listbox"
  tabindex="0"
>
  <div
    id="toggle-am"
    part="toggle-item"
    role="option"
  >
    AM
  </div>
  <div
    active=""
    id="toggle-pm"
    part="toggle-item"
    role="option"
  >
    PM
  </div>
</div>
<div
  aria-live="polite"
  part="aria-selection"
  role="status"
>
</div>
`;
/* end snapshot time-picker/TimePicker Time Picker Snapshot Testing DOM structure: value, am/pm no seconds */

snapshots["time-picker/TimePicker Time Picker Snapshot Testing DOM structure: value, with seconds"] = 
`<ef-number-field
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
`;
/* end snapshot time-picker/TimePicker Time Picker Snapshot Testing DOM structure: value, with seconds */

snapshots["time-picker/TimePicker Time Picker Snapshot Testing DOM structure: role=none"] = 
`<ef-number-field
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
`;
/* end snapshot time-picker/TimePicker Time Picker Snapshot Testing DOM structure: role=none */

snapshots["time-picker/TimePicker Time Picker Snapshot Testing DOM structure: disabled"] = 
`<ef-number-field
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
`;
/* end snapshot time-picker/TimePicker Time Picker Snapshot Testing DOM structure: disabled */

snapshots["time-picker/TimePicker Time Picker Snapshot Testing DOM structure: readonly"] = 
`<ef-number-field
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
`;
/* end snapshot time-picker/TimePicker Time Picker Snapshot Testing DOM structure: readonly */

