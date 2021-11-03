import {
  ControlElement,
  css,
  CSSResultGroup,
  html,
  PropertyValues,
  TemplateResult
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/lib/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/lib/decorators/property.js';
import { query } from '@refinitiv-ui/core/lib/decorators/query.js';
import { ifDefined } from '@refinitiv-ui/core/lib/directives/if-defined.js';
import { VERSION } from '../version.js';
import { isIE } from '@refinitiv-ui/utils/lib/browser.js';
import '../icon/index.js';
import { registerOverflowTooltip } from '../tooltip/index.js';

type SelectionIndex = number | null;

const hasChanged = (newVal: unknown, oldVal: unknown): boolean => oldVal === undefined ? false : newVal !== oldVal;

/**
 * Form control element for text
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
@customElement('ef-text-field', {
  alias: 'coral-text-field'
})
export class TextField extends ControlElement {

  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  /**
   * A `CSSResultGroup` that will be used to style the host,
   * slotted children and the internal template of the element.
   * @returns CSS template
   */
  static get styles (): CSSResultGroup {
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
      :host([icon]) [part=icon]{
        display: flex;
        outline: none;
      }
      :host([transparent]) {
        background: none !important;
        border: none !important;
      }
      :host([icon][icon-has-action]) [part=icon] {
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
   * Error message
   */
  @property({ type: String })
  private errorMessage = '';

  /**
   * Set state to warning
   */
  @property({ type: Boolean, reflect: true })
  public warning = false;

  /**
   * Specify icon to display in input. Value can be icon name
   */
  @property({ type: String, reflect: true })
  public icon = '';

  /**
   * Specify when icon need to be clickable
   */
  @property({ type: Boolean, reflect: true, attribute: 'icon-has-action' })
  public iconHasAction = false;

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
   * Get native input element from shadow roots
   */
  @query('[part="input"]')
  private inputElement!: HTMLInputElement;

  /**
   * Selection start index
   */
  @property({ type: Number, attribute: false })
  public get selectionStart (): number | null {
    return this.inputElement.selectionStart;
  }

  public set selectionStart (index: SelectionIndex) {
    this.inputElement.selectionStart = index;
  }

  /**
   * Selection end index
   */
  @property({ type: Number, attribute: false })
  public get selectionEnd (): number | null {
    return this.inputElement.selectionEnd;
  }

  public set selectionEnd (index: SelectionIndex) {
    this.inputElement.selectionEnd = index;
  }

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
   * Set the selection range
   * @param startSelection Start of selection
   * @param endSelection End of the selection
   * @returns {void}
   */
  public setSelectionRange (startSelection: number, endSelection: number): void {
    this.inputElement.setSelectionRange(startSelection, endSelection);
  }

  /**
   * Called after the component is first rendered
   * @param changedProperties Properties which have changed
   * @returns {void}
   */
  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    registerOverflowTooltip(this.inputElement, () => this.value);
    this.addEventListener('focus', this.onFocus);
  }

  /**
   * Called when the element’s DOM has been updated and rendered
   * @param changedProperties Properties that has changed
   * @returns shouldUpdate
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
   * renders icon element if property present
   * @returns {void}
   */
  private renderIcon (): TemplateResult | null {
    return this.icon ? html`
    <ef-icon
        part="icon"
        icon="${this.icon}"
        ?readonly="${this.readonly}"
        ?disabled="${this.disabled}"
        @tap="${this.iconClick}"
        @keydown="${this.handleKeyDown}"
        tabindex="${ifDefined(this.iconHasAction ? '0' : undefined)}"
      ></ef-icon>
    ` : null;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
      <input
        type="text"
        part="input"
        aria-label="${ifDefined(this.ariaLabel || undefined)}"
        aria-invalid="${ifDefined(this.error || undefined)}"
        aria-description="${ifDefined(this.error && this.errorMessage || undefined)}"
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
      ${this.renderIcon()}
    `;
  }

  /**
   * check if value is changed and fire event
   * @returns {void}
   */
  private onPossibleValueChange (): void {
    const value = this.inputElement.value;
    this.setValueAndNotify(value);
  }

  /**
   * validate input according `pattern`, `minLength` and `maxLength` properties
   * change state of `error` property according pattern validation
   * @returns void
   */
  private validateInput (): void {
    let error = !this.inputElement.checkValidity();

    if (this.shouldValidateForMinLength(error)) {
      error = !!this.minLength && (this.minLength > this.value.length);
    }

    if (this.error !== error) {
      this.error = error;
      this.notifyPropertyChange('error', this.error);

      if (!this.hasAttribute('aria-describedby')) {
        return;
      }

      const id = this.getAttribute('aria-describedby');
      if (!id) {
        return;
      }

      const errorMessage = document.getElementById(id);
      if (!errorMessage) {
        return;
      }
      
      this.errorMessage = errorMessage.textContent || '';
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
   * Process internal icon click and fire `icon-click` event
   * @returns void
   */
  private iconClick (): void {
    this.notifyIcon();
  }

  /**
   * Fire event on `icon` click
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

  /**
   * Handles the focus event
   * @returns {void}
   */
  private onFocus (): void {
    if (this.hasAttribute('aria-label')) {
      this.ariaLabel = this.getAttribute('aria-label') || '';
    }
    else if (this.hasAttribute('aria-labelledby')) {
      const id = this.getAttribute('aria-labelledby');
      if (!id) {
        return;
      }

      const labelElement = document.getElementById(id);
      if (labelElement) {
        this.ariaLabel = labelElement.textContent || '';
      }
    }
    else if (this.id) {
      const labelForElement = document.querySelector(`[for="${this.id}"]`);
      if (!labelForElement) {
        return;
      }
      
      this.ariaLabel = labelForElement.textContent || '';
    }
  }
}
