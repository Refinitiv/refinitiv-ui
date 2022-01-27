import { html, TemplateResult, PropertyValues } from 'lit';
import { label as inputLabel } from '@refinitiv-ui/utils/accessibility/label.js';
import { description as inputDescription } from '@refinitiv-ui/utils/accessibility/description.js';
import { required as inputRequired } from '@refinitiv-ui/utils/accessibility/required.js';
import { state } from '../decorators/state.js';
import { property } from '../decorators/property.js';
import { templateMap, TemplateMap } from '../directives/template-map.js';
import { createRef, ref, Ref } from '../directives/ref.js';
import { ControlElement } from './ControlElement.js';

type SelectionDirection = 'forward' | 'backward' | 'none';

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
const ObservedAriaRequired = ['aria-required'];

/**
 * Form Field Element base class.
 * Used for form field type controls.
 * Adds support for assistive technologies, `error` and `warning` states
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
   * Set placeholder text
   */
  @property({ type: String })
  public placeholder = '';

  /**
   * Disables all other states and border/background styles.
   * Use with advanced composite elements requiring e.g. multi selection in
   * combo-box when parent container handles element states.
   */
  @property({ type: Boolean, reflect: true })
  public transparent = false;

  /**
   * A reference to input element
   */
  private inputElRef: Ref<HTMLInputElement> = createRef();

  /**
   * Get an input element
   */
  protected get inputElement (): HTMLInputElement | undefined {
    return this.inputElRef.value;
  }

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
   * Get native input value
   * @returns string of input value
   */
  protected get inputValue (): string {
    return this.inputElement ? this.inputElement.value : '';
  }

  /**
   * Set native input value
   * @param value input's value
   */
  protected set inputValue (value: string) {
    if (this.inputElement) {
      this.inputElement.value = value;
    }
  }

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
   * Notify error if it has changed
   * @param hasError true if the element has an error
   * @returns {void}
   */
  protected notifyErrorChange (hasError: boolean): void {
    if (this.error !== hasError) {
      this.error = hasError;
      this.notifyPropertyChange('error', this.error);
    }
  }

  /**
   * Runs on input element `input` event
   * @param event `input` event
   * @returns {void}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onInputInput (event: InputEvent): void {
    // nothing
  }

  /**
   * Runs on input element `change` event
   * @param event `change` event
   * @returns {void}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onInputChange (event: InputEvent): void {
    // nothing
  }

  /**
   * Decorate `<input>` element with common properties:
   * aria-label - calculated from `aria-label`, `aria-labelledby` and `label[for="<element.id>"]`
   * aria-description - calculated from `aria-description` or `aria-describedby`
   * aria-invalid="true|null" - calculated on based on `error` state
   * aria-required="true|null" - calculated on based on `aria-required`
   * placeholder - placeholder text
   * readonly - indicates whether the user can interact and still show value with the element
   * disabled - indicates whether the user can interact with the element
   * autocomplete="off" - always off as is not supported within shadow root
   * @input - Listener for `input` event. Runs `this.onInputInput`
   * @change - Listener for `change` event. Runs `this.onInputChange`
   * @returns template map
   */
  protected get decorateInputMap (): TemplateMap {
    return {
      'aria-label': this.inputAriaLabel,
      'aria-description': this.inputAriaDescription,
      'aria-invalid': this.error ? 'true' : null,
      'aria-required': this.inputAriaRequired ? 'true' : null,
      'placeholder': this.placeholder || null,
      'readonly': this.readonly,
      'disabled': this.disabled,
      'autocomplete': 'off',
      '@input': this.onInputInput,
      '@change': this.onInputChange
    };
  }

  /**
   * Renders input element
   * @returns {void}
   */
  protected renderInput (): TemplateResult {
    return html`<input
      ${templateMap(this.decorateInputMap)}
      ${ref(this.inputElRef)}>`;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`${this.renderInput()}`;
  }

  /**
   * Get selection start index
   */
  public get selectionStart (): number | null {
    return this.inputElement ? this.inputElement.selectionStart : null;
  }

  /**
   * Set selection start index
   * @param index Start index
   */
  public set selectionStart (index: number | null) {
    if (this.inputElement) {
      this.inputElement.selectionStart = index;
    }
  }

  /**
   * Get selection end index
   */
  public get selectionEnd (): number | null {
    return this.inputElement ? this.inputElement.selectionEnd : null;
  }

  /**
   * Set selection end index
   * @param index End index
   */
  public set selectionEnd (index: number | null) {
    if (this.inputElement) {
      this.inputElement.selectionEnd = index;
    }
  }

  /**
   * Gets the direction in which selection occurred
   */
  public get selectionDirection (): SelectionDirection | null {
    return this.inputElement ? this.inputElement.selectionDirection : null;
  }

  /**
   * Sets the direction in which selection occurred
   * @param direction Selection direction
   */
  public set selectionDirection (direction: SelectionDirection | null) {
    if (this.inputElement) {
      this.inputElement.selectionDirection = direction;
    }
  }

  /**
   * Select the contents of input
   * @returns void
   */
  public select (): void {
    if (!this.disabled && this.inputElement) {
      this.inputElement.select();
    }
  }

  /**
   * Set the selection range
   * @param startSelection Start of selection
   * @param endSelection End of the selection
   * @param [selectionDirection=none] A string indicating the direction in which the selection is considered to have been performed.
   * @returns {void}
   */
  public setSelectionRange (startSelection: number | null, endSelection: number | null, selectionDirection?: SelectionDirection): void {
    this.inputElement?.setSelectionRange(startSelection, endSelection, selectionDirection);
  }
}
