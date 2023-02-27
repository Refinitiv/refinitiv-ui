import { fixture, expect } from '@refinitiv-ui/test-helpers';

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
