import {
  fixture,
  expect,
  elementUpdated,
  oneEvent,
} from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/elements/slider';
import '@refinitiv-ui/elemental-theme/light/ef-slider';

const getNumberField = (el, name) => el.shadowRoot.querySelector(`ef-number-field[name=${name}]`);

describe('slider/NumberField', () => {
  let el;

  beforeEach(async () => {
    el = await fixture('<ef-slider></ef-slider>');
  });

  it('input number field has set value 40 it should be slider value has correct ', async () => {
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

  it('input number field has set from 10 and to 20 on slider range', async () => {
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

    const inputTo = getNumberField(el, 'to')
    setTimeout(() => inputTo.dispatchEvent(new Event('focus')));
    await oneEvent(inputTo, 'focus');
    inputTo.value = '20';
    setTimeout(() => inputTo.dispatchEvent(new Event('blur')));
    await oneEvent(inputTo, 'blur');

    await elementUpdated(el);
    expect(el.to).to.equal(inputTo.value);
  });

  it('slider set value 10 it should be input number field has correct', async () => {
    el.showInputField = '';
    await elementUpdated(el);
    expect(el.hasAttribute('show-input-field')).to.equal(true);

    el.value = '15';
    await elementUpdated(el);
    expect(el.value).to.equal('15');
    const input = getNumberField(el, 'value');
    expect(input.value).to.equal(el.value);
  });

  it('Input field should in readonly state when show-input-field value is equal "readonly"', async () => {
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

  it('Input field should be displayed and not in readonly state when show-input-field value is not equal to null', async () => {
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
});
