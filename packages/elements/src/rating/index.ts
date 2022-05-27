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
import { repeat } from '@refinitiv-ui/core/directives/repeat.js';
import { VERSION } from '../version.js';
interface ItemType {
  item: string;
}

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

  private items: ItemType[] = [];
  private valuePrevious = 0;

  private interactiveMinValue = 1; // min value of interactive mode

  /**
   * Make it possible to interact with rating control and change the value
   */
  @property({ type: Boolean, reflect: true })
  public interactive = false;

  /**
    * Set number of total stars
    */
  @property({ type: String })
  public max = '5';

  /**
    * Set number of selected stars. Value can be any number between 0 and `max`.
    * Decimal values are calculated to empty star (0 - .25); half-star (.25 - .75) and full star (.75 - 1)
    */
  @property({ type: String, reflect: true })
  public value = '0';

  /**
   * Converts value from string to number for calculations
   * @returns value of rating as a number
   */
  private get valueNumber (): number {
    const value = parseFloat(this.value);
    if (!this.value || isNaN(value)) {
      return 0;
    }

    return value;
  }

  /**
   * Converts max value from string to number for calculations
   * @returns maximum value of rating as a number
   */
  private get maxNumber (): number {
    let max = parseFloat(this.max);
    if (!this.max || isNaN(max)) {
      return 5;
    }
    // Prevent decimal max value
    max = max % 1 === 0 ? max : Math.round(max);
    return max;
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
      if (changedProperties.has('value')) {
        this.setAttribute('aria-valuenow', this.value);
      }
      if (changedProperties.has('max')) {
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
   * Invoked whenever the element properties are updated
   * @param changedProperties changed properties
   * @returns {void}
   */
  protected updated (changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    changedProperties.forEach((_, propName) => {
      if (propName === 'value') {
        this.value = this.valueNumber.toString();
        this.computeRating(this.maxNumber, this.valueNumber);
      }
      else if (propName === 'max') {
        this.max = this.maxNumber.toString();
        this.computeRating(this.maxNumber, this.valueNumber);
      }
    });
  }

  /**
   * Compute rating based on max number of stars and value.
   * Note: to speed up the component, hover state is implemented using CSS only.
   * CSS3 specification does not allow to select items preceding the hover, but allows to select the following items.
   * Therefore `flex: reverse` style is applied and the items are constructed in the reverse mode to mimic the correct behaviour.
   * @param {Number} max Number of stars
   * @param {Number} value Value
   * @returns {void}
   */
  private computeRating (max: number, value: number): void {

    this.items = [];
    for (let i = 0; i < max; i += 1) {
      const reverseIdx = value - (max - i) + 1;
      const v = reverseIdx > 0 ? Math.min(1, reverseIdx) : 0;

      const selected = v >= 0.75 ? 'full' : v >= 0.25 ? 'half' : false;
      this.items.push({ item: selected ? `icon icon-${selected}` : 'icon' });
    }

    this.valuePrevious = value;
    this.requestUpdate();
  }

  /**
   * Handles interactive and aria attribute changes
   * @returns {void}
   */
  private interactiveChanged (): void {
    if (this.interactive) {
      this.setAttribute('role', 'slider');
      this.setAttribute('aria-valuemin', `${this.interactiveMinValue}`);
      this.setAttribute('aria-valuenow', this.value);
      this.setAttribute('aria-valuemax', this.max);
      this.tabIndex = 0;
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
        this.updateValue(this.interactiveMinValue);
        break;
      case 'End':
        this.updateValue(this.max);
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
  private updateValue (value: number | string): void {
    value = value.toString();
    if (this.value !== value) {
      this.value = value;
      this.notifyPropertyChange('value', this.value);
    }
  }

  /**
   * Increases the value of rating by 1
   * @returns {void}
   */
  private stepUp (): void {
    if (this.valueNumber + 1 > this.maxNumber) {
      return;
    }
    this.updateValue(Math.floor(this.valueNumber) + 1);
  }

  /**
   * Decrease the value of rating by 1
   * @returns {void}
   */
  private stepDown (): void {
    if (this.valueNumber - 1 < this.interactiveMinValue) {
      return;
    }
    this.updateValue(Math.floor(this.valueNumber) - 1);
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

    const valueIndex = this.maxNumber - index;
    if (this.valuePrevious !== valueIndex) {
      this.value = valueIndex.toString();
      // Dispatch Event when value change
      this.notifyPropertyChange('value', this.value);
    }
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`<div part="container">
      ${repeat(this.items, (i, index) =>
        html`<div part="${i.item}" @tap="${(): void => this.handleTap(index)}"></div>`)}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ef-rating': Rating;
  }
}
