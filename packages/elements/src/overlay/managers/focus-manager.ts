import type { Overlay } from '../elements/overlay';
import { AnimationTaskRunner } from '@refinitiv-ui/utils/async.js';
import { getOverlays } from './zindex-manager.js';
import { FocusableHelper } from '@refinitiv-ui/core';

type ActiveTabbableNodes = {
  nodes: HTMLElement[];
  tabbableMap: Map<HTMLElement, Overlay>;
};

/**
 * Focus manager ensures that the correct
 * element receives the focus
 * @returns {void}
 */
export class FocusManager {
  private focusThrottler = new AnimationTaskRunner(); /* used to delay focus to give time for overlay to show up */
  private registry = new Set<Overlay>();
  private restoreFocusElement: HTMLElement | null = null; /* used to restore focus on close */
  private lastFocused = new WeakMap<Overlay, HTMLElement>(); /* used to store last focused item */

  private get overlays (): Overlay[] {
    return getOverlays().filter(overlay => this.registry.has(overlay));
  }

  private get focusBoundaryElements (): Array<HTMLElement | ShadowRoot> {
    return getOverlays()
      .map(overlay => overlay.focusBoundary)
      .filter(focusBoundary => focusBoundary !== null) as Array<HTMLElement | ShadowRoot>;
  }

  private getTabbableElements (overlay: Overlay): HTMLElement[] {
    return overlay.focusBoundary ? FocusableHelper.getTabbableNodes(overlay.focusBoundary) : [];
  }

  private getActiveTabbableNodes (reverse: boolean): ActiveTabbableNodes {
    const sorted = this.overlays;

    const nodes: HTMLElement[] = [];
    const tabbableMap: Map<HTMLElement, Overlay> = new Map();

    for (let i = 0; i < sorted.length; i += 1) {
      const overlay = sorted[i];

      const tabbable = this.getTabbableElements(overlay);
      tabbable.forEach(node => tabbableMap.set(node, overlay));

      if (reverse) {
        nodes.push(...tabbable);
      }
      else {
        nodes.splice(0, 0, ...tabbable);
      }


      if (overlay.withBackdrop) { /* if the overlay has backdrop all other overlays with smaller z-index are outside tab scope */
        break;
      }

      if (document.activeElement === overlay && nodes.length) { /* if overlay itself is in focus, try to always focus withing the focused overlay */
        break;
      }
    }

    if (reverse) {
      nodes.reverse();
    }

    return {
      nodes,
      tabbableMap
    };
  }

  private onTabKey (event: KeyboardEvent): void {
    const {
      nodes,
      tabbableMap
    } = this.getActiveTabbableNodes(event.shiftKey);

    if (nodes.length === 0) {
      return;
    }

    if (nodes.length === 1) { /* no other focusable nodes */
      event.preventDefault();
      nodes[0].focus();
      return;
    }

    const focusNode = this.getReTargetFocusNode(nodes);

    if (focusNode) {
      event.preventDefault();
      const overlay = tabbableMap.get(focusNode);
      const topOverlay = this.overlays[0];
      if (overlay && topOverlay && topOverlay !== overlay) {
        overlay.toFront();
      }

      focusNode.focus();
    }
  }

  private getReTargetFocusNode (nodes: HTMLElement[]): HTMLElement | null {
    const activeElement = this.getActiveElement();
    if (!activeElement || activeElement === nodes[nodes.length - 1] || !this.isFocusBoundaryDescendant(activeElement)) {
      return nodes[0];
    }
    return null;
  }

  private getShadowActiveElement (activeElement: Element | null): null | Element {
    if (activeElement?.shadowRoot?.activeElement) {
      return this.getShadowActiveElement(activeElement.shadowRoot.activeElement);
    }
    return activeElement;
  }

  private getActiveElement (): null | HTMLElement {
    return this.getShadowActiveElement(document.activeElement) as HTMLElement | null;
  }

