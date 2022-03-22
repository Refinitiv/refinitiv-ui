import {
  BasicElement,
  html,
  css,
  PropertyValues,
  TemplateResult,
  CSSResultGroup,
  WarningNotice,
  DeprecationNotice
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { state } from '@refinitiv-ui/core/decorators/state.js';
import { query } from '@refinitiv-ui/core/decorators/query.js';
import { VERSION } from '../version.js';
import '../button/index.js';
import '../button-bar/index.js';
import '../layout/index.js';
import '../text-field/index.js';

import '@refinitiv-ui/phrasebook/locale/en/pagination.js';
import { translate, Translate } from '@refinitiv-ui/translate';

const pageDeprecation = new DeprecationNotice('Property `page` is deprecated, use `value` instead.');
const pageSizeDeprecation = new DeprecationNotice('Property `pageSize ` is deprecated, use `max` instead.');
const totalItemsDeprecation = new DeprecationNotice('Property `totalItems ` is deprecated, use `max` instead.');

/**
 * Used to control and navigate through multiple pages
 * @fires value-changed - Fired when the `value` property is changed
 */
@customElement('ef-pagination', {
  alias: 'emerald-pagination'
})
export class Pagination extends BasicElement {

  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  /**
   * Current page internal current page value
   */
  private _value = '';

  protected defaultRole: string | null = 'navigation';

  /**
   * Internal current page
   * @returns current page
   */
  private get internalValue (): number {
    let value = parseInt(this._value, 10) || 0;

    if (value <= 0) {
      value = 1;
    }

    return value;
  }

  /**
   * Current page
   */
  @property({ type: String })
  public get value (): string {
    return this._value;
  }

  /**
   * Set current page
   * @param value current page
   */
  public set value (value: string) {
    let newValue = value;
    if (!newValue || !this.validatePage(newValue, true, 'value')) {
      newValue = '';
    }

    const oldValue = this._value;
    if (oldValue !== newValue) {
      this._value = newValue.toString();
    }
    this.requestUpdate('value', oldValue);
  }

  /**
   * Max page
   */
  protected _max = '';

  /**
   * Internal max page
   * @returns max page
   */
  private get internalMax (): number {
    const max = parseInt(this._max, 10) || 0;
    const pageSize = this.internalPageSize;
    const totalItems = this.internalTotalitems;

    if (!max && !totalItems) {
      return Infinity;
    }
    else if (max >= 1) {
      return max;
    }

    if (pageSize > 0) {
      const totalPage = Math.ceil(totalItems / pageSize);
      return totalPage >= 1 ? totalPage : 1;
    }

    return 1;
  }

  /**
   * Max page
   * @returns max page
   */
  @property({ type: String })
  public get max (): string {
    return this._max;
  }

  /**
   * Set max page
   * @param value max page
   */
  public set max (value: string) {
    let newValue = value;
    if (!newValue || !this.validatePage(value, true, 'max')) {
      newValue = '';
    }

    const oldValue = this._max;
    if (oldValue !== newValue) {
      this._max = newValue.toString();
    }
    this.requestUpdate('max', oldValue);
  }

  /**
   * Current page
   * @returns current page
   * @deprecated
   * @ignore
   */
  @property({ type: String })
  public get page (): string {
    pageDeprecation.once();
    return this._value;
  }

  /**
   * Set current page
   * @param value - Set current page
   * @deprecated
   * @ignore
   */
  public set page (value: string) {
    pageDeprecation.show();
    let newValue = value;
    if (!newValue || !this.validatePage(value, true, 'page')) {
      newValue = '';
    }

    const oldValue = this._value;
    if (oldValue !== newValue) {
      this._value = newValue.toString();
    }
    this.requestUpdate('page', oldValue);
  }

  /**
   * Number of item per page
   * @returns number of items per page
   * @deprecated
   * @ignore
   */
  @property({ type: String, attribute: 'page-size' })
  public get pageSize (): string {
    pageSizeDeprecation.once();
    return this._pageSize;
  }

  /**
   * Set number of item per page
   * @param value - number of item per page
   * @deprecated
   * @ignore
   */
  public set pageSize (value: string) {
    pageSizeDeprecation.show();
    let newValue = value;
    if (!newValue || !this.validatePage(value, true, 'page-size')) {
      newValue = '';
    }

    // Validate to show warning only, need to keep developer value.
    // Check page still is in supported range if page-size changed
    const newTotalPage = Math.ceil(this.internalTotalitems / (parseInt(newValue, 10) || 1)) || 1;
    if (this.internalValue > newTotalPage) {
      new WarningNotice(`${this.localName} : The specified value "${newValue}" of page-size caused the value of page property is out of supported range.`).show();
    }

    const oldValue = this._pageSize;
    if (oldValue !== newValue) {
      this._pageSize = newValue;
    }
    this.requestUpdate('pageSize', oldValue);
  }

  /**
   * Number of item per page internal value
   * @deprecated
   */
  private _pageSize = '';

  /**
   * Internal page size
   * @deprecated
   * @returns page size
   */
  private get internalPageSize (): number {
    return parseInt(this._pageSize, 10);
  }

  /**
   * Total items internal value
   * @deprecated
   */
  private _totalItems = '';

  /**
   * Internal total items
   * @returns total items
   * @deprecated
   */
  private get internalTotalitems (): number {
    const totalItems = parseInt(this._totalItems, 10) || 0;
    return totalItems >= 1 ? totalItems : 0;
  }

  /**
   * Total items
   * @returns total items
   * @deprecated
   * @ignore
   */
  @property({ type: String, attribute: 'total-items' })
  public get totalItems (): string {
    totalItemsDeprecation.once();
    return this._totalItems;
  }

  /**
   * Set total items
   * @param value total items
   * @deprecated
   * @ignore
   */
  public set totalItems (value: string) {
    totalItemsDeprecation.show();
    let newValue = value;
    if (!newValue || !this.validatePage(value, true, 'total-items')) {
      newValue = '';
    }

    // Validate to show warning only, need to keep developer value.
    // Check page still is in supported range if total-item changed
    const newTotalPage = Math.ceil((parseInt(newValue, 10) || 1) / this.internalPageSize) || 1;
    if (this.internalValue > newTotalPage) {
      new WarningNotice(`${this.localName} : The specified value "${newValue}" of total-items caused the value of page property is out of supported range.`).show();
    }

    const oldValue = this._totalItems;
    if (oldValue !== newValue) {
      this._totalItems = newValue;
    }
    this.requestUpdate('totalItems', oldValue);
  }

  /**
   * Set state to disable
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * Get infinite pagination state
   * @returns infinite pagination state
   */
  private get infinitePaginate (): boolean {
    return this.internalMax === Infinity; // internalMax always returns 1-Infinity
  }

  /**
   * Getter for text field as input part
   */
  @query('#input')
  private input!: HTMLInputElement;

  /**
   * Used for translations
   */
  @translate()
  protected t!: Translate;

  /**
   * Getter for display page number or text depends on focusing the input
   * @returns input text
   */
  protected get inputValue (): string {
    if (this.inputFocused) {
      return this.internalValue.toString();
    }
    else {
      return this.inputTextFormat;
    }
  }

  /**
   * Get page text format in various translation
   */
  protected get inputTextFormat (): string {
    return (this.infinitePaginate ? this.t('PAGE', { page: this.internalValue }) : this.t('PAGE_OF', { page: this.internalValue, pageTotal: this.internalMax })) as string;
  }

  /**
   * State for check the input focus
   */
  @state()
  private inputFocused = false;

  /**
   * State for checking the first page button is available
   */
  protected get useFirstButton (): boolean {
    return !this.disabled && this.internalValue >= 2;
  }

  /**
   * State for checking the previous page button is available
   */
  protected get usePreviousButton (): boolean {
    return this.useFirstButton;
  }

  /**
   * State for checking the next page button is available
   */
  protected get useNextButton (): boolean {
    return !this.disabled && this.internalValue < this.internalMax;
  }

  /**
   * State for checking the last page button is available
   */
  protected get useLastButton (): boolean {
    return this.useNextButton && !this.infinitePaginate;
  }

  /**
   * @override
   */
  protected update (changedProperties: PropertyValues): void {
    super.update(changedProperties);

    if (changedProperties.has('value')) {
      this.input.setAttribute('aria-valuenow', this.internalValue.toString());
    }

    if (changedProperties.has('max')) {
      if (!this.infinitePaginate) {
        this.input.setAttribute('aria-valuemax', this.max);
      }
      else {
        this.input.removeAttribute('aria-valuemax');
      }
    }
  }

  /**
   * @override
   */
  protected updated (changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (this.inputFocused && changedProperties.has('inputFocused')) {
      void this.selectInput();
    }
  }

  /**
   * Validate page value which returns true when value is valid
   * @param value value
   * @param warning show warning message when value is invalid
   * @param propName property name to show in warning message
   * @returns result of validation
   */
  private validatePage (value: string, warning = false, propName = ''): boolean {
    if ((/^[1-9]([0-9]+)?$/).test(value)) {
      return true;
    }
    else {
      if (value !== null && warning && propName) {
        new WarningNotice(`${this.localName} : The specified value "${value}" of ${propName} property is not valid, The value must be integer and greater than 0.`).show();
      }
      return false;
    }
  }

  /**
   * Update page by using value from the input
   * @returns {void}
   */
  private updatePageInput (): void {
    // Prevent update page to the same value
    if (this.value === this.input.value) {
      return;
    }

    const oldValue = this.value;
    let newValue = parseInt(this.input.value, 10);

    // Reset input and boundary value into supported range.
    if (this.validatePage(this.input.value)) {
      if (newValue > this.internalMax) {
        newValue = this.internalMax;
      }
      this.value = newValue.toString();
    }
    // When input value is invalid in case less than support range (value<1), then reset value = '1'.
    else if (!isNaN(newValue) && newValue < 1) {
      this.value = '1';
    }

    if (this.value !== oldValue) {
      this.notifyValueChange();
    }
  }

  /**
   * Select text in input when update element complete
   * @returns returns a promise void
   */
  private async selectInput (): Promise<void> {
    await this.updateComplete;
    this.input.select();
  }

  /**
   * Updates page value depending on direction
   * @param direction page value direction
   * @param event whether the event page-changed should fire
   * @returns {void}
   */
  private updatePage (direction: 'increment' | 'decrement', event = false): void {

    /**
     * Handle in case the value of max property is greater than value of value/page property,
     * which it might happen by using developer API.
     */
    let page = this.internalValue;
    if (page > this.internalMax) {
      page = this.internalMax + 1;
    }

    const limit = direction === 'increment' ? page >= this.internalMax : page <= 1;

    if (!limit) {
      this.value = direction === 'increment' ? (page + 1).toString() : (page - 1).toString();
      if (event) {
        this.notifyValueChange();
      }
    }
  }

  /**
   * Update input value
   *
   * @param value input value
   * @param direction update from old value
   * @returns void
   */
  protected updateInputValue (value = 1, direction: 'increment' | 'decrement' | null = null): void {

    let newValue = value;

    // Update base on old value
    if (direction) {
      const changeValue = direction === 'increment' ? value : -Math.abs(value);
      newValue = Number(this.input.value) + changeValue;
    }

    this.input.value = String(newValue);
    this.input.setAttribute('aria-valuenow', this.input.value);
  }

  /**
   * Fires event when value change
   * @returns {void}
   */
  private notifyValueChange ():void {
    this.notifyPropertyChange('value', this.value);
    this.notifyPropertyChange('page', this.value); // deprecated. support backwards compatibility.
  }

  /**
   * Go to the next page
   * @returns {void}
   */
  public next (): void {
    this.updatePage('increment');
  }

  /**
   * Go to the next page and fires event
   * @returns {void}
   */
  private onNextTap (): void {
    this.updatePage('increment', true);
  }

  /**
   * Go to the previous page
   * @returns {void}
   */
  public previous (): void {
    this.updatePage('decrement');
  }

  /**
   * Go to the previous page and fires event
   * @returns {void}
   */
  private onPreviousTap (): void {
    this.updatePage('decrement', true);
  }

  /**
   * Go to the first page
   * @returns {void}
   */
  public first (): void {
    this.value = '1';
  }

  /**
   * Go to the first page and fires event
   * @returns {void}
   */
  private onFirstTap (): void {
    this.first();
    this.notifyValueChange();
  }

  /**
   * Go to the last page
   * @returns {void}
   */
  public last (): void {
    if (this.infinitePaginate) {
      new WarningNotice(`${this.localName}: Cannot call "last()" when "max" attribute/property is unset.`).show();
      return;
    }
    this.value = this.internalMax.toString();
  }

  /**
   * Go to the last page and fires event
   * @returns {void}
   */
  private onLastTap (): void {
    this.last();
    this.notifyValueChange();
  }

  /**
   * Check pagination has a next page
   * @param page current page number
   * @returns true if pagination has a next page
   */
  protected hasNextPage (page: number): boolean {
    return page < this.internalMax;
  }

  /**
   * Check pagination has a previous page
   * @param page current page number
   * @returns true if pagination has a previous page
   */
  protected hasPreviousPage (page: number): boolean {
    return page > 1;
  }

  /**
   * Check pagination has a last page
   * @returns true if pagination has a last page
   */
  protected hasLastPage (): boolean {
    return !this.infinitePaginate;
  }

  /**
   * Handles key press event
   * @param event Key down event object
   * @returns {void}
   */
  private onKeyPress (event: KeyboardEvent): void {
    // Allow input number only
    if (!(/\d/).test(event.key)) {
      event.preventDefault();
    }
  }

  /**
   * Handles action when input focused change
   * @param event focus change event
   * @returns {void}
   */
  private onFocusedChanged (): void {
    this.inputFocused = document.activeElement === this;

    if (!this.inputFocused) {
      this.updatePageInput();
    }
  }

  /**
   * Handles key down event
   * @param event Key down event object
   * @returns {void}
   */
  private onKeyDown (event: KeyboardEvent): void {
    if (event.defaultPrevented) {
      return;
    }

    const newInputValue = Number(this.input.value);

    switch (event.key) {
      case 'Enter':
        this.updatePageInput();
        this.input.blur();
        break;
      case 'Tab':
        this.updatePageInput();
        break;
      case 'Up':
      case 'ArrowUp':
        this.hasNextPage(newInputValue) && this.updateInputValue(1, 'increment');
        break;
      case 'Down':
      case 'ArrowDown':
        this.hasPreviousPage(newInputValue) && this.updateInputValue(1, 'decrement');
        break;
      case 'Home':
        this.updateInputValue(1);
        break;
      case 'End':
        this.hasLastPage() && this.updateInputValue(this.internalMax);
        break;
      default:
        return;
    }

    if (event.key !== 'Tab') {
      event.preventDefault();
    }
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
        display: inline-block;
      }

      [part=status] {
        width: 0px;
        height: 0px;
        overflow: hidden;
        position: absolute;
      }
    `;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
      <span id="status" part="status" role="status" aria-live="polite">${this.inputTextFormat}</span>
      <ef-layout part="container" flex nowrap>
        <ef-button-bar part="buttons" aria-hidden="true" tabindex="-1">
          <ef-button id="first" icon="skip-to-start" @tap="${this.onFirstTap}" .disabled=${!this.useFirstButton}></ef-button>
          <ef-button id="previous" icon="left" @tap="${this.onPreviousTap}" .disabled=${!this.usePreviousButton}></ef-button>
        </ef-button-bar>
        <input
          id="input"
          part="input"
          role="spinbutton"
          aria-labelledby="status"
          aria-valuemin="1"
          .value=${this.inputValue}
          .disabled=${this.disabled}
          @focus=${this.onFocusedChanged}
          @blur=${this.onFocusedChanged}
          @keypress=${this.onKeyPress}
          @keydown=${this.onKeyDown}
        />
        <ef-button-bar part="buttons" aria-hidden="true" tabindex="-1">
          <ef-button id="next" icon="right" @tap="${this.onNextTap}" .disabled=${!this.useNextButton}></ef-button>
          <ef-button id="last" icon="skip-to-end" @tap="${this.onLastTap}" .disabled=${!this.useLastButton}></ef-button>
        </ef-button-bar>
      </ef-layout>
    `;
  }
}
