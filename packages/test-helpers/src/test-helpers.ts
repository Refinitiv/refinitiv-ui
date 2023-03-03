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
 * Check equality of 2 number.
 * If the value difference is within tolerance value, they are considered equal.
 * @param a number to be checked
 * @param b number to be checked
 * @param [tolerance = 0] tolerance value of the equality check, must equal or greater than 0
 * @param [inclusive = true] `true`: "smaller than or equal" check, `false`: "smaller than" check. If tolerance is 0, inclusive would be overwritten as `true`.
 *
 * @returns {boolean} equality result
 */
export const isEqual = (a: number, b: number, tolerance = 0, inclusive = true): boolean => {
  if (tolerance === 0) {
    inclusive = true;
  }
  const diff = Math.abs(a - b);
  return inclusive ? diff <= tolerance : diff < tolerance;
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
/* c8 ignore stop */
