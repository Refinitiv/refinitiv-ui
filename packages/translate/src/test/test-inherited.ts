import {
  html,
  TemplateResult
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { query } from '@refinitiv-ui/core/decorators/query.js';
import {
  translate,
  TranslateDirective
} from '../translate';

import { TestTranslate } from './test-translate';

@customElement('test-inherited', { theme: false })
export class TestInherited extends TestTranslate {
  @translate()
  public inheritedT!: TranslateDirective;

  @query('#inherit')
  private inheritEl!: HTMLElement;

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
      ${super.render()}
      <div id="inherit">${this.inheritedT('INHERIT')}</div>
    `;
  }
}
