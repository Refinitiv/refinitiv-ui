import { fixture, expect, elementUpdated } from '@refinitiv-ui/test-helpers';

import {
  setMonthView,
  setYearView,
  keyboardEvent,
  getDateCells
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

describe('calendar/Value', () => {
  describe('Value Is Selected', () => {
    describe('Selected value should be highlighted when set as attribute', () => {
      it('Selected value should be reflected to property', async () => {
        const el = await fixture('<ef-calendar value="2005-04-21" lang="en-GB"></ef-calendar>');
        expect(el.value, 'value is not reflected to property').to.equal('2005-04-21');
        expect(el.values.join(','), 'values is not reflected to value').to.equal('2005-04-21');
      });
      it('Selected value should be highlighted in day view', async () => {
        const el = await fixture('<ef-calendar value="2005-04-21" lang="en-GB"></ef-calendar>');
        await expect(el).shadowDom.to.equalSnapshot();
      });
      it('Selected value should be highlighted in day month', async () => {
        const el = await fixture('<ef-calendar value="2005-04-21" lang="en-GB"></ef-calendar>');
        await setMonthView(el);
        await expect(el).shadowDom.to.equalSnapshot();
      });
      it('Selected value should be highlighted in day year', async () => {
        const el = await fixture('<ef-calendar value="2005-04-21" lang="en-GB"></ef-calendar>');
        await setYearView(el);
        await expect(el).shadowDom.to.equalSnapshot();
      });
    });
    it('Selected value should be highlighted when set as property', async () => {
      const el = await fixture('<ef-calendar lang="en-GB"></ef-calendar>');
      const values = listenValueChangeEvent(el);
      el.value = '2005-04-21';
      await elementUpdated(el);
      await expect(el).shadowDom.to.equalSnapshot();
      expect(values.join(','), 'External value change should not fire value-changed').to.equal('');
      expect(el.values.join(','), 'values is not reflected to value').to.equal('2005-04-21');
    });
    it('It should be possible to clear the value', async () => {
      const el = await fixture('<ef-calendar value="2005-04-21" lang="en-GB"></ef-calendar>');
      el.value = '';
      await elementUpdated(el);
      expect(el.value, 'value is not clear').to.equal('');
      expect(el.shadowRoot.querySelector('[selected]'), 'selected flag is not removed').to.equal(null);
    });
    describe('AD/BC selected value should be highlighted', () => {
      it('Selected value should be reflected to property', async () => {
        const el = await fixture('<ef-calendar value="-000011-04-21" lang="en-GB"></ef-calendar>');
        expect(el.value, 'value is not reflected to property').to.equal('-000011-04-21');
        expect(el.values.join(','), 'values is not reflected to value').to.equal('-000011-04-21');
      });
      it('Selected value should be highlighted in day view', async () => {
        const el = await fixture('<ef-calendar value="-000011-04-21" lang="en-GB"></ef-calendar>');
        await expect(el).shadowDom.to.equalSnapshot();
      });
      it('Selected value should be highlighted in day month', async () => {
        const el = await fixture('<ef-calendar value="-000011-04-21" lang="en-GB"></ef-calendar>');
        await setMonthView(el);
        await expect(el).shadowDom.to.equalSnapshot();
      });
      it('Selected value should be highlighted in day year', async () => {
        const el = await fixture('<ef-calendar value="-000011-04-21" lang="en-GB"></ef-calendar>');
        await setYearView(el);
        await expect(el).shadowDom.to.equalSnapshot();
      });
    });
  });

  describe('Navigation Value', () => {
    describe('It should be possible to select value on click', () => {
      it('Selected value should be reflected to property when clicked', async () => {
        const el = await fixture('<ef-calendar view="2005-04" lang="en-GB"></ef-calendar>');
        const values = listenValueChangeEvent(el);
        const cells = getDateCells(el);
        cells[0].click(); // April 01
        await elementUpdated(el);
        expect(el.value, 'value is not set').to.equal('2005-04-01');
        cells[29].click(); // April 30
        await elementUpdated(el);
        expect(values.join(','), 'value-changed should fire on click').to.equal('2005-04-01,2005-04-30');
        expect(el.value, 'value is not set').to.equal('2005-04-30');
        expect(el.values.join(','), 'values is not set').to.equal('2005-04-30');
      });
      it('Selected value should be highlighted when clicked', async () => {
        const el = await fixture('<ef-calendar view="2005-04" lang="en-GB"></ef-calendar>');
        const cells = getDateCells(el);
        cells[0].click(); // April 01
        await elementUpdated(el);
        await expect(el).shadowDom.to.equalSnapshot();
      });
    });
    describe('AD/BC It should be possible to select value on click', () => {
      it('Selected value should be reflected to property when clicked', async () => {
        const el = await fixture('<ef-calendar view="-000011-04" lang="en-GB"></ef-calendar>');
        const values = listenValueChangeEvent(el);
        const cells = getDateCells(el);
        cells[0].click(); // April 01
        await elementUpdated(el);
        expect(el.value, 'value is not set').to.equal('-000011-04-01');
        cells[29].click(); // April 30
        await elementUpdated(el);
        expect(values.join(','), 'value-changed should fire on click').to.equal('-000011-04-01,-000011-04-30');
        expect(el.value, 'value is not set').to.equal('-000011-04-30');
        expect(el.values.join(','), 'values is not set').to.equal('-000011-04-30');
      });
      it('Selected value should be highlighted when clicked', async () => {
        const el = await fixture('<ef-calendar view="-000011-04" lang="en-GB"></ef-calendar>');
        const cells = getDateCells(el);
        cells[0].click(); // April 01
        await elementUpdated(el);
        await expect(el).shadowDom.to.equalSnapshot();
      });
    });

    it('It should be possible to select value on Spacebar', async () => {
      const el = await fixture('<ef-calendar view="2005-04" lang="en-GB"></ef-calendar>');
      const cells = getDateCells(el);
      await keyboardEvent(cells[0], ' ');
      await keyboardEvent(cells[0], ' ', 'keyup'); // April 01
      expect(el.value, 'value is not set').to.equal('2005-04-01');
    });

    it('It should be possible to select value on \' \' ', async () => {
      const el = await fixture('<ef-calendar view="2005-04" lang="en-GB"></ef-calendar>');
      const cells = getDateCells(el);
      await keyboardEvent(cells[0], ' ');
      await keyboardEvent(cells[0], ' ', 'keyup'); // April 01
      expect(el.value, 'value is not set').to.equal('2005-04-01');
    });

    it('It should be possible to select value on Enter', async () => {
      const el = await fixture('<ef-calendar view="2005-04" lang="en-GB"></ef-calendar>');
      const cells = getDateCells(el);
      await keyboardEvent(cells[0], 'Enter'); // April 01
      expect(el.value, 'value is not set').to.equal('2005-04-01');
    });

    it('Clicking on disabled or empty cell should do nothing', async () => {
      const el = await fixture('<ef-calendar view="2005-04" lang="en-GB" weekends-only></ef-calendar>');
      const values = listenValueChangeEvent(el);
      const cells = el.shadowRoot.querySelectorAll('[part="cell day"]');
      cells[0].click(); // Empty cell
      await elementUpdated(el);
      expect(el.value, 'value should not be set when clicking on empty').to.equal('');
      cells[0].click(); // April 01
      await elementUpdated(el);
      expect(el.value, 'value should not be set when clicking on disabled').to.equal('');
      expect(values.join(','), 'Clicking on empty/disabled cells should not fire value-changed').to.equal('');
    });

    it('Setting invalid date should do nothing', async () => {
      const el = await fixture('<ef-calendar view="2005-04" lang="en-GB" weekends-only></ef-calendar>');
      el.value = 'invalid-value';
      expect(el.value, 'value should not be set to invalid').to.equal('');
    });
  });

  describe('Disabled/Readonly test', () => {
    it('Disabled: it should not be possible to select value on click', async () => {
      const el = await fixture('<ef-calendar disabled lang="en-GB"></ef-calendar>');
      const values = listenValueChangeEvent(el);
      const cells = getDateCells(el);
      cells[0].click(); // April 01
      expect(el.value, 'value is set on click').to.equal('');
      await keyboardEvent(cells[0], ' '); // April 01
      expect(el.value, 'value is set on Spacebar').to.equal('');
      expect(values.join(','), 'value-changed is fired').to.equal('');
    });
    it('Readonly: it should not be possible to select value on click', async () => {
      const el = await fixture('<ef-calendar readonly lang="en-GB"></ef-calendar>');
      const values = listenValueChangeEvent(el);
      const cells = getDateCells(el);
      cells[0].click(); // April 01
      expect(el.value, 'value is set on click').to.equal('');
      await keyboardEvent(cells[0], ' '); // April 01
      expect(el.value, 'value is set on Spacebar').to.equal('');
      expect(values.join(','), 'value-changed is fired').to.equal('');
    });
  });
});
