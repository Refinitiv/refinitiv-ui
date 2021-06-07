# Interactive Chart

```live(preview)
<style>
  ef-interactive-chart {
    width: 100%;
    height: 300px;
  }
</style>
<ef-interactive-chart id="candle"></ef-interactive-chart>
<script>
      var initVal = 20;
      var maxVal = initVal * 2;
      var generateData = function (total, start) {     
        var startDate = start || new Date();
        var ret = [];
        total = total < 0 ? 10 : total;
        for (var i = 0; i < total; i++) {
          var volatility = (Math.random() * (4.5) - 2) / 100; // random % volatility
          var date = start || new Date(startDate.setDate(startDate.getDate() + 1));
          var openVal = initVal + initVal * volatility;
          var closeVal = openVal + (openVal * volatility * 1.5);
          var highVal = openVal > closeVal ? openVal + 0.1 : closeVal + 0.5;
          var lowVal = openVal < closeVal ? openVal - 0.5 : closeVal - 0.2;
          initVal = closeVal > maxVal ? closeVal - (closeVal * 0.2) : closeVal;
          var point = {
            time: date.getTime() / 1000.0,
            open: openVal.toFixed(2),
            high: highVal.toFixed(2),
            low: lowVal.toFixed(2),
            close: closeVal.toFixed(2)
          };
          ret.push(point);
        }
        return ret;
      };

      var generateCurrent = function (prevDate) {
        var newPoint = generateData(1, prevDate);
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

      setInterval(function () {
        var lastIndex = chart.config.series[0].data.length - 1;
          var time = chart.config.series[0].data[lastIndex].time;
          var latestTime = time || null;
          latestTime += 86400; // Update time Next day
          var prevDate = new Date(latestTime * 1000);
          var current = generateCurrent(prevDate);
          chart.config.series[0].data.push(current);
          chart.seriesList[0].update(current);
      }, 1000);
</script>
```

Interactive Chart is a lightweight chart component that allows you to create several use cases of financial chart. The component uses [lightweight-charts](https://github.com/tradingview/lightweight-charts) library. You can see a demo of different chart types and API of lightweight chart library from [documentation](https://www.tradingview.com/lightweight-charts/).

While you can use interactive chart to draw several chart types such as line, bar and candlestick, the chart doesn't support to add trendlines or any technical analyses.

### Create chart

You can create chart by passing configuration and initial dataset using `config` property. Interactive chart supports the following chart types.

| Type          | Description                 |
| ------------- | --------------------------- |
| `line`        | Line chart                  |
| `area`        | Line chart with filled area |
| `bar`         | OHLC bar chart              |
| `candlestick` | Candlestick chart           |
| `volume`      | Volume chart                |

```html
<ef-interactive-chart id="line"></ef-interactive-chart>

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

Bar and candlestick chart needs a different dataset.

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

### Intraday charts

Interactive chart supports intraday chart by using UNIX timestamp instead of date string as mentioned in [Lightweight Documentation](https://github.com/tradingview/lightweight-charts/blob/master/docs/time.md#time).

Also, you will have to enable `timeVisible` in configuration while `secondVisible` is an optional.

```live
<ef-interactive-chart id="price"></ef-interactive-chart>
<script>
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
      { time: Date.parse('2019-04-10 08:40:10')/1000, value: 82.90 },
      { time: Date.parse('2019-04-10 09:13:11')/1000, value: 83.89 },
      { time: Date.parse('2019-04-10 10:21:25')/1000, value: 81.81 },
      { time: Date.parse('2019-04-10 11:43:13')/1000, value: 85.39 },
      { time: Date.parse('2019-04-11 12:24:20')/1000, value: 81.42 },
      { time: Date.parse('2019-04-11 13:52:15')/1000, value: 83.71 },
      { time: Date.parse('2019-04-11 14:11:45')/1000, value: 80.11 },
      { time: Date.parse('2019-04-11 15:10:12')/1000, value: 83.16 },
      { time: Date.parse('2019-04-11 16:05:11')/1000, value: 80.78 },
    ]
  }]
};
</script>
```

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
      { time: Date.parse('2019-04-10 08:40:10')/1000, value: 82.90 },
      { time: Date.parse('2019-04-10 09:13:11')/1000, value: 83.89 },
      { time: Date.parse('2019-04-10 10:21:25')/1000, value: 81.81 },
      { time: Date.parse('2019-04-10 11:43:13')/1000, value: 85.39 },
      { time: Date.parse('2019-04-11 12:24:20')/1000, value: 81.42 },
      { time: Date.parse('2019-04-11 13:52:15')/1000, value: 83.71 },
      { time: Date.parse('2019-04-11 14:11:45')/1000, value: 80.11 },
      { time: Date.parse('2019-04-11 15:10:12')/1000, value: 83.16 },
      { time: Date.parse('2019-04-11 16:05:11')/1000, value: 80.78 },      
    ]
  }]
};
```

### Multiple charts

Chart can display multiple series by passing an array to `config.series`. For example, rebasing chart can be created as below.


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

```live
<style>
  ef-interactive-chart {
    width: 100%;
    height: 300px;
  }
</style>
<ef-interactive-chart id="multi"></ef-interactive-chart>
<script>
  var generateData = function (total, start, init) {
    var initVal = init || 20;        
    var startDate = start || new Date();
    var ret = [];
    total = total < 0 ? 10 : total;
    for (var i = 0; i < total; i++) {
      var volatility = (Math.random() * (4.5) - 2) / 100; // random % volatility
      var date = start || new Date(startDate.setDate(startDate.getDate() + 1));
      var val = initVal + initVal * volatility;
      initVal = val;
      var point = {
        time: date.getTime() / 1000.0,
        value: val.toFixed(2)
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
</script>
```

