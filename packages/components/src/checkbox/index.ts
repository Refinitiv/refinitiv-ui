import { html, css, TemplateResult, CSSResultGroup, ControlElement, TapEvent, PropertyValues } from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { VERSION } from '../version.js';
import '../sub-checkbox/index.js';

@customElement('ui-checkbox', { theme: false })
export class Checkbox extends ControlElement {
  protected readonly defaultRole: string | null = 'checkbox';

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
   * @return CSS template
   */
  static get styles (): CSSResultGroup {
    return css`
      :host {
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      :host(:focus-visible) {
        outline: var(--ds-control-border-style) var(--ds-control-border-width) var(--ds-control-focus-border-color);
      }
      :host [part=label] {
        padding-left: var(--ds-control-padding);
      }
      :host(:empty) [part="label"] {
        display: none;
      }
      :host(:hover) {
        color: var(--ds-control-hover-color);
      }
      :host(:hover:not([readonly])) [part=checkbox] {
        color: var(--ds-control-hover-color);
        border-color: var(--ds-control-hover-border-color);
      }
      :host([disabled]) {
        color: var(--ds-control-disabled-color);
      }
      :host([readonly]) {
        cursor: default;
        color: var(--ds-control-readonly-color)
      }
    `;
  }

  /**
   * Value of checkbox
   */
  @property({ type: Boolean, reflect: true })
  public checked = false;

  /**
   * Called before update() to compute values needed during the update.
   * @param changedProperties Properties that has changed
   * @returns {void}
   */
  protected willUpdate (changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('checked')) {
      this.setAttribute('aria-checked', String(this.checked));
    }
  }

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
   * Fired when mouse click event happens. Select an item
   * @param event Mouse click event
   * @returns {void}
   */
  private onTap (event: TapEvent): void {
    if (this.disabled || this.readonly || event.defaultPrevented) {
      return;
    }
    this.handleCheckedChanged();
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
        this.handleCheckedChanged();
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
  private handleCheckedChanged (): void {
    this.checked = !this.checked;
    this.notifyPropertyChange('checked', this.checked);
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
     <ui-sub-checkbox
        tabindex="-1"
        part="checkbox"
        .checked=${this.checked}
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}>
      </ui-sub-checkbox>
      <div part="label">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-checkbox': Checkbox;
  }
}