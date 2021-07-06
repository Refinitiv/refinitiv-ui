import {
  BasicElement,
  css,
  customElement,
  CSSResult,
  property,
  TemplateResult,
  html
} from '@refinitiv-ui/core';
import { VERSION } from '../../';

import {
  NullOrUndefined
} from '../helpers/types';

/**
 * A private element to show backdrop for overlay
 */
@customElement('ef-overlay-backdrop')
export class OverlayBackdrop extends BasicElement {

  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  private static Template = html``;

  /**
   * A `CSSResult` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @return CSS template
   */
  static get styles (): CSSResult {
    return css`
      :host {
        pointer-events: all;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    `;
  }

  /**
   * Set a specific z-index to override automatically calculated z-index
   * @param zIndex zIndex value
   */
  @property({ type: Number, attribute: false })
  public set zIndex (zIndex: number | NullOrUndefined) {
    if (typeof zIndex === 'number') {
      this.style.setProperty('z-index', `${zIndex}`);
    }
    else {
      this.style.removeProperty('z-index');
    }
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  public render (): TemplateResult {
    return OverlayBackdrop.Template;
  }
}
