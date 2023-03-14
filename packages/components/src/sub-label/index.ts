import { BasicElement, html, css, TemplateResult, CSSResultGroup } from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { VERSION } from '../version.js';

@customElement('ds-sub-label', { theme: false })
export class SubLabel extends BasicElement {
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
   * @returns CSS template
   */
  static get styles (): CSSResultGroup {
    return css`
      :host {
        display: inline-block;
        color: var(--ds-text-body-color);
        font-size: var(--ds-text-body-size);
      }
      :host([error]),
      :host([error][warning]) {
        color: var(--ds-control-error-color);
      }
      :host([warning]) {
        color: var(--ds-control-warning-color);
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
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-sub-label': SubLabel;
  }
}
