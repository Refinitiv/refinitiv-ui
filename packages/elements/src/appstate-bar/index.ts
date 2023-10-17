import { BasicElement, CSSResultGroup, PropertyValues, TemplateResult, css, html } from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';

import '@refinitiv-ui/phrasebook/locale/en/appstate-bar.js';
import { Translate, translate } from '@refinitiv-ui/translate';

import '../icon/index.js';
import { VERSION } from '../version.js';

/**
 * Used to display at the top of application to provide a status or information.
 * @slot right - Place custom content on the right of bar.
 *
 * @fires clear - Fired when the user taps clear button.
 */
@customElement('ef-appstate-bar')
export class AppstateBar extends BasicElement {
  /**
   * Element version number
   * @returns version number
   */
  static override get version(): string {
    return VERSION;
  }

  /**
   * A `CSSResultGroup` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   *
   * @returns CSS template
   */
  static override get styles(): CSSResultGroup {
    return css`
      :host {
        display: block;
      }
    `;
  }

  /**
   * Text to display in heading section.
   */
  @property({ type: String })
  public heading = '';

  /**
   * Type of state bar. Supported value are `info`, `highlight`.
   */
  @property({ type: String, reflect: true })
  public state: 'info' | 'highlight' | null = null;

  /**
   * Used for translations
   */
  @translate()
  protected t!: Translate;

  /**
   * Invoked whenever the element is updated
   * @param {PropertyValues} changedProperties Map of changed properties with old values
   * @returns {void}
   */
  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    // Call this.updateStyles() to update css variables
    if (changedProperties.has('state')) {
      this.updateStyles();
    }
  }

  /**
   * Hide the element when clear button is clicked
   * @param {Event} event - event params
   * @fires AppstateBar#clear
   * @returns {void}
   */
  private clear = (event: Event): void => {
    event.stopPropagation();
    this.style.display = 'none';
    this.dispatchEvent(new CustomEvent('clear'));
  };

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return {TemplateResult}  Render template
   */
  protected override render(): TemplateResult {
    return html`
      <div part="heading">${this.heading}</div>
      <div part="message"><slot></slot></div>
      <div part="right"><slot name="right"></slot></div>
      <ef-icon
        role="button"
        part="close"
        @tap="${this.clear}"
        icon="cross"
        aria-label="${this.t('CLOSE')}"
      ></ef-icon>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ef-appstate-bar': AppstateBar;
  }
}
