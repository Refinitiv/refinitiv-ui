import {
  BasicElement,
  html,
  css,
  TemplateResult,
  CSSResultGroup
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { VERSION } from '../version.js';

/**
 * Use to identify and separate different sections of a page.
 * Headers helps to organize the page layout content into
 * a sensible hierarchy and improve the user experience.
 *
 * @slot left - Slot to add custom contents to the left side of header e.g. ef-icon, ef-checkbox
 * @slot right - Slot to add custom contents to the right side of header e.g. ef-icon, ef-checkbox
 */
@customElement('ef-header', {
  alias: 'coral-header'
})
export class Header extends BasicElement {

  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  /**
   * Style definition
   * @return CSS template
   */
  static get styles (): CSSResultGroup {
    return css`
      :host {
        display: block;
      }
      :host ::slotted(*) {
        margin-top: 0;
        margin-bottom: 0;
        vertical-align: middle;
      }
      [part="label"] {
        text-align: inherit;
      }
    `;
  }

  /**
   * Use level styling from theme
   */
  @property({ type: String, reflect: true })
  public level: '1'| '2'| '3' = '2';

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
      <slot name="left">
        <div part="spacer"></div>
      </slot>
      <div part="label">
        <slot></slot>
      </div>
      <slot name="right"></slot>
    `;
  }
}
