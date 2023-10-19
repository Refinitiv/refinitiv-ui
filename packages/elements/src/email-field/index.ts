import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { TemplateMap } from '@refinitiv-ui/core/directives/template-map.js';

import '../icon/index.js';
import { TextField } from '../text-field/index.js';

/**
 * A form control element for email.
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
 * @attr {string} icon - Specify icon to display in input. Value can be icon name
 * @prop {string | null} [icon=null] - Specify icon to display in input. Value can be icon name
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
@customElement('ef-email-field')
export class EmailField extends TextField {
  /**
   * Set to multiple mode, allows multiple emails in a single input
   */
  @property({ type: Boolean, reflect: true })
  public multiple = false;

  /**
   * @inheritdoc
   */
  @property({ type: String })
  public override pattern: string | null = null;

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
   * @inheritdoc
   */
  protected override shouldValidate(): boolean {
    const hasMaxLength = this.maxLength !== null;
    const hasMinLength = this.minLength !== null;
    const hasPattern = this.pattern !== '';
    return hasMaxLength || hasMinLength || hasPattern;
  }

  /**
   * Decorate `<input>` element with common properties extended from text-field:
   * type="email" - always `email`
   * multiple - defined if supports multiple emails
   * @returns template map
   */
  protected override get decorateInputMap(): TemplateMap {
    return {
      ...super.decorateInputMap,
      type: 'email',
      inputmode: 'email',
      multiple: this.multiple,
      pattern: this.pattern
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ef-email-field': EmailField;
  }
}
