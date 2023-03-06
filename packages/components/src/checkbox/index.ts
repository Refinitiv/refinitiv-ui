import { html, css, TemplateResult, PropertyValues, CSSResultGroup, ControlElement, TapEvent } from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { VERSION } from '../version.js';
import '../sub-checkbox/index.js';

@customElement('ds-checkbox', { theme: false })
export class Checkbox extends ControlElement {
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
        display: inline-flex;
      }
      :host(:focus-visible) {
        outline: var(--ds-checkbox-focus-border);
      }
      [part='label'] {
        cursor: default;
        display: inline-flex;
        align-items: center;
      }
    `;
  }

  protected readonly defaultRole: string | null = 'checkbox';

  /**
   * Value of checkbox
   */
  @property({ type: Boolean, reflect: true })
  public checked = false;

  /**
   * Called once after the component is first rendered
   * @param changedProperties map of changed properties with old values
   * @returns {void}
   */
  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);

    this.addEventListener('tap', this.onTap);
    this.addEventListener('keydown', this.onKeyDown);
  }

  /**
   * Fired when mouse click event happens. Select an item
   * @param event Mouse click event
   * @returns {void}
   */
  private onTap (event: TapEvent): void {
    if (this.disabled || this.readonly || event.defaultPrevented) {
      return;
    }
    this.handleChangeChecked();
  }

  /**
   * Handles key down event
   * @param event Key down event object
   * @returns {void}
   */
  private onKeyDown (event: KeyboardEvent): void {
    if (this.disabled || this.readonly || event.defaultPrevented) {
      return;
    }

    switch (event.key) {
      case ' ':
      case 'Spacebar':
        this.handleChangeChecked();
        break;
      default:
        return;
    }

    event.preventDefault();
  }

  /**
   * Change checked state and fire
   * checked-changed event
   * @return {void}
   */
  private handleChangeChecked (): void {
    this.checked = !this.checked;
    this.notifyPropertyChange('checked', this.checked);
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
      <ds-sub-checkbox tabindex="-1" aria-labelledby="label" ?checked=${this.checked}></ds-sub-checkbox>
      <ds-sub-label id="label" part="label"><slot></slot></ds-sub-label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-checkbox': Checkbox;
  }
}
