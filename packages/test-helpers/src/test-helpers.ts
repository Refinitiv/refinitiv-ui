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
  nextFrame,
  litFixture,
  litFixtureSync,
  fixture,
  fixtureSync,
  fixtureCleanup,
  elementUpdated
} from '@open-wc/testing';

/**
 * Replace special whitespace with normal whitespace
 * @param text string with whitespace for replace
 * @returns string
 */
export const replaceWhitespace = (text: string): string => text.replace(/\s/g, ' ');


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
