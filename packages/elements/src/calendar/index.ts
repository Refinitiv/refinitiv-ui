import {
  ControlElement,
  html,
  css,
  TemplateResult,
  CSSResultGroup,
  PropertyValues,
  MultiValue,
  WarningNotice
} from '@refinitiv-ui/core';
import type { DirectiveResult } from 'lit/directive.js';
import { customElement } from '@refinitiv-ui/core/lib/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/lib/decorators/property.js';
import { state } from '@refinitiv-ui/core/lib/decorators/state.js';
import { ifDefined } from '@refinitiv-ui/core/lib/directives/if-defined.js';
import { cache } from '@refinitiv-ui/core/lib/directives/cache.js';
import { guard } from '@refinitiv-ui/core/lib/directives/guard.js';
import { ref, createRef, Ref } from '@refinitiv-ui/core/lib/directives/ref.js';
import { VERSION } from '../version.js';
import { isIE } from '@refinitiv-ui/utils/lib/browser.js';
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
  toDateSegment,
  parse
} from '@refinitiv-ui/utils/lib/date.js';
import {
  NavigationGrid,
  NavigationRow,
  CellIndex,
  left,
  right,
  up,
  down,
  first,
  last
} from '@refinitiv-ui/utils/lib/navigation.js';
import {
  monthInfo,
  weekdaysNames,
  monthsNames,
  formatLocaleDate,
  ViewFormatTranslateParams
} from './utils.js';
import {
  translate,
  TranslateDirective,
  TranslatePromise,
  getLocale,
  TranslatePropertyKey
} from '@refinitiv-ui/translate';
import {
  RenderView,
  CalendarLocaleScope,
  FIRST_DAY_OF_WEEK,
  YEARS_PER_YEAR_VIEW,
  DAY_VIEW,
  YEAR_VIEW,
  MONTH_VIEW
} from './constants.js';
import type {
  Cell,
  Row,
  Comparator,
  CalendarFilter,
  CellSelectionModel,
  CellDivElement,
  NavigationMap,
  NavigationDirection
} from './types';
import type { Button } from '../button';
import './locales.js';
import '../button/index.js';
import '@refinitiv-ui/phrasebook/lib/locale/en/calendar.js';

