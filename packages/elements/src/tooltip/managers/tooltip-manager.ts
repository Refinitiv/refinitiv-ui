import { requireElfScope } from '@refinitiv-ui/core';

import { TimeoutTaskRunner } from '@refinitiv-ui/utils/async.js';

import type { DocumentCallbacks } from '../helpers/types';
import type { Tooltip } from '../index.js';

/**
 * Tooltip manager is here to avoid setting multiple
 * events on document and do expensive pre-processing
 * in a common way
 */
class TooltipManager {
  private registry: Map<Tooltip, DocumentCallbacks> = new Map();

  public constructor(private readonly root: ShadowRoot) {}
  private titleThrottler = new TimeoutTaskRunner(5);

  /**
   * Cancel the pending task of throttled mousemove event listener.
   * This prevents the task from running out of order compared to the event dispatching sequence
   * due to its setTimeout usage.
   * Any event listener hiding the tooltip should call this method.
   * @returns {void}
   */
  private cancelThrottler() {
    this.titleThrottler.task?.cancel();
  }

  /**
   * @param event Mouse move event
   * @returns {void}
   */
  private onMouseMove = (event: MouseEvent): void => {
    const eventPath = event.composedPath();
    const paths = eventPath.slice(0, eventPath.indexOf(this.root) + 1);
    this.registry.forEach(({ mousemove }) => mousemove(event, paths));

    this.titleThrottler.schedule(() => {
      this.registry.forEach(({ mousemoveThrottled }) => mousemoveThrottled(event, paths));
    });
  };

  /**
   * @param event Mouse click or contextmenu event
   * @returns {void}
   */
  private onClick = (event: MouseEvent): void => {
    this.cancelThrottler();
    this.registry.forEach(({ click }) => click(event));
  };

  /**
   * @param event Mouse out event
   * @returns {void}
   */
  private onMouseOut = (event: MouseEvent): void => {
    this.cancelThrottler();
    this.registry.forEach(({ mouseout }) => mouseout(event));
    if (!(event.relatedTarget instanceof Node) || !this.root.contains(event.relatedTarget)) {
      this.registry.forEach(({ mouseleave }) => mouseleave(event));
    }
  };

  /**
   * @param event Mouse leave event
   * @returns {void}
   */
  private onMouseLeave = (event: MouseEvent): void => {
    this.cancelThrottler();
    this.registry.forEach(({ mouseleave }) => mouseleave(event));
  };

  /**
   * @param event Wheel event
   * @returns {void}
   */
  private onWheel = (event: WheelEvent): void => {
    this.cancelThrottler();
    this.registry.forEach(({ wheel }) => wheel(event));
  };

  /**
   * @param event Keyboard event
   * @returns {void}
   */
  private onKeyDown = (event: KeyboardEvent): void => {
    this.cancelThrottler();
    this.registry.forEach(({ keydown }) => keydown(event));
  };

  /**
   * @param event Focus event
   * @returns {void}
   */
  private onBlur = (event: FocusEvent): void => {
    this.cancelThrottler();
    this.registry.forEach(({ blur }) => blur(event));
  };

  public register(tooltip: Tooltip, documentCallbacks: DocumentCallbacks): void {
    if (!this.registry.size) {
      const eventOptions = { passive: true };
      this.root.addEventListener('mousemove', this.onMouseMove as EventListener, eventOptions);
      this.root.addEventListener('mouseout', this.onMouseOut as EventListener, eventOptions);
      this.root.addEventListener('mouseleave', this.onMouseLeave as EventListener, eventOptions);
      this.root.addEventListener('wheel', this.onWheel as EventListener, eventOptions);
      this.root.addEventListener('keydown', this.onKeyDown as EventListener, eventOptions);
      this.root.addEventListener('blur', this.onBlur as EventListener, { ...eventOptions, capture: true });

      const clickEventOptions = { passive: true, capture: true };
      this.root.addEventListener('click', this.onClick as EventListener, clickEventOptions);
      this.root.addEventListener('contextmenu', this.onClick as EventListener, clickEventOptions);
    }

    this.registry.set(tooltip, documentCallbacks);
  }

  public deregister(tooltip: Tooltip): void {
    this.registry.delete(tooltip);

    if (!this.registry.size) {
      this.cancelThrottler();
      this.root.removeEventListener('mousemove', this.onMouseMove as EventListener);
      this.root.removeEventListener('mouseout', this.onMouseOut as EventListener);
      this.root.removeEventListener('mouseleave', this.onMouseLeave as EventListener);
      this.root.removeEventListener('wheel', this.onWheel as EventListener);
      this.root.removeEventListener('keydown', this.onKeyDown as EventListener);
      this.root.removeEventListener('blur', this.onBlur as EventListener, true);
      this.root.removeEventListener('click', this.onClick as EventListener, true);
      this.root.removeEventListener('contextmenu', this.onClick as EventListener, true);
    }
  }
}

const tooltipManagers = new WeakMap<ShadowRoot, TooltipManager>();

/**
 * Register the new tooltip
 * @param tooltip Tooltip
 * @param documentCallbacks Callback to attach on document and body
 * @returns {void}
 */
export const register = (tooltip: Tooltip, documentCallbacks: DocumentCallbacks): void => {
  const root = requireElfScope(tooltip).root;
  let tooltipManager = tooltipManagers.get(root);
  if (!tooltipManager) {
    tooltipManager = new TooltipManager(root);
    tooltipManagers.set(root, tooltipManager);
  }
  tooltipManager.register(tooltip, documentCallbacks);
};

/**
 * Deregister the tooltip
 * @param tooltip Tooltip
 * @returns {void}
 */
export const deregister = (tooltip: Tooltip): void => {
  tooltipManagers.get(requireElfScope(tooltip).root)?.deregister(tooltip);
};
