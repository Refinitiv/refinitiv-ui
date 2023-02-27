import { fixture, expect } from '@refinitiv-ui/test-helpers';
import { focusInput, arrowRight } from './utils';

// import element and theme
import '@refinitiv-ui/elements/datetime-field';
import '@refinitiv-ui/elemental-theme/light/ef-datetime-field';

describe('datetime-field/Default', () => {
  describe('DOM structure', () => {
    it('DOM structure is correct', async () => {
      const el = await fixture('<ef-datetime-field lang="en-gb" value="1988-04-21"></ef-datetime-field>');
      await expect(el).shadowDom.to.equalSnapshot();
    });
    it('DOM structure is correct when focused', async () => {
      const el = await fixture('<ef-datetime-field lang="en-gb" value="1988-04-21"></ef-datetime-field>');
      await focusInput(el);
      await expect(el).shadowDom.to.equalSnapshot();
    });
    it('DOM structure is correct when part selected', async () => {
      const el = await fixture('<ef-datetime-field lang="en-gb" value="1988-04-21"></ef-datetime-field>');
      await focusInput(el);
      await arrowRight(el);
      await expect(el).shadowDom.to.equalSnapshot();
    });
  });

  describe('Public methods and properties', () => {
    it('Check default properties', async () => {
      const el = await fixture('<ef-datetime-field lang="en-gb"></ef-datetime-field>');
      expect(el.min).to.be.equal(null);
      expect(el.max).to.be.equal(null);
      expect(el.timepicker).to.be.equal(false);
      expect(el.showSeconds).to.be.equal(false);
      expect(el.amPm).to.be.equal(false);
      expect(el.formatOptions).to.be.equal(null);
      expect(el.value).to.be.equal('');
    });

    it('Check public value setters', async () => {
      const el = await fixture('<ef-datetime-field lang="en-gb" value="1988-04-21"></ef-datetime-field>');
      expect(el.value).to.be.equal('1988-04-21');
      expect(el.valueAsNumber).to.be.equal(577584000000, 'valueAsNumber getter is incorrect');
      expect(el.valueAsDate.getTime()).to.be.equal(577584000000, 'valueAsDate getter is incorrect');

      el.valueAsNumber = 946684800000; // Make sure that format is taken into account
      expect(el.valueAsNumber).to.be.equal(946684800000, 'valueAsNumber setter is incorrect');

      const date = new Date(0); // UTC for test to succeed
      el.valueAsDate = date;
      expect(el.valueAsDate.getTime()).to.be.equal(date.getTime(), 'valueAsDate setter is incorrect');

      el.valueAsDate = null;
      expect(el.value).to.be.equal('', 'Setting value as date to null should clear value');
      expect(isNaN(el.valueAsNumber)).to.be.equal(true, 'valueAsNumber should return NaN is value is not set');
    });

    it('Check public validation methods', async () => {
      const el = await fixture('<ef-datetime-field lang="en-gb" value="1988-04-21" min="1988-04-20" max="1988-04-22"></ef-datetime-field>');
      expect(el.checkValidity()).to.be.equal(true);
      el.value = '1988-04-19';
      expect(el.checkValidity()).to.be.equal(false, 'Value is less than min');
      el.value = '1988-04-23';
      expect(el.checkValidity()).to.be.equal(false, 'Value is more than max');
      el.reportValidity();
      expect(el.error).to.be.equal(true, 'Error should be set if called');
      el.value = '1988-04-21';
      expect(el.checkValidity()).to.be.equal(true, 'Should return true if valid value');
      el.reportValidity();
      expect(el.error).to.be.equal(false, 'Error should be removed if value correct');
      el.value = '';
      expect(el.checkValidity()).to.be.equal(true, 'Empty value is valid');
    });
  });
});
