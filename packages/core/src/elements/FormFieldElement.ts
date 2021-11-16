import type { PropertyValues } from 'lit';
import { label as inputLabel } from '@refinitiv-ui/utils/lib/accessibility/label.js';
import { description as inputDescription } from '@refinitiv-ui/utils/lib/accessibility/description.js';
import { required as inputRequired } from '@refinitiv-ui/utils/lib/accessibility/required.js';
import { state } from '../decorators/state.js';
import { property } from '../decorators/property.js';
import { attributeMap, AttributeMapDirectiveResult } from '../directives/attribute-map.js';
import { ControlElement } from './ControlElement.js';

const AriaLabelKey = Symbol('aria-label-key');
const AriaDescriptionKey = Symbol('aria-description-key');
const AriaRequiredKey = Symbol('aria-required-key');

/**
 * Observed attributes that cause `aria-label` to be recalculated
 */
const ObservedAriaLabel = ['aria-label', 'aria-labelledby', 'id'];

/**
 * Observed attributes that cause `aria-description` to be recalculated
 */
const ObservedAriaDescription = ['aria-description', 'aria-describedby'];

/**
 * Observed attributes that cause `aria-required` to be recalculated
 */
const ObservedAriaRequired = ['required', 'aria-required'];

/**
 * Form Field Element base class.
 * Used for form field type controls.
 * Adds support for assertive technologies, `error` and `warning` states
 */
export abstract class FormFieldElement extends ControlElement {
  /**
   * @inheritDoc
   */
  static get observedAttributes (): string[] {
    return Array.from(new Set([
      ...super.observedAttributes,
      ...ObservedAriaLabel,
      ...ObservedAriaDescription,
      ...ObservedAriaRequired
    ]));
  }

  protected readonly defaultRole = 'textbox';

  /**
   * Set state to error
   */
  @property({ type: Boolean, reflect: true })
  public error = false;

  /**
   * Set state to warning
   */
  @property({ type: Boolean, reflect: true })
  public warning = false;

  /**
   * Used to get `aria-label` field for internal <input>
   * Calculated from `aria-label`, `aria-labelledby` and `label[for="<element.id>"]`
   */
  @state()
  protected inputAriaLabel: string | null = null;

  /**
   * Used to get `aria-description` field for internal <input>
   * Calculated from `aria-description` or `aria-describedby`
   */
  @state()
  protected inputAriaDescription: string | null = null;

  /**
   * Used to get `aria-required` field for internal <input>
   * Calculated from `aria-required`
   */
  @state()
  protected inputAriaRequired = false;

  /**
   * @inheritDoc
   */
  public attributeChangedCallback (name: string, oldValue: string | null, newValue: string | null): void {
    super.attributeChangedCallback(name, oldValue, newValue);

    // Do not use lit properties, as these may change the way how native aria works.
    // Instead silently listen for changes and hook into update lifecycle
    // Future AOM should reflect properties to attributes, so this code should still work
    if (ObservedAriaLabel.includes(name)) {
      this.requestUpdate(AriaLabelKey, Symbol());
    }

    if (ObservedAriaDescription.includes(name)) {
      this.requestUpdate(AriaDescriptionKey, Symbol());
    }

    if (ObservedAriaRequired.includes(name)) {
      this.requestUpdate(AriaRequiredKey, Symbol());
    }
  }

  /**
   * Compute property values that depend on other properties
   * and are used in the rest of the update process.
   * @param changedProperties Properties that has changed
   * @returns {void}
   */
  public willUpdate (changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has(AriaLabelKey)) {
      this.inputAriaLabel = inputLabel(this);
    }

    if (changedProperties.has(AriaRequiredKey)) {
      this.inputAriaRequired = inputRequired(this);
    }

    // Description is traditionally changed with error, so recalculate on error changed as well
    if (changedProperties.has(AriaDescriptionKey)
      || (changedProperties.get('error') !== undefined && changedProperties.has('error'))
    ) {
      this.inputAriaDescription = inputDescription(this);
    }
  }

  /**
   * Called after the component is first rendered
   * @param changedProperties Properties which have changed
   * @returns {void}
   */
  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.addEventListener('focus', this.onFocus);
  }

  /**
   * Handles the focus event
   * @param event Focus event
   * @returns {void}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onFocus (event: FocusEvent): void {
    // Always recalculate inherited arias on focus and these may change from last time
    this.setInheritedAria();
  }

  /**
   * Set inherited aria properties
   * @returns {void}
   */
  protected setInheritedAria (): void {
    this.inputAriaLabel = inputLabel(this);
    this.inputAriaDescription = inputDescription(this);
    // no need for required or error here, as it is sufficient to recalculate these on attributeChanged
  }

  /**
   * Decorate `<input>` element with aria properties:
   * aria-hidden="true" - always true. Required for onLoad screen read. this is always true for Chrome. Other browsers may need to tweak
   * aria-label - calculated from `aria-label`, `aria-labelledby` and `label[for="<element.id>"]`
   * aria-description - calculated from `aria-description` or `aria-describedby`
   * required - calculated on based on `aria-required` and `required` state
   * aria-invalid="true|false" - calculated on based on `error` state
   * @returns noChange, directive result
   */
  protected ariaDecorate (): AttributeMapDirectiveResult {
    return attributeMap({
      'aria-hidden': 'true',
      'aria-label': this.inputAriaLabel,
      'aria-description': this.inputAriaDescription,
      'aria-invalid': this.error ? 'true' : 'false',
      required: this.inputAriaRequired
    });
  }
}
