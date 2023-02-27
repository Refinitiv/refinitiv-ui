export const MAIN_MOUSE_BUTTON = 0;

type MouseEventListener = (event: MouseEvent) => void;
type DraggableFunctions = {
  mouseDownListener: MouseEventListener;
  handle: HTMLElement;
};
class DraggableManager {
  private lastX = 0;
  private lastY = 0;
  private deltaX = 0;
  private deltaY = 0;

  private xOffset = 0;
  private yOffset = 0;

  private draggableElements = new Map<HTMLElement, DraggableFunctions>();
  private draggableElement: HTMLElement | null = null;

  /**
   * register element for dragging
   * @param draggableElement element that will be dragged
   * @param handle element that will be captured for dragging
   * @returns {void}
   */
  public register (draggableElement: HTMLElement, handle: HTMLElement): void {
    if (!this.draggableElements.has(draggableElement)) {
      this.draggableElements.set(draggableElement, {
        mouseDownListener: this.mouseDownListener(draggableElement, handle),
        handle
      });

      this.setHandleListeners(draggableElement);
    }

    DraggableManager.setHandleCursor(handle);
  }

  /**
   * remove element from list of draggable
   * @param draggableElement element for dragging
   * @returns {void}
   */
  public deregister (draggableElement: HTMLElement): void {
    if (this.draggableElements.has(draggableElement)) {
      const handle = this.draggableElements.get(draggableElement)?.handle;
      if (handle) {
        DraggableManager.removeHandleCursor(handle);
      }
      this.removeHandleListeners(draggableElement);
      this.draggableElements.delete(draggableElement);

      if (this.draggableElement === draggableElement) {
        this.release();
      }

    }
  }

  /**
   * Shifts the drag container by the specified x/y values
   * @param x Amount to shift the x-axis
   * @param y Amount to shift the y-axis
   * @returns {void}
   */
  private shift (x: number, y: number): void {
    if (this.draggableElement) {
      // Shift the offsets
      this.xOffset += x;
      this.yOffset += y;

      // Get the current container box rect.
      const box: DOMRect = this.draggableElement.getBoundingClientRect();
      const scrollingElement: Element = document.documentElement;

      // Don't allow the box to move outside the bounds of the viewport
      x = Math.min(Math.max(this.xOffset, 0), scrollingElement.clientWidth - box.width);
      y = Math.min(Math.max(this.yOffset, 0), scrollingElement.clientHeight - box.height);

      // Update the container position
      this.draggableElement.style.left = `${x}px`;
      this.draggableElement.style.top = `${y}px`;
    }
  }

  /**
   * @param draggableElement element that will be dragged
   * @param handle element that will be touched for dragging
   * @returns {void}
   */
  private mouseDownListener = (draggableElement: HTMLElement, handle: HTMLElement): MouseEventListener => (event: MouseEvent): void => {
    if (event.button === MAIN_MOUSE_BUTTON && event.target === handle) {
      this.draggableElement = draggableElement;
      this.setSelectingOfText(false);

      document.addEventListener('mouseup', this.onRelease);
      document.addEventListener('mousemove', this.onMove);

      this.updateOffset();
      this.drag(event.pageX, event.pageY);
    }
  };

  /**
   * Styles the handle and listens for mouse events.
   * @param draggableElement element that will be dragged
   * @returns {void}
   */
  private setHandleListeners (draggableElement: HTMLElement): void {
    const element = this.draggableElements.get(draggableElement);
    if (element) {
      element.handle
      .addEventListener(
        'mousedown',
        element.mouseDownListener
      );
    }
  }

  /**
   * Styles the handle and listens for mouse events.
   * @param draggableElement element that will be dragged
   * @returns {void}
   */
  private removeHandleListeners (draggableElement: HTMLElement): void {
    const element = this.draggableElements.get(draggableElement);
    if (element) {
      element.handle.removeEventListener(
        'mousedown',
        element.mouseDownListener
      );
    }
  }

  /**
   * Sets the cursor of the drag handle, based on its draggable state.
   * @param handle element that will be touched for dragging
   * @returns {void}
   */
  private static setHandleCursor (handle: HTMLElement): void {
    handle.style.cursor = 'move';
  }

  /**
   * Sets the cursor of the drag handle, based on its draggable state.
   * @param handle element that will be touched for dragging
   * @returns {void}
   */
  private static removeHandleCursor (handle: HTMLElement): void {
    handle.style.removeProperty('cursor');
  }

  /**
   * Get the current offset as it may have been changed.
   * @returns {void}
   */
  private updateOffset (): void {
    if (this.draggableElement) {
      const style: CSSStyleDeclaration = getComputedStyle(this.draggableElement);
      this.xOffset = parseFloat(style.left.replace(/\D[~.]/g, ''));
      this.yOffset = parseFloat(style.top.replace(/\D[~.]/g, ''));
    }
  }

  /**
   * Set the global dragging values
   * @param x Starting mouse x position
   * @param y Starting mouse y position
   * @returns {void}
   */
  private drag (x: number, y: number): void {
    this.lastX = x;
    this.lastY = y;
  }

  /**
   * remove event listeners for dragging from document
   * @returns {void}
   */
  private release = (): void => {
    document.removeEventListener('mouseup', this.onRelease);
    document.removeEventListener('mousemove', this.onMove);

    this.draggableElement = null;
  };

  private getDeltaAndShift = (x: number, y: number): void => {
    if (this.draggableElement) {
      this.deltaX = x - this.lastX;
      this.deltaY = y - this.lastY;
      this.lastX = x;
      this.lastY = y;
      this.shift(this.deltaX, this.deltaY);
    }
  };

  /**
   * switch user-select if the dtaggableElement exists
   * @param enable the condition of the user-select state
   * @returns {void}
   */
  private setSelectingOfText (enable: boolean): void {
    if (!this.draggableElement) {
      return;
    }
    if (enable) {
      this.draggableElement.style.userSelect = 'auto';
    }
    else {
      this.draggableElement.style.userSelect = 'none';
    }
  }

  /**
   * provides functionality needs for release draggable element
   * @param event mouse up event
   * @returns {void}
   */
  private onRelease = (event: MouseEvent): void => {
    if (this.draggableElement) {
      this.setSelectingOfText(true);
      this.release();

      event.preventDefault();
      event.stopPropagation();
    }
  };

  private onMove = (event: MouseEvent): void => {
    if (this.draggableElement && event.button === MAIN_MOUSE_BUTTON) {
      this.getDeltaAndShift(event.pageX, event.pageY);
    }
    else {
      this.release();
    }
  };


}

/**
 * creating singleton instance of DraggableManager
 */
const draggableManager = new DraggableManager();

/**
 * provide public function for registering element for dragging
 * @param draggableElement element that will be moved
 * @param handle element that will be captured for movement
 * @returns {void}
 */
export const register = (draggableElement: HTMLElement, handle: HTMLElement): void => {
  draggableManager.register(draggableElement, handle);
};

/**
 * provide public function for registering element for dragging
 * @param draggableElement draggable element
 * @returns {void}
 */
export const deregister = (draggableElement: HTMLElement): void => {
  draggableManager.deregister(draggableElement);
};
