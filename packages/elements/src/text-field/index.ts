import {
  CSSResultGroup,
  FocusedPropertyKey,
  FormFieldElement,
  PropertyValues,
  TemplateResult,
  css,
  html,
  nothing
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { TemplateMap } from '@refinitiv-ui/core/directives/template-map.js';

import { isElementOverflown } from '@refinitiv-ui/utils/element.js';

import '../icon/index.js';
import { registerOverflowTooltip } from '../tooltip/index.js';
import { VERSION } from '../version.js';

const hasChanged = (newVal: unknown, oldVal: unknown): boolean =>
  oldVal === undefined ? false : newVal !== oldVal;

/**
 * Form control element for text.
 *
 * @fires value-changed - Fired when the user commits a value change. The event is not triggered if `value` property is changed programmatically.
 * @fires error-changed - Fired when the user inputs an invalid value. The event is not triggered if `error` property is changed programmatically.
 * @fires icon-click - Fired when the user taps on icon added into control's slot.
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 *
 * @attr {boolean} error - Set error state
 * @prop {boolean} [error=false] - Set error state
 *
 * @attr {string} placeholder - Set placeholder text
 * @prop {string} [placeholder=""] - Set placeholder text
 *
 * @attr {boolean} readonly - Set readonly state
 * @prop {boolean} [readonly=false] - Set readonly state
 *
 * @attr {boolean} transparent - Disables all other states and border/background styles.
 * @prop {boolean} [transparent=false] - Disables all other states and border/background styles.
 *
 * @attr {boolean} warning - Set warning state
 * @prop {boolean} [warning=false] - Set warning state
 *
 * @attr {string} value - Input's value
 * @prop {string} [value=""] - Input's value
 */
@customElement('ef-text-field')
export class TextField extends FormFieldElement {
  /**
   * Element version number
   * @returns version number
   */
  static override get version(): string {
    return VERSION;
  }

  /**
   * A `CSSResultGroup` that will be used to style the host,
   * slotted children and the internal template of the element.
   * @returns CSS template
   */
  static override get styles(): CSSResultGroup {
    return css`
      :host {
        display: inline-block;
      }
      :host(:focus),
      :host input:focus {
        outline: none;
      }
      [part='input'] {
        font: inherit;
        background: none;
        color: currentColor;
        border: none;
        text-align: inherit;
      }
      :host([icon]) [part='icon'] {
        display: flex;
      }
      :host([transparent]) {
        background: none !important;
        border: none !important;
      }
      :host([icon][icon-has-action]) [part='icon'] {
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
   * Called after the component is first rendered
   * @param changedProperties Properties which have changed
   * @returns {void}
   */
  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);

    registerOverflowTooltip(
      this,
      () => this.inputValue,
      () => (this.inputElement ? isElementOverflown(this.inputElement) : false)
    );
  }

  /**
   * Updates the element
   * @param changedProperties Properties that has changed
   * @returns {void}
   */
  protected override update(changedProperties: PropertyValues): void {
    if (changedProperties.has(FocusedPropertyKey) && !this.focused) {
      this.reportValidity();
    }

    super.update(changedProperties);
  }

  /**
   * Called when the element’s DOM has been updated and rendered
   * @param changedProperties Properties that has changed
   * @returns shouldUpdate
   */
  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (this.shouldSyncInputValue(changedProperties)) {
      this.syncInputValue();
    }
  }

  /**
   * Returns `true` if the element input is valid; otherwise, returns `false`.
   * @returns element input validity
   */
  public override checkValidity(): boolean {
    return super.checkValidity();
  }

  /**
   * Validate the element input and mark it as error if its input is invalid.
   * @returns `true` if the element input is valid; otherwise, returns `false`.
   */
  public override reportValidity(): boolean {
    return super.reportValidity();
  }

  /**
   * Check if input value should be synchronised with component value
   * @param changedProperties Properties that has changed
   * @returns True if input should be synchronised
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected shouldSyncInputValue(changedProperties: PropertyValues): boolean {
    return this.inputValue !== this.value;
  }

  /**
   * Synchronise input value with value.
   * Override the method if value and input value are not the same
   * @param changedProperties Properties that has changed
   * @returns {void}
   */
  protected syncInputValue(): void {
    this.inputValue = this.value;
  }

  /**
   * Runs on input element `input` event
   * @param event `input` event
   * @returns {void}
   */
  protected override onInputInput(event: InputEvent): void {
    this.onPossibleValueChange(event);
  }

  /**
   * Runs on input element `change` event
   * @param event `change` event
   * @returns {void}
   */
  protected override onInputChange(event: InputEvent): void {
    this.onPossibleValueChange(event);
  }

  /**
   * Check if value is changed and fire event
   * @returns {void}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onPossibleValueChange(event: InputEvent): void {
    const value = this.inputElement?.value || '';
    this.setValueAndNotify(value);
    this.reportValidity();
  }

  /**
   * Fires event on `icon` click
   * @returns {void}
   */
  protected iconClick(): void {
    if (this.iconHasAction && !this.disabled) {
      this.dispatchEvent(new CustomEvent('icon-click', { bubbles: false }));
    }
  }

  /**
   * Decorate `<input>` element with common properties extended from form field element:
   * type="text" - always `text`
   * part="input" - always "input", used for styling
   * maxlength - calculated from `this.maxLength`
   * minlength - calculated from `this.minLength`
   * pattern - calculated from `this.pattern`
   * @returns template map
   */
  protected override get decorateInputMap(): TemplateMap {
    return {
      ...super.decorateInputMap,
      type: 'text',
      part: 'input',
      maxlength: this.maxLength,
      minlength: this.minLength,
      pattern: this.pattern || null
    };
  }

  /**
   * Renders icon element if property present
   * @returns {void}
   */
  protected renderIcon(): TemplateResult | null {
    return this.icon
      ? html`
          <ef-icon
            role="${this.iconHasAction ? 'button' : nothing}"
            tabindex="${this.iconHasAction ? '0' : nothing}"
            aria-label="${this.iconHasAction ? this.icon : nothing}"
            part="icon"
            icon="${this.icon}"
            ?readonly="${this.readonly}"
            ?disabled="${this.disabled}"
            @tap="${this.iconClick}"
          ></ef-icon>
        `
      : null;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected override render(): TemplateResult {
    return html` ${super.render()} ${this.renderIcon()} `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ef-text-field': TextField;
  }
}
