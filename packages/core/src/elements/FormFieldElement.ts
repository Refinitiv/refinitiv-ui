import { html, TemplateResult, PropertyValues } from 'lit';
import { label as inputLabel } from '@refinitiv-ui/utils/lib/accessibility/label.js';
import { description as inputDescription } from '@refinitiv-ui/utils/lib/accessibility/description.js';
import { required as inputRequired } from '@refinitiv-ui/utils/lib/accessibility/required.js';
import { state } from '../decorators/state.js';
import { property } from '../decorators/property.js';
import { templateMap, TemplateMap } from '../directives/template-map.js';
import { createRef, ref, Ref } from '../directives/ref.js';
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
   * aria-hidden="true" - always true. Required for onLoad screen read. this is always true for Chrome. Other browsers may need to tweak
   * aria-label - calculated from `aria-label`, `aria-labelledby` and `label[for="<element.id>"]`
   * aria-description - calculated from `aria-description` or `aria-describedby`
   * aria-invalid="true|false" - calculated on based on `error` state
   * aria-required="true|false" - calculated on based on `aria-required`
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
      'aria-hidden': 'true',
      'aria-label': this.inputAriaLabel,
      'aria-description': this.inputAriaDescription,
      'aria-invalid': this.error ? 'true' : 'false',
      'aria-required': this.inputAriaRequired ? 'true' : 'false',
      'placeholder': this.placeholder || null,
      'readonly': this.readonly ? '' : null,
      'disabled': this.disabled ? '' : null,
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
   * @returns {void}
   */
  public setSelectionRange (startSelection: number | null, endSelection: number | null): void {
    this.inputElement?.setSelectionRange(startSelection, endSelection);
  }
}


/**
 it('Should have correct property placeholder', async () => {
      const el = await fixture('<ef-text-field placeholder="Placeholder"></ef-text-field>');

      expect(el.placeholder).to.equal('Placeholder');
      expect(el.hasAttribute('placeholder')).to.equal(true, 'attribute "placeholder" should be exists');
      expect(el.getAttribute('placeholder')).to.equal('Placeholder', 'attribute "placeholder" should equal "Placeholder');

      el.removeAttribute('placeholder');
      await elementUpdated(el);

      expect(el.placeholder).to.equal(null);
      expect(el.hasAttribute('placeholder')).to.equal(false, 'attribute "placeholder" should not be exists');
      expect(el.getAttribute('placeholder')).to.equal(null, 'attribute "placeholder" should equal null');

      el.placeholder = 'New placeholder';
      await elementUpdated(el);
      expect(el.placeholder).to.equal('New placeholder');
      expect(el.hasAttribute('placeholder')).to.equal(true, 'property "placeholder" should be reflected');
      expect(el.getAttribute('placeholder')).to.equal('New placeholder', 'property "placeholder" should be reflected');
    });

 it('Should have correct property warning', async () => {
      const el = await fixture('<ef-text-field></ef-text-field>');

      expect(el.warning).to.equal(false);
      expect(el.getAttribute('warning')).to.equal(null, 'attribute "warning" should equal null');
      expect(el.hasAttribute('warning')).to.equal(false, 'attribute "warning" should not be exists');

      el.setAttribute('warning', '');
      await elementUpdated(el);

      expect(el.warning).to.equal(true);
      expect(el.hasAttribute('warning')).to.equal(true, 'attribute "warning" should be exists');
      expect(el.getAttribute('warning')).to.equal('', 'attribute "warning" should equal ""');

      el.warning = false;
      await elementUpdated(el);
      expect(el.warning).to.equal(false);
      expect(el.getAttribute('warning')).to.equal(null, 'property "warning" should reflected');
      expect(el.hasAttribute('warning')).to.equal(false, 'property "warning" should reflected');

    });

 it('Should have correct property error', async () => {
      const el = await fixture('<ef-text-field></ef-text-field>');

      expect(el.error).to.equal(false);
      expect(el.getAttribute('error')).to.equal(null, 'attribute "error" should equal null');
      expect(el.hasAttribute('error')).to.equal(false, 'attribute "error" should not be exists');

      el.setAttribute('error', '');
      await elementUpdated(el);

      expect(el.error).to.equal(true);
      expect(el.hasAttribute('error')).to.equal(true, 'attribute "error" should be exists');
      expect(el.getAttribute('error')).to.equal('', 'attribute "error" should equal ""');

      el.error = false;
      await elementUpdated(el);
      expect(el.error).to.equal(false);
      expect(el.getAttribute('error')).to.equal(null, 'property "error" should reflected');
      expect(el.hasAttribute('error')).to.equal(false, 'property "error" should reflected');

    });

 it('Has correct DOM structure, when removed read only state', async () => {
      const el = await fixture('<ef-text-field readonly></ef-text-field>');

      el.removeAttribute('readonly');
      await elementUpdated(el);

      expect(el).shadowDom.to.equalSnapshot();
    });

 it('Has correct DOM structure, when no read only state initially but added later', async () => {
      const el = await fixture('<ef-text-field></ef-text-field>');

      el.readonly = true;
      await elementUpdated(el);

      expect(el).shadowDom.to.equalSnapshot();
    });

 it('Has correct DOM structure, when initialised with read only state', async () => {
      const el = await fixture('<ef-text-field readonly></ef-text-field>');

      expect(el).shadowDom.to.equalSnapshot();
    });

 it('test select for enabled element', async () => {
      try {
        const el = await fixture('<ef-text-field value="abbr"></ef-text-field>');
        const input = el.shadowRoot.querySelector('[part=input]');

        el.select();
        await elementUpdated(el);

        expect(input.selectionStart).to.not.equal(input.selectionEnd);
        expect(input.selectionStart).to.lessThan(input.selectionEnd);
        expect(input.selectionEnd - input.selectionStart).to.equal(el.value.length);
      }
      catch (e) {
        // eslint-disable-next-line no-console
        console.log('select method problem with error: ' + e.message);
      }
    });

 // need to be checked more careful
 xit('test select for disabled element', async () => {
      try {
        const el = await fixture('<ef-text-field disabled value="abbr"></ef-text-field>');
        const input = el.shadowRoot.querySelector('[part=input]');

        el.select();
        await elementUpdated(el);

        expect(input.selectionStart).to.equal(input.selectionEnd);
      }
      catch (e) {
        // eslint-disable-next-line no-console
        console.log('select method problem with error: ' + e.message);
      }
    });

 it('test focus method for enabled element', async function () {
      if (isIE()) {
        this.skip();
      }

      const el = await fixture('<ef-text-field></ef-text-field>');
      const input = el.shadowRoot.querySelector('[part=input]');

      el.focus();
      await elementUpdated(el);

      expect(el.shadowRoot.activeElement).to.equal(input);
    });

 // need to be checked more careful
 xit('test focus method for disabled element', async () => {
      try {
        await fixture('<input type="text" />');
        const el = await fixture('<ef-text-field disabled></ef-text-field>');
        const input = el.shadowRoot.querySelector('[part=input]');

        el.focus();
        await elementUpdated(el);

        expect(document.activeElement).to.not.equal(el);
        expect(el.shadowRoot.activeElement).to.not.equal(input);
      }
      catch (e) {
        // eslint-disable-next-line no-console
        console.log('focus method problem with error: ' + e.message);
      }
    });





 */


