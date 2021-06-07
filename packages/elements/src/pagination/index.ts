import {
  BasicElement,
  html,
  css,
  customElement,
  property,
  query,
  PropertyValues,
  TemplateResult,
  CSSResult
} from '@refinitiv-ui/core';

import '../button';
import '../button-bar';
import '../layout';
import '../text-field';
import { Button } from '../button';
import { TextField } from '../text-field';
import { translate, Translate } from '@refinitiv-ui/translate';
import '@refinitiv-ui/phrasebook/lib/locale/en/pagination';

type PageInfo = {
  from: number;
  to: number;
  totalCount: number;
  pageSize: number;
};

/**
 * Used to control and navigate through multiple pages
 *
 * @fires page-changed - Fired when the `page` property is changed
 */
@customElement('ef-pagination')
export class Pagination extends BasicElement {
  /**
   * Getter for info part
   */
  @query('#info')
  private infoElement!: HTMLElement;

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
   * Set current page
   */
  @property({ type: String })
  public page = '1';

  /**
   * Number of item per page
   */
  @property({ type: String, attribute: 'page-size' })
  public pageSize = '10';

  /**
   * Total items
   */
  @property({ type: String, attribute: 'total-items' })
  public totalItems = '10';

  /**
   * Set state to disable
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * Used for translations
   */
  @translate()
  protected t!: Translate;

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
    if (changedProperties.has('page')) {
      const previousPage = changedProperties.get('page') as string;
      this.page = this.validatePage(previousPage, this.page);
      this.updateButtons();
    }
    if (changedProperties.has('pageSize')) {
      this.pageSizeChanged();
    }
    if (changedProperties.has('totalItems')) {
      this.totalItemsChanged();
    }
  }

  /**
   * Handle when page-size property changed
   * @returns {void}
   */
  private pageSizeChanged (): void {
    const page = Number.parseInt(this.page, 10);
    const pageSize = Number.parseInt(this.pageSize, 10);
    // page must have at least 1 item
    if (pageSize < 1) {
      this.pageSize = '1';
    }
    if (page > this.totalPage) {
      this.page = '' + this.totalPage;
    }
    this.updateButtons();
  }

  /**
   * Handle when total-items property changed
   * @returns {void}
   */
  private totalItemsChanged (): void {
    const page = Number.parseInt(this.page, 10);
    const totalItems = Number.parseInt(this.totalItems, 10);
    // handle if someone doesn't know how to count
    if (totalItems < 1) {
      this.totalItems = '0';
      this.page = '1';
    }
    else if (page > this.totalPage) {
      this.page = '' + this.totalPage;
    }
    this.updateButtons();
  }

  /**
   * Handle when disabled property changed
   * @returns {void}
   */
  private disabledChanged (): void {
    if (this.disabled) {
      this.infoElement.setAttribute('disabled', '');
    }
    else {
      this.infoElement.removeAttribute('disabled');
    }

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
    const page = Number.parseInt(this.page, 10);
    const firstPage = this.disabled || page <= 1;
    const lastPage = this.disabled || page >= this.totalPage;
    this.previousPageButton.disabled = firstPage;
    this.firstPageButton.disabled = firstPage;
    this.nextPageButton.disabled = lastPage;
    this.lastPageButton.disabled = lastPage;
  }

  /**
   * Calculate and return total pages
   * Total pages should never less than 1
   * @returns {Number} Number of total page
   */
  private get totalPage (): number {
    const pageSize = Number.parseInt(this.pageSize, 10);
    const totalItems = Number.parseInt(this.totalItems, 10);
    if (pageSize > 0) {
      const totalPage = Math.ceil(totalItems / pageSize);
      return totalPage > 0 ? totalPage : 1;
    }
    return 1;
  }

  /**
   * Check a new page value to be usable
   * if a new page value is allow then return newPage
   * Condition to be old value is null or NaN or undefined or string or less than 1
   * @param oldPage a old page value
   * @param newPage a new page value
   * @return return a new page value
   */
  private validatePage (oldPage: string, newPage: string): string {
    let page = Number.parseInt(newPage, 10);

    if(!page || isNaN(Number(newPage)) || isNaN(page)) {
      page = Number.parseInt(oldPage, 10);
    }
    else if (page > this.totalPage) {
      page = this.totalPage;
    }
    else if (page < 1) {
      page = 1;
    }

    return page.toString();
  }

  /**
   * Get text to display in info part
   * @returns Info used for translations
   */
  private get pageInfo (): PageInfo {
    const page = Number.parseInt(this.page, 10);
    const pageSize = Number.parseInt(this.pageSize, 10);
    const totalCount = Number.parseInt(this.totalItems, 10);
    const from = ((page - 1) * pageSize) + 1;
    const to = page * pageSize > totalCount ? totalCount : page * pageSize;
    return {
      from,
      to,
      totalCount,
      pageSize
    };
  }

  /**
   * Hide info part when it's too small
   * @returns {void}
   */
  private onResize (): void {
    const display = this.clientWidth < Number.parseInt(this.getComputedVariable('--responsive-width'), 10) ? 'none' : 'block';
    this.infoElement.style.display = display;
  }

  /**
   * Handle when input is focus
   * @returns {void}
   */
  private onInputFocus (): void {
    this.input.value = this.page;
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
    const oldPageValue = this.page;
    this.page = this.validatePage(this.page, event.target.value);
    // need this to update input text
    void this.requestUpdate();

    if (this.page !== oldPageValue) {
      this.notifyPropertyChange('page', this.page);
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
    const page = parseInt(this.page, 10);
    const limit = direction === 'increment' ? page < this.totalPage : page > 1;

    if (limit) {
      this.page = direction === 'increment' ? '' + (page + 1) : '' + (page - 1);

      if (event) {
        this.notifyPropertyChange('page', this.page);
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
   * Go to the previous page and fires evetn
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
    this.page = '1';
  }

  /**
   * Go to the first page and fires event
   * @returns {void}
   */
  private onFirstTap (): void {
    this.first();
    this.notifyPropertyChange('page', this.page);
  }

  /**
   * Go to the last page
   * @returns {void}
   */
  public last (): void {
    this.input.blur();
    this.page = '' + this.totalPage;
  }

  /**
   * Go to the last page and fires event
   * @returns {void}
   */
  private onLastTap (): void {
    this.last();
    this.notifyPropertyChange('page', this.page);
  }

  /**
   * A `CSSResult` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @return CSS template
   */
  static get styles (): CSSResult | CSSResult[] {
    return css`
      :host {
        display: block;
        --responsive-width: 450;
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
      <ef-layout part="container" flex nowrap @resize="${this.onResize}">
        <div id="info" part="info">${this.t('ITEM_INFO', this.pageInfo)}</div>
        <ef-button-bar part="buttons">
          <ef-button id="first" icon="skip-to-start" @tap="${this.onFirstTap}"></ef-button>
          <ef-button id="previous" icon="left" @tap="${this.onPreviousTap}"></ef-button>
        </ef-button-bar>
        <ef-text-field
          id="input"
          part="input"
          @focus="${this.onInputFocus}"
          @blur="${this.onInputBlur}"
          @keydown="${this.onInputKeyDown}"
          .value="${this.t('PAGE_OF', {
            page: this.page,
            pageTotal: this.totalPage
          })}"
          no-spinner></ef-text-field>
        <ef-button-bar part="buttons">
          <ef-button id="next" icon="right" @tap="${this.onNextTap}"></ef-button>
          <ef-button id="last" icon="skip-to-end" @tap="${this.onLastTap}"></ef-button>
        </ef-button-bar>
      </ef-layout>
    `;
  }
}
