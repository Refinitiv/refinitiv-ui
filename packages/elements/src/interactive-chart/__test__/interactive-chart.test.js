import { fixture, fixtureSync, expect, elementUpdated, oneEvent, nextFrame, aTimeout } from '@refinitiv-ui/test-helpers';

// import element and theme
import { InteractiveChart } from '@refinitiv-ui/elements/interactive-chart';
import '@refinitiv-ui/elemental-theme/light/ef-interactive-chart.js';
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
    }, {
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
        { time: '2018-12-23', open: 45.12, high: 53.90, low: 45.12, close: 48.09 },
        { time: '2018-12-24', open: 60.71, high: 60.71, low: 53.39, close: 59.29 },
        { time: '2018-12-25', open: 68.26, high: 68.26, low: 59.04, close: 60.50 },
        { time: '2018-12-26', open: 67.71, high: 105.85, low: 66.67, close: 91.04 },
        { time: '2018-12-27', open: 91.04, high: 121.40, low: 82.70, close: 111.40 },
        { time: '2018-12-28', open: 111.51, high: 142.83, low: 103.34, close: 131.25 },
        { time: '2018-12-29', open: 131.33, high: 151.17, low: 77.68, close: 96.43 },
        { time: '2018-12-30', open: 106.33, high: 110.20, low: 90.39, close: 98.10 },
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
        { time: '2018-12-23', open: 45.12, high: 53.90, low: 45.12, close: 48.09 },
        { time: '2018-12-24', open: 60.71, high: 60.71, low: 53.39, close: 59.29 },
        { time: '2018-12-25', open: 68.26, high: 68.26, low: 59.04, close: 60.50 },
        { time: '2018-12-26', open: 67.71, high: 105.85, low: 66.67, close: 91.04 },
        { time: '2018-12-27', open: 91.04, high: 121.40, low: 82.70, close: 111.40 },
        { time: '2018-12-28', open: 111.51, high: 142.83, low: 103.34, close: 131.25 },
        { time: '2018-12-29', open: 131.33, high: 151.17, low: 77.68, close: 96.43 },
        { time: '2018-12-30', open: 106.33, high: 110.20, low: 90.39, close: 98.10 },
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
        { time: '2018-12-29', value: 51.60 },
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
        { time: '2019-04-19', value: 34.85 },
        { time: '2019-04-19', value: 60.85 }
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
  series: [{
    symbol: 'AAPL',
    legendPriceFormatter: price => '$' + price.toFixed(3),
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
  }]
};

