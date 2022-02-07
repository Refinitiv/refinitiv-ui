import {
  html,
  css,
  TemplateResult,
  CSSResultGroup,
  SVGTemplateResult,
  svg,
  PropertyValues
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { VERSION } from '../../version.js';
import { Palettes } from './palettes.js';
import { GRAYSCALE_ITEMS, NOCOLOR_POINTS } from '../helpers/color-helpers.js';

/**
 * Component that allows user to select any
 * grayscale color by tapping or dragging
 */
@customElement('ef-grayscale-palettes', { theme: false })
export class GrayscalePalettes extends Palettes {

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
        display: flex;
        justify-content: center;
        max-height: 23px;
        min-height: 0;
      }
      line {
        pointer-events: none;
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
      svg {
        height: 100%;
      }
    `;
  }

  /**
   * Set the palettes to activate no-color option
   */
  @property({ type: Boolean, attribute: 'allow-nocolor' })
  public allowNocolor = false;

  /**
   * Create grayscale items template from GRAYSCALE_ITEMS array
   * @return grayscale items template
   */
  private get GrayscaleItemsTemplate (): SVGTemplateResult[] {
    return GRAYSCALE_ITEMS.map((item: string[]) => {
      return (
        svg`
          <polygon
            data-role="color-item"
            stroke="rgba(0,0,0,0.4)"
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
   * Create no color item template
   * @return no color item template
   */
  private get NoColorItemTemplate (): SVGTemplateResult | null {
    return this.allowNocolor ? (
      svg`
        <polygon
          id="nocolor-item"
          stroke="rgba(0,0,0,0.4)"
          fill="#fff"
          points=${NOCOLOR_POINTS}
          @tap=${this.onTapItem}
          @mousemove=${this.onMousemove}
          @touchmove=${this.onTouchmove}
        >
        </polygon>
        <line x1="15" y1="6" x2="-3" y2="17" stroke="red" stroke-width="2"></line>
      `
    ) : null;
  }

  /**
   * Update color selector element when value has been changed
   * @param changedProperties Properties that has changed
   * @return {void}
   */
  protected updated (changedProperties: PropertyValues): void {
    if (changedProperties.has('value')) {
      const value = this.expandHex(this.value);
      const item = GRAYSCALE_ITEMS.find((item: string[]) => item[1] === value);
      if (this.allowNocolor && this.value === '') {
        this.showSelector(NOCOLOR_POINTS);
      }
      else if (item) {
        this.showSelector(item[0]);
      }
      else {
        this.hideSelector();
      }
    }
    // hide selector if value equal '' and allowNocolor has been changed to false
    if (changedProperties.has('allowNocolor')) {
      if (!this.allowNocolor && this.value === '') {
        this.hideSelector();
      }
    }
  }

  /**
   * Update color value and fired value-changed event
   * @param element target element to get value
   * @return {void}
   */
  protected updateValue (element: SVGAElement): void {
    const color = element.getAttribute('fill');
    const itemId = element.getAttribute('id');
    if (color) {
      this.value = itemId === 'nocolor-item' ? '' : color;
      this.notifyPropertyChange('value', color);
    }
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return {TemplateResult}  Render template
   */
  protected render (): TemplateResult {
    const viewBox = this.allowNocolor ? '-5 0 169 23' : '6 0 169 23';
    return html`
      <svg id="grayscale-palettes" viewBox=${viewBox}>
        ${this.NoColorItemTemplate}
        ${this.GrayscaleItemsTemplate}
        ${this.SelectorTemplate}
      </svg>
    `;
  }
}

