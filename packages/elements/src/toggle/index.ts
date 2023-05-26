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
 * @fires checked-changed - Fired when user interacts with the control to check or uncheck. The event is not triggered if `checked` property is changed programmatically.
 */
@customElement('ef-toggle')
export class Toggle extends ControlElement {
  /**
   * Element version number
   * @returns version number
   */
  static override get version (): string {
    return VERSION;
  }

  protected override readonly defaultRole: string | null = 'switch';

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

  /**
   * Value of toggle
   */
  @property({ type: Boolean, reflect: true })
  public checked = false;

  /**
   * A `CSSResultGroup` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @returns CSS template
   */
  static override get styles (): CSSResultGroup {
    return css`
      :host {
        display: inline-block;
      }
    `;
  }

  /**
   * Called before update() to compute values needed during the update.
   * @param changedProperties Properties that has changed
   * @returns {void}
   */
  protected override willUpdate (changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('checked')) {
      this.setAttribute('aria-checked', String(this.checked));
    }
  }

  /**
   * Invoked when the element is first updated. Implement to perform one time
   * work on the element after update.
   * @param changedProperties Map of changed properties with old values
   * @returns {void}
   */
  protected override firstUpdated (changedProperties: PropertyValues): void {
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
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected override render (): TemplateResult {
    return html`
    <div part="toggle">${this.checked && this.checkedLabel ? this.checkedLabel : this.label}</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ef-toggle': Toggle;
  }
}
