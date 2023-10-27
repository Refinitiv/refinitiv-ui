import type { BasicElement } from '../elements/BasicElement';
import type { FocusedChangedEvent } from '../types/events';
import { isBasicElement } from '../utils/helpers.js';

const register = new Set<BasicElement>(); /* Track all active elements */
const focusedMap = new Map<BasicElement, 'visible' | ''>(); /* Track all focused elements */
const FocusedPropertyKey = Symbol('focused');

let autoFocusFrame: number | null = null;
const autoFocus = (element: BasicElement): void => {
  /* need to wait for elements to render, first come first focused */
  if (element.autofocus && autoFocusFrame === null) {
    autoFocusFrame = requestAnimationFrame(() => {
      autoFocusFrame = null;
      element.focus();
    });
  }
};

// Keys are unreliable when performed outside the main window
let isKey = false; /* true if any key is pressed */
let isKeyTab = false; /* true if Tab is pressed */
let isKeyShift = false; /* true if Shift is pressed */

/**
 * Reset keys. Run of keyup or on window blur
 * @returns {void}
 */
const resetKeys = (): void => {
  isKey = false;
  isKeyTab = false;
  isKeyShift = false;
};

/**
 * Get an active element either on document or inside the shadow root
 * @param [deep=false] set to true to look through all shadow root elements
 * @returns active element or null
 */
const getActiveElement = (deep = false): Element | null => {
  const getShadowActiveElement = (activeElement: Element | null): Element | null => {
    if (activeElement?.shadowRoot?.activeElement) {
      if (deep) {
        return getShadowActiveElement(activeElement.shadowRoot.activeElement);
      }

      return activeElement.shadowRoot.activeElement;
    }

    return activeElement;
  };

  return getShadowActiveElement(document.activeElement);
};

/**
 * Delegate focus to the first or last tabbable element
 * @param element Custom element
 * @param [first=true] Set to false to delegate to last tabbable element
 * @returns {void}
 */
const delegateFocus = (element: BasicElement, first = true): void => {
  const tabbableElements = element.tabbableElements;

  const delegateFocusElement = tabbableElements[first ? 0 : tabbableElements.length - 1];
  if (delegateFocusElement && delegateFocusElement !== element) {
    delegateFocusElement.focus();
  }
};

/**
 * Get all elements in ancestor tree that are of BasicElement
 * @param target A node to start searching from
 * @param [includeAll=false] Set to true to include all registered elements, not just tabbable
 * @returns collection of BasicElement
 */
const getRegisteredPath = (target: Node, includeAll = false): BasicElement[] => {
  let node = target as Node | null;
  const elements: BasicElement[] = [];

  while (node) {
    if (isBasicElement(node) && register.has(node) && (includeAll || node.tabbable)) {
      elements.push(node);
    }

    if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      node = (node as ShadowRoot).host;
    } else {
      node = node.parentNode;
    }
  }

  return elements;
};

/**
 * Run when document keydown event happens
 * Pass through the focus on shift tab, to delegate to the previous element
 * @param event Keyboard event
 * @returns {void}
 */
const onDocumentKeyDown = (event: KeyboardEvent): void => {
  isKey = true;
  isKeyTab = event.key === 'Tab';
  isKeyShift = event.shiftKey;

  if (isKeyTab && isKeyShift) {
    // If current focused is the first in focus, focus on self to move to previous element
    const path = getRegisteredPath(event.composedPath()[0] as Node);
    const activeElement = getActiveElement(true);
    for (let i = path.length - 1; i >= 0; i -= 1) {
      const parent = path[i];
      const firstTabbableElement = parent.tabbableElements[0];
      if (firstTabbableElement === activeElement) {
        parent.focus();
        return;
      }
    }
  }
};

/**
 * Check if an element should delegate focus
 * @param target Target
 * @returns true if should
 */
const shouldDelegateOnFocus = (target: HTMLElement | null): boolean => {
  return (
    !isKeyShift &&
    isBasicElement(target) &&
    register.has(target) &&
    target.delegatesFocus &&
    getActiveElement(true) === target
  );
};

/**
 * Dispatch `focused-changed` event
 * @param element Element to dispatch event for
 * @param focused Focused state
 * @returns {void}
 */
