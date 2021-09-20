import { ready } from '../utils/elementReady';
import { CustomStyleRegistry } from './CustomStyleRegistry';
import { unsafeCSS, CSSResultArray } from 'lit';
import { ElementConstructor } from '../interfaces/ElementConstructor';
import { DuplicateElementError } from '../errors/DuplicateElementError';
import { Notice } from '../notices/Notice';

type ElementRegistryOptions = {
  alias?: string;
};

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
  const themeStyles = unsafeCSS(CustomStyleRegistry.get(name));
  definition.elementStyles.push(themeStyles);
  customElements.define(name, definition);
};

const upgradeAlias = (name: string, alias: string, definition: ElementConstructor): void => {
  // Re, themes are must be defined at this point from main upgrade
  const AliasDefinition = class extends definition {
    private static elementDeprecated = new Notice(`The tag name <${alias}></${alias}> will be deprecated in the next major release. To silence this message, update all references to <${name}></${name}> instead.`);
    constructor () {
      super();
      AliasDefinition.elementDeprecated.once();
    }
  };
  customElements.define(alias, AliasDefinition);
};

export abstract class ElementRegistry {
  /**
   * Define a new custom element into the registry.
   * @param name tag name of the custom element
   * @param definition the class definition of the element
   * @param [options] element definition parameters
   * @returns {void}
   */
  public static define (name: string, definition: ElementConstructor, options: ElementRegistryOptions = {}): void {
    if (register.has(name)) {
      // Allow the application to still load
      setTimeout(() => {
        throw new DuplicateElementError(name);
      });
    }
    else {
      const { alias } = options;
      const registrationItem = new ElementRegistrationItem(definition);

      register.set(name, registrationItem);
      alias && register.set(alias, registrationItem);

      ready(name, () => {
        upgrade(name, definition);
        alias && upgradeAlias(name, alias, definition);
      });
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
   * @param element Element to register the creation of
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
   * @param element Element to register the connection of
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
   * @param element Element to register the disconnection of
   * @returns {void}
   */
  public static disconnect (element: HTMLElement): void {
    const { localName: name } = element;
    if (register.has(name)) {
      (register.get(name) as ElementRegistrationItem).disconnections += 1;
    }
  }
}
