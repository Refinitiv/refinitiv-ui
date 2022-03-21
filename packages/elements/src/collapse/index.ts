import {
  BasicElement,
  css,
  CSSResultGroup,
  html,
  PropertyValues,
  TemplateResult
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { ifDefined } from '@refinitiv-ui/core/directives/if-defined.js';
import { state } from '@refinitiv-ui/core/decorators/state.js';
import { ref, createRef, Ref } from '@refinitiv-ui/core/directives/ref.js';
import { VERSION } from '../version.js';
import type { Panel } from '../panel/index.js';
import { preload } from '../icon/index.js';
import '../header/index.js';
import '../panel/index.js';
import '../icon/index.js';

preload('right'); /* preload calendar icons for faster loading */

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
      :host(:not([expanded])) [part~=content] {
        visibility: hidden;
      }
      [part~=header] {
        position: relative;
        z-index: 0;
      }
      [part~=header-toggle]::before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
      }
      [part~=content]  {
        overflow: hidden;
        box-sizing: border-box;
      }
      [no-animation] {
        animation: none !important;
      }
    `;
  }

  /**
   * Observes attribute change for `attributeChangedCallback`
   */
  static get observedAttributes (): string[] {
    const observed = super.observedAttributes;
    return ['aria-level'].concat(observed);
  }

  /**
   * Set text on the header
   */
  @property({ type: String })
  public header = '';

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
  private panelHolderRef: Ref<HTMLElement> = createRef();

  /**
   * A panel used to display content
   */
  private panelRef: Ref<Panel> = createRef();

  /**
   * Used to control aria-level for heading
   */
  @state()
  private headingLevel: string | null = null;

  /**
   * Run when observed attributes change value
   * @param name attribute name
   * @param oldValue old attribute value
   * @param newValue new attribute value
   * @returns {void}
   */
  public attributeChangedCallback (name: string, oldValue: string | null, newValue: string | null): void {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (name === 'aria-level') {
      this.headingLevel = newValue;
    }
  }

  /**
   * Called once after the component is first rendered
   * @param changedProperties map of changed properties with old values
   * @returns {void}
   */
  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.panelHolderRef.value?.setAttribute('no-animation', '');
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
    this.panelHolderRef.value?.removeAttribute(('no-animation'));
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
    const panelEl = this.panelRef.value;
    return panelEl ? panelEl.clientHeight : 0;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
      <ef-header part="header" level="${this.level}">
        <div part="heading" role="heading" aria-level="${ifDefined(this.headingLevel || undefined)}">
          <div id="header-toggle"
               part="header-toggle"
               role="button"
               tabindex="0"
               aria-expanded="${this.expanded}"
               aria-controls="content"
               @tap=${this.toggle}>${this.header}</div>
        </div>
        <ef-icon icon="right" part="toggle" slot="left" aria-hidden="true"></ef-icon>
        <slot name="header-left" slot="left"></slot>
        <slot name="header-right" slot="right"></slot>
      </ef-header>
      <div ${ref(this.panelHolderRef)} id="content" part="content" role="region" aria-labelledby="header-toggle">
        <ef-panel ${ref(this.panelRef)} part="content-data" ?spacing="${this.spacing}" transparent>
          <slot></slot>
        </ef-panel>
      </div>
    `;
  }
}
