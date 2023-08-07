import { CSSResultArray, LitElement, unsafeCSS } from 'lit';

import { property } from '../decorators/property.js';
import { ElementRegistry } from '../registries/ElementRegistry.js';
import { FocusRegistry } from '../registries/FocusRegistry.js';
import { FocusableHelper } from '../utils/focusableHelper.js';
import { BasicElementSymbol } from '../utils/helpers.js';

import type { CSSValue } from '../types/base';

const CSS_VARIABLE_REGEXP = /^--\w/;
const CSS_VARIABLE_REPLACE_REGEXP = /['"]([^'"]+?)['"]/g;
const NOTIFY_REGEXP = /([a-zA-Z])(?=[A-Z])/g;

const toChangedEvent = (name: string): string =>
  `${name.replace(NOTIFY_REGEXP, '$1-').toLowerCase()}-changed`;

const toInputEvent = (name: string | null): string =>
  name ? `${name.replace(NOTIFY_REGEXP, '$1-').toLowerCase()}-input` : 'input';

/**
 * Basic element base class.
 * Usually used for creating low-level elements.
 *
 * @fires focused-changed Fired when `focused` property changes
 */
export abstract class BasicElement extends LitElement {
  /**
   * Creates and registers instance of Element.
   */
  public constructor() {
    super();
    ElementRegistry.create(this);
  }

  /**
   * Apply theme styles
   * @param theme Theme CSS
   * @returns {void}
   */
  public static applyThemeStyles(theme: string): void {
    const baseStyles = this.styles;
    const themeStyles = unsafeCSS(theme);
    const styles = ([] as CSSResultArray).concat(baseStyles ? [baseStyles, themeStyles] : themeStyles);
    Object.defineProperty(this, 'styles', {
      get() {
        return styles;
      }
    });
    this.elementStyles = this.finalizeStyles(this.styles);
  }

  /**
   * Set the default tabindex of element
   * null - for unset
   * -1 - can be focused; but cannot be tabbed
   * 0 - can be focused; can be tabbed; the order is based on DOM order
   * >= 1 - can be focused; can be tabbed; the order is based on tabindex (anti-pattern)
   */
  protected readonly defaultTabIndex: number | null = null;

  /**
   * Element's role attribute for accessibility
   */
  protected readonly defaultRole: string | null = null;

  /**
   * False to not delegate the focus by default
   */
  public readonly delegatesFocus: boolean = false;

  /**
   * The element should be automatically focused after added to the DOM.
   * Only one element can be auto-focused at any time.
   */
  @property({ type: Boolean, attribute: 'autofocus', reflect: true })
  public override autofocus = false;

  /**
   * Get focused state of an element:
   * @readonly
   */
  public get focused(): boolean {
    return this.hasAttribute('focused');
  }

  /**
   * Gets any defined css variables by name/key
   * @param options options list of variables and fallbacks
   * @returns value of the css variable, or, fallback if specified, when a a variable is null.
   * @example
   * this.getComputedVariable('--valid-name'); // return value of the --valid-name
   * this.getComputedVariable('--invalid-name', '10px'); // return fallback value 10px
   */
  protected getComputedVariable(...options: CSSValue[]): string {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const option = options.length ? options.shift()! : '';
    if (CSS_VARIABLE_REGEXP.test(option)) {
      const val = getComputedStyle(this)
        .getPropertyValue(option)
        .trim()
        .replace(CSS_VARIABLE_REPLACE_REGEXP, '$1');
      return val ? val : this.getComputedVariable(...options);
    }
    return option; // fallback
  }

  /**
   * Updates, adds, or removes a css variable from the element.
   * @param key css variable key
   * @param value css variable value
   * @returns {void}
   */
  protected updateVariable(key: string, value: CSSValue | null | undefined): void {
    if (CSS_VARIABLE_REGEXP.test(key)) {
      if (value === null || value === undefined) {
        this.style.removeProperty(key);
      } else {
        this.style.setProperty(key, value);
      }
    }
  }

  /**
   * Dispatch property change event when the property's value has been changed.
   * Event name is transformed to hyphen case, e.g. myProperty -> my-property-changed.
   * Event details contain the new value.
   * @param name Property name
   * @param value New value
   * @param [cancelable=false] Set to true if the event can be cancelled
   * @returns false if the event is prevented
   */
  protected notifyPropertyChange(name: string, value: unknown, cancelable = false): boolean {
    const event = new CustomEvent(toChangedEvent(name), {
      cancelable,
      bubbles: false,
      detail: {
        value
      }
    });

    this.dispatchEvent(event);

    return !event.defaultPrevented;
  }

  /**
   * Dispatch property change event when the property's value is changing.
   * Event name is transformed to hyphen case, e.g. myProperty -> my-property-changed.
   * Event details contain the new value.
   * @param name Property name
   * @param value New value
   * @param [cancelable=false] Set to true if the event can be cancelled
   * @returns false if the event is prevented
   */
  protected notifyPropertyInput(name: string | null, value: unknown, cancelable = false): boolean {
    const event = new CustomEvent(toInputEvent(name), {
      cancelable,
      bubbles: false,
      detail: {
        value
      }
    });

    this.dispatchEvent(event);

    return !event.defaultPrevented;
  }

  /**
   * Registers the connection to the DOM
   * @returns {void}
   */
  public override connectedCallback(): void {
    super.connectedCallback();
    ElementRegistry.connect(this);

    // process tabindex before any other callbacks
    if (typeof this.defaultTabIndex === 'number' && !this.hasAttribute('tabindex')) {
      this.tabIndex = this.defaultTabIndex;
    }

    if (typeof this.defaultRole === 'string' && !this.hasAttribute('role')) {
      this.setAttribute('role', this.defaultRole);
    }

    FocusRegistry.connect(this);
  }

  /**
   * Registers the disconnection from the DOM
   * @returns {void}
   */
  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    ElementRegistry.disconnect(this);
    FocusRegistry.disconnect(this);
  }

  /**
   * Check to see if the element if tabbable.
   * Element is tabbable if it has tabindex >=0
   * and is visible on the screen.
   */
  public get tabbable(): boolean {
    return FocusableHelper.isTabbable(this);
  }

  /**
   * Get a sorted collection of nodes that can be tabbed through.
   */
  public get tabbableElements(): HTMLElement[] {
    return FocusableHelper.getTabbableNodes(this);
  }

  /**
   * A symbol to check if an element is BasicElement
   */
  public static readonly [BasicElementSymbol] = BasicElementSymbol;

  /**
   * Placeholder for getting an element's version number
   * @returns version number
   */
  public static get version(): string {
    return 'unknown';
  }
}
