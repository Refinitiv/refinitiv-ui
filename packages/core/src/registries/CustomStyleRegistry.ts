import { DuplicateStyleError } from '../errors/DuplicateStyleError';
import { ready } from '../utils/elementReady';
const register = new Map<string, string>();

/**
 * Custom Style Registry takes theme styles
 * and applies them to elements when they are defined.
 */
export abstract class CustomStyleRegistry {
  /**
   * Define a style definition for a custom element.
   * @param name tag name of the custom element
   * @param css css style string
   * @returns {void}
   */
  public static define (name: string, css: string): void {
    if (register.has(name)) {
      throw new DuplicateStyleError(name);
    }
    register.set(name, css);
    ready(name);
  }
  /**
   * Gets any custom style that has already been defined.
   * @param name tag name of the custom element
   * @returns css styles, based on the tag name
   */
  public static get (name: string): string {
    return register.get(name) || '';
  }
}
