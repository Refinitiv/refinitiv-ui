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
import { registerOverflowTooltip } from '../tooltip/index.js';
import { isElementOverflown } from '@refinitiv-ui/utils/element.js';
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
@customElement('ef-item', {
  alias: 'coral-item'
})
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
      :host([type=divider]) > * {
        display: none;
      }
    `;
  }

  /**
   * The text for the label indicating the meaning of the item.
   * By having both `label` and content, `label` always takes priority
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
   * Set the icon name from the ef-icon list
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
   * Called after the component is first rendered
   * @param changedProperties Properties which have changed
   * @returns {void}
   */
  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    registerOverflowTooltip(this, () => this.getItemContent(), () => this.isItemOverflown());
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
   * Get Item content
   * @returns return item content from slot or label and sub-label
   */
  private getItemContent (): string {
    
    if (this.isSlotEmpty) {
      let text = '';
      if (this.label) {
        text += this.label;
      }
      if (this.subLabel) {
        text += text ? ` (${this.subLabel})` : this.subLabel;
      }
      return text;
    }
    else {
      return this.slotContent;
    }
  }

  /**
   * Get element overflown
   * @param element Target element
   * @returns return true if element is overflown.
   */
  private isItemElementOverflown (element?: HTMLElement): boolean {
    return element ? isElementOverflown(element) : false;
  }

  /**
   * Get item overflown
   * @returns return true if an item is overflown.
   */
  private isItemOverflown (): boolean {
    return this.isItemElementOverflown(this.labelRef.value) || this.isItemElementOverflown(this.subLabelRef.value);
  }

  /**
   * Get icon template if icon attribute is defined
   */
  private get iconTemplate (): TemplateResult | undefined {
    return this.icon !== null && this.icon !== undefined ? html`<ef-icon part="icon" .icon="${this.icon}"></ef-icon>` : undefined;
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
    return this.for ? html`<ef-icon icon="right"></ef-icon>` : undefined;
  }

  /**
   * Get template for `multiple` attribute.
   * This is usually used with lists, when an item can be part of a multiple selection
   */
  private get multipleTemplate (): TemplateResult | undefined {
    const multiple = this.multiple && (!this.type || this.type === 'text');
    return multiple ? html`<ef-checkbox part="checkbox" .checked="${this.selected}" tabindex="-1"></ef-checkbox>` : undefined;
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
    'ef-item': Item;
  }
}
