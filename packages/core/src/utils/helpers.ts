import type { BasicElement } from '../elements/BasicElement';

const BasicElementSymbol = Symbol('BasicElement');
/* c8 ignore start */
const isLocalhost = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
/* c8 ignore stop */

/**
 * Check if a passed node is of basic element.
 * The function should be used when instanceof check is not possible
 * @param element An element to check
 * @returns true if the element is of BasicElement type
 */
const isBasicElement = (element: unknown): element is BasicElement => {
  return element instanceof HTMLElement && BasicElementSymbol in element.constructor;
};

export { BasicElementSymbol, isBasicElement, isLocalhost };
