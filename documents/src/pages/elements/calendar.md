<!--
type: page
title: Calendar
location: ./elements/calendar
layout: default
language_tabs: [javascript, typescript]
-->

# Calendar

::
```javascript
::calendar::
```
```html
<ef-calendar></ef-calendar>
<ef-calendar range values="2020-04-01,2020-04-21"></ef-calendar>
```
```css
ef-calendar {
  margin-right: 20px;
}
```
::

The Calendar control allows switching days, months and years.

## Usage

The initial value of the calendar can be set using the value property. Value must be provided in `yyyy-MM-dd` format, for instance: `"2020-04-21"`.
Custom content can be added using the [footer slot](./elements/calendar#adding-footer-content)

```html
<ef-calendar value="2020-04-21"></ef-calendar>
```

## Defining the view

By default, the calendar will show the current month.
This can be customised using `view` and it must be in `yyyy-dd` format, e.g. `"2020-04"`.

::
```javascript
::calendar::
```
```css
ef-calendar {
  margin-right: 20px;
}
```
```html
<ef-calendar></ef-calendar>
<ef-calendar view="2020-04"></ef-calendar>
```
::

```html
<ef-calendar view="2020-04"></ef-calendar>
```

## Defining min and max values

You can restrict the available date range by passing in min and max values.

::
```javascript
::calendar::
```
```css
ef-calendar {
  margin-right: 20px;
}
```
```html
<ef-calendar min="1990-01-05" view="1990-01"></ef-calendar>
<ef-calendar max="2100-12-25" view="2100-12"></ef-calendar>
```
::

```html
<ef-calendar min="1990-01-05" view="1990-01"></ef-calendar>
<ef-calendar max="2100-12-25" view="2100-12"></ef-calendar>
```

## Multiple select

You can switch the calendar to multiple select mode by setting `multiple`.

::
```javascript
::calendar::
```
```css
ef-calendar {
  margin-right: 20px;
}
```
```html
<ef-calendar multiple></ef-calendar>
<ef-calendar multiple values="2020-04-01,2020-04-11,2020-04-21"></ef-calendar>
```
::

```html
<ef-calendar multiple></ef-calendar>
<ef-calendar multiple values="2020-04-01,2020-04-11,2020-04-21"></ef-calendar>
```

## Range select

You can switch the calendar to range select mode by setting `range`. You cannot have multiple ranges.

::
```javascript
::calendar::
```
```css
ef-calendar {
  margin-right: 20px;
}
```
```html
<ef-calendar range></ef-calendar>
<ef-calendar range values="2020-04-01,2020-04-21"></ef-calendar>
```
::

```html
<ef-calendar range></ef-calendar>
<ef-calendar range values="2020-04-01,2020-04-21"></ef-calendar>
```

## Filtering dates

`ef-calendar` has two internal filtering options. One for enabling weekdays only and another for only enabling weekends.

These are basic filters. More complex ones can be added using the filter option.

::
```javascript
::calendar::
const customFilterEl = document.getElementById('custom-filter');
// odd dates only
customFilterEl.filter = value => new Date(value).getDate() % 2;
```
```css
ef-calendar {
  margin-right: 20px;
}
```
```html
<ef-calendar weekdays-only></ef-calendar>
<ef-calendar weekends-only></ef-calendar>
<ef-calendar id="custom-filter"></ef-calendar>
```
::

```html
<ef-calendar weekdays-only></ef-calendar>
<ef-calendar weekends-only></ef-calendar>
<ef-calendar id="custom-filter"></ef-calendar>
```

```javascript
// odd dates only
customFilterEl.filter = value => new Date(value).getDate() % 2;
```

## Setting locale

By default, the calendar uses system default locale (or US English if undefined). You can change the locale by setting the [lang](https://www.w3.org/International/questions/qa-html-language-declarations) attribute either globally or locally.

The first day of the week is defined by the locale. You can override this by setting `first-day-of-week`.

::
```javascript
::calendar::
```
```css
ef-calendar {
  margin-right: 20px;
}
```
```html
<ef-calendar lang="th" value="2019-05-21"></ef-calendar>
<ef-calendar first-day-of-week="3" value="2019-05-21"></ef-calendar>
```
::

```html
<ef-calendar lang="th" value="2019-05-21"></ef-calendar>
<ef-calendar first-day-of-week="3" value="2019-05-21"></ef-calendar>
```

## Customising cell content & style

The calendar allows you to customise the content and style of a cell on particular date, month and year. You can set a `slot` attribute with value in format `yyyy-MM-dd`, `yyyy-MM` and `yyyy` as a key to indicate the specific day, month or year of the cell that need to be replaced with custom content.

::
```javascript
::calendar::
```
```html
<ef-layout flex style="align-items: flex-start;">
  <ef-calendar fill-cells view="2023-05" min="2023-05-01">
    <div class="custom-cell" slot="2023-04-07">7</div>
    <div class="custom-cell" slot="2023-04-10">10</div>
    <div class="custom-cell" slot="2023-05-01">1</div>
    <div class="custom-cell" slot="2023-05-18">18</div>
    <div class="custom-cell" slot="2023-05-29">29</div>
  </ef-calendar>
  <ef-layout>
    <h5>Germany Public Holidays</h5>
    <h6>April</h6>
    <p>
      7: Good Friday<br>
      10: Easter Monday
    </p>
    <h6>May</h6>
    <p>
      1: Labour Day<br>
      18: Ascension Day<br>
      29: White Monday
    </p>
    <h5>Entry Permit</h5>
    <p>
      from 1 May 2023
    </p>
  </ef-layout>
</ef-layout>
```
```css
html[prefers-color-scheme="light"] {
  --cell-color: #198C8C;
}
html[prefers-color-scheme="dark"] {
  --cell-color: #00432F;
}

ef-calendar {
  margin-right: 20px;
}

h5, h6 {
  margin-top: 0px;
}

.custom-cell {
  background-color: var(--cell-color);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.custom-cell:hover {
  border: var(--cell-color) 1px solid;
}
```
::

For more advance use cases, you can style each cell based on its current state, such as `disabled`, `range` and `selected`, by listening to `before-cell-render` event containing [cell model](https://github.com/Refinitiv/refinitiv-ui/blob/v7/packages/elements/src/calendar/types.ts).

```javascript
const calendar = document.querySelector('ef-calendar');
calendar.addEventListener('before-cell-render', (event) => {
  const sourceCalendar = event.target;
  const { cell } = event.detail;
  const customContent = sourceCalendar.querySelector(`[slot="${cell.value}"]`);

  // when custom content is empty, restore default text
  // useful for i18n as calendar has built-in locale support
  // for instance, Mai instead of May in German
  if (!customContent.innerHTML.trim()) {
    customContent.textContent = cell.text;
  }
  
  // toggle class to update style according to cell state
  if (cell.selected) {
    customContent.classList.add('selected');
  } else {
    customContent.classList.remove('selected');
  }
});
```

```typescript
import { BeforeCellRenderEvent } from '@refinitiv-ui/elements/calendar';

const calendar = document.querySelector('ef-calendar');
calendar.addEventListener('before-cell-render', (event) => {
  const sourceCalendar = event.target;
  const { cell } = (event as BeforeCellRenderEvent).detail;
  const customContent = sourceCalendar.querySelector(`[slot="${cell.value}"]`);

  // when custom content is empty, restore default text
  // useful for i18n as calendar has built-in locale support
  // for instance, Mai instead of May in German
  if (!customContent.innerHTML.trim()) {
    customContent.textContent = cell.text;
  }
  
  // toggle class to update style according to cell state
  if (cell.selected) {
    customContent.classList.add('selected');
  } else {
    customContent.classList.remove('selected');
  }
});
```

::
```javascript
::calendar::

const calendar = document.querySelector('ef-calendar');
calendar.addEventListener('before-cell-render', (event) => {
  const sourceCalendar = event.target;
  const { cell } = event.detail;
  const customContent = sourceCalendar.querySelector(`[slot="${cell.value}"]`);

  // no matching custom content
  if (!customContent) { return; }
  
  // when custom content is empty, restore default text
  // useful for i18n as calendar has built-in locale support
  // for instance, Mai instead of May in German
  if (!customContent.innerHTML.trim()) {
    customContent.textContent = cell.text;
  }
  
  // toggle class to update style according to cell state
  if (cell.selected || cell.rangeFrom || cell.rangeTo) {
    customContent.classList.add('selected-boundary');
  } else {
    customContent.classList.remove('selected-boundary');
  }
  
  // style update with dynamic cell model key
  const keys = ['range', 'disabled'];
  for (const key of keys) {
    if (cell[key]) {
      customContent.classList.add(key);
    } else {
      customContent.classList.remove(key);
    }
  }
});
```
```html
<ef-layout flex style="align-items: flex-start;">
  <ef-calendar lang="de" fill-cells range view="2023-05" min="2023-05-01" values="2023-05-18,2023-05-30">
    <div class="custom-cell" slot="2023-04-07"></div>
    <div class="custom-cell" slot="2023-04-10"></div>
    <div class="custom-cell" slot="2023-05-01"></div>
    <div class="custom-cell" slot="2023-05-18"></div>
    <div class="custom-cell" slot="2023-05-29"></div>
    <div class="custom-cell" slot="2023"></div>
    <div class="custom-cell" slot="2023-04"></div>
    <div class="custom-cell" slot="2023-05"></div>
  </ef-calendar>
  <ef-layout>
    <h5>Germany Public Holidays</h5>
    <h6>April</h6>
    <p>
      7: Good Friday<br>
      10: Easter Monday
    </p>
    <h6>May</h6>
    <p>
      1: Labour Day<br>
      18: Ascension Day<br>
      29: White Monday
    </p>
    <h5>Entry Permit</h6>
    <p>
      from 1 May 2023
    </p>
    <h5>Trip Period</h5>
    <p>18 May 2023 - 30 May 2023</p>
  </ef-layout>
</ef-layout>
```
```css
html[prefers-color-scheme="light"] {
  --cell-color: #198C8C; 
  --cell-range-color: #00C389;
  --cell-disabled-color: #EA2E6C;
  --cell-selected-boundary: #BCA2E1;
}
html[prefers-color-scheme="dark"] {
  --cell-color: #00432F;
  --cell-range-color: #007678;
  --cell-disabled-color: #5D122B;
  --cell-selected-boundary: #563F77;
}

ef-calendar {
  margin-right: 20px;
}

h5, h6 {
  margin-top: 0px;
}

.custom-cell {
  background-color: var(--cell-color);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.custom-cell:hover {
  border: var(--cell-color) 1px solid;
}
.custom-cell.selected-boundary {
  background-color: var(--cell-selected-boundary);
}
.custom-cell.selected-boundary:hover {
  border: var(--cell-selected-boundary) 1px solid;
}
.custom-cell.range {
  background-color: var(--cell-range-color);
}
.custom-cell.range:hover {
  border: var(--cell-range-color) 1px solid;
}
.custom-cell.disabled {
  background-color: var(--cell-disabled-color);
}
```
::

## Adding footer content

The calendar supports adding footer content. This can be used to give information about the date entry, or to provide additional controls like 'reset'.

::
```javascript
::calendar::
const calendarEl = document.querySelector('ef-calendar');
const resetEl = document.querySelector('ef-button');
resetEl.addEventListener('tap', () => {
  calendarEl.value = calendarEl.view = '';
});
```
```css
div {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```
```html
<ef-calendar>
  <div slot="footer">
    <span>Hey there 👋</span>
    <ef-button>Reset</ef-button>
  </div>
</ef-calendar>
```
::

```html
<ef-calendar>
  <div slot="footer">
    <span>Hey there 👋</span>
    <ef-button>Reset</ef-button>
  </div>
</ef-calendar>
```

## Accessibility

::a11y-intro::

`ef-calendar` is assigned parameters in line with table or grid semantics. The date selection is assigned `role="button"` and can include an `aria-label` to describe the context of each date. For example, an unselected date may be announced by screen readers as “12th November 2021” and a selected date may be announced as “Start date, Today, 12th November 2021”. The selected date and today’s date have visual cues, such as bold or underlined text (in addition to colour changes), which allow visually impaired users to more readily identify them. 

`ef-calendar` has already managed aria attributes and keyboard navigation.

::a11y-end::
