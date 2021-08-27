import {
  ControlElement,
  css,
  CSSResult,
  customElement,
  html,
  ifDefined,
  property,
  PropertyValues,
  query,
  TemplateResult
} from '@refinitiv-ui/core';
import { VERSION } from '../';
import '../icon';

const hasChanged = (newVal: unknown, oldVal: unknown): boolean => oldVal === undefined ? false : newVal !== oldVal;
const isIE = (/Trident/g).test(navigator.userAgent);

/**
 * Form control to get a search input from users.
 *
 * @fires value-changed - Dispatched when value changes
 * @fires error-changed - Dispatched when error state changes
 *
 * @attr {string} value - Input's value
 * @prop {string} [value=] - Input's value
 *
 * @attr {boolean} readonly - Set readonly state
 * @prop {boolean} [readonly=false] - Set readonly state
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 */
@customElement('ef-search-field', {
  alias: 'coral-search-field'
})
export class SearchField extends ControlElement {

  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  /**
   * A `CSSResult` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @return CSS template
   */
  static get styles (): CSSResult | CSSResult[] {
    return css`
      :host {
        display: inline-block;
      }
      :host(:focus), :host input:focus {
        outline: none;
      }
      [part=input] {
        font: inherit;
        background: none;
        color: currentColor;
        border: none;
        text-align: inherit;
      }
      :host [part=icon]{
        display: flex;
        outline: none;
      }
      :host([transparent]) {
        background: none !important;
        border: none !important;
      }
      :host([icon-has-action]) [part=icon] {
        cursor: pointer;
      }
    `;
  }

  /**
   * Set regular expression for input validation
   */
  @property({ type: String, hasChanged })
  public pattern = '';

  /**
   * Set place holder text
   */
  @property({ type: String })
  public placeholder = '';

  /**
   * Set state to error
   */
  @property({ type: Boolean, reflect: true })
  public error = false;

  /**
   * Set state to warning
   */
  @property({ type: Boolean, reflect: true })
  public warning = false;

  /**
   * Disables all other states and border/background styles.
   * Use with advanced composite elements requiring e.g. multi selection in
   * combo-box when parent container handles element states.
   */
  @property({ type: Boolean, reflect: true })
  public transparent = false;

  /**
   * Set character max limit
   */
  @property({ type: Number, attribute: 'maxlength', reflect: true })
  public maxLength: number | null = null;

  /**
   * Set character min limit
   */
  @property({ type: Number, attribute: 'minlength', reflect: true, hasChanged })
  public minLength: number | null = null;

  /**
   * Specify when icon need to be clickable
   */
  @property({ type: Boolean, reflect: true, attribute: 'icon-has-action' })
  public iconHasAction = false;

  /**
   * Get native input element from shadow roots
   */
  @query('[part="input"]')
  private inputElement!: HTMLInputElement;

  /**
   * Select the contents of input
   * @returns void
   */
  public select (): void {
    if (!this.disabled && !this.readonly) {
      this.inputElement.select();
    }
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
      <input
        type="search"
        part="input"
        ?readonly="${this.readonly}"
        ?disabled="${this.disabled}"
        placeholder="${ifDefined(this.placeholder || undefined)}"
        maxlength="${ifDefined(this.maxLength || undefined)}"
        minlength="${ifDefined(this.minLength || undefined)}"
        @input="${this.onPossibleValueChange}"
        @change="${this.onPossibleValueChange}"
        pattern="${ifDefined(this.pattern || undefined)}"
        autocomplete="off"
      />
      <ef-icon
        part="icon"
        icon="search"
        ?readonly="${this.readonly}"
        ?disabled="${this.disabled}"
        @tap="${this.notifyIcon}"
        @keydown="${this.handleKeyDown}"
        tabindex="${ifDefined(this.iconHasAction ? '0' : undefined)}"
      ></ef-icon>
    `;
  }

  /**
   * Called when the element’s DOM has been updated and rendered
   * @param changedProperties Properties that has changed
   * @returns {void}
   */
  protected updated (changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (this.inputElement.value !== this.value) {
      this.inputElement.value = this.value;
    }

    if (this.shouldValidateInput(changedProperties)) {
      this.validateInput();
    }
  }

  /**
   * Check if input should be re-validated
   * @param changedProperties Properties that has changed
   * @returns True if input should be re-validated
   */
  private shouldValidateInput (changedProperties: PropertyValues): boolean {
    return (changedProperties.has('pattern') || !!(this.pattern && changedProperties.has('value')))
      || (changedProperties.has('minLength') || !!(this.minLength && changedProperties.has('value')));
  }

  /**
   * validate input according `pattern`, `minLength` and `maxLength` properties
   * change state of `error` property according pattern validation
   * @returns {void}
   */
  private validateInput (): void {
    let error = !this.inputElement.checkValidity();

    if (this.shouldValidateForMinLength(error)) {
      error = !!this.minLength && (this.minLength > this.value.length);
    }

    if (this.error !== error) {
      this.error = error;
      this.notifyPropertyChange('error', this.error);
    }
  }

  /**
   * @param error existing state of error
   * @returns true if there is no error and browser is IE11 and minLength more than 0 and value exists
   */
  private shouldValidateForMinLength (error: boolean): boolean {
    return !!(!error && isIE && this.minLength && !!this.value);
  }

  /**
   * Check if value is changed
   * @returns {void}
   */
  private onPossibleValueChange (): void {
    const value = this.inputElement.value;
    this.setValueAndNotify(value);
  }

  /**
   * Detect `enter` and `space` keydown and fire
   * @param event keydown event
   * @returns {void}
   */
  private handleKeyDown (event: KeyboardEvent): void {
    if (event.key === 'Spacebar' || event.key === ' ' || event.key === 'Enter') {
      this.notifyIcon();
    }
  }

  /**
   * Fire event on icon click
   * @returns {void}
   */
  private notifyIcon (): void {
    if (this.iconHasAction) {
      /**
       * Dispatched only when element has icon-has-action attribute and icon is clicked
       */
      this.dispatchEvent(new CustomEvent('icon-click', { bubbles: false }));
    }
  }
}
