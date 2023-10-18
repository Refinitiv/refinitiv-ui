import {
  CSSResultGroup,
  FocusedPropertyKey,
  FormFieldElement,
  PropertyValues,
  TapEvent,
  TemplateResult,
  css,
  html
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { query } from '@refinitiv-ui/core/decorators/query.js';
import { TemplateMap } from '@refinitiv-ui/core/directives/template-map.js';

import '../icon/index.js';
import { VERSION } from '../version.js';

type SelectionDirection = 'forward' | 'backward' | 'none';

const DEFAULT_STEP_BASE = 1;
const ANY_STEP = 'any';

enum Direction {
  Up = 1,
  Down = -1
}

/**
 * Form control element for numbers.
 *
 * @fires value-changed - Fired when user commits a value change. The event is not triggered if `value` property is changed programmatically.
 * @fires error-changed - Fired when user inputs invalid value. The event is not triggered if `error` property is changed programmatically.
 * @fires step-up - Fired when user acts value up on both pressing arrow up or tapping the spinner up. The event is not triggered if stepUp method is called programmatically.
 * @fires step-down - Fired when user acts value down on both pressing arrow down or tapping the spinner down. The event is not triggered if stepDown method is called programmatically.
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 *
 * @attr {boolean} error - Set error state
 * @prop {boolean} [error=false] - Set error state
 *
 * @attr {string} placeholder - Set placeholder text
 * @prop {string} [placeholder=""] - Set placeholder text
 *
 * @attr {boolean} readonly - Set readonly state
 * @prop {boolean} [readonly=false] - Set readonly state
 *
 * @attr {boolean} transparent - Disables all other states and border/background styles.
 * @prop {boolean} [transparent=false] - Disables all other states and border/background styles.
 *
 * @attr {boolean} warning - Set warning state
 * @prop {boolean} [warning=false] - Set warning state
 *
 * @attr {string} value - Input's value
 * @prop {string} [value=""] - Input's value
 */
@customElement('ef-number-field')
export class NumberField extends FormFieldElement {
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
      }
      :host(:focus),
      :host input:focus {
        outline: none;
      }
      :host([transparent]) {
        background: none !important;
        border: none !important;
      }
      [part='input'] {
        font: inherit;
        background: none;
        color: currentColor;
        border: none;
        text-align: inherit;
      }
      [part='spinner'] {
        display: flex;
        flex-direction: column;
      }
      [part='spinner-up'],
      [part='spinner-down'] {
        display: flex;
        height: 50%;
        cursor: pointer;
        user-select: none;
      }
      [part^='spinner'][disabled],
      [part^='spinner'][readonly] {
        cursor: default;
      }
    `;
  }

  /**
   * Time period (ms) before press repetition starts
   */
  private repeatDelay = 300;

  /**
   * Time period (ms) which it repeats.
   */
  private repeatRate = 50;

  /**
   * Set spinner's visibility
   */
  @property({ type: Boolean, attribute: 'no-spinner', reflect: true })
  public noSpinner = false;

  /**
   * Set step value
   */
  @property({ type: String, reflect: true })
  public step: string | null = null;

  /**
   * Set minimum value.
   * This value must be less than or equal to the value of the `max` attribute
   */
  @property({ type: String, reflect: true })
  public min: string | null = null;

  /**
   * Set maximum value.
   * This value must be greater than or equal to the value of the `min` attribute
   */
  @property({ type: String, reflect: true })
  public max: string | null = null;

  private interimValueState = false; // make sure that internal input field value is updated only on external value change
  /**
   * The value of the number entered into the input.
   * @param value number-field value
   * @default -
   */
  @property({ type: String })
  public override set value(value: string) {
    this.interimValueState = true;
    super.value = value;
  }
  public override get value(): string {
    return this.valueAsNumberString(this.internalValue);
  }

  /**
   * Returns the value of the element, interpreted as double number
   */
  public get valueAsNumber(): number {
    return this.stringToNumber(this.internalValue);
  }

  /**
   * Get spinner up element
   */
  @query('[part=spinner-up]')
  private spinnerUpEl?: HTMLInputElement;

  /**
   * Get spinner down element
   */
  @query('[part=spinner-down]')
  private spinnerDownEl?: HTMLInputElement;

  /**
   * An object's returned from setTimeout to use with repeat delay.
   */
  private timerRepeatDelay: NodeJS.Timeout | undefined;

  /**
   * An object's returned from setInterval to use with repeat rate.
   */
  private timerRepeatRate: NodeJS.Timeout | undefined;

  /**
   * Called after the component is first rendered
   * @param changedProperties Properties which have changed
   * @returns {void}
   */
  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    // To remove press repetition when tap event ends outside of the pressed button
    document.addEventListener('tapend', this.clearTimer);
  }

  /**
   * Updates the element
   * @param changedProperties Properties that has changed
   * @returns {void}
   */
  protected override update(changedProperties: PropertyValues): void {
    if (changedProperties.has(FocusedPropertyKey) && !this.focused) {
      this.reportValidity();
    }

    super.update(changedProperties);
  }

  /**
   * Called when the element’s DOM has been updated and rendered
   * @param changedProperties Properties that has changed
   * @returns {void}
   */
  protected override updated(changedProperties: PropertyValues): void {
    // cannot use property binding on value as it may override the current input of the control
    // set it manually only if value has been updated externally
    // all internal input changes should not update input value
    if (changedProperties.has('value') && this.interimValueState) {
      this.inputValue = this.value;
      this.interimValueState = false;
    }
  }

  /**
   * Convert string to number
   * @param value value to convert
   * @returns NaN if string is an invalid number or Infinity or empty string;
   */
  private stringToNumber(value: string | null): number {
    return value && this.isValidValue(value) ? Number(value) : NaN;
  }

  /**
   * Convert a float number to a fixed number
   * @param value Value to convert
   * @param [decimals] optional decimals. Default is based on step base and allowed value step
   * @returns fixed number
   */
  private toFixedNumber(value: number, decimals = this.stepDecimals): number {
    return Number(value.toFixed(decimals));
  }

  /**
   * Convert step value from string to number or 'any'
   * @returns step value of input as a number or 'any'
   */
  private get stepValue(): typeof ANY_STEP | number {
    // special value as defined by HTML specs
    if (String(this.step).toLowerCase() === ANY_STEP) {
      return ANY_STEP;
    }

    const step = this.stringToNumber(this.step);
    return isNaN(step) || step <= 0 ? DEFAULT_STEP_BASE : step;
  }

  /**
   * Get the number of decimal places
   * @param value Value to check
   * @returns the number of decimal places
   */
  private getDecimalPlace(value: number): number {
    if (Math.floor(value) === value || isNaN(value) || !isFinite(value)) {
      return 0;
    }
    return (
      new Intl.NumberFormat('en', { minimumSignificantDigits: 1 }).format(value).split('.')[1].length || 0
    );
  }

  /**
   * Get number of decimals based on step base and allowed value step
   * @returns decimals
   */
  private get stepDecimals(): number {
    return Math.max(this.getDecimalPlace(this.stepBase), this.getDecimalPlace(this.getAllowedValueStep()));
  }

  /**
   * Check if passed value is a valid value
   * @override
   * @param value Value to check
   * @returns {boolean} false if value is invalid
   */
  protected override isValidValue(value: string): boolean {
    const number = Number(value);
    return !isNaN(number) && isFinite(number);
  }

  /**
   * Get value as valid number string.
   * @param value A value to convert
   * @returns string value
   */
  private valueAsNumberString(value: string): string {
    return this.isValidValue(value) ? value : '';
  }

  /**
   * Get either inputValue or actual value dependant on control state
   * @returns string of input value
   */
  private get internalValue(): string {
    // cover the case when value getter is called before first render or in interim state
    return this.interimValueState || !this.inputElement ? super.value : this.inputValue;
  }

  /**
   * Handles key down input event
   * @param event Key down event object
   * @returns {void}
   */
  protected onInputKeyDown(event: KeyboardEvent): void {
    if (this.readonly || this.disabled || event.defaultPrevented) {
      return;
    }

    switch (event.key) {
      case 'ArrowUp':
        this.onApplyStep(Direction.Up);
        break;
      case 'ArrowDown':
        this.onApplyStep(Direction.Down);
        break;
      default:
        return;
    }

    event.preventDefault();
  }

  /**
   * Trigger step-up or step-down event and return the event is cancelled
   * @param direction Up or Down
   * @returns {boolean} false if cancelled event. And true otherwise.
   */
  private dispatchStepEvent(direction: Direction): boolean {
    const eventName = direction === Direction.Up ? 'step-up' : 'step-down';
    return this.dispatchEvent(
      new CustomEvent(eventName, {
        cancelable: true
      })
    );
  }

  /**
   * Run when spinner has been tapped
   * @param event tap event
   * @returns {void}
   */
  protected onSpinnerTap(event: TapEvent): void {
    if (this.disabled || this.readonly || event.defaultPrevented) {
      return;
    }

    const target = event.target;
    const direction = target === this.spinnerDownEl ? Direction.Down : Direction.Up;
    this.onApplyStep(direction);

    // Support long tap at a spinner
    this.timerRepeatDelay = setTimeout(() => {
      this.timerRepeatRate = setInterval(() => {
        this.onApplyStep(direction);
      }, this.repeatRate);
    }, this.repeatDelay);
  }

  /**
   * Clear timerRepeatDelay and timerRepeatRate if exist
   * @returns {void}
   */
  protected clearTimer = (): void => {
    if (this.timerRepeatDelay || this.timerRepeatRate) {
      clearTimeout(this.timerRepeatDelay);
      clearInterval(this.timerRepeatRate);
    }
  };

  /**
   * Step down or up and notify value change
   * @param direction Up or Down
   * @returns {void}
   */
  protected onApplyStep(direction: Direction): void {
    const event = this.dispatchStepEvent(direction);
    if (event) {
      try {
        this.applyStepDirection(direction);
        /**
         * @ignore
         * exclude native event from the documentation
         */
        this.dispatchEvent(new InputEvent('input'));
        this.setSilentlyValueAndNotify();
      } catch (error) {
        // According to specs stepDown/stepUp may fail for some invalid inputs
        // do nothing and report nothing in that case
      }
    }
  }

  /**
   * Run before input changes
   * Prevent invalid characters
   * @param event before input event
   * @returns {void}
   */
  /* c8 ignore start */
  protected onBeforeInputChange(event: InputEvent): void {
    // Try to prevent some of invalid characters to be entered
    // but still do full validation on actual `input` and `change` events
    const inputType = event.inputType;

    // cover all insert types, such as type, paste, drag&drop and others
    if (inputType.startsWith('insert')) {
      const data = event.data || '';
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const inputEl = this.inputElement!;
      const oldInput = this.inputValue;

      // Calculate what could be the new input
      const selectionStart = inputEl.selectionStart || 0;
      const selectionEnd = inputEl.selectionEnd || 0;

      const newInput = `${oldInput.substring(0, selectionStart)}${data}${oldInput.substring(selectionEnd)}`;
      const validatedInput = this.stripeInvalidCharacters(newInput, oldInput, data);
      const insertionData = validatedInput
        .slice(0, validatedInput.length - (oldInput.length - selectionEnd))
        .substring(selectionStart);

      // Invalid characters or sequence of characters
      if (!insertionData.length) {
        event.preventDefault();
        return;
      }

      if (insertionData !== data) {
        // In theory here we should emulate the new input
        // in practice we cannot as there is no API (apart of deprecated execCommand), so do nothing
        // invalid input will be stripped out on `input` event handler, but that will break Undo logic
      }
    }
  }
  /* c8 ignore stop */

  /**
   * Runs on input element `input` event
   * @param event `input` event
   * @returns {void}
   */
  protected override onInputInput(event: InputEvent): void {
    this.onNativeInputChange(event);
  }

  /**
   * Runs on input element `change` event
   * @param event `change` event
   * @returns {void}
   */
  protected override onInputChange(event: InputEvent): void {
    this.onNativeInputChange(event);
  }

  /**
   * Triggers when native input value change with input event or change event
   * @param event Input event
   * @returns {void}
   */
  protected onNativeInputChange(event: InputEvent): void {
    const currentInput = this.inputValue;
    const inputValue = this.stripeInvalidCharacters(currentInput, this.value, event.data || '');

    if (inputValue !== currentInput && this.inputElement) {
      // we can only stripe the characters, so try to make the best guess where the cursor should be
      const selectionStart = this.inputElement.selectionStart || 0;
      const selectionEnd = this.inputElement.selectionEnd || 0;
      this.inputValue = inputValue;

      const diff = currentInput.length - inputValue.length;
      this.inputElement.selectionStart = Math.max(selectionStart - diff, 0);
      this.inputElement.selectionEnd = Math.max(selectionEnd - diff, 0);
    }

    this.setSilentlyValueAndNotify();
  }

  /**
   * Stripe characters from input text based on previous input and data
   * @param input The new input to process
   * @param oldInput Previous input
   * @param data The data that has been inserted
   * @returns the input where characters are striped away
   */
  private stripeInvalidCharacters(input = '', oldInput = '', data = ''): string {
    // all these actions depends on new value and previous value trying to guess the best action
    const dataHasDot = data.includes('.');
    const dataHasE = data.search(/e/i) !== -1;
    const dotIndex = input.indexOf('.');
    const eIndex = input.search(/e/i);

    const valueHasDot = dotIndex !== -1 && !dataHasDot;
    const valueHasE = eIndex !== -1 && !dataHasE;

    // filter . and e/E keystrokes. Note: paste is not covered by this
    if (data !== input && ((valueHasDot && data === '.') || (valueHasE && (data === 'e' || data === 'E')))) {
      input = oldInput;
    }

    // stripe all e before dot and multiple . occurrences
    if (dotIndex !== -1) {
      input = `${input.substring(0, dotIndex + 1)}${input.substring(dotIndex + 1).replace(/\./g, '')}`;
      if (!valueHasE) {
        input = `${input.substring(0, dotIndex).replace(/e/gi, '')}${input.substring(dotIndex)}`;
      }
    }

    // stripe all dots after e and multiple e occurrences
    if (eIndex !== -1) {
      input = `${input.substring(0, eIndex + 1)}${input.substring(eIndex + 1).replace(/e/gi, '')}`;
      if (!valueHasDot) {
        input = `${input.substring(0, eIndex)}${input.substring(eIndex).replace(/\./g, '')}`;
      }
    }

    // stripe all other invalid characters and make sure that + and - signs are correct
    return input.replace(/(^[-+]|[e][-+])|[-+]|[^0-9e.+-]/gi, '$1');
  }

  /**
   * On *user-interaction* set the value and notify.
   * This function will not call request update, but will fire value-changed event
   * @returns {void}
   */
  private setSilentlyValueAndNotify(): void {
    // Nobody likes to see a red border
    this.reportValidity();

    const value = this.valueAsNumberString(this.inputValue);
    if (super.value !== value) {
      // here we must set the value silently to avoid re-rendering of input
      super.value = value;
      this.notifyPropertyChange('value', value);
    }
  }

  /**
   * Get the allowed step value
   * @returns allowed step
   */
  private getAllowedValueStep(): number {
    let stepValue = this.stepValue;
    if (stepValue === ANY_STEP) {
      // By algorithm, this should throw an error
      // however keep the default value as we use same method for stepping up and down
      stepValue = DEFAULT_STEP_BASE;
    }

    return stepValue;
  }

  /**
   * Get the step base as per HTML5 specs
   * @returns step base
   */
  private get stepBase(): number {
    // If the element has a min content attribute, and the result of applying the algorithm to convert a string to a number
    // to the value of the min content attribute is not an error, then return that result.
    const min = this.stringToNumber(this.min);
    if (!isNaN(min)) {
      return min;
    }

    // If the element has a value content attribute, and the result of applying the algorithm to convert a string to a number
    // to the value of the value content attribute is not an error, then return that result.
    const valueAttribute = this.stringToNumber(this.getAttribute('value') || '');
    if (!isNaN(valueAttribute)) {
      return valueAttribute;
    }

    return 0;
  }

  /**
   * Count precision number
   * @param number value to count
   * @returns precision number
   */
  private getPrecision(number: number): number {
    const getDecimalPrecision = (number: string): number => {
      const [wholeNumber, decimalNumber] = number.split('.');
      return (wholeNumber.length ?? 0) + (decimalNumber?.length ?? 0);
    };

    const numberString = number.toString();

    // Check if the number is in exponential notation.
    if (numberString.includes('e')) {
      const [mantissa, exponent] = numberString.split('e');
      const precision = getDecimalPrecision(mantissa) + Math.abs(Number(exponent));
      return precision;
    }

    return getDecimalPrecision(numberString);
  }

  /**
   * Check if value subtracted from the step base is not an integral multiple of the allowed value step
   * @param value value to check
   * @returns true if value is integral
   */
  private isValueIntegralMultipleOfStep(value: number): boolean {
    if (this.step === ANY_STEP) {
      return true;
    }
    const decimals = Math.max(this.getDecimalPlace(value), this.stepDecimals);
    const dividend = this.stepBase - value;
    const divisor = this.getAllowedValueStep();
    // calculate precision to prevent Floating point precision issue.
    // e.g. 1111111/0.00001 would not result in 111111100000 as expected.
    const precision = this.getPrecision(dividend) + this.getPrecision(divisor);
    const division = parseFloat((dividend / divisor).toPrecision(precision));
    const number = decimals ? this.toFixedNumber(division, decimals) : division;

    // (2 - 1.01) % 0.33 needs to give 0. So we cannot use % directly as it is intended for integers
    return number % 1 === 0;
  }

  /**
   * Find the nearest value that, when subtracted from the `stepBase`
   * is an integral multiple of the `allowedValueStep`,
   * and that is less than `value` if the `direction` was `Down`, and more than value otherwise.
   * @param value the value to operate on
   * @param stepBase base to start calculation
   * @param allowedValueStep a step to go Down or Up
   * @param direction Direction, either -1 for Down or 1 for Up
   * @returns nearest number
   */
  private findNearestSteppedValue(
    value: number,
    stepBase: number,
    allowedValueStep: number,
    direction: Direction
  ): number {
    // TODO: there is probably much better way on how to implement this function
    let newValue = this.toFixedNumber(value + ((stepBase - value) % allowedValueStep));

    if (direction === Direction.Up) {
      // with float number rounding this may need to run more than once to find the valid value
      while (newValue <= value) {
        const steppedValue = this.toFixedNumber(newValue + allowedValueStep);
        if (steppedValue <= newValue) {
          // Non safe integers might behave incorrectly
          // Avoid any potential infinitive loops
          break;
        }
        newValue = steppedValue;
      }
    } else if (direction === Direction.Down) {
      while (newValue >= value) {
        const steppedValue = this.toFixedNumber(newValue - allowedValueStep);
        if (steppedValue >= newValue) {
          break;
        }
        newValue = steppedValue;
      }
    }

    return newValue;
  }

  /**
   * Apply step up or step down on the input
   * @param direction either go up or down
   * @param stepIncrement step increment factor
   * @returns {void}
   */
  private applyStepDirection(direction: Direction, stepIncrement = 1): void {
    const min = this.stringToNumber(this.min);
    const max = this.stringToNumber(this.max);

    // If the element has a minimum and a maximum and the minimum is greater than the maximum, then return.
    if (min > max) {
      return;
    }

    // passing floats to step increment does not make sense as this potentially leads to incorrect results
    stepIncrement = stepIncrement < 0 ? Math.ceil(stepIncrement) : Math.floor(stepIncrement);
    if (stepIncrement < 0) {
      direction = direction === Direction.Up ? Direction.Down : Direction.Up;
      stepIncrement = Math.abs(stepIncrement);
    }

    const stepBase = this.stepBase;
    const allowedValueStep = this.getAllowedValueStep();

    // If applying the algorithm to convert a string to a number to the string given by the element's value
    // does not result in an error, then let value be the result of that algorithm. Otherwise, let value be zero.
    const inputValue = this.stringToNumber(this.inputValue);
    const valueBeforeStepping = isNaN(inputValue) ? 0 : inputValue;
    let value = valueBeforeStepping;

    // step-up or step-down
    if (this.isValueIntegralMultipleOfStep(value)) {
      const delta = allowedValueStep * stepIncrement * direction;
      value = this.toFixedNumber(
        value + delta,
        Math.max(this.getDecimalPlace(value), this.getDecimalPlace(delta))
      );
    } else {
      value = this.findNearestSteppedValue(valueBeforeStepping, stepBase, allowedValueStep, direction);
    }

    // Follow native number field with step "any".
    // When set min as a decimal number, value should't be decreased to min
    if (value < min && this.step === ANY_STEP && this.getDecimalPlace(this.stringToNumber(this.min)) > 0) {
      value = valueBeforeStepping;
    }
    // If the element has a minimum, and value is less than that minimum,
    // then set value to the smallest value that, when subtracted from the step base,
    // is an integral multiple of the allowed value step, and that is more than or equal to minimum.
    else if (value < min) {
      value = this.findNearestSteppedValue(
        min + allowedValueStep,
        stepBase,
        allowedValueStep,
        Direction.Down
      );
    }
    // If the element has a maximum, and value is greater than that maximum,
    // then set value to the largest value that, when subtracted from the step base,
    // is an integral multiple of the allowed value step, and that is less than or equal to maximum.
    else if (value > max) {
      value = this.findNearestSteppedValue(max - allowedValueStep, stepBase, allowedValueStep, Direction.Up);
    }

    // If either the method invoked was the stepDown() method and value is greater than valueBeforeStepping
    // or the method invoked was the stepUp() method and value is less than valueBeforeStepping, then return.
    if (
      !isNaN(inputValue) &&
      ((direction === Direction.Up && value < valueBeforeStepping) ||
        (direction === Direction.Down && value > valueBeforeStepping))
    ) {
      return;
    }

    this.inputValue = String(value);
  }

  /**
   * Increases the input value by amount of step
   * @param [stepIncrement] The stepIncrement parameter is a numeric value. If no parameter is passed, stepIncrement defaults to 1.
   * @returns {void}
   */
  public stepUp(stepIncrement?: number): void {
    this.applyStepDirection(Direction.Up, stepIncrement);
  }

  /**
   * Decreases the input value by amount of step
   * @param [stepIncrement] The stepIncrement parameter is a numeric value. If no parameter is passed, stepIncrement defaults to 1.
   * @returns {void}
   */
  public stepDown(stepIncrement?: number): void {
    this.applyStepDirection(Direction.Down, stepIncrement);
  }

  /**
   * Validate the element input and mark it as error if its input is invalid.
   * @returns `true` if the element input is valid; otherwise, returns `false`.
   */
  public override reportValidity(): boolean {
    return super.reportValidity();
  }

  /**
   * Returns `true` if the element input is valid; otherwise, returns `false`.
   * @returns element input validity
   */
  public override checkValidity(): boolean {
    const value = this.internalValue;

    // No support for required
    if (value === '') {
      return true;
    }

    if (!this.isValidValue(value)) {
      return false;
    }

    // Check min and max numbers
    const numberValue = Number(value);
    const max = this.stringToNumber(this.max);
    const min = this.stringToNumber(this.min);

    if (numberValue < min || numberValue > max) {
      return false;
    }

    // Check step for an integral step
    const stepValue = this.stepValue;
    if (stepValue !== ANY_STEP && !this.isValueIntegralMultipleOfStep(numberValue)) {
      return false;
    }

    return true;
  }

  /**
   * @ignore
   * @inheritDoc
   */
  /* c8 ignore start */
  public override get selectionStart(): number | null {
    return null;
  }
  /* c8 ignore stop */

  /**
   * @ignore
   * @inheritDoc
   */
  /* c8 ignore start */
  public override set selectionStart(index: number | null) {
    throw new Error(
      "Failed to set the 'selectionStart' property on 'NumberField': The element does not support selection."
    );
  }
  /* c8 ignore stop */

  /**
   * @ignore
   * @inheritDoc
   */
  /* c8 ignore start */
  public override get selectionEnd(): number | null {
    return null;
  }
  /* c8 ignore stop */

  /**
   * @ignore
   * @inheritDoc
   */
  /* c8 ignore start */
  public override set selectionEnd(index: number | null) {
    throw new Error(
      "Failed to set the 'selectionEnd' property on 'NumberField': The element does not support selection."
    );
  }
  /* c8 ignore stop */

  /**
   * @ignore
   * @inheritDoc
   */
  /* c8 ignore start */
  public override get selectionDirection(): SelectionDirection | null {
    return null;
  }
  /* c8 ignore stop */

  /**
   * @ignore
   * @inheritDoc
   */
  /* c8 ignore start */
  public override set selectionDirection(direction: SelectionDirection | null) {
    throw new Error(
      "Failed to set the 'selectionDirection' property on 'NumberField': The element does not support selection."
    );
  }
  /* c8 ignore stop */

  /**
   * @ignore
   * @inheritDoc
   */
  /* c8 ignore start */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public override setSelectionRange(
    startSelection: number | null,
    endSelection: number | null,
    selectionDirection?: SelectionDirection
  ): void {
    throw new Error(
      "Failed to execute 'setSelectionRange' on 'NumberField': The element does not support selection."
    );
  }
  /* c8 ignore stop */

  /**
   * Renders spinner
   * @returns {TemplateResult} spinner part template
   */
  protected renderSpinner(): TemplateResult {
    return html`
      <div part="spinner" @tapstart=${this.onSpinnerTap}>
        <ef-icon icon="up" part="spinner-up" ?readonly=${this.readonly} ?disabled=${this.disabled}> </ef-icon>
        <ef-icon icon="down" part="spinner-down" ?readonly=${this.readonly} ?disabled=${this.disabled}>
        </ef-icon>
      </div>
    `;
  }

  /**
   * Decorate `<input>` element with common properties extended from form field element:
   * type="text" - always `text`
   * part="input" - always "input", used for styling
   * inputmode="decimal" - show decimals keyboard by default
   * role="spinbutton" - number field is actually a spinner
   * aria-valuenow - current value or 0
   * aria-valuetext - current value or 0, need this to improve user-friendly and human-understandable when screen reader announce value
   * @keydown - Listener for `keydown` event. Runs `this.onInputKeyDown`
   * @beforeinput - Listener for `beforeinput` event. Runs `this.onBeforeInputChange`
   * @returns template map
   */
  protected override get decorateInputMap(): TemplateMap {
    return {
      ...super.decorateInputMap,
      type: 'text',
      part: 'input',
      inputmode: 'decimal',
      role: 'spinbutton',
      'aria-valuenow': `${this.value || 0}`,
      'aria-valuetext': `${this.value || 0}`,
      '@keydown': this.onInputKeyDown,
      '@beforeinput': this.onBeforeInputChange
    };
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return {TemplateResult}  Render template
   */
  protected override render(): TemplateResult {
    return html` ${super.render()} ${this.noSpinner ? null : this.renderSpinner()}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ef-number-field': NumberField;
  }
}
