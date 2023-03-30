import { ControlElement, html, css, PropertyValues, TapEvent } from '@refinitiv-ui/core';
import { VERSION } from '../version.js';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import '../sub-icon/index.js';

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
      position: relative;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      width: var(--code-only-checkbox-width);
      height: var(--code-only-checkbox-height);
      color: var(--control-content-selected);
      border: var(--control-border-default);
    }
    :host(:hover) {
      border: var(--control-border-hover);
    }
    :host([checked]) {
      border: var(--control-border-selected);
    }
    :host(:not([readonly]):hover) [part=icon] {
      color: var(--control-content-hover);
    }
    :host(:focus-visible:not(:active)) {
      text-decoration: underline;
      text-underline-offset: var(--width-010);
      text-decoration-thickness: var(--width-fixed2);
      border: var(--control-border-focused);
      background-color: var(--control-bg-focused);
      outline: var(--control-focused-ring-on-invert);
    }
    :host(:focus-visible:not(:active))::before, :host(:hover:focus-visible:not(:active))::before {
      content: '';
      position: absolute;
      display: block;
      z-index: 1;
      inset: -5px;
      border: var(--control-focused-ring);
    }
    :host(:hover:focus-visible:not(:active)) {
      border: var(--control-border-hover);
      background-color: var(--control-bg-hover);
      outline: var(--control-focused-ring-on-invert);
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
    :host([disabled]), :host([readonly]) {
      cursor: default;
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
       <ui-sub-icon icon="tick" part="icon"></ui-sub-icon>
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
