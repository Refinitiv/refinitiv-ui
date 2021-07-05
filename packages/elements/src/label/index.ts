import {
  ResponsiveElement,
  html,
  css,
  customElement,
  property,
  TemplateResult,
  CSSResult,
  PropertyValues,
  query
} from '@refinitiv-ui/core';
import { VERSION } from '../';
import '../tooltip';
import { TextHelpers } from './helpers/text';

// Observer config for items
const observerOptions = {
  subtree: true,
  childList: true,
  characterData: true
};

/**
 * Displays a text with alternative truncation
 */
@customElement('ef-label', {
  alias: 'quartz-label'
})
export class Label extends ResponsiveElement {

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
        display: inline-block;
        max-width: 100%;
        box-sizing: border-box;
      }
      :host([truncate]) {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      :host([max-line]) {
        display: -webkit-inline-box;
        -webkit-line-clamp: var(--max-line);
        white-space: normal;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      :host([truncate=center]) {
        white-space: nowrap;
        text-overflow: clip;
      }
    `;
  }

  /**
   * Enable shortening the slot content
   */
  @property({ type: String, reflect: true })
  public truncate: 'center' | '' | null | undefined = null;

  /**
   * Limit the number of lines before truncating
   */
  @property({ type: String, reflect: true, attribute: 'max-line' })
  public maxLine = null;

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
   * Use to set title attribute for tooltip
   */
  @query('span', true)
  private span!: HTMLElement;

  /**
   * Use to prevent resizes observer in certain use cases
   */
  private updateTimer!: NodeJS.Timeout;

  /**
   * Store trimmed text content
   */
  private rawText = '';

  /**
   * Tooltip state when truncate = center
   */
  private enableTooltip = false;

  private mutationObserver?: MutationObserver;


  /**
   * The lifecycle method called when properties changed first time
   * @param changedProperties properties it's the Map object which has the updated properties
   * @returns {void}
   */
  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.rawText = this.retrieveSlotContent();
  }

  /**
   * Called when the element’s DOM has been updated and rendered
   * @param changedProperties Properties that has changed
   * @returns shouldUpdate
   */
  protected updated (changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (changedProperties.has('truncate')) {
      if (this.truncate === 'center') {
        this.restoreTextContent();
        this.middleEllipsis(this, this.span, this.rawText);
      }
      else {
        this.restoreTextContent();
        if (this.maxLine) {
          this.style.setProperty('--max-line', this.maxLine);
        }
      }
      this.updateTooltip();
    }
    else if (changedProperties.has('maxLine')) {
      this.style.setProperty('--max-line', this.maxLine);
      this.updateTooltip();
    }

    // we must wait while all elements in the tree are updated before starting the mutation observer
    void this.updateComplete.then(() => {
      if(!this.mutationObserver) {
        // Start watching for any child mutations
        this.mutationObserver = new MutationObserver(this.handleSlotChange.bind(this));
        this.mutationObserver.observe(this, observerOptions);
      }
    });
  }

  /**
   * Used to prevent handler fired when previous content are the same as last content
   */
  private previousContent = '';

  /**
   * Handle statement after slot or innerHTML has been changed
   * @returns void
   */
  private handleSlotChange (): void {
    // get new text content when label changed
    this.rawText = this.retrieveSlotContent();
    if(this.previousContent !== this.rawText) {
      this.previousContent = this.rawText;
      this.restoreTextContent();
      if (this.truncate === 'center') {
        this.middleEllipsis(this, this.span, this.rawText);
      }
      this.updateTooltip();
    }
  }

  /**
   * Restore text content
   * @returns {void}
   */
  private restoreTextContent (): void {
    this.span.innerHTML = this.rawText;
  }

  /**
   * concatenating all of text content in the slots
   * @returns trimmed text content
   */
  private retrieveSlotContent (): string {
    let text = this.textContent || '';
    const slot = this.querySelector('slot');
    if(slot) {
      const slotContent = slot.assignedNodes({ flatten: true });
      for(let i = 0; i < slotContent.length; i++) {
        text += slotContent[i].textContent;
      }
    }

    return TextHelpers.trim(text);
  }

  /**
   * Get element width minus padding
   * @param node parent node that wrapper text node
   * @returns {number} width minus padding
   */
  private getElementWidthMinusPadding (node: HTMLElement): number {
    const paddingLeft = getComputedStyle(node).paddingLeft;
    const paddingRight = getComputedStyle(node).paddingRight;
    return node.offsetWidth - parseFloat(paddingLeft) - parseFloat(paddingRight);
  }

  /**
   * Truncate a long string in the middle and add an ellipsis.
   * @param parentNode parent node
   * @param textNode text node
   * @param fullText string
   * @returns {void}
   */
  private middleEllipsis (parentNode: HTMLElement, textNode: HTMLElement, fullText: string): void {
    const parentWidth = this.getElementWidthMinusPadding(parentNode);
    const textWidth = textNode.offsetWidth;
    this.enableTooltip = false;

    if(textWidth <= parentWidth) {
      return;
    }
    TextHelpers.middleEllipsis(textNode, parentWidth, fullText);
    this.enableTooltip = true;
    void this.requestUpdate();
  }

  /**
   * Handle text ellipsis and tooltip state when element has been resized
   * @returns void
   */
  private onResize (): void {
    if (this.truncate === 'center') {
      this.restoreTextContent(); // TODO: find a way to remove this to improve performance
      this.middleEllipsis(this, this.span, TextHelpers.trim(this.span.textContent || ''));
    }
    this.updateTooltip();
  }

  /**
   * Handle tooltip statement when properties changed
   * @returns void
   */
  private updateTooltip (): void {
    // determine tooltip state
    if (this.isShowTooltip()) {
      this.span.setAttribute('title', this.rawText);
    }
    else {
      this.span.removeAttribute('tooltip');
      this.span.removeAttribute('title');
    }
  }

  /**
   * private method but can't override
   * access modifiers in typescript.
   * @ignore
   * @param size element dimensions
   * @returns {void}
   */
  public resizedCallback (): void {
    clearTimeout(this.updateTimer);
    // split layout updating to another execution-loop
    // to prevents resizeObserver triggers resize-loop-error
    this.updateTimer = setTimeout(() => this.onResize(), 0);
  }

  /**
   * Determine show/hide tooltip state
   * @returns {boolean} true if center truncate or the element is smaller than a parent
   */
  private isShowTooltip (): boolean {
    if(this.offsetWidth !== this.scrollWidth) {
      return true;
    }
    // truncate is center and text is overflow
    if (this.truncate === 'center' && this.enableTooltip) {
      return true;
    }
    // maxLine is provided and text is overflow
    else if (this.maxLine && this.offsetHeight !== this.scrollHeight) {
      return true;
    }

    return false;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
      <div style="display: none;">
        <slot></slot>
      </div>
      <span .title=${this.isShowTooltip() ? this.rawText : ''}></span>
    `;
  }
}
