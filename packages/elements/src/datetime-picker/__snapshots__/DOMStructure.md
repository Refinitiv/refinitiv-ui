# `datetime-picker/DOMStructure`

## `DOM Structure`

####   `DOM structure is correct`

```html
<div part="input-wrapper">
  <ef-text-field
    aria-disabled="false"
    aria-readonly="false"
    id="input"
    part="input"
    role="textbox"
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

```

####   `DOM structure is correct when opened`

```html
<div part="input-wrapper">
  <ef-text-field
    aria-disabled="false"
    aria-readonly="false"
    id="input"
    part="input"
    role="textbox"
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
          aria-disabled="false"
          aria-readonly="false"
          id="calendar"
          lang="en-gb"
          part="calendar"
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
  <ef-text-field
    aria-disabled="false"
    aria-readonly="false"
    id="input"
    part="input"
    role="textbox"
    tabindex="0"
    transparent=""
  >
  </ef-text-field>
  <div part="input-separator">
  </div>
  <ef-text-field
    aria-disabled="false"
    aria-readonly="false"
    id="input-to"
    part="input"
    role="textbox"
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
          aria-disabled="false"
          aria-readonly="false"
          id="calendar"
          lang="en-gb"
          part="calendar"
          range=""
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
  <ef-text-field
    aria-disabled="false"
    aria-readonly="false"
    id="input"
    part="input"
    role="textbox"
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
          aria-disabled="false"
          aria-readonly="false"
          id="calendar"
          lang="en-gb"
          part="calendar"
          tabindex="0"
        >
        </ef-calendar>
        <ef-calendar
          aria-disabled="false"
          aria-readonly="false"
          id="calendar-to"
          lang="en-gb"
          part="calendar"
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
  <ef-text-field
    aria-disabled="false"
    aria-readonly="false"
    id="input"
    part="input"
    role="textbox"
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
          aria-disabled="false"
          aria-readonly="false"
          id="calendar"
          lang="en-gb"
          part="calendar"
          tabindex="0"
        >
        </ef-calendar>
      </div>
      <div part="timepicker-wrapper">
        <ef-time-picker
          aria-disabled="false"
          aria-readonly="false"
          id="timepicker"
          part="time-picker"
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
  <ef-text-field
    aria-disabled="false"
    aria-readonly="false"
    id="input"
    part="input"
    role="textbox"
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
          aria-disabled="false"
          aria-readonly="false"
          id="calendar"
          lang="en-gb"
          part="calendar"
          tabindex="0"
        >
        </ef-calendar>
      </div>
      <div part="timepicker-wrapper">
        <ef-time-picker
          aria-disabled="false"
          aria-readonly="false"
          id="timepicker"
          part="time-picker"
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
  <ef-text-field
    aria-disabled="false"
    aria-readonly="false"
    id="input"
    part="input"
    role="textbox"
    tabindex="0"
    transparent=""
  >
  </ef-text-field>
  <div part="input-separator">
  </div>
  <ef-text-field
    aria-disabled="false"
    aria-readonly="false"
    id="input-to"
    part="input"
    role="textbox"
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
          aria-disabled="false"
          aria-readonly="false"
          id="calendar"
          lang="en-gb"
          part="calendar"
          range=""
          tabindex="0"
        >
        </ef-calendar>
      </div>
      <div part="timepicker-wrapper">
        <ef-time-picker
          aria-disabled="false"
          aria-readonly="false"
          id="timepicker"
          part="time-picker"
          tabindex="0"
        >
        </ef-time-picker>
        <div part="input-separator">
        </div>
        <ef-time-picker
          aria-disabled="false"
          aria-readonly="false"
          id="timepicker-to"
          part="time-picker"
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

