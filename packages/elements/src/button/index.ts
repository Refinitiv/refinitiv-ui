import {
  ControlElement,
  html,
  PropertyValues,
  TemplateResult
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/lib/decorators/custom-element.js';
import { query } from '@refinitiv-ui/core/lib/decorators/query.js';
import { property } from '@refinitiv-ui/core/lib/decorators/property.js';
import { VERSION } from '../version.js';
import { registerOverflowTooltip } from '../tooltip/index.js';
import '../icon/index.js';

/**
 * Return the attribute that converted from the property
 * Prevent empty string that reflected to attribute
 * @private
 * @param value value from the property
 * @returns string converted to attribute
 */
const emptyStringToNull = function (value: string): string | null {
  return value || null;
};

/**
 * Use button for actions in forms, dialogs,
 * and more with support for different states and styles.
 * @attr {boolean} disabled - Set state to disabled
 * @prop {boolean} [disabled=false] - Set state to disabled
 * @fires active-changed - Dispatched on changing `active` property state by taping on button when property `toggles` is true.
 */
@customElement('ef-button', {
  alias: 'coral-button'
})
export class Button extends ControlElement {
  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }
  
  /**
  * Overrided element's role
  */
  protected readonly defaultRole = 'button';

  /**
   * Customises text alignment when specified alongside `icon` property
   * Value can be `before` or `after`
   */
  @property({ type: String, reflect: true })
  public textpos: 'before' | 'after' = 'after';

  /**
   * Removes background when specified alongside `icon` property
   */
  @property({ type: Boolean, reflect: true })
  public transparent = false;

  /**
   * Specify icon to display in button. Value can be icon name
   */
  @property({ type: String, reflect: true })
  public icon: string | null = null;

  /**
   * Specify icon to display when hovering. Value can be icon name
   */
  @property({ type: String, reflect: true, attribute: 'hover-icon' })
  public hoverIcon: string | null = null;

  /**
   * Set state to call-to-action
   */
  @property({ type: Boolean, reflect: true })
  public cta = false;

  /**
   * Enable or disable ability to be toggled
   * @param value toggle state
   */
  @property({ type: Boolean, reflect: true })
  public set toggles (value: boolean) {
    const oldValue = this._toggles;
    if (oldValue !== value) {
      this._toggles = value;
      this.active = value ? this.active : false;
      void this.requestUpdate('toggles', oldValue);
    }
  }
  public get toggles (): boolean {
    return this._toggles;
  }

  private _toggles = false;

  /**
   * An active or inactive state, can only be used with toggles property/attribute
   * @param value active state
   */
  @property({ type: Boolean, reflect: true })
  public set active (value: boolean) {
    const oldValue = this._active;
    if (oldValue !== value) {
      this._active = value;
      void this.requestUpdate('active', oldValue);
    }
    this.ariaPressed = this.toggles ? String(this._active) : '';
  }
  public get active (): boolean {
    return this._active;
  }

  private _active = false;

  /**
   * Use by theme to detect when no content inside button
   */
  private empty = false;

  /**
   * Get native label element from shadow roots
   */
  @query('[part="label"]')
  private labelElement!: HTMLSpanElement;

  /**
   * Toggle button state for accessibility
   * @ignore
   */
  @property({ type: String,
    reflect: true,
    attribute: 'aria-pressed',
    converter: { toAttribute: emptyStringToNull } // TODO: Remove after typescript update to allow nullable for ARIAMixin
  })
  public ariaPressed = '';

  /**
   * the lifecycle method called when properties changed first time
   * @param changedProperties properties it's the Map object which has the updated properties
   * @returns {void}
   */
  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);

    this.addEventListener('tap', this.toggleActive);
    this.addEventListener('tapstart', this.setPressed);
    this.addEventListener('tapend', this.unsetPressed);
    this.addEventListener('keyup', this.onKeyUpHandler);

    this.emptyComputed();
    registerOverflowTooltip(this.labelElement, () => this.textContent);
  }

  /**
   * Handle the slotchange event of default slot
   * @returns {void}
   */
  private onDefaultSlotChangeHandler (): void {
    this.emptyComputed();
  }

  /**
   * Handle keydown event
   * @param event the keyboard event
   * @returns {void}
   */
  private onKeyUpHandler (event: KeyboardEvent) {
    if (this.isReturnOrSpaceKey(event.key)) {
      this.click();
    }
  }

  /**
   * Check key names
   * @param key the keyboard key
   * @returns true if space or enter pressed
   */
  private isReturnOrSpaceKey (key: string): boolean {
    return key === ' '
      || key === 'Spacebar'
      || key === 'Enter'
      || key === 'Return';
  }

  /**
   * Handle active property, when toggles is true
   * @returns {void}
   */
  private toggleActive (): void {
    if (this.toggles) {
      this.active = !this.active;
      /**
       * Fired on changing `active` property state by taping on button when property `toggles` is true.
       */
      this.notifyPropertyChange('active', this.active);
    }
  }

  /**
   * Set pressed attribute
   * @returns {void}
   */
  private setPressed (): void {
    this.setAttribute('pressed', '');
  }

  /**
   * Remove pressed attribute
   * @returns {void}
   */
  private unsetPressed (): void {
    this.removeAttribute('pressed');
  }

  /**
   * Compute empty property based on textContent
   * @returns {void}
   */
  private emptyComputed (): void {
    this.empty = this.textContent ? this.textContent.length === 0 : true;
    this.switchEmptyAttribute();
  }

  /**
   * Set or remove attribute "empty" based on slot present
   * @returns {void}
   */
  private switchEmptyAttribute (): void {
    if (this.empty) {
      this.setAttribute('empty', '');
    }
    else {
      this.removeAttribute('empty');
    }
  }

  /**
   * Returns icon template if exists
   * @return {TemplateResult | null}  Render template
   */
  private get iconTemplate (): TemplateResult | null {
    return this.icon
      ? html`<ef-icon part="icon" icon="${this.icon}" id="icon"></ef-icon>`
      : null;
  }

  /**
   * Returns hover icon template if exists
   * @return {TemplateResult | null}  Render template
   */
  private get hoverIconTemplate (): TemplateResult | null {
    const hoverIcon = this.hoverIcon || this.icon;
    return hoverIcon
      ? html`<ef-icon part="icon" icon="${hoverIcon}" id="hover-icon"></ef-icon>`
      : null;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return {TemplateResult}  Render template
   */
  protected render (): TemplateResult {
    return html`
      ${this.hoverIcon ? html`${this.iconTemplate} ${this.hoverIconTemplate}` : this.iconTemplate}
      <span part="label">
        <slot @slotchange="${this.onDefaultSlotChangeHandler}"></slot>
      </span>
    `;
  }
}
