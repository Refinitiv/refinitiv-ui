import {
  BasicElement,
  html,
  css,
  TemplateResult,
  CSSResultGroup,
  PropertyValues
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { query } from '@refinitiv-ui/core/decorators/query.js';
import { ifDefined } from '@refinitiv-ui/core/directives/if-defined.js';
import { VERSION } from '../version.js';
import type { Layout } from '../layout';
import '../layout/index.js';

/**
 * Provides an app layout with sidebar.
 * There are 4 sections that can be slotted a component in.
 *
 * @slot sidebar-header - Sidebar header.
 * @slot sidebar-content - Content of sidebar.
 * @slot main-header - Main header.
 * @slot main-content - Content of main section.
 */
@customElement('ef-sidebar-layout', {
  alias: 'carbon-sidebar-layout'
})
export class SidebarLayout extends BasicElement {

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

      [part=container] {
        height: 100%;
      }

      ef-layout ::slotted(ef-panel) {
        width: 100%;
        min-height: 100%;
      }

      .content {
        height: 100%;
      }

      [part=sidebar] {
        width: var(--sidebar-width);
      }

      :host([collapsed]:not([sidebar-position])) [part=sidebar],
      :host([collapsed][sidebar-position=left]) [part=sidebar] {
        margin-left: calc(var(--sidebar-width) * -1);
      }

      :host([collapsed][sidebar-position=right]) [part=sidebar] {
        margin-right: calc(var(--sidebar-width) * -1);
      }
    `;
  }

  /**
   * Set the width of the sidebar. The value could be in both px or %, e.g. 300px, 30%
   * @type {string | undefined}
   */
  @property({ type: String, attribute: 'sidebar-width' })
  public sidebarWidth?: string;

  /**
   * Set to hide sidebar
   */
  @property({ type: Boolean, reflect: true })
  public collapsed = false;

  /**
   * Set sidebar position to left or right
   */
  @property({ type: String, reflect: true, attribute: 'sidebar-position' })
  public sidebarPosition: 'left' | 'right' = 'left';

  /**
   * Property to get sidebar
   * @ignore
   */
  @query('[part=sidebar]')
  public sidebar!: Layout;

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return Render template
   */
  protected render (): TemplateResult {
    return html`
      <ef-layout flex nowrap part="container">

        <ef-layout flex container part="sidebar" size="${ifDefined(this.sidebarWidth || undefined)}">
          <ef-layout size="auto">
            <slot name="sidebar-header"></slot>
          </ef-layout>
          <ef-layout class="content" scrollable basis="auto">
            <slot name="sidebar-content"></slot>
          </ef-layout>
        </ef-layout>

        <ef-layout flex container basis="100%" part="main">
          <ef-layout size="auto">
            <slot name="main-header"></slot>
          </ef-layout>
          <ef-layout class="content" scrollable basis="auto">
            <slot name="main-content"></slot>
          </ef-layout>
        </ef-layout>

      </ef-layout>
    `;
  }

  /**
   * @override
   * @returns {void}
   */
  protected updated (changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (changedProperties.has('sidebarWidth')) {
      this.updateVariable('--sidebar-width', this.sidebarWidth);
    }
  }
}
