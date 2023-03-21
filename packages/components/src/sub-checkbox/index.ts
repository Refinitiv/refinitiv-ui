import { ControlElement, html, css, PropertyValues, TapEvent } from '@refinitiv-ui/core';
import { VERSION } from '../version.js';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import '../icon/index.js';

@customElement('ui-sub-checkbox', { theme: false })
export class SubCheckbox extends ControlElement {
  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  /**
   * Value of checkbox
   */
  @property({ type: Boolean, reflect: true })
  public checked = false;

  public static styles = css`
    :host {
      cursor: pointer;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      width: var(--ds-control-height);
      height: var(--ds-control-height);
      color: var(--ds-control-color);
      border: var(--ds-control-border);
      border-radius: var(--ds-control-border-radius);
    }
    :host(:hover) {
      border-color: var(--ds-control-hover-border-color);
    }
    :host(:not([readonly]):hover) [part=icon] {
      color: var(--ds-control-hover-color);
    }
    :host(:focus-visible) {
      outline: var(--ds-control-border-style) var(--ds-control-border-width) var(--ds-control-focus-border-color);
    }
    [part=check] {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      visibility: hidden;
    }
    :host([checked]) [part=check] {
      visibility: inherit;
    }
    :host([disabled]) {
      cursor: default;
      color: var(--ds-control-disabled-color);
      border-color: var(--ds-control-disabled-border-color);
    }
    :host([readonly]) {
      cursor: default;
      color: var(--ds-control-readonly-color);
      border-color: var(--ds-control-readonly-border-color);
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
    this.handleCheckedChange();
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
        this.handleCheckedChange();
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
  private handleCheckedChange (): void {
    this.checked = !this.checked;
    this.notifyPropertyChange('checked', this.checked);
  }

  protected render () {
    return html`
      <div part="check">
       <ui-icon icon="tick" part="icon"></ui-icon>
      </div>
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-sub-checkbox': SubCheckbox;
  }
}
