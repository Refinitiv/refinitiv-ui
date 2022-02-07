import {
  ControlElement,
  html,
  css,
  TemplateResult,
  CSSResultGroup,
  PropertyValues
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { VERSION } from '../version.js';

/**
 * Return the attribute that converted from the property
 * Prevent empty string that reflected to attribute
 * @private
 * @param value value from the property
 * @returns string converted to attribute
 */
const emptyStringToNull = function (value: string): string | null {
  return value || null;
};

/**
 * Form control that can toggle between 2 states
 *
 * @attr {boolean} readonly - Set readonly state
 * @prop {boolean} [readonly=false] - Set readonly state
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 *
 * @fires checked-changed - Fired when the `checked` property changes.
 */
@customElement('ef-toggle', {
  alias: 'coral-toggle'
})
export class Toggle extends ControlElement {
  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  protected readonly defaultRole: string | null = 'switch';

  /**
   * Label of toggle checked
   */
  @property({
    type: String,
    attribute: 'checked-label',
    reflect: true,
    converter: { toAttribute: emptyStringToNull }
  })
  public checkedLabel = '';

  /**
   * Label of toggle
   */
  @property({
    type: String,
    reflect: true,
    converter: { toAttribute: emptyStringToNull }
  })
  public label = '';

  private _checked = false;
  /**
   * Value of toggle
   * @param value new checked value
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  public set checked (value: boolean) {
    const oldValue = this._checked;
    if (oldValue !== value) {
      this._checked = value;
      this.ariaChecked = String(value);
      void this.requestUpdate('checked', oldValue);
    }
  }
  public get checked (): boolean {
    return this._checked;
  }

  /**
   * Aria indicating current state of toggle
   * @ignore
   */
  @property({ type: String, reflect: true, attribute: 'aria-checked' })
  public ariaChecked = String(this.checked);

  /**
   * A `CSSResultGroup` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @returns CSS template
   */
  static get styles (): CSSResultGroup {
    return css`
      :host {
        display: inline-block;
      }
    `;
  }

  /**
   * Invoked when the element is first updated. Implement to perform one time
   * work on the element after update.
   * @param changedProperties Map of changed properties with old values
   * @returns {void}
   */
  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.addEventListener('tap', this.handleCheckedChange);
    this.addEventListener('keydown', this.handleKeyDown);
  }

  /**
   * Called when checked value changes and dispatch the event
   * @returns {void}
   */
  private handleCheckedChange (): void {
    if (this.disabled || this.readonly) {
      return;
    }

    this.checked = !this.checked;
    this.notifyPropertyChange('checked', this.checked);
  }

  /**
   * Handle keyboard event for toggle action
   * @param event Keyboard event
   * @returns {void}
   */
  private handleKeyDown (event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
      this.handleCheckedChange();
    }
    else if (event.keyCode && event.keyCode === 13 || event.keyCode === 32) { // For older browsers
      this.handleCheckedChange();
    }
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
    <div part="toggle">${this.checked && this.checkedLabel ? this.checkedLabel : this.label}</div>`;
  }
}
