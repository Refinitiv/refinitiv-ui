import type { ControlProperties as IControlProperties } from '../interfaces/ControlProperties';
import type { PropertyValues } from 'lit';
import { property } from '../decorators/property.js';
import { BasicElement } from './BasicElement.js';
import { WarningNotice } from '../notices/WarningNotice.js';

/**
 * Control element base class.
 * Usually used for creating form-style elements.
 */
export abstract class ControlElement extends BasicElement implements IControlProperties {
  /**
   * All control element by default need to be focusable
   */
  protected readonly defaultTabIndex: number | null = 0;

  /**
   * Control element should delegate focus by default
   */
  public readonly delegatesFocus: boolean = true;

  /**
   * Name of the element.
   */
  @property({ type: String })
  public name = '';

  /**
   * Indicates whether the user can interact with the element.
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * Value of the element
   * @param value Element value
   */
  @property({ type: String })
  public set value (value: string) {
    const oldValue = this._value;
    value = this.castValue(value);
    if (!this.isValidValue(value)) {
      this.warnInvalidValue(value);
      value = '';
    }
    if (oldValue !== value) {
      this._value = value;
      this.requestUpdate('value', oldValue);
    }
  }

  public get value (): string {
    return this._value;
  }

  /**
   * Indicates whether the user can interact and still show value with the element.
   */
  @property({ type: Boolean, reflect: true })
  public readonly = false;

  /**
   * Value of the `tabindex` before focusing was disabled.
   */
  private oldTabIndex: number | null = null;

  /**
   * Internal value of the element.
   * Controlled by public setter and getter
   */
  private _value = '';


  /**
   * Get a sorted collection of nodes that can be tabbed through if component not disabled.
   */
  public get tabbableElements (): HTMLElement[] {
    return this.disabled ? [] : super.tabbableElements;
  }

  /**
   * @override
   * @returns {void}
   */
  protected update (changedProperties: PropertyValues): void {
    if (changedProperties.has('disabled')) {
      this.disableChanged(changedProperties);
    }

    super.update(changedProperties);
  }

  /**
   * Update disabled state if detect value changed
   * @param changedProperties Properties that has changed
   * @returns {void}
   */
  protected disableChanged (changedProperties: PropertyValues): void {
    if (this.disabled) {
      this.disableFocus();
      this.setAttribute('aria-disabled', 'true');
    }
    else if (changedProperties.get('disabled') === true) { /* re-enable only if disabled changed from true to false */
      this.enableFocus();
      this.removeAttribute('aria-disabled');
    }
  }

  /**
   * Re-enables focus, if the focus has been previously
   * disabled by running disableFocus.
   * @returns {void}
   */
  protected enableFocus (): void {
    this.style.removeProperty('pointer-events');

    if (this.oldTabIndex !== null && this.tabIndex === -1) {
      this.tabIndex = this.oldTabIndex;
    }

    this.oldTabIndex = null;
  }

  /**
   * Disables the ability to focus and tab on element.
   * @returns {void}
   */
  protected disableFocus (): void {
    this.style.setProperty('pointer-events', 'none');

    if (this.hasAttribute('tabindex') && this.tabIndex >= 0) {
      this.oldTabIndex = this.tabIndex;
      this.tabIndex = -1;
    }

    this.hasAttribute('focused') && this.blur();
  }

  /**
   * Cast value to string
   * @param value Value that is not string, but
   * which may be set by app developer, e.g. number or date
   * @returns string representation of the value
   */
  protected castValue (value: unknown): string {
    if (typeof value === 'string') {
      return value;
    }

    if (value === null) {
      return '';
    }

    return String(value);
  }

  /**
   * Used to show a warning when the value does not pass the validation
   * @param value that is invalid
   * @returns {void}
   */
  protected warnInvalidValue (value: string): void {
    new WarningNotice(`The specified value "${value}" is not valid.`).show();
  }

  /**
   * Validate that the value confirms the control type
   * The validation resets value.
   * For input validation use lazy validation.
   * @param value Value to check
   * @returns false if value is invalid
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected isValidValue (value: string): boolean {
    return true;
  }

  /**
   * On *user-interaction* set the value and notify.
   * @param value New value
   * @returns {void}
   */
  protected setValueAndNotify (value: string): void {
    if (this.value !== value) {
      this.value = value;
      this.notifyPropertyChange('value', value);
    }
  }

  /**
   * Resets the element value to its initial setting
   * @returns Whether the value has changed
   */
  public reset (): boolean {
    const initialValue = this.getAttribute('value') || '';
    const currentValue = this.value;
    if (currentValue !== initialValue) {
      this.value = initialValue;
      return true;
    }
    return false;
  }
}
