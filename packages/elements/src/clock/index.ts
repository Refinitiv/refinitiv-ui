import {
  html,
  css,
  TemplateResult,
  CSSResultGroup,
  PropertyValues,
  WarningNotice,
  TapEvent,
  ResponsiveElement,
  ElementSize
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { query } from '@refinitiv-ui/core/decorators/query.js';
import { state } from '@refinitiv-ui/core/decorators/state.js';
import { VERSION } from '../version.js';
import '@refinitiv-ui/phrasebook/locale/en/clock.js';

import {
  MILLISECONDS_IN_SECOND,
  HOURS_OF_NOON,
  isValidTime,
  toTimeSegment,
  TimeFormat,
  format,
  padNumber,
  HOURS_IN_DAY,
  MINUTES_IN_HOUR,
  SECONDS_IN_MINUTE,
  SECONDS_IN_DAY,
  SECONDS_IN_HOUR,
  parse
} from '@refinitiv-ui/utils/date.js';

import {
  translate,
  TranslatePromise,
  TranslatePropertyKey
} from '@refinitiv-ui/translate';

import {
  register,
  deRegister
} from './utils/TickManager.js';

const SMALL_SIZE = 130; // Break point for small size clock face.
enum Direction {
  UP = 'Up',
  DOWN = 'Down'
}
enum Segment {
  HOURS = 'hours',
  MINUTES = 'minutes',
  SECOND = 'seconds'
}

/**
 * Display hours, minutes and seconds as clock interface
 * @fires value-changed - Fired when the value property changes while ticking.
 * @fires offset-changed - Fired when the the user offsets the clock in `interactive` mode.
 */
@customElement('ef-clock', {
  alias: 'sapphire-clock'
})
export class Clock extends ResponsiveElement {

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
        display: inline-flex;
        position: relative;
        font-variant-numeric: tabular-nums;
      }

      [part~="hand"] {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform-origin: center center;
        pointer-events: none;
      }

      [part="hands"] {
        padding-top: 100%;
      }
    `;
  }

  /**
   * Shared internal function,
   * used for handling notifications from tick manager.
   * @returns {void}
   */
  private onTick = (): void => {
    this.sessionTicks = Math.floor((performance.now() - this.tickTimestamp) / 1000);
    this.notifyPropertyChange('value', this.value);
  };

  /**
   * Current time in seconds
   */
  @state()
  private get currentTime (): number {
    return this.baseTime + this.sessionTicks;
  }

  /**
   * Base value to use when calculating current time.
   * This value is updated whenever the value property is set.
   */
  @state()
  private baseTime = 0;

  /**
   * Current amount of ticks in session.
   */
  @state()
  private sessionTicks = 0;

  /**
   * Timestamp of when the tick property was last updated.
   * Used for accurately ticking time.
   */
  @state()
  private tickTimestamp = 0;

  /**
   * Current active segment for interactive mode
   */
  @state()
  private activeSegment = Segment.HOURS;

  /**
   * Clock internal translation strings
   */
  @translate({ mode: 'promise', scope: 'ef-clock' })
  protected tPromise!: TranslatePromise;

  /**
   * Get time value in format `hh:mm:ss`
   * @default 00:00:00
   * @returns value
   */
  @property({ type: String })
  public get value (): string {
    return format({
      hours: this.hours,
      minutes: this.minutes,
      seconds: this.seconds,
      milliseconds: 0
    }, TimeFormat.HHmmss);
  }

  /**
   * Time to display in hh:mm/h:mm:ss format.
   * @param value new time value
   * @returns {void}
   */
  public set value (value: string) {
    if (typeof value !== 'string' || (value !== '' && !isValidTime(value))) {
      new WarningNotice(`The specified value "${value}" is not valid. The format should be hh:mm or hh:mm:ss.`).show();
      value = '';
    }
    const oldValue = this.value;
    if (oldValue !== value) {
      this.synchronise(); // Required to reset any tick session
      const { hours, minutes, seconds } = toTimeSegment(value);
      this.baseTime = hours * SECONDS_IN_HOUR + minutes * SECONDS_IN_MINUTE + seconds;
      this.requestUpdate('value', oldValue);
    }
  }

  private _offset = 0;

  /**
   * Get offset value
   * @returns offset
   */
  @property({ type: Number })
  public get offset (): number {
    return this._offset;
  }

  /**
   * Amount to offset value in seconds.
   * @param offset new offset value
   * @returns {void}
   */
  public set offset (offset: number) {

    // Passed value can be null | undefined | number | string
    if (offset && typeof offset !== 'number' && typeof offset !== 'string') {
      return;
    }

    const oldOffset = this.offset;
    const newOffset = Math.round(offset % SECONDS_IN_DAY) || 0;

    if (oldOffset !== newOffset) {
      this._offset = newOffset;
      this.requestUpdate('offset', oldOffset);
    }
  }

  private _tick = false;

  /**
   * Toggles clock ticking function.
   * @default false
   */
  @property({ type: Boolean })
  public get tick (): boolean {
    return this._tick;
  }
  public set tick (value: boolean) {
    const oldValue = this.tick;
    if (oldValue !== value) {
      this._tick = value;
      this.synchronise();
      this.configureTickManager();
      this.requestUpdate('tick', oldValue);
    }
  }

  /**
   * Display the digital clock in 12hr format.
   */
  @property({ type: Boolean, attribute: 'am-pm', reflect: true })
  public amPm = false;

  /**
   * Display the seconds segment.
   */
  @property({ type: Boolean, attribute: 'show-seconds', reflect: true })
  public showSeconds = false;

  /**
  * Display clock in analogue style.
  */
  @property({ type: Boolean, reflect: true })
  public analogue = false;

  /**
   * Enable interactive mode. Allowing the user to offset the value.
   */
  @property({ type: Boolean })
  public interactive = false;

  /**
   * Getter for hours part.
   */
  @query('[part~=hours]', true)
  private hoursPart!: HTMLDivElement;

  /**
  * Getter for minutes part.
  */
  @query('[part~=minutes]', true)
  private minutesPart!: HTMLDivElement;

  /**
  * Getter for seconds part.
  */
  @query('[part~=seconds]', true)
  private secondsPart!: HTMLDivElement;

  /**
  * Size of the clock.
  */
  @property({ type: String, attribute: 'size', reflect: true })
  private size: null | 'small' = null;

  /**
   * Get the display time in seconds.
   * This value includes any offsets applied.
   * @returns display time
   */
  private get displayTime (): number {
    return (SECONDS_IN_DAY + this.currentTime + this.offset) % SECONDS_IN_DAY;
  }

  /**
   * Get hours portion of value
   * @returns hours value
   */
  private get hours (): number {
    return Math.floor(this.currentTime / SECONDS_IN_HOUR) % HOURS_IN_DAY;
  }

  /**
   * Get minutes portion of value
   * @returns minutes value
   */
  private get minutes (): number {
    return Math.floor(this.currentTime / SECONDS_IN_MINUTE) % MINUTES_IN_HOUR;
  }

  /**
   * Get seconds portion of value
   * @returns seconds value
   */
  private get seconds (): number {
    return this.currentTime % SECONDS_IN_MINUTE;
  }

  /**
   * Get display hours in 24hr format
   * @returns display hours
   */
  private get displayHours24 (): number {
    return Math.floor(this.displayTime / SECONDS_IN_HOUR) % HOURS_IN_DAY;
  }

  /**
   * Get display hours in 12hr format
   * @returns display hours
   */
  private get displayHours12 (): number {
    return (this.displayHours24 % HOURS_OF_NOON) || HOURS_OF_NOON;
  }

  /**
   * Get display hours
   * @returns display hours
   */
  private get displayHours (): number {
    return this.amPm ? this.displayHours12 : this.displayHours24;
  }

  /**
   * Get display minutes
   * @returns display minutes
   */
  private get displayMinutes (): number {
    return Math.floor(this.displayTime / SECONDS_IN_MINUTE) % MINUTES_IN_HOUR;
  }

  /**
   * Get display seconds
   * @returns display seconds
   */
  private get displaySeconds (): number {
    return this.displayTime % SECONDS_IN_MINUTE;
  }

  /**
   * Get display value
   * @returns display value
   */
  private get displayValue (): string {
    return format({
      hours: this.displayHours,
      minutes: this.displayMinutes,
      seconds: this.displaySeconds,
      milliseconds: 0
    }, TimeFormat.HHmmss);
  }

  /**
   * Get display AM or PM depending on time
   * @returns `AM` or `PM`
   */
  private get displayAmPm (): string {
    return this.isAM ? 'AM' : 'PM';
  }

  /**
   * Returns `true` or `false` depending on whether the hours are before, or, after noon.
   * @returns Result
   */
  private get isAM (): boolean {
    return this.displayHours24 < HOURS_OF_NOON;
  }

  /**
   * Returns `true` if display minutes has changed
   * @returns Result
   */
  private get isDisplayMinutesChange (): boolean {
    return this.displayTime % SECONDS_IN_MINUTE === 0;
  }

  /**
   * Configures the tick manager to either start or stop ticking,
   * depending on the state of the element.
   * @param [forceTick=false] forces a tick update
   * @returns {void}
   */
  private configureTickManager (forceTick = false): void {
    if (this.tick && this.isConnected) {
      register(this.onTick);
      forceTick && this.onTick();
    }
    else {
      deRegister(this.onTick);
    }
  }

  /**
   * Synchronises the tick session to the base value
   * and then resets the session.
   * @returns {void}
   */
  private synchronise (): void {
    this.baseTime = this.currentTime;
    this.sessionTicks = 0;
    this.tickTimestamp = Math.floor(performance.now() / MILLISECONDS_IN_SECOND) * MILLISECONDS_IN_SECOND;
  }

  /**
   * Shift the offset by a direction and amount.
   * @param direction direction to shift
   * @param amount value to shift
   * @returns {void}
   */
  private shift (direction: Direction, amount: number): void {
    this.offset = (SECONDS_IN_DAY + this.offset + amount * (direction === Direction.UP ? 1 : -1)) % SECONDS_IN_DAY;
    this.notifyPropertyChange('offset', this.offset);
  }

  /**
   * Returns any shift amount assigned to a segment.
   * @param segment Segment.
   * @returns {void}
   */
  private getShiftAmountFromSegment (segment: Segment): number {
    if (segment === Segment.HOURS) {
      return SECONDS_IN_HOUR;
    }
    if (segment === Segment.MINUTES) {
      return SECONDS_IN_MINUTE;
    }
    if (segment === Segment.SECOND) {
      return 1;
    }

    return 0;
  }

  /**
  * Returns `true` or `false` depends on the offset value's effect on giving segment
  *
  * @param segment segment
  * @returns Result
  */
  private isSegmentShifted (segment: Segment): boolean {
    switch (segment) {
      case Segment.HOURS:
        return this.hours !== this.displayHours24;
      case Segment.MINUTES:
        return this.minutes !== this.displayMinutes;
      case Segment.SECOND:
        return this.seconds !== this.displaySeconds;
      default:
        return false;
    }
  }

  /**
   * Handles any keydown events
   * Used for control keys
   * @param event Event Object
   * @returns {void}
   */
  private onKeydown (event: KeyboardEvent): void {
    if (this.interactive) {
      this.manageControlKeys(event);
    }
  }

  /**
   * Handles any tap events
   * Used for increment/decrement buttons
   * @param event Event Object
   * @returns {void}
   */
  private onTapStart (event: TapEvent): void {
    if (!this.interactive) {
      return;
    }

    if (event.target === this.hoursPart) {
      this.activeSegment = Segment.HOURS;
    }
    else if (event.target === this.minutesPart) {
      this.activeSegment = Segment.MINUTES;
    }

    const buttonTarget = event.target as HTMLDivElement;
    if (buttonTarget.getAttribute('name') === Direction.UP) {
      this.shift(Direction.UP, this.getShiftAmountFromSegment(this.activeSegment));
    }
    else if (buttonTarget.getAttribute('name') === Direction.DOWN) {
      this.shift(Direction.DOWN, this.getShiftAmountFromSegment(this.activeSegment));
    }
  }

  /**
  * Handle valid control keys and execute their corresponding commands
  * Will stop when readonly is set
  * @param event Event Object
  * @returns {void}
  */
  private manageControlKeys (event: KeyboardEvent): void {
    // Ignore special keys
    if (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) {
      return;
    }

    switch (event.key) {
      case 'Up': // IE
      case 'ArrowUp':
        this.handleUpKey();
        break;
      case 'Down': // IE
      case 'ArrowDown':
        this.handleDownKey();
        break;
      case 'Left': // IE
      case 'ArrowLeft':
        this.activeSegment = Segment.HOURS;
        break;
      case 'Right': // IE
      case 'ArrowRight':
        this.activeSegment = Segment.MINUTES;
        break;
      default:
        return;
    }

    event.preventDefault();
  }

  /**
  * Handles UP key press
  * @returns {void}
  */
  private handleUpKey (): void {
    this.shift(Direction.UP, this.getShiftAmountFromSegment(this.activeSegment));
  }

  /**
  * Handle DOWN key press
  * @returns {void}
  */
  private handleDownKey (): void {
    this.shift(Direction.DOWN, this.getShiftAmountFromSegment(this.activeSegment));
  }

  /**
  * Set aria-valuenow to display value and aria-valuetext to translated format
  * @param updateAriaValueText condition to update aria-valueText
  * @returns {void}
  */
  private async updateAriaValue (updateAriaValueText = true) {
    this.setAttribute('aria-valuenow', `${this.displayTime}`);
    
    if (updateAriaValueText) {
      const value = await this.tPromise('TIME', {
        value: parse(this.displayValue),
        amPm: this.amPm,
        showSeconds: this.showSeconds
      });
      this.setAttribute('aria-valuetext', value);
    }
  }

  /**
  * Get template of segment
  * @param segment segment
  * @param value segment's value
  * @returns {TemplateResult} template
  */
  private generateSegmentTemplate (segment: Segment, value: number): TemplateResult {
    const isActive = this.interactive && (segment === this.activeSegment);
    return html`
      <div part="segment ${segment}${this.isSegmentShifted(segment) ? ' shifted' : ''}"
           ?active=${isActive}>
        ${padNumber(value, 2)}
        <div
          part="increment-button"
          aria-hidden="true"
          name=${Direction.UP}
          ?active=${isActive}></div>
        <div
          part="decrement-button"
          aria-hidden="true"
          name=${Direction.DOWN}
          ?active=${isActive}></div>
        </div>
    `;
  }
  /**
  * Template of divider
  * @returns {TemplateResult} template
  */
  private get dividerTemplate (): TemplateResult {
    return html`
      <div part="segment divider" aria-hidden="true">:</div>
    `;
  }

  /**
  * Template of amPm segment
  * @returns {TemplateResult} template
  */
  private get amPmTemplate (): TemplateResult {
    return html`
      <div part="segment am-pm">${this.displayAmPm}</div>
    `;
  }

  /**
  * Template of hours segment
  * @returns {TemplateResult} template
  */
  private get hoursSegmentTemplate (): TemplateResult {
    return this.generateSegmentTemplate(Segment.HOURS, this.displayHours);
  }

  /**
  * Template of minutes segment
  * @returns {TemplateResult} template
  */
  private get minutesSegmentTemplate (): TemplateResult {
    return this.generateSegmentTemplate(Segment.MINUTES, this.displayMinutes);
  }

  /**
  * Template of seconds segment
  * @returns {TemplateResult} template
  */
  private get secondsSegmentTemplate (): TemplateResult {
    return this.generateSegmentTemplate(Segment.SECOND, this.displaySeconds);
  }

  /**
   * Called when the element's dimension have changed
   * @param size Element size
   * @returns {void}
   */
  public resizedCallback (size: ElementSize): void {
    // size should be set to small only if it's analog clock and it's smaller than defined break point
    this.size = this.analogue && Math.min(size.width, size.height) < SMALL_SIZE ? 'small' : null;
  }

  /**
   * Called when the element has been appended to the DOM
   * @returns {void}
   */
  public connectedCallback (): void {
    super.connectedCallback();
    this.configureTickManager(true);
  }

  /**
   * Called when the element has been disconnected from the DOM
   * @returns {void}
   */
  public disconnectedCallback (): void {
    super.disconnectedCallback();
    this.configureTickManager();
  }

  /**
   * Called once after the component is first rendered
   * @param changedProperties map of changed properties with old values
   * @returns {void}
   */
  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.addEventListener('keydown', (event) => this.onKeydown(event));
    this.renderRoot.addEventListener('tapstart', (event) => this.onTapStart(event as TapEvent));
  }

  /**
   * Handles interactive by update role, tabindex, and aria attribute
   * @returns {void}
   */
  private interactiveChanged (): void {
    if (this.interactive) {
      const tabIndex = (this.tabIndex >= 0) ? this.tabIndex.toString() : '0';
      this.setAttribute('role', 'spinbutton');
      this.setAttribute('tabindex', tabIndex);
      void this.updateAriaValue();
    }
    else {
      this.removeAttribute('role');
      this.removeAttribute('aria-valuenow');
      this.removeAttribute('aria-valuetext');
    }
  }

  /**
   * Called before update() to compute values needed during the update.
   * @param changedProperties Properties that has changed
   * @returns {void}
   */
  protected willUpdate (changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('interactive')) {
      this.interactiveChanged();
    }

    if (this.interactive) {
      if (!this.hasUpdated
        || changedProperties.has('offset')
        || changedProperties.has('value')
        || changedProperties.has('showSeconds')
        || changedProperties.has('amPm')
        || changedProperties.has(TranslatePropertyKey)) {
        void this.updateAriaValue();
      }

      // Avoid announce every second that could interrupt the screen reader when the user takes an action.
      if (changedProperties.has('sessionTicks')) {
        void this.updateAriaValue(this.isDisplayMinutesChange);
      }
    }
  }

  /**
  * Template for digital clock
  * @returns {TemplateResult} template
  */
  protected get digitalClockTemplate (): TemplateResult {
    return html`
      ${this.hoursSegmentTemplate}
      ${this.dividerTemplate}
      ${this.minutesSegmentTemplate}
      ${this.showSeconds ? html`
      ${this.dividerTemplate}
      ${this.secondsSegmentTemplate}
      ` : undefined}
      ${this.amPm ? this.amPmTemplate : undefined}
    `;
  }

  /**
  * Template for analogue clock
  * @returns {TemplateResult} template
  */
  protected get analogueClockTemplate (): TemplateResult {
    const secAngle = 6 * this.displaySeconds;
    const minAngle = this.showSeconds ? Number((6 * (this.displayMinutes + (1 / 60) * this.displaySeconds)).toFixed(2)) : 6 * this.displayMinutes;
    const hourAngle = Number((30 * (this.displayHours24 + (1 / 60) * this.displayMinutes)).toFixed(2));

    return html`
      <div part="hands">
        ${this.size === 'small' ? html`${this.amPm ? this.amPmTemplate : undefined}` : html`<div part="digital">${this.digitalClockTemplate}</div>`}
        <div part="hand hour" style="transform: rotate(${hourAngle}deg)"></div>
        <div part="hand minute" style="transform: rotate(${minAngle}deg)"></div>
        ${this.showSeconds ? html`<div part="hand second" style="transform: rotate(${secAngle}deg)"></div>` : undefined}
      </div>
    `;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @returns {TemplateResult} Render template
   */
  protected render (): TemplateResult {
    return this.analogue ? this.analogueClockTemplate : this.digitalClockTemplate;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ef-clock': Clock;
  }
}
