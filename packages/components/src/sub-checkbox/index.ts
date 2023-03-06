import { ControlElement, html, css, PropertyValues, TapEvent } from '@refinitiv-ui/core';
import { VERSION } from '../version.js';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import '../icon/index.js';

@customElement('ds-sub-checkbox', { theme: false })
export class SubCheckbox extends ControlElement {
  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  protected readonly defaultRole: string | null = 'checkbox';

  /**
   * Value of checkbox
   */
  @property({ type: Boolean, reflect: true })
  public checked = false;

  /**
   * Set state to indeterminate
   */
  @property({ type: Boolean, reflect: true })
  public indeterminate = false;

  public static styles = css`
    :host {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      padding: var(--ds-checkbox-padding);
      width: var(--ds-checkbox-size);
      height: var(--ds-checkbox-size);
      color: var(--ds-primary-color);
      border: var(--ds-checkbox-border);
      border-radius: var(--ds-checkbox-radius);
    }
    :host(:focus-visible) {
      outline: var(--ds-checkbox-focus-border);
    }
    [part=check] {
      display: flex;
      justify-content: center;
      align-items: center;
      visibility: hidden;
    }
    [part=icon] {
      width: 100%;
      height: 100%;
    }
    :host([checked]) [part=check] {
      width: 100%;
      height: 100%;
      visibility: inherit;
    }
    [disabled] {
      color: var(--ds-checkbox-disabled-color);
      border: var(--ds-checkbox-disabled-border);
    }
  `;

  /**
   * Called once after the component is first rendered
   * @param changedProperties map of changed properties with old values
   * @returns {void}
   */
  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);

    this.addEventListener('tap', this.onTap);
    this.addEventListener('keydown', this.onKeyDown);
  }

  /**
   * Run when checkbox is tapped
   * @param event Tap event
   * @returns {void}
   */
  private onTap (event: TapEvent): void {
    if (this.disabled || this.readonly || event.defaultPrevented) {
      return;
    }
    this.handleChangeChecked();
  }

  /**
   * Handles key down event
   * @param event Key down event object
   * @returns {void}
   */
  private onKeyDown (event: KeyboardEvent): void {
    if (this.disabled || this.readonly || event.defaultPrevented) {
      return;
    }

    switch (event.key) {
      case ' ':
      case 'Spacebar':
        this.handleChangeChecked();
        break;
      default:
        return;
    }

    event.preventDefault();
  }

  /**
   * Change checked state and fire
   * checked-changed event
   * @return {void}
   */
  private handleChangeChecked (): void {
    this.checked = !this.checked;
    this.notifyPropertyChange('checked', this.checked);
  }

  protected render () {
    return html`
      <div part="check">
        <ds-icon icon="tick" part="icon"></ds-icon>
      </div>
      <slot></slot>
    `;
  }
}
