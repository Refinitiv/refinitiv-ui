/**
 * https://github.com/juggle/resize-observer/issues/42
 *
 * This event ensures that ResizeObserver picks up resize events
 * when the element is deeply nested inside shadow root.
 * TODO: remove this workaround once ResizeObserver handles shadow root scenario
 * @returns {void}
 */
export const triggerResize = (): void => {
  window.dispatchEvent(new Event('animationiteration'));
};