  private isFocusBoundaryDescendant (element: HTMLElement): boolean {
    const focusBoundaryElements = this.focusBoundaryElements;
    let node = element.parentNode;
    while (node) {
      if ((node instanceof HTMLElement || node instanceof ShadowRoot) && focusBoundaryElements.includes(node)) {
        return true;
      }
      // parenNode is not defined if the node is inside document fragment. Use host instead
      node = node.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? (node as ShadowRoot).host : node.parentNode;
    }

    return false;
  }

  /**
   * Run when document key down event happens
   * @param event Keyboard event
   * @returns {void}
   */
  private onDocumentKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Tab') {
      this.onTabKey(event);
      return;
    }
  };

  /**
   * True if passed target is a registered overlay
   * @param target Target to check
   * @returns true if registered overlay
   */
  private isRegisteredOverlay = (target: EventTarget): boolean => this.overlays.includes(target as Overlay);

  /**
   * Run on overlay focus order to restore overlay focus
   * @param event focusin event
   * @returns {void}
   */
  private onOverlayFocus = (event: FocusEvent): void => {
    const overlay = event.composedPath().find(this.isRegisteredOverlay);
    if (overlay) {
      this.lastFocused.set(overlay as Overlay, event.target as HTMLElement);
    }
  };

  public register (overlay: Overlay): void {
    if (!this.registry.size) {
      this.restoreFocusElement = document.activeElement as HTMLElement; /* store this only once, as overlay order may change */
      document.addEventListener('keydown', this.onDocumentKeyDown, { capture: true });
    }

    if (!this.registry.has(overlay)) {
      this.registry.add(overlay);

      // cannot use focusin as it is not propagated through shadow DOM
      overlay.addEventListener('focus', this.onOverlayFocus, true);

      if (!overlay.noAutofocus) {
        this.focusThrottler.schedule(() => {
          overlay.opened && overlay.focus(); /* always focus the last added overlay */
        });
      }
    }
  }

  public deregister (overlay: Overlay): void {
    if (this.registry.has(overlay)) {
      overlay.removeEventListener('focus', this.onOverlayFocus, true);
      this.lastFocused.delete(overlay);
      this.registry.delete(overlay);

      if (!this.registry.size) {
        document.removeEventListener('keydown', this.onDocumentKeyDown, { capture: true });

        /* istanbul ignore next */
        if (this.restoreFocusElement) {
          this.restoreFocusElement.focus();
        }

        this.restoreFocusElement = null;
      }
      else if (!overlay.noInteractionLock) {
        // if removed overlay has scroll lock (default), move the focus to last focused node in
        // the next available overlay (top overlay)
        const topOverlay = this.overlays[0];
        if (topOverlay) {
          const focusNode = this.lastFocused.get(topOverlay) || this.getTabbableElements(topOverlay)[0] || topOverlay;
          this.focusThrottler.schedule(() => {
            if (!topOverlay.opened) {
              // It is possible that overlay gets closed during throttling
              return;
            }
            // Make sure that focus is kept within active overlay
            const tabbableElements = this.getTabbableElements(topOverlay);
            const activeElement = this.getActiveElement();
            if (!activeElement || !tabbableElements.includes(activeElement)) {
              focusNode.focus();
            }
          });
        }
      }
    }
  }

  /**
   * @returns count of elements inside manager
   */
  public size (): number {
    return this.registry.size;
  }

  /**
   * applies deregister for each element in registry
   * @returns {void}
   */
  public clear (): void {
    this.registry.forEach(overlay => this.deregister(overlay));
  }
}

const focusManager = new FocusManager();

/**
 * Register the new overlay
 * @param overlay Overlay
 * @returns {void}
 */
export const register = (overlay: Overlay): void => {
  focusManager.register(overlay);
};

/**
 * Deregister the overlay
 * @param overlay Overlay
 * @returns {void}
 */
export const deregister = (overlay: Overlay): void => {
  focusManager.deregister(overlay);
};

/**
 * @returns count of elements inside manager
 */
export const size = (): number => {
  return focusManager.size();
};

/**
 * removes all elements from registry
 * @returns {void}
 */
export const clear = (): void => {
  focusManager.clear();
};
