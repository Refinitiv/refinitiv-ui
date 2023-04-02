import { fixture, expect, elementUpdated, oneEvent, nextFrame } from '@refinitiv-ui/test-helpers';
import { valueUpdated, keyArrowLeft, keyArrowRight, keyArrowDown, keyArrowUp, keyHome, keyEnd  } from './utils'

// import element and theme
import '@refinitiv-ui/elements/rating';
import '@refinitiv-ui/elemental-theme/light/ef-rating.js';

describe('rating/Rating', () => {

  let el;
  beforeEach(async () => {
    el = await fixture('<ef-rating></ef-rating>');
  });

  it('DOM structure is correct', async () => {
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('Contains the correct structure', async () => {
    expect(el.getAttribute('max')).to.be.null;
    expect(el.getAttribute('interactive')).to.be.null;
    expect(el.value).to.equal('0');
    const stars = el.shadowRoot.querySelectorAll('[part~="icon"]');
    expect(stars.length).to.equal(5);
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

    el.value = NaN;
    await elementUpdated(el);
    expect(el.value).to.equal('0');
  });

  it('When via max invalid type', async () => {

    el.max = 'abcd';
    await elementUpdated(el);
    expect(el.max).to.equal(el.MAX_VALUE);

    el.max = undefined;
    await elementUpdated(el);
    expect(el.max).to.equal(el.MAX_VALUE);

    el.max = null;
    await elementUpdated(el);
    expect(el.max).to.equal(el.MAX_VALUE);

    el.value = NaN;
    await elementUpdated(el);
    expect(el.max).to.equal(el.MAX_VALUE);
  });

  describe('Keyboard Events', () => {
    beforeEach(async () => {
      el = await fixture('<ef-rating interactive></ef-rating>');
    });
    it('Arrow up/down should do nothing when interactive is not activated', async () => {
      el.interactive = false;
      await elementUpdated(el);
      el.dispatchEvent(keyArrowUp);
      expect(el.value).to.equal('0');

      valueUpdated('2', el);
      el.dispatchEvent(keyArrowDown);
      expect(el.value).to.equal('2');
    });
    it('Arrow Up/Right should increase value correctly', async () => {
      el.dispatchEvent(keyArrowUp);
      expect(el.value).to.equal('1');

      el.dispatchEvent(keyArrowRight);
      expect(el.value).to.equal('2');

      valueUpdated('-10', el);
      el.dispatchEvent(keyArrowRight);
      expect(el.value).to.equal('1');

      valueUpdated('0.5', el);
      el.dispatchEvent(keyArrowRight);
      expect(el.value).to.equal('1');

      valueUpdated('5', el);
      el.dispatchEvent(keyArrowRight);
      expect(el.value).to.equal('5', 'not exceed default max value.');

      valueUpdated('6', el);
      el.dispatchEvent(keyArrowRight);
      expect(el.value).to.equal('6', 'do nothing when value is exceed max value.');
    });
    it('Arrow Up/Right should increase value correctly when max value has been changed', async () => {
      el.value = '1';
      el.max = '1.5';
      await elementUpdated(el);
      el.dispatchEvent(keyArrowUp);
      expect(el.value).to.equal('2');

      el.max = '1';
      await elementUpdated(el);
      el.dispatchEvent(keyArrowRight);
      expect(el.value).to.equal('2');
    });
    it('Arrow Down/Left should decrease value correctly', async () => {
      valueUpdated('3', el);
      el.dispatchEvent(keyArrowDown);
      expect(el.value).to.equal('2');

      el.dispatchEvent(keyArrowLeft);
      expect(el.value).to.equal('1');

      el.dispatchEvent(keyArrowLeft);
      expect(el.value).to.equal('1');

      valueUpdated('-10', el);
      el.dispatchEvent(keyArrowLeft);
      expect(el.value).to.equal('-10');

      valueUpdated('0.25', el);
      el.dispatchEvent(keyArrowLeft);
      expect(el.value).to.equal('0.25');

      valueUpdated('0.75', el);
      el.dispatchEvent(keyArrowLeft);
      expect(el.value).to.equal('0.75');

      valueUpdated('1.25', el);
      el.dispatchEvent(keyArrowLeft);
      expect(el.value).to.equal('1');
    });
    it('Arrow Down/Left should decrease value correctly when max value has been changed', async () => {
      el.value = '2.5';
      el.max = '2';
      await elementUpdated(el);
      el.dispatchEvent(keyArrowLeft);
      expect(el.value).to.equal('1');

      el.value = '3.75';
      el.max = '3.5';
      await elementUpdated(el);
      el.dispatchEvent(keyArrowLeft);
      expect(el.value).to.equal('3');

      el.value = '0.5';
      el.max = '0.5';
      await elementUpdated(el);
      el.dispatchEvent(keyArrowLeft);
      expect(el.value).to.equal('0.5');
    });
    it('End key should increase value correctly', async () => {
      el.dispatchEvent(keyEnd);
      expect(el.value).to.equal('5');

      el.value = '5';
      el.max = '3';
      await elementUpdated(el);
      el.dispatchEvent(keyEnd);
      expect(el.value).to.equal('5');
    });
    it('Home key should decrease value correctly', async () => {
      valueUpdated('10', el);
      el.dispatchEvent(keyHome);
      expect(el.value).to.equal('1');

      el.value = '3';
      el.max = '2';
      await elementUpdated(el);
      el.dispatchEvent(keyHome);
      expect(el.value).to.equal('1');
    });
    it('Fired event correctly', async () => {
      let event;

      valueUpdated('2', el);

      setTimeout(() => el.dispatchEvent(keyArrowUp));
      event = await oneEvent(el, 'value-changed');
      expect(event.detail.value).to.equal('3');

      setTimeout(() => el.dispatchEvent(keyArrowRight));
      event = await oneEvent(el, 'value-changed');
      expect(event.detail.value).to.equal('4');

      setTimeout(() => el.dispatchEvent(keyArrowDown));
      event = await oneEvent(el, 'value-changed');
      expect(event.detail.value).to.equal('3');

      setTimeout(() => el.dispatchEvent(keyArrowLeft));
      event = await oneEvent(el, 'value-changed');
      expect(event.detail.value).to.equal('2');

      setTimeout(() => el.dispatchEvent(keyEnd));
      event = await oneEvent(el, 'value-changed');
      expect(event.detail.value).to.equal('5');

      setTimeout(() => el.dispatchEvent(keyHome));
      event = await oneEvent(el, 'value-changed');
      expect(event.detail.value).to.equal('1');
    });
    it('Should not fired value-changed event', async () => {
      let isFired = false;
      el.value = '3';
      el.max = '2';
      await elementUpdated(el);

      el.addEventListener('value-changed', () => {
        isFired = true;
      });

      el.dispatchEvent(keyArrowUp);
      expect(isFired).to.equal(false);

      el.dispatchEvent(keyArrowRight);
      expect(isFired).to.equal(false);

      el.dispatchEvent(keyEnd);
      expect(isFired).to.equal(false);

      el.value = '0.25';
      el.max = '4';
      await elementUpdated(el);

      el.dispatchEvent(keyArrowDown);
      expect(isFired).to.equal(false);

      el.dispatchEvent(keyArrowLeft);
      expect(isFired).to.equal(false);

      el.dispatchEvent(keyHome);
      expect(isFired).to.equal(false);
    });
  });

  describe('Accessibility', () => {
    beforeEach(async () => {
      el = await fixture('<ef-rating interactive></ef-rating>');
    });
    it('Should have correct attribute', async () => {
      expect(el.getAttribute('role')).to.equal('slider');
      expect(el.getAttribute('tabindex')).to.equal('0');
      expect(el.getAttribute('aria-valuemin')).to.equal('1');
      expect(el.getAttribute('aria-valuemax')).to.equal(el.MAX_VALUE);
      expect(el.getAttribute('aria-valuenow')).to.equal('0');
    });
    it('Should remove attributes when interactive attribute has been changed', async () => {
      el.interactive = false;
      await elementUpdated(el);
      expect(el.getAttribute('role')).to.equal(null);
      expect(el.getAttribute('aria-valuemin')).to.equal(null);
      expect(el.getAttribute('aria-valuemax')).to.equal(null);
      expect(el.getAttribute('aria-valuenow')).to.equal(null);
    });
    it('Should update aria-valuenow when value updated', async () => {
      expect(el.getAttribute('aria-valuenow')).to.equal('0');

      valueUpdated('2', el);
      await nextFrame();
      expect(el.getAttribute('aria-valuenow')).to.equal('2');
    });
    it('Should update aria-valuemax when max value updated', async () => {
      expect(el.getAttribute('aria-valuemax')).to.equal(el.MAX_VALUE);

      valueUpdated('10', el, 'max');
      await nextFrame();
      expect(el.getAttribute('aria-valuemax')).to.equal('10');
    });
  });
});
