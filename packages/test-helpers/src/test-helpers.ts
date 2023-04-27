export {
  html,
  unsafeStatic,
  expect,
  should,
  assert,
  triggerBlurFor,
  triggerFocusFor,
  oneEvent,
  defineCE,
  aTimeout,
  waitUntil,
  litFixture,
  litFixtureSync,
  fixture,
  fixtureSync,
  fixtureCleanup,
  elementUpdated
} from '@open-wc/testing';
import { nextFrame as _nextFrame } from '@open-wc/testing';

/**
 * Replace special whitespace with normal whitespace
 * @param text string with whitespace for replace
 * @returns string
 */
export const replaceWhitespace = (text: string): string => text.replace(/\s/g, ' ');

/**
 * Resolves after requestAnimationFrame.
 * @param [frameCount = 1] number of animationFrame to be requested
 *
 * @returns {Promise<void>} Promise that resolved after requestAnimationFrame
 */
export const nextFrame = async (frameCount = 1): Promise<void> => {
  for (let i = 0; i < frameCount; i++) {
    await _nextFrame();
  }
};

/**
 * Check value difference between 2 number.
 * If it's within `distance` value, they are near.
 * @param a 1 of the 2 numbers to be checked
 * @param b 1 of the 2 numbers to be checked
 * @param distance maximum value difference of `a` & `b` to be considered near, must equal or greater than 0
 * @param [inclusive = true] `true`: value difference must be smaller or equal to `distance` , `false`: value difference must be smaller than `distance`
 *  If `distance` is 0, inclusive would be overwritten as `true`.
 *
 * @returns {boolean} equality result
 */
export const isNear = (a: number, b: number, distance: number, inclusive = true): boolean => {
  if (distance === 0) {
    inclusive = true;
  }
  const diff = Math.abs(a - b);
  return inclusive ? diff <= distance : diff < distance;
};

/* c8 ignore start */

/**
 * Check browser is Safari
 * @param version select version to checking
 * @returns boolean
 */
export const isSafari = (version = undefined): boolean => { // Indicates if this is Safari. Put version parameter to specific version.
  const safari = (/Safari/).test(navigator.userAgent) && !(/Chrome/).test(navigator.userAgent);
  if (version) {
    return safari && (navigator.userAgent.indexOf(`Version\/${String(version)}`) > -1);
  }
  return safari;
};

/**
 * Check browser is Firefox
 * @returns boolean
 */
export const isFirefox = (): boolean => (/firefox/i).test(navigator.userAgent);

/**
 * Check browser is Mobile
 * @returns boolean
 */
export const isMobile = (): boolean => (/iPhone|iPad|iPod|Android/i).test(window.navigator.userAgent);
/* c8 ignore stop */

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
    if (typeof event === 'string' && event.startsWith('ResizeObserver loop')) {
      // eslint-disable-next-line no-console
      console.warn(`warning: ${event}`);
      return true;
    }
    /* c8 ignore start */
    else {
      return originalOnError ? originalOnError(event, ...args) as boolean : false;
    }
    /* c8 ignore stop */
  };
});
