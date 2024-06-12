// import element and theme
import '@refinitiv-ui/elements/datetime-picker';

import '@refinitiv-ui/elemental-theme/light/ef-datetime-picker';
import {
  elementUpdated,
  expect,
  fixture,
  nextFrame,
  oneEvent,
  triggerFocusFor
} from '@refinitiv-ui/test-helpers';

import { typeText } from './utils.js';

describe('datetime-picker/Value', function () {
  describe('Value Test', function () {
    it('Changing the value should fire value-changed event', async function () {
      const el = await fixture('<ef-datetime-picker lang="en-gb" opened></ef-datetime-picker>');
      setTimeout(() => typeText(el.inputEl, '21-Apr-2020'));
      const {
        detail: { value }
      } = await oneEvent(el, 'value-changed');
      await elementUpdated(el);
      expect(el.value).to.be.equal('2020-04-21');
      expect(el.calendarEl.value).to.be.equal('2020-04-21');
      expect(value).to.be.equal('2020-04-21', 'value-changed event should be fired when changing input');
    });
    it('It should be possible to set min/max', async function () {
      const el = await fixture(
        '<ef-datetime-picker lang="en-gb" min="2020-04-01" max="2020-04-30" opened></ef-datetime-picker>'
      );
      expect(el.min).to.be.equal('2020-04-01', 'min getter is wrong');
      expect(el.max).to.be.equal('2020-04-30', 'max getter is wrong');
      expect(el.calendarEl.min).to.be.equal('2020-04-01', 'calendar min getter is wrong');
      expect(el.calendarEl.max).to.be.equal('2020-04-30', 'calendar min getter is wrong');
    });
    it('It should not be possible to set invalid min/max', async function () {
      const el = await fixture(
        '<ef-datetime-picker lang="en-gb" min="2020-04" max="2020-04"></ef-datetime-picker>'
      );
      expect(el.min).to.be.equal('', 'Invalid min should reset min');
      expect(el.max).to.be.equal('', 'Invalid max should reset max');
    });
    it('It must not error when user input empty string value', async function () {
      const el = await fixture(
        '<ef-datetime-picker lang="en-gb" min="2022-04-01" max="2022-04-30"></ef-datetime-picker>'
      );
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
      typeText(el.inputFromEl, '');
      await elementUpdated(el);
      expect(el.error).to.be.equal(false, 'input empty string must not make element error in range mode');
    });
    it('Typing invalid value in input should mark datetime picker as invalid and error-changed event is fired', async function () {
      const el = await fixture('<ef-datetime-picker lang="en-gb" opened></ef-datetime-picker>');
      setTimeout(() => typeText(el.inputEl, 'Invalid Value'));
      const {
        detail: { value }
      } = await oneEvent(el, 'error-changed');
      await elementUpdated(el);
      expect(el.error).to.be.equal(true);
      expect(el.value).to.be.equal('');
      expect(el.calendarEl.value).to.be.equal('');
      expect(value).to.be.equal(true, 'error-changed event should be fired when user puts invalid value');
    });
    it('It should be able to clear input value when user type invalid format for normal mode', async function () {
      const el = await fixture('<ef-datetime-picker lang="en-gb" opened></ef-datetime-picker>');
      const input = el.inputEl;

      await triggerFocusFor(input);
      typeText(input, 'Invalid Value');
      await elementUpdated(el);

      expect(el.inputEl.value).to.be.equal('Invalid Value');

      el.value = '';
      await triggerFocusFor(el);
      await elementUpdated(el);

      expect(el.inputEl.value).to.be.equal('');
      expect(el.error).to.be.equal(false);
    });
    it('It should be able to clear input values when user type invalid format for range mode', async function () {
      const el = await fixture('<ef-datetime-picker lang="en-gb" range opened></ef-datetime-picker>');
      const inputFrom = el.inputFromEl;
      const inputTo = el.inputToEl;

      await triggerFocusFor(inputFrom);
      await triggerFocusFor(inputTo);
      typeText(inputFrom, 'Invalid Value 1');
      typeText(inputTo, 'Invalid Value 2');
      await elementUpdated(el);

      expect(el.inputFromEl.value).to.be.equal('Invalid Value 1');
      expect(el.inputToEl.value).to.be.equal('Invalid Value 2');

      el.values = [];
      await triggerFocusFor(el);
      await elementUpdated(el);

      expect(el.inputFromEl.value).to.be.equal('');
      expect(el.inputToEl.value).to.be.equal('');
      expect(el.error).to.be.equal(false);
    });
    it('It should not be possible to set from value after to', async function () {
      const el = await fixture(
        '<ef-datetime-picker lang="en-gb" range values="2020-04-30,2020-04-01"></ef-datetime-picker>'
      );
      expect(el.error).to.be.equal(true);
    });
    it('It should not be possible to set value before min', async function () {
      const el = await fixture(
        '<ef-datetime-picker lang="en-gb" min="2020-04-22" value="2020-04-21"></ef-datetime-picker>'
      );
      expect(el.error).to.be.equal(true);
    });
    it('It should not be possible to set value after max', async function () {
      const el = await fixture(
        '<ef-datetime-picker lang="en-gb" max="2020-04-20" value="2020-04-21"></ef-datetime-picker>'
      );
      expect(el.error).to.be.equal(true);
    });
    it('While typing the value calendar input should not randomly update value', async function () {
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
    it('It should be possible to select value by clicking on calendar', async function () {
      const el = await fixture(
        '<ef-datetime-picker lang="en-gb" opened view="2020-04"></ef-datetime-picker>'
      );
      const calendarEl = el.calendarEl;
      await elementUpdated(el);
      const cell = calendarEl.shadowRoot.querySelectorAll('div[tabindex]')[2]; // 2020-04-01
      cell.click();
      await elementUpdated(el);
      expect(el.value).to.be.equal('2020-04-01', 'Value has not update');
      expect(el.inputEl.value).to.be.equal('01-Apr-2020', 'Input value has not updated');
    });
    it('It should not be possible to deselect value by clicking on calendar', async function () {
      const el = await fixture(
        '<ef-datetime-picker lang="en-gb" opened view="2020-04"></ef-datetime-picker>'
      );
      const calendarEl = el.calendarEl;
      await elementUpdated(el);
      const cell = calendarEl.shadowRoot.querySelectorAll('div[tabindex]')[2]; // 2020-04-01
      cell.click();
      await elementUpdated(el);
      expect(el.value).to.be.equal('2020-04-01', 'Value has not update');
      expect(el.inputEl.value).to.be.equal('01-Apr-2020', 'Input value has not updated');
      cell.click();
      await elementUpdated(el);
      expect(el.value).to.be.equal('2020-04-01');
      expect(el.inputEl.value).to.be.equal('01-Apr-2020');
    });
    it('It should be possible to select value in range duplex mode', async function () {
      const el = await fixture('<ef-datetime-picker lang="en-gb" opened range duplex></ef-datetime-picker>');
      el.views = ['2020-04', '2020-05'];
      await elementUpdated(el);
      await nextFrame();
      await nextFrame();

      const calendarFromEl = el.calendarFromEl;
      const fromCell = calendarFromEl.shadowRoot.querySelectorAll('div[tabindex]')[0]; // 2020-04-01
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

      expect(el.inputFromEl.value).to.be.equal('01-Apr-2020', 'Input from value has not updated');
      expect(el.inputToEl.value).to.be.equal('01-May-2020', 'Input to value has not updated');
    });
    it('It should not be possible to deselect values in range duplex mode', async function () {
      const el = await fixture('<ef-datetime-picker lang="en-gb" opened range duplex></ef-datetime-picker>');
      el.views = ['2020-04', '2020-05'];
      await elementUpdated(el);
      await nextFrame(2);

      const calendarFromEl = el.calendarFromEl;
      const fromCell = calendarFromEl.shadowRoot.querySelectorAll('div[tabindex]')[0]; // 2020-04-01
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

      expect(el.inputFromEl.value).to.be.equal('01-Apr-2020', 'Input from value has not updated');
      expect(el.inputToEl.value).to.be.equal('01-May-2020', 'Input to value has not updated');

      toCell.click();
      await elementUpdated(el);
      await nextFrame();
      expect(el.values.join(',')).to.equal('2020-05-01');
      toCell.click();
      await elementUpdated(el);
      await nextFrame();
      expect(el.values.join(',')).to.equal('2020-05-01,2020-05-01');
    });
    it('Timepicker value is populated', async function () {
      const el = await fixture(
        '<ef-datetime-picker lang="en-gb" opened timepicker with-seconds value="2020-04-21T13:14:15"></ef-datetime-picker>'
      );
      const timePicker = el.timepickerEl;
      expect(timePicker.hours).to.equal(13);
      expect(timePicker.minutes).to.equal(14);
      expect(timePicker.seconds).to.equal(15);
    });
    it('It should be possible to change timepicker value', async function () {
      const el = await fixture(
        '<ef-datetime-picker lang="en-gb" opened timepicker with-seconds value="2020-04-21T13:14:15"></ef-datetime-picker>'
      );
      const timePicker = el.timepickerEl;
      typeText(timePicker, '16:17:18');
      expect(el.value).to.equal('2020-04-21T16:17:18');
    });
    it('It should not error when weekends-only attribute is set and value is within weekend period', async function () {
      const el = await fixture('<ef-datetime-picker weekends-only lang="en-gb" opened></ef-datetime-picker>');
      el.value = '2024-03-02';
      await elementUpdated(el);

      expect(el.error).to.be.equal(false, 'error state should be false when value is valid');
    });
    it('It should error when weekends-only attribute is set and value is not within weekend period', async function () {
      const el = await fixture('<ef-datetime-picker weekends-only lang="en-gb" opened></ef-datetime-picker>');
      el.value = '2024-03-01';
      await elementUpdated(el);

      expect(el.error).to.be.equal(true, 'error state should be true when value is invalid');
    });
    it('It should not error when weekends-only attribute is set and set value back to within weekend period', async function () {
      const el = await fixture('<ef-datetime-picker weekends-only lang="en-gb" opened></ef-datetime-picker>');
      el.value = '2024-03-01';
      await elementUpdated(el);

      el.value = '2024-03-02';
      await elementUpdated(el);

      expect(el.error).to.be.equal(false, 'error state should return to false when value is valid');
    });
    it('It should not error when weekdays-only attribute is set and value is within weekdays period', async function () {
      const el = await fixture('<ef-datetime-picker weekdays-only lang="en-gb" opened></ef-datetime-picker>');
      el.value = '2024-03-01';
      await elementUpdated(el);

      expect(el.error).to.be.equal(false, 'error state should be false when value is valid');
    });
    it('It should error when weekdays-only attribute is set and value is not within weekdays period', async function () {
      const el = await fixture('<ef-datetime-picker weekdays-only lang="en-gb" opened></ef-datetime-picker>');
      el.value = '2024-03-02';
      await elementUpdated(el);

      expect(el.error).to.be.equal(true, 'error state should be true when value is invalid');
    });
    it('It should not error when weekdays-only attribute is set and set value back to within weekdays period', async function () {
      const el = await fixture('<ef-datetime-picker weekdays-only lang="en-gb" opened></ef-datetime-picker>');
      el.value = '2024-03-02';
      await elementUpdated(el);

      el.value = '2024-03-01';
      await elementUpdated(el);

      expect(el.error).to.be.equal(false, 'error state should return to false when value is valid');
    });
    it('It should not error when weekends-only attribute is set and values are within weekends period with range mode', async function () {
      const el = await fixture('<ef-datetime-picker weekends-only lang="en-gb" opened></ef-datetime-picker>');
      el.values = ['2024-03-02', '2024-03-03'];
      await elementUpdated(el);

      expect(el.error).to.be.equal(false, 'error state should be false when both values are valid');
    });
    it('It should error when weekends-only attribute is set and from value is not within weekends period with range mode', async function () {
      const el = await fixture('<ef-datetime-picker weekends-only lang="en-gb" opened></ef-datetime-picker>');
      el.values = ['2024-03-01', '2024-03-03'];
      await elementUpdated(el);

      expect(el.error).to.be.equal(true, 'error state should be true when input from value is invalid');
    });
    it('It should error when weekends-only attribute is set and to value is not within weekends period with range mode', async function () {
      const el = await fixture('<ef-datetime-picker weekends-only lang="en-gb" opened></ef-datetime-picker>');
      el.values = ['2024-03-02', '2024-03-04'];
      await elementUpdated(el);

      expect(el.error).to.be.equal(true, 'error state should be true when input to value is invalid');
    });
    it('It should error when weekends-only attribute is set and values are not within weekends period with range mode', async function () {
      const el = await fixture('<ef-datetime-picker weekends-only lang="en-gb" opened></ef-datetime-picker>');
      el.values = ['2024-03-04', '2024-03-05'];
      await elementUpdated(el);

      expect(el.error).to.be.equal(true, 'error state should be true when both inputs value are invalid');
    });
    it('It should not error when weekends-only attribute is set and set values back to within weekends period with range mode', async function () {
      const el = await fixture('<ef-datetime-picker weekends-only lang="en-gb" opened></ef-datetime-picker>');
      el.values = ['2024-03-04', '2024-03-05'];
      await elementUpdated(el);

      el.values = ['2024-03-02', '2024-03-03'];
      await elementUpdated(el);

      expect(el.error).to.be.equal(
        false,
        'error state should return to false when both inputs value are valid'
      );
    });
    it('It should not error when weekdays-only attribute is set and values are within weekdays period with range mode', async function () {
      const el = await fixture('<ef-datetime-picker weekdays-only lang="en-gb" opened></ef-datetime-picker>');
      el.values = ['2024-03-04', '2024-03-08'];
      await elementUpdated(el);

      expect(el.error).to.be.equal(false, 'error state should be false when both values are valid');
    });
    it('It should error when weekdays-only attribute is set and from value is not within weekdays period with range mode', async function () {
      const el = await fixture('<ef-datetime-picker weekdays-only lang="en-gb" opened></ef-datetime-picker>');
      el.values = ['2024-03-03', '2024-03-08'];
      await elementUpdated(el);

      expect(el.error).to.be.equal(true, 'error state should be true when input from value is invalid');
    });
    it('It should error when weekdays-only attribute is set and to value is not within weekdays period with range mode', async function () {
      const el = await fixture('<ef-datetime-picker weekdays-only lang="en-gb" opened></ef-datetime-picker>');
      el.values = ['2024-03-04', '2024-03-09'];
      await elementUpdated(el);

      expect(el.error).to.be.equal(true, 'error state should be true when input to value is invalid');
    });
    it('It should error when weekdays-only attribute is set and values are not within weekdays period with range mode', async function () {
      const el = await fixture('<ef-datetime-picker weekdays-only lang="en-gb" opened></ef-datetime-picker>');
      el.values = ['2024-03-03', '2024-03-09'];
      await elementUpdated(el);

      expect(el.error).to.be.equal(true, 'error state should be true when both inputs value are invalid');
    });
    it('It should not error when weekdays-only attribute is set and set values back to within weekdays period with range mode', async function () {
      const el = await fixture('<ef-datetime-picker weekdays-only lang="en-gb" opened></ef-datetime-picker>');
      el.values = ['2024-03-03', '2024-03-09'];
      await elementUpdated(el);

      el.values = ['2024-03-04', '2024-03-08'];
      await elementUpdated(el);

      expect(el.error).to.be.equal(
        false,
        'error state should return to false when both inputs value are valid'
      );
    });
    it('It should fall back timepicker value to valid when popup is opened', async function () {
      const el = await fixture(
        '<ef-datetime-picker timepicker value="2024-05-10T11:00" lang="en-gb" opened></ef-datetime-picker>'
      );

      el.timepickerEl.hours = null;
      el.opened = false;
      await elementUpdated(el);

      el.opened = true;
      await elementUpdated(el);

      expect(el.timepickerEl.value).to.equal('11:00');
    });
    it('It should fall back timepicker values to valid when popup is opened in range mode', async function () {
      const el = await fixture(
        '<ef-datetime-picker range timepicker values="2024-05-10T11:00,2024-05-11T15:00" lang="en-gb" opened></ef-datetime-picker>'
      );

      el.timepickerFromEl.hours = null;
      el.timepickerToEl.minutes = null;
      el.opened = false;
      await elementUpdated(el);

      el.opened = true;
      await elementUpdated(el);

      expect(el.timepickerFromEl.value).to.equal('11:00');
      expect(el.timepickerToEl.value).to.equal('15:00');
    });
    // TODO: add input validation test cases when the value update is originated from typing input
  });

  it('Tapping on clears button should clear the value', async function () {
    const el = await fixture(
      '<ef-datetime-picker clears value="2020-04-21" lang="en-gb"></ef-datetime-picker>'
    );
    el.clearsButton.dispatchEvent(new CustomEvent('tap'));
    await elementUpdated(el);
    expect(el.value).to.equal('', 'Tapping on clears did not clear the value');
  });
});
