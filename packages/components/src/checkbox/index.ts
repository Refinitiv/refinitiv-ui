import { html, css, TemplateResult, PropertyValues, CSSResultGroup, ControlElement, TapEvent, BasicElement } from '@refinitiv-ui/core';
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
        display: inline-block;
        padding: var(--ds-checkbox-padding);
      }
      :host(:focus-within) {
        outline: var(--ds-checkbox-focus-border);
      }
      [part='checkbox']:focus-visible {
        outline: none;
        border: var(--ds-checkbox-border);
      }
      [part='label'] {
        cursor: default;
        padding-left: var(--ds-control-padding);
      }
    `;
  }

  protected readonly defaultRole: string | null = 'group';

  /**
   * Value of checkbox
   */
  @property({ type: Boolean, reflect: true })
  public checked = false;

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
      <ds-sub-checkbox
        part="checkbox"
        aria-labelledby="label"
        .checked=${this.checked}
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}>
      </ds-sub-checkbox>
      <ds-sub-label id="label" part="label" @tap=${this.onTap}>
        <slot></slot>
      </ds-sub-label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-checkbox': Checkbox;
  }
}
