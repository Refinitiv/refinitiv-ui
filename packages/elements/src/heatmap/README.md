# Heatmap

```live(preview)
  <ef-heatmap style="width: 80%;"></ef-heatmap>
  <script>
    var el = document.querySelector('ef-heatmap');
    var generateData = function (r, c) {
        var rows = Array(r);
        for (var i = 0; i < rows.length; i++) {
            var columns = Array(c);
            for (var ii = 0; ii < columns.length; ii++) {
              var shift = (i * ii) / (c * r);
              var value = -1 + shift + (Math.random() / 2 + 0.5 * shift) * (2 - shift) * 1;
              columns[ii] = {
                  value: value
              };
            }
            rows[i] = columns;
        }
        return rows;
    };
    el.config = {
        data: generateData(12, 12),
        yAxis: {
            labels: ['2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007']
        },
        xAxis: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            shortLabels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
        }
    };
  </script>
```

`ef-heatmap` is a graphical representation of data where the individual values contained in a matrix are represented as colors.

## Basic Usage

To initialize the heatmap, pass a configuration object to `config` property. Heatmap uses `mid-point` and cell's `value` to determine colors of cells.

Default value of min, mid and max points are -1, 0 and 1, respectively.

```js
var el = document.querySelector("ef-heatmap");
el.config = {
  data: [
    [{ value: 0.1 }, { value: 0.2 }, { value: 0.3 }],
    [{ value: 0.4 }, { value: 0.5 }, { value: 0.6 }],
    [{ value: 0.7 }, { value: 0.8 }, { value: 0.9 }],
    [{ value: 1.0 }, { value: 1.1 }, { value: 1.2 }],
  ],
};
```

#### Config

