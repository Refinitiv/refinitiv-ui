<!--
type: page
title: Card
location: ./elements/card
layout: default
-->

# Card
::
```javascript
::card::
```
```html
<ef-card style="margin: 10px" header="Vlad the vaccinator: Dracula's castle lures visitors with COVID-19 jabs" footer="Source: Reuters">
  <img style="width: 100%; height:auto;" src="https://cloudfront-us-east-2.images.arcpublishing.com/reuters/FCGFMWQNF5MAZHNHQFVP5LUV3M.jpg">
  <div style="padding: 10px 0">Visitors to Dracula's castle are more likely to find puncture marks in their arms than their necks this month, after medics set up a COVID-19 vaccination centre at the Transylvanian attraction.</div>
</ef-card>
```
::

`ef-card` is a versatile container that can display content inside the card frame.

### Usage
You can wrap any content with `ef-card`.

Header and footer can be set by using slotted content or by using `header` and `footer` attributes.

::
```javascript
::card::
```
```html
<ef-card style="margin: 10px;" header="NASA spacecraft starts trip back to Earth after collecting asteroid samples" footer="Source: Reuters" >
  <p>A NASA spacecraft, which scientists believe has collected samples from an asteroid, began its two-year journey back to Earth on Monday.</p>
  <p>NASA OSIRIS-REx spacecraft is attempting to complete a mission to visit Bennu, a skyscraper-sized asteroid some 200 million miles (320 million km) from Earth, survey the surface, collect samples and deliver them back to Earth.</p>
</ef-card>
```
::

Using slotted content

```html
<ef-card>
  <span slot="header">NASA spacecraft starts trip back to Earth after collecting asteroid samples</span>
  <span slot="footer">Source: Reuters</span>
  <p>A NASA spacecraft, which scientists believe has collected samples from an asteroid, began its two-year journey back to Earth on Monday.</p>
  <p>NASA's OSIRIS-REx spacecraft is attempting to complete a mission to visit Bennu, a skyscraper-sized asteroid some 200 million miles (320 million km) from Earth, survey the surface, collect samples and deliver them back to Earth.</p>
</ef-card>
```

Using `header` and `footer` attributes
```html
<ef-card
  header="NASA spacecraft starts trip back to Earth after collecting asteroid samples"
  footer="Source: Reuters" >
  <p>A NASA spacecraft, which scientists believe has collected samples from an asteroid, began its two-year journey back to Earth on Monday.</p>
  <p>NASA's OSIRIS-REx spacecraft is attempting to complete a mission to visit Bennu, a skyscraper-sized asteroid some 200 million miles (320 million km) from Earth, survey the surface, collect samples and deliver them back to Earth.</p>
</ef-card>
```

### Card menu

`ef-card` can show a menu by passing the `data` through the property using the `config` property. The schema of `data` is the same as ([Overlay Menu](./elements/overlay-menu))

Use the `item-trigger` event to detect when users click on any menu item.

::
```javascript
::card::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/interactive-chart?min';
halo('interactive-chart');
const card = document.getElementById('card');
const chart = document.getElementById('chart');
card.config = {
  menu: {
    data: [
      { label: 'Price', value: 'price' },
      { label: 'Percentage',value: 'percent' }
    ]
  }
};

chart.config = {
  options: {
    priceScale: {
      mode: 1
    }
  },
  series: [{
    symbol: 'Tesla',
    type: "area",
    data: [
      { time: "2021-12-22", value: 32.51 },
      { time: "2021-12-23", value: 31.11 },
      { time: "2021-12-24", value: 27.02 },
      { time: "2021-12-25", value: 27.32 },
      { time: "2021-12-26", value: 25.17 },
      { time: "2021-12-27", value: 28.89 },
      { time: "2021-12-28", value: 25.46 },
      { time: "2021-12-29", value: 23.92 },
      { time: "2021-12-30", value: 22.68 },
      { time: "2021-12-31", value: 22.67 }
    ]
  },
  {
    symbol: 'TSLA Futures',
    type: "line",
    data: [
      { time: "2021-12-22", value: 22.51 },
      { time: "2021-12-23", value: 11.11 },
      { time: "2021-12-24", value: 37.02 },
      { time: "2021-12-25", value: 17.32 },
      { time: "2021-12-26", value: 5.17 },
      { time: "2021-12-27", value: 18.89 },
      { time: "2021-12-28", value: 15.46 },
      { time: "2021-12-29", value: 13.92 },
      { time: "2021-12-30", value: 32.68 },
      { time: "2021-12-31", value: 12.67 }
    ]
  }]
}

card.addEventListener('item-trigger', (event) => {
  const value = event.detail.value;
  const newConfig = JSON.parse(JSON.stringify(chart.config));
  newConfig.options.priceScale.mode = value === 'percent' ? 2 : 1;
  chart.config = newConfig;
});
```
```html
<ef-card style="margin: 10px;" id="card" header="Chart">
  <ef-interactive-chart id="chart"></ef-interactive-chart>
</ef-card>
```
::

```html
<ef-card id="card" header="Chart">
  <ef-interactive-chart id="chart"></ef-interactive-chart>
</ef-card>
```

```javascript
const card = document.getElementById('card');
const chart = document.getElementById('chart');
card.config = {
  menu: {
    data: [
      { label: 'Price', value: 'price' },
      { label: 'Percentage',value: 'percent' }
    ]
  }
};

chart.config =
{
...
}

card.addEventListener('item-trigger', (event) => {
  const value = event.detail.value;
  const newConfig = JSON.parse(JSON.stringify(chart.config));
  newConfig.options.priceScale.mode = value === 'percent' ? 2 : 1;
  chart.config = newConfig;
});

```

## Accessibility
::a11y-intro::

The Card component is assigned a neutral role. The header slot is assigned `role="heading"` and has the property `aria-level`. 

::a11y-end::
