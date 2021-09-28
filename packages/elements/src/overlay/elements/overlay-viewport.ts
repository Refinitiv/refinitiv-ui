import {
  ResponsiveElement,
  css,
  CSSResult,
  TemplateResult,
  html
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/lib/decorators/custom-element.js';
import { VERSION } from '../../version.js';

/**
 * A private element to find overlay size boundaries
 */
@customElement('ef-overlay-viewport', {
  theme: false
})
export class OverlayViewport extends ResponsiveElement {

  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  private static Template = html``; /* IE11 need empty template */

  /**
   * A `CSSResult` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @return CSS template
   */
  static get styles (): CSSResult {
    return css`
      :host {
        display: block;
        position: fixed;
        visibility: hidden;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
      }
    `;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  public render (): TemplateResult {
    return OverlayViewport.Template;
  }
}
