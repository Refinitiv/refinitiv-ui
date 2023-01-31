/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["datetime-picker/DOMStructure DOM Structure DOM structure is correct"] = 
`<div part="input-wrapper">
  <ef-text-field
    id="input"
    part="input"
    tabindex="0"
    transparent=""
  >
  </ef-text-field>
</div>
<ef-icon
  icon="calendar"
  part="icon"
>
</ef-icon>
`;
/* end snapshot datetime-picker/DOMStructure DOM Structure DOM structure is correct */

snapshots["datetime-picker/DOMStructure DOM Structure DOM structure is correct when range"] = 
`<div part="input-wrapper">
  <ef-text-field
    id="input"
    part="input"
    tabindex="0"
    transparent=""
  >
  </ef-text-field>
  <div part="input-separator">
  </div>
  <ef-text-field
    id="input-to"
    part="input"
    tabindex="0"
    transparent=""
  >
  </ef-text-field>
</div>
<ef-icon
  icon="calendar"
  part="icon"
>
</ef-icon>
<ef-overlay-viewport>
</ef-overlay-viewport>
<ef-overlay
  first-resize-done=""
  no-autofocus=""
  no-cancel-on-esc-key=""
  opened=""
  part="list"
  tabindex="0"
  with-shadow=""
>
  <div>
    <slot name="header">
    </slot>
  </div>
  <div part="body">
    <div>
      <slot name="left">
      </slot>
    </div>
    <div part="selectors-wrapper">
      <div part="calendar-wrapper">
        <ef-calendar
          id="calendar"
          lang="en-gb"
          part="calendar"
          range=""
          role="group"
          tabindex="0"
        >
        </ef-calendar>
      </div>
    </div>
    <div>
      <slot name="right">
      </slot>
    </div>
  </div>
  <div>
    <slot name="footer">
    </slot>
  </div>
</ef-overlay>
`;
/* end snapshot datetime-picker/DOMStructure DOM Structure DOM structure is correct when range */

snapshots["datetime-picker/DOMStructure DOM Structure DOM structure is correct when opened"] = 
`<div part="input-wrapper">
  <ef-text-field
    id="input"
    part="input"
    tabindex="0"
    transparent=""
  >
  </ef-text-field>
</div>
<ef-icon
  icon="calendar"
  part="icon"
>
</ef-icon>
<ef-overlay-viewport>
</ef-overlay-viewport>
<ef-overlay
  first-resize-done=""
  no-autofocus=""
  no-cancel-on-esc-key=""
  opened=""
  part="list"
  tabindex="0"
  with-shadow=""
>
  <div>
    <slot name="header">
    </slot>
  </div>
  <div part="body">
    <div>
      <slot name="left">
      </slot>
    </div>
    <div part="selectors-wrapper">
      <div part="calendar-wrapper">
        <ef-calendar
          id="calendar"
          lang="en-gb"
          part="calendar"
          role="group"
          tabindex="0"
        >
        </ef-calendar>
      </div>
    </div>
    <div>
      <slot name="right">
      </slot>
    </div>
  </div>
  <div>
    <slot name="footer">
    </slot>
  </div>
</ef-overlay>
`;
/* end snapshot datetime-picker/DOMStructure DOM Structure DOM structure is correct when opened */

snapshots["datetime-picker/DOMStructure DOM Structure DOM structure is correct when timepicker and with-seconds"] = 
`<div part="input-wrapper">
  <ef-text-field
    id="input"
    part="input"
    tabindex="0"
    transparent=""
  >
  </ef-text-field>
</div>
<ef-icon
  icon="calendar"
  part="icon"
>
</ef-icon>
<ef-overlay-viewport>
</ef-overlay-viewport>
<ef-overlay
  first-resize-done=""
  no-autofocus=""
  no-cancel-on-esc-key=""
  opened=""
  part="list"
  tabindex="0"
  with-shadow=""
>
  <div>
    <slot name="header">
    </slot>
  </div>
  <div part="body">
    <div>
      <slot name="left">
      </slot>
    </div>
    <div part="selectors-wrapper">
      <div part="calendar-wrapper">
        <ef-calendar
          id="calendar"
          lang="en-gb"
          part="calendar"
          role="group"
          tabindex="0"
        >
        </ef-calendar>
      </div>
      <div part="timepicker-wrapper">
        <ef-time-picker
          id="timepicker"
          part="time-picker"
          role="group"
          tabindex="0"
        >
        </ef-time-picker>
      </div>
    </div>
    <div>
      <slot name="right">
      </slot>
    </div>
  </div>
  <div>
    <slot name="footer">
    </slot>
  </div>
</ef-overlay>
`;
/* end snapshot datetime-picker/DOMStructure DOM Structure DOM structure is correct when timepicker and with-seconds */

