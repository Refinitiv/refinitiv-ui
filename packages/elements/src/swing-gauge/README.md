# Swing Gauge

```live(preview)
<ef-swing-gauge
  primary-value="29"
  primary-label="Remain"
  secondary-value="95"
  secondary-label="Leave">
</ef-swing-gauge>

<script type="text/javascript">
let value1;
let value2;
const min = 20;
let gauge =document.querySelector('ef-swing-gauge');

setInterval(function () {
  value1 = min + (100 - min * 2) * Math.random();
  value2 = 100 - value1;
  gauge.primaryValue = value1;
  gauge.secondaryValue = value2;
}, 2000);
</script>

```

`ef-swing-gauge` is a data visualization element used to display the percentage comparison of two values.

### Set gauge value and label

Value can be set to gauge by using `primary-value` and `secondary-value` attributes. The percentage values shown in the gauge will be calculated from the comparison of `primary-value` and `secondary-value`. To show any labels in the gauge you can set the text to  `primary-label` and `secondary-label` attributes.
```live
<ef-swing-gauge
  primary-value="30"
  secondary-value="70"
  primary-label="Remain"
  secondary-label="Leave">
</ef-swing-gauge>
```

```html
<ef-swing-gauge
  primary-value="30"
  secondary-value="70"
  primary-label="Remain"
  secondary-label="Leave">
</ef-swing-gauge>
```

### Sizing
Height of Swing Gauge is set to default 200px but it can be overridden by using CSS.

```live
<div>
  <ef-swing-gauge
    small-gauge
    primary-value="30"
    secondary-value="70"
    primary-label="Remain"
    secondary-label="Leave">
  </ef-swing-gauge>
  <ef-swing-gauge
    medium-gauge
    primary-value="60"
    secondary-value="40"
    primary-label="Remain"
    secondary-label="Leave">
  </ef-swing-gauge>
</div>
<style>
div {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-end;
}

ef-swing-gauge {
  flex: 1 0 auto;
}

ef-swing-gauge[small-gauge] {
 	height: 120px; 
}

ef-swing-gauge[medium-gauge] {
 	height: 160px; 
}
</style>
```

```css
<style>
  ef-swing-gauge[small-gauge] {
    height: 120px; 
  }

  ef-swing-gauge[medium-gauge] {
 	height: 160px; 
  }
</style>
```

### Customize colors and center line
Colors and center line of Swing Gauge are managed by theme but can be overridden by using CSS variables.

```live
<ef-swing-gauge
  custom-color
  primary-label="Remain"
  secondary-label="Leave"
  primary-value="40"
  secondary-value="60">
</ef-swing-gauge>
<style>
ef-swing-gauge[custom-color] {
  --primary-color: #ff9933;
  --secondary-color: #9933ff;
  --text-color: #ffffff;
  --border-color: transparent;
  --center-line: dashed;
  --center-line-color: #42f48c;
  --center-line-opacity: 1;
}
</style>
```

```css
<style>
  ef-swing-gauge[custom-color] {
    --primary-color: #ff9933;
    --secondary-color: #9933ff;
    --text-color: #ffffff;
    --border-color: transparent;
    --center-line: dashed;
    --center-line-color: #42f48c;
    --center-line-opacity: 1;
  }
</style>
```

```html
<ef-swing-gauge
  custom-color
  primary-label="Remain"
  secondary-label="Leave"
  primary-value="40"
  secondary-value="60">
</ef-swing-gauge>
```

| CSS Variables Name           | Description                                                 |
| ---------------------------- | ----------------------------------------------------------- |
| --primary-color              | Color of primary gauge                                      |
| --secondary-color            | Color of secondary gauge                                    |
| --text-color                 | Color of text                                               |
| --border-color               | Color of border                                             |
| --center-line                | Style of center line (solid, dotted, dashed or none)        |
| --center-line-color          | Color of center line                                        |
| --center-line-opacity        | Opacity/Transparency of center line                         |
