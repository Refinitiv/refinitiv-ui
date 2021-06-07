/* istanbul ignore file */
import { isIE } from '@open-wc/testing';

export {
  expect,
  should,
  assert,
  html,
  unsafeStatic,
  triggerBlurFor,
  triggerFocusFor,
  oneEvent,
  isIE,
  defineCE,
  aTimeout,
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
  if (!isIE()) {
    return new KeyboardEvent(type, init);
  }

  const event = new CustomEvent(type, {
    detail: 0,
    bubbles: true,
    cancelable: true,
    composed: true
  }) as CustomKeyboardEvent;
  event.key = init.key || '';
  event.shiftKey = init.shiftKey || false;
  event.altKey = init.altKey || false;
  event.ctrlKey = init.ctrlKey || false;
  event.metaKey = init.metaKey || false;

  return event;
};
