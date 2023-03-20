import { ControlElement, html, css, CSSResultGroup, nothing, PropertyValues, TemplateResult } from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import '../icon/index.js';

/**
 * Use button for actions in forms, dialogs,
 * and more with support for different states and styles.
 * @attr {boolean} disabled - Set state to disabled
 * @prop {boolean} [disabled=false] - Set state to disabled
 * @fires active-changed - Fired when `active` property changed by user taps on toggled button. It will not be triggered if `active` state is changed programmatically.
 */
@customElement('ds-button', { theme: false })
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
        justify-content: center;
        align-items: center;
        box-sizing: border-box;

        text-transform: uppercase;

        padding: var(--ds-space-x-small);

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
      :host(:focus-visible) {
        text-decoration: underline;
        text-underline-offset: var(--ds-space-xx-small);
        text-decoration-thickness: var(--ds-size-empathize-border);

        color: var(--ds-action-content-primary-focused);
        border: var(--ds-action-border-primary-focused);
        background-color: var(--ds-action-background-primary-focused);
      }
      :host([pressed]) {
        color: var(--ds-action-content-primary-pressed);
        border: var(--ds-action-border-primary-pressed);
        background-color: var(--ds-action-background-primary-pressed);
      }
      :host([secondary]) {
        color: var(--ds-action-content-secondary-default);
        border: var(--ds-action-border-secondary-default);
        background-color: var(--ds-action-background-secondary-default);
      }
      :host([secondary]:hover) {
        color: var(--ds-action-content-secondary-hover);
        border: var(--ds-action-border-secondary-hover);
        background-color: var(--ds-action-background-secondary-hover);
      }
      :host([secondary]:focus-visible) {
          color: var(--ds-action-content-secondary-focused);
        border: var(--ds-action-border-secondary-focused);
        background-color: var(--ds-action-background-secondary-focused);
      }
      :host([secondary][pressed]) {
        color: var(--ds-action-content-secondary-pressed);
        border: var(--ds-action-border-secondary-pressed);
        background-color: var(--ds-action-background-secondary-pressed);
      }
      :host [part='icon'] { }
    `;
  }

  /**
   * Specify icon to display in button. Value can be icon name
   */
  @property({ type: String, reflect: true })
  public icon: string | null = null;

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

  /**
   * Set pressed attribute
   * @returns {void}
   */
  private setPressed (): void {
    this.setAttribute('pressed', '');
    this.setAttribute('aria-pressed', 'true');
  }

  /**
   * Remove pressed attribute
   * @returns {void}
   */
  private unsetPressed (): void {
    this.removeAttribute('pressed');
    this.setAttribute('aria-pressed', 'false');
  }

  /**
   * Returns icon template if exists
   * @return {TemplateResult | nothing}  Render template
   */
  private get iconTemplate (): TemplateResult | typeof nothing {
    return this.icon ? html`<ds-icon part="icon" icon="${this.icon}" id="icon"></ds-icon>` : nothing;
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
      ${this.iconTemplate}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-button': Button;
  }
}
