import { ControlElement, html, css, CSSResultGroup, nothing, PropertyValues, TemplateResult } from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import '../sub-icon/index.js';

/**
 * Use button for actions in forms, dialogs,
 * and more with support for different states and styles.
 * @attr {boolean} disabled - Set state to disabled
 * @prop {boolean} [disabled=false] - Set state to disabled
 * @fires active-changed - Fired when `active` property changed by user taps on toggled button. It will not be triggered if `active` state is changed programmatically.
 */
@customElement('ui-button', { theme: false })
export class Button extends ControlElement {
  protected readonly defaultRole = 'button';

  /**
   * A `CSSResultGroup` that will be used to style the host,
   * slotted children and the internal template of the element.
   * @returns CSS template
   */
  static get styles (): CSSResultGroup {
    return css`
      :host {
        cursor: pointer;
        outline: none;
        display: inline-flex;
        position: relative;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        user-select: none;
        vertical-align: bottom;
        box-sizing: border-box;
        text-transform: uppercase;
        padding: var(--code-only-action-padding-default);
        color: var(--action-content-secondary-default);
        border: var(--action-border-secondary-default);
        font: var(--code-only-action-content-default);
        background-color: var(--action-bg-secondary-default);
      }
      :host(:hover) {
        color: var(--action-content-primary-hover);
        border: var(--action-border-primary-hover);
        background-color: var(--action-bg-primary-hover);
      }
      :host(:focus-visible:not(:active)) {
        text-decoration: underline;
        text-underline-offset: var(--width-010);
        text-decoration-thickness: var(--width-fixed2);
        color: var(--action-content-primary-focused);
        border: var(--action-border-primary-focused);
        background-color: var(--action-bg-primary-focused);
        outline: var(--action-focused-ring-on-invert);
      }
      :host(:focus-visible:not(:active))::before, :host(:hover:focus-visible:not(:active))::before {
        content: '';
        position: absolute;
        display: block;
        z-index: 1;
        inset: -5px;
        border: var(--action-focused-ring);
      }
      :host(:hover:focus-visible:not(:active)) {
        color: var(--action-content-primary-hover);
        border: var(--action-border-primary-hover);
        background-color: var(--action-bg-primary-hover);

        outline: var(--action-focused-ring-on-invert);
      }
      :host(:active) {
        color: var(--action-content-primary-pressed);
        border: var(--action-border-primary-pressed);
        background-color: var(--action-bg-primary-pressed);
      }
      :host([variant=primary]) {
        color: var(--action-content-primary-default);
        border: var(--action-border-primary-default);
        background-color: var(--action-bg-primary-default);
      }
      :host([variant=primary]:hover) {
        color: var(--action-content-primary-hover);
        border: var(--action-border-primary-hover);
        background-color: var(--action-bg-primary-hover);
      }
      :host([variant=primary]:focus-visible:not(:active)) {
        color: var(--action-content-primary-focused);
        border: var(--action-border-primary-focused);
        background-color: var(--action-bg-secondary-focused);
      }
      :host([variant=primary]:hover:focus-visible:not(:active)) {
        color: var(--action-content-secondary-hover);
        border: var(--action-border-secondary-hover);
        background-color: var(--action-bg-secondary-hover);
        outline: var(--action-focused-ring-on-invert);
      }
      :host([variant=primary]:active) {
        color: var(--action-content-secondary-pressed);
        border: var(--action-border-secondary-pressed);
        background-color: var(--action-bg-secondary-pressed);
      }
      :host [part=icon] {
        margin-left: var(--space-020);
        font-size: var(--code-only-action-line-height-default);
        min-width: 1em;
      }
    `;
  }

  /**
   * Specify icon to display in button. Value can be icon name
   */
  @property({ type: String, reflect: true })
  public variant: 'primary' | 'secondary' = 'secondary';

  /**
   * Specify icon to display in button. Value can be icon name
   */
  @property({ type: String, attribute: 'icon-end', reflect: true })
  public iconEnd: string | null = null;

  /**
   * the lifecycle method called when properties changed first time
   * @param changedProperties properties it's the Map object which has the updated properties
   * @returns {void}
   */
  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);

    this.addEventListener('tapstart', this.setPressed);
    this.addEventListener('tapend', this.unsetPressed);
    this.addEventListener('click', this.onClick);
  }

  /**
   * Event handler for onclick
   * @param event Click event
   * @returns {void}
   */
  protected onClick (event: MouseEvent): void {
    // TODO (Trem): check to see if there is a better way of doing this
    // Allow event object to pass through all listeners before checking status.
    setTimeout(() => !event.defaultPrevented && this.processClick());
  }

  /**
   * Processes click event
   * @returns {void}
   */
  protected processClick (): void {
    if (this.getAttribute('type') === 'reset') {
      this.internals.form?.reset();
    }
    else if (this.getAttribute('type') !== 'button') {
      this.internals.form?.requestSubmit();
    }
  }

  private setPressed (): void {
    this.setAttribute('aria-pressed', 'true');
  }

  private unsetPressed (): void {
    this.setAttribute('aria-pressed', 'false');
  }

  /**
   * Returns icon template if exists
   * @return {TemplateResult | nothing}  Render template
   */
  private get iconEndTemplate (): TemplateResult | typeof nothing {
    return this.iconEnd ? html`<ui-sub-icon aria-hidden="true" part="icon" icon="${this.iconEnd}" id="icon"></ui-sub-icon>` : nothing;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return {TemplateResult}  Render template
   */
  protected render (): TemplateResult {
    return html`
      <span part="label">
        <slot></slot>
      </span>
      ${this.iconEndTemplate}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ui-button': Button;
  }
}
