import {
  BasicElement,
  css,
  CSSResultGroup,
  html,
  PropertyValues,
  TemplateResult
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/lib/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/lib/decorators/property.js';
import { query } from '@refinitiv-ui/core/lib/decorators/query.js';
import { VERSION } from '../version.js';
import '../header/index.js';
import '../panel/index.js';
import '../icon/index.js';

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
      &:not([expanded]) {
        [part="content"] {
          visibility: hidden;
        }
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

  protected render (): TemplateResult {
    return html`
      <div part="header" role="heading" aria-level="${this.ariaLevel}">
        <slot name="header-left"></slot>
        <ef-header part="header-toggle" level="${this.level}" @tap=${this.toggle} role="button" tabindex="0" aria-expanded="${this.expanded}" aria-controls="content">
          ${this.header}
          <ef-icon slot="left" icon="right" part="toggle"></ef-icon>
        </ef-header>
        <slot name="header-right"></slot>
      </div>
      <div id="content" part="content" role="region" aria-labelledby="header-toggle">
        <ef-panel ?spacing="${this.spacing}" transparent>
          <slot></slot>
        </ef-panel>
      </div>
    `;
  }
}
