import { PropertyValues, TapEvent } from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';

import { CollectionComposer } from '@refinitiv-ui/utils/collection.js';

import { List, valueFormatWarning } from '../../list/index.js';
import { VERSION } from '../../version.js';
import { createDefaultFilter } from '../helpers/filter.js';
import { createTreeRenderer } from '../helpers/renderer.js';
import type { TreeData, TreeDataItem, TreeFilter } from '../helpers/types';
import { TreeManager, TreeManagerMode } from '../managers/tree-manager.js';
import './tree-item.js';

const EXPAND_TOGGLE_ATTR = 'expand-toggle';

/**
 * Displays a tree structure
 * to be used for menus and group selections
 *
 * @fires value-changed - Fired when the user commits a value change. The event is not triggered if `value` property is changed programmatically.
 * @fires expanded-changed - Fired when the user expands or collapses item. The event is not triggered if `expanded` property is changed programmatically.
 *
 * @attr {boolean} [stateless=false] - Disable selections
 * @prop {boolean} [stateless=false] - Disable selections
 */
@customElement('ef-tree')
export class Tree<T extends TreeDataItem = TreeDataItem> extends List<T> {
  /**
   * Element version number
   * @returns version number
   */
  static override get version(): string {
    return VERSION;
  }

  protected override readonly defaultRole: string | null = 'tree';

  private _manager = new TreeManager<T>(this.composer);

  /**
   * Tree manager used for item manipulation
   */
  public get manager(): TreeManager<T> {
    return this._manager;
  }

  /**
   * Allows multiple items to be selected
   */
  @property({ type: Boolean })
  public override multiple = false;

  /**
   * Breaks the relationship when multiple
   * selection mode is enabled
   */
  @property({ attribute: 'no-relation', type: Boolean })
  public noRelation = false;

  /**
   * Query string applied to tree
   */
  @property({ type: String })
  public query = '';

  /**
   * Custom filter for static data
   * @type {TreeFilter<T> | null}
   * @ignore set to protected for now and need to discuss before set to public API
   */
  protected filter: TreeFilter<T> | null = createDefaultFilter<T>(this);

  /**
   * Renderer used for generating tree items
   */
  @property({ attribute: false })
  public override renderer = createTreeRenderer<T>(this);

  /**
   * Expands all groups
   * @returns {void}
   */
  public expandAll(): void {
    this._manager.expandAllItems();
  }

  /**
   * Collapses all groups
   * @returns {void}
   */
  public collapseAll(): void {
    this._manager.collapseAllItems();
  }

  /**
   * Checks all editable items
   * @returns {void}
   */
  public checkAll(): void {
    if (!this.multiple) {
      throw new RangeError('You cannot check all items in single selection mode');
    }
    this._manager.checkAllItems();
  }

  /**
   * Unchecks all editable items
   * @returns {void}
   */
  public uncheckAll(): void {
    this._manager.uncheckAllItems();
  }

  /**
   * @override
   * @ignore
   */
  public override selectItem(item: T): boolean {
    // Stateless tree
    if (this.stateless) {
      // Single selection - expand/collapse group (parent)
      if (!this.multiple && this._manager.isItemParent(item)) {
        this.toggleExpandedState(item);
      }
      return false;
    }
    // Multiple selection
    if (this.multiple) {
      return this._manager.toggleItem(item);
    }
    // Single selection - expand/collapse group (parent)
    if (this._manager.isItemParent(item)) {
      this.toggleExpandedState(item);
      return false;
    }
    // Single selection - check item
    if (this._manager.checkItem(item)) {
      this._manager.checkedItems.forEach((checkedItem) => {
        checkedItem !== item && this.forceUncheckItem(checkedItem);
      });
      return true;
    }
    return false;
  }

  /**
   * Force uncheck item when item is locked
   * @param item Original data item
   * @returns {void}
   */
  protected forceUncheckItem(item: T): void {
    const result = this.composer.unlockItem(item);
    this._manager.uncheckItem(item);
    result && this.composer.lockItem(item);
  }

