import {
  BasicElement,
  CSSResultGroup,
  TemplateResult,
  WarningNotice,
  css,
  html
} from '@refinitiv-ui/core';
import { formatValue, isValidNumber } from './utils/utils.js';

import { DriftTimer } from './utils/drift-timer.js';
import { VERSION } from '../version.js';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { state } from '@refinitiv-ui/core/decorators/state.js';

/**
 * A countdown timer element
 */
@customElement('ef-count-down')
export class CountDown extends BasicElement {
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
  private _value = '0';

  /**
   * The value of count down as string number
   * @param value count down value in ms
   * @default 0
   */
  @property({ type: String })
  public set value (value: string) {
    value = this.validateValue(value, 'value');
    const oldValue = this._value;
    if (oldValue !== value) {
      this._value = value;
      this.synchronise(); // Required to reset any tick session
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
   * Should the timer tick?
   */
  private _tick = false;

  @property({ type: Boolean })
  public get tick (): boolean {
    return this._tick;
  }
  public set tick (value: boolean) {
    const oldValue = this.tick;
    if (oldValue !== value) {
      this._tick = value;
      this.synchronise();
      this.requestUpdate('tick', oldValue);
    }
  }

  @state()
  private remainingMs = 0;

  private driftTimer: DriftTimer | undefined;

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
    if (typeof value === 'string' && isValidNumber(value)) {
      return value;
    }
    new WarningNotice(`${this.localName} : The specified value "${value as string}" of ${propName} property is not valid. Default value will be used instead.`).show();
    return '0';
  }

  /**
   * Synchronises the tick session to the base value
   * and then resets the session.
   * @returns {void}
   */
  private synchronise (): void {
    this.remainingMs = parseInt(this.value, 10);
    if (this.tick) {
      this.driftTimer = new DriftTimer(this.remainingMs);
      try {
        void this.driftTimer.start(this.syncTime.bind(this))
          .then(() => {
            this.driftTimer = undefined;
            this.dispatchEvent(new CustomEvent('complete'));
          });
      }
      catch (e) {
        this.driftTimer?.reset();
      }
    }
    else {
      this.driftTimer?.reset();
    }
  }

  private syncTime () {
    this.remainingMs = this.driftTimer?.remainingMs() || 0;
    this.requestUpdate();
  }

  /**
   * Called when the element has been disconnected from the DOM
   * @returns {void}
   */
  public disconnectedCallback (): void {
    super.disconnectedCallback();
    this.driftTimer?.reset();
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
    return html`<span part="number">${formatValue(this.remainingMs)}</span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ef-count-down': CountDown;
  }
}
