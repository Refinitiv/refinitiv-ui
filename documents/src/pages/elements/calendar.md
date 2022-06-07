<!--
type: page
title: Calendar
location: ./elements/calendar
layout: default
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
This can be customized using `view` and it must be in `yyyy-dd` format, e.g. `"2020-04"`.

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

## Adding footer content

The calendar supports adding footer content. This can be used to give information about the date entry, or to provide additional controls like 'reset'.

::
```javascript
::calendar::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/button?min';
halo('button');
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
