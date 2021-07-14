import {
  css,
  customElement,
  property,
  CSSResult,
  ElementSize,
  PropertyValues
} from '@refinitiv-ui/core';

import { helpers as canvasHelper } from './helpers/canvas';
import { Canvas } from '../canvas';
import { VERSION } from '../';

/**
 * Data visualisation showing the percentage between two values
 */
@customElement('ef-swing-gauge', {
  alias: 'sapphire-swing-gauge'
})
export class SwingGauge extends Canvas {
  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  /**
   * A `CSSResult` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @return CSS template
   */
  static get styles (): CSSResult {
    return css`
      :host {
        display: block;
        overflow: hidden;
        position: relative;
      }
      :host::before {
        content: '';
        display: block;
        min-height: 200px;
        box-sizing: border-box;
      }
      canvas {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        position: absolute;
      }
    `;
  }

  /**
   * Set the primary value
   * @default 50
   */
  @property({ attribute: 'primary-value', type: Number })
  public primaryValue = 50;

  /**
   * Set the primary label
   */
  @property({ attribute: 'primary-label', type: String })
  public primaryLabel = '';

  /**
   * Set the secondary value
   * @default 50
   */
  @property({ attribute: 'secondary-value', type: Number })
  public secondaryValue = 50;

  /**
   * Set the secondary label
   */
  @property({ attribute: 'secondary-label', type: String })
  public secondaryLabel = '';

  /**
   * Sets the animation duration in milliseconds
   * @default 1000
   */
  @property({ type: Number })
  public duration = 1000;

  /**
   * Getter size of component
   * @returns {ElementSize} return size of component
   */
  public get canvasSize (): ElementSize {
    return {
      width: this.width,
      height: this.height
    };
  }

  private w: number | null = null;
  private h: number | null = null;
  private min: number | null = null;
  private max: number | null = null;
  private size: number | null = null;
  private maxFontSize: number | null = null;
  private centerlineOptions: string[] = ['solid', 'dotted', 'dashed'];
  private onFrame = requestAnimationFrame.bind(window);
  private cancelFrame = cancelAnimationFrame.bind(window);
  private previousFillPercentage: number | null = null;
  private fillPercentage: number | null = null;
  private frameHandler: number | null = null;

  constructor () {
    super();
    /**
     * @ignore
     */
    this.autoloop = true;
  }

  /**
   * Re-draw canvas when the size of component changed
   * @ignore
   * @param size element dimensions
   * @returns {void}
   */
  public resizedCallback (size: ElementSize): void {
    super.resizedCallback(size);
    this.renderCanvas();
  }

  /**
   * Handles when event frame fired to re-draw canvas
   * @protected
   * @param time timestamp
   * @returns {void}
   */
  protected fireFrame (time: number): void {
    super.fireFrame(time);
    this.renderCanvas(true);
  }

