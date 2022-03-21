import {
  html,
  css,
  TemplateResult,
  CSSResultGroup,
  ControlElement,
  PropertyValues
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { state } from '@refinitiv-ui/core/decorators/state.js';
import { isSlotEmpty } from '@refinitiv-ui/utils/is-slot-empty.js';
import { VERSION } from '../version.js';

import '../icon/index.js';
import '../label/index.js';

/**
 * A building block for individual tab
 * @attr {boolean} disabled - Set disabled state
 * @prop {boolean} [disabled=false] - Set disabled state
 *
 * @attr {string} value - Tab's value
 * @prop {string} [value=""] - Tab's value
 *
 * @fires clear - Dispatched when click on cross button occurs
 */
@customElement('ef-tab', {
  alias: 'coral-tab'
})
export class Tab extends ControlElement {

  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  protected readonly defaultRole = 'tab';

  /**
   * A `CSSResultGroup` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @returns CSS template
   */
  static get styles (): CSSResultGroup {
    return css`
      :host {
        display: inline-flex;
        flex-shrink: 0;
      }
    `;
  }

  /**
   * Specify icon name to display in tab
   */
  @property({ type: String })
  public icon = '';

  /**
   * Specify tab's label text
   */
  @property({ type: String })
  public label = '';

  /**
   * Specify tab's sub-label text
   */
  @property({ type: String, attribute: 'sub-label' })
  public subLabel = '';

  /**
   * Specify tab's active status
   */
  @property({ type: Boolean, reflect: true })
  public active = false;

  /**
   * Set tab to clearable
   */
  @property({ type: Boolean, reflect: true })
  public clears = false;

  /**
   * Limit the number of lines before truncating
   */
  @property({ type: Number, reflect: true, attribute: 'line-clamp' })
  public lineClamp = 1;

  /**
   * Set tab to clearable on hover
   */
  @property({ type: Boolean, reflect: true, attribute: 'clears-on-hover' })
  public clearsOnHover = false;

  /**
   * Use level styling from theme
   * @ignore
   */
  @property({ type: String, reflect: true })
  public level: '1' | '2' | '3' = '1';

  /**
   * True, if there is slotted content
   */
  @state()
  private isSlotHasContent = false;

  /**
   * Called after the element’s DOM has been updated the first time.
   * @param changedProperties Properties that has changed
   * @returns {void}
   */
  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.addEventListener('keydown', this.onKeyDown);
  }

  /**
   * Compute property values that depend on other properties
   * and are used in the rest of the update process.
   * @param changedProperties Properties that has changed
   * @returns {void}
   */
  protected willUpdate (changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('active')) {
      this.setAttribute('aria-selected', this.active ? 'true' : 'false');
    }
  }

  /**
   * Run on default slot slotchange
   * @param event slotchange
   * @returns {void}
   */
  private onSlotChange = (event: Event): void => {
    const slot = event.target as HTMLSlotElement;
    this.isSlotHasContent = !!slot.assignedNodes().length && isSlotEmpty(slot);
  };

  /**
   * Omitted lineClamp if subLabel is provided
   * @returns line Clamp value
   */
  private getLineClamp (): number {
    return !this.lineClamp ? 0 : this.subLabel ? 1 : this.lineClamp;
  }

  /**
   * Handles key down event
   * @param event Key down event object
   * @returns {void}
   */
  private onKeyDown (event: KeyboardEvent): void {
    if (event.defaultPrevented) {
      return;
    }
    if (event.key === 'Delete' && (this.clears || this.clearsOnHover)) {
      this.dispatchEvent(new CustomEvent('clear'));
    }
  }

  /**
   * @param event event from close button
   * @returns {void}
   */
  private handleClickClear (event: MouseEvent): void {
    event.stopPropagation();
    /**
     * Fires when click on cross occurs
     */
    this.dispatchEvent(new CustomEvent('clear'));
  }

  /**
   * Show Close Button if allow clears
   * @returns close button template
   */
  private get CloseTemplate (): TemplateResult | null {
    return this.clears || this.clearsOnHover ? html`
        <div part="close-container">
          <ef-icon part="close" icon="cross" @tap="${this.handleClickClear}"></ef-icon>
        </div>
      ` : null;
  }

  /**
   * Create ef-label template when label is true
   * @returns Label template
   */
  private get LabelTemplate (): TemplateResult | null {
    if (!this.label || this.isSlotHasContent) {
      return null;
    }
    return html`
      <ef-label
        part="label"
        .lineClamp=${this.getLineClamp()}>
        ${this.label}
      </ef-label>
    `;
  }

  /**
   * Create ef-label template when subLabel is true
   * @returns SubLabel template
   */
  private get SubLabelTemplate (): TemplateResult | null {
    if (!this.subLabel || this.isSlotHasContent) {
      return null;
    }
    return html`
      <ef-label
      part="sub-label"
      .lineClamp=${this.getLineClamp()}>
        ${this.subLabel}
      </ef-label>
    `;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
      ${this.icon ? html`<ef-icon icon=${this.icon} part="icon"></ef-icon>` : null}
        <div part="label-container">
          ${this.LabelTemplate}
          ${this.SubLabelTemplate}
          <slot @slotchange="${this.onSlotChange}"></slot>
        </div>
      ${this.CloseTemplate}
    `;
  }
}
