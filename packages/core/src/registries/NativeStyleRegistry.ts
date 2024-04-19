import { DuplicateStyleError } from '../errors/DuplicateStyleError.js';
import { isDevEnvironment } from '../utils/helpers.js';

const register = new Map<string, string>();

/**
 * Native Style Registry takes theme styles
 * for standard HTML elements and applies these to the document.
 */
export abstract class NativeStyleRegistry {
  /**
   * Defines a style definition for a native element.
   * @param name tag name of the element
   * @param css css styles for the element
   * @returns {void}
   */
  public static define(name: string, css: string): void {
    if (register.has(name) && isDevEnvironment) {
      throw new DuplicateStyleError(name);
    }
    register.set(name, css);
    // Skip if style has empty content
    if (!css) {
      return;
    }
    const head = document.head;
    const childRef = head.firstElementChild;
    const style = document.createElement('style');
    style.setAttribute('scope', name);
    style.textContent = css;
    childRef ? head.insertBefore(style, childRef) : head.appendChild(style);
  }
  /**
   * Gets any native style that has already been defined.
   * @param name tag name of the element
   * @returns css styles, based on the tag name
   */
  public static get(name: string): string {
    return register.get(name) || '';
  }
}
