import {
  ControlElement,
  html,
  css,
  query,
  customElement,
  property,
  TemplateResult,
  CSSResult,
  PropertyValues
} from '@refinitiv-ui/core';
import '../number-field';
import { NumberField } from '../number-field';
import {
  isValidTime,
  toTimeSegment,
  TimeFormat,
  getFormat,
  format,
  isAM,
  isPM,
  MILLISECONDS_IN_SECOND,
  MILLISECONDS_IN_MINUTE,
  MILLISECONDS_IN_HOUR,
  addOffset,
  padNumber
} from '@refinitiv-ui/utils';
import { VERSION } from '../';

enum Segment {
  HOURS = 'hours',
  MINUTES = 'minutes',
  SECONDS = 'seconds'
}

const MIN_UNIT = 0;
const MAX_HOURS = 23;
const MAX_MINUTES = 59;
const MAX_SECONDS = 59;
const HOURS_IN_DAY = 24;
const HOURS_OF_NOON = 12;

const Placeholder = {
  HOURS: '--',
  MINUTES: '--',
  SECONDS: '--'
};

/**
 * Control the time input
 * @event value-changed - Dispatched when value changes
 *
 * @attr {boolean} readonly - Set readonly state
 * @prop {boolean} [readonly=false] - Set readonly state
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 */
@customElement('ef-time-picker', {
  alias: 'coral-time-picker'
})
export class TimePicker extends ControlElement {

  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  private isMobile = false;

  /**
   * Internal hours value, used only in value getters and setters
   */
  private _hours: number | null = null;

  /**
   * Internal minutes value, used only in value getters and setters
   */
  private _minutes: number | null = null;

  /**
   * Internal seconds value, used only in value getters and setters
   */
  private _seconds: number | null = null;

  /**
   * If external value is set with seconds, this flag is true.
   * The flag is not relevant when withSecond is forced to be true
   */
  private valueWithSeconds = false;

  /**
   * Hours time segment in 24hr format
   * @param hours hours value
   * @returns {void}
   */
  @property({ type: Number })
  public set hours (hours: number | null) {
    const oldHours = this.hours;
    if ((hours !== null && isNaN(hours)) || oldHours === hours) {
      return;
    }

    this._hours = this.validUnit(hours, MIN_UNIT, MAX_HOURS, oldHours);

    if (this._hours !== oldHours) {
      void this.requestUpdate('hours', oldHours);
    }
  }

  /**
   * Get hours value
   * @returns hours
   */
  public get hours (): number | null {
    return this._hours;
  }

  /**
   * Minutes time segment
   * @param minutes minutes value
   * @returns {void}
   */
  @property({ type: Number })
  public set minutes (minutes: number | null) {
    const oldMinutes = this.minutes;
    if ((minutes !== null && isNaN(minutes)) || oldMinutes === minutes) {
      return;
    }
    this._minutes = this.validUnit(minutes, MIN_UNIT, MAX_MINUTES, oldMinutes);
    if (this._minutes !== oldMinutes) {
      void this.requestUpdate('minutes', oldMinutes);
    }
  }

  /**
   * Get minutes value
   * @returns hours
   */
  public get minutes (): number | null {
    return this._minutes;
  }

  /**
   * Seconds time segment
   * @param seconds seconds value
   * @returns {void}
   */
  @property({ type: Number })
  public set seconds (seconds: number | null) {
    const oldSeconds = this.seconds;
    if ((seconds !== null && isNaN(seconds)) || oldSeconds === seconds) {
      return;
    }
    this._seconds = this.validUnit(seconds, MIN_UNIT, MAX_SECONDS, oldSeconds);
    if (this._seconds !== oldSeconds) {
      void this.requestUpdate('seconds', oldSeconds);
    }
  }

