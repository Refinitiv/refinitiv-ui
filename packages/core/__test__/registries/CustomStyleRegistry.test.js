import { expect } from '@refinitiv-ui/test-helpers';
import { CustomStyleRegistry } from '../../lib/registries/CustomStyleRegistry';
import { DuplicateStyleError } from '../../lib/errors/DuplicateStyleError';
import { mockCssString } from '../helper';

describe('TestCustomStyleRegistry', () => {
  let testNum = 0;
  const baseName = 'TestCustomStyleRegistry_';
  let testName;

  beforeEach(() => {
    testName = `${baseName}${testNum}`;
    testNum += 1;
  });

  it('Test define and fetch', () => {
    CustomStyleRegistry.define(testName, mockCssString);

    const fetchedCssString = CustomStyleRegistry.get(testName);

    expect(fetchedCssString).to.equal(mockCssString);
  });

  it('Test fetch not defined css', () => {
    // try to fetch styles for the element that was not defined
    const fetchedCssString = CustomStyleRegistry.get(testName);

    expect(fetchedCssString).to.equal('');
  });

  it('Test define twice same name', () => {
    CustomStyleRegistry.define(testName, mockCssString);

    try {
      CustomStyleRegistry.define(testName, mockCssString);
    }
    catch (error) {
      expect(error).instanceOf(DuplicateStyleError);
      expect(error.message).to.equalSnapshot();
    }
  });


});
