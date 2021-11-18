import { expect } from '@refinitiv-ui/test-helpers';
import { NativeStyleRegistry } from '../../lib/registries/NativeStyleRegistry';
import { DuplicateStyleError } from '../../lib/errors/DuplicateStyleError';
import { mockCssString } from '../helper';

describe('TestNativeStyleRegistry', () => {
  let testNum = 0;
  const baseName = 'TestNativeStyleRegistry_';
  let testName;

  beforeEach(() => {
    testName = `${baseName}${testNum}`;
    testNum += 1;
  });

  it('Test define and fetch', () => {
    NativeStyleRegistry.define(testName, mockCssString);

    const fetchedCssString = NativeStyleRegistry.get(testName);

    expect(fetchedCssString).to.equal(mockCssString);
  });

  it('Test fetch not defined css', () => {
    const fetchedCssString = NativeStyleRegistry.get(testName);

    expect(fetchedCssString).to.equal('');
  });

  it('Test define twice same name', () => {
    NativeStyleRegistry.define(testName, mockCssString);

    try {
      NativeStyleRegistry.define(testName, mockCssString);
    }
    catch (error) {
      expect(error).instanceOf(DuplicateStyleError);
      expect(error.message).to.equalSnapshot();
    }
  });

  it('Test defined scope exists', () => {
    NativeStyleRegistry.define(testName, mockCssString);

    const node = document.querySelector(`[scope=${testName}]`);

    expect(node).to.exist;
  });

  it('Test empty css will not be exists in styles', () => {
    NativeStyleRegistry.define(testName, '');

    const node = document.querySelector(`[scope=${testName}]`);

    expect(node).to.not.exist;
  });

});
