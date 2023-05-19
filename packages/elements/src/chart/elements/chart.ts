import {
  BasicElement,
  html,
  css,
  nothing,
  PropertyValues,
  TemplateResult,
  CSSResultGroup
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { ref, createRef, Ref } from '@refinitiv-ui/core/directives/ref.js';
import { color as parseColor } from '@refinitiv-ui/utils/color.js';
import { VERSION } from '../../version.js';

import { Chart as ChartJS } from 'chart.js';
import type {
  ChartConfiguration,
  ChartDataset,
  ChartOptions,
  ChartType,
  Color,
  LegendItem,
  LineControllerDatasetOptions,
  Plugin,
  UpdateMode
} from 'chart.js';

import 'chartjs-adapter-date-fns';

import {
  merge,
  MergeObject,
  DatasetColors
} from '../helpers/index.js';

import '../../header/index.js';

const CSS_COLOR_PREFIX = '--chart-color-';

/* Make ChartJS to know our plugin
 * https://www.chartjs.org/docs/latest/developers/plugins.html#typescript-typings
 */
declare module 'chart.js' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface PluginOptionsByType<TType extends ChartType> {
    'ef-chart': object;
  }
}

/**
 * Charting component that uses ChartJS library
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
      [part=container] {
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
      [part=title] {
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
   * Chart.js object
   * @type {ChartJS | null}
   */
  public chart: ChartJS | null = null;

  /**
   * Chart configurations. Same configuration as ChartJS
   * @type {ChartConfiguration | null}
   */
  @property({ type: Object })
  public config: ChartConfiguration | null = null;

  /**
   * Canvas element used to render Chart
   */
  protected canvas: Ref<HTMLCanvasElement> = createRef();

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
   * @returns {string[]}List of available chart colors
   */
  public get colors (): string[] {
    const colors: string[] = [];

    for (let index = 1; ; index++) {
      const color = this.getComputedVariable(`${CSS_COLOR_PREFIX}${index}`);
      if (!color) {
        break;
      }
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
   * @param changedProperties Map of changed properties with old values
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
    if (this.canvas.value) {
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
   * Create plugin to set our theme into ChartJS lifecycle
   * @returns Created plugin
   */
  private createPlugin (): Plugin {
    return {
      id: 'ef-chart',
      beforeInit: (chart: ChartJS) => {
        const option: ChartOptions = this.themableChartOption;
        merge(chart.config.options as ChartOptions, option);
      },
      beforeUpdate: this.decorateColors
    };
  }

  /**
   * Themable parts of the config.
   * This will be merged into the configuration object.
   * @returns Chart option with theme
   */
  protected get themableChartOption (): ChartOptions {
    const boxWidth = this.cssVarAsNumber('--legend-key-box-width', '10') as number;
    let boxHeight = Number(getComputedStyle(this).getPropertyValue('font-size').replace('px', ''));
    if (this.config?.options?.plugins?.legend?.labels?.usePointStyle) {
      boxHeight = boxWidth;
    }

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
            boxWidth,
            boxHeight,
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
    if (this.config?.type === 'polarArea' || this.config?.type === 'radar') {
      ChartJS.defaults.scales.radialLinear.ticks.showLabelBackdrop = false;
    }
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
   * @returns The value as a number, or, undefined if NaN.
   */
  protected cssVarAsNumber (...args: string[]): number | undefined {
    const result = Number(this.getComputedVariable(...args).replace(/\D/g, ''));
    return isNaN(result) ? undefined : result;
  }

  /**
   * Inject theme color into each datasets
   * @param chart Chart.js instance
   * @returns {void}
   */
  protected decorateColors = (chart: ChartJS): void => {
    chart.config.data.datasets.forEach((dataset, datasetIndex) => {
      let colors;
      let borderColor;
      let backgroundColor;
      const isMultipleDatasets = (chart.config.data.datasets.length > 1);
      // From old requirement, Only line, radar, scatter, polarArea type are opaque backgroundColor
      switch (dataset.type ?? this.config?.type) {
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
            dataset.backgroundColor = colors.solid;
          }
          break;
      }
    });
  };

  /**
   * Generates the legend labels on a given chart
   * @param chart Chart.js instance
   * @returns Array of label configurations
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
        legends.forEach((label: LegendItem) => {
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
      switch (datasets[i].type ?? chartType) {
        case 'line':
        case 'radar':
        case 'bubble':
        case 'polarArea':
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

    let plugins: Plugin[] = [
      this.createPlugin()
    ];

    if (Array.isArray(this.config.plugins) && this.config.plugins.length > 0) {
      plugins = [
        ...plugins,
        ...this.config.plugins
      ];
    }

    merge(this.config as unknown as MergeObject,
      {
        plugins,
        options: this.requiredConfig
      } as MergeObject,
      true
    );
  }

  /**
   * Generates internal solid and opaque color set for a dataset
   * @param isArray Flag to return result in array or not e.g. doughnut, pie, etc
   * @param amount Amount of colors required
   * @param shift Positional shift of the color start point
   * @returns Solid and opaque color values
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
   * Creates a chart after config has changed,
   * or, the element has been connected to the DOM
   * @returns {void}
   */
  protected createChart (): void {
    const canvas = this.canvas.value;
    if (canvas && this.config) {
      this.destroyChart();
      this.mergeConfigs();

      this.chart = new ChartJS(canvas, this.config);
    }
  }

  /**
   * Destroys the chart.js object
   * @returns True if a chart object has been destroyed
   */
  protected destroyChart (): boolean {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
      return true;
    }
    return false;
  }

  /**
   * Update all data, title, scales, legends and re-render the chart based on its config
   * @param updateMode Additional configuration for control an animation in the update process.
   * @returns {void}
   */
  public updateChart (updateMode: UpdateMode): void {
    if (!this.chart || !this.config) {
      return;
    }

    this.chart.stop();
    this.mergeConfigs();
    this.requestUpdate();

    this.chart?.update(updateMode);
  }

  /**
   * Template for title
   * Rendered when `config.plugins.title.text` is set
   * @returns Header template from title of config
   */
  protected get titleTemplate (): TemplateResult | typeof nothing {
    return this.chartTitle ? html`<ef-header part="title">${this.chartTitle}</ef-header>` : nothing;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
      <div part="container">
        ${this.titleTemplate}
        <div part="chart">
          <canvas ${ref(this.canvas)}></canvas>
        </div>
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ef-chart': Chart;
  }
}
