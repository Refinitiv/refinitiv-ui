import { expect } from '@refinitiv-ui/test-helpers';

import { ready } from '../../lib/utils/elementReady.js';
import { asyncFrames, getErrors, setErrors } from '../helper.js';

describe('TestReady', function () {
  const baseName = 'TestReady_';
  let testName;
  let testNum = 0;

  let callbackCallCount;

  const simpleCallback = () => {
    callbackCallCount += 1;
  };

  const thrownCallback = () => {
    throw new Error('test');
  };

  beforeEach(function () {
    testName = `${baseName}${testNum}`;
    testNum += 1;
    callbackCallCount = 0;
  });

  it('Test callback one time', function () {
    ready(testName, simpleCallback);

    expect(callbackCallCount).to.equal(0, 'Callback was called from first time');
  });

  it('Test callback two times', function () {
    ready(testName, simpleCallback);
    ready(testName, simpleCallback);

    expect(callbackCallCount).to.equal(2, 'Callback was not called two times');
  });

  it('Test callback three times', function () {
    ready(testName, simpleCallback);
    ready(testName, simpleCallback);
    ready(testName, simpleCallback);

    expect(callbackCallCount).to.equal(2, 'Callback was called three times');
  });

  it('Test callback called one time and throw error', async function () {
    ready(testName, simpleCallback);
    ready(testName, thrownCallback);

    expect(callbackCallCount).to.equal(1, 'First callback was not called before throw error');

    await asyncFrames();

    const { errorMessage, errorCount } = getErrors();

    expect(errorCount).to.equal(1, 'Error not thrown');
    await expect(errorMessage).to.equal('test');

    setErrors();
  });
});