| Properties | Type       | Required | Description                                         |
| ---------- | ---------- | -------- | --------------------------------------------------- |
| data       | `Cell`[][] | ✓        | rows[ columns[[Cell](#cell-s-configuration)] ]      |
| yAxis      | `YAxis`    | ✗        | Configuration for [Y-Axis](#y-axis-s-configuration) |
| xAxis      | `XAxis`    | ✗        | Configuration for [X-Axis](#x-axis-s-configuration) |

## Min, max and mid data point

You can configure min, mid and max point to match your data format by using `min-point`, `mid-point` and `max-point` attribute.

The example below shows how to configure the heatmap when data is ranged between 250 and 800 and mid point is 600.

```live
  <style>
    ef-heatmap {
        height: 35px;
    }
  </style>
  <ef-heatmap min-point="250" mid-point="600" max-point="800" axis-hidden></ef-heatmap>
  <script>
    var el = document.querySelector('ef-heatmap');
    var generateSequentialData = function (start, count, step) {
        var rows = [];
        var columns = [];
        for (var i = 0; i < count; i++) {
            columns.push({ value: start + step * i });
        }
        rows.push(columns);
        return rows;
    };
    el.config = {
        data: generateSequentialData(250, 15, 39.286),
    };
  </script>
```

```html
<ef-heatmap
  min-point="250"
  mid-point="600"
  max-point="800"
></ef-heatmap>
```

## Cell appearances

Heatmap cell's appearances derives from data in `config`. However, it allows a certain degree of customizations and features addition on each individual cell.

### Cell header

Besides cell's label, there is also cell header property which is **bolder** and always positioned on top of the label.

```live
  <ef-heatmap></ef-heatmap>
   <script>
    var el = document.querySelector('ef-heatmap');
    el.config = {
      data: [
        [
          { header: "IBM", value: 0.4 },
          { header: "APPL", value: 0.52 },
          { header: "AMZN", value: -0.3 }
        ],
        [
          { header: "T", value: -0.4 },
          { header: "NFLX", value: 0.5 },
          { header: "GM", value: -1.6 }
        ],
        [
          { header: "FB", value: 0.17 },
          { header: "VXUS", value: -2.8 },
          { header: "GOOGL", value: 3.9 }
        ]
      ]
    };
  </script>
```

```js
var el = document.querySelector("ef-heatmap");
el.config = {
  data: [
    [
      { header: "IBM", value: 0.4 },
      { header: "APPL", value: 0.52 },
      { header: "AMZN", value: -0.3 },
    ],
    [
      { header: "T", value: -0.4 },
      { header: "NFLX", value: 0.5 },
      { header: "GM", value: -1.6 },
    ],
    [
      { header: "FB", value: 0.17 },
      { header: "VXUS", value: -2.8 },
      { header: "GOOGL", value: 3.9 },
    ],
  ],
};
```

### Cell color blending

Color blending mode mixes the max and min colors with canvas's background color, resulting in more natural gradient-like cell colors.

```live
  <style>
    ef-heatmap {
        height: 35px;
    }
  </style>
  <ef-heatmap axis-hidden blend></ef-heatmap>
  <script>
    var el = document.querySelector('ef-heatmap');
    var generateSequentialData = function (start, count, step) {
        var rows = [];
        var columns = [];
        for (var i = 0; i < count; i++) {
            columns.push({ value: start + step * i });
        }
        rows.push(columns);
        return rows;
    };
    el.config = {
        data: generateSequentialData(-1, 21, 0.1),
    };
    el.renderCallback = function(cell) {
        return { foregroundColor: '#f0f0f0' }
    };
  </script>
```

```html
<ef-heatmap blend></ef-heatmap>
```

Apply custom cell's font color to improve contrast.

```js
const el = document.querySelector("ef-heatmap");
el.renderCallback = function (cell) {
  return { foregroundColor: "#f0f0f0" };
};
```

### Custom cell colors

Default colors provided by themes but they can be overridden using CSS variables.

```live
  <style>
    ef-heatmap {
        height: 35px;
        --above-point-color: #3399ff;
        --below-point-color: #ff3399;
    }
  </style>
  <ef-heatmap axis-hidden></ef-heatmap>
  <script>
    var el = document.querySelector('ef-heatmap');
    var generateSequentialData = function (start, count, step) {
        var rows = [];
        var columns = [];
        for (var i = 0; i < count; i++) {
            columns.push({ value: start + step * i });
        }
        rows.push(columns);
        return rows;
    };
    el.config = {
        data: generateSequentialData(-1, 21, 0.1),
    };
  </script>
```

```html
<style>
  ef-heatmap {
    --above-point-color: #3399ff;
    --below-point-color: #ff3399;
  }
</style>
<ef-heatmap></ef-heatmap>
```

### CSS variables

| CSS Variables Names | Description                   |
| ------------------- | ----------------------------- |
| --spacing           | Margin around a cell in pixel |
| --above-point-color | Color at the maximum point   |
| --below-point-color | Color at the minimum point   |

### Custom cell rendering

Heatmap accepts a custom render function to `renderCallback` property to override `label`, `backgroundColor` and `foregroundColor` of each cell.

Following cell information are also available to access :

- `x` : x coordinates of the cell on canvas
- `y` : y coordinates of the cell on canvas
- `colIndex` : column position of cell (index starts at 0)
- `rowIndex` : row position of cell (index starts at 0)

```live
  <ef-heatmap></ef-heatmap>
  <script>
    var el = document.querySelector('ef-heatmap');
    var generateData = function (r, c) {
        var rows = Array(r);
        for (var i = 0; i < rows.length; i++) {
            var columns = Array(c);
            for (var ii = 0; ii < columns.length; ii++) {
            var shift = (i * ii) / (c * r);
            var value = -1 + shift + (Math.random() / 2 + 0.5 * shift) * (2 - shift);

            columns[ii] = {
                value: value
            };
            }
            rows[i] = columns;
        }
        return rows;
    };
    el.config = {
        data: generateData(12, 12),
        yAxis: {
            labels: ['2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005']
        },
        xAxis: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            shortLabels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
        }
    };
    el.renderCallback = function (cell) {
      var isDiagonalLine = cell.colIndex === cell.rowIndex;
      if (isDiagonalLine) {
        return {
          label: '',
          backgroundColor: 'transparent'
        }
      }
    };
  </script>
```

```js
var el = document.querySelector("ef-heatmap");
el.renderCallback = function (cell) {
  var isDiagonalLine = cell.colIndex === cell.rowIndex;

  if (isDiagonalLine) {
    return {
      label: "",
      backgroundColor: "transparent",
    };
  }
};
```

#### Cell's configuration

| Properties      | Type                                   | Description              |
| --------------- | -------------------------------------- | ------------------------ |
| value           | `number`                               | Cell's value             |
| header          | `string`                               | Cell's header            |
| label           | `string`                               | Cell's label             |
| foregroundColor | `string` of valid color (`hex`, `rgb`) | Cell's label color      |
| backgroundColor | `string` of valid color (`hex`, `rgb`) | Cell's background color |

## Axes position

Each axis has 2 different position options. X-axis can be at `top` or `bottom` and Y-axis can be at `left` or `right`.

```live
  <ef-heatmap></ef-heatmap>
  <script>
    var el = document.querySelector('ef-heatmap');
    var generateData = function (r, c) {
        var rows = Array(r);
        for (var i = 0; i < rows.length; i++) {
            var columns = Array(c);
            for (var ii = 0; ii < columns.length; ii++) {
            var shift = (i * ii) / (c * r);
            var value = -1 + shift + (Math.random() / 2 + 0.5 * shift) * (2 - shift);

            columns[ii] = {
                value: value
            };
            }
            rows[i] = columns;
        }
        return rows;
    };
    el.config = {
        data: generateData(12, 12),
        yAxis: {
          position: 'right',
          labels: ['2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005']
        },
        xAxis: {
          position: 'bottom',
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          shortLabels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
        }
    };
  </script>
```

```js
  var el = document.querySelector("ef-heatmap");
  el.config = {
    yAxis: {
      position: "right",
      labels: [...]
    },
    xAxis: {
      position: "bottom",
      labels: [...],
    }
  };
```

#### Y-Axis's configuration

| Properties | Type              | Description                                |
| ---------- | ----------------- | ------------------------------------------ |
| labels     | `string`[]        | Y-axis labels                              |
| position   | `left` or `right` | Y-axis orientation relative to the heatmap |

#### X-Axis's configuration

| Properties  | Type              | Description                                |
| ----------- | ----------------- | ------------------------------------------ |
| labels      | `string`[]        | X-axis labels                              |
| shortLabels | `string`[]        | X-axis short labels for smaller screens    |
| position    | `top` or `bottom` | X-axis orientation relative to the heatmap |

## Using tooltip

To render tooltip on cell hover, pass a tooltip render function that returns HTML elements using `tooltipCallback` property.

```live
  <ef-heatmap></ef-heatmap>
  <script>
    var el = document.querySelector('ef-heatmap');
    var generateData = function (r, c) {
        var rows = Array(r);
        for (var i = 0; i < rows.length; i++) {
            var columns = Array(c);
            for (var ii = 0; ii < columns.length; ii++) {
            var shift = (i * ii) / (c * r);
            var value = -1 + shift + (Math.random() / 2 + 0.5 * shift) * (2 - shift);

            columns[ii] = {
                value: value
            };
            }
            rows[i] = columns;
        }
        return rows;
    };
    el.tooltipCallback = function (cell) {
      var tooltip = document.createElement('div');
      var template = "<div style='font-weight: bold'>Actual value:</div><div style='color:"+ cell.color +"'>" + cell.value + "</div>";
      tooltip.innerHTML = template;
      return tooltip;
    };
    el.config = {
        data: generateData(12, 12),
        yAxis: {
          labels: ['2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005']
        },
        xAxis: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          shortLabels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
        }
    };
  </script>
```

```js
  var el = document.querySelector("ef-heatmap");
  el.tooltipCallback = function(cell) {
    var tooltip = document.createElement("div");
    var template = `
          <div style="font-weight: bold">Actual value:</div>
          <div style="color:${cell.color}">${cell.value}</div>
        `;
    tooltip.innerHTML = template;
    return tooltip;
  };
  el.config = {...};
```
