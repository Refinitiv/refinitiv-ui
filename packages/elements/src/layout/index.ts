import {
  ResponsiveElement,
  html,
  css,
  customElement,
  property,
  TemplateResult,
  CSSResult,
  PropertyValues
} from '@refinitiv-ui/core';

/**
 * Layout component for creating responsive applications and components
 * @fires resize - Fired when the element's size changes.
 */
@customElement('ef-layout')
export class Layout extends ResponsiveElement {
  /**
   * Displays debug lines.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true }) debug = false;

  /**
   * Tells the element to display flex,
   * displaying children in a row wrap layout.
   */
  @property({ type: Boolean, reflect: true }) flex = false;

  /**
   * Tells the element to display as a container,
   * displaying children in a vertical nowrap layout.
   */
  @property({ type: Boolean, reflect: true }) container = false;

  /**
   * Prevents the element from being flexible,
   * when inside of another flex layout.
   */
  @property({ type: Boolean, reflect: true }) noflex = false;

  /**
   * Prevents wrapping flex items,
   * when the parent isn't a container.
   */
  @property({ type: Boolean, reflect: true }) nowrap = false;

  /**
   * Makes the element a scrollable viewport.
   */
  @property({ type: Boolean, reflect: true }) scrollable = false;

  /**
   * Sets the fixed size of the element.
   * Value could be pixel, percents or auto.
   */
  @property({ type: String, reflect: true }) size: string | null = null;

  /**
   * Sets the rough size of the element based on other siblings and content.
   * Value could be pixel, percents or auto.
   */
  @property({ type: String, reflect: true }) basis: string | null = null;

  /**
   * Allows the width to shrink below its contents.
   * Also prevents the width from shrinking past a certain point.
   * Value could be pixel, percents or _empty_.
   */
  @property({ type: String, reflect: true, attribute: 'min-width' }) minWidth: string | null = null;

  /**
   * Allows the height to shrink below its contents.
   * Also prevents the height from shrinking past a certain point.
   * Value could be pixel, percents or _empty_.
   */
  @property({ type: String, reflect: true, attribute: 'min-height' }) minHeight: string | null = null;

  /**
   * Prevents the width from expanding past a certain point.
   * Value could be pixel, percents or _empty_.
   */
  @property({ type: String, reflect: true, attribute: 'max-width' }) maxWidth: string | null = null;

  /**
   * Prevents the height from expanding past a certain point.
   * Value could be pixel, percents or _empty_.
   */
  @property({ type: String, reflect: true, attribute: 'max-height' }) maxHeight: string | null = null;

  /**
   * A `CSSResult` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @return CSS template
   */
  static get styles (): CSSResult | CSSResult[] {
    return css`
      :host {
        box-sizing: border-box;
        display: block;
        position: relative;
        overflow: hidden;
        min-width: var(--min-width, 0);
        min-height: var(--min-height, 0);
        max-width: var(--max-width, none);
        max-height: var(--max-height, none);
        flex: var(--flex, 1 1 auto);
        -webkit-flex: var(--flex, 1 1 auto);
        -ms-flex: var(--flex, 1 1 auto);
      }

      :host([flex]) {
        display: flex;
        display: -webkit-flex;
        display: flexbox;
        display: -ms-flexbox;
        flex-flow: row wrap;
        align-items: stretch;
        align-content: flex-start;
      }

      :host([flex][container]) {
        flex-flow: column nowrap;
        -ms-flex-flow: column nowrap;
        -webkit-flex-flow: column nowrap;
        -webkit-flex-flow: column none;
      }

      :host([scrollable]) {
        overflow: auto;
        -webkit-overflow-scrolling: touch;
      }

      :host([noflex]) {
        flex: 0 0 auto;
        -ms-flex: 0 0 auto;
        -webkit: 0 0 auto;
      }

      :host([flex][nowrap]) {
        flex-wrap: nowrap;
        -ms-flex-wrap: nowrap;
        -webkit-flex-wrap: nowrap;
        -webkit-flex-wrap: none;
      }
    `;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`<slot></slot>`;
  }

  protected updated (changedProperties: PropertyValues): void {
    if (changedProperties.has('minWidth')) {
      this.updateVariable('--min-width', this.minWidth);
    }
    if (changedProperties.has('minHeight')) {
      this.updateVariable('--min-height', this.minHeight);
    }
    if (changedProperties.has('maxWidth')) {
      this.updateVariable('--max-width', this.maxWidth);
    }
    if (changedProperties.has('maxHeight')) {
      this.updateVariable('--max-height', this.maxHeight);
    }
    if (changedProperties.has('size') || changedProperties.has('basis')) {
      this.updateVariable('--flex', this.size ? '0 0 ' + this.size : '1 1 ' + (this.basis || 'auto'));
    }
  }
}
