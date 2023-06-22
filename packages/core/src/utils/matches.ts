const matchesPrototype =
  /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
  // @ts-ignore
  Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

/**
 * Cross-browser implementation of Element.matches function to
 * check if the Element would be selected by the provided selectorString
 * @param element an element to run matches on
 * @param selectors is a string representing the selector to test
 * @returns true if selectors matches
 */
export const matches = (element: Element, selectors: string): boolean => {
  return matchesPrototype.call(element, selectors);
};
