import { AnimationTaskRunner } from '@refinitiv-ui/utils/async.js';
import type { OverlayViewport } from '../elements/overlay-viewport';
import type { ViewAreaInfo } from '../helpers/types';
import type { Overlay } from '../elements/overlay';
import '../elements/overlay-viewport.js';

/**
  * Default values for area info
*/
const viewAreaInfo: ViewAreaInfo = {
  viewHeight: 0,
  viewWidth: 0,
  offsetTop: 0,
  offsetLeft: 0,
  offsetBottom: 0,
  offsetRight: 0,
  viewOffsetTop: 0,
  viewOffsetLeft: 0
};

// Used to capture scroll events
const ScrollEventOptions = { capture: true, passive: true };


/**
 * Viewport manager singleton is responsible for getting
 * viewport sizes and reacting on viewport changes
 * @returns {void}
 */
export class ViewportManager {
  private registry = new Map<Overlay, OverlayViewport>();
  private viewRegistry = new WeakMap<OverlayViewport, ViewAreaInfo>();
  private refitFrame = new AnimationTaskRunner();
  private screenViewport: OverlayViewport | null = null;

  /**
   * Refit all overlays
   * @returns {void}
   */
  private callRefit = (): void => {
    this.refitFrame.schedule(() => { /* must be in animation frame because of weird mobile behaviour */
      this.registry.forEach((viewport, overlay) => {
        this.resetViewportSizing(viewport);
        overlay.fit();
      });
    });
  };

  /**
   * Create overlay-viewport and insert it before the provided node
   * @param insertBefore A node to insert before
   * @returns created overlay-viewport
   */
  private createViewport (insertBefore: Node | null): OverlayViewport {
    const viewport = document.createElement('ef-overlay-viewport') as OverlayViewport;
    insertBefore?.parentNode?.insertBefore(viewport, insertBefore);
    return viewport;
  }

  /**
   * Remove overlay-viewport from DOM tree
   * @param viewport overlay-viewport to remove
   * @returns {void}
   */
  private removeViewport (viewport: OverlayViewport): void {
    viewport.parentNode?.removeChild(viewport);
  }

  /**
   * Set screen sizing viewport
   * @returns void
   */
  private setScreenViewport (): void {
    if (!this.screenViewport) {
      this.screenViewport = this.createViewport(document.body);
    }
  }

  /**
   * Removes screen sizing viewport
   * @returns void
   */
  private removeScreenViewport (): void {
    if (this.screenViewport) {
      this.removeViewport(this.screenViewport);
      this.screenViewport = null;
    }
  }

  /**
   * Reset sizing for viewport
   * @param viewport Viewport to reset sizing for
   * @returns {void}
   */
  private resetViewportSizing (viewport: OverlayViewport): void {
    if (!this.screenViewport) {
      return;
    }

    const screenRect = this.screenViewport.getBoundingClientRect();

    // since screenViewport is applied on html element, it does not include body zoom
    // Zoom is a legacy feature and must not be used by any means.
    // Kept here for compatibility with old apps
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const zoom = parseFloat(window.getComputedStyle(document.body).zoom);
    const screenHeight = screenRect.height / zoom;
    const screenWidth = screenRect.width / zoom;

    const { top, left, bottom, right } = viewport.getBoundingClientRect();
    const offsetTop = top < 0 ? Math.abs(top) : 0;
    const offsetLeft = left < 0 ? Math.abs(left) : 0;
    const offsetBottom = bottom > screenHeight ? bottom - screenHeight : 0;
    const offsetRight = right > screenWidth ? right - screenWidth : 0;
    const viewHeight = viewport.offsetHeight - offsetTop - offsetBottom;
    const viewWidth = viewport.offsetWidth - offsetLeft - offsetRight;
    this.viewRegistry.set(viewport, {
      viewOffsetTop: top < 0 ? top + offsetTop : top,
      viewOffsetLeft: left < 0 ? left + offsetLeft : left,
      viewHeight: viewHeight < 0 ? 0 : viewHeight,
      viewWidth: viewWidth < 0 ? 0 : viewWidth,
      offsetTop,
      offsetLeft,
      offsetBottom,
      offsetRight
    });
  }

  public getViewAreaInfo (overlay: Overlay): ViewAreaInfo {
    const viewport = this.registry.get(overlay);

    if (!viewport) {
      return viewAreaInfo;
    }

    if (!this.viewRegistry.has(viewport)) {
      this.resetViewportSizing(viewport);
    }

    return this.viewRegistry.get(viewport) || viewAreaInfo;
  }

  public register (overlay: Overlay): void {
    if (!this.registry.size) {
      window.addEventListener('resize', this.callRefit);
      window.addEventListener('orientationchange', this.callRefit);
      window.addEventListener('scroll', this.callRefit, ScrollEventOptions);
      this.setScreenViewport();
    }

    if (!this.registry.has(overlay)) {
      const viewport = this.createViewport(overlay);
      this.registry.set(overlay, viewport);
      viewport.addEventListener('resize', () => overlay.fit());
    }
  }

  public deregister (overlay: Overlay): void {
    if (this.registry.has(overlay)) {
      const viewport = this.registry.get(overlay);
      viewport && this.removeViewport(viewport);
      this.registry.delete(overlay);
    }

    if (!this.registry.size) {
      window.removeEventListener('resize', this.callRefit);
      window.removeEventListener('orientationchange', this.callRefit);
      window.removeEventListener('scroll', this.callRefit, ScrollEventOptions);
      this.removeScreenViewport();
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
    this.registry.forEach((viewport, overlay) => this.deregister(overlay));
  }
}

const viewportManager = new ViewportManager();

/**
 * Register the new overlay. Must be run to let start behaviour to listen for viewport events
 * @param overlay Overlay
 * @returns {void}
 */
export const register = (overlay: Overlay): void => {
  viewportManager.register(overlay);
};

/**
 * Deregister the overlay
 * @param overlay Overlay
 * @returns {void}
 */
export const deregister = (overlay: Overlay): void => {
  viewportManager.deregister(overlay);
};

/**
 * @typedef {Object} ViewAreaInfo
 * @property {Number} viewHeight - The height of view area
 * @property {Number} viewWidth - The width of view area
 * @property {Number} [offsetTop=0] - iOS only the view area vertical offset
 * @property {Number} [offsetLeft=0] - iOS only the view area horizontal offset
 */

/**
 * Get sizing information of the viewport for overlay
 * @param overlay Overlay to get info for
 * @return area info
 */
export const getViewAreaInfo = (overlay: Overlay): ViewAreaInfo => {
  return viewportManager.getViewAreaInfo(overlay);
};

/**
 * @returns count of elements inside manager
 */
export const size = (): number => {
  return viewportManager.size();
};

/**
 * removes all elements from registry
 * @returns {void}
 */
export const clear = (): void => {
  viewportManager.clear();
};
