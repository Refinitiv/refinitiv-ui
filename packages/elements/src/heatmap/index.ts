import {
  ResponsiveElement,
  html,
  css,
  TemplateResult,
  CSSResultGroup,
  PropertyValues
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { query } from '@refinitiv-ui/core/decorators/query.js';
import { VERSION } from '../version.js';
import { MicroTaskRunner } from '@refinitiv-ui/utils/async.js';
import { color, ColorCommonInstance } from '@refinitiv-ui/utils/color.js';

import '../canvas/index.js';
import type { Canvas } from '../canvas';
import '../tooltip/index.js';

import { Track } from './helpers/track.js';
import { blend, brighten, darken, isLight, interpolate } from './helpers/color.js';
import type { HeatmapCell, HeatmapConfig, HeatmapTooltipCallback, HeatmapRenderCallback } from './helpers/types';
import { getResponsiveFontSize, getMaximumTextWidth, getMaximumLabelTextWidth, MIN_FONT_SIZE } from './helpers/text.js';

const MAX_CELL_WIDTH_RATIO = 0.85;
const DEFAULT_CANVAS_RATIO = 0.75; // ratio — 4:3

export type { HeatmapCell, HeatmapXAxis, HeatmapYAxis, HeatmapConfig, HeatmapTooltipCallback, HeatmapRenderCallback, HeatmapCustomisableProperties } from './helpers/types';

/**
 * A graphical representation of data where the individual
 * values contained in a matrix are represented as colors
 */
@customElement('ef-heatmap', {
  alias: 'sapphire-heatmap'
})
export class Heatmap extends ResponsiveElement {

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
   * @returns CSS template
   */
  static get styles (): CSSResultGroup {
    return css`
      :host {
        display: block;
      }
      #container{
        width: 100%;
        height: 100%;
        display: flex;
      }
      #canvas-container {
        min-width:0;
        display: flex;
        width: 100%;
        flex-direction: column;
        position: relative;
      }
      #tooltip-overlay {
        position: absolute;
      }
      [part=canvas] {
        flex-grow: 1;
      }
      [part=x-axis] {
        display: flex;
        align-items: center;
      }
      [part=y-axis]{
        display: flex;
        flex-direction: column;
      }
      .x-axis-item {
        text-align: center;
        overflow: hidden;
      }
      .y-axis-item {
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
    `;
  }

  /**
   * Heatmap configuration options.
   * @type {HeatmapConfig}
   */
  @property({ type: Object })
  public config: HeatmapConfig | null = null;

  /**
   * Number of maximum label width that cell can paint in pixel.
   * e.g. label-width: 30px; cell label hides when text length reaches 30px.
   */
  @property({ type: Number, attribute: 'label-width' })
  public labelWidth = 0;

  /**
   * Hide all labels in the cells
   */
  @property({ type: Boolean, attribute: 'label-hidden' })
  public labelHidden = false;

  /**
   * Hide all axes
   */
  @property({ type: Boolean, attribute: 'axis-hidden' })
  public axisHidden = false;

  /**
   * Current active cell for internal use
   * @private
   */
  @property({ type: Object, attribute: false })
  /* istanbul ignore next */
  public get hoverCell (): HeatmapCell | null {
    return this._hoverCell;
  }

  /* istanbul ignore next */
  public set hoverCell (hoverCell: HeatmapCell | null) {
    const previousHoverCell = this._hoverCell;
    this._hoverCell = hoverCell;

    if (this._hoverCell !== previousHoverCell) {
      this.requestUpdate('hoverCell', previousHoverCell);
      this.hoverCellChanged(this._hoverCell, previousHoverCell);
    }
  }

  /**
   * Minimum point of the cell coloring
   */
  @property({ type: Number, attribute: 'min-point' })
  public minPoint = -1;

  /**
   * Middle point of the cell coloring
   */
  @property({ type: Number, attribute: 'mid-point' })
  public midPoint = 0;

  /**
   * Maximum point of the cell coloring
   */
  @property({ type: Number, attribute: 'max-point' })
  public maxPoint = 1;

  /**
   * Enable cell color blending
   */
  @property({ type: Boolean })
  public blend = false;

  /**
   * Cell minimum color saturation, value can be from 0 - 1
   */
  @property({ type: Number })
  public saturation = 0.4;

  /**
   * Returns data of interactive cell
   * @param event an event that occur while the user interacting with element
   * @returns data of cell
   */
  /* istanbul ignore next */
  public getCellDataAtEvent (event: MouseEvent): HeatmapCell | null {
    return this.hitTest(event);
  }

  /**
   * A callback function that allows tooltip rendering on cell hover
   * @type {HeatmapTooltipCallback}
   */
  @property({ type: Function, attribute: false })
  public tooltipCallback: HeatmapTooltipCallback | undefined;

  /**
   * Render callback function use for custom cell properties.
   * Accepts custom label, foreground and background color
   * @type {HeatmapRenderCallback}
   */
  @property({ type: Function, attribute: false })
  public renderCallback: HeatmapRenderCallback | undefined;

  /**
   * HTML canvas DOM used to render heatmap
   */
  @query('[part=canvas]', true)
  private canvas!: HTMLCanvasElement & Canvas;

  /**
   * Main component's container DOM
   */
  @query('#container', true)
  private container!: HTMLElement;

  /**
   * Cross-box DOM
   */
  @query('[part=cross-box]', true)
  private crossBox!: HTMLElement;

  /**
   * Y-axis DOM
   */
  @query('[part=y-axis]', true)
  private yAxis?: HTMLElement;

  /**
   * X-axis DOM
   */
  @query('[part=x-axis]', true)
  private xAxis?: HTMLElement;

  /**
   * Box containing canvas and x-axis DOM
   */
  @query('#canvas-container', true)
  private canvasContainer!: HTMLElement;

  /**
   * Contains a y-axis and a cross box DOM
   */
  @query('#y-axis-container', true)
  private yAxisBox?: HTMLElement;

  /**
   * Overlay used for moving target around for rendering tooltip when a cell is hit.
   * Canvas alone cannot do this. It is one whole element.
   */
  @query('#tooltip-overlay')
  private tooltipOverlay!: HTMLElement;

  /**
   * Current active cell
   */
  private _hoverCell: HeatmapCell | null = null;

  /**
   * Internal cells data storage
   */
  private cells: HeatmapCell[] = [];

  /**
   * Canvas's font color according to theme
   */
  private foregroundColor = '';

  /**
   * Canvas's background color according to theme
   */
  private backgroundColor = '';

  /**
   * Row cells track for easier calculations
   */
  private rowTrack = new Track();

  /**
   * Column cells track for easier calculations
   */
  private colTrack = new Track();

  /**
   * A flag to check if calculated responsive height it been set.
   */
  private responsiveHeight = false;

  /**
   * A flag to check if the component has a size.
   */
  private isSizeCalculated = false;

  /**
   * Use to prevent resizes observer in certain use cases
   */
  private updateTimer = 0;

  /**
   * Use to throttle heatmap painting
   */
  private renderTask = new MicroTaskRunner();

  /**
   * A flag to check if the cell has header enable.
   */
  private hasCellHeader = false;

  /**
   * A flag to check if cell's content is within its boundary
   */
  private contentWithinCellBoundary = true;

  /**
   * Margin around each cell
   */
  private cellMargin = 1;

  /**
   * Above point color that is customisable using CSS variable
   */
  private abovePointColor = '';

  /**
   * Middle point color that is customisable using CSS variable
   */
  private midPointColor = '';

  /**
   * Below point color that is customisable using CSS variable
   */
  private belowPointColor = '';

  /**
   * Gets the computed style of the canvas element
   * @returns computed canvas style
   */
  private get canvasStyle (): CSSStyleDeclaration {
    return getComputedStyle(this.canvas);
  }

  /**
   * Gets the 2D context of the canvas element
   * @returns 2D canvas context
   */
  private get canvasContext (): CanvasRenderingContext2D | null {
    return this.canvas.context;
  }

  /**
   * Safely gets the row data
   * @returns array of row data
   */
  private get rows (): HeatmapCell[][] {
    return this.config && Array.isArray(this.config?.data) ? this.config.data : [];
  }

  /**
   * Get row count
   * @returns count of rows
   */
  private get rowCount (): number {
    return this.rows ? this.rows.length : 0;
  }

  /**
   * Get column count
   * @returns count of columns
   */
  private get columnCount (): number {
    let result = 0;
    this.rows?.forEach(columns => {
      if (columns.length > result) {
        result = columns.length;
      }
    });
    return result;
  }

  constructor () {
    super();
    /** @ignore */
    this.onResize = this.onResize.bind(this);
    /** @ignore */
    this.onMouseMove = this.onMouseMove.bind(this);
    /** @ignore */
    this.stopAnimation = this.stopAnimation.bind(this);
    /** @ignore */
    this.tooltipRenderer = this.tooltipRenderer.bind(this);
    /** @ignore */
    this.tooltipCondition = this.tooltipCondition.bind(this);
    /** @ignore */
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  /**
   * Called when the element’s DOM has been updated and rendered
   * @param changedProperties changed properties
   * @returns {void}
   */
  protected updated (changedProperties: PropertyValues): void {
    if (changedProperties.has('labelHidden')) {
      this.labelHiddenChanged();
    }

    // Re-paints whole canvas when at least one of the following properties changes
    if (
      changedProperties.has('config')
      || changedProperties.has('blend')
      || changedProperties.has('minPoint')
      || changedProperties.has('midPoint')
      || changedProperties.has('maxPoint')
      || changedProperties.has('saturation')
      || changedProperties.has('axisHidden')
      || changedProperties.has('labelWidth')
    ) {
      this.prepareAndPaint();
    }
  }

  /**
   * Handles resize events
   * @returns {void}
   */
  private onCanvasResize (): void {
    this.prepareAndPaint();
  }

  /**
   * Handles mouse moving on heatmap canvas
   * @param event mousemove event
   * @returns {void}
   */
  /* istanbul ignore next */
  private onMouseMove (event: MouseEvent): void {
    if (event.composedPath().includes(this.canvas) || this.tooltipCallback && this.tooltipOverlay === event.target) {
      this.hoverCell = this.hitTest(event);
    }
    else {
      this.hoverCell = null;
    }
  }

  /**
   * Handles when mouse moving outside element
   * @param event mouseleave event
   * @returns {void}
   */
  /* istanbul ignore next */
  private onMouseLeave (): void {
    this.hoverCell = null;
  }

  /**
   * Handles heatmap resizes
   * @returns {void}
   */
  private onResize (): void {
    this.updateTimer = 0;

    if (!this.isSizeCalculated) {
      if (this.offsetWidth || this.offsetHeight) {
        this.isSizeCalculated = true;
      }
    }
    if (this.isSizeCalculated) {
      const spacing = parseFloat(this.getComputedVariable('--spacing', '0'));
      this.cellMargin = spacing / 2;
    }

    // calculate responsive height
    if (this.responsiveHeight || !this.offsetHeight) {
      const width = this.offsetWidth;

      if (width) {
        const newHeight = `${Math.floor(DEFAULT_CANVAS_RATIO * width)}px`;
        if (this.style.height !== newHeight) {
          // set height to outermost container, so that heatmap's height can be override
          this.container.style.height = newHeight;
          this.responsiveHeight = true;
          this.updateTimer = -1; // Prevent resizeObserver from executing this method in the next call
        }
      }
    }
    this.prepareAndPaint();
  }

  /**
   * Initialize row track
   * @returns {void}
   */
  private initialiseRowTrack (): void {
    this.rowTrack.init(this.offsetHeight, this.rowCount);
    this.rowTrack.margin = this.cellMargin;
  }

  /**
    * Initialize column track
    * @returns {void}
    */
  private initialiseColumnTrack (): void {
    this.colTrack.init(this.offsetWidth, this.columnCount);
    this.colTrack.margin = this.cellMargin;
  }

  /**
   * Hit testing on heatmap
   * @param event mouse event
   * @returns cell
   */
  /* istanbul ignore next */
  private hitTest (event: MouseEvent): HeatmapCell | null {
    const box = this.canvas.getBoundingClientRect();
    const x = event.clientX - box.left;
    const y = event.clientY - box.top;
    const row = this.rowTrack.hitTest(y);
    const column = this.colTrack.hitTest(x);

    return this.getCellByLocation(row, column);
  }

  /**
   * Get a cell, using row and column coordinates
   * @param row row index
   * @param column column index
   * @returns cell
   */
  /* istanbul ignore next */
  private getCellByLocation (row: number, column: number): HeatmapCell | null {
    if (row < 0 || row >= this.rowCount) {
      return null;
    }
    if (column < 0 || column >= this.columnCount) {
      return null;
    }

    return this.cells[row * this.columnCount + column] || null;
  }

  /**
   * Update overlay position
   * @param cell cell information for correct overlay
   * @returns {void}
   */
  /* istanbul ignore next */
  private updateTooltipOverlayPosition (cell: HeatmapCell): void {
    // Compensate x-axis height for overlay when x-axis is at top position
    let marginOverlayTop = 0;
    if (this.config?.xAxis && this.xAxis?.offsetHeight) {
      marginOverlayTop = this.config.xAxis.position === 'bottom' ? 0 : this.xAxis?.offsetHeight;
    }

    // Update overlay position
    this.tooltipOverlay.style.left = `${cell.x}px`;
    this.tooltipOverlay.style.top = `${cell.y + marginOverlayTop}px`;
    this.tooltipOverlay.style.width = `${cell.width}px`;
    this.tooltipOverlay.style.height = `${cell.height}px`;
  }

  /**
   * Called upon active cell changes i.e cell hovering
   * @param cell current active cell
   * @param previousCell previous active cell
   * @returns {void}
   */
  /* istanbul ignore next */
  private hoverCellChanged (cell: HeatmapCell | null, previousCell: HeatmapCell | null): void {
    if (cell && cell.value !== null) {

      if (this.tooltipCallback) {
        this.updateTooltipOverlayPosition(cell);
      }

      // faded color depending on cell font color, light font darkens the cell background and vice versa
      const fontColor = color(getComputedStyle(this.canvas).color) as ColorCommonInstance;
      const fadedColor = isLight(fontColor) ? darken(cell.backgroundColor) : brighten(cell.backgroundColor);

      this.fade(cell, cell.backgroundColor, fadedColor, 100);
    }

    // returns color of previous cell to default cell color
    if (previousCell && previousCell.value !== null) {
      previousCell.foregroundColor = this.foregroundColor;
      this.fade(previousCell, previousCell.backgroundColor, this.getBackgroundColor(previousCell.value), 300);
    }
  }

  /**
   * Called upon label-hidden attribute changes
   * @returns {void}
   */
  private labelHiddenChanged (): void {
    this.paintAllCellBackground();

    if (this.hasCellHeader) {
      this.paintAllHeader();
    }

    if (!this.labelHidden) {
      this.paintAllLabel();
    }
  }

  /**
   * Handles heatmap resizes
   * @ignore
   * @returns {void}
   */
  public resizedCallback (): void {
    if (this.updateTimer) {
      this.updateTimer = 0;
    }
    else {
      // split layout updating to another execution-loop
      // to prevents resizeObserver triggers resize-loop-error
      this.updateTimer = window.setTimeout(this.onResize);
    }
  }

  /**
   * Stop any current animations on a cell.
   * @param {HeatmapCell} cell cell to stop the animation on
   * @returns {void}
   */
  /* istanbul ignore next */
  private stopAnimation (cell: HeatmapCell): void {
    if (cell.animationFrame) {
      cancelAnimationFrame(cell.animationFrame);
    }
  }

  /**
   * Stops all animations on a cell
   * @returns {void}
   */
  private stopAllAnimations (): void {
    this.cells.forEach(this.stopAnimation);
  }

  /**
   * Clear a cell on canvas
   * @param cell cell object
   * @returns {void}
   */
  /* istanbul ignore next */
  private resetCell (cell: HeatmapCell): void {
    this.canvasContext?.clearRect(
      cell.x,
      cell.y,
      cell.width,
      cell.height
    );
  }

  /**
   * Fades a cell's background from one color to another
   * @param cell to fade
   * @param from initial cell color
   * @param to color after faded
   * @param duration fading animation duration
   * @param delay fading animation delay
   * @returns {void}
   */
  /* istanbul ignore next */
  private fade (cell: HeatmapCell, from: string, to: string, duration: number): void {
    const start = performance.now();
    const end = start + duration;

    const fadingAnimation: FrameRequestCallback = (time: number): void => {
      cell.x = this.colTrack.getContentStart(cell.colIndex);
      cell.y = this.rowTrack.getContentStart(cell.rowIndex);
      cell.width = this.colTrack.getContentSize(cell.colIndex);
      cell.height = this.rowTrack.getContentSize(cell.rowIndex);

      if (cell.animationFrame) {
        cancelAnimationFrame(cell.animationFrame);
      }

      const colorFadingFactor = Math.max(Math.min((time - start) / (end - start), 1), 0);

      // Reset cell and prepare for re-paint
      this.resetCell(cell);

      // Assign new cell background color after fading
      cell.backgroundColor = interpolate(from, to)(colorFadingFactor);

      this.paintCell(cell);

      if (colorFadingFactor < 1) {
        cell.animationFrame = requestAnimationFrame(fadingAnimation);
      }
    };

    if (cell.animationFrame) {
      cancelAnimationFrame(cell.animationFrame);
    }

    cell.animationFrame = requestAnimationFrame(fadingAnimation);
  }

  /**
   * Converts the input data into usable cell data
   * @returns {void}
   */
  private calculateCellData (): void {
    // Reset cell
    this.cells = [];

    if (!this.axisHidden) {
      if (this.yAxis && this.config?.yAxis) {
        this.rowTrack.init(this.yAxis.offsetHeight, this.rowCount);
      }
      if (this.xAxis && this.config?.xAxis) {
        this.colTrack.init(this.xAxis.offsetWidth, this.columnCount);
      }
    }

    // TODO: ensure that cell size must always be larger than cell margin
    for (let rowIndex = 0; rowIndex < this.rowTrack.laneCount; rowIndex++) {
      for (let columnIndex = 0; columnIndex < this.colTrack.laneCount; columnIndex++) {

        const cell: HeatmapCell = this.rows[rowIndex][columnIndex];

        const cellValue = cell ? cell.value : null;
        const cellLabel = cellValue !== null && typeof cellValue === 'number' ? cellValue.toFixed(2) : '';
        const cellHeader = cell && cell.header ? cell.header : '';
        const cellIndex = rowIndex * this.colTrack.laneCount + columnIndex;

        const foregroundColor = this.foregroundColor;
        const backgroundColor = this.getBackgroundColor(cellValue)?.toString() || '';

        if (cellHeader) {
          this.hasCellHeader = true;
        }

        this.cells[cellIndex] = {
          rowIndex: rowIndex,
          colIndex: columnIndex,
          x: this.colTrack.getContentStart(columnIndex),
          y: this.rowTrack.getContentStart(rowIndex),
          width: this.colTrack.getContentSize(columnIndex),
          height: this.rowTrack.getContentSize(rowIndex),
          value: cellValue,
          header: cellHeader,
          label: cellLabel,
          foregroundColor: foregroundColor,
          defaultBackground: backgroundColor,
          backgroundColor: backgroundColor
        };
      }
    }
  }


  /**
   * Performs check to see if everything is ready,
   * converts data into usable cells and then
   * paints to the canvas.
   * @returns {void}
   */
  private prepareAndPaint (): void {
    if (!!this.canvas && this.config) {
      this.renderTask.schedule(() => {
        this.stopAllAnimations();

        this.initialiseColumnTrack();
        this.initialiseRowTrack();

        if (!this.axisHidden) {
          this.renderAxisX();
          this.renderAxisY();
        }

        this.getCellBaseColors();
        this.getCanvasColors();

        this.calculateCellData();
        this.paint();
      });
    }
  }

  /**
   * Paints all cells to the canvas
   * @returns {void}
   */
  private paint (): void {
    if (!this.isSizeCalculated) {
      return;
    }

    if (this.renderCallback) {
      this.retrieveAllCustomCellProperties();
    }

    this.paintAllCellBackground();

    if (this.canPaintText()) {
      if (!this.labelHidden) {
        this.paintAllLabel();
      }

      if (this.hasCellHeader) {
        this.paintAllHeader();
      }
    }
  }

  /**
   * Paints label to all cells
   * @returns {void}
   */
  private paintAllLabel (): void {
    for (let index = 0; index < this.cells.length; index++) {
      this.paintLabel(this.cells[index]);
    }
  }

  /**
   * Calculates space between header and label using cell's height
   * Maximum 10 pixels
   * @param cellHeight in pixels
   * @returns in pixels
   */
  private calculateHeaderMargin (cellHeight: number): number {
    const margin = (cellHeight / 10) * 2;
    return margin > 10 ? 10 : margin;
  }

  /**
   * Paints label to a single cell
   * @param cell cell to paint
   * @returns {void}
   */
  private paintLabel (cell: HeatmapCell): void {
    const margin = cell.header ? this.calculateHeaderMargin(cell.height) : 0;
    const label = typeof cell.customLabel === 'string' ? cell.customLabel : cell.label;

    if (this.canvasContext) {
      this.canvasContext.fillStyle = cell.customForegroundColor || cell.foregroundColor;
      this.canvasContext.fillText(label || '', cell.x + cell.width / 2, (cell.y + 1 + cell.height / 2) + margin);
    }
  }

  /**
   * Check if the text (label / header and label) can be paint on the cell
   * @returns true if text is within cell's boundary
   */
  /* istanbul ignore next */
  private canPaintText (): boolean {
    const canvas = this.canvasContext;

    if (!canvas) {
      return false;
    }

    const fontRatio = this.responsiveHeight ? 0.3 : 0.4;
    const fontFamily = getComputedStyle(this).fontFamily;

    const contentWidth = this.colTrack.getContentSize(0);
    const contentHeight = this.rowTrack.getContentSize(0);

    if (contentWidth <= 0 || contentHeight <= 0) {
      this.contentWithinCellBoundary = false;
      return this.contentWithinCellBoundary;
    }

    let fontSize = getResponsiveFontSize(fontRatio, contentHeight, contentWidth);

    canvas.textAlign = 'center';
    canvas.textBaseline = 'middle';
    canvas.font = `${fontSize}px ${fontFamily}`;

    let isWithinMinCellWidth = ((this.labelWidth || getMaximumTextWidth(canvas, this.cells, this.hasCellHeader)) / contentWidth) < MAX_CELL_WIDTH_RATIO;

    // If label width is still more than 85% of the cell width, try to reduce to smallest possible font-size to display label.
    if (!isWithinMinCellWidth && fontSize !== MIN_FONT_SIZE) {
      while (!isWithinMinCellWidth) {
        canvas.font = `${fontSize}px ${fontFamily}`; // Should assigned new font size to canvas before calculated again.
        isWithinMinCellWidth = ((this.labelWidth || getMaximumTextWidth(canvas, this.cells, this.hasCellHeader)) / contentWidth) < MAX_CELL_WIDTH_RATIO;

        // Stops when reaches minimum font-size
        if (fontSize === MIN_FONT_SIZE) {
          break;
        }

        if (!isWithinMinCellWidth && fontSize > MIN_FONT_SIZE) {
          fontSize -= 1;
        }
      }
    }

    const isWithinMinCellHeight = this.hasCellHeader ? (fontSize * 2) < contentHeight : fontSize < contentHeight;

    this.contentWithinCellBoundary = isWithinMinCellWidth && isWithinMinCellHeight;
    return this.contentWithinCellBoundary;
  }

  /**
   * Calculate cell background color based on the current cell data value
   * @param value cell value
   * @returns calculated color
   */
  /* istanbul ignore next */
  private getBackgroundColor (value: number | null): string {
    if (value === null) {
      return this.backgroundColor;
    }

    let saturation = this.blend ? 0 : this.saturation;

    // Can only have value from 0 to 1
    if (saturation > 1) {
      saturation = 1;
    }
    else if (saturation < 0) {
      saturation = 0;
    }

    const factor = this.calculateColorFactor(value, saturation);

    if (this.blend) {
      return blend(this.belowPointColor, this.abovePointColor, this.backgroundColor, factor);
    }
    else if (factor >= 0) {
      return interpolate(this.midPointColor, this.abovePointColor)(factor);
    }
    else {
      return interpolate(this.midPointColor, this.belowPointColor)(-factor);
    }
  }

  /**
   * Calculate the color mixing factor from 0 - 1
   * @param value cell value
   * @param saturation color saturation level
   * @returns factor
   */
  /* istanbul ignore next */
  private calculateColorFactor (value: number, saturation: number): number {
    if (value >= this.maxPoint) {
      return 1;
    }

    if (value <= this.minPoint) {
      return -1;
    }

    if (value === this.midPoint) {
      return saturation;
    }

    const saturateRatio = 1 - saturation;

    if (value > this.midPoint) {
      return ((value - this.midPoint) / (this.maxPoint - this.midPoint) * saturateRatio) + saturation;
    }
    else {
      return ((value - this.midPoint) / (this.midPoint - this.minPoint) * saturateRatio) - saturation;
    }
  }

  /**
   * Get and stores canvas color from computed canvas style
   * @returns {void}
   */
  private getCanvasColors (): void {
    this.foregroundColor = this.canvasStyle.color;
    this.backgroundColor = this.canvasStyle.backgroundColor;
  }

  /**
   * Get and stores cell colors based on theme or custom css variables
   * @returns {void}
   */
  private getCellBaseColors (): void {
    this.abovePointColor = this.getComputedVariable('--above-point-color');
    this.midPointColor = this.getComputedVariable('--mid-point-color');
    this.belowPointColor = this.getComputedVariable('--below-point-color');
  }

  /**
   * Retrieve custom cell properties for a single cell
   * @param {HeatmapCell} cell cell to assign colours
   * @returns {void}
   */
  private retrieveCustomCellProperties (cell: HeatmapCell): void {
    const customCellProperties = this.renderCallback ? this.renderCallback(Object.assign({}, cell)) : null;

    if (customCellProperties) {
      cell.customLabel = customCellProperties.label;
      cell.customBackgroundColor = customCellProperties.backgroundColor;
      cell.customForegroundColor = customCellProperties.foregroundColor;
    }
  }

  /**
   * Retrieves all custom call properties
   * @returns {void}
   */
  private retrieveAllCustomCellProperties (): void {
    for (let index = 0; index < this.cells.length; index++) {
      this.retrieveCustomCellProperties(this.cells[index]);
    }
  }

  /**
   * Paints cell header
   * @param {HeatmapCell} cell cell to paint
   * @returns {void}
   */
  private paintHeader (cell: HeatmapCell): void {
    if (this.canvasContext) {
      const labelFontStyle = this.canvasContext.font;
      const margin = this.labelHidden ? 0 : this.calculateHeaderMargin(cell.height);

      this.canvasContext.font = 'bold ' + labelFontStyle;
      this.canvasContext.fillStyle = cell.customForegroundColor || cell.foregroundColor;
      this.canvasContext.fillText(cell.header || '', cell.x + cell.width / 2, (cell.y + 1 + cell.height / 2) - margin);

      // Reverts font style to paint label correctly
      this.canvasContext.font = labelFontStyle;
    }
  }

  /**
   * Paints header to all cells
   * @returns {void}
   */
  private paintAllHeader (): void {
    for (let index = 0; index < this.cells.length; index++) {
      this.paintHeader(this.cells[index]);
    }
  }

  /**
   * Paints individual cell when fading
   * @param cell object
   * @returns {void}
   */
  /* istanbul ignore next */
  private paintCell (cell: HeatmapCell): void {
    this.paintCellBackground(cell);

    if (!this.labelHidden && this.contentWithinCellBoundary) {
      this.paintLabel(cell);
    }

    if (cell.header && this.contentWithinCellBoundary) {
      this.paintHeader(cell);
    }
  }

  /**
   * Paints all cells background colour
   * @returns {void}
   */
  private paintAllCellBackground (): void {
    this.canvasContext?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let index = 0; index < this.cells.length; index++) {
      this.paintCellBackground(this.cells[index]);
    }
  }

  /**
  * Paints a single cell background colour
  * @param {HeatmapCell} cell cell to paint
  * @returns {void}
  */
  private paintCellBackground (cell: HeatmapCell): void {
    if (this.canvasContext) {
      this.canvasContext.fillStyle = cell.customBackgroundColor || cell.backgroundColor;
      this.canvasContext.fillRect(cell.x, cell.y, cell.width, cell.height);
    }
  }

  /**
   * Construct and renders x-axis
   * @returns {void}
   */
  private renderAxisX (): void {
    if (!this.isSizeCalculated) {
      return;
    }

    const axisConfig = this.config?.xAxis;
    if (!this.xAxis || !this.yAxisBox || !axisConfig) {
      return;
    }

    if (axisConfig.position === 'bottom') {
      this.canvasContainer.style.flexDirection = 'column-reverse';
      this.yAxisBox.style.display = 'flex';
      this.yAxisBox.style.flexDirection = 'column-reverse';
    }
    else {
      this.canvasContainer.style.flexDirection = 'column';
      this.yAxisBox.style.display = 'block';
    }

    const laneCount = this.colTrack.laneCount;
    const xAxisElement = this.xAxis;
    const labels = axisConfig.labels || [];
    const shortLabels = axisConfig.shortLabels || [];
    const cellMargin = this.colTrack.margin;

    let displayShortLabel = false;

    const nbsp = String.fromCharCode(160);

    while (xAxisElement.children.length > laneCount) {
      if (xAxisElement.lastChild) {
        xAxisElement.removeChild(xAxisElement.lastChild);
      }
    }

    for (let i = 0; i < laneCount; i++) {
      let element: HTMLDivElement = xAxisElement.children[i] as HTMLDivElement;

      if (!element) {
        element = document.createElement('div');
        element.className = 'x-axis-item';
        element.appendChild(document.createElement('span'));

        xAxisElement.appendChild(element);
      }

      if (cellMargin !== Number(element.getAttribute('cell-margin'))) {
        element.style.margin = `${cellMargin}px`;
        element.setAttribute('cell-margin', cellMargin.toString());
      }

      const cellWidth = this.colTrack.getContentSize(i);
      if (cellWidth !== Number(element.getAttribute('cell-width'))) {
        element.style.width = `${cellWidth}px`;
        element.setAttribute('cell-width', cellWidth.toString());
      }

      const span: HTMLSpanElement = element.children[0] as HTMLSpanElement;
      span.textContent = labels[i] || nbsp;

      // If x-axis text is more than container
      if (span.offsetWidth > element.offsetWidth) {
        displayShortLabel = true;
      }
    }

    if (displayShortLabel) {
      // Reassign all x-axis labels
      for (let i = 0; i < laneCount; i++) {
        const element = xAxisElement.children[i];
        element.children[0].textContent = shortLabels[i] || nbsp;
      }
    }
  }

  /**
   * Construct and renders y-axis
   * @returns {void}
   */
  private renderAxisY (): void {
    if (!this.isSizeCalculated) {
      return;
    }

    const axisConfig = this.config?.yAxis;
    if (!this.yAxis || !axisConfig) {
      return;
    }

    if (axisConfig.position === 'right') {
      this.container.style.flexDirection = 'row-reverse';
    }
    else {
      this.container.style.flexDirection = 'row';
    }

    const yAxisElement = this.yAxis;
    const labels = axisConfig.labels || [];
    const cellMargin = this.rowTrack.margin;
    const laneCount = this.rowTrack.laneCount;

    const nbsp = String.fromCharCode(160);

    // Make one box inside the y axis needed to create the width of the crossbox.
    if (this.yAxis.children.length === 0) {
      const element: HTMLDivElement = document.createElement('div');
      element.className = 'y-axis-item';

      const span = document.createElement('span');
      span.textContent = getMaximumLabelTextWidth(labels);

      element.appendChild(span);
      element.style.margin = `${cellMargin}px`;

      const cellHeight = this.rowTrack.getContentSize(1);
      element.style.height = `${cellHeight}px`;
      yAxisElement.appendChild(element);
    }

    // Create crossbox
    if (this.xAxis && this.yAxis) {

      // In order to build a crossbox,
      // it is necessary to have the height of xAxis and the width of yAxis
      // in order to determine the correct size of the crossbox.
      this.crossBox.style.margin = `${this.cellMargin }px`;
      this.crossBox.style.height = `${(this.xAxis.children[0] as HTMLElement).offsetHeight}px`;
      this.crossBox.style.width = `${(this.yAxis.children[0] as HTMLElement).offsetWidth}px`;

      // clear one box inside the yAxis after create crossbox
      if (yAxisElement.lastChild) {
        yAxisElement.removeChild(yAxisElement.lastChild);
      }
    }

    this.rowTrack.init(this.offsetHeight - (this.crossBox.offsetHeight + (this.cellMargin * 2)), this.rowCount);

    // Clear yAxis element before re-create yAxis
    while (yAxisElement.children.length > laneCount) {
      if (yAxisElement.lastChild) {
        yAxisElement.removeChild(yAxisElement.lastChild);
      }
    }

    // Create content inside yAxis
    for (let i = 0; i < laneCount; i++) {
      let element: HTMLDivElement = yAxisElement.children[i] as HTMLDivElement;

      if (!element) {
        element = document.createElement('div');
        element.className = 'y-axis-item';

        yAxisElement.appendChild(element);
      }

      if (cellMargin !== Number(element.getAttribute('cell-margin'))) {
        element.style.margin = `${cellMargin}px`;
        element.setAttribute('cell-margin', cellMargin.toString());
      }

      const cellHeight = this.rowTrack.getContentSize(i);

      if (cellHeight !== Number(element.getAttribute('cell-height'))) {
        element.style.height = `${cellHeight}px`;
        element.setAttribute('cell-height', cellHeight.toString());
      }

      element.textContent = labels[i] || nbsp;
    }

    if (this.xAxis && this.config?.xAxis) {
      // TODO: Wrong crossBox margin calculation when margin = 0.5px
      this.crossBox.style.margin = `${this.cellMargin}px`;
      this.crossBox.style.height = `${(this.xAxis.children[0] as HTMLElement).offsetHeight}px`;
      this.crossBox.style.width = `${(this.yAxis.children[0] as HTMLElement).offsetWidth}px`;
    }
    else {
      this.crossBox.style.width = '0';
    }
  }

  /**
   * Tooltip renderer function
   * @returns tooltip template to be render
   */
  /* istanbul ignore next */
  private tooltipRenderer (): HTMLElement | undefined {
    if (this.hoverCell && this.canvasContext && this.tooltipCallback) {
      return this.tooltipCallback(this.hoverCell);
    }

    return undefined;
  }

  /**
   * Checks if the tooltip should display or not
   * @param target element target
   * @returns if the canvas target within canvas
   */
  /* istanbul ignore next */
  private tooltipCondition (target: Element): boolean {
    return target === this.tooltipOverlay;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
      <div id="container" @mousemove=${this.onMouseMove} @mouseleave=${this.onMouseLeave}>
        ${this.config?.yAxis && !this.axisHidden ? html`
        <div id="y-axis-container">
          <div part="cross-box"></div>
          <div part="y-axis"></div>
        </div>` : null}
        <div id="canvas-container">
          ${this.config?.xAxis && !this.axisHidden ? html`<div part="x-axis"></div>` : null}
          <ef-canvas part="canvas" @resize=${this.onCanvasResize}></ef-canvas>
          ${this.tooltipCallback ? html`<div id="tooltip-overlay"></div>` : null}
        </div>
      </div>
      ${this.tooltipCallback ? html`
        <ef-tooltip .condition=${this.tooltipCondition} .renderer=${this.tooltipRenderer}></ef-tooltip>
      ` : null}
    `;
  }
}
