import {
  BasicElement,
  html,
  css,
  customElement,
  property,
  TemplateResult,
  CSSResult,
  query,
  state,
  PropertyValues
} from '@refinitiv-ui/core';

import '../label';
import '../button';
import { Button } from '../button';
import '../overlay-menu';
import { OverlayMenu, OverlayMenuData } from '../overlay-menu';

export type CardConfiguration = {
  /**
  * Configuration for side menu
  */
  menu?: {
   /**
    * Menu data object as defined in `overlay-menu`
    */
   data: OverlayMenuData;
  };
};

/**
 * A card frame component.
 *
 * @fires item-trigger - Fired when card menu is selected.
 */
@customElement('ef-card')
export class Card extends BasicElement {

  /**
   * A `CSSResult` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @returns CSS template
   */
  static get styles (): CSSResult | CSSResult[] {
    return css`
      :host {
        display: flex;
        flex-direction: column;
      }
    `;
  }

  private _config: CardConfiguration | undefined;

  /**
   * Set text on the header
   */
  @property({ type: String })
  public header: string | null = null;

  /**
   * Set text on the footer
   */
  @property({ type: String })
  public footer: string | null = null;

  /**
   * Set card configurations
   */
  @property({ type: Object, attribute: false })
  public get config (): CardConfiguration | undefined {
    return this._config;
  }
  public set config (config: CardConfiguration | undefined) {
    const data = config?.menu?.data;
    if (data !== this.menuData) {
      this.menuData = data;
    }
    this._config = config;
  }

  /**
   * Card's overlay menu element
  */
  public get menu (): OverlayMenu | undefined {
    return this.menuElement;
  }

  /**
   * Get menu element from shadow root
   */
  @query('[part=menu-popup]')
  private menuElement?: OverlayMenu;

  /**
   * Get button element from shadow root
   */
  @query('[part=menu-button]')
  private buttonElement?: Button;

  /**
   * Menu data for creating overlay-menu
   */
  @state()
  private menuData: OverlayMenuData | undefined;

  /**
   * Open menu
   * @returns {void}
   */
  private openMenu (): void {
    if (this.menu && !(this.menu.fullyOpened || this.menu.transitioning)) {
      this.menu.opened = true;
    }
  }

  /**
   * Called after render life-cycle finished
   * @param changedProperties Properties which have changed
   * @return {void}
   */
  protected updated (changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (changedProperties.has('menuData') && this.menu) {
      this.menu.positionTarget = this.buttonElement;
    }
  }

  /**
   * Template of menu
   * @return menu template
   */
  protected get menuTemplate (): TemplateResult {
    return html`${this.menuData ? html`
      <ef-button part="menu-button" @tap="${this.openMenu}" icon="more" transparent></ef-button>
      <ef-overlay-menu part="menu-popup" .data=${this.menuData} position="bottom-end"></ef-overlay-menu>` : null }
    `;
  }

  /**
   * Template of header
   * @return header template
   */
  protected get headerTemplate (): TemplateResult {
    return html`
      ${this.header || this.menuData ? html`<div part="header">
        ${this.header ? html`<ef-label max-line="3" part="header-text">${this.header}</ef-label>` : null}
        ${this.menuTemplate}
      </div>` : null}
    `;
  }

  /**
   * Template of footer
   * @return footer template
   */
  protected get footerTemplate (): TemplateResult {
    return html`
      ${this.footer ? html`<ef-label max-line="3" part="footer">${this.footer}</ef-label>` : null}
    `;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
      ${this.headerTemplate}
      <div part="body">
        <slot></slot>
      </div>
      ${this.footerTemplate}
    `;
  }
}
