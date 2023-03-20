import {
  ControlElement,
  css,
  CSSResultGroup,
  html,
  PropertyValues,
  TemplateResult
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { VERSION } from '../version.js';
import '../icon/index.js';
import '../checkbox/index.js';

import { createRef, ref, Ref } from '@refinitiv-ui/core/directives/ref.js';
import type { ItemType, ItemText, ItemHeader, ItemDivider, ItemData } from './helpers/types';
export type { ItemType, ItemText, ItemHeader, ItemDivider, ItemData };

const isAllWhitespaceTextNode = (node: Node): boolean =>
  node.nodeType === document.TEXT_NODE
  && !node.textContent?.trim();

/**
 * Used as a basic building block to compose complex custom elements,
 * additionally it can be used by applications
 * to create simple menus or navigation panels.
 *
 * @attr {string} value - The content of this attribute represents the value of the item.
 * @prop {string} [value=""] - The content of this attribute represents the value of the item.
 *
 * @attr {boolean} disabled - Set disabled state.
 * @prop {boolean} [disabled=false] - Set disabled state.
 *
 * @slot left - Used to render the content on the left of the label.
 * @slot right - Used to render the content on the right of the label.
 */
@customElement('ds-sub-item', { theme: false })
export class SubItem extends ControlElement {
  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  /**
   * `CSSResultGroup` that will be used to style the host,
   * slotted children and the internal template of the element.
   * @returns CSS template
   */
  static get styles (): CSSResultGroup {
    return css`
      :host {
        display: flex;
        align-items: center;
        cursor: pointer;
        box-sizing: border-box;
        outline: none;
        padding: var(--ds-space-xxx-small) var(--ds-space-x-small);
        min-height: var(--ds-control-height);
        color: var(--ds-control-color);
        background-color: var(--ds-control-background-color);
        border: var(--ds-control-border-width) var(--ds-control-border-style) transparent;
        border-radius: var(--ds-control-border-radius);
      }
      [part=checkbox] {
        pointer-events: none;
      }
      [part=left],
      [part=right] {
        display: flex;
        align-items: center;
      }
      [part=center] {
        flex: 1;
      }
      [part=icon] {
        margin: 0 var(--ds-space-xx-small) 0 0;
      }
      :host([selected]) {
        color: var(--ds-control-color);
      }
      :host([readonly]) {
        cursor: default;
      }
      :host(:focus),
      :host([highlighted]) {
        color: var(--ds-control-focus-color);
        border-color: var(--ds-control-focus-border-color);
        background-color: var(--ds-control-focus-background-color);
      }
      :host([type="header"]) {
        align-items: flex-end;
        margin: 0;
        min-height: 0;
        text-transform: uppercase;
        color: var(--ds-text-sub-header-color);
        background-color: var(--ds-background-default);
        font-weight: var(--ds-font-weight-bold);
      }
      :host([type="divider"]) {
        border: none;
        padding: 0;
        margin: 0;
        min-height: auto;
        height: var(--ds-space-xxx-small);
        background: var(--ds-background-empathize);
      }
      :host([type=divider]) > * {
        display: none;
      }
      :host([disabled]) {
        color: var(--ds-control-disabled-color);
        background-color: var(--ds-control-disabled-background-color);
      }
    `;
  }

  /**
   * The text for the label indicating the meaning of the item.
   * By having both `label` and content, content always takes priority
   */
  @property({ type: String })
  public label: string | null = null;

  /**
   * If defined value can be `text`, `header` or `divider`
   * @type {ItemType | null}
   */
  @property({ type: String, reflect: true })
  public type: ItemType | null = null;

  /**
   * Set the icon name from the ds-icon list
   */
  @property({ type: String, reflect: true })
  public icon: string | null = null;

  /**
   * Indicates that the item is selected
   */
  @property({ type: Boolean, reflect: true })
  public selected = false;

  /**
   * Highlight the item
   */
  @property({ type: Boolean, reflect: true })
  public highlighted = false;

  /**
   * Reference to the label element
   */
  private labelRef: Ref<HTMLDivElement> = createRef();

  /**
   * True, if there is no slotted content
   */
  private isSlotEmpty = true;

  /**
   * @param node that should be checked
   * @returns whether node can be ignored.
   */
  private isIgnorable (node: Node): boolean {
    return node.nodeType === document.COMMENT_NODE
      || isAllWhitespaceTextNode(node);
  }

  /**
   * Checks slotted children nodes and updates component to refresh label and sub-label templates.
   * @param event slotchange
   * @returns {void}
   */
  private checkSlotChildren = (event: Event): void => {
    const slot = event.target as HTMLSlotElement;
    this.isSlotEmpty = !slot.assignedNodes().filter(node => !this.isIgnorable(node)).length;
    this.requestUpdate();
  };

  /**
   * Handles aria when selected state changes
   * @returns {void}
   */
  private selectedChanged (): void {
    this.setAttribute('aria-selected', String(this.selected));
  }

  /**
   * Control State behaviour will update tabindex based on the property
   * @returns {void}
   */
  private typeChanged (): void {
    const noInteraction = this.type === 'header' || this.type === 'divider' || this.disabled;
    if (noInteraction) {
      this.disableFocus();
    }
    else if (!this.disabled) {
      this.enableFocus();
    }
  }

  /**
   * Invoked before update() to compute values needed during the update.
   * @param changedProperties changed properties
   * @returns {void}
   */
  protected willUpdate (changedProperties: PropertyValues): void {
    if (changedProperties.has('type')) {
      this.typeChanged();
    }
    else if (changedProperties.has('selected')) {
      this.selectedChanged();
    }
  }

  /**
   * Get icon template if icon attribute is defined
   */
  private get iconTemplate (): TemplateResult | undefined {
    return this.icon !== null && this.icon !== undefined ? html`<ds-icon part="icon" .icon="${this.icon}"></ds-icon>` : undefined;
  }

  /**
   * Get label template if it is defined and no slot content present
   */
  private get labelTemplate (): TemplateResult | undefined {
    return html`${this.label}`;
  }

  /**
   * Return true if the item can be highlighted. True if not disabled and type is Text
   * @prop {boolean} highlightable
   * @returns whether element is highlightable
   */
  public get highlightable (): boolean {
    return !this.disabled && this.type !== 'header' && this.type !== 'divider';
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @returns Render template
   */
  protected render (): TemplateResult {
    return html`
      <div part="left">
        ${this.iconTemplate}
        <slot name="left"></slot>
      </div>
      <div part="center" ${ref(this.labelRef)}>
        ${this.label && this.isSlotEmpty ? this.labelTemplate : undefined}
        <slot @slotchange="${this.checkSlotChildren}"></slot>
      </div>
      <div part="right">
        <slot name="right"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-sub-item': SubItem;
  }
}
