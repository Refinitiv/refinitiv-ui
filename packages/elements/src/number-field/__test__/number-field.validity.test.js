import { fixture, expect, elementUpdated } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/elements/number-field';
import '@refinitiv-ui/elemental-theme/light/ef-number-field';

describe('number-field/Validity', () => {
  describe('Check Validity', () => {
    it('Input is valid by default', async () => {
      const el = await fixture('<ef-number-field></ef-number-field>');
      expect(el.checkValidity()).to.be.equal(true);
    });
    it('Invalid input', async () => {
      const el = await fixture('<ef-number-field></ef-number-field>');
      el.inputValue = 'e';
      expect(el.checkValidity()).to.be.equal(false);
    });
    it('Value is not within min/max', async () => {
      const el = await fixture('<ef-number-field min="1" max="5" value="6"></ef-number-field>');
      expect(el.checkValidity()).to.be.equal(false);
    });
    it('Value is not within step', async () => {
      const el = await fixture('<ef-number-field min="1" max="5" value="4.5"></ef-number-field>');
      expect(el.checkValidity()).to.be.equal(false);
    });
  });
});

describe('Check Floating point', function () {
  // Test Floating point precision issue that results approximation of real number. e.g. 1111111/0.00001 should equal to 111111100000. 
  describe('Input remains valid upon value update with a step of float value', function () {
    it('step = 0.00001 and value = 1111111', async function () {
      const el = await fixture('<ef-number-field step="0.00001"></ef-number-field>');
      el.value="1111111";
      await elementUpdated(el);
      expect(el.checkValidity()).to.be.equal(true);
    });
    it('step = 0.14 and value = 7', async function () {
      const el = await fixture('<ef-number-field step="0.14"></ef-number-field>');
      el.value="7";
      await elementUpdated(el);
      expect(el.checkValidity()).to.be.equal(true);
    });
  });
});