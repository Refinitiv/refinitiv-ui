import { fixture, expect, elementUpdated, nextFrame } from '@refinitiv-ui/test-helpers';

// import element and theme
import '@refinitiv-ui/elements/led-gauge';
import '@refinitiv-ui/elemental-theme/light/ef-led-gauge.js';

describe('led-gauge/LedGauge', () => {
  let canvas;
  let top;
  let bottom;
  let range;

  const normal = '<ef-led-gauge></ef-led-gauge>';
  const full = '<ef-led-gauge top-label="Top Text" bottom-label="Bottom Text" top-value="25" bottom-value="-25">';
  const nature = '<ef-led-gauge neutral-color top-label="150.50" top-value="25"></ef-led-gauge>';
  const rangeFixture = '<ef-led-gauge top-label="Top Text" top-value="30" range-label="Range Text" range="[-60, 30]"></ef-led-gauge>';
  const zero = '<ef-led-gauge zero="left" top-label="Top Text" top-value="0"></ef-led-gauge>';

  it('DOM structure is correct', async () => {
    const el = await fixture(normal);
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('Label and DOM structure is correct', async () => {
    const el = await fixture(normal);
    canvas = el.shadowRoot.querySelector('ef-canvas');

    expect(canvas).to.not.equal(null);
  });

  it('Should not show top, bottom, price values in the dom by default', async () => {
    const el = await fixture(normal);
    canvas = el.shadowRoot.querySelector('#canvas');
    top = el.shadowRoot.querySelector('#top');
    bottom = el.shadowRoot.querySelector('#bottom');
    range = el.shadowRoot.querySelector('#range');

    expect(top).to.equal(null);
    expect(bottom).to.equal(null);
    expect(range).to.equal(null);
  });

  it('Should show top and bottom labels when top-label and bottom-label are set', async () => {
    const el = await fixture(full);

    top = el.shadowRoot.querySelector('#top');
    bottom = el.shadowRoot.querySelector('#bottom');

    expect(top.textContent).to.equal(el.topLabel);
    expect(bottom.textContent).to.equal(el.bottomLabel);
  });

  it('Should update top and bottom labels when top-label and bottom-label changed by attribute', async () => {
    const el = await fixture(full);

    el.setAttribute('top-label', 'NewTopLabel');
    el.setAttribute('bottom-label', 'NewBottomLabel');

    await elementUpdated();
    top = el.shadowRoot.querySelector('#top');
    bottom = el.shadowRoot.querySelector('#bottom');

    expect(top).to.not.equal(null);
    expect(bottom).to.not.equal(null);
    expect(top.textContent).to.equal('NewTopLabel');
    expect(bottom.textContent).to.equal('NewBottomLabel');
  });

  it('Should update top and bottom labels when top-label and bottom-label changed by property', async () => {
    const el = await fixture(full);

    el.topLabel = 'NewTopLabel';
    el.bottomLabel = 'NewBottomLabel';

    await elementUpdated();
    top = el.shadowRoot.querySelector('#top');
    bottom = el.shadowRoot.querySelector('#bottom');

    expect(top).to.not.equal(null);
    expect(bottom).to.not.equal(null);
    expect(top.textContent).to.equal('NewTopLabel');
    expect(bottom.textContent).to.equal('NewBottomLabel');
  });

  it('Should remove the label when top-label and bottom-label attribute are removed', async () => {
    const el = await fixture(full);

    el.removeAttribute('top-label');
    el.removeAttribute('bottom-label');
    await elementUpdated();
    top = el.shadowRoot.querySelector('#top');
    bottom = el.shadowRoot.querySelector('#bottom');

    expect(top.textContent.length).to.equal(0);
    expect(bottom.textContent.length).to.equal(0);
  });

  it('Should not have neutual color by default', async () => {
    const el = await fixture(normal);

    expect(el.neutralColor).to.equal(false);
    expect(el.hasAttribute('neutral-color')).to.equal(false);
  });

  it('Should be able to set neutual color via property', async () => {
    const el = await fixture(nature);

    expect(el.neutralColor).to.equal(true);
    expect(el.hasAttribute('neutral-color')).to.equal(true);
  });

  it('Should be able to set topValue and bottomValue via property', async () => {
    const el = await fixture(full);
    await nextFrame();
    await nextFrame();
    top = el.shadowRoot.querySelector('#top');
    bottom = el.shadowRoot.querySelector('#bottom');
    let topTextPos = parseInt(window.getComputedStyle(top).getPropertyValue('left'), 10);
    let bottomTextPos = parseInt(window.getComputedStyle(bottom).getPropertyValue('left'), 10);

    expect(el.topValue).to.equal(25);
    expect(el.bottomValue).to.equal(-25);

    el.topValue = 50;
    el.bottomValue = -50;
    await elementUpdated();
    let newTopTextPos = parseInt(window.getComputedStyle(top).getPropertyValue('left'), 10);
    let newBottomTextPos = parseInt(window.getComputedStyle(bottom).getPropertyValue('left'), 10);

    expect(topTextPos < newTopTextPos).to.equal(true); // text position changed as value changed
    expect(bottomTextPos > newBottomTextPos).to.equal(true); // text position changed as value changed

  });

  it('Should be able to set topValue and bottomValue via attribute', async () => {
    const el = await fixture(full);
    await nextFrame();
    await nextFrame();
    top = el.shadowRoot.querySelector('#top');
    bottom = el.shadowRoot.querySelector('#bottom');
    let topTextPos = parseInt(window.getComputedStyle(top).getPropertyValue('left'), 10);
    let bottomTextPos = parseInt(window.getComputedStyle(bottom).getPropertyValue('left'), 10);

    expect(el.topValue).to.equal(25);
    expect(el.bottomValue).to.equal(-25);

    el.setAttribute('top-value', '50');
    el.setAttribute('bottom-value', '-50');
    await elementUpdated();
    let newTopTextPos = parseInt(window.getComputedStyle(top).getPropertyValue('left'), 10);
    let newBottomTextPos = parseInt(window.getComputedStyle(bottom).getPropertyValue('left'), 10);

    expect(topTextPos < newTopTextPos).to.equal(true); // text position changed as value changed
    expect(bottomTextPos > newBottomTextPos).to.equal(true); // text position changed as value changed
  });

  it('Should show range label when range-label are set', async () => {
    const el = await fixture(rangeFixture);
    range = el.shadowRoot.querySelector('#range');
    expect(range.textContent).to.equal(el.rangeLabel);
  });

  it('Should update range label when range-label changed by attribute', async () => {
    const el = await fixture(rangeFixture);
    el.setAttribute('range-label', 'NewRangeLabel');
    await elementUpdated();
    range = el.shadowRoot.querySelector('#range');

    expect(range).to.not.equal(null);
    expect(range.textContent).to.equal('NewRangeLabel');
  });

  it('Should update range label when range-label changed by property', async () => {
    const el = await fixture(rangeFixture);
    el.rangeLabel = 'NewRangeLabel';
    await elementUpdated();
    range = el.shadowRoot.querySelector('#range');

    expect(range).to.not.equal(null);
    expect(range.textContent).to.equal('NewRangeLabel');
  });

  it('Should show only rangeLabel if both rangeLable and bottomLabel are set', async () => {
    const el = await fixture(rangeFixture);
    bottom = el.shadowRoot.querySelector('#bottom');
    range = el.shadowRoot.querySelector('#range');
    expect(bottom).to.equal(null);
    expect(range).to.not.equal(null);

    el.setAttribute('bottom-label', 'Bottom Text');
    await elementUpdated();
    expect(bottom).to.equal(null);
    expect(range).to.not.equal(null);
  });

  it('Should have zero=center by default', async () => {
    const el = await fixture(normal);
    expect(el.hasAttribute('zero')).to.equal(false);
    expect(el.zero).to.equal('center');
  });

  it('Should have min=0 and max=100 when set zero=left by property', async () => {
    const el = await fixture(zero);
    el.zero = 'left';
    await elementUpdated();
    expect(el.zero).to.equal('left');
  });

  it('Should set zero to center when invalid value is set', async () => {
    const el = await fixture(zero);
    el.zero = 'left';
    await elementUpdated();
    expect(el.zero).to.equal('left');
    expect(el.min).to.equal(0);
    expect(el.max).to.equal(100);

    el.zero = 'invalid';
    await elementUpdated();
    expect(el.zero).to.equal('center');
    expect(el.min).to.equal(-100);
    expect(el.max).to.equal(100);
  });

});

