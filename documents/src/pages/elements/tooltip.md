<!--
type: page
title: Tooltip
location: ./elements/tooltip
layout: default
-->

# Tooltip
::
```javascript
::tooltip::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements@next/button?min';
halo('button');
```
```html
<div style="padding: 20px 0;">
  <ef-button cta title="Sweet! Here is tooltip text.">Hover Me</ef-button>
</div>
```
::

Tooltip displays information when the user hovers over an item.

## Usage
Import the `ef-tooltip` component and use the `title` attribute, just like with a standard tooltip.

::
```javascript
::tooltip::
```
```css
.wrapper {
    padding: 40px 0;
    display: flex;
    align-items: center;
}
.wrapper > *:not(:last-child) {
    margin-right: 30px;
}
```
```html
<div class="wrapper">
    <abbr title="Don't Forget To Be Awesome">DFTBA</abbr>
    <abbr title="May The Force Be With You">MTFBWY</abbr>
    <abbr title="Element Framework">EF</abbr>
</div>
```
::

```html
<abbr title="Don't Forget To Be Awesome">DFTBA</abbr>
<abbr title="May The Force Be With You">MTFBWY</abbr>
<abbr title="Element Framework">EF</abbr>
```

@> `ef-tooltip` overrides the default title attribute behavior of the browser

## Selector
`ef-tooltip` can be used for advanced use cases, such as specifying a position for tooltips, custom rendering, or displaying a tooltip only when certain conditions are met.

To customize the behavior of `ef-tooltip`, use `selector` to specify the CSS selector for the elemens and `tooltip` to specify the text content of the tooltip.

::
```javascript
::tooltip::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements@next/button?min';
halo('button');
```
```html
<div class="navigation" style="padding: 40px 0;">
    <ef-button tooltip="Hooray!">Hover Me</ef-button>
    <!-- Tooltip will not show on this button as tooltip nor title is defined -->
    <ef-button>No Tooltip</ef-button>
</div>
</div>
<ef-tooltip selector=".navigation ef-button"></ef-tooltip>
```
::

```html
<div class="navigation">
  <ef-button tooltip="Hooray!">Hover Me</ef-button>
  <!-- Tooltip will not show on this button as tooltip nor title is defined -->
  <ef-button>No Tooltip</ef-button>
</div>
<ef-tooltip selector=".navigation ef-button"></ef-tooltip>
```

## Positioning tooltips
By default, the tooltip position is based on the pointer coordinates (`auto`). However, the tooltip can be configured to display `above`, `below`, `left`, or `right` of the element.

::
```javascript
::tooltip::
```
```css
.navigation > * {
    margin-right: 30px;
}
```
```html
<div class="navigation" style="padding: 40px 0;">
  <label above tooltip="Above tooltip">Above</label>
  <label below tooltip="Below tooltip">Below</label>
  <label left tooltip="Left tooltip">Left</label>
  <label right tooltip="Right tooltip">Right</label>
  <label auto tooltip="Auto tooltip">Auto</label>
</div>

<ef-tooltip position="above" selector=".navigation label[above]"></ef-tooltip>
<ef-tooltip position="right" selector=".navigation label[right]"></ef-tooltip>
<ef-tooltip position="below" selector=".navigation label[below]"></ef-tooltip>
<ef-tooltip position="left" selector=".navigation label[left]"></ef-tooltip>
<ef-tooltip selector=".navigation label[auto]"></ef-tooltip>
```
::

```html
<label above tooltip="Above tooltip">Above</label>
<label below tooltip="Below tooltip">Below</label>
<label left tooltip="Left tooltip">Left</label>
<label right tooltip="Right tooltip">Right</label>
<label auto tooltip="Auto tooltip">Auto</label>

<ef-tooltip position="above" selector="label[above]"></ef-tooltip>
<ef-tooltip position="right" selector="label[right]"></ef-tooltip>
<ef-tooltip position="below" selector="label[below]"></ef-tooltip>
<ef-tooltip position="left" selector="label[left]"></ef-tooltip>
<ef-tooltip selector="label[auto]"></ef-tooltip>
```

