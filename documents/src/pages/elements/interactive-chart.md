<!--
type: page
title: Interactive Chart
location: ./elements/interactive-chart
layout: default
-->

# Interactive Chart

::
```javascript
::interactive-chart::

let initVal = 20;
const maxVal = initVal * 2;
const generateData = (total, start) => {
  const startDate = start || new Date();
  let ret = [];
  total = total < 0 ? 10 : total;
  for (let i = 0; i < total; i++) {
    const volatility = (Math.random() * (4.5) - 2) / 100; // random % volatility
    const date = start || new Date(startDate.setDate(startDate.getDate() + 1));
    const openVal = initVal + initVal * volatility;
    const closeVal = openVal + (openVal * volatility * 1.5);
    const highVal = openVal > closeVal ? openVal + 0.1 : closeVal + 0.5;
    const lowVal = openVal < closeVal ? openVal - 0.5 : closeVal - 0.2;
    initVal = closeVal > maxVal ? closeVal - (closeVal * 0.2) : closeVal;
    const point = {
      time: date.getTime() / 1000.0,
      open: parseFloat(openVal.toFixed(2)),
      high: parseFloat(highVal.toFixed(2)),
      low: parseFloat(lowVal.toFixed(2)),
      close: parseFloat(closeVal.toFixed(2))
    };
    ret.push(point);
  }
  return ret;
};

const generateCurrent = (prevDate) => {
  const newPoint = generateData(1, prevDate);
  return newPoint[0] || {};
};

const chart = document.getElementById('candle');
chart.config = {
  series: [
    {
      type: 'candlestick',
      data: generateData(100)
    }
  ]
};

setInterval(() => {
  const lastIndex = chart.config.series[0].data.length - 1;
  const time = chart.config.series[0].data[lastIndex].time;
  let latestTime = time || null;
  latestTime += 86400; // Update time Next day
  const prevDate = new Date(latestTime * 1000);
  const current = generateCurrent(prevDate);
  chart.config.series[0].data.push(current);
  chart.seriesList[0].update(current);
}, 1000);
```
```css
ef-interactive-chart {
  width: 100%;
  height: 300px;
}
```
```html
<ef-interactive-chart id="candle"></ef-interactive-chart>
```
::

