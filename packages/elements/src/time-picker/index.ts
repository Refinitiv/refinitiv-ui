import {
  CSSResultGroup,
  FormFieldElement,
  PropertyValues,
  TemplateResult,
  css,
  html,
  nothing
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { query } from '@refinitiv-ui/core/decorators/query.js';
import { state } from '@refinitiv-ui/core/decorators/state.js';
import { guard } from '@refinitiv-ui/core/directives/guard.js';

import '@refinitiv-ui/phrasebook/locale/en/time-picker.js';
import { TranslateDirective, translate } from '@refinitiv-ui/translate';
import {
  MILLISECONDS_IN_HOUR,
  MILLISECONDS_IN_MINUTE,
  MILLISECONDS_IN_SECOND,
  MINUTES_IN_HOUR,
  SECONDS_IN_MINUTE,
  TimeFormat,
  addOffset,
  format,
  getFormat,
  isAM,
  isPM,
  isValidTime,
  padNumber,
  parse,
  toTimeSegment
} from '@refinitiv-ui/utils/date.js';

import type { FocusedChangedEvent, ValueChangedEvent } from '../events';
import type { NumberField } from '../number-field';
import '../number-field/index.js';
import { VERSION } from '../version.js';

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

const SegmentMap = {
  [Segment.HOURS]: {
    milliseconds: MILLISECONDS_IN_HOUR,
    cycle: HOURS_IN_DAY
  },
  [Segment.MINUTES]: {
    milliseconds: MILLISECONDS_IN_MINUTE,
    cycle: MINUTES_IN_HOUR
  },
  [Segment.SECONDS]: {
    milliseconds: MILLISECONDS_IN_SECOND,
    cycle: SECONDS_IN_MINUTE
  }
};

const Placeholder = {
  HOURS: '--',
  MINUTES: '--',
  SECONDS: '--'
};

/**
 * Control the time input
 * @event value-changed - Fired when the user commits a value change. The event is not triggered if `value` property is changed programmatically.
 * @event error-changed - Fired when user inputs invalid value. The event is not triggered if `error` property is changed programmatically.
 *
 * @attr {boolean} readonly - Set readonly state
 * @prop {boolean} [readonly=false] - Set readonly state
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 *
 * @attr {boolean} error - Set error state
 * @prop {boolean} [error=false] - Set error state
 */
@customElement('ef-time-picker')
export class TimePicker extends FormFieldElement {
  /**
   * Element version number
   * @returns version number
   */
  static override get version(): string {
    return VERSION;
  }

  protected override readonly defaultRole: string | null = 'group';

  /**
   * If time-picker is in mobile mode
   */
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
   * Disable automatic build-in validation checking for partial input of hour, minute & second (if applicable) segments
   */
  @property({ type: Boolean, attribute: 'custom-validation' })
  public customValidation = false;

  /**
   * Hours time segment in 24hr format
   * @param hours hours value
   * @default null
   * @returns {void}
   */
  @property({ type: Number })
  public set hours(hours: number | null) {
    const oldHours = this.hours;
    if ((hours !== null && isNaN(hours)) || oldHours === hours) {
      return;
    }

    this._hours = TimePicker.validUnit(hours, MIN_UNIT, MAX_HOURS, oldHours);

    if (this._hours !== oldHours) {
      this.requestUpdate('hours', oldHours);
    }
  }

  /**
   * Get hours value
   * @returns hours
   */
  public get hours(): number | null {
    return this._hours;
  }

  /**
   * Minutes time segment
   * @param minutes minutes value
   * @default null
   * @returns {void}
   */
  @property({ type: Number })
  public set minutes(minutes: number | null) {
    const oldMinutes = this.minutes;
    if ((minutes !== null && isNaN(minutes)) || oldMinutes === minutes) {
      return;
    }
    this._minutes = TimePicker.validUnit(minutes, MIN_UNIT, MAX_MINUTES, oldMinutes);
    if (this._minutes !== oldMinutes) {
      this.requestUpdate('minutes', oldMinutes);
    }
  }

  /**
   * Get minutes value
   * @returns minutes
   */
  public get minutes(): number | null {
    return this._minutes;
  }

  /**
   * Seconds time segment
   * @param seconds seconds value
   * @default null
   * @returns {void}
   */
  @property({ type: Number })
  public set seconds(seconds: number | null) {
    const oldSeconds = this.seconds;
    if ((seconds !== null && isNaN(seconds)) || oldSeconds === seconds) {
      return;
    }
    this._seconds = TimePicker.validUnit(seconds, MIN_UNIT, MAX_SECONDS, oldSeconds);
    if (this._seconds !== oldSeconds) {
      this.requestUpdate('seconds', oldSeconds);
    }
  }

  /**
   * Get seconds value
   * @returns seconds
   */
  public get seconds(): number | null {
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
   * Current time value
   * @param value Element value
   * @default -
   */
  @property({ type: String })
  public override set value(value: string) {
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

    if (oldValue !== value) {
      /** never store actual value, instead operate with hours/minutes/seconds */
      const info = toTimeSegment(value);
      const format = getFormat(value);
      this.valueWithSeconds = format === TimeFormat.HHmmss || format === TimeFormat.HHmmssSSS;
      this.hours = info.hours;
      this.minutes = info.minutes;
      this.seconds = info.seconds;
    }
  }
  public override get value(): string {
    if (!this.isCompleteValue) {
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
   * Used for translations
   */
  @translate({ mode: 'directive', scope: 'ef-time-picker' })
  protected t!: TranslateDirective;

  private _selectedSegment: Segment | null = null;
  /**
   * State to select text in the segment
   * Used to asynchronously select text after render cycle is complete
   * @param segment Selected segment or null
   */
  @state()
  private set selectedSegment(segment: Segment | null) {
    const oldSelectedSegment = this._selectedSegment;
    this._selectedSegment = segment;
    this.requestUpdate('selectedSegment', oldSelectedSegment);
  }
  private get selectedSegment(): Segment | null {
    return this._selectedSegment;
  }

  /**
   * Connected to role. If false, the values are not announced in the screen reader
   */
  @state()
  private announceValues = true;

  /**
   * Return the current time string, based on the current hours, minutes and seconds.
   * Used internally to set the value string after updates.
   */
  private get currentTimeString(): string {
    return format(
      {
        hours: this.hours || 0,
        minutes: this.minutes || 0,
        seconds: this.seconds || 0,
        milliseconds: 0
      },
      this.isShowSeconds ? TimeFormat.HHmmss : TimeFormat.HHmm
    );
  }

  /**
   * Seconds are automatically shown when `hh:mm:ss` time format is provided as a value.
   */
  private get isShowSeconds(): boolean {
    return this.showSeconds || this.valueWithSeconds;
  }

  /**
   * True if time value is complete, that is having all the required time segment
   */
  private get isCompleteValue(): boolean {
    return !(this.hours === null || this.minutes === null || (this.isShowSeconds && this.seconds === null));
  }

  /**
   * Get hours taking into account AM/PM placeholder
   */
  private get periodHours(): number | null {
    const _hours = this.hours;
    let hours = _hours;
    if (_hours !== null) {
      hours =
        this.amPm && _hours > HOURS_OF_NOON
          ? _hours - HOURS_OF_NOON
          : this.amPm && !_hours
          ? HOURS_OF_NOON
          : _hours;
    }

    return hours;
  }

  /**
   * Formats the hours value
   */
  private get formattedHours(): string {
    return TimePicker.formattedUnit(this.periodHours);
  }

  /**
   * Formats the minutes value
   */
  private get formattedMinutes(): string {
    return TimePicker.formattedUnit(this.minutes);
  }

  /**
   * Formats the seconds value
   */
  private get formattedSeconds(): string {
    return TimePicker.formattedUnit(this.seconds);
  }

  /**
   * Observes attribute change for `attributeChangedCallback`
   */
  static override get observedAttributes(): string[] {
    const observed = super.observedAttributes;
    return ['role'].concat(observed);
  }

  /**
   * Synchronizes attribute value
   * @param name attribute name
   * @param oldValue old attribute value
   * @param newValue new attribute value
   * @returns {void}
   */
  public override attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ): void {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (name === 'role') {
      this.announceValues = !(!newValue || newValue === 'none' || newValue === 'presentation');
    }
  }

  /**
   * On first updated life-cycle
   * @param changedProperties changed properties
   * @returns {void}
   */
  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.renderRoot.addEventListener('keydown', this.onKeydown, true);
  }

  /**
   * On updated life-cycle
   * @param changedProperties changed properties
   * @returns {void}
   */
  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    /* c8 ignore start */
    if (TimePicker.hasTimeChanged(changedProperties) && this.isMobile) {
      this.updateMobileTimePickerValue();
    }
    /* c8 ignore stop */

    if (this.selectedSegment && changedProperties.has('selectedSegment')) {
      void this.selectSegment();
    }
  }

  /**
   * Select text in input when update element is complete
   * @returns returns a promise void
   */
  private async selectSegment(): Promise<void> {
    await this.updateComplete;
    switch (this.selectedSegment) {
      case Segment.HOURS:
        this.hoursInput.select();
        break;
      case Segment.MINUTES:
        this.minutesInput.select();
        break;
      case Segment.SECONDS:
        this.secondsInput?.select();
        break;
      // no default
    }

    // Silently clear selected segment to ensure it can be reselected
    this._selectedSegment = null;
  }

  /**
   * Overwrite validation method for value
   * @param value value
   * @returns True if value is valid
   */
  protected override isValidValue(value: string): boolean {
    return value === '' || isValidTime(value);
  }

  /**
   * Set time segment value in consistent way
   * @param segment Time segment
   * @param value Value to check
   * @returns {void}
   */
  protected setSegmentAndNotify(segment: Segment, value: number | null): void {
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
  private static hasTimeChanged(changedProperties: PropertyValues): boolean {
    return (
      changedProperties.has('hours') || changedProperties.has('minutes') || changedProperties.has('seconds')
    );
  }

  /**
   * Validates a given unit against a min and max value, returning a fallback if invalid.
   * @param unit Unit to validate
   * @param min Minimum allowed
   * @param max Maximum allowed
   * @param fallback Fallback value to use, if unit is invalid
   * @returns unit or fallback or 0 value
   */
  private static validUnit(
    unit: number | null,
    min: number,
    max: number,
    fallback: number | null
  ): number | null {
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
   * @param event Event Object
   * @returns {void}
   */
  /* c8 ignore start */
  private onMobileTimeChange(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
  }
  /* c8 ignore stop */

  /**
   * Helper, used to update the mobile time picker value
   * @returns {void}
   */
  /* c8 ignore start */
  private updateMobileTimePickerValue(): void {
    if (this.mtpInput) {
      this.mtpInput.value = this.value;
    }
  }
  /* c8 ignore stop */

  /**
   * Handles action when input focused change
   * @param event Focus change event
   * @returns {void}
   */
  private onInputFocusedChanged(event: FocusedChangedEvent): void {
    const target = event.target as NumberField;
    const focused = event.detail.value;
    let segment;

    if (target === this.hoursInput) {
      segment = Segment.HOURS;
    } else if (target === this.minutesInput) {
      segment = Segment.MINUTES;
    } else if (target === this.secondsInput) {
      segment = Segment.SECONDS;
    }

    this.selectedSegment = focused && segment ? segment : null;

    /* c8 ignore start */
    if (!segment || this.readonly) {
      return;
    }
    /* c8 ignore stop */

    const value = target.value;
    if (value) {
      this.updateTimeSegmentTo(segment, Number(value));
    }

    this.updateSegmentValue(segment);

    if (!this.customValidation) {
      this.reportValidity();
    }
  }

  /**
   * Handles action when input value changes
   * @param event Value change event
   * @returns {void}
   */
  private onInputValueChanged(event: ValueChangedEvent): void {
    // Make sure that the value can be reset to null
    if (!event.detail.value) {
      const target = event.target;

      if (target === this.hoursInput) {
        this.setSegmentAndNotify(Segment.HOURS, null);
      } else if (target === this.minutesInput) {
        this.setSegmentAndNotify(Segment.MINUTES, null);
      } else if (target === this.secondsInput) {
        this.setSegmentAndNotify(Segment.SECONDS, null);
      }
    }
  }

  /**
   * Returns `true` if all input segments contain valid data or empty. Otherwise, returns false.
   * @returns true if input is valid
   */
  public override checkValidity(): boolean {
    const hours = this.hoursInput?.value;
    const minutes = this.minutesInput?.value;
    const seconds = this.secondsInput?.value;
    // If no values are provided in all segment, there is no error
    if (!hours && !minutes && !seconds) {
      return true;
    }

    const checkValues = (value: string | undefined, maxUnit: number) => {
      if (!value) {
        return false;
      }
      const _value = Number(value);
      return TimePicker.validUnit(_value, MIN_UNIT, maxUnit, null) === _value;
    };

    const validHour = checkValues(hours, MAX_HOURS);
    const validMinute = checkValues(minutes, MAX_MINUTES);
    const validSecond = checkValues(seconds, MAX_SECONDS);
    // Check second only when it's enabled
    return validHour && validMinute && (!this.isShowSeconds || validSecond);
  }

  /**
   * Validate input. Mark as error if input is invalid
   * @returns false if there is an error
   */
  public override reportValidity(): boolean {
    return super.reportValidity();
  }

  /**
   * Handle validation on input segments
   * @returns {void}
   */
  private onInputValidation(): void {
    if (this.customValidation) {
      return;
    }

    this.reportValidity();
  }

  /**
   * Updates a time segment to the provided value
   * @param segment Segment id
   * @param value Unit to change to
   * @returns {void}
   */
  private updateTimeSegmentTo(segment: Segment, value: number): void {
    if (segment === Segment.HOURS) {
      value = this.getHoursSegment(value);
    }
    this.setSegmentAndNotify(segment, value);
  }

  /**
   * Updates the value of a time segment (element)
   * @param segment Segment's name
   * @returns {void}
   */
  private updateSegmentValue(segment: Segment): void {
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
   * Handles any keydown events
   * Used for control keys
   * @param event Event Object
   * @returns {void}
   */
  private onKeydown = (event: Event): void => {
    this.manageControlKeys(event as KeyboardEvent);
  };

  /**
   * Handle valid control keys and execute their corresponding commands
   * Will stop when readonly is set
   * @param event Keyboard event
   * @returns {void}
   */
  private manageControlKeys(event: KeyboardEvent): void {
    if (this.readonly || this.disabled || event.defaultPrevented) {
      return;
    }

    switch (event.key) {
      case 'ArrowUp':
        this.handleUpKey(event);
        break;
      case 'ArrowDown':
        this.handleDownKey(event);
        break;
      case 'Enter':
      case ' ':
        this.handleEnterKey(event);
        break;
      default:
        return;
    }

    event.preventDefault();
  }

  /**
   * Handles ENTER key press
   * @param event Keyboard event
   * @returns {void}
   */
  private handleEnterKey(event: KeyboardEvent): void {
    if (event.target === this.toggleEl) {
      this.toggle();
      event.preventDefault();
    }
  }

  /**
   * Handles UP key press
   * @param event Keyboard event
   * @returns {void}
   */
  private handleUpKey(event: KeyboardEvent): void {
    this.toggleOrModify(1, event.target as HTMLElement);
  }

  /**
   * Handle DOWN key press
   * @param event Keyboard event
   * @returns {void}
   */
  private handleDownKey(event: KeyboardEvent): void {
    this.toggleOrModify(-1, event.target as HTMLElement);
  }

  /**
   * Toggles the amPm flag or updates the time segment value.
   * Essentially a handler for user inputs on the control.
   * @param amount to change value by
   * @param target Segment id
   * @returns {void}
   */
  private toggleOrModify(amount: number, target: HTMLElement): void {
    if (target === this.toggleEl) {
      this.toggle();
    } else if (target === this.hoursInput) {
      this.changeValueBy(amount, Segment.HOURS);
    } else if (target === this.minutesInput) {
      this.changeValueBy(amount, Segment.MINUTES);
    } else if (target === this.secondsInput) {
      this.changeValueBy(amount, Segment.SECONDS);
    }
  }

  /**
   * Changes a time segment value by a specified amount.
   * Also updates parent values when rolling through cycles.
   * Incomplete value will update only segment without pre-populate value.
   * @param amount Amount to change by
   * @param segment Segment id
   * @returns {void}
   */
  private changeValueBy(amount: number, segment: Segment): void {
    const segmentValue = this[segment];
    const { milliseconds, cycle } = SegmentMap[segment];

    if (this.isCompleteValue) {
      const offset = segmentValue === null ? 0 : amount * milliseconds;
      const value = addOffset(this.currentTimeString, offset);
      this.setValueAndNotify(value);
      this.selectedSegment = segment;
    } else {
      // a segment cycle is added to support wrapping of amount with negative value
      this[segment] = segmentValue === null ? 0 : (segmentValue + amount + cycle) % cycle;
    }
  }

  /**
   * Gets the hours segment of the provided value
   * as there is extra logic required for 12hr support
   *
   * @param value Unit to change to
   * @returns updated value
   */
  private getHoursSegment(value: number): number {
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
   * @returns {void}
   */
  private updateHoursSegmentValue(): void {
    if (this.hoursInput) {
      this.hoursInput.value = this.formattedHours;
    }
  }

  /**
   * Updated the value of the minutes element
   * @returns {void}
   */
  private updateMinutesSegmentValue(): void {
    if (this.minutesInput) {
      this.minutesInput.value = this.formattedMinutes;
    }
  }

  /**
   * Updates the value of the seconds element
   * @returns {void}
   */
  private updateSecondsSegmentValue(): void {
    if (this.secondsInput) {
      this.secondsInput.value = this.formattedSeconds;
    }
  }

  /**
   * Formats a given number and prefixes a 0 on numbers lower than 10
   * @param n Number to format
   * @returns Formatted number
   */
  private static formattedUnit(n: number | null): string {
    return n === null ? '' : padNumber(n, 2);
  }

  /**
   * Returns `true` or `false` depending on whether the hours are before, or, after noon
   * @returns True if time is AM
   */
  private isAM(): boolean {
    return isAM(this.currentTimeString);
  }

  /**
   * Returns opposite of isAM
   * @returns True if time is PM
   */
  private isPM(): boolean {
    return isPM(this.currentTimeString);
  }

  /**
   * Toggles the AM/PM state
   * @returns {void}
   */
  public toggle(): void {
    if (this.amPm) {
      const hours =
        this.hours === null ? new Date().getHours() : (this.hours + HOURS_IN_DAY / 2) % HOURS_IN_DAY;
      this.setSegmentAndNotify(Segment.HOURS, hours);
    }
  }

  /**
   * A `CSSResultGroup` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @returns CSS template
   */
  static override get styles(): CSSResultGroup {
    return css`
      :host {
        display: inline-flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: center;
        user-select: none;
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
   * Template for divider segment
   * @returns Divider segment
   */
  private static dividerTemplate = html`<span part="divider"></span>`;

  /**
   * Template for Hours Segment
   * @returns template hours segment
   */
  private get hoursTemplate(): TemplateResult {
    const hours = this.formattedHours;
    return html`<ef-number-field
      id="hours"
      part="input"
      aria-label="${this.t('SELECT_HOURS', { value: this.periodHours })}"
      no-spinner
      transparent
      min="${this.amPm ? 1 : MIN_UNIT}"
      max="${this.amPm ? HOURS_OF_NOON : MAX_HOURS}"
      .value="${hours}"
      placeholder="${hours ? nothing : Placeholder.HOURS}"
      ?disabled="${this.disabled}"
      ?readonly="${this.readonly}"
      @value-changed="${this.onInputValueChanged}"
      @focused-changed=${this.onInputFocusedChanged}
      @input=${this.onInputValidation}
    ></ef-number-field>`;
  }

  /**
   * Template for Minutes Segment
   * @returns template minutes segment
   */
  private get minutesTemplate(): TemplateResult {
    const minutes = this.formattedMinutes;
    return html`<ef-number-field
      id="minutes"
      aria-label="${this.t('SELECT_MINUTES', { value: this.minutes })}"
      part="input"
      no-spinner
      min="${MIN_UNIT}"
      max="${MAX_MINUTES}"
      .value="${minutes}"
      placeholder="${minutes ? nothing : Placeholder.MINUTES}"
      ?readonly="${this.readonly}"
      ?disabled="${this.disabled}"
      transparent
      @value-changed="${this.onInputValueChanged}"
      @focused-changed=${this.onInputFocusedChanged}
      @input=${this.onInputValidation}
    ></ef-number-field>`;
  }

  /**
   * Template for Seconds Segment
   * @returns template seconds segment
   */
  private get secondsTemplate(): TemplateResult {
    const seconds = this.formattedSeconds;
    return html` <ef-number-field
      id="seconds"
      part="input"
      aria-label="${this.t('SELECT_SECONDS', { value: this.seconds })}"
      no-spinner
      min="${MIN_UNIT}"
      max="${MAX_SECONDS}"
      .value="${seconds}"
      placeholder="${seconds ? nothing : Placeholder.SECONDS}"
      ?readonly="${this.readonly}"
      ?disabled="${this.disabled}"
      transparent
      @value-changed="${this.onInputValueChanged}"
      @focused-changed=${this.onInputFocusedChanged}
      @input=${this.onInputValidation}
    ></ef-number-field>`;
  }

  /**
   * Template for AmPm Segment
   * @returns Am/Pm segment
   */
  private get getAmPmHtml(): TemplateResult | null {
    const hasHours = this.hours !== null;

    return this.amPm
      ? html`
          <div
            role="listbox"
            aria-label="${this.t('TOGGLE_TIME_PERIOD')}"
            aria-activedescendant="${hasHours ? (this.isAM() ? 'toggle-am' : 'toggle-pm') : nothing}"
            id="toggle"
            part="toggle"
            @tap=${this.toggle}
            tabindex="0"
          >
            <div
              aria-label="${this.t('BEFORE_MIDDAY')}"
              role="option"
              id="toggle-am"
              part="toggle-item"
              ?active=${hasHours && this.isAM()}
            >
              AM
            </div>
            <div
              aria-label="${this.t('AFTER_MIDDAY')}"
              role="option"
              id="toggle-pm"
              part="toggle-item"
              ?active=${hasHours && this.isPM()}
            >
              PM
            </div>
          </div>
        `
      : null;
  }

  /**
   * Native input's template for mobile
   * @returns input
   */
  private get nativeInputForMobile(): TemplateResult | null {
    return this.isMobile ? html`<input id="mtp" type="time" @change=${this.onMobileTimeChange} />` : null;
  }

  /**
   * A template used to notify currently selected value for screen readers
   * @returns template result
   */
  private get selectionTemplate(): TemplateResult | undefined {
    if (!this.announceValues) {
      return;
    }
    const value = this.value;
    const showSeconds = this.isShowSeconds;
    const amPm = this.amPm;

    return html`<div
      part="aria-selection"
      role="status"
      aria-live="polite"
      aria-label="${this.t('SELECTED', {
        value: value ? parse(value) : null,
        showSeconds,
        amPm
      })}"
    ></div>`;
  }

  /**
   * Get time input template
   * @returns template result
   */
  private get inputTemplate(): TemplateResult {
    return html` ${this.hoursTemplate} ${TimePicker.dividerTemplate} ${this.minutesTemplate}
    ${this.isShowSeconds ? html`${TimePicker.dividerTemplate}${this.secondsTemplate}` : undefined}`;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @returns Render template
   */
  protected override render(): TemplateResult {
    return html`
      ${this.inputTemplate} ${guard([this.value, this.lang, this.amPm], () => this.getAmPmHtml)}
      ${guard([this.isMobile], () => this.nativeInputForMobile)}
      ${guard(
        [this.value, this.lang, this.showSeconds, this.amPm, this.announceValues],
        () => this.selectionTemplate
      )}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ef-time-picker': TimePicker;
  }
}
