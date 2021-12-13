// Keyboard navigation test
import { expect, fixture } from '@refinitiv-ui/test-helpers';
import {
  up,
  down,
  left,
  right,
  home,
  end,
  setMonthView,
  setYearView
} from './utils';

const cellIndex = (calendarEl) => String(calendarEl.activeCellIndex); // access private property

describe('calendar/KeyboardNavigation', () => {
  describe('Day View', () => {
    it('Can navigate over a single month using arrows keys', async () => {
      const el = await fixture('<ef-calendar view="2005-04" lang="en-GB"></ef-calendar>');
      const renderRoot = el.renderRoot;
      await right(renderRoot);
      expect(cellIndex(el)).to.equal('4,0', 'Right: 01/04/2005 should be selected');
      await right(renderRoot);
      expect(cellIndex(el)).to.equal('5,0', 'Right: 02/04/2005 should be selected');
      await down(renderRoot);
      expect(cellIndex(el)).to.equal('5,1', 'Down: 09/04/2005 should be selected');
      await left(renderRoot);
      expect(cellIndex(el)).to.equal('4,1', 'Left: 08/04/2005 should be selected');
      await up(renderRoot);
      expect(cellIndex(el)).to.equal('4,0', 'Up: 01/04/2005 should be selected');
      await end(renderRoot);
      expect(cellIndex(el)).to.equal('5,4', 'End: 30/04/2005 should be selected');
      await home(renderRoot);
      expect(cellIndex(el)).to.equal('4,0', 'Home: 01/04/2005 should be selected');
    });
    it('Can switch months using arrow keys', async () => {
      const el = await fixture('<ef-calendar view="2005-04" lang="en-GB"></ef-calendar>');
      const renderRoot = el.renderRoot;
      await right(renderRoot);
      await left(renderRoot);
      expect(el).shadowDom.to.equalSnapshot();
      await right(renderRoot);
      expect(el).shadowDom.to.equalSnapshot();
    });
    it('Cannot navigate over disabled dates', async () => {
      const el = await fixture('<ef-calendar view="2005-04" lang="en-GB" weekends-only></ef-calendar>');
      const renderRoot = el.renderRoot;
      await right(renderRoot);
      expect(cellIndex(el)).to.equal('5,0', 'Right: 02/04/2005 should be selected');
      await right(renderRoot);
      await right(renderRoot);
      expect(cellIndex(el)).to.equal('5,1', 'Right: 09/04/2005 should be selected');
      await left(renderRoot);
      expect(cellIndex(el)).to.equal('6,0', 'Left: 03/04/2005 should be selected');
    });
  });

  describe('Month View', () => {
    it('Can navigate over a single year using arrows keys', async () => {
      const el = await fixture('<ef-calendar view="2005-04" lang="en-GB"></ef-calendar>');
      await setMonthView(el);
      const renderRoot = el.renderRoot;
      await right(renderRoot);
      expect(cellIndex(el)).to.equal('0,0', 'Right: 11/2004 should be selected');
      await right(renderRoot);
      expect(cellIndex(el)).to.equal('1,0', 'Right: 12/2004 should be selected');
      await down(renderRoot);
      expect(cellIndex(el)).to.equal('1,1', 'Down: 04/2005 should be selected');
      await left(renderRoot);
      expect(cellIndex(el)).to.equal('0,1', 'Left: 03/2005 should be selected');
      await up(renderRoot);
      expect(cellIndex(el)).to.equal('0,0', 'Up: 11/2004 should be selected');
      await end(renderRoot);
      expect(cellIndex(el)).to.equal('3,3', 'End: 02/2006 should be selected');
      await home(renderRoot);
      expect(cellIndex(el)).to.equal('0,0', 'Home: 11/2004 should be selected');
    });
    it('Can switch years using arrow keys', async () => {
      const el = await fixture('<ef-calendar view="2005-04" lang="en-GB"></ef-calendar>');
      await setMonthView(el);
      const renderRoot = el.renderRoot;
      await right(renderRoot);
      await left(renderRoot);
      expect(el).shadowDom.to.equalSnapshot();
      await right(renderRoot);
      expect(el).shadowDom.to.equalSnapshot();
    });
  });

  describe('Year View', () => {
    it('Can navigate over a single decade using arrows keys', async () => {
      const el = await fixture('<ef-calendar view="2005-04" lang="en-GB"></ef-calendar>');
      await setYearView(el);
      const renderRoot = el.renderRoot;
      await right(renderRoot);
      expect(cellIndex(el)).to.equal('0,0', 'Right: 2000 should be selected');
      await right(renderRoot);
      expect(cellIndex(el)).to.equal('1,0', 'Right: 2001 should be selected');
      await down(renderRoot);
      expect(cellIndex(el)).to.equal('1,1', 'Down: 2005 should be selected');
      await left(renderRoot);
      expect(cellIndex(el)).to.equal('0,1', 'Left: 2004 should be selected');
      await up(renderRoot);
      expect(cellIndex(el)).to.equal('0,0', 'Up: 2000 should be selected');
      await end(renderRoot);
      expect(cellIndex(el)).to.equal('3,3', 'End: 2015 should be selected');
      await home(renderRoot);
      expect(cellIndex(el)).to.equal('0,0', 'Home: 2000 should be selected');
    });
    it('Can switch decades using arrow keys', async () => {
      const el = await fixture('<ef-calendar view="2005-04" lang="en-GB"></ef-calendar>');
      await setYearView(el);
      const renderRoot = el.renderRoot;
      await right(renderRoot);
      await left(renderRoot);
      expect(el).shadowDom.to.equalSnapshot();
      await right(renderRoot);
      expect(el).shadowDom.to.equalSnapshot();
    });
  });
});
