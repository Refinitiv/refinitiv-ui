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
import { VERSION } from '../';
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

  protected readonly defaultRole = 'checkbox';

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

  private _checked = false;
  /**
   * Value of checkbox
   * @param value new checked value
   */
  @property({ type: Boolean, reflect: true })
  public set checked (value: boolean) {
    const oldValue = this._checked;
    if (oldValue !== value) {
      this._checked = value;

      this.ariaChecked = String(value);

      void this.requestUpdate('checked', oldValue);
    }
  }
  public get checked (): boolean {
    return this._checked;
  }

  private _indeterminate = false;
  /**
   * Set state to indeterminate
   * @param value new indeterminate value
   */
  @property({ type: Boolean, reflect: true })
  public set indeterminate (value: boolean) {
    const oldValue = this._indeterminate;
    if (oldValue !== value) {
      this._indeterminate = value;

      if (value) {
        this.ariaChecked = 'mixed';
      }

      void this.requestUpdate('indeterminate', oldValue);
    }
  }
  public get indeterminate (): boolean {
    return this._indeterminate;
  }

  /**
   * Indicates current state of checkbox
   */
  @property({ type: String, reflect: true, attribute: 'aria-checked' })
  private ariaChecked = 'false';

  /**
   * Getter for label
   */
  @query('[part=label]', true)
  private labelEl!: HTMLElement;

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