  /**
   * Dispatches an event, detailing which item has recently changed it's expanded state.
   * @param item Data item of which the expanded property changed
   * @returns {void}
   */
  protected dispatchExpandedChangedEvent(item: T): void {
    /**
     * Property `detail.value` is the current expanded state.
     * Property `detail.item` is the original data item of which the property has been modified.
     */
    const event = new CustomEvent('expanded-changed', {
      bubbles: false,
      cancelable: false,
      composed: true,
      detail: {
        value: this._manager.isItemExpanded(item),
        item
      }
    });
    this.dispatchEvent(event);
  }

  /**
   * Handles tap event when composed path contains
   * an element with an `expand-toggle` attribute.
   * @param event Tap event to try and handle
   * @returns True or False depending if the event was handled
   */
  protected handleExpandCollapse(event: TapEvent): boolean {
    const containsToggle = event
      .composedPath()
      .some((target) => target instanceof HTMLElement && target.hasAttribute(EXPAND_TOGGLE_ATTR));
    const itemElement = containsToggle && this.findItemElementFromTarget(event.target);
    const item = itemElement && this.itemFromElement(itemElement);
    if (item) {
      this.toggleExpandedState(item);
      return true;
    }
    return false;
  }

  /**
   * @override
   */
  protected override onTap(event: TapEvent): void {
    if (this.handleExpandCollapse(event)) {
      return;
    }
    super.onTap(event);
  }

