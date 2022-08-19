import { fixture, expect, elementUpdated, oneEvent, nextFrame } from '@refinitiv-ui/test-helpers';
import { calendarElement, calendarToElement, inputElement, inputToElement, timePickerElement, typeText } from './utils';
import { Locale } from '@refinitiv-ui/utils/date.js';

// import element and theme
import '@refinitiv-ui/elements/datetime-picker';
import '@refinitiv-ui/elemental-theme/light/ef-datetime-picker';

describe('datetime-picker/Value', () => {
  describe('Value Test', () => {
    it('Changing the value should fire value-changed event', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" opened></ef-datetime-picker>');
      setTimeout(() => typeText(inputElement(el), '2020-04-21'));
      const { detail: { value } } = await oneEvent(el, 'value-changed');
      await elementUpdated(el);
      expect(el.value).to.be.equal('2020-04-21');
      expect(calendarElement(el).value).to.be.equal('2020-04-21');
      expect(value).to.be.equal('2020-04-21', 'value-changed event should be fired when changing input');
    });
    it('It should be possible to set min/max', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" min="2020-04-01" max="2020-04-30" opened></ef-datetime-picker>');
      const calendarEl = calendarElement(el);
      expect(el.min).to.be.equal('2020-04-01', 'min getter is wrong');
      expect(el.max).to.be.equal('2020-04-30', 'max getter is wrong');
      expect(calendarEl.min).to.be.equal('2020-04-01', 'calendar min getter is wrong');
      expect(calendarEl.max).to.be.equal('2020-04-30', 'calendar max getter is wrong');
    });
    it('It should not be possible to set from value after to', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" range values="2020-04-30,2020-04-01"></ef-datetime-picker>');
      expect(el.checkValidity()).to.be.equal(false, 'from value is after to');
    });
    it('It should not be possible to set value before min', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" min="2020-04-22" value="2020-04-21"></ef-datetime-picker>');
      expect(el.checkValidity()).to.be.equal(false, 'value is less than min');
    });
    it('It should not be possible to set value after max', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" max="2020-04-20" value="2020-04-21"></ef-datetime-picker>');
      expect(el.checkValidity()).to.be.equal(false, 'value is more than max');
    });
    it('It should be possible to select value by clicking on calendar', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" opened view="2020-04"></ef-datetime-picker>');
      const calendarEl = calendarElement(el);
      await elementUpdated(el);
      const cell = calendarEl.shadowRoot.querySelectorAll('div[tabindex]')[2]; // 2020-04-01
      cell.click();
      await elementUpdated(el);
      expect(el.value).to.be.equal('2020-04-01', 'Value has not update');
      expect(inputElement(el).value).to.be.equal('2020-04-01', 'Input value has not updated');
    });
    it('It should be possible to select value in range duplex mode', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" opened range duplex></ef-datetime-picker>');
      el.views = ['2020-04', '2020-05'];
      await nextFrame(el);

      const calendarEl = calendarElement(el);
      const fromCell = calendarEl.shadowRoot.querySelectorAll('div[tabindex]')[0]; // 2020-04-01
      fromCell.click();
      await elementUpdated(el);

      const calendarToEl = calendarToElement(el);
      const toCell = calendarToEl.shadowRoot.querySelectorAll('div[tabindex]')[0]; // 2020-05-01
      toCell.click();
      await elementUpdated(el);

      expect(el.values[0]).to.be.equal('2020-04-01', 'Value from has not been updated');
      expect(el.values[1]).to.be.equal('2020-05-01', 'Value to has not been update');

      expect(inputElement(el).value).to.be.equal('2020-04-01', 'Input from value has not updated');
      expect(inputToElement(el).value).to.be.equal('2020-05-01', 'Input to value has not updated');
    });
    it('Timepicker value is populated', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" opened timepicker show-seconds value="2020-04-21T13:14:15"></ef-datetime-picker>');
      const timePicker = timePickerElement(el);
      expect(timePicker.hours).to.equal(13);
      expect(timePicker.minutes).to.equal(14);
      expect(timePicker.seconds).to.equal(15);
    });
    it('It should be possible to change timepicker value', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" opened timepicker show-seconds value="2020-04-21T13:14:15"></ef-datetime-picker>');
      typeText(timePickerElement(el), '16:17:18');
      expect(el.value).to.equal('2020-04-21T16:17:18');
    });
    it('It should be possible to change formatOptions value', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" opened timepicker show-seconds value="2020-04-21T13:14:15"></ef-datetime-picker>');
      expect(timePickerElement(el)).to.be.exist;
      el.formatOptions = {
        month: 'long',
        day: 'numeric'
      }
      await elementUpdated(el);
      expect(timePickerElement(el)).to.not.exist;
    });
    it('It should be possible to change locale value', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" opened timepicker show-seconds value="2020-04-21T13:14:15"></ef-datetime-picker>');
      expect(timePickerElement(el)).to.be.exist;
      el.locale = Locale.fromOptions({
        month: 'long',
        day: 'numeric'
      }, 'en-us');
      await elementUpdated(el);
      expect(inputElement(el).inputValue).to.equal('April 21', 'locale is not override lang value');
      expect(timePickerElement(el)).to.not.exist;
    });
  });
});