  /**
   * Get seconds value
   * @returns seconds
   */
  public get seconds (): number | null {
    return this._seconds;
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
  * Value of the element
  * @default -
  * @param value Element value
  */
  @property({ type: String })
  public set value (value: string) {
    const oldValue = this.value;
    value = this.castValue(value);
    if (!this.isValidValue(value)) {
      this.warnInvalidValue(value);
      // it does not make sense to clear value here, as the value is always defined
      return;
    }

    /* special case to reset hours, minutes and seconds */
    if (value === '' && (this.hours || this.minutes || this.seconds)) {
      this.hours = null;
      this.minutes = null;
      this.seconds = null;
      return;
    }

    if (oldValue !== value) { /** never store actual value, instead operate with hours/minutes/seconds */
      const info = toTimeSegment(value);
      const format = getFormat(value);
      this.valueWithSeconds = format === TimeFormat.HHmmss || format === TimeFormat.HHmmssSSS;
      this.hours = info.hours;
      this.minutes = info.minutes;
      this.seconds = info.seconds;
    }
  }
  public get value (): string {
    if (this.hours === null || this.minutes === null || (this.isShowSeconds && this.seconds === null)) {
      return '';
    }
    return this.currentTimeString;
  }

  /**
   * Getter for mtp element (mobile)
   */
  @query('#mtp')
  private mtpInput?: HTMLInputElement | null;

  /**
   * Getter for hours part.
   */
  @query('#hours')
  private hoursInput!: NumberField;

  /**
   * Getter for minutes part.
   */
  @query('#minutes')
  private minutesInput!: NumberField;

  /**
   * Getter for seconds part.
   */
  @query('#seconds')
  private secondsInput?: NumberField | null;

  /**
   * Getter for toggle part.
   */
  @query('#toggle')
  private toggleEl?: HTMLElement | null;

  /**
   * Return the current time string, based on the current hours, minutes and seconds.
   * Used internally to set the value string after updates.
   */
  private get currentTimeString (): string {
    return format({
      hours: this.hours || 0,
      minutes: this.minutes || 0,
      seconds: this.seconds || 0,
      milliseconds: 0
    }, this.isShowSeconds ? TimeFormat.HHmmss : TimeFormat.HHmm);
  }

  /**
   * Seconds are automatically shown when `hh:mm:ss` time format is provided as a value.
   */
  private get isShowSeconds (): boolean {
    return this.showSeconds || this.valueWithSeconds;
  }

  /**
   * Formats the hours value
   */
  private get formattedHours (): string {
    const _hours = this.hours;
    let hours = _hours;
    if (_hours !== null) {
      hours = this.amPm && _hours > HOURS_OF_NOON
        ? _hours - HOURS_OF_NOON : this.amPm && !_hours ? HOURS_OF_NOON : _hours;
    }

    return this.formattedUnit(hours);
  }

  /**
   * Formats the minutes value
   */
  private get formattedMinutes (): string {
    return this.formattedUnit(this.minutes);
  }

  /**
   * Formats the seconds value
   * @returns Formatted number
   */
  private get formattedSeconds (): string {
    return this.formattedUnit(this.seconds);
  }

  /**
   * On first updated life-cycle
   *
   * @param changedProperties changed properties
   * @returns {void}
   */
  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);

