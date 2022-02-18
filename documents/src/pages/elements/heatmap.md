<!--
type: page
title: Heatmap
location: ./elements/heatmap
layout: default
-->

# Heatmap
::
```javascript
::heatmap::

const el = document.querySelector('ef-heatmap');

const generateData = (r, c) => {
  let rows = Array(r);
  for (let i = 0; i < rows.length; i++) {
    let columns = Array(c);
    for (let ii = 0; ii < columns.length; ii++) {
      const shift = (i * ii) / (c * r);
      const value = -1 + shift + (Math.random() / 2 + 0.5 * shift) * (2 - shift) * 1;
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
```
```css
ef-heatmap {
  width: 80%;
}
```
```html
<ef-heatmap></ef-heatmap>
```
::

`ef-heatmap` is a graphical representation of data where the individual values contained in a matrix are represented as colors.

## Usage
To initialize the heatmap, pass a configuration object to the `config` property. Heatmap uses `mid-point` and a cell's `value` to determine the colors of cells.

The default values of min, mid and max points are -1, 0 and 1, respectively.

```javascript
const el = document.querySelector("ef-heatmap");

el.config = {
  data: [
    [{ value: 0.1 }, { value: 0.2 }, { value: 0.3 }],
    [{ value: 0.4 }, { value: 0.5 }, { value: 0.6 }],
    [{ value: 0.7 }, { value: 0.8 }, { value: 0.9 }],
    [{ value: 1.0 }, { value: 1.1 }, { value: 1.2 }],
  ],
};
```

