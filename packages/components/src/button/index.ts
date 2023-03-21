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

        padding: var(--ds-space-x-small);
        min-height: var(--ds-size-x-large);

        color: var(--ds-action-content-primary-default);
        border: var(--ds-action-border-primary-default);
        background-color: var(--ds-action-background-primary-default);
        border-radius: var(--ds-control-border-radius);
      }
      :host(:hover) {
        color: var(--ds-action-content-primary-hover);
        border: var(--ds-action-border-primary-hover);
        background-color: var(--ds-action-background-primary-hover);
      }
      :host(:focus-visible:not(:active)) {
        text-decoration: underline;
        text-underline-offset: var(--ds-space-xx-small);
        text-decoration-thickness: var(--ds-size-empathize-border);

        color: var(--ds-action-content-primary-focused);
        border: var(--ds-action-border-primary-focused);
        background-color: var(--ds-action-background-primary-focused);

        outline: var(--ds-action-focused-ring-oninvert);
      }
      :host(:focus-visible:not(:active))::before, :host(:hover:focus-visible:not(:active))::before {
        content: '';
        position: absolute;
        display: block;
        z-index: 1;
        inset: -5px;
        border: var(--ds-action-focused-ring);
      }
      :host(:hover:focus-visible:not(:active)) {
        color: var(--ds-action-content-primary-hover);
        border: var(--ds-action-border-primary-hover);
        background-color: var(--ds-action-background-primary-hover);

        outline: var(--ds-action-focused-ring-oninvert);
      }
      :host(:active) {
        color: var(--ds-action-content-primary-pressed);
        border: var(--ds-action-border-primary-pressed);
        background-color: var(--ds-action-background-primary-pressed);
      }
      :host([variant=secondary]) {
        color: var(--ds-action-content-secondary-default);
        border: var(--ds-action-border-secondary-default);
        background-color: var(--ds-action-background-secondary-default);
      }
      :host([variant=secondary]:hover) {
        color: var(--ds-action-content-secondary-hover);
        border: var(--ds-action-border-secondary-hover);
        background-color: var(--ds-action-background-secondary-hover);
      }
      :host([variant=secondary]:focus-visible:not(:active)) {
        color: var(--ds-action-content-secondary-focused);
        border: var(--ds-action-border-secondary-focused);
        background-color: var(--ds-action-background-secondary-focused);
      }
      :host([variant=secondary]:hover:focus-visible:not(:active)) {
        color: var(--ds-action-content-secondary-hover);
        border: var(--ds-action-border-secondary-hover);
        background-color: var(--ds-action-background-secondary-hover);

        outline: var(--ds-action-focused-ring-oninvert);
      }
      :host([variant=secondary]:active) {
        color: var(--ds-action-content-secondary-pressed);
        border: var(--ds-action-border-secondary-pressed);
        background-color: var(--ds-action-background-secondary-pressed);
      }
      :host [part=icon] {
        min-width: var(--ds-size-x-small);
      }
    `;
  }

  /**
   * Specify icon to display in button. Value can be icon name
   */
  @property({ type: String, reflect: true })
  public variant: 'primary' | 'secondary' = 'primary';

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
