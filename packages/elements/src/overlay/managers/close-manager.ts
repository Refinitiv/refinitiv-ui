import type { Overlay } from '../elements/overlay';
import { getOverlays } from './zindex-manager';
import { TapEvent } from '@refinitiv-ui/core';

type CloseCallback = () => void;
type OverlayClose = {
  overlay: Overlay;
  closeCallback: CloseCallback;
};

/**
 * Close manager ensures that the correct (or the most top) overlay
 * is closed on ESC and click events
 * @returns {void}
 */
export class CloseManager {
  private registry: Map<Overlay, CloseCallback> = new Map();

  private get overlays (): Overlay[] {
    return getOverlays().filter(overlay => this.registry.has(overlay));
  }

  private getTopOverlay (): OverlayClose | null {
    const overlay = this.overlays[0];

    /* istanbul ignore next */
    if (!overlay) {
      return null;
    }

    const closeCallback = this.registry.get(overlay) as CloseCallback;

    return {
      overlay,
      closeCallback
    };
  }

  private onKeyDown = ({ key }: KeyboardEvent): void => {
    switch (key) {
      case 'Esc':
      case 'Escape':
        this.onEscKey();
      // no default
    }
  };

  private onEscKey (): void {
    const topOverlay = this.getTopOverlay();

    /* istanbul ignore next */
    if (!topOverlay) {
      return;
    }

    const {
      overlay,
      closeCallback
    } = topOverlay;

    // Do nothing
    if (overlay.noCancelOnEscKey) {
      return;
    }

    closeCallback();
  }

  /**
   * Run when document tap event happens.
   * @param event event object
   * @returns {void}
   */
  private onTapStart = (event: TapEvent): void => {
    const topOverlay = this.getTopOverlay();

    /* istanbul ignore next */
    if (!topOverlay) {
      return;
    }

    const {
      overlay,
      closeCallback
    } = topOverlay;

    const path = event.composedPath();
    const focusBoundary = overlay.focusBoundary || overlay;
    const isOutsideClick = !path.includes(focusBoundary);

    if (isOutsideClick && !overlay.noInteractionLock) {
      event.preventDefault();
    }

    if (isOutsideClick && !overlay.noCancelOnOutsideClick) {
      closeCallback();
    }
  };

  public register (overlay: Overlay, closeCallback: CloseCallback): void { /* we must pass closeCallback as it is a private function for overlay */
    if (!this.registry.size) {
      const eventOptions = {
        capture: true,
        passive: true
      };

      document.addEventListener('keydown', this.onKeyDown, eventOptions);
      document.addEventListener('tapstart', this.onTapStart, true);
    }

    this.registry.set(overlay, closeCallback);
  }

  public deregister (overlay: Overlay): void {
    this.registry.delete(overlay);

    if (!this.registry.size) {
      const eventOptions = {
        capture: true,
        passive: true
      };

      document.removeEventListener('keydown', this.onKeyDown, eventOptions);
      document.removeEventListener('tapstart', this.onTapStart, true);
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
    const registryArray = [...this.registry.keys()];
    for (let i = 0; i < registryArray.length; i++) {
      this.deregister(registryArray[i]);
    }
  }
}

const closeManager = new CloseManager();

/**
 * Register the new overlay
 * @param overlay Overlay
 * @param closeCallback A function to close the overlay
 * @returns {void}
 */
export const register = (overlay: Overlay, closeCallback: CloseCallback): void => {
  closeManager.register(overlay, closeCallback);
};

/**
 * Deregister the overlay
 * @param overlay Overlay
 * @returns {void}
 */
export const deregister = (overlay: Overlay): void => {
  closeManager.deregister(overlay);
};

/**
 * @returns count of elements inside manager
 */
export const size = (): number => {
  return closeManager.size();
};

/**
 * removes all elements from registry
 * @returns {void}
 */
export const clear = (): void => {
  closeManager.clear();
};
