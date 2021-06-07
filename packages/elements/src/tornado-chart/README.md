# Tornado Chart

```live(preview)
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

`ef-tornado-chart` is a data visualization that helps to show the differences or similarities between values. It also provides options to add chart header, footer, or highlight on any items.

### Basic usage

`ef-tornado-chart` is a collection of bars defined by  `ef-tornado-item`. Each item comprises a primary bar and a secondary bar.

The `ef-tornado-item` supports attributes as below.

| Tornado Item Attributes | Description                   |
| ------------------------------- | ----------------------------- |
| primary-value                   | Value of primary bar, 0-100   |
| primary-label                   | Text to show on primary bar   |
| secondary-value                 | Value of secondary bar, 0-100 |
| secondary-label                 | Text to show on secondary bar |

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

You can add `highlighted` attribute to any `ef-tornado-item` to show the highlighted style. You can also set this property to `true` using codes to produce the same result.

```html
<ef-tornado-item
  primary-value="25"
  primary-label="25%"
  secondary-value="75"
  secondary-label="75%"
  highlighted
  >Global Average</ef-tornado-item
>
```

### Header and footer

Any HTML contents can be added to the header and footer section of the chart by using the `header` and `footer` slot, respectively.

```live
<style>
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
</style>
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

### Customize colors

Colors of the chart can be customized by using CSS variables; `--primary-color` for primary bars and `--secondary-color` for secondary bars.

The variables can be set at `ef-tornado-chart` level and it will be inherited to all `ef-tornado-item`. However, the variable can be set at `ef-tornado-item` individually as well.

```live
<style>
  ef-tornado-chart.custom-color {
    padding-top: 30px;
    --primary-color: #bf5f82;
    --secondary-color: #f48fb1;
  }

  ef-tornado-item.highlight-color {
    --primary-color: #a00037;
    --secondary-color: #d81b60;
  }
</style>
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

```css
<style>
  ef-tornado-chart.custom-color {
    --primary-color: #bf5f82;
    --secondary-color: #f48fb1;
  }

  ef-tornado-item.highlight-color {
    --primary-color: #a00037;
    --secondary-color: #d81b60;
  }
</style>
```

```html
<ef-tornado-chart class="custom-color">
  <ef-tornado-item>...</ef-tornado-item>
  <ef-tornado-item>...</ef-tornado-item>
  <ef-tornado-item class="highlight-color">...</ef-tornado-item>
  <ef-tornado-item>...</ef-tornado-item>
</ef-tornado-chart>
```

### Responsiveness

Tornado chart has a default breakpoint value, specified in the theme file, to reflow the layout to a vertical style when it is too small. You can override the value by using css variable, `--responsive-width`.

```live
<style>
  [responsive] {
    --responsive-width: 400;
    width: 380px;
  }

  ef-tornado-chart {
    padding-top: 30px;
  }
</style>
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

```css
<style>
  ef-tornado-chart {
    --responsive-width: 400;
  }
</style>
```

### CSS Variables

Tornado chart provides few CSS variables to customize the chart.

| CSS Variables Name | Description                                                                    |
| ------------------ | ------------------------------------------------------------------------------ |
| --responsive-width | Overridden theme's value of breakpoints to show chart vertical style, e.g. 400 |
| --primary-color    | Custom primary bar color                                                      |
| --secondary-color  | Custom secondary bar color                                                    |