## Tooltip transition styles
The default tooltip transition is `fade`. To make tooltips display with a different transition style, use the `transition-style` attribute. Note: the transition style should be used rationally with tooltip position.

::
```javascript
::tooltip::
```
```css
.navigation {
  padding: 20px 0px;
}
.navigation > * {
    margin-right: 30px;
}
```
```html
<div class="navigation">
  <label fade tooltip="Fade">Fade</label>
  <label zoom tooltip="Zoom">Zoom</label>
  <label slide-down tooltip="Slide down">Slide Down</label>
  <label slide-up tooltip="Slide up">Slide Up</label>
  <label slide-left tooltip="Slide left">Slide Left</label>
  <label slide-right tooltip="Slide right">Slide Right</label>
</div>
<div class="navigation">
  <label slide-right-up tooltip="Slide right up">Slide Right Up</label>
  <label slide-right-down tooltip="Slide right down">Slide Right Down</label>
  <label slide-left-up tooltip="Slide left up">Slide Left Up</label>
  <label slide-left-down tooltip="Slide left down">Slide Left Down</label>
</div>

<ef-tooltip transition-style="fade" selector=".navigation label[fade]"></ef-tooltip>
<ef-tooltip transition-style="zoom" selector=".navigation label[zoom]"></ef-tooltip>
<ef-tooltip transition-style="slide-down" position="below" selector=".navigation label[slide-down]"></ef-tooltip>
<ef-tooltip transition-style="slide-up" position="above" selector=".navigation label[slide-up]"></ef-tooltip>
<ef-tooltip transition-style="slide-left" position="left" selector=".navigation label[slide-left]"></ef-tooltip>
<ef-tooltip transition-style="slide-right" position="right" selector=".navigation label[slide-right]"></ef-tooltip>
<ef-tooltip transition-style="slide-right-up" position="right" selector=".navigation label[slide-right-up]"></ef-tooltip>
<ef-tooltip transition-style="slide-right-down" position="right" selector=".navigation label[slide-right-down]"></ef-tooltip>
<ef-tooltip transition-style="slide-left-up" position="left" selector=".navigation label[slide-left-up]"></ef-tooltip>
<ef-tooltip transition-style="slide-left-down" position="left" selector=".navigation label[slide-left-down]"></ef-tooltip>
```
::

``` html
<ef-tooltip transition-style="fade" selector=".navigation label[fade]"></ef-tooltip>
<ef-tooltip transition-style="zoom" selector=".navigation label[zoom]"></ef-tooltip>
<ef-tooltip transition-style="slide-down" position="below" selector=".navigation label[slide-down]"></ef-tooltip>
<ef-tooltip transition-style="slide-up" position="above" selector=".navigation label[slide-up]"></ef-tooltip>
<ef-tooltip transition-style="slide-left" position="left" selector=".navigation label[slide-left]"></ef-tooltip>
<ef-tooltip transition-style="slide-right" position="right" selector=".navigation label[slide-right]"></ef-tooltip>
<ef-tooltip transition-style="slide-right-up" position="right" selector=".navigation label[slide-right-up]"></ef-tooltip>
<ef-tooltip transition-style="slide-right-down" position="right" selector=".navigation label[slide-right-down]"></ef-tooltip>
<ef-tooltip transition-style="slide-left-up" position="left" selector=".navigation label[slide-left-up]"></ef-tooltip>
<ef-tooltip transition-style="slide-left-down" position="left" selector=".navigation label[slide-left-down]"></ef-tooltip>
```

## Custom content

Custom content can be added to a tooltip instead of just text.

