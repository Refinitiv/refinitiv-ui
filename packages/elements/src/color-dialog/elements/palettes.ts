import {
  BasicElement,
  property,
  svg,
  SVGTemplateResult,
  query
} from '@refinitiv-ui/core';

/**
 * Element base class usually used
 * for creating palettes elements.
 */
export class Palettes extends BasicElement {
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
   * create selector template
   * @return selector template
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
   * hide selector element
   * @return {void}
   */
  protected hideSelector (): void {
    if(this.colorSelector && this.colorSelectorShadow) {
      this.colorSelector.style.display = 'none';
      this.colorSelectorShadow.style.display = 'none';
    }
  }

  /**
   * show selector element on specific points
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
   * update color value when tab on color item
   * @param event mouse event
   * @return {void}
   */
  protected onTapItem = (event: MouseEvent): void => {
    const polygonElement = event.target as SVGAElement;
    this.updateValue(polygonElement);
  }

  /**
   * update color value when drag on color item
   * @param event mouse event
   * @return {void}
   */
  protected onMousemove = (event: MouseEvent): void => {
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
   * update color value when drag on color item in mobile device
   * @param event touch event
   * @return {void}
   */
  protected onTouchmove = (event: TouchEvent): void => {
    const touchOffsets = event.changedTouches[0];
    const realTarget = this.shadowRoot?.elementFromPoint(touchOffsets.clientX, touchOffsets.clientY) as SVGAElement;
    this.updateValue(realTarget);
  }

  /**
   * update color value and
   * fired value-changed event
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
