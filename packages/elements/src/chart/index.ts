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

type DatasetColors = {
  solid: string | string[];
  opaque: string | string[];
};

import {
  legendHelper,
  ChartDatasetNew,
  merge,
  MergeObject
} from './helpers/index.js';

import {
  Chart as ChartJS,
  Plugin,
  ChartType,
  ChartDataset,
  Color
// TODO: import only common types and let user registers specific type
// eslint-disable-next-line import/extensions
} from 'chart.js/auto';

import type { ChartConfiguration, ChartOptions, UpdateMode, LegendItem } from 'chart.js';

import type { Header } from '../header';
import '../header/index.js';

// TODO: import only common types and let user registers specific type
export * from 'chart.js';

const CSS_COLOR_PREFIX = '--chart-color-';
const CHART_TYPE_OPAQUE = ['line', 'bubble', 'radar', 'polarArea'];

declare module 'chart.js' {
  interface PluginOptionsByType<TType extends ChartType> {
    efchart?: {
      enable: boolean
    }
  }
}

/**
 * Charting component that use ChartJS library
 */
@customElement('ef-chart')
export class Chart extends BasicElement {

  // TODO: remove any type
  private plugin (): Plugin {
    const cssStyle = getComputedStyle(this);
    // TODO: Try and remove the need for global object modification.
    // It's easier to cover all areas by modifying the global object,
    // however, if possible, we should look to try and just modify local configs.

    // Set font globals
    ChartJS.defaults.color = cssStyle.getPropertyValue('color');
    ChartJS.defaults.font.family = cssStyle.getPropertyValue('font-family');
    ChartJS.defaults.font.size = Number(cssStyle.getPropertyValue('font-size').replace('px', ''));
    ChartJS.defaults.font.style = cssStyle.getPropertyValue('font-style') as 'normal' | 'italic' | 'oblique' | 'initial' | 'inherit' | undefined;
    // Set global grid color
    ChartJS.defaults.scale.grid.color = (line) => {
      return line.index === 0 ? this.getComputedVariable('--zero-line-color', 'transparent') : this.getComputedVariable('--grid-line-color', 'transparent');
    };

    return {
      id: 'efchart',
      beforeInit: (chart: ChartJS) => {
        const datasets = chart.config.data.datasets;
        const option: ChartOptions = {
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
                generateLabels: (chart: ChartJS): LegendItem[] => {

                  if (!this.config?.type) {
                    return [];
                  }

                  return datasets.map((dataset, i): LegendItem => {
                    const solidFill = !CHART_TYPE_OPAQUE.includes(dataset.type || this.config?.type as string);
                    const usePointStyle = chart.options?.plugins?.legend?.labels?.usePointStyle || false;

                    return {
                      fontColor: cssStyle.getPropertyValue('color'),
                      text: dataset.label || '',
                      fillStyle: legendHelper.getLegendFillStyle(dataset as ChartDatasetNew, usePointStyle, solidFill),
                      hidden: !chart.isDatasetVisible(i),
                      lineWidth: Number(dataset.borderWidth) || 0,
                      strokeStyle: legendHelper.getLegendStrokeStyle(dataset as ChartDatasetNew, usePointStyle),

                      // Below is extra data used for toggling the datasets
                      datasetIndex: i
                    };
                  });
                }
              }
            }
          }
        };
        merge(chart.config.options as unknown as MergeObject, option, true);

        const extendColorsIfRequired = (currentColors: Color, infoColors: Color): void => {
          if (Array.isArray(currentColors) && Array.isArray(infoColors) && currentColors.length < infoColors.length) {
            merge(currentColors, infoColors);
          }
        };

        datasets.forEach((dataset) => {
          const info = this.datasetInfo(dataset);

          // make sure that colours are defined for every dataset e.g. when new dataset is added
          extendColorsIfRequired((dataset as ChartDatasetNew).borderColor, info.borderColor);
          extendColorsIfRequired((dataset as ChartDatasetNew).backgroundColor, info.backgroundColor);
          extendColorsIfRequired((dataset as ChartDatasetNew).pointBorderColor, info.pointBorderColor);
          extendColorsIfRequired((dataset as ChartDatasetNew).pointBackgroundColor, info.pointBackgroundColor);

          dataset.borderColor = dataset.borderColor || info.borderColor;
          dataset.backgroundColor = dataset.backgroundColor || info.backgroundColor;
          (dataset as ChartDatasetNew).pointBackgroundColor = (dataset as ChartDatasetNew).pointBackgroundColor || info.pointBackgroundColor;
          (dataset as ChartDatasetNew).pointBorderColor = (dataset as ChartDatasetNew).pointBorderColor || info.pointBorderColor;
        });
      }
    };
  }

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
        efchart: {
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
   * Safely returns a dataset array
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
   * Get as CSS variable and tries to convert it into a usable number
   * @returns {(number|undefined)} The value as a number, or, undefined if NaN.
   */
  protected cssVarAsNumber (...args: string[]): number | undefined {
    const result = Number(this.getComputedVariable(...args).replace(/\D+$/, ''));
    return isNaN(result) ? undefined : result;
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
    merge(this.config as unknown as MergeObject, { plugins: [this.plugin()], options: this.requiredConfig } as MergeObject, true);
  }

  /**
   * Themes the passed-in configuration object
   * @returns {void}
   */
  protected decorateConfig (): void {
    this.mergeConfigs();
  }

  /**
   * Returns usable information about a dataset
   * @param {ChartDataset} dataset Chart dataset
   * @returns {Chart.ChartDataSets} Information about the dataset
   */
  protected datasetInfo (dataset: ChartDataset): ChartDatasetNew {
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
      borderColor: borderColor || colors.solid as Color,
      backgroundColor: isSolidFill ? colors.solid as Color : colors.opaque as Color,
      pointBorderColor: colors.solid as Color,
      pointBackgroundColor: colors.solid as Color
    } as ChartDatasetNew;
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
