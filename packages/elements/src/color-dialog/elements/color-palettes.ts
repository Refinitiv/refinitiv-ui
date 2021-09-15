import {
  html,
  css,
  customElement,
  TemplateResult,
  CSSResult,
  SVGTemplateResult,
  svg,
  PropertyValues
} from '@refinitiv-ui/core';

import { Palettes } from './palettes';
import { COLOR_ITEMS, ColorHelpers } from '../helpers/color-helpers';
import { VERSION } from '../../version';

/**
 * Component that allows user to select
 * any colours by tapping or dragging
 */
@customElement('ef-color-palettes', { theme: false })
export class ColorPalettes extends Palettes {

  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  /**
   * A `CSSResult` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @return {CSSResult | CSSResult[]} CSS template
   */
  static get styles (): CSSResult | CSSResult[] {
    return css`
      :host {
        display: block;
      }
      svg {
        width: 100%;
      }
      .color-selector {
        stroke: #fff;
        stroke-width: 2;
        fill: none;
        pointer-events: none;
      }
      .color-selector-shadow {
        stroke: black;
        stroke-width: 3;
        fill: none;
        pointer-events: none;
      }
    `;
  }

  /**
   * create color items template from COLOR_ITEMS array
   * @return color items template
   */
  private get ColorItemsTemplate (): SVGTemplateResult[] {
    return COLOR_ITEMS.map((item: string[]) => {
      return (
        svg`
          <polygon
            data-role="color-item"
            stroke=${item[1]}
            fill=${item[1]}
            points=${item[0]}
            @tap=${this.onTapItem}
            @mousemove=${this.onMousemove}
            @touchmove=${this.onTouchmove}
          >
          </polygon>
        `
      );
    });
  }

  /**
   * Update color selector element when value has been changed
   * @param changedProperties Properties that has changed
   * @return {void}
   */
  protected updated (changedProperties: PropertyValues): void {
    if(changedProperties.has('value')) {
      const value = ColorHelpers.expandHex(this.value);
      const item = COLOR_ITEMS.find((item: string[]) => item[1] === value);
      if(item) {
        this.showSelector(item[0]);
      }
      else {
        this.hideSelector();
      }
    }
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return {TemplateResult}  Render template
   */
  protected render (): TemplateResult {
    return html`
      <svg id="colorPalettes" viewBox="-5 -5 245 210">
        ${this.ColorItemsTemplate}
        ${this.SelectorTemplate}
      </svg>
    `;
  }
}
