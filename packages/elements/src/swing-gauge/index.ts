import {
  ResponsiveElement,
  css,
  CSSResultGroup,
  PropertyValues,
  TemplateResult,
  html,
  StyleMap,
  WarningNotice
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { query } from '@refinitiv-ui/core/decorators/query.js';
import { state } from '@refinitiv-ui/core/decorators/state.js';
import { styleMap } from '@refinitiv-ui/core/directives/style-map.js';
import { VERSION } from '../version.js';
import type { Canvas } from '../canvas';
import '../canvas/index.js';
import '../label/index.js';

import { helpers as canvasHelper } from './helpers.js';
import type { SwingGaugeData, SwingGaugeCanvasSize, SwingGaugeValueFormatter } from './types';
import { DefaultStyle, Segment, TextType } from './const.js';

export { SwingGaugeValueFormatter };

/**
 * Constants from swing-gauge default specs
 */
const GAUGE_WIDTH_SCALE = 0.4;
const GAUGE_HEIGHT_SCALE = 0.8;
const GAUGE_UPPER_BOUND = GAUGE_HEIGHT_SCALE + GAUGE_WIDTH_SCALE / 2;
const GAUGE_LOWER_BOUND = GAUGE_HEIGHT_SCALE - GAUGE_WIDTH_SCALE / 2;
const PRIMARY_RADIAN = 1.25;
const SECONDARY_RADIAN = 1.75;
const LINE_POINTER_OFFSET = 0.3;
const POINT_POINTER_OFFSET = 0.1;
const DEFAULT_OFFSET = 0.05;
const OVERFLOW_OFFSET = 0.08;

// When either value is below this threshold, the label position changes
const GAUGE_PERCENTAGE_THRESHOLD = 30;

const GAUGE_LABEL_FONT_SCALE = 0.14;
const GAUGE_VALUE_FONT_SCALE = 0.18;
const MIN_LABEL_FONT_SIZE = 12;
const MIN_VALUE_FONT_SIZE = 15;
const MAX_LABEL_LINE = 3;
const MAX_VALUE_LINE = 1;
const MAX_LEGEND_LINE = 2;

/**
 * Data visualisation showing the percentage between two values
 */
@customElement('ef-swing-gauge', {
  alias: 'sapphire-swing-gauge'
})
export class SwingGauge extends ResponsiveElement {
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
        height: 200px;
      }
      :host [part=container] {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      :host [part=canvas-container] {
        position: relative;
        flex: 1;
      }
      :host [part=canvas] {
        height: 100%;
      }
      :host [part=primary-legend], [part=secondary-legend] {
        text-align: left;
        display: flex;
      }
      :host [part=primary-label], [part=primary-value] {
        text-align: left;
      }
      :host [part=secondary-label], [part=secondary-value] {
        text-align: right;
      }
      :host [part=legend-container-outer] {
        width: 60%;
        margin: 0 auto;
        text-align: center;
      }
      :host [part=legend-container-inner] {
        max-width: 100%;
        display: inline-block;
      }
      :host [part=primary-legend-symbol], [part=secondary-legend-symbol] {
        display: inline-block;
        flex-shrink: 0;
      }
      :host [part=primary-container] {
        position: absolute;
        text-align: left;
      }
      :host [part=secondary-container] {
        position: absolute;
        text-align: right;
      }
    `;
  }

  private _primaryValue = 0;
  /**
   * Primary value
   * @param value primary value
   */
  @property({ attribute: 'primary-value', type: Number })
  public set primaryValue (value: number) {
    value = this.validateNumber(value, 'primary-value');
    const oldValue = this._primaryValue;
    if (oldValue !== value) {
      this._primaryValue = value;
      this.requestUpdate('primaryValue', oldValue);
    }
  }
  public get primaryValue (): number {
    return this._primaryValue;
  }

  /**
   * Primary label
   */
  @property({ attribute: 'primary-label', type: String })
  public primaryLabel = '';

  private _secondaryValue = 0;
  /**
   * Secondary value
   * @param value secondary value
   */
  @property({ attribute: 'secondary-value', type: Number })
  public set secondaryValue (value: number) {
    value = this.validateNumber(value, 'secondary-value');
    const oldValue = this._secondaryValue;
    if (oldValue !== value) {
      this._secondaryValue = value;
      this.requestUpdate('secondaryValue', oldValue);
    }
  }
  public get secondaryValue (): number {
    return this._secondaryValue;
  }

  /**
   * Secondary label
   */
  @property({ attribute: 'secondary-label', type: String })
  public secondaryLabel = '';

  /**
   * Animation duration in milliseconds
   */
  @property({ type: Number })
  public duration = 1000;

  /**
  * Primary value legend
  */
  @property({ type: String, reflect: true, attribute: 'primary-legend' })
  public primaryLegend = '';

  /**
  * Secondary value legend
  */
  @property({ type: String, reflect: true, attribute: 'secondary-legend' })
  public secondaryLegend = '';

  /**
   * Custom value formatter
   * @type {SwingGaugeValueFormatter}
   */
  @property({ type: Function, attribute: false })
  public valueFormatter: SwingGaugeValueFormatter = this.defaultValueFormatter;

  /**
   * Controls swing gauge animations
   */
  private onFrame: (callback: FrameRequestCallback) => number = requestAnimationFrame.bind(window);
  private cancelFrame: (requestedAnimationID: number) => void = cancelAnimationFrame.bind(window);
  private requestedAnimationID = 0;

  private gaugeWidthScale: number = GAUGE_WIDTH_SCALE;
  private gaugeHeightScale: number = GAUGE_HEIGHT_SCALE;
  private gaugeUpperBound: number = GAUGE_UPPER_BOUND;
  private gaugeLowerBound: number = GAUGE_LOWER_BOUND;
  private linePointerOffset: number = LINE_POINTER_OFFSET;
  private pointPointerOffset: number = POINT_POINTER_OFFSET;
  private primaryLineRadian: number = PRIMARY_RADIAN;
  private secondaryLineRadian: number = SECONDARY_RADIAN;

  /**
  * Data requires to draw swing gauge
  */
  private data: SwingGaugeData | null = null;

  /**
  * Internal sizes and scales
  */
  private width = 0;
  private height = 0;
  private size = 0;
  private lineLength = 60;
  private scale = 1;

  /**
  * Current fill percentage
  */
  private fillPercentage = 0;

  /**
  * Keeps previous percentage calculation to avoid re-rendering the same value
  */
  private previousFillPercentage = 0;

  /**
  * This for keep line number of label for calculate new radius
  */
  private labelLineNumber = 1;

  /**
  * Get primary percentage
  */
  private get primaryPercentage (): number {
    return this.getPercentage(this.primaryValue);
  }

  /**
  * Get secondary percentage
  */
  private get secondaryPercentage (): number {
    return this.getPercentage(this.secondaryValue);
  }

  /**
   * Check width and height are valid
   * @returns if size is valid
   */
  private get hasValidSize (): boolean {
    return this.offsetWidth > 0 && this.offsetHeight > 0 && this.canvas.width > 0 && this.canvas.height > 0;
  }

  /**
   * Get default value format
   * @param value A value on each side of swing gauge
   * @returns default value format
   */
  private defaultValueFormatter (value: number): string {
    return `${value.toFixed(2)}%`;
  }

  /**
   * Style for primary container
   */
  @state()
  private primaryContainerStyle: StyleMap = {};

  /**
   * Style for secondary container
   */
  @state()
  private secondaryContainerStyle: StyleMap = {};

  /**
   * Style for label
   */
  @state()
  private labelStyle: StyleMap = {};

  /**
   * Style for both values
   */
  @state()
  private valueStyle: StyleMap = {};

  /**
   * Get primary container element
   */
  @query('[part=primary-container]', true)
  private primaryContainer!: HTMLElement;

  /**
   * Get secondary container element
   */
  @query('[part=secondary-container]', true)
  private secondaryContainer!: HTMLElement;

  /**
   * Get legend container element
   */
  @query('[part=legend-container-outer]')
  private legendContainer!: HTMLElement;

  /**
   * Get canvas element
   */
  @query('[part=canvas]', true)
  private canvas!: Canvas;


  /**
   * Getter size of component
   * @type {SwingGaugeCanvasSize}
   * @returns return size of canvas
   */
  public get canvasSize (): SwingGaugeCanvasSize {
    return {
      width: this.offsetWidth,
      height: this.offsetHeight
    };
  }

  /**
   * Validate number
   * @protected
   * @param value number that want to validate
   * @param propName name of property
   * @returns {number} valid number
   */
  protected validateNumber (value: number, propName: string): number {
    if (typeof value === 'number' && !isNaN(value) && isFinite(value) && value >= 0) {
      return value;
    }
    new WarningNotice(`${this.localName} : The specified value "${value}" of ${propName} property is not valid. Default value will be used instead.`).show();
    return 0;
  }

  /**
   * On update lifecycle
   * @param changedProperties changed properties
   * @returns {void}
   */
  protected update (changedProperties: PropertyValues): void {
    super.update(changedProperties);

    if (changedProperties.has('primaryValue') || changedProperties.has('secondaryValue')
    || (this.primaryValue === 0 && this.secondaryValue === 0)) {
      this.canvas.autoloop = true;

      this.renderCanvas('frame');
      this.animateCanvas();
    }

    if (changedProperties.has('primaryLabel') || changedProperties.has('secondaryLabel')) {
      this.calculateLabelFontSize();
    }

    if (changedProperties.has('valueFormatter')) {
      this.calculateValueFontSize();
    }

    if (changedProperties.has('primaryValue') || changedProperties.has('secondaryValue')
    || changedProperties.has('primaryLabel') || changedProperties.has('secondaryLabel')
    || changedProperties.has('valueFormatter')) {
      this.updateGaugePositions();
    }
  }

  /**
   * Handles when component disconnected
   * @returns {void}
   */
  public disconnectedCallback (): void {
    super.disconnectedCallback();

    if (this.requestedAnimationID) {
      this.cancelFrame(this.requestedAnimationID);
    }
  }

  /**
   * Calls easing based on both left and right values
   * @param primaryValue primary value
   * @param secondaryValue secondary value
   * @returns {void}
   */
  private ease (primaryValue: number, secondaryValue: number): void {
    let to = 0.5;
    let from = this.fillPercentage;

    if (primaryValue > 0 || secondaryValue > 0) {
      to = primaryValue / (primaryValue + secondaryValue);
    }
    // this for prevent gauge not render when 'to' and 'from' are 0
    if (primaryValue === 0 && from === 0) {
      from = 0.1;
    }
    this.easeTo(to, from, performance.now() + this.duration);
  }

  /**
   * Eases the fill percentage
   * @param to ease to value
   * @param from ease from value
   * @param time ease time
   * @returns {void}
   */
  private easeTo (to: number, from: number, time: number): void {
    const diff = (this.duration - (time - performance.now())) / this.duration;
    this.fillPercentage = from + (to - from) * canvasHelper.elasticOut(diff > 1 ? 1 : diff < 0 ? 0 : diff) || 0;

    if (this.fillPercentage !== to) {
      this.cancelFrame(this.requestedAnimationID);
      this.requestedAnimationID = this.onFrame(() => this.easeTo(to, from, time));
    }
    else {
      this.canvas.autoloop = false;
    }
    this.renderCanvas('frame', true);
  }

  /**
   * Restart the animation, re-render the canvas
   * @returns {void}
   */
  private animateCanvas (): void {
    this.ease(this.primaryValue, this.secondaryValue);
  }

  /**
   * Render chart
   * @param onDraw drawing type
   * @param isFrameUpdated Optional called by on frame event
   * @returns {void}
   */
  private renderCanvas (onDraw: 'frame' | 'resize', isFrameUpdated?: boolean): void {
    const percentageChanged = this.previousFillPercentage !== this.fillPercentage;
    const canRender = this.hasValidSize && percentageChanged;

    if ((isFrameUpdated && !canRender) || !this.hasValidSize) {
      return;
    }

    this.width = this.canvas.width;
    this.height = this.canvas.height;

    const min = this.width > this.height ? this.height : this.width;
    const max = this.width > this.height ? this.width : this.height;

    this.size = Math.floor(max / this.scale < min ? max / this.scale : min);

    const canvasSize = { width: this.width, height: this.height };

    // Prevent draw frame unnecessary recalculate position and draw data
    if (!isFrameUpdated) {
      this.data = this.getData();
    }
    else if (this.data !== null) {
      this.data.fillPercentage = this.fillPercentage;
    }

    const clear = (): void => {
      if (!this.canvas.ctx) {
        return;
      }

      canvasHelper.clear(canvasSize, this.canvas.ctx);
    };
    this.canvas.addEventListener(onDraw, clear, { once: true });

    const draw = (): void => {
      if (!this.canvas.ctx) {
        return;
      }

      canvasHelper.draw(
        this.data === null ? this.getData() : this.data,
        this.canvas.ctx,
        {
          strokeWidth: Math.ceil(this.scale * this.size * 0.005),
          primaryColor: this.getComputedVariable('--primary-color', DefaultStyle.PRIMARY_GAUGE_COLOR),
          secondaryColor: this.getComputedVariable('--secondary-color', DefaultStyle.SECONDARY_GAUGE_COLOR),
          borderColor: this.getComputedVariable('--border-color', DefaultStyle.BOREDER_COLOR),
          centerline: `${this.getComputedVariable('--center-line', DefaultStyle.CENTER_LINE_STYLE)}`.trim(),
          centerlineOpacity: this.getComputedVariable('--center-line-opacity', DefaultStyle.CENTER_LINE_OPACITY),
          centerlineColor: this.getComputedVariable('--center-line-color', DefaultStyle.CENTER_LINE_COLOR)
        }
      );
    };
    this.canvas.addEventListener(onDraw, draw, { once: true });

    // Set this for comparison when deciding if we should paint
    this.previousFillPercentage = this.fillPercentage;
  }

  /**
   * Get computed swing-gauge data for drawing
   * @returns swing-gauge data
   */
  private getData (): SwingGaugeData {
    // Recalculate radius to prevent container overflow
    const gaugeHeight = this.size * this.gaugeHeightScale;
    const containerHeight = this.labelLineNumber * MIN_LABEL_FONT_SIZE + MIN_VALUE_FONT_SIZE;
    if (containerHeight > gaugeHeight) {
      // The value of 'reverseScale' increases as the value of 'scale' decreases.
      const reverseScale = 1 - this.scale;

      // increase the offset by 25%, this for buffer to make label have some space from bottom
      this.linePointerOffset = (containerHeight / gaugeHeight) * reverseScale * 1.25;
      this.primaryLineRadian = PRIMARY_RADIAN + DEFAULT_OFFSET + (OVERFLOW_OFFSET * reverseScale);
      this.secondaryLineRadian = 3 - this.primaryLineRadian;
    }

    const primaryPosLine = this.getPositionStyle(
      Segment.PRIMARY,
      this.primaryLineRadian,
      this.linePointerOffset,
      0
    );
    const primaryPosPoint = this.getPositionStyle(
      Segment.PRIMARY,
      PRIMARY_RADIAN,
      this.pointPointerOffset,
      0
    );
    const secondaryPosLine = this.getPositionStyle(
      Segment.SECONDARY,
      this.secondaryLineRadian,
      this.linePointerOffset,
      0
    );
    const secondaryPosPoint = this.getPositionStyle(
      Segment.SECONDARY,
      SECONDARY_RADIAN,
      this.pointPointerOffset,
      0
    );

    return {
      width: this.width,
      height: this.height,
      size: this.size,
      fillPercentage: this.fillPercentage,
      gaugeWidthScale: this.gaugeWidthScale,
      gaugeHeightScale: this.gaugeHeightScale,
      gaugeUpperBound: this.gaugeUpperBound,
      gaugeLowerBound: this.gaugeLowerBound,
      lineLength: this.lineLength,
      offsetLeftPrimaryLine: this.getValueFromStyle(primaryPosLine.left),
      offsetTopPrimaryLine: this.getValueFromStyle(primaryPosLine.top),
      offsetLeftPrimaryPoint: this.getValueFromStyle(primaryPosPoint.left),
      offsetTopPrimaryPoint: this.getValueFromStyle(primaryPosPoint.top),
      offsetLeftSecondaryLine: this.getValueFromStyle(secondaryPosLine.left),
      offsetTopSecondaryLine: this.getValueFromStyle(secondaryPosLine.top),
      offsetLeftSecondaryPoint: this.getValueFromStyle(secondaryPosPoint.left),
      offsetTopSecondaryPoint: this.getValueFromStyle(secondaryPosPoint.top)
    };
  }

  /**
   * Get number from CSS declaration value
   * @param styleValue value of CSS declaration
   * @returns number without CSS unit
   */
  private getValueFromStyle (styleValue: string): number {
    return Number(styleValue?.replace('px', ''));
  }

  /**
   * Compute and update style of containers and labels
   * @returns {void}
   */
  private updateGaugePositions (): void {
    if (!this.hasValidSize) {
      return;
    }

    const primaryPosition = this.getPositionStyle(
      Segment.PRIMARY,
      this.primaryLineRadian,
      this.linePointerOffset,
      -this.lineLength
    );
    const secondaryPosition = this.getPositionStyle(
      Segment.SECONDARY,
      this.secondaryLineRadian,
      this.linePointerOffset,
      0
    );

    this.primaryContainerStyle = {
      width: `${this.lineLength}px`,
      ...primaryPosition
    };
    this.secondaryContainerStyle = {
      width: `${this.lineLength}px`,
      ...secondaryPosition
    };

    // position container over line pointer
    if (this.primaryPercentage < GAUGE_PERCENTAGE_THRESHOLD) {
      delete this.primaryContainerStyle.top;
      this.primaryContainerStyle.bottom = '5px';
    }
    if (this.secondaryPercentage < GAUGE_PERCENTAGE_THRESHOLD || this.secondaryValue === 0) {
      delete this.secondaryContainerStyle.top;
      this.secondaryContainerStyle.bottom = '5px';
    }
  }

  /**
   * Compute position style
   * @param segment primary or secondary
   * @param maxRadian max radian
   * @param radiusOffset radius offset from gauge upper bound
   * @param offset line length offset
   * @returns position style
   */
  private getPositionStyle (
    segment: Segment,
    maxRadian: number,
    radiusOffset: number,
    offset: number
  ): StyleMap {
    let radius = this.size * (1 + radiusOffset) * this.scale;

    let radianValue;
    if (segment === Segment.PRIMARY) {
      radianValue = this.primaryPercentage >= GAUGE_PERCENTAGE_THRESHOLD ? maxRadian : 1;
    }
    else {
      radianValue = this.secondaryPercentage >= GAUGE_PERCENTAGE_THRESHOLD ? maxRadian : 0;
    }

    // reduce line length when line is on the bottom of canvas
    if ((radianValue === 1 || radianValue === 0) && radiusOffset > 0.1) {
      radius = this.size * (1 + this.pointPointerOffset) * this.scale;
    }

    const radian = radianValue * Math.PI;
    const left = `${Math.round(this.width / 2 + Math.cos(radian) * radius) + offset}px`;
    const top = `${Math.round(this.height + Math.sin(radian) * radius)}px`;

    return { left: left, top: top };
  }

  /**
   * Scales canvas variables making it responsive before painting
   * @returns {void}
   */
  private calculateCanvasSize (): void {
    const lineLength = this.canvas.height * 0.75;
    const bestWidth = 2 * (GAUGE_UPPER_BOUND + LINE_POINTER_OFFSET) * this.canvas.height + 2 * lineLength;
    const ratio = bestWidth / this.canvas.height;

    this.scale = 1;
    if (this.canvas.width < bestWidth) {
      const width = this.canvas.width;
      const bestHeight = width / ratio;
      this.scale = bestHeight / this.canvas.height;
    }
    this.scale = this.scale < 0.1 ? 0.1 : this.scale;

    this.lineLength = this.scale * lineLength;
    this.gaugeWidthScale = this.scale * GAUGE_WIDTH_SCALE;
    this.gaugeHeightScale = this.scale * GAUGE_HEIGHT_SCALE;
    this.gaugeUpperBound = this.scale * GAUGE_UPPER_BOUND;
    this.gaugeLowerBound = this.scale * GAUGE_LOWER_BOUND;

    this.primaryLineRadian = PRIMARY_RADIAN;
    this.secondaryLineRadian = SECONDARY_RADIAN;
    this.linePointerOffset = LINE_POINTER_OFFSET;
    this.pointPointerOffset = POINT_POINTER_OFFSET;

    if (this.scale < 1) {
      // The value of 'reverseScale' increases as the value of 'scale' decreases.
      // This mean when scale down the offset will grow up
      const reverseScale = 1 - this.scale;
      const offset = DEFAULT_OFFSET * reverseScale;

      this.primaryLineRadian = PRIMARY_RADIAN + offset;
      this.secondaryLineRadian = SECONDARY_RADIAN - offset;
      this.linePointerOffset = LINE_POINTER_OFFSET + (0.4 * (1 - this.scale));
    }

    this.primaryLineRadian = this.primaryLineRadian > 1.3 ? 1.3 : this.primaryLineRadian;
    this.secondaryLineRadian = this.primaryLineRadian > 1.7 ? 1.7 : this.secondaryLineRadian;
  }

  /**
   * Calculate and update font sizes on canvas
   * @returns {void}
   */
  private updateFontSize (): void {
    this.calculateLabelFontSize();
    this.calculateValueFontSize();
  }

  /**
   * Calculate label or value font size
   * @param ctx canvas context
   * @param textType text type
   * @returns {number} font size
   */
  private calculateFontSize (ctx: CanvasRenderingContext2D, textType: TextType): number {
    let maxLine;
    let minFontSize;
    let widthScale;
    let fontSize;
    let longerLabel;

    if (textType === TextType.LABEL) {
      maxLine = MAX_LABEL_LINE;
      minFontSize = MIN_LABEL_FONT_SIZE;
      // buffer for word wrap
      widthScale = 1.1;

      longerLabel = this.primaryLabel.length > this.secondaryLabel.length ? this.primaryLabel : this.secondaryLabel;
      fontSize = Math.ceil(this.scale * this.canvas.height * GAUGE_LABEL_FONT_SCALE);
    }
    else {
      maxLine = MAX_VALUE_LINE;
      minFontSize = MIN_VALUE_FONT_SIZE;
      widthScale = 1;

      const primaryValue = String(this.valueFormatter(this.primaryPercentage, this.primaryValue));
      const secondaryValue = String(this.valueFormatter(this.secondaryPercentage, this.secondaryValue));

      longerLabel = primaryValue.length > secondaryValue.length ? primaryValue : secondaryValue;
      fontSize = Math.ceil(this.scale * this.canvas.height * GAUGE_VALUE_FONT_SCALE);
    }

    let textWidth = canvasHelper.textWidth(ctx, longerLabel, fontSize, getComputedStyle(this).fontFamily);
    let numberOfLines = Math.ceil(textWidth / this.lineLength);

    if (numberOfLines > maxLine) {
      numberOfLines = maxLine;
    }

    if (textType === TextType.LABEL) {
      this.labelLineNumber = numberOfLines;
    }

    do {
      fontSize -= 1;
      if (fontSize < minFontSize) {
        fontSize = minFontSize;
        break;
      }
      textWidth = canvasHelper.textWidth(ctx, longerLabel, fontSize, getComputedStyle(this).fontFamily);
    }
    while (textWidth * widthScale > this.lineLength * numberOfLines);

    return fontSize;
  }

  /**
   * Update label font size
   * @returns {void}
   */
  private calculateLabelFontSize (): void {
    if (!this.canvas.ctx) {
      return;
    }

    this.labelStyle = { maxWidth: `${this.lineLength}px`, fontSize: `${this.calculateFontSize(this.canvas.ctx, TextType.LABEL)}px` };
  }

  /**
   * Update value font size
   * @returns {void}
   */
  private calculateValueFontSize (): void {
    if (!this.canvas.ctx) {
      return;
    }

    this.valueStyle = { maxWidth: `${this.lineLength}px`, fontSize: `${this.calculateFontSize(this.canvas.ctx, TextType.VALUE)}px` };
  }

  /**
   * Compute percentage of value
   * @param value value of primary or secondary
   * @returns percentage of value
   */
  private getPercentage (value: number): number {
    if (value === 0) {
      return 0;
    }
    return 100 * value / (this.primaryValue + this.secondaryValue);
  }

  /**
   * Handles canvas resize
   * @returns {void}
   */
  private onCanvasResize (): void {
    this.calculateCanvasSize();
    this.updateFontSize();

    this.renderCanvas('resize');
    this.updateGaugePositions();
  }

  /**
   * Renders legend container
   * @returns {TemplateResult} Legend template or null
   */
  private get legendTemplate (): TemplateResult | null {
    return this.primaryLegend.length > 0 || this.secondaryLegend.length > 0
      ? html`<div part="legend-container-outer">
              <div part="legend-container-inner">
                ${this.primaryLegendTemplate}
                ${this.secondaryLegendTemplate}
              </div>
            </div>`
      : null;
  }

  /**
   * Renders primary legend if property present
   * @returns {TemplateResult} Primary legend template or null
   */
  private get primaryLegendTemplate (): TemplateResult | null {
    return this.primaryLegend
      ? html`<div part="primary-legend">
              <span part="primary-legend-symbol"></span>
              <ef-label max-line="${MAX_LEGEND_LINE}" line-clamp="${MAX_LEGEND_LINE}">${this.primaryLegend}</ef-label>
            </div>`
      : null;
  }

  /**
   * Renders secondary legend if property present
   * @returns {TemplateResult} Secondary legend template or null
   */
  private get secondaryLegendTemplate (): TemplateResult | null {
    return this.secondaryLegend
      ? html`<div part="secondary-legend">
              <span part="secondary-legend-symbol"></span>
              <ef-label max-line="${MAX_LEGEND_LINE}" line-clamp="${MAX_LEGEND_LINE}">${this.secondaryLegend}</ef-label>
            </div>`
      : null;
  }

  public render (): TemplateResult {
    return html`
      <div part="container">
        ${this.legendTemplate}
        <div part="canvas-container">
          <ef-canvas part="canvas" @resize=${this.onCanvasResize}></ef-canvas>
          <div part="primary-container" style=${styleMap(this.primaryContainerStyle)}>
            ${this.primaryLabel ? html`
              <ef-label
                part="primary-label"
                max-line="${MAX_LABEL_LINE}"
                line-clamp="${MAX_LABEL_LINE}"
                style=${styleMap(this.labelStyle)}
                >${this.primaryLabel}
              </ef-label><br>`
              : null
            }
            <ef-label
              part="primary-value"
              truncate=""
              line-clamp="1"
              style=${styleMap(this.valueStyle)}
              >${this.valueFormatter(this.primaryPercentage, this.primaryValue)}</ef-label
            >
          </div>
          <div part="secondary-container" style=${styleMap(this.secondaryContainerStyle)}>
            ${this.secondaryLabel ? html`
              <ef-label
                part="secondary-label"
                max-line="${MAX_LABEL_LINE}"
                line-clamp="${MAX_LABEL_LINE}"
                style=${styleMap(this.labelStyle)}
                >${this.secondaryLabel}
              </ef-label><br>`
              : null
            }
            <ef-label
              part="secondary-value"
              truncate=""
              line-clamp="1"
              style=${styleMap(this.valueStyle)}
              >${this.valueFormatter(this.secondaryPercentage, this.secondaryValue)}</ef-label
            >
          </div>
        </div>
      </div>
    `;
  }
}

