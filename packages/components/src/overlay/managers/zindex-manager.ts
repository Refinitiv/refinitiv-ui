import type { Overlay } from '../elements/overlay';
import { AfterRenderTaskRunner } from '@refinitiv-ui/utils/async.js';

export const ZIndex = 103; /* initial z-index to match Polymer. 102 is used for backdrop */

export type OverlayLayer = {
  overlay: Overlay;
  zIndex: number;
};

/**
 * Z-index manager monitors z-indexes and ensures that the last opened/last
 * focused overlay has the highest z-index
 * @returns {void}
 */
export class ZIndexManager {
  private registry: Map<Overlay, number> = new Map();
  private focusThrottled = new AfterRenderTaskRunner();

  private sortByZIndex (overlays: OverlayLayer[]): OverlayLayer[] {
    const len = overlays.length;
    if (len <= 1) {
      return overlays;
    }
    const pivot = Math.ceil(len / 2);
    const left = this.sortByZIndex(overlays.slice(0, pivot));
    const right = this.sortByZIndex(overlays.slice(pivot));
    return this.mergeSortByZIndex(left, right);
  }

  private mergeSortByZIndex (left: OverlayLayer[], right: OverlayLayer[]): OverlayLayer[] {
    const result: OverlayLayer[] = [];
    while (left.length > 0 && right.length > 0) {
      if (left[0].zIndex < right[0].zIndex) {
        result.push(right.shift() as OverlayLayer);
      }
      else {
        result.push(left.shift() as OverlayLayer);
      }
    }

    return result.concat(left, right);
  }

  private get sorted (): OverlayLayer[] {
    const overlays: OverlayLayer[] = []; /* IE does not support entries */

    this.registry.forEach((zIndex, overlay) => {
      overlays.push({
        zIndex,
        overlay
      });
    });

    return this.sortByZIndex(overlays);
  }

  private setZIndex (overlay: Overlay, zIndex: number): void {
    const oldZIndex = this.registry.get(overlay);
    if (oldZIndex !== zIndex) {
      this.registry.set(overlay, zIndex);
      overlay.style.setProperty('z-index', `${zIndex}`);
    }
  }

  private getNextZIndex (overlay: Overlay): number {
    const topOverlay = this.getOverlayLayers()[0];

    if (!topOverlay) {
      return ZIndex;
    }

    if (topOverlay.overlay === overlay) { /* do not increase z-index for self */
      return topOverlay.zIndex;
    }

    return topOverlay.zIndex + 2; /* give space for backdrop z-index */
  }

  private onFocus = ({ target }: FocusEvent): void => {
    const overlays = this.getOverlays();

    this.focusThrottled.schedule(() => {
      const newOverlays = this.getOverlays();
      const overlay = target as Overlay;

      /*
      This is dangerous to put the overlay to the front on focus.
      The code is here to allow external apps to call focus on overlay to bring the overlay to the front.
      Introduce the guard to do nothing if the stack of overlays has changed (e.g. an overlay was closed)
      Maybe this code should be removed all together and external apps should use public method toFront?
       */
      if (!overlay.opened || overlays.length !== newOverlays.length) {
        return;
      }

      for (let i = 0; i < overlays.length; i += 1) {
        if (overlays[i] !== newOverlays[i]) {
          return;
        }
      }

      this.toFront(overlay);
    });
  };

  public toFront (overlay: Overlay): void {
    this.setZIndex(overlay, this.getNextZIndex(overlay));
  }

  public register (overlay: Overlay): void {
    if (!this.registry.has(overlay)) {
      let zIndex: number;

      if (typeof overlay.zIndex === 'number') {
        const overlayZIndex = overlay.zIndex;
        if (this.registry.size === 0) {
          zIndex = overlayZIndex;
        }
        else {
          const nextZIndex = this.getNextZIndex(overlay);
          zIndex = overlayZIndex > nextZIndex ? overlayZIndex : nextZIndex;
        }
      }
      else {
        zIndex = this.registry.size === 0 ? ZIndex : this.getNextZIndex(overlay);
      }

      this.setZIndex(overlay, zIndex);
      overlay.addEventListener('focus', this.onFocus);
    }
    else if (typeof overlay.zIndex === 'number') { /* z-index has set manually. If it is removed, do nothing */
      this.setZIndex(overlay, overlay.zIndex);
    }
  }

  public deregister (overlay: Overlay): void {
    if (this.registry.has(overlay)) {
      this.registry.delete(overlay);
      overlay.removeEventListener('focus', this.onFocus);
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
    this.registry.forEach((zIndex, overlay) => this.deregister(overlay));
  }

  /**
   * Get overlay layers sorted by z-index
   * @returns overlay layers
   */
  public getOverlayLayers (): OverlayLayer[] {
    return this.sorted;
  }

  /**
   * Get overlay panels sorted by z-index
   * @returns overlay panels
   */
  public getOverlays (): Overlay[] {
    return this.sorted.map(({ overlay }) => overlay);
  }
}

const zIndexManager = new ZIndexManager();

/**
 * Register the new overlay
 * @param overlay Overlay
 * @returns {void}
 */
export const register = (overlay: Overlay): void => {
  zIndexManager.register(overlay);
};

/**
 * Deregister the overlay
 * @param overlay Overlay
 * @returns {void}
 */
export const deregister = (overlay: Overlay): void => {
  zIndexManager.deregister(overlay);
};

/**
 * Bring overlay panel to the front
 * @param overlay Overlay
 * @returns {void}
 */
export const toFront = (overlay: Overlay): void => {
  zIndexManager.toFront(overlay);
};

/**
 * @returns count of elements inside manager
 */
export const size = (): number => {
  return zIndexManager.size();
};

/**
 * removes all elements from registry
 * @returns {void}
 */
export const clear = (): void => {
  zIndexManager.clear();
};

/**
 * Get the list of overlays sorted by z-index
 * @returns overlay list
 */
export const getOverlays = (): Overlay[] => {
  return zIndexManager.getOverlays();
};

/**
 * Get the list of overlay layers sorted by z-index
 * @returns overlay layer list
 */
export const getOverlayLayers = (): OverlayLayer[] => {
  return zIndexManager.getOverlayLayers();
};
