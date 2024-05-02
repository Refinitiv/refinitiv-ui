import { elementUpdated, expect, nextFrame } from '@refinitiv-ui/test-helpers';

const data = {
  errorCount: 0,
  errorMessage: '',
  errorObject: undefined
};

let oldHandler;

export const elementUpdatedWithAsyncFrames = async (element) => {
  await elementUpdated(element);

  await nextFrame(2);
};

const checkNoGlobalError = () => {
  expect(data.errorMessage).to.equal('', 'Global message raised: ' + data.errorMessage);
  expect(data.errorCount).to.equal(0, 'Global error happened');
};

const errorHandler = (msg, url, line, col, error) => {
  data.errorCount += 1;
  data.errorMessage = error.message;
  data.errorObject = error;
  return true;
};

// some css to be used for Mock
export const mockCssString = ':host { margin: 0; }';

beforeEach(() => {
  data.errorCount = 0;
  data.errorMessage = '';
  data.errorInstance = undefined;

  oldHandler = window.onerror;
  window.onerror = errorHandler;
});

afterEach(async () => {
  await nextFrame(2);

  window.onerror = oldHandler;

  checkNoGlobalError();
});

export const getErrors = () => {
  return Object.assign({}, data);
};

export const setErrors = (errorCount = 0, errorMessage = '', errorObject = undefined) => {
  data.errorCount = errorCount;
  data.errorMessage = errorMessage;
  data.errorObject = errorObject;
};

export const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

export const isLocalhost = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
