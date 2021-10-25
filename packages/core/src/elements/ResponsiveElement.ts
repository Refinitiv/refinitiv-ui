import { BasicElement } from './BasicElement.js';
import { ResizeObserver, ResizeObserverEntry } from '@juggle/resize-observer';

export type ElementSize = {
  width: number;
  height: number;
};

/**
 * @event resize
 * Dispatched when the content changes its size
 */
export type ResizeEvent = CustomEvent<{
  /**
   * New width of the element
   */
  width: number;
  /**
   * New height of the element
   */
  height: number;
}>;

/**
 * Triggers resizedCallback on an element,
 * allowing for content to react to changes
 * before firing a resize event.
 * @param entry ResizeObserverEntry
 * @returns {void}
 */
const triggerResize = (entry: ResizeObserverEntry): void => {
  const { inlineSize: width, blockSize: height } = entry.borderBoxSize[0];
  const event = new CustomEvent('resize', {
    bubbles: false,
    cancelable: false,
    detail: {
      width: width,
      height: height
    }
  });

  /**
   * Trigger resizedCallback before dispatching resize event,
   * to make sure everything inside the function is executed and ready to use
   * in an EventListener
   */
  (entry.target as ResponsiveElement).resizedCallback({ width, height });
  entry.target.dispatchEvent(event);
};

/**
 * Global resize observer,
 * used to watch changes in element dimensions
 */
const resizeObserver = new ResizeObserver(entries => {
  entries.forEach(entry => triggerResize(entry));
});

/**
 * Responsive element base class.
 * Used for creating elements that need to
 * be aware of their dimensions. Data-viz, charts, grids, etc.
 */
export abstract class ResponsiveElement extends BasicElement {
  /**
   * Called when the element has been appended to the DOM
   * @returns {void}
   */
  public connectedCallback (): void {
    super.connectedCallback();
    resizeObserver.observe(this, {
      box: 'border-box' // Observe the outer edges
    });
  }

  /**
   * Called when the element has been removed from the DOM
   * @returns {void}
   */
  public disconnectedCallback (): void {
    resizeObserver.unobserve(this);
    super.disconnectedCallback();
  }

  /**
   * Called when the element's dimensions have changed
   * @param size dimension details
   * @returns {void}
   */
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  public resizedCallback (size: ElementSize): void {
    // placeholder
  }

}
