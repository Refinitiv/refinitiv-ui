import type { StyleInfo } from '../interfaces/StyleInfo';
import type { CSSValue } from '../types/base';
import { LitElement, unsafeCSS, CSSResultArray } from 'lit';
import { property } from 'lit/decorators.js';
import { ElementRegistry } from '../registries/ElementRegistry.js';
import { FocusRegistry } from '../registries/FocusRegistry.js';
import { ShadyCSS } from '../utils/shadyStyles.js';
import { FocusableHelper } from '../utils/focusableHelper.js';
import { BasicElementSymbol } from '../utils/helpers.js';

const CSS_VARIABLE_REGEXP = /^--\w/;
const CSS_VARIABLE_REPLACE_REGEXP = /['"]([^'"]+?)['"]/g;
const NOTIFY_REGEXP = /([a-zA-Z])(?=[A-Z])/g;

const toChangedEvent = (name: string): string => `${name.replace(NOTIFY_REGEXP, '$1-').toLowerCase()}-changed`;

/**
 * Gets a computed style value from any HTML element
 * @param el Element to get computed styles from
 * @param key CSS property key, used to get the value
 * @returns CSS style property value
 */
const getComputedStyleValue = (el: HTMLElement, key: string): string => {
  if (ShadyCSS) {
    try {
      /**
       * There's a bug in ShadyCSS. Which means this can fail,
       * if called on an element too early :(
       */
      return ShadyCSS.getComputedStyleValue(el, key);
    }
    catch (e) {
      return '';
    }
  }
  return getComputedStyle(el).getPropertyValue(key);
};

/**
 * Basic element base class.
 * Usually used for creating low-level elements.
 */
export abstract class BasicElement extends LitElement {

  /**
   * Creates and registers instance of Element.
   */
  public constructor () {
    super();
    ElementRegistry.create(this);
  }

  /**
   * Apply theme styles
   * @param theme Theme CSS
   * @returns {void}
   */
  public static applyThemeStyles (theme: string): void {
    const baseStyles = this.styles;
    const themeStyles = unsafeCSS(theme);
    const styles = ([] as CSSResultArray).concat(baseStyles ? [baseStyles, themeStyles] : themeStyles);
    Object.defineProperty(this, 'styles', {
      get () {
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
   * False to not delegate the focus by default
   */
  public readonly delegatesFocus: boolean = false;

  /**
   * The element should be automatically focused after added to the DOM.
   * Only one element can be auto-focused at any time.
   */
  @property({ type: Boolean, attribute: 'autofocus', reflect: true })
  public autofocus = false;

  /**
   * Get focused state of an element:
   * @readonly
   */
  public get focused (): boolean {
    return this.hasAttribute('focused');
  }

  /**
  * Gets any defined css variables by name/key
  * @param options options list of variables and fallbacks
  * @returns value of the css variable, or, fallback if specified, when a a variable is null.
  * @deprecated
  */
  protected cssVariable (...options: (CSSValue)[]): string {
    /* eslint-disable-next-line no-console */
    console.warn('this.cssVariable() is deprecated. Use this.getComputedVariable() instead.');
    return this.getComputedVariable(...options);
  }

  /**
   * Gets any defined css variables by name/key
   * @param options options list of variables and fallbacks
   * @returns value of the css variable, or, fallback if specified, when a a variable is null.
   * @example
   * this.getComputedVariable('--valid-name'); // return value of the --valid-name
   * this.getComputedVariable('--invalid-name', '10px'); // return fallback value 10px
   */
  protected getComputedVariable (...options: (CSSValue)[]): string {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const option = options.length ? options.shift()! : '';
    if (CSS_VARIABLE_REGEXP.test(option)) {
      const val = getComputedStyleValue(this, option)
      .trim().replace(CSS_VARIABLE_REPLACE_REGEXP, '$1');
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
  protected updateVariable (key: string, value: CSSValue | null | undefined): void {
    if (CSS_VARIABLE_REGEXP.test(key)) {
      if (ShadyCSS) {
        ShadyCSS.styleSubtree(this, { [key]: value });
      }
      else if (value === null || value === undefined) {
        this.style.removeProperty(key);
      }
      else {
        this.style.setProperty(key, value);
      }
    }
  }

  /**
   * Update styles when using ShadyCSS scoping and custom property shim
   * @param props properties for apply to the document
   * @returns {void}
   */
  protected updateStyles (props?: StyleInfo): void {
    if (ShadyCSS) {
      ShadyCSS.styleDocument(props);
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
  protected notifyPropertyChange (name: string, value: unknown, cancelable = false): boolean {
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
   * Registers the connection to the DOM
   * @returns {void}
   */
  public connectedCallback (): void {
    super.connectedCallback();
    ElementRegistry.connect(this);

    // process tabindex before any other callbacks
    if (!this.hasAttribute('tabindex') && typeof this.defaultTabIndex === 'number') {
      this.tabIndex = this.defaultTabIndex;
    }

    FocusRegistry.connect(this);
  }

  /**
   * Registers the disconnection from the DOM
   * @returns {void}
   */
  public disconnectedCallback (): void {
    super.disconnectedCallback();
    ElementRegistry.disconnect(this);
    FocusRegistry.disconnect(this);
  }

  /**
   * Check to see if the element if tabbable.
   * Element is tabbable if it has tabindex >=0
   * and is visible on the screen.
   */
  public get tabbable (): boolean {
    return FocusableHelper.isTabbable(this);
  }

  /**
   * Get a sorted collection of nodes that can be tabbed through.
   */
  public get tabbableElements (): HTMLElement[] {
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
  public static get version (): string {
    return 'unknown';
  }
}
