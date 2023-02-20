import { expect } from '@refinitiv-ui/test-helpers';
import { isHex, removeHashSign } from '@refinitiv-ui/utils/color.js';

describe('isHex', () => {
  it('should return true for valid hex value', async () => {
    expect(isHex('#FFF')).to.equal(true);
    expect(isHex('#123ABC')).to.equal(true);
  });
  
  it('should return false for invalid hex value', async () => {
    expect(isHex('FFF')).to.equal(false);
    expect(isHex('#12G')).to.equal(false);
  });
});

describe('removeHashSign', () => {
  it('should remove hash sign from hex value', async () => {
    expect(removeHashSign('#FFF')).to.equal('FFF');
  });
  
  it('should return hex value if it does not start with hash sign', async () => {
    expect(removeHashSign('FFF')).to.equal('FFF');
  });
});