    // add events
    this.renderRoot.addEventListener('blur', this.onBlur, true);
    this.renderRoot.addEventListener('focus', this.onFocus, true);
    this.renderRoot.addEventListener('keydown', this.onKeydown, true);
  }

  /**
   * On updated life-cycle
   *
   * @param changedProperties changed properties
   * @returns {void}
   */
  protected updated (changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    /* istanbul ignore next */
    if (this.hasTimeChanged(changedProperties) && this.isMobile) {
      this.updateMobileTimePickerValue();
    }
  }

  /**
   * Overwrite validation method for value
   *
   * @param value value
   * @returns {boolean} result
   */
  protected isValidValue (value: string): boolean {
    return value === '' || isValidTime(value);
  }

  /**
   * Set time segment value in consistent way
   * @param segment Time segment
   * @param value Value to check
   * @returns {void}
   */
  protected setSegmentAndNotify (segment: Segment, value: number | null): void {
    const oldValue = this.value;
    switch (segment) {
      case Segment.HOURS:
        this.hours = value;
        break;
      case Segment.MINUTES:
        this.minutes = value;
        break;
      case Segment.SECONDS:
        this.seconds = value;
        break;
      // no default
    }

    // Pre-populate empty segments
    if (value !== null) {
      if (segment === Segment.HOURS && this.minutes === null) {
        this.minutes = 0;
      }
      if (this.isShowSeconds && this.seconds === null && (segment === Segment.HOURS || segment === Segment.MINUTES)) {
        this.seconds = 0;
      }
    }

    // verify value again, as time segment validation
    // might fail in setter and previous value returned
    if (oldValue !== this.value) {
      this.notifyPropertyChange('value', this.value);
    }
  }

  /**
   * True if time segment has changed
   * @param changedProperties changed properties
   * @returns True if changed
   */
  private hasTimeChanged (changedProperties: PropertyValues): boolean {
    return changedProperties.has('hours')
      || changedProperties.has('minutes')
      || changedProperties.has('seconds');
  }

  /**
   * Validates a given unit against a min and max value, returning a fallback if invalid.
   *
   * @param unit Unit to validate
   * @param min Minimum allowed
   * @param max Maximum allowed
   * @param fallback Fallback value to use, if unit is invalid
   * @returns unit or fallback or 0 value
   */
  private validUnit (unit: number | null, min: number, max: number, fallback: number | null): number | null {
    if (unit === null) {
      return null;
    }

    if (isNaN(unit) || unit < min || unit > max) {
      return fallback;
    }

    return unit;
  }

  /**
   * Handles value change from native time picker on mobile devices
   *
   * @param event Event Object
   * @returns {void}
   */
  /* istanbul ignore next */
  private onMobileTimeChange (event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
  }

  /**
   * Helper, used to update the mobile time picker value
   *
   * @returns {void}
   */
  /* istanbul ignore next */
  private updateMobileTimePickerValue (): void {
    if (this.mtpInput) {
      this.mtpInput.value = this.value;
    }
  }

  /**
   * Handles the blur event of any inputs
   *
   * @param event Event Object
   * @returns {void}
   */
  private onBlur = (event: Event): void => {
    if (this.readonly) {
      return;
    }

    const target = event.target as HTMLElement;
    const value = (target as NumberField).value;
    let segment;

    if (target === this.hoursInput) {
      segment = Segment.HOURS;
    }
    else if (target === this.minutesInput) {
      segment = Segment.MINUTES;
    }
    else if (target === this.secondsInput) {
      segment = Segment.SECONDS;
    }

    /* istanbul ignore next */
    if (!segment) {
      return;
    }

    if (value) {
      this.updateTimeSegmentTo(segment, Number(value));
    }

    this.updateSegmentValue(segment);
  }

  /**
   * Updates a time segment to the provided value
   *
   * @param segment Segment id
   * @param value Unit to change to
   * @returns {void}
   */
  private updateTimeSegmentTo (segment: Segment, value: number): void {
    if (segment === Segment.HOURS) {
      value = this.getHoursSegment(value);
    }
    this.setSegmentAndNotify(segment, value);
  }

  /**
   * Updates the value of a time segment (element)
   *
   * @param segment Segment's name
   * @returns {void}
   */
  private updateSegmentValue (segment: Segment): void {
    switch (segment) {
      case Segment.HOURS:
        this.updateHoursSegmentValue();
        break;
      case Segment.MINUTES:
        this.updateMinutesSegmentValue();
        break;
      case Segment.SECONDS:
        this.updateSecondsSegmentValue();
        break;

      // no default
    }
  }

  /**
   * Handles the focus event of any inputs
   *
   * @param event Event Object
   * @returns {void}
   */
  private onFocus = (event: Event): void => {
    if (this.readonly) {
      return;
    }
    (event.target as NumberField).value = '';
  }

  /**
   * Handles any keydown events
   * Used for control keys
   *
   * @param event Event Object
   * @returns {void}
   */
  private onKeydown = (event: Event): void => {
    this.manageControlKeys(event as KeyboardEvent);
  }

  /**
   * Handle valid control keys and execute their corresponding commands
   * Will stop when readonly is set
   *
   * @param event Event Object
   * @returns {void}
   */
  private manageControlKeys (event: KeyboardEvent): void {
    if (this.readonly || this.disabled) {
      return;
    }

    switch (event.key) {
      case 'Up': // IE
      case 'ArrowUp':
        this.handleUpKey(event);
        break;
      case 'Down': // IE
      case 'ArrowDown':
        this.handleDownKey(event);
        break;
      case 'Enter':
      case 'Spacebar':
      case ' ':
        this.handleEnterKey(event);
        break;
      case 'Backspace':
        this.handleBackspaceKey(event);
        return;
      default:
        return;
    }

    event.preventDefault();
  }

  /**
   * Handles ENTER key press
   *
   * @param event Event Object
   * @returns {void}
   */
  private handleEnterKey (event: KeyboardEvent): void {
    (event.target as NumberField).blur();
  }

  /**
   * Handles UP key press
   *
   * @param event Event Object
   * @returns {void}
   */
  private handleUpKey (event: KeyboardEvent): void {
    this.toggleOrModify(1, event.target as HTMLElement);
  }

  /**
   * Handle DOWN key press
   *
   * @param event Event Object
   * @returns {void}
   */
  private handleDownKey (event: KeyboardEvent): void {
    this.toggleOrModify(-1, event.target as HTMLElement);
  }

  /**
   * Handle Backspace key press
   *
   * @param event Event Object
   * @returns {void}
   */
  private handleBackspaceKey (event: KeyboardEvent): void {
    const target = event.target as EventTarget;

    if (target === this.hoursInput) {
      this.setSegmentAndNotify(Segment.HOURS, null);
    }
    else if (target === this.minutesInput) {
      this.setSegmentAndNotify(Segment.MINUTES, null);
    }
    else if (target === this.secondsInput) {
      this.setSegmentAndNotify(Segment.SECONDS, null);
    }
  }

  /**
   * Toggles the amPm flag or updates the time segment value.
   * Essentially a handler for user inputs on the control.
   *
   * @param amount to change value by
   * @param target Segment id
   * @returns {void}
   */
  private toggleOrModify (amount: number, target: HTMLElement): void {
    if (target === this.toggleEl) {
      this.toggle();
    }
    else if (target === this.hoursInput) {
      this.changeValueBy(amount, Segment.HOURS);
    }
    else if (target === this.minutesInput) {
      this.changeValueBy(amount, Segment.MINUTES);
    }
    else if (target === this.secondsInput) {
      this.changeValueBy(amount, Segment.SECONDS);
    }
  }

  /**
   * Changes a time segment value by a specified amount.
   * Also updates parent values when rolling through cycles.
   *
   * @param amount Amount to change by
   * @param segment Segment id
   * @returns {void}
   */
  private changeValueBy (amount: number, segment: Segment): void {
    let offset = 0;
    switch (segment) {
      case Segment.HOURS:
        offset = this.hours === null ? 0 : amount * MILLISECONDS_IN_HOUR;
        break;
      case Segment.MINUTES:
        offset = this.minutes === null ? 0 : amount * MILLISECONDS_IN_MINUTE;
        break;
      case Segment.SECONDS:
        offset = this.seconds === null ? 0 : amount * MILLISECONDS_IN_SECOND;
        break;
      // no default
    }

    const value = addOffset(this.currentTimeString, offset);
    this.setValueAndNotify(value);
  }

  /**
   * Gets the hours segment of the provided value
   * as there is extra logic required for 12hr support
   *
   * @param value Unit to change to
   * @returns updated value
   */
  private getHoursSegment (value: number): number {
    if (this.amPm) {
      if (value === HOURS_OF_NOON && this.isAM()) {
        value = 0;
      }
      if (this.isPM() && value < HOURS_OF_NOON) {
        value += HOURS_OF_NOON;
      }
    }

    return value;
  }

  /**
   * Updates the value of the hours element
   *
   * @returns {void}
   */
  private updateHoursSegmentValue (): void {
    if (this.hoursInput) {
      this.hoursInput.value = this.formattedHours;
    }
  }

  /**
   * Updated the value of the minutes element
   *
   * @returns {void}
   */
  private updateMinutesSegmentValue (): void {
    if (this.minutesInput) {
      this.minutesInput.value = this.formattedMinutes;
    }
  }

  /**
   * Updates the value of the seconds element
   *
   * @returns {void}
   */
  private updateSecondsSegmentValue (): void {
    if (this.secondsInput) {
      this.secondsInput.value = this.formattedSeconds;
    }
  }

  /**
   * Formats a given number and prefixes a 0 on numbers lower than 10
   *
   * @param n Number to format
   * @returns Formatted number
   */
  private formattedUnit (n: number | null): string {
    return n === null ? '' : padNumber(n, 2);
  }

  /**
   * Returns `true` or `false` depending on whether the hours are before, or, after noon
   *
   * @returns Result
   */
  private isAM (): boolean {
    return isAM(this.currentTimeString);
  }

  /**
   * Returns opposite of isAM
   *
   * @returns Result
   */
  private isPM (): boolean {
    return isPM(this.currentTimeString);
  }

  /**
   * Toggles the AM/PM state
   *
   * @returns {void}
   */
  public toggle (): void {
    if (this.amPm) {
      const hours = this.hours === null ? new Date().getHours() : (this.hours + HOURS_IN_DAY / 2) % HOURS_IN_DAY;
      this.setSegmentAndNotify(Segment.HOURS, hours);
    }
  }

  /**
   * A `CSSResult` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @returns CSS template
   */
  static get styles (): CSSResult | CSSResult[] {
    return css`
      :host {
        display: inline-flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: center;
        user-select:none;
        position: relative;
      }
      input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    `;
  }

  /**
   * Template for Seconds Segment
   *
   * @returns Seconds segment
   */
  private getSecondsHtml (): TemplateResult | null {
    return this.isShowSeconds ? html`
      <span part="divider"></span>
      <ef-number-field
        id="seconds"
        part="input"
        no-spinner
        min="${MIN_UNIT}"
        max="${MAX_SECONDS}"
        .value="${this.formattedSeconds}"
        placeholder="${this.formattedSeconds || Placeholder.SECONDS}"
        ?readonly="${this.readonly}"
        ?disabled="${this.disabled}"
        transparent></ef-number-field>
    ` : null;
  }

  /**
   * Template for AmPm Segment
   *
   * @returns Am/Pm segment
   */
  private getAmPmHtml (): TemplateResult | null {
    const hasHours = this.hours !== null;

    return this.amPm ? html`
      <div id="toggle" part="toggle" @tap=${this.toggle} tabindex="0">
        <div part="toggle-item" ?active=${hasHours && this.isAM()}>AM</div>
        <div part="toggle-item" ?active=${hasHours && this.isPM()}>PM</div>
      </div>
    ` : null;
  }


  /**
   * Native input's template for mobile
   *
   * @returns input
   */
  private getNativeInputForMobile (): TemplateResult | null {
    return this.isMobile ? html`<input id="mtp" type="time" @change=${this.onMobileTimeChange}>` : null;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @returns Render template
   */
  protected render (): TemplateResult {
    return html`
      <ef-number-field
        id="hours"
        part="input"
        no-spinner
        transparent
        min="${this.amPm ? 1 : MIN_UNIT}"
        max="${this.amPm ? HOURS_OF_NOON : MAX_HOURS}"
        .value="${this.formattedHours}"
        placeholder="${this.formattedHours || Placeholder.HOURS}"
        ?disabled="${this.disabled}"
        ?readonly="${this.readonly}"></ef-number-field>
      <span part="divider"></span>
      <ef-number-field
        id="minutes"
        part="input"
        no-spinner
        min="${MIN_UNIT}"
        max="${MAX_MINUTES}"
        .value="${this.formattedMinutes}"
        placeholder="${this.formattedMinutes || Placeholder.MINUTES}"
        ?readonly="${this.readonly}"
        ?disabled="${this.disabled}"
        transparent></ef-number-field>
      ${this.getSecondsHtml()}
      ${this.getAmPmHtml()}
      ${this.getNativeInputForMobile()}
    `;
  }
}