export {
  CalendarFilter
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

  protected readonly defaultRole: string | null = 'group';

  /**
   * A `CSSResultGroup` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @return CSS template
   */
  static get styles (): CSSResultGroup {
    return css`
      :host {
        display: inline-block;
        position: relative;
      }
      [part~=aria-selection] {
        position: absolute;
        pointer-events: none;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
      [part~=navigation], [part~=navigation] section {
        display: flex;
        flex-flow: row nowrap;
      }
      [part~=navigation] {
        justify-content: space-between;
      }
      [part~=navigation] > div {
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

  /**
   * Reference to the view button
   */
  private viewBtnRef: Ref<Button> = createRef();

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
      this.requestUpdate('min', oldMin);
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
      this.requestUpdate('max', oldMax);
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
      this._activeCellIndex = null;
      this.requestUpdate('view', oldView);
    }
  }
  public get view (): string {
    /* as soon as user interaction has happened, always rely on view */
    return this._view || (this.value ? utcFormat(toDateSegment(this.value), DateFormat.yyyyMM) : format(new Date(), DateFormat.yyyyMM));
  }

  private localFirstDayOfWeek = FIRST_DAY_OF_WEEK; // used from locales. 0 stands for Sunday
  private localMonthsNames!: string[]; // resolved based on locale
  private localWeekdaysNames!: string[]; // resolved based on locale
  private localFullWeekdaysNames!: string[]; // resolved based on locale
  private _firstDayOfWeek: number | null = null; // used from setter

  /**
   * Set the first day of the week.
   * 0 - for Sunday, 6 - for Saturday
   * @param firstDayOfWeek The first day of the week
   * @type {number | null}
   * @default null
   */
  @property({ type: Number, attribute: 'first-day-of-week' })
  public set firstDayOfWeek (firstDayOfWeek: number) {
    firstDayOfWeek %= 7;
    const oldFirstDayOfWeek = this._firstDayOfWeek;
    if (oldFirstDayOfWeek !== firstDayOfWeek) {
      this._firstDayOfWeek = firstDayOfWeek;
      this.requestUpdate('firstDayOfWeek', oldFirstDayOfWeek);
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
   * @default []
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
      this.requestUpdate('values', oldValues);
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
  @translate({ mode: 'directive', scope: CalendarLocaleScope }) protected localeT!: TranslateDirective;
  @translate({ mode: 'promise', scope: CalendarLocaleScope }) protected localeTPromise!: TranslatePromise;
  @translate({ mode: 'directive', scope: 'ef-calendar' }) protected t!: TranslateDirective;

  /**
   * Used for internal navigation between render views
   */
  private _renderView: RenderView = RenderView.DAY;
  @state()
  private get renderView (): RenderView {
    return this._renderView;
  }
  private set renderView (renderView) {
    const oldRenderView = this._renderView;
    if (oldRenderView !== renderView) {
      this._renderView = renderView;
      // always reset active cell to not focus on potentially invalid cell
      this._activeCellIndex = null;
      this.requestUpdate('renderView', oldRenderView);
    }
  }

  /**
   * Used for keyboard navigation when trying
   * to restore focus on re-render and control navigation
   */
  private _activeCellIndex: CellIndex | null = null;
  @state()
  private get activeCellIndex (): CellIndex | null {
    return this._activeCellIndex;
  }
  private set activeCellIndex (activeCellIndex) {
    const oldCellIndex = this._activeCellIndex;
    if (String(activeCellIndex) !== String(oldCellIndex)) {
      this._activeCellIndex = activeCellIndex;
      this.requestUpdate('activeCellIndex', oldCellIndex);
    }
  }

  /**
   * Connected to role. If false, the values are not announced in the screen reader
   */
  @state()
  private announceValues = true;

  /**
   * Get an active element
   */
  private get activeElement (): Element | null {
    return (this.shadowRoot as ShadowRoot).activeElement;
  }

  private isDateAvailable: CalendarFilter | null = null; /* a constructed filter based on multiple local filters */

  static get observedAttributes (): string[] {
    const observed = super.observedAttributes;
    return ['role'].concat(observed);
  }

  public attributeChangedCallback (name: string, oldValue: string | null, newValue: string | null): void {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (name === 'role') {
      this.announceValues = !(!newValue || newValue === 'none' || newValue === 'presentation');
    }
  }

  /**
   * Perform asynchronous update
   * @returns promise
   */
  protected async performUpdate (): Promise<void> {
    const localFirstDayOfWeek = Number(await this.localeTPromise('FIRST_DAY_OF_WEEK'));
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
      const locale = getLocale(this);
      this.localMonthsNames = monthsNames(locale);
    }
    if (!this.localWeekdaysNames || changedProperties.has(TranslatePropertyKey)) {
      const locale = getLocale(this);
      this.localWeekdaysNames = weekdaysNames(locale);
      this.localFullWeekdaysNames = weekdaysNames(locale, 'long');
    }
    this.shouldConstructFilters(changedProperties) && this.constructFilters();

    super.update(changedProperties);
  }

  /**
   * Called after render life-cycle finished
   * @param changedProperties Properties which have changed
   * @return {void}
   */
  protected updated (changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    // This code is here to ensure that focus is not lost
    // while navigating through the render views using keyboard
    if (this.focused && changedProperties.has('renderView') && this.viewBtnRef.value && this.activeElement !== this.viewBtnRef.value) {
      this.viewBtnRef.value.focus();
    }

    const cellIndex = this.activeCellIndex;
    if (cellIndex && changedProperties.has('activeCellIndex')) {
      const matrix = this.navigationMap;
      const cell = matrix.map[`${cellIndex[0]}-${cellIndex[1]}`];
      if (cell && this.activeElement !== cell) {
        cell.focus();
      }
    }
  }

  /**
   * Run when an element has been first updated
   * @param changedProperties properties that was changed on first update
   * @returns {void}
   */
  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);

    this.renderRoot.addEventListener('keydown', event => this.onKeyDown(event as KeyboardEvent));
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
  private onKeyDown (event: KeyboardEvent): void {
    if (event.defaultPrevented) {
      return;
    }

    switch (event.key) {
      case ' ':
      case 'Enter':
      case 'Spacebar':
        this.onTableTap(event);
        break;
      case 'Esc':
      case 'Escape':
        if (this.renderView === RenderView.YEAR || this.renderView === RenderView.MONTH) {
          this.renderView = RenderView.DAY;
          break;
        }
        return;
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'Home':
      case 'End':
        void this.onNavigation(event.key);
        break;
      default:
        return;
    }

    event.preventDefault();
  }

  /**
   * Run when tap event happens ot table.
   * Select the values or switch the view
   * @param event Tap event
   * @returns {void}
   */
  private onTableTap (event: KeyboardEvent): void {
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
   * Get the navigation map matrix used for arrow keyboard navigation
   */
  private get navigationMap (): NavigationMap {
    let columnCount;
    switch (this.renderView) {
      case RenderView.YEAR:
        columnCount = YEAR_VIEW.columnCount;
        break;
      case RenderView.MONTH:
        columnCount = MONTH_VIEW.columnCount;
        break;
      default:
        columnCount = DAY_VIEW.columnCount;
    }

    const grid: NavigationGrid = [];
    const map: { [key: string]: CellDivElement; } = {};
    let row: NavigationRow = [];

    let rowIndex = 0;
    let columnIndex = 0;
    let active: CellIndex | undefined;

    const cells = this.renderRoot.querySelectorAll('[part~=cell][part~=day],[part~=cell][part~=year],[part~=cell][part~=month]');

    for (let i = 0; i < cells.length; i += 1) {
      const cell = cells[i] as CellDivElement;
      if (cell && cell.value && !cell.hasAttribute('disabled')) {
        row.push(1);
        map[`${columnIndex}-${rowIndex}`] = cell;
        if (cell.active) {
          active = [columnIndex, rowIndex];
        }
      }
      else {
        row.push(0);
      }

      columnIndex += 1;

      if (row.length % columnCount === 0) {
        grid.push(row);
        rowIndex += 1;
        columnIndex = 0;
        row = [];
      }
    }

    return {
      grid,
      map,
      active
    };
  }

  private async onNavigation (key: NavigationDirection): Promise<void> {
    const matrix = this.navigationMap;
    const grid = matrix.grid;

    switch (key) {
      case 'Home':
        this.activeCellIndex = first(grid);
        return;
      case 'End':
        this.activeCellIndex = last(grid);
        return;
      // no default
    }

    // no previously selected cell, but there is cell which is a candidate for navigation
    if (!this.activeCellIndex && matrix.active) {
      this.activeCellIndex = matrix.active;
      const cell = matrix.map[`${matrix.active[0]}-${matrix.active[1]}`];
      // current cell is already in focus (e.g. via Tab key, continue navigation from that point)
      if (!(this.activeElement === cell)) {
        return;
      }
    }

    const activeCellIndex = this.activeCellIndex;

    // All cells are disabled
    if (!activeCellIndex) {
      return;
    }

    // active cell is selected
    if (activeCellIndex) {
      let newActiveCell;
      switch (key) {
        case 'ArrowUp':
          newActiveCell = up(grid, activeCellIndex);
          break;
        case 'ArrowDown':
          newActiveCell = down(grid, activeCellIndex);
          break;
        case 'ArrowLeft':
          newActiveCell = left(grid, activeCellIndex);
          break;
        case 'ArrowRight':
          newActiveCell = right(grid, activeCellIndex);
          break;
        // no default
      }

      // Standard navigation withing the same view
      if (newActiveCell) {
        this.activeCellIndex = newActiveCell;
        return;
      }
    }

    // Jump to the next view
    switch (key) {
      // case 'ArrowUp': // it feels better not having Up/Down in these case
      case 'ArrowLeft':
        this.onPreviousTap();
        await this.updateComplete;
        await this.onNavigation('End');
        break;
      // case 'ArrowDown':
      case 'ArrowRight':
        this.onNextTap();
        await this.updateComplete;
        await this.onNavigation('Home');
        break;
      // no default
    }
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
      values = this.values.concat([]);
      const valueIdx = this.values.indexOf(value);
      if (valueIdx === -1) {
        values.push(value);
      }
      else {
        values.splice(valueIdx, 1);
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
      else if (this.values.indexOf(value) === -1) {
        values = [value];
      }
      else {
        // remove range if start/end index match
        values = [];
      }
    }
    else {
      values = this.value === value ? [] : [value];
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

    return html`${this.localeT('VIEW_FORMAT', {
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
   * Set an active state of the cell based
   * @param rows Rows to look through
   * @returns {void}
   * @private
   */
  private setActiveCell (rows: Row[]): void {
    const setActive = (cell?: Cell): void => {
      if (cell) {
        cell.active = true;
      }
    };

    const columnIdx = this.activeCellIndex ? this.activeCellIndex[0] : NaN;
    const rowIdx = this.activeCellIndex ? this.activeCellIndex[1] : NaN;

    // Selected cell is active or today cell or first available cell
    let activeCell;
    let nowCell;
    let firstCell;
    let selectedCell;

    for (let i = 0; i < rows.length; i += 1) {
      const row = rows[i];
      for (let e = 0; e < row.cells.length; e += 1) {
        const cell = row.cells[e];
        if (cell.disabled || !cell.value) {
          continue;
        }
        if (i === rowIdx && e === columnIdx) {
          activeCell = cell;
        }
        if (!selectedCell && cell.selected) {
          selectedCell = cell;
        }
        if (cell.now) {
          nowCell = cell;
        }
        if (!firstCell) {
          firstCell = cell;
        }
      }
    }

    // If a cell that was active before last render is not available now, remove index
    if (!activeCell && this.activeCellIndex) {
      this._activeCellIndex = null; // set on private to not cause another re-render
    }

    setActive(activeCell || selectedCell || nowCell || firstCell);
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
    this.setActiveCell(rows);

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
    const monthsNames = this.localMonthsNames;
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
    this.setActiveCell(rows);

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

    this.setActiveCell(rows);

    return html`
      ${guard([this.firstDayOfWeek, this.lang], () => this.renderWeekdayNames)}
      ${this.renderRows(rows)}
    `;
  }

  /**
   * Get weekday names template
   */
  private get renderWeekdayNames (): TemplateResult {
    const firstDayOfWeek = this.firstDayOfWeek;
    const weekdaysNames = this.localWeekdaysNames.slice(firstDayOfWeek).concat(this.localWeekdaysNames.slice(0, firstDayOfWeek));
    const fullWeekdaysNames = this.localFullWeekdaysNames.slice(firstDayOfWeek).concat(this.localFullWeekdaysNames.slice(0, firstDayOfWeek));

    return html`
      <div role="row"
           part="row day-name-row">${weekdaysNames.map((day, index) => html`
        <div scope="col" role="columnheader" part="cell day-name">
          <div aria-label="${fullWeekdaysNames[index]}" part="cell-content">
            <span aria-hidden="true">${day}</span>
          </div>
        </div>
      `)}</div>`;
  }

  /**
   * Render a view based on the current render view
   */
  private get viewRender (): TemplateResult {
    let renderView;
    switch (this.renderView) {
      case RenderView.MONTH:
        renderView = this.monthView;
        break;
      case RenderView.YEAR:
        renderView = this.yearView;
        break;
      case RenderView.DAY:
      default:
        renderView = this.dayView;
    }
    return html`${cache(renderView)}`;
  }

  /**
   * Get cell label based on value and selected state
   * @param cell Cell
   * @returns cell label directive
   */
  private getCellLabel (cell: Cell): DirectiveResult | undefined {
    if (!cell.value) {
      return undefined;
    }
    const value = parse(cell.value);
    const view = this.renderView;
    let key = 'CELL_LABEL';
    if (cell.selected && cell.now) {
      key = 'SELECTED_NOW';
    }
    else if (cell.selected) {
      key = 'SELECTED';
    }
    else if (cell.now) {
      key = 'NOW';
    }

    return this.t(key, { value, view });
  }

  /**
   * Render cell template. Cell can be a day, month or year
   * @param cell Cell object
   * @returns template result
   */
  private renderCell (cell: Cell): TemplateResult {
    const isSelectable = cell.value !== undefined && !cell.disabled;

    return html`<div
      role="gridcell"
      part="cell ${cell.view}"
      ?disabled=${cell.disabled}
      .active="${cell.active}"
      .value=${cell.value}
      ?idle=${cell.idle}
      ?today=${cell.now}
      ?first-date=${cell.firstDate}
      ?last-date=${cell.lastDate}
      ?selected=${cell.selected}
      aria-selected="${ifDefined(isSelectable ? (cell.selected ? 'true' : 'false') : undefined)}"
      ?range=${cell.range}
      ?range-from=${cell.rangeFrom}
      ?range-to=${cell.rangeTo}
      tabindex=${ifDefined(isSelectable ? (cell.active ? 0 : -1) : undefined)}>
        <div role="${ifDefined(cell.value ? 'button' : undefined)}"
             aria-disabled="${ifDefined(cell.disabled ? 'true' : undefined)}"
             aria-label="${ifDefined(this.getCellLabel(cell))}"
             part="cell-content${isSelectable ? ' selection' : ''}">${cell.text}</div>
    </div>`;
  }

  /**
   * Render view rows
   * @param rows A collection of rows with cells
   * @returns template result
   */
  private renderRows (rows: Row[]): TemplateResult[] {
    return rows.map(
      row => html`<div role="row" part="row">${row.cells.map(cell => this.renderCell(cell))}</div>`
    );
  }

  /**
   * Render button navigation template
   * @returns template result
   */
  private get buttonNavigationTemplate (): TemplateResult {
    let prevBtnAriaLabel = this.t('PREVIOUS_MONTH');
    let nextBtnAriaLabel = this.t('NEXT_MONTH');
    let viewBtnAriaLabel = this.t('YEAR_SELECTOR');

    switch (this.renderView) {
      case RenderView.YEAR:
        prevBtnAriaLabel = this.t('PREVIOUS_DECADE');
        nextBtnAriaLabel = this.t('NEXT_DECADE');
        viewBtnAriaLabel = this.t('DATE_SELECTOR');
        break;
      case RenderView.MONTH:
        prevBtnAriaLabel = this.t('PREVIOUS_YEAR');
        nextBtnAriaLabel = this.t('NEXT_YEAR');
        viewBtnAriaLabel = this.t('DATE_SELECTOR');
        break;
      // RenderView.DAY
      // no default
    }

    return html`<div part="navigation">
        <ef-button
          part="btn-prev"
          aria-label="${prevBtnAriaLabel}"
          icon="left"
          @tap=${this.onPreviousTap}></ef-button>
        <ef-button
          ${ref(this.viewBtnRef)}
          aria-description="${viewBtnAriaLabel}"
          part="btn-view"
          textpos="before"
          .icon="${this.renderView === RenderView.DAY ? 'down' : 'up'}"
          @tap="${this.onRenderViewTap}">${this.formattedViewRender}</ef-button>
        <ef-button
          part="btn-next"
          aria-label="${nextBtnAriaLabel}"
          icon="right"
          @tap=${this.onNextTap}></ef-button>
      </div>`;
  }

  /**
   * A template used to notify currently selected value for screen readers
   * @returns template result
   */
  private get selectionTemplate (): TemplateResult | undefined {
    if (!this.announceValues) {
      return;
    }
    return html`<div
      part="aria-selection"
      aria-live="polite"
      aria-label="${this.value
        ? this.range
          ? this.t('SELECTED_RANGE', { from: parse(this.values[0]), to: this.values[1] ? parse(this.values[1]) : null })
          : this.t('SELECTED_DATE', { value: parse(this.value), count: this.values.length })
        : this.t('SELECTED_NONE', { multiple: this.multiple, range: this.range })}"></div>`;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
      ${guard([this.values, this.lang, this.range, this.multiple, this.announceValues], () => this.selectionTemplate)}
      ${guard([this.view, this.renderView, this.lang], () => this.buttonNavigationTemplate)}
      <div role="grid"
           part="table"
           @tap=${this.onTableTap}>${this.viewRender}</div>
      <div part="footer"><slot name="footer"></slot></div>
    `;
  }
}
