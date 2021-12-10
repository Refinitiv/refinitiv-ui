import { fixture, expect, elementUpdated } from '@refinitiv-ui/test-helpers';

import {
  setMonthView,
  setYearView,
  clickNext,
  clickPrev,
  clickView,
  keyboardEvent,
  getDateCells
} from './utils';

const listenViewChangeEvent = (el) => {
  const viewValues = [];
  el.addEventListener('view-changed', ({ detail: { value } }) => {
    viewValues.push(value);
  });
  return viewValues;
};

// import element and theme
import '@refinitiv-ui/elements/calendar';
import '@refinitiv-ui/elemental-theme/light/ef-calendar.js';

describe('calendar/Navigation', () => {
  describe('Navigation Day', () => {
    it('Day: previous button switches month to previous', async () => {
      const el = await fixture('<ef-calendar view="2020-02" lang="en-GB"></ef-calendar>');
      const viewValues = listenViewChangeEvent(el);
      expect(el, 'Day view: 2020-02').shadowDom.to.equalSnapshot();
      await clickPrev(el);
      expect(el, 'Day view: 2020-01').shadowDom.to.equalSnapshot();
      await clickPrev(el);
      expect(el, 'Day view: 2019-12').shadowDom.to.equalSnapshot();
      expect(viewValues.join(','), 'view-changed event details are wrong').to.equal('2020-01,2019-12');
    });
    it('Day: next button switches month to next', async () => {
      const el = await fixture('<ef-calendar view="2019-11" lang="en-GB"></ef-calendar>');
      const viewValues = listenViewChangeEvent(el);
      expect(el, 'Day view: 2019-11').shadowDom.to.equalSnapshot();
      await clickNext(el);
      expect(el, 'Day view: 2019-12').shadowDom.to.equalSnapshot();
      await clickNext(el);
      expect(el, 'Day view: 2020-01').shadowDom.to.equalSnapshot();
      expect(viewValues.join(','), 'view-changed event details are wrong').to.equal('2019-12,2020-01');
    });
  });

  describe('AD/BC Navigation Day', () => {
    it('AD/BC Day: previous button switches month to previous', async () => {
      const el = await fixture('<ef-calendar view="0001-02" lang="en-GB"></ef-calendar>');
      const viewValues = listenViewChangeEvent(el);
      expect(el, 'Day view: Feb, 1AD').shadowDom.to.equalSnapshot();
      await clickPrev(el);
      expect(el, 'Day view: Jan, 1AD').shadowDom.to.equalSnapshot();
      await clickPrev(el);
      expect(el, 'Day view: Dec, 1BC').shadowDom.to.equalSnapshot();
      expect(viewValues.join(','), 'view-changed event details are wrong').to.equal('0001-01,0000-12');
    });
    it('AD/BC Day: next button switches month to next', async () => {
      const el = await fixture('<ef-calendar view="-000001-11" lang="en-GB"></ef-calendar>');
      const viewValues = listenViewChangeEvent(el);
      expect(el, 'Day view: Nov, 2BC').shadowDom.to.equalSnapshot();
      await clickNext(el);
      expect(el, 'Day view: Dec, 2BC').shadowDom.to.equalSnapshot();
      await clickNext(el);
      expect(el, 'Day view: Jan, 1BC').shadowDom.to.equalSnapshot();
      expect(viewValues.join(','), 'view-changed event details are wrong').to.equal('-000001-12,0000-01');
    });
  });

  describe('Navigation Month', () => {
    it('Month: previous button switches year to previous', async () => {
      const el = await fixture('<ef-calendar view="2019-02" lang="en-GB"></ef-calendar>');
      await setMonthView(el);
      const viewValues = listenViewChangeEvent(el);
      expect(el, 'Month view: 2019').shadowDom.to.equalSnapshot();
      await clickPrev(el);
      expect(el, 'Month view: 2018').shadowDom.to.equalSnapshot();
      await clickPrev(el);
      expect(el, 'Month view: 2017').shadowDom.to.equalSnapshot();
      expect(viewValues.join(','), 'view-changed event details are wrong').to.equal('2018-02,2017-02');
    });
    it('Month: next button switches year to next', async () => {
      const el = await fixture('<ef-calendar view="2017-11" lang="en-GB"></ef-calendar>');
      await setMonthView(el);
      const viewValues = listenViewChangeEvent(el);
      expect(el, 'Month view: 2017').shadowDom.to.equalSnapshot();
      await clickNext(el);
      expect(el, 'Month view: 2018').shadowDom.to.equalSnapshot();
      await clickNext(el);
      expect(el, 'Month view: 2019').shadowDom.to.equalSnapshot();
      expect(viewValues.join(','), 'view-changed event details are wrong').to.equal('2018-11,2019-11');
    });
  });

  describe('AD/BC Navigation Month', () => {
    it('AD/BC Month: previous button switches year to previous', async () => {
      const el = await fixture('<ef-calendar view="0001-02" lang="en-GB"></ef-calendar>');
      await setMonthView(el);
      const viewValues = listenViewChangeEvent(el);
      expect(el, 'Month view: 1AD').shadowDom.to.equalSnapshot();
      await clickPrev(el);
      expect(el, 'Month view: 1BC').shadowDom.to.equalSnapshot();
      await clickPrev(el);
      expect(el, 'Month view: 2BC').shadowDom.to.equalSnapshot();
      expect(viewValues.join(','), 'view-changed event details are wrong').to.equal('0000-02,-000001-02');
    });
    it('AD/BC Month: next button switches year to next', async () => {
      const el = await fixture('<ef-calendar view="-000001-11" lang="en-GB"></ef-calendar>');
      await setMonthView(el);
      const viewValues = listenViewChangeEvent(el);
      expect(el, 'Month view: 2BC').shadowDom.to.equalSnapshot();
      await clickNext(el);
      expect(el, 'Month view: 1BC').shadowDom.to.equalSnapshot();
      await clickNext(el);
      expect(el, 'Month view: 1AD').shadowDom.to.equalSnapshot();
      expect(viewValues.join(','), 'view-changed event details are wrong').to.equal('0000-11,0001-11');
    });
  });

  describe('Navigation Year', () => {
    it('Year: previous button switches decade to previous', async () => {
      const el = await fixture('<ef-calendar view="1974-04" lang="en-GB"></ef-calendar>');
      await setYearView(el);
      const viewValues = listenViewChangeEvent(el);
      expect(el, 'Year view: 1968-1983').shadowDom.to.equalSnapshot();
      await clickPrev(el);
      expect(el, 'Year view: 1952-1967').shadowDom.to.equalSnapshot();
      await clickPrev(el);
      expect(el, 'Year view: 1936-1951').shadowDom.to.equalSnapshot();
      expect(viewValues.join(','), 'view-changed event details are wrong').to.equal('1958-04,1942-04');
    });
    it('Year: next button switches decade to next', async () => {
      const el = await fixture('<ef-calendar view="1900-01" lang="en-GB"></ef-calendar>');
      await setYearView(el);
      const viewValues = listenViewChangeEvent(el);
      expect(el, 'Year view: 1888-1903').shadowDom.to.equalSnapshot();
      await clickNext(el);
      expect(el, 'Year view: 1904-1919').shadowDom.to.equalSnapshot();
      await clickNext(el);
      expect(el, 'Year view: 1920-1935').shadowDom.to.equalSnapshot();
      expect(viewValues.join(','), 'view-changed event details are wrong').to.equal('1916-01,1932-01');
    });
  });

  describe('AD/BC Navigation Year', () => {
    it('AD/BC Year: previous button switches decade to previous', async () => {
      const el = await fixture('<ef-calendar view="0017-04" lang="en-GB"></ef-calendar>');
      await setYearView(el);
      const viewValues = listenViewChangeEvent(el);
      expect(el, 'Year view: 16AD - 31AD').shadowDom.to.equalSnapshot();
      await clickPrev(el);
      expect(el, 'Year view: 1BC - 15AD').shadowDom.to.equalSnapshot();
      await clickPrev(el);
      expect(el, 'Year view: 17BC - 2BC').shadowDom.to.equalSnapshot();
      expect(viewValues.join(','), 'view-changed event details are wrong').to.equal('0001-04,-000015-04');
    });
    it('AD/BC Year: next button switches decade to next', async () => {
      const el = await fixture('<ef-calendar view="-000015-01" lang="en-GB"></ef-calendar>');
      await setYearView(el);
      const viewValues = listenViewChangeEvent(el);
      expect(el, 'Year view: 17BC - 2BC').shadowDom.to.equalSnapshot();
      await clickNext(el);
      expect(el, 'Year view: 1BC - 15AD').shadowDom.to.equalSnapshot();
      await clickNext(el);
      expect(el, 'Year view: 16AD - 31AD').shadowDom.to.equalSnapshot();
      expect(viewValues.join(','), 'view-changed event details are wrong').to.equal('0001-01,0017-01');
    });
  });

  describe('View Change', () => {
    it('View button should change views', async () => {
      const el = await fixture('<ef-calendar view="2005-04" lang="en-GB"></ef-calendar>');
      expect(el, 'Day view: 2005-04').shadowDom.to.equalSnapshot();
      await clickView(el);
      expect(el, 'Year view: 2000-2015').shadowDom.to.equalSnapshot();
      await clickView(el);
      expect(el, 'Day view: 2005-04').shadowDom.to.equalSnapshot();
      await setMonthView(el);
      expect(el, 'Month view: 2005').shadowDom.to.equalSnapshot();
      await clickView(el);
      expect(el, 'Day view: 2005-04').shadowDom.to.equalSnapshot();
    });
  });

  describe('View Change Tap', () => {
    it('View should change on tap', async () => {
      const el = await fixture('<ef-calendar view="2005-04" lang="en-GB"></ef-calendar>');
      await setYearView(el);
      expect(el, 'Year view: 2000-2015').shadowDom.to.equalSnapshot();
      const cell2001 = getDateCells(el)[1];
      cell2001.click();
      await elementUpdated(el);
      expect(el, 'Month view: 2001').shadowDom.to.equalSnapshot();
      const cellJan2001 = getDateCells(el)[2];
      cellJan2001.click();
      expect(el, 'Day view: 2001-01').shadowDom.to.equalSnapshot();
    });

    it('Clicking on previous year month should switch years', async () => {
      const el = await fixture('<ef-calendar view="2005-04" lang="en-GB"></ef-calendar>');
      await setMonthView(el);
      const cellNov2004 = getDateCells(el)[0];
      cellNov2004.click();
      expect(el, 'Day view: 2004-11').shadowDom.to.equalSnapshot();
    });

    it('Clicking on next year month should switch years', async () => {
      const el = await fixture('<ef-calendar view="2005-04" lang="en-GB"></ef-calendar>');
      await setMonthView(el);
      const cellFeb2005 = getDateCells(el)[15];
      cellFeb2005.click();
      expect(el, 'Day view: 2005-02').shadowDom.to.equalSnapshot();
    });
  });

  describe('Vew Change Keyboard', async () => {
    it('Pressing escape key on month view should return to day view', async () => {
      const el = await fixture('<ef-calendar view="2005-04" lang="en-GB"></ef-calendar>');
      await setMonthView(el);
      await keyboardEvent(el.shadowRoot.querySelector('[part=table]'), 'Escape');
      expect(el, 'Day view: 2005-04').shadowDom.to.equalSnapshot();
    });
    it('Pressing escape key on year view should return to day view', async () => {
      const el = await fixture('<ef-calendar view="2005-04" lang="en-GB"></ef-calendar>');
      await setYearView(el);
      await keyboardEvent(el.shadowRoot.querySelector('[part=table]'), 'Escape');
      expect(el, 'Day view: 2005-04').shadowDom.to.equalSnapshot();
    });
  });

  describe('View Change Event', async () => {
    it('Prevent default should stop view-change event', async () => {
      const el = await fixture('<ef-calendar view="2005-04" lang="en-GB"></ef-calendar>');
      el.addEventListener('view-changed', (event) => {
        event.preventDefault();
      });
      await clickNext(el);
      expect(el, 'Day view: 2005-04').shadowDom.to.equalSnapshot();
      await clickPrev(el);
      expect(el, 'Day view: 2005-04').shadowDom.to.equalSnapshot();
    });
  });

  describe('Disabled Navigation', async function () {
    it('It should not be possible to navigate over disabled calendar', async function () {
      this.skip(); /* a bug with ef-button, which is clickable when parent disabled */
      const el = await fixture('<ef-calendar disabled view="2005-04" lang="en-GB"></ef-calendar>');
      await clickPrev(el);
      expect(el.view, 'When disabled, clicking on previous should not change views').to.equal('2005-04');
      await clickNext(el);
      expect(el.view, 'When disabled, clicking on next should not change views').to.equal('2005-04');
      await clickView(el);
      expect(el.view, 'When disabled, clicking on view should not change views').to.equal('2005-04');
    });
  });
});