  /**
   * @override
   */
  protected override onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowLeft':
        this.left();
        break;
      case 'ArrowRight':
        this.right();
        break;
      default:
        return super.onKeyDown(event);
    }
    event.preventDefault();
  }

  /**
   * Performs left arrow keyboard action,
   * collapsing a group item if possible.
   * @returns {void}
   */
  protected left(): void {
    const item = this.highlightElement && this.itemFromElement(this.highlightElement);
    if (item && this._manager.isItemExpanded(item)) {
      this._manager.collapseItem(item);
      this.dispatchExpandedChangedEvent(item);
    }
  }

  /**
   * Performs right arrow keyboard action,
   * expanding a group item if possible.
   * @returns {void}
   */
  protected right(): void {
    const item = this.highlightElement && this.itemFromElement(this.highlightElement);
    if (item && !this._manager.isItemExpanded(item)) {
      this._manager.expandItem(item);
      this.dispatchExpandedChangedEvent(item);
    }
  }

  /**
   * Toggles the expanded state of an item.
   * Executed when a user taps on an item to expand/collapse the group.
   * @param item Original data item
   * @returns {void}
   */
  protected toggleExpandedState(item: T): void {
    if (this._manager.isItemExpanded(item)) {
      this._manager.collapseItem(item);
    } else {
      this._manager.expandItem(item);
    }
    this.dispatchExpandedChangedEvent(item);
  }

  /**
   * @override
   */
  protected override queryItems(engine: (item: T, composer: CollectionComposer<T>) => boolean): readonly T[] {
    return this.composer.queryItems(engine, Infinity);
  }

  /**
   * @override
   */
  protected override queryItemsByPropertyValue<K extends keyof T>(property: K, value: T[K]): readonly T[] {
    return this.composer.queryItemsByPropertyValue(property, value, Infinity);
  }

  /**
   * @override
   */
  protected override willUpdate(changeProperties: PropertyValues): void {
    super.willUpdate(changeProperties);

    if (changeProperties.has('noRelation') || changeProperties.has('multiple')) {
      this._manager.setMode(this.mode);
    }

    if (changeProperties.has('query') || changeProperties.has('data')) {
      this.filterItems();
    }
  }

  /**
   * Filter the internal items by query changes items' hidden state
   * @returns {void}
   */
  protected filterItems(): void {
    // if filter is null, it is off and external app is responsible
    if (this.filter) {
      const filter = this.filter;
      const items = this.queryItems((item): boolean => {
        // Do not filter hidden items
        // TODO: blocking `hidden` update via TreeManager/TreeNode of this component
        if (item.hidden) {
          return false;
        }

        const result = filter(item, this._manager);
        if (result) {
          this._manager.includeItem(item);
        } else {
          this._manager.excludeItem(item);
        }

        return result;
      }).slice();

      // Do not expand tree if there is no filter applied
      if (this.query) {
        /**
         * Add all descendants of item list to make the descendants
         * are accessible which user can navigate into the nested data
         */
        this.addItemDescendantsToRender(items);

        /**
         * Add all parents of item list which they must be shown
         * when some descendant is shown.
         */
        this.addExpandedAncestorsToRender(items);
      }
    }
  }

  /**
   * Utility method
   * Adds descendants for each item passed
   * @param items List of child items
   * @returns {void}
   */
  protected addItemDescendantsToRender(items: T[]): void {
    items.forEach((item) => {
      /**
       * Collapse an item to prevent tree show too many nested expanded
       */
      if (this._manager.isItemExpanded(item)) {
        this._manager.collapseItem(item);
      }

      /**
       * show all descendants of items to make them all are selectable
       * and user can navigate into nested data
       */
      const children = this.composer.getItemChildren(item);
      if (children.length) {
        this.addNestedItemsToRender(children, items, false);
      }
    });
  }

  /**
   * Utility method
   * Add nested children of item list
   * @param items List of items
   * @param excludeItems List of exclude items
   * @param [includeHidden=false] Include hidden items
   * @returns {void}
   */
  protected addNestedItemsToRender(
    items: readonly T[],
    excludeItems: readonly T[],
    includeHidden = false
  ): void {
    items.forEach((item) => {
      // Skip hidden and exclude item
      if (!item.hidden && !excludeItems.includes(item)) {
        // Add item and nested children
        this._manager.includeItem(item);
        const children = this._manager.getItemChildren(item);
        if (children.length) {
          this.addNestedItemsToRender(children, excludeItems, includeHidden);
        }
      }
    });
  }

  /**
   * Utility method
   * Adds ancestors for each item passed and expand
   * @param items List of child items
   * @returns {void}
   */
  protected addExpandedAncestorsToRender(items: T[]): void {
    // Establish unique ancestors set
    const ancestors = new Set<T>();
    // we iterate each item match so as to find ancestors
    items.forEach((item) => {
      // Get the ancestors
      const parent = this._manager.getItemParent(item);
      if (parent && !ancestors.has(parent)) {
        this._manager.getItemAncestors(item).forEach((ancestor) => {
          ancestors.add(ancestor); // track ancestors
          this.addExpandedAncestorToRender(ancestor);
        });
      }
    });
  }

  /**
   * Utility method
   * Adds parent and expands
   * @param ancestor parent item
   * @returns {void}
   */
  protected addExpandedAncestorToRender(ancestor: T): void {
    this._manager.includeItem(ancestor);
    this._manager.expandItem(ancestor);
  }

  /**
   * Selected items in tree
   * @override
   * @type {string[]}
   * @default []
   */
  public override get values(): string[] {
    return this._manager.checkedItems.map((item) => {
      return this.composer.getItemPropertyValue(item, 'value') ?? '';
    });
  }
  public override set values(values: string[]) {
    if (!Array.isArray(values)) {
      valueFormatWarning.show();
      this.values = [];
    } else {
      // Clone value arrays
      const newValue = [...values];
      const oldValue = [...this.values];

      if (newValue.toString() !== oldValue.toString()) {
        this._manager.uncheckAllItems();
        values.some((value) => {
          this.queryItemsByPropertyValue('value', value).forEach((item) => {
            this._manager.checkItem(item);
          });
          return !this.multiple; // Only set the fist value if multiple is not enabled
        });
        this.requestUpdate('values', this.values);
      }
    }
  }

  /**
   * Data object to be used for creating tree
   * @override
   * @type {TreeData<T>}
   */
  public override get data(): TreeData<T> {
    return super.data;
  }
  public override set data(data: TreeData<T>) {
    super.data = data;
    this._manager = new TreeManager<T>(this.composer, this.mode);
  }

  /**
   * @override
   */
  protected override get renderItems(): readonly T[] {
    return this._manager.visibleItems;
  }

  /**
   * Mode to use in the tree manager
   */
  protected get mode(): TreeManagerMode {
    return !this.multiple || !this.noRelation ? TreeManagerMode.RELATIONAL : TreeManagerMode.INDEPENDENT;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ef-tree': Tree;
  }
}