// RANGE
/*
import { elementUpdated, expect, fixture, isIE, triggerFocusFor } from '@refinitiv-ui/test-helpers';
// import element and theme
import '@refinitiv-ui/elements/text-field';
import '@refinitiv-ui/elemental-theme/light/ef-text-field';

describe('text-field/SelectionRange', () => {
  describe('TextField Selection Range', () => {

    it('Applies selectionStart', async function () {
      // will work locally, but fail on CI
      if (isIE()) {
        this.skip();
      }
      const el = await fixture('<ef-text-field value="some text to test"></ef-text-field>');
      await triggerFocusFor(el);
      const input = el.shadowRoot.querySelector('[part=input]');
      const selectionStart = 5;
      el.selectionStart = selectionStart;
      expect(el.selectionStart).to.equal(selectionStart);
      await elementUpdated(el);
      expect(input.selectionStart).to.equal(selectionStart);
    });

    it('Applies selectionEnd', async function () {
      // will work locally, but fail on CI
      if (isIE()) {
        this.skip();
      }
      const el = await fixture('<ef-text-field value="some text to test"></ef-text-field>');
      await triggerFocusFor(el);
      const input = el.shadowRoot.querySelector('[part=input]');
      const selectionEnd = 5;
      el.selectionEnd = selectionEnd;
      expect(el.selectionEnd).to.equal(selectionEnd);
      await elementUpdated(el);
      expect(input.selectionEnd).to.equal(selectionEnd);
    });

    it('Applies selectionStart and selectionEnd', async function () {
      // will work locally, but fail on CI
      if (isIE()) {
        this.skip();
      }
      const el = await fixture('<ef-text-field value="some text to test"></ef-text-field>');
      await triggerFocusFor(el);
      const input = el.shadowRoot.querySelector('[part=input]');
      const selectionStart = 2;
      const selectionEnd = selectionStart;
      el.selectionStart = selectionEnd;
      el.selectionEnd = selectionEnd;
      await elementUpdated(el);
      expect(input.selectionStart).to.equal(selectionStart);
      expect(input.selectionEnd).to.equal(selectionEnd);
    });

    it('Applies selection range using API', async function () {
      // will work locally, but fail on CI
      if (isIE()) {
        this.skip();
      }
      const el = await fixture('<ef-text-field value="some text to test"></ef-text-field>');
      await triggerFocusFor(el);
      const input = el.shadowRoot.querySelector('[part=input]');
      const selectionStart = 4;
      const selectionEnd = 4;
      el.setSelectionRange(selectionStart, selectionEnd);
      expect(el.selectionStart).to.equal(selectionStart);
      expect(el.selectionEnd).to.equal(selectionEnd);

      await elementUpdated(el);
      expect(input.selectionStart).to.equal(selectionStart);
      expect(input.selectionEnd).to.equal(selectionEnd);
    });

  });
});

 */
