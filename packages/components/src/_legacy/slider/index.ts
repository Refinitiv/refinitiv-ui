import {
  html,
  css,
  ControlElement,
  TemplateResult,
  CSSResultGroup,
  PropertyValues,
  StyleMap,
  WarningNotice
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { query } from '@refinitiv-ui/core/decorators/query.js';
import { state } from '@refinitiv-ui/core/decorators/state.js';
import { ifDefined } from '@refinitiv-ui/core/directives/if-defined.js';
import { createRef, ref, Ref } from '@refinitiv-ui/core/directives/ref.js';
import { styleMap } from '@refinitiv-ui/core/directives/style-map.js';
import { translate, TranslateDirective } from '@refinitiv-ui/translate';
import '@refinitiv-ui/phrasebook/locale/en/slider.js';
import { VERSION } from '../version.js.js';
import '../number-field/index.js';
import type { NumberField } from '../number-field';

import { SliderDataName, SliderPreviousDataName, NumberFieldName, Direction } from './constants.js';
import { clamp, preventDefault, isDecimalNumber, countDecimalPlace } from './utils.js';

/**
 * Allows users to make selections from a range of values
 *
 * @attr {string} value - Value of slider. Not applicable in range mode.
 * @prop {string} [value="0"] - Value of slider. Not applicable in range mode.
 *
 * @attr {boolean} readonly - Set readonly state
 * @prop {boolean} [readonly=false] - Set readonly state
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 *
 * @fires value-changed - Fired when the user commits a value change. The event is not triggered if `value` property is changed programmatically.
 * @fires from-changed - Fired when the user changes from's value. The event is not triggered if `from` property is changed programmatically.
 * @fires to-changed - Fired when the user changes to's value. The event is not triggered if `to` property is changed programmatically.
 */
@customElement('ef-slider')
export class Slider extends ControlElement {

  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  /**
   * Define styles in a tagged template literal, using the css tag function.
   * @returns CSS template
   */
  static get styles (): CSSResultGroup {
    return css`
      :host {
        display: flex;
      }
      [part=slider-wrapper] {
        position: relative;
        width: 100%;
      }
      [part=slider] {
        width: 100%;
        height: 100%;
        display: inline-block;
      }
      :host(:not([disabled]):focus){
        outline:none;
      }
      :host([show-steps]) [part=track-wrapper]::after {
        display:block;
        position: absolute;
        content: "";
        right: 0;
      }
      [part=track-wrapper]{
        content: "";
        position: absolute;
        width: 100%;
        top: 50%;
        left: 0;
        pointer-events: none;
      }
      [part=thumb-container]{
        outline: none;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 3;
      }
      [part=thumb]{
        position: absolute;
        margin: 0 auto;
      }
      [part=pin]{
        display: flex;
        position: absolute;
        align-items: center;
        justify-content: center;
        z-index: 1;
      }
      :host([show-steps]) [part=step-container]{
        position: absolute;
        left: 0;
        width: 100%;
      }
      :host([show-steps]) [part=step]{
        width: 100%;
        position: absolute;
        left: 0;
      }
      [part=track-fill]{
        z-index: 2;
        content: "";
        position: absolute;
        left: 0;
      }
      :host([show-steps][step="0"]) [part=track-wrapper]::after{
        width: 0;
      }
    `;
  }

  /**
   * Whether if the thumb is being drag
   */
  private dragging = false;

  private valuePrevious = '';
  private fromPrevious = '';
  private toPrevious = '';

  /**
   * Specified size of increment or decrement jump between value.
   */
  @property({ type: String })
  public step = '1';

  /**
   * Set minimum value of slider.
   */
  @property({ type: String })
  public min = '0';

  /**
   * Slider maximum value of slider.
   */
  @property({ type: String })
  public max = '100';

  /**
   * Uses with `range`. Low value of slider in range mode.
   */
  @property({ type: String })
  public from = '0';

  /**
   * Uses with `range`. High value of slider in range mode
   */
  @property({ type: String })
  public to = '100';

  /**
   * Set slider appearances to show pin mode.
   * @ignore
   * NOTE: Pin isn't applicable in Halo. Hide this from document
   */
  @property({ type: Boolean, reflect: true })
  public pin = false;

  /**
   * Set slider to range mode. Instead of a single value, slider will provide `from` and `to`.
   */
  @property({ type: Boolean, reflect: true })
  public range = false;

  /**
   * Show steps marker on slider.
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-steps' })
  public showSteps = false;

  /**
   * Show input number field.
   */
  @property({ type: String, reflect: true, attribute: 'show-input-field' })
  public showInputField: 'readonly' | '' | null = null;

  /**
   * Uses with `range`. Set minimum allowance value (distance) between `from` and `to`.
   */
  @property({ type: String, attribute: 'min-range' })
  public minRange = '0';

  /**
   * Slider internal translation strings
   */
  @translate({ scope: 'ef-slider' })
  protected t!: TranslateDirective;

  /**
   * Converts value from string to number for calculations
   * @returns value of input as a number
   */
  private get valueNumber (): number {
    const value = parseFloat(this.value);
    if (!this.value || isNaN(value)) {
      return 0;
    }

    return value;
  }

  /**
   * Converts min value from string to number for calculations
   * @returns minimum value of slider as a number
   */
  private get minNumber (): number {
    const min = parseFloat(this.min);
    if (!this.min || isNaN(min)) {
      return 0;
    }

    return min;
  }

  /**
   * Converts max value from string to number for calculations
   * @returns maximum value of slider as a number
   */
  private get maxNumber (): number {
    const max = parseFloat(this.max);
    if (!this.max || isNaN(max)) {
      return 100;
    }

    return max;
  }

  /**
   * Converts step value from string to number for calculations
   * @returns step value of slider as a number
   */
  private get stepNumber (): number {
    const step = parseFloat(this.step);
    if (!this.step || isNaN(step)) {
      return 1;
    }

    return step;
  }

  /**
   * Compute and normalise step value for calculations
   * @returns step value that should be inside the min / max boundary
   */
  private get stepRange (): number {
    const step = Math.abs(this.stepNumber);
    if (step > this.maxNumber - this.minNumber && !isDecimalNumber(step)) {
      // new step shouldn't be larger than slider
      return Math.abs(this.maxNumber - this.minNumber);
    }

    return step;
  }

  /**
   * Converts from value from string to number for calculations
   * @returns from value of slider as a number
   */
  private get fromNumber (): number {
    const from = parseFloat(this.from);
    if (!this.from || isNaN(from)) {
      return this.minNumber;
    }

    return from;
  }

  /**
   * Converts to value from string to number for calculations
   * @returns to value of slider as a number
   */
  private get toNumber (): number {
    const to = parseFloat(this.to);
    if (!this.to || isNaN(to)) {
      return this.maxNumber;
    }

    return to;
  }

  /**
   * Converts min-range from string to number for calculations
   * @returns min-range of input as a number
   */
  private get minRangeNumber (): number {
    const minRange = parseFloat(this.minRange);
    if (!this.minRange || isNaN(minRange)) {
      return 0;
    }

    return minRange;
  }

  /**
   * Number of decimal places used for displaying value
   * Based on step or min decimal places
   */
  private get decimalPlace (): number {
    if (isDecimalNumber(this.stepRange) || isDecimalNumber(this.minNumber)) {
      const stepDecimal = countDecimalPlace(this.stepRange);
      const minDecimal = countDecimalPlace(this.minNumber);
      return stepDecimal > minDecimal ? stepDecimal : minDecimal;
    }

    return 0;
  }

  /**
   * Return hide/show input field state
   * @returns true if showInputField value is exist
   */
  private get isShowInputField (): boolean {
    return this.showInputField !== null && this.showInputField !== undefined;
  }

  /**
   * Slider element reference
   */
  private sliderRef: Ref<HTMLDivElement> = createRef();

  /**
   * Slider's track reference
   */
  private trackRef: Ref<HTMLDivElement> = createRef();

  /**
   * From value thumb reference, rendered only in range mode
   */
  private fromThumbRef: Ref<HTMLDivElement> = createRef();

  /**
   * To value thumb reference, rendered only in range mode
   */
  private toThumbRef: Ref<HTMLDivElement> = createRef();

  /**
   * Value thumb reference
   */
  private valueThumbRef: Ref<HTMLDivElement> = createRef();

  /**
   * Number field for slider value
   */
  @query('ef-number-field[name=value]')
  private valueInput!: NumberField;

  /**
   * Number field for from value in range mode
   */
  @query('ef-number-field[name=from]')
  private fromInput!: NumberField;

  /**
   * Number field for to value in range mode
   */
  @query('ef-number-field[name=to]')
  private toInput!: NumberField;

  /**
   * Current focused thumb
   */
  @state()
  private activeThumb: HTMLDivElement | null = null;

  /**
   * Thumb that may involves data changes
   */
  @state()
  private changedThumb: HTMLDivElement | undefined | null = null;

  constructor () {
    super();
    /**
     * @ignore
    */
    this.onDrag = this.onDrag.bind(this);
    /**
     * @ignore
    */
    this.onDragStart = this.onDragStart.bind(this);
    /**
     * @ignore
    */
    this.onDragEnd = this.onDragEnd.bind(this);
    /**
     * @ignore
    */
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  /**
   * On first updated lifecycle
   * @param changedProperties changed properties
   * @returns {void}
   */
  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);

    this.prepareValues();
    this.prepareThumbs();
    this.prepareSliderTrack();
  }

  /**
   * On willUpdate lifecycle
   * @param changedProperties changed properties
   * @returns {void}
   */
  protected willUpdate (changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);

    if ((changedProperties.has('disabled') && changedProperties.get('disabled') !== undefined)
      || (changedProperties.has('readonly') && changedProperties.get('readonly') !== undefined)
    ) {
      this.prepareSliderTrack();
    }

    changedProperties.forEach((_, changedProperty) => {
      if (['value', 'min', 'max', 'from', 'to', 'step', 'minRange'].includes(changedProperty as string)) {
        this.showWarningInvalidProperty(changedProperty as string);
      }
    });
  }

  /**
   * On updated lifecycle
   * @param changedProperties changed properties
   * @returns {void}
   */
  protected updated (changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (changedProperties.has('value')) {
      this.onValueChange();
    }

    if (changedProperties.has('min')) {
      this.onMinChange(changedProperties.get('min') as string);
    }

    if (changedProperties.has('max')) {
      this.onMaxChange(changedProperties.get('max') as string);
    }

    if (this.range) {
      if (changedProperties.has('from')) {
        this.onFromValueChange();
      }
      if (changedProperties.has('to')) {
        this.onToValueChange();
      }
    }

    if (changedProperties.has('step')) {
      this.onStepChange();
    }

    if (changedProperties.has('minRange')) {
      this.onMinRangeChange();
    }

    if (changedProperties.has('range')) {
      this.prepareValues();
      this.prepareThumbs();
    }
  }

  /**
   * Show Warning a warning message invalid property
   * @param propName value for checking
   * @returns {void}
   */
  private showWarningInvalidProperty (propName: string): void {
    let isValid = true;
    let message = '';

    if (propName === 'value') {
      isValid = this.isValueInBoundary(this.valueNumber, '');
      message = 'value should be between min and max.';
    }
    else if (propName === 'min') {
      isValid = this.minNumber <= this.maxNumber;
      message = 'value should be less than max.';
    }
    else if (propName === 'max') {
      isValid = this.maxNumber >= this.minNumber;
      message = 'value should be more than min.';
    }
    else if (propName === 'from' && this.range) {
      isValid = (this.fromNumber >= this.minNumber && this.fromNumber <= this.toNumber);
      message = 'value should be more than min and less than to.';
    }
    else if (propName === 'to' && this.range) {
      isValid = (this.toNumber <= this.maxNumber && this.toNumber >= this.fromNumber);
      message = 'value should be less than max and more than from.';
    }
    else if (propName === 'step') {
      isValid = ((this.maxNumber - this.minNumber) >= this.stepNumber);
      message = 'value should be between min and max.';
    }
    else if (propName === 'minRange' && this.minRangeNumber > 0) {
      const distanceFromTo = Math.abs(this.toNumber - this.fromNumber);
      const distanceMinMax = Math.abs(this.maxNumber - this.minNumber);
      isValid = (distanceMinMax >= this.minRangeNumber && distanceFromTo >= this.minRangeNumber);
      message = 'value should be less than distance from and to, min and max.';
    }

    if (!isValid) {
      new WarningNotice(`${this.localName}: Invalid ${propName} provided, The correct ${propName} ${message}`).show();
    }
  }

  /**
   * Initialises slider value properties
   * @returns {void}
   */
  private prepareValues (): void {
    if (this.minNumber !== this.maxNumber) {
      if (this.range) {
        if (this.minRangeNumber) {
          const distanceFromTo = Math.abs(this.toNumber - this.fromNumber);
          const clampValueFrom = this.toNumber - this.minRangeNumber;

          if (this.minRangeNumber > distanceFromTo) {
            if (clampValueFrom < this.minNumber) {
              this.to = (this.fromNumber + this.minRangeNumber).toString();
            }
            else {
              this.from = clampValueFrom.toString();
            }
          }
        }
        else {
          this.from = clamp((this.fromNumber || this.minNumber), this.minNumber, this.toNumber);
          this.to = clamp((this.toNumber || this.maxNumber), this.fromNumber, this.maxNumber);
        }
      }
      else {
        this.value = clamp(this.valueNumber, this.minNumber, this.maxNumber);
      }
    }
    else if (this.range) {
      this.from = this.min;
      this.to = this.max;
    }
    else {
      this.value = this.min;
    }

    this.valuePrevious = this.value;
    this.toPrevious = this.to;
    this.fromPrevious = this.from;
  }

  /**
   * Add event listeners to thumbs depending on mode
   * @returns {void}
   */
  private prepareThumbs (): void {
    if (this.range) {
      this.fromThumbRef.value?.addEventListener('keydown', this.onKeyDown);
      this.fromThumbRef.value?.addEventListener('drag', preventDefault);
      this.fromThumbRef.value?.addEventListener('dragstart', preventDefault);
      this.fromThumbRef.value?.addEventListener('dragend', preventDefault);

      this.toThumbRef.value?.addEventListener('keydown', this.onKeyDown);
      this.toThumbRef.value?.addEventListener('drag', preventDefault);
      this.toThumbRef.value?.addEventListener('dragstart', preventDefault);
      this.toThumbRef.value?.addEventListener('dragend', preventDefault);
    }
    else {
      this.valueThumbRef.value?.addEventListener('keydown', this.onKeyDown);
      this.valueThumbRef.value?.addEventListener('drag', preventDefault);
      this.valueThumbRef.value?.addEventListener('dragstart', preventDefault);
      this.valueThumbRef.value?.addEventListener('dragend', preventDefault);
    }
  }

  /**
   * Add or remove event listener on slider track depending on slider disabled and readonly state
   * @returns {void}
   */
  private prepareSliderTrack (): void {
    if (this.disabled || this.readonly) {
      this.sliderRef.value?.removeEventListener('mousedown', this.onDragStart);
      this.sliderRef.value?.removeEventListener('touchstart', this.onDragStart);
    }
    else {
      this.sliderRef.value?.addEventListener('mousedown', this.onDragStart, { passive: true });
      this.sliderRef.value?.addEventListener('touchstart', this.onDragStart, { passive: true });
    }
  }

  /**
   * Get slider data name from keyboard event target
   * @param target target element
   * @returns Slider data name
   */
  private getThumbName (target: EventTarget | null): SliderDataName | null {
    switch (target) {
      case this.fromThumbRef.value:
        return SliderDataName.from;
      case this.toThumbRef.value:
        return SliderDataName.to;
      case this.valueThumbRef.value:
        return SliderDataName.value;
      default:
        return null;
    }
  }

  /**
   * Handles key down event on thumbs
   * @param event Keyboard event
   * @returns {void}
   */
  private onKeyDown (event: KeyboardEvent): void {
    if (this.readonly || event.defaultPrevented || this.minNumber >= this.maxNumber) {
      return;
    }

    // Ignore special keys
    if (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) {
      return;
    }

    const thumbName = this.getThumbName(event.target);
    if (!thumbName) {
      return;
    }

    this.changedThumb = event.target as HTMLDivElement;

    switch (event.key) {
      case 'ArrowDown':
      case 'Down':
      case 'ArrowLeft':
      case 'Left':
        this.onApplyStep(Direction.Down, thumbName);
        break;
      case 'ArrowUp':
      case 'Up':
      case 'ArrowRight':
      case 'Right':
        this.onApplyStep(Direction.Up, thumbName);
        break;
      case 'Home':
        this.onApplyMin(thumbName);
        break;
      case 'End':
        this.onApplyMax(thumbName);
        break;
      default:
        return;
    }

    event.preventDefault();
  }

  /**
   * Set thumb to minimum value possible
   * @param data type of data to change
   * @returns {void}
   */
  private onApplyMin (data: SliderDataName): void {
    let position;
    if (data === SliderDataName.from || data === SliderDataName.value) {
      position = this.calculatePosition(this.minNumber, 1);
    }
    else {
      position = this.calculatePosition(this.fromNumber + this.minRangeNumber, 1);
    }

    const possibleValue = this.getNearestPossibleValue(position);
    const value = this.getValueFromPosition(possibleValue);

    this.persistChangedData(value);
    this.dispatchDataChangedEvent();
  }

  /**
   * Set thumb to maximum value possible
   * @param data type of data to change
   * @returns {void}
   */
  private onApplyMax (data: SliderDataName): void {
    let position;
    if (data === SliderDataName.to || data === SliderDataName.value) {
      position = this.calculatePosition(this.maxNumber, 1);
    }
    else {
      position = this.calculatePosition(this.toNumber - this.minRangeNumber, 1);
    }

    const possibleValue = this.getNearestPossibleValue(position);
    const value = this.getValueFromPosition(possibleValue);

    this.persistChangedData(value);
    this.dispatchDataChangedEvent();
  }

  /**
   * Increase or decrease value depending on direction
   * Then fires value change event
   * @param direction Up or Down
   * @param data type of data to change
   * @returns {void}
   */
  private onApplyStep (direction: Direction, data: SliderDataName): void {
    // Get current thumb position and step in percentage format
    const thumbPosition = this.calculatePosition(this[`${data}Number`], 1);
    const step = this.calculatePosition(this.minNumber + this.stepRange, 1);

    const possibleValue = direction === Direction.Up ? thumbPosition + step : thumbPosition - step;
    const nearestPossibleValue = this.getNearestPossibleValue(possibleValue);
    const value = this.getValueFromPosition(nearestPossibleValue);

    this.persistChangedData(value);
    this.dispatchDataChangedEvent();
  }

  /**
   * Calculate thumb position based on value and multiplier
   * @param value decimal fraction value
   * @param multiplier defaults to 100
   * @returns thumb position as a fraction of 100
   */
  private calculatePosition (value: number, multiplier = 100): number {
    const position = Math.abs(((value - this.minNumber) / (this.maxNumber - this.minNumber)) * multiplier);

    if (position > multiplier) {
      return multiplier;
    }

    return position;
  }

  /**
   * Adds active attribute used in styling
   * @param event focus event
   * @returns {void}
   */
  private onThumbFocus (event: FocusEvent): void {
    this.activeThumb = event.target as HTMLDivElement;
  }

  /**
   * Removes active attribute used in styling
   * @param event focus event
   * @returns {void}
   */
  private onThumbBlur (): void {
    this.activeThumb = null;
  }

  /**
   * On number-field blur
   * @param event focus event
   * @returns {void}
   */
  private onNumberFieldBlur (event: FocusEvent): void {
    if (this.readonly) {
      return;
    }

    const { value, name } = event.target as NumberField;

    const currentData = name as SliderDataName;
    const previousData = `${name}Previous` as SliderPreviousDataName;

    if (value && this[currentData] !== value) {
      this.updateNotifyProperty(currentData, value);
      this[previousData] = value;
    }

    event.preventDefault();
  }

  /**
   * On number-field keydown
   * @param event keyboard event
   * @returns {void}
   */
  private onNumberFieldKeyDown (event: KeyboardEvent): void {
    if (this.readonly || this.disabled) {
      return;
    }

    if (event.key === ' ' || event.key === 'Spacebar' || event.key === 'Enter') {
      (event.target as NumberField).blur();
    }
  }

  /**
   * Update notify property by input name attribute
   * @param name name input attribute
   * @param value input value
   * @returns {void}
   */
  private updateNotifyProperty (name: SliderDataName, value: string): void {
    let shouldUpdate = false;

    if (name === SliderDataName.to) {
      shouldUpdate = this.isValueInBoundary(Number(value), SliderDataName.to);
    }
    else {
      shouldUpdate = this.isValueInBoundary(Number(value), '');
    }

    if (shouldUpdate) {
      (this[name]) = value;
      this.notifyPropertyChange(name, value);
    }
    else {
      const inputName = `${name}Input`;
      this[inputName as NumberFieldName].value = this[name];
    }
  }

  /**
   * Dispatch data {value, from, to} changed event
   * @returns {void}
   */
  private dispatchDataChangedEvent (): void {
    const name = this.changedThumb?.getAttribute('name') || '';
    const currentData = name as SliderDataName;
    const previousData = `${name}Previous` as SliderPreviousDataName;

    // Dispatch event only when value or from or to changed
    if (this[previousData] !== this[currentData]) {
      this.notifyPropertyChange(name, this[currentData]);
      this[previousData] = this[currentData];
    }
  }

  /**
   * Start dragging event on slider
   * @param event event dragstart
   * @returns {void}
   */
  private onDragStart (event: MouseEvent | TouchEvent): void {
    this.dragging = true;
    this.classList.add('grabbable');

    if (this.range) {
      const mousePosition = this.getMousePosition(event);
      const relativeMousePosition = ((this.maxNumber - this.minNumber) * mousePosition) + this.minNumber;
      const distanceFrom = Math.abs(relativeMousePosition - this.fromNumber);
      const distanceTo = Math.abs(relativeMousePosition - this.toNumber);

      if (distanceFrom < distanceTo) {
        this.changedThumb = this.fromThumbRef.value;
      }
      else if (distanceFrom > distanceTo) {
        this.changedThumb = this.toThumbRef.value;
      }
      // When from === to, use latest value of changedThumb and z-index will determine thumb on top
    }
    else {
      this.changedThumb = this.valueThumbRef.value;
    }

    this.onDrag(event);

    if ((event as TouchEvent).changedTouches) {
      this.addEventListener('touchmove', this.onDrag);
      this.addEventListener('touchend', this.onDragEnd);
    }
    else {
      window.addEventListener('mousemove', this.onDrag);
      window.addEventListener('mouseup', this.onDragEnd);
    }
  }

  /**
   * Get mouse position in percentage value
   * @param event event mousemove and touchmove
   * @returns mouse position by percentage
   */
  private getMousePosition (event: TouchEvent | MouseEvent): number {
    const sliderRect = this.trackRef.value?.getBoundingClientRect();

    if (!sliderRect) {
      return 1;
    }

    // check drag desktop or mobile
    const pageX = (event as TouchEvent).changedTouches ? (event as TouchEvent).changedTouches[0].pageX : (event as MouseEvent).pageX;
    const positionSize = pageX - sliderRect.left;

    if (positionSize <= sliderRect.width) {
      return Math.min(Math.max((pageX - sliderRect.left) / sliderRect.width, 0), 1);
    }
    else {
      return 1;
    }
  }

  /**
   * Dragging after on dragging start event
   * @param event event mousemove and touchmove
   * @returns {void}
   */
  private onDrag (event: MouseEvent | TouchEvent): void {
    if (this.minNumber === this.maxNumber) {
      return;
    }

    const thumbPosition = this.getMousePosition(event);
    const nearestValue = this.getNearestPossibleValue(thumbPosition);

    if (nearestValue > 1) {
      return;
    }

    const newThumbPosition = this.stepRange !== 0 ? nearestValue : thumbPosition;
    const value = this.getValueFromPosition(newThumbPosition);

    this.persistChangedData(value);
  }

  /**
   * Saves changed data into correct field
   * @param value value of changed data
   * @returns {void}
   */
  private persistChangedData (value: number): void {
    const newValue = this.format(value);
    if (this.range) {
      if (this.changedThumb === this.fromThumbRef.value) {
        this.from = this.validateFrom(Number(newValue)).toString();
      }
      else {
        this.to = this.validateTo(Number(newValue)).toString();
      }
    }
    else {
      this.value = newValue;
    }
  }

  /**
   * Validate and return FROM value within available range
   * @param value from value
   * @returns validated from value
   */
  private validateFrom (value: number): number {
    const valueFrom = value + this.minRangeNumber;
    if (valueFrom < this.toNumber && valueFrom >= this.minNumber) {
      return value;
    }

    return this.toNumber - this.minRangeNumber;
  }

  /**
   * Validate and return TO value within available range
   * @param value to value
   * @returns validated to value.
   */
  private validateTo (value: number): number {
    const valueTo = value - this.minRangeNumber;
    if (valueTo > this.fromNumber && valueTo <= this.maxNumber) {
      return value;
    }

    return this.fromNumber + this.minRangeNumber;
  }

  /**
   * Calculate the nearest possible step value depending on step interval
   * @param thumbPosition current thumb position in fraction
   * @returns nearest available slider step in fraction
   */
  private getNearestPossibleValue (thumbPosition: number): number {
    const stepSize = this.calculatePosition(this.minNumber + this.stepRange, 1);
    const nearestValue = Math.round(thumbPosition / stepSize) * stepSize;

    if (thumbPosition <= nearestValue + (stepSize / 2)) {
      if (nearestValue <= 1) {
        return nearestValue;
      }
      return nearestValue - stepSize;
    }

    return nearestValue + stepSize;
  }

  /**
   * Get slider value from thumb position
   * @param position thumb position
   * @returns calculated value
   */
  private getValueFromPosition (position: number): number {
    const value = this.minNumber + position * (this.maxNumber - this.minNumber);
    // if value is outside boundary, set to boundary
    if (value >= this.maxNumber) {
      return this.maxNumber;
    }
    else if (value <= this.minNumber) {
      return this.minNumber;
    }
    else {
      return value;
    }
  }

  /**
   * Format value to display in both integer and fraction cases
   * @param value value before use display
   * @returns formatted value
   */
  private format (value: number): string {
    if (isDecimalNumber(value) && countDecimalPlace(value) > this.decimalPlace) {
      return value.toFixed(this.decimalPlace);
    }

    return value.toString();
  }

  /**
   * End dragging event and remove dragging event
   * @param event event mouseup and touchmove
   * @returns {void}
   */
  private onDragEnd (event: MouseEvent | TouchEvent): void {
    if (this.dragging) {
      this.dragging = false;
      const touchEvent: TouchEvent = event as TouchEvent;
      if (touchEvent.changedTouches) {
        this.removeEventListener('touchmove', this.onDrag);
        this.removeEventListener('touchend', this.onDragEnd);
      }
      else {
        window.removeEventListener('mousemove', this.onDrag);
        window.removeEventListener('mouseup', this.onDragEnd);
      }

      this.classList.remove('grabbable');
      if (this.classList.length === 0) {
        this.removeAttribute('class');
      }

      if (!touchEvent.changedTouches) {
        event.preventDefault();
      }

      this.dispatchDataChangedEvent();
    }
  }

  /**
   * Value observer
   * @returns {void}
   */
  private onValueChange (): void {
    if (this.readonly) {
      const thumbPosition = this.calculatePosition(this.valueNumber, 1);
      const nearestPossibleValue = this.getNearestPossibleValue(thumbPosition);

      const value = this.getValueFromPosition(this.stepRange === 0 ? thumbPosition : nearestPossibleValue);
      this.value = this.format(value);
    }
    else if (this.isValueInBoundary(this.valueNumber, '')) {
      this.value = this.format(this.valueNumber);
    }
    else if (this.valueNumber < this.minNumber) {
      this.value = this.min;
    }
    else if (this.valueNumber > this.maxNumber) {
      this.value = this.max;
    }

    if (!this.dragging) {
      // Update internal `valuePrevious` when `value` was programatically set by user.
      this.valuePrevious = this.value;
    }
  }

  /**
   * From value observer
   * @returns {void}
   */
  private onFromValueChange (): void {
    if (this.isValueInBoundary(this.fromNumber, SliderDataName.from)) {
      this.from = this.format(this.fromNumber);
    }
    else {
      // if value is outside boundary, set to boundary
      if (this.fromNumber < this.minNumber) {
        this.from = this.min;
      }
      else if (this.fromNumber > this.toNumber) {
        this.from = this.to;
      }

      if (this.minRangeNumber) {
        const distanceFromTo = Math.abs(this.toNumber - this.fromNumber);
        const distanceMin = this.toNumber - this.minRangeNumber;
        if (this.minRangeNumber > distanceFromTo && distanceMin > this.minNumber) {
          this.from = distanceMin.toString();
        }
      }
    }

    if (!this.dragging) {
      this.fromPrevious = this.from;
    }
  }

  /**
   * Check if value is inside min / max boundary
   * @param value value is checking
   * @param valueFor notation variable binding if range === true
   * @returns true if value and step inside a boundary
   */
  private isValueInBoundary (value: number, valueFor: string): boolean {
    if (this.minNumber < this.maxNumber) {
      // Check if value is in range
      if (this.range) {
        if (valueFor === SliderDataName.to) {
          if (value < (this.fromNumber + this.minRangeNumber) || value > this.maxNumber) {
            return false;
          }
        }
        else if (value < this.minNumber || value > (this.toNumber - this.minRangeNumber)) {
          return false;
        }
      }
      else if (value < this.minNumber || value > this.maxNumber) {
        return false;
      }

      // check step min and max in range
      if (this.stepRange < this.minNumber || this.stepRange > this.maxNumber) {
        return true;
      }
    }
    return true;
  }

  /**
   * To value observer
   * @returns {void}
   */
  private onToValueChange (): void {
    if (this.isValueInBoundary(this.toNumber, SliderDataName.to)) {
      this.to = this.format(this.toNumber);
    }
    else {
      // if value is outside boundary, set to boundary
      if (this.toNumber < this.fromNumber) {
        this.to = this.from;
      }
      else if (this.toNumber > this.maxNumber) {
        this.to = this.max;
      }

      if (this.minRangeNumber) {
        const distanceFromTo = Math.abs(this.toNumber - this.fromNumber);
        const distanceMax = this.fromNumber + this.minRangeNumber;
        if (this.minRangeNumber > distanceFromTo && distanceMax < this.maxNumber) {
          this.to = distanceMax.toString();
        }
      }
    }
    if (!this.dragging) {
      this.toPrevious = this.to;
    }
  }

  /**
   * Step observer
   * @returns {void}
   */
  private onStepChange (): void {
    this.step = this.stepNumber.toString();
  }

  /**
   * Min range observer
   * @returns {void}
   */
  private onMinRangeChange (): void {
    const valueMinRange = Math.abs(this.minRangeNumber);
    const maximumRangeMinMax = Math.abs(this.maxNumber - this.minNumber);
    const maximumRangeFromTo = Math.abs(this.toNumber - this.fromNumber);

    if (valueMinRange && valueMinRange >= this.stepNumber) {
      if (valueMinRange <= maximumRangeMinMax && valueMinRange <= maximumRangeFromTo) {
        this.minRange = valueMinRange.toString();
      }
      else {
        this.minRange = maximumRangeMinMax.toString();
        this.from = this.min;
        this.to = this.max;
      }
    }
    else {
      // Reset min-range when min-range less step
      this.minRange = '0';
    }
  }

  /**
   * Min observer
   * @param oldValue old value of min property
   * @returns {void}
   */
  private onMinChange (oldValue: string): void {
    this.min = this.minNumber.toString();

    if (this.minNumber > this.maxNumber) {
      this.min = this.max;
      return;
    }

    if (this.range) {
      if (this.minNumber <= this.toNumber - this.minRangeNumber) {
        this.from = clamp(this.fromNumber, this.minNumber, this.toNumber);
      }
      else if (oldValue) {
        this.min = oldValue;
      }
    }
    else {
      this.value = clamp(this.valueNumber, this.minNumber, this.maxNumber);
    }
  }

  /**
   * Max observer
   * @param oldValue old value of max property
   * @returns {void}
   */
  private onMaxChange (oldValue: string): void {
    this.max = this.maxNumber.toString();

    if (this.maxNumber < this.minNumber) {
      this.max = this.min;
      return;
    }

    if (this.range) {
      if (this.maxNumber >= this.fromNumber + this.minRangeNumber) {
        this.to = clamp(this.toNumber, this.fromNumber, this.maxNumber);
      }
      else if (oldValue) {
        this.max = oldValue;
      }
    }
    else {
      this.value = clamp(this.valueNumber, this.minNumber, this.maxNumber);
    }
  }

  /**
   * Implement `render` Track template.
   * @param range show range slider
   * @returns Track template
   */
  private renderTrack (range: boolean): TemplateResult {
    const stepContainerSize: number = this.calculatePosition(this.minNumber + this.stepNumber);
    const translateX = (stepContainerSize / 2);
    const stepsStyle = { transform: `translateX(${translateX}%)`, backgroundSize: `${stepContainerSize}% 100%` };
    const stepContainerStyle = { transform: `translateX(-${translateX}%)` };

    const trackFillStyle: StyleMap = range
      ? { width: `${this.calculatePosition(this.toNumber) - this.calculatePosition(this.fromNumber)}%`, left: `${this.calculatePosition(this.fromNumber)}%` }
      : { width: `${this.calculatePosition(Number(this.value))}%` };

    return html`
      <div part="track-wrapper" ${ref(this.trackRef)}>
        <div part="track-fill" style=${styleMap(trackFillStyle)}></div>
        <div part="step-container" style=${styleMap(stepContainerStyle)}>
          <div part="step" style=${styleMap(stepsStyle)}></div>
        </div>
      </div>
    `;
  }

  /**
   * Implement `render` Thumb template.
   * @param value thumb value in track
   * @param thumbPosition thumb position in track
   * @param name name of thumb to render
   * @returns Thumb template
   */
  private thumbTemplate (value: number, thumbPosition: number, name: string): TemplateResult {
    const isActive = this.activeThumb?.getAttribute('name') === name;
    const isChanged = this.changedThumb?.getAttribute('name') === name;

    const valueNow = this.range ? name === SliderDataName.from ? this.from : this.to : this.value;
    const valueMin = this.range ? name === SliderDataName.from ? this.min : this.fromNumber + this.minRangeNumber : this.min;
    const valueMax = this.range ? name === SliderDataName.from ? this.toNumber - this.minRangeNumber : this.max : this.max;

    const thumbStyle = { left: `${thumbPosition}%`, zIndex: this.range ? isChanged ? '4' : '3' : null };

    return html`
      <div
        ${ref(this[`${name as SliderDataName}ThumbRef`])}
        @focus=${this.onThumbFocus}
        @blur=${this.onThumbBlur}
        active=${ifDefined(isActive || undefined)}
        name="${name}"
        role="slider"
        aria-label="${this.t(name.toUpperCase())}"
        tabindex="1"
        aria-valuemin=${valueMin}
        aria-valuemax=${valueMax}
        aria-valuenow=${valueNow}
        part="thumb-container"
        style=${styleMap(thumbStyle)}
      >
        <div part="pin">
          <span part="pin-value-marker">${value}</span>
        </div>
        <div part="thumb" draggable="true"></div>
      </div>
    `;
  }

  /**
   * Renders thumb template depending on parameter
   * @param from thumb value start in track
   * @param to thumb value end in track (optional)
   * @returns Thumbs template
   */
  private renderThumb (from: number, to?: number): TemplateResult {
    return html`
      ${this.thumbTemplate(from, this.calculatePosition(from), to ? SliderDataName.from : SliderDataName.value)}
      ${to && this.thumbTemplate(to, this.calculatePosition(to), SliderDataName.to)}
    `;
  }

  /**
   * Implement `render` number field has template.
   * @param value value in the slider for binding in the input value
   * @param name name input value
   * @returns {TemplateResult} number field template
   */
  private renderNumberField (value: string, name: string): TemplateResult {
    /**
     * Hiding number-field from screen reader and tabbing sequence because it's redundant,
     * and complicate the accessibility implementation.
     */
    return html`
      <ef-number-field
        tabindex="-1"
        aria-hidden="true"
        @blur=${this.onNumberFieldBlur}
        @keydown=${this.onNumberFieldKeyDown}
        part="input"
        name="${name}"
        no-spinner
        .value="${value}"
        min="${this.min}"
        max="${this.max}"
        step="${this.step}"
        ?disabled="${this.disabled}"
        ?readonly="${this.readonly || this.showInputField === 'readonly'}"
      ></ef-number-field>
    `;
  }

  /**
   * Implement `render` slider template.
   * @returns Slider template
   */
  protected render (): TemplateResult {
    return html`
      ${this.range && this.isShowInputField ? this.renderNumberField(this.from, SliderDataName.from) : null}
      <div part="slider-wrapper">
        <div part="slider" ${ref(this.sliderRef)}>
          ${this.renderTrack(this.range)}
          ${this.range ? this.renderThumb(this.fromNumber, this.toNumber) : this.renderThumb(this.valueNumber)}
        </div>
      </div>
      ${this.range && this.isShowInputField ? this.renderNumberField(this.to, SliderDataName.to) : null}
      ${!this.range && this.isShowInputField ? this.renderNumberField(this.value, SliderDataName.value) : null}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ef-slider': Slider;
  }
}
