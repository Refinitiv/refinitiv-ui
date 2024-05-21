import inputFormat from 'date-fns/esm/format/index.js';
import isValid from 'date-fns/esm/isValid/index.js';
import inputParse from 'date-fns/esm/parse/index.js';

import {
  CSSResultGroup,
  FormFieldElement,
  MultiValue,
  PropertyValues,
  TapEvent,
  TemplateResult,
  WarningNotice,
  css,
  html,
  nothing
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { query } from '@refinitiv-ui/core/decorators/query.js';

import '@refinitiv-ui/phrasebook/locale/en/datetime-picker.js';
import { TranslatePromise, TranslatePropertyKey, getLocale, translate } from '@refinitiv-ui/translate';
import {
  DateFormat,
  DateTimeFormat,
  addMonths,
  format,
  isAfter,
  isBefore,
  isValidDate,
  isValidDateTime,
  isWeekend,
  parse,
  subMonths
} from '@refinitiv-ui/utils/date.js';

import type { Calendar } from '../calendar';
import '../calendar/index.js';
import type { OpenedChangedEvent, ValueChangedEvent, ViewChangedEvent } from '../events';
import type { Icon } from '../icon';
import '../icon/index.js';
import type { Overlay } from '../overlay';
import '../overlay/index.js';
import type { TextField } from '../text-field';
import '../text-field/index.js';
import type { TimePicker } from '../time-picker';
import '../time-picker/index.js';
import { VERSION } from '../version.js';
import {
  CALENDAR_FROM_ID,
  CALENDAR_ID,
  CALENDAR_TO_ID,
  INPUT_FORMAT,
  INPUT_FROM_ID,
  INPUT_ID,
  INPUT_TO_ID,
  POPUP_POSITION,
  TIMEPICKER_FROM_ID,
  TIMEPICKER_ID,
  TIMEPICKER_TO_ID,
  TRANSLATION_KEYS
} from './constants.js';
import { getDateFNSLocale } from './locales.js';
import type { DatetimePickerDuplex, DatetimePickerFilter } from './types';
import { DateTimeSegment, formatToView, getCurrentTime } from './utils.js';

export type { DatetimePickerDuplex, DatetimePickerFilter };

/**
 * Control to pick date and time
 *
 * @fires opened-changed - Fired when the user opens or closes control's popup. The event is not triggered if `opened` property is changed programmatically.
 * @fires value-changed - Fired when the user commits a value change. The event is not triggered if `value` property is changed programmatically.
 * @fires error-changed - Fired when the user inputs invalid value. The event is not triggered if `error` property is changed programmatically.
 * @fires view-changed - Fired when the user changes view in calendar e.g. change to next month view. The event is not triggered if `view` property is changed programmatically.
 *
 * @attr {boolean} readonly - Set readonly state
 * @prop {boolean} [readonly=false] - Set readonly state
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 *
 * @attr {boolean} error - Set error state
 * @prop {boolean} [error=false] - Set error state
 *
 * @attr {boolean} warning - Set warning state
 * @prop {boolean} [warning=false] - Set warning state
 *
 * @attr {string} placeholder - Set placeholder text default depends on format
 * @prop {string} [placeholder="dd-MMM-yyyy"] - Set placeholder text default depends on format
 *
 * @slot header - Slot to add custom contents at the top of popup
 * @slot right - Slot to add custom contents at the right of popup
 * @slot footer - Slot to add custom contents at the bottom of popup
 * @slot left - Slot to add custom contents at the left of popup
 * @slot yyyy-MM-dd - Slot to add custom contents on any date cells e.g. `2023-01-01`. Use `yyyy` or `yyyy-MM` if the cell is year or month.
 * @slot from-yyyy-MM-dd - Slot to add custom contents on any date cells of left calendar in `duplex` mode e.g. `from-2023-01-01`. Use `from-yyyy` or `from-yyyy-MM` if the cell is year or month
 * @slot to-yyyy-MM-dd - Slot to add custom contents on any date cells of right calendar in `duplex` mode e.g. `to-2023-01-01`. Use `to-yyyy` or `to-yyyy-MM` if the cell is year or month
 */
@customElement('ef-datetime-picker')
export class DatetimePicker extends FormFieldElement implements MultiValue {
  /**
   * Element version number
   * @returns version number
   */
  static override get version(): string {
    return VERSION;
  }

  /**
   * A `CSSResultGroup` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @return CSS template
   */
  static override get styles(): CSSResultGroup {
    return css`
      :host {
        display: inline-block;
        height: 48px;
        outline: none;
        cursor: text;
      }
      [part='input-wrapper'] {
        display: flex;
        flex: 1;
      }
      [part='body'] {
        display: flex;
      }
      [part='timepicker-wrapper'] {
        display: flex;
        justify-content: space-between;
      }
      [part='timepicker-wrapper']:before,
      [part='timepicker-wrapper']:after {
        content: '';
      }
      [part='input'] {
        flex: 1;
        width: auto;
        height: auto;
        padding: 0;
        margin: 0;
      }
      [part='calendar-wrapper'] {
        display: inline-flex;
      }
      [part='icon'] {
        cursor: pointer;
      }
      :host([popup-disabled]) [part='icon'],
      :host([readonly]) [part='icon'] {
        pointer-events: none;
      }
    `;
  }

  private lazyRendered = false; /* speed up rendering by not populating popup window on first load */
  private calendarValues: string[] = []; /* used to store date information for calendars */
  private timepickerValues: string[] = []; /* used to store time information for timepickers */
  private inputValues: string[] = []; /* used to formatted datetime value for inputs */
  private inputSyncing = true; /* true when inputs and pickers are in sync. False while user types in input */

  private _min = '';
  private minDate = '';

  /** Aria label for 'TO' and 'FROM' value, resolved based on locale. */
  private toAriaLabel: string = TRANSLATION_KEYS.TO;
  private fromAriaLabel: string = TRANSLATION_KEYS.FROM;

  /**
   * Datetime picker internal translation strings
   */
  @translate({ mode: 'promise', scope: 'ef-datetime-picker' })
  protected labelTPromise!: TranslatePromise;

  /**
   * Set minimum date
   * @param min date
   * @default -
   */
  @property({ type: String })
  public set min(min: string) {
    if (!this.isValidValue(min)) {
      this.warnInvalidValue(min);
      min = '';
    }

    const oldMin = this.min;
    if (oldMin !== min) {
      this._min = min;
      this.minDate = min ? format(parse(min), DateFormat.yyyyMMdd) : '';
      this.requestUpdate('min', oldMin);
    }
  }
  public get min(): string {
    return this._min;
  }

  private _max = '';
  private maxDate = '';
  /**
   * Set maximum date
   * @param max date
   * @default -
   */
  @property({ type: String })
  public set max(max: string) {
    if (!this.isValidValue(max)) {
      this.warnInvalidValue(max);
      max = '';
    }

    const oldMax = this.max;
    if (oldMax !== max) {
      this._max = max;
      this.maxDate = max ? format(parse(max), DateFormat.yyyyMMdd) : '';
      this.requestUpdate('max', oldMax);
    }
  }
  public get max(): string {
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
   * @type {DatetimePickerFilter | null}
   */
  @property({ attribute: false })
  public filter: DatetimePickerFilter | null = null;

  /**
   * Set the first day of the week.
   * 0 - for Sunday, 6 - for Saturday
   * @param firstDayOfWeek The first day of the week
   */
  @property({ type: Number, attribute: 'first-day-of-week' })
  public firstDayOfWeek?: number;

  /**
   * Set to switch to range select mode
   */
  @property({ type: Boolean, reflect: true })
  public range = false;

  /**
   * Set to switch to multiple select mode
   * @ignore
   * @param multiple Multiple
   */
  /* c8 ignore start */
  @property({ type: Boolean })
  public set multiple(multiple: boolean) {
    new WarningNotice('multiple is not currently supported').show();
  }
  /* c8 ignore stop */
  /**
   * @ignore
   */
  public get multiple(): boolean {
    return false;
  }

  /**
   * Current date time value
   * @param value Calendar value
   * @default -
   */
  @property({ type: String })
  public override set value(value: string) {
    this.values = value ? [value] : [];
  }
  public override get value(): string {
    return this.values[0] || '';
  }

  private _values: string[] = []; /* list of values as passed by the user */
  private _segments: DateTimeSegment[] = []; /* filtered and processed list of values */
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
  public set values(values: string[]) {
    const oldValues = this._values;
    if (String(oldValues) !== String(values) || !values.length) {
      this._values = values;
      this.valuesToSegments();
      this.requestUpdate('_values', oldValues); /* segments are populated in update */
    }
  }
  public get values(): string[] {
    return this._segments.map((segment) => segment.value);
  }

  /**
   * Toggles 12hr time display
   */
  @property({ type: Boolean, attribute: 'am-pm', reflect: true })
  public amPm = false;

  /**
   * Flag to show seconds time segment in display.
   * Seconds are automatically shown when `hh:mm:ss` time format is provided as a value.
   */
  @property({ type: Boolean, attribute: 'show-seconds', reflect: true })
  public showSeconds = false;

  /**
   * Toggles the opened state of the list
   */
  @property({ type: Boolean, reflect: true })
  public opened = false;

  /**
   * Only open picker panel when calendar icon is clicked.
   * Clicking on the input will no longer open the picker.
   */
  @property({ type: Boolean, attribute: 'input-trigger-disabled' })
  public inputTriggerDisabled = false;

  /**
   * Disable input part of the picker
   */
  @property({ type: Boolean, attribute: 'input-disabled', reflect: true })
  public inputDisabled = false;

  /**
   * Disable the popup
   */
  @property({ type: Boolean, attribute: 'popup-disabled', reflect: true })
  public popupDisabled = false;

  private _format = '';
  /**
   * Set the datetime format
   * Based on date-fns formats (https://date-fns.org/)
   * @param format Date format
   * @default dd-MMM-yyyy
   */
  @property({ type: String })
  public set format(format: string) {
    const oldFormat = this._format;
    if (oldFormat !== format) {
      this._format = format;
      this.requestUpdate('format', oldFormat);
    }
  }
  public get format(): string {
    return (
      this._format ||
      (this.timepicker
        ? this.showSeconds
          ? this.amPm
            ? INPUT_FORMAT.DATETIME_SECONDS_AM_PM
            : INPUT_FORMAT.DATETIME_SECONDS
          : this.amPm
          ? INPUT_FORMAT.DATETIME_AM_PM
          : INPUT_FORMAT.DATETIME
        : INPUT_FORMAT.DATE)
    );
  }

  /**
   * Toggle to display the time picker
   */
  @property({ type: Boolean, reflect: true })
  public timepicker = false;

  /**
   * Display two calendar pickers.
   * @type {"" | "consecutive" | "split"}
   */
  @property({ type: String, reflect: true })
  public duplex: DatetimePickerDuplex | null = null;

  /**
   * Set the current calendar view.
   * Accepted format: 'yyyy-MM'
   * @param view view date
   * @default -
   */
  @property({ type: String })
  public set view(view: string) {
    this.views = view ? [view] : [];
  }
  public get view(): string {
    return this.views[0] || '';
  }

  private _views: string[] = [];
  /**
   * Set the current calendar views for duplex mode
   * Accepted format: 'yyyy-MM'
   * @param views view dates
   * @type {string[]}
   * @default []
   */
  @property({ attribute: false })
  public set views(views: string[]) {
    const oldViews = this._views;
    views = this.filterAndWarnInvalidViews(views);
    if (oldViews.toString() !== views.toString()) {
      this._views = views;
      this.requestUpdate('views', oldViews);
    }
  }
  public get views(): string[] {
    if (this._views.length) {
      return this._views;
    }

    const now = new Date();
    const from = this.values[0];

    if (!this.isDuplex()) {
      return [formatToView(from || now)];
    }

    const to = this.values[1];

    // default duplex mode
    if (
      this.isDuplexConsecutive() ||
      !from ||
      !to ||
      formatToView(from) === formatToView(to) ||
      isBefore(to, from)
    ) {
      return this.composeViews(formatToView(from || to || now), !from && to ? 1 : 0, []);
    }

    // duplex split if as from and to
    return [formatToView(from), formatToView(to)];
  }

  /**
   * Validates the input, marking the element as invalid if its value does not meet the validation criteria.
   * @returns {void}
   */
  public validateInput(): void {
    const hasError = this.hasError();
    if (this.error !== hasError) {
      this.error = hasError;
      this.notifyPropertyChange('error', this.error);
    }
  }

  @query('[part=icon]', true) private iconEl!: Icon;
  @query('[part=list]') private popupEl?: Overlay | null;
  @query('#timepicker') private timepickerEl?: TimePicker | null;
  @query('#timepicker-from') private timepickerFromEl?: TimePicker | null;
  @query('#timepicker-to') private timepickerToEl?: TimePicker | null;
  @query('#calendar') private calendarEl?: Calendar | null;
  @query('#calendar-from') private calendarFromEl?: Calendar | null;
  @query('#calendar-to') private calendarToEl?: Calendar | null;
  @query('#input') private inputEl?: TextField | null;
  @query('#input-from') private inputFromEl?: TextField | null;
  @query('#input-to') private inputToEl?: TextField | null;

  /**
   * Updates the element
   * @param changedProperties Properties that has changed
   * @returns {void}
   */
  protected override update(changedProperties: PropertyValues): void {
    if (changedProperties.has('opened') && this.opened) {
      this.lazyRendered = true;
    }
    // make sure to close popup for disabled
    if (this.opened && !this.canOpenPopup) {
      this.opened = false; /* this cannot be nor stopped nor listened */
    }

    if (
      changedProperties.has('_values') ||
      changedProperties.has(TranslatePropertyKey) ||
      changedProperties.has('format')
    ) {
      this.syncInputValues();
    }

    if (changedProperties.has('placeholder')) {
      this.placeholder = this.placeholder || this.format; /* `format` is the default value of `placeholder` */
    }

    if (this.shouldValidateValue(changedProperties)) {
      this.validateInput();
    }

    super.update(changedProperties);
  }

  /**
   * Called after the component is first rendered
   * @param changedProperties Properties which have changed
   * @returns {void}
   */
  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.addEventListener('keydown', this.onKeyDown);
    this.addEventListener('tap', this.onTap);
  }

  /**
   * Perform asynchronous update
   * @returns promise
   */
  protected override async performUpdate(): Promise<void> {
    [this.toAriaLabel, this.fromAriaLabel] = await Promise.all([
      this.labelTPromise(TRANSLATION_KEYS.TO),
      this.labelTPromise(TRANSLATION_KEYS.FROM)
    ]);

    void super.performUpdate();
  }

  /**
   * Overwrite validation method for value
   *
   * @param value value
   * @returns {boolean} result
   */
  protected override isValidValue(value: string): boolean {
    if (value === '') {
      return true;
    }
    // Need to check for the attribute to cover the case when
    // timepicker and value attributes are set
    return this.timepicker || this.hasAttribute('timepicker')
      ? isValidDateTime(value)
      : isValidDate(value, DateFormat.yyyyMMdd);
  }

  /**
   * Used to show a warning when the value does not pass the validation
   * @param value that is invalid
   * @returns {void}
   */
  protected override warnInvalidValue(value: string): void {
    new WarningNotice(
      `The specified value "${value}" does not conform to the required format. The format is ${
        this.timepicker ? '"yyyy-MM-ddThh:mm" followed by optional ":ss" or ":ss.SSS"' : '"yyyy-MM-dd"'
      }.`
    ).show();
  }

  /**
   * Show invalid view message
   * @param value Invalid value
   * @returns {void}
   */
  protected warnInvalidView(value: string): void {
    new WarningNotice(
      `The specified value "${value}" does not conform to the required format. The format is "yyyy-MM".`
    ).show();
  }

  /**
   * Convert value string array to date segments
   * Warn invalid value if passed value does not confirm a segment
   * @returns {void}
   */
  private valuesToSegments(): void {
    const newSegments = this.filterAndWarnInvalidValues(this._values).map((value) =>
      DateTimeSegment.fromString(value)
    );
    this._segments = newSegments;
    this.interimSegments = newSegments;
  }

  /**
   * Check if the value needs re-validation against min/max and format
   * @param changedProperties Properties which have changed
   * @returns needs re-validation
   */
  private shouldValidateValue(changedProperties: PropertyValues): boolean {
    // do not validate default value
    if (
      (changedProperties.has('_values') && changedProperties.get('_values') !== undefined) ||
      (changedProperties.has('min') && changedProperties.get('min') !== undefined) ||
      (changedProperties.has('max') && changedProperties.get('max') !== undefined) ||
      (changedProperties.has('showSeconds') && changedProperties.get('showSeconds') !== undefined) ||
      (changedProperties.has('weekdaysOnly') && changedProperties.get('weekdaysOnly') !== undefined) ||
      (changedProperties.has('weekendsOnly') && changedProperties.get('weekendsOnly') !== undefined)
    ) {
      return true;
    }

    return false;
  }

  /**
   * A helper method to make sure that only valid values are passed
   * Warn if passed value is invalid
   * @param values Values to check
   * @returns Filtered collection of values
   */
  private filterAndWarnInvalidValues(values: string[]): string[] {
    return values.map((value) => {
      if (this.isValidValue(value)) {
        return value;
      }

      this.warnInvalidValue(value);
      return '';
    });
  }

  /**
   * A helper method to make sure that only valid views are passed
   * Warn if passed view is invalid
   * @param views Views to check
   * @returns Filtered collection of values
   */
  private filterAndWarnInvalidViews(views: string[]): string[] {
    for (let i = 0; i < views.length; i += 1) {
      const view = views[i];
      if (!isValidDate(view, DateFormat.yyyyMM)) {
        this.warnInvalidView(view);
        return []; /* if at least one view is invalid, do not care about the rest to avoid empty views */
      }
    }
    return views;
  }

  /**
   * Return true if calendar is in duplex mode
   * @returns duplex
   */
  private isDuplex(): boolean {
    return this.isDuplexSplit() || this.isDuplexConsecutive();
  }

  /**
   * Return true if calendar is in duplex split mode
   * @returns duplex split
   */
  private isDuplexSplit(): boolean {
    return this.duplex === 'split';
  }

  /**
   * Return true if calendar is in duplex consecutive mode
   * @returns duplex consecutive
   */
  private isDuplexConsecutive(): boolean {
    return this.duplex === '' || this.duplex === 'consecutive';
  }

  /**
   * Stop syncing input values and picker values
   * @returns {void}
   */
  private disableInputSync(): void {
    this.inputSyncing = false;
  }

  /**
   * Start syncing input values and picker values
   * @returns {void}
   */
  private enableInputSync(): void {
    this.inputSyncing = true;
  }

  /**
   * Synchronise input values and values
   * @return {void}
   */
  private syncInputValues(): void {
    if (!this.inputSyncing) {
      return;
    }
    // input values cannot be populated off interim segments as require a valid date
    // date-fns formats to local if there is time info
    this.inputValues = this._segments.map((segment) => this.formatSegment(segment));
  }

  /**
   * Format date segment according to format and locale
   * @param segment Date segment
   * @returns formatted string
   */
  private formatSegment(segment: DateTimeSegment): string {
    return segment.value
      ? inputFormat(segment.getTime(), this.format, {
          locale: getDateFNSLocale(getLocale(this))
        })
      : '';
  }

  /**
   * Construct view collection
   * @param view The view that has changed
   * @param index View index (0 - single, or from); (1 - to)
   * @param [views=this.views] The original views collection
   * @returns the new view collection
   */
  private composeViews(view: string, index: number, views = this.views): string[] {
    view = formatToView(view);

    if (!this.isDuplex()) {
      return [view];
    }

    if (this.isDuplexConsecutive()) {
      if (index === 0) {
        /* from */
        return [view, formatToView(addMonths(view, 1))];
      } else {
        /* to */
        return [formatToView(subMonths(view, 1)), view];
      }
    }

    // duplex split
    if (index === 0) {
      // from. to must be after or the same when no value has been selected
      let after = views[1] || addMonths(view, 1);
      if (this.values.every((value) => !value) && isBefore(after, view)) {
        after = view;
      }

      return [view, formatToView(after)];
    }

    if (index === 1) {
      // to. from must be before or the same when no value has been selected
      let before = views[0] || subMonths(view, 1);
      if (this.values.every((value) => !value) && isAfter(before, view)) {
        before = view;
      }

      return [formatToView(before), view];
    }

    return [];
  }

  private _interimSegments: DateTimeSegment[] = [];
  /**
   * An interim collection of segments to push values when all parts are populated
   * and validated
   * @param segments Segments
   */
  private set interimSegments(segments: DateTimeSegment[]) {
    const interimSegments = segments.map((segment) => DateTimeSegment.fromDateTimeSegment(segment));
    this._interimSegments = interimSegments;
    // cannot populate calendar if from is after to, it looks broken
    this.calendarValues = this.isFromBeforeTo() ? interimSegments.map((segment) => segment.dateSegment) : [];
    this.timepickerValues = interimSegments.map((segment) => segment.timeSegment);
  }
  /**
   * Get interim segments. These are free to modify
   * @returns interim segments
   */
  private get interimSegments(): DateTimeSegment[] {
    return this._interimSegments;
  }

  /**
   * Submit interim segments to values.
   * Notify value-changed event.
   * @returns true if values have changed. False otherwise
   */
  private submitInterimSegments(): boolean {
    const oldSegments = this._segments;
    const newSegments = this.interimSegments;

    // compare if different
    if (oldSegments.toString() === newSegments.toString()) {
      return false;
    }

    const newValues = newSegments.map((segment) => segment.value);

    // validate
    for (let i = 0; i < newValues.length; i += 1) {
      /* need this step in case timepicker is not populated */
      if (!this.isValidValue(newValues[i])) {
        return false;
      }
    }

    this.notifyValuesChange(newValues);
    return true;
  }

  /**
   * Notify that values array has been changed
   * @param values A collection of string dates
   * @returns {void}
   */
  private notifyValuesChange(values: string[]): void {
    if (this.values.toString() !== values.toString()) {
      this.values = values;
      this.notifyPropertyChange('value', this.value);
    }
  }

  /**
   * Notify that views array has been changed
   * @param views A collection of string dates
   * @returns {void}
   */
  private notifyViewsChange(views: string[]): void {
    if (this._views.toString() !== views.toString()) {
      this.views = views;
      this.notifyPropertyChange('view', this.view);
    }
  }

  /**
   * Handles key input on datetime picker
   * @param event Key down event object
   * @returns {void}
   */
  private onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
        this.setOpened(true);
        break;
      case 'ArrowUp':
        !event.defaultPrevented && this.setOpened(false);
        break;
      default:
        return;
    }

    event.preventDefault();
  }

  /**
   * Handles key input on calendar picker
   * @param event Key down event object
   * @returns {void}
   */
  private onCalendarKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':
        this.resetViews();
        this.setOpened(false);
        break;
      default:
        return;
    }

    event.preventDefault();
  }

  /**
   * Handles key input on text field
   * @param event Key down event object
   * @returns {void}
   */
  private onInputKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':
        !this.opened && this.blur();
        this.setOpened(false);
        break;
      case 'Enter':
        this.toggleOpened();
        break;
      default:
        return;
    }

    event.preventDefault();
  }

  /**
   * Run on tap event
   * @param event Tap event
   * @returns {void}
   */
  private onTap(event: TapEvent): void {
    const path = event.composedPath();
    if (this.popupEl && path.includes(this.popupEl)) {
      return; /* popup is managed separately */
    }

    if (path.includes(this.iconEl)) {
      this.toggleOpened();
    } else if (!this.inputTriggerDisabled) {
      this.setOpened(true);
    }
  }

  /**
   * Run when popup opened flag changes
   * @param event opened-change event
   * @returns {void}
   */
  private onPopupOpenedChanged(event: OpenedChangedEvent): void {
    event.preventDefault(); /* re-target opened changed event */
    this.setOpened(event.detail.value);
  }

  /**
   * Run on calendar view-changed event
   * @param event view-changed event
   * @returns {void}
   */
  private onCalendarViewChanged(event: ViewChangedEvent): void {
    const index = event.target === this.calendarToEl ? 1 : 0; /* 0 - from, single; 1 - to */
    const view = event.detail.value;
    this.notifyViewsChange(this.composeViews(view, index));
  }

  /**
   * Run on calendar value-changed event
   * @param event value-changed event
   * @returns {void}
   */
  private onCalendarValueChanged(event: ValueChangedEvent): void {
    const values = (event.target as Calendar).values;
    this.interimSegments = values.map((value, index) => {
      const segment = this.interimSegments[index] || new DateTimeSegment();
      segment.dateSegment = value;

      if (this.timepicker && !segment.timeSegment) {
        segment.timeSegment = getCurrentTime(
          this.showSeconds
        ); /* populate time, as otherwise time picker looks broken */
      }

      return segment;
    });

    this.submitInterimSegments();

    // in duplex mode, avoid jumping on views
    // Therefore if any of values have changed, save the current view
    if (this.isDuplex() && this.calendarFromEl && this.calendarToEl) {
      this.notifyViewsChange([this.calendarFromEl.view, this.calendarToEl.view]);
    }

    // Close popup if there is no time picker
    const newValues = this.values;
    if (!this.timepicker && newValues[0] && (this.range ? newValues[1] : true)) {
      this.setOpened(false);

      /**
       * Custom cell selection delegates focus back to the text field when the overlay is closed,
       * causing a sync problem between the calendar and text field.
       * A workaround involves blurring the text field again.
       */
      this.isDuplex() ? this.inputFromEl?.blur() : this.inputEl?.blur();
    }
  }

  /**
   * Run on time-picker value-changed event
   * @param event value-changed event
   * @returns {void}
   */
  private onTimePickerValueChanged(event: ValueChangedEvent): void {
    const target = event.target as TimePicker;
    const index = target === this.timepickerToEl ? 1 : 0; /* 0 - from, single; 1 - to */
    const segment = this.interimSegments[index] || new DateTimeSegment();
    segment.timeSegment = target.value;
    this.interimSegments[index] = segment;
    this.submitInterimSegments();
  }

  /**
   * Run on input focus
   * @returns {void}
   */
  private onInputFocus(): void {
    this.disableInputSync();
  }

  /**
   * Run on input blur
   * @param event blur event
   * @returns {void}
   */
  private onInputBlur(event: FocusEvent): void {
    this.enableInputSync();

    // remove all code once strict formatting is supported in date-fns
    const index = event.target === this.inputToEl ? 1 : 0;
    const segment = this._segments[index];

    if (!segment || !segment.value) {
      return;
    }

    const formattedValue = segment ? this.formatSegment(segment) : '';
    if (formattedValue !== this.inputValues[index]) {
      const inputValues = [...this.inputValues];
      inputValues[index] = formattedValue;
      this.inputValues = inputValues;
      this.requestUpdate();
    }
  }

  /**
   * Run on input value-changed event
   * @param event value-changed event
   * @returns {void}
   */
  private onInputValueChanged(event: ValueChangedEvent): void {
    const target = event.target as TextField;
    const index = target === this.inputToEl ? 1 : 0; /* 0 - from, single; 1 - to */
    const inputValue = target.value;
    const inputValues = [...this.inputValues];
    inputValues[index] = inputValue;
    this.inputValues = inputValues;

    let dateString = '';

    if (inputValue) {
      const recoveryDate = (this.interimSegments[index] || new DateTimeSegment()).getTime();
      const date = inputParse(inputValue, this.format, recoveryDate, {
        locale: getDateFNSLocale(getLocale(this))
      });

      if (isValid(date)) {
        dateString = inputFormat(
          date,
          this.timepicker
            ? this.showSeconds
              ? DateTimeFormat.yyyMMddTHHmmss
              : DateTimeFormat.yyyMMddTHHmm
            : DateFormat.yyyyMMdd
        );
        this.resetViews(); /* user input should be treated similar to manually switching the views */
      }
    } else {
      this.resetViews();
    }

    this.interimSegments[index] = DateTimeSegment.fromString(dateString);
    this.submitInterimSegments();
    this.validateInput();
  }

  /**
   * Check if input format conforms to value format
   * @returns true if valid format
   */
  private isValidFormat(): boolean {
    const inputValues = this.inputValues;
    const values = this.values;

    // No need to format values to validate.
    // If input is invalid, value is not populated
    for (let i = 0; i < inputValues.length; i += 1) {
      if (inputValues[i] && !values[i]) {
        return false;
      }
    }

    return true;
  }

  /**
   * Check if `value` is within `min` and `max`
   * @returns true if value is within
   */
  private isValueWithinMinMax(): boolean {
    if (this.min || this.max) {
      for (let i = 0; i < this.values.length; i += 1) {
        const value = this.values[i];
        if (value) {
          // Value before min
          if (this.min && value !== this.min && isBefore(value, this.min)) {
            return false;
          }
          // Value after max
          if (this.max && value !== this.max && isAfter(value, this.max)) {
            return false;
          }
        }
      }
    }

    return true;
  }

  /**
   * Check if `from` is before or the same as `to`
   * @returns true if `from` is before or the same as `to`
   */
  private isFromBeforeTo(): boolean {
    if (this.range) {
      const from = this.values[0];
      const to = this.values[1];

      if (from && to) {
        if (parse(from).getTime() > parse(to).getTime()) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Check if `values` correspond to dates that are allowed within the conditions of weekdays or weekends
   * @returns false if `values` don't correspond to dates that are allowed within the conditions of weekdays or weekends.
   */
  private isValidDay(): boolean {
    for (const value of this.values) {
      if (this.weekdaysOnly && isWeekend(value)) {
        return false;
      }
      if (this.weekendsOnly && !isWeekend(value)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Check if datetime picker has an error
   * @returns true if error
   */
  private hasError(): boolean {
    return !(
      this.isValidFormat() &&
      this.isValueWithinMinMax() &&
      this.isFromBeforeTo() &&
      this.isValidDay()
    );
  }

  /**
   * Toggles the opened state of the list
   * @returns {void}
   */
  private toggleOpened(): void {
    this.setOpened(!this.opened);
  }

  /**
   * Return true if popup can be opened
   */
  private get canOpenPopup(): boolean {
    return !(this.disabled || this.readonly || this.popupDisabled);
  }

  /**
   * Set opened state with event
   * @param opened True if opened
   * @returns {void}
   */
  private setOpened(opened: boolean): void {
    if (opened && !this.canOpenPopup) {
      /* never allow to open popup if cannot do so */
      return;
    }

    if (this.opened !== opened && this.notifyPropertyChange('opened', opened, true)) {
      this.opened = opened;
    }
  }

  /**
   * Reset views to default
   * @returns {void}
   */
  private resetViews(): void {
    this.notifyViewsChange([]);
  }

  /**
   * Request to update slot on the calendar while the overlay is open
   * @returns void
   */
  public updateCalendarSlot(): void {
    if (this.opened) {
      this.requestUpdate();
    }
  }

  /**
   * Get time picker template
   * @param id Timepicker identifier
   * @param value Time picker value
   * @returns template result
   */
  private getTimepickerTemplate(
    id: 'timepicker' | 'timepicker-from' | 'timepicker-to',
    value = ''
  ): TemplateResult {
    return html`<ef-time-picker
      id="${id}"
      part="time-picker"
      .showSeconds=${this.showSeconds}
      .amPm=${this.amPm}
      .value=${value}
      @value-changed=${this.onTimePickerValueChanged}
    ></ef-time-picker>`;
  }

  /**
   * Create calendar slot
   * @param calendarId Calendar identifier
   * @returns calendarSlots slots that will cascade to calendar
   */
  private createCalendarSlots(calendarId: string): HTMLSlotElement[] | null {
    if (!this.opened) {
      return null;
    }

    const isValidDateSlot = (slot: Element, prefix = '') => {
      return new RegExp(`^${prefix}-?\\d{1,6}(-\\d{2}(-\\d{2})?)?$`).test(slot.slot);
    };

    const querySlots: Element[] | null = Array.from(this.querySelectorAll('[slot]'));
    return querySlots
      .filter((slot) => {
        const isToSlot = calendarId === CALENDAR_TO_ID && isValidDateSlot(slot, 'to-');
        const isFromSlot = calendarId === CALENDAR_FROM_ID && isValidDateSlot(slot, 'from-');
        const isISODateSlot = calendarId === CALENDAR_ID && isValidDateSlot(slot);
        return isToSlot || isFromSlot || isISODateSlot;
      })
      .map((slot) => {
        const newSlot = document.createElement('slot');
        newSlot.name = slot.slot;
        newSlot.slot = slot.slot.replace(/^(to|from)-/, '');
        return newSlot;
      });
  }

  /**
   * Get calendar template
   * @param id Calendar identifier
   * @param view Calendar view
   * @returns template result
   */
  private getCalendarTemplate(id: 'calendar' | 'calendar-from' | 'calendar-to', view = ''): TemplateResult {
    const slotContent = this.createCalendarSlots(id);
    return html`<ef-calendar
      part="calendar"
      id=${id}
      lang=${this.lang || nothing}
      .fillCells=${!this.isDuplex()}
      .range=${this.range}
      .multiple=${this.multiple}
      .min=${this.minDate}
      .max=${this.maxDate}
      .weekdaysOnly=${this.weekdaysOnly}
      .weekendsOnly=${this.weekendsOnly}
      .firstDayOfWeek=${this.firstDayOfWeek || nothing}
      .values=${this.calendarValues}
      .filter=${this.filter}
      .view=${view}
      @keydown=${this.onCalendarKeyDown}
      @view-changed=${this.onCalendarViewChanged}
      @value-changed=${this.onCalendarValueChanged}
      >${slotContent}</ef-calendar
    >`;
  }

  /**
   * Get calendar templates
   */
  private get calendarsTemplate(): TemplateResult {
    return html`
      ${this.getCalendarTemplate(this.isDuplex() ? CALENDAR_FROM_ID : CALENDAR_ID, this.views[0])}
      ${this.isDuplex() ? this.getCalendarTemplate(CALENDAR_TO_ID, this.views[1]) : undefined}
    `;
  }

  /**
   * Get timepicker templates
   */
  private get timepickersTemplate(): TemplateResult {
    // TODO: how can we add support timepicker with multiple?
    const values = this.timepickerValues;
    return html`
      ${this.getTimepickerTemplate(this.range ? TIMEPICKER_FROM_ID : TIMEPICKER_ID, values[0])}
      ${this.range ? html`<div part="input-separator"></div>` : undefined}
      ${this.range ? this.getTimepickerTemplate(TIMEPICKER_TO_ID, values[1]) : undefined}
    `;
  }

  /**
   * Get input template
   * @param id Input identifier
   * @param value Input value
   * @returns template result
   */
  private getInputTemplate(id: 'input' | 'input-from' | 'input-to', value = ''): TemplateResult {
    let label = this.inputAriaLabel ?? undefined;

    if (id === INPUT_FROM_ID) {
      label = label ? `${label} ${this.fromAriaLabel}` : this.fromAriaLabel;
    } else if (id === INPUT_TO_ID) {
      label = label ? `${label} ${this.toAriaLabel}` : this.toAriaLabel;
    }

    return html`
      <ef-text-field
        id=${id}
        aria-label=${label || nothing}
        part="input"
        transparent
        ?disabled="${this.disabled}"
        ?readonly="${this.readonly || this.inputDisabled}"
        .value=${value}
        .placeholder="${this.placeholder}"
        @focus=${this.onInputFocus}
        @blur=${this.onInputBlur}
        @keydown=${this.onInputKeyDown}
        @value-changed=${this.onInputValueChanged}
      ></ef-text-field>
    `;
  }

  /**
   * Template for rendering an icon
   */
  private get iconTemplate(): TemplateResult {
    return html` <ef-icon part="icon" icon="calendar"></ef-icon> `;
  }

  /**
   * Template for inputs
   * @returns inputTemplate
   */
  private get inputTemplates(): TemplateResult {
    const values = this.inputValues;

    return html`
      <div part="input-wrapper">
        ${this.getInputTemplate(this.range ? INPUT_FROM_ID : INPUT_ID, values[0])}
        ${this.range ? html`<div part="input-separator"></div>` : undefined}
        ${this.range ? this.getInputTemplate(INPUT_TO_ID, values[1]) : undefined} ${this.clearButtonTemplate}
      </div>
    `;
  }

  /**
   * Popup panel template
   */
  private get popupTemplate(): TemplateResult | undefined {
    if (this.lazyRendered) {
      return html`<ef-overlay
        tabindex="0"
        part="list"
        with-shadow
        no-cancel-on-esc-key
        no-autofocus
        .delegatesFocus=${true}
        .focusBoundary=${this}
        .positionTarget=${this}
        .position=${POPUP_POSITION}
        ?opened=${this.opened}
        @opened-changed=${this.onPopupOpenedChanged}>
          <div><slot name="header"></div>
          <div part="body">
            <div><slot name="left"></div>
            <div part="selectors-wrapper">
              <div part="calendar-wrapper">
                ${this.calendarsTemplate}
              </div>
              ${
                this.timepicker
                  ? html`<div part="timepicker-wrapper">${this.timepickersTemplate}</div>`
                  : undefined
              }
            </div>
            <div><slot name="right"></div>
          </div>
          <div><slot name="footer"></div>
        </ef-overlay>`;
    }
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected override render(): TemplateResult {
    return html` ${this.inputTemplates} ${this.iconTemplate} ${this.popupTemplate} `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ef-datetime-picker': DatetimePicker;
  }
}
