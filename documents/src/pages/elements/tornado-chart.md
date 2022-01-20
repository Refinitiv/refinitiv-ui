<!--
type: page
title: Tornado Chart
location: ./elements/tornado-chart
layout: default
-->

# Tornado Chart

::
```javascript
::tornado-chart::
```
```html
<ef-tornado-chart primary="7+ hours" secondary="less than 7 hours">
  <ef-tornado-item primary-value="61" primary-label="61%" secondary-value="39" secondary-label="39%">India</ef-tornado-item>
  <ef-tornado-item primary-value="35" primary-label="35%" secondary-value="65" secondary-label="65%">China</ef-tornado-item>
  <ef-tornado-item primary-value="28" primary-label="28%" secondary-value="72" secondary-label="72%">Thailand</ef-tornado-item>
  <ef-tornado-item primary-value="25" primary-label="25%" secondary-value="75" secondary-label="75%"
    highlighted>Global Average</ef-tornado-item>
  <ef-tornado-item primary-value="22" primary-label="22%" secondary-value="78" secondary-label="78%">United
    States</ef-tornado-item>
  <ef-tornado-item primary-value="10" primary-label="10%" secondary-value="90" secondary-label="90%">Britain</ef-tornado-item>
  <ef-tornado-item primary-value="5" primary-label="5%" secondary-value="95" secondary-label="95%">Finland</ef-tornado-item>
</ef-tornado-chart>
```
::

`ef-tornado-chart` visually represents differences or similarities between values. It provides options to add a chart header, add a footer or highlight items.

### Usage
`ef-tornado-chart` is a collection of bars defined by `ef-tornado-item`. Each item comprises a primary bar and a secondary bar.

`ef-tornado-item` supports the attributes below.

| Tornado Item Attributes | Description                   |
| ----------------------- | ----------------------------- |
| primary-value           | Value of primary bar, 0-100   |
| primary-label           | Text to show on primary bar   |
| secondary-value         | Value of secondary bar, 0-100 |
| secondary-label         | Text to show on secondary bar |

```html
<ef-tornado-chart primary="7+ hours" secondary="less than 7 hours">
  <ef-tornado-item
    primary-value="61"
    primary-label="61%"
    secondary-value="39"
    secondary-label="39%"
    >India</ef-tornado-item
  >
  <ef-tornado-item
    primary-value="35"
    primary-label="35%"
    secondary-value="65"
    secondary-label="65%"
    >China</ef-tornado-item
  >
  <ef-tornado-item
    primary-value="5"
    primary-label="5%"
    secondary-value="95"
    secondary-label="95%"
    >Finland</ef-tornado-item
  >
</ef-tornado-chart>
```

### Highlighted items
You can add the `highlighted` attribute to `ef-tornado-item` or set `highlighted` property to `true` to apply the highlighted style.

```html
<ef-tornado-item
  primary-value="25"
  primary-label="25%"
  secondary-value="75"
  secondary-label="75%"
  highlighted
>Global Average</ef-tornado-item>
```

### Header and footer

Any HTML content can be added to the header and footer section of the chart using the `header` and `footer` slot, respectively.

::
```javascript
::tornado-chart::
```
```css
  ef-tornado-chart {
    padding-top: 30px;
  }
  [slot=header] {
    margin-bottom: 15px;
  }
  [slot=header] p {
    margin: 0;
  }
  [slot=footer],
  [slot=header] .sub-title {
    font-size: 12px;
  }
  [slot=footer] {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
  }
  [slot=footer] > * {
    margin-right: 10px;
    margin-bottom: 5px;
  }
```
```html
<ef-tornado-chart primary="7+ hours" secondary="less than 7 hours">
  <ef-tornado-item primary-value="61" primary-label="61%" secondary-value="39" secondary-label="39%">India</ef-tornado-item>
  <ef-tornado-item primary-value="35" primary-label="35%" secondary-value="65" secondary-label="65%">China</ef-tornado-item>
  <ef-tornado-item primary-value="28" primary-label="28%" secondary-value="72" secondary-label="72%">Singapore</ef-tornado-item>
  <ef-tornado-item primary-value="25" primary-label="25%" secondary-value="75" secondary-label="75%"
    highlighted>Global Average</ef-tornado-item>
  <ef-tornado-item primary-value="22" primary-label="22%" secondary-value="78" secondary-label="78%">United
    States</ef-tornado-item>
  <ef-tornado-item primary-value="10" primary-label="10%" secondary-value="90" secondary-label="90%">Britain</ef-tornado-item>
  <ef-tornado-item primary-value="5" primary-label="5%" secondary-value="95" secondary-label="95%">Finland</ef-tornado-item>
  <div slot="header">
    <h3>In loco parentis</h3>
    <p>How much time do you spend on average helping your child academically with their education* per week?</p>
    <p class="sub-title">December 2017</p>
  </div>
  <div slot="footer">
    <p>Source: The Varkey Foundation</p>
    <p>*Reading to them or helping with homework</p>
  </div>
</ef-tornado-chart>
```
::

