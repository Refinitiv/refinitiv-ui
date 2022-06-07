/**
 * A test element to verify bindings
 */
import {
  BasicElement,
  html,
  css,
  CSSResult,
  TemplateResult
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';

@customElement('test-nested-translate', { theme: false })
export class TestNestTranslate extends BasicElement {
/**
   * A `CSSResult` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @return CSS template
   */
  static get styles (): CSSResult | CSSResult[] {
    return css`
      :host {
        display: block;
        padding: 0 10px 10px 10px;
      }
    `;
  }

  @property({ type: String })
  public property: string | null = null;

  @property({ type: String, reflect: true })
  public attribute: string | null = null;

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
      <div>${this.property}</div>
      <div>${this.attribute}</div>
    `;
  }
}
