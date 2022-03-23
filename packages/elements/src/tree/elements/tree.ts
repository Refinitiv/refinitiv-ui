import {
  PropertyValues,
  TapEvent
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { VERSION } from '../../version.js';
import { CollectionComposer } from '@refinitiv-ui/utils/collection.js';

import { List } from '../../list/index.js';
import { TreeRenderer } from '../helpers/renderer.js';
import { defaultFilter } from '../helpers/filter.js';
import type { TreeData, TreeDataItem, TreeFilter } from '../helpers/types';
import { TreeManager, TreeManagerMode } from '../managers/tree-manager.js';

const EXPAND_TOGGLE_ATTR = 'expand-toggle';

/**
 * Displays a tree structure
 * to be used for menus and group selections
 *
 * @fires value-changed - Fired when the users changed selection item.
 * @fires expanded-changed - Fired when an item's expanded state has changed.
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
  static get version (): string {
    return VERSION;
  }

  protected readonly defaultRole: string | null = 'tree';

  /**
   * Tree manager used for manipulation
   */
  private manager = new TreeManager<T>(this.composer);

  /**
   * Allows multiple items to be selected
   */
  @property({ type: Boolean })
  public multiple = false;

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
  protected filter: TreeFilter<T> | null = defaultFilter<T>(this);

  /**
   * Renderer used for generating tree items
   * @type {TreeRenderer}
   */
  @property({ attribute: false })
  public renderer = new TreeRenderer(this);

  /**
   * Expands all groups
   * @returns {void}
   */
  public expandAll (): void {
    this.manager.expandAllItems();
  }

  /**
   * Collapses all groups
   * @returns {void}
   */
  public collapseAll (): void {
    this.manager.collapseAllItems();
  }

  /**
   * Checks all editable items
   * @returns {void}
   */
  public checkAll (): void {
    if (!this.multiple) {
      throw new RangeError('You cannot check all items in single selection mode');
    }
    this.manager.checkAllItems();
  }

  /**
   * Unchecks all editable items
   * @returns {void}
   */
  public uncheckAll (): void {
    this.manager.uncheckAllItems();
  }

  /**
   * @override
   * @ignore
   */
  public selectItem (item: T): boolean {
    // Stateless tree
    if (this.stateless) {
      return false;
    }
    // Multiple selection
    if (this.multiple) {
      return this.manager.toggleItem(item);
    }
    // Single selection - expand/collapse group (parent)
    if (this.manager.isItemParent(item)) {
      this.toggleExpandedState(item);
      return false;
    }
    // Single selection - check item
    if (this.manager.checkItem(item)) {
      this.manager.checkedItems.forEach(checkedItem => {
        checkedItem !== item && this.manager.uncheckItem(checkedItem);
      });
      return true;
    }
    return false;
  }

  /**
   * Dispatches an event, detailing which item has recently changed it's expanded state.
   * @param item Data item of which the expanded property changed
   * @returns {void}
   */
  protected dispatchExpandedChangedEvent (item: T): void {
    /**
    * Property `detail.value` is the current expanded state.
    * Property `detail.item` is the original data item of which the property has been modified.
    */
    const event = new CustomEvent('expanded-changed', {
      bubbles: false,
      cancelable: false,
      composed: true,
      detail: {
        value: this.manager.isItemExpanded(item),
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
  protected handleExpandCollapse (event: TapEvent): boolean {
    const containsToggle = event.composedPath().some((target) =>
      target instanceof HTMLElement && target.hasAttribute(EXPAND_TOGGLE_ATTR));
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
  protected onTap (event: TapEvent): void {
    if (this.handleExpandCollapse(event)) {
      return;
    }
    super.onTap(event);
  }

  /**
   * @override
   */
  protected onKeyDown (event: KeyboardEvent): void {
    switch (event.key) {
      case 'Left':
      case 'ArrowLeft':
        this.left();
        break;
      case 'Right':
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
  protected left (): void {
    const item = this.highlightElement && this.itemFromElement(this.highlightElement);
    if (item && this.manager.isItemExpanded(item)) {
      this.manager.collapseItem(item);
      this.dispatchExpandedChangedEvent(item);
    }
  }

  /**
   * Performs right arrow keyboard action,
   * expanding a group item if possible.
   * @returns {void}
   */
  protected right (): void {
    const item = this.highlightElement && this.itemFromElement(this.highlightElement);
    if (item && !this.manager.isItemExpanded(item)) {
      this.manager.expandItem(item);
      this.dispatchExpandedChangedEvent(item);
    }
  }

  /**
   * Toggles the expanded state of an item.
   * Executed when a user taps on an item to expand/collapse the group.
   * @param item Original data item
   * @returns {void}
   */
  protected toggleExpandedState (item: T): void {
    if (this.manager.isItemExpanded(item)) {
      this.manager.collapseItem(item);
    }
    else {
      this.manager.expandItem(item);
    }
    this.dispatchExpandedChangedEvent(item);
  }

  /**
   * @override
   */
  protected queryItems (engine: (item: T, composer: CollectionComposer<T>) => boolean): readonly T[] {
    return this.composer.queryItems(engine, Infinity);
  }

  /**
   * @override
   */
  protected queryItemsByPropertyValue<K extends keyof T> (property: K, value: T[K]): readonly T[] {
    return this.composer.queryItemsByPropertyValue(property, value, Infinity);
  }

  /**
   * @override
   */
  protected willUpdate (changeProperties: PropertyValues): void {
    super.willUpdate(changeProperties);

    if (changeProperties.has('noRelation') || changeProperties.has('multiple')) {
      this.manager.setMode(this.mode);
    }

    if (changeProperties.has('query') || changeProperties.has('data')) {
      this.filterItems();
    }
  }

  /**
   * Filter the internal items by query changes items' hidden state
   * @returns {void}
   */
  protected filterItems (): void {
    // if filter is null, it is off and external app is responsible
    if (this.filter) {
      const filter = this.filter;
      const items = this.queryItems((item): boolean => {
        // Do not filter hidden items
        if (item.hidden) {
          return false;
        }

        const result = filter(item);
        if (result) {
          this.manager.includeItem(item);
        }
        else {
          this.manager.excludeItem(item);
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
  protected addItemDescendantsToRender (items: T[]): void {
    items.forEach((item) => {
      /**
       * Collapse an item to prevent tree show too many nested expanded
       */
      if (this.manager.isItemExpanded(item)) {
        this.manager.collapseItem(item);
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
  protected addNestedItemsToRender (items: readonly T[], excludeItems: readonly T[], includeHidden = false): void {
    items.forEach(item => {
      // Skip hidden and exclude item
      if (!item.hidden && !excludeItems.includes(item)) {
        // Add item and nested children
        this.manager.includeItem(item);
        const children = this.manager.getItemChildren(item);
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
  protected addExpandedAncestorsToRender (items: T[]): void {
    // Establish unique ancestors set
    const ancestors = new Set<T>();
    // we iterate each item match so as to find ancestors
    items.forEach((item) => {
      // Get the ancestors
      const parent = this.manager.getItemParent(item);
      if (parent && !ancestors.has(parent)) {
        this.manager.getItemAncestors(item).forEach((ancestor) => {
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
  protected addExpandedAncestorToRender (ancestor: T): void {
    this.manager.includeItem(ancestor);
    this.manager.expandItem(ancestor);
  }

  /**
   * Selected items in tree
   * @override
   * @type {string[]}
   * @default []
   */
  public get values (): string[] {
    return this.manager.checkedItems.map(item => {
      return this.composer.getItemPropertyValue(item, 'value') as string || '';
    });
  }
  public set values (value: string[]) {
    super.values = value;
  }

  /**
   * Data object to be used for creating tree
   * @override
   * @type {TreeData<T>}
   */
  public get data (): TreeData<T> {
    return super.data;
  }
  public set data (data: TreeData<T>) {
    super.data = data;
    this.manager = new TreeManager<T>(this.composer, this.mode);
  }

  /**
   * @override
   */
  protected get renderItems (): readonly T[] {
    return this.manager.visibleItems;
  }

  /**
   * Mode to use in the tree manager
   */
  protected get mode (): TreeManagerMode {
    return !this.multiple || !this.noRelation
      ? TreeManagerMode.RELATIONAL : TreeManagerMode.INDEPENDENT;
  }
}
