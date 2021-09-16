import {
  ControlElement,
  html,
  css,
  customElement,
  property,
  TemplateResult,
  CSSResult,
  PropertyValues
} from '@refinitiv-ui/core';
import { VERSION } from '../';

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

  /**
   * Label of toggle checked
   */
  @property({ type: String, attribute: 'checked-label' })
  public checkedLabel = '';

  /**
   * Label of toggle
   */
  @property({ type: String })
  public label = '';

  /**
   * Value of toggle
   */
  @property({ type: Boolean, reflect: true })
  public checked = false;

  /**
   * A `CSSResult` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @returns CSS template
   */
  static get styles (): CSSResult | CSSResult[] {
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
    if(this.disabled || this.readonly) {
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
    if(event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
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
