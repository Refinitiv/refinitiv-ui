import {
  BasicElement,
  html,
  css,
  WarningNotice,
  TemplateResult,
  CSSResultGroup
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { VERSION } from '../version.js';
import {
  truncateDecimal,
  convertToCompactNotation
} from './utils.js';

/**
 * Counter is an item count badge,
 * support maximun display number and notation of large numbers.
 */
@customElement('ef-counter', {
  alias: 'coral-counter'
})
export class Counter extends BasicElement {
  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  /**
   * Internal value of the element.
   */
  private _value = '';

  /**
   * Internal max of the element.
   */
  private _max = '';

  /**
   * The value of counter as string number
   * @param value counter value
   * @default -
   */
  @property({ type: String })
  public set value (value: string) {
    value = this.validateValue(value, 'value');
    const oldValue = this._value;
    if (oldValue !== value) {
      this._value = value;
      this.requestUpdate('value', oldValue);
    }
  }
  /**
  * The value of counter as string number
  * @returns {string} counter value
  */
  public get value (): string {
    return this._value;
  }

  /**
   * Set maximum counter value.
   * This value will be displayed with suffix `+` if count value is larger than max.
   * @param value counter value
   * @default -
   */
  @property({ type: String })
  public set max (value: string) {
    value = this.validateValue(value, 'max');

    const oldValue = this._max;
    if (oldValue !== value) {
      this._max = value;
      this.requestUpdate('max', oldValue);
    }
  }
  /**
   * Set maximum counter value.
   * This value will be displayed with suffix `+` if count value is larger than max.
   * @returns {string} max value
   */
  public get max (): string {
    return this._max;
  }

  /**
   * Cast and validate value to string
   * @param value Value that is not string which may be set by app developer, e.g. number or invalid string or null or undefined
   * @param propName name of property that being validate
   * @returns string representation of the value or return empty string if value is invalid string number
   */
  protected validateValue (value: unknown, propName = ''): string {
    // Has a number been passed?
    if (typeof value === 'number') {
      value = value.toString(); // stringify the number
    }
    // Do we have a valid number string?
    if (typeof value === 'string' && this.isValidNumber(value)) {
      return value;
    }
    new WarningNotice(`${this.localName} : The specified value "${value as string}" of ${propName} property is not valid. Default value will be used instead.`).show();
    return '';

  }

  /**
   * Check if passed value is a valid number
   * @param value Value to check
   * @returns {boolean} false if value is invalid
   */
  protected isValidNumber (value: string): boolean {
    const number = Number(value);
    return !isNaN(number) && isFinite(number) && number >= 0;
  }

  /**
   * Format display counter value
   * @param value value to format
   * @returns {string} formatted value
   */
  protected formatValue (value: string): string {
    if (value === '') {
      return '0';
    }

    // Truncate decimal to integer.
    const countValue = truncateDecimal(value);
    const maxValue = this.max ? truncateDecimal(this.max) : Infinity;


    // Format value if value greater than max
    // If max is null, it will show the value
    return countValue > maxValue ? `${convertToCompactNotation(maxValue)}+` : convertToCompactNotation(countValue);
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
        position: relative;
      }
      [part="number"] {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    `;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`<span part="number">${this.formatValue(this.value)}</span>`;
  }
}
