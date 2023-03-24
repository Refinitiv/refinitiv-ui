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
import { color as parseColor } from '@refinitiv-ui/utils/color.js';

import {
  merge,
  MergeObject
} from './helpers/index.js';
import type {
  DatasetColors
} from './helpers/types';

import {
  Chart as ChartJS,
  Plugin,
  ChartType,
  ChartDataset,
  Color,
  LineControllerDatasetOptions
// TODO: import only common types and let user registers specific type
// eslint-disable-next-line import/extensions
} from 'chart.js/auto';

import type { ChartConfiguration, ChartOptions, UpdateMode, LegendItem } from 'chart.js';

import type { Header } from '../header';
import '../header/index.js';

// Register plugins
import doughnutCenterPlugin from './plugins/doughnut-center-label.js';
import 'chartjs-adapter-date-fns';

// TODO: import only common types and let user registers specific type
export * from 'chart.js';

const CSS_COLOR_PREFIX = '--chart-color-';

/* Make ChartJS to know our plugin
 * https://www.chartjs.org/docs/latest/developers/plugins.html#typescript-typings
 */
declare module 'chart.js' {
  interface PluginOptionsByType<TType extends ChartType> {
    'ef-chart'?: {
      enable: boolean
    }
  }
}

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
        },
        'ef-chart': {
          enable: true
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
   * Returns the chart title
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
   * Returns a dataset array
   * @returns dataset array
   */
  protected get datasets (): ChartDataset[] {
    return this.config?.data?.datasets || [];
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
    this.setGlobalConfig();
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
   * Create plugin to set our theme into chartjs lifecycle
   * @returns {Plugin} plugin
   */
  private createPlugin (): Plugin {
    return {
      id: 'ef-chart',
      beforeInit: (chart: ChartJS) => {
        const option: ChartOptions = this.themableChartOption;
        merge(chart.config.options as unknown as MergeObject, option);
      },
      beforeUpdate: this.decorateColors
    };
  }

  /**
   * Themable parts of the config.
   * This will be merged into the configuration object.
   * @returns {ChartOptions} chart config with theme
   */
  protected get themableChartOption (): ChartOptions {
    return {
      animation: {
        duration: this.cssVarAsNumber('--animation-duration', '0')
      },
      elements: {
        line: {
          borderWidth: this.cssVarAsNumber('--line-width', '1'),
          tension: this.cssVarAsNumber('--line-tension', '0.5')
        }
      },
      plugins: {
        tooltip: {
          backgroundColor: this.getComputedVariable('--tooltip-background-color', 'transparent'),
          titleColor: this.getComputedVariable('--tooltip-title-color', 'transparent'),
          bodyColor: this.getComputedVariable('--tooltip-body-color', 'transparent'),
          cornerRadius: this.cssVarAsNumber('--tooltip-border-radius', '0'),
          caretSize: this.cssVarAsNumber('--tooltip-caret-size', '0'),
          padding: {
            x: this.cssVarAsNumber('--tooltip-padding-x', '--tooltip-padding', '0'),
            y: this.cssVarAsNumber('--tooltip-padding-y', '--tooltip-padding', '0')
          },
          titleSpacing: this.cssVarAsNumber('--tooltip-title-spacing', '0'),
          displayColors: false
        },
        legend: {
          position: ['pie', 'doughnut'].includes(this.config?.type || '') ? 'right' : 'top',
          labels: {
            boxWidth: this.cssVarAsNumber('--legend-key-box-width', '10'),
            generateLabels: this.generateLegendLabels
          }
        }
      }
    };
  }

  /**
   * Set global configuration of ChartJS
   * @returns {void}
   */
  // TODO: Try and remove the need for global object modification.
  // It's easier to cover all areas by modifying the global object,
  // however, if possible, we should look to try and just modify local configs.
  private setGlobalConfig (): void {
    const cssStyle = getComputedStyle(this);

    // Set font globals
    ChartJS.defaults.color = cssStyle.getPropertyValue('color');
    ChartJS.defaults.font.family = cssStyle.getPropertyValue('font-family');
    ChartJS.defaults.font.size = Number(cssStyle.getPropertyValue('font-size').replace('px', ''));
    ChartJS.defaults.font.style = cssStyle.getPropertyValue('font-style') as 'normal' | 'italic' | 'oblique' | 'initial' | 'inherit' | undefined;
    // Set global grid color
    ChartJS.defaults.scale.grid.color = (line) => {
      return line.index === 0 ? this.getComputedVariable('--zero-line-color', 'transparent') : this.getComputedVariable('--grid-line-color', 'transparent');
    };
    ChartJS.defaults.scales.radialLinear.ticks.showLabelBackdrop = false;
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
   * Get as CSS variable and tries to convert it into a usable number
   * @returns {(number|undefined)} The value as a number, or, undefined if NaN.
   */
  protected cssVarAsNumber (...args: string[]): number | undefined {
    const result = Number(this.getComputedVariable(...args).replace(/\D+$/, ''));
    return isNaN(result) ? undefined : result;
  }

  /**
   * Inject theme color into each datasets
   * @param {ChartJS} chart Chart.js instance
   * @returns {void}
   */
  protected decorateColors = (chart: ChartJS): void => {
    chart.config.data.datasets.forEach((dataset, datasetIndex) => {
      let colors;
      let borderColor;
      let backgroundColor;
      const isMultipleDatasets = (chart.config.data.datasets.length > 1);
      // From old requirement, Only line, radar, scatter, polarArea type are opaque backgroundColor
      switch (dataset.type || this.config?.type) {
        case 'line':
        case 'radar':
        case 'scatter':
          colors = this.generateColors(false, 1, datasetIndex);
          if (!dataset.borderColor) {
            dataset.borderColor = colors.solid;
          }
          if (!dataset.backgroundColor) {
            dataset.backgroundColor = colors.opaque;
          }
          if (!(dataset as LineControllerDatasetOptions).pointBackgroundColor) {
            (dataset as LineControllerDatasetOptions).pointBackgroundColor = colors.solid;
          }
          if (!(dataset as LineControllerDatasetOptions).pointBorderColor) {
            (dataset as LineControllerDatasetOptions).pointBorderColor = colors.solid;
          }
          break;

        // These types, Colors are set to an array.
        case 'doughnut':
        case 'pie':
        case 'polarArea':
          const index = isMultipleDatasets ? 0 : datasetIndex;
          colors = this.generateColors(true, dataset.data ? dataset.data.length : 1, index);
          borderColor = isMultipleDatasets ? this.getComputedVariable('--multi-dataset-border-color', '#fff') : colors.solid;
          backgroundColor = this.config?.type === 'polarArea' ? colors.opaque : colors.solid;
          if (!dataset.borderColor) {
            dataset.borderColor = borderColor;
          }
          if (!dataset.backgroundColor) {
            dataset.backgroundColor = backgroundColor;
          }
          // Add more colors if items aren't enough
          if (Array.isArray(dataset.borderColor) && Array.isArray(borderColor) && dataset.borderColor.length < borderColor.length) {
            merge(dataset.borderColor, borderColor);
          }
          if (Array.isArray(dataset.backgroundColor) && Array.isArray(backgroundColor) && dataset.backgroundColor.length < backgroundColor.length) {
            merge(dataset.backgroundColor, backgroundColor);
          }
          break;

        // These types, Colors could be string or array
        case 'bar':
        case 'bubble':
          colors = this.generateColors(!isMultipleDatasets, !isMultipleDatasets && dataset.data ? dataset.data.length : 1, datasetIndex);
          borderColor = colors.solid;
          backgroundColor = this.config?.type === 'bubble' ? colors.opaque : colors.solid;
          if (!dataset.borderColor) {
            dataset.borderColor = borderColor;
          }
          if (!dataset.backgroundColor) {
            dataset.backgroundColor = backgroundColor;
          }
          // Add more colors if items aren't enough
          if (Array.isArray(dataset.borderColor) && Array.isArray(borderColor) && dataset.borderColor.length < borderColor.length) {
            merge(dataset.borderColor, borderColor);
          }

          if (Array.isArray(dataset.backgroundColor) && Array.isArray(backgroundColor) && dataset.backgroundColor.length < backgroundColor.length) {
            merge(dataset.backgroundColor, backgroundColor);
          }
          break;
        // For other types
        default:
          colors = this.generateColors(false, dataset.data.length, datasetIndex);
          if (!dataset.borderColor) {
            dataset.borderColor = colors.solid;
          }
          if (!dataset.backgroundColor) {
            dataset.backgroundColor = colors.opaque;
          }
          break;
      }
    });
  };

  /**
   * Generates the legend labels on a given chart
   * @param {ChartJS} chart Chart.js instance
   * @returns {LegendItem[]} Array of label configurations
   */
  protected generateLegendLabels = (chart: ChartJS): LegendItem[] => {
    const chartType = (chart.config as ChartConfiguration).type;
    if (!chartType) {
      return [];
    }

    let legends: LegendItem[] = [];
    const datasets = chart.config.data.datasets;

    if (
      datasets.length
      && chart?.config?.options?.plugins?.legend
      && Array.isArray(datasets[0].backgroundColor)
    ) {

      if (ChartJS.overrides.pie.plugins.legend.labels.generateLabels) {
        legends = ChartJS.overrides.pie.plugins.legend.labels.generateLabels(chart);
      }

      // Customize for doughnut chart change border color to background color
      if (['pie', 'doughnut'].includes(chartType) && this.datasets.length > 1) {
        legends.forEach((label: LegendItem)=> {
          label.strokeStyle = label.fillStyle;
        });
      }

      return legends;
    }

    if (ChartJS.defaults.plugins.legend.labels.generateLabels) {
      legends = ChartJS.defaults.plugins.legend.labels.generateLabels(chart);
    }
    legends.forEach((legend, i) => {
      legend.lineWidth = Number(datasets[i].borderWidth) || 0;
      switch (datasets[i].type || chartType) {
        case 'line':
        case 'radar':
        case 'scatter':
        case 'bubble':
          legend.fillStyle = (datasets[i] as LineControllerDatasetOptions).borderColor as Color;
          break;
        // For other chart types
        default:
          break;
      }
    });
    return legends;
  };

  /**
   * Merges all the different layers of the config.
   * @returns {void}
   */
  protected mergeConfigs (): void {
    if (!this.config) {
      return;
    }

    merge(this.config as unknown as MergeObject,
      {
        plugins: [this.createPlugin(), doughnutCenterPlugin],
        options: this.requiredConfig
      } as MergeObject,
      true
    );
  }


  /**
   * Generates internal solid and opaque color set for a dataset
   * @param {boolean} isArray Flag to return result in array or not e.g. doughnut, pie, etc
   * @param {number} amount Amount of colors required
   * @param {number} shift Positional shift of the color start point
   * @returns {DatasetColors} Solid and opaque color values
   */
  protected generateColors (isArray: boolean, amount: number, shift: number): DatasetColors {
    const solid = [];
    const opaque = [];
    const alpha = Number(this.getComputedVariable('--fill-opacity', '0.2'));

    amount = isArray ? amount : 1;

    for (let i = shift; i < amount + shift; i++) {
      const color = this.colors[i % this.colors.length];
      solid.push(color);

      const opaqueColor = parseColor(color);
      if (opaqueColor) {
        opaqueColor.opacity = alpha;
        opaque.push(opaqueColor.toString());
      }
    }
    return {
      solid: isArray ? solid : solid[0],
      opaque: isArray ? opaque : opaque[0]
    };
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
      this.mergeConfigs();
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
    this.mergeConfigs();
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
