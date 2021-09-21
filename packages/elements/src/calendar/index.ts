import {
  ControlElement,
  html,
  css,
  customElement,
  property,
  TemplateResult,
  CSSResult,
  ifDefined,
  PropertyValues,
  MultiValue,
  WarningNotice
} from '@refinitiv-ui/core';
import '../button/index.js';

import {
  DateSegment,
  DateFormat,
  format,
  utcFormat,
  utcParse,
  isValidDate,
  isWeekend,
  isAfter,
  isBefore,
  addMonths,
  subMonths,
  isToday,
  isThisMonth,
  isThisYear,
  isSameDay,
  isSameMonth,
  isSameYear,
  toDateSegment
} from '@refinitiv-ui/utils/lib/date';

import {
  monthInfo
} from './utils.js';

import './locales.js';
import {
  weekdaysNames,
  monthsNames,
  formatLocaleDate,
  ViewFormatTranslateParams
} from './locales.js';

import {
  translate,
  TranslateDirective,
  TranslatePromise,
  getLocale,
  TranslatePropertyKey
} from '@refinitiv-ui/translate';

import {
  RenderView,
  Cell,
  Row,
  Comparator,
  CalendarFilter,
  CellSelectionModel,
  CellDivElement
} from './types';
import { VERSION } from '../version.js';

export {
  CalendarFilter
};

const isIE = (/Trident/g).test(navigator.userAgent) || (/MSIE/g).test(navigator.userAgent);

const FIRST_DAY_OF_WEEK = 0; // 0 for Sunday
const YEARS_PER_YEAR_VIEW = 16; /* must be a square number */

const DAY_VIEW = {
  rowCount: 6,
  columnCount: 7,
  totalCount: 6 * 7
};

const YEAR_VIEW = {
  rowCount: 4,
  columnCount: 4,
  totalCount: 4 * 4
};

const MONTH_VIEW = {
  rowCount: 4,
  columnCount: 4,
  totalCount: 4 * 4
};

/**
 * Standard calendar element
 *
 * @fires value-changed - Fired when the `value` changes.
 * @fires view-changed - Fired when the `view` changes.
 *
 * @attr {boolean} readonly - Set readonly state
 * @prop {boolean} [readonly=false] - Set readonly state
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 *
 * @slot footer - Adds slotted content into the footer of the calendar control
 */
@customElement('ef-calendar', {
  alias: 'coral-calendar'
})
export class Calendar extends ControlElement implements MultiValue {

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
  static get styles (): CSSResult | CSSResult[] {
    return css`
      :host {
        display: inline-block;
      }
      [part=navigation], [part=navigation] section {
        display: flex;
        flex-flow: row nowrap;
      }
      [part=navigation] {
        justify-content: space-between;
      }
      [part=navigation] > div {
        display: flex;
        flex: 1;
        justify-content: center;
      }
      [part~=cell-content] {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        pointer-events: none;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      [part=navigation] [part] {
        flex: none;
      }
      [part=table] {
        width: 100%;
      }
      [part~=row] {
        display: flex;
        width: 100%;
      }
      [part~=cell] {
        position: relative;
      }
      [part~=cell][part~=year] {
        width: calc(100% / ${YEAR_VIEW.columnCount});
        padding-top: calc(100% / ${YEAR_VIEW.columnCount});
      }
      [part~=cell][part~=month] {
        width: calc(100% / ${MONTH_VIEW.columnCount});
        padding-top: calc(100% / ${MONTH_VIEW.columnCount});
      }
      [part~=cell][part~=day], [part~=cell][part~=day-name] {
        width: calc(100% / ${DAY_VIEW.columnCount});
        padding-top: calc(100% / ${DAY_VIEW.columnCount});
      }
      [part~=cell][tabindex] {
        cursor: pointer;
      }
    `;
  }

