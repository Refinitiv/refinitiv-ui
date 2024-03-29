import { expect } from '@refinitiv-ui/test-helpers';

import { DuplicateStyleError } from '../../lib/errors/DuplicateStyleError.js';
import { CustomStyleRegistry } from '../../lib/registries/CustomStyleRegistry.js';
import { mockCssString } from '../helper.js';

const duplicateStyleErrorMessage = `Only one theme file can be loaded per element

[TestCustomStyleRegistry_2] has already been defined.

Potential causes:
1. You are trying to load a multiple variants of a theme
2. You have loaded multiple or duplicate themes in your application bundle

https://ui.refinitiv.com/kb/duplicate-styles
`;
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

  it('Test define twice same name', async function () {
    CustomStyleRegistry.define(testName, mockCssString);

    try {
      CustomStyleRegistry.define(testName, mockCssString);
    } catch (error) {
      expect(error).instanceOf(DuplicateStyleError);
      await expect(error.message).to.equal(duplicateStyleErrorMessage);
    }
  });
});
