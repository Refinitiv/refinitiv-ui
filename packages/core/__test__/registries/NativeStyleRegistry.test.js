import { expect } from '@refinitiv-ui/test-helpers';

import { DuplicateStyleError } from '../../lib/errors/DuplicateStyleError';
import { NativeStyleRegistry } from '../../lib/registries/NativeStyleRegistry';
import { mockCssString } from '../helper';

describe('TestNativeStyleRegistry', function() {
  let testNum = 0;
  const baseName = 'TestNativeStyleRegistry_';
  let testName;

  beforeEach(function() {
    testName = `${baseName}${testNum}`;
    testNum += 1;
  });

  it('Test define and fetch', function() {
    NativeStyleRegistry.define(testName, mockCssString);

    const fetchedCssString = NativeStyleRegistry.get(testName);

    expect(fetchedCssString).to.equal(mockCssString);
  });

  it('Test fetch not defined css', function() {
    const fetchedCssString = NativeStyleRegistry.get(testName);

    expect(fetchedCssString).to.equal('');
  });

  it('Test define twice same name', function() {
    NativeStyleRegistry.define(testName, mockCssString);

    try {
      NativeStyleRegistry.define(testName, mockCssString);
    } catch (error) {
      expect(error).instanceOf(DuplicateStyleError);
      expect(error.message).to.equalSnapshot();
    }
  });

  it('Test defined scope exists', function() {
    NativeStyleRegistry.define(testName, mockCssString);

    const node = document.querySelector(`[scope=${testName}]`);

    expect(node).to.exist;
  });

  it('Test empty css will not be exists in styles', function() {
    NativeStyleRegistry.define(testName, '');

    const node = document.querySelector(`[scope=${testName}]`);

    expect(node).to.not.exist;
  });
});
