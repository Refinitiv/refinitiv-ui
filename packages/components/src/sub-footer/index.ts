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
        flex-wrap: wrap;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        height: var(--footer-height);
        padding: var(--footer-padding-vertical) var(--footer-padding-horizontal);
        font: var(--link-md-emphasis-all);
        background-color: var(--base-bg-emphasis);
      }
      ::slotted(a) {
        position: relative;
        outline-offset: 0;
        box-sizing: border-box;

        font: var(--link-md-emphasis-all);
        color: var(--link-content-primary-on-invert);
        border: var(--width-fixed2) solid transparent;

        text-underline-offset: var(--width-fixed2);
        text-decoration-thickness: var(--width-fixed1);
      }
      ::slotted(a:not(:last-child))::after {
        content: '';
        position: absolute;
        top: 4px;
        left: 0px;

        width: calc(var(--footer-padding-between) + 100%);
        height: 12px;
        border-right: var(--width-fixed2) solid var(--link-content-primary-on-invert);
      }
      ::slotted(a:visited) {
        color: var(--link-content-visited-on-invert);
      }
      ::slotted(a:hover) {
        color: var(--link-content-hover-on-invert);
        text-decoration-thickness: var(--width-fixed2);
      }
      ::slotted(a:focus-visible) {
        color: var(--link-content-focused-on-invert);
        border: var(--control-focused-ring-on-invert);
        text-decoration-thickness: var(--width-fixed2);
        outline: none;
      }
      ::slotted(a:not(:last-child)) {
        margin-right: var(--footer-padding-between);
      }
      ::slotted(a:not(:first-child)) {
        margin-left: var(--footer-padding-between);
      }
      @media screen and (max-width: 639px) {
        :host {
          height: var(--footer-xs-height);
          padding: var(--footer-xs-padding-vertical) var(--footer-xs-padding-horizontal);
        }
        ::slotted(a) {
          text-align: center;
          /* min-width: var(--footer-xs-link-width); */
        }
        ::slotted(a:not(:last-child):not(:first-child)) {
          margin-right: 0;
        }
        ::slotted(a:nth-child(2))::after {
          display: none;
        }
        ::slotted(a:last-child) {
          margin-left: 0;
          margin-right: 100%;
          min-width: max-content;
        }
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
