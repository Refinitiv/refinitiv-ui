import { fixture, assert, expect, nextFrame, elementUpdated } from '@refinitiv-ui/test-helpers';

// import element and theme
import '@refinitiv-ui/elements/canvas';
import '@refinitiv-ui/elemental-theme/light/ef-canvas.js';

describe('canvas/Canvas', () => {
  let el;

  beforeEach(async () => {
    el = await fixture('<ef-canvas></ef-canvas>');
  });

  it('DOM structure is correct', async () => {
    expect(el).shadowDom.to.equalSnapshot();
  });

  it('Contains the correct structure', () => {
    assert.strictEqual(el.shadowRoot.querySelectorAll('canvas').length, 1, 'Should contain one canvas element');
  });

  it('Has a 2D rendering context', () => {
    assert.ok(el.ctx instanceof CanvasRenderingContext2D, 'el.ctx');
    assert.ok(el.context instanceof CanvasRenderingContext2D, 'el.context');
    assert.ok(el.getContext('2d') instanceof CanvasRenderingContext2D, 'el.getContext(\'2d\')');
  });

  it('Has aliases of context for preferential use', () => {
    assert.strictEqual(el.ctx, el.context);
    assert.strictEqual(el.ctx, el.getContext('2d'));
  });

  it('Should only support 2D rendering', () => {
    assert.strictEqual(el.getContext(), null, 'Context for undefined should be null');
    assert.strictEqual(el.getContext('webgl'), null, 'Context for webgl should be null');
    assert.strictEqual(el.getContext('experimental-webgl'), null, 'Context for experimental-webgl should be null');
    assert.strictEqual(el.getContext('webgl2'), null, 'Context for webgl2 should be null');
    assert.strictEqual(el.getContext('experimental-webgl2'), null, 'Context for experimental-webgl2 should be null');
    assert.strictEqual(el.getContext('bitmaprenderer'), null, 'Context for bitmaprenderer should be null');
    assert.ok(el.getContext('2d') instanceof CanvasRenderingContext2D, 'Context for 2d should be CanvasRenderingContext2D');
  });

  it('Should have default dpr equal to 1 when calculate canvas size', async () => {
    const dpr = 1;
    Object.defineProperty(window, 'devicePixelRatio', {
      value: null
    });
    await nextFrame(2); // Chrome 111 & Firefox 111 needs another frame to complete canvas rendering
    expect(el.canvas.width).equal(Math.floor(el.width * dpr));
    expect(el.canvas.height).equal(Math.floor(el.height * dpr));
  });

  it('Sets the correct scale on the canvas', async () => {
    const dpr = devicePixelRatio;
    Object.defineProperty(window, 'devicePixelRatio', {
      value: 3
    });
    await nextFrame(2); // Chrome 111 & Firefox 111 needs another frame to complete canvas rendering
    expect(el.canvas.width).equal(Math.floor(el.width * devicePixelRatio));
    expect(el.canvas.height).equal(Math.floor(el.height * devicePixelRatio));
    Object.defineProperty(window, 'devicePixelRatio', {
      value: dpr
    });
  });

  it('Has aliases of context for preferential use', () => {
    assert.strictEqual(el.ctx, el.context);
    assert.strictEqual(el.ctx, el.getContext('2d'));
  });

  it('Handles fractional pixelation', async () => {
    el.style.width = '300.5px';
    await elementUpdated(el);
    const listener = function () {
      el.removeEventListener('resize', listener);
      expect(el.style.width, 'ef-canvas\'s width should be fractional').equal('300.5px');
      expect(getComputedStyle(el.canvas).width, 'canvas\'s width should be fractional').equal('300.5px');
      el.style.removeProperty('width');
    };
    el.addEventListener('resize', listener);
  });

  it('Supports autoloop', async () => {
    let count = 0;
    const elem = await fixture('<ef-canvas autoloop></ef-canvas>');
    elem.addEventListener('frame', function () {
      count++;
      if (count === 1) {
        elem.autoloop = false;
      }
    });
    await nextFrame();
    expect(count, 'Count should be updated').not.equal(0);
  });

  it('Supports starting and stopping autoloop', (done) => {
    let count = 0;
    el.addEventListener('frame', function () {
      count++;
      assert.ok(count <= 10, 'Count should not go past 10');
      if (count === 10) {
        el.removeAttribute('autoloop');
        setTimeout(function () {
          done();
        });
      }
    });
    el.setAttribute('autoloop', '');
  });
});

