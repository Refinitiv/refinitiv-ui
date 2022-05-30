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
 * @fires value-changed - Fired when the `value` changes.
 */
@customElement('ef-rating', {
  alias: 'sapphire-rating'
})
export class Rating extends BasicElement {

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
   * @returns CSS template
   */
  static get styles (): CSSResultGroup {
    return css`
      :host {
        display: inline-block;
      }
    `;
  }

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
  private _max = '5';

  /**
   * Set number of total stars
   * @param max max value
   * @default '5'
   */
  @property({ type: String })
  public set max (max: string) {
    const newMax = max && this.isValidValue(max) ? `${Math.round(Number(max))}` : '5';
    const oldMax = this._max;
    if (oldMax !== newMax) {
      this._max = newMax;
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
    const newValue = this.isValidValue(value) ? `${Number(value)}` : '0';
    const oldValue = this._value;
    if (oldValue !== newValue) {
      this._value = newValue;
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
  protected willUpdate (changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('interactive')) {
      this.interactiveChanged();
    }
    if (changedProperties.has('value')) {
      if (this.interactive) {
        this.setAttribute('aria-valuenow', this.value);
      }
    }
    if (changedProperties.has('max')) {
      if (this.interactive) {
        this.setAttribute('aria-valuemax', this.max);
      }
    }
  }

  /**
   * Invoked when the element is first updated
   * @param changedProperties changed properties
   * @returns {void}
   */
  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.addEventListener('keydown', this.onKeyDown);
  }

  /**
   * Handles interactive and aria attribute changes
   * @returns {void}
   */
  private interactiveChanged (): void {
    if (this.interactive) {
      this.setAttribute('role', 'slider');
      this.setAttribute('aria-valuemin', `${this.MIN_VALUE}`);
      this.setAttribute('aria-valuenow', this.value);
      this.setAttribute('aria-valuemax', this.max);
      this.setAttribute('tabindex', '0');
    }
    else {
      this.removeAttribute('role');
      this.removeAttribute('aria-valuemin');
      this.removeAttribute('aria-valuenow');
      this.removeAttribute('aria-valuemax');
      this.removeAttribute('tabindex');
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
      case 'Right':
      case 'Up':
      case 'ArrowRight':
      case 'ArrowUp':
        this.stepUp();
        break;
      case 'Left':
      case 'Down':
      case 'ArrowLeft':
      case 'ArrowDown':
        this.stepDown();
        break;
      case 'Home':
        this.updateValue(this.MIN_VALUE);
        break;
      case 'End':
        this.updateValue(this.maxNumber);
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
  private updateValue (value: number): void {
    const newValue = value.toString();
    if (this.value !== newValue) {
      this.value = newValue;
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
   * Increases the value of rating by half or 1 but not exceed max value
   * @returns {void}
   */
  private stepUp (): void {
    const newValue = clamp(Math.floor(this.valueNumber + 1), this.MIN_VALUE, this.maxNumber);
    this.updateValue(newValue);
  }

  /**
   * Decrease the value of rating by half or 1 but not exceed min value
   * @returns {void}
   */
  private stepDown (): void {
    if (this.valueNumber > 0 && this.valueNumber < this.MIN_VALUE) {
      return;
    }

    const newValue = clamp(Math.round(this.valueNumber - 1), this.MIN_VALUE, this.maxNumber - 1);
    this.updateValue(newValue);
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
  private get StarsTemplate (): TemplateResult[] {
    const stars = [];
    for (let i = 0; i < this.maxNumber; i += 1) {
      const reverseIdx = this.valueNumber - (this.maxNumber - i) + 1;
      const v = reverseIdx > 0 ? Math.min(1, reverseIdx) : 0;
      const selected = v >= 0.75 ? 'full' : v >= 0.25 ? 'half' : false;
      const className = selected ? `icon icon-${selected}` : 'icon';
      stars.push(html`<div part="${className}" @tap="${(): void => this.handleTap(i)}"></div>`);
    }
    return stars;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
      <div part="container">
        ${this.StarsTemplate}
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ef-rating': Rating;
  }
}
