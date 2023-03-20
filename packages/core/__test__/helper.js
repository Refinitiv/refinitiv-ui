import { elementUpdated, expect, nextFrame } from '@refinitiv-ui/test-helpers';

const data = {
  errorCount: 0,
  errorMessage: ''
};

let oldHandler;

export const asyncFrames = async () => {
  await nextFrame();
  await nextFrame();
};

export const elementUpdatedWithAsyncFrames = async (element) => {
  await elementUpdated(element);
  await asyncFrames();
};

const checkNoGlobalError = () => {
  expect(data.errorMessage).to.equal('', 'Global message raised: ' + data.errorMessage);
  expect(data.errorCount).to.equal(0, 'Global error happened');
};

const errorHandler = (msg, url, line, col, error) => {
  data.errorCount += 1;
  data.errorMessage = error.message;
  return true;
};

// some css to be used for Mock
export const mockCssString = ':host { margin: 0; }';

beforeEach(() => {
  data.errorCount = 0;
  data.errorMessage = '';

  oldHandler = window.onerror;
  window.onerror = errorHandler;
});

afterEach(async () => {
  await asyncFrames();

  window.onerror = oldHandler;

  checkNoGlobalError();
});

export const getErrors = () => {
  return Object.assign({}, data);
};

export const setErrors = (errorCount = 0, errorMessage = '') => {
  data.errorCount = errorCount;
  data.errorMessage = errorMessage;
};

export const isChrome = (/Chrome/).test(navigator.userAgent) && (/Google Inc/).test(navigator.vendor);
