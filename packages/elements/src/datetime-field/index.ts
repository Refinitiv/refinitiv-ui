import {
  PropertyValues,
  FocusedPropertyKey,
  WarningNotice
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/lib/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/lib/decorators/property.js';
import { TemplateMap } from '@refinitiv-ui/core/lib/directives/template-map.js';
import { AnimationTaskRunner } from '@refinitiv-ui/utils/lib/async.js';
import {
  utcParse,
  utcFormat,
  getFormat,
  isBefore,
  isAfter,
  iterateUnit,
  Locale
} from '@refinitiv-ui/utils/lib/date.js';
import {
  translate,
  getLocale,
  TranslateDirective,
  TranslatePropertyKey
} from '@refinitiv-ui/translate';
import { Direction } from './constants.js';
import {
  NavigationKeys,
  DateTimeFormatPart,
  InputSelection
} from './types';
import { TextField } from '../text-field/index.js';
import {
  getSelectedPartIndex,
  getNextSelectedPartIndex,
  selectPart
} from './utils.js';
import { VERSION } from '../version.js';

@customElement('ef-datetime-field')
export class DatetimeField extends TextField {
  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  protected readonly defaultTabIndex = null;

  /**
   * Delay selecting a part to ensure
   * that scroll can be updated
   */
  private selectPartFrame = new AnimationTaskRunner();

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
   * Flag to show seconds time segment in display.
   * Seconds are automatically shown when `hh:mm:ss` time format is provided as a value.
   */
  @property({ type: Boolean, attribute: 'show-seconds', reflect: true })
  public showSeconds = false;

  /**
   * Toggles 12hr time display
   */
  @property({ type: Boolean, attribute: 'am-pm', reflect: true })
  public amPm = false;

  /**
   * Set the datetime format options based on
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
   * `formatOptions` overrides `timepicker` and `showSeconds` properties.
   * Note: time-zone is not supported
   * @param formatOptions Format options
   * @default - null
   */
  @property({ attribute: false })
  public formatOptions: Intl.DateTimeFormatOptions | null = null;

  /**
   * Used for translations
   */
  @translate({ mode: 'directive', scope: 'ef-datetime-field' })
  protected t!: TranslateDirective;

  /**
   * Format, which is based on locale
   */
  private _locale: Locale | null = null;
  protected get locale (): Locale {
    if (!this._locale) {
      this._locale = this.resolveLocale();
    }
    return this._locale;
  }

  private interimValueState = false; // make sure that internal input field value is updated only on external value change
  /**
   * Current date time value
   * @param value Calendar value
   * @default -
   */
  @property({ type: String })
  public set value (value: string) {
    this.interimValueState = true;
    super.value = value;

    // Always call update cycle when value is set externally
    // This is to ensure that value and inputValue never run out of sync
    this.requestUpdate('interimValueState', false);
  }
  public get value (): string {
    return super.value;
  }

  /**
   * Returns the value of the element, interpreted as double number
   */
  public get valueAsNumber (): number {
    const date = this.valueAsDate;
    return date ? date.getTime() : Number.NaN;
  }

  /**
   * Set the value of the element, interpreted as double number
   * @param value number value
   */
  public set valueAsNumber (value: number) {
    const date = new Date(value);
    this.valueAsDate = date;
  }

  /**
   * Returns the value of the element, interpreted as Date
   */
  public get valueAsDate (): null | Date {
    return this.value ? utcParse(this.value) : null;
  }

  /**
   * Set the value of the element, interpreted as Date
   * @param value date value
   */
  public set valueAsDate (value: null | Date) {
    this.value = value ? this.dateToString(value) : '';
  }

  /**
   * Transform Date object to date string
   * @param value Date
   * @returns dateSting
   */
  protected dateToString (value: Date): string {
    return isNaN(value.getTime()) ? '' : utcFormat(value, this.locale.isoFormat);
  }

  /**
   * Returns true if the datetime field has timepicker
   * @returns hasTimePicker
   */
  protected get hasTimePicker (): boolean {
    // need to check for attribute to resolve the value correctly until the first lifecycle is run
    return this.timepicker || this.hasAttribute('timepicker') || this.hasAmPm || this.hasSeconds;
  }

  /**
   * Returns true if the datetime field has seconds
   * @returns hasSeconds
   */
  protected get hasSeconds (): boolean {
    return this.showSeconds || this.hasAttribute('show-seconds');
  }

  /**
   * Returns true if the datetime field has am-pm
   * @returns hasAmPm
   */
  protected get hasAmPm (): boolean {
    return this.amPm || this.hasAttribute('am-pm');
  }

  /**
   * Get the start date for when the value is not set
   */
  protected get startDate (): string {
    // Noon in UTC
    const today = new Date();
    const date = new Date(0);
    date.setUTCFullYear(today.getFullYear());
    date.setUTCMonth(today.getMonth());
    date.setUTCDate(today.getDate());
    date.setUTCHours(12);
    return this.dateToString(date);
  }

  /**
   * Updates the element
   * @param changedProperties Properties that has changed
   * @returns {void}
   */
  public willUpdate (changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);

    if (this.shouldUpdateLocale(changedProperties)) {
      this._locale = null; // Locale is updated on next call via getter
    }
  }

  /**
   * Check if input value should be synchronised with component value
   * @param changedProperties Properties that has changed
   * @returns True if input should be synchronised
   */
  protected override shouldSyncInputValue (changedProperties: PropertyValues): boolean {
    // Note: changing any of these properties override the input value
    // On blur, if the value is correct makes ure strict format is used
    return changedProperties.has('interimValueState')
      || this.shouldUpdateLocale(changedProperties)
      || (changedProperties.has(FocusedPropertyKey) && this.value !== '' && !this.focused);
  }

  /**
   * Check if locale needs to be updated
   * @param changedProperties Properties that has changed
   * @returns True if locale should be updated
   */
  protected shouldUpdateLocale (changedProperties: PropertyValues): boolean {
    return changedProperties.has(TranslatePropertyKey)
      || changedProperties.has('formatOptions')
      || changedProperties.has('timepicker')
      || changedProperties.has('showSeconds')
      || changedProperties.has('amPm');
  }

  /**
   * Synchronise input value with value.
   * Override the method if value and input value are not the same
   * @param changedProperties Properties that has changed
   * @returns {void}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected override syncInputValue (changedProperties: PropertyValues): void;
  protected syncInputValue (): void;
  protected syncInputValue (changedProperties?: PropertyValues): void {
    this.interimValueState = false;
    const inputValue = this.toInputValue(this.value);
    if (inputValue !== this.inputValue) {
      this.inputValue = inputValue; // setting the value resets selection
    }
  }

  /**
   * Check if input should be re-validated
   * @param changedProperties Properties that has changed
   * @returns True if input should be re-validated
   */
  protected override shouldValidateInput (changedProperties: PropertyValues): boolean {
    // TODO: this needs refactoring with all other fields to support common validation patterns
    return (changedProperties.has(FocusedPropertyKey) && !this.focused);
  }

  /**
   * Validate input according `pattern`, `minLength` and `maxLength` properties
   * change state of `error` property according pattern validation
   * @returns {void}
   */
  protected override validateInput (): void {
    this.reportValidity();
  }

  /**
   * Overwrite validation method for value
   *
   * @param value value
   * @returns {boolean} result
   */
  protected override isValidValue (value: string): boolean {
    if (value === '') {
      return true;
    }
    // value format depends on locale.
    return getFormat(value) === this.locale.isoFormat;
  }

  /**
   * Used to show a warning when the value does not pass the validation
   * @param value that is invalid
   * @returns {void}
   */
  protected override warnInvalidValue (value: string): void {
    new WarningNotice(`The specified value "${value}" does not conform to the required format. The format is '${this.locale.isoFormat}'.`).show();
  }

  /**
   * Resolve locale based on element parameters
   * @returns locale Resolved locale
   */
  protected resolveLocale (): Locale {
    const hasTimePicker = this.hasTimePicker;

    // TODO: Do not use dateStyle and timeStyle as these are supported only in modern browsers
    return Locale.fromOptions(this.formatOptions || {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: hasTimePicker ? 'numeric' : undefined,
      minute: hasTimePicker ? 'numeric' : undefined,
      second: this.hasSeconds ? 'numeric' : undefined,
      hour12: this.hasAmPm ? true : undefined // force am-pm if provided, otherwise rely on locale
    }, `${getLocale(this)}`);
  }

  /**
   * Get Intl.DateTimeFormat object from locale
   */
  protected get formatter (): Intl.DateTimeFormat {
    return this.locale.formatter;
  }

  /**
   * Try to format ISO date/time/datetime string into datetime format parts
   * Throw an error if value is invalid
   * @param value ISO string date/time/datetime
   * @returns parts
   */
  protected formatToParts (value: string): DateTimeFormatPart[] {
    const date = utcParse(value);
    return this.formatter.formatToParts(date);
  }

  /**
   * Format value to inputValue
   * @param value Date string
   * @returns inputValue
   */
  protected toInputValue (value: string): string {
    return value ? this.formatter.format(utcParse(value)) : '';
  }

  /**
   * Format inputValue to value
   * @param inputValue Date string
   * @returns value
   */
  protected toValue (inputValue: string): string {
    let value = '';
    try {
      value = inputValue ? this.locale.parse(inputValue, this.value || this.startDate) : '';
    }
    catch (error) {
      // do nothing
    }
    return value;
  }

  /**
   * On *user-interaction* set the value and notify.
   * @param value New value
   * @returns {void}
   */
  protected override setValueAndNotify (value: string): void {
    // must be called on super to avoid re-rendering of actual value
    if (super.value !== value) {
      super.value = value;
      this.notifyPropertyChange('value', value);
    }
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
   * Returns true if an input element contains valid data.
   * @returns true if input is valid
   */
  public checkValidity (): boolean {
    // Public method should work if inputElement is not yet defined
    const value = this.inputElement && this.inputValue ? this.toValue(this.inputValue) : this.value;

    // Invalid input value
    if (this.inputValue && !value) {
      return false;
    }

    // No support for required
    if (value === '') {
      return true;
    }

    // Value before min
    if (this.min && value !== this.min && isAfter(value, this.min)) {
      return false;
    }

    // Value after max
    if (this.max && value !== this.max && isBefore(value, this.max)) {
      return false;
    }

    return true;
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
   * Select part
   * @param index Part index
   * @param parts The list of parts
   * @returns {void}
   */
  protected selectPart (index = 0, parts: DateTimeFormatPart[]): void {
    const { selectionStart, selectionEnd } = selectPart(index, parts);
    this.setSelectionRange(selectionStart, selectionEnd);
  }

  /**
   * Change value or selection based on keyboard navigation
   * @param key Navigation key
   * @param event Keyboard event
   * @returns {void}
   */
  protected onNavigation (key: NavigationKeys, event: KeyboardEvent): void {
    this.selectPartFrame.cancel();

    // Invalid value
    if (this.inputValue && !this.value) {
      return;
    }

    // Empty value
    if (!this.inputValue) {
      this.setValueAndNotify(this.startDate);
      this.syncInputValue();
      this.select();
      event.preventDefault();
      return;
    }

    // Set selection into cursor mode with Escape key
    if (key === 'Escape') {
      if (this.selectionStart !== this.selectionEnd) {
        this.selectionStart = this.selectionEnd;
        event.preventDefault();
      }
      return;
    }

    // Because of weak formatting, the result of formatting to part might be
    // different to actual input value
    const selection: InputSelection = {
      selectionStart: this.selectionStart,
      selectionEnd: this.selectionEnd
    };
    this.syncInputValue();

    const parts = this.formatToParts(this.value);
    const selectedPartIndex = getSelectedPartIndex(selection, parts);

    // If no segments selected, select the segment where the cursor is
    if (this.selectionStart === this.selectionEnd) {
      this.selectPart(selectedPartIndex, parts);
      event.preventDefault();
      return;
    }

    const selectedPart = parts[selectedPartIndex];

    switch (key) {
      case 'ArrowUp':
      case 'ArrowDown':
        if (selectedPart) {
          let newValue = '';
          const amount = key === 'ArrowDown' ? -1 : 1;
          switch (selectedPart.type) {
            case 'year':
            case 'month':
            case 'day':
            case 'hour':
            case 'minute':
            case 'second':
              newValue = iterateUnit(this.value, selectedPart.type, amount);
              break;
            case 'weekday':
              newValue = iterateUnit(this.value, 'day', amount);
              break;
            case 'dayPeriod':
              newValue = iterateUnit(this.value, 'hour', amount * 12);
              break;
            case 'fractionalSecond':
              newValue = iterateUnit(this.value, 'millisecond', amount * 100);
              break;
            // no default
          }
          this.setValueAndNotify(newValue);
          this.syncInputValue();
          this.selectPart(selectedPartIndex, this.formatToParts(newValue));
          this.resetError();
          event.preventDefault();
        }
        break;
      case 'ArrowRight':
      case 'ArrowLeft':
        const nextPartIdx = getNextSelectedPartIndex(selection, parts, this.inputValue, key === 'ArrowLeft' ? Direction.Down : Direction.Up);
        this.selectPartFrame.schedule(() => {
          this.selectPart(nextPartIdx, parts);
        });
        break;
      // no default
    }
  }

  /**
   * Check if value is changed and fire event
   * @returns {void}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected override onPossibleValueChange (event: InputEvent): void {
    // Nobody likes to see a red border
    this.resetError();
    this.selectPartFrame.cancel(); // ensure no pending selection

    const inputValue = this.inputElement?.value || '';
    const parsedValue = this.toValue(inputValue);
    this.setValueAndNotify(parsedValue);
  }

  /**
   * Handles key down input event
   * @param event Key down event object
   * @returns {void}
   */
  protected onInputKeyDown (event: KeyboardEvent): void {
    if (this.readonly || this.disabled || event.defaultPrevented) {
      return;
    }

    // Ignore special keys
    if (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) {
      return;
    }

    switch (event.key) {
      case 'Up': // IE11
      case 'ArrowUp':
        this.onNavigation('ArrowUp', event);
        break;
      case 'Down':
      case 'ArrowDown':
        this.onNavigation('ArrowDown', event);
        break;
      case 'Left':
      case 'ArrowLeft':
        this.onNavigation('ArrowLeft', event);
        break;
      case 'Right':
      case 'ArrowRight':
        this.onNavigation('ArrowRight', event);
        break;
      case 'Esc':
      case 'Escape':
        this.onNavigation('Escape', event);
        break;
      default:
        return;
    }
  }

  /**
   * Decorate `<input>` element with common properties.
   * Override placeholder
   * @returns template map
   */
  protected override get decorateInputMap (): TemplateMap {
    return {
      ...super.decorateInputMap,
      placeholder: this.focused && !this.inputValue ? this.toInputValue(this.startDate) : this.placeholder || undefined,
      '@keydown': this.onInputKeyDown
    };
  }
}
