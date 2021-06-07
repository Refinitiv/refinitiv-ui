import { ColorHelpers } from '../../../lib/color-dialog/helpers/color-helpers.js';
import { expect } from '@refinitiv-ui/test-helpers';

describe('ColorDialog', () => {
  describe('removeHashSign Method', () => {
    it('should return string that do not start with #', async () => {
      const str1 = '#str1';
      const str2 = '#str2#';
      const str3 = '3str3';
      const str4 = '';

      expect(ColorHelpers.removeHashSign(str1)).to.equal('str1');
      expect(ColorHelpers.removeHashSign(str2)).to.equal('str2#');
      expect(ColorHelpers.removeHashSign(str3)).to.equal('3str3');
      expect(ColorHelpers.removeHashSign(str4)).to.equal('');
    });
  });
  describe('expandHex Method', () => {
    it('should return the same string if string length > 3', async () => {
      const str1 = 'ffff';
      const str2 = 'eeeee';
      const str3 = 'abcc';

      expect(ColorHelpers.expandHex(str1)).to.equal(str1);
      expect(ColorHelpers.expandHex(str2)).to.equal(str2);
      expect(ColorHelpers.expandHex(str3)).to.equal(str3);
    });
    it('should expand string correctly', async () => {
      const str1 = 'fff';
      const str2 = 'eee';
      const str3 = 'fef';
      const str4 = 'avc';

      expect(ColorHelpers.expandHex(str1)).to.equal('#ffffff');
      expect(ColorHelpers.expandHex(str2)).to.equal('#eeeeee');
      expect(ColorHelpers.expandHex(str3)).to.equal('#ffeeff');
      expect(ColorHelpers.expandHex(str4)).to.equal('#aavvcc');
    });
  });
  describe('rgbToHex Method', () => {
    it('should return correct hex value', async () => {
      expect(ColorHelpers.rgbToHex(0, 0, 0)).to.equal('#000000');
      expect(ColorHelpers.rgbToHex(65, 131, 196)).to.equal('#4183c4');
      expect(ColorHelpers.rgbToHex(255, 154, 253)).to.equal('#ff9afd');
      expect(ColorHelpers.rgbToHex(40, 42, 54)).to.equal('#282a36');
      expect(ColorHelpers.rgbToHex(0, 0, 0, 0)).to.equal('#000000');
    });
  });
  describe('isHex Method', () => {
    it('should validate hex correctly', async () => {
      expect(ColorHelpers.isHex('aaaa')).to.equal(false);
      expect(ColorHelpers.isHex('1234')).to.equal(false);
      expect(ColorHelpers.isHex('#aaaaa')).to.equal(false);
      expect(ColorHelpers.isHex('abcd')).to.equal(false);
      expect(ColorHelpers.isHex('s')).to.equal(false);
      expect(ColorHelpers.isHex('#fe')).to.equal(false);
      expect(ColorHelpers.isHex('')).to.equal(false);
      expect(ColorHelpers.isHex('#fafwwqff')).to.equal(false);
      expect(ColorHelpers.isHex('#aaa')).to.equal(true);
      expect(ColorHelpers.isHex('#fff')).to.equal(true);
      expect(ColorHelpers.isHex('#ffffff')).to.equal(true);
      expect(ColorHelpers.isHex('#4183c4')).to.equal(true);
      expect(ColorHelpers.isHex('#ff9afd')).to.equal(true);
      expect(ColorHelpers.isHex('#000000')).to.equal(true);
    });
  });
  describe('isValidDecimalForRGB Method', () => {
    it('should validate decimal correctly', async () => {
      expect(ColorHelpers.isValidDecimalForRGB('300')).to.equal(false);
      expect(ColorHelpers.isValidDecimalForRGB('275')).to.equal(false);
      expect(ColorHelpers.isValidDecimalForRGB('256')).to.equal(false);
      expect(ColorHelpers.isValidDecimalForRGB('-1')).to.equal(false);
      expect(ColorHelpers.isValidDecimalForRGB('255.5')).to.equal(false);
      expect(ColorHelpers.isValidDecimalForRGB('255')).to.equal(true);
      expect(ColorHelpers.isValidDecimalForRGB('248')).to.equal(true);
      expect(ColorHelpers.isValidDecimalForRGB('0')).to.equal(true);
    });
  });
});
