import { ElementRegistry } from '../registries/ElementRegistry';
import { ElementConstructor } from '../interfaces/ElementConstructor';
import { CustomStyleRegistry } from '../registries/CustomStyleRegistry';

interface ElementOptions {
  /**
   * External theme is required for this element.
   * Set to `false` to use internally defined styles only.
   */
  theme?: boolean;
}

const defaultOptions: ElementOptions = {
  theme: true
};

/**
 * Registers a Custom Element
 * into the ELF element registry.
 * Use this instead of `customElements.define`
 * to allow for ELF theming support and telemetry.
 * @param name tag name
 * @param options element registration options
 * @returns Element registration decorator
 */
export const CustomElement = function (name: string, options: ElementOptions = defaultOptions): Function {
  options = { ...defaultOptions, ...options };
  return (target: ElementConstructor): void => {
    ElementRegistry.define(name, target);
    if (options.theme === false) {
      CustomStyleRegistry.define(name, '');
    }
  };
};
