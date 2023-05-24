import { fixture, expect, elementUpdated, nextFrame } from '@refinitiv-ui/test-helpers';

// import element and theme
import '@refinitiv-ui/elements/sparkline';
import '@refinitiv-ui/elemental-theme/light/ef-sparkline.js';

const isCanvasBlank = function (canvas) {
  var context = canvas.getContext('2d');
  var pixelBuffer = new Uint32Array(context.getImageData(0, 0, canvas.width, canvas.height).data.buffer);
  var foundSome = false;
  for (var i = 0; i < pixelBuffer.length && !foundSome; i++) {
    if (!foundSome) {
      foundSome = pixelBuffer[i] !== 0;
    }
  }
  return !foundSome;
};

describe('sparkline/Sparkline', () => {
  let el;
  let data;
  let canvas;
  let chart;

  let countDataChanged = 0;
  let countDataError = 0;

  const onDataChanged = () => countDataChanged++;
  const onDataError = () => countDataError++;

  afterEach((done) => {
    el.removeEventListener('data-changed', onDataChanged);
    el.removeEventListener('data-error', onDataError);
    done();
  });
  describe('Test Default Structure', () => {
    beforeEach(async () => {
      el = await fixture('<ef-sparkline></ef-sparkline>');
      canvas = el.shadowRoot.querySelector('canvas');
      chart = el.shadowRoot.querySelectorAll('[part=chart]');

      data = [-20, 40, 10, 30, 50, 5, 100];

      countDataChanged = 0;
      countDataError = 0;

      el.addEventListener('data-changed', onDataChanged);
      el.addEventListener('data-error', onDataError);
    });

    it('DOM structure is correct', async () => {
      await expect(el).shadowDom.to.equalSnapshot();
    });

    it('Should have the correct part', () => {
      expect(canvas).to.not.null;
      expect(chart).to.not.null;
      expect(el.referenceValue).to.undefined;
      expect(isCanvasBlank(canvas)).to.be.true;
    });

    it('Canvas should be 100% both width and height', () => {
      canvas = el.shadowRoot.querySelector('canvas');

      expect(isCanvasBlank(canvas)).to.be.true;
      canvas.addEventListener('resize', () => {
        expect(canvas.width).to.equal(el.clientWidth);
        expect(canvas.height).to.equal(el.clientHeight);
      });
    });

    it('Should fire data-changed when data is set', async () => {
      expect(countDataChanged).to.equal(0);
      expect(countDataError).to.equal(0);
      expect(isCanvasBlank(canvas)).to.be.true;

      el.data = data;
      await elementUpdated(el);
      await nextFrame(2); // wait for rendering completion
      expect(countDataChanged).to.equal(1);
      expect(countDataError).to.equal(0);
      expect(isCanvasBlank(canvas)).to.be.false;

      el.data = [10, 30, -20];
      await elementUpdated(el);
      expect(countDataChanged).to.equal(2);
      expect(countDataError).to.equal(0);
      expect(isCanvasBlank(canvas)).to.be.false;
    });

    it('Should fire data-error when data array length is < 2', async () => {
      expect(countDataChanged).to.equal(0);
      expect(countDataError).to.equal(0);
      expect(isCanvasBlank(canvas)).to.be.true;

      el.data = [10];
      await elementUpdated(el);
      expect(countDataChanged).to.equal(0);
      expect(countDataError).to.equal(1);
      expect(isCanvasBlank(canvas)).to.be.true;

      el.data = [];
      await elementUpdated(el);
      expect(countDataChanged).to.equal(0);
      expect(countDataError).to.equal(2);
      expect(isCanvasBlank(canvas)).to.be.true;
    });
  });
  describe('Test data Setter', () => {
    beforeEach(async () => {
      data = [-20, 40, 10, 30];
      el = await fixture(`<ef-sparkline data="${JSON.stringify(data)}"></ef-sparkline>`);
      canvas = el.shadowRoot.querySelector('canvas');
      chart = el.shadowRoot.querySelectorAll('[part=chart]');

      countDataChanged = 0;
      countDataError = 0;

      el.addEventListener('data-changed', onDataChanged);
      el.addEventListener('data-error', onDataError);
    });

    it('Any event should not be fire and data should be set by default.', async () => {
      expect(canvas).to.not.null;
      expect(chart).to.not.null;
      expect(countDataChanged).to.equal(0);
      expect(countDataError).to.equal(0);
      expect(el.data.length).to.equal(4);
    });
  });
  describe('Test reference-value', () => {
    beforeEach(async () => {
      data = [-20, 40, 10, 30];
      el = await fixture(`<ef-sparkline data="${JSON.stringify(data)}" reference-value="10"></ef-sparkline>`);
      canvas = el.shadowRoot.querySelector('canvas');
      chart = el.shadowRoot.querySelectorAll('[part=chart]');
    });

    it('Reference value property should be set by default.', () => {
      expect(el.referenceValue).to.equal(10);
    });

    it('Change reference value property on runtime.', async () => {
      expect(el.referenceValue).to.equal(10);

      el.referenceValue = 0;
      await elementUpdated(el);
      expect(el.referenceValue).to.equal(0);
    });
  });
  describe('Test Previous Data', () => {
    beforeEach(async () => {
      data = [-20, 40, 10];
      const previousData = [10, 20];
      el = await fixture(`<ef-sparkline data="${JSON.stringify(data)}" previous-data="${JSON.stringify(previousData)}"></ef-sparkline>`);
      canvas = el.shadowRoot.querySelector('canvas');
      chart = el.shadowRoot.querySelectorAll('[part=chart]');

      countDataChanged = 0;
      countDataError = 0;

      el.addEventListener('data-changed', onDataChanged);
      el.addEventListener('data-error', onDataError);
    });

    it('Any event should not be fire and data should be set by default.', async () => {
      expect(canvas).to.not.null;
      expect(chart).to.not.null;
      expect(countDataChanged).to.equal(0);
      expect(countDataError).to.equal(0);
      expect(el.data.length).to.equal(3);
      expect(el.previousData.length).to.equal(2);
      expect(el.previousData[0]).to.equal(10);
    });
  });
});
