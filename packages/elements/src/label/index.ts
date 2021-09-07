import {
  BasicElement,
  html,
  css,
  customElement,
  property,
  TemplateResult,
  CSSResult,
  styleMap,
  DeprecationNotice
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
 * Helper to check if the browser is IE
 * @returns True if the browser is IE
 */
const isIE = () => !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);

/**
 * Determines if the browser is legacy or modern.
 */
/* istanbul ignore next */
const browserType = isIE() ? 'legacy' : 'modern';

/**
 * Deprecation notice to show users
 * who are using deprecated maxLine property.
 */
const deprecationNotice = new DeprecationNotice('Property `maxLine` is deprecated, use `lineClamp` instead.');

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
        white-space: nowrap;
      }
      .left.modern {
        word-break: break-all;
        white-space: normal;
      }
      .left.legacy {
        text-overflow: ellipsis;
      }
      .center {
        flex: 0 100 auto;
      }
      .right.modern {
        direction: rtl;
        text-overflow: ellipsis;
      }
      .right.legacy span {
        float: right;
      }
      .clamp {
        overflow: hidden;
        -webkit-box-orient: vertical;
        display: -webkit-inline-box;
        text-overflow: ellipsis;
        position: relative;
        overflow-wrap: break-word;
      }
    `;
  }

  /**
   * Limit the number of lines before truncating
   * @deprecated
   */
  @property({ type: Number, attribute: 'max-line' })
  public get maxLine (): number {
    return this.lineClamp;
  }
  public set maxLine (value: number) {
    deprecationNotice.once();
    this.lineClamp = value;
  }

  /**
   * Limit the number of lines before truncating
   */
  @property({ type: Number, attribute: 'line-clamp' })
  public lineClamp = 0;

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
  private mutationObserver = new MutationObserver(() => this.recalculate(true));

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
    !isIE() && this.recalculate(); // In IE the mutation will trigger
  }

  /**
   * @override
   */
  public disconnectedCallback (): void {
    super.disconnectedCallback();
    removeTooltipCondition(this.tooltipCondition);
    this.mutationObserver.disconnect();
  }

  /**
   * Decides whether the tooltip should b shown
   * @param tooltipTarget Target element passed by the tooltip condition
   * @returns True if the tooltip should be shown
   */
  protected shouldShowTooltip (tooltipTarget: HTMLElement): boolean {
    const targetMatches = tooltipTarget === this;
    const part = this.renderRoot.firstElementChild;
    if (targetMatches && part) {
      return part.clientHeight !== part.scrollHeight || part.clientWidth !== part.scrollWidth;
    }
    return false;
  }

  /**
   * Handles any modifications to the internal HTML
   * @param [mutation=false] is the request from a mutation event?
   * @returns {void}
   */
  protected recalculate (mutation = false): void {
    mutation; // keeping here for future use
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
   * Default template
   */
  protected get truncateTemplate (): TemplateResult {
    const words = this.chunks;
    const left: string[] = [];
    const right: string[] = [];
    const isSingleWord = words.length === 1;
    if (isSingleWord) {
      const word = words[0];
      const split = Math.round(word.length / 2);
      left.push(word.substr(0, split));
      right.push(word.substr(split));
    }
    else {
      const split = Math.round(words.length / 2);
      for (let i = 0; i < words.length; i += 1) {
        (i < split ? left : right).push(words[i]);
      }
    }
    const leftPart = html`<div class="split left ${browserType}">${left.join(_)}</div>`;
    const centerPart = isSingleWord ? undefined : html`<div class="split center">&nbsp;</div>`;
    const rightPart = right.length ? html`<div class="split right ${browserType}"><span dir="ltr">${right.join(_)}</span></div>` : undefined;
    return html`${leftPart}${centerPart}${rightPart}`;
  }

  /**
   * Template for when line clamp is set
   */
  protected get clampTemplate (): TemplateResult {
    const styles = {
      maxHeight: '',
      whiteSpace: '',
      lineClamp: `${this.lineClamp}`,
      '-webkit-line-clamp': `${this.lineClamp}`
    };
    /* istanbul ignore if */
    if (browserType === 'legacy') {
      const cs = getComputedStyle(this);
      const lineHeight = parseFloat(cs.lineHeight) || 1.2/* css default */;
      styles.maxHeight = `calc(1em * ${lineHeight} * ${this.lineClamp})`; // faux clamp in legacy browsers
      styles.whiteSpace = this.lineClamp === 1 ? 'nowrap' : ''; // show ellipsis in legacy browsers
    }
    return html`
      <span class="clamp ${browserType}" style="${styleMap(styles)}">${this.text}</span>
    `;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    const template = this.lineClamp ? this.clampTemplate : this.truncateTemplate;

    /* istanbul ignore if */
    if (browserType === 'legacy') {
      // Mutation observer does not fire in IE11 if slot is not present
      return html`${ template }<span style="display: none !important;"><slot></slot></span>`;
    }

    return template;
  }
}
