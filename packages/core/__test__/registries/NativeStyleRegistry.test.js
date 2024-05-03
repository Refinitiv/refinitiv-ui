import { expect } from '@refinitiv-ui/test-helpers';

import { DuplicateStyleError } from '../../lib/errors/DuplicateStyleError.js';
import { NativeStyleRegistry } from '../../lib/registries/NativeStyleRegistry.js';
import { isLocalhost, mockCssString } from '../helper.js';

describe('TestNativeStyleRegistry', function () {
  let testNum = 0;
  const baseName = 'TestNativeStyleRegistry_';
  let testName;

  beforeEach(function () {
    testName = `${baseName}${testNum}`;
    testNum += 1;
  });

  it('Test define and fetch', function () {
    NativeStyleRegistry.define(testName, mockCssString);

    const fetchedCssString = NativeStyleRegistry.get(testName);

    expect(fetchedCssString).to.equal(mockCssString);
  });

  it('Test fetch not defined css', function () {
    const fetchedCssString = NativeStyleRegistry.get(testName);

    expect(fetchedCssString).to.equal('');
  });

  it('Test define twice same name', function () {
    NativeStyleRegistry.define(testName, mockCssString);

    if (isLocalhost) {
      expect(() => {
        NativeStyleRegistry.define(testName, mockCssString);
      }).to.throw(DuplicateStyleError);
    } else {
      expect(() => {
        NativeStyleRegistry.define(testName, mockCssString);
      }).not.to.throw(DuplicateStyleError);
    }
  });

  it('Test defined scope exists', function () {
    NativeStyleRegistry.define(testName, mockCssString);

    const node = document.querySelector(`[scope=${testName}]`);

    expect(node).to.exist;
  });

  it('Test empty css will not be exists in styles', function () {
    NativeStyleRegistry.define(testName, '');

    const node = document.querySelector(`[scope=${testName}]`);

    expect(node).to.not.exist;
  });
});
