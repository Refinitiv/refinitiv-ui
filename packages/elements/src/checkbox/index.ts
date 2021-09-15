import {
  ControlElement,
  html,
  css,
  customElement,
  property,
  TemplateResult,
  CSSResult,
  PropertyValues,
  TapEvent,
  query
} from '@refinitiv-ui/core';
import { VERSION } from '../version';
import '../icon';
import {
  registerOverflowTooltip
} from '../tooltip';

/**
 * Form control for selecting one or several options
 * @fires checked-changed - Fired when the `checked` property changes.
 *
 * @attr {boolean} readonly - Set readonly state
 * @prop {boolean} [readonly=false] - Set readonly state
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 */
@customElement('ef-checkbox', {
  alias: 'coral-checkbox'
})
export class Checkbox extends ControlElement {

  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  /**
   * A `CSSResult` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @return {CSSResult | CSSResult[]} CSS template
   */
  static get styles (): CSSResult | CSSResult[] {
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
   * Updates the element
   * @param changedProperties Properties that has changed
   * @returns {void}
   */
  protected update (changedProperties: PropertyValues): void {
    // remove indeterminate if change state to checked
    if(changedProperties.get('checked') === false && this.checked && this.indeterminate) {
      this.indeterminate = false;
    }
    // remove checked if change state to indeterminate
    if(changedProperties.get('indeterminate') === false && this.indeterminate && this.checked) {
      this.checked = false;
    }

    super.update(changedProperties);
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
      case 'Enter':
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
