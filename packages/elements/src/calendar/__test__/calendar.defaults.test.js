// import element and theme
import '@refinitiv-ui/elements/calendar';

import '@refinitiv-ui/elemental-theme/light/ef-calendar.js';
import { elementUpdated, expect, fixture, isFirefox, nextFrame } from '@refinitiv-ui/test-helpers';
import { isSafari } from '@refinitiv-ui/utils';
import { parse } from '@refinitiv-ui/utils';

import { RenderView } from '../../../lib/calendar/constants.js';
import { setMonthView, setYearView } from './utils';

describe('calendar/Defaults', () => {
  describe('Defaults Test', () => {
    it('Check default properties', async () => {
      const el = await fixture('<ef-calendar></ef-calendar>');
      expect(el.value, 'value should not be set').to.equal('');
      expect(el.values.join(''), 'values should not be set').to.equal('');
      expect(el.min, 'min should not be set').to.equal('');
      expect(el.max, 'max should not be set').to.equal('');
      expect(el.range, 'range should not be set').to.equal(false);
      expect(el.multiple, 'multiple should not be set').to.equal(false);
      expect(el.disabled, 'disabled should not be set').to.equal(false);
      expect(el.readonly, 'readonly should not be set').to.equal(false);
      expect(el.weekdaysOnly, 'weekdaysOnly should not be set').to.equal(false);
      expect(el.weekendsOnly, 'weekendsOnly should not be set').to.equal(false);
      expect(el.filter, 'filter should not be set').to.equal(null);
    });
    it("Today's date should have additional attribute set", async () => {
      const el = await fixture('<ef-calendar lang="en-GB"></ef-calendar>');
      const now = new Date();
      const todayCells = el.shadowRoot.querySelectorAll('div[today]');
      expect(todayCells.length, 'Incorrect view or only one cell should be set to today').to.equal(1);
      expect(todayCells[0].textContent.trim(), 'Invalid cell is set to today').to.equal(
        now.getDate().toString()
      );
    });
    it('fill-cells should fill empty cells', async () => {
      const el = await fixture('<ef-calendar view="2005-04" fill-cells lang="en-GB"></ef-calendar>');
      expect(el.fillCells, 'fill-cells is not propagated').to.equal(true);
      await expect(el).shadowDom.to.equalSnapshot();
    });
    describe('DOM structure is correct for 2005-04', async () => {
      it('Render view should be DAY ', async () => {
        const el = await fixture('<ef-calendar view="2005-04" lang="en-GB"></ef-calendar>');
        expect(el.view, 'View property is not propagated').to.equal('2005-04');
        expect(el.renderView).to.equal(RenderView.DAY);
        await expect(el).shadowDom.to.equalSnapshot();
      });
      it('Render view should be MONTH', async () => {
        const el = await fixture('<ef-calendar view="2005-04" lang="en-GB"></ef-calendar>');
        expect(el.view, 'View property is not propagated').to.equal('2005-04');
        await setMonthView(el);
        expect(el.renderView).to.equal(RenderView.MONTH);
        await expect(el).shadowDom.to.equalSnapshot();
      });
      it('Render view should be YEAR', async () => {
        const el = await fixture('<ef-calendar view="2005-04" lang="en-GB"></ef-calendar>');
        expect(el.view, 'View property is not propagated').to.equal('2005-04');
        await setYearView(el);
        expect(el.renderView, 'Render view should be YEAR').to.equal(RenderView.YEAR);
        await expect(el).shadowDom.to.equalSnapshot();
      });
    });
  });

  describe('Locales', async () => {
    it('German locale', async () => {
      const el = await fixture('<ef-calendar view="2005-04" lang="de"></ef-calendar>');
      await expect(el).shadowDom.to.equalSnapshot();
    });

    it('Thai locale', async function () {
      (isFirefox() || isSafari()) && this.skip(); // Safari and Firefox 109 render text different from other browsers
      const el = await fixture('<ef-calendar view="2005-04" lang="de"></ef-calendar>');
      el.lang = 'th';
      await nextFrame();
      await expect(el, 'Thai locale is incorrect').shadowDom.to.equalSnapshot();
    });
  });

  describe('First Day Of Week', () => {
    it('First day of week should change', async () => {
      const el = await fixture(
        '<ef-calendar view="2005-04" lang="en-GB" first-day-of-week="4"></ef-calendar>'
      );
      expect(el.firstDayOfWeek, 'first-day-of-week is not propagated').to.equal(4);
      await expect(el).shadowDom.to.equalSnapshot();
    });

    it('Should be possible to set first day of week to 0', async () => {
      const el = await fixture('<ef-calendar view="2005-04" lang="ru" first-day-of-week="0"></ef-calendar>');
      expect(el.firstDayOfWeek, 'first-day-of-week is not propagated').to.equal(0);
    });
  });

  describe('Weekends Only Option', () => {
    it('Should support weekends only option', async () => {
      const el = await fixture('<ef-calendar weekends-only view="2005-04" lang="en-GB"></ef-calendar>');
      expect(el.weekendsOnly, 'weekends-only is not propagated').to.equal(true);
      await expect(el).shadowDom.to.equalSnapshot();
    });
  });

  describe('Weekdays Only Option', () => {
    it('Should support weekdays only option', async () => {
      const el = await fixture('<ef-calendar weekdays-only view="2005-04" lang="en-GB"></ef-calendar>');
      expect(el.weekdaysOnly, 'weekdays-only is not propagated').to.equal(true);
      await expect(el).shadowDom.to.equalSnapshot();
    });
  });

  describe('Min Value', () => {
    it('Should support min value', async () => {
      const el = await fixture('<ef-calendar min="2005-04-05" view="2005-04" lang="en-GB"></ef-calendar>');
      expect(el.min, 'min is not propagated').to.equal('2005-04-05');
      await expect(el).shadowDom.to.equalSnapshot();
    });
  });

  describe('Max Value', () => {
    it('Should support max value', async () => {
      const el = await fixture('<ef-calendar max="2005-04-25" view="2005-04" lang="en-GB"></ef-calendar>');
      expect(el.max, 'max is not propagated').to.equal('2005-04-25');
      await expect(el).shadowDom.to.equalSnapshot();
    });
  });

  describe('Custom Filter', () => {
    it('Should support custom filter (Odds Only)', async () => {
      const el = await fixture('<ef-calendar view="2005-04" lang="en-GB"></ef-calendar>');
      el.filter = function (value) {
        const date = parse(value);
        return date.getDate() % 2;
      };
      await elementUpdated(el);
      await expect(el).shadowDom.to.equalSnapshot();
    });
    it('Should support custom filter combined with default filters', async () => {
      const el = await fixture(
        '<ef-calendar view="2005-04" min="2005-04-03" max="2005-04-25" weekdays-only lang="en-GB"></ef-calendar>'
      );
      el.filter = function (value) {
        const date = parse(value);
        return date.getDate() % 2;
      };
      await elementUpdated(el);
      await expect(el).shadowDom.to.equalSnapshot();
    });
  });
});
