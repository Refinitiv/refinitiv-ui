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
import { query } from '@refinitiv-ui/core/lib/decorators/query.js';
import { VERSION } from '../version.js';
import '../button/index.js';
import '../button-bar/index.js';
import '../layout/index.js';
import '../text-field/index.js';
import type { Button } from '../button';
import type { TextField } from '../text-field';
import '@refinitiv-ui/phrasebook/lib/locale/en/pagination.js';
import { translate, Translate } from '@refinitiv-ui/translate';

const pageDeprecation = new DeprecationNotice('Property `page` is deprecated, use `value` instead.');
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
   * current page
   * @deprecated
   * @ignore
   */
  @property({ type: String })
  public get page (): string {
    return this.value;
  }
  /**
   * @ignore
   * @param {String} value - Set current page
   */
  public set page (value: string) {
    pageDeprecation.once();
    this.value = value;
  }

  /**
   * Set current page
   */
  @property({ type: String })
  public value = '1';

  /**
   * Number of item per page
   */
  @property({ type: String, attribute: 'page-size' })
  public pageSize = '10';

  /**
   * Total items
   * @deprecated
   * @ignore
   */
  @property({ type: String, attribute: 'total-items' })
  public get totalItems (): string {
    return this.max;
  }
  /**
  * @ignore
  * @param {String} value - Set total items
  */
  public set totalItems (value: string) {
    totalItemsDeprecation.once();
    this.max = value;
  }

  /**
   * Max
   */
  @property({ type: String })
  public max = '';

  /**
   * Set state to disable
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * Get infinite pagination state
   */
  private get infinitePaginate (): boolean {
    return !this.max || Number.parseInt(this.max, 10) <= 0;
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
   * State for check the input is editing
   */
  private inputEditing = false;

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
      const previousPage = changedProperties.get('value') as string;
      this.value = this.validatePage(previousPage, this.value);
      this.updateButtons();
    }
    if (changedProperties.has('pageSize')) {
      this.pageSizeChanged();
    }
    if (changedProperties.has('max')) {
      this.maxChanged();
    }
  }

  /**
   * Handle when page-size property changed
   * @returns {void}
   */
  private pageSizeChanged (): void {
    const value = Number.parseInt(this.value, 10);
    const pageSize = Number.parseInt(this.pageSize, 10);

    // page must have at least 1 item
    if (pageSize < 1) {
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
    const value = Number.parseInt(this.value, 10);
    const max = Number.parseInt(this.max, 10);
    // handle if someone doesn't know how to count
    if (max < 1) {
      this.max = '0';
      this.value = '1';
    }
    else if (value > this.totalPage) {
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
    const value = Number.parseInt(this.value, 10);
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
    const pageSize = Number.parseInt(this.pageSize, 10);
    const max = Number.parseInt(this.max, 10);

    if (!max) {
      return Infinity;
    }

    if (pageSize > 0) {
      const totalPage = Math.ceil(max / pageSize);
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

  /**
   * Handle input page selection when input has a click or focus
   * @returns {void}
   */
  private handleInputPageSelection (): void {
    this.inputEditing = true;
    this.requestUpdate();
    setTimeout(() => {
      this.input.select();
    });
  }

  /**
   * Handle when input lost focus
   * @param event Event object
   * @returns {void}
   */
  private onInputBlur (event: {target: HTMLInputElement}): void {
    this.inputEditing = false;
    const oldPageValue = this.value;
    this.value = this.validatePage(this.value, event.target.value);
    this.requestUpdate();

    if (this.value !== oldPageValue) {
      this.notifyPropertyChange('value', this.value);
    }
  }

  /**
   * Handles action when Enter key is press onto the input
   * @param event Keyboard event
   * @returns {void}
   */
  private onInputKeyDown (event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.keyCode === 13) {
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
   * Updates page value depending on direction
   * @param direction page value direction
   * @param event whether the event page-changed should fire
   * @returns {void}
   */
  private updatePage (direction: 'increment' | 'decrement', event = false): void {
    const value = parseInt(this.value, 10);
    const limit = direction === 'increment' ? value < this.totalPage : value > 1;

    if (limit) {
      this.value = direction === 'increment' ? (value + 1).toString() : (value - 1).toString();

      if (event) {
        this.notifyPropertyChange('value', this.value);
      }
    }
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
    this.notifyPropertyChange('value', this.value);
  }

  /**
   * Go to the last page
   * @returns {void}
   */
  public last (): void {
    if (!this.max) {
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
    this.notifyPropertyChange('value', this.value);
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return {TemplateResult} Render template
   */
  protected render (): TemplateResult {
    let inputValue;
    if (this.inputEditing) {
      inputValue = this.value;
    }
    else {
      inputValue = this.infinitePaginate ? this.t('PAGE', { page: this.value }) : this.t('PAGE_OF', { page: this.value, pageTotal: this.totalPage });
    }
    return html`
      <ef-layout part="container" flex nowrap>
        <ef-button-bar part="buttons">
          <ef-button id="first" icon="skip-to-start" @tap="${this.onFirstTap}"></ef-button>
          <ef-button id="previous" icon="left" @tap="${this.onPreviousTap}"></ef-button>
        </ef-button-bar>
        <ef-text-field
          id="input"
          part="input"
          @focus=${this.handleInputPageSelection}
          @blur="${this.onInputBlur}"
          @keydown="${this.onInputKeyDown}"
          .value=${inputValue}
          no-spinner></ef-text-field>
        <ef-button-bar part="buttons">
          <ef-button id="next" icon="right" @tap="${this.onNextTap}"></ef-button>
          <ef-button id="last" icon="skip-to-end" @tap="${this.onLastTap}"></ef-button>
        </ef-button-bar>
      </ef-layout>
    `;
  }
}
