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

snapshots["datetime-picker/DOMStructure DOM Structure DOM structure is correct when range"] = 
`<div part="input-wrapper">
  <ef-text-field
    aria-label="From"
    id="input-from"
    part="input"
    tabindex="0"
    transparent=""
  >
  </ef-text-field>
  <div part="input-separator">
  </div>
  <ef-text-field
    aria-label="To"
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
          id="calendar-from"
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
          custom-validation=""
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
          custom-validation=""
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
    aria-label="From"
    id="input-from"
    part="input"
    tabindex="0"
    transparent=""
  >
  </ef-text-field>
  <div part="input-separator">
  </div>
  <ef-text-field
    aria-label="To"
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
          custom-validation=""
          id="timepicker-from"
          part="time-picker"
          role="group"
          tabindex="0"
        >
        </ef-time-picker>
        <div part="input-separator">
        </div>
        <ef-time-picker
          custom-validation=""
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

snapshots["datetime-picker/DOMStructure DOM Structure DOM structure is correct when add custom cell slot of calendar without prefix"] = 
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
          <slot
            name="2020-04-01"
            slot="2020-04-01"
          >
          </slot>
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
/* end snapshot datetime-picker/DOMStructure DOM Structure DOM structure is correct when add custom cell slot of calendar without prefix */

snapshots["datetime-picker/DOMStructure DOM Structure DOM structure is correct when add custom cell slot of calendar with prefix"] = 
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
          id="calendar-from"
          lang="en-gb"
          part="calendar"
          role="group"
          tabindex="0"
        >
          <slot
            name="from-2020-04-01"
            slot="2020-04-01"
          >
          </slot>
        </ef-calendar>
        <ef-calendar
          id="calendar-to"
          lang="en-gb"
          part="calendar"
          role="group"
          tabindex="0"
        >
          <slot
            name="to-2020-05-01"
            slot="2020-05-01"
          >
          </slot>
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
/* end snapshot datetime-picker/DOMStructure DOM Structure DOM structure is correct when add custom cell slot of calendar with prefix */

snapshots["datetime-picker/DOMStructure DOM Structure DOM structure is correct when add custom cell slot of calendar while overlay is opened"] = 
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
          id="calendar-from"
          lang="en-gb"
          part="calendar"
          role="group"
          tabindex="0"
        >
          <slot
            name="from-2020-04-01"
            slot="2020-04-01"
          >
          </slot>
        </ef-calendar>
        <ef-calendar
          id="calendar-to"
          lang="en-gb"
          part="calendar"
          role="group"
          tabindex="0"
        >
          <slot
            name="to-2020-05-01"
            slot="2020-05-01"
          >
          </slot>
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
/* end snapshot datetime-picker/DOMStructure DOM Structure DOM structure is correct when add custom cell slot of calendar while overlay is opened */

snapshots["datetime-picker/DOMStructure DOM Structure DOM structure should not contain added custom cell slot when overlay is closed"] = 
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
<ef-overlay
  no-autofocus=""
  no-cancel-on-esc-key=""
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
          id="calendar-from"
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
/* end snapshot datetime-picker/DOMStructure DOM Structure DOM structure should not contain added custom cell slot when overlay is closed */
snapshots["datetime-picker/DOMStructure DOM Structure DOM structure with clears is correct"] = 
`<div part="input-wrapper">
  <ef-text-field
    id="input"
    part="input"
    tabindex="0"
    transparent=""
  >
  </ef-text-field>
  <div
    aria-hidden="true"
    id="clears-button"
    part="button button-clear"
  >
    <ef-icon
      icon="cross"
      part="icon icon-clear"
    >
    </ef-icon>
  </div>
</div>
<ef-icon
  icon="calendar"
  part="icon"
>
</ef-icon>
`;
/* end snapshot datetime-picker/DOMStructure DOM Structure DOM structure with clears is correct */

