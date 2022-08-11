import { fixture, expect, elementUpdated } from '@refinitiv-ui/test-helpers';

// import element and theme
import '@refinitiv-ui/elements/datetime-picker';
import '@refinitiv-ui/elemental-theme/light/ef-datetime-picker';
import { inputElement, inputToElement, snapshotIgnore } from './utils';

describe('datetime-picker/DatetimePicker', () => {
  describe('DOM Structure', () => {
    it('DOM structure is correct', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" view="2020-04"></ef-datetime-picker>');
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
    it('DOM structure is correct when opened', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" view="2020-04" opened></ef-datetime-picker>');
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
    it('DOM structure is correct when range', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" view="2020-04" range opened></ef-datetime-picker>');
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
    it('DOM structure is correct when duplex', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" view="2020-04" duplex opened></ef-datetime-picker>');
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
    it('DOM structure is correct when timepicker', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" view="2020-04" timepicker opened></ef-datetime-picker>');
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
    it('DOM structure is correct when timepicker and with-seconds', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" view="2020-04" timepicker with-seconds opened></ef-datetime-picker>');
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
    it('DOM structure is correct when range timepicker', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" view="2020-04" timepicker range opened></ef-datetime-picker>');
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
    it('DOM structure is correct when date-only formatOptions', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" view="2020-04" timepicker opened></ef-datetime-picker>');
      el.formatOptions = {
        day: 'numeric'
      };
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
    it('DOM structure is correct when time-only formatOptions', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" view="2020-04" opened></ef-datetime-picker>');
      el.formatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
    it('DOM structure is correct when date-time formatOptions', async () => {
      const el = await fixture('<ef-datetime-picker lang="en-gb" view="2020-04" opened></ef-datetime-picker>');
      el.formatOptions = {
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
  });
  describe('Defaults', () => {
    it('Check default properties', async () => {
      const el = await fixture('<ef-datetime-picker></ef-datetime-picker>');
      expect(el.min).to.be.equal(null);
      expect(el.max).to.be.equal(null);
      expect(el.weekdaysOnly).to.be.equal(false);
      expect(el.weekendsOnly).to.be.equal(false);
      expect(el.lang).to.be.equal('');
      expect(el.firstDayOfWeek).to.be.equal(null);
      expect(el.range).to.be.equal(false);
      expect(el.value).to.be.equal('');
      expect(el.values.join('')).to.be.equal('');
      expect(el.amPm).to.be.equal(false);
      expect(el.multiple).to.be.equal(false);
      expect(el.showSeconds).to.be.equal(false);
      expect(el.opened).to.be.equal(false);
      expect(el.error).to.be.equal(false);
      expect(el.warning).to.be.equal(false);
      expect(el.inputDisabled).to.be.equal(false);
      expect(el.popupDisabled).to.be.equal(false);
      expect(el.timepicker).to.be.equal(false);
      expect(el.duplex).to.be.equal(false);
      expect(el.readonly).to.be.equal(false);
      expect(el.disabled).to.be.equal(false);
      expect(el.placeholder).to.be.equal('');
      expect(el.locale).to.be.equal(null);
      expect(el.formatOptions).to.be.equal(null);
    });
  });
  describe('Placeholder Test', () => {
    it('Can set custom placeholder', async () => {
      const placeholder = 'Test';
      const el = await fixture('<ef-datetime-picker lang="en-gb" range></ef-datetime-picker>');
      el.placeholder = placeholder;
      await elementUpdated(el);
      const inputFrom = inputElement(el);
      const inputTo = inputToElement(el);
      expect(el.placeholder).to.be.equal(placeholder, 'Placeholder getter is wrong');
      expect(inputFrom.placeholder).to.be.equal(placeholder, 'Placeholder is not passed to to input');
      expect(inputTo.placeholder).to.be.equal(placeholder, 'Placeholder is not passed to from input');
    });
  });
});