  /**
   * On First Updated Lifecycle
   * @ignore
   * @param changedProperties changed properties
   * @returns {void}
   */
  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.reDrawCanvas();
  }

  /**
   * On Update Lifecycle
   * @ignore
   * @param changedProperties changed properties
   * @returns {void}
   */
  protected update (changedProperties: PropertyValues): void {
    super.update(changedProperties);
  }

  /**
   * On Updated Lifecycle
   * @ignore
   * @param changedProperties changed properties
   * @returns {void}
   */
  protected updated (changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    this.reDrawCanvas();
  }

  /**
   * Handles when component disconnected
   * @private
   * @returns {void}
   */
  public disconnectedCallback (): void {
    super.disconnectedCallback();

    if (this.frameHandler) {
      this.cancelFrame(this.frameHandler);
      this.frameHandler = null;
    }
  }

  /**
   * Calls easing based on both left and right values
   * @private
   * @param {number} v1 left value
   * @param {number} v2 right value
   * @returns {void}
   */
  private ease (v1: number, v2: number): void {
    if (v1 || v2) {
      this.easeTo(v1 / (v1 + v2), (this.fillPercentage as number),
        performance.now() + this.duration);
    }
    else if (typeof this.fillPercentage === 'number') {
      this.easeTo(0.5, this.fillPercentage,
        performance.now() + this.duration);
    }
    else {
      this.fillPercentage = 0.5;
    }
  }

  /**
   * Eases the fill percentage
   * @private
   * @param {number} to ease to value
   * @param {number} from ease from value
   * @param {number} time ease time
   * @returns {void}
   */
  private easeTo (to: number, from: number, time: number): void {
    let diff = this.duration - (time - performance.now());
    diff /= this.duration;
    this.fillPercentage = (from + (to - from) * canvasHelper.elasticOut(diff > 1 ? 1 : diff < 0 ? 0 : diff)) || 0;
    if (this.fillPercentage !== to) {
      if (this.frameHandler) {
        this.cancelFrame(this.frameHandler);
      }
      this.frameHandler = this.onFrame(() => this.easeTo(to, from, time));
    }
  }

  /**
   * Does the control has valid data?
   * @returns {boolean} will return true if valid data
   */
  private dataValid (): boolean {
    return this.primaryValue >= 0 && this.secondaryValue >= 0;
  }

  /**
   * Are we able to render?
   * Used to prevent frame painting if data hasn't changed
   * @returns {boolean} will return true if canvas can render
   */
  private canRender (): boolean {
    return (this.canvas.width + this.canvas.height !== 0 && this.previousFillPercentage !== this.fillPercentage);
  }

  /**
   * Calculate fill percentage and re-render chart
   * @returns {void}
   */
  private reDrawCanvas (): void {
    this.ease(this.primaryValue, this.secondaryValue);
    this.renderCanvas();
  }

  /**
   * Render chart
   * @param isFrameUpdated Optional called by on frame event
   * @returns {void}
   */
  private renderCanvas (isFrameUpdated?: boolean): void {
    // Can and should we paint?
    if ((isFrameUpdated && !this.canRender()) || !this.dataValid()) {
      return;
    }

    // Update the variables
    this.w = this.canvasSize.width;
    this.h = this.canvasSize.height;
    this.min = this.w > this.h ? this.h : this.w;
    this.max = this.w > this.h ? this.w : this.h;
    this.size = Math.floor(this.max / 2 < this.min ? this.max / 2 : this.min);
    this.maxFontSize = Math.round(this.size * 0.18);

    // Clear
    canvasHelper.clear(this.canvasSize, (this.ctx as CanvasRenderingContext2D));

    // Draw
    canvasHelper.draw({
      w: this.w,
      h: this.h,
      size: this.size,
      duration: this.duration,
      primaryValue: this.primaryValue,
      primaryLabel: this.primaryLabel,
      secondaryValue: this.secondaryValue,
      secondaryLabel: this.secondaryLabel,
      fillPercentage: (this.fillPercentage as number)
    },
    (this.ctx as CanvasRenderingContext2D),
    this.canvasSize,
    {
      ctxOptions: {
        strokeWidth: Math.ceil(this.size * 0.005),
        fontSize: this.maxFontSize,
        fontFamily: getComputedStyle(this).fontFamily,
        fillStyle: this.getComputedVariable('--text-color', '#fff'),
        maxFontSize: Math.round(this.size * 0.18),
        primaryColor: this.getComputedVariable('--primary-color', '#2EB4C9'),
        secondaryColor: this.getComputedVariable('--secondary-color', '#C93C4B'),
        borderColor: this.getComputedVariable('--border-color', '#000'),
        centerline: `${this.getComputedVariable('--center-line', 'solid')}`.trim(),
        centerlineOpacity: this.getComputedVariable('--center-line-opacity', 0.6),
        centerlineColor: this.getComputedVariable('--center-line-color', '#000'),
        centerlineOptions: this.centerlineOptions
      }
    });

    // Set this for comparison when deciding if we should paint
    this.previousFillPercentage = this.fillPercentage;
  }
}
