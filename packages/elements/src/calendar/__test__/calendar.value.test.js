// import element and theme
import '@refinitiv-ui/elements/calendar';

import '@refinitiv-ui/elemental-theme/light/ef-calendar.js';
import { elementUpdated, expect, fixture } from '@refinitiv-ui/test-helpers';

import { getDateCells, keyboardEvent, setMonthView, setYearView } from './utils';

const listenValueChangeEvent = (el) => {
  const values = [];
  el.addEventListener('value-changed', ({ detail: { value } }) => {
    values.push(value);
  });
  return values;
};

describe('calendar/Value', function() {
  describe('Value Is Selected', function() {
    it('Selected value should be highlighted when set as attribute', async function() {
      const el = await fixture('<ef-calendar value="2005-04-21" lang="en-GB"></ef-calendar>');
      expect(el).shadowDom.to.equalSnapshot();
      await setMonthView(el);
      expect(el).shadowDom.to.equalSnapshot();
      await setYearView(el);
      expect(el).shadowDom.to.equalSnapshot();
      expect(el.value, 'value is not reflected to property').to.equal('2005-04-21');
      expect(el.values.join(','), 'values is not reflected to value').to.equal('2005-04-21');
    });
    it('Selected value should be highlighted when set as property', async function() {
      const el = await fixture('<ef-calendar lang="en-GB"></ef-calendar>');
      const values = listenValueChangeEvent(el);
      el.value = '2005-04-21';
      await elementUpdated(el);
      expect(el).shadowDom.to.equalSnapshot();
      expect(values.join(','), 'External value change should not fire value-changed').to.equal('');
      expect(el.values.join(','), 'values is not reflected to value').to.equal('2005-04-21');
    });
    it('It should be possible to clear the value', async function() {
      const el = await fixture('<ef-calendar value="2005-04-21" lang="en-GB"></ef-calendar>');
      el.value = '';
      await elementUpdated(el);
      expect(el.value, 'value is not clear').to.equal('');
      expect(el.shadowRoot.querySelector('[selected]'), 'selected flag is not removed').to.equal(null);
    });
    it('AD/BC selected value should be highlighted', async function() {
      const el = await fixture('<ef-calendar value="-000011-04-21" lang="en-GB"></ef-calendar>');
      expect(el).shadowDom.to.equalSnapshot();
      await setMonthView(el);
      expect(el).shadowDom.to.equalSnapshot();
      await setYearView(el);
      expect(el).shadowDom.to.equalSnapshot();
      expect(el.value, 'value is not reflected to property').to.equal('-000011-04-21');
      expect(el.values.join(','), 'values is not reflected to value').to.equal('-000011-04-21');
    });
  });

  describe('Navigation Value', function() {
    it('It should be possible to select value on click', async function() {
      const el = await fixture('<ef-calendar view="2005-04" lang="en-GB"></ef-calendar>');
      const values = listenValueChangeEvent(el);
      const cells = getDateCells(el);
      cells[0].click(); // April 01
      await elementUpdated(el);
      expect(el.value, 'value is not set').to.equal('2005-04-01');
      expect(el).shadowDom.to.equalSnapshot();
      cells[29].click(); // April 30
      await elementUpdated(el);
      expect(el).shadowDom.to.equalSnapshot();
      expect(values.join(','), 'value-changed should fire on click').to.equal('2005-04-01,2005-04-30');
      expect(el.value, 'value is not set').to.equal('2005-04-30');
      expect(el.values.join(','), 'values is not set').to.equal('2005-04-30');
    });

    it('It should not be possible to deselect value on click', async function() {
      const el = await fixture('<ef-calendar view="2005-04" lang="en-GB"></ef-calendar>');
      const cells = getDateCells(el);
      cells[0].click(); // April 01
      await elementUpdated(el);
      expect(el.values.join(',')).to.equal('2005-04-01');
      expect(el.value).to.equal('2005-04-01');
      cells[0].click(); // April 01
      await elementUpdated(el);
      expect(el.values.join(',')).to.equal('2005-04-01');
      expect(el.value, 'value should not be changed').to.equal('2005-04-01');
    });

    it('AD/BC It should be possible to select value on click', async function() {
      const el = await fixture('<ef-calendar view="-000011-04" lang="en-GB"></ef-calendar>');
      const values = listenValueChangeEvent(el);
      const cells = getDateCells(el);
      cells[0].click(); // April 01
      await elementUpdated(el);
      expect(el.value, 'value is not set').to.equal('-000011-04-01');
      expect(el).shadowDom.to.equalSnapshot();
      cells[29].click(); // April 30
      await elementUpdated(el);
      expect(el).shadowDom.to.equalSnapshot();
      expect(values.join(','), 'value-changed should fire on click').to.equal('-000011-04-01,-000011-04-30');
      expect(el.value, 'value is not set').to.equal('-000011-04-30');
      expect(el.values.join(','), 'values is not set').to.equal('-000011-04-30');
    });

    it('It should be possible to select value on Spacebar', async function() {
      const el = await fixture('<ef-calendar view="2005-04" lang="en-GB"></ef-calendar>');
      const cells = getDateCells(el);
      await keyboardEvent(cells[0], 'Spacebar');
      await keyboardEvent(cells[0], 'Spacebar', 'keyup'); // April 01
      expect(el.value, 'value is not set').to.equal('2005-04-01');
    });

    it('It should not be possible to deselect value on Spacebar', async function() {
      const el = await fixture('<ef-calendar view="2005-04" lang="en-GB"></ef-calendar>');
      const cells = getDateCells(el);
      await keyboardEvent(cells[0], 'Spacebar');
      await keyboardEvent(cells[0], 'Spacebar', 'keyup'); // April 01
      expect(el.value, 'value is not set').to.equal('2005-04-01');
      await keyboardEvent(cells[0], 'Spacebar');
      await keyboardEvent(cells[0], 'Spacebar', 'keyup'); // April 01
      expect(el.value).to.equal('2005-04-01');
    });

    it("It should be possible to select value on ' ' ", async function() {
      const el = await fixture('<ef-calendar view="2005-04" lang="en-GB"></ef-calendar>');
      const cells = getDateCells(el);
      await keyboardEvent(cells[0], ' ');
      await keyboardEvent(cells[0], ' ', 'keyup'); // April 01
      expect(el.value, 'value is not set').to.equal('2005-04-01');
    });

    it('It should be possible to select value on Enter', async function() {
      const el = await fixture('<ef-calendar view="2005-04" lang="en-GB"></ef-calendar>');
      const cells = getDateCells(el);
      await keyboardEvent(cells[0], 'Enter'); // April 01
      expect(el.value, 'value is not set').to.equal('2005-04-01');
    });

    it('Clicking on disabled or empty cell should do nothing', async function() {
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

    it('Setting invalid date should do nothing', async function() {
      const el = await fixture('<ef-calendar view="2005-04" lang="en-GB" weekends-only></ef-calendar>');
      el.value = 'invalid-value';
      expect(el.value, 'value should not be set to invalid').to.equal('');
    });
  });

  describe('Disabled/Readonly test', function() {
    it('Disabled: it should not be possible to select value on click', async function() {
      const el = await fixture('<ef-calendar disabled lang="en-GB"></ef-calendar>');
      const values = listenValueChangeEvent(el);
      const cells = getDateCells(el);
      cells[0].click(); // April 01
      expect(el.value, 'value is set on click').to.equal('');
      await keyboardEvent(cells[0], 'Spacebar'); // April 01
      expect(el.value, 'value is set on Spacebar').to.equal('');
      expect(values.join(','), 'value-changed is fired').to.equal('');
    });
    it('Readonly: it should not be possible to select value on click', async function() {
      const el = await fixture('<ef-calendar readonly lang="en-GB"></ef-calendar>');
      const values = listenValueChangeEvent(el);
      const cells = getDateCells(el);
      cells[0].click(); // April 01
      expect(el.value, 'value is set on click').to.equal('');
      await keyboardEvent(cells[0], 'Spacebar'); // April 01
      expect(el.value, 'value is set on Spacebar').to.equal('');
      expect(values.join(','), 'value-changed is fired').to.equal('');
    });
  });
});
