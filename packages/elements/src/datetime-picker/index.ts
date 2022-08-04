import {
  ControlElement,
  html,
  css,
  TemplateResult,
  MultiValue,
  PropertyValues,
  CSSResultGroup,
  WarningNotice,
  FocusedPropertyKey
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { ref, createRef, Ref } from '@refinitiv-ui/core/directives/ref.js';
import { ifDefined } from '@refinitiv-ui/core/directives/if-defined.js';
import { live } from '@refinitiv-ui/core/directives/live.js';
import { VERSION } from '../version.js';
import type { OpenedChangedEvent, ViewChangedEvent, ValueChangedEvent, ErrorChangedEvent } from '../events';
import type {
  DatetimePickerDuplex,
  DatetimePickerFilter
} from './types';
import '../calendar/index.js';
import '../icon/index.js';
import '../overlay/index.js';
import '../datetime-field/index.js';
import '../time-picker/index.js';
import type { Calendar } from '../calendar';
import {
  translate,
  TranslateDirective
} from '@refinitiv-ui/translate';
import {
  addMonths,
  subMonths,
  isAfter,
  isBefore,
  format,
  toSegment,
  Locale,
  DateFormat,
  getFormat
} from '@refinitiv-ui/utils/date.js';

import {
  getCurrentSegment,
  formatToView,
  formatToDate,
  formatToTime,
  hasTimePicker,
  hasSeconds,
  hasDatePicker,
  hasAmPm
} from './utils.js';

import { preload } from '../icon/index.js';
import type { TimePicker } from '../time-picker';
import type { DatetimeField } from '../datetime-field';
import { resolvedLocale } from '../datetime-field/resolvedLocale.js';
import '@refinitiv-ui/phrasebook/locale/en/datetime-picker.js';

preload('calendar', 'down', 'left', 'right'); /* preload calendar icons for faster loading */

export type {
  DatetimePickerFilter,
  DatetimePickerDuplex
};

const POPUP_POSITION = ['bottom-start', 'top-start', 'bottom-end', 'top-end', 'bottom-middle', 'top-middle'];

/**
 * Control to pick date and time
 *
 * @fires opened-changed - Dispatched when when opened attribute changes internally
 * @fires value-changed - Dispatched when value changes
 * @fires error-changed - Dispatched when error state changes
 * @fires view-changed - Dispatched when internal view changes
 *
 * @attr {boolean} readonly - Set readonly state
 * @prop {boolean} [readonly=false] - Set readonly state
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 *
 * @slot header - Slot to add custom contents at the top of popup
 * @slot right - Slot to add custom contents at the right of popup
 * @slot footer - Slot to add custom contents at the bottom of popup
 * @slot left - Slot to add custom contents at the left of popup
 */
@customElement('ef-datetime-picker', {
  alias: 'emerald-datetime-picker'
})
export class DatetimePicker extends ControlElement implements MultiValue {

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
        display: inline-block;
        height: 48px;
        outline: none;
        cursor: text;
      }
      [part=input-wrapper] {
        display: flex;
        flex: 1;
      }
      [part=body] {
        display: flex;
      }
      [part=timepicker-wrapper] {
        display: flex;
        justify-content: space-between;
      }
      [part=timepicker-wrapper]:before,
      [part=timepicker-wrapper]:after {
        content: '';
      }
      [part=input] {
        flex: 1;
        width: auto;
        height: auto;
      }
      [part=calendar-wrapper] {
        display: inline-flex;
      }
      [part=button] {
        cursor: pointer;
      }
      :host([popup-disabled]) [part=button], :host([readonly]) [part=button] {
        pointer-events: none;
      }
    `;
  }

  private lazyRendered = false; /* speed up rendering by not populating popup window on first load */

  /**
   * Set minimum date.
   * This value must follow the `format` and be less
   * than or equal to the value of the `max` attribute
   */
  @property({ type: String, reflect: true })
  public min: string | null = null;

  /**
   * Set maximum date.
   * This value must follow the `format` and be greater
   * than or equal to the value of the `min` attribute
   */
  @property({ type: String, reflect: true })
  public max: string | null = null;

  /**
   * Toggle to display the time picker
   */
  @property({ type: Boolean, reflect: true })
  public timepicker = false;

  /**
   * Toggle to display the seconds
   */
  @property({ type: Boolean, attribute: 'show-seconds', reflect: true })
  public showSeconds = false;

  /**
   * Overrides 12hr time display format
   */
  @property({ type: Boolean, attribute: 'am-pm', reflect: true })
  public amPm = false;

  /**
   * Set the datetime format options based on
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
   * `formatOptions` overrides `timepicker` and `showSeconds` properties.
   * Note: time-zone is not supported
   */
  @property({ attribute: false })
  public formatOptions: Intl.DateTimeFormatOptions | null = null;

  /**
   * Set the Locale object.
   * `Locale` overrides `formatOptions`, `timepicker` and `showSeconds` properties.
   */
  @property({ attribute: false })
  public locale: Locale | null = null;

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
  public firstDayOfWeek: number | null = null;

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
  @property({ type: Boolean })
  public set multiple (multiple: boolean) {
    new WarningNotice('multiple is not currently supported').show();
  }
  /**
   * @ignore
   */
  public get multiple (): boolean {
    return false;
  }

  /**
   * Current date time value
   * @param value Calendar value
   * @default -
   */
  @property({ type: String })
  public set value (value: string) {
    this.values = value === '' ? [] : [value];
  }
  public get value (): string {
    return this.values[0] || '';
  }

  private _values: string[] = []; /* list of values as passed by the user */
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
    this._values = this.filterAndWarnInvalidValues(values);
    this.requestUpdate('values', oldValues);
  }
  public get values (): string[] {
    return this._values;
  }

  /**
   * Set placeholder text
   */
  @property({ type: String })
  public placeholder = '';

  /**
   * Toggles the opened state of the list
   */
  @property({ type: Boolean, reflect: true })
  public opened = false;

  /**
   * Set state to error
   */
  @property({ type: Boolean, reflect: true })
  public error = false;

  /**
   * Set state to warning
   */
  @property({ type: Boolean, reflect: true })
  public warning = false;

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
  public set view (view: string) {
    this.views = view ? [view] : [];
  }
  public get view (): string {
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
  public set views (views: string[]) {
    const oldViews = this._views;
    views = this.filterInvalidViews(views);
    if (String(oldViews) !== String(views)) {
      this._views = views;
      this.requestUpdate('views', oldViews);
    }
  }
  public get views (): string[] {
    if (this._views.length) {
      return this._views;
    }

    const now = format(new Date(), DateFormat.yyyyMM);
    const from = formatToView(this.values[0]);

    if (!this.isDuplex()) {
      return [from || now];
    }

    const to = formatToView(this.values[1]);

    // default duplex mode
    if (this.isDuplexConsecutive() || !from || !to || from === to || isBefore(to, from)) {
      return this.composeViews(from || to || now, !from && to ? 1 : 0, []);
    }

    // duplex split if as from and to
    return [from, to];
  }

  /**
   * Returns true if an input element contains valid data.
   * @returns true if input is valid
   */
  public checkValidity (): boolean {
    return (this.inputRef.value ? this.inputRef.value.checkValidity() : true)
      && (this.inputToRef.value ? this.inputToRef.value.checkValidity() : true)
      && this.isFromBeforeTo();
  }

  /**
   * Validate input. Mark as error if input is invalid
   * @returns false if there is an error
   */
  public reportValidity (): boolean {
    const hasError = !this.checkValidity();
    this.notifyErrorChange(hasError);
    return !hasError;
  }

  /**
   * Used for translations
   */
  @translate({ mode: 'directive', scope: 'ef-datetime-picker' }) protected t!: TranslateDirective;

  private timepickerRef: Ref<TimePicker> = createRef();
  private timepickerToRef: Ref<TimePicker> = createRef();
  private calendarRef: Ref<Calendar> = createRef();
  private calendarToRef: Ref<Calendar> = createRef();
  private inputRef: Ref<DatetimeField> = createRef();
  private inputToRef: Ref<DatetimeField> = createRef();

  /**
   * Returns true if Locale has time picker
   */
  protected get hasTimePicker (): boolean {
    return hasTimePicker(resolvedLocale(this).options);
  }

  /**
   * Returns true if Locale has seconds
   */
  protected get hasSeconds (): boolean {
    return hasSeconds(resolvedLocale(this).options);
  }

  /**
   * Returns true if Locale has date picker
   */
  protected get hasDatePicker (): boolean {
    return hasDatePicker(resolvedLocale(this).options);
  }

  /**
   * Returns true if Locale has 12h time format
   */
  protected get hasAmPm (): boolean {
    return hasAmPm(resolvedLocale(this).options);
  }

  /**
   * Called after render life-cycle finished
   * @param changedProperties Properties which have changed
   * @return {void}
   */
  protected updated (changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    // When the value is set externally it must override input values.
    // Do force value update
    if (changedProperties.has('values')) {
      this.syncInputValues();
    }
  }

  /**
   * Force synchronise input values with picker values
   * @returns {void}
   */
  protected syncInputValues (): void {
    this.inputRef.value && (this.inputRef.value.value = this.values[0] || '');
    this.inputToRef.value && (this.inputToRef.value.value = this.values[1] || '');
  }

  /**
   * Updates the element
   * @param changedProperties Properties that has changed
   * @returns {void}
   */
  protected willUpdate (changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('opened') && this.opened) {
      this.lazyRendered = true;
    }
    // make sure to close popup for disabled
    if (this.opened && !this.canOpenPopup) {
      this.opened = false; /* this cannot be nor stopped nor listened */
    }

    if (this.shouldValidateInput(changedProperties)) {
      this.validateInput();
    }
  }

  /**
   * Check if input should be re-validated
   * @param changedProperties Properties that has changed
   * @returns True if input should be re-validated
   */
  protected shouldValidateInput (changedProperties: PropertyValues): boolean {
    // TODO: this needs refactoring with all other fields to support common validation patterns
    return (changedProperties.has(FocusedPropertyKey) && !this.focused);
  }

  /**
   * Validate input according `pattern`, `minLength` and `maxLength` properties
   * change state of `error` property according pattern validation
   * @returns {void}
   */
  protected validateInput (): void {
    this.reportValidity();
  }

  /**
   * Reset error state on input
   * @returns {void}
   */
  protected resetError (): void {
    if (this.error && this.checkValidity()) {
      this.reportValidity();
    }
  }

  /**
   * Check if `from` is before or the same as `to`
   * @returns true if `from` is before or the same as `to`
   */
  protected isFromBeforeTo (): boolean {
    if (this.range) {
      const from = this.values[0];
      const to = this.values[1];

      if (from && to && from !== to) {
        return isBefore(from, to);
      }
    }

    return true;
  }

  /**
   * A helper method to make sure that only valid values are passed
   * Warn if passed value is invalid
   * @param values Values to check
   * @returns Filtered collection of values
   */
  private filterAndWarnInvalidValues (values: string[]): string[] {
    return values.map(value => {
      if (this.isValidValue(value)) {
        return value;
      }
      this.warnInvalidValue(value);
      return '';
    });
  }

  /**
   * A helper method to make sure that only valid views are passed
   * @param views Views to check
   * @returns Filtered collection of views
   */
  private filterInvalidViews (views: string[]): string[] {
    const filtered = [];

    // views must match in duplex mode
    if (views.length !== (this.isDuplex() ? 2 : 1)) {
      return [];
    }

    for (let i = 0; i < views.length && filtered.length <= 2; i += 1) {
      const view = views[0];
      // cannot have empty or invalid views
      if (typeof view !== 'string' || !view || getFormat(view) !== DateFormat.yyyyMM) {
        return [];
      }
      filtered.push(view);
    }

    return filtered;
  }

  /**
   * Show invalid value message
   * @param value Invalid value
   * @returns {void}
   */
  protected override warnInvalidValue (value: string): void {
    new WarningNotice(`The specified value "${value}" does not conform to the required format. The format is ${resolvedLocale(this).isoFormat}.`).once();
  }

  /**
   * Check if passed value is valid
   * @param value Value
   * @returns valid Validity
   */
  protected isValidValue (value: string): boolean {
    return value === '' ? true : typeof value === 'string' && getFormat(value) === resolvedLocale(this).isoFormat;
  }

  /**
   * Return true if calendar is in duplex mode
   * @returns duplex
   */
  private isDuplex (): boolean {
    return this.isDuplexSplit() || this.isDuplexConsecutive();
  }

  /**
   * Return true if calendar is in duplex split mode
   * @returns duplex split
   */
  private isDuplexSplit (): boolean {
    return this.duplex === 'split';
  }

  /**
   * Return true if calendar is in duplex consecutive mode
   * @returns duplex consecutive
   */
  private isDuplexConsecutive (): boolean {
    return this.duplex === '' || this.duplex === 'consecutive';
  }

  /**
   * Construct view collection
   * @param view The view that has changed
   * @param index View index (0 - single, or from); (1 - to)
   * @param [views=this.views] The original views collection
   * @returns the new view collection
   */
  private composeViews (view: string, index: number, views = this.views): string[] {
    view = formatToView(view);

    if (!this.isDuplex()) {
      return [view];
    }

    if (this.isDuplexConsecutive()) {
      if (index === 0) { /* from */
        return [view, addMonths(view, 1)];
      }
      else { /* to */
        return [subMonths(view, 1), view];
      }
    }

    // duplex split
    if (index === 0) { /* from. to must be after or the same */
      let after = views[1] || addMonths(view, 1);
      if (isBefore(after, view)) {
        after = view;
      }

      return [view, after];
    }

    if (index === 1) { /* to. from must be before or the same */
      let before = views[0] || subMonths(view, 1);
      if (isAfter(before, view)) {
        before = view;
      }

      return [before, view];
    }

    return [];
  }

  /**
   * Notify error if it has changed
   * @param hasError true if the element has an error
   * @returns {void}
   */
  protected notifyErrorChange (hasError: boolean): void {
    if (this.error !== hasError) {
      this.error = hasError;
      this.notifyPropertyChange('error', this.error);
    }
  }

  /**
   * Notify that values array has been changed
   * @param values A collection of string dates
   * @returns {void}
   */
  private notifyValuesChange (values: string[]): void {
    const oldValues = this.values;
    if (oldValues.toString() !== values.toString()) {
      // Silently set values, as in this case the value of inputs must not be updated
      this._values = values;
      this.requestUpdate('_values', oldValues);
      this.notifyPropertyChange('value', this.value);
    }
  }

  /**
   * Notify that views array has been changed
   * @param views A collection of string dates
   * @returns {void}
   */
  private notifyViewsChange (views: string[]): void {
    if (this._views.toString() !== views.toString()) {
      this.views = views;
      this.notifyPropertyChange('view', this.view);
    }
  }

  /**
   * Run on icon tap event
   * @returns {void}
   */
  private onButtonTap (): void {
    this.setOpened(true);
  }

  /**
   * Run when popup opened flag changes
   * @param event opened-change event
   * @returns {void}
   */
  private onPopupOpenedChanged (event: OpenedChangedEvent): void {
    event.preventDefault(); /* re-target opened changed event */
    this.setOpened(event.detail.value);
  }

  /**
   * Run on calendar view-changed event
   * @param event view-changed event
   * @returns {void}
   */
  private onCalendarViewChanged (event: ViewChangedEvent): void {
    // 0 - from, single; 1 - to
    const index = event.target === this.calendarToRef.value ? 1 : 0;
    const view = event.detail.value;
    this.notifyViewsChange(this.composeViews(view, index));
  }

  /**
   * Run on calendar value-changed event
   * @param event value-changed event
   * @returns {void}
   */
  private onCalendarValueChanged (event: ValueChangedEvent): void {
    const values = (event.target as Calendar).values;
    void this.synchroniseCalendarValues(values);

    // in duplex mode, avoid jumping on views
    // Therefore if any of values have changed, save the current view
    if (this.isDuplex() && this.calendarRef.value && this.calendarToRef.value) {
      this.notifyViewsChange([this.calendarRef.value.view, this.calendarToRef.value.view]);
    }

    // Close popup if there is no time picker
    const newValues = this.values;
    if (!this.timepicker && newValues[0] && (this.range ? newValues[1] : true)) {
      this.setOpened(false);
    }
  }

  /**
   * Run on time-picker value-changed event
   * @param event value-changed event
   * @returns {void}
   */
  private onTimePickerValueChanged (event: ValueChangedEvent): void {
    const target = event.target as TimePicker;
    // 0 - from, single; 1 - to
    const index = target === this.timepickerToRef.value ? 1 : 0;
    const values = [...this.values];
    values[index] = target.value;
    void this.synchroniseCalendarValues(values);
  }

  /**
   * Make sure that calendar and time-picker values
   * are merged together
   * @param values New values
   * @returns {void}
   */
  private async synchroniseCalendarValues (values: string[]): Promise<void> {
    const segments = values.map(value => value ? toSegment(value) : null);
    const oldSegments = this.values.map(value => value ? toSegment(value) : null);
    const newValues = segments.map((segment, idx) => segment ? format(Object.assign(getCurrentSegment(), oldSegments[idx] || {}, segment), resolvedLocale(this).isoFormat) : '');

    this.notifyValuesChange(newValues);

    await this.updateComplete;
    this.resetError();
  }

  /**
   * Run on input error-changed event
   * @param event error-changed event
   * @returns {void}
   */
  private onInputErrorChanged (event: ErrorChangedEvent): void {
    const hasError = event.detail.value;
    this.notifyErrorChange(hasError);
  }

  /**
   * Run on input value-changed event
   * @param event value-changed event
   * @returns {void}
   */
  private onInputValueChanged (event: ValueChangedEvent): void {
    const target = event.target as DatetimeField;
    // 0 - from, single; 1 - to
    const index = target === this.inputToRef.value ? 1 : 0;
    const newValues = [...this.values];
    newValues[index] = target.value;

    this.notifyValuesChange(newValues);
    this.resetError();
  }

  /**
   * Return true if popup can be opened
   */
  private get canOpenPopup (): boolean {
    return !(this.disabled || this.readonly || this.popupDisabled);
  }

  /**
   * Set opened state with event
   * @param opened True if opened
   * @returns {void}
   */
  private setOpened (opened: boolean): void {
    if (opened && !this.canOpenPopup) { /* never allow to open popup if cannot do so */
      return;
    }

    if (this.opened !== opened && this.notifyPropertyChange('opened', opened, true)) {
      if (!opened) {
        // Reset view when calendar closes.
        // On re-open it should re-focus on current dates
        this.resetViews();
      }
      this.opened = opened;
    }
  }

  /**
   * Reset views to default
   * @returns {void}
   */
  private resetViews (): void {
    this.notifyViewsChange([]);
  }

  /**
   * Get time picker template
   * @param [isTo=false] True for range to template
   * @returns template result
   */
  private getTimepickerTemplate (isTo = false): TemplateResult {
    return html`<ef-time-picker
      ${ref(isTo ? this.timepickerToRef : this.timepickerRef)}
      part="time-picker"
      .amPm=${this.hasAmPm}
      .value=${formatToTime(isTo ? (this.values[1] || '') : (this.values[0] || ''), this.hasSeconds)}
      @value-changed=${this.onTimePickerValueChanged}></ef-time-picker>`;
  }

  /**
   * Get calendar template
   * @param [isTo=false] True for range to template
   * @returns template result
   */
  private getCalendarTemplate (isTo = false): TemplateResult {
    return html`<ef-calendar
      ${ref(isTo ? this.calendarToRef : this.calendarRef)}
      part="calendar"
      lang=${ifDefined(this.lang || undefined)}
      .fillCells=${!this.isDuplex()}
      .range=${this.range}
      .multiple=${this.multiple}
      .min=${ifDefined(formatToDate(this.min) || undefined)}
      .max=${ifDefined(formatToDate(this.max) || undefined)}
      .weekdaysOnly=${this.weekdaysOnly}
      .weekendsOnly=${this.weekendsOnly}
      .firstDayOfWeek=${ifDefined(this.firstDayOfWeek === null ? undefined : this.firstDayOfWeek)}
      .values=${this.values.map(value => formatToDate(value))}
      .filter=${this.filter}
      .view=${isTo ? (this.views[1] || '') : (this.views[0] || '')}
      @view-changed=${this.onCalendarViewChanged}
      @value-changed=${this.onCalendarValueChanged}></ef-calendar>`;
  }

  /**
   * Get calendar templates
   */
  private get calendarsTemplate (): TemplateResult {
    return html`
      ${this.getCalendarTemplate()}
      ${this.isDuplex() ? this.getCalendarTemplate(true) : undefined}
    `;
  }

  /**
   * Get timepicker templates
   */
  private get timepickersTemplate (): TemplateResult {
    // TODO: how can we add support timepicker with multiple?
    return html`
      ${this.getTimepickerTemplate()}
      ${this.range
        ? html`<div part="input-separator"></div>${this.getTimepickerTemplate(true)}`
        : undefined}
    `;
  }

  /**
   * Get input template
   * @param [isTo=false] True for range to template
   * @returns template result
   */
  private getInputTemplate (isTo = false): TemplateResult {
    return html`
      <ef-datetime-field
        ${ref(isTo ? this.inputToRef : this.inputRef)}
        aria-label="${ifDefined(this.range ? this.t(isTo ? 'VALUE_TO' : 'VALUE_FROM') : undefined)}"
        part="input"
        transparent
        min=${ifDefined(this.min || undefined)}
        max=${ifDefined(this.max || undefined)}
        ?disabled=${this.disabled}
        ?readonly=${this.readonly || this.inputDisabled}
        .locale=${resolvedLocale(this)}
        .value=${live(isTo ? (this.values[1] || '') : (this.values[0] || ''))}
        .placeholder=${this.placeholder}
        @value-changed=${this.onInputValueChanged}
        @error-changed=${this.onInputErrorChanged}></ef-datetime-field>`;
  }

  /**
   * Template for rendering a button
   */
  private get buttonTemplate (): TemplateResult {
    return html`
      <button part="button"
              aria-haspopup="dialog"
              aria-label="${this.t('OPEN_CALENDAR')}"
              ?readonly="${this.readonly}"
              ?disabled="${this.popupDisabled}"
              @tap="${this.onButtonTap}">
        <ef-icon part="icon" icon="calendar"></ef-icon>
      </button>
    `;
  }

  /**
   * Template for inputs
   * @returns inputTemplate
   */
  private get inputTemplates (): TemplateResult {
    return html`
      <div part="input-wrapper">
        ${this.getInputTemplate()}
        ${this.range
          ? html`<div part="input-separator"></div>${this.getInputTemplate(true)}`
          : undefined}
      </div>
    `;
  }

  /**
  * Popup panel template
  */
  private get popupTemplate (): TemplateResult | undefined {
    if (this.lazyRendered) {
      const hasTime = this.hasTimePicker;
      const hasDate = this.hasDatePicker;

      return html`<ef-overlay
        role="dialog"
        aria-modal="true"
        aria-label="${this.t(`CHOOSE${
          hasDate ? '_DATE' : ''
        }${
          hasTime ? '_TIME' : ''
        }${
          this.range ? '_RANGE' : ''
        }`)}"
        part="list"
        with-shadow
        lock-position-target
        .delegatesFocus=${true}
        .positionTarget=${this}
        .position=${POPUP_POSITION}
        ?opened=${this.opened}
        @opened-changed=${this.onPopupOpenedChanged}>
          <div><slot name="header"></div>
          <div part="body">
            <div><slot name="left"></div>
            <div part="selectors-wrapper">
              ${hasDate ? html`<div part="calendar-wrapper">${this.calendarsTemplate}</div>` : undefined}
              ${hasTime ? html`<div part="timepicker-wrapper">${this.timepickersTemplate}</div>` : undefined}
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
  protected render (): TemplateResult {
    return html`
      ${this.inputTemplates}
      ${this.buttonTemplate}
      ${this.popupTemplate}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ef-datetime-picker': DatetimePicker;
  }
}
