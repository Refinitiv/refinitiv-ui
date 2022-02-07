import {
  BasicElement,
  html,
  css,
  TemplateResult,
  CSSResultGroup,
  PropertyValues
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { VERSION } from '../version.js';

import '../canvas/index.js';

const ZERO_MAP = {
  LEFT: 'left',
  CENTER: 'center',
  RIGHT: 'right'
};

const MAX_VALUE = 100; // Max value of led-gauge can't be changed by user
const SECTION_DIVIDER = 5; // To separate led-gauge to 5 sections

/**
 * A component used to show data in a LED-like
 * horizontal bar visualization.
 */
@customElement('ef-led-gauge', {
  alias: 'sapphire-led-gauge'
})
export class LedGauge extends BasicElement {

  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  private _zero: string;

  constructor () {
    super();
    this._zero = ZERO_MAP.CENTER;
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
        overflow: hidden;
        padding: 20px;
        box-sizing: border-box;
      }

      [part=label] {
        display: block;
        position: absolute;
        left: 0;
        bottom: 100%;
        width: 100%;
        margin-left: -50%;
        text-align: center;
        box-sizing: border-box;
        user-select: none;
        pointer-events: none;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      #top {
        color: var(--top-selected-color, transparent);
      }

      #bottom, #range {
        top: 100%;
        bottom: auto;
        color: var(--bottom-selected-color, transparent);
      }

      #range {
        color: var(--range-color, transparent);
      }

      section {
        position: relative;
        height: 100%;
      }

      ef-canvas {
        width: 100%;
        height: 100%;
        display: block;
      }
    `;
  }

  /**
   * Value of bar for top legend position
   * Value can be -100 to 100
   */
  @property({ type: Number, attribute: 'top-value' })
  public topValue: number | null = null;

  /**
   * Value of bar for bottom legend position
   * Value can be -100 to 100
   */
  @property({ type: Number, attribute: 'bottom-value' })
  public bottomValue: number | null = null;

  /**
   * Value of range. eg [-20, 70]
   * @type {number[]}
   */
  @property({ type: Array })
  public range: number[] = [];

  /**
   * Label to be displayed in the top legend
   */
  @property({ type: String, attribute: 'top-label' })
  public topLabel = '';

  /**
   * Label to be displayed in the bottom legend
   */
  @property({ type: String, attribute: 'bottom-label' })
  public bottomLabel = '';
  /**
   * Label to be displayed in the bottom legend
   * when a range is displayed
   * and no bottom text is already set.
   */
  @property({ type: String, attribute: 'range-label' })
  public rangeLabel = '';

  /**
   * Turn off background color and use grey
   * @default false
   */
  @property({ type: Boolean, attribute: 'neutral-color' })
  public neutralColor = false;

  /**
   * Sets the zero scale position. [center, left, right]
   * @default center
   */
  @property({ type: String })
  public get zero (): string {
    return this._zero;
  }
  public set zero (val: string) {
    const oldValue = this._zero;
    const value = val.toLowerCase();
    const pos = [ZERO_MAP.LEFT, ZERO_MAP.CENTER, ZERO_MAP.RIGHT];
    if (pos.includes(value)) {
      this._zero = value;
    }
    else {
      this._zero = ZERO_MAP.CENTER;
    }
    this.requestUpdate('zero', oldValue);
  }

  private get _shadowRoot (): ShadowRoot {
    if (!this.shadowRoot) {
      throw new Error('Your browser not support Shadow DOM or your Shadow DOM is closed.');
    }
    return this.shadowRoot;
  }

  /**
   * Canvas in ef-canvas
   */
  private get canvas (): HTMLCanvasElement {
    const efCanvas = this._shadowRoot.querySelector('ef-canvas');

    if (efCanvas && efCanvas.shadowRoot) {
      return efCanvas.shadowRoot.getElementById('canvas') as HTMLCanvasElement;
    }
    else {
      throw new Error('ef-canvas is not defined.');
    }
  }

  /**
   * The 2 dimensional context of the canvas, used for drawing
   */
  private get ctx (): CanvasRenderingContext2D {
    return this.canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  /**
   * Min value of gauge
   * @default 0
   */
  private get min (): number {
    return this.zero !== ZERO_MAP.CENTER ? 0 : -this.max;
  }
  /**
   * Max value of gauge
   * @default 100
   */
  private get max (): number {
    return MAX_VALUE;
  }

  /**
   * Invoked whenever the element is update
   * @param changedProperties changed properties
   * @returns {void}
   */
  protected update (changedProperties: PropertyValues): void {
    super.update(changedProperties);
    // re-render canvas every time properties,  has been updated
    this.renderBarGauge();
  }

  /**
   * @param barCount bar count for calculate positions
   * @param val value for calculate positions
   * @returns value bar index
   */
  private getValueBarIndex (barCount: number, val: number | null): number | null {
    if (val === null) {
      return null;
    }
    if (val < this.min) {
      val = this.min;
    }
    else if (val > this.max) {
      val = this.max;
    }

    const positions = (barCount - 1);
    if (this.zero === ZERO_MAP.LEFT) {
      return Math.round(positions * val / this.max);
    }
    if (this.zero === ZERO_MAP.RIGHT) {
      return Math.round(positions - positions * val / this.max);
    }
    return Math.round(positions * (val / 2 + this.max / 2) / this.max);
  }

  /**
   * @param varName css variable name
   * @returns {void}
   */
  private fillBarColor (varName: string): void {
    if (this.ctx) {
      this.ctx.fillStyle = this.getComputedVariable(varName);
    }
  }

  /**
   * @param idx index of bar for find what section it belongs
   * @param sectionLength length of section for find section color
   * @param barAmount bar amount
   * @returns color variable name
   */
  private getBarColor (idx: number, sectionLength: number, barAmount: number): string {
    let barColor = '';

    if (this.neutralColor) {
      barColor = '--neutral-color';
    }
    else if (idx < Math.floor(sectionLength)) {
      barColor = '--left-segment-color';
    }
    else if (idx < Math.floor(sectionLength * 2)) {
      barColor = '--center-left-segment-color';
    }
    else if (idx < Math.floor(sectionLength * 2) + Math.ceil(sectionLength)) {
      barColor = '--center-segment-color';
    }
    else if (idx >= barAmount - Math.floor(sectionLength)) {
      barColor = '--right-segment-color';
    }
    else if (idx >= barAmount - Math.floor(sectionLength * 2)) {
      barColor = '--center-right-segment-color';
    }
    else {
      barColor = '--center-segment-color';
    }

    return barColor;
  }

  /**
   * @param id id of the label can be top, bottom or range
   * @param labelPos position of label in pixel
   * @returns {void}
   */
  private updateLabelPosition (id: string, labelPos: string): void {
    if (!labelPos) {
      return;
    }
    const elem = this._shadowRoot.getElementById(id);
    if (elem) {
      elem.style.left = labelPos;
    }
  }

  /**
   * Render a led-gauge bar in canvas
   * @returns {void}
   */
  private renderBarGauge (): void {
    if (!this.isConnected || !this.canvas) {
      return;
    }

    const barWidth = parseInt(this.getComputedVariable('--led-width', '9px'), 10);
    const barSpacing = parseInt(this.getComputedVariable('--led-spacing', '4px'), 10);
    const barTotalWidth = barWidth + barSpacing;
    const width = parseInt(this.canvas.style.width, 10);
    const height = parseInt(this.canvas.style.height, 10);
    let barAmount = Math.floor(width / barTotalWidth);

    // To ensure we have middle bar
    if (barAmount % 2 === 0) {
      barAmount--;
    }

    const topValueBarIndex = this.getValueBarIndex(barAmount, this.topValue);
    const bottomValueBarIndex = this.getValueBarIndex(barAmount, this.bottomValue);
    const sectionLength = barAmount / SECTION_DIVIDER; // devided gauge to 5 sections
    const spacingOffset = barSpacing / 2;
    const basePos = width / 2 - barAmount / 2 * barTotalWidth + spacingOffset; // starter point
    const rangeValueBarIndexes = [];
    let rangeMidIndex = 0;

    // Find value bar indexes and mid position of bar gauge
    if (this.range && this.range.length === 2) {
      this.neutralColor = true;

      const range = [];
      for (let i = 0; i < this.range.length; i++) {
        const index = this.getValueBarIndex(barAmount, this.range[i]);
        if (index !== null) {
          range.push(index);
        }
      }

      for (let val = range[0]; val <= range[1]; val++) {
        rangeValueBarIndexes.push(val);
      }

      const midPos = Math.floor(rangeValueBarIndexes.length / 2);
      rangeMidIndex = rangeValueBarIndexes[midPos];
    }

    // Reset canvas before starting painted
    this.ctx.clearRect(0, 0, width, height);

    // Start painting
    for (let i = 0; i < barAmount; i++) {
      this.ctx.fillStyle = 'transparent';

      let isHitValue = false;

      // Found top value position
      if (i === topValueBarIndex) {
        this.fillBarColor('--top-selected-color');
        isHitValue = true;
      }

      // Found bottom value position
      if (i === bottomValueBarIndex) {
        // In case top & bottom value are in the same position
        if (i === topValueBarIndex) {
          this.fillBarColor('--clash-color');
        }
        else {
          this.fillBarColor('--bottom-selected-color');
        }
        isHitValue = true;
      }

      // Get section color and fill the bar color
      if (!isHitValue) {
        // Painted range color first to allow override bar color
        if (rangeValueBarIndexes.includes(i)) {
          this.fillBarColor('--range-color');
        }
        else {
          const barColor = this.getBarColor(i, sectionLength, barAmount);
          this.fillBarColor(barColor);
        }
      }

      const barHeight = isHitValue ? height : Math.round(height * 0.47);

      // Draw a bar
      this.ctx.fillRect(
        Math.round(basePos + i * barTotalWidth), // x
        Math.round(height / 2 - barHeight / 2), // y
        barWidth, // width
        barHeight // height
      );
    }

    const labelOffset = barWidth / 2;

    // Calculate label position
    const getLabelPos = (idx: number | null): string => {
      if (idx === null) {
        return '';
      }
      return `${Math.round(basePos + idx * barTotalWidth + labelOffset)}px`;
    };

    // Updated top label position
    if (this.topValue !== null) {
      this.updateLabelPosition('top', getLabelPos(topValueBarIndex));
    }

    // Updated bottom label position
    if (this.bottomValue !== null) {
      this.updateLabelPosition('bottom', getLabelPos(bottomValueBarIndex));
    }

    // Updated range label position
    if (this.range && this.range.length === 2) {
      this.updateLabelPosition('range', getLabelPos(rangeMidIndex));
    }
  }

  /**
   * @param value value of gauge bar
   * @param label user label
   * @param id id of template
   * @returns template to render
   */
  private createLabelTemplate (value: number | number[] | null, label: string, id: string): TemplateResult | null {
    if (value === null) {
      return null;
    }

    const template = html`<span part="label" id=${id}>${label}</span>`;

    if (typeof value === 'number') {
      return template;
    }
    // Value is a range type
    else {
      if (value && value.length === 2 && !(this.bottomLabel && typeof this.bottomValue === 'number')) {
        return template;
      }
      return null;
    }
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
      <section>
        <ef-canvas @resize=${this.renderBarGauge.bind(this)}></ef-canvas>
        ${this.createLabelTemplate(this.topValue, this.topLabel, 'top')}
        ${this.createLabelTemplate(this.bottomValue, this.bottomLabel, 'bottom')}
        ${this.createLabelTemplate(this.range, this.rangeLabel, 'range')}
      </section>
    `;
  }
}