::
```javascript
::tooltip::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements@next/button?min';
halo('button');
```
```html
<div class="navigation" style="padding: 40px 0;">
    <ef-button>Hover Me</ef-button>
</div>

<ef-tooltip selector=".navigation ef-button">
  <table>
    <thead>
      <tr>
        <th>GOOGL.O</th>
        <th>NFLX.O</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="color: green">£1,030.45 (+0.2949%)</td>
        <td style="color: red">£266.98 (-1.3378%)</td>
      </tr>
    </tbody>
  </table>
</ef-tooltip>
```
::

```html
<div class="navigation">
    <ef-button>Hover Me</ef-button>
</div>
<ef-tooltip selector=".navigation ef-button">
  <table>
    <thead>
      <tr>
        <th>GOOGL.O</th>
        <th>NFLX.O</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="color: green">£1,030.45 (+0.2949%)</td>
        <td style="color: red">£266.98 (-1.3378%)</td>
      </tr>
    </tbody>
  </table>
</ef-tooltip>
```

## Custom rendering
Use custom rendering to display HTML content in a tooltip. The content passed to the renderer function needs to be an HTMLElement object.

*> If `title` attribute is provided; or custom content of tooltip is specified, `renderer` will be ignored.

::
```javascript
::tooltip::
const tooltip = document.getElementById('symbol-tooltip');
tooltip.renderer = (target) => {
  const ret = document.createElement('div');
  const title = document.createElement('div');
  title.style.fontWeight = 'bold';
  title.style.paddingBottom = '3px';
  const price = document.createElement('div');
  ret.appendChild(title);
  ret.appendChild(price);

  switch(target.id) {
    case 'google':
      title.innerText = 'Alphabet Inc';
      price.innerText = '£1,030.45 (+0.3%)';
      price.style.color = 'green';
      break;
    case 'facebook':
      title.innerText = 'Facebook Inc';
      price.innerText = '£132.43 (+0.6%)';
      price.style.color = 'green';
      break;
    case 'netflix':
      title.innerText = 'Netflix Inc';
      price.innerText = '£266.98 (-1.3%)';
      price.style.color = 'red';
      break;
    default:
      ret = null;
      break;
  }
  return ret;
}
```
```css
.symbol {
    margin-right: 30px;
}
```
```html
<div style="padding: 60px 0;">
  <label class="symbol" id="google">GOOGL.O</label>
  <label class="symbol" id="facebook">FB.O</label>
  <label class="symbol" id="netflix">NFLX.O</label>
</div>
<ef-tooltip id="symbol-tooltip" selector=".symbol"></ef-tooltip>
```
::

```html
<label class="symbol" id="google">GOOGL.O</label>
<label class="symbol" id="facebook">FB.O</label>
<label class="symbol" id="netflix">NFLX.O</label>
<ef-tooltip id="symbol-tooltip" selector=".symbol"></ef-tooltip>
```

```javascript
const tooltip = document.getElementById('symbol-tooltip');
tooltip.renderer = (target) => {
  const ret = document.createElement('div');
  const title = document.createElement('div');
  title.style.fontWeight = 'bold';
  title.style.paddingBottom = '3px';
  const price = document.createElement('div');
  ret.appendChild(title);
  ret.appendChild(price);

  switch(target.id) {
    case 'google':
      title.innerText = 'Alphabet Inc';
      price.innerText = '£1,030.45 (+0.2949%)';
      price.style.color = 'green';
      break;
    case 'facebook':
      title.innerText = 'Facebook Inc';
      price.innerText = '£132.43 (+0.6689%)';
      price.style.color = 'green';
      break;
    case 'netflix':
      title.innerText = 'Netflix Inc';
      price.innerText = '£266.98 (-1.3378%)';
      price.style.color = 'red';
      break;
    default:
      ret = null;
      break;
  }
  return ret;
}
```

A custom renderer can also be applied to only show tooltips when the text is too long and does not fit the container.

```css
.item {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

```javascript
const tooltip = document.getElementById('item-tooltip');

