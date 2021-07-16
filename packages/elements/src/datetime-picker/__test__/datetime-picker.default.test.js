import { fixture, expect, elementUpdated } from '@refinitiv-ui/test-helpers';

// import element and theme
import '@refinitiv-ui/elements/datetime-picker';
import '@refinitiv-ui/elemental-theme/light/ef-datetime-picker';

const INPUT_FORMAT = {
  DATE: 'dd-MMM-yyyy',
  DATETIME: 'dd-MMM-yyyy HH:mm',
  DATETIME_AM_PM: 'dd-MMM-yyyy hh:mm aaa',
  DATETIME_SECONDS: 'dd-MMM-yyyy HH:mm:ss',
  DATETIME_SECONDS_AM_PM: 'dd-MMM-yyyy hh:mm:ss aaa'
};

describe('datetime-picker/DatetimePicker', () => {
  describe('Defaults', () => {
    it('Check default properties', async () => {
      const el = await fixture('<ef-datetime-picker></ef-datetime-picker>');
      expect(el.min).to.be.equal('');
      expect(el.max).to.be.equal('');
      expect(el.weekdaysOnly).to.be.equal(false);
      expect(el.weekendsOnly).to.be.equal(false);
      expect(el.lang).to.be.equal('');
      expect(el.firstDayOfWeek).to.be.equal(undefined);
      expect(el.range).to.be.equal(false);
      expect(el.value).to.be.equal('');
      expect(el.values.join('')).to.be.equal('');
      expect(el.amPm).to.be.equal(false);
      expect(el.multiple).to.be.equal(false);
      expect(el.showSeconds).to.be.equal(false);
      expect(el.opened).to.be.equal(false);
      expect(el.error).to.be.equal(false);
      expect(el.warning).to.be.equal(false);
      expect(el.inputTriggerDisabled).to.be.equal(false);
      expect(el.inputDisabled).to.be.equal(false);
      expect(el.popupDisabled).to.be.equal(false);
      expect(el.timepicker).to.be.equal(false);
      expect(el.duplex).to.be.equal(null);
      expect(el.readonly).to.be.equal(false);
      expect(el.disabled).to.be.equal(false);
    });

    it('date format is correct', async () => {
      const el = await fixture('<ef-datetime-picker value="2020-04-21"></ef-datetime-picker>');
      expect(el.format).to.be.equal(INPUT_FORMAT.DATE, 'Date format is wrong');
      expect(el.inputEl.value).to.be.equal('21-Apr-2020', 'Date format is not applied');
    });

    it('date-time format is correct', async () => {
      const el = await fixture('<ef-datetime-picker timepicker value="2020-04-21T14:58"></ef-datetime-picker>');
      expect(el.format).to.be.equal(INPUT_FORMAT.DATETIME, 'Datetime format is wrong');
      expect(el.inputEl.value).to.be.equal('21-Apr-2020 14:58', 'Datetime format is not applied');
    });

    it('date-time-am-pm format is correct', async () => {
      const el = await fixture('<ef-datetime-picker timepicker am-pm value="2020-04-21T14:58"></ef-datetime-picker>');
      expect(el.format).to.be.equal(INPUT_FORMAT.DATETIME_AM_PM, 'Datetime AM-PM format is wrong');
      expect(el.inputEl.value).to.be.equal('21-Apr-2020 02:58 pm', 'Datetime AM-PM format is not applied');
    });

    it('date-time-seconds format is correct', async () => {
      const el = await fixture('<ef-datetime-picker timepicker show-seconds value="2020-04-21T14:58:59"></ef-datetime-picker>');
      expect(el.format).to.be.equal(INPUT_FORMAT.DATETIME_SECONDS, 'Datetime with seconds format is wrong');
      expect(el.inputEl.value).to.be.equal('21-Apr-2020 14:58:59', 'Datetime with seconds format is not applied');
    });

    it('date-time-am-pm-seconds format is correct', async () => {
      const el = await fixture('<ef-datetime-picker timepicker show-seconds am-pm value="2020-04-21T14:58:59"></ef-datetime-picker>');
      expect(el.format).to.be.equal(INPUT_FORMAT.DATETIME_SECONDS_AM_PM, 'Datetime AM-PM with seconds format is wrong');
      expect(el.inputEl.value).to.be.equal('21-Apr-2020 02:58:59 pm', 'Datetime AM-PM with seconds format is not applied');
    });

    it('date-time-seconds local format is correct', async () => {
      const el = await fixture('<ef-datetime-picker lang="ru" timepicker show-seconds value="2020-04-21T14:58:59"></ef-datetime-picker>');
      expect(el.format).to.be.equal(INPUT_FORMAT.DATETIME_SECONDS, 'Datetime custom locale with seconds format is wrong');
      expect(el.inputEl.value).to.be.equal('21-апр.-2020 14:58:59', 'Datetime custom locale with seconds format is not applied');
    });

    it('Can change format', async () => {
      const customFormat = 'dd-MM-yy HH:mm:ss';
      const el = await fixture(`<ef-datetime-picker format="${customFormat}" timepicker show-seconds value="2020-04-21T14:58:59"></ef-datetime-picker>`);
      expect(el.format).to.be.equal(customFormat, 'Custom format is not passed');
      expect(el.inputEl.value).to.be.equal('21-04-20 14:58:59', 'Custom format is not applied');
    });
  });
  describe('Placeholder Test', () => {
    it('Default Placeholder', async () => {
      const el = await fixture('<ef-datetime-picker duplex></ef-datetime-picker>');
      expect(el.placeholder).to.be.equal(INPUT_FORMAT.DATE);
      const input = el.inputEl;
      expect(input.placeholder).to.be.equal(INPUT_FORMAT.DATE, 'Default placeholder is not passed to to input');
    });

    it('Can set custom placeholder', async () => {
      const placeholder = 'Test';
      const el = await fixture('<ef-datetime-picker range></ef-datetime-picker>');
      el.placeholder = placeholder;
      await elementUpdated(el);
      const inputFrom = el.inputEl;
      const inputTo = el.inputToEl;
      expect(el.placeholder).to.be.equal(placeholder, 'Placeholder getter is wrong');
      expect(inputFrom.placeholder).to.be.equal(placeholder, 'Placeholder is not passed to to input');
      expect(inputTo.placeholder).to.be.equal(placeholder, 'Placeholder is not passed to from input');
    });
  });
});
