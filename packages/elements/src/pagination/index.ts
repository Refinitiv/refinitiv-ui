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
    `;
  }

  /**
   * Current page internal current page value
   */
  private _value = '';

  /**
   * Get internal current page value
   * @returns {number} current page value
   */
  private get internalValue (): number {
    return parseInt(this.value, 10) || 1;
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
   * @param {string} value current page
   */
  public set value (value: string) {
    const newValue = this.validateInteger(value, 'value');
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
   * @returns {number} max page
   */
  private get internalMax (): number {
    return parseInt(this.max, 10);
  }

  /**
   * Get max page
   * @returns {string} max page
   */
  @property({ type: String })
  public get max (): string {
    return this._max;
  }

  /**
  * Set max page
  * @param {string} value max page
  */
  public set max (value: string) {
    const newValue = this.validateInteger(value, 'max');
    const oldValue = this._max;
    if (oldValue !== newValue) {
      this._max = newValue;
    }
    this.requestUpdate('max', oldValue);
  }

  /**
   * Current page
   * @returns {string} current page
   * @deprecated
   * @ignore
   */
  @property({ type: String })
  public get page (): string {
    return this._value;
  }

  /**
   * Set current page
   * @param {String} value - Set current page
   * @deprecated
   * @ignore
   */
  public set page (value: string) {
    pageDeprecation.show();
    const newValue = this.validateInteger(value, 'page');
    const oldValue = this._value;
    if (oldValue !== newValue) {
      this._value = newValue;
    }
    this.requestUpdate('page', oldValue);
  }

  /**
   * Number of item per page
   * @returns {string} number of items per page
   * @deprecated
   * @ignore
   */
  @property({ type: String, attribute: 'page-size' })
  public get pageSize (): string {
    return this._pageSize;
  }

  /**
   * Set number of item per page
   * @param {string} value - number of item per page
   * @deprecated
   * @ignore
   */
  public set pageSize (value: string) {
    pageSizeDeprecation.show();
    const newValue = this.validateInteger(value, 'page-size');
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
   * @returns {number} page size
   */
  private get internalPageSize (): number {
    return parseInt(this.pageSize, 10);
  }

  /**
   * Total items internal value
   * @deprecated
   */
  private _totalItems = '';

  /**
   * Get internal total items
   * @returns {number} total items
   * @deprecated
   */
  private get internalTotalitems (): number {
    return parseInt(this.totalItems, 10);
  }

  /**
   * Total items
   * @returns {string} total items
   * @deprecated
   * @ignore
   */
  @property({ type: String, attribute: 'total-items' })
  public get totalItems (): string {
    return this._totalItems;
  }

  /**
   * Set total items
   * @param {string} value total items
   * @deprecated
   * @ignore
   */
  public set totalItems (value: string) {
    totalItemsDeprecation.show();
    const newValue = this.validateInteger(value, 'total-items');
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
   * @returns {boolean} infinite pagination state
   */
  private get infinitePaginate (): boolean {
    return !this.max && !this.internalTotalitems || this.internalMax <= 0;
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
      return this.infinitePaginate ? this.t('PAGE', { page: this.internalValue }) : this.t('PAGE_OF', { page: this.internalValue, pageTotal: this.totalPage });
    }
  }

  /**
   * Invoked whenever the element is updated
   * @param changedProperties Map of changed properties with old values
   * @returns {void}
   */
  protected updated (changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (changedProperties.has('disabled')) {
      this.disabledChanged();
    }

    if (changedProperties.has('value')) {
      this.updateButtons();
    }

    if (changedProperties.has('max')) {
      this.maxChanged();
    }

    if (changedProperties.has('pageSize')) {
      this.pageSizeChanged();
    }

    if (changedProperties.has('totalItems')) {
      this.totalItemsChanged();
    }

    if (this.inputFocused && changedProperties.has('inputFocused')) {
      void this.selectInput();
    }
  }

  /**
   * Handle when page-size property changed
   * @returns {void}
   */
  private pageSizeChanged (): void {
    if (this.internalMax >= 1) {
      return;
    }

    const value = this.internalValue;

    // page must have at least 1 item
    if (this.internalPageSize < 1) {
      this.pageSize = '1';
    }
    if (value > this.totalPage) {
      this.value = this.totalPage.toString();
    }
    this.updateButtons();
  }

  /**
   * Handle when max property changed
   * @returns {void}
   */
  private maxChanged (): void {
    const value = this.internalValue;
    const max = this.internalMax;
    // Validate max value
    if (max <= 0) {
      this.max = '';
      this.value = '1';
    }
    else if (value > this.totalPage) {
      this.value = this.totalPage.toString();
    }
    this.updateButtons();
  }

  /**
   * Handle when total-items property changed
   * @returns {void}
   */
  private totalItemsChanged (): void {

    if (this.internalMax >= 1) {
      return;
    }

    const page = this.internalValue;
    // Validate total items value
    if (this.internalTotalitems < 1) {
      this.totalItems = '';
      this.value = '1';
    }
    else if (page > this.totalPage) {
      this.value = this.totalPage.toString();
    }
    this.updateButtons();
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
    const nextPage = this.disabled || value >= this.totalPage;
    const lastPage = nextPage || this.infinitePaginate;

    this.previousPageButton.disabled = firstPage;
    this.firstPageButton.disabled = firstPage;
    this.nextPageButton.disabled = nextPage;
    this.lastPageButton.disabled = lastPage;
  }

  /**
   * Calculate and return total pages
   * Total pages should never less than 1
   * @returns {number} Number of total page
   */
  private get totalPage (): number {
    const max = this.internalMax;
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
   * Check a new page value to be usable
   * if a new page value is allow then return a new
   * Condition to be old value is null or NaN or undefined or string or less than 1
   * @param oldValue a old page value
   * @param newValue a new page value
   * @return return a new page value
   */
  private validatePage (oldValue: string, newValue: string): string {
    let value = Number.parseInt(newValue, 10);

    if(!value || isNaN(Number(newValue)) || isNaN(value)) {
      value = Number.parseInt(oldValue, 10);
    }
    else if (value > this.totalPage) {
      value = this.totalPage;
    }
    else if (value < 1) {
      value = 1;
    }

    return value.toString();
  }

  private validateInteger (value: string, propName: string): string {
    if (value === '' || (/^[1-9]([0-9]+)?$/).test(value)) {
      return value;
    }
    else {
      new WarningNotice(`${this.localName} : The specified value "${value}" of ${propName} property is not valid, value must be integer and greater than 0 Default value will be used instead.`).show();
      return '';
    }
  }

  /**
   * Handles action when Enter key is press onto the input
   * @param event Keyboard event
   * @returns {void}
   */
  private onInputKeyDown (event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.keyCode === 13) {

      const oldPageValue = this.value;
      this.value = this.validatePage(this.value, this.input.value);
      this.input.blur();
      event.preventDefault();
      if (this.value !== oldPageValue) {
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
    const page = this.internalValue;
    const limit = direction === 'increment' ? page < this.totalPage : page > 1;

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
    this.input.blur();
    this.updatePage('increment');
  }

  /**
   * Go to the next page and fires event
   * @returns {void}
   */
  private onNextTap (): void {
    this.input.blur();
    this.updatePage('increment', true);
  }

  /**
   * Go to the previous page
   * @returns {void}
   */
  public previous (): void {
    this.input.blur();
    this.updatePage('decrement');
  }

  /**
   * Go to the previous page and fires event
   * @returns {void}
   */
  private onPreviousTap (): void {
    this.input.blur();
    this.updatePage('decrement', true);
  }

  /**
   * Go to the first page
   * @returns {void}
   */
  public first (): void {
    this.input.blur();
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
    if (!this.max && !this.totalItems) {
      new WarningNotice(`${this.localName}: Method "last()" does not support, when the element does not have "max" attribute/property.`).show();
      return;
    }
    this.input.blur();
    this.value = this.totalPage.toString();
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
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return {TemplateResult} Render template
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
          .value=${this.inputText}
          no-spinner></ef-text-field>
        <ef-button-bar part="buttons">
          <ef-button id="next" icon="right" @tap="${this.onNextTap}"></ef-button>
          <ef-button id="last" icon="skip-to-end" @tap="${this.onLastTap}"></ef-button>
        </ef-button-bar>
      </ef-layout>
    `;
  }
}
