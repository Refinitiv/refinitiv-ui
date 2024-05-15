// import element and theme
import '@refinitiv-ui/elements/chart';

import '@refinitiv-ui/elemental-theme/light/ef-chart.js';
import { elementUpdated, expect, fixture, nextFrame } from '@refinitiv-ui/test-helpers';
import { color as parseColor } from '@refinitiv-ui/utils/color.js';

import createMockConfig from './mock-config.js';

const isOpacity = (color) => {
  if (Array.isArray(color)) {
    return color.every((i) => parseColor(i).opacity < 1);
  }
  return parseColor(color).opacity < 1;
};

describe('chart/Chart', function () {
  let el;
  let config;

  const chartRendered = async (el) => {
    await elementUpdated(el);
    await nextFrame(); // chart render on animation frame
  };

  describe('Check chart types', function () {
    beforeEach(async function () {
      el = await fixture('<ef-chart></ef-chart>');
      config = createMockConfig();
    });

    it('DOM structure is correct', async function () {
      await chartRendered(el);
      await expect(el).shadowDom.to.equalSnapshot({
        ignoreAttributes: ['width', 'height', 'style']
      });
    });

    it('DOM structure of chart with config is correct', async function () {
      el.config = config.line;
      await chartRendered(el);
      await expect(el).shadowDom.to.equalSnapshot({
        ignoreAttributes: ['width', 'height', 'style']
      });
    });

    it('Should support line chart', async function () {
      el.config = config.line;
      await chartRendered(el);
      expect(el.chart).to.not.be.null;
      expect(el.chart.canvas).to.not.be.null;
    });

    it('Should support multiple lines chart', async function () {
      el.config = config.multilines;
      await chartRendered(el);
      expect(el.chart).to.not.be.undefined;
      expect(el.chart.canvas).to.not.be.null;
    });

    it('Should support bar chart', async function () {
      el.config = config.bar;
      await chartRendered(el);
      expect(el.chart).to.not.be.undefined;
      expect(el.chart.canvas).to.not.be.null;
    });

    it('Should support single data set bar', async function () {
      el.config = config.singlesetbar;
      await chartRendered(el);
      expect(el.chart).to.not.be.undefined;
      expect(el.chart.canvas).to.not.be.null;
    });

    it('Should support bar stack chart', async function () {
      el.config = config.stackbar;
      await chartRendered(el);
      expect(el.chart).to.not.be.undefined;
      expect(el.chart.canvas).to.not.be.null;
    });

    it('Should support bar and line chart', async function () {
      el.config = config.combo;
      await chartRendered(el);
      expect(el.chart).to.not.be.undefined;
      expect(el.chart.canvas).to.not.be.null;
    });

    it('Should support pie chart', async function () {
      el.config = config.pie;
      await chartRendered(el);
      expect(el.chart).to.not.be.undefined;
      expect(el.chart.canvas).to.not.be.null;
    });

    it('Should support doughnut chart', async function () {
      el.config = config.doughnut;
      await chartRendered(el);
      expect(el.chart).to.not.be.undefined;
      expect(el.chart.canvas).to.not.be.null;
    });

    it('Should support time scale chart', async function () {
      el.config = config.timescale;
      await chartRendered(el);
      expect(el.chart).to.not.be.undefined;
      expect(el.chart.canvas).to.not.be.null;
    });

    it('Should support multiple lines with time scale chart', async function () {
      el.config = config.multilineTimescale;
      await chartRendered(el);
      expect(el.chart).to.not.be.undefined;
      expect(el.chart.canvas).to.not.be.null;
    });

    it('Should support scatter plot chart', async function () {
      el.config = config.scatter;
      await chartRendered(el);
      expect(el.chart).to.not.be.undefined;
      expect(el.chart.canvas).to.not.be.null;
    });

    it('Should support bubble chart', async function () {
      el.config = config.bubble;
      await chartRendered(el);
      expect(el.chart).to.not.be.undefined;
      expect(el.chart.canvas).to.not.be.null;
    });

    it('Should support radar chart', async function () {
      el.config = config.radar;
      await chartRendered(el);
      expect(el.chart).to.not.be.undefined;
      expect(el.chart.canvas).to.not.be.null;
    });

    it('Should support chart config from user use case 1', async function () {
      el.config = config.uc1;
      await chartRendered(el);
      expect(el.chart).to.not.be.undefined;
      expect(el.chart.canvas).to.not.be.null;
    });

    it('Should support chart config from user use case 2', async function () {
      el.config = config.uc2;
      await chartRendered(el);
      expect(el.chart).to.not.be.undefined;
      expect(el.chart.canvas).to.not.be.null;
    });
  });

  describe('Features', function () {
    let header;

    beforeEach(async function () {
      el = await fixture('<ef-chart style="width:500px;height:450px;"></ef-chart>');
      config = createMockConfig();
    });

    it('Should show correct title', async function () {
      el.config = config.line;
      await chartRendered(el);
      header = el.shadowRoot.querySelector('ef-header');
      expect(el.chartTitle).to.equal(config.line.options.plugins.title.text);
      expect(header.textContent).to.equal(config.line.options.plugins.title.text);

      let newTitle = 'New Title';
      el.config.options.plugins.title.text = newTitle;
      expect(el.chartTitle).to.equal(newTitle);
      el.updateChart();
      await chartRendered(el);
      header = el.shadowRoot.querySelector('ef-header');
      expect(header.textContent).to.equal(newTitle);
    });

    it('Should be able to hide title of title is empty string', async function () {
      el.config = config.line;
      header = el.shadowRoot.querySelector('ef-header');

      let newTitle = '';
      el.config.options.plugins.title.text = newTitle;
      expect(el.chartTitle).to.equal(newTitle);
      el.updateChart();
      await chartRendered(el);
      header = el.shadowRoot.querySelector('ef-header');
      expect(header).to.equal(null);
    });

    it('Should show correct chart when pass a new config', async function () {
      // check if the chart has been resized correctly after update the config
      // update the config property shouldn't need to call updateChart()
      let canvas;
      let height;
      let width;

      el.config = config.line;
      await chartRendered(el);

      canvas = el.shadowRoot.querySelector('canvas');
      height = canvas.offsetHeight;
      width = canvas.offsetWidth;
      el.config = config.radar;
      await chartRendered(el);

      canvas = el.shadowRoot.querySelector('canvas');
      expect(el.config.type).to.equal('radar');
      expect(canvas.offsetHeight).to.equal(height);
      expect(canvas.offsetWidth).to.equal(width);
    });

    it('Should not use solid fill for backgroundColor by default for line, bubble, radar, and polarArea', async function () {
      let arr = [config.line, config.bubble, config.radar, config.polarArea];
      let backgroundColor;
      let pointBorderColor;
      let pointBackgroundColor;

      for (let i = 0; i < arr.length; i++) {
        el.config = arr[i];
        await chartRendered(el);
        backgroundColor = el.config.data.datasets[0].backgroundColor;
        pointBorderColor = el.config.data.datasets[0].pointBorderColor;
        pointBackgroundColor = el.config.data.datasets[0].pointBackgroundColor;
        expect(pointBorderColor).to.equal(pointBackgroundColor);
        expect(pointBorderColor).to.not.equal(backgroundColor);
        expect(isOpacity(backgroundColor)).to.equal(true);
      }
    });

    it('Should not solid fill for backgroundColor by default for pie, bar, doughnut', async function () {
      let arr = [config.pie, config.bar, config.doughnut];
      let backgroundColor;

      for (let i = 0; i < arr.length; i++) {
        el.config = arr[i];
        await chartRendered(el);
        backgroundColor = el.config.data.datasets[0].backgroundColor;
        expect(isOpacity(backgroundColor)).to.equal(false);
      }
    });

    it('Should use color values if they are in chart config', async function () {
      let borderColor = '#aa0000';
      let backgroundColor = '#bb0000';
      let pointBorderColor = '#cc0000';
      let pointBackgroundColor = '#dd0000';

      config.line.data.datasets[0].borderColor = borderColor;
      config.line.data.datasets[0].backgroundColor = backgroundColor;
      config.line.data.datasets[0].pointBorderColor = pointBorderColor;
      config.line.data.datasets[0].pointBackgroundColor = pointBackgroundColor;

      el.config = config.line;
      await chartRendered(el);
      expect(el.config.data.datasets[0].borderColor).to.equal(borderColor);
      expect(el.config.data.datasets[0].backgroundColor).to.equal(backgroundColor);
      expect(el.config.data.datasets[0].pointBorderColor).to.equal(pointBorderColor);
      expect(el.config.data.datasets[0].pointBackgroundColor).to.equal(pointBackgroundColor);
    });

    it('Should set height and width correctly if there are specified in the style', function () {
      expect(window.getComputedStyle(el).getPropertyValue('width')).to.equal('500px');
      expect(window.getComputedStyle(el).getPropertyValue('height')).to.equal('450px');
    });

    it('Should set default height to be 60% of width of not specified the height', function () {
      el.style.height = '';
      el.style.width = '1000px';
      expect(window.getComputedStyle(el).getPropertyValue('height')).to.equal('600px');
    });

    it('Should have minimum height at 300px', function () {
      el.style.height = '';
      el.style.width = '100px';
      expect(window.getComputedStyle(el).getPropertyValue('height')).to.equal('300px');
    });

    it('Should have correct color when add new dataset', async function () {
      el.config = config.doughnut;
      await chartRendered(el);
      let dataSize = config.doughnut.data.datasets[0].data.length;
      let check = el.chart.data.datasets[0].backgroundColor.length === dataSize;
      check = check && el.chart.data.datasets[0].borderColor.length === dataSize;
      expect(check).to.equal(true, 'Number of colors and number of data should always be the same');

      // add another data
      el.chart.config.data.datasets[0].data.push(400);
      el.chart.config.data.labels.push('New Data');
      dataSize++;
      el.updateChart();

      await chartRendered(el);
      check = false;
      check = el.chart.data.datasets[0].backgroundColor.length === dataSize;
      check = check && el.chart.data.datasets[0].borderColor.length === dataSize;
      expect(check).to.equal(true, 'Number of colors and number of data should always be the same');
    });

    it('Should apply single color array to a single dataset bar chart', async function () {
      el.config = config.singlesetbar;
      await chartRendered(el);
      let datasets = el.config.data.datasets;
      expect(datasets, 'Chart should only have one dataset').to.have.lengthOf(1);
      expect(Array.isArray(datasets[0].backgroundColor)).to.equal(false);
    });

    it('Should render legend labels colors correctly', async function () {
      let arr = [
        config.line,
        config.multilines,
        config.bar,
        config.singlesetbar,
        config.stackbar,
        config.combo,
        config.pie,
        config.doughnut,
        config.timescale,
        config.multilineTimescale,
        config.scatter,
        config.bubble,
        config.radar,
        config.polarArea
      ];

      const backgroundColor = 'red';
      const borderColor = 'blue';
      let chartConfig;
      let labels;
      let datasets;
      let labelFillStyle;
      let labelstrokeStyle;

      for (let i = 0; i < arr.length; i++) {
        chartConfig = arr[i];
        datasets = chartConfig.data.datasets[0];
        datasets.backgroundColor = backgroundColor;
        datasets.borderColor = borderColor;
        el.config = chartConfig;
        await chartRendered(el);

        // Label colors depend on chart type or datasets type (e.g. combo chart datasets)
        if (['line', 'bubble', 'radar', 'polarArea'].indexOf(datasets.type || el.config.type) !== -1) {
          labelFillStyle = borderColor;
          labelstrokeStyle = borderColor;
        } else {
          labelFillStyle = backgroundColor;
          labelstrokeStyle = borderColor;
        }

        labels = el.config.options.plugins.legend.labels.generateLabels(el.chart);
        expect(labelFillStyle).to.equal(labels[0].fillStyle);
        expect(labelstrokeStyle).to.equal(labels[0].strokeStyle);
      }
    });

    it('Should be able to change grid line color', async function () {
      const gridLineColor = '#FF0000';
      el = await fixture(`<ef-chart style="--grid-line-color: '${gridLineColor}'"></ef-chart>`);
      el.config = config.line;
      await chartRendered(el);
      expect(el.chart.options.scales.x.grid.color).to.equal(el.getComputedVariable('--grid-line-color'));
      expect(el.chart.options.scales.y.grid.color).to.equal(el.getComputedVariable('--grid-line-color'));
    });

    it('Should be able to change zero grid line color', async function () {
      const zeroLineColor = '#FF0000';
      el = await fixture(`<ef-chart style="--grid-line-color: '${zeroLineColor}'"></ef-chart>`);
      el.config = config.line;
      await chartRendered(el);
      expect(el.chart.options.scales.x.border.color).to.equal(el.getComputedVariable('--zero-line-color'));
      expect(el.chart.options.scales.y.border.color).to.equal(el.getComputedVariable('--zero-line-color'));
    });
  });

  describe('Plugins', function () {
    beforeEach(async function () {
      el = await fixture('<ef-chart></ef-chart>');
      config = createMockConfig();
    });

    it('Should support center label plugin', async function () {
      el.config = config.centerLabelPlugins;
      await chartRendered(el);
      expect(el.chart).to.not.be.undefined;
      expect(el.chart.canvas).to.not.be.null;
    });

    it('Should support selected chart item config in center label plugin', async function () {
      const pluginConfig = config.centerLabelPlugins;
      pluginConfig.options.plugins.centerLabel.selected = { index: 1, datasetIndex: 0 };
      el.config = pluginConfig;
      await chartRendered(el);
      expect(el.chart).to.not.be.undefined;
      expect(el.chart.canvas).to.not.be.null;
    });

    it('Should render chart even if selected config invalid in center label plugin', function () {
      const pluginConfig = config.centerLabelPlugins;
      const selectedConfig = [
        { index: -1 },
        { datasetIndex: -1 },
        { index: -1, datasetIndex: 100 },
        { index: 100, datasetIndex: -1 }
      ];

      selectedConfig.forEach(async (selected) => {
        pluginConfig.options.plugins.centerLabel.selected = selected;
        el.config = pluginConfig;
        await chartRendered(el);
        expect(el.chart).to.not.be.undefined;
        expect(el.chart.canvas).to.not.be.null;
      });
    });

    it('Should support hover and click events center label plugin', async function () {
      let hovered = 0;
      let clicked = 0;

      config.centerLabelPlugins.options.onHover = () => {
        hovered++;
      };

      config.centerLabelPlugins.options.onClick = () => {
        clicked++;
      };

      el.config = config.centerLabelPlugins;
      await chartRendered(el);
      await nextFrame();
      expect(el.chart).to.not.be.undefined;
      expect(el.chart.canvas).to.not.be.null;

      const getDataCoordinates = (index) => {
        const meta = el.chart.getDatasetMeta(0);
        const rect = el.chart.canvas.getBoundingClientRect();
        const point = meta.data[index].getCenterPoint();

        return {
          clientX: rect.left + point.x,
          clientY: rect.top + point.y
        };
      };

      const canvas = el.chart.canvas;
      // Hover on first data
      canvas.dispatchEvent(new MouseEvent('mousemove', getDataCoordinates(0)));
      await chartRendered(el);
      expect(hovered, 'Should support a hover event').to.equal(1);

      // Click on first data
      canvas.dispatchEvent(new MouseEvent('click', getDataCoordinates(0)));
      await chartRendered(el);
      expect(clicked, 'Should support a click event').to.equal(1);

      // Click on next data
      canvas.dispatchEvent(new MouseEvent('click', getDataCoordinates(1)));
      await chartRendered(el);
      expect(clicked, 'Should support a click event on other item').to.equal(2);
    });
  });
});