Interactive Chart is a lightweight chart component that allows you to create different use cases for financial chart. The component uses the [lightweight-charts](https://github.com/tradingview/lightweight-charts) library. You can see a demo of different chart types and the APIs of the lightweight chart library via this [documentation](https://www.tradingview.com/lightweight-charts/).

## Usage
Chart can be create by passing the configuration and initial dataset using the `config` property. Interactive chart supports the following chart types. The `value` must be a number.

The interactive chart can be draw to various types and each type may need a different dataset.

@> The interactive chart doesn't support adding trendlines or technical analyses.

| Type          | Description                 |
| ------------- | --------------------------- |
| `line`        | Line chart                  |
| `area`        | Line chart with filled area |
| `bar`         | OHLC bar chart              |
| `candlestick` | Candlestick chart           |
| `volume`      | Volume chart                |


```html
<ef-interactive-chart id="line"></ef-interactive-chart>
```
```javascript
const chart = document.getElementById("line");
chart.config = {
  series: [
    {
      type: "line",
      data: [
        { time: "2018-12-22", value: 32.51 },
        { time: "2018-12-23", value: 31.11 },
        { time: "2018-12-24", value: 27.02 },
        { time: "2018-12-25", value: 27.32 },
        { time: "2018-12-26", value: 25.17 },
        { time: "2018-12-27", value: 28.89 },
        { time: "2018-12-28", value: 25.46 },
        { time: "2018-12-29", value: 23.92 },
        { time: "2018-12-30", value: 22.68 },
        { time: "2018-12-31", value: 22.67 }
      ]
    }
  ]
};
```

Bar and candlestick charts need a different dataset.

```javascript
chart.config = {
  series: [
    {
      type: "bar",
      data: [
        {
          time: "2018-12-19",
          open: 141.77,
          high: 170.39,
          low: 120.25,
          close: 145.72
        },
        {
          time: "2018-12-20",
          open: 145.72,
          high: 147.99,
          low: 100.11,
          close: 108.19
        },
        {
          time: "2018-12-21",
          open: 108.19,
          high: 118.43,
          low: 74.22,
          close: 75.16
        },
        {
          time: "2018-12-22",
          open: 75.16,
          high: 82.84,
          low: 36.16,
          close: 45.72
        }
      ]
    }
  ]
};
```

## Intraday charts
Interactive chart supports intraday chart using a UNIX timestamp instead of a date string, as mentioned in the [Lightweight Documentation](https://github.com/tradingview/lightweight-charts/blob/b58f2c3e7f539db5baab660bc50842367f5ed4fb/docs/time.md).

Also, be sure to enable `timeVisible` in the configuration. `secondVisible` is optional.

::
```javascript
::interactive-chart::

const chart = document.getElementById('price');
chart.config = {
  options: {
    timeScale: {
      timeVisible: true,
      secondsVisible: true
    }
  },
  series: [{
    symbol: 'Price',
    type: 'area',
    data: [
      { time: Date.parse('2019-04-10T08:40:10') / 1000, value: 82.90 },
      { time: Date.parse('2019-04-10T09:13:11') / 1000, value: 83.89 },
      { time: Date.parse('2019-04-10T10:21:25') / 1000, value: 81.81 },
      { time: Date.parse('2019-04-10T11:43:13') / 1000, value: 85.39 },
      { time: Date.parse('2019-04-11T12:24:20') / 1000, value: 81.42 },
      { time: Date.parse('2019-04-11T13:52:15') / 1000, value: 83.71 },
      { time: Date.parse('2019-04-11T14:11:45') / 1000, value: 80.11 },
      { time: Date.parse('2019-04-11T15:10:12') / 1000, value: 83.16 },
      { time: Date.parse('2019-04-11T16:05:11') / 1000, value: 80.78 },
    ]
  }]
};
```
```html
<ef-interactive-chart id="price"></ef-interactive-chart>
```
::

```javascript
chart.config = {
  options: {
    timeScale: {
      timeVisible: true,
      secondsVisible: true
    }
  },
  series: [{
    symbol: 'Price',
    type: 'area',
    data: [
      { time: Date.parse('2019-04-10T08:40:10') / 1000, value: 82.90 },
      { time: Date.parse('2019-04-10T09:13:11') / 1000, value: 83.89 },
      { time: Date.parse('2019-04-10T10:21:25') / 1000, value: 81.81 },
      { time: Date.parse('2019-04-10T11:43:13') / 1000, value: 85.39 },
      { time: Date.parse('2019-04-11T12:24:20') / 1000, value: 81.42 },
      { time: Date.parse('2019-04-11T13:52:15') / 1000, value: 83.71 },
      { time: Date.parse('2019-04-11T14:11:45') / 1000, value: 80.11 },
      { time: Date.parse('2019-04-11T15:10:12') / 1000, value: 83.16 },
      { time: Date.parse('2019-04-11T16:05:11') / 1000, value: 80.78 },    
    ]
  }]
};
```

## Multiple charts
Chart can display multiple series by passing an array to `config.series`. For example, a rebasing chart can be created as poer below.

::
```javascript
::interactive-chart::

const generateData = (total, start, init) => {
  let initVal = init || 20;
  const startDate = start || new Date();
  let ret = [];
  total = total < 0 ? 10 : total;
  for (let i = 0; i < total; i++) {
    const volatility = (Math.random() * (4.5) - 2) / 100; // random % volatility
    const date = start || new Date(startDate.setDate(startDate.getDate() + 1));
    const val = initVal + initVal * volatility;
    initVal = val;
    const point = {
      time: date.getTime() / 1000.0,
      value: parseFloat(val.toFixed(2))
    };
    ret.push(point);
  }
  return ret;
};

const chart = document.getElementById('multi');
chart.config = {
  options: {
    priceScale: {
      mode: 2
    }
  },
  series: [
    {
      symbol: 'GOOGL.O',
      type: 'area',
      data: generateData(100)
    },
    {
      symbol: 'AMZN.OQ',
      type: 'line',
      data: generateData(100)
    },
    {
      symbol: 'EBAY.OQ',
      type: 'line',
      data: generateData(100)
    },
    {
      symbol: 'NFLX.OQ',
      type: 'line',
      data: generateData(100)
    },
    {
      symbol: 'BIDU.OQ',
      type: 'line',
      data: generateData(100)
    },
    {
      symbol: 'CRTO.OQ',
      type: 'line',
      data: generateData(100)
    },
    {
      symbol: 'BABA.N',
      type: 'line',
      data: generateData(100)
    }
  ]
};
```
```css
ef-interactive-chart {
  width: 100%;
  height: 300px;
}
```
```html
<ef-interactive-chart id="multi"></ef-interactive-chart>
```
::

```javascript
chart.config = {
  options: {
    priceScale: {
      mode: 2
    }
  },
  series: [
    {
      symbol: 'GOOGL.O',
      type: 'area',
      data: [
        { time: '2019-04-11', value: 180.01 },
        { time: '2019-04-12', value: 156.63 },
        { time: '2019-04-13', value: 166.64 },
        { time: '2019-04-14', value: 181.89 },
        ...
      ]
    },
    {
      symbol: 'AMZN.OQ',
      type: 'line',
      data: [
        { time: '2019-04-11', value: 20.31 },
        { time: '2019-04-12', value: 30.27 },
        { time: '2019-04-13', value: 70.28 },
        { time: '2019-04-14', value: 49.29 },
        ...
      ]
    }
  ]
};
```

## Volume chart
To create a chart with volume, add a volume series and set `seriesOptions` as follows.

::
```javascript
::interactive-chart::

const generateData = (total, start, init) => {
  let initVal = init || 20;
  const startDate = start || new Date();
  let ret = [];
  total = total < 0 ? 10 : total;
  for (let i = 0; i < total; i++) {
    const volatility = (Math.random() * (20) - 6) / 100; // random % volatility
    const date = start || new Date(startDate.setDate(startDate.getDate() + 1));
    const val = initVal + initVal * volatility;
    initVal = val;
    const point = {
      time: date.getTime() / 1000.0,
      value: parseFloat(val.toFixed(2))
    };
    ret.push(point);
  }
  return ret;
};

const chart = document.getElementById('volume');
chart.config = {
  series: [
    {
      symbol: 'Price',
      type: 'area',
      data: generateData(70)
    },
    {
      symbol: 'Vol',
      type: 'volume',
      seriesOptions : {
        overlay: true,
        priceFormat: {
          type: 'volume'
        },
        scaleMargins: {
          top: 0.8,
          bottom: 0
        },
        lineWidth: 3,
      },
      data: generateData(70, null, 2000000)
    }
  ]
};
```
```css
ef-interactive-chart {
  width: 100%;
  height: 300px;
}
```
```html
<ef-interactive-chart id="volume"></ef-interactive-chart>
```
::

```javascript
chart.config = {
  series: [
    {
      type: 'area',
      data: [
        { time: '2019-04-11', value: 180.01 },
        { time: '2019-04-12', value: 156.63 },
        { time: '2019-04-13', value: 166.64 },
        { time: '2019-04-14', value: 181.89 },
        ...
      ]
    },
    {
      type: 'volume',
      seriesOptions : {
        overlay: true,
        priceFormat: {
          type: 'volume'
        },
        scaleMargins: {
          top: 0.8,
          bottom: 0
        },
        lineWidth: 3,
      },
      data: [
        { time: '2019-04-11', value: 204000 },
        { time: '2019-04-12', value: 303000 },
        { time: '2019-04-13', value: 705000 },
        { time: '2019-04-14', value: 498700 },
        ...
      ]
    }
  ]
};
```
## Seasonality chart
A Seasonality chart can be created using multiple series with the same timespan. You can use the APIs to customize the displayed legend, X-Axis label and cross hair vertical label.

::
```javascript
::interactive-chart::

const monthCount = {};
const months = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December"
}
const chart = document.getElementById('seasonality');
chart.config = {
  options: {
    timeScale: {
      tickMarkFormatter: (time, tickMarkType, locale) => {
        if(!monthCount[time.month]) {
          monthCount[time.month] = 1;
          return months[time.month];
        }
        return "";
      }
    },
    localization: {
      timeFormatter: (date) => date.day + ' ' + months[date.month]
    }
  },
    series: [
    {
      symbol: '2011-2020',
      symbolName: 'Avg. 2011-2020',
      type: 'line',
      seriesOptions: {
        priceLineVisible: false,
        lastValueVisible: false
      },
      data: [
        { time: '2020-01-11', value: 20.31 },
        { time: '2020-02-12', value: 30.27 },
        { time: '2020-03-13', value: 70.28 },
        { time: '2020-04-11', value: 20.31 },
        { time: '2020-05-12', value: 30.27 },
        { time: '2020-06-13', value: 70.28 },
        { time: '2020-07-11', value: 49.29 },
        { time: '2020-08-12', value: 20.31 },
        { time: '2020-09-13', value: 30.27 },
        { time: '2020-10-11', value: 70.28 },
        { time: '2020-11-12', value: 49.29 },
        { time: '2020-12-13', value: 70.28 },
      ]
    },
    {
      symbol: '2021',
      symbolName: '2021',
      type: 'area',
      data: [
        { time: '2020-01-11', value: 45.01 },
        { time: '2020-02-12', value: 60.63 },
        { time: '2020-03-13', value: 166.64 },
        { time: '2020-04-11', value: 180.01 },
        { time: '2020-05-12', value: 156.63 },
        { time: '2020-06-13', value: 166.64 },
        { time: '2020-07-11', value: 181.89 }
      ]
    },
  ]
};
```
```css
ef-interactive-chart {
  width: 100%;
  height: 300px;
}
```
```html
<ef-interactive-chart id="seasonality"></ef-interactive-chart>
```
::

```javascript
const monthCount = {};
const months = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December"
}
const chart = document.getElementById('seasonality');
chart.config = {
  options: {
    timeScale: {
      tickMarkFormatter: (time, tickMarkType, locale) => {
        if(!monthCount[time.month]) {
          monthCount[time.month] = 1;
          return months[time.month];
        }
        return "";
      }
    },
    localization: {
      timeFormatter: (date) => date.day + ' ' + months[date.month]
    }
  },
  series: [
    {
      symbol: '2011-2020',
      symbolName: 'Avg. 2011-2020',
      type: 'line',
      seriesOptions: {
        priceLineVisible: false,
        lastValueVisible: false
      },
      data: [
        { time: '2020-01-11', value: 20.31 },
        { time: '2020-02-12', value: 30.27 },
        { time: '2020-03-13', value: 70.28 },
        { time: '2020-04-11', value: 20.31 },
        { time: '2020-05-12', value: 30.27 },
        { time: '2020-06-13', value: 70.28 },
        { time: '2020-07-11', value: 49.29 },
        { time: '2020-08-12', value: 20.31 },
        { time: '2020-09-13', value: 30.27 },
        { time: '2020-10-11', value: 70.28 },
        { time: '2020-11-12', value: 49.29 },
        { time: '2020-12-13', value: 70.28 },
      ]
    },
    {
      symbol: '2021',
      symbolName: '2021',
      type: 'area',
      data: [
        { time: '2020-01-11', value: 45.01 },
        { time: '2020-02-12', value: 60.63 },
        { time: '2020-03-13', value: 166.64 },
        { time: '2020-04-11', value: 180.01 },
        { time: '2020-05-12', value: 156.63 },
        { time: '2020-06-13', value: 166.64 },
        { time: '2020-07-11', value: 181.89 }
      ]
    },
  ]
};
```


## Setting chart options
You can customize chart options either at the **chart level** or **series level**.

To customize options at the chart level, pass the option to `config.options`. Learn more about chart options from the [Lightweight Chart Customization](https://github.com/tradingview/lightweight-charts/tree/b58f2c3e7f539db5baab660bc50842367f5ed4fb/docs).

For example, in the `lightweight-charts` documents, you can learn to pass options to the chart in order to customize the crosshair.

```json
{
  crosshair: {
    vertLine: {
      color: "#4d4d4d",
      width: 0.5,
      style: 1,
      visible: true,
      labelVisible: false,
    },
    horzLine: {
      color: "#4d4d4d",
      width: 1.5,
      style: 0,
      visible: true,
      labelVisible: true,
    },
    mode: 1,
  },
}
```

In `ef-interactive-chart`, you will need to pass those options to `config.options`.

```json
chart.config = {
  options: {
    crosshair: {
      vertLine: {
        color: "#4d4d4d",
        width: 0.5,
        style: 1,
        visible: true,
        labelVisible: false,
      },
      horzLine: {
        color: "#4d4d4d",
        width: 1.5,
        style: 0,
        visible: true,
        labelVisible: true,
      },
    },
  }
};
```

::
```javascript
::interactive-chart::

const chart = document.getElementById('price');
chart.config = {
  series: [
    {
      symbol: 'Price',
      type: 'area',
      data: [
        { time: '2019-04-11', value: 180.01 },
        { time: '2019-04-12', value: 156.63 },
        { time: '2019-04-13', value: 166.64 },
        { time: '2019-04-14', value: 181.89 },
        { time: '2019-04-15', value: 174.43 },
        { time: '2019-04-16', value: 180.01 },
        { time: '2019-04-17', value: 196.63 },
        { time: '2019-04-18', value: 176.64 },
        { time: '2019-04-20', value: 181.89 },
        { time: '2019-04-21', value: 190.01 },
        { time: '2019-04-22', value: 196.63 },
        { time: '2019-04-23', value: 178.64 },
        { time: '2019-04-24', value: 141.89 },
        { time: '2019-04-25', value: 154.43 },
        { time: '2019-04-26', value: 170.01 },
        { time: '2019-04-27', value: 196.63 },
        { time: '2019-04-28', value: 176.64 },
        { time: '2019-04-29', value: 181.89 }
      ]
    }
  ],
  options: {
    crosshair: {
      vertLine: {
        color: '#4d4d4d',
        width: 0.5,
        style: 1,
        visible: true,
        labelVisible: false,
      },
      horzLine: {
        color: '#4d4d4d',
        width: 1.5,
        style: 0,
        visible: true,
        labelVisible: true,
      }
    }
  }
};
```
```css
ef-interactive-chart {
  width: 100%;
  height: 300px;
}
```
```html
<ef-interactive-chart id="price"></ef-interactive-chart>
```
::

To customize options at the series level, pass the options to each series using `seriesOptions`. Learn more about chart options from [Lightweight Chart Series Basic](https://github.com/tradingview/lightweight-charts/blob/b58f2c3e7f539db5baab660bc50842367f5ed4fb/docs/series-basics.md).

For example, in `lightweight-chart`, you can pass options to set preferred decimal places on the y-axis.

```json
{
  priceFormat: {
    precision: 3,
  },
}
```

In `ef-interactive-chart`, you pass options to `seriesOptions` in the `series`.

```javascript
chart.config = {
  options: { ... },
  series: [
  {
    symbol: 'Price',
    type: 'area',
      seriesOptions: {
        priceFormat: {
            precision: 3
        }
      }
  }]
}
```

::
```javascript
::interactive-chart::

const chart = document.getElementById('price');

chart.config = {
  series: [
    {
      symbol: 'Price',
      type: 'area',
      data: [
        { time: '2019-04-11', value: 180.01 },
        { time: '2019-04-12', value: 156.63 },
        { time: '2019-04-13', value: 166.64 },
        { time: '2019-04-14', value: 181.89 },
        { time: '2019-04-15', value: 174.43 },
        { time: '2019-04-16', value: 180.01 },
        { time: '2019-04-17', value: 196.63 },
        { time: '2019-04-18', value: 176.64 },
        { time: '2019-04-20', value: 181.89 },
        { time: '2019-04-21', value: 190.01 },
        { time: '2019-04-22', value: 196.63 },
        { time: '2019-04-23', value: 178.64 },
        { time: '2019-04-24', value: 141.89 },
        { time: '2019-04-25', value: 154.43 },
        { time: '2019-04-26', value: 170.01 },
        { time: '2019-04-27', value: 196.63 },
        { time: '2019-04-28', value: 176.64 },
        { time: '2019-04-29', value: 181.89 }
      ],
      seriesOptions: {
        priceFormat: {
            precision: 3
        }
      }
    }
  ]
};
```
```css
ef-interactive-chart {
  width: 100%;
  height: 300px;
}
```
```html
<ef-interactive-chart id="price"></ef-interactive-chart>
```
::

## Y-Axis placement
By default, chart will not display a left-side y-axis and all series will show on the right y-axis of the chart. However, `lightweight-chart` also provides the option to configure placement of a series to the left, right or both.

Customizing chart to show data on the left y-axis.

```json
chart.config = {
  options: {
    rightPriceScale: {
      visible: false
    },
    leftPriceScale: {
      visible: true
    },
  },
  series: [{
    symbol: 'Price',
    type: 'area',
    seriesOptions: {
      priceScaleId: 'left'
    },
    data: [...]
  }]
};
```

::
```javascript
::interactive-chart::

const chart = document.getElementById('price');

chart.config = {
  options: {
    rightPriceScale: {
      visible: false
    },
    leftPriceScale: {
      visible: true
    },
  },
  series: [
    {
      symbol: 'Price',
      type: 'area',
      seriesOptions: {
        priceScaleId: 'left'
      },
      data: [
        { time: '2019-04-11', value: 180.01 },
        { time: '2019-04-12', value: 156.63 },
        { time: '2019-04-13', value: 166.64 },
        { time: '2019-04-14', value: 181.89 },
        { time: '2019-04-15', value: 174.43 },
        { time: '2019-04-16', value: 180.01 },
        { time: '2019-04-17', value: 196.63 },
        { time: '2019-04-18', value: 176.64 },
        { time: '2019-04-20', value: 181.89 },
        { time: '2019-04-21', value: 190.01 },
        { time: '2019-04-22', value: 196.63 },
        { time: '2019-04-23', value: 178.64 },
        { time: '2019-04-24', value: 141.89 },
        { time: '2019-04-25', value: 154.43 },
        { time: '2019-04-26', value: 170.01 },
        { time: '2019-04-27', value: 196.63 },
        { time: '2019-04-28', value: 176.64 },
        { time: '2019-04-29', value: 181.89 }
      ]
    }
  ]
};
```
```css
ef-interactive-chart {
  width: 100%;
  height: 300px;
}
```
```html
<ef-interactive-chart id="price"></ef-interactive-chart>
```
::

Customizing chart to show data on the left and right sides of the y-axis.

```json
chart.config = {
  options: {
    rightPriceScale: {
      visible: true
    },
    leftPriceScale: {
      visible: true
    },
  },
  series: [{
    symbol: 'IBM.N',
    type: 'area',
    seriesOptions: {
      priceScaleId: 'right'
    },
    data: [...]
  },
  {
    symbol: 'GOOG.O',
    type: 'area',
    seriesOptions: {
      priceScaleId: 'left'
    },
    data: [...]
  }]
};
```

::
```javascript
::interactive-chart::

const chart = document.getElementById('price');

chart.config = {
  options: {
    rightPriceScale: {
      visible: true
    },
    leftPriceScale: {
      visible: true
    },
  },
  series: [
    {
      symbol: 'IBM.N',
      type: 'area',
      seriesOptions: {
        priceScaleId: 'right'
      },
      data: [
        { time: '2019-04-11', value: 280.01 },
        { time: '2019-04-12', value: 186.63 },
        { time: '2019-04-13', value: 366.64 },
        { time: '2019-04-14', value: 381.89 },
        { time: '2019-04-15', value: 374.43 },
        { time: '2019-04-16', value: 240.01 },
        { time: '2019-04-17', value: 276.63 },
        { time: '2019-04-18', value: 286.64 },
        { time: '2019-04-20', value: 301.89 },
        { time: '2019-04-21', value: 290.01 },
        { time: '2019-04-22', value: 296.63 },
        { time: '2019-04-23', value: 278.64 },
        { time: '2019-04-24', value: 341.89 },
        { time: '2019-04-25', value: 354.43 },
        { time: '2019-04-26', value: 370.01 },
        { time: '2019-04-27', value: 296.63 },
        { time: '2019-04-28', value: 276.64 },
        { time: '2019-04-29', value: 181.89 }
      ]
    },
    {
      symbol: 'GOOG.O',
      type: 'area',
      seriesOptions: {
        priceScaleId: 'left'
      },
      data: [
        { time: '2019-04-11', value: 180.01 },
        { time: '2019-04-12', value: 156.63 },
        { time: '2019-04-13', value: 166.64 },
        { time: '2019-04-14', value: 181.89 },
        { time: '2019-04-15', value: 174.43 },
        { time: '2019-04-16', value: 180.01 },
        { time: '2019-04-17', value: 196.63 },
        { time: '2019-04-18', value: 176.64 },
        { time: '2019-04-20', value: 181.89 },
        { time: '2019-04-21', value: 190.01 },
        { time: '2019-04-22', value: 196.63 },
        { time: '2019-04-23', value: 178.64 },
        { time: '2019-04-24', value: 141.89 },
        { time: '2019-04-25', value: 154.43 },
        { time: '2019-04-26', value: 170.01 },
        { time: '2019-04-27', value: 196.63 },
        { time: '2019-04-28', value: 176.64 },
        { time: '2019-04-29', value: 181.89 }
      ]
    }
  ]
};
```
```css
ef-interactive-chart {
  width: 100%;
  height: 300px;
}
```
```html
<ef-interactive-chart id="price"></ef-interactive-chart>
```
::

## Chart legend
The interactive chart provides a default standard legend which displays price and symbol, if available.

In case you want to preserve the value of `symbol` and show a custom name on the legend, use `symbolName` alongside `symbol`. The chart will use `symbolName` in the legend, instead.

```javascript
line.config = {
  series: [
    {
      symbol: 'APPL.O',
      symbolName: 'Price',
      type: 'line',
      data: [...]
    }
  ]
};
```

Use `legendVisible` to hide a legend of any series.

```javascript
line.config = {
  series: [
    {
      symbol: 'APPL.O',
      legendVisible: false,
      type: 'line',
      data: [...]
    }
  ]
};
```

By default, chart will display a raw value that passes from the data object in the legend. If you want to override the default formatting of the price, you can set your own formatter function to `legendPriceFormatter` in a series configuration object to override price format on the legend.

For example, here's how you can format price to show three decimal places on the legend.

```javascript
chart.config = {
  series: [
    {
      symbol: 'AAPL',
      legendPriceFormatter: (price) => '£' + price.toFixed(3),
      type: 'area',
      data: [...],
    }
  ]
};
```

::
```javascript
::interactive-chart::

const chart = document.getElementById('legend_formatter');

chart.config = {
  series: [
    {
      legendPriceFormatter: (price) => '£' + price.toFixed(3),
      type: 'area',
      data: [
        { time: '2018-12-22', value: 32.51 },
        { time: '2018-12-23', value: 31.11 },
        { time: '2018-12-24', value: 27.02 },
        { time: '2018-12-25', value: 27.32 },
        { time: '2018-12-26', value: 25.17 },
        { time: '2018-12-27', value: 28.89 },
        { time: '2018-12-28', value: 25.46 },
        { time: '2018-12-29', value: 23.92 },
        { time: '2018-12-30', value: 22.68 },
        { time: '2018-12-31', value: 22.67 }
      ],
      seriesOptions: {
        priceFormat: {
          type: 'custom',
          formatter: (price) => '£' + price.toFixed(3)
        }
      }
    }
  ]
};
```
```html
<ef-interactive-chart id="legend_formatter"></ef-interactive-chart>
```
::

## Custom legend
You can implement your own legend using the `legend` slot.

```html
<ef-interactive-chart id="line" legend>
  <div slot="legend" id="chart-legend"></div>
</ef-interactive-chart>
```

```javascript
const el = document.getElementById('line');
const legend = document.getElementById('chart-legend');

el.addEventListener('initialised', (e) => {
  const chart = e.target.chart; // lightweight chart instance
  const seriesList = e.target.seriesList;
  const data = e.target.config.series[0].data;

  chart.subscribeCrosshairMove((param) => {
    const price = param.seriesPrices.get(seriesList[0]); // get price at crosshair
    if (price) {
      legend.textContent = price; // set price to legend
      // more legend customization goes here
    }
  });
  // set legend to show latest data when no crosshair
  legend.textContent = data[data.length - 1].value;
});
```

Custom legend can also be used to implement a custom tooltip.

::
```javascript
::interactive-chart::

const chartEl = document.getElementById('line');

chartEl.config = {
  series: [
    {
      symbol: 'AAPL',
      type: 'area',
      data: [
        { time: '2018-12-22', value: 32.51 },
        { time: '2018-12-23', value: 31.11 },
        { time: '2018-12-24', value: 27.02 },
        { time: '2018-12-25', value: 27.32 },
        { time: '2018-12-26', value: 25.17 },
        { time: '2018-12-27', value: 28.89 },
        { time: '2018-12-28', value: 25.46 },
        { time: '2018-12-29', value: 23.92 },
        { time: '2018-12-30', value: 22.68 },
        { time: '2018-12-31', value: 22.67 }
      ]
    }
  ]
};

chartEl.addEventListener('initialised', (event) => {
  const chart = event.target.chart;
  const seriesList = event.target.seriesList;
  const legend = document.getElementById('custom-legend');

  chart.subscribeCrosshairMove((param) => {
    if (param.point === undefined || !param.time || param.point.x < 0 || param.point.x > event.target.clientWidth || param.point.y < 0 || param.point.y > event.target.clientHeight) {
      legend.style.display = 'none';
    }
    else {
      const legendWidth = 60;
      const legendHeight = 30;
      const legendMargin = 10;
      const y = param.point.y;
      let left = param.point.x + legendMargin;
      let top = y + legendMargin;

      if (left > event.target.clientWidth - legendWidth) {
        left = param.point.x - legendMargin - legendWidth;
      }

      if (top > event.target.clientHeight - legendHeight) {
        top = y - legendHeight - legendMargin;
      }

      legend.style.zIndex = 1000;
      legend.style.left = left + 'px';
      legend.style.top = top + 'px';
      legend.style.display = 'flex';
      legend.style.alignItems = 'center';
      legend.style.justifyContent = 'center';
      legend.style.position = 'absolute';
      legend.style.width = legendWidth + 'px';
      legend.style.height = legendHeight + 'px';
      legend.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
      legend.style.border = 'solid 1px rgb(0,0,0)';
      legend.style.color = 'rgb(0,0,0)';
      legend.textContent = param.seriesPrices.get(seriesList[0]);
    }
  });
});
```
```html
<ef-interactive-chart id="line">
  <div slot="legend" id="custom-legend">
  </div>
</ef-interactive-chart>
```
::

## Lightweight Charts instance
An instance of lightweight chart can be accessed using the `chart` and `seriesList` properties.

```javascript
  const el = document.getElementById("line");
  console.log('instance chart', el.chart); // instance of lightweight chart
  console.log('instance series', el.seriesList); // array of series instances
```
