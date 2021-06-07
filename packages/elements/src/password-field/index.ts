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
import { preload } from '../icon';
import '../icon';

const hasChanged = (newVal: unknown, oldVal: unknown): boolean => oldVal === undefined ? false : newVal !== oldVal;
const isIE = (/Trident/g).test(navigator.userAgent);
let isEyeOffPreloadRequested = false;

/**
 * A form control element for password
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
@customElement('ef-password-field')
export class PasswordField extends ControlElement {


  /**
   * @return A `CSSResult` that will be used to style the host,
   * slotted children and the internal template of the element.
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
    `;
  }

  /**
   * Set regular expression for input validation
   */
  @property({ type: String, hasChanged }) pattern = '';

  /**
   * Set placeholder text
   */
  @property({ type: String }) placeholder = '';

  /**
   * Set state to error
   */
  @property({ type: Boolean, reflect: true }) error = false;

  /**
   * Set state to warning
   */
  @property({ type: Boolean, reflect: true }) warning = false;

  /**
   * Disables all other states and border/background styles.
   * Use with advanced composite elements requiring e.g. multi selection in
   * combo-box when parent container handles element states.
   */
  @property({ type: Boolean, reflect: true }) transparent = false;

  /**
   * Set character minimum limit
   */
  @property({ type: Number, attribute: 'minlength', reflect: true, hasChanged }) minLength: number | null = null;

  /**
   * Set character maximum limit
   */
  @property({ type: Number, attribute: 'maxlength', reflect: true }) maxLength: number | null = null;

  /**
   * Get native input element from shadow roots
   */
  @query('[part="input"]') private inputElement!: HTMLInputElement;

  /**
   * Defines whether password is visible or not
   */
  private isPasswordVisible = false;

  /**
   * Select the contents of input
   * @return void
   */
  public select (): void {
    if (!this.disabled && !this.readonly) {
      this.inputElement.select();
    }
  }

  /**
   * Called when the element’s DOM has been updated and rendered for the first time
   * @param changedProperties Properties that has changed
   * @return shouldUpdate
   */
  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);

    if (!isEyeOffPreloadRequested) {
      preload('eye-off');
      isEyeOffPreloadRequested = true;
    }
  }

  /**
   * Called when the element’s DOM has been updated and rendered
   * @param changedProperties Properties that has changed
   * @return shouldUpdate
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
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
      <input
        type=${this.isPasswordVisible ? 'text' : 'password'}
        part="input"
        ?readonly="${this.readonly}"
        placeholder="${ifDefined(this.placeholder || undefined)}"
        minlength="${ifDefined(this.minLength || undefined)}"
        maxlength="${ifDefined(this.maxLength || undefined)}"
        pattern="${ifDefined(this.pattern || undefined)}"
        @input="${this.onPossibleValueChange}"
        @change="${this.onPossibleValueChange}"
        autocomplete="off"
      />
      <ef-icon
        icon=${this.isPasswordVisible ? 'eye-off' : 'eye'}
        ?readonly="${this.readonly}"
        ?disabled="${this.disabled}"
        @tap="${this.togglePasswordVisibility}"
        @keydown="${this.handleKeyDown}"
        part="icon"
        tabindex="0"
      ></ef-icon>
    `;
  }

  /**
   * Check if input should be re-validated
   * True if value changed and pattern or minlength is present
   * True if pattern or minlength changed
   * @param changedProperties Properties that has changed
   * @return True if input should be re-validated
   */
  private shouldValidateInput (changedProperties: PropertyValues): boolean {
    return (changedProperties.has('pattern') || !!(this.pattern && changedProperties.has('value')))
      || (changedProperties.has('minLength') || !!(this.minLength && changedProperties.has('value')));
  }

  /**
   * check if value is changed and fire event
   * @return {void}
   */
  private onPossibleValueChange = (): void => {
    const value = this.inputElement.value;
    this.setValueAndNotify(value);
  };

  /**
   * validate input according `pattern`, `min` and `max` properties
   * change state of `error` property according pattern validation
   * @return void
   */
  private validateInput = (): void => {
    let error = !this.inputElement.checkValidity();

    if (this.shouldValidateForMinLength(error)) {
      error = !!this.minLength && (this.minLength > this.value.length);
    }

    if (this.error !== error) {
      this.error = error;
      this.notifyPropertyChange('error', this.error);
    }
  };

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
  private handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Spacebar' || event.key === ' ' || event.key === 'Enter') {
      this.togglePasswordVisibility();
    }
  };

  /**
   * Toggles password visibility state
   * @return void
   */
  private togglePasswordVisibility (): void {
    this.isPasswordVisible = !this.isPasswordVisible;
    void this.requestUpdate();
  }
}
