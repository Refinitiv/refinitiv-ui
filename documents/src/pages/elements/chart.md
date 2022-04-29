<!--
type: page
title: Chart
location: ./elements/chart
layout: default
-->

# Chart
::
```javascript
::chart::

const comboDatasets = [{
    type: 'line',
    label: 'Price',
    data: [37.40, 36.60, 40.48, 41.13, 42.05, 40.42],
    yAxisID: 'y-axis-1',
    fill: true // not fill the area under the line
  }, {
    type: 'bar',
    label: 'Volume',
    data: [8.09, 8.79, 7.77, 6.77, 6.52, 6.77],
    yAxisID: 'y-axis-2'
  }];
const combo = document.getElementById('combo');
combo.config = {
  type: 'bar',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: comboDatasets
  },
  options: {
    scales: {
      yAxes: [{
        display: true,
        position: 'left',
        id: 'y-axis-1',
        ticks: {
          min: 36,
          max: 43,
          stepSize: 1
        },
        scaleLabel: {
          display: true,
          labelString: 'Price (£)'
        }
      }, {
        display: true,
        position: 'right',
        id: 'y-axis-2',
        gridLines: {
          drawOnChartArea: false // only want the grid lines for one axis to show up
        },
        ticks: {
          min: 6.0,
          max: 9.5,
          stepSize: 0.5,
          callback: (label, index) => {
            let val = label.toString();
            if (val.indexOf('.') === -1) {
              val += '.0';
            }
            return val + 'M';
          }
        },
        scaleLabel: {
          display: true,
          labelString: 'Volume'
        }
      }]
    },
    tooltips: {
      callbacks: {
        title: (tooltipItems, data) => 'TRI.N',
        label: (tooltipItem, data) => {
          const yLabel = tooltipItem.yLabel;
          if (tooltipItem.datasetIndex === 0) {
            return 'Price: ' + yLabel;
          }
          else {
            return 'Volume: ' + yLabel + 'M';
          }
        }
      }
    }
  }
};
```
```css
ef-chart {
  max-width: 600px;
}
```
```html
<ef-chart id="combo"></ef-chart>
```
::

