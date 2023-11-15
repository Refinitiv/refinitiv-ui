import { BasicElement, CSSResultGroup, TemplateResult, css, html } from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';

import { VERSION } from '../../version.js';

@customElement('ef-slider-marker')
export class SliderMarker extends BasicElement {
  /**
   * Element version number
   * @returns version number
   */
  static override get version(): string {
    return VERSION;
  }

  static override get styles(): CSSResultGroup {
    return css`
      :host {
        position: absolute;
        z-index: 2;
      }
      [part='marker'] {
        width: inherit;
        height: inherit;
      }
      [part='label'] {
        position: absolute;
      }
    `;
  }

  /**
   * Used to determine the position of the marker on the scale.
   */
  @property({ type: String })
  public value = '';

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @returns Render template
   */
  protected override render(): TemplateResult {
    return html`
      <div part="marker"></div>
      <div part="label">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ef-slider-marker': SliderMarker;
  }
}
