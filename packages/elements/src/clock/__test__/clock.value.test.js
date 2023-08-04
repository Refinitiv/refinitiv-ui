import '@refinitiv-ui/elements/clock';

import '@refinitiv-ui/elemental-theme/light/ef-clock.js';
import { elementUpdated, expect, fixture } from '@refinitiv-ui/test-helpers';

describe('clock/Value', function () {
  let el;
  describe('Value', function () {
    beforeEach(async function () {
      el = await fixture('<ef-clock></ef-clock>');
    });
    it('Shows correct time when setting value', async function () {
      el.value = '15:25:35';
      await elementUpdated(el);
      expect(el.value, 'value should be 15:25:35').to.be.equal('15:25:35');
    });
    it('Formats 15:25 to HH:mm:ss', async function () {
      el.value = '15:25';
      await elementUpdated(el);
      expect(el.value, 'value should be 15:25:00').to.be.equal('15:25:00');
    });
    it('Resets when invalid value is set', async function () {
      el.value = '5244';
      await elementUpdated(el);
      expect(el.value, 'value should reset').to.be.equal('00:00:00');
    });
    it('Resets when 12:3 is set', async function () {
      el.value = '12:3';
      await elementUpdated(el);
      expect(el.value, 'value should reset').to.be.equal('00:00:00');
    });
    it('Resets when 12:60 is set', async function () {
      el.value = '12:60';
      await elementUpdated(el);
      expect(el.value, 'value should reset').to.be.equal('00:00:00');
    });
    it('Should not fire value-changed when programmatically set', async function () {
      let valueChangedCount = 0;
      const valueSpy = () => valueChangedCount++;
      el.addEventListener('value-changed', valueSpy);

      el.value = '13:00:00';
      await elementUpdated(el);
      expect(valueChangedCount, 'value-changed count should be 0').to.be.equal(0);
    });
  });

  describe('Offset', function () {
    beforeEach(async function () {
      el = await fixture('<ef-clock></ef-clock>');
    });

    it('Shows correct display time when offset is set', async function () {
      el.offset = 3723; // 3600 + 120 + 3
      await elementUpdated(el);
      expect(el.displayHours, 'hours should be 1').to.be.equal(1);
      expect(el.displayMinutes, 'minutes should be 2').to.be.equal(2);
      expect(el.displaySeconds, 'seconds should be 3').to.be.equal(3);
    });

    it('Resets display time to 00:00:00 when invalid offset is set', async function () {
      el.offset = 'abc{}123';
      await elementUpdated(el);
      expect(el.offset, 'offset should be 0').to.be.equal(0);
      expect(el.displayHours, 'hours should be 0').to.be.equal(0);
      expect(el.displayMinutes, 'minutes should be 0').to.be.equal(0);
      expect(el.displaySeconds, 'seconds should be 0').to.be.equal(0);
    });
    it('Should color on segment when offset is set', async function () {
      el.showSeconds = true;
      await elementUpdated(el);

      expect(
        el.shadowRoot.querySelector('[part~=shifted][part~=hours]'),
        'hours segment should not color by default'
      ).to.be.null;
      expect(
        el.shadowRoot.querySelector('[part~=shifted][part~=minutes]'),
        'minutes segment should not color by default'
      ).to.be.null;
      expect(
        el.shadowRoot.querySelector('[part~=shifted][part~=seconds]'),
        'seconds segment should not color by default'
      ).to.be.null;

      el.offset = 3600;
      await elementUpdated(el);
      expect(el.shadowRoot.querySelector('[part~=shifted][part~=hours]'), 'hours segment should color').to.be
        .not.null;

      el.offset = 60;
      await elementUpdated(el);
      expect(el.shadowRoot.querySelector('[part~=shifted][part~=minutes]'), 'minutes segment should color').to
        .be.not.null;

      el.offset = 5;
      await elementUpdated(el);
      expect(el.shadowRoot.querySelector('[part~=shifted][part~=seconds]'), 'seconds segment should color').to
        .be.not.null;

      el.offset = 3665;
      await elementUpdated(el);
      expect(el.shadowRoot.querySelector('[part~=shifted][part~=hours]'), 'hours segment should color').to.be
        .not.null;
      expect(el.shadowRoot.querySelector('[part~=shifted][part~=minutes]'), 'minutes segment should color').to
        .be.not.null;
      expect(el.shadowRoot.querySelector('[part~=shifted][part~=seconds]'), 'seconds segment should color').to
        .be.not.null;
    });
    it('Should not fire offset-changed when offset is programmatically set', async function () {
      let offsetChangedCount = 0;
      const offsetSpy = () => offsetChangedCount++;
      el.addEventListener('offset-changed', offsetSpy);

      el.offset = 3600;
      await elementUpdated(el);
      expect(offsetChangedCount, 'offset-changed count should be 0').to.be.equal(0);
    });
  });

  describe('AM-PM', function () {
    beforeEach(async function () {
      el = await fixture('<ef-clock am-pm></ef-clock>');
    });

    it('Should be AM when 01:00:00 is set', async function () {
      el.value = '01:00:00';
      await elementUpdated(el);

      expect(el.displayAmPm, '01:00:00 should in AM time').to.equal('AM');
    });
    it('Should be PM when 13:00:00 is set', async function () {
      el.value = '13:00:00';
      await elementUpdated(el);

      expect(el.displayAmPm, '13:00:00 should in PM time').to.equal('PM');
    });

    it('Converts hour into am-pm format', async function () {
      el.value = '13:00:00';
      await elementUpdated(el);

      expect(el.displayHours, '13 in 24hrs format should be 1 in 12hrs format').to.be.equal(1);
    });

    it('Toggle amPm via programmatically', async function () {
      expect(el.amPm, 'amPm should be true').to.be.true;
      expect(
        el.shadowRoot.querySelectorAll('[part~=am-pm]').length,
        'am-pm segment should appear'
      ).to.be.equal(1);

      el.amPm = false;
      await elementUpdated(el);

      expect(el.amPm, 'amPm should be false').to.be.false;
      expect(
        el.shadowRoot.querySelectorAll('[part~=am-pm]').length,
        'am-pm segment should disappear'
      ).to.be.equal(0);
    });

    it('Toggle amPm via attribute', async function () {
      expect(el.amPm, 'amPm should be true').to.be.true;
      expect(
        el.shadowRoot.querySelectorAll('[part~=am-pm]').length,
        'am-pm segment should appear'
      ).to.be.equal(1);

      el.removeAttribute('am-pm');
      await elementUpdated(el);

      expect(el.amPm, 'amPm should be false').to.be.false;
      expect(
        el.shadowRoot.querySelectorAll('[part~=am-pm]').length,
        'am-pm segment should disappear'
      ).to.be.equal(0);
    });
  });
});