let customLegendCandlestickChart = {
  series: [{
    symbol: 'EUR/USD',
    type: 'candlestick',
    legendPriceFormatter: price => '$' + price.toFixed(3),
    data: [
      { time: '2018-12-19', open: 141.77, high: 170.39, low: 120.25, close: 145.72 },
      { time: '2018-12-20', open: 145.72, high: 147.99, low: 100.11, close: 108.19 },
      { time: '2018-12-21', open: 108.19, high: 118.43, low: 74.22, close: 75.16 },
      { time: '2018-12-22', open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
      { time: '2018-12-23', open: 45.12, high: 53.90, low: 45.12, close: 48.09 },
      { time: '2018-12-24', open: 60.71, high: 60.71, low: 53.39, close: 59.29 },
      { time: '2018-12-25', open: 68.26, high: 68.26, low: 59.04, close: 60.50 },
      { time: '2018-12-26', open: 67.71, high: 105.85, low: 66.67, close: 91.04 },
      { time: '2018-12-27', open: 91.04, high: 121.40, low: 82.70, close: 111.40 },
      { time: '2018-12-28', open: 111.51, high: 142.83, low: 103.34, close: 131.25 },
      { time: '2018-12-29', open: 131.33, high: 151.17, low: 77.68, close: 96.43 },
      { time: '2018-12-30', open: 106.33, high: 110.20, low: 90.39, close: 98.10 },
      { time: '2018-12-31', open: 109.87, high: 114.69, low: 85.66, close: 111.26 }
    ]
  }]
};

describe('interactive-chart/InteractiveChart', () => {
  const generateData = function (total, start, init) {
    let initVal = init || 20;
    let startDate = start || new Date();
    let ret = [];
    total = total < 0 ? 10 : total;
    for (let i = 0; i < total; i++) {
      const volatility = (Math.random() * (4.5) - 2) / 100; // random % volatility
      const date = start || new Date(startDate.setDate(startDate.getDate() + 1));
      const val = initVal + initVal * volatility;
      initVal = val;
      const point = {
        time: date.getTime() / 1000.0,
        value: val.toFixed(2)
      };
      ret.push(point);
    }
    return ret;
  };

  const generateDataOHLC = function (total, start, init) {
    let initVal = init || 20;
    total = total < 0 ? 10 : total;
    let startDate = start || new Date();
    let ret = [];
    for (let i = 0; i < total; i++) {
      const volatility = (Math.random() * (4.5) - 2) / 100; // random % volatility
      const date = start || new Date(startDate.setDate(startDate.getDate() + 1));
      const openVal = initVal + initVal * volatility;
      const closeVal = openVal + (openVal * volatility * 2);
      const highVal = openVal > closeVal ? openVal + 0.1 : closeVal + 0.5;
      const lowVal = openVal < closeVal ? openVal - 0.5 : closeVal - 0.2;
      initVal = closeVal;
      const point = {
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

  let el;
  beforeEach(async () => {
    el = await fixtureSync('<ef-interactive-chart></ef-interactive-chart>');
  });

  describe('Functional', () => {
    it('convertColorToString should be {} if giving wrong params', async () => {
      const result = el.convertColorToString(null, null);
      expect(Object.keys(result)).to.lengthOf(0);
    });

    it('cssVarAsNumber should be undefined if giving wrong css attr name', () => {
      const result = el.cssVarAsNumber('--wrong-name', '');
      expect(result).to.be.undefined;
    });
  });

  describe('Default', async () => {

    it('DOM structure is correct', async () => {
      expect(el).shadowDom.to.equalSnapshot();
    });


    it('config is null', async () => {
      el.config = null;
      await nextFrame();
      await elementUpdated();

      expect(el.config).to.be.null;
      expect(el.internalConfig.series).to.lengthOf(0);
      expect(el.seriesList).to.lengthOf(0);
    });

    it('series not contain data', async () => {
      el.config = {
        series: [
          {
            type: 'line'
          }
        ]
      };
      await nextFrame();
      await elementUpdated();

      expect(el.internalConfig.series).to.lengthOf(1);
      expect(el.seriesList).to.lengthOf(1);
      expect(el.seriesList[0].data).to.be.undefined;
    });

    it('Should support line chart', async () => {
      el.config = line;
      await nextFrame();
      await elementUpdated();
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.seriesList.length).to.satisfy((length) => length > 0);
    });

    it('Should support multi line chart', async () => {
      el.config = multiLine;
      await nextFrame();
      await elementUpdated();
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.seriesList.length).to.equal(multiLine.series.length);
    });

    it('Should support transparent color in line chart', async () => {
      let newConfigData = line;
      newConfigData.series[0].seriesOptions = {
        color: 'transparent'
      };
      el.config = newConfigData;
      await nextFrame();
      await elementUpdated();
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.seriesList.length).to.equal(newConfigData.series.length);
    });

    it('Should support area chart', async () => {
      el.config = area;
      await nextFrame();
      await elementUpdated();
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.seriesList.length).to.satisfy((length) => length > 0);
    });

    it('Should support transparent color in area chart ', async () => {
      let newConfigData = area;
      newConfigData.series[0].seriesOptions = {
        lineColor: 'transparent',
        topColor: 'transparent',
        bottomColor: 'transparent'
      };
      el.config = newConfigData;
      await nextFrame();
      await elementUpdated();
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.seriesList.length).to.equal(newConfigData.series.length);
    });

    it('Should support candlestick chart', async () => {
      el.config = candlestick;
      await nextFrame();
      await elementUpdated();
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.seriesList.length).to.satisfy((length) => length > 0);
    });

    it('Should support transparent color in candlestick chart', async () => {
      let newConfigData = candlestick;
      newConfigData.series[0].seriesOptions = {
        upColor: 'transparent',
        downColor: 'transparent',
        borderUpColor: 'transparent',
        borderDownColor: 'transparent',
        wickUpColor: 'transparent',
        wickDownColor: 'transparent'
      };
      el.config = newConfigData;
      await nextFrame();
      await elementUpdated();
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.seriesList.length).to.equal(newConfigData.series.length);
    });

    it('Should support bar chart', async () => {
      el.config = bar;
      await nextFrame();
      await elementUpdated();
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.seriesList.length).to.satisfy((length) => length > 0);
    });

    it('Should support transparent color in bar chart ', async () => {
      let newConfigData = bar;
      newConfigData.series[0].seriesOptions = {
        upColor: 'transparent',
        downColor: 'transparent'
      };
      el.config = newConfigData;
      await nextFrame();
      await elementUpdated();
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.seriesList.length).to.equal(newConfigData.series.length);
    });

    it('Should support volume chart', async () => {
      el.config = volume;
      // when having config type volume, then chart type in lightweight-charts have been a histogram.
      await nextFrame();
      await elementUpdated();
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.seriesList.length).to.satisfy((length) => length > 0);
    });

    it('Should support transparent color in volume chart ', async () => {
      let newConfigData = volume;
      newConfigData.series[0].seriesOptions = {
        color: 'transparent'
      };
      el.config = newConfigData;
      await nextFrame();
      await elementUpdated();
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.seriesList.length).to.satisfy((length) => length > 0);
    });

    it('Should support multi series chart', async () => {
      el.config = multiSeries;
      await nextFrame();
      await elementUpdated();
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.seriesList.length).to.equal(multiSeries.series.length);
    });

    it('Should support no data series chart', async () => {
      el.config = noData;
      await nextFrame();
      await elementUpdated();
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.seriesList.length).to.equal(noData.series.length);
    });

  });

  describe('Features', () => {

    it('When pass new data after chart create', async () => {
      el.config = multiSeries;
      await nextFrame();
      await elementUpdated();
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.seriesList.length).to.equal(multiSeries.series.length);

      el.config = line;
      await nextFrame();
      await elementUpdated();
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.seriesList.length).to.satisfy((length) => length > 0);

    });

    it('When pass new data after chart create', async () => {

      el.config = linePositionLeft;
      await nextFrame();
      await elementUpdated();
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;

    });

    it('When show disabled legend in chart', async () => {
      el.config = line;
      await nextFrame();
      await elementUpdated();
      el.disabledLegend = true;
      await nextFrame();
      await elementUpdated();
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.legendInitialized).to.false;
      expect(el.shadowRoot.querySelector('[part=legend]').textContent).to.be.empty;

    });

    it('When hide legend in chart series', async () => {
      const config = line;
      config.series[0].legendVisible = false;
      el.config = config;
      await nextFrame();
      await elementUpdated();
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.shadowRoot.querySelector('[part=legend]').textContent).to.be.empty;
    });

    it('When hide some legend in chart series', async () => {
      const config = multiLine;
      config.series[0].legendVisible = false;
      el.config = config;
      await nextFrame();
      await elementUpdated();
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.shadowRoot.querySelectorAll('[part=legend] > .row:not(:empty)').length).to.equal(multiLine.series.length - 1);
    });

    it('Legend is not horizontal by default', async () => {
      el.config = line;
      await nextFrame();
      await elementUpdated();
      expect(el.chart).to.not.be.null;
      expect(el.shadowRoot.querySelector('[part=legend]').className).to.not.include('horizontal');

    });

    it('Legend should have horizontal style class when set legend-style="horizontal" via attribute', async () => {
      el = await fixture('<ef-interactive-chart legend-style="horizontal"></ef-interactive-chart>');
      el.config = line;
      await elementUpdated();
      await nextFrame();

      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.shadowRoot.querySelector('[part=legend]').className).to.include('horizontal');
    });
    it('Legend should not have horizontal style class when set legend-style="vertical" via attribute', async () => {
      el = await fixture('<ef-interactive-chart legend-style="vertical"></ef-interactive-chart>');
      el.config = line;
      await elementUpdated();
      await nextFrame();

      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.shadowRoot.querySelector('[part=legend]').className).to.not.include('horizontal');
    });

    it('LegendStyle should able to switch between horizontal and vertical', async () => {
      el.config = line;
      await nextFrame();
      await elementUpdated();

      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;

      el.legendStyle = 'horizontal';
      await nextFrame();
      await elementUpdated();
      expect(el.shadowRoot.querySelector('[part=legend]').className).to.include('horizontal');

      el.legendStyle = 'vertical';
      await nextFrame();
      await elementUpdated();

      expect(el.shadowRoot.querySelector('[part=legend]').className).to.not.include('horizontal');
    });

    it('When toggle jump button in chart', async () => {
      el.config = line;
      await nextFrame();
      await elementUpdated();
      el.disabledJumpButton = true;
      // enable jum button
      // dragging chart to show jump button
      el.timeScale.scrollToPosition(-10);
      await nextFrame();
      await elementUpdated();

      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.jumpButtonInitialized).to.false;
      expect(el.jumpButtonContainer.style.display).to.equal('none');
    });


    it('When click jump button in chart', async () => {

      el.config = linePositionLeft;
      await nextFrame();
      await elementUpdated();
      el.timeScale.scrollToPosition(-10);

      // enable jum button and dragging chart to show jump button
      await nextFrame();
      await elementUpdated();


      expect(el.jumpButtonContainer.style.display).to.equal('block');

      setTimeout(() => el.jumpButtonContainer.dispatchEvent(new Event('tap')));
      await oneEvent(el.jumpButtonContainer, 'tap');
      await elementUpdated();
      await nextFrame();
      await aTimeout(500);

      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.jumpButtonContainer.style.display).to.equal('none');
    });

    it('When custom style chart', async () => {
      let custom = {
        series: line.series,
        options: {
          layout: {
            backgroundColor: '#e3e3e3'
          }
        }
      };
      el.config = custom;
      await nextFrame();
      await elementUpdated();
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.seriesList.length).to.satisfy((length) => length > 0);
      expect(el.config.options.layout.backgroundColor).to.equal(el.chart.options().layout.backgroundColor);
    });

    it('When pass data two price scales', async () => {

      el.config = twoPriceScales;
      await nextFrame();
      await elementUpdated();
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
    });

    it('When pass data timestamp', async () => {
      el.config = {
        series: [{
          type: 'volume',
          data: generateData(10)
        }]
      };
      await nextFrame();
      await elementUpdated();

      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
    });

    it('When pass data timestamp OHLC', async () => {
      el.config = {
        series: [{
          type: 'candlestick',
          data: generateDataOHLC(10)
        }]
      };
      await nextFrame();
      await elementUpdated();
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
    });
  });

  it('When custom legend formatter in area chart', async () => {
    el.config = customLegendAreaChart;
    await nextFrame();
    await elementUpdated();
    const legendText = el.shadowRoot.querySelector('[part=legend]').querySelector('.price').innerText;
    expect(el.chart).to.not.be.undefined;
    expect(el.chart).to.not.be.null;
    expect(legendText.indexOf('$')).to.equal(0);
  });

  it('When custom legend formatter in candlestick chart', async () => {
    el.config = customLegendCandlestickChart;
    await nextFrame();
    await elementUpdated();
    const legendText = el.shadowRoot.querySelector('[part=legend]').querySelectorAll('.price');
    expect(el.chart).to.not.be.undefined;
    expect(el.chart).to.not.be.null;
    expect(legendText[0].innerText.indexOf('$')).to.equal(0); // open
    expect(legendText[1].innerText.indexOf('$')).to.equal(0); // high
    expect(legendText[2].innerText.indexOf('$')).to.equal(0); // low
    expect(legendText[3].innerText.indexOf('$')).to.equal(0); // close
  });

  it('Should has dynamic left position in legend when the chart set y axis at left', async () => {
    el.config = linePositionLeft;
    await elementUpdated();
    await nextFrame();

    expect(el.chart).to.not.be.undefined;
    expect(el.chart).to.not.be.null;
    const legendStyle = getComputedStyle(el.shadowRoot.querySelector('[part=legend]'));
    const legendLeftPosition = Number(legendStyle.left.substring(0,legendStyle.left.indexOf('px')))
    expect(legendStyle.position).to.equal('absolute');
    expect(legendLeftPosition).to.greaterThan(InteractiveChart.DEFAULT_LEGEND_LEFT_POSITION);
  });

  it('Should has dynamic left position in legend when the chart set y axis at both edge', async () => {
    el.config = twoPriceScales;
    await elementUpdated();
    await nextFrame();

    expect(el.chart).to.not.be.undefined;
    expect(el.chart).to.not.be.null;
    const legendStyle = getComputedStyle(el.shadowRoot.querySelector('[part=legend]'))
    const legendLeftPosition = Number(legendStyle.left.substring(0,legendStyle.left.indexOf('px')))
    expect(legendStyle.position).to.equal('absolute');
    expect(legendLeftPosition).to.greaterThan(InteractiveChart.DEFAULT_LEGEND_LEFT_POSITION);
  });

  it('Should has fixed left position in legend when the chart set y axis at right edge', async () => {
    el.config = line;
    await elementUpdated();
    await nextFrame();

    expect(el.chart).to.not.be.undefined;
    expect(el.chart).to.not.be.null;
    const legendStyle = getComputedStyle(el.shadowRoot.querySelector('[part=legend]'))
    const legendLeftPosition = Number(legendStyle.left.substring(0,legendStyle.left.indexOf('px')))
    expect(legendStyle.position).to.equal('absolute');
    expect(legendLeftPosition).to.equal(InteractiveChart.DEFAULT_LEGEND_LEFT_POSITION);
  });

  describe('Test deprecated attribute', () => {
    it('Switch attribute legendstyle horizontal to vertical, it should display vertical style', async () => {
      el = await fixture('<ef-interactive-chart legendstyle="horizontal"></ef-interactive-chart>');
  
      el.config = line;
      await elementUpdated();
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      
      el.setAttribute('legendstyle','vertical');
      
      await nextFrame();
      await elementUpdated();
      expect(el.getAttribute('legend-style')).to.null;
      expect(el.shadowRoot.querySelector('[part=legend]').className).to.not.include('horizontal');
    });
    it('Set legend-style to vertical when legendstyle horizontal, it should display vertical style', async () => {
      el = await fixture('<ef-interactive-chart legendstyle="horizontal"></ef-interactive-chart>');
  
      el.config = line;
      await elementUpdated();
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.getAttribute('legendstyle')).to.equal('horizontal');
      
      el.setAttribute('legend-style','vertical');
      
      await nextFrame();
      await elementUpdated();
      expect(el.shadowRoot.querySelector('[part=legend]').className).to.not.include('horizontal');
    });
  });
});
