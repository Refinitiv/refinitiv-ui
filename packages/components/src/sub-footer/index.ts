import { html, css, CSSResultGroup, TemplateResult, BasicElement } from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { VERSION } from '../version.js';

/**
 * A footer component.
 */
@customElement('ui-sub-footer', { theme: false })
export class SubFooter extends BasicElement {
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
      :host [part=footer] {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        box-sizing: border-box;

        width: 100%;

        height: var(--code-only-dimension-footer-height);
        padding: var(--code-only-dimension-footer-padding-vertical) var(--code-only-dimension-footer-padding-horizontal);
        font: var(--link-md-emphasis-all);
        background-color: var(--base-bg-emphasis);
      }
      ::slotted(a) {
        position: relative;
        outline-offset: 0;
        box-sizing: border-box;

        font: var(--link-md-emphasis-all);
        color: var(--link-content-default-on-invert);
        border: var(--width-fixed2) solid transparent;

        text-underline-offset: var(--width-fixed2);
        text-decoration-thickness: var(--width-fixed1);
      }
      ::slotted(a:not(:last-child))::after {
        content: '';
        position: absolute;
        top: 4px;
        left: 0px;

        width: calc(var(--code-only-dimension-footer-padding-between) + 100%);
        height: 12px;
        border-right: var(--width-fixed2) solid var(--link-content-default-on-invert);
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
        margin-right: var(--code-only-dimension-footer-padding-between);
      }
      ::slotted(a:not(:first-child)) {
        margin-left: var(--code-only-dimension-footer-padding-between);
      }
      @media screen and (max-width: 639px) {
        :host [part=footer] {
          height: var(--code-only-dimension-footer-xs-height);
          padding: var(--code-only-dimension-footer-xs-padding-vertical) var(--code-only-dimension-footer-xs-padding-horizontal);
        }
        ::slotted(a) {
          flex-grow: 1;
          text-align: center;
        }
        ::slotted(a:not(:last-child):not(:first-child)) {
          margin-right: 0;
        }
        ::slotted(a:nth-child(2))::after {
          display: none;
        }
        ::slotted(a:last-child) {
          margin-left: 0;
          margin-right: 50%;
          margin-top: var(--code-only-dimension-footer-xs-link-spacing);
          min-width: 50%;
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
    return html`<footer part="footer"><slot></slot></footer>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-sub-footer': SubFooter;
  }
}
