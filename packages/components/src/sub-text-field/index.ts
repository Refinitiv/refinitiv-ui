import {
  css,
  nothing,
  CSSResultGroup,
  FormFieldElement,
  html,
  PropertyValues,
  TemplateResult
} from '@refinitiv-ui/core';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { TemplateMap } from '@refinitiv-ui/core/directives/template-map.js';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import '../icon/index.js';

const hasChanged = (value: unknown, oldValue: unknown): boolean => oldValue === undefined ? false : value !== oldValue;

@customElement('ui-sub-text-field', { theme: false })
export class SubTextField extends FormFieldElement {
  static shadowRootOptions = { ...FormFieldElement.shadowRootOptions, delegatesFocus: true };

  /**
   * A `CSSResultGroup` that will be used to style the host,
   * slotted children and the internal template of the element.
   * @returns CSS template
   */
  static get styles (): CSSResultGroup {
    return css`
      :host {
        display: inline-flex;
        align-items: center;
        box-sizing: border-box;
        vertical-align: middle;

        height: var(--ds-control-height);
        width: var(--ds-control-width);

        color: var(--ds-control-color);
        border: var(--ds-control-border);
        border-radius: var(--ds-control-border-radius);
        background-color: var(--ds-control-background-color);
        padding: 0px var(--ds-space-x-small);
      }
      :host(:focus) {
        border-color: var(--ds-control-focus-border-color);
      }
      :host(:not([readonly]):not([error]):not([warning]):not(:focus):hover) {
        color: var(--ds-control-hover-color);
        border-color: var(--ds-control-hover-border-color);
      }
      :host([error]:not(:focus)), :host([error][warning]:not(:focus)) {
        color: var(--ds-control-color);
        border-color: var(--ds-control-error-border-color);
        background-color: var(--ds-control-error-background-color);
      }
      :host([error]:hover:not([readonly]):not(:focus)) {
        color: var(--ds-control-hover-color);
        border-color: var(--ds-control-error-hover-border-color);
        background-color: var(--ds-field-error-hover-background-color);
      }
      :host([warning]:not(:focus)) {
        color: var(--ds-control-color);
        border-color: var(--ds-control-warning-border-color);
        background-color: var(--ds-control-warning-background-color);
      }
      :host([warning]:hover:not([readonly]):not(:focus)) {
        color: var(--ds-control-color);
        border-color: var(--ds-control-warning-hover-border-color);
        background-color: var(--ds-control-warning-hover-background-color);
      }
      :host([disabled]) {
        color: var(--ds-control-disabled-color);
        border-color: var(--ds-control-disabled-border-color);
        background-color: var(--ds-control-disabled-background-color);
      }
      :host([readonly]:not(:focus)) {
        color: var(--ds-control-readonly-color);
        border-color: var(--ds-control-readonly-border-color);
        background-color: var(--ds-control-readonly-background-color);
      }
      :host [part='input'] {
        color: inherit;
        text-align: inherit;
        height: 100%;
        width: 100%;
        padding: 0;
        margin: 0;
        appearance: none;
        text-overflow: ellipsis;
        font: inherit;
        font-size: var(--ds-text-body-size);
        background: none;
        border: none;
      }
      :host [part='input']:focus {
        outline: none;
      }
      :host [part='input']::selection {
        color: var(--ds-text-selection-color);
        background-color: var(--ds-text-selection-background-color);
      }
      :host([icon]) [part=icon]{
        display: flex;
        margin-left: var(--ds-space-xxx-small); // TODO: use better token
        color: var(--ds-control-color);
      }
      :host([icon][icon-has-action]) [part=icon] {
        cursor: pointer;
      }
      :host([icon][icon-has-action]) [part=icon]:hover {
        color: var(--ds-control-hover-color);
      }
      :host([icon][icon-has-action]) [part=icon]:focus-visible {
        outline: var(--ds-control-border-style) var(--ds-control-border-width) var(--ds-control-focus-border-color);
        border-radius: var(--ds-control-border-radius);
      }
    `;
  }

  /**
   * Specify icon to display in input. Value can be icon name
   */
  @property({ type: String, reflect: true })
  public icon: string | null = null;

