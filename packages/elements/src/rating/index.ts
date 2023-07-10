import {
  BasicElement,
  html,
  css,
  TemplateResult,
  CSSResultGroup,
  PropertyValues
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { VERSION } from '../version.js';
import { clamp } from './utils.js';

/**
 * Star visualisation component that is generally used for ranking
 * @fires value-changed - Fired when the user commits a value change. The event is not triggered if `value` property is changed programmatically.
 */
@customElement('ef-rating')
export class Rating extends BasicElement {

  /**
   * Element version number
   * @returns version number
   */
  static override get version (): string {
    return VERSION;
  }

  /**
   * A `CSSResultGroup` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @returns CSS template
   */
  static override get styles (): CSSResultGroup {
    return css`
      :host {
        display: inline-block;
      }
    `;
  }

  private MAX_VALUE = '5'; // default max value

  private MIN_VALUE = 1; // min value of interactive mode

  /**
   * Make it possible to interact with rating control and change the value
   */
  @property({ type: Boolean, reflect: true })
  public interactive = false;

  /**
   * Internal max value of rating.
   * Controlled by public setter and getter
   */
  private _max = this.MAX_VALUE;

  /**
   * Set number of total stars
   * @param max max value
   * @default '5'
   */
  @property({ type: String })
  public set max (max: string) {
    const newMax = max && this.isValidValue(max) ? Math.round(Number(max)).toString() : this.MAX_VALUE;
    const oldMax = this._max;
    if (oldMax !== newMax) {
      this._max = newMax;
      if (this.interactive) {
        this.setAttribute('aria-valuemax', newMax);
      }
      this.requestUpdate('max', oldMax);
    }
  }
  public get max (): string {
    return this._max;
  }

  /**
   * Converts max value from string to number for calculations
   * @returns maximum value of rating as a number
   */
  private get maxNumber (): number {
    return Number(this.max);
  }

  /**
   * Internal value of rating.
   * Controlled by public setter and getter
   */
  private _value = '0';

  /**
   * Set number of selected stars. Value can be any number between 0 and `max`.
   * Decimal values are calculated to empty star (0 - .25); half-star (.25 - .75) and full star (.75 - 1)
   * @param value Element value
   * @default '0'
   */
  @property({ type: String })
  public set value (value: string) {
    const newValue = this.isValidValue(value) ? Number(value).toString() : '0';
    const oldValue = this._value;
    if (oldValue !== newValue) {
      this._value = newValue;
      if (this.interactive) {
        this.setAttribute('aria-valuenow', newValue);
      }
      this.requestUpdate('value', oldValue);
    }
  }
  public get value (): string {
    return this._value;
  }

  /**
   * Converts value from string to number for calculations
   * @returns value of rating as a number
   */
  private get valueNumber (): number {
    return Number(this.value);
  }

  /**
   * Called before update() to compute values needed during the update.
   * @param changedProperties Properties that has changed
   * @returns {void}
   */
  protected override willUpdate (changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('interactive')) {
      this.interactiveChanged();
    }
  }

  /**
   * Invoked when the element is first updated
   * @param changedProperties changed properties
   * @returns {void}
   */
  protected override firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  /**
   * Handles interactive and aria attribute changes
   * @returns {void}
   */
  private interactiveChanged (): void {
    if (this.interactive) {
      this.setAttribute('role', 'slider');
      this.setAttribute('aria-valuemin', this.MIN_VALUE.toString());
      this.setAttribute('aria-valuenow', this.value);
      this.setAttribute('aria-valuemax', this.max);
      this.setAttribute('tabindex', this.getAttribute('tabindex') || '0');
    }
    else {
      if (this.getAttribute('role') === 'slider') {
        this.removeAttribute('role');
      }
      this.removeAttribute('aria-valuemin');
      this.removeAttribute('aria-valuenow');
      this.removeAttribute('aria-valuemax');
    }
  }

  /**
   * Handles key input
   * @param event Key down event object
   * @returns {void}
   */
  protected onKeyDown (event: KeyboardEvent): void {
    if (event.defaultPrevented || !this.interactive) {
      return;
    }

    // Ignore special keys
    if (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) {
      return;
    }

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        this.stepUp();
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        this.stepDown();
        break;
      case 'Home':
        this.stepDown(this.MIN_VALUE);
        break;
      case 'End':
        this.stepUp(this.maxNumber);
        break;
      default:
        return;
    }

    event.preventDefault();
  }

  /**
   * Update value and fired value-changed event
   * @param value value to updated
   * @returns {void}
   */
  private notifyValueChange (value: string): void {
    if (this.value !== value) {
      this.value = value;
      this.notifyPropertyChange('value', this.value);
    }
  }

  /**
   * Check if passed value is a valid value
   * @override
   * @param value Value to check
   * @returns {boolean} false if value is invalid
   */
  protected isValidValue (value: string): boolean {
    const number = Number(value);
    return !isNaN(number) && isFinite(number);
  }

  /**
   * Increases the value of rating by half or 1 if not specific amount but not exceed max value
   * @param value step up value to specific number (optional)
   * @returns {void}
   */
  private stepUp (value?: number): void {
    if (this.valueNumber > this.maxNumber) {
      return;
    }

    const newValue = value || clamp(Math.floor(this.valueNumber + 1), this.MIN_VALUE, this.maxNumber);
    this.notifyValueChange(newValue.toString());
  }

  /**
   * Decrease the value of rating by half or 1 if not specific amount but not exceed min value
   * @param value step down value to specific number (optional)
   * @returns {void}
   */
  private stepDown (value?: number): void {
    if (this.valueNumber < this.MIN_VALUE) {
      return;
    }

    const newValue = value || clamp(Math.round(this.valueNumber - 1), this.MIN_VALUE, this.maxNumber - 1);
    this.notifyValueChange(newValue.toString());
  }

  /**
   * Process click event to set the new value
   * @param {number} index index of star
   * @returns {void}
   */
  private handleTap (index: number): void {
    if (!this.interactive) {
      return;
    }

    const newValue = this.maxNumber - index;
    if (this.valueNumber !== newValue) {
      this.value = newValue.toString();
      this.notifyPropertyChange('value', this.value);
    }
  }

  /**
   * Render rating based on max number of stars and value.
   * Note: to speed up the component, hover state is implemented using CSS only.
   * CSS3 specification does not allow to select items preceding the hover, but allows to select the following items.
   * Therefore `flex: reverse` style is applied and the items are constructed in the reverse mode to mimic the correct behaviour.
   * @returns stars template
   */
  private get starsTemplate (): TemplateResult[] {
    const stars = [];
    for (let index = 0; index < this.maxNumber; index += 1) {
      const reverseIndex = this.valueNumber - (this.maxNumber - index) + 1;
      const starValue = reverseIndex > 0 ? Math.min(1, reverseIndex) : 0;
      const selected = starValue >= 0.75 ? 'full' : starValue >= 0.25 ? 'half' : false;
      const className = selected ? `icon icon-${selected}` : 'icon';
      stars.push(html`<div part="${className}" @tap="${(): void => this.handleTap(index)}"></div>`);
    }
    return stars;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected override render (): TemplateResult {
    return html`
      <div part="container">
        ${this.starsTemplate}
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ef-rating': Rating;
  }
}
