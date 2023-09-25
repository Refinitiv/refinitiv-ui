// import element and theme
import { InteractiveChart } from '@refinitiv-ui/elements/interactive-chart';

import '@refinitiv-ui/elemental-theme/light/ef-interactive-chart.js';
import {
  aTimeout,
  elementUpdated,
  expect,
  fixture,
  fixtureSync,
  nextFrame,
  oneEvent
} from '@refinitiv-ui/test-helpers';
import { isMobile, isSafari } from '@refinitiv-ui/utils';

import * as mockConfig from './mock-config.js';

describe('interactive-chart/InteractiveChart', function () {
  const generateData = function (total, start, init) {
    let initVal = init || 20;
    let startDate = start || new Date();
    let ret = [];
    total = total < 0 ? 10 : total;
    for (let i = 0; i < total; i++) {
      const volatility = (Math.random() * 4.5 - 2) / 100; // random % volatility
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
      const volatility = (Math.random() * 4.5 - 2) / 100; // random % volatility
      const date = start || new Date(startDate.setDate(startDate.getDate() + 1));
      const openVal = initVal + initVal * volatility;
      const closeVal = openVal + openVal * volatility * 2;
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
  beforeEach(async function () {
    if (isMobile && isSafari()) {
      this.skip(); // Seem like we got the problem about the memory exceed in iOS, so we need to skip it for now
    }
    el = await fixtureSync('<ef-interactive-chart></ef-interactive-chart>');
  });

  describe('Functional', function () {
    it('convertColorToString should be {} if giving wrong params', function () {
      const result = el.convertColorToString(null, null);
      expect(Object.keys(result)).to.lengthOf(0);
    });

    it('cssVarAsNumber should be undefined if giving wrong css attr name', function () {
      const result = el.cssVarAsNumber('--wrong-name', '');
      expect(result).to.be.undefined;
    });
  });

  describe('Default', function () {
    it('DOM structure is correct', async function () {
      await expect(el).shadowDom.to.equalSnapshot();
    });

    it('config is null', async function () {
      el.config = null;
      await elementUpdated(el);
      await nextFrame(2);

      expect(el.config).to.be.null;
      expect(el.internalConfig.series).to.lengthOf(0);
      expect(el.seriesList).to.lengthOf(0);
    });

    it('series not contain data', async function () {
      el.config = {
        series: [
          {
            type: 'line'
          }
        ]
      };
      await elementUpdated(el);
      await nextFrame(2);

      expect(el.internalConfig.series).to.lengthOf(1);
      expect(el.seriesList).to.lengthOf(1);
      expect(el.seriesList[0].data).to.be.undefined;
    });

    it('Should support line chart', async function () {
      el.config = mockConfig.line;
      await elementUpdated(el);
      await nextFrame(2);
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.seriesList.length).to.satisfy((length) => length > 0);
    });

    it('Should support multi line chart', async function () {
      el.config = mockConfig.multiLine;
      await elementUpdated(el);
      await nextFrame(2);
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.seriesList.length).to.equal(mockConfig.multiLine.series.length);
    });

    it('Should support transparent color in line chart', async function () {
      let newConfigData = mockConfig.line;
      newConfigData.series[0].seriesOptions = {
        color: 'transparent'
      };
      el.config = newConfigData;
      await elementUpdated(el);
      await nextFrame(2);
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.seriesList.length).to.equal(newConfigData.series.length);
    });

    it('Should support area chart', async function () {
      el.config = mockConfig.area;
      await elementUpdated(el);
      await nextFrame(2);
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.seriesList.length).to.satisfy((length) => length > 0);
    });

    it('Should support transparent color in area chart ', async function () {
      let newConfigData = mockConfig.area;
      newConfigData.series[0].seriesOptions = {
        lineColor: 'transparent',
        topColor: 'transparent',
        bottomColor: 'transparent'
      };
      el.config = newConfigData;
      await elementUpdated(el);
      await nextFrame(2);
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.seriesList.length).to.equal(newConfigData.series.length);
    });

    it('Should support candlestick chart', async function () {
      el.config = mockConfig.candlestick;
      await elementUpdated(el);
      await nextFrame(2);
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.seriesList.length).to.satisfy((length) => length > 0);
    });

    it('Should support transparent color in candlestick chart', async function () {
      let newConfigData = mockConfig.candlestick;
      newConfigData.series[0].seriesOptions = {
        upColor: 'transparent',
        downColor: 'transparent',
        borderUpColor: 'transparent',
        borderDownColor: 'transparent',
        wickUpColor: 'transparent',
        wickDownColor: 'transparent'
      };
      el.config = newConfigData;
      await elementUpdated(el);
      await nextFrame(2);
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.seriesList.length).to.equal(newConfigData.series.length);
    });

    it('Should support bar chart', async function () {
      el.config = mockConfig.bar;
      await elementUpdated(el);
      await nextFrame(2);
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.seriesList.length).to.satisfy((length) => length > 0);
    });

    it('Should support transparent color in bar chart ', async function () {
      let newConfigData = mockConfig.bar;
      newConfigData.series[0].seriesOptions = {
        upColor: 'transparent',
        downColor: 'transparent'
      };
      el.config = newConfigData;
      await elementUpdated(el);
      await nextFrame(2);
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.seriesList.length).to.equal(newConfigData.series.length);
    });

    it('Should support volume chart', async function () {
      el.config = mockConfig.volume;
      // when having config type volume, then chart type in lightweight-charts have been a histogram.
      await elementUpdated(el);
      await nextFrame(2);
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.seriesList.length).to.satisfy((length) => length > 0);
    });

    it('Should support transparent color in volume chart ', async function () {
      let newConfigData = mockConfig.volume;
      newConfigData.series[0].seriesOptions = {
        color: 'transparent'
      };
      el.config = newConfigData;
      await elementUpdated(el);
      await nextFrame(2);
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.seriesList.length).to.satisfy((length) => length > 0);
    });

    it('Should support multi series chart', async function () {
      el.config = mockConfig.multiSeries;
      await elementUpdated(el);
      await nextFrame(2);
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.seriesList.length).to.equal(mockConfig.multiSeries.series.length);
    });

    it('Should support no data series chart', async function () {
      el.config = mockConfig.noData;
      await elementUpdated(el);
      await nextFrame(2);
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.seriesList.length).to.equal(mockConfig.noData.series.length);
    });
  });

  describe('Features', function () {
    it('When pass new data after chart create', async function () {
      el.config = mockConfig.linePositionLeft;
      await elementUpdated(el);
      await nextFrame(2);
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
    });

    it('When replace existing data after chart create', async function () {
      el.config = mockConfig.multiSeries;
      await elementUpdated(el);
      await nextFrame(2);
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.seriesList.length).to.equal(mockConfig.multiSeries.series.length);

      el.config = mockConfig.line;
      await elementUpdated(el);
      await nextFrame(2);
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.seriesList.length).to.satisfy((length) => length > 0);
    });

    it('When show disabled legend in chart', async function () {
      el.config = mockConfig.line;
      await elementUpdated(el);
      await nextFrame(2);
      el.disabledLegend = true;
      await elementUpdated(el);
      await nextFrame(2);
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.legendInitialized).to.false;
      expect(el.shadowRoot.querySelector('[part=legend]').textContent).to.be.empty;
    });

    it('When hide legend in chart series', async function () {
      const config = mockConfig.line;
      config.series[0].legendVisible = false;
      el.config = config;
      await elementUpdated(el);
      await nextFrame(2);
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.shadowRoot.querySelector('[part=legend]').textContent).to.be.empty;
    });

    it('When hide some legend in chart series', async function () {
      const config = mockConfig.multiLine;
      config.series[0].legendVisible = false;
      el.config = config;
      await elementUpdated(el);
      await nextFrame(2);
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.shadowRoot.querySelectorAll('[part=legend] > .row:not(:empty)').length).to.equal(
        mockConfig.multiLine.series.length - 1
      );
    });

    it('Legend is not horizontal by default', async function () {
      el.config = mockConfig.line;
      await elementUpdated(el);
      await nextFrame(2);

      expect(el.chart).to.not.be.null;
      expect(el.shadowRoot.querySelector('[part=legend]').className).to.not.include('horizontal');
    });

    it('Legend should have horizontal style class when set legend-style="horizontal" via attribute', async function () {
      el = await fixture('<ef-interactive-chart legend-style="horizontal"></ef-interactive-chart>');
      el.config = mockConfig.line;
      await elementUpdated(el);
      await nextFrame(2);
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.shadowRoot.querySelector('[part=legend]').className).to.include('horizontal');
    });

    it('Legend should not have horizontal style class when set legend-style="vertical" via attribute', async function () {
      el = await fixture('<ef-interactive-chart legend-style="vertical"></ef-interactive-chart>');
      el.config = mockConfig.line;
      await elementUpdated(el);
      await nextFrame(2);

      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.shadowRoot.querySelector('[part=legend]').className).to.not.include('horizontal');
    });

    it('LegendStyle should able to switch between horizontal and vertical', async function () {
      el.config = mockConfig.line;
      await elementUpdated(el);
      await nextFrame(2);

      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;

      el.legendStyle = 'horizontal';
      await elementUpdated(el);
      await nextFrame(2);
      expect(el.shadowRoot.querySelector('[part=legend]').className).to.include('horizontal');

      el.legendStyle = 'vertical';
      await elementUpdated(el);
      await nextFrame(2);

      expect(el.shadowRoot.querySelector('[part=legend]').className).to.not.include('horizontal');
    });

    it('When toggle jump button in chart', async function () {
      el.config = mockConfig.line;
      await elementUpdated(el);
      await nextFrame(2);
      el.disabledJumpButton = true;
      // enable jum button
      // dragging chart to show jump button
      el.timeScale.scrollToPosition(-10);
      await elementUpdated(el);
      await nextFrame(2);

      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.jumpButtonInitialized).to.false;
      expect(el.jumpButtonContainer.style.display).to.equal('none');
    });

    it('When click jump button in chart', async function () {
      el.config = mockConfig.linePositionLeft;
      await elementUpdated(el);
      await nextFrame(2);
      el.timeScale.scrollToPosition(-10);

      // enable jum button and dragging chart to show jump button
      await elementUpdated(el);
      await nextFrame(2);

      expect(el.jumpButtonContainer.style.display).to.equal('block');

      setTimeout(() => el.jumpButtonContainer.dispatchEvent(new Event('tap')));
      await oneEvent(el.jumpButtonContainer, 'tap');
      await elementUpdated(el);
      await nextFrame(2);
      await aTimeout(500);

      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.jumpButtonContainer.style.display).to.equal('none');
    });

    it('When custom style chart', async function () {
      let custom = {
        series: mockConfig.line.series,
        options: {
          layout: {
            backgroundColor: '#e3e3e3'
          }
        }
      };
      el.config = custom;
      await elementUpdated(el);
      await nextFrame(2);
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(el.seriesList.length).to.satisfy((length) => length > 0);
      expect(el.config.options.layout.backgroundColor).to.equal(el.chart.options().layout.backgroundColor);
    });

    it('When pass data two price scales', async function () {
      el.config = mockConfig.twoPriceScales;
      await elementUpdated(el);
      await nextFrame(2);
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
    });

    it('When pass data timestamp', async function () {
      el.config = {
        series: [
          {
            type: 'volume',
            data: generateData(10)
          }
        ]
      };
      await elementUpdated(el);
      await nextFrame(2);

      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
    });

    it('When pass data timestamp OHLC', async function () {
      el.config = {
        series: [
          {
            type: 'candlestick',
            data: generateDataOHLC(10)
          }
        ]
      };
      await elementUpdated(el);
      await nextFrame(2);
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
    });

    it('When custom legend formatter in area chart', async function () {
      el.config = mockConfig.customLegendAreaChart;
      await elementUpdated(el);
      await nextFrame(2);
      const legendText = el.shadowRoot.querySelector('[part=legend]').querySelector('.price').innerText;
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(legendText.indexOf('$')).to.equal(0);
    });

    it('When custom legend formatter in candlestick chart', async function () {
      el.config = mockConfig.customLegendCandlestickChart;
      await elementUpdated(el);
      await nextFrame(2);
      const legendText = el.shadowRoot.querySelector('[part=legend]').querySelectorAll('.price');
      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;
      expect(legendText[0].innerText.indexOf('$')).to.equal(0); // open
      expect(legendText[1].innerText.indexOf('$')).to.equal(0); // high
      expect(legendText[2].innerText.indexOf('$')).to.equal(0); // low
      expect(legendText[3].innerText.indexOf('$')).to.equal(0); // close
    });

    it('Should has dynamic left position in legend when the chart set y axis at left', async function () {
      el.config = mockConfig.linePositionLeft;
      await elementUpdated(el);
      await nextFrame(3); // wait for resize observer & rendering completion

      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;

      await nextFrame();
      const legendStyle = getComputedStyle(el.shadowRoot.querySelector('[part=legend]'));
      const legendLeftPosition = Number(legendStyle.left.substring(0, legendStyle.left.indexOf('px')));
      expect(legendStyle.position).to.equal('absolute');
      expect(legendLeftPosition).to.greaterThan(InteractiveChart.DEFAULT_LEGEND_LEFT_POSITION);
    });

    it('Should has dynamic left position in legend when the chart set y axis at both edge', async function () {
      el.config = mockConfig.twoPriceScales;
      await elementUpdated(el);
      await nextFrame(3); // wait for resize observer & rendering completion

      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;

      await nextFrame();
      const legendStyle = getComputedStyle(el.shadowRoot.querySelector('[part=legend]'));
      const legendLeftPosition = Number(legendStyle.left.substring(0, legendStyle.left.indexOf('px')));
      expect(legendStyle.position).to.equal('absolute');
      expect(legendLeftPosition).to.greaterThan(InteractiveChart.DEFAULT_LEGEND_LEFT_POSITION);
    });

    it('Should has fixed left position in legend when the chart set y axis at right edge', async function () {
      el.config = mockConfig.line;
      await elementUpdated(el);
      await nextFrame(3); // wait for resize observer & rendering completion

      expect(el.chart).to.not.be.undefined;
      expect(el.chart).to.not.be.null;

      await nextFrame();
      const legendStyle = getComputedStyle(el.shadowRoot.querySelector('[part=legend]'));
      const legendLeftPosition = Number(legendStyle.left.substring(0, legendStyle.left.indexOf('px')));
      expect(legendStyle.position).to.equal('absolute');
      expect(legendLeftPosition).to.equal(InteractiveChart.DEFAULT_LEGEND_LEFT_POSITION);
    });

    it('Should render new Legend when add new seriesList.', async function () {
      const data = [
        {
          time: 1678147200,
          open: 5679,
          high: 5694,
          low: 5544,
          close: 5547,
          value: 5547
        }
      ];
      el.config = {
        series: [
          {
            symbol: 'Price',
            type: 'candlestick'
          }
        ]
      };
      await elementUpdated(el);
      await nextFrame(3); // wait for resize observer & rendering completion
      expect(el.hasDataPoint).to.be.false;

      el.seriesList[0].setData(data);
      el.config.series[0].data = data;
      await elementUpdated(el);
      await nextFrame(3); // wait for resize observer & rendering completion
      const legendText = el.rowLegend[0].textContent;
      const { open, high, low, close } = data[0];
      const isIncludedPrices = [open, high, low, close].every((price) => legendText.includes(price));
      expect(el.hasDataPoint).to.be.true;
      expect(isIncludedPrices).to.be.true;
    });
  });
});
