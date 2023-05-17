import {
  BasicElement,
  TemplateResult,
  html
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { VERSION } from '../../version.js';
import { efConfig, type Icon } from '../helpers/context.js';
import { provide } from '@lit-labs/context';

@customElement('ef-config', { theme: false })
export class Config extends BasicElement {

  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  @provide({ context: efConfig })
  @property({ type: Object, attribute: false })
    iconMap: Icon = {};

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
    'ef-config': Config;
  }
}
