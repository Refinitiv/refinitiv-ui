<!--
type: page
title: Instrument Movement Colors
location: ./styles/movement-colors
layout: default
-->

# Instrument Movement Colors

EF themes provide a set of colors to use for instrument movement colors. Positive and negative are represented using different colors depending on the culture. For example, red is culturally seen as a positive color in China.

You can set the movement color profile in your application by using `movement-color-profile` attribute to html tag. The American profile will be used if the attribute is not present.

```html
<html movement-color-profile="asian1">
```

Supported value are:

* `american`
* `asian1`
* `asian2`
* `european`

Colors are provided as CSS variables. The variables are set at html tag. It will be cascaded and becomes available within any elements.

| Variable Name           | Description                                                         |
| ----------------------- | ------------------------------------------------------------------- |
| --color-scheme-negative | Use to style negative value.                                        |
| --color-scheme-neutral  | Use to style unchanged value.                                       |
| --color-scheme-positive | Use to style positive value.                                        |
| --color-scheme-tickup   | Use to style up tick icon.                                          |
| --color-scheme-tickdown | Use to style down tick icon.                                        |
| --color-scheme-ticktext | Use to style text color when the value ticks up, unchanged or down. |


In application, the colors can be used with CSS class and apply it to any html elements.

```html
<style>
  .positive {
    color: var(--color-scheme-positive);
  }
  .neutral {
    color: var(--color-scheme-neutral);
  }
  .negative {
    color: var(--color-scheme-negative);
  }
  .tick-up {
    color: var(--color-scheme-tickup);
  }
  .tick-down {
    color: var(--color-scheme-tickdown);
  }
  .up-change {
    background-color: var(--color-scheme-positive);
    color: var(--color-scheme-ticktext);
  }
  .unchanged {
    background-color: var(--color-scheme-neutral);
    color: var(--color-scheme-ticktext);
  }
  .down-change {
    background-color: var(--color-scheme-negative);
    color: var(--color-scheme-ticktext);
  }
</style>
```

::
```html
<div class="menu">
  <ef-button-bar managed>
    <ef-button toggles active id="american" class="button">American</ef-button>
    <ef-button toggles id="asian1" class="button">Asian1</ef-button>
    <ef-button toggles id="asian2" class="button">Asian2</ef-button>
    <ef-button toggles id="european" class="button">European</ef-button>
  </ef-button-bar>
</div>
<div class="container">
  <ef-panel>
    <table>
      <tr>
        <td>Up Tick:</td>
        <td><ef-icon icon="arrow-up-fill" class="tick-up"></ef-icon></td>
      </tr>
      <tr>
        <td>Down Tick:</td>
        <td><ef-icon icon="arrow-down-fill" class="tick-down"></ef-icon></td>
      </tr>
      <tr>
        <td>Up:</td>
        <td class="positive">12.30</td>
      </tr>
      <tr>
        <td>Unchange:</td>
        <td class="unchange">12.29</p></td>
      </tr>
      <tr>
        <td>Down:</td>
        <td class="negative">-12.28</p></td>
      </tr>
      <tr>
        <td>Up Change:</td>
        <td id="upChange" class="positive-change positive">1.04%</p></td>
      </tr>
      <tr>
        <td>Unchange:</td>
        <td id="unChange" class="neutral-change negative">-0.51%</p></td>
      </tr>
      <tr>
        <td>Down Change:</td>
        <td id="downChange" class="negative-change positive">2.35%</p></td>
      </tr>
    </table>
  </ef-panel>
</div>
```
```css
.menu {
  text-align: center;
  padding-top: 20px;
}
ef-panel {
  width: 100%;
}
td {
  border: none !important;
  transition: background-color 0.3ms ease;
}
tr {
  background-color: transparent !important;
}
tr:hover td {
  background-color: unset;
  color: inherit;
}
td.positive-change {
  background-color: var(--color-scheme-positive) !important;
  color: var(--color-scheme-ticktext) !important;
}
td.neutral-change {
  background-color: var(--color-scheme-neutral) !important;
  color: var(--color-scheme-ticktext) !important;
}
td.negative-change {
  background-color: var(--color-scheme-negative) !important;
  color: var(--color-scheme-ticktext) !important;
}
p {
  margin: 0;
  font-weight: 600;
  text-align: center;
  color: var(--color-scheme-primary);
  text-transform: capitalize;
}
td:nth-child(even) {
  text-align: center;
}
.container {
  display: block;
  padding: 20px;
  max-width: 275px;
  margin: 0 auto;
}
.positive {
  color: var(--color-scheme-positive) !important;
}
.unchange {
  color: var(--color-scheme-neutral) !important;
}
.negative {
  color: var(--color-scheme-negative) !important;
}
.tick-up {
  margin-right: 10px;
  color: var(--color-scheme-tickup);
}
.tick-down {
  margin-right: 10px;
  color: var(--color-scheme-tickdown);
}
```
```javascript
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/panel?min';
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/button?min';
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/button-bar?min';
import { halo } from '/theme-loader.js';
halo('panel', 'button', 'button-bar');

const changeRegion = region => {
  document.documentElement.setAttribute('movement-color-profile', region);
}

const registerClickEvent = id => {
  document.getElementById(id).addEventListener('click', () => changeRegion(id));
}

registerClickEvent('american');
registerClickEvent('asian1');
registerClickEvent('asian2');
registerClickEvent('european');

const upChange = document.getElementById('upChange');

setInterval(() => {
  if (upChange.classList.length > 1) {
    upChange.classList.remove('positive-change');
  }
  else {
    upChange.classList.add('positive-change');
  }}, 500);

setInterval(() => {
  if (unChange.classList.length > 1) {
    unChange.classList.remove('neutral-change');
  }
  else {
    unChange.classList.add('neutral-change');
  }}, 900);

setInterval(() => {
  if (downChange.classList.length > 1) {
    downChange.classList.remove('negative-change');
  }
  else {
    downChange.classList.add('negative-change');
  }}, 700)
```
::

::footer::
