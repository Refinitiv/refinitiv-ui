import {
  BasicElement,
  html,
  css,
  PropertyValues,
  TemplateResult,
  CSSResultGroup
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { query } from '@refinitiv-ui/core/decorators/query.js';
import { VERSION } from '../version.js';

import {
  merge,
  MergeObject
} from './helpers/index.js';

import {
  Chart as ChartJS
// TODO: import only common types and let user registers specific type
// eslint-disable-next-line import/extensions
} from 'chart.js/auto';

import type { ChartConfiguration, ChartOptions, UpdateMode } from 'chart.js';

import type { Header } from '../header';
import '../header/index.js';

// TODO: import only common types and let user registers specific type
export * from 'chart.js';

const CSS_COLOR_PREFIX = '--chart-color-';

/**
 * Charting component that use ChartJS library
 */
@customElement('ef-chart')
export class Chart extends BasicElement {

  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  /**
   * Chart.js object
   */
  public chart: ChartJS | null = null;

  /**
   * Chart configurations. Same configuration as ChartJS
   * @type {ChartConfiguration}
   */
  @property({ type: Object })
  public config: ChartConfiguration | null = null;

  /**
   * Html canvas element
   * @type {HTMLCanvasElement}
   */
  @query('canvas')
  protected canvas!: HTMLCanvasElement;

  /**
   * Get canvas element from shadow roots
   */
  @query('ef-header')
  protected titleElement!: Header;

  /**
   * Required properties, needed for chart to work correctly.
   * @returns config
   */
  protected get requiredConfig (): ChartOptions {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: false
        }
      }
    };
  }

  /**
   * List of available chart colors
   * @type {string[]}
   * @returns {string[]} List of available chart colors
   */
  public get colors (): string[] {
    let color;
    let index = 0;
    const colors = [];
    while ((color = this.getComputedVariable(`${CSS_COLOR_PREFIX}${++index}`))) {
      colors.push(color);
    }
    return colors;
  }

  /**
   * Safely returns the chart title
   * @returns chart title
   */
  protected get chartTitle (): string {
    const title = this.config?.options?.plugins?.title?.text;

    if (title) {
      return typeof title === 'string' ? title : title.join();
    }

    return '';
  }

  /**
   * Invoked whenever the element is updated
   * @param {PropertyValues} changedProperties Map of changed properties with old values
   * @returns {void}
   */
  protected updated (changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (changedProperties.has('config')) {
      this.onConfigChange();
    }
  }

  /**
   * Element connected
   * @returns {void}
   */
  public connectedCallback (): void {
    super.connectedCallback();
    if (this.canvas) {
      this.createChart();
    }
  }

  /**
   * Element disconnected
   * @returns {void}
   */
  public disconnectedCallback (): void {
    super.disconnectedCallback();
    this.destroyChart();
  }

  /**
   * Handles a change of configuration object.
   * This does not fire when a property of the config object changes,
   * for this use this.updateChart() to apply changes.
   * @returns {void}
   */
  protected onConfigChange (): void {
    if (this.config) {
      this.createChart();
    }
  }

  /**
   * Merges all the different layers of the config.
   * @returns {void}
   */
  protected mergeConfigs (): void {
    if (!this.config) {
      return;
    }

    // TODO: unknown type
    merge(this.config as unknown as MergeObject, { options: this.requiredConfig } as MergeObject, true);
  }

  /**
   * Themes the passed-in configuration object
   * @returns {void}
   */
  protected decorateConfig (): void {
    this.mergeConfigs();
  }

  /**
   * Manages the custom title element
   * @returns {void}
   */
  private manageTitle (): void {
    this.titleElement.textContent = this.chartTitle;
    if (this.chartTitle) {
      this.titleElement.style.removeProperty('display');
    }
    else {
      this.titleElement.style.display = 'none';
    }
  }

  /**
   * Creates a chart after config has changed,
   * or, the element has been connected to the DOM
   * @returns {void}
   */
  protected createChart (): void {
    const ctx = this.canvas.getContext('2d');
    if (ctx && this.config) {
      this.destroyChart();
      this.decorateConfig();
      this.manageTitle();

      this.chart = new ChartJS(this.canvas, this.config);
    }
  }

  /**
   * Destroys the chart.js object
   * @returns True if a chart object has been destroyed
   */
  protected destroyChart (): boolean {
    if (this.chart) {
      // Destroy the chart
      this.chart.destroy();
      this.chart = null;
      return true;
    }
    return false;
  }

  /**
   * Re-renders the chart based on its config
   * @param {UpdateMode} updateMode Additional configuration object for the update process.
   * @returns {void}
   */
  private renderChart (updateMode: UpdateMode): void {
    if (!this.chart || !this.config) {
      return;
    }

    // Stop any chart.js animations
    this.chart.stop();
    this.decorateConfig();
    this.manageTitle();

    // Update the chart
    this.chart?.update(updateMode);
  }

  /**
   * Update all data, title, scales, legends and re-render the chart based on its config
   * @param {UpdateMode} updateMode Additional configuration for control an animation in the update process.
   * @returns {void}
   */
  public updateChart (updateMode: UpdateMode): void {
    this.renderChart(updateMode);
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
        overflow: hidden;
        position: relative;
      }
      :host::before {
        content: '';
        display: block;
        padding-top: 60%;
        min-height: 300px;
        box-sizing: border-box;
      }
      [container] {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        flex-direction: column;
      }
      [part=chart] {
        flex: 1 1 auto;
        position: relative;
      }
      ef-header {
        margin-bottom: 12px;
      }
      canvas {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
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
      <div container>
        <ef-header></ef-header>
        <div part="chart">
          <canvas id="canvas"></canvas>
        </div>
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ef-chart': Chart;
  }
}
