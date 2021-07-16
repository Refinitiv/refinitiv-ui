import { fixture, expect, elementUpdated } from '@refinitiv-ui/test-helpers';

import {
  setMonthView,
  setYearView,
  clickNext
} from './utils';

// import element and theme
import '@refinitiv-ui/elements/calendar';
import '@refinitiv-ui/elemental-theme/light/ef-calendar.js';

const listenValueChangeEvent = (el) => {
  const values = [];
  el.addEventListener('value-changed', ({ detail: { value } }) => {
    values.push(value);
  });
  return values;
};

describe('calendar/Range', () => {
  describe('Range', () => {
    it('Range: selected values should be highlighted', async () => {
      const el = await fixture('<ef-calendar range view="2005-04" values="2005-04-01,2005-04-01" lang="en-GB"></ef-calendar>');
      expect(el).shadowDom.to.equalSnapshot();
      await setMonthView(el);
      expect(el).shadowDom.to.equalSnapshot();
      await setYearView(el);
      expect(el).shadowDom.to.equalSnapshot();
    });
    it('Range: selected values should be highlighted across months and years', async () => {
      const el = await fixture('<ef-calendar range view="2005-04" values="2005-03-01,2009-04-01" lang="en-GB"></ef-calendar>');
      expect(el).shadowDom.to.equalSnapshot();
      await setMonthView(el);
      expect(el).shadowDom.to.equalSnapshot();
      await setYearView(el);
      expect(el).shadowDom.to.equalSnapshot();
    });
    it('AD/BC Range: selected values should be highlighted', async () => {
      const el = await fixture('<ef-calendar range view="-000011-04" values="-000011-04-04,-000011-04-21" lang="en-GB"></ef-calendar>');
      expect(el).shadowDom.to.equalSnapshot();
      await setMonthView(el);
      expect(el).shadowDom.to.equalSnapshot();
      await setYearView(el);
      expect(el).shadowDom.to.equalSnapshot();
    });
  });

  describe('Navigation Range Value', () => {
    it('It should be possible to select range values on click', async () => {
      const el = await fixture('<ef-calendar range view="2005-04" lang="en-GB"></ef-calendar>');
      const values = listenValueChangeEvent(el);

      let cells = el.shadowRoot.querySelectorAll('[part="cell day"][tabindex]');
      cells[5].click(); // April 06
      await elementUpdated(el);
      expect(values.length, 'value-changed should fire on click').to.equal(1);
      expect(el.values.join(','), 'from should be populated').to.equal('2005-04-06');
      expect(el).shadowDom.to.equalSnapshot();

      cells[9].click(); // April 10
      await elementUpdated(el);
      expect(values.length, 'value-changed should fire on click').to.equal(2);
      expect(el.values.join(','), 'to should be populated').to.equal('2005-04-06,2005-04-10');
      expect(el).shadowDom.to.equalSnapshot();

      cells[12].click(); // April 13
      await elementUpdated(el);
      expect(values.length, 'value-changed should fire on click').to.equal(3);
      expect(el.values.join(','), 'from should be populated if range was previously set').to.equal('2005-04-13');
      expect(el).shadowDom.to.equalSnapshot();

      cells[11].click(); // April 12
      await elementUpdated(el);
      expect(values.length, 'value-changed should fire on click').to.equal(4);
      expect(el.values.join(','), 'from should be populated is to is smaller than from').to.equal('2005-04-12');
      expect(el).shadowDom.to.equalSnapshot();

      await clickNext(el); // May
      cells = el.shadowRoot.querySelectorAll('[part="cell day"][tabindex]');
      cells[1].click(); // May 02
      expect(values.length, 'value-changed should fire on click').to.equal(5);
      expect(el.values.join(','), 'range should populate through views').to.equal('2005-04-12,2005-05-02');
      expect(el).shadowDom.to.equalSnapshot();
    });
  });
});
