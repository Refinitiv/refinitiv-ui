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

/* c8 ignore start */
export const isSafari = (version = undefined) => { // Indicates if this is Safari. Put version parameter to specific version.
  const safari = !(/Chrome/).test(navigator.userAgent) && (/Apple Computer/).test(navigator.vendor);
  if (version) {
    return safari && (navigator.userAgent.indexOf(`Version\/${String(version)}`) > -1);
  }
  return safari;
};

export const isFirefox = () => (/firefox/i).test(navigator.userAgent);
/* c8 ignore stop */
