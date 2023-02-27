import type { Tooltip } from '../index.js';
import type { DocumentCallbacks } from '../helpers/types';
import { TimeoutTaskRunner } from '@refinitiv-ui/utils/async.js';
import { isIE } from '@refinitiv-ui/utils/browser.js';

/**
 * Tooltip manager is here to avoid setting multiple
 * events on document and do expensive pre-processing
 * in a common way
 */
class TooltipManager {
  private registry: Map<Tooltip, DocumentCallbacks> = new Map();

  /* 5 is chosen randomly to give long enough delay to avoid performance issues, but
  short enough for not showing the default title
  */
  private titleThrottler = new TimeoutTaskRunner(5);

  /**
   * Override default title attribute
   * @param paths Event paths
   * @returns {void}
   */
  private static overrideTitle (paths: EventTarget[]): void {
    const l = paths.length;
    for (let i = 0; i < l; i += 1) {
      const node = paths[i] as Node;
      if (node.nodeType !== Node.ELEMENT_NODE) {
        continue;
      }
      if (node === document.body || node === document.documentElement) {
        break;
      }
      const element = node as HTMLElement;
      const title = element.getAttribute('title');
      if (title) {
        element.title = title;
      }
    }
  }

  /**
   * @param event Mouse move event
   * @returns {void}
   */
  private onMouseMove = (event: MouseEvent): void => {
    const paths = event.composedPath(); /* paths may be lost if used in schedule */
    this.registry.forEach(({ mousemove }) => mousemove(event, paths));

    this.titleThrottler.schedule(() => {
      TooltipManager.overrideTitle(paths);
      this.registry.forEach(({ mousemoveThrottled }) => mousemoveThrottled(event, paths));
    });
  };

  /**
   * @param event Mouse click or contextmenu event
   * @returns {void}
   */
  private onClick = (event: MouseEvent): void => {
    this.registry.forEach(({ click }) => click(event));
  };

  /**
   * @param event Mouse out event
   * @returns {void}
   */
  private onMouseOut = (event: MouseEvent): void => {
    this.registry.forEach(({ mouseout }) => mouseout(event));
  };

  /**
   * @param event Mouse leave event
   * @returns {void}
   */
  private onMouseLeave = (event: MouseEvent): void => {
    this.registry.forEach(({ mouseleave }) => mouseleave(event));
  };

  /**
   * @param event Wheel event
   * @returns {void}
   */
  private onWheel = (event: WheelEvent): void => {
    this.registry.forEach(({ wheel }) => wheel(event));
  };

  /**
   * @param event Keyboard event
   * @returns {void}
   */
  private onKeyDown = (event: KeyboardEvent): void => {
    this.registry.forEach(({ keydown }) => keydown(event));
  };

  /**
   * @param event Focus event
   * @returns {void}
   */
  private onBlur = (event: FocusEvent): void => {
    this.registry.forEach(({ blur }) => blur(event));
  };

  public register (tooltip: Tooltip, documentCallbacks: DocumentCallbacks): void {
    if (!this.registry.size) {
      // IE11 does not support event options
      const supportOptions = !isIE;
      const eventOptions = supportOptions ? { passive: true } : undefined;

      document.addEventListener('mousemove', this.onMouseMove, eventOptions);
      document.addEventListener('mouseout', this.onMouseOut, eventOptions);
      document.addEventListener('mouseleave', this.onMouseLeave, eventOptions);
      document.addEventListener('wheel', this.onWheel, eventOptions);
      document.addEventListener('keydown', this.onKeyDown, eventOptions);
      document.body.addEventListener('blur', this.onBlur, eventOptions);

      const clickEventOptions = supportOptions ? { passive: true, capture: true } : true;
      document.addEventListener('click', this.onClick, clickEventOptions);
      document.addEventListener('contextmenu', this.onClick, clickEventOptions);
    }

    this.registry.set(tooltip, documentCallbacks);
  }

  public deregister (tooltip: Tooltip): void {
    this.registry.delete(tooltip);

    if (!this.registry.size) {
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseout', this.onMouseOut);
      document.removeEventListener('mouseleave', this.onMouseLeave);
      document.removeEventListener('wheel', this.onWheel);
      document.removeEventListener('keydown', this.onKeyDown);
      document.body.removeEventListener('blur', this.onBlur);

      document.removeEventListener('click', this.onClick, true);
      document.removeEventListener('contextmenu', this.onClick, true);
    }
  }
}

const tooltipManager = new TooltipManager();

/**
 * Register the new tooltip
 * @param tooltip Tooltip
 * @param documentCallbacks Callback to attach on document and body
 * @returns {void}
 */
export const register = (tooltip: Tooltip, documentCallbacks: DocumentCallbacks): void => {
  tooltipManager.register(tooltip, documentCallbacks);
};

/**
 * Deregister the tooltip
 * @param tooltip Tooltip
 * @returns {void}
 */
export const deregister = (tooltip: Tooltip): void => {
  tooltipManager.deregister(tooltip);
};
