import {
  BasicElement,
  css,
  CSSResult,
  customElement,
  html,
  property,
  PropertyValues,
  query,
  TemplateResult
} from '@refinitiv-ui/core';
import '../header';
import '../panel';
import '../icon';

/**
 * Allows users to hide non-critical information
 * or areas of the screen, maximizing the amount of real estate
 * for their primary displays.
 *
 * @fires expanded-changed - Fired when the `expanded` property changes.
 *
 * @slot header-left - Slot to add custom contents to the left side of header e.g. ef-icon, ef-checkbox
 * @slot header-right - Slot to add custom contents to the right side of header e.g. ef-icon, ef-checkbox
 */
@customElement('ef-collapse', {
  alias: 'coral-collapse'
})
export class Collapse extends BasicElement {
  /**
   * A `CSSResult` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @return {CSSResult | CSSResult[]} CSS template
   */
  static get styles (): CSSResult | CSSResult[] {
    return css`
      :host {
        display: block;
      }
      [part="header"] {
        cursor: default;
      }
      [part="toggle"] {
        display: inline-block;
        margin: 0 5px;
      }
      [part="content"]  {
        overflow: hidden;
        box-sizing: border-box;
      }
      [no-animation] {
        animation: none !important;
      }
    `;
  }

  /**
   * Set text on the header
   */
  @property({ type: String })
  public header: string | null = null;

  /**
   * Use level styling from theme
   */
  @property({ type: String })
  public level: '1'| '2'| '3' = '3';

  /**
   * Set to expand the item
   */
  @property({ type: Boolean, reflect: true })
  public expanded = false;

  /**
   * Set to apply padding from theme to content section
   */
  @property({ type: Boolean })
  public spacing = false;

  /**
   * An ef-panel wrapper
   */
  @query('[part="content"]', true)
  private panelHolder!: HTMLElement;

  /**
   * A panel used to display content
   */
  @query('ef-panel', true)
  private panel!: HTMLElement;

  /**
   * Called once after the component is first rendered
   * @param changedProperties map of changed properties with old values
   * @returns {void}
   */
  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.panelHolder && this.panelHolder.setAttribute('no-animation', '');
  }

  /**
   * Invoked whenever the element is updated
   * @param changedProperties map of changed properties with old values
   * @return {void}
   */
  protected updated (changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (changedProperties.has('expanded')) {
      this.showHide();
    }
  }

  /**
   * Toggle the item
   * @returns {void}
   */
  private toggle (): void {
    this.expanded = !this.expanded;
    const event = this.notifyPropertyChange('expanded', this.expanded, true);
    if (!event) { // revert expanded if event is cancelled
      this.expanded = !this.expanded;
    }
  }

  /**
   * Check if target is a header
   * @param element for checking
   * @returns {boolean} true if target is ef-header
   */
  private static isHeader (element: HTMLElement): boolean {
    return element.localName === 'ef-header' || element.getAttribute('part') === 'toggle';
  }

  /**
   * Handle tap on the item header, will toggle the expanded state
   * @param event Event object
   * @returns {void}
   */
  private handleTap = (event: Event): void => {
    const target = event.target as HTMLElement;

    // This is to prevent toggling when elements on slots are tap
    if (Collapse.isHeader(target)) {
      this.toggle();
    }
  }

  /**
   * Show or Hide the item depending on the expanded state
   * @returns {void}
   */
  private showHide (): void {
    if (!this.panelHolder) {
      return;
    }
    this.panelHolder.removeAttribute(('no-animation'));
    this.setAnimationTargetHeight(this.getContentHeight());
  }

  /**
   * Set current content height at the target-height
   * @param height number or null value
   * @returns {void}
   */
  private setAnimationTargetHeight (height: number): void {
    this.updateVariable('--target-height', `${height}px`);
  }

  /**
   * Gets the height of the ef-panel element which contains the content
   * will pass height including optional spacing
   * @returns clientHeight of the panel so that the panel holder max-height can be set
   */
  private getContentHeight (): number {
    return this.panel && this.panel.clientHeight || 0;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return {TemplateResult}  Render template
   */
  protected render (): TemplateResult {
    return html`
      <ef-header part="header" level="${this.level}" @tap="${this.handleTap}">
        <ef-icon icon="right" slot="left" part="toggle"></ef-icon>
        <slot slot="left" name="header-left"></slot>
        <slot slot="right" name="header-right"></slot>
        ${this.header}
      </ef-header>
      <div part="content">
        <ef-panel ?spacing="${this.spacing}" transparent>
          <slot></slot>
        </ef-panel>
      </div>
    `;
  }
}
