import { fixture, expect, elementUpdated, oneEvent } from '@refinitiv-ui/test-helpers';
import { typeText, calendarClickNext, formatToView, addMonths } from './utils';

// import element and theme
import '@refinitiv-ui/elements/datetime-picker';
import '@refinitiv-ui/elemental-theme/light/ef-datetime-picker';

const now = new Date();

describe('datetime-picker/View', () => {
  describe('View Test', () => {
    it('Check default view', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb"></ef-datetime-picker>');
      expect(el.view).to.be.equal(formatToView(now), 'Default view should be set to this month');
    });
    it('Check default view duplex', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" duplex></ef-datetime-picker>');
      expect(el.views[0]).to.be.equal(formatToView(now), 'Default view duplex from should be set to this month');
      expect(el.views[1]).to.be.equal(formatToView(addMonths(now, 1)), 'Default view duplex to should be set to next month');
    });
    it('Check default view duplex=split', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" duplex="split"></ef-datetime-picker>');
      expect(el.views[0]).to.be.equal(formatToView(now), 'Default view duplex split from should be set to this month');
      expect(el.views[1]).to.be.equal(formatToView(addMonths(now, 1)), 'Default view duplex split to should be set to next month');
    });
    it('Check view when value set', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" value="2020-04-21"></ef-datetime-picker>');
      expect(el.view).to.be.equal('2020-04', 'View should be adjusted to value');
    });
    it('Check duplex view when values set', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" duplex values="2020-04-21,2020-06-21"></ef-datetime-picker>');
      expect(el.views[0]).to.be.equal('2020-04', 'View from should be adjusted to from value');
      expect(el.views[1]).to.be.equal('2020-05', 'View to should be followed by from value');
    });
    it('Check duplex="split" view when values set', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" duplex="split" values="2020-04-21,2020-06-21"></ef-datetime-picker>');
      expect(el.views[0]).to.be.equal('2020-04', 'View from should be adjusted to from value');
      expect(el.views[1]).to.be.equal('2020-06', 'View to should be adjusted to to value');
    });
    it('View changes when typing the value', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb"></ef-datetime-picker>');
      const input = el.inputEl;
      typeText(input, '21-Apr-2020');
      await elementUpdated(el);
      expect(el.view).to.be.equal('2020-04', 'View did not change when typing text');
    });
    it('View reset to today when clearing the value', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" value="2020-04-21"></ef-datetime-picker>');
      const input = el.inputEl;
      typeText(input, '');
      await elementUpdated(el);
      expect(el.view).to.be.equal(formatToView(now), 'View should reset to now when value clears');
    });
    it('Duplex view changes when typing the value', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" duplex></ef-datetime-picker>');
      const input = el.inputEl;
      typeText(input, '21-Apr-2020');
      await elementUpdated(el);
      expect(el.views[0]).to.be.equal('2020-04', 'Duplex: view from did not change when typing text');
      expect(el.views[1]).to.be.equal('2020-05', 'Duplex: view to did not change when typing text');
    });
    it('Duplex split view changes when typing the value', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" duplex="split"></ef-datetime-picker>');
      const input = el.inputEl;
      typeText(input, '21-Apr-2020');
      await elementUpdated(el);
      expect(el.views[0]).to.be.equal('2020-04', 'Duplex split: view from did not change when typing text');
      expect(el.views[1]).to.be.equal('2020-05', 'Duplex split: view to did not change when typing text');
    });
    it('Duplex split range view changes when typing the value', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" duplex="split" range></ef-datetime-picker>');
      const inputFrom = el.inputEl;
      const inputTo = el.inputToEl;
      typeText(inputFrom, '21-Jan-2020');
      typeText(inputTo, '21-Apr-2020');
      await elementUpdated(el);
      expect(el.views[0]).to.be.equal('2020-01', 'Duplex split range: view from did not change when typing text');
      expect(el.views[1]).to.be.equal('2020-04', 'Duplex split range: view to did not change when typing text');
    });
    it('Setting invalid view should reset view and warn a user', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" view="2020-04"></ef-datetime-picker>');
      el.view = 'invalid view';
      await elementUpdated(el);
      expect(el.view).to.be.equal(formatToView(now), 'Invalid view should reset view');
    });
    it('Views are propagated to calendars', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" range duplex="split" opened></ef-datetime-picker>');
      el.views = ['2020-01', '2020-04'];
      await elementUpdated(el);
      const calendarFrom = el.calendarEl;
      const calendarTo = el.calendarToEl;
      expect(calendarFrom.view).to.be.equal('2020-01', 'From view is not propagated to calendar');
      expect(calendarTo.view).to.be.equal('2020-04', 'To view is not propagated to calendar');
    });
    it('Passing empty string should reset views to default', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" range duplex="split" views="2020-01,2020-04"></ef-datetime-picker>');
      el.view = '';
      await elementUpdated(el);
      expect(el.views[0]).to.be.equal(formatToView(now), 'View from is not reset');
      expect(el.views[1]).to.be.equal(formatToView(addMonths(now, 1)), 'View to is not reset');
    });
    it('Changing view in calendar should be reflected in datetime-picker and should fire view-changed event', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" view="2020-04" opened></ef-datetime-picker>');
      setTimeout(() => calendarClickNext(el.calendarEl));
      const { detail: { value } } = await oneEvent(el, 'view-changed');
      await elementUpdated();
      expect(value).to.be.equal('2020-05', 'view-changed event does not contain valid value');
      expect(el.view).to.be.equal('2020-05', 'View did not change on next click');
    });
    it('In duplex mode calendar view should be in sync', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" view="2020-04" duplex opened></ef-datetime-picker>');
      const calendarFrom = el.calendarEl;
      const calendarTo = el.calendarToEl;
      await elementUpdated(calendarFrom);
      await elementUpdated(calendarTo);
      calendarClickNext(calendarFrom);
      await elementUpdated();
      expect(calendarFrom.view).to.equal('2020-05', 'Calendar from is not in sync');
      expect(calendarTo.view).to.equal('2020-06', 'Calendar to is not in sync');
      expect(String(el.views)).to.equal('2020-05,2020-06', 'Clicking next on from calendar did not synchronise views');
      calendarClickNext(calendarTo);
      await elementUpdated();
      expect(calendarFrom.view).to.equal('2020-06', 'Calendar from is not in sync');
      expect(calendarTo.view).to.equal('2020-07', 'Calendar to is not in sync');
      expect(String(el.views)).to.equal('2020-06,2020-07', 'Clicking next on to calendar did not synchronise views');
    });
    it('In duplex="split" mode calendar view should be in sync', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" duplex="split" opened></ef-datetime-picker>');
      el.views = ['2020-04', '2020-05'];
      await elementUpdated(el);
      const calendarFrom = el.calendarEl;
      const calendarTo = el.calendarToEl;
      calendarClickNext(calendarFrom);
      await elementUpdated(el);
      expect(calendarFrom.view).to.equal('2020-05', 'Calendar from is not in sync');
      expect(calendarTo.view).to.equal('2020-05', 'Calendar to is not in sync');
      expect(String(el.views)).to.equal('2020-05,2020-05', 'Clicking next on from calendar did not synchronise views');
      calendarClickNext(calendarFrom);
      await elementUpdated(el);
      expect(calendarFrom.view).to.equal('2020-06', 'Calendar from is not in sync');
      expect(calendarTo.view).to.equal('2020-06', 'Calendar to is not in sync');
      expect(String(el.views)).to.equal('2020-06,2020-06', 'From view cannot be after to view');
      calendarClickNext(calendarTo);
      await elementUpdated(el);
      expect(calendarFrom.view).to.equal('2020-06', 'Calendar from is not in sync');
      expect(calendarTo.view).to.equal('2020-07', 'Calendar to is not in sync');
      expect(String(el.views)).to.equal('2020-06,2020-07', 'Clicking next on to calendar did not synchronise views');
      calendarClickNext(calendarTo);
      await elementUpdated(el);
      expect(calendarFrom.view).to.equal('2020-06', 'Calendar from is not in sync');
      expect(calendarTo.view).to.equal('2020-08', 'Calendar to is not in sync');
      expect(String(el.views)).to.equal('2020-06,2020-08', 'Clicking next on to calendar did not synchronise views');
    });
  });
});
