import { provide } from '@lit-labs/context';

import { BasicElement, TemplateResult, html } from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { state } from '@refinitiv-ui/core/decorators/state.js';

import { VERSION } from '../../version.js';
import { DEFAULT_CONFIG, efConfig } from '../helpers/context.js';

import type { Config } from '../helpers/types.js';

@customElement('ef-configuration', { theme: false })
export class Configuration extends BasicElement {
  /**
   * Element version number
   * @returns version number
   */
  static override get version(): string {
    return VERSION;
  }

  /**
   * Render slot as light DOM
   * @returns Element
   */
  protected override createRenderRoot() {
    return this;
  }

  /**
   * Configuration data
   * @type {Config}
   * @attr -
   * @default {icon: { map: {} }}
   */
  @provide({ context: efConfig })
  @state()
  public config: Config = DEFAULT_CONFIG;

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ef-configuration': Configuration;
  }
}
