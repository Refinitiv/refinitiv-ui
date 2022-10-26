import {
  html,
  css,
  TemplateResult,
  CSSResultGroup,
  BasicElement
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';

import '@refinitiv-ui/elements/panel';
import '@refinitiv-ui/elements/button';

/**
 * Replace the text with element description
 *
 * efx-element component used to init EF elements.
 * Change to `@customElement('efx-element', { theme: false })`
 * if the element does not have a corresponding theme
 */
@customElement('efx-element')
export class EfxElement extends BasicElement {
  /**
   * A `CSSResultGroup` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @return CSS template
   */
  static get styles (): CSSResultGroup {
    return css`
      :host {
        display: block;
        margin: 0px auto;
        text-align: center;
      }
    `;
  }

  /**
   * Copy for the read the docs hint.
   */
  @property()
  public docsHint = 'Click on the Lit logos to learn more';

  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  public count = 0;

  /**
   * Run when button is tapped
   * @returns {void}
   */
  private onTap (): void {
    this.count++;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
    <ef-panel part="container">
      <div part="logo-container">
        <a href="https://lit.dev" target="_blank">
          <img src="https://lit.dev/images/logo.svg" part="logo" class="logo lit" alt="Lit logo" />
        </a>
      </div>
      <slot></slot>
      <ef-button part="button" @tap="${this.onTap}">
        count is ${this.count}
      </ef-button>
      <p part="sub-title">${this.docsHint}</p>
    </ef-panel>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'efx-element': EfxElement;
  }
}