### Volume chart

To create chart with volume, add volume series and set `seriesOptions` as following.


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

```live
<style>
  ef-interactive-chart {
    width: 100%;
    height: 300px;
  }
</style>
<ef-interactive-chart id="volume"></ef-interactive-chart>
<script>
  var generateData = function (total, start, init) {
    var initVal = init || 20;        
    var startDate = start || new Date();
    var ret = [];
    total = total < 0 ? 10 : total;
    for (var i = 0; i < total; i++) {
      var volatility = (Math.random() * (4.5) - 2) / 100; // random % volatility
      var date = start || new Date(startDate.setDate(startDate.getDate() + 1));
      var val = initVal + initVal * volatility;
      initVal = val;
      var point = {
        time: date.getTime() / 1000.0,
        value: val.toFixed(2)
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
</script>
```

### Setting chart options

You can customize chart options either at **chart level** or **series level**.

To customize options at chart level, passes the option to `config.options`. Learn more about chart options from [Lightweight Chart Customization](https://github.com/tradingview/lightweight-charts/blob/master/docs).

For example, in `lightweight-charts` documents, you can pass options to chart in order to customize crosshair.

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
```

```live
<style>
  ef-interactive-chart {
    width: 100%;
    height: 300px;
  }
</style>
<ef-interactive-chart id="price"></ef-interactive-chart>
<script>
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
</script>
```


To customize options at series level, pass the option to each series using `seriesOptions`. Learn more about chart options from [Lightweight Chart Series Basic](https://github.com/tradingview/lightweight-charts/blob/master/docs).

For example, in `lightweight-chart`, you can pass options to set preferred decimal places on y-axis.

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

```live
<style>
  ef-interactive-chart {
    width: 100%;
    height: 300px;
  }
</style>
<ef-interactive-chart id="price"></ef-interactive-chart>
<script>
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
</script>
```

### Y-Axis placement

By default, chart will not display left y-axis and all series will show on the right y-axis of the chart. However, `lightweight-chart` provides the option to configure placement of series to left or right or both.

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
}
```

```live
<style>
  ef-interactive-chart {
    width: 100%;
    height: 300px;
  }
</style>
<ef-interactive-chart id="price"></ef-interactive-chart>
<script>
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
</script>
```

Customizing chart to show data on left and right sides of y-axis.

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
}
```


```live
<style>
  ef-interactive-chart {
    width: 100%;
    height: 300px;
  }
</style>
<ef-interactive-chart id="price"></ef-interactive-chart>
<script>
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
</script>
```

### Chart legend

The interactive chart provides a default standard legend which displays price and symbol, if available.

In case you want to preserve `symbol` value and show a custom name on legend, use `symbolName` alongside `symbol`. The chart will use `symbolName` on the legend instead.

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

By default, chart will display a raw value that passes from the data object on the legend. If you want to override the default formatting of the price, you can set your own formatter function to `legendPriceFormatter` in a series configuration object to override price format on the legend.

For example, you can format price to show three decimal places on the legend.

```javascript
chart.config = {
    series: [
      {
        symbol: 'AAPL',
        legendPriceFormatter: price => '$' + price.toFixed(3),
        type: 'area',
        data: [...],
      }
    ]
};
```
```live
<ef-interactive-chart id="legend_formatter"></ef-interactive-chart>
    <script>
      const chart = document.getElementById('legend_formatter');
      chart.config = {
        series: [
          {
            legendPriceFormatter: function (price) { return '$' + price.toFixed(3); },
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
                formatter: function (price) { return '$' + price.toFixed(3); }
              }
            }
          }
        ]
      };
    </script>
```

### Custom legend

You can implement your own legend by using the `legend` slot.

```html
<ef-interactive-chart id="line" legend>
  <div slot="legend" id="chart-legend"></div>
</ef-interactive-chart>
```

```javascript
const el = document.getElementById('line');
const legend = document.getElementById('chart-legend');

el.addEventListener('initialized', (e) => {
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

```live
<ef-interactive-chart id="line">
  <div slot="legend" id="custom-legend">
  </div>
</ef-interactive-chart>

<script>
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
  chartEl.addEventListener('initialized', function(event) {
    const chart = event.target.chart;
    const seriesList = event.target.seriesList;
    var legend = document.getElementById('custom-legend');
    chart.subscribeCrosshairMove(function(param) {
      if (param.point === undefined || !param.time || param.point.x < 0 || param.point.x > event.target.clientWidth || param.point.y < 0 || param.point.y > event.target.clientHeight) {
        legend.style.display = 'none';
      }
      else {
        const legendWidth = 60;
        const legendHeight = 30;
        const legendMargin = 10;

        var y = param.point.y;
        var left = param.point.x + legendMargin;

        if (left > event.target.clientWidth - legendWidth) {
          left = param.point.x - legendMargin - legendWidth;
        }

        var top = y + legendMargin;
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
</script>
```

### Lightweight Charts instance
An instance of lightweight chart can be accessed by using the `chart` and `seriesList` properties.

```javascript
  const el = document.getElementById("line");
  console.log('instance chart', el.chart); // instance of lightweight chart
  console.log('instance series', el.seriesList); // array of series instances
```
