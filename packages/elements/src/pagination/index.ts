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
import { customElement } from '@refinitiv-ui/core/lib/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/lib/decorators/property.js';
import { state } from '@refinitiv-ui/core/lib/decorators/state.js';
import { query } from '@refinitiv-ui/core/lib/decorators/query.js';
import { DirectiveResult } from 'lit/directive.js';
import { VERSION } from '../version.js';
import '../button/index.js';
import '../button-bar/index.js';
import '../layout/index.js';
import '../text-field/index.js';

import '@refinitiv-ui/phrasebook/lib/locale/en/pagination.js';
import { translate, Translate } from '@refinitiv-ui/translate';

import type { Button } from '../button';
import type { TextField } from '../text-field';
import type { FocusedChangedEvent } from '../events';

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

  /**
   * Get internal current page value
   * @returns current page value
   */
  private get internalValue (): number {
    let value = parseInt(this._value, 10) || 0;

    if (value <= 0) {
      value = 1;
    }

    return value;
  }

  /**
   * Get current page value
   */
  @property({ type: String })
  public get value (): string {
    return this._value;
  }

  /**
   * Set current page value
   * @param value current page
   */
  public set value (value: string) {
    let newValue = value;
    if (!newValue || !this.validatePage(newValue, true, 'value')) {
      newValue = '';
    }

    // Validate to show warning only, need to keep developer value.
    this.validateRange(parseInt(newValue, 10), 1, this.internalMax, true, 'value');

    const oldValue = this._value;
    if (oldValue !== newValue) {
      this._value = newValue;
    }
    this.requestUpdate('value', oldValue);
  }

  /**
   * Max page
   */
  protected _max = '';

  /**
   * Get internal max page
   * @returns max page
   */
  private get internalMax (): number {
    const max = parseInt(this._max, 10);
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
      return totalPage > 0 ? totalPage : 1;
    }

    return 1;
  }

  /**
   * Get max page
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

    // Validate to show warning only, need to keep developer value.
    if (!this.validateRange(parseInt(newValue, 10), this.internalValue, Infinity)) {
      new WarningNotice(`${this.localName} : The specified value "${value}" of max property must be greater than the value property.`).show();
    }

    const oldValue = this._max;
    if (oldValue !== newValue) {
      this._max = newValue;
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

    // Validate to show warning only, need to keep developer value.
    this.validateRange(parseInt(newValue, 10), 1, this.internalMax, true, 'page');

    const oldValue = this._value;
    if (oldValue !== newValue) {
      this._value = newValue;
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
    this.validateRange(parseInt(newValue, 10), 1, this.internalTotalitems, true, 'page-size');

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
   * Get internal page size
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
   * Get internal total items
   * @returns total items
   * @deprecated
   */
  private get internalTotalitems (): number {
    return parseInt(this._totalItems, 10);
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
      new WarningNotice(`${this.localName} : The specified value "${newValue}" of total-items caused the value of page property is out of page-size range.`).show();
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
  private input!: TextField;

  /**
   * Getter for first button as first part
   */
  @query('#first')
  private firstPageButton!: Button;

  /**
   * Getter for previous button as previous part
   */
  @query('#previous')
  private previousPageButton!: Button;

  /**
   * Getter for next button as next part
   */
  @query('#next')
  private nextPageButton!: Button;

  /**
   * Getter for last button as last part
   */
  @query('#last')
  private lastPageButton!: Button;

  /**
   * Used for translations
   */
  @translate()
  protected t!: Translate;

  /**
   * State for check the input focus
   */
  @state()
  private inputFocused = false;

  /**
   * Getter for display text in the input
   * @returns {(string|DirectiveResult)} input text
   */
  protected get inputText ():string | DirectiveResult {
    if (this.inputFocused) {
      return this.internalValue;
    }
    else {
      return this.infinitePaginate ? this.t('PAGE', { page: this.internalValue }) : this.t('PAGE_OF', { page: this.internalValue, pageTotal: this.internalMax });
    }
  }

  /**
   * Invoked whenever the element is updated
   * @param changedProperties Map of changed properties with old values
   * @returns {void}
   */
  protected updated (changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    let updateButtons = false;
    if (changedProperties.has('disabled')) {
      this.disabledChanged();
    }

    if (changedProperties.has('value') || changedProperties.has('max')) {
      updateButtons = true;
    }

    if (changedProperties.has('pageSize') || changedProperties.has('totalItems')) {
      if (this.max === '') {
        updateButtons = true;
      }
    }

    if (updateButtons) {
      this.updateButtons();
    }

    if (this.inputFocused && changedProperties.has('inputFocused')) {
      void this.selectInput();
    }
  }

  /**
   * Handle when disabled property changed
   * @returns {void}
   */
  private disabledChanged (): void {
    this.input.disabled = this.disabled;

    // recalculate button state
    this.updateButtons();
  }

  /**
   * Update disable/enable state of first, previous, next, and last
   * First and previous should be disabled if showing first page
   * Next and last should be disabled if showing last page
   * @returns {void}
   */
  private updateButtons (): void {
    const value = this.internalValue;
    const firstPage = this.disabled || value <= 1;
    const nextPage = this.disabled || value >= this.internalMax;
    const lastPage = nextPage || this.infinitePaginate;

    this.previousPageButton.disabled = firstPage;
    this.firstPageButton.disabled = firstPage;
    this.nextPageButton.disabled = nextPage;
    this.lastPageButton.disabled = lastPage;
  }

  /**
   * Validate integer value
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
   * Validate number in supported range
   * @param value value for validation
   * @param min minimum value
   * @param max maximum value
   * @param warning show warning message when value is invalid
   * @param propName property name to show in warning message
   * @returns result of validation
   */
  private validateRange (value: number, min: number, max: number, warning = false, propName = ''): boolean {
    if (value < min || value > max) {
      if (warning && propName) {
        new WarningNotice(`${this.localName} : The specified value "${value}" of ${propName} property is out of range, the value must be between min ${min} and max ${max}.`).show();
      }
      return false;
    }

    return true;
  }

  /**
   * Handles action when Enter key is press onto the input
   * @param event Keyboard event
   * @returns {void}
   */
  private onInputKeyDown (event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.keyCode === 13) {

      const oldValue = this.value;
      let newValue = parseInt(this.input.value, 10);

      // Reset input and boundary value into supported range.
      if (this.validatePage(this.input.value)) {
        if (newValue <= 0) {
          newValue = 1;
        }
        else if (newValue > this.internalMax) {
          newValue = this.internalMax;
        }
        this.value = newValue.toString();
      }
      else if (!isNaN(newValue)) {
        this.value = '1';
      }

      this.input.blur();
      event.preventDefault();

      if (this.value !== oldValue) {
        this.notifyValueChange();
      }

      /*
      * Issue only in firefox
      * cannot blur() or focus() to this.input
      * so create a temp to this.input loses focus
      */
      const temp = document.createElement('input');
      this.shadowRoot?.appendChild(temp);
      temp.focus();
      this.input.blur();
      this.shadowRoot?.removeChild(temp);
      event.preventDefault();
    }
  }

  /**
   * Handles action when input focused change
   * @param event {FocusedChangedEvent} focus change event
   * @returns {void}
   */
  private onInputFocusedChanged (event: FocusedChangedEvent): void {
    this.inputFocused = event.detail.value;
  }

  /**
   * Select text in input when update element complete
   * @returns {Promise<void>} returns a promise void
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

    const limit = direction === 'increment' ? page < this.internalMax : page > 1;

    if (limit) {
      this.value = direction === 'increment' ? (page + 1).toString() : (page - 1).toString();
      if (event) {
        this.notifyValueChange();
      }
    }
  }

  /**
   * Fires event when value change
   * @returns {void}
   */
  private notifyValueChange ():void {
    this.notifyPropertyChange('value', this.value);
    this.notifyPropertyChange('page', this.value); // deprecated. support backward compat
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
    `;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
      <ef-layout part="container" flex nowrap>
        <ef-button-bar part="buttons">
          <ef-button id="first" icon="skip-to-start" @tap="${this.onFirstTap}"></ef-button>
          <ef-button id="previous" icon="left" @tap="${this.onPreviousTap}"></ef-button>
        </ef-button-bar>
        <ef-text-field
          id="input"
          part="input"
          @focused-changed=${this.onInputFocusedChanged}
          @keydown=${this.onInputKeyDown}
          .value=${this.inputText as string}
          no-spinner></ef-text-field>
        <ef-button-bar part="buttons">
          <ef-button id="next" icon="right" @tap="${this.onNextTap}"></ef-button>
          <ef-button id="last" icon="skip-to-end" @tap="${this.onLastTap}"></ef-button>
        </ef-button-bar>
      </ef-layout>
    `;
  }
}
