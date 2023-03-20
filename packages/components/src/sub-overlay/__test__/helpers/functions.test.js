import { expect } from '@refinitiv-ui/test-helpers';

import { valueOrNull, valueOrZero } from '../../../../lib/sub-overlay/helpers/functions.js';

describe('overlay/helpers/Functions', () => {
  describe('Functions From Helpers', () => {
    it('Test valueOrZero', () => {
      expect(valueOrZero(100)).to.equal(100, 'expect valueOrZero of 100 to equal 100');
      expect(valueOrZero(-100)).to.equal(-100, 'expect valueOrZero of -100 equal -100');

      expect(valueOrZero(0)).to.equal(0, 'expect valueOrZero of 0 to be equal 0');
      expect(valueOrZero(null)).to.equal(0, 'expect valueOrZero of null to be equal 0');
      expect(valueOrZero(undefined)).to.equal(0, 'expect valueOrZero of undefined to be equal 0');
    });

    it('Test valueOrNull', () => {
      expect(valueOrNull('')).to.equal(null, 'expect valueOrNull of "" to be equal null');
      expect(valueOrNull('-')).to.equal(null, 'expect valueOrNull of "-" to be equal null');
      expect(valueOrNull('0')).to.equal(0, 'expect valueOrNull of "0" to be equal 0');
      expect(valueOrNull('1')).to.equal(1, 'expect valueOrNull of "1" to be equal 1');
      expect(valueOrNull('-1')).to.equal(-1, 'expect valueOrNull of "-1" to not equal -1');
    });
  });
});
