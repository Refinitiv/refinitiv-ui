import { BasicElement, css, CSSResultGroup, html, TemplateResult } from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';

@customElement('dst-login', { theme: false })
export class LoginTemplate extends BasicElement {

  /**
   * A `CSSResultGroup` that will be used to style the host,
   * slotted children and the internal template of the element.
   * @returns CSS template
   */
  static get styles (): CSSResultGroup {
    return css`
        :host {
          display: block;
        }
      `;
  }

  public render (): TemplateResult {
    return html`
    <h1>Login</h1>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dst-login': LoginTemplate;
  }
}
