import { TemplateResult, html, nothing } from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { TemplateMap } from '@refinitiv-ui/core/directives/template-map.js';

import '@refinitiv-ui/phrasebook/locale/en/search-field.js';
import { Translate, translate } from '@refinitiv-ui/translate';

import '../icon/index.js';
import { TextField } from '../text-field/index.js';

/**
 * Form control to get a search input from users.
 *
 * @fires value-changed - Fired when the user commits a value change. The event is not triggered if `value` property is changed programmatically.
 * @fires error-changed - Fired when the user inputs an invalid value. The event is not triggered if `error` property is changed programmatically.
 * @fires icon-click - Fired when the user taps on icon added into control's slot.
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 *
 * @attr {boolean} error - Set error state
 * @prop {boolean} [error=false] - Set error state
 *
 * @attr {boolean} icon-has-action - Specify when icon need to be clickable
 * @prop {boolean} [iconHasAction=false] - Specify when icon need to be clickable
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
@customElement('ef-search-field')
export class SearchField extends TextField {
  /**
   * Used for translations
   */
  @translate({ scope: 'ef-search-field' })
  protected t!: Translate;

  /**
   * Decorate `<input>` element with common properties extended from text-field:
   * type="search" - always `search`
   * @returns template map
   */
  protected override get decorateInputMap(): TemplateMap {
    return {
      ...super.decorateInputMap,
      type: 'search',
      inputmode: 'search'
    };
  }

  /**
   * Returns `true` if the element input is valid; otherwise, returns `false`.
   * @returns element input validity
   */
  public override checkValidity(): boolean {
    return super.checkValidity();
  }

  /**
   * Validate input. Mark as error if input is invalid
   * @returns false if there is an error
   */
  public override reportValidity(): boolean {
    return super.reportValidity();
  }

  /**
   * Renders icon element
   * @returns {void}
   */
  protected override renderIcon(): TemplateResult | null {
    return html`
      <ef-icon
        part="icon"
        role="${this.iconHasAction ? 'button' : nothing}"
        tabindex="${this.iconHasAction ? '0' : nothing}"
        icon="search"
        aria-label="${this.t('SEARCH')}"
        ?readonly="${this.readonly}"
        ?disabled="${this.disabled}"
        @tap="${this.iconClick}"
      ></ef-icon>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ef-search-field': SearchField;
  }
}
