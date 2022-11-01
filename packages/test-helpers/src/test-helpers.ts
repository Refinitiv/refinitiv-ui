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

export interface CustomKeyboardEvent extends CustomEvent {
  key: string;
  shiftKey: boolean;
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
}

/**
 * Create a new keyboard event object support modern web browsers and IE 11
 * @param {string} type event type
 * @param {KeyboardEventInit} init initial values
 * @returns {KeyboardEvent|CustomKeyboardEvent} keyboard event
 */
export const keyboardEvent = (type: string, init: KeyboardEventInit = {}): KeyboardEvent|CustomKeyboardEvent => {
  return new KeyboardEvent(type, init);
};
