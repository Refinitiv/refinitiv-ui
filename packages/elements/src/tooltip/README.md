# Tooltip

```live(preview)
<div style="padding: 20px 0;">
  <ef-button cta title="Sweet! Here is tooltip text.">Hover Me</ef-button>
</div>
```

Tooltip displays extra information when the user hovers over an item.

### Basic usage
It is straightforward to use `ef-tooltip`. Import `ef-tooltip` component to your app and use `title` attribute, same as standard tooltip.

```live
<style>
    .wrapper {
        padding: 40px 0;
        display: flex;
        align-items: center;
    }
    .wrapper > *:not(:last-child) {
        margin-right: 30px;
    }
</style>
<div class="wrapper">
    <abbr title="Don't Forget To Be Awesome">DFTBA</abbr>
    <abbr title="May The Force Be With You">MTFBWY</abbr>
    <abbr title="Element Framework">ELF</abbr>
</div>
```

``` html
<abbr title="Don't Forget To Be Awesome">DFTBA</abbr>
<abbr title="May The Force Be With You">MTFBWY</abbr>
<abbr title="Element Framework">ELF</abbr>
```

>`ef-tooltip` overrides the default title attribute behavior of the browser

### Selector
`ef-tooltip` can be used for advanced use cases e.g. specified position of tooltips, custom rendering, or to show a tooltip only when a condition is met.

To customize behavior of tooltip in particular element, add `ef-tooltip` into your page, use `selector` to specify CSS selector for elements and `tooltip` to specify text content of the tooltip.

```live
<div class="navigation" style="padding: 40px 0;">
    <ef-button tooltip="Hooray!">Hover Me</ef-button>
    <!-- Tooltip will not show on this button as tooltip nor title is defined -->
    <ef-button>No Tooltip</ef-button>
</div>
</div>
<ef-tooltip selector=".navigation ef-button"></ef-tooltip>
```

```html
<div class="navigation">
    <ef-button tooltip="Hooray!">Hover Me</ef-button>
    <!-- Tooltip will not show on this button as tooltip nor title is defined -->
    <ef-button>No Tooltip</ef-button>
</div>
<ef-tooltip selector=".navigation ef-button"></ef-tooltip>
```

### Positioning tooltips
By default, the tooltip is positioned based on the pointer coordinates (`auto`). The tooltip can be configured to be displayed `above`, `below`, `left`, or `right` of the element.

```live
<style>
    .navigation > * {
        margin-right: 30px;
    }
</style>
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

### Tooltip transition styles
Use `transition-style` attribute to make tooltips display with different transition style, default transition is `fade`. The transition style should be used rationally with tooltip position.


```live
<style>
  .navigation {
    padding: 20px 0px;
  }
  .navigation > * {
      margin-right: 30px;
  }
</style>

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

### Custom content

Custom content can be added to tooltip instead of text.

```live
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
        <td style="color: green">$1,030.45 (+0.2949%)</td>
        <td style="color: red">$266.98 (-1.3378%)</td>
      </tr>
    </tbody>
  </table>
</ef-tooltip>
```

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
        <td style="color: green">$1,030.45 (+0.2949%)</td>
        <td style="color: red">$266.98 (-1.3378%)</td>
      </tr>
    </tbody>
  </table>
</ef-tooltip>
```

### Custom rendering
Uses custom rendering to display HTML content in tooltip text. The content passed to renderer function needs to be HTMLElement object.

> Note: If `title` attribute is provided; or custom content of tooltip is specified, `renderer` will be ignored.

```live
<style>
    .symbol {
        margin-right: 30px;
    }
</style>
<div style="padding: 60px 0;">
    <label class="symbol" id="google">GOOGL.O</label>
    <label class="symbol" id="facebook">FB.O</label>
    <label class="symbol" id="netflix">NFLX.O</label>
</div>
<ef-tooltip id="symbol-tooltip" selector=".symbol"></ef-tooltip>

<script>
    var tooltip = document.getElementById('symbol-tooltip');
    tooltip.renderer = function (target) {
        var ret = document.createElement('div');
        var title = document.createElement('div');
        title.style.fontWeight = 'bold';
        title.style.paddingBottom = '3px';
        var price = document.createElement('div');
        ret.appendChild(title);
        ret.appendChild(price);

        switch(target.id) {
            case 'google':
                title.innerText = 'Alphabet Inc';
                price.innerText = '$1,030.45 (+0.2949%)';
                price.style.color = 'green';
                break;
            case 'facebook':
                title.innerText = 'Facebook Inc';
                price.innerText = '$132.43 (+0.6689%)';
                price.style.color = 'green';
                break;
            case 'netflix':
                title.innerText = 'Netflix Inc';
                price.innerText = '$266.98 (-1.3378%)';
                price.style.color = 'red';
                break;
            default:
                ret = null;
                break;
        }
        return ret;
    }
