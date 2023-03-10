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
export class Item extends ControlElement {

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
        padding: var(--ds-item-padding);
        color: var(--ds-item-color);
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
      :host [part=icon] {
        margin: 0 var(--ds-item-icon-margin) 0 0;
      }
      :host([type=divider]) > * {
        display: none;
      }
      :host([selected]) {
        color: var(--ds-item-selected-color);
      }
      :host([readonly]) {
        cursor: default;
      }
      :host([focused]),
      :host([highlighted]) {
        color: var(--ds-item-focus-color);
        background-color: var(--ds-item-focus-background-color);
      }
      :host([type="header"]) {
        color: var(--ds-item-header-color);
        background-color: var(--ds-item-header-background-color);
        font-size: var(--ds-item-header-font-size);
        font-weight: var(--ds-item-header-font-weight);
        align-items: flex-end;
        margin: 0;
        min-height: 0;
        text-transform: uppercase;
      }
      :host([type="divider"]) {
        border: none;
        padding: 0;
        margin: 0;
        height: var(--ds-item-divider-height);
        background: var(--ds-item-divider-background);
      }
      :host([disabled]) {
        color: var(--ds-item-disabled-color);
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
   * Is the item part of a multiple selection
   */
  @property({ type: Boolean, reflect: true })
  public multiple = false;

  /**
   * Highlight the item
   */
  @property({ type: Boolean, reflect: true })
  public highlighted = false;

  /**
   * The`subLabel` property represents the text beneath the label.
   * By having both `subLabel` and content, content always takes priority
   */
  @property({ type: String, reflect: true, attribute: 'sub-label' })
  public subLabel: string | null = null;

  /**
   * Specifies which element an item is bound to
   */
  @property({ type: String, reflect: true })
  public for: string | null = null;

  /**
   * Reference to the label element
   */
  private labelRef: Ref<HTMLDivElement> = createRef();

  /**
   * Reference to the subLabel element
   */
  private subLabelRef: Ref<HTMLDivElement> = createRef();

  /**
   * Reference to the slot element
   */
  private slotRef: Ref<HTMLSlotElement> = createRef();

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
   * Handles aria-selected or aria-checked when toggle between single and multiple selection mode
   * @returns {void}
   **/
  private multipleChanged (): void {
    this.removeAttribute(this.multiple ? 'aria-selected' : 'aria-checked');
    this.selectedChanged();
  }

  /**
   * Handles aria when selected state changes
   * @returns {void}
   */
  private selectedChanged (): void {
    this.setAttribute(this.multiple ? 'aria-checked' : 'aria-selected', String(this.selected));
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
    if (changedProperties.has('multiple')) {
      this.multipleChanged();
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
   * Get subLabel template if it is defined and no slot content present
   */
  private get subLabelTemplate (): TemplateResult | undefined {
    return html`<div part="sub-label" ${ref(this.subLabelRef)}>${this.subLabel}</div>`;
  }

  /**
   * Get label template if it is defined and no slot content present
   */
  private get labelTemplate (): TemplateResult | undefined {
    return html`${this.label}`;
  }

  /**
   * Get slot content
   */
  private get slotContent (): string {
    const nodes = this.slotRef.value?.assignedNodes() || [];
    return nodes.map(node => node.textContent).join(' ').trim();
  }

  /**
   * Get template for `for` attribute.
   * This is usually used with menus when an item needs to reference an element
   */
  private get forTemplate (): TemplateResult | undefined {
    return this.for ? html`<ds-icon icon="right"></ds-icon>` : undefined;
  }

  /**
   * Get template for `multiple` attribute.
   * This is usually used with lists, when an item can be part of a multiple selection
   */
  private get multipleTemplate (): TemplateResult | undefined {
    const multiple = this.multiple && (!this.type || this.type === 'text');
    return multiple ? html`<ds-checkbox part="checkbox" .checked="${this.selected}" tabindex="-1"></ds-checkbox>` : undefined;
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
        ${this.multipleTemplate}
        <slot name="left"></slot>
      </div>
      <div part="center" ${ref(this.labelRef)}>
        ${this.label && this.isSlotEmpty ? this.labelTemplate : undefined}
        <slot ${ref(this.slotRef)} @slotchange="${this.checkSlotChildren}"></slot>
        ${this.subLabel && this.isSlotEmpty ? this.subLabelTemplate : undefined}
      </div>
      <div part="right">
        <slot name="right"></slot>
        ${this.forTemplate}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-sub-item': Item;
  }
}
