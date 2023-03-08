import {
  css,
  CSSResultGroup,
  FormFieldElement,
  html,
  PropertyValues,
  TemplateResult
} from '@refinitiv-ui/core';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { TemplateMap } from '@refinitiv-ui/core/directives/template-map.js';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';

const hasChanged = (newVal: unknown, oldVal: unknown): boolean => oldVal === undefined ? false : newVal !== oldVal;

@customElement('ds-sub-text-field', { theme: false })
export class SubTextField extends FormFieldElement {
  /**
   * A `CSSResultGroup` that will be used to style the host,
   * slotted children and the internal template of the element.
   * @returns CSS template
   */
  static get styles (): CSSResultGroup {
    return css`
      :host {
        display: inline-block;
        box-sizing: border-box;
        vertical-align: middle;

        color: var(--ds-field-color);
        border: var(--ds-field-border);
        border-radius: var(--ds-field-radius);
        background-color: var(--ds-field-background-color);
        padding: 0px var(--ds-field-padding);
      }
      :host([focused]) {
        border: var(--ds-field-focus-border);
      }
      :host(:not([readonly]):not([error]):not([warning]):not([focused]):hover) {
        border: var(--ds-control-hover-border);
      }
      :host([error]:not([focused])), :host([error][warning]:not([focused])) {
        border: var(--ds-field-error-border);
      }
      :host([error]:hover:not([readonly]):not([focused])) {
        border: var(--ds-field-error-hover-border);
      }
      :host([warning]:not([focused])) {
        border: var(--ds-field-warning-border);
      }
      :host([warning]:hover:not([readonly]):not([focused])) {
        border: var(--ds-field-warning-hover-border);
      }
      :host([disabled]) {
        color: var(--ds-field-disabled-color);
        border: var(--ds-field-disabled-border);
      }
      :host([disabled]) [part='input'] {
        user-select: none;
      }
      :host [part='input'] {
        color: inherit;
        text-align: inherit;
        padding: 0;
        margin: 0;
        appearance: none;
        text-overflow: ellipsis;
        font: inherit;
        background: none;
        border: none;
        height: var(--ds-field-size);
      }
      :host(:focus), :host [part='input']:focus {
        outline: none;
      }
      :host [part='input']::selection {
        color: var(--ds-text-selection-color);
        background-color: var(--ds-text-selection-background-color);
      }
    `;
  }

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
   * Set state to warning
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
    return html`${super.render()}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-sub-text-field': SubTextField;
  }
}
