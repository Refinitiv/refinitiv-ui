import { expect } from '@refinitiv-ui/test-helpers';

import { DuplicateStyleError } from '../../lib/errors/DuplicateStyleError.js';
import { CustomStyleRegistry } from '../../lib/registries/CustomStyleRegistry.js';
import { isLocalhost, mockCssString } from '../helper.js';

describe('TestCustomStyleRegistry', function () {
  let testNum = 0;
  const baseName = 'TestCustomStyleRegistry_';
  let testName;

  beforeEach(function () {
    testName = `${baseName}${testNum}`;
    testNum += 1;
  });

  it('Test define and fetch', function () {
    CustomStyleRegistry.define(testName, mockCssString);

    const fetchedCssString = CustomStyleRegistry.get(testName);

    expect(fetchedCssString).to.equal(mockCssString);
  });

  it('Test fetch not defined css', function () {
    // try to fetch styles for the element that was not defined
    const fetchedCssString = CustomStyleRegistry.get(testName);

    expect(fetchedCssString).to.equal('');
  });

  it('Test define twice same name', function () {
    CustomStyleRegistry.define(testName, mockCssString);

    if (isLocalhost) {
      expect(() => {
        CustomStyleRegistry.define(testName, mockCssString);
      }).to.throw(DuplicateStyleError);
    } else {
      expect(() => {
        CustomStyleRegistry.define(testName, mockCssString);
      }).not.to.throw(DuplicateStyleError);
    }
  });
});
