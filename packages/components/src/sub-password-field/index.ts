import { css, CSSResultGroup, html, PropertyValues, TemplateResult } from '@refinitiv-ui/core';
import { TemplateMap } from '@refinitiv-ui/core/directives/template-map.js';
import { state } from '@refinitiv-ui/core/decorators/state.js';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { translate, Translate } from '@refinitiv-ui/translate';

import '../icon/index.js';
import { preload } from '../icon/index.js';
import { SubTextField } from '../sub-text-field/index.js';

let isEyeOffPreloadRequested = false;

@customElement('ds-sub-password-field', { theme: false })
export class SubPasswordField extends SubTextField {
  /**
   * A `CSSResultGroup` that will be used to style the host,
   * slotted children and the internal template of the element.
   * @returns CSS template
   */
  static get styles (): CSSResultGroup {
    return [
      super.styles,
      css`
        :host [part=icon] {
          cursor: pointer;
        }
        :host [part=icon]:hover {
          color: var(--ds-control-hover-color);
        }
        :host [part=icon]:focus-visible {
          outline: var(--ds-control-border-style) var(--ds-control-border-width) var(--ds-control-focus-border-color);
          border-radius: var(--ds-control-border-radius);
        }
      `
    ];
  }

  /**
   * Used for translations
   */
  @translate({ scope: 'ds-sub-password-field' })
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
      type: this.isPasswordVisible ? 'text' : 'password'
    };
  }

  /**
   * Toggles password visibility state
   * @return void
   */
  protected togglePasswordVisibility (): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  /**
   * Renders icon element
   * @returns {void}
   */
  protected override renderIcon (): TemplateResult {
    return html`
      <ds-icon
        part="icon"
        role="button"
        tabindex="0"
        aria-label="${this.isPasswordVisible ? this.t('HIDE_PASSWORD') : this.t('SHOW_PASSWORD')}"
        icon=${this.isPasswordVisible ? 'eye-off' : 'eye'}
        ?readonly="${this.readonly}"
        ?disabled="${this.disabled}"
        @tap="${this.togglePasswordVisibility}"
      ></ds-icon>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-sub-password-field': SubPasswordField;
  }
}