```html
<ef-tornado-chart>
  <ef-tornado-item>...</ef-tornado-item>
  <ef-tornado-item>...</ef-tornado-item>
  ...
  <ef-tornado-item>...</ef-tornado-item>
  <div slot="header">
    <h3>In loco parentis</h3>
    <p>
      How much time do you spend on average helping your child academically with
      their education* per week?
    </p>
    <p class="sub-title">December 2017</p>
  </div>
  <div slot="footer">
    <p>Source: The Varkey Foundation</p>
    <p>*Reading to them or helping with homework</p>
  </div>
</ef-tornado-chart>
```

### Responsiveness

Tornado chart has a default breakpoint value, specified in the theme file, to reflow the layout to a vertical style when it is too small. You can override the value by using css variable, `--responsive-width`.

::
```javascript
::tornado-chart::
```
```css
[responsive] {
  --responsive-width: 400;
  width: 380px;
}

ef-tornado-chart {
  padding-top: 30px;
}
```
```html
<ef-tornado-chart responsive primary="7+ hours" secondary="less than 7 hours">
  <ef-tornado-item primary-value="61" primary-label="61%" secondary-value="39" secondary-label="39%">India</ef-tornado-item>
  <ef-tornado-item primary-value="35" primary-label="35%" secondary-value="65" secondary-label="65%">China</ef-tornado-item>
  <ef-tornado-item primary-value="28" primary-label="28%" secondary-value="72" secondary-label="72%">Singapore</ef-tornado-item>
  <ef-tornado-item primary-value="25" primary-label="25%" secondary-value="75" secondary-label="75%"
    highlighted class="highlight-color">Global Average</ef-tornado-item>
  <ef-tornado-item primary-value="22" primary-label="22%" secondary-value="78" secondary-label="78%">United
    States</ef-tornado-item>
  <ef-tornado-item primary-value="10" primary-label="10%" secondary-value="90" secondary-label="90%">Britain</ef-tornado-item>
  <ef-tornado-item primary-value="5" primary-label="5%" secondary-value="95" secondary-label="95%">Finland</ef-tornado-item>
</ef-tornado-chart>
```
::



### CSS Variables

Colors of the chart can be customized using CSS variables; `--primary-color` for primary bars and `--secondary-color` for secondary bars.

The variables can be set at the `ef-tornado-chart` level and will be inherited by any `ef-tornado-item`. However, the variable can be set at the `ef-tornado-item` level, as well.

::
```javascript
::tornado-chart::
```
```css
ef-tornado-chart.custom-color {
  padding-top: 30px;
  --primary-color: #bf5f82;
  --secondary-color: #f48fb1;
  --responsive-width: 400;
}

ef-tornado-item.highlight-color {
  --primary-color: #a00037;
  --secondary-color: #d81b60;
}
```
```html
<ef-tornado-chart class="custom-color" primary="7+ hours" secondary="less than 7 hours">
  <ef-tornado-item primary-value="61" primary-label="61%" secondary-value="39" secondary-label="39%">India</ef-tornado-item>
  <ef-tornado-item primary-value="35" primary-label="35%" secondary-value="65" secondary-label="65%">China</ef-tornado-item>
  <ef-tornado-item primary-value="28" primary-label="28%" secondary-value="72" secondary-label="72%">Singapore</ef-tornado-item>
  <ef-tornado-item primary-value="25" primary-label="25%" secondary-value="75" secondary-label="75%"
    highlighted class="highlight-color">Global Average</ef-tornado-item>
  <ef-tornado-item primary-value="22" primary-label="22%" secondary-value="78" secondary-label="78%">United
    States</ef-tornado-item>
  <ef-tornado-item primary-value="10" primary-label="10%" secondary-value="90" secondary-label="90%">Britain</ef-tornado-item>
  <ef-tornado-item primary-value="5" primary-label="5%" secondary-value="95" secondary-label="95%">Finland</ef-tornado-item>
</ef-tornado-chart>
```
::

| CSS Variables Name | Description                                                                  |
| ------------------ | ---------------------------------------------------------------------------- |
| --responsive-width | Override the theme's breakpoint value to show vertical chart style, e.g. 400 |
| --primary-color    | Custom primary bar color                                                     |
| --secondary-color  | Custom secondary bar color                                                   |

## Accessibility
::a11y-intro::

The Tornado Chart component has key data points implemented as Tooltip. The container and axes labels are hidden from assistive technologies. Access to a data table is provided as a textual alternative for accessible users. Animation includes functionality to pause, stop or hide animated content.

::a11y-end::
