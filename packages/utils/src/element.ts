/**
 * Get element scope, which can be either
 * DocumentElement, DocumentFragment (ShadowDom)
 * or null if element is not attached to DOM.
 * @param element Element to get root for
 * @returns root node or null
 */
const getElementScope = (element: Element): Document | DocumentFragment | null => {
  const root = element.getRootNode();
  if (root.nodeType === Node.DOCUMENT_NODE || root.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
    return root as Document | DocumentFragment;
  }

  return null;
};

/**
 * Return true if passed target has overflow content
 * @param target Target element
 * @returns true If target has overflow
 */
const isElementOverflown = (target: HTMLElement): boolean => (target.scrollWidth - target.offsetWidth) >= 1 || (target.scrollHeight - target.offsetHeight) >= 1;

export {
  getElementScope,
  isElementOverflown
};
