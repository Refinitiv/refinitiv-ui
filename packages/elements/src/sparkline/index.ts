import {
  css,
  CSSResultGroup,
  PropertyValues,
  ResponsiveElement,
  TemplateResult,
  ElementSize,
  html
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { query } from '@refinitiv-ui/core/decorators/query.js';
import { VERSION } from '../version.js';
import { color } from '@refinitiv-ui/utils/color.js';
import '@refinitiv-ui/browser-sparkline';
import type { BrowserSparklineChart } from '@refinitiv-ui/browser-sparkline';
import type { StaticDataConfig, ThemeConfig } from '@refinitiv-ui/browser-sparkline/lib/browserSparklineCanvas';

@customElement('ef-sparkline', {
  alias: 'sapphire-sparkline'
})
export class Sparkline extends ResponsiveElement {
  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  /**
   * Chart data as an array of number.
   * @type {number[]}
   */
  @property({ type: Array })
  public data: number[] = [];

  /**
   * Chart previous data as an array of number.
   * @type {number[]}
   */
  @property({ attribute: 'previous-data', type: Array })
  public previousData: number[] = [];

  /**
   * Baseline value to show horizontal line (optional)
   */
  @property({ attribute: 'reference-value', type: Number })
  public referenceValue?: number;

  /**
   * Chart width
   */
  protected width?: number;

  /**
   * Chart height
   */
  protected height?: number;

  /**
   * Chart initialize status
   */
  protected initialized = false;

  /**
   * Get canvas element from shadow roots
   */
  @query('browser-sparkline-chart')
  protected chart!: BrowserSparklineChart;

  /**
   * Get configuration for theme
   */
  protected get defaultThemeConfig (): Partial<ThemeConfig> {
    return {
      width: this.width,
      height: this.height,
      lineColor: color(this.getComputedVariable('--line-color', '#ff9933'))?.formatHex(),
      lineWidth: parseInt(this.getComputedVariable('--line-width', '2px'), 10),
      referenceLineColor: color(this.getComputedVariable('--reference-line-color', 'rgba(120, 120, 130, 0.5)'))?.formatHex(),
      previousLineColor: color(this.getComputedVariable('--previous-line-color', '#bfbfbf'))?.formatHex(),
      upperLineColor: color(this.getComputedVariable('--upper-line-color', '#309054'))?.formatHex(),
      lowerLineColor: color(this.getComputedVariable('--lower-line-color', '#d94255'))?.formatHex(),
      fillColorStyle: this.getComputedVariable('--fill-color-style', 'gradient')
    };
  }

  /**
   * Get configuration for static data
   */
  private get staticDataConfig (): StaticDataConfig {
    return {
      previousData: this.previousData,
      data: this.data,
      referenceValue: this.referenceValue
    };
  }

  /**
   * On Connected Callback Lifecycle
   * @ignore
   * @return {void}
   */
  public connectedCallback (): void {
    super.connectedCallback();
    this.createChart();
  }

  /**
   * On Updated Lifecycle
   * @ignore
   * @param changedProperties changed properties
   * @return {void}
   */
  protected updated (changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (changedProperties.get('data')) {
      this.dataChanged();
    }
    this.createChart();
  }

  /**
   * Handles when data was changed.
   * Fires event `data-changed` by default but will fires event `data-error` if giving data a wrong format
   * @returns {void}
   */
  private dataChanged (): void {
    if (!this.data || this.data.length < 2) {
      /* @fires data-error
       * Fired when data has error and chart cannot be updated
       */
      this.dispatchEvent(new CustomEvent('data-error'));
      return;
    }

    /**
     * Fired when data is changed
     * @fires data-changed
     */
    this.dispatchEvent(new CustomEvent('data-changed'));
  }

  /**
   * Re-draw canvas when the size of component changed
   * @ignore
   * @param size element dimensions
   * @returns {void}
   */
  public resizedCallback (size: ElementSize): void {
    this.width = size.width;
    this.height = size.height;

    if (this.initialized) {
      this.chart.style.width = `${this.width}px`;
      this.chart.style.height = `${this.height}px`;
      this.chart.updateCanvasSize(this.width, this.height);
    }
    else {
      this.initialized = true;
      this.createChart();
    }
  }

  /**
   * Create chart
   * @protected
   * @returns {void}
   */
  protected createChart (): void {
    if (!this.isConnected || !this.initialized || !this.data || this.data.length < 2) {
      return;
    }

    this.chart.config = {
      themeConfig: this.defaultThemeConfig,
      staticData: this.staticDataConfig
    };
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
        width: 100px;
        height: 50px;
        display: block;
      }

      browser-sparkline-chart, browser-sparkline-canvas {
        width: 100%;
        height: 100%;
        display: block;
      }

      [part=chart] {
        height: 100%;
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
      <browser-sparkline-chart part="chart" id="sparkline"></browser-sparkline-chart>
    `;
  }
}
