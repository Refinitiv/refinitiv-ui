/* istanbul ignore file */
import { isIE } from '@open-wc/testing';

export {
  html,
  unsafeStatic,
  expect,
  should,
  assert,
  triggerBlurFor,
  triggerFocusFor,
  oneEvent,
  isIE,
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
