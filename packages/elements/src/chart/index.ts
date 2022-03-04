/* eslint @typescript-eslint/no-unsafe-call: 0 */
/* eslint @typescript-eslint/no-unsafe-member-access: 0 */

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
import 'chart.js/dist/Chart.bundle.min.js';

import {
  legendHelper,
  merge,
  MergeObject
} from './helpers/index.js';
import type {
  ChartJS,
  ChartConfig,
  ChartUpdateProps,
  ChartDataSetsColor,
  DatasetColors
} from './helpers/types';

import type { Header } from '../header';
import '../header/index.js';
import '../layout/index.js';

// Register plugins
import doughnutCenterPlugin from './plugins/doughnut-center-label.js';

declare global {
  interface Window {
    Chart: ChartJS;
  }
}

window.Chart.pluginService.register(doughnutCenterPlugin);

const CSS_COLOR_PREFIX = '--chart-color-';
const CHART_TYPE_OPAQUE = ['line', 'bubble', 'radar', 'polarArea'];
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const DEFAULT_CHART_CONFIG = window.Chart.defaults;
const ELF_CHART_CONFIG = {
  polarArea: {
    scale: {
      ticks: {
        showLabelBackdrop: false
      }
    }
  },
  radar: {
    scale: {
      ticks: {
        showLabelBackdrop: false
      }
    }
  }
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
window.Chart.helpers.merge(DEFAULT_CHART_CONFIG, ELF_CHART_CONFIG);

export type { ChartConfig, ChartUpdateProps };

/**
 * Charting component that use ChartJS library
 */
@customElement('ef-chart', {
  alias: 'sapphire-chart'
})
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
  private chart: ChartJS | null = null;

  /**
   * Chart configurations. Same configuration as ChartJS
   * @type {ChartConfig}
   */
  @property({ type: Object })
  public config: ChartConfig | null = null;

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
  protected get requiredConfig (): ChartConfig {
    return {
      options: {
        responsive: false, // use framework resize events instead
        maintainAspectRatio: false,
        title: {
          display: false
        }
      }
    };
  }

  /**
   * Safely returns the chart title
   * @returns chart title
   */
  protected get chartTitle (): string {
    const title = this.config?.options?.title?.text;

    if (title) {
      return typeof title === 'string' ? title : title.join();
    }

    return '';
  }

  /**
   * Safely returns a dataset array
   * @returns dataset array
   */
  protected get datasets (): Chart.ChartDataSets[] {
    return this.config?.data?.datasets || [];
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
   * Themable parts of the config.
   * This will be merged into the configuration object.
   * @returns {ChartConfig} chart config with theme
   */
  protected get themableConfig (): ChartConfig {
    const style = getComputedStyle(this);

    // TODO: Try and remove the need for global object modification.
    // It's easier to cover all areas by modifying the global object,
    // however, if possible, we should look to try and just modify local configs.

    // Set font globals
    window.Chart.defaults.global.defaultFontColor = style.getPropertyValue('color');
    window.Chart.defaults.global.defaultFontFamily = style.getPropertyValue('font-family');
    window.Chart.defaults.global.defaultFontSize = Number(style.getPropertyValue('font-size').replace('px', ''));
    window.Chart.defaults.global.defaultFontStyle = style.getPropertyValue('font-style');

    // Set grid line globals
    window.Chart.defaults.scale.gridLines.color = this.getComputedVariable('--grid-line-color', 'transparent');
    window.Chart.defaults.scale.gridLines.zeroLineColor = this.getComputedVariable('--zero-line-color', 'transparent');

    return {
      options: {
        animation: {
          duration: this.cssVarAsNumber('--animation-duration', '0')
        },
        elements: {
          line: {
            borderWidth: this.cssVarAsNumber('--line-width', '1'),
            tension: this.cssVarAsNumber('--line-tension', '0.5')
          }
        },
        tooltips: {
          backgroundColor: this.getComputedVariable('--tooltip-background-color', 'transparent'),
          titleFontColor: this.getComputedVariable('--tooltip-title-color', 'transparent'),
          bodyFontColor: this.getComputedVariable('--tooltip-body-color', 'transparent'),
          cornerRadius: this.cssVarAsNumber('--tooltip-border-radius', '0'),
          caretSize: this.cssVarAsNumber('--tooltip-caret-size', '0'),
          xPadding: this.cssVarAsNumber('--tooltip-padding-x', '--tooltip-padding', '0'),
          yPadding: this.cssVarAsNumber('--tooltip-padding-y', '--tooltip-padding', '0'),
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
   * Generates the legend labels on a given chart
   * @param {ChartJS} chart Chart.js instance
   * @returns {Chart.ChartLegendLabelItem[]} Array of label configurations
   */
  protected generateLegendLabels = (chart: ChartJS): Chart.ChartLegendLabelItem[] => {
    if (!this.config?.type) {
      return [];
    }

    const chartOption = DEFAULT_CHART_CONFIG[this.config.type] as Chart.ChartOptions;

    if (
      this.datasets.length
      && chartOption.legend
      && Array.isArray(this.datasets[0].backgroundColor)
    ) {

      let legends: Chart.ChartLegendLabelItem[] = [];
      if (chartOption.legend.labels?.generateLabels) {
        legends = chartOption.legend.labels?.generateLabels(chart);
      }

      // Customize for doughnut chart change border color to background color
      if (['pie', 'doughnut'].includes(this.config?.type) && this.datasets.length > 1) {
        legends.forEach((label: Chart.ChartLegendLabelItem)=> {
          label.strokeStyle = label.fillStyle;
        });
      }

      return legends;
    }

    return this.datasets.map((dataset, i): Chart.ChartLegendLabelItem => {
      const solidFill = !CHART_TYPE_OPAQUE.includes(dataset.type || this.config?.type as string);
      const usePointStyle = chart.options.legend?.labels?.usePointStyle || false;

      return {
        text: dataset.label,
        fillStyle: legendHelper.getLegendFillStyle(dataset, usePointStyle, solidFill),
        hidden: !chart.isDatasetVisible(i),
        lineCap: dataset.borderCapStyle,
        lineDash: dataset.borderDash,
        lineDashOffset: dataset.borderDashOffset,
        lineJoin: dataset.borderJoinStyle,
        lineWidth: Number(dataset.borderWidth) || 0,
        strokeStyle: legendHelper.getLegendStrokeStyle(dataset, usePointStyle),
        pointStyle: typeof dataset.pointStyle === 'string' ? dataset.pointStyle : undefined,

        // Below is extra data used for toggling the datasets
        datasetIndex: i
      };
    });
  };

  /**
   * Merges all the different layers of the config.
   * @returns {void}
   */
  protected mergeConfigs (): void {
    if (!this.config) {
      return;
    }

    merge(this.config as MergeObject, this.themableConfig as MergeObject);
    merge(this.config as MergeObject, this.requiredConfig as MergeObject, true);
  }

  /**
   * Themes the passed-in configuration object
   * @returns {void}
   */
  protected decorateConfig (): void {
    this.mergeConfigs();

    const extendColorsIfRequired = (currentColors: ChartDataSetsColor, infoColors: ChartDataSetsColor): void => {
      if (Array.isArray(currentColors) && Array.isArray(infoColors) && currentColors.length < infoColors.length) {
        merge(currentColors, infoColors);
      }
    };

    this.datasets.forEach((dataset) => {
      const info = this.datasetInfo(dataset);

      // make sure that colours are defined for every dataset e.g. when new dataset is added
      extendColorsIfRequired(dataset.borderColor, info.borderColor);
      extendColorsIfRequired(dataset.backgroundColor, info.backgroundColor);
      extendColorsIfRequired(dataset.pointBorderColor, info.pointBorderColor);
      extendColorsIfRequired(dataset.pointBackgroundColor, info.pointBackgroundColor);

      dataset.borderColor = dataset.borderColor || info.borderColor;
      dataset.backgroundColor = dataset.backgroundColor || info.backgroundColor;
      dataset.pointBackgroundColor = dataset.pointBackgroundColor || info.pointBackgroundColor;
      dataset.pointBorderColor = dataset.pointBorderColor || info.pointBorderColor;
    });
  }

  /**
   * Returns usable information about a dataset
   * @param {Chart.ChartDataSets} dataset Chart dataset
   * @returns {Chart.ChartDataSets} Information about the dataset
   */
  protected datasetInfo (dataset: Chart.ChartDataSets): Chart.ChartDataSets {
    const type = dataset.type || this.config?.type;
    let index = this.datasets.indexOf(dataset);
    const isColorArray = (!!type && ['pie', 'doughnut', 'polarArea'].includes(type)) || type === 'bar' && this.datasets.length === 1;
    const isSolidFill = !!type && !CHART_TYPE_OPAQUE.includes(type);

    // Doughnut chart using same color sequence for each data in datasets
    let borderColor = null;
    if (['pie', 'doughnut'].includes(type as string) && this.datasets.length > 1) {
      index = 0;
      borderColor = this.getComputedVariable('--multi-dataset-border-color', '#fff');
    }

    const colors = this.generateColors(isColorArray, isColorArray && dataset.data ? dataset.data.length : 1, index);

    return {
      type,
      borderColor: borderColor || colors.solid,
      backgroundColor: isSolidFill ? colors.solid : colors.opaque,
      pointBorderColor: colors.solid,
      pointBackgroundColor: colors.solid
    };
  }

  /**
   * Generates internal solid and opaque color set for a dataset
   * @param {boolean} isArray Flag to return result in array or not e.g. doughnut, pie, etc
   * @param {number} amount Amount of colors required
   * @param {number} shift Positional shift of the color start point
   * @returns {DatasetColors} Solid and opaque color values
   */
  protected generateColors (isArray: boolean, amount: number, shift: number): DatasetColors {
    let color;
    const solid = [];
    const opaque = [];
    const alpha = Number(this.getComputedVariable('--fill-opacity', '0.2'));

    amount = isArray ? amount : 1;

    for (let i = shift; i < amount + shift; i++) {
      color = this.colors[i % this.colors.length];
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

      // Are we reusing an old chart canvas?
      const isReusingCanvas = this.destroyChart();

      // Preparing the resources before create chart
      this.decorateConfig();
      this.manageTitle();

      // Create chart
      this.chart = new window.Chart(ctx, this.config) as ChartJS;

      if (isReusingCanvas) {
        // If we're reusing an old chart canvas, we need to resize it.
        // Destroying a chart has some strange side-effects on the canvas.
        this.chart.resize();
      }
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
   * @param {ChartUpdateProps} config Additional configuration object for the update process.
   * @returns {void}
   */
  private renderChart (config: ChartUpdateProps = { duration: this.cssVarAsNumber('--animation-duration', '0') }): void {
    if (!this.chart || !this.config) {
      return;
    }

    // Stop any chart.js animations
    this.chart.stop();

    // Decorate the config object
    this.decorateConfig();

    // Update internal layout
    this.manageTitle();

    // Update the chart
    this.chart.update(config);
  }

  /**
   * Update all data, title, scales, legends and re-render the chart based on its config
   * @param {ChartUpdateProps=} config Additional configuration for control an animation in the update process.
   * @returns {void}
   */
  public updateChart (config?: ChartUpdateProps): void {
    this.renderChart(config);
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
   * Handles resize event of the chart region
   * @returns {void}
   */
  protected onResize (): void {
    this.chart?.resize();
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
      <ef-layout flex container>
        <ef-header></ef-header>
        <ef-layout part="chart" @resize="${this.onResize}">
          <canvas id="canvas"></canvas>
        </ef-layout>
      </ef-layout>`;
  }
}