  private _min = '';
  /**
  * Set minimum date
  * @param min min date
  * @default -
  */
  @property({ type: String })
  public set min (min: string) {
    const oldMin = this._min;
    if (!this.isValidValue(min)) {
      this.warnInvalidValue(min);
      min = '';
    }
    if (oldMin !== min) {
      this._min = min;
      void this.requestUpdate('min', oldMin);
    }
  }
  public get min (): string {
    return this._min;
  }

  private _max = '';
  /**
  * Set maximum date
  * @param max max date
  * @default -
  */
  @property({ type: String })
  public set max (max: string) {
    const oldMax = this._max;
    if (!this.isValidValue(max)) {
      this.warnInvalidValue(max);
      max = '';
    }
    if (oldMax !== max) {
      this._max = max;
      void this.requestUpdate('max', oldMax);
    }
  }
  public get max (): string {
    return this._max;
  }

  /**
  * Only enable weekdays
  */
  @property({ type: Boolean, attribute: 'weekdays-only' })
  public weekdaysOnly = false;

  /**
  * Only enable weekends
  */
  @property({ type: Boolean, attribute: 'weekends-only' })
  public weekendsOnly = false;

  /**
  * Custom filter, used for enabling/disabling certain dates
  * @type {CalendarFilter | null}
  */
  @property({ attribute: false })
  public filter: CalendarFilter | null = null;

  private _view = '';
  /**
  * Current calendar view date
  * @param view view date
  * @default -
  */
  @property({ type: String })
  public set view (view: string) {
    if (view && !isValidDate(view, DateFormat.yyyyMM)) {
      this.warnInvalidView(view);
      view = '';
    }
    const oldView = this._view;
    if (oldView !== view) {
      this._view = view;
      void this.requestUpdate('view', oldView);
    }
  }
  public get view (): string {
    /* as soon as user interaction has happened, always rely on view */
    return this._view || (this.value ? utcFormat(toDateSegment(this.value), DateFormat.yyyyMM) : format(new Date(), DateFormat.yyyyMM));
  }

  private localFirstDayOfWeek = FIRST_DAY_OF_WEEK; // used from locales. 0 stands for Sunday
  private localMonthsNames!: string[]; // resolved based on locale
  private localWeekdaysNames!: string[]; // resolved based on locale


  private _firstDayOfWeek: number | null = null; // used from setter
  /**
   * Set the first day of the week.
   * 0 - for Sunday, 6 - for Saturday
   * @param firstDayOfWeek The first day of the week
   * @type {number | null}
   */
  @property({ type: Number, attribute: 'first-day-of-week' })
  public set firstDayOfWeek (firstDayOfWeek: number) {
    firstDayOfWeek %= 7;
    const oldFirstDayOfWeek = this._firstDayOfWeek;
    if (oldFirstDayOfWeek !== firstDayOfWeek) {
      this._firstDayOfWeek = firstDayOfWeek;
      void this.requestUpdate('firstDayOfWeek', oldFirstDayOfWeek);
    }
  }
  public get firstDayOfWeek (): number {
    return this._firstDayOfWeek === null ? this.localFirstDayOfWeek : this._firstDayOfWeek;
  }

  /**
  * Set to switch to range select mode
  */
  @property({ type: Boolean, reflect: true })
  public range = false;

  /**
  * Set to switch to multiple select mode
  */
  @property({ type: Boolean, reflect: true })
  public multiple = false;

  /**
  * Current date time value
  * @param value Calendar value
  * @default -
  */
  @property({ type: String })
  public set value (value: string) {
    this.values = [value];
  }
  public get value (): string {
    return this.values[0] || '';
  }

  private _values: string[] = [];
  /**
   * Set multiple selected values
   * @param values Values to set
   * @type {string[]}
   */
  @property({
    converter: {
      fromAttribute: function (value: string): string[] {
        return value.split(',');
      }
    }
  })
  public set values (values: string[]) {
    const oldValues = this._values;
    const newValues = this.filterAndWarnInvalidValues(values);

    if (oldValues.toString() !== newValues.toString()) {
      this._values = newValues;
      void this.requestUpdate('values', oldValues);
    }
  }
  public get values (): string[] {
    return this._values.concat();
  }

