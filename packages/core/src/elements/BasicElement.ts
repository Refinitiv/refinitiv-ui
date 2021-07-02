import { LitElement, property } from 'lit-element';
import { ElementRegistry } from '../registries/ElementRegistry';
import { FocusRegistry } from '../registries/FocusRegistry';
import { ShadyCSS } from '../utils/shadyStyles';
import { FocusableHelper } from '../utils/focusableHelper';
import { StyleInfo } from '../interfaces/StyleInfo';

type CSSValue = string|number;
type CSSProps = {
  key: string;
  value: CSSValue;
}

const CSS_VARIABLE_REGEXP = /^--\w/;
const CSS_VARIABLE_REPLACE_REGEXP = /['"]([^'"]+?)['"]/g;
const NOTIFY_REGEXP = /([a-zA-Z])(?=[A-Z])/g;

const isNullOrUndefined = (v: unknown): boolean => v === undefined || v === null;
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
    const option = options.length ? String(options.shift()) : '';
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
  protected updateVariable (key: string, value: CSSValue|null|undefined): void {
    if (CSS_VARIABLE_REGEXP.test(key)) {
      if (ShadyCSS) {
        ShadyCSS.styleSubtree(this, { [key]: value } as StyleInfo);
      }
      else if (isNullOrUndefined(value)) {
        this.style.removeProperty(key);
      }
      else {
        this.style.setProperty(key, String(value));
      }
    }
  }

  /**
   * Update styles when using ShadyCSS scoping and custom property shim
   * @param {CSSProps} props properties for apply to the document
   * @returns {void}
   */
  protected updateStyles (props?: CSSProps): void {
    if (ShadyCSS) {
      ShadyCSS.styleDocument(props as StyleInfo);
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

    if (event.defaultPrevented) {
      return false;
    }

    return true;
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
   * Placeholder for getting an element's version number
   * @returns version number
   */
  public static get version (): string {
    return 'unknown';
  }
}
