import {
  ControlElement,
  html,
  css,
  TemplateResult,
  CSSResultGroup,
  PropertyValues,
  TapEvent
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { query } from '@refinitiv-ui/core/decorators/query.js';
import { VERSION } from '../../version.js';
import { registerOverflowTooltip } from '../tooltip/index.js';
import '../icon/index.js';

/**
 * Form control for selecting one or several options
 * @fires checked-changed - Fired when the user checks or unchecks the checkbox. The event is not fired if the `checked` property is changed programmatically.
 *
 * @attr {boolean} readonly - Set readonly state
 * @prop {boolean} [readonly=false] - Set readonly state
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 */
@customElement('ef-checkbox')
export class Checkbox extends ControlElement {
  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  protected readonly defaultRole: string | null = 'checkbox';

  /**
   * A `CSSResultGroup` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @return CSS template
   */
  static get styles (): CSSResultGroup {
    return css`
      :host {
        display: inline-block;
      }
      [part=check] {
        visibility: hidden;
      }
      :host([checked]) [part=check],
      :host([indeterminate]) [part=check] {
        visibility: inherit;
      }
      [part=label],
      [part=container] {
        display: inline-block;
        vertical-align: middle;
      }
      [part=label] {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      :host(:empty) [part=label], [part=label]:empty {
        display: none;
      }
    `;
  }

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

  /**
   * Getter for label
   */
  @query('[part=label]', true)
  private labelEl!: HTMLElement;

  /**
   * Called before update() to compute values needed during the update.
   * @param changedProperties Properties that has changed
   * @returns {void}
   */
  protected willUpdate (changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('checked')) {
      if (this.checked) {
        this.indeterminate = false;
      }
      this.setAttribute('aria-checked', String(this.checked));
    }

    if (changedProperties.has('indeterminate')) {
      if (this.indeterminate) {
        this.checked = false;
      }
      this.setAttribute('aria-checked', this.indeterminate ? 'mixed' : String(this.checked));
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

    registerOverflowTooltip(this.labelEl, () => this.textContent);
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

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return {TemplateResult}  Render template
   */
  protected render (): TemplateResult {
    return html`
      <div part="container">
        <div part="check">
          ${!this.indeterminate ? html`<ef-icon icon="tick"></ef-icon>` : null }
        </div>
      </div>
      <div part="label"><slot></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ef-checkbox': Checkbox;
  }
}
