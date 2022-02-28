import {
  ResponsiveElement,
  html,
  css,
  TemplateResult,
  CSSResultGroup,
  PropertyValues,
  ElementSize,
  DeprecationNotice
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { query } from '@refinitiv-ui/core/decorators/query.js';
import { VERSION } from '../version.js';
import { color as parseColor, RGBColor, HSLColor } from '@refinitiv-ui/utils/color.js';
import {
  createChart as chart,
  IChartApi,
  BarData,
  MouseEventParams,
  ITimeScaleApi,
  SeriesOptions,
  LineData,
  HistogramData,
  ChartOptions,
  CandlestickSeriesOptions,
  LineSeriesOptions,
  BarSeriesOptions,
  AreaSeriesOptions,
  HistogramSeriesOptions,
  BarPrices
} from 'lightweight-charts';

import '../tooltip/index.js';

import type {
  InteractiveChartConfig,
  InteractiveChartSeries,
  Time,
  Theme,
  RowLegend,
  SeriesList,
  SeriesDataItem,
  SeriesStyleOptions,
  ColorToStringFunction
} from './helpers/types';

import { LegendStyle } from './helpers/types.js';
import { merge, MergeObject } from './helpers/merge.js';

export type {
  InteractiveChartConfig,
  InteractiveChartSeries,
  LegendStyle
};

const NOT_AVAILABLE_DATA = 'N/A';
const NO_DATA_POINT = '--';

/**
 * A charting component that allows you to create several use cases of financial chart.
 * By lightweight-charts library.
 * @slot legend - Slot to use for implementing custom legend.
 * @fires initialized - Dispatched when chart is initialized
 */
@customElement('ef-interactive-chart', {
  alias: 'sapphire-interactive-chart'
})
export class InteractiveChart extends ResponsiveElement {

  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  private static readonly CSS_COLOR_PREFIX = '--chart-color-';
  private static readonly DEFAULT_LINE_WIDTH = '2';
  private static readonly DEFAULT_FILL_OPACITY = '0.4';
  private static readonly LINE_STYLES = {
    SOLID: 0,
    DOTTED: 1,
    DASHED: 2,
    LARGE_DASHED: 3,
    SPARSE_DOTTED: 4
  };

  private _legendStyle?: LegendStyle;

  /**
   * Chart configurations for init chart
   * @type {InteractiveChartConfig}
  */
  @property({ type: Object })
  public config: InteractiveChartConfig | null = null;

  /**
   * Hide legend
   */
  @property({ type: Boolean, reflect: true, attribute: 'disabled-legend' })
  public disabledLegend = false;

  /**
   * Hide jump to latest data button
   */
  @property({ type: Boolean, reflect: true, attribute: 'disabled-jump-button' })
  public disabledJumpButton = false;

  /**
  * @deprecated `legendstyle` attribute is deprecated, use `legend-style` instead.
  * @ignore
  * Set legend style i.e. `horizontal`, `vertical`. Default is `vertical`.
  **/
  @property({ type: String, attribute: 'legendstyle' })
  public deprecatedLegendStyle: LegendStyle | undefined;

  /**
   * Set legend style i.e. `horizontal`, `vertical`.
   * @param {LegendStyle} value legend style value
   * @type {"vertical" | "horizontal"} type of legend style
   * @default vertical
   **/
  @property({ type: String, attribute: 'legend-style' })
  public set legendStyle (value: LegendStyle) {
    const oldValue = this.legendStyle;
    if (oldValue !== value) {
      this._legendStyle = value;
      this.requestUpdate('legend-style', oldValue);
    }
  }

  public get legendStyle (): LegendStyle {
    return this._legendStyle || this.deprecatedLegendStyle || LegendStyle.vertical;
  }

  /**
   * Deprecation noticed, used to display a warning message
   * when deprecated features are used.
  */
  private deprecationNotice = new DeprecationNotice('`legendstyle` attribute and property are deprecated. Use `legend-style` for attribute and `legendStyle` property instead.');

  /**
   * @ignore
   * Array of series instances in chart
   */
  public seriesList: SeriesList[] = [];

  private jumpButtonInitialized = false;
  private legendInitialized = false;
  private isCrosshairVisible = false;

  protected chart: IChartApi | null = null;
  protected rowLegend: RowLegend = null;
  private timeScale: ITimeScaleApi | null = null;

  private width = 0;
  private height = 0;
  private theme: Theme | null = null;
  private themeColors: string[] = [];

  private hasDataPoint = false;

  /**
   * @returns return config of property component
   */
  protected get internalConfig (): InteractiveChartConfig {
    // Check config is available
    return this.config === null ? { series: [] } : this.config;
  }

  /**
   * chart element use for create chart.
   */
  @query('[part=chart]', true)
  private chartContainer!: HTMLElement;

  /**
   * legend element use for manage legend text inside.
   */
  @query('[part=legend]', true)
  private legendContainer!: HTMLElement;

  /**
   * jump button element use for manage scroll event.
   */
  @query('[part=jump-button-container]', true)
  private jumpButtonContainer!: HTMLElement;

  /**
   * branding element use for show trading view license
   * https://github.com/tradingview/lightweight-charts#license
   */
  @query('[part=branding-container]', true)
  private brandingContainer!: HTMLElement;

  /**
   * On Updated Lifecycle
   * @param changedProperties changed properties
   * @returns {void}
   */
  protected updated (changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (changedProperties.has('config')) {
      if (this.width && this.height && this.config) {
        this.createChart(this.width, this.height, this.config);
      }
    }

    if (changedProperties.has('disabledLegend')) {
      this.onLegendChange(this.disabledLegend);
    }

    if (changedProperties.has('disabledJumpButton')) {
      this.onJumpButtonChange(this.disabledJumpButton);
    }

    if (changedProperties.has('deprecatedLegendStyle') || changedProperties.has('legend-style')) {
      if (changedProperties.has('deprecatedLegendStyle')) {
        this.deprecationNotice.show();
      }
      const oldLegendStyle = (changedProperties.get('legend-style') || changedProperties.get('deprecatedLegendStyle')) as LegendStyle;
      this.onLegendStyleChange(this.legendStyle, oldLegendStyle);
    }
  }

  /**
   * Change chart size or re-create chart
   * when window size changed
   * @ignore
   * @param size new size
   * @returns {void}
   */
  public resizedCallback (size: ElementSize): void {
    super.resizedCallback(size);
    this.width = size.width;
    this.height = size.height;
    if (this.chart) {
      this.applyChartOptionSize(this.width, this.height);
    }
    else {
      this.createChart(this.width, this.height, this.config);
    }
  }

  /**
  * Legend value observer
  * @param value Legend value
  * @returns {void}
  */
  private onLegendChange (value: boolean): void {
    if (!value) {
      this.createLegend();
    }
    else {
      this.removeLegend();
    }
  }

  /**
   * Legend style observer
   * @param value Legend style value
   * @param previousValue Previous legend style value
   * @returns {void}
   */
  private onLegendStyleChange (value: string | undefined, previousValue: string): void {
    if (value === 'horizontal') {
      if (previousValue) {
        this.legendContainer.classList.remove(previousValue);
      }
      this.legendContainer.classList.add(value);
    }
    else {
      this.legendContainer.classList.remove(previousValue);
    }
  }

  /**
  * Jump last value observer
  * @param value jump last value
  * @returns {void}
  */
  private onJumpButtonChange (value: boolean): void {
    if (!value) {
      this.createJumpButton(this.width, this.height);
    }
    else {
      this.removeJumpButton();
    }
  }

  /**
   * update width and height of chart
   * @param width width of element
   * @param height height of element
   * @returns {void}
   */
  private applyChartOptionSize (width: number, height: number): void {
    if (this.chart) {
      // Resize chart after rendered.
      this.chart.applyOptions({
        width: width,
        height: height
      });
      // Render jump last button
      if (!this.disabledJumpButton) {
        this.createJumpButton(width, height);
      }
    }
  }

  /**
   * Create chart from user config
   * @param width Width component size
   * @param height Height component size
   * @param config data config
   * @returns {void}
   */
  private createChart (width: number, height: number, config: InteractiveChartConfig | null): void {
    this.destroyChart();
    if (config && width && height) {

      // init css variables
      this.themeColors = this.colors();
      this.theme = {
        backgroundColor: this.getComputedVariable('--background-color'),
        textColor: this.getComputedVariable('--text-color'),
        scalePriceBorderColor: this.getComputedVariable('--scale-price-border-color'),
        scaleTimesBorderColor: this.getComputedVariable('--scale-times-border-color'),
        gridVertLineColor: this.getComputedVariable('--grid-vert-line-color'),
        gridHorzLineColor: this.getComputedVariable('--grid-horz-line-color'),
        crossHairColor: this.getComputedVariable('--cross-hair-color'),
        chartUpColor: this.getComputedVariable('--chart-up-color'),
        chartDownColor: this.getComputedVariable('--chart-down-color'),
        fillOpacity: this.cssVarAsNumber('--fill-opacity', InteractiveChart.DEFAULT_FILL_OPACITY),
        lineWidth: this.cssVarAsNumber('--line-width', InteractiveChart.DEFAULT_LINE_WIDTH)
      };

      this.chart = chart(this.chartContainer);
      this.mergeConfig(config);
      this.applyChartOptionSize(width, height);

      if (!this.disabledLegend) {
        this.createLegend();
      }

      if (this.legendStyle === 'horizontal') {
        this.legendContainer.classList.add(this.legendStyle);
      }

      this.chart.timeScale().fitContent();

      /*
       * Fired when chart initialized
       */
      this.dispatchEvent(new CustomEvent('initialized'));
    }
  }

  /**
   * Destroy chart
   * @returns {void}
   */
  private destroyChart (): void {
    if (this.chart) {
      this.removeLegend();
      this.removeJumpButton();
      this.destroySeries();
      this.chartContainer.textContent = '';
    }
  }

  /**
   * Remove jump button
   * @returns {void}
   */
  private removeJumpButton (): void {
    if (this.chart) {
      this.jumpButtonContainer.style.display = 'none';
      this.chart.timeScale().unsubscribeVisibleTimeRangeChange(this.handleTimeRangeChange);
      this.jumpButtonContainer.removeEventListener('tap', this.handleScrollToRealTime);
      this.jumpButtonInitialized = false;
    }
  }

  /**
   * Remove legend element
   * @returns {void}
   */
  protected removeLegend (): void {
    if (this.chart) {
      this.legendContainer.textContent = '';
      this.chart.unsubscribeCrosshairMove(this.handleCrosshairMoved);
      this.legendInitialized = false;
    }
  }

  /**
   * Customize config and create chart by theme
   * @param config data configuration for create chart
   * @returns {void}
   */
  protected mergeConfig (config: InteractiveChartConfig): void {
    if (config && config.hasOwnProperty('series')) {
      this.createSeriesOptions();
      this.createSeries();
    }
    this.applyTheme(config);
    this.applyLegendTextColor();
    this.applyStylesBranding();
    this.applyStyleLegend();
  }

  /**
   * Create series
   * @returns {void}
   */
  protected createSeries (): void {
    // Loop for add multiple series
    for (let index = 0; index < this.internalConfig.series.length; index++) {
      const config = this.internalConfig.series[index];
      const series = this.addSeriesConfig(config) as SeriesList;
      this.seriesList.push(series);
    }
  }

  /**
   * Destroy Series
   * @returns {void}
   */
  private destroySeries (): void {
    if (this.chart && this.seriesList && this.seriesList.length > 0) {
      for (let i = 0; i < this.seriesList.length; i++) {
        this.chart.removeSeries(this.seriesList[i]);
      }
      this.seriesList = [];
    }
  }

  /**
   * Add series to chart from config
   * @param config data configuration for add series
   * @returns series data
   */
  protected addSeriesConfig (config: InteractiveChartSeries): SeriesList | null {
    let series: SeriesList | null = null;
    if (this.chart) {
      const { type, data, seriesOptions } = config;
      // Create instance series
      if (type === 'line') {
        series = this.chart.addLineSeries(seriesOptions);
      }
      else if (type === 'area') {
        series = this.chart.addAreaSeries(seriesOptions);
      }
      else if (type === 'bar') {
        series = this.chart.addBarSeries(seriesOptions);
      }
      else if (type === 'candlestick') {
        series = this.chart.addCandlestickSeries(seriesOptions);
      }
      else if (type === 'volume') {
        series = this.chart.addHistogramSeries(seriesOptions);
      }

      if (data && series) {
        series.setData(data as LineData[] & BarData[] & HistogramData[]);
      }
    }
    return series;
  }

  /**
   * Set opacity of color
   * @param color color value
   * @param opacity opacity value
   * @returns color parse
   */
  private setOpacity = (color: string, opacity?: string | number): RGBColor | HSLColor | null => {
    const colorParse = parseColor(color);
    if (colorParse && opacity !== null) {
      colorParse.opacity = Number(opacity);
    }
    return colorParse;
  };

  /**
   * Convert color to string
   * @param fn function for parse color
   * @param param value color
   * @returns color parse
   */
  private convertColorToString (fn: ColorToStringFunction, param: string, ...args: (string|number|undefined)[]): string | Record<string, unknown> {
    let color = null;
    if (param) {
      color = fn(param, ...args);
      if (color) {
        color = color.toString();
      }
    }
    else {
      color = {};
    }
    return color || {};
  }

  /**
  * Create data configuration from theme
  * @returns {void}
  */
  private createSeriesOptions (): void {
    if (this.theme) {
      let colorIndex = 0;

      for (let index = 0; index < this.internalConfig.series.length; index++) {

        // Get seriesOptions and type
        const seriesOptions = this.internalConfig.series[index].seriesOptions as SeriesOptions<SeriesStyleOptions> || {};
        const type = this.internalConfig.series[index].type;

        let seriesThemeOptions = {};
        const colorCycle = this.convertColorToString(parseColor, this.themeColors[colorIndex]);

        if (type === 'line') {
          seriesThemeOptions = {
            lineWidth: this.theme.lineWidth,
            color: colorCycle
          };
          // Update color index
          if (!seriesOptions.color) {
            colorIndex++;
          }
        }
        else if (type === 'area') {
          seriesThemeOptions = {
            lineWidth: this.theme.lineWidth,
            lineColor: this.convertColorToString(parseColor, this.themeColors[colorIndex]),
            topColor: this.convertColorToString(this.setOpacity, this.themeColors[colorIndex], this.theme.fillOpacity),
            bottomColor: this.convertColorToString(this.setOpacity, this.themeColors[colorIndex], '0')
          };
          // Update color index
          if (!seriesOptions.lineColor || !seriesOptions.topColor || !seriesOptions.bottomColor) {
            colorIndex++;
          }
        }
        else if (type === 'bar') {
          seriesThemeOptions = {
            upColor: colorCycle,
            downColor: colorCycle
          };
          // Update color index
          if (!seriesOptions.upColor || !seriesOptions.downColor) {
            colorIndex++;
          }
        }
        else if (type === 'candlestick') {
          seriesThemeOptions = {
            upColor: this.theme.chartUpColor,
            downColor: this.theme.chartDownColor,
            borderUpColor: this.theme.chartUpColor,
            borderDownColor: this.theme.chartDownColor,
            wickUpColor: this.theme.chartUpColor,
            wickDownColor: this.theme.chartDownColor
          };

          // Update color index
          if (!seriesOptions.upColor
            || !seriesOptions.downColor
            || !seriesOptions.borderUpColor
            || !seriesOptions.borderDownColor
            || !seriesOptions.wickUpColor
            || !seriesOptions.wickDownColor
          ) {
            colorIndex++;
          }

        }
        else if (type === 'volume') {

          seriesThemeOptions = {
            color: colorCycle
          };
          // Update color index
          if (!seriesOptions.color) {
            colorIndex++;
          }
        }
        // Update config seriesOptions not have seriesOptions
        if (!this.internalConfig.series[index].seriesOptions) {
          this.internalConfig.series[index].seriesOptions = seriesThemeOptions as SeriesOptions<SeriesStyleOptions>;
        }
        else {
          merge(seriesOptions as unknown as MergeObject, seriesThemeOptions);
        }
      }
    }
  }

  /**
  * Apply Theme to chart
  * @param config value config
  * @returns {void}
  */
  private applyTheme (config: InteractiveChartConfig): void {
    if (this.chart && this.theme) {
      const style = getComputedStyle(this);
      const defaultFontFamily = style.getPropertyValue('font-family');

      // Create object has a property object before comparing config the theme
      const chartOptions = config.options || {};

      // Create object same as the theme
      const chartThemeOptions = {
        layout: {
          backgroundColor: this.theme.backgroundColor,
          textColor: this.theme.textColor,
          fontFamily: defaultFontFamily
        },
        priceScale: {
          borderColor: this.theme.scalePriceBorderColor
        },
        timeScale: {
          borderColor: this.theme.scaleTimesBorderColor,
          rightOffset: 1
        },
        grid: {
          vertLines: {
            color: this.theme.gridVertLineColor,
            style: InteractiveChart.LINE_STYLES.SOLID
          },
          horzLines: {
            color: this.theme.gridHorzLineColor,
            style: InteractiveChart.LINE_STYLES.SOLID
          }
        },
        crosshair: {
          vertLine: {
            color: this.theme.crossHairColor
          },
          horzLine: {
            color: this.theme.crossHairColor
          }
        }
      };

      merge(chartOptions, chartThemeOptions);

      if (!config.options) {
        this.chart.applyOptions(chartThemeOptions);
      }
      else {
        // Apply config when has option for custom
        this.applyLegendTextColor();
        this.chart.applyOptions(config.options);
      }
    }
  }

  /**
   * Apply text color legend from chart options
   * @returns {void}
   */
  private applyLegendTextColor (): void {
    if (this.chart) {
      const options = this.chart.options();
      if (options && options.hasOwnProperty('layout') && options.layout.hasOwnProperty('textColor')) {
        this.legendContainer.style.color = options.layout.textColor;
      }
    }
  }

  /**
   * Get position config for set position legend
   * @returns {void}
   */
  private applyStyleLegend (): void {
    if (this.chart) {
      // Get position config for set position legend
      const position = this.getPriceScalePosition();
      if (position === 'left' || position === 'two-price') {
        this.legendContainer.className = 'yaxis-left';
      }
      else {
        this.legendContainer.className = 'yaxis-right';
      }
    }
  }

  /**
   * Get position config for set position logo trading view on chart
   * @returns {void}
   */
  private applyStylesBranding (): void {
    if (this.chart) {
      const position = this.getPriceScalePosition();
      this.brandingContainer.className = position === 'two-price' ? 'right' : position;
    }
  }

  /**
   * Get price scale position
   * @return position
   */
  private getPriceScalePosition (): string {
    const priceScale = this.chart?.options() as ChartOptions;
    if (priceScale.leftPriceScale.visible && priceScale.rightPriceScale.visible) {
      return 'two-price';
    }
    else if (priceScale.leftPriceScale.visible) {
      return 'left';
    }
    else if (priceScale.rightPriceScale.visible) {
      return 'right';
    }
    else {
      return 'none';
    }
  }

  /**
   * Handle MouseEventHandler
   * on event subscribeCrosshairMove
   * for create row legend
   * @param param MouseEventParams
   * @returns {void} return undefined has out of boundary chart
   */
  /* istanbul ignore next */
  private handleCrosshairMoved = (param: MouseEventParams): void => {
    if (!param) {
      return;
    }
    this.createRowLegend(this.rowLegend, param);
  };

  /**
   * Create legend element
   * @returns {void}
   */
  protected createLegend (): void {
    if (this.chart && !this.legendInitialized && this.internalConfig.hasOwnProperty('series')) {
      this.createRowLegend();
      if (this.shadowRoot) {
        this.rowLegend = this.shadowRoot.querySelectorAll('.row');
      }
      this.chart.subscribeCrosshairMove(this.handleCrosshairMoved);
      this.legendInitialized = true;
    }
  }

  /**
   * Create legend element or update value in legend element
   * @param rowLegend Legend element
   * @param eventMove Event mouse move on chart
   * @return {void}
   */
  private createRowLegend (rowLegend?: RowLegend, eventMove?: MouseEventParams): void {
    let rowLegendElem: HTMLElement;
    for (let idx = 0; idx < this.internalConfig.series.length; idx++) {
      const chartType = this.internalConfig.series[idx].type;
      const dataSet = this.internalConfig.series[idx].data || [];
      const symbol = (this.internalConfig.series[idx].symbolName || this.internalConfig.series[idx].symbol) || '';
      // Create row legend element
      if (!rowLegend) {
        rowLegendElem = document.createElement('div');
        rowLegendElem.setAttribute('class', 'row');
        this.createTextSymbol(rowLegendElem, symbol);

        if (dataSet.length) {
          this.hasDataPoint = true;
          const lastData = dataSet[dataSet.length - 1];
          const priceColor = this.getColorInSeries(lastData, chartType, idx);
          const lastDataValue = chartType === 'bar' || chartType === 'candlestick' ? lastData : (lastData as LineData).value;

          this.renderTextLegend(chartType, rowLegendElem, lastDataValue, priceColor, idx);
        }
        else {
          const span = document.createElement('span');
          span.className = 'price';
          span.textContent = NOT_AVAILABLE_DATA;
          rowLegendElem.appendChild(span);
        }

        this.legendContainer.appendChild(rowLegendElem);
      }
      /* Update value legend element on subscribeCrosshairMove.
       * Don't need to be updated if chart has no data.
       */
      /* istanbul ignore next */
      else if (rowLegend && dataSet.length) {
        let value;
        let priceColor = '';
        // When have price on event moved on the crosshair
        if (eventMove?.seriesPrices.get(this.seriesList[idx]) && eventMove.time) {
          value = eventMove.seriesPrices.get(this.seriesList[idx]);
          priceColor = this.getColorInSeries(eventMove, chartType, idx);
          this.isCrosshairVisible = true;
          this.hasDataPoint = true;
        }
        // when there's no data point in the series object.
        else if (!eventMove?.seriesPrices.get(this.seriesList[idx]) && eventMove?.time) {
          value = NO_DATA_POINT;
          this.isCrosshairVisible = true;
          this.hasDataPoint = false;
        }
        // Get latest value when mouse move out of scope
        else {
          const latestData = dataSet[dataSet.length - 1];
          if (latestData) {
            priceColor = this.getColorInSeries(latestData, chartType, idx);
            value = chartType === 'bar' || chartType === 'candlestick' ? latestData : (latestData as LineData).value;
            this.isCrosshairVisible = false;
            this.hasDataPoint = true;

          }
        }
        // Render legend by series type
        this.renderTextLegend(chartType, rowLegend, value as (number | string), priceColor, idx);
      }
    }
  }

  /**
   * Render text legend in row legend
   * @param chartType chart type of series
   * @param rowLegendElem row legend div element
   * @param value value of series
   * @param priceColor price color of series
   * @param index index of series
   * @returns {void}
   */
  protected renderTextLegend (chartType: string, rowLegendElem: RowLegend, value: SeriesDataItem | number | string, priceColor: string, index: number): void {
    if (chartType === 'bar' || chartType === 'candlestick') {
      if (!this.hasDataPoint && this.isNodeListElement(rowLegendElem)) {
        const spanElem = rowLegendElem[index].querySelectorAll('span.price,span.ohlc');
        spanElem.forEach(span => rowLegendElem[index].removeChild(span));
        const span = document.createElement('span');
        span.className = 'price';
        span.textContent = value as string;
        rowLegendElem[index].appendChild(span);
      }
      else {
        this.createTextOHLC(rowLegendElem, value as BarData, priceColor, index);
      }
    }
    else {
      this.createTextPrice(rowLegendElem, value as (number | string), priceColor, index);
    }
  }

  /**
  * Check `node` inside row legend and case type to HTMLElement
  * @param rowLegend Legend element
  * @returns true if not have `node` inside row legend
  */
  private isHTMLElement (rowLegend: RowLegend): rowLegend is HTMLElement {
    return (rowLegend as NodeListOf<Element>).length === undefined;
  }

  /**
  * Check `node` inside row legend and case type to NodeListOf<Element>
  * @param rowLegend Legend element
  * @returns true if have `node` inside row legend
  */
  private isNodeListElement (rowLegend: RowLegend): rowLegend is NodeListOf<Element> {
    return (rowLegend as NodeListOf<Element>) !== undefined;
  }

  /**
   * Create span OHLC in row legend used by several series types such as bars or candlesticks
   * @param rowLegend Legend element
   * @param rowData Value of series
   * @param priceColor Color of series
   * @returns {void}
   */
  private createSpanOHLC (rowLegend: RowLegend, rowData: BarData, priceColor: string): void {
    if (this.isHTMLElement(rowLegend)) {
      rowLegend.setAttribute('data-color', priceColor);
      this.createSpan(rowLegend, 'O', rowData.open, 'H', rowData.high, 'L', rowData.low, 'C', rowData.close);
    }
  }

  /**
  * Create text used by several series types such as bars or candlesticks
  * @param rowLegend Legend element
  * @param rowData Value of series
  * @param priceColor color of series
  * @param index Series index
  * @returns {void}
  */
  private createTextOHLC (rowLegend: RowLegend, rowData: BarData, priceColor: string, index: number): void {
    // Uses price formatter if provided
    const formatter = this.internalConfig.series[index].hasOwnProperty('legendPriceFormatter') ? this.internalConfig.series[index].legendPriceFormatter : null;
    if (formatter) {
      rowData = {
        open: formatter(rowData.open) as number,
        high: formatter(rowData.high) as number,
        low: formatter(rowData.low) as number,
        close: formatter(rowData.close) as number
      } as BarData;
    }
    // Create text price after chart has rendered
    if (this.isHTMLElement(rowLegend)) {
      this.createSpanOHLC(rowLegend, rowData, priceColor);
    }
    // Handle update text price when mouse crosshairMove in chart
    else if (this.isNodeListElement(rowLegend)) {
      const rowSpanLength = rowLegend[index].children.length;
      let countElmPrice = 0;
      for (let spanIndex = 0; spanIndex < rowSpanLength; spanIndex++) {
        const spanElem = rowLegend[index].children[spanIndex] as HTMLElement;

        /**
         * Create a new span OHLC after displaying (--) or (N/A)
         */
        if (spanElem.textContent === NOT_AVAILABLE_DATA || spanElem.textContent === NO_DATA_POINT) {
          rowLegend[index].removeChild(spanElem);
          this.createSpanOHLC(rowLegend[index] as HTMLElement, rowData, priceColor);
        }
        else if (spanElem.getAttribute('class') === 'price') {
          // Set price color
          spanElem.style.color = priceColor;
          // Set value OHLC BY price
          if (countElmPrice === 0) {
            spanElem.textContent = `${rowData.open}`;
          }
          else if (countElmPrice === 1) {
            spanElem.textContent = `${rowData.high}`;
          }
          else if (countElmPrice === 2) {
            spanElem.textContent = `${rowData.low}`;
          }
          else if (countElmPrice === 3) {
            spanElem.textContent = `${rowData.close}`;
          }
          // Update next span by price
          countElmPrice++;
        }
      }
    }
  }

  /**
   * Create text price used by several series types
   * @param rowLegend Legend element
   * @param price Value of series
   * @param priceColor color of series
   * @param index Series index
   * @returns {void}
   */
  private createTextPrice (rowLegend: RowLegend, price: number | string, priceColor: string, index: number): void {
    const formatter = this.internalConfig.series[index].legendPriceFormatter;
    // Formats legend only when formatter and data point are provided
    const formattedPrice = !!formatter && price !== NO_DATA_POINT ? formatter(price) : price;

    // Create text price after chart has rendered
    if (this.isHTMLElement(rowLegend)) {
      rowLegend.setAttribute('data-color', priceColor);
      this.createSpan(rowLegend, formattedPrice);
    }
    // Handle update text price when mouse crosshairMove in chart
    else if (this.isNodeListElement(rowLegend)) {
      const symbolElem = rowLegend[index].children[0];
      const spanIndex = symbolElem.getAttribute('class')?.indexOf('symbol') === 0 ? 1 : 0;
      const rowLegendElem = rowLegend[index];
      rowLegendElem.children[spanIndex].textContent = `${formattedPrice}`;
      (rowLegendElem.children[spanIndex] as HTMLElement).style.color = `${priceColor}`;
    }
  }

  /**
   * Create span in legend element by several series types
   * @param rowLegend Legend element
   * @param args text value
   * @returns {void}
   */
  private createSpan (rowLegend: RowLegend, ...args: (string | number)[]): void {
    const div = rowLegend as HTMLElement; // rowLegend
    const arg = args;
    const len = args.length;
    const color = div.getAttribute('data-color') as string;
    for (let idx = 0; idx < len; idx++) {
      const span = document.createElement('span');
      const textContent = `${arg[idx]}`;
      span.textContent = textContent;
      // Set class by Text O H L C
      if (['O', 'H', 'L', 'C'].includes(textContent)) {
        span.setAttribute('class', 'ohlc');
      }
      else {
        span.setAttribute('class', 'price');
        span.style.color = color;
      }
      div.appendChild(span);
    }
  }

  /**
   * Create span in legend element by several series types
   * @param rowLegend Legend element
   * @param symbol Value naming for show
   * @returns {void}
   */
  private createTextSymbol (rowLegend: HTMLElement, symbol: string): void {
    if (rowLegend.children && symbol) {
      const symbolElem = document.createElement('span');
      symbolElem.setAttribute('class', 'symbol');
      symbolElem.textContent = symbol + ' : ';
      rowLegend.appendChild(symbolElem);
    }
  }

  /**
   * Get legend price color
   * @param color color code
   * @returns rgba or hex color
   */
  private getLegendPriceColor (color: string): string {
    // check color is does not blend with the background
    if (color === 'rgba(0,0,0,0)' || color === 'transparent') {
      return this.getComputedVariable('--text-color');
    }
    return color;
  }

  /**
   * Get Color in series
   * @param seriesData series data or event mouse move on chart
   * @param chartType type of chart
   * @param index index of list series
   * @returns color value
   */
  protected getColorInSeries (seriesData: SeriesDataItem | MouseEventParams, chartType: string, index: number): string {
    if (chartType === 'line') {
      return this.getLegendPriceColor((this.seriesList[index].options() as LineSeriesOptions).color);
    }
    else if (chartType === 'candlestick') {
      const value = seriesData.hasOwnProperty('seriesPrices') ? (seriesData as MouseEventParams)?.seriesPrices.get(this.seriesList[index]) as BarPrices : seriesData as BarData;
      const barStyle = this.seriesList[index].options() as CandlestickSeriesOptions;
      const colorBar = value.close > value.open ? barStyle.borderUpColor : barStyle.borderDownColor;
      return colorBar;
    }
    else if (chartType === 'bar') {
      return this.getLegendPriceColor((this.seriesList[index].options() as BarSeriesOptions).upColor);
    }
    else if (chartType === 'area') {
      return this.getLegendPriceColor((this.seriesList[index].options() as AreaSeriesOptions).lineColor);
    }
    else if (chartType === 'volume') {
      const priceValue = seriesData.hasOwnProperty('seriesPrices') ? (seriesData as MouseEventParams).seriesPrices.get(this.seriesList[index]) as BarPrices : (seriesData as HistogramData).value;

      let dataItem = {};
      this.internalConfig.series[index].data.forEach((dataConfig: BarData | HistogramData) => {
        const data = dataConfig as HistogramData;
        const time = data.time as Time;
        const timeSeriesData = seriesData.time as Time;
        //  if via time point data string format 'yyyy-mm-dd' or object '{ year: 2019, month: 6, day: 1 }'
        if (time.hasOwnProperty('day') && time.hasOwnProperty('month') && time.hasOwnProperty('year')) {
          if (time.day === timeSeriesData.day
            && time.month === timeSeriesData.month
            && time.year === timeSeriesData.year
            && data.value === priceValue) {
            dataItem = dataConfig;
          }
        }
        // if via config time uses a UNIX Timestamp format for time point data.
        else if (time === seriesData.time) {
          dataItem = data;
        }
      });

      // check when each color is added, the item comes from the configuration
      if (dataItem.hasOwnProperty('color')) {
        const data = dataItem as HistogramData;
        return this.getLegendPriceColor(data.color as string);
      }
      else {
        return this.getLegendPriceColor((this.seriesList[index].options() as HistogramSeriesOptions).color);
      }
    }
    return '';
  }

  /**
   * Create button that will make window scroll to the last data
   * in the chart when clicked
   * @param width Width component size
   * @param height Hight component size
   * @returns {void}
   */
  private createJumpButton (width: number, height: number): void {
    if (this.chart && this.jumpButtonContainer) {

      this.timeScale = this.chart.timeScale();

      // Get position config for set position jump last button
      const position = this.getPriceScalePosition();
      const pricePosition = position === 'left' ? 30 : 0;

      const buttonTop = `${height - 70}px`;
      const buttonLeft = `${(width + pricePosition) - 100}px`;

      this.jumpButtonContainer.style.top = buttonTop;
      this.jumpButtonContainer.style.left = buttonLeft;

      // Create subscribeVisibleTimeRangeChange
      if (!this.jumpButtonInitialized) {
        this.chart.timeScale().subscribeVisibleTimeRangeChange(this.handleTimeRangeChange);
        this.jumpButtonContainer.addEventListener('tap', this.handleScrollToRealTime);
        this.jumpButtonInitialized = true;
      }
    }
  }

  /**
   *  Handle TimeRangeChangeEventHandler
   *  on event subscribeVisibleTimeRangeChange
   *  for create jump last button
   *  @returns {void}
   */
  private handleTimeRangeChange = (): void => {
    let buttonVisible = false;
    if (this.timeScale) {
      buttonVisible = this.timeScale.scrollPosition() < 0;
    }
    this.jumpButtonContainer.style.display = buttonVisible ? 'block' : 'none';
    // when update data in series then should always show last value
    if (this.internalConfig.series.length === this.seriesList.length) {
      // update legend only when chart already created
      this.updateLegendWithLatestData();
    }
  };

  /**
   *  Update Legend with latest data on update data in series
   *  @returns {void}
   */
  private updateLegendWithLatestData (): void {
    if (this.rowLegend && !this.isCrosshairVisible && this.config?.hasOwnProperty('series')) {
      for (let idx = 0; idx < this.internalConfig.series.length; idx++) {
        const chartType = this.internalConfig.series[idx].type;
        const series = this.internalConfig.series[idx];
        const dataSet = series.data || [];
        const latestData = dataSet[dataSet.length - 1];
        if (latestData) {

          const value = chartType === 'bar' || chartType === 'candlestick' ? latestData : (latestData as LineData).value; // latestData
          const priceColor = this.getColorInSeries(latestData, chartType, idx);

          // Render legend by series type
          this.renderTextLegend(chartType, this.rowLegend, value, priceColor, idx);
        }
      }
    }
  }

  /**
   *  Handle event clicked scroll to realtime
   *  @returns {void}
   */
  private handleScrollToRealTime = (): void => {
    if (this.timeScale !== null) {
      this.timeScale.scrollToRealTime();
    }
  };

  /**
   * Get as CSS variable and tries to convert it into a usable number
   * @param args param css variable
   * @returns The value as a number, or, undefined if NaN.
   */
  private cssVarAsNumber (...args: string[]): number | undefined {
    args[args.length] = '';
    const cssComputeVar = this.getComputedVariable(...args);
    const result = parseFloat(cssComputeVar.replace(/\D+$/, ''));
    return cssComputeVar && !isNaN(result) ? result : undefined;
  }

  /**
   * List of available chart colors from the theme.
   * @returns list of available chart colors from the theme.
   */
  public colors (): string[] {
    let color;
    let index = 0;
    const colors: string[] = [];
    while ((color = this.getComputedVariable(`${InteractiveChart.CSS_COLOR_PREFIX}${(index += 1)}`))) {
      const parseColorCode = parseColor(color);
      if (parseColorCode !== null) {
        colors.push(parseColorCode.toString());
      }
    }
    return colors;
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
        position: relative;
        height: 300px;
        z-index: 0;
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
      <slot name="legend">
        <div part="legend"></div>
      </slot>
      <div part="jump-button-container">
        <div part="jump-button"></div>
      </div>
      <div part="branding-container" title="" tooltip="Powered by Trading View">
        <svg width="33" height="19" viewBox="0 0 611 314"  part="branding">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M341 124C375.242 124 403 96.2417 403 62C403 27.7583 375.242 0 341 0C306.758 0 279 27.7583 279 62C279 96.2417 306.758 124 341 124ZM481 314H337L467 4H611L481 314ZM124 4H248V128V314H124V128H0V4H124Z"/>
        </svg>
      </div>
      <div part="chart"></div>
    `;
  }
}
