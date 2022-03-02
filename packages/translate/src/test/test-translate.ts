/**
 * A test element to verify bindings
 */
import {
  BasicElement,
  html,
  css,
  CSSResult,
  TemplateResult
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { query } from '@refinitiv-ui/core/decorators/query.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';

import {
  translate,
  TranslateDirective
} from '../translate';

import './test-nested-translate';
import './phrasebook';

const date = new Date(2020, 6, 21, 23, 59, 50); /* just a random date */

@customElement('test-translate', { theme: false })
export class TestTranslate extends BasicElement {
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
        padding: 0 10px 10px 10px;
      }
    `;
  }

  @translate()
  private t!: TranslateDirective;

  @translate('t-custom')
  private tCustom!: TranslateDirective;

  @query('#default')
  public defaultEl!: HTMLElement;
  @query('#date')
  public dateEl!: HTMLElement;
  @query('#number')
  public numberEl!: HTMLElement;
  @query('#bold')
  public boldEl!: HTMLElement;
  @query('#plural-0')
  public plural0El!: HTMLElement;
  @query('#plural-1')
  public plural1El!: HTMLElement;
  @query('#plural-2')
  public plural2El!: HTMLElement;
  @query('#nested')
  public nestedEl!: HTMLElement;
  @query('#currency')
  public currencyEl!: HTMLElement;
  @query('#custom')
  public customEl!: HTMLElement;

  /**
   * Set translate date
   */
  @property({ type: Number })
  public date: Date | number = date;

  /**
   * Set translate number
   */
  @property({ type: Number })
  public number = 1000000;

  /**
   * Include plurals.
   * TODO: this needs a polyfill for IE11
   */
  @property({ type: Boolean, reflect: true, attribute: 'with-plurals' })
  public withPlurals = false;

  /**
   * Include nested node
   */
  @property({ type: Boolean, reflect: true, attribute: 'with-nested' })
  public withNested = false;

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
      <div id="default">${this.t('DEFAULT')}</div>
      <div id="date">${this.t('DATE', {
        date: new Date(this.date)
      })}</div>
      <div id="currency">${this.t('CURRENCY', { number: this.number })}</div>
      ${this.withPlurals
        ? html`
          <div id="plural-0">${this.t('PLURAL', { count: 0 })}</div>
          <div id="plural-1">${this.t('PLURAL', { count: 1 })}</div>
          <div id="plural-2">${this.t('PLURAL', { count: 2 })}</div>
        `
        : undefined}
      <div id="bold">${this.t('BOLD', {
        b: (chunks: string) => `<b>${chunks}</b>`,
        i: (chunks: string) => `<i>${chunks}</i>`
      })}</div>
      <div id="number">${this.t('NUMBER', { number: this.number })}</div>
      <div id="custom">${this.tCustom('CUSTOM')}</div>
      ${this.withNested ? html`
        <test-nested-translate
          id="nested"
          .property=${this.t('NESTED_PROPERTY')}
          attribute=${this.t('NESTED_ATTRIBUTE')}
          ></test-nested-translate>
      ` : undefined}
    `;
  }
}