snapshots["datetime-picker/DOMStructure DOM Structure DOM structure is correct when range timepicker"] = 
`<div part="input-wrapper">
  <ef-text-field
    id="input"
    part="input"
    tabindex="0"
    transparent=""
  >
  </ef-text-field>
  <div part="input-separator">
  </div>
  <ef-text-field
    id="input-to"
    part="input"
    tabindex="0"
    transparent=""
  >
  </ef-text-field>
</div>
<ef-icon
  icon="calendar"
  part="icon"
>
</ef-icon>
<ef-overlay-viewport>
</ef-overlay-viewport>
<ef-overlay
  first-resize-done=""
  no-autofocus=""
  no-cancel-on-esc-key=""
  opened=""
  part="list"
  tabindex="0"
  with-shadow=""
>
  <div>
    <slot name="header">
    </slot>
  </div>
  <div part="body">
    <div>
      <slot name="left">
      </slot>
    </div>
    <div part="selectors-wrapper">
      <div part="calendar-wrapper">
        <ef-calendar
          id="calendar"
          lang="en-gb"
          part="calendar"
          range=""
          role="group"
          tabindex="0"
        >
        </ef-calendar>
      </div>
      <div part="timepicker-wrapper">
        <ef-time-picker
          id="timepicker"
          part="time-picker"
          role="group"
          tabindex="0"
        >
        </ef-time-picker>
        <div part="input-separator">
        </div>
        <ef-time-picker
          id="timepicker-to"
          part="time-picker"
          role="group"
          tabindex="0"
        >
        </ef-time-picker>
      </div>
    </div>
    <div>
      <slot name="right">
      </slot>
    </div>
  </div>
  <div>
    <slot name="footer">
    </slot>
  </div>
</ef-overlay>
`;
/* end snapshot datetime-picker/DOMStructure DOM Structure DOM structure is correct when range timepicker */

snapshots["datetime-picker/DOMStructure DOM Structure DOM structure is correct when duplex"] = 
`<div part="input-wrapper">
  <ef-text-field
    id="input"
    part="input"
    tabindex="0"
    transparent=""
  >
  </ef-text-field>
</div>
<ef-icon
  icon="calendar"
  part="icon"
>
</ef-icon>
<ef-overlay-viewport>
</ef-overlay-viewport>
<ef-overlay
  first-resize-done=""
  no-autofocus=""
  no-cancel-on-esc-key=""
  opened=""
  part="list"
  tabindex="0"
  with-shadow=""
>
  <div>
    <slot name="header">
    </slot>
  </div>
  <div part="body">
    <div>
      <slot name="left">
      </slot>
    </div>
    <div part="selectors-wrapper">
      <div part="calendar-wrapper">
        <ef-calendar
          id="calendar"
          lang="en-gb"
          part="calendar"
          role="group"
          tabindex="0"
        >
        </ef-calendar>
        <ef-calendar
          id="calendar-to"
          lang="en-gb"
          part="calendar"
          role="group"
          tabindex="0"
        >
        </ef-calendar>
      </div>
    </div>
    <div>
      <slot name="right">
      </slot>
    </div>
  </div>
  <div>
    <slot name="footer">
    </slot>
  </div>
</ef-overlay>
`;
/* end snapshot datetime-picker/DOMStructure DOM Structure DOM structure is correct when duplex */

snapshots["datetime-picker/DOMStructure DOM Structure DOM structure is correct when timepicker"] = 
`<div part="input-wrapper">
  <ef-text-field
    id="input"
    part="input"
    tabindex="0"
    transparent=""
  >
  </ef-text-field>
</div>
<ef-icon
  icon="calendar"
  part="icon"
>
</ef-icon>
<ef-overlay-viewport>
</ef-overlay-viewport>
<ef-overlay
  first-resize-done=""
  no-autofocus=""
  no-cancel-on-esc-key=""
  opened=""
  part="list"
  tabindex="0"
  with-shadow=""
>
  <div>
    <slot name="header">
    </slot>
  </div>
  <div part="body">
    <div>
      <slot name="left">
      </slot>
    </div>
    <div part="selectors-wrapper">
      <div part="calendar-wrapper">
        <ef-calendar
          id="calendar"
          lang="en-gb"
          part="calendar"
          role="group"
          tabindex="0"
        >
        </ef-calendar>
      </div>
      <div part="timepicker-wrapper">
        <ef-time-picker
          id="timepicker"
          part="time-picker"
          role="group"
          tabindex="0"
        >
        </ef-time-picker>
      </div>
    </div>
    <div>
      <slot name="right">
      </slot>
    </div>
  </div>
  <div>
    <slot name="footer">
    </slot>
  </div>
</ef-overlay>
`;
/* end snapshot datetime-picker/DOMStructure DOM Structure DOM structure is correct when timepicker */

