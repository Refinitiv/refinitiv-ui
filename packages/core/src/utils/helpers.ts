import type { BasicElement } from '../elements/BasicElement';

const BasicElementSymbol = Symbol('BasicElement');
// Global so that duplicated core copies share it.
const ElementTagSymbol = Symbol.for('@refinitiv-ui/core/element-tag');
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

/**
 * Get the tag name an element class was defined with, ignoring inherited tags
 * @param constructor Class to check
 * @returns tag name or undefined
 */
const getElementTag = (constructor: unknown): string | undefined => {
  return typeof constructor === 'function' &&
    Object.prototype.hasOwnProperty.call(constructor, ElementTagSymbol)
    ? (constructor as unknown as Record<symbol, string>)[ElementTagSymbol]
    : undefined;
};

export { BasicElementSymbol, ElementTagSymbol, getElementTag, isBasicElement, isLocalhost };