`ef-chart` is a charting component that leverages the [Chart.js](http://chartjs.org) library. See Chart.js [documentation](https://www.chartjs.org/docs/2.9.4/) for full chart configuration.

The styling of `ef-chart` is inherited from the theme, but you can customize styling at the individual chart level.

## Usage
A chart can be created by passing a configuration to the `config` attribute. The configuration object is identical to the chartjs configuration.

::
```javascript
::chart::

const line = document.getElementById('line');
line.config = {
  type: 'line',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'Price',
      data: [37.4, 36.6, 40.48, 41.13, 42.05, 40.42, 43.09]
    }]
  },
  options: {
    title: {
      text: 'Line chart'
    },
    legend: {
      display: true
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Price (£)'
        }
      }]
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => tooltipItem.yLabel + ' £'
      }
    }
  }
};
```
```css
ef-chart {
  max-width: 600px;
}
```
```html
<ef-chart id="line"></ef-chart>
```
::

```html
<ef-chart id="line"></ef-chart>
```

```javascript
const line = document.getElementById('line');
line.config = {
  type: 'line',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'Price',
      data: [37.4, 36.6, 40.48, 41.13, 42.05, 40.42, 43.09]
    }]
  },
  options: {
    title: {
      text: 'Line chart'
    },
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Price (£)'
        }
      }]
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => tooltipItem.yLabel + ' £'
        }
      }
    }
  }
};
```

## Update chart data or configurations
To update chart datasets or configurations, you can modify the value in the `config` property and then call `updateChart()`.

However, you do not have to call `updateChart()` if you set a new `config` object for the chart.

::
```javascript
::chart::

const random = (number) => {
    let val = [];
    for (let i = 0; i< number; i++) {
      val.push(Math.floor(Math.random() * 101));
    }
    return val;
  }

const line = document.getElementById('line');

line.config = {
  type: 'line',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'Price',
      data: [37.4, 36.6, 40.48, 41.13, 42.05, 40.42, 43.09],
      lineTension: 0.3
    }]
  },
  options: {
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Price (£)'
        },
        ticks: {
            beginAtZero: true,
            steps: 10,
            max: 100
        }
      }]
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          return tooltipItem.yLabel + ' £';
        }
      }
    }
  }
};

setInterval(() => {
  line.config.data.datasets[0].data = random(7)
  line.updateChart();
  }
  , 1200);
```

```css
ef-chart {
  max-width: 600px;
}
```
```html
<ef-chart id="line"></ef-chart>
```
::

```html
<ef-chart id="line"></ef-chart>
```

```javascript
const line = document.getElementById('line');
line.config.data.datasets[0].data = [31.4, 6.6, 43.48, 40.13, 44.05, 46.42, 47.09]
line.updateChart();
```

You can also control animation on the update process by using additional configurations. You can find more details at [Chart.js API](https://www.chartjs.org/docs/2.9.4/developers/api.html#updateconfig).

```javascript
line.updateChart({
    duration: 800,
    lazy: false, // If true, the animation can be interrupted by other animation
    easing: 'easeOutBounce'
});
```

## Chartjs instance
A chart instance of chartjs or canvas can be accessed using the `chart` property of `ef-chart`.

```javascript
const line = document.getElementById('line');
console.log(line.chart); // instance of chartjs
console.log(line.chart.canvas); // canvas of instance of chartjs
```

## Doughnut with center label
To create a doughnut with a center label, define the `plugins.centerLabel` property in `options`.

- `plugins.centerLabel.defaultText` is the default center text.
- `plugins.centerLabel.onRenderLabel` is a callback function to define the center text when hovering and clicking on each segment.
- `plugins.centerLabel.selected` selects a chart item when chart is initialised. You can set `index` and `datasetIndex` to use in the selection.

::
```javascript
::chart::

const doughnutDataSets = [{
    data: [36, 22, 16, 8.2, 5.7, 12],
  }];

const doughnut = document.getElementById('doughnut-center-label');
doughnut.config = {
  type: 'doughnut',
  data: {
    labels: ['Americas', 'Europe', 'Greater China', 'Japan', 'Asia Pacific', 'Retail'],
    datasets: doughnutDataSets,
  },
  options: {
    onHover: (event, chartItem) => {
      // console.log('hover: ', chartItem);
    },
    onClick: (event, chartItem) => {
      // console.log('click: ', chartItem);
    },
    plugins: {
      centerLabel: {
        defaultText: [
          {
            label: 'AAPL.O',
            bold: true
          },
          {
            label: 'Segments in 2014'
          }
        ],
        onRenderLabel: (chart, chartItems) => {
          if (chartItems.length) {
            const chartItem = chartItems[0];
            const data = chart.data;
            const title = data.labels[chartItem._index];
            const value = data.datasets[chartItem._datasetIndex].data[chartItem._index];
            const total = data.datasets[chartItem._datasetIndex].data.reduce((total, num) => total + num);
            const percent = parseFloat(parseFloat(value) / parseFloat(total)).toFixed(2);

            return [{
              label: title,
              bold: true
            },
            {
              label: value
            }, {
              label: percent + ' %'
            }]
          }
        },
        selected: {
          datasetIndex: 0,
          index: 4
        },
      },
    },
    tooltips: {
      enabled: false
    }
  }
};
```
```css
ef-chart {
  max-width: 600px;
}
```
```html
<ef-chart id="doughnut-center-label"></ef-chart>
```
::

```javascript
const doughnut = document.getElementById('doughnut-center-label');

doughnut.config = {
  type: 'doughnut',
  data: {
    ...
  },
  options: {
    plugins: {
      centerLabel: {
        // default center label, pass multiple object to show multiple line
        defaultText: [
            {
              label: 'AAPL.O',
              bold: true
            },
            {
              label: 'Segments in 2014'
            }
        ],
        // define text to show at center
        onRenderLabel: (chart, chartItems) => {
          if (chartItems.length) {
            const chartItem = chartItems[0];
            const data = chart.data;
            const title = data.labels[chartItem._index];
            const value = data.datasets[chartItem._datasetIndex].data[chartItem._index];
            const total = data.datasets[chartItem._datasetIndex].data.reduce((total, num) => total + num);
            const percent = parseFloat(parseFloat(value) / parseFloat(total)).toFixed(2);

            return [{
              label: title,
              bold: true
            },
            {
              label: value
            }, {
              label: percent + ' %'
            }];
          }
        },
        selected: {
          datasetIndex: 0,
          index: 4
        },
      },
    },
    ...
  }
};
```

You can add `onHover` and `onClick` to the chart config to handle when users hover or click on each chart segment.

```javascript
doughnut.config = {
  type: 'doughnut',
  data: {
    ...
  },
  options: {
    onHover: (event, chartItem) => {
      console.log('hover: ', chartItem);
    },
    onClick: (event, chartItem) => {
      console.log('click: ', chartItem);
    },
    plugins: {
      ...
    }
  }
};
```

## CSS variables
For doughnut chart, colors and font size of the center label can be customized using CSS variables.

```css
ef-chart {
  --doughnut-center-text-color: #061c39;
  --doughnut-center-font-size: 10px;
}
```

| CSS Variables Name                 | Description                                 |
| ---------------------------------- | ------------------------------------------- |
| --doughnut-center-text-color       | Custom text color of center label           |
| --doughnut-center-background-color | Custom background color of center label     |
| --doughnut-center-font-size        | Custom font size percentage of center label |


## Chart types
You can create various chart types as per chartjs configurations. Samples are on [this page](http://www.chartjs.org/samples/latest/).

::
```javascript
::chart::
const multipleLines = document.getElementById('multipleLines');

const multipleLinesDatasets = [{
  label: '.DJI',
  data: [16466, 16517, 17685, 17774, 17787, 17930, 18432],
  fill: false,
  pointBackgroundColor: 'transparent',
  pointBorderColor: 'transparent'
}, {
  label: '.N225',
  data: [17518, 16027, 16759, 16666, 17235, 15576, 16569],
  fill: false,
  pointBackgroundColor: 'transparent',
  pointBorderColor: 'transparent'
}, {
  label: '.FTMIB',
  data: [18657, 17623, 18117, 18601, 18025, 16198, 16847],
  fill: false,
  pointBackgroundColor: 'transparent',
  pointBorderColor: 'transparent'
}, {
  label: '.HSI',
  data: [19683, 19112, 20777, 21067, 20815, 20794, 21891],
  fill: false,
  pointBackgroundColor: 'transparent',
  pointBorderColor: 'transparent'
}];
multipleLines.config = {
  type: 'line',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: multipleLinesDatasets
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          stepSize: 1000,
          callback: (label, index) => {
            return label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          }
        }
      }]
    },
    tooltips: {
      callbacks: {
        title: (tooltipItems, data) => {
          return data.datasets[tooltipItems[0].datasetIndex].label;
        },
        label: (tooltipItem, data) => {
          const month = tooltipItem.xLabel;
          let value = tooltipItem.yLabel;
          value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          return month + ': ' + value;
        }
      }
    }
  }
};
```
```css
ef-chart {
  max-width: 600px;
}
```
```html
<ef-chart id="multipleLines"></ef-chart>
```
::

::
```javascript
::chart::
const bar = document.getElementById('bar');

bar.config = {
  type: 'bar',
  data: {
    labels: ['2010', '2011', '2012', '2013'],
    datasets: [{
      label: 'GOOGL.O',
      data: [29321, 37905, 50175, 59825]
    }, {
      label: 'AAPL.O',
      data: [65225, 108249, 156508, 170910]
    }, {
      label: 'MSFT.O',
      data: [62484, 69943, 73723, 77849]
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          max: 180000,
          stepSize: 30000,
          callback: (label, index) => {
            return label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          }
        },
        scaleLabel: {
          display: true,
          labelString: 'Revenue (in millions £)'
        }
      }]
    },
    tooltips: {
      callbacks: {
        title: (tooltipItems, data) => 'Revenue',
        label: (tooltipItem, data) => {
          const year = tooltipItem.xLabel;
          let rev = tooltipItem.yLabel;
          rev = rev.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          return year + ': ' + rev;
        }
      }
    }
  }
};
```
```css
ef-chart {
  max-width: 600px;
}
```
```html
<ef-chart id="bar"></ef-chart>
```
::

::
```javascript
::chart::
const stackedBar = document.getElementById('stackedBar');

stackedBar.config = {
  type: 'bar',
  data: {
    labels: ['2010', '2011', '2012', '2013'],
    datasets: [{
      label: 'GOOGL.O',
      data: [29321, 37905, 50175, 59825]
    }, {
      label: 'AAPL.O',
      data: [65225, 108249, 156508, 170910]
    }, {
      label: 'MSFT.O',
      data: [62484, 69943, 73723, 77849]
    }]
  },
  options: {
    scales: {
      xAxes: [{
        stacked: true
      }],
      yAxes: [{
        stacked: true,
        ticks: {
          min: 0,
          stepSize: 50000,
          callback: (label, index) => {
            return label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          }
        },
        scaleLabel: {
          display: true,
          labelString: 'Revenue (in millions £)'
        }
      }]
    },
    tooltips: {
      callbacks: {
        title: (tooltipItems, data) => data.datasets[tooltipItems[0].datasetIndex].label,
        label: (tooltipItem, data) => {
          const year = tooltipItem.xLabel;
          let rev = tooltipItem.yLabel;
          rev = rev.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          return year + ': ' + rev;
        }
      }
    }
  }
};
```
```css
ef-chart {
  max-width: 600px;
}
```
```html
<ef-chart id="stackedBar"></ef-chart>
```
::

::
```javascript
::chart::
const comboDatasets = [{
    type: 'line',
    label: 'Price',
    data: [37.40, 36.60, 40.48, 41.13, 42.05, 40.42],
    yAxisID: 'y-axis-1',
    fill: true // not fill the area under the line
  }, {
    type: 'bar',
    label: 'Volume',
    data: [8.09, 8.79, 7.77, 6.77, 6.52, 6.77],
    yAxisID: 'y-axis-2'
}];

const combo = document.getElementById('combo');

combo.config = {
  type: 'bar',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: comboDatasets
  },
  options: {
    scales: {
      yAxes: [{
        display: true,
        position: 'left',
        id: 'y-axis-1',
        ticks: {
          min: 36,
          max: 43,
          stepSize: 1
        },
        scaleLabel: {
          display: true,
          labelString: 'Price (£)'
        }
      }, {
        display: true,
        position: 'right',
        id: 'y-axis-2',
        gridLines: {
          drawOnChartArea: false // only want the grid lines for one axis to show up
        },
        ticks: {
          min: 6.0,
          max: 9.5,
          stepSize: 0.5,
          callback: (label, index) => {
            let val = label.toString();
            if (val.indexOf('.') === -1) {
              val += '.0';
            }
            return val + 'M';
          }
        },
        scaleLabel: {
          display: true,
          labelString: 'Volume'
        }
      }]
    },
    tooltips: {
      callbacks: {
        title: (tooltipItems, data) => 'TRI.N',
        label: (tooltipItem, data) => {
          let yLabel = tooltipItem.yLabel;
          if (tooltipItem.datasetIndex === 0) {
            return 'Price: ' + yLabel;
          }
          else {
            return 'Volume: ' + yLabel + 'M';
          }
        }
      }
    }
  }
};
```
```css
ef-chart {
  max-width: 600px;
}
```
```html
<ef-chart id="combo"></ef-chart>
```
::

::
```javascript
::chart::
const pieDatasets = [{
    data: [36, 22, 16, 8.2, 5.7, 12]
}];

const pie = document.getElementById('pie');

pie.config = {
  type: 'pie',
  data: {
    labels: ['Americas', 'Europe', 'Greater china', 'Japan', 'Asia Pacific', 'Retail'],
    datasets: pieDatasets
  },
  options: {
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const title = data.labels[tooltipItem.index];
          const result = data.datasets[0].data[tooltipItem.index];
          return title + ': ' + result + '%';
        }
      }
    }
  }
};
```
```css
ef-chart {
  max-width: 600px;
}
```
```html
<ef-chart id="pie"></ef-chart>
```
::

::
```javascript
::chart::
const doughnutDataSets = [{
    data: [36, 22, 16, 8.2, 5.7, 12]
}];

const doughnut = document.getElementById('doughnut');

doughnut.config = {
  type: 'doughnut',
  data: {
    labels: ['Americas', 'Europe', 'Greater China', 'Japan', 'Asia Pacific', 'Retail'],
    datasets: doughnutDataSets
  },
  options: {
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const title = data.labels[tooltipItem.index];
          const result = data.datasets[0].data[tooltipItem.index];
          return title + ': ' + result + '%';
        }
      }
    }
  }
};
```
```css
ef-chart {
  max-width: 600px;
}
```
```html
<ef-chart id="doughnut"></ef-chart>
```
::

::
```javascript
::chart::

const doughnutDataSets = [{
    data: [36, 22, 16, 8.2, 5.7, 12]
}];

const doughnut = document.getElementById('doughnut');

doughnut.config = {
  type: 'doughnut',
  data: {
    datasets: doughnutDataSets
  },
  options: {
    plugins: {
      centerLabel: {
        selected: {
          index: 2
        },
        onRenderLabel: (chart, chartItems) => {
          if (chartItems.length) {
            const chartItem = chartItems[0];
            const data = chart.data;
            const value = data.datasets[chartItem._datasetIndex].data[chartItem._index];
            const total = data.datasets[chartItem._datasetIndex].data.reduce((total, num) => total + num);
            const percent = parseFloat(parseFloat(value) / parseFloat(total)).toFixed(2);

            return [{
              label: percent * 100,
              bold: true
            }];
          }
        }
      }
    },
    tooltips: {
      enabled: false
    }
  }
};
```
```css
ef-chart {
  width: 150px;
  height: 150px;
  --doughnut-center-text-color: #ffffff;
  --doughnut-center-background-color: #4caf50;
  --doughnut-center-font-size: 70%;
}

div {
  display: flex;
  justify-content: center;
  width: 500px;
}
```
```html
<div>
  <ef-chart id="doughnut"></ef-chart>
</div>
```
::

::
```javascript
::chart::

const timeScale = document.getElementById('timeScale');

timeScale.config = {
  type: 'line',
  data: {
    labels: [
      new Date(2016, 8, 7, 10, 0, 0),
      new Date(2016, 8, 7, 11, 0, 0),
      new Date(2016, 8, 7, 12, 0, 0),
      new Date(2016, 8, 7, 13, 0, 0),
      new Date(2016, 8, 7, 14, 0, 0),
      new Date(2016, 8, 7, 15, 0, 0),
      new Date(2016, 8, 7, 16, 0, 0),
      new Date(2016, 8, 7, 17, 0, 0)
    ],
    datasets: [{
      label: 'Price',
      data: [107.53, 107.32, 107.35, 107.41, 107.56, 107.23, 108.37, 108.36]
    }]
  },
  options: {
    legend: {
      display: false // Not display legend
    },
    scales: {
      xAxes: [{
        type: 'time', // Set type of scale as time
        time: {
          displayFormats: {
            hour: 'hA' // Set custom format for hour unit
          },
          unit: 'hour',
          tooltipFormat: 'D MMM YYYY - hA'
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Price (£)'
        }
      }]
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => 'Price: £' + data.datasets[0].data[tooltipItem.index]
      }
    }
  }
};
```
```css
ef-chart {
  max-width: 600px;
}
```
```html
<ef-chart id="timeScale"></ef-chart>
```
::

::
```javascript
::chart::

const scatterplot = document.getElementById('scatterplot');

scatterplot.config = {
  type: 'line',
  data: {
    datasets: [
      {
        data: [
          { x: 37.04, y: 72.88 },
          { x: 33.16, y: 74.59 },
          { x: 29.42, y: 77.75 },
          { x: 32.19, y: 78.10 },
          { x: 33.62, y: 75.46 },
          { x: 30.89, y: 77.51 },
          { x: 29.44, y: 78.34 },
          { x: 29.64, y: 77.02 },
          { x: 32.78, y: 76.13 },
          { x: 35.92, y: 71.92 },
          { x: 38.50, y: 69.86 },
          { x: 39.44, y: 68.50 },
          { x: 39.46, y: 68.31 },
          { x: 36.79, y: 67.64 },
          { x: 39.72, y: 67.13 },
          { x: 40.36, y: 66.41 },
          { x: 43.73, y: 66.37 },
          { x: 45.92, y: 64.69 },
          { x: 44.66, y: 65.85 },
          { x: 46.21, y: 65.53 },
          { x: 47.75, y: 66.73 },
          { x: 49.33, y: 65.82 },
          { x: 48.62, y: 65.61 },
          { x: 49.07, y: 65.23 },
          { x: 47.98, y: 64.75 },
          { x: 47.64, y: 64.74 }
        ],
        pointRadius: 1
      }
    ]
  },
  options: {
    showLines: false,
    legend: {
      display: false // not display legend
    },
    scales: {
      xAxes: [
        {
          type: 'linear',
          position: 'bottom',
          scaleLabel: {
            display: true,
            labelString: 'Price of Oil (£)'
          }
        }
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Russian ruble (per £)'
          }
        }
      ]
    },
    tooltips: {
      callbacks: {
        title: () => '',
        label: (tooltipItem, data) => 'Oil\'s price : ' + tooltipItem.xLabel + ' £',
        afterLabel: (tooltipItem, data) => 'Ruble : ' + tooltipItem.yLabel
      }
    }
  }
};
```
```css
ef-chart {
  max-width: 600px;
}
```
```html
<ef-chart id="scatterplot"></ef-chart>
```
::

::
```javascript
::chart::

const bubble = document.getElementById('bubble');

bubble.config = {
  type: 'bubble',
  data: {
    datasets: [
      {
        label: 'Zimbabwe',
        data: [{ x: 450, y: 46, r: 3 }]
      },
      {
        label: 'Ethiopia',
        data: [{ x: 950, y: 56, r: 8 }]
      },
      {
        label: 'India',
        data: [{ x: 3000, y: 64, r: 18 }]
      },
      {
        label: 'China',
        data: [{ x: 6500, y: 73, r: 26 }]
      },
      {
        label: 'Russia',
        data: [{ x: 16000, y: 67, r: 8 }]
      },
      {
        label: 'UK',
        data: [{ x: 35000, y: 79, r: 6 }]
      },
      {
        label: 'USA',
        data: [{ x: 45000, y: 78, r: 12 }]
      }
    ]
  },
  options: {
    scales: {
      xAxes: [
        {
          type: 'logarithmic',
          position: 'bottom',
          ticks: {
            min: 450,
            max: 50000,
            maxRotation: 10,
            callback: (label, index) => {
              const xLabels = ['500', '1000', '2000', '5000', '10,000', '20000', '50000'];
              return xLabels.indexOf(label.toString()) > -1 ? label : '';
            }
          },
          scaleLabel: {
            display: true,
            labelString: 'GDP per person in US dollars (log scale)'
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            min: 45,
            max: 85,
            stepSize: 5
          },
          scaleLabel: {
            display: true,
            labelString: 'Life expectancy at birth (years)'
          }
        }
      ]
    },
    tooltips: {
      callbacks: {
        title: (tooltipItem, data) => {
          const item = tooltipItem[0];
          const dataset = data.datasets[item.datasetIndex];
          return dataset.label;
        },
        label: (tooltipItem, data) => 'GDP per Capita : £' + tooltipItem.xLabel,
        afterLabel: (tooltipItem, data) => 'Life expectancy : ' + tooltipItem.yLabel + ' Yrs'
      }
    }
  }
};
```
```css
ef-chart {
  max-width: 600px;
}
```
```html
<ef-chart id="bubble"></ef-chart>
```
::

::
```javascript
::chart::

const radar = document.getElementById('radar');

radar.config = {
  type: 'radar',
  data: {
    labels: [['Eating', 'Dinner'], ['Drinking', 'Water'], 'Sleeping', ['Designing', 'Graphics'], 'Coding', 'Cycling', 'Running'],
    datasets: [{
      label: 'Humanoid A',
      data: [
        13,
        10,
        9,
        14,
        9,
        5,
        10
      ]
    },
    {
      label: 'Humanoid B',
      data: [
        8,
        5,
        9,
        7,
        17,
        11,
        4
      ]
    }]
  },
  options: {
    legend: {
      position: 'right'
    }
  }
};
```
```css
ef-chart {
  max-width: 600px;
}
```
```html
<ef-chart id="radar"></ef-chart>
```
::

