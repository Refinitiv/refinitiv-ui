// import element and theme
import '@refinitiv-ui/elements/calendar';

import '@refinitiv-ui/elemental-theme/light/ef-calendar.js';
import { elementUpdated, expect, fixture } from '@refinitiv-ui/test-helpers';

import { getDateCells, setMonthView, setYearView } from './utils.js';

const listenValueChangeEvent = (el) => {
  const values = [];
  el.addEventListener('value-changed', ({ detail: { value } }) => {
    values.push(value);
  });
  return values;
};

describe('calendar/Multiple', function () {
  describe('Multiple Test', function () {
    describe('Multiple: selected values should be highlighted', function () {
      it('Value should be reflected', async function () {
        const el = await fixture(
          '<ef-calendar view="2005-04" multiple values="2005-04-21,2005-04-24,2009-01-25" lang="en-GB"></ef-calendar>'
        );
        expect(el.value).to.equal('2005-04-21');
        expect(el.values.join(',')).to.equal('2005-04-21,2005-04-24,2009-01-25');
      });
      it('Selected days should be highlighted', async function () {
        const el = await fixture(
          '<ef-calendar view="2005-04" multiple values="2005-04-21,2005-04-24,2009-01-25" lang="en-GB"></ef-calendar>'
        );
        await expect(el).shadowDom.to.equalSnapshot();
      });
      it('Selected months should be highlighted', async function () {
        const el = await fixture(
          '<ef-calendar view="2005-04" multiple values="2005-04-21,2005-04-24,2009-01-25" lang="en-GB"></ef-calendar>'
        );
        await setMonthView(el);
        await expect(el).shadowDom.to.equalSnapshot();
      });
      it('Selected years should be highlighted', async function () {
        const el = await fixture(
          '<ef-calendar view="2005-04" multiple values="2005-04-21,2005-04-24,2009-01-25" lang="en-GB"></ef-calendar>'
        );
        await setYearView(el);
        await expect(el).shadowDom.to.equalSnapshot();
      });
    });
    it('Multiple: should be possible to select values by passing property', async function () {
      const el = await fixture('<ef-calendar view="2005-04" multiple lang="en-GB"></ef-calendar>');
      el.values = ['2005-04-21', '2005-04-24'];
      await expect(el).shadowDom.to.equalSnapshot();
    });
  });

  describe('Navigation Multiple Value', function () {
    it('It should be possible to select multiple values on click', async function () {
      const el = await fixture('<ef-calendar view="2005-04" multiple lang="en-GB"></ef-calendar>');
      const values = listenValueChangeEvent(el);

      const cells = getDateCells(el);
      cells[0].click(); // April 01
      await elementUpdated(el);
      expect(values.length, 'value-changed should fire on click').to.equal(1);
      expect(el.values.join(',')).to.equal('2005-04-01');
      cells[1].click(); // April 02
      await elementUpdated(el);
      expect(values.length, 'value-changed should fire on click').to.equal(2);
      expect(el.values.join(',')).to.equal('2005-04-01,2005-04-02');
      cells[3].click(); // April 04
      await elementUpdated(el);
      expect(values.length, 'value-changed should fire on click').to.equal(3);
      expect(el.values.join(',')).to.equal('2005-04-01,2005-04-02,2005-04-04');
      cells[1].click(); // April 02
      await elementUpdated(el);
      expect(values.length, 'value-changed should fire on click').to.equal(4);
      expect(el.values.join(','), 'Same value is not removed').to.equal('2005-04-01,2005-04-04');
    });
  });
});
