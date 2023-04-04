import { html, css, CSSResultGroup, TemplateResult, BasicElement } from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { VERSION } from '../version.js';

/**
 * A footer component.
 */
@customElement('ui-sub-footer', { theme: false })
export class SubFooter extends BasicElement {

  protected defaultRole: string | null = 'contentinfo';

  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  /**
   * A `CSSResultGroup` that will be used to style the host,
   * slotted children and the internal template of the element.
   * @returns CSS template
   */
  static get styles (): CSSResultGroup {
    return css`
      :host {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        height: var(--footer-height);
        padding: var(--footer-padding-vertical) var(--footer-padding-horizontal);
        font: var(--link-md-emphasis-all);
        background-color: var(--base-bg-emphasis);
      }
      ::slotted(*) {
        font: var(--copy-md-emphasis-all);
        color: var(--base-content-primary-on-invert);
      }
      ::slotted(a) {
        text-underline-offset: var(--width-fixed3);
        text-decoration-thickness: var(--width-fixed1)
      }
      ::slotted(a:focus-visible) {
        outline: var(--control-focused-ring-on-invert);
      }
      ::slotted(a:not(:last-child)) {
        margin-right: var(--footer-padding-between);
      }
      ::slotted(a:not(:first-child)) {
        margin-left: var(--footer-padding-between);
      }
    `;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return {TemplateResult}  Render template
   */
  protected render (): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-sub-footer': SubFooter;
  }
}
