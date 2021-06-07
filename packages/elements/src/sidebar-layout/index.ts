import {
  BasicElement,
  html,
  css,
  customElement,
  property,
  TemplateResult,
  CSSResult,
  PropertyValues,
  ifDefined,
  query
} from '@refinitiv-ui/core';
import { Layout } from '../layout';
import '../layout';

/**
 * Provides an app layout with sidebar.
 * There are 4 sections that can be slotted a component in.
 *
 * @slot sidebar-header - Sidebar header.
 * @slot sidebar-content - Content of sidebar.
 * @slot main-header - Main header.
 * @slot main-content - Content of main section.
 */
@customElement('ef-sidebar-layout')
export class SidebarLayout extends BasicElement {
  /**
   * A `CSSResult` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @return CSS template
   */
  static get styles (): CSSResult | CSSResult[] {
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
   * @type {string}
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
