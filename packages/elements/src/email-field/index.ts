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

const hasChanged = (newVal: unknown, oldVal: unknown): boolean => oldVal === undefined ? false : newVal !== oldVal;

/**
 * A form control element for email
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
@customElement('ef-email-field', {
  alias: 'coral-email-field'
})
export class EmailField extends ControlElement {

  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  /**
   * A `CSSResultGroup` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @return CSS template
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
      :host [part=icon]{
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
   * Aria indicating if the field is required
   * @ignore
   */
   @property({ type: String, attribute: 'aria-required' })
   public ariaRequired = 'false';
 
   /**
    * Aria description used to describe input or error to screen reader
    * @ignore
    */
   @property({ type: String })
   public ariaDescription = '';
 
   /**
    * Aria label used to label input to screen reader
    * @ignore
    */
   @property({ type: String })
   public ariaLabel = '';

  /**
   * Set regular expression for input validation
   */
  @property({ type: String, hasChanged })
  public pattern = '';

  /**
   * Set placeholder text
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
  @property({ type: Number, attribute: 'minlength', reflect: true })
  public minLength: number | null = null;

  /**
   * Set to multiple mode, allows multiple emails in a single input
   */
  @property({ type: Boolean, reflect: true })
  public multiple = false;

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
   * Get native input element from shadow roots
   */
  @query('[part="input"]', true)
  private inputElement!: HTMLInputElement;

  /**
   * Select the contents of input
   * @returns {void}
   */
  /* istanbul ignore next */
  public select (): void {
    if (!this.disabled && !this.readonly) {
      this.inputElement.select();
    }
  }

  /**
   * Called after the component is first rendered
   * @param changedProperties Properties which have changed
   * @returns {void}
   */
  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.addEventListener('focus', this.onFocus);
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
    return changedProperties.has('value')
      || changedProperties.has('pattern')
      || changedProperties.has('minlength');
  }

  /**
   * Check if value is changed and fire event
   * @returns {void}
   */
  private onPossibleValueChange (): void {
    const value = this.inputElement.value;
    this.setValueAndNotify(value);
  }

  /**
   * Validate input according `pattern`, `minLength` and `maxLength` properties
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

      this.queryFieldDescription();
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
   * Fire event on `icon` click
   * @returns {void}
   */
  private iconClick (): void {
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
    this.queryFieldLabel();
    this.queryFieldDescription();
  }
  
  /**
   * Query field's label from host to native input
   * to support aria label when using screen reader
   * @returns {void}
   */
  private queryFieldLabel (): void {
    if (this.hasAttribute('aria-labelledby')) {
      this.ariaLabel = '';
      const ids = this.getAttribute('aria-labelledby');
      if (!ids) {
        return;
      }
      const elementIds = ids.split(' ');
      elementIds.forEach(id => {
        const element = document.getElementById(id);
        if (!element) {
          return;
        }
        const label = element.textContent || '';
        if (this.ariaLabel && label) {
          this.ariaLabel += ' ';
        }
  
        this.ariaLabel += label;
      });
    }
    else if (this.hasAttribute('aria-label')) {
      this.ariaLabel = this.getAttribute('aria-label') || '';
    }
    else if (this.id) {
      const labelForElement = document.querySelector(`label[for="${this.id}"]`);
      if (!labelForElement) {
        return;
      }
  
      this.ariaLabel = labelForElement.textContent || '';
    }
  }
  
  /**
   * Query field's description from host to native input
   * to support aria description when using screen reader
   * @returns {void}
   */
  private queryFieldDescription (): void {
    if (!this.hasAttribute('aria-describedby')) {
  
      // Support `aria-description` only if `aria-describedby` is not in use.
      if (!this.hasAttribute('aria-description')) {
        return;
      }
  
      this.ariaDescription = this.getAttribute('aria-description') || '';
      return;
    }
  
    this.ariaDescription = '';
    const ids = this.getAttribute('aria-describedby');
    if (!ids) {
      return;
    }
  
    // In scenarios where there is multiple ids
    const elementIds = ids.split(' ');
    elementIds.forEach(id => {
      const element = document.getElementById(id);
      if (!element) {
        return;
      }
  
      const text = element.textContent || '';
      if (this.ariaDescription && text) {
        this.ariaDescription += ' ';
      }
  
      this.ariaDescription += text;
    });
  }

  /**
   * Renders icon element if property present
   * @returns {TemplateResult | null} Template result
   */
  private renderIcon (): TemplateResult | null {
    return this.icon ? html`
    <ef-icon
        role="${ifDefined(this.iconHasAction ? 'button' : undefined)}"
        part="icon"
        icon="${this.icon}"
        aria-label="${ifDefined(this.iconHasAction ? this.icon : undefined)}"
        ?readonly="${this.readonly}"
        ?disabled="${this.disabled}"
        @tap="${this.iconClick}"
        tabindex="${ifDefined(this.iconHasAction ? '0' : undefined)}"
      ></ef-icon>
    ` : null;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return {TemplateResult} Render template
   */
  protected render (): TemplateResult {
    return html`
      <input
        type="email"
        part="input"
        inputmode="email"
        aria-required="${this.ariaRequired}"
        aria-label="${ifDefined(this.ariaLabel || undefined)}"
        aria-invalid="${ifDefined(this.error || undefined)}"
        aria-description="${ifDefined(this.ariaDescription || undefined)}"
        ?readonly="${this.readonly}"
        ?disabled="${this.disabled}"
        placeholder="${ifDefined(this.placeholder || undefined)}"
        maxlength="${ifDefined(this.maxLength || undefined)}"
        minlength="${ifDefined(this.minLength || undefined)}"
        @input="${this.onPossibleValueChange}"
        @change="${this.onPossibleValueChange}"
        pattern="${ifDefined(this.pattern || undefined)}"
        ?multiple="${this.multiple}"
        autocomplete="off"
      />
      ${this.renderIcon()}
    `;
  }
}
