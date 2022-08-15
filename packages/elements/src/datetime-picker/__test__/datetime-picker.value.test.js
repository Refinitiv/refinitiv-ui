import { fixture, expect, elementUpdated, oneEvent, triggerFocusFor, nextFrame, isIE } from '@refinitiv-ui/test-helpers';
import { typeText } from './utils';

// import element and theme
import '@refinitiv-ui/elements/datetime-picker';
import '@refinitiv-ui/elemental-theme/light/ef-datetime-picker';

describe('datetime-picker/Value', () => {
  describe('Value Test', () => {
    it('Changing the value should fire value-changed event', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" opened></ef-datetime-picker>');
      setTimeout(() => typeText(el.inputEl, '21-Apr-2020'));
      const { detail: { value } } = await oneEvent(el, 'value-changed');
      await elementUpdated();
      expect(el.value).to.be.equal('2020-04-21');
      expect(el.calendarEl.value).to.be.equal('2020-04-21');
      expect(value).to.be.equal('2020-04-21', 'value-changed event should be fired when changing input');
    });
    it('It should be possible to set min/max', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" min="2020-04-01" max="2020-04-30" opened></ef-datetime-picker>');
      expect(el.min).to.be.equal('2020-04-01', 'min getter is wrong');
      expect(el.max).to.be.equal('2020-04-30', 'max getter is wrong');
      expect(el.calendarEl.min).to.be.equal('2020-04-01', 'calendar min getter is wrong');
      expect(el.calendarEl.max).to.be.equal('2020-04-30', 'calendar min getter is wrong');
    });
    it('It should not be possible to set invalid min/max', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" min="2020-04" max="2020-04"></ef-datetime-picker>');
      expect(el.min).to.be.equal('', 'Invalid min should reset min');
      expect(el.max).to.be.equal('', 'Invalid max should reset max');
    });

    it('It must not error when user input empty string value', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" min="2022-04-01" max="2022-04-30"></ef-datetime-picker>');
      el.value = '2022-05-15';
      await elementUpdated(el);
      expect(el.error).to.be.equal(true);
      typeText(el.inputEl, '');
      await elementUpdated(el);
      expect(el.error).to.be.equal(false, 'input empty string must not make element error');

      // Test range mode
      el.range = true;
      el.values = ['2022-03-15', '2022-04-23'];
      await elementUpdated(el);
      expect(el.error).to.be.equal(true);
      typeText(el.inputEl, '');
      await elementUpdated(el);
      expect(el.error).to.be.equal(false, 'input empty string must not make element error in range mode');
    });

    it('Typing invalid value in input should mark datetime picker as invalid and error-changed event is fired', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" opened></ef-datetime-picker>');
      setTimeout(() => typeText(el.inputEl, 'Invalid Value'));
      const { detail: { value } } = await oneEvent(el, 'error-changed');
      await elementUpdated();
      expect(el.error).to.be.equal(true);
      expect(el.value).to.be.equal('');
      expect(el.calendarEl.value).to.be.equal('');
      expect(value).to.be.equal(true, 'error-changed event should be fired when user puts invalid value');
    });
    it('It should not be possible to set from value after to', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" range values="2020-04-30,2020-04-01"></ef-datetime-picker>');
      expect(el.error).to.be.equal(true);
    });
    it('It should not be possible to set value before min', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" min="2020-04-22" value="2020-04-21"></ef-datetime-picker>');
      expect(el.error).to.be.equal(true);
    });
    it('It should not be possible to set value after max', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" max="2020-04-20" value="2020-04-21"></ef-datetime-picker>');
      expect(el.error).to.be.equal(true);
    });
    it('While typing the value calendar input should not randomly update value', async function () {
      if (isIE()) {
        this.skip();
      }
      // this test becomes invalid if date-fns ever supports strict formatting
      const el = await fixture('<ef-datetime-picker lang="en-gb" opened></ef-datetime-picker>');
      const input = el.inputEl;
      await triggerFocusFor(input);
      typeText(el.inputEl, '21-A-2020');
      await elementUpdated(el);
      expect(el.inputEl.value).to.be.equal('21-A-2020', 'While in focus input value is not changed');
      await triggerFocusFor(el);
      await elementUpdated(el);
      expect(el.inputEl.value).to.be.equal('21-Apr-2020', 'On blur input values becomes formatted value');
    });
    it('It should be possible to select value by clicking on calendar', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" opened view="2020-04"></ef-datetime-picker>');
      const calendarEl = el.calendarEl;
      await elementUpdated(el);
      const cell = calendarEl.shadowRoot.querySelectorAll('div[tabindex]')[2]; // 2020-04-01
      cell.click();
      await elementUpdated(el);
      expect(el.value).to.be.equal('2020-04-01', 'Value has not update');
      expect(el.inputEl.value).to.be.equal('01-Apr-2020', 'Input value has not updated');
    });
    it('It should be possible to select value in range duplex mode', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" opened range duplex></ef-datetime-picker>');
      el.views = ['2020-04', '2020-05'];
      await elementUpdated(el);
      await nextFrame();
      await nextFrame();

      const calendarEl = el.calendarEl;
      const fromCell = calendarEl.shadowRoot.querySelectorAll('div[tabindex]')[0]; // 2020-04-01
      fromCell.click();
      await elementUpdated(el);
      await nextFrame();

      const calendarToEl = el.calendarToEl;
      const toCell = calendarToEl.shadowRoot.querySelectorAll('div[tabindex]')[0]; // 2020-05-01
      toCell.click();
      await elementUpdated(el);
      await nextFrame();

      expect(el.values[0]).to.be.equal('2020-04-01', 'Value from has not been updated');
      expect(el.values[1]).to.be.equal('2020-05-01', 'Value to has not been update');

      expect(el.inputEl.value).to.be.equal('01-Apr-2020', 'Input from value has not updated');
      expect(el.inputToEl.value).to.be.equal('01-May-2020', 'Input to value has not updated');
    });
    it('Timepicker value is populated', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" opened timepicker with-seconds value="2020-04-21T13:14:15"></ef-datetime-picker>');
      const timePicker = el.timepickerEl;
      expect(timePicker.hours).to.equal(13);
      expect(timePicker.minutes).to.equal(14);
      expect(timePicker.seconds).to.equal(15);
    });
    it('It should be possible to change timepicker value', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" opened timepicker with-seconds value="2020-04-21T13:14:15"></ef-datetime-picker>');
      const timePicker = el.timepickerEl;
      typeText(timePicker, '16:17:18');
      expect(el.value).to.equal('2020-04-21T16:17:18');
    });
  });
});
