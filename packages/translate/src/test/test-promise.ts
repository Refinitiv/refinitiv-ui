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

import {
  translate,
  TranslatePromise
} from '../translate';

import './test-nested-translate';
import './phrasebook';

@customElement('test-promise', { theme: false })
export class TestPromise extends BasicElement {
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

  @translate({
    scope: 'test-translate',
    mode: 'promise'
  })
  public t!: TranslatePromise;

  public promiseResult = '';

  protected async performUpdate (): Promise<void> {
    this.promiseResult = await this.t('DEFAULT');
    void super.performUpdate();
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`${this.promiseResult}`;
  }
}