  /**
   * Fill head and tail cell dates
   */
  @property({ type: Boolean, attribute: 'fill-cells' })
  public fillCells = false;

  /**
   * Used for translations
   */
  @translate({ mode: 'directive', scope: 'ef-calendar' }) protected t!: TranslateDirective;
  @translate({ mode: 'promise', scope: 'ef-calendar' }) protected tPromise!: TranslatePromise;

  /**
   * Used for internal navigation between render views
   */
  @property({ type: String })
  private renderView: RenderView = RenderView.DAY;

  private isDateAvailable: CalendarFilter | null = null; /* a constructed filter based on multiple local filters */

  /**
   * Get weekday numbers.
   * Sort the list based on first day of the week
   */
  private get weekdaysNames (): string [] {
    const firstDayOfWeek = this.firstDayOfWeek;
    const localWeekdaysNames = this.localWeekdaysNames;
    return localWeekdaysNames.slice(firstDayOfWeek).concat(localWeekdaysNames.slice(0, firstDayOfWeek));
  }

  /**
   * Get localised month names from January to December
   */
  private get monthsNames (): string [] {
    return this.localMonthsNames;
  }

  /**
   * Perform asynchronous update
   * @returns promise
   */
  protected async performUpdate (): Promise<void> {
    const localFirstDayOfWeek = Number(await this.tPromise('FIRST_DAY_OF_WEEK'));
    this.localFirstDayOfWeek = isNaN(localFirstDayOfWeek) ? FIRST_DAY_OF_WEEK : (localFirstDayOfWeek % 7);
    void super.performUpdate();
  }

  /**
  * Updates the element
  * @param changedProperties Properties that has changed
  * @returns {void}
  */
  protected update (changedProperties: PropertyValues): void {
    if (!this.localMonthsNames || changedProperties.has(TranslatePropertyKey)) {
      this.localMonthsNames = monthsNames(getLocale(this));
    }
    if (!this.localWeekdaysNames || changedProperties.has(TranslatePropertyKey)) {
      this.localWeekdaysNames = weekdaysNames(getLocale(this));
    }
    this.shouldConstructFilters(changedProperties) && this.constructFilters();

    super.update(changedProperties);
  }

