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
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  BarController,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Filler,
  Tooltip
} from 'https://cdn.skypack.dev/chart.js@4.3.0?min';
ChartJS.register(
  LineController,
  LineElement,
  BarController,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Filler,
  Tooltip
);

const comboDatasets = [{
  type: 'line',
  label: 'Price',
  data: [37.40, 36.60, 40.48, 41.13, 42.05, 40.42],
  yAxisID: 'yAxis1',
  fill: true // not fill the area under the line
}, {
  type: 'bar',
  label: 'Volume',
  data: [8.09, 8.79, 7.77, 6.77, 6.52, 6.77],
  yAxisID: 'yAxis2'
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
      y: {
        display: false
      },
      yAxis1: {
        display: true,
        position: 'left',
        min: 36,
        max: 43,
        ticks: {
          stepSize: 1
        },
        title: {
          display: true,
          text: 'Price ($)'
        }
      },
      yAxis2: {
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false // only want the grid lines for one axis to show up
        },
        min: 6.0,
        max: 9.5,
        ticks: {
          stepSize: 0.5,
          callback: (label, index) => {
            let val = label.toString();
            if (val.indexOf('.') === -1) {
              val += '.0';
            }
            return val + 'M';
          }
        },
        title: {
          display: true,
          text: 'Volume'
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            return 'TRI.N';
          },
          label: (tooltipItem) => {
            const yLabel = tooltipItem.raw;
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

`ef-chart` is a charting component that leverages the [Chart.js](http://chartjs.org) library. See Chart.js [documentation](https://www.chartjs.org/docs/4.3.0/) for full chart configuration.

The styling of `ef-chart` is inherited from the theme, but you can customize styling at the individual chart level.

## Usage
A chart can be created by passing a configuration to the `config` attribute. The configuration object is identical to the chartjs configuration.

::
```javascript
::chart::
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip
} from 'https://cdn.skypack.dev/chart.js@4.3.0?min';
ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip
);

const line = document.getElementById('line');
line.config = {
  type: 'line',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'Price',
      data: [37.4, 36.6, 40.48, 41.13, 42.05, 40.42, 43.09],
      fill: true
    }]
  },
  options: {
    plugins: {
      title: {
        text: 'Line chart'
      },
      legend: {  // only required when importing chart.js/auto
        display: false
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return tooltipItem.formattedValue + ' $';
          }
        }
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Price ($)'
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
      data: [37.4, 36.6, 40.48, 41.13, 42.05, 40.42, 43.09],
      fill: true
    }]
  },
  options: {
    plugins: {
      title: {
        text: 'Line chart'
      },
      legend: {  // only required when importing chart.js/auto
        display: false
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return tooltipItem.formattedValue + ' $';
          }
        }
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Price ($)'
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
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip
} from 'https://cdn.skypack.dev/chart.js@4.3.0?min';
ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip
);

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
      lineTension: 0.3,
      fill: true
    }]
  },
  options: {
    plugins: {
      legend: {  // only required when importing chart.js/auto
        display: false
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Price (£)'
        },
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 10
        }
      }
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

You can indicate transition configuration on the update process by passing `mode`. You can find more details at [Chart.js API](https://www.chartjs.org/docs/4.3.0/developers/api.html#update-mode).

```javascript
line.updateChart('active');
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

Live example of doughnut chart with center label plugin is available [here](https://codesandbox.io/s/doughnut-center-label-plugin-5tlll5).

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
            const title = data.labels[chartItem.index];
            const value = data.datasets[chartItem.datasetIndex].data[chartItem.index];
            const total = data.datasets[chartItem.datasetIndex].data.reduce((total, num) => total + num);
            const percent = parseFloat(parseFloat(value) / parseFloat(total)).toFixed(2);

            return [{
              label: title,
              bold: true
            },
            {
              label: 'value: ' + value
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
    onHover: (event, elements, chart) => {
      console.log('hover: ', elements);
    },
    onClick: (event, elements, chart) => {
      console.log('click: ', elements);
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
You can create various chart types as per chartjs configurations. Samples are on [this page](https://www.chartjs.org/docs/4.3.0/samples).

::
```javascript
::chart::
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip
} from 'https://cdn.skypack.dev/chart.js@4.3.0?min';
ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip
);

const multipleLines = document.getElementById('multipleLines');

const multipleLinesDatasets = [{
  label: '.DJI',
  data: [16466, 16517, 17685, 17774, 17787, 17930, 18432],
  pointBackgroundColor: 'transparent',
  pointBorderColor: 'transparent'
}, {
  label: '.N225',
  data: [17518, 16027, 16759, 16666, 17235, 15576, 16569],
  pointBackgroundColor: 'transparent',
  pointBorderColor: 'transparent'
}, {
  label: '.FTMIB',
  data: [18657, 17623, 18117, 18601, 18025, 16198, 16847],
  pointBackgroundColor: 'transparent',
  pointBorderColor: 'transparent'
}, {
  label: '.HSI',
  data: [19683, 19112, 20777, 21067, 20815, 20794, 21891],
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
    plugins: {
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            return multipleLinesDatasets[tooltipItems[0].datasetIndex].label;
          },
          label: (tooltipItem) => {
            const month = tooltipItem.label;
            let value = tooltipItem.raw;
            value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return month + ': ' + value;
          }
        }
      }
    },
    scales: {
      y: {
        ticks: {
          stepSize: 1000,
          callback: (label, index) => {
            return label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
<ef-chart id="multipleLines"></ef-chart>
```
::

::
```javascript
::chart::
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip
} from 'https://cdn.skypack.dev/chart.js@4.3.0?min';
ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip
);

const lineSegmentStyle = document.getElementById('line-segment-style');

const skipped = (ctx, value) => ctx.p0.skip || ctx.p1.skip ? value : undefined;
const down = (ctx, value) => ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;

lineSegmentStyle.config = {
  type: 'line',
  data: {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July'
    ],
    datasets: [{
      data: [65, 59, NaN, 48, 56, 57, 40],
      borderColor: 'rgb(75, 192, 192)',
      segment: {
        borderColor: ctx => skipped(ctx, 'rgb(0,0,0,0.2)') || down(ctx, 'rgb(192,75,75)'),
        borderDash: ctx => skipped(ctx, [6, 6]),
      },
      spanGaps: true
    }]
  },
  options: {
    fill: false,
    interaction: {
      intersect: false
    },
    radius: 0,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Stock Price of Legendary Company'
        }
      },
      y: {
        title: {
          display: true,
          text: 'US Dollar ($)'
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
<ef-chart id="line-segment-style"></ef-chart>
```
::

::
```javascript
::chart::
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip
} from 'https://cdn.skypack.dev/chart.js@4.3.0?min';
ChartJS.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip
);

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
    plugins: {
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            return 'Revenue';
          },
          label: (tooltipItem) => {
            const year = tooltipItem.label;
            let rev = tooltipItem.raw;
            rev = rev.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return year + ': ' + rev;
          }
        }
      }
    },
    scales: {
      y: {
        min: 0,
        max: 180000,
        ticks: {
          stepSize: 30000,
          callback: (label, index) => {
            return label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          }
        },
        title: {
          display: true,
          text: 'Revenue (in millions £)'
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
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip
} from 'https://cdn.skypack.dev/chart.js@4.3.0?min';
ChartJS.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip
);

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
    plugins: {
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            return tooltipItems[0].chart.data.datasets[tooltipItems[0].datasetIndex].label;
          },
          label: (tooltipItem) => {
            const year = tooltipItem.label;
            let rev = tooltipItem.raw;
            rev = rev.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return year + ': ' + rev;
          }
        }
      }
    },
    scales: {
      x: {
        stacked: true
      },
      y: {
        min: 0,
        stacked: true,
        ticks: {
          stepSize: 50000,
          callback: (label, index) => {
            return label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          }
        },
        title: {
          display: true,
          text: 'Revenue (in millions £)'
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
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip
} from 'https://cdn.skypack.dev/chart.js@4.3.0?min';
ChartJS.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip
);

const horizontalBar = document.getElementById('horizontalBar');

horizontalBar.config = {
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
    indexAxis: 'y',
    plugins: {
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            return 'Revenue';
          },
          label: (tooltipItem) => {
            const year = tooltipItem.label;
            let rev = tooltipItem.raw;
            rev = rev.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return year + ': ' + rev;
          }
        }
      }
    },
    scales: {
      x: {
        min: 0,
        max: 180000,
        ticks: {
          stepSize: 30000,
          callback: (label, index) => {
            return label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          }
        },
        title: {
          display: true,
          text: 'Revenue (in millions £)'
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
<ef-chart id="horizontalBar"></ef-chart>
```
::

::
```javascript
::chart::
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  BarController,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Filler,
  Tooltip
} from 'https://cdn.skypack.dev/chart.js@4.3.0?min';
ChartJS.register(
  LineController,
  LineElement,
  BarController,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Filler,
  Tooltip
);

const comboDatasets = [{
  type: 'line',
  label: 'Price',
  data: [37.40, 36.60, 40.48, 41.13, 42.05, 40.42],
  yAxisID: 'yAxis1',
  fill: true
}, {
  type: 'bar',
  label: 'Volume',
  data: [8.09, 8.79, 7.77, 6.77, 6.52, 6.77],
  yAxisID: 'yAxis2'
}];

const combo = document.getElementById('combo');

combo.config = {
  type: 'bar',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: comboDatasets
  },
  options: {
    plugins: {
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            return 'TRI.N';
          },
          label: (tooltipItem) => {
            const yLabel = tooltipItem.raw;
            if (tooltipItem.datasetIndex === 0) {
              return 'Price: ' + yLabel;
            }
            else {
              return 'Volume: ' + yLabel + 'M';
            }
          }
        }
      }
    },
    scales: {
      y: {
        display: false
      },
      yAxis1: {
        display: true,
        position: 'left',
        min: 36,
        max: 43,
        ticks: {
          stepSize: 1
        },
        title: {
          display: true,
          text: 'Price (£)'
        }
      },
      yAxis2: {
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false // only want the grid lines for one axis to show up
        },
        min: 6.0,
        max: 9.5,
        ticks: {
          stepSize: 0.5,
          callback: (label, index) => {
            let val = label.toString();
            if (val.indexOf('.') === -1) {
              val += '.0';
            }
            return val + 'M';
          }
        },
        title: {
          display: true,
          text: 'Volume'
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
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip
} from 'https://cdn.skypack.dev/chart.js@4.3.0?min';
ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip
);
const scaleStack = document.getElementById('scale-stack');
const colors = scaleStack.colors;
scaleStack.config = {
  type: 'line',
  data: {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July'
    ],
    datasets: [
      {
        label: 'Smartphone Usage Hour',
        data: [10, 30, 50, 20, 25, 44, 15],
      },
      {
        label: 'Push Notification Toggle',
        data: ['ON', 'ON', 'OFF', 'ON', 'OFF', 'OFF', 'ON'],
        stepped: true,
        yAxisID: 'y2',
      }
    ]
  },
  options: {
    scales: {
      y: {
        type: 'linear',
        position: 'left',
        stack: 'demo',
        stackWeight: 2,
        border: {
          color: colors[0]
        }
      },
      y2: {
        type: 'category',
        labels: ['ON', 'OFF'],
        offset: true,
        position: 'left',
        stack: 'demo',
        stackWeight: 1,
        border: {
          color: colors[1]
        }
      }
    }
  },
};

```
```css
ef-chart {
  max-width: 600px;
}
```
```html
<ef-chart id="scale-stack"></ef-chart>
```
::

::
```javascript
::chart::
import {
  Chart as ChartJS,
  PieController,
  ArcElement,
  Legend,
  Tooltip
} from 'https://cdn.skypack.dev/chart.js@4.3.0?min';
ChartJS.register(
  PieController,
  ArcElement,
  Legend,
  Tooltip
);

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
    plugins: {
      tooltip: {
        callbacks: {
          title: () => null,
          label: (tooltipItem) => {
            const title = tooltipItem.label;
            const result = tooltipItem.raw;
            return title + ': ' + result + '%';
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
<ef-chart id="pie"></ef-chart>
```
::

::
```javascript
::chart::
import {
  Chart as ChartJS,
  DoughnutController,
  ArcElement,
  Legend,
  Tooltip
} from 'https://cdn.skypack.dev/chart.js@4.3.0?min';
ChartJS.register(
  DoughnutController,
  ArcElement,
  Legend,
  Tooltip
);

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
    plugins: {
      tooltip: {
        callbacks: {
          title: () => null,
          label: (tooltipItem) => {
            const title = tooltipItem.label;
            const result = tooltipItem.raw;
            return title + ': ' + result + '%';
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
<ef-chart id="doughnut"></ef-chart>
```
::

::
```javascript
::chart::
import {
  Chart as ChartJS,
  ScatterController,
  PointElement,
  LinearScale,
  Tooltip
} from 'https://cdn.skypack.dev/chart.js@4.3.0?min';
ChartJS.register(
  ScatterController,
  PointElement,
  LinearScale,
  Tooltip
);

const scatterPlot = document.getElementById('scatterplot');
scatterPlot.config = {
  type: 'scatter',
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
        pointRadius: 1,
        showLine: false
      }
    ]
  },
  options: {
    plugins: {
      legend: {
        display: false // not display legend
      },
      tooltip: {
        callbacks: {
          title: () => null,
          label: (tooltipItem) => {
            return 'Oil\'s price : ' + tooltipItem.raw.x + ' £';
          },
          afterLabel: (tooltipItem) => {
            return 'Ruble : ' + tooltipItem.raw.y;
          }
        }
      }
    },
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'Price of Oil (£)'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Russian ruble (per £)'
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
<ef-chart id="scatterplot"></ef-chart>
```
::

::
```javascript
::chart::
import {
  Chart as ChartJS,
  BubbleController,
  PointElement,
  LinearScale,
  LogarithmicScale,
  Tooltip,
  Legend
} from 'https://cdn.skypack.dev/chart.js@4.3.0?min';
ChartJS.register(
  BubbleController,
  PointElement,
  LinearScale,
  LogarithmicScale,
  Tooltip,
  Legend
);

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
      x: {
        type: 'logarithmic',
        position: 'bottom',
        min: 450,
        max: 50000,
        ticks: {
          maxRotation: 10,
          callback: (label, index) => {
            const xLabels = ['500', '1000', '2000', '5000', '10,000', '20000', '50000'];
            return xLabels.indexOf(label.toString()) > -1 ? label : '';
          }
        },
        title: {
          display: true,
          text: 'GDP per person in US dollars (log scale)'
        }
      },
      y: {
        min: 45,
        max: 85,
        ticks: {
          stepSize: 5
        },
        title: {
          display: true,
          text: 'Life expectancy at birth (years)'
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            const item = tooltipItems[0];
            return item.dataset.label;
          },
          label: (tooltipItem) => {
            return 'GDP per Capita : £' + tooltipItem.raw.x;
          },
          afterLabel: (tooltipItem) => {
            return 'Life expectancy : ' + tooltipItem.raw.y + ' Yrs';
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
<ef-chart id="bubble"></ef-chart>
```
::

::
```javascript
::chart::
import {
  Chart as ChartJS,
  RadarController,
  PointElement,
  LineElement,
  RadialLinearScale,
  Tooltip,
  Legend,
  Filler
} from 'https://cdn.skypack.dev/chart.js@4.3.0?min';
ChartJS.register(
  RadarController,
  PointElement,
  LineElement,
  RadialLinearScale,
  Tooltip,
  Legend,
  Filler
);

const radar = document.getElementById('radar');

radar.config = {
  type: 'radar',
  data: {
    labels: [['Eating', 'Dinner'], ['Drinking', 'Water'], 'Sleeping', ['Designing', 'Graphics'], 'Coding', 'Cycling', 'Running'],
    datasets: [{
      label: 'Humanoid A',
      data: [13, 10, 9, 14, 9, 5, 10]
    },
    {
      label: 'Humanoid B',
      data: [8, 5, 9, 7, 17, 11, 4]
    }]
  },
  options: {
    plugins: {
      legend: {
        position: 'right'
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
<ef-chart id="radar"></ef-chart>
```
::

Some additional live examples can be found below.

- [Doughnut Chart with Center Label Plugin](https://codesandbox.io/s/doughnut-center-label-plugin-5tlll5)
- [Time Scale Chart](https://codesandbox.io/s/time-scale-chart-svgl5g)

## Bundle optimisation

Although `import "@refinitiv-ui/chart";` is easy to use as it provides all components of chart.js, you application might not be using all of them. To import only what is needed, start with `import "@refinitiv-ui/chart/bare";`. Then, import more components from chart.js manually according to your need. Check [Chart.js Bundle Optimisation](https://www.chartjs.org/docs/4.3.0/getting-started/integration.html#bundle-optimization) for what needed to be import for each chart type. This could reduce your bundle size related to chart.js by around 20%.

Here is a example for simple line chart:

```javascript
import '@refinitiv-ui/elements/chart/bare';

import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from 'chart.js';

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);
```

EF provides center label plugin for doughnut chart. To use it:

```javascript
import '@refinitiv-ui/elements/chart/bare';
import { doughnutCenterLabelPlugin } from '@refinitiv-ui/elements/chart/plugins';

import {
  Chart as ChartJS,
  DoughnutController,
  ArcElement
} from 'chart.js';

ChartJS.register(
  DoughnutController,
  ArcElement,
  doughnutCenterLabelPlugin
);
```

## Localisation

To get started, set `adapters.date` of `options.scales[scaleId]` with [date-fns](https://date-fns.org) locale.

```javascript
// import date-fns locale:
import { de } from 'date-fns/locale';

const config = {
  options: {
    ...,
    scales: {
      x: {
        ...,
        adapters: {
          date: {
            locale: de // set locale to German
          }
        }
      }
    }
  }
}
```

You can learn more on [chart.js configuration documentation](https://github.com/chartjs/chartjs-adapter-date-fns#configuration).
