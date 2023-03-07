import type { Overlay } from '../elements/sub-overlay';
import { OverlayLayer, getOverlayLayers } from './zindex-manager.js';

import '../elements/overlay-backdrop.js';

/**
 * Backdrop manager adds a backdrop to the body
 * @returns {void}
 */
export class BackdropManager {
  private registry: Set<Overlay> = new Set();
  private backdropElement = document.createElement('ds-overlay-backdrop');

  private get overlays (): OverlayLayer[] {
    return getOverlayLayers().filter(({ overlay }) => this.registry.has(overlay));
  }

  private removeBackdropElement (): void {
    const backdropElement = this.backdropElement;
    if (backdropElement.parentNode) {
      backdropElement.parentNode.removeChild(backdropElement);
    }
  }

  private position = (): void => {
    const overlays = this.overlays;

    if (!overlays.length) {
      this.removeBackdropElement();
      return;
    }

    const {
      overlay,
      zIndex
    } = overlays[0];

    const backdropElement = this.backdropElement;

    if (!overlay.parentNode) {
      this.removeBackdropElement();
      return;
    }

    if (backdropElement.nextElementSibling === overlay) {
      return;
    }

    backdropElement.zIndex = zIndex;
    overlay.parentNode.insertBefore(backdropElement, overlay);
  };

  public register (overlay: Overlay): void {
    if (!this.registry.has(overlay)) {
      overlay.addEventListener('focus', this.position);
      this.registry.add(overlay);
    }

    this.position();
  }

  public deregister (overlay: Overlay): void {
    if (this.registry.has(overlay)) {
      overlay.removeEventListener('focus', this.position);
      this.registry.delete(overlay);
      this.position();
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

const backdropManager = new BackdropManager();

/**
 * Register the new overlay
 * @param overlay Overlay
 * @returns {void}
 */
export const register = (overlay: Overlay): void => {
  backdropManager.register(overlay);
};

/**
 * Deregister the overlay
 * @param overlay Overlay
 * @returns {void}
 */
export const deregister = (overlay: Overlay): void => {
  backdropManager.deregister(overlay);
};

/**
 * @returns count of elements inside manager
 */
export const size = (): number => {
  return backdropManager.size();
};

/**
 * removes all elements from registry
 * @returns {void}
 */
export const clear = (): void => {
  backdropManager.clear();
};
