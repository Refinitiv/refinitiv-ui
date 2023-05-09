// ResizeObserver loop error is considered benign as discussed in https://github.com/w3c/csswg-drafts/issues/5023
// This module converts the error into a warning instead
// Note that, mocha must be available in an imported context
before(function () {
  const originalOnError = window.onerror;
  window.onerror = function (event, ...args) {
    // Firefox: `ResizeObserver loop completed with undelivered notifications.`
    // Chrome: `ResizeObserver loop limit exceeded`
    // Safari: `ResizeObserver loop completed with undelivered notifications`
    // Each browser logs a slightly different messages yet they all start with `ResizeObserver loop`
    /* istanbul ignore else */
    if (typeof event === 'string' && event.startsWith('ResizeObserver loop')) {
      // eslint-disable-next-line no-console
      console.warn(`warning: ${event}`);
      return true;
    }
    else {
      return originalOnError ? originalOnError(event, ...args) as boolean : false;
    }
  };
});
