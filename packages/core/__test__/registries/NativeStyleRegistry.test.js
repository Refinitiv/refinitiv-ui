import { expect } from '@refinitiv-ui/test-helpers';

import { DuplicateStyleError } from '../../lib/errors/DuplicateStyleError.js';
import { NativeStyleRegistry } from '../../lib/registries/NativeStyleRegistry.js';
import { mockCssString } from '../helper.js';

const duplicateStyleErrorMessage = `Only one theme file can be loaded per element

[TestNativeStyleRegistry_2] has already been defined.

Potential causes:
1. You are trying to load a multiple variants of a theme
2. You have loaded multiple or duplicate themes in your application bundle

https://ui.refinitiv.com/kb/duplicate-styles
`;
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

  it('Test define twice same name', async function () {
    NativeStyleRegistry.define(testName, mockCssString);

    try {
      NativeStyleRegistry.define(testName, mockCssString);
    } catch (error) {
      expect(error).instanceOf(DuplicateStyleError);
      await expect(error.message).to.equal(duplicateStyleErrorMessage);
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
