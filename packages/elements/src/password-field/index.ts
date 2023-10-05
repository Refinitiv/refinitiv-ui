import { CSSResultGroup, PropertyValues, TemplateResult, html, unsafeCSS } from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { state } from '@refinitiv-ui/core/decorators/state.js';
import { TemplateMap } from '@refinitiv-ui/core/directives/template-map.js';

import '@refinitiv-ui/phrasebook/locale/en/password-field.js';
import { Translate, TranslateDirectiveResult, translate } from '@refinitiv-ui/translate';
import { VISUALLY_HIDDEN_STYLE } from '@refinitiv-ui/utils/accessibility.js';

import '../icon/index.js';
import { TextField } from '../text-field/index.js';
import { deregisterOverflowTooltip } from '../tooltip/index.js';

/**
 * A form control element for password.
 *
 * @fires value-changed - Fired when user commits a value change. The event is not triggered if `value` property is changed programmatically.
 * @fires error-changed - Fired when user inputs an invalid value. The event is not triggered if `error` property is changed programmatically.
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 *
 * @attr {boolean} error - Set error state
 * @prop {boolean} [error=false] - Set error state
 *
 * @attr {number} maxlength - Set character max limit
 * @prop {number | null} [maxLength=null] - Set character max limit
 *
 * @attr {number} minlength - Set character min limit
 * @prop {number | null} [minLength=null] - Set character min limit
 *
 * @prop {string} [pattern=""] - Set regular expression for input validation
 *
 * @attr {string} placeholder - Set placeholder text
 * @prop {string} [placeholder=""] - Set placeholder text
 *
 * @attr {boolean} readonly - Set readonly state
 * @prop {boolean} [readonly=false] - Set readonly state
 *
 * @attr {boolean} transparent - Disables all other states and border/background styles.
 * @prop {boolean} [transparent=false] - Disables all other states and border/background styles.
 *
 * @attr {boolean} warning - Set warning state
 * @prop {boolean} [warning=false] - Set warning state
 *
 * @attr {string} value - Input's value
 * @prop {string} [value=""] - Input's value
 */
@customElement('ef-password-field')
export class PasswordField extends TextField {
  /**
   * Used for translations
   */
  @translate({ scope: 'ef-password-field' })
  protected t!: Translate;

  /**
   * Defines whether password is visible or not
   */
  @state()
  private isPasswordVisible = false;

  @state()
  private liveRegionContent: TranslateDirectiveResult = '';

  /**
   * A `CSSResultGroup` that will be used to style the host,
   * slotted children and the internal template of the element.
   * @returns CSS template
   */
  static override get styles(): CSSResultGroup {
    return [super.styles, unsafeCSS(VISUALLY_HIDDEN_STYLE)];
  }

  /**
   * Called when the element’s DOM has been updated and rendered for the first time
   * @param changedProperties Properties that has changed
   * @return shouldUpdate
   */
  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    // password shouldn't display value on tooltip when value is overflow
    deregisterOverflowTooltip(this);
  }

  /**
   * Returns `true` if the element input is valid; otherwise, returns `false`.
   * @returns element input validity
   */
  public override checkValidity(): boolean {
    return super.checkValidity();
  }

  /**
   * Validate the element input and mark it as error if its input is invalid.
   * @returns `true` if the element input is valid; otherwise, returns `false`.
   */
  public override reportValidity(): boolean {
    return super.reportValidity();
  }

  /**
   * Decorate `<input>` element with common properties extended from text-field:
   * type="text|password" - text if password is visible
   * @returns template map
   */
  protected override get decorateInputMap(): TemplateMap {
    return {
      ...super.decorateInputMap,
      type: this.isPasswordVisible ? 'text' : 'password'
    };
  }

  /**
   * Renders icon element
   * @returns {void}
   */
  protected override renderIcon(): TemplateResult | null {
    return html`
      <ef-icon
        part="icon"
        role="button"
        tabindex="0"
        aria-pressed="${this.isPasswordVisible}"
        aria-label="${this.t('SHOW_PASSWORD')}"
        icon=${this.isPasswordVisible ? 'eye-off' : 'eye'}
        ?readonly="${this.readonly}"
        ?disabled="${this.disabled}"
        @tap="${this.onTogglePasswordTap}"
        @focus="${this.updateLiveRegionContent}"
        @blur="${this.updateLiveRegionContent}"
      ></ef-icon>
      <div part="live-region" role="status" aria-live="polite" class="visually-hidden">
        ${this.liveRegionContent}
      </div>
    `;
  }

  /**
   * update live region content describing password visibility state
   * @param event event trigging live region content update
   * @return void
   */
  protected updateLiveRegionContent(event: Event): void {
    this.liveRegionContent =
      event.type === 'blur'
        ? ''
        : this.isPasswordVisible
        ? this.t('SHOW_PASSWORD_ON')
        : this.t('SHOW_PASSWORD_OFF');
  }

  /**
   * Go to the first page and fires event
   * @param event custom event
   * @returns {void}
   */
  protected onTogglePasswordTap(event: CustomEvent): void {
    this.togglePasswordVisibility();
    this.updateLiveRegionContent(event);
  }

  /**
   * Toggles password visibility state
   * @return void
   */
  protected togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ef-password-field': PasswordField;
  }
}
