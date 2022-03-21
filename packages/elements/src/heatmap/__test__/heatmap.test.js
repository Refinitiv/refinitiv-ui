import { Track } from '../../../lib/heatmap/helpers/track.js';
import { fixture, expect, elementUpdated, nextFrame } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/elements/heatmap';
import '@refinitiv-ui/elemental-theme/light/ef-heatmap.js';

const removeUnit = /[^-\d\.]/g;
const CONFIG = {
  data: [[{ value: 1, header: 'ABC' }, { value: 0.5, header: 'DEF' }]],
  yAxis: {
    labels: ['y-axis-label'],
    shortLabels: ['yal']
  },
  xAxis: {
    labels: ['x-axis-label-1', 'x-axis-label-2'],
    shortLabels: ['xal-1', 'xal-2']
  }
};

const canvasUpdated = async () => {
  await nextFrame();
  await nextFrame();
  await nextFrame(); // IE11 needs second animation frame, otherwise resize observer is not run.
};


describe('heatmap/Heatmap', () => {
  describe('DOM Structure', () => {
    it('DOM structure is correct', async () => {
      const el = await fixture('<ef-heatmap></ef-heatmap>');
      expect(el).shadowDom.to.equalSnapshot();
    });
    it('DOM structure with tooltip config is correct', async () => {
      const el = await fixture('<ef-heatmap></ef-heatmap>');
      el.config = CONFIG;
      el.tooltipCallback = function (cell) {
        const tooltip = document.createElement('div');
        const template = ` <div>Value: ${cell.value}</div>`;
        tooltip.innerHTML = template;
        return tooltip;
      };

      await elementUpdated(el);

      expect(el).shadowDom.to.equalSnapshot();
    });
    it('DOM structure with axes config is correct', async () => {
      const el = await fixture('<ef-heatmap></ef-heatmap>');
      el.config = CONFIG;

      await elementUpdated(el);

      expect(el).shadowDom.to.equalSnapshot();
    });
  });

  describe('Canvas', () => {
    it('Should render canvas', async () => {
      const el = await fixture('<ef-heatmap></ef-heatmap>');

      await canvasUpdated();

      const canvas = el.shadowRoot.querySelector('[part=canvas]');
      const canvasHeight = window.getComputedStyle(canvas).height.replace(removeUnit, '');
      const canvasWidth = window.getComputedStyle(canvas).width.replace(removeUnit, '');

      expect(canvasHeight).to.not.equal('0');
      expect(canvasWidth).to.not.equal('0');
    });
  });

  describe('Track', () => {
    let block;
    let size;
    let lane;
    let margin;

    beforeEach(() => {
      block = new Track();
      size = 100;
      lane = 10;
      margin = 1;
      block.init(size, lane);
      block.margin = margin;
    });

    it('Should have correct size when init track', () => {
      size = 200;
      lane = 10;
      block.init(size, lane);

      expect(block.trackSize).to.equal(size);
      expect(block.laneCount).to.equal(lane);
      expect(block.margin).to.equal(margin);
    });

    it('Should have size of content when pass index of lane', () => {
      expect(block.getContentSize(5)).to.equal(8);
    });

    it('Should hittest correct position when pass mouse position in lane', () => {
      expect(block.hitTest(65)).to.equal(6);
    });

    it('Should hittest wrong position when pass mouse position out of lane', () => {
      expect(block.hitTest(60)).to.equal(-1);
      expect(block.hitTest(1000)).to.equal(-1);
    });
  });

  describe('Axes', () => {
    let el;

    beforeEach(async () => {
      el = await fixture('<ef-heatmap></ef-heatmap>');
      el.config = CONFIG;
      await elementUpdated(el);
    });

    it('Should not render any axes', async () => {
      el.config = { data: [[{ value: 1, header: 'ABC' }, { value: 0.5, header: 'DEF' }]] };
      await elementUpdated(el);

      const crossBox = el.shadowRoot.querySelector('[part=cross-box]');
      const xAxis = el.shadowRoot.querySelector('[part=x-axis]');
      const yAxis = el.shadowRoot.querySelector('[part=y-axis]');

      expect(crossBox).to.equal(null);
      expect(xAxis).to.equal(null);
      expect(yAxis).to.equal(null);
    });

    it('Should render x-axis', async () => {
      await canvasUpdated();

      const xAxis = el.shadowRoot.querySelector('[part=x-axis]');
      const xAxisHeight = window.getComputedStyle(xAxis).height.replace(removeUnit, '');
      const xAxisWidth = window.getComputedStyle(xAxis).width.replace(removeUnit, '');

      expect(xAxisHeight).to.not.equal('0');
      expect(xAxisWidth).to.not.equal('0');
    });

    it('Should render y-axis', async () => {
      await canvasUpdated();

      const yAxis = el.shadowRoot.querySelector('[part=y-axis]');
      const yAxisHeight = window.getComputedStyle(yAxis).height.replace(removeUnit, '');
      const yAxisWidth = window.getComputedStyle(yAxis).width.replace(removeUnit, '');

      expect(yAxisHeight).to.not.equal('0');
      expect(yAxisWidth).to.not.equal('0');
    });

    it('Should render cross box', async () => {
      await canvasUpdated();

      const crossBox = el.shadowRoot.querySelector('[part=cross-box]');
      const crossBoxHeight = window.getComputedStyle(crossBox).height.replace(removeUnit, '');
      const crossBoxWidth = window.getComputedStyle(crossBox).width.replace(removeUnit, '');

      expect(crossBoxHeight).to.not.equal('0');
      expect(crossBoxWidth).to.not.equal('0');
    });

    it('Should hide all axes and cross box', () => {
      el.setAttribute('axis-hidden', true);

      const crossBox = el.shadowRoot.querySelector('[part=cross-box]');
      const crossBoxHeight = window.getComputedStyle(crossBox).height.replace(removeUnit, '');

      const xAxis = el.shadowRoot.querySelector('[part=x-axis]');
      const xAxisHeight = window.getComputedStyle(xAxis).height.replace(removeUnit, '');

      const yAxis = el.shadowRoot.querySelector('[part=y-axis]');
      const yAxisHeight = window.getComputedStyle(yAxis).height.replace(removeUnit, '');

      expect(el.axisHidden).to.equal(true);

      expect(xAxisHeight).to.equal('0');
      expect(yAxisHeight).to.equal('0');
      expect(crossBoxHeight).to.equal('0');
    });

    it('Should align the y-axis to the left using row flex-direction', async () => {
      el.config.yAxis.position = 'left';

      await canvasUpdated();

      const container = el.shadowRoot.querySelector('#container');
      const containerFlexDirection = window.getComputedStyle(container).flexDirection;

      expect(containerFlexDirection).to.equal('row');
    });

    it('Should align the y-axis to the right using row-reverse flex-direction', async () => {
      el.config.yAxis.position = 'right';

      await canvasUpdated();

      const container = el.shadowRoot.querySelector('#container');
      const containerFlexDirection = window.getComputedStyle(container).flexDirection;

      expect(containerFlexDirection).to.equal('row-reverse');
    });

    it('Should align the x-axis to the top with y-axis display: block', async () => {
      el.config.xAxis.position = 'top';

      await canvasUpdated();

      const xAxisContainer = el.shadowRoot.querySelector('#canvas-container');
      const xAxisContainerFlexDirection = window.getComputedStyle(xAxisContainer).flexDirection;

      const yAxisContainer = el.shadowRoot.querySelector('#y-axis-container');
      const yAxisContainerDisplay = window.getComputedStyle(yAxisContainer).display;

      expect(xAxisContainerFlexDirection).to.equal('column');
      expect(yAxisContainerDisplay).to.equal('block');
    });

    it('Should align the x-axis to the bottom using column-reverse flex-direction and set y-axis to column-reverse', async () => {
      el.config.xAxis.position = 'bottom';

      await canvasUpdated();

      const xAxisContainer = el.shadowRoot.querySelector('#canvas-container');
      const xAxisContainerFlexDirection = window.getComputedStyle(xAxisContainer).flexDirection;

      const yAxisContainer = el.shadowRoot.querySelector('#y-axis-container');
      const yAxisContainerDisplay = window.getComputedStyle(yAxisContainer).display;
      const yAxisContainerFlexDirection = window.getComputedStyle(yAxisContainer).flexDirection;

      expect(xAxisContainerFlexDirection).to.equal('column-reverse');
      expect(yAxisContainerDisplay).to.equal('flex');
      expect(yAxisContainerFlexDirection).to.equal('column-reverse');
    });

    it('Should only render y-axis labels until the maximum cell rows', async () => {
      el.config = {
        data: [[{ value: 1 }, { value: 0.5 }], [{ value: 1 }, { value: 0.5 }]],
        yAxis: {
          labels: ['y-axis-1', 'y-axis-2', 'y-axis-3']
        },
        xAxis: {
          labels: ['x-axis-1', 'x-axis-2']
        }
      };

      await canvasUpdated();

      const yAxisContainer = el.shadowRoot.querySelector('[part=y-axis]');
      const yAxisItems = yAxisContainer.getElementsByClassName('y-axis-item');

      expect(yAxisItems.length).to.equal(2);
      expect(yAxisItems[0].innerText).to.equal(el.config.yAxis.labels[0]);
      expect(yAxisItems[1].innerText).to.equal(el.config.yAxis.labels[1]);
    });

    it('Should only render x-axis labels until the maximum cell columns', async () => {
      el.config = {
        data: [[{ value: 1 }, { value: 0.5 }]],
        yAxis: {
          labels: ['y-axis-1']
        },
        xAxis: {
          labels: ['x-axis-1', 'x-axis-2', 'x-axis-3']
        }
      };

      await canvasUpdated();

      const xAxisContainer = el.shadowRoot.querySelector('[part=x-axis]');
      const xAxisItems = xAxisContainer.getElementsByClassName('x-axis-item');

      expect(xAxisItems.length).to.equal(2);
      expect(xAxisItems[0].innerText).to.equal(el.config.xAxis.labels[0]);
      expect(xAxisItems[1].innerText).to.equal(el.config.xAxis.labels[1]);
    });
  });

  describe('Custom Properties', () => {
    let el;

    beforeEach(async () => {
      el = await fixture('<ef-heatmap></ef-heatmap>');
      el.config = CONFIG;
    });

    it('Should be able to retrieve custom foreground and background property', async () => {
      el.renderCallback = function (cell) {
        return {
          backgroundColor: 'turquoise',
          foregroundColor: 'red'
        };
      };

      await canvasUpdated();

      expect(el.cells[0]).to.not.equal(null);
      expect(el.cells[0].customBackgroundColor).to.equal('turquoise');
      expect(el.cells[0].customForegroundColor).to.equal('red');
    });
  });
});