  /**
   * Run when an element has been first updated
   * @param changedProperties properties that was changed on first update
   * @returns {void}
   */
  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);

    this.renderRoot.addEventListener('keydown', event => this.onTableKeyDown(event as KeyboardEvent));
  }

  /**
   * Show invalid view message
   * @param value Invalid value
   * @returns {void}
   */
  protected warnInvalidView (value: string): void {
    new WarningNotice(`The specified value "${value}" does not conform to the required format. The format is "yyyy-MM".`).once();
  }

  /**
   * Show invalid value message
   * @param value Invalid value
   * @returns {void}
   */
  protected warnInvalidValue (value: string): void {
    new WarningNotice(`The specified value "${value}" does not conform to the required format. The format is "yyyy-MM-dd".`).once();
  }

  /**
  * Validate that the value confirms the control type
  * @param value Value to check
  * @returns false if value is invalid
  */
  protected isValidValue (value: string): boolean {
    return value === '' || isValidDate(value);
  }

  /**
   * A helper method to make sure that only valid values are passed
   * Warn if passed value is invalid
   * @param values Values to check
   * @returns Filtered collection of values
   */
  private filterAndWarnInvalidValues (values: string[]): string[] {
    const filtered: string[] = [];
    values.forEach(value => {
      if (this.isValidValue(value)) {
        value && filtered.push(value);
      }
      else {
        this.warnInvalidValue(value);
      }
    });
    return filtered;
  }

  /**
   * Check if there is a need to reconstruct filters
   * @param changedProperties properties that was changed on first update
   * @returns true if filter needs to be constructed
   */
  private shouldConstructFilters (changedProperties: PropertyValues): boolean {
    return changedProperties.has('min')
      || changedProperties.has('max')
      || changedProperties.has('weekdaysOnly')
      || changedProperties.has('weekendsOnly')
      || changedProperties.has('filter');
  }

  /**
   * Construct and store a collection of filters
   * First always comes default filters and last custom filters
   * @returns {void}
   */
  private constructFilters (): void {
    const filters: CalendarFilter[] = [];

    this.min && filters.push(date => isSameDay(date, this.min) || isAfter(date, this.min));
    this.max && filters.push(date => isSameDay(date, this.max) || isBefore(date, this.max));

    if (this.weekdaysOnly) {
      filters.push(date => !isWeekend(date));
    }

    if (this.weekendsOnly) {
      filters.push(date => isWeekend(date));
    }

    if (this.filter) {
      filters.push(this.filter);
    }

    const filtersLength = filters.length;

    if (filtersLength) {
      this.isDateAvailable = (value: string): boolean => {
        for (let i = 0; i < filtersLength; i += 1) {
          if (!filters[i](value)) {
            return false;
          }
        }

        return true;
      };
    }
    else {
      this.isDateAvailable = null;
    }
  }

  /**
   * Check if date cell is selected
   * @param value A value to compare
   * @param comparator A comparator to check for selection. Can be day, month or year
   * @returns true if cell is selected
   */
  private isDateCellSelected (value: string, comparator: Comparator): boolean {
    const values = this._values;
    const valuesLength = values.length;

    for (let i = 0; i < valuesLength; i += 1) {
      if (comparator(value, values[i])) {
        return true;
      }
    }

    return false;
  }

  /**
   * Get cell selection model, which is used to bind values and ranges
   * to cell styles
   * @param value A value to compare
   * @param comparator A comparator to check for selection. Can be day, month or year
   * @returns cell selection model
   */
  private getCellSelection (value: string, comparator: Comparator): CellSelectionModel {
    const values = this._values;
    const selected = this.isDateCellSelected(value, comparator);
    const from = values[0];
    const to = values[1];

    if (!this.range || !from || !to) {
      return {
        selected
      };
    }

    const rangeFrom = comparator(value, from);
    const rangeTo = comparator(value, to);
    const range = !rangeFrom && !rangeTo && isAfter(value, from) && isBefore(value, to);

    return {
      selected,
      range,
      rangeFrom,
      rangeTo
    };
  }

  /**
   * Run when next button is tapped.
   * Change current view to next view
   * @returns {void}
   */
  private onNextTap (): void {
    let viewSegment = toDateSegment(this.view);

    switch (this.renderView) {
      case RenderView.DAY:
        viewSegment = toDateSegment(addMonths(this.view, 1));
        break;
      case RenderView.MONTH:
        viewSegment.year += 1;
        break;
      case RenderView.YEAR:
        viewSegment.year += YEARS_PER_YEAR_VIEW;
        break;
      // no default
    }

    this.notifyViewChange(viewSegment);
  }

  /**
   * Run when previous button is tapped.
   * Change current view to previous view
   * @returns {void}
   */
  private onPreviousTap (): void {
    let viewSegment = toDateSegment(this.view);

    switch (this.renderView) {
      case RenderView.DAY:
        viewSegment = toDateSegment(subMonths(this.view, 1));
        break;
      case RenderView.MONTH:
        viewSegment.year -= 1;
        break;
      case RenderView.YEAR:
        viewSegment.year -= YEARS_PER_YEAR_VIEW;
        break;
      // no default
    }

    this.notifyViewChange(viewSegment);
  }

  /**
   * Run when change view button is tapped.
   * Switch between views
   * @returns {void}
   */
  private onRenderViewTap (): void {
    this.renderView = this.renderView === RenderView.DAY ? RenderView.YEAR : RenderView.DAY;
  }

  /**
   * Run when key down event happens on calendar
   * @param event Keyboard event
   * @returns {void}
   */
  private onTableKeyDown (event: KeyboardEvent): void {
    switch (event.key) {
      case ' ':
      case 'Enter':
      case 'Spacebar':
        event.preventDefault();
        this.onTableTap(event);
        break;
      case 'Esc':
      case 'Escape':
        if (this.renderView === RenderView.YEAR || this.renderView === RenderView.MONTH) {
          event.preventDefault();
          this.renderView = RenderView.DAY;
        }
        break;
      // no default
    }
  }

  /**
   * Run when tap event happens ot table.
   * Select the values or switch the view
   * @param event Tap event
   * @returns {void}
   */
  private onTableTap (event: Event): void {
    const cell = event.target as CellDivElement; /* here we just emulate interface */

    if (!cell || !cell.value) {
      return;
    }

    const cellSegment = toDateSegment(cell.value);
    const viewSegment = toDateSegment(this.view);

    if (this.renderView === RenderView.YEAR) { /* YEAR -> MONTH */
      viewSegment.year = cellSegment.year;
      if (this.notifyViewChange(viewSegment)) {
        this.renderView = RenderView.MONTH;
      }
      return;
    }

    if (this.renderView === RenderView.MONTH) { /* MONTH -> DAY */
      viewSegment.year = cellSegment.year;
      viewSegment.month = cellSegment.month;
      if (this.notifyViewChange(viewSegment)) {
        this.renderView = RenderView.DAY;
      }
      return;
    }

    this.onTapSelectValue(cell.value);
  }

  /**
   * Run when tap event happened on DAY view and the cell has the values
   * Try to select/deselect cell value
   * @param value Date string
   * @returns {void}
   */
  private onTapSelectValue (value: string): void {
    if (this.readonly || this.disabled) {
      return;
    }

    let values: string[];

    if (this.multiple) {
      values = this.values.filter(oldValue => {
        return oldValue !== value;
      });
      if (this.values.length === values.length) {
        values.push(value);
      }
    }
    else if (this.range) {
      if (!this.values.length) {
        values = [value];
      }
      else if (this.values.length === 1) { /* from is populated */
        const from = this.values[0];
        const to = value;

        if (isAfter(to, from) || isSameDay(to, from)) {
          values = [this.values[0], value];
        }
        else {
          values = [value];
        }
      }
      else {
        values = [value];
      }
    }
    else {
      values = [value];
    }

    this.notifyValuesChange(values);
  }

  /**
   * Notify that values array has been changed
   * @param values A collection of string dates
   * @returns {void}
   */
  private notifyValuesChange (values: string[]): void {
    if (this.values.toString() !== values.toString()) {
      this.values = values;
      this.notifyPropertyChange('value', this.value);
    }
  }

  /**
   * Notify that view has been changed
   * @param view Date
   * @returns {void}
   */
  private notifyViewChange (view: DateSegment): boolean {
    const viewString = utcFormat(view, DateFormat.yyyyMM);
    const res = this.notifyPropertyChange('view', viewString, true);
    if (res) {
      this.view = viewString;
    }
    return res;
  }

  /**
   * Localised format for render view
   * @param segment Segment object
   * @param includeMonth True to include a month
   * @returns template result
   */
  private viewFormattedDate (segment: DateSegment, includeMonth = false): TemplateResult {
    const year = segment.year;
    const isBC = year <= 0;
    const includeEra = isBC;
    const date = utcParse(segment);

    // Unfortunately IE11 does not support date formatting for year <= 0
    // Do manual conversion instead
    if (isIE && isBC) {
      return html`${formatLocaleDate(date, getLocale(this), includeMonth, includeEra)}`;
    }

    return html`${this.t('VIEW_FORMAT', {
      date,
      includeMonth,
      includeEra
    }, ViewFormatTranslateParams)}`;
  }

  /**
   * Get a string representation of current view
   * @returns template result
   */
  private get formattedViewRender (): TemplateResult {
    const segment = toDateSegment(this.view);

    switch (this.renderView) {
      case RenderView.MONTH:
        return this.viewFormattedDate(segment);
      case RenderView.YEAR:
        const month = segment.month;
        const day = segment.day;
        const fromYear = Math.floor(segment.year / YEARS_PER_YEAR_VIEW) * YEARS_PER_YEAR_VIEW;
        const toYear = fromYear + YEARS_PER_YEAR_VIEW - 1;
        return html`${this.viewFormattedDate({ year: fromYear, month, day })} - ${this.viewFormattedDate({ year: toYear, month, day })}`;
      case RenderView.DAY:
      default:
        return this.viewFormattedDate(segment, true);
    }
  }

  /**
   * Render cell content template.
   * If the cell is selectable (aka has value) add selection part
   * @param text Text to render
   * @param selectable True if cell may be selected
   * @returns template result
   */
  private renderContentBox (text = '', selectable = false): TemplateResult {
    return html`<div part="cell-content${selectable ? ' selection' : ''}">${text}</div>`;
  }

  /**
   * Get year view template
   */
  private get yearView (): TemplateResult {
    const view = RenderView.YEAR;
    const currentYear = toDateSegment(this.view).year;
    const startIdx = Math.floor(currentYear / YEARS_PER_YEAR_VIEW) * YEARS_PER_YEAR_VIEW;

    const years: Cell[] = [];
    const rows: Row[] = [];
    let cells: Cell[] = [];
    let cell: Cell;

    for (let i = 0; i < YEAR_VIEW.totalCount; i += 1) {
      if (i % YEAR_VIEW.columnCount === 0) {
        cells = [];
        rows.push({
          cells
        });
      }

      const year = startIdx + i;
      const value = utcFormat({ year, month: 0, day: 1 }, DateFormat.yyyyMMdd);
      cell = {
        view,
        text: year > 0 ? `${year}` : year === 0 ? '1' : `${Math.abs(year - 1)}`,
        value: `${year}`,
        now: isThisYear(value),
        ...this.getCellSelection(value, isSameYear)
      };
      cells.push(cell);
      years.push(cell);
    }
    years[0].firstDate = true;
    years[years.length - 1].lastDate = true;

    return html`${this.renderRows(rows)}`;
  }

  /**
   * Get month view template
   */
  private get monthView (): TemplateResult {
    const view = RenderView.MONTH;
    const currentYear = toDateSegment(this.view).year;
    const columnCount = MONTH_VIEW.columnCount;
    const monthCount = 12;
    const totalCount = MONTH_VIEW.totalCount;
    const monthsNames = this.monthsNames;
    const before = (totalCount - monthCount) / 2;
    const startIdx = monthCount - before % monthCount;
    const after = before + monthCount;

    const months: Cell[] = [];
    const rows: Row[] = [];
    let cell: Cell;
    let cells: Cell[] = [];

    for (let i = 0; i < totalCount; i += 1) {
      if (i % columnCount === 0) {
        cells = [];
        rows.push({
          cells
        });
      }

      const month = (startIdx + i) % monthCount; /* 0 for Jan, 11 for Dev */
      const year = currentYear + Math.floor((i - before) / monthCount);
      const segment = { year, month, day: 1 };
      const value = utcFormat(segment, DateFormat.yyyyMMdd);
      const idle = i < before || i >= after;
      cell = {
        view,
        text: monthsNames[month],
        value: utcFormat(segment, DateFormat.yyyyMM),
        idle,
        now: isThisMonth(value),
        ...this.getCellSelection(value, isSameMonth)
      };
      cells.push(cell);
      months.push(cell);
    }

    months[0].firstDate = true;
    months[months.length - 1].lastDate = true;

    return html`${this.renderRows(rows)}`;
  }

  /**
   * Get day view template
   */
  private get dayView (): TemplateResult {
    const view = RenderView.DAY;
    const firstDayOfWeek = this.firstDayOfWeek;
    const padding = (7 + utcParse(this.view).getUTCDay() - firstDayOfWeek) % 7;
    const viewMonth = monthInfo(this.view);
    const prevMonth = monthInfo(subMonths(this.view, 1));
    const nextMonth = monthInfo(addMonths(this.view, 1));

    const days: Cell[] = [];
    const rows: Row[] = [];
    let cells: Cell[] = [];

    let day: number;
    let month: number;
    let year: number;

    // Generate new cells.
    for (let i = 0; i < DAY_VIEW.totalCount; i += 1) {
      if (i % DAY_VIEW.columnCount === 0) {
        cells = [];
        rows.push({
          cells
        });
      }

      const datePadding = i - padding + 1;

      if (datePadding <= 0) {
        if (!this.fillCells) {
          cells.push({
            view
          });
          continue;
        }
        day = prevMonth.days + datePadding;
        month = prevMonth.month;
        year = prevMonth.year;
      }
      else if (datePadding > viewMonth.days) {
        if (!this.fillCells) {
          cells.push({
            view
          });
          continue;
        }

        day = datePadding - viewMonth.days;
        month = nextMonth.month;
        year = nextMonth.year;
      }
      else {
        day = datePadding;
        month = viewMonth.month;
        year = viewMonth.year;
      }

      const value = utcFormat({ year, month, day }, DateFormat.yyyyMMdd);
      const disabled = this.isDateAvailable ? !this.isDateAvailable(value) : false;
      const dayCell: Cell = {
        view,
        text: day.toString(),
        value,
        disabled,
        idle: month !== viewMonth.month || year !== viewMonth.year,
        now: isToday(value),
        ...this.getCellSelection(value, isSameDay)
      };

      cells.push(dayCell);
      days.push(dayCell);
    }

    days[0].firstDate = true;
    days[days.length - 1].lastDate = true;

    return html`
      ${this.renderWeekdayNames}
      ${this.renderRows(rows)}
    `;
  }

  /**
   * Get weekday names template
   */
  private get renderWeekdayNames (): TemplateResult {
    return html`
      <div part="row day-name-row">${this.weekdaysNames.map(day => html`<div part="cell day-name">${this.renderContentBox(day)}</div>`)}</div>
    `;
  }

  /**
   * Render a view based on the current render view
   */
  private get viewRender (): TemplateResult {
    switch (this.renderView) {
      case RenderView.MONTH:
        return this.monthView;
      case RenderView.YEAR:
        return this.yearView;
      case RenderView.DAY:
      default:
        return this.dayView;
    }
  }

  /**
   * Render cell template. Cell can be a day, month or year
   * @param cell Cell object
   * @returns template result
   */
  private renderCell (cell: Cell): TemplateResult {
    return html`<div
      part="cell ${cell.view}"
      ?disabled=${cell.disabled}
      .value=${cell.value}
      ?idle=${cell.idle}
      ?today=${cell.now}
      ?first-date=${cell.firstDate}
      ?last-date=${cell.lastDate}
      ?selected=${cell.selected}
      ?range=${cell.range}
      ?range-from=${cell.rangeFrom}
      ?range-to=${cell.rangeTo}
      tabindex=${ifDefined(cell.value !== undefined && !cell.disabled ? 0 : undefined)}
     >${this.renderContentBox(cell.text, cell.value !== undefined)}</div>`;
  }

  /**
   * Render view rows
   * @param rows A collection of rows with cells
   * @returns template result
   */
  private renderRows (rows: Row[]): TemplateResult[] {
    return rows.map(
      row => html`<div part="row">${row.cells.map(cell => this.renderCell(cell))}</div>`
    );
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
      <div part="navigation">
        <ef-button
          part="btn-prev"
          icon="left"
          @tap=${this.onPreviousTap}></ef-button>
        <ef-button
          part="btn-view"
          textpos="before"
          .icon="${this.renderView === RenderView.DAY ? 'down' : 'up'}"
          @tap="${this.onRenderViewTap}">${this.formattedViewRender}</ef-button>
        <ef-button
          part="btn-next"
          icon="right"
          @tap=${this.onNextTap}></ef-button>
      </div>
      <div part="table"
        @tap=${this.onTableTap}>${this.viewRender}</div>
      <div part="footer"><slot name="footer"></slot></div>
    `;
  }
}
