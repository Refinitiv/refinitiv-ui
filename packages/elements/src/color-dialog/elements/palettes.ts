import {
  BasicElement,
  svg,
  SVGTemplateResult
} from '@refinitiv-ui/core';
import { property } from '@refinitiv-ui/core/lib/decorators/property.js';
import { query } from '@refinitiv-ui/core/lib/decorators/query.js';
import { VERSION } from '../../version.js';

/**
 * Element base class usually used
 * for creating palettes elements.
 */
export class Palettes extends BasicElement {

  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  @query('.color-selector')
  private colorSelector?: HTMLElement | null;

  @query('.color-selector-shadow')
  private colorSelectorShadow?: HTMLElement | null;

  /**
   * Color value in hex
   */
  @property({ type: String })
  public value = '';

  /**
   * Create selector template
   * @return {SVGTemplateResult} selector template
   */
  protected get SelectorTemplate (): SVGTemplateResult {
    return (
      svg`
        <polygon class="color-selector-shadow"></polygon>
        <polygon class="color-selector"></polygon>
      `
    );
  }

  /**
   * Hide selector element
   * @return {void}
   */
  protected hideSelector (): void {
    if(this.colorSelector && this.colorSelectorShadow) {
      this.colorSelector.style.display = 'none';
      this.colorSelectorShadow.style.display = 'none';
    }
  }

  /**
   * Show selector element on specific points
   * @return {void}
   * @param points points of colorSelector
   */
  protected showSelector (points: string): void {
    if(this.colorSelector && this.colorSelectorShadow) {
      this.colorSelector.style.display = '';
      this.colorSelectorShadow.style.display = '';
      this.colorSelectorShadow.setAttribute('points', points);
      this.colorSelector.setAttribute('points', points);
    }
  }

  /**
   * Update color value when tab on color item
   * @param event mouse event
   * @return {void}
   */
  protected onTapItem (event: MouseEvent): void {
    const polygonElement = event.target as SVGAElement;
    this.updateValue(polygonElement);
  }

  /**
   * Update color value when drag on color item
   * @param event mouse event
   * @return {void}
   */
  protected onMousemove (event: MouseEvent): void {
    const polygonElement = event.target as SVGAElement;
    let mouseButton = event.buttons;
    if (mouseButton === undefined) { // buttons property is not supported in safari
      mouseButton = event.which;
    }
    if (mouseButton !== 1) {
      return;
    }
    // only update when user click and drag on color item
    this.updateValue(polygonElement);
  }

  /**
   * Update color value when drag on color item in mobile device
   * @param event touch event
   * @return {void}
   */
  protected onTouchmove (event: TouchEvent): void {
    const touchOffsets = event.changedTouches[0];

    // TODO: it is a bug of TypeScript@4.4 remove ts-ignore once it is fixed
    // https://github.com/microsoft/TypeScript/issues/45047
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const realTarget = this.shadowRoot?.elementFromPoint(touchOffsets.clientX, touchOffsets.clientY) as SVGAElement;
    this.updateValue(realTarget);
  }

  /**
   * Update color value and fired value-changed event
   * @param element target element to get value
   * @return {void}
   */
  protected updateValue (element: SVGAElement): void {
    const color = element.getAttribute('fill');
    if(color) {
      this.value = color;
      this.notifyPropertyChange('value', color);
    }
  }
}
