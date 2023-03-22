import { html, css, CSSResultGroup, TemplateResult, ControlElement } from '@refinitiv-ui/core';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { VERSION } from '../version.js';

/**
 * An option for select
 */
@customElement('ui-option', { theme: false })
export class Option extends ControlElement {
  protected readonly defaultRole = 'option';
  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  /**
   * Indicates that the option is selected
   */
  @property({ type: Boolean, reflect: true })
  public selected = false;

  /**
   * A `CSSResultGroup` that will be used to style the host,
   * slotted children and the internal template of the element.
   * @returns CSS template
   */
  static get styles (): CSSResultGroup {
    return css`
      :host {
        display: flex;
        align-items: center;
        cursor: pointer;
        box-sizing: border-box;
        outline: none;
        padding: var(--ds-space-xxx-small) var(--ds-space-x-small);
        min-height: var(--ds-control-height);
        color: var(--ds-control-color);
        background-color: var(--ds-control-background-color);
        border: var(--ds-control-border-width) var(--ds-control-border-style) transparent;
        border-radius: var(--ds-control-border-radius);
      }
      :host(:focus),
      :host(:hover),
      :host([selected]) {
        color: var(--ds-control-color);
        border-color: var(--ds-control-focus-border-color);
        background-color: var(--ds-control-focus-background-color);
      }
      :host([selected]) {
        color: var(--ds-control-focus-color);
      }
    `;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return {TemplateResult}  Render template
   */
  protected render (): TemplateResult {
    return html`
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-option': Option;
  }
}
