import { expect } from '@refinitiv-ui/test-helpers';
import { isHex, removeHashSign } from '@refinitiv-ui/utils/color.js';

describe('isHex', function() {
  it('should return true for valid hex value', function() {
    expect(isHex('#FFF')).to.equal(true);
    expect(isHex('#123ABC')).to.equal(true);
  });

  it('should return false for invalid hex value', function() {
    expect(isHex('FFF')).to.equal(false);
    expect(isHex('#12G')).to.equal(false);
  });
});

describe('removeHashSign', function() {
  it('should remove hash sign from hex value', function() {
    expect(removeHashSign('#FFF')).to.equal('FFF');
  });

  it('should return hex value if it does not start with hash sign', function() {
    expect(removeHashSign('FFF')).to.equal('FFF');
  });
});
