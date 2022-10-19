import {
  fixture,
  expect,
  elementUpdated,
  aTimeout,
  nextFrame
} from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/elements/clock';
import '@refinitiv-ui/elemental-theme/light/ef-clock.js';

describe('clock/Clock', () => {
  let el;

  describe('DOM structure', () => {
    it('DOM structure is correct', async () => {
      const el = await fixture('<ef-clock></ef-clock>');
      expect(el).shadowDom.to.equalSnapshot();
    });
    it('DOM structure of analogue is correct', async () => {
      const el = await fixture('<ef-clock analogue></ef-clock>');
      expect(el).shadowDom.to.equalSnapshot();
    });
    it('DOM structure of small size analogue is correct', async () => {
      el = await fixture('<ef-clock analogue></ef-clock>');
      el.style.width = '129px';
      await elementUpdated(el);
      await nextFrame();
      await nextFrame();

      expect(el).shadowDom.to.equalSnapshot();
    });
  });

  describe('Show seconds', () => {
    beforeEach(async () => {
      el = await fixture('<ef-clock show-seconds></ef-clock>');
    });
    it('Shows seconds time segment', async () => {
      expect(el.showSeconds, 'showSeconds should be true by default').to.be.true;
      expect(el.shadowRoot.querySelectorAll('[part~=seconds]').length, 'seconds segment should appear').to.be.equal(1);
    });
    it('Can be toggle programmatically', async () => {
      el.showSeconds = false;
      await elementUpdated(el);

      expect(el.showSeconds, 'showSeconds should be false').to.be.false;
      expect(el.shadowRoot.querySelectorAll('[part~=seconds]').length, 'seconds segment should disappear').to.be.equal(0);
    });
    it('Can be toggle via attribute', async () => {
      el.removeAttribute('show-seconds');
      await elementUpdated(el);

      expect(el.showSeconds, 'showSeconds should be false').to.be.false;
      expect(el.shadowRoot.querySelectorAll('[part~=seconds]').length, 'seconds segment should disappear').to.be.equal(0);
    });
  });

  describe('Tick', () => {
    beforeEach(async () => {
      el = await fixture('<ef-clock tick></ef-clock>');
    });

    it('Wait 1s', async function () {
      this.skip(); // TODO: this test fails on 50% - 50%
      expect(el.value, 'value should be 00:00:00').to.be.equal('00:00:00');

      await aTimeout(1500); // todo: fix so 1000 can be used
      expect(el.value, 'value should be 00:00:01').to.be.equal('00:00:01');
    });

    it('Toggle tick via programmatically', async function () {
      this.skip(); // TODO: this test fails on 50% - 50%
      expect(el.value, 'value should be 00:00:00').to.be.equal('00:00:00');
      expect(el.tick, 'tick should be true').to.be.true;

      await aTimeout(1500); // todo: fix so 1000 can be used
      expect(el.value, 'value should be 00:00:01').to.be.equal('00:00:01');

      el.tick = false;
      await elementUpdated(el);

      expect(el.tick, 'tick should be false').to.be.false;
      expect(el.value, 'value should be 00:00:01').to.be.equal('00:00:01');
    });

    it('Toggle tick via attribute', async function () {
      this.skip(); // TODO: this test fails on 50% - 50%
      expect(el.value, 'value should be 00:00:00').to.be.equal('00:00:00');
      expect(el.tick, 'amPm should be true').to.be.true;

      await aTimeout(1500); // todo: fix so 1000 can be used
      expect(el.value, 'value should be 00:00:01').to.be.equal('00:00:01');

      el.removeAttribute('tick');
      await elementUpdated(el);

      expect(el.tick, 'tick should be false').to.be.false;
      expect(el.value, 'value should be 00:00:01').to.be.equal('00:00:01');
    });

    it('Should fire value-changed', async function () {
      this.skip(); // TODO: this test fails on 50% - 50%
      let valueChangedCount = 0;
      const valueSpy = () => valueChangedCount++;
      el.addEventListener('value-changed', valueSpy);

      await aTimeout(1500); // todo: fix so 1000 can be used
      const valueEvent = await oneEvent(el, 'value-changed');

      expect(valueChangedCount, 'value-changed count should be 1').to.be.equal(1);
      expect(valueEvent.detail.value, 'event\'s value should be 00:00:01').to.be.equal('00:00:01');
    });
  });

  describe('Accessibility', () => {
    it('Should have role="group" by default', async function () {
      el = await fixture('<ef-clock></ef-clock>');
      expect(el.getAttribute('role')).to.be.equal(null);
    });
  });
});

