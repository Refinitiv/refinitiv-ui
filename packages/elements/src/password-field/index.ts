import {
  html,
  PropertyValues,
  TemplateResult
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { state } from '@refinitiv-ui/core/decorators/state.js';
import { TemplateMap } from '@refinitiv-ui/core/directives/template-map.js';
import { preload } from '../icon/index.js';
import { TextField } from '../text-field/index.js';
import '../icon/index.js';
import '@refinitiv-ui/phrasebook/locale/en/password-field.js';
import { translate, Translate } from '@refinitiv-ui/translate';

let isEyeOffPreloadRequested = false;

/**
 * A form control element for password.
 *
 * @fires value-changed - Dispatched when value changes
 * @fires error-changed - Dispatched when error state changes
 * @fires icon-click - Dispatched when icon is clicked
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
@customElement('ef-password-field', {
  alias: 'coral-password-field'
})
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

  /**
   * Called when the element’s DOM has been updated and rendered for the first time
   * @param changedProperties Properties that has changed
   * @return shouldUpdate
   */
  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);

    if (!isEyeOffPreloadRequested) {
      preload('eye-off');
      isEyeOffPreloadRequested = true;
    }
  }

  /**
   * Decorate `<input>` element with common properties extended from text-field:
   * type="text|password" - text if password is visible
   * @returns template map
   */
  protected get decorateInputMap (): TemplateMap {
    return {
      ...super.decorateInputMap,
      'type': this.isPasswordVisible ? 'text' : 'password'
    };
  }

  /**
   * Renders icon element
   * @returns {void}
   */
  protected override renderIcon (): TemplateResult | null {
    return html`
      <ef-icon
        part="icon"
        role="button"
        tabindex="0"
        aria-label="${this.isPasswordVisible ? this.t('HIDE_PASSWORD') : this.t('SHOW_PASSWORD')}"
        icon=${this.isPasswordVisible ? 'eye-off' : 'eye'}
        ?readonly="${this.readonly}"
        ?disabled="${this.disabled}"
        @tap="${this.togglePasswordVisibility}"
      ></ef-icon>
    `;
  }

  /**
   * Toggles password visibility state
   * @return void
   */
  protected togglePasswordVisibility (): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
