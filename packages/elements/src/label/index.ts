import {
  BasicElement,
  html,
  css,
  customElement,
  property,
  TemplateResult,
  CSSResult
} from '@refinitiv-ui/core';
import { VERSION } from '../';
import { addTooltipCondition, removeTooltipCondition } from '../tooltip';

/**
 * Configuration object
 * for mutations observers
 */
const observerOptions = {
  subtree: true,
  childList: true,
  characterData: true
};

/**
 * Reusable SPACE
 */
const _ = ' ';

/**
 * Displays a text with alternative truncation
 */
@customElement('ef-label', {
  alias: 'quartz-label'
})
export class Label extends BasicElement {

  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  /**
   * A `CSSResult` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @returns CSS template
   */
  static get styles (): CSSResult | CSSResult[] {
    return css`
      :host {
        display: inline-flex;
        max-width: 100%;
      }
      .split {
        height: 1.2em;
        line-height: 1.2em;
        margin-top: -0.1em;
        flex: 0 1 auto;
        min-width: 0;
        overflow: hidden;
      }
      .left {
        border-left: 1px solid transparent;
        margin-left: -1px;
        word-break: break-all;
      }
      .center {
        flex: 0 100 auto;
      }
      .right {
        direction: rtl;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .clamp {
        overflow: hidden;
        -webkit-box-orient: vertical;
        display: -webkit-inline-box;
      }
    `;
  }

  /**
   * Limit the number of lines before truncating
   */
  @property({ type: Number, attribute: 'line-clamp' })
  public lineClamp = 1;

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
   * Trimmed chunks of textual content
   */
  private chunks: string[] = [];

  /**
   * Mutation Observer used to detect changes in the Light DOM
   */
  private mutationObserver = new MutationObserver(() => this.handleMutation());

  /**
   * Render used to display the tooltip
   * @returns Tooltip text
   */
  protected tooltipRenderer = (): string => this.text;

  /**
   * Condition used to display the tooltip
   * @param target Tooltip target
   * @returns Whether the tooltip should be shown or not.
   */
  protected tooltipCondition = (target: HTMLElement): boolean => this.shouldShowTooltip(target);

  /**
   * @override
   */
  public connectedCallback (): void {
    super.connectedCallback();
    addTooltipCondition(this.tooltipCondition, this.tooltipRenderer);
    this.mutationObserver.observe(this, observerOptions);
    this.handleMutation();
  }

  /**
   * @override
   */
  public disconnectedCallback (): void {
    super.disconnectedCallback();
    removeTooltipCondition(this.tooltipCondition);
    this.mutationObserver.disconnect();
    this.handleMutation();
  }

  /**
   * Decides whether the tooltip should b shown
   * @param tooltipTarget Target element passed by the tooltip condition
   * @returns True if the tooltip should be shown
   */
  protected shouldShowTooltip (tooltipTarget: HTMLElement): boolean {
    const targetMatches = tooltipTarget === this;
    const span = this.renderRoot.firstElementChild;
    if (targetMatches && span) {
      return span.clientHeight !== span.scrollHeight;
    }
    return false;
  }

  /**
   * Handles any modifications to the internal HTML
   * @returns {void}
   */
  protected handleMutation (): void {
    const oldValue = this.text;
    const raw = this.textContent || '';
    this.chunks = raw.split(_).map(chunk => chunk.trim()).filter(chunk => chunk);
    const newValue = this.text;
    if (oldValue !== newValue) {
      void this.requestUpdate('text', oldValue);
    }
  }

  /**
   * Returns cleaned version of `this.textContent`.
   */
  protected get text (): string {
    return this.chunks.join(_);
  }

  /**
   * Default template (When line clamp is 1)
   */
  protected get truncateTemplate (): TemplateResult {
    const words = this.chunks;
    const left: string[] = [];
    const right: string[] = [];
    const half = Math.round(words.length / 2);
    for (let i = 0; i < words.length; i++) {
      (i < half ? left : right).push(words[i]);
    }
    const leftPart = html`
      <div class="split left">${left.join(_)}</div>
    `;
    const rightPart = right.length ? html`
      <div class="split center">&nbsp;</div>
      <div class="split right"><span dir="ltr">${right.join(_)}</span></div>
    ` : undefined;
    return html`${leftPart}${rightPart}`;
  }

  /**
   * Template for when line clamp is above 1
   */
  protected get clampTemplate (): TemplateResult {
    return html`
      <span class="clamp" style="line-clamp:${this.lineClamp};-webkit-line-clamp:${this.lineClamp}">${this.text}</span>
    `;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return this.lineClamp > 1 ? this.clampTemplate : this.truncateTemplate;
  }
}
