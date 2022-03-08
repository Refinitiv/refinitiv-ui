import {
  ResponsiveElement,
  html,
  css,
  TemplateResult,
  CSSResultGroup,
  ElementSize
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { VERSION } from '../../version.js';
import './tornado-item.js';
import type { TornadoItem } from './tornado-item';

/**
 * A data visualization that helps to
 * show the differences or similarities between values
 * @slot header - Any HTML contents to display at chart header section
 * @slot footer - Any HTML contents to display at chart footer section
 */
@customElement('ef-tornado-chart', {
  alias: 'sapphire-parity-chart'
})
export class TornadoChart extends ResponsiveElement {

  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  /**
   * Primary bar chart legend text
   */
  @property({ type: String })
  public primary: string | null = null;

  /**
   * Secondary bar chart legend text
   */
  @property({ type: String })
  public secondary: string | null = null;

  /**
   * A flag to keep component's responsive state
   */
  private isResponsive = false;

  /**
   * True if legend's alignment is vertical
   */
  private legendAlignment = false;

  /**
   * Set chart's legend alignment
   * @param responsive true if items needs to be responsive
   * @returns {void}
   */
  private setLegendAlignment (responsive: boolean): void {
    this.legendAlignment = responsive;
    this.requestUpdate();
  }

  /**
   * Set ef-tornado-item's alignment
   * @param responsive true if items needs to be responsive
   * @returns {void}
   */
  private setItemAlignment (responsive: boolean): void {
    this.querySelectorAll('ef-tornado-item').forEach((item: Element) => {
      (item as TornadoItem).vertical = responsive;
    });
  }

  /**
   * Handles element's resize behavior
   * @ignore
   * @param {ElementSize} size size of the element
   * @returns {void}
   */
  public resizedCallback (size: ElementSize): void {
    const previousResponsiveValue = this.isResponsive;
    this.isResponsive = size.width < parseInt(this.getComputedVariable('--responsive-width'), 10);

    // Make changes to DOM only when the responsive state changes
    if (this.isResponsive !== previousResponsiveValue) {
      this.setItemAlignment(this.isResponsive);
      this.setLegendAlignment(this.isResponsive);
    }
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
        --responsive-width: 450;
      }
    `;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
      <slot name="header"></slot>
      <div part="legend" ?vertical=${this.legendAlignment}>
        <div part="legend-item">
          <div part="primary-symbol"></div>
          <div part="primary-label">${this.primary}</div>
        </div>
        <div part="legend-item">
          <div part="secondary-symbol"></div>
          <div part="secondary-label">${this.secondary}</div>
        </div>
      </div>
      <slot></slot>
      <slot name="footer"></slot>
    `;
  }
}
