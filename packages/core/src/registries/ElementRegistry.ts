import { ready } from '../utils/elementReady';
import { CustomStyleRegistry } from './CustomStyleRegistry';
import { unsafeCSS, CSSResultArray } from 'lit-element';
import { ElementConstructor } from '../interfaces/ElementConstructor';
import { DuplicateElementError } from '../errors/DuplicateElementError';

class ElementRegistrationItem {
  creations = 0;
  connections = 0;
  disconnections = 0;
  version: string;
  constructor (definition: ElementConstructor) {
    this.version = definition.version;
  }
}

const register = new Map<string, ElementRegistrationItem>();

const upgrade = (name: string, definition: ElementConstructor): void => {
  const baseStyles = definition.styles;
  const themeStyles = unsafeCSS(CustomStyleRegistry.get(name));
  const styles = ([] as CSSResultArray).concat(baseStyles ? [baseStyles, themeStyles] : themeStyles);
  /**
   * Override the static styles property,
   * defined in the element. Inject element styles + theme styles.
   * @override
   */
  Object.defineProperty(definition, 'styles', {
    get () {
      return styles;
    }
  });
  customElements.define(name, definition);
};

export abstract class ElementRegistry {
  /**
   * Define a new custom element into the registry.
   * @param name tag name of the custom element
   * @param definition the class definition of the element
   * @returns {void}
   */
  public static define (name: string, definition: ElementConstructor): void {
    if (register.has(name)) {
      // Allow the application to still load
      setTimeout(() => {
        throw new DuplicateElementError(name);
      });
    }
    else {
      register.set(name, new ElementRegistrationItem(definition));
      ready(name, () => upgrade(name, definition));
    }
  }
  /**
   * Gets the definition of an already defined custom element.
   * @param name tag name of the custom element
   * @returns Element registration object, or, `undefined`,
   * when there is no item registered by the provided name.
   */
  public static get (name: string): ElementRegistrationItem | undefined {
    return register.get(name);
  }
  /**
   * Logs the creation of an element
   * @param element ELement to register the creation of
   * @returns {void}
   */
  public static create (element: HTMLElement): void {
    const { localName: name } = element;
    if (register.has(name)) {
      (register.get(name) as ElementRegistrationItem).creations += 1;
    }
  }
  /**
   * Logs the connection of an element
   * @param element ELement to register the connection of
   * @returns {void}
   */
  public static connect (element: HTMLElement): void {
    const { localName: name } = element;
    if (register.has(name)) {
      (register.get(name) as ElementRegistrationItem).connections += 1;
    }
  }
  /**
   * Logs the disconnection of an element
   * @param element ELement to register the disconnection of
   * @returns {void}
   */
  public static disconnect (element: HTMLElement): void {
    const { localName: name } = element;
    if (register.has(name)) {
      (register.get(name) as ElementRegistrationItem).disconnections += 1;
    }
  }
}