tooltip.renderer = (target) => {
  if (target.scrollWidth - target.clientWidth === 0) {
    return null;
  }
  // return itself as content of tooltip
  return target;
};
```

## Conditioning tooltip
Use custom condition to trigger a tooltip only when a condition is met.

::
```javascript
::tooltip::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements@next/text-field?min';
halo('text-field');
const input = document.getElementById('amount');
const tooltip = document.getElementById('amount-tooltip');
const isValid = (val) => isNaN(parseInt(val, 10)) || parseInt(val, 10) < 100;

input.addEventListener('value-changed', () => {
  input.error = isValid(input.value);
});

tooltip.condition = (target, paths) => target === input && isValid(target.value);
```
```html
<div style="padding: 30px 0;">
  <ef-text-field style="width:400px" id="amount" tooltip="Value must be number and at least 100" placeholder="Input amount. Tooltip will show when input invalid."></ef-text-field>
  <ef-tooltip id="amount-tooltip"></ef-tooltip>
</div>

```
::

```html
<ef-text-field id="amount" tooltip="Value must be number and at least 100" placeholder="Input amount. Tooltip will show when input invalid."></ef-text-field>
<ef-tooltip id="amount-tooltip"></ef-tooltip>
```

```javascript
const input = document.getElementById('amount');
const tooltip = document.getElementById('amount-tooltip');
const isValid = (val) => isNaN(parseInt(val, 10)) || parseInt(val, 10) < 100;

input.addEventListener('value-changed', () => {
  input.error = isValid(input.value);
});

tooltip.condition = (target, paths) => target === input && isValid(target.value);
};
```

## Default tooltip
It is recommended to have only one instance of tooltip per page. A default tooltip element is always included when the developer adds `ef-tooltip` to an application.

Use `addTooltipCondition` and `removeTooltipCondition` to reuse the default tooltip:

```javascript
import { addTooltipCondition, removeTooltipCondition } from '@refinitiv-ui/elements/tooltip';

// Show tooltip for elements that have "ref" attribute
const condition = target => target.hasAttribute('ref');

// Show tooltip content
const render = target => `My reference is: £{target.getAttribute('ref')}`;

addTooltipCondition(condition, render);

// Do not forget to remove tooltip condition once not required to avoid memory leaks
removeTooltipCondition(condition);
```

## Overflow tooltip
Overflow tooltip reuses the concept of _Default tooltip_ to display a tooltip when text overflows:

```css
.overflow {
  white-space: nowrap;
  width: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
}
```
```html
<div class="overflow">Very long text with overflow</div>
```
```javascript
import { registerOverflowTooltip } from '@refinitiv-ui/elements/tooltip';
const overflowElement = document.querySelector('.overflow');
registerOverflowTooltip(overflowElement);
```

## CSS Variables
A timer to show or hide a tooltip can be customized using the `--show-delay` and `--hide-delay` CSS variables.

*> setting these variables to small values can cause performance issues.

```css
.delay {
  --show-delay: 3000ms;
  --hide-delay: 2000ms;
}
```

| CSS Variables Name | Description                                             |
| ------------------ | ------------------------------------------------------- |
| --show-delay       | Time to show tooltip when mouse hovers, in milliseconds |
| --hide-delay       | Time to hide tooltip when mouse leaves, in milliseconds |


## Accessibility
::a11y-intro::

According to [Title Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title) it is recommended to _avoid_ using tooltips. Its implementation is not consistent across screen readers, as well as the use is problematic for touch-only devices and for people who use keyboard navigation. 

Instead of using tooltips and hiding important information, the developer should try to provide clear labels and sufficient body text.

If it is required to provide additional information for users with disabilities or impairments, consider using `aria-label` or `aria-labelledby` instead.

If the use of tooltips is unavoidable, please reference the [documentation](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tooltip_role) for implementation details.

::a11y-end::
