import { PropertyValues } from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import '../icon/index.js';
import { TextField } from '../text-field/index.js';
import { TemplateMap } from '@refinitiv-ui/core/directives/template-map.js';

/**
 * A form control element for email.
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
@customElement('ef-email-field', {
  alias: 'coral-email-field'
})
export class EmailField extends TextField {
  /**
   * Set to multiple mode, allows multiple emails in a single input
   */
  @property({ type: Boolean, reflect: true })
  public multiple = false;

  /**
   * Decorate `<input>` element with common properties extended from text-field:
   * type="email" - always `email`
   * multiple - defined if supports multiple emails
   * @returns template map
   */
  protected get decorateInputMap (): TemplateMap {
    return {
      ...super.decorateInputMap,
      'type': 'email',
      'inputmode': 'email',
      'multiple': this.multiple
    };
  }

  /**
   * Check if input should be re-validated
   * @param changedProperties Properties that has changed
   * @returns True if input should be re-validated
   */
  /* istanbul ignore next */
  protected shouldValidateInput (changedProperties: PropertyValues): boolean {
    // TODO: This validation should be refactored
    return changedProperties.has('value')
      || changedProperties.has('multiple')
      || super.shouldValidateInput(changedProperties);
  }
}