  /**
   * Specify when icon need to be clickable
   */
  @property({ type: Boolean, reflect: true, attribute: 'icon-has-action' })
  public iconHasAction = false;

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
   * Disable input
   */
  @property({ type: Boolean, reflect: true })
  public readonly = false;

  /**
   * Disable input
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * Set regular expression for input validation
   */
  @property({ type: String, hasChanged })
  public pattern = '';

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
   * Called once after the component is first rendered
   * @param changedProperties map of changed properties with old values
   * @returns {void}
   */
  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);

    // TODO: Workaround to prevent screen reader from reading this host
    this.setAttribute('aria-hidden', 'true');
  }

  /**
   * Called when the element’s DOM has been updated and rendered
   * @param changedProperties Properties that has changed
   * @returns shouldUpdate
   */
  protected updated (changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (this.shouldSyncInputValue(changedProperties)) {
      this.syncInputValue(changedProperties);
    }

    if (this.shouldValidateInput(changedProperties)) {
      this.validateInput();
    }
  }

  /**
   * Fires event on `icon` click
   * @returns {void}
   */
  protected iconClick (): void {
    if (this.iconHasAction && !this.disabled) {
      this.dispatchEvent(new CustomEvent('icon-click', { bubbles: false }));
    }
  }

  /**
   * Check if input value should be synchronised with component value
   * @param changedProperties Properties that has changed
   * @returns True if input should be synchronised
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected shouldSyncInputValue (changedProperties: PropertyValues): boolean {
    return this.inputValue !== this.value;
  }

  /**
   * Synchronise input value with value.
   * Override the method if value and input value are not the same
   * @param changedProperties Properties that has changed
   * @returns {void}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected syncInputValue (changedProperties: PropertyValues): void {
    this.inputValue = this.value;
  }

  /**
   * Check if input should be re-validated
   * @param changedProperties Properties that has changed
   * @returns True if input should be re-validated
   */
  protected shouldValidateInput (changedProperties: PropertyValues): boolean {
    return (changedProperties.has('pattern') || !!(this.pattern && changedProperties.has('value')))
      || (changedProperties.has('minLength') || !!(this.minLength && changedProperties.has('value')))
      || (changedProperties.has('maxLength') || !!(this.maxLength && changedProperties.has('value')));
  }

  /**
   * Runs on input element `input` event
   * @param event `input` event
   * @returns {void}
   */
  protected override onInputInput (event: InputEvent): void {
    this.onPossibleValueChange(event);
  }

  /**
   * Runs on input element `change` event
   * @param event `change` event
   * @returns {void}
   */
  protected override onInputChange (event: InputEvent): void {
    this.onPossibleValueChange(event);
  }

  /**
   * Check if value is changed and fire event
   * @returns {void}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onPossibleValueChange (event: InputEvent): void {
    const value = this.inputElement?.value || '';
    this.setValueAndNotify(value);
  }

  /**
   * Validate input according `pattern`, `minLength` and `maxLength` properties
   * change state of `error` property according pattern validation
   * @returns {void}
   */
  protected validateInput (): void {
    const error = !this.inputElement?.checkValidity();
    this.notifyErrorChange(error);
  }

  /**
   * Renders icon element if property present
   * @returns {void}
   */
  protected renderIcon (): TemplateResult | typeof nothing {
    return this.icon ? html`
     <ui-icon
      role="${this.iconHasAction ? 'button' : nothing}"
      tabindex="${this.iconHasAction ? '0' : nothing}"
      aria-label="${this.iconHasAction ? this.icon : nothing}"
      part="icon"
      icon="${this.icon}"
      ?readonly="${this.readonly}"
      ?disabled="${this.disabled}"
      @tap="${this.iconClick}">
    </ui-icon>` : nothing;
  }

  protected get decorateInputMap (): TemplateMap {
    return {
      ...super.decorateInputMap,
      'type': 'text',
      'part': 'input',
      'maxlength': this.maxLength,
      'minlength': this.minLength,
      'pattern': this.pattern || null
    };
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
      ${super.render()}
      ${this.renderIcon()}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-sub-text-field': SubTextField;
  }
}
