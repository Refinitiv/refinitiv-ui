import {
  ResponsiveElement,
  css,
  CSSResultGroup
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
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

  /**
   * A `CSSResultGroup` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @return CSS template
   */
  static get styles (): CSSResultGroup {
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

}

declare global {
  interface HTMLElementTagNameMap {
    'ef-overlay-viewport': OverlayViewport;
  }
}
