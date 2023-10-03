let line = {
  series: [
    {
      type: 'line',
      data: [
        { time: '2019-04-11', value: 80.01 },
        { time: '2019-04-12', value: 96.63 },
        { time: '2019-04-13', value: 76.64 },
        { time: '2019-04-14', value: 81.89 },
        { time: '2019-04-15', value: 74.43 },
        { time: '2019-04-16', value: 80.01 },
        { time: '2019-04-17', value: 96.63 },
        { time: '2019-04-18', value: 76.64 },
        { time: '2019-04-19', value: 81.89 }
      ]
    }
  ]
};

let linePositionLeft = {
  series: [
    {
      symbol: 'Elf',
      type: 'line',
      data: [
        { time: '2019-04-11', value: 80.01 },
        { time: '2019-04-12', value: 96.63 },
        { time: '2019-04-13', value: 76.64 },
        { time: '2019-04-14', value: 81.89 },
        { time: '2019-04-15', value: 74.43 },
        { time: '2019-04-16', value: 80.01 },
        { time: '2019-04-17', value: 96.63 },
        { time: '2019-04-18', value: 76.64 },
        { time: '2019-04-19', value: 81.89 }
      ],
      seriesOptions: {
        priceScaleId: 'left'
      }
    }
  ],
  options: {
    leftPriceScale: {
      visible: true
    },
    rightPriceScale: {
      visible: false
    }
  }
};

let noData = {
  series: [
    {
      type: 'line',
      data: [
        { time: '2019-04-11', value: 80.01 },
        { time: '2019-04-12', value: 96.63 },
        { time: '2019-04-13', value: 76.64 },
        { time: '2019-04-14', value: 81.89 },
        { time: '2019-04-15', value: 74.43 },
        { time: '2019-04-16', value: 80.01 },
        { time: '2019-04-17', value: 96.63 },
        { time: '2019-04-18', value: 76.64 },
        { time: '2019-04-19', value: 81.89 }
      ]
    },
    {
      type: 'area',
      data: []
    }
  ]
};

let multiLine = {
  series: [
    {
      type: 'line',
      data: [
        { time: '2019-04-11', value: 80.01 },
        { time: '2019-04-12', value: 96.63 },
        { time: '2019-04-13', value: 76.64 },
        { time: '2019-04-14', value: 81.89 },
        { time: '2019-04-15', value: 74.43 },
        { time: '2019-04-16', value: 80.01 },
        { time: '2019-04-17', value: 96.63 },
        { time: '2019-04-18', value: 76.64 },
        { time: '2019-04-19', value: 81.89 }
      ]
    },
    {
      type: 'line',
      data: [
        { time: '2019-04-11', value: 10.01 },
        { time: '2019-04-12', value: 26.63 },
        { time: '2019-04-13', value: 36.64 },
        { time: '2019-04-14', value: 61.89 },
        { time: '2019-04-15', value: 44.43 },
        { time: '2019-04-16', value: 20.01 },
        { time: '2019-04-17', value: 6.63 },
        { time: '2019-04-18', value: 6.64 },
        { time: '2019-04-19', value: 99.89 }
      ]
    },
    {
      type: 'line',
      data: [
        { time: '2019-04-11', value: 1.01 },
        { time: '2019-04-12', value: 5.63 },
        { time: '2019-04-13', value: 26.64 },
        { time: '2019-04-14', value: 31.89 },
        { time: '2019-04-15', value: 14.43 },
        { time: '2019-04-16', value: 50.01 },
        { time: '2019-04-17', value: 6.63 },
        { time: '2019-04-18', value: 66.64 },
        { time: '2019-04-19', value: 19.89 }
      ]
    }
  ]
};

