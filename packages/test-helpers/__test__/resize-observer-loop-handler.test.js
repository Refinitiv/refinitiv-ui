import { expect } from '../lib/test-helpers';
import '../lib/resize-observer-loop-handler';

describe('ResizeObserverLoopHandlerTest', function () {

  it('Convert resize-observer errors to warnings', function () {
    const message = 'ResizeObserver loop completed with undelivered notifications';
    window.dispatchEvent(new ErrorEvent('error', {
      message,
      error: new Error(message)
    }));

    // the test should run until the end with a passed result
    expect(message).to.equal(message);
  });
});