</script>
```

```html
<label class="symbol" id="google">GOOGL.O</label>
<label class="symbol" id="facebook">FB.O</label>
<label class="symbol" id="netflix">NFLX.O</label>
<ef-tooltip id="symbol-tooltip" selector=".symbol"></ef-tooltip>
```

```js
<script>
    var tooltip = document.getElementById('symbol-tooltip');
    tooltip.renderer = function (target) {
        var ret = document.createElement('div');
        var title = document.createElement('div');
        title.style.fontWeight = 'bold';
        title.style.paddingBottom = '3px';
        var price = document.createElement('div');
        ret.appendChild(title);
        ret.appendChild(price);

        switch(target.id) {
            case 'google':
                title.innerText = 'Alphabet Inc';
                price.innerText = '$1,030.45 (+0.2949%)';
                price.style.color = 'green';
                break;
            case 'facebook':
                title.innerText = 'Facebook Inc';
                price.innerText = '$132.43 (+0.6689%)';
                price.style.color = 'green';
                break;
            case 'netflix':
                title.innerText = 'Netflix Inc';
                price.innerText = '$266.98 (-1.3378%)';
                price.style.color = 'red';
                break;
            default:
                ret = null;
                break;
        }
        return ret;
    }
</script>
```

Custom renderer can also be applied to show tooltip only when text is too long and does not fit to container.

``` css
.item {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

``` javascript
var tooltip = document.getElementById('item-tooltip');

tooltip.renderer = function (target) {
  if (target.scrollWidth - target.clientWidth === 0) {
    return null;
  }
  // return itself as content of tooltip
  return target;
};
```

### Conditioning tooltip
Uses custom condition to trigger tooltip only when condition is met.

```live
<div style="padding: 30px 0;">
    <ef-text-field style="width:400px" id="amount" tooltip="Value must be number and at least 100" placeholder="Input amount. Tooltip will show when input invalid."></ef-text-field>
    <ef-tooltip id="amount-tooltip"></ef-tooltip>
</div>

<script>
  var input = document.getElementById('amount');
  var tooltip = document.getElementById('amount-tooltip');
  var isValid = function (val) {
    return isNaN(parseInt(val, 10)) || parseInt(val, 10) < 100;
  };

  input.addEventListener('value-changed', function () {
    input.error = isValid(input.value);
  });

  tooltip.condition = function (target, paths) {
    return target === input && isValid(target.value);
  };
</script>
```

```html
<ef-text-field id="amount" tooltip="Value must be number and at least 100" placeholder="Input amount. Tooltip will show when input invalid."></ef-text-field>
<ef-tooltip id="amount-tooltip"></ef-tooltip>
```

```js
var input = document.getElementById('amount');
var tooltip = document.getElementById('amount-tooltip');
var isValid = function (val) {
  return isNaN(parseInt(val, 10)) || parseInt(val, 10) < 100;
};

input.addEventListener('value-changed', function () {
  input.error = isValid(input.value);
});

tooltip.condition = function (target, paths) {
  return target === input && isValid(target.value);
};
```

## Default tooltip
It is recommended to have only one instance of tooltip per page. The default tooltip element is always included when the developer adds `ef-tooltip` to the application.

Use `addTooltipCondition` and `removeTooltipCondition` to reuse the default tooltip:

```javascript
import { addTooltipCondition, removeTooltipCondition } from '@refinitiv-ui/tooltip';

// Show tooltip for elements that have "ref" attribute
const condition = target => target.hasAttribute('ref');

// Show tooltip content
const render = target => `My reference is: ${target.getAttribute('ref')}`;

addTooltipCondition(condition, render);

// Do not forget to remove tooltip condition once not required to avoid memory leaks
removeTooltipCondition(condition);
```

### Overflow tooltip
Overflow tooltip reuses the concept of _Default tooltip_ to show tooltip when text overflows:

```html
<style>
  .overflow {
    white-space: nowrap;
    width: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
<div class="overflow">Very long text with overflow</div>
```

```javascript
import { registerOverflowTooltip } from '@refinitiv-ui/tooltip';
const overflowElement = document.querySelector('.overflow');
registerOverflowTooltip(overflowElement);
```

## Time Delay
Timer to show or hide tooltip can be customized by using `--show-delay` and `--hide-delay` CSS variables.

| CSS Variables Name | Description                                             |
| ------------------ | ------------------------------------------------------- |
| --show-delay       | Time to show tooltip when mouse hover, in milliseconds  |
| --hide-delay       | Time to hide tooltip when mouse leaves, in milliseconds |

> Note: setting these variables to small values will cause performance issue.

```live
<style>
.delay {
  --show-delay: 3000ms;
  --hide-delay: 2000ms;
}
</style>
<div style="padding: 30px 0;">
  <label id="delay-label" tooltip="Hello! I will hide within 2 seconds.">Hover me. and wait for 3 second</label>
  <ef-tooltip class="delay" selector="#delay-label"></ef-tooltip>
</div>
```

```css
.delay {
  --show-delay: 3000ms;
  --hide-delay: 2000ms;
}
```

```html
<label id="delay-label" tooltip="Hello! 2 seconds, I will hide.">Hover me. and wait 3 second</label>
<ef-tooltip class="delay" selector="#delay-label"></ef-tooltip>
```
