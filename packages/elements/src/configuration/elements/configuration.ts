import {
  BasicElement,
  TemplateResult,
  html
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { state } from '@refinitiv-ui/core/decorators/state.js';
import { VERSION } from '../../version.js';
import { efConfig, DEFAULT_CONFIG } from '../helpers/context.js';
import type { Config } from '../helpers/types.js';
import { provide } from '@lit-labs/context';



@customElement('ef-configuration', { theme: false })
export class Configuration extends BasicElement {

  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }
  
  /**
   * Render slot as light DOM
   * @returns Element
   */
  protected createRenderRoot () {
    return this;
  }

  /**
   * Configuration data
   */
  @provide({ context: efConfig })
  @state()
  public config: Config = DEFAULT_CONFIG;

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
    'ef-configuration': Configuration;
  }
}
