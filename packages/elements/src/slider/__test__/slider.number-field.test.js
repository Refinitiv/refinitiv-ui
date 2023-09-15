import '@refinitiv-ui/elements/slider';

import '@refinitiv-ui/elemental-theme/light/ef-slider';
import { elementUpdated, expect, fixture, nextFrame, oneEvent } from '@refinitiv-ui/test-helpers';

import { tabSliderPosition } from './utils.js';

const getNumberField = (el, name) => el.shadowRoot.querySelector(`ef-number-field[name=${name}]`);
const getSliderTrackElement = (el) => el.sliderRef.value;

describe('slider/NumberField', function () {
  let el;
  let slider;

  beforeEach(async function () {
    el = await fixture('<ef-slider></ef-slider>');
    slider = getSliderTrackElement(el);
  });

  it('input number field has set value 40 it should be slider value has correct ', async function () {
    el.showInputField = '';
    await elementUpdated(el);
    expect(el.hasAttribute('show-input-field')).to.equal(true);

    const input = getNumberField(el, 'value');
    setTimeout(() => input.dispatchEvent(new Event('focus')));
    await oneEvent(input, 'focus');
    input.value = '40';
    setTimeout(() => input.dispatchEvent(new Event('blur')));
    await oneEvent(input, 'blur');

    await elementUpdated(el);
    expect(el.value).to.equal(input.value);
    expect(input.value).to.equal('40');
  });

  it('input number field has set from 10 and to 20 on slider range', async function () {
    el.showInputField = '';
    await elementUpdated(el);
    expect(el.hasAttribute('show-input-field')).to.equal(true);

    el.range = true;
    await elementUpdated(el);
    expect(el.hasAttribute('range')).to.equal(true);

    const inputFrom = getNumberField(el, 'from');
    setTimeout(() => inputFrom.dispatchEvent(new Event('focus')));
    await oneEvent(inputFrom, 'focus');
    inputFrom.value = '10';
    setTimeout(() => inputFrom.dispatchEvent(new Event('blur')));
    await oneEvent(inputFrom, 'blur');
    await elementUpdated(el);
    expect(el.from).to.equal(inputFrom.value);

    const inputTo = getNumberField(el, 'to');
    setTimeout(() => inputTo.dispatchEvent(new Event('focus')));
    await oneEvent(inputTo, 'focus');
    inputTo.value = '20';
    setTimeout(() => inputTo.dispatchEvent(new Event('blur')));
    await oneEvent(inputTo, 'blur');

    await elementUpdated(el);
    expect(el.to).to.equal(inputTo.value);
  });

  it('slider set value 10 it should be input number field has correct', async function () {
    el.showInputField = '';
    await elementUpdated(el);
    expect(el.hasAttribute('show-input-field')).to.equal(true);

    el.value = '15';
    await elementUpdated(el);
    expect(el.value).to.equal('15');
    const input = getNumberField(el, 'value');
    expect(input.value).to.equal(el.value);
  });

  it('Input field error state should reset when drag slider', async function () {
    // Drag 'value' from 80 to 100
    const dragPosition80 = tabSliderPosition(el, 80);
    const dragPositionToRight = tabSliderPosition(el, 100);

    el.showInputField = '';
    el.step = '5';
    await elementUpdated(el);

    // Input invalid value to show error state
    const input = getNumberField(el, 'value');
    input.value = '77';
    input.reportValidity();
    expect(input.error).to.equal(true);

    // Drag slider
    setTimeout(() =>
      slider.dispatchEvent(new MouseEvent('mousedown', { clientX: dragPosition80, clientY: 0 }))
    );
    await oneEvent(slider, 'mousedown');
    setTimeout(() =>
      window.dispatchEvent(
        new MouseEvent('mousemove', {
          clientX: dragPositionToRight,
          clientY: 0
        })
      )
    );
    await oneEvent(window, 'mousemove');
    await nextFrame();
    expect(input.error).to.equal(false);
  });

  it('Input field should in readonly state when show-input-field value is equal "readonly"', async function () {
    el.showInputField = 'readonly';
    await elementUpdated(el);
    expect(el.hasAttribute('show-input-field')).to.equal(true);
    const input = getNumberField(el, 'value');
    expect(input.readonly).to.equal(true);

    el.range = true;
    el.showInputField = 'readonly';
    await elementUpdated(el);

    expect(el.hasAttribute('show-input-field')).to.equal(true);

    const inputFrom = getNumberField(el, 'from');
    const inputTo = getNumberField(el, 'to');

    expect(inputFrom.readonly).to.equal(true);
    expect(inputTo.readonly).to.equal(true);
  });

  it('Input field should be displayed and not in readonly state when show-input-field value is not equal to null', async function () {
    el.showInputField = 'Readonly';
    await elementUpdated(el);
    expect(el.hasAttribute('show-input-field')).to.equal(true);
    const input = getNumberField(el, 'value');
    expect(input.readonly).to.equal(false);

    el.range = true;
    await elementUpdated(el);
    expect(el.hasAttribute('show-input-field')).to.equal(true);

    const inputFrom = getNumberField(el, 'from');
    const inputTo = getNumberField(el, 'to');

    expect(inputFrom.readonly).to.equal(false);
    expect(inputTo.readonly).to.equal(false);
  });

  it('Should increse "to" value via increase number-field value in range mode', async function () {
    el.range = true;
    el.showInputField = '';
    el.to = '10';
    await elementUpdated(el);

    const inputTo = getNumberField(el, 'to');
    setTimeout(() => inputTo.dispatchEvent(new Event('focus')));
    await oneEvent(inputTo, 'focus');
    inputTo.value = '20';
    setTimeout(() => inputTo.dispatchEvent(new Event('blur')));
    await oneEvent(inputTo, 'blur');

    await elementUpdated(el);
    expect(el.to).to.equal('20');
  });
});