let area = {
  series: [
    {
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

let bar = {
  series: [
    {
      type: 'bar',
      data: [
        { time: '2018-12-19', open: 141.77, high: 170.39, low: 120.25, close: 145.72 },
        { time: '2018-12-20', open: 145.72, high: 147.99, low: 100.11, close: 108.19 },
        { time: '2018-12-21', open: 108.19, high: 118.43, low: 74.22, close: 75.16 },
        { time: '2018-12-22', open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
        { time: '2018-12-23', open: 45.12, high: 53.9, low: 45.12, close: 48.09 },
        { time: '2018-12-24', open: 60.71, high: 60.71, low: 53.39, close: 59.29 },
        { time: '2018-12-25', open: 68.26, high: 68.26, low: 59.04, close: 60.5 },
        { time: '2018-12-26', open: 67.71, high: 105.85, low: 66.67, close: 91.04 },
        { time: '2018-12-27', open: 91.04, high: 121.4, low: 82.7, close: 111.4 },
        { time: '2018-12-28', open: 111.51, high: 142.83, low: 103.34, close: 131.25 },
        { time: '2018-12-29', open: 131.33, high: 151.17, low: 77.68, close: 96.43 },
        { time: '2018-12-30', open: 106.33, high: 110.2, low: 90.39, close: 98.1 },
        { time: '2018-12-31', open: 109.87, high: 114.69, low: 85.66, close: 111.26 }
      ]
    }
  ]
};

let candlestick = {
  series: [
    {
      type: 'candlestick',
      data: [
        { time: '2018-12-19', open: 141.77, high: 170.39, low: 120.25, close: 145.72 },
        { time: '2018-12-20', open: 145.72, high: 147.99, low: 100.11, close: 108.19 },
        { time: '2018-12-21', open: 108.19, high: 118.43, low: 74.22, close: 75.16 },
        { time: '2018-12-22', open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
        { time: '2018-12-23', open: 45.12, high: 53.9, low: 45.12, close: 48.09 },
        { time: '2018-12-24', open: 60.71, high: 60.71, low: 53.39, close: 59.29 },
        { time: '2018-12-25', open: 68.26, high: 68.26, low: 59.04, close: 60.5 },
        { time: '2018-12-26', open: 67.71, high: 105.85, low: 66.67, close: 91.04 },
        { time: '2018-12-27', open: 91.04, high: 121.4, low: 82.7, close: 111.4 },
        { time: '2018-12-28', open: 111.51, high: 142.83, low: 103.34, close: 131.25 },
        { time: '2018-12-29', open: 131.33, high: 151.17, low: 77.68, close: 96.43 },
        { time: '2018-12-30', open: 106.33, high: 110.2, low: 90.39, close: 98.1 },
        { time: '2018-12-31', open: 109.87, high: 114.69, low: 85.66, close: 111.26 }
      ]
    }
  ]
};

let volume = {
  series: [
    {
      type: 'volume',
      data: [
        { time: '2018-12-20', value: 20.31 },
        { time: '2018-12-21', value: 30.27 },
        { time: '2018-12-22', value: 70.28 },
        { time: '2018-12-23', value: 49.29 },
        { time: '2018-12-24', value: 40.64 },
        { time: '2018-12-25', value: 57.46 },
        { time: '2018-12-26', value: 50.55 },
        { time: '2018-12-27', value: 34.85 },
        { time: '2018-12-28', value: 56.68 },
        { time: '2018-12-29', value: 51.6 },
        { time: '2018-12-30', value: 75.33 },
        { time: '2018-12-31', value: 54.85, color: 'red' }
      ]
    }
  ]
};

let multiSeries = {
  series: [
    {
      type: 'line',
      data: [
        { time: '2019-04-11', value: 80.01 },
        { time: '2019-04-12', value: 96.63 },
        { time: '2019-04-13', value: 76.64 },
        { time: '2019-04-14', value: 81.89 },
        { time: '2019-04-15', value: 74.43 },
        { time: '2019-04-16', value: 80.01 },
        { time: '2019-04-17', value: 96.63 },
        { time: '2019-04-18', value: 76.64 },
        { time: '2019-04-19', value: 81.89 }
      ]
    },
    {
      type: 'area',
      data: [
        { time: '2019-04-11', value: 80.01 },
        { time: '2019-04-12', value: 76.63 },
        { time: '2019-04-13', value: 76.64 },
        { time: '2019-04-14', value: 81.89 },
        { time: '2019-04-15', value: 64.43 },
        { time: '2019-04-16', value: 80.01 },
        { time: '2019-04-17', value: 96.63 },
        { time: '2019-04-18', value: 56.64 },
        { time: '2019-04-19', value: 81.89 }
      ]
    },
    {
      type: 'volume',
      data: [
        { time: '2019-04-11', value: 20.31 },
        { time: '2019-04-12', value: 30.27 },
        { time: '2019-04-13', value: 70.28 },
        { time: '2019-04-14', value: 49.29 },
        { time: '2019-04-16', value: 40.64 },
        { time: '2019-04-17', value: 57.46 },
        { time: '2019-04-18', value: 50.55 },
        { time: '2019-04-19', value: 34.85 }
      ]
    }
  ]
};

const twoPriceScales = {
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
      ],
      seriesOptions: {
        priceScaleId: 'left'
      }
    },
    {
      symbol: 'AAPL2',
      type: 'area',
      data: [
        { time: '2018-12-22', value: 42.51 },
        { time: '2018-12-23', value: 51.11 },
        { time: '2018-12-24', value: 67.02 },
        { time: '2018-12-25', value: 17.32 },
        { time: '2018-12-26', value: 45.17 },
        { time: '2018-12-27', value: 38.89 },
        { time: '2018-12-28', value: 75.46 },
        { time: '2018-12-29', value: 13.92 },
        { time: '2018-12-30', value: 9.68 },
        { time: '2018-12-31', value: 11.67 }
      ],
      seriesOptions: {
        priceScaleId: 'right'
      }
    }
  ],
  options: {
    leftPriceScale: {
      visible: true
    },
    rightPriceScale: {
      visible: true
    }
  }
};

let customLegendAreaChart = {
  series: [
    {
      symbol: 'AAPL',
      legendPriceFormatter: (price) => '$' + price.toFixed(3),
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

let customLegendCandlestickChart = {
  series: [
    {
      symbol: 'EUR/USD',
      type: 'candlestick',
      legendPriceFormatter: (price) => '$' + price.toFixed(3),
      data: [
        { time: '2018-12-19', open: 141.77, high: 170.39, low: 120.25, close: 145.72 },
        { time: '2018-12-20', open: 145.72, high: 147.99, low: 100.11, close: 108.19 },
        { time: '2018-12-21', open: 108.19, high: 118.43, low: 74.22, close: 75.16 },
        { time: '2018-12-22', open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
        { time: '2018-12-23', open: 45.12, high: 53.9, low: 45.12, close: 48.09 },
        { time: '2018-12-24', open: 60.71, high: 60.71, low: 53.39, close: 59.29 },
        { time: '2018-12-25', open: 68.26, high: 68.26, low: 59.04, close: 60.5 },
        { time: '2018-12-26', open: 67.71, high: 105.85, low: 66.67, close: 91.04 },
        { time: '2018-12-27', open: 91.04, high: 121.4, low: 82.7, close: 111.4 },
        { time: '2018-12-28', open: 111.51, high: 142.83, low: 103.34, close: 131.25 },
        { time: '2018-12-29', open: 131.33, high: 151.17, low: 77.68, close: 96.43 },
        { time: '2018-12-30', open: 106.33, high: 110.2, low: 90.39, close: 98.1 },
        { time: '2018-12-31', open: 109.87, high: 114.69, low: 85.66, close: 111.26 }
      ]
    }
  ]
};

export {
  line,
  linePositionLeft,
  noData,
  multiLine,
  area,
  bar,
  candlestick,
  volume,
  multiSeries,
  twoPriceScales,
  customLegendAreaChart,
  customLegendCandlestickChart
};
