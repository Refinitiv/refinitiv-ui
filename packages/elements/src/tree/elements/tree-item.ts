import {
  html,
  TemplateResult,
  ControlElement,
  PropertyValues
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { VERSION } from '../../version.js';
import '../../icon/index.js';
import { preload } from '../../icon/index.js';
import '../../checkbox/index.js';
import type { TreeDataItem } from '../helpers/types';
import { CheckedState } from '../managers/tree-manager.js';

preload('right');

const emptyTemplate = html``;

/**
 * Displays a tree list item.
 * Groups display expansion arrows.
 */
@customElement('ef-tree-item', {
  alias: 'coral-tree-item'
})
export class TreeItem<T extends TreeDataItem = TreeDataItem> extends ControlElement {

  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  protected readonly defaultRole: string | null = 'treeitem';

  /**
   * Checked state of the item
   */
  @property({ attribute: false })
  public checkedState: CheckedState = CheckedState.UNCHECKED;

  /**
   * Is the item a parent and should it show an expansion toggle?
   */
  @property({ type: Boolean, reflect: true, attribute: 'group' })
  public parent = false;

  /**
   * Display in multiple selection mode
   */
  @property({ type: Boolean, reflect: true })
  public multiple = false;

  /**
   * Expanded state of the item
   */
  @property({ type: Boolean })
  public expanded = false;

  /**
   * Depth of the item
   */
  @property({ type: Number, reflect: true })
  public depth = 0;

  /**
   * Label of the item
   */
  @property({ type: String })
  public label = '';

  /**
   * Icon of the item
   */
  @property({ type: String })
  public icon = '';

  /**
   * Original data item, used for interacting with the tree manager
   */
  @property({ attribute: false })
  public item!: T;

  /**
   * Highlighted state of the item.
   * This is for showing which item is currently being interacted with.
   */
  @property({ reflect: true, type: Boolean })
  public highlighted = false;

  /**
   * Template for rendering the indentation element
   */
  protected get indentTemplate (): TemplateResult {
    return this.depth ? html`<div part="indent" style="width:${this.depth}em"></div>` : emptyTemplate;
  }

  /**
   * Template for rendering the toggle
   *
   * ! expand-toggle is required for automatically toggling expanded state
   */
  protected get toggleTemplate (): TemplateResult {
    return html`
    <div expand-toggle part="toggle" style="pointer-events:all;visibility:${this.parent ? 'visible' : 'hidden'}">
      <ef-icon part="toggle-icon${this.expanded ? ' toggle-icon-expanded' : ''}" icon="right"></ef-icon>
    </div>
    `;
  }

  /**
   * Template for rendering the checkbox
   */
  protected get checkboxTemplate (): TemplateResult {
    if (!this.multiple) {
      return emptyTemplate;
    }

    return html`
    <ef-checkbox
      part="checkbox"
      tabindex="-1"
      .disabled="${this.disabled}"
      .readonly="${this.readonly}"
      .indeterminate="${this.indeterminate}"
      .checked="${this.checked}"
      style="pointer-events:none">
    </ef-checkbox>
    `;
  }

  /**
   * Template for rendering the icon
   */
  protected get iconTemplate (): TemplateResult {
    if (typeof this.icon === 'undefined') {
      return emptyTemplate;
    }

    return html`<ef-icon part="label-icon" icon="${this.icon}"></ef-icon>`;
  }

  /**
   * Is the item fully checked?
   */
  protected get checked (): boolean {
    return this.checkedState === CheckedState.CHECKED;
  }

  /**
   * Is the checked state indeterminate?
   */
  protected get indeterminate (): boolean {
    return this.checkedState === CheckedState.INDETERMINATE;
  }

  /**
   * Handles aria-checked and aria-selected when mode changes
   * aria-checked is used for multiple mode due to tri-state support
   * @returns {void}
   **/
  private multipleChanged (): void {
    this.removeAttribute(this.multiple ? 'aria-selected' : 'aria-checked');
    this.checkedChanged();
  }

  /**
   * Handles selected and aria attribute changes
   * @returns {void}
   */
  private checkedChanged (): void {
    switch (this.checkedState) {
      case CheckedState.CHECKED:
        this.setAttribute('selected', '');
        this.setAttribute(this.multiple ? 'aria-checked' : 'aria-selected', 'true');
        break;
      case CheckedState.INDETERMINATE:
        this.setAttribute('selected', 'indeterminate');
        this.setAttribute('aria-checked', 'mixed');
        break;
      default:
        this.removeAttribute('selected');

        // In single mode, only children nodes are selectable
        if (this.parent && !this.multiple) {
          this.removeAttribute('aria-selected');
        }
        else {
          this.setAttribute(this.multiple ? 'aria-checked' : 'aria-selected', 'false');
        }

        break;
    }
  }

  /**
   * Handles aria-expanded when expanded state changes
   * @returns {void}
   */
  private expandedChanged () :void {
    if (this.parent) {
      this.setAttribute('aria-expanded', this.expanded ? 'true' : 'false');
    }
  }

  /**
   * Called after the component is first rendered
   * @param changedProperties Properties which have changed
   * @returns {void}
   */
  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    this.setAttribute('aria-level', String(this.depth + 1));
  }

  /**
   * Invoked before update() to compute values needed during the update.
   * @param changedProperties changed properties
   * @returns {void}
   */
  protected willUpdate (changedProperties: PropertyValues): void {
    if (changedProperties.has('checkedState')) {
      this.checkedChanged();
    }

    if (changedProperties.has('multiple') && changedProperties.get('multiple') !== undefined) {
      this.multipleChanged();
    }

    if (changedProperties.has('expanded')) {
      this.expandedChanged();
    }
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @returns Render template
   */
  protected render (): TemplateResult {
    return html`
      ${this.indentTemplate}
      ${this.toggleTemplate}
      ${this.checkboxTemplate}
      ${this.iconTemplate}
      <div part="label">
        <slot>${this.label}</slot>
      </div>
  `;
  }
}
