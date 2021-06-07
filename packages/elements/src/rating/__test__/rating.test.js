import { fixture, expect, elementUpdated } from '@refinitiv-ui/test-helpers';

// import element and theme
import '@refinitiv-ui/elements/rating';
import '@refinitiv-ui/elemental-theme/light/ef-rating.js';

describe('Rating', () => {

  let el;
  beforeEach(async () => {
    el = await fixture('<ef-rating></ef-rating>');
  });

  it('DOM structure is correct', async () => {
    expect(el).shadowDom.to.equalSnapshot();
  });

  it('Contains the correct structure', async () => {
    expect(el.getAttribute('max')).to.be.null;
    expect(el.getAttribute('value')).to.equal('0');
    expect(el.getAttribute('interactive')).to.be.null;
    expect(el.stars.length).to.equal(5);
  });

  it('Max is changed', async () => {
    el.max = '10';
    await elementUpdated(el);
    expect(el.shadowRoot.querySelectorAll('[part=icon]').length).to.equal(10);
  });

  it('Half value is changed: 0.1', async () => {
    el.value = '0.1';
    await elementUpdated(el);

    expect(el.shadowRoot.querySelectorAll('[part~=icon-half]').length).to.equal(0);
    expect(el.shadowRoot.querySelectorAll('[part~=icon-full]').length).to.equal(0);
  });

  it('Half value is changed: 0.25', async () => {
    el.value = '0.25';
    await elementUpdated(el);
    expect(el.shadowRoot.querySelectorAll('[part~=icon-half]').length).to.equal(1);
    expect(el.shadowRoot.querySelectorAll('[part~=icon-full]').length).to.equal(0);
  });

  it('Half value is changed: 0.5', async () => {
    el.value = '0.5';
    await elementUpdated(el);
    expect(el.shadowRoot.querySelectorAll('[part~=icon-half]').length).to.equal(1);
    expect(el.shadowRoot.querySelectorAll('[part~=icon-full]').length).to.equal(0);
  });

  it('Half value is changed: 0.75', async () => {
    el.value = '0.75';
    await elementUpdated(el);

    expect(el.shadowRoot.querySelectorAll('[part~=icon-half]').length).to.equal(0);
    expect(el.shadowRoot.querySelectorAll('[part~=icon-full]').length).to.equal(1);
  });

  it('Value is changed: 1', async () => {
    el.value = '1';
    await elementUpdated(el);
    expect(el.shadowRoot.querySelectorAll('[part~=icon-half]').length).to.equal(0);
    expect(el.shadowRoot.querySelectorAll('[part~=icon-full]').length).to.equal(1);
  });

  it('When Value is more than Max', async () => {
    el.value = '10';
    await elementUpdated(el);
    expect(el.shadowRoot.querySelectorAll('[part~=icon-full]').length).to.equal(Number(el.max));
  });

  it('Should rounded max value up when max value is decimal', async () => {
    el.max = '5.5';
    await elementUpdated(el);
    expect(el.max).to.equal('6');
  });

  it('Tapping on a star by default mode', async () => {
    await elementUpdated(el);
    expect(el.getAttribute('interactive')).to.null;
    const star = el.shadowRoot.querySelectorAll('[part=icon]')[2];
    star.dispatchEvent(new Event('tap'));
    await elementUpdated(el);
    expect(el.shadowRoot.querySelectorAll('[part~=icon-full]').length).to.equal(0);
  });

  it('Tapping on star is working', async () => {
    el.interactive = true;
    await elementUpdated(el);
    expect(el.getAttribute('interactive')).to.equal('');
    const star = el.shadowRoot.querySelectorAll('[part=icon]')[2];
    star.dispatchEvent(new Event('tap'));
    await elementUpdated(el);
    expect(el.shadowRoot.querySelectorAll('[part~=icon-full]').length).to.equal(3);
  });

  it('When via value invalid type', async () => {

    el.value = 'abcd';
    await elementUpdated(el);
    expect(el.value).to.equal('0');

    el.value = undefined;
    await elementUpdated(el);
    expect(el.value).to.equal('0');

    el.value = null;
    await elementUpdated(el);
    expect(el.value).to.equal('0');
  });

  it('When via max invalid type', async () => {

    el.max = 'abcd';
    await elementUpdated(el);
    expect(el.max).to.equal('5');

    el.max = undefined;
    await elementUpdated(el);
    expect(el.max).to.equal('5');

    el.max = null;
    await elementUpdated(el);
    expect(el.max).to.equal('5');
  });
});