## Config
| Properties | Type         | Required | Description                                                          |
| ---------- | ------------ | :------: | -------------------------------------------------------------------- |
| data       | `Cell`[ ][ ] |    ✓     | rows[columns[[< Cell >](./elements/heatmap#cells-configuration)]]    |
| yAxis      | `YAxis`      |    ✗     | Configuration for [Y-Axis](./elements/heatmap#y-axiss-configuration) |
| xAxis      | `XAxis`      |    ✗     | Configuration for [X-Axis](./elements/heatmap#x-axiss-configuration) |

## Min, max and mid data point
You can configure min, mid and max points to match your data format using the `min-point`, `mid-point` and `max-point` attributes.

The example below shows how to configure the heatmap when data is ranged between 250 and 800 and the mid point is 600.

::
```javascript
::heatmap::

const el = document.querySelector('ef-heatmap');
const generateSequentialData = (start, count, step) => {
  let rows = [];
  let columns = [];
  for (let i = 0; i < count; i++) {
    columns.push({ value: start + step * i });
  }
  rows.push(columns);
  return rows;
};
el.config = {
  data: generateSequentialData(250, 15, 39.286),
};
```
```css
ef-heatmap {
    height: 35px;
}
```
```html
<ef-heatmap min-point="250" mid-point="600" max-point="800" axis-hidden></ef-heatmap>
```
::

```html
<ef-heatmap
  min-point="250"
  mid-point="600"
  max-point="800"
></ef-heatmap>
```

## Cell appearances
A Heatmap cell's appearance derives from data in `config`. However, a certain degree of customization and features addition is allowed for each individual cell.

## Cell header
Besides a cell's label, there is also a cell header property which is **bolder** and always positioned on top of the label.

::
```javascript
::heatmap::
const el = document.querySelector('ef-heatmap');
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
```
```html
<ef-heatmap></ef-heatmap>
```
::

```javascript
const el = document.querySelector("ef-heatmap");

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

## Cell color blending
Color blending mode mixes the max and min colors with the canvas's background color, resulting in more natural, gradient-like cell colors.

::
```javascript
::heatmap::

const el = document.querySelector('ef-heatmap');

const generateSequentialData = (start, count, step) => {
  let rows = [];
  let columns = [];
  for (let i = 0; i < count; i++) {
      columns.push({ value: start + step * i });
  }
  rows.push(columns);
  return rows;
};

el.config = {
  data: generateSequentialData(-1, 21, 0.1),
};

el.renderCallback = (cell) => { foregroundColor: '#f0f0f0' };
```
```css
ef-heatmap {
  height: 35px;
}
```
```html
<ef-heatmap axis-hidden blend></ef-heatmap>
```
::

```html
<ef-heatmap blend></ef-heatmap>
```

Apply custom cell's font color to improve contrast.

```javascript
const el = document.querySelector("ef-heatmap");
el.renderCallback = (cell) => { foregroundColor: "#f0f0f0" };
```

## Custom cell rendering

Heatmap accepts a custom rendering function via the `renderCallback` property to override `label`, `backgroundColor` and `foregroundColor` for each cell.

The following cell information is also available:

- `x` : x coordinates of the cell on canvas
- `y` : y coordinates of the cell on canvas
- `colIndex` : column position of the cell (index starts at 0)
- `rowIndex` : row position of the cell (index starts at 0)

::
```javascript
::heatmap::

const el = document.querySelector('ef-heatmap');
const generateData = (r, c) => {
  let rows = Array(r);
  for (let i = 0; i < rows.length; i++) {
    let columns = Array(c);
    for (let ii = 0; ii < columns.length; ii++) {
      const shift = (i * ii) / (c * r);
      const value = -1 + shift + (Math.random() / 2 + 0.5 * shift) * (2 - shift);

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

el.renderCallback = (cell) => {
  const isDiagonalLine = cell.colIndex === cell.rowIndex;
  if (isDiagonalLine) {
    return {
      label: '',
      backgroundColor: 'transparent'
    }
  }
};
```
```html
  <ef-heatmap></ef-heatmap>
```
::

```javascript
const el = document.querySelector("ef-heatmap");

el.renderCallback = (cell) => {
  const isDiagonalLine = cell.colIndex === cell.rowIndex;

  if (isDiagonalLine) {
    return {
      label: "",
      backgroundColor: "transparent",
    };
  }
};
```

## Cell's configuration

| Properties      | Type                                   | Description             |
| --------------- | -------------------------------------- | ----------------------- |
| value           | `number`                               | Cell's value            |
| header          | `string`                               | Cell's header           |
| label           | `string`                               | Cell's label            |
| foregroundColor | `string` of valid color (`hex`, `rgb`) | Cell's label color      |
| backgroundColor | `string` of valid color (`hex`, `rgb`) | Cell's background color |

## Axes position

Each axis has 2 different positioning options. X-axis can be at `top` or `bottom` and Y-axis can be at `left` or `right`.

::
```javascript
::heatmap::

const el = document.querySelector('ef-heatmap');
const generateData = (r, c) => {
  let rows = Array(r);
  for (let i = 0; i < rows.length; i++) {
    let columns = Array(c);
    for (let ii = 0; ii < columns.length; ii++) {
      const shift = (i * ii) / (c * r);
      const value = -1 + shift + (Math.random() / 2 + 0.5 * shift) * (2 - shift);

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
```
```html
<ef-heatmap></ef-heatmap>
```
::

```javascript
const el = document.querySelector("ef-heatmap");

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

## Y-Axis's configuration

| Properties | Type              | Description                                |
| ---------- | ----------------- | ------------------------------------------ |
| labels     | `string`[ ]       | Y-axis labels                              |
| position   | `left` or `right` | Y-axis orientation relative to the heatmap |

## X-Axis's configuration

| Properties  | Type              | Description                                |
| ----------- | ----------------- | ------------------------------------------ |
| labels      | `string`[ ]       | X-axis labels                              |
| shortLabels | `string`[ ]       | X-axis short labels for smaller screens    |
| position    | `top` or `bottom` | X-axis orientation relative to the heatmap |

## Using tooltip

To render a tooltip on cell hover, pass a tooltip render function that returns HTML elements using the `tooltipCallback` property.

::
```javascript
::heatmap::

const el = document.querySelector('ef-heatmap');
const generateData = (r, c) => {
  let rows = Array(r);
  for (let i = 0; i < rows.length; i++) {
    let columns = Array(c);
    for (let ii = 0; ii < columns.length; ii++) {
      const shift = (i * ii) / (c * r);
      const value = -1 + shift + (Math.random() / 2 + 0.5 * shift) * (2 - shift);

      columns[ii] = {
        value: value
      };
    }
    rows[i] = columns;
  }
  return rows;
};

el.tooltipCallback = (cell) => {
  const tooltip = document.createElement('div');
  const template = "<div style='font-weight: bold'>Actual value:</div><div style='color:"+ cell.color +"'>" + cell.value + "</div>";
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
```
```html
<ef-heatmap></ef-heatmap>
```
::

```javascript
const el = document.querySelector("ef-heatmap");

el.tooltipCallback = (cell) => {
  const tooltip = document.createElement("div");
  const template = `
    <div style="font-weight: bold">Actual value:</div>
    <div style="color:${cell.color}">${cell.value}</div>
  `;
  tooltip.innerHTML = template;
  return tooltip;
};
el.config = {...};
```

## Handling click events
`ef-heatmap` provides an API to allow user to get cell's information form a native mouse events such as `click`, `dblclick`, `contextmenu`, etc. Calling `getCellDataAtEvent` and passing an `event` to the method will return a data of interactive cell.

::
```javascript
::heatmap::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/overlay-menu?min';
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/dialog?min';
halo('overlay-menu');
halo('dialog');

const el = document.querySelector('ef-heatmap');
const menu = document.getElementById('menu');
const dlg = document.getElementById('dlg');
let popupTemplate;

const generateData = (row, col) => {
  let rows = Array(row);
  for (let i = 0; i < rows.length; i++) {
    let columns = Array(col);
    for (let ii = 0; ii < columns.length; ii++) {
      const shift = (i * ii) / (col * row);
      const value = -1 + shift + (Math.random() / 2 + 0.5 * shift) * (2 - shift);

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

const handleContextMenu = (event) => {
  const cell = el.getCellDataAtEvent(event);
  if (cell) {
    event.preventDefault();
    popupTemplate = "<span>Value: "+ cell.value +"</span><br><span>Row index: "+ cell.rowIndex + "</span><br><span>Column index: "+ cell.colIndex + "</span>";
    menu.opened = true;
    menu.x = event.clientX;
    menu.y = event.clientY;
  }
};

el.addEventListener('contextmenu', handleContextMenu);

menu.addEventListener('item-trigger', (event) => {
  const value = event.detail.value;
  if (value === 'show-cell-data') {
    dlg.innerHTML = popupTemplate;
    dlg.opened = true;
    menu.opened = false;
  }
});
```
```html
<ef-heatmap></ef-heatmap>
<ef-overlay-menu id="menu">
  <ef-item value="menu1">Menu 1</ef-item>
  <ef-item value="menu2" disabled>Menu 2</ef-item>
  <ef-item type="divider"></ef-item>
  <ef-item value="show-cell-data" >Show Cell Data</ef-item>      
</ef-overlay-menu>
<ef-dialog id="dlg" header="Heatmap Cell"></ef-dialog>
```
::

```html
<ef-heatmap></ef-heatmap>
<ef-overlay-menu id="menu">
  <ef-item value="menu1">Menu 1</ef-item>
  <ef-item value="menu2" disabled>Menu 2</ef-item>
  <ef-item type="divider"></ef-item>
  <ef-item value="show-cell-data" >Show Cell Data</ef-item>      
</ef-overlay-menu>
<ef-dialog id="dlg" header="Heatmap Cell"></ef-dialog>
```

```javascript
const el = document.querySelector("ef-heatmap");
const menu = document.getElementById('menu');
const dlg = document.getElementById('dlg');
let popupTemplate;

el.addEventListener('contextmenu', (event) => {
    const cell = el.getCellDataAtEvent(event);
    if (cell) {
      event.preventDefault();
      popupTemplate = `
          <span>Value: ${cell.value}</span><br>
          <span>Row index: ${cell.rowIndex}</span><br>
          <span>Column index: ${cell.colIndex}</span>
      `;
      menu.opened = true;
      menu.x = event.clientX;
      menu.y = event.clientY;
    }
});

menu.addEventListener('item-trigger', (event) => {
    const value = event.detail.value;
    if (value === 'show-cell-data') {
      dlg.innerHTML = popupTemplate;
      dlg.opened = true;
      menu.opened = false;
    }
});

el.config = {...};
```

## CSS variables

The spaceing around cell and cell color can be customized using CSS variables.

::
```javascript
::heatmap::
const el = document.querySelector('ef-heatmap');
const generateSequentialData = (start, count, step) => {
    let rows = [];
    let columns = [];
    for (let i = 0; i < count; i++) {
        columns.push({ value: start + step * i });
    }
    rows.push(columns);
    return rows;
};
el.config = {
    data: generateSequentialData(-1, 21, 0.1),
};
```
```html
<ef-heatmap axis-hidden></ef-heatmap>
```
```css
ef-heatmap {
  height: 35px;
  --above-point-color: #3399ff;
  --below-point-color: #ff3399;
}
```
::

| CSS Variables Name  | Description                    |
| ------------------- | ------------------------------ |
| --spacing           | Margin around a cell in pixels |
| --above-point-color | Color at the maximum point     |
| --below-point-color | Color at the minimum point     |


## Accessibility
::a11y-intro::

The Heatmap component is assigned `role="table"`. Interactive data points are implemented as Tooltip. Access to a data table is provided as a textual alternative for accessible users. 

::a11y-end::