const dispatchFocusedChangedEvent = (element: HTMLElement, focused: boolean): void => {
  const event: FocusedChangedEvent = new CustomEvent('focused-changed', {
    detail: {
      value: focused
    }
  });
  element.dispatchEvent(event);
};

let syncAnimationFrame: number | null = null;
/**
 * Set element `focused` state in asynchronous way
 * @returns {void}
 */
const updateFocusedState = (): void => {
  if (syncAnimationFrame) {
    cancelAnimationFrame(syncAnimationFrame);
  }

  const focused = isKey ? 'visible' : '';
  syncAnimationFrame = requestAnimationFrame(() => {
    syncAnimationFrame = null;
    const activeElement = getActiveElement(true);
    const focusedPath = activeElement ? getRegisteredPath(activeElement, true) : [];
    focusedMap.forEach((state, el) => {
      if (!focusedPath.includes(el)) {
        focusedMap.delete(el);
        el.removeAttribute('focused');
        dispatchFocusedChangedEvent(el, false);
        el.requestUpdate(FocusedPropertyKey, true);
      }
    });
    focusedPath.forEach((el) => {
      const focusedChanged = !focusedMap.has(el);
      if (!focusedChanged || focusedMap.get(el) !== focused) {
        focusedMap.set(el, focused);
        el.setAttribute('focused', focused);
        dispatchFocusedChangedEvent(el, true);
        focusedChanged && el.requestUpdate(FocusedPropertyKey, false);
      }
    });
  });
};

/**
 * Run on focus event
 * @param event Focus event
 * @returns {void}
 */
const onFocus = (event: FocusEvent): void => {
  const target = event.target as HTMLElement | null;
  shouldDelegateOnFocus(target) && delegateFocus(target as BasicElement);
  updateFocusedState();
};

/**
 * Run on blur event
 * @returns {void}
 */
const onBlur = (): void => {
  updateFocusedState();
};

const onDocumentFocus = (event: FocusEvent): void => onFocus(event);
const onDocumentBlur = (): void => onBlur();
const onDocumentKeyUp = (): void => resetKeys();
const onWindowBlur = (): void => resetKeys();

const onShadowRootFocus = function (this: ShadowRoot, event: Event): void {
  onFocus(event as FocusEvent);
};

const onShadowRootBlur = function (this: ShadowRoot): void {
  const element = this.host as BasicElement;
  /* this is required because Chrome does not fire focus event on document or shadowRoot when focus
  changes from shadowRoot to element itself */
  if (element.delegatesFocus) {
    requestAnimationFrame(() => {
      /* frame is required, as immediately after blur, activeElement is body */
      if (getActiveElement(true) === element) {
        delegateFocus(element);
      }

      updateFocusedState();
    });
  }
};

abstract class FocusRegistry {
  /**
   * Connect an element to focus global listener
   * @param element Element to register the connection of
   * @returns {void}
   */
  public static connect(element: BasicElement): void {
    if (!register.size) {
      document.addEventListener('keydown', onDocumentKeyDown, true);
      document.addEventListener('keyup', onDocumentKeyUp, true);
      document.addEventListener('focus', onDocumentFocus, true);
      document.addEventListener('blur', onDocumentBlur, true);
      window.addEventListener('blur', onWindowBlur);
    }

    if (element.renderRoot instanceof ShadowRoot) {
      /* No need to remove listeners as same callback with the same scope is skipped */
      element.renderRoot.addEventListener('focus', onShadowRootFocus, true);
      element.renderRoot.addEventListener('blur', onShadowRootBlur, true);
    }

    register.add(element);
    autoFocus(element);
  }

  /**
   * Disconnect an element of focus global listener
   * @param element Element to register the disconnection of
   * @returns {void}
   */
  public static disconnect(element: BasicElement): void {
    register.delete(element);

    if (!register.size) {
      document.removeEventListener('keydown', onDocumentKeyDown, true);
      document.removeEventListener('keyup', onDocumentKeyUp, true);
      document.removeEventListener('focus', onDocumentFocus, true);
      document.removeEventListener('blur', onDocumentBlur, true);
      window.removeEventListener('blur', onWindowBlur);
    }
  }
}

export { FocusedPropertyKey, FocusRegistry };
