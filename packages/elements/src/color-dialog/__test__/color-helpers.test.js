import { expect } from '@refinitiv-ui/test-helpers';
import { isHex } from '@refinitiv-ui/utils/color.js';

describe('color-dialog/Helpers', function() {
  describe('isHex Method', function() {
    it('should validate hex correctly', function() {
      expect(isHex('aaaa')).to.equal(false);
      expect(isHex('1234')).to.equal(false);
      expect(isHex('#aaaaa')).to.equal(false);
      expect(isHex('abcd')).to.equal(false);
      expect(isHex('s')).to.equal(false);
      expect(isHex('#fe')).to.equal(false);
      expect(isHex('')).to.equal(false);
      expect(isHex('#fafwwqff')).to.equal(false);
      expect(isHex('#aaa')).to.equal(true);
      expect(isHex('#fff')).to.equal(true);
      expect(isHex('#ffffff')).to.equal(true);
      expect(isHex('#4183c4')).to.equal(true);
      expect(isHex('#ff9afd')).to.equal(true);
      expect(isHex('#000000')).to.equal(true);
    });
  });
});
