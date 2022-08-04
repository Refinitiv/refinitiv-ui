# `datetime-picker/DatetimePicker`

## `DOM Structure`

####   `DOM structure is correct`

```html
<div part="input-wrapper">
  <ef-datetime-field
    part="input"
    tabindex="0"
    transparent=""
  >
  </ef-datetime-field>
</div>
<button
  aria-haspopup="dialog"
  aria-label="Open calendar"
  part="button"
>
  <ef-icon
    icon="calendar"
    part="icon"
  >
  </ef-icon>
</button>

```

####   `DOM structure is correct when opened`

```html
<div part="input-wrapper">
  <ef-datetime-field
    part="input"
    tabindex="0"
    transparent=""
  >
  </ef-datetime-field>
</div>
<button
  aria-haspopup="dialog"
  aria-label="Open calendar"
  part="button"
>
  <ef-icon
    icon="calendar"
    part="icon"
  >
  </ef-icon>
</button>
<ef-overlay-viewport>
</ef-overlay-viewport>
<ef-overlay
  aria-label="Choose date"
  aria-modal="true"
  lock-position-target=""
  opened=""
  part="list"
  role="dialog"
  style="z-index: 103; pointer-events: auto;"
  tabindex="-1"
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

```

####   `DOM structure is correct when range`

```html
<div part="input-wrapper">
  <ef-datetime-field
    aria-label="From"
    part="input"
    tabindex="0"
    transparent=""
  >
  </ef-datetime-field>
  <div part="input-separator">
  </div>
  <ef-datetime-field
    aria-label="To"
    part="input"
    tabindex="0"
    transparent=""
  >
  </ef-datetime-field>
</div>
<button
  aria-haspopup="dialog"
  aria-label="Open calendar"
  part="button"
>
  <ef-icon
    icon="calendar"
    part="icon"
  >
  </ef-icon>
</button>
<ef-overlay-viewport>
</ef-overlay-viewport>
<ef-overlay
  aria-label="Choose date range"
  aria-modal="true"
  lock-position-target=""
  opened=""
  part="list"
  role="dialog"
  style="z-index: 103; pointer-events: auto;"
  tabindex="-1"
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

```

####   `DOM structure is correct when duplex`

```html
<div part="input-wrapper">
  <ef-datetime-field
    part="input"
    tabindex="0"
    transparent=""
  >
  </ef-datetime-field>
</div>
<button
  aria-haspopup="dialog"
  aria-label="Open calendar"
  part="button"
>
  <ef-icon
    icon="calendar"
    part="icon"
  >
  </ef-icon>
</button>
<ef-overlay-viewport>
</ef-overlay-viewport>
<ef-overlay
  aria-label="Choose date"
  aria-modal="true"
  lock-position-target=""
  opened=""
  part="list"
  role="dialog"
  style="z-index: 103; pointer-events: auto;"
  tabindex="-1"
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
          lang="en-gb"
          part="calendar"
          role="group"
          tabindex="0"
        >
        </ef-calendar>
        <ef-calendar
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

```

####   `DOM structure is correct when timepicker`

```html
<div part="input-wrapper">
  <ef-datetime-field
    part="input"
    tabindex="0"
    transparent=""
  >
  </ef-datetime-field>
</div>
<button
  aria-haspopup="dialog"
  aria-label="Open calendar"
  part="button"
>
  <ef-icon
    icon="calendar"
    part="icon"
  >
  </ef-icon>
</button>
<ef-overlay-viewport>
</ef-overlay-viewport>
<ef-overlay
  aria-label="Choose date and time"
  aria-modal="true"
  lock-position-target=""
  opened=""
  part="list"
  role="dialog"
  style="z-index: 103; pointer-events: auto;"
  tabindex="-1"
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
          lang="en-gb"
          part="calendar"
          role="group"
          tabindex="0"
        >
        </ef-calendar>
      </div>
      <div part="timepicker-wrapper">
        <ef-time-picker
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

```

####   `DOM structure is correct when timepicker and with-seconds`

```html
<div part="input-wrapper">
  <ef-datetime-field
    part="input"
    tabindex="0"
    transparent=""
  >
  </ef-datetime-field>
</div>
<button
  aria-haspopup="dialog"
  aria-label="Open calendar"
  part="button"
>
  <ef-icon
    icon="calendar"
    part="icon"
  >
  </ef-icon>
</button>
<ef-overlay-viewport>
</ef-overlay-viewport>
<ef-overlay
  aria-label="Choose date and time"
  aria-modal="true"
  lock-position-target=""
  opened=""
  part="list"
  role="dialog"
  style="z-index: 103; pointer-events: auto;"
  tabindex="-1"
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
          lang="en-gb"
          part="calendar"
          role="group"
          tabindex="0"
        >
        </ef-calendar>
      </div>
      <div part="timepicker-wrapper">
        <ef-time-picker
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

```

####   `DOM structure is correct when range timepicker`

```html
<div part="input-wrapper">
  <ef-datetime-field
    aria-label="From"
    part="input"
    tabindex="0"
    transparent=""
  >
  </ef-datetime-field>
  <div part="input-separator">
  </div>
  <ef-datetime-field
    aria-label="To"
    part="input"
    tabindex="0"
    transparent=""
  >
  </ef-datetime-field>
</div>
<button
  aria-haspopup="dialog"
  aria-label="Open calendar"
  part="button"
>
  <ef-icon
    icon="calendar"
    part="icon"
  >
  </ef-icon>
</button>
<ef-overlay-viewport>
</ef-overlay-viewport>
<ef-overlay
  aria-label="Choose date and time range"
  aria-modal="true"
  lock-position-target=""
  opened=""
  part="list"
  role="dialog"
  style="z-index: 103; pointer-events: auto;"
  tabindex="-1"
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
          part="time-picker"
          role="group"
          tabindex="0"
        >
        </ef-time-picker>
        <div part="input-separator">
        </div>
        <ef-time-picker
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

```

