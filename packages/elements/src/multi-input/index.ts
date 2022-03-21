import {
  ControlElement,
  css,
  CSSResultGroup,
  html,
  MultiValue,
  TemplateResult,
  PropertyValues
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { query } from '@refinitiv-ui/core/decorators/query.js';
import { ifDefined } from '@refinitiv-ui/core/directives/if-defined.js';
import { VERSION } from '../version.js';
import { CollectionComposer } from '@refinitiv-ui/utils/collection.js';
import type { Pill } from '../pill';
import type { TextField } from '../text-field';
import type { MultiInputData, MultiInputDataItem, MultiInputEvents, SelectionIndex } from './helpers/types';
import '../pill/index.js';
import '../text-field/index.js';

export type { MultiInputData, MultiInputDataItem };

const hasChanged = (newVal: unknown, oldVal: unknown): boolean => oldVal === undefined ? false : newVal !== oldVal;

/**
 * An input control component to display a selection of pills
 *
 * @event value-changed - Fired when new value of text field is changed.
 * Property `detail.value` will be the new value.
 *
 * @event error-changed - Dispatched when error state changes.
 * Property `detail.error` is error from validation.
 *
 * @event item-added - Fired when new pill is added.
 * Property `detail.item` is new added pill.
 * Property `detail.items` is new list of all pills.
 *
 * @event item-removed - Fired when item is removed.
 * Property `detail.item` is pill that removed.
 * Property `detail.items` is new list of all pills.
 *
 * @event item-error - Fired when item that attempt to add is invalid.
 * Property `detail.item` is item with an error.
 * Property `detail.items` a current list of pills.
 *
 * @prop {boolean} [readonly=false] - Hides text field and clear icon from all pills
 * @attr {boolean} readonly - Hides text field and clear icon from all pills
 *
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 *
 * @prop {string} value - Current value of text field
 * @attr {string} value - Current value of text field
 *
 */
@customElement('ef-multi-input', {
  alias: 'coral-multi-input'
})
export class MultiInput extends ControlElement implements MultiValue {

  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  /**
   * A `CSSResultGroup` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @return CSS template
   */
  static get styles (): CSSResultGroup {
    return css`
      :host {
        display: block;
      }
      [part=list] {
       flex-flow: row wrap;
       max-height: 100%;
       display: flex;
       align-items: center;
       align-content: flex-start;
       flex: 1 1 auto;
       flex-direction: row;
       overflow-y: auto;
       margin: auto;
      }
      [part=pill] {
        display: inline-flex;
      }
      [part=search] {
        flex: 1;
        min-width: 170px;
      }
      [scrollable] {
        overflow: auto;
      }
    `;
  }

  /**
   * Array of item's values ( readonly )
   * @readonly
   * @type {string[]}
   * @default []
   */
  @property({ attribute: false })
  public get values (): string[] {
    return this.composer.queryItems(() => true).map(({ value }) => value);
  }

  /**
   * Hide text input box
   */
  @property({ type: Boolean, attribute: 'pills-only', reflect: true })
  public pillsOnly = false;

  /**
   * Specify icon to display inside input box
   */
  @property({ type: String })
  public icon = '';

  /**
   * Placeholder text to display in input box
   */
  @property({ type: String })
  public placeholder = '';

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
   * Set character max limit
   */
  @property({ type: Number, attribute: 'maxlength', reflect: true })
  public maxLength: number | null = null;

  /**
   * Set character min limit
   */
  @property({ type: Number, attribute: 'minlength', reflect: true, hasChanged })
  public minLength: number | null = null;

  /**
   * Selection start index
   * @default null
   */
  @property({ type: Number, attribute: false })
  public get selectionStart (): number | null {
    if (this.search) {
      return this.search.selectionStart;
    }
    return null;
  }

  public set selectionStart (index: SelectionIndex) {
    if (this.search) {
      this.search.selectionStart = index;
    }
  }

  /**
   * Selection end index
   * @default null
   */
  @property({ type: Number, attribute: false })
  public get selectionEnd (): number | null {
    if (this.search) {
      return this.search.selectionEnd;
    }
    return null;
  }

  public set selectionEnd (index: SelectionIndex) {
    if (this.search) {
      this.search.selectionEnd = index;
    }
  }

  /**
   * The data object, used to render the list.
   * @type {MultiInputData | null}
   * @default null
   */
  @property({ attribute: false })
  public get data (): MultiInputData | null {
    return this._data;
  }
  public set data (value: MultiInputData | null) {
    const oldValue = this._data;
    if (oldValue === value) {
      return;
    }
    else if (Array.isArray(value)) {
      this.composer = new CollectionComposer<MultiInputDataItem>(value);
    }
    else {
      this.composer = new CollectionComposer<MultiInputDataItem>([]);
    }
    this._data = value;
    this.requestUpdate('data', oldValue);
  }

  private _data: MultiInputData | null = null;

  /**
   * the component of the list in rendered template
   */
  @query('[part="list"]')
  private list!: HTMLElement;

  /**
   * the component of the search in rendered template
   */
  @query('[part="search"]')
  private search?: TextField | null;

  private composer: CollectionComposer<MultiInputDataItem> = new CollectionComposer([]);

  /**
   * @ignore
   */
  public readonly multiple = true;

  /**
   * Removes the item by the value and returns array of removed items
   * @param value {string} Value of item to remove
   * @returns array of removed items
   */
  public removeByValue (value: string): MultiInputData {
    return this.removeByProperty(value, 'value');
  }

  /**
   * Add a new item to the input. Return newly added object or null if added invalid object.
   * @param item to add. Object must have at least value and label
   * @returns {MultiInputDataItem | null} added item
   */
  public add (item: MultiInputDataItem): MultiInputDataItem | null {
    if (!this.isItem(item)) {
      this.notify(item, 'item-error');
      return null;
    }
    return this.addItem(item);
  }

  /**
   * Removes last item. Returns item that removed or null if list was empty
   * @returns {MultiInputDataItem | null} Removed item or null if list was empty
   */
  public removeLastItem (): MultiInputDataItem | null {
    if (!this.values.length) {
      return null;
    }
    return this.removeByIndex(this.values.length - 1);
  }

  /**
   * Removes pill by index. Returns item that removed or null if list was empty
   * @param {number} index of pill to be removed
   * @returns {MultiInputDataItem | null} Removed item or null if list was empty
   */
  public removeByIndex (index: number): MultiInputDataItem | null {
    const items = this.composer.queryItems(() => true) as MultiInputData;
    if (items.length <= index) {
      return null;
    }
    const item = items[index];

    return this.removeItem(item);
  }

  /**
   * Remove item from collection and notify
   * @param item processed entity
   * @param notifyEvent should notify about changes
   * @returns removed item or null
   */
  private removeItem (item: MultiInputDataItem, notifyEvent = false): MultiInputDataItem | null {
    let process = true;

    if (notifyEvent) {
      process = this.notify(item, 'item-removed');
    }

    if (process) {
      this.composer.removeItem(item);
      this.requestUpdate();
      return item;
    }

    return null;
  }

  /**
   * Removes item by a property within item
   * @param value of property
   * @param property name
   * @returns array of removed items
   */
  private removeByProperty (value: string, property: 'id' | 'value'): MultiInputData {
    const items = this.composer.queryItemsByPropertyValue(property, value);

    const result = [];

    for (let x = 0; x < items.length; x += 1) {
      const item = this.removeItem(items[x]);

      item && result.push(item);
    }

    return result;
  }

  /**
   * Add item to collection and notify
   * @param item processed entity
   * @param notifyEvent should notify about changes
   * @returns added item or null
   */
  private addItem (item: MultiInputDataItem, notifyEvent = false): MultiInputDataItem | null {
    let process = true;

    if (notifyEvent) {
      process = this.notify(item, 'item-added');
    }

    if (process) {
      this.composer.addItem(item);
      this.requestUpdate();

      return item;
    }

    return null;
  }

  /**
   * validate input according `minLength` and `maxLength` properties
   * @param {string} value value for validate
   * change state of `error` property according validation
   * @returns {void}
   */
  private validateInput (value: string): void {
    const error = this.shouldValidateForMinLength(value);
    if (this.error !== error) {
      this.error = error;
      this.notifyPropertyChange('error', this.error);
    }
  }

  /**
   * @param value value of changed.
   * @returns {boolean} true if there is no error, false when minLength more than 0 and value is too short
   */
  private shouldValidateForMinLength (value: string): boolean {
    let error = false;
    if (value) {
      error = !!this.minLength && (this.minLength > value.length);
    }
    return error;
  }

  /** Old value for handle reset value */
  private oldValue = '';

  /**
  * Current value of text field
  * @default -
  * @param value Element value
  */
  @property({ type: String })
  public set value (value: string) {
    const oldValue = this.oldValue;
    value = this.castValue(value);
    if (!this.shouldValidateForMaxLength(value)) {
      this.warnInvalidValue(value);
      value = oldValue;
    }
    if (oldValue !== value) {
      this.oldValue = value;
      this.requestUpdate('value', oldValue);
    }
  }
  public get value (): string {
    return this.oldValue;
  }

  /**
   * @param value value for validate.
   * @returns true if there is maxLength is null and maxLength is more than value.
   */
  private shouldValidateForMaxLength (value: string): boolean {
    if (this.maxLength) {
      return value.length <= this.maxLength;
    }
    return true;
  }

  /**
   * Called when the element’s DOM has been updated and rendered
   * @param changedProperties Properties that has changed
   * @returns shouldUpdate
   */
  protected updated (changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (this.shouldValidateInput(changedProperties)) {
      this.validateInput(this.value);
    }
  }

  /**
   * Check if input should be re-validated
   * @param changedProperties Properties that has changed
   * @returns True if input should be re-validated
   */
  private shouldValidateInput (changedProperties: PropertyValues): boolean {
    return (changedProperties.has('minLength') || !!(this.minLength && changedProperties.has('value')));
  }

  /**
   * Set the selection range
   * @param startSelection Start of selection
   * @param endSelection End of the selection
   * @returns {void}
   */
  public setSelectionRange (startSelection: number, endSelection: number): void {
    this.search?.setSelectionRange(startSelection, endSelection);
  }

  /**
   * Select the contents of input
   * @returns void
   */
  public select (): void {
    if (!this.disabled && !this.readonly) {
      if (this.search) {
        this.search.select();
      }
    }
  }

  /**
   * render this component
   * @returns the main template
   */
  protected render (): TemplateResult {
    return html`
      <div id="list" part="list">
        ${this.pillsTemplate()}
        ${this.textFieldTemplate}
      </div>
    `;
  }

  /**
   * render the search element
   * @returns the template of the search element
   */
  private get textFieldTemplate (): TemplateResult | null {
    if (this.readonly || this.pillsOnly) {
      return null;
    }
    return html`
        <ef-text-field
          tabindex="1"
          part="search"
          transparent
          ?disabled="${this.disabled}"
          @keydown="${this.handleKeyDown}"
          @change="${this.onInputChange}"
          @input="${this.onInputChange}"
          maxlength="${ifDefined(this.maxLength || undefined)}"
          minlength="${ifDefined(this.minLength || undefined)}"
          ?error="${this.error}"
          .value="${this.value}"
          .icon="${this.icon || null}"
          .placeholder="${this.placeholder}"
          ></ef-text-field>
    `;
  }

  /**
   * render pill components
   * @returns the template of pill components
   */
  private pillsTemplate (): TemplateResult {
    return html`
      ${(this.composer.queryItems(() => true) as MultiInputData).map(this.pillTemplate)}
    `;
  }

  /**
   * render the pill component
   * @param item for render
   * @param index the position item of values
   * @returns the template of a pill component
   */
  private pillTemplate = (item: MultiInputDataItem, index: number): TemplateResult => {
    return html`
      <ef-pill
        part="pill"
        index="${index}"
        clears
        ?readonly="${item.readonly || this.readonly}"
        ?disabled="${item.disabled || this.disabled}"
        value="${item.value}"
        @clear="${this.onPillClearsHandler}">
        ${item.label}
      </ef-pill>
    `;
  };

  /**
   * handle the clear event of pill
   * @param event the event contains the current pill
   * @returns {void}
   */
  private onPillClearsHandler (event: Event): void {
    const pill = event.target as Pill;
    const index = pill.getAttribute('index');
    if (index === null) {
      return;
    }

    const items = this.composer.queryItems(() => true) as MultiInputData;
    const item = items[Number(index)];
    this.removeItem(item, true);
    this.focus(); // keep focus on multi-input
  }

  /**
   * the wrapper for item events
   * @param item to notify about
   * @param eventType notify mode - [item-removed|item-added|item-error]
   * @returns true if event was not prevented
   */
  private notify (item: MultiInputDataItem, eventType: MultiInputEvents): boolean {
    const customEventInit: CustomEventInit = {
      detail: { item, items: this.composer.queryItems(() => true) },
      cancelable: true
    };
    const event = new CustomEvent(eventType, customEventInit);

    this.dispatchEvent(event);

    return !event.defaultPrevented;
  }

  /**
   * Detect keydown and delete last item if delete key is pushed
   * @param event keydown event
   * @returns {void}
   */
  private handleKeyDown (event: KeyboardEvent): void {
    if (event.key === 'Backspace') {
      this.removeLastItemByKeyboard(event);
    }
    else if (event.key === 'Enter') {
      this.addItemByKeyboard();
    }
  }

  /**
   * handle when value is changed
   * @param event Input change event
   * @returns {void}
   */
  private onInputChange (event: Event): void {
    const target = event.target as TextField;
    this.setValueAndNotify(target.value);
  }

  /**
   * handle keydown event when the key code is the backspace
   * @param event keyboard backspace keydown for preventing default in case of native functionality removing
   * @returns {void}
   */
  private removeLastItemByKeyboard (event: KeyboardEvent): void {
    if (this.isSearchValueEmptyWithoutReadonlyAndDisabled()) {
      const items = this.composer.queryItems(() => true) as MultiInputData;
      if (!items.length) {
        return;
      }

      const item = items[items.length - 1];

      const lastItem = this.removeItem(item, true);

      if (lastItem) {
        event.preventDefault();

      }
    }
  }

  /**
   * handle keydown event when the key code is the enter
   * @returns {void}
   */
  private addItemByKeyboard (): void {
    if (this.isSearchValueNotEmptyWithoutReadonlyAndDisabled()) {
      const newItem: MultiInputDataItem = { value: this.value, label: this.value };
      const item = this.addItem(newItem, true);
      if (item) {
        this.setValueAndNotify('');
      }
    }
  }

  /**
   * check the value of the search element and check readonly and disabled
   * @returns the condition checks the search value is empty and switched off readonly and disabled of this component
   */
  private isSearchValueEmptyWithoutReadonlyAndDisabled (): boolean {
    return this.value === '' && !this.readonly && !this.disabled;
  }

  /**
   * check the value of the search element and check readonly and disabled
   * @returns the condition checks the search value is empty and switched off readonly and disabled of this component
   */
  private isSearchValueNotEmptyWithoutReadonlyAndDisabled (): boolean {
    return this.value.trim() !== '' && !this.readonly && !this.disabled;
  }

  /**
   * Item check for value and label to ensure it can be rendered
   * @param item Item to check
   * @returns true if item exists and contains value and label
   */
  private isItem (item: MultiInputDataItem): boolean {
    return !!(item.value && item.label);
  }
}
