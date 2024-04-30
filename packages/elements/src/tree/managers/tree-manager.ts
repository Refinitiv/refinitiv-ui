import { CollectionComposer } from '@refinitiv-ui/utils/collection.js';

import type { TreeDataItem } from '../helpers/types';
import { TreeNode } from './tree-node.js';

export enum CheckedState {
  CHECKED = 1,
  UNCHECKED = 0,
  INDETERMINATE = -1
}

export enum TreeManagerMode {
  /**
   * Maintains relationship states across children and parents.
   */
  RELATIONAL = 1,
  /**
   * Items are independent of each other and do not maintain relationship states.
   */
  INDEPENDENT = 0
}

export class TreeManager<T extends TreeDataItem> {
  /**
   * Internal composer used for managing the data
   */
  public composer: CollectionComposer<T>;

  /**
   * Mode (algorithm) the tree manage is using
   */
  private mode = TreeManagerMode.RELATIONAL;

  /**
   * Last selected item timestamp
   */
  private lastSelectedAt?: number;

  /** Cache map of TreeNode improving performance */
  private treeNodeCache = new Map<T, TreeNode<T>>();

  /**
   * Most of the time, there is no need to create a new instance of Tree Manager manually.
   * Use the existing instance in components instead.
   * @param input Items or CollectionComposer to be managed.
   * @param mode The mode describes how items are managed either relationally or independently.
   */
  constructor(input: T[] | CollectionComposer<T>, mode = TreeManagerMode.RELATIONAL) {
    this.composer = input instanceof CollectionComposer ? input : new CollectionComposer(input);
    this.mode = mode;
  }

  /**
   * Returns all items as an array of `TreeNode`.
   * @returns Array of `TreeNode` representing all items
   */
  public getTreeNodes(): TreeNode<T>[] {
    const result: TreeNode<T>[] = [];
    for (const item of this.items) {
      let treeNode = this.treeNodeCache.get(item);
      if (!treeNode) {
        treeNode = new TreeNode<T>(item, this);
        this.treeNodeCache.set(item, treeNode);
      }
      result.push(treeNode);
    }
    return result;
  }

  /**
   * Returns a `TreeNode` of the original data item.
   * If the item doesn't exist, return `null`.
   * @param item Original data item
   * @returns `TreeNode` of the original data item or `null`
   */
  public getTreeNode(item: T): TreeNode<T> | null {
    let treeNode = this.treeNodeCache.get(item);
    if (!treeNode) {
      const existingItems = this.composer.queryItems((_item: T) => item === _item, Infinity);
      if (existingItems.length === 0) {
        return null;
      }

      treeNode = new TreeNode<T>(item, this);
      this.treeNodeCache.set(item, treeNode);
    }
    return treeNode;
  }

  /**
   * Is the manager maintaining parent/child relationships
   */
  private get manageRelationships(): boolean {
    return this.mode === TreeManagerMode.RELATIONAL;
  }

  /**
   * Returns all items in the tree
   */
  private get items(): readonly T[] {
    return this.composer.queryItems(() => true, Infinity);
  }

  /**
   * Returns all items with children
   */
  private get parentItems(): readonly T[] {
    return this.items.filter((item) => this.isItemParent(item));
  }

  /**
   * Returns all selected items.
   * When managing relationships, this excludes groups/parents from the result.
   */
  public get checkedItems(): readonly T[] {
    const items = this.composer.queryItems((item: T) => {
      if (this.manageRelationships && this.isItemParent(item)) {
        return false;
      }
      return this.isItemChecked(item);
    }, Infinity);

    return Object.freeze(items.slice().sort(this.orderBySelectedAt));
  }

  /**
   * Compare items function order by sequential selected timestamp
   */
  protected get orderBySelectedAt() {
    // Order by sequential selected timestamp
    return (itemA: T, itemB: T) => {
      const timeA = this.composer.getItemPropertyValue(itemA, 'selectedAt') ?? 0;
      const timeB = this.composer.getItemPropertyValue(itemB, 'selectedAt') ?? 0;
      return timeA - timeB;
    };
  }

  /**
   * Returns items which their selected state can be changed.
   * Hidden, disabled or readonly items are not included.
   */
  public get editableItems(): readonly T[] {
    const topLevel = this.composer.queryItems(() => true, 0);
    return this.getEditableItems(topLevel);
  }

  /**
   * Internal query for getting visible items/nodes
   * @param items Data item collection
   * @param result Resulting array of visible items
   * @returns Collection of visible items
   */
  private getEditableItems(items: readonly T[], result: T[] = []): T[] {
    for (const item of items) {
      if (this.isItemCheckable(item)) {
        result.push(item);
        const children = this.getItemChildren(item);
        children.length && this.getEditableItems(children, result);
      }
    }
    return result;
  }

  /**
   * Returns currently displayed items.
   * Hidden and children of unexpanded items are not included.
   */
  public get visibleItems(): readonly T[] {
    const topLevel = this.composer.queryItems(() => true, 0);
    return this.getVisibleItems(topLevel);
  }

  /**
   * Internal query for getting visible items/nodes
   * @param items Data item collection
   * @param result Resulting array of visible items
   * @returns Collection of visible items
   */
  private getVisibleItems(items: readonly T[], result: T[] = []): T[] {
    for (const item of items) {
      if (!this.isItemHidden(item) && result.push(item) && this.isItemExpanded(item)) {
        const children = this.getItemChildren(item);
        children.length && this.getVisibleItems(children, result);
      }
    }
    return result;
  }

  /**
   * Is the item hidden?
   * @param item Original data item
   * @returns `True` if the item is hidden
   */
  private isItemHidden(item: T): boolean {
    return this.composer.getItemPropertyValue(item, 'hidden') === true;
  }

  /**
   * Is the item checked?
   * @param item Original data item
   * @returns `True` if the item is checked
   */
  private isItemChecked(item: T): boolean {
    if (this.manageRelationships && this.isItemParent(item)) {
      return !this.getItemChildren(item).some((child) => !this.isItemChecked(child));
    }
    return this.composer.getItemPropertyValue(item, 'selected') === true;
  }

  /**
   * Is the item checked indeterminately?
   * @param item Original data item
   * @returns `True` if the item has managed relationships and contains checked descendants
   */
  private isItemCheckedIndeterminate(item: T): boolean {
    if (this.manageRelationships && this.isItemParent(item)) {
      return this.getItemDescendants(item).some((desc) => this.isItemChecked(desc));
    }
    return false;
  }

  /**
   * Determines whether the item is unchecked and can be changed to a checked state.
   * @param item Original data item
   * @returns True if the item can be changed to 'checked'.
   */
  private canCheckItem(item: T): boolean {
    if (this.manageRelationships && this.isItemParent(item)) {
      return this.getItemChildren(item).some((child) => this.canCheckItem(child));
    }
    return this.isItemCheckable(item) && this.composer.getItemPropertyValue(item, 'selected') !== true;
  }

  /**
   * Determines whether the item is checked and can be changed to an unchecked state.
   * @param item Original data item
   * @returns True if the item can be changed to 'unchecked'.
   */
  private canUncheckItem(item: T): boolean {
    if (this.manageRelationships && this.isItemParent(item)) {
      return this.getItemChildren(item).some((child) => this.canUncheckItem(child));
    }
    return this.isItemCheckable(item) && this.composer.getItemPropertyValue(item, 'selected') === true;
  }

  /**
   * Makes an item visible
   * @param item Original data item
   * @returns {void}
   */
  private showItem(item: T): void {
    this.composer.setItemPropertyValue(item, 'hidden', false);
    this.updateItem(item); // Make sure the item is updated
  }

  /**
   * Hides an item from the visible collection
   * @param item Original data item
   * @returns {void}
   */
  private hideItem(item: T): void {
    this.composer.setItemPropertyValue(item, 'hidden', true);
  }

  /**
   * Forces a modification event, so that the renderer can update.
   * @param item Item of which to find path
   * @returns {void}
   */
  private forceUpdateOnPath(item: T): void {
    const path = [...this.getItemAncestors(item), item];
    path.forEach((item) => this.composer.updateItemTimestamp(item));
  }

  /**
   * TODO: find a way to keep `noRelation` of Tree & Tree Select component in-sync
   * Sets the mode (algorithm) the manager should use
   * @hidden Mode updating doesn't sync back up Tree component.
   * @param mode Tree manager mode
   * @returns {void}
   */
  public setMode(mode: TreeManagerMode): void {
    this.mode = mode;
    // Force update of all visible parent items, making sure any indeterminate states are remove.
    this.parentItems.forEach((item) => this.updateItem(item));
  }

  /**
   * Requests the item to be rerendered manually.
   * Typically, this is not required. The render is triggered automatically when item's property are updated.
   * @param item Original data item
   * @returns {void}
   */
  public updateItem(item: T): void {
    this.composer.updateItemTimestamp(item);
  }

  /**
   * Shows the item.
   * @hidden `hidden` usage in filterItems of Tree & Tree Select component conflicts with this API
   * @param item Original data item
   * @returns `True` if the item is newly included
   */
  public includeItem(item: T): boolean {
    const result = this.composer.unlockItem(item);
    this.showItem(item); // Item must be unlocked first
    return result;
  }

  /**
   * Hides the item.
   * @hidden `hidden` usage in filterItems of Tree & Tree Select component conflicts with this API
   * @param item Original data item
   * @returns `True` if the item is newly excluded
   */
  public excludeItem(item: T): boolean {
    this.hideItem(item);
    return this.composer.lockItem(item);
  }

  /**
   * Returns whether the selected state of item can be changed or not.
   * @param item Original data item
   * @returns `True` if the item is not disabled or readonly
   */
  public isItemCheckable(item: T): boolean {
    return (
      !this.composer.isItemLocked(item) &&
      this.composer.getItemPropertyValue(item, 'disabled') !== true &&
      this.composer.getItemPropertyValue(item, 'readonly') !== true
    );
  }

  /**
   * Returns the current expanded state of the item.
   * @param item Original data item
   * @returns `True` if the item is currently expanded so its children are visible.
   */
  public isItemExpanded(item: T): boolean {
    return this.isItemParent(item) && this.composer.getItemPropertyValue(item, 'expanded') === true;
  }

  /**
   * Returns whether the item contains any children or not.
   * @param item Original data item
   * @returns `True` if the item has children
   */
  public isItemParent(item: T): boolean {
    return this.composer.isItemParent(item);
  }

  /**
   * Returns whether the item has a parent or not.
   * @param item Original data item
   * @returns `True` if the item has a parent
   */
  public isItemChild(item: T): boolean {
    return this.composer.isItemChild(item);
  }

  /**
   * Return checked state of the item.
   * @param item Original data item
   * @returns item checked state: CHECKED (1), UNCHECKED (0), INDETERMINATE (-1)
   */
  public getItemCheckedState(item: T): CheckedState {
    if (this.isItemChecked(item)) {
      return CheckedState.CHECKED;
    }
    if (this.isItemCheckedIndeterminate(item)) {
      return CheckedState.INDETERMINATE;
    }
    return CheckedState.UNCHECKED;
  }

  /**
   * Returns all ancestors of the item.
   * @param item Original data item
   * @returns An array of ancestors
   */
  public getItemAncestors(item: T): readonly T[] {
    return this.composer.getItemAncestors(item);
  }

  /**
   * Returns all descendants of the item.
   * @param item Original data item
   * @param depth Specified depth of descendants to be retrieved.
   * @returns An array of descendants
   */
  public getItemDescendants(item: T, depth?: number): readonly T[] {
    return this.composer.getItemDescendants(item, depth);
  }

  /**
   * Returns the parent of the item, if it has one.
   * @param item Original data item
   * @returns Item parent or `null`
   */
  public getItemParent(item: T): T | null {
    return this.composer.getItemParent(item);
  }

  /**
   * Returns the children of the item as an array.
   * @param item Original data item
   * @returns An array of children
   */
  public getItemChildren(item: T): readonly T[] {
    return this.composer.getItemChildren(item);
  }

  /**
   * Expands the item to show its children.
   * @param item Original data item
   * @returns {void}
   */
  public expandItem(item: T): void {
    if (this.isItemParent(item)) {
      this.composer.setItemPropertyValue(item, 'expanded', true);
    }
  }

  /**
   * Collapses the item to hide its children.
   * @param item Original data item
   * @returns {void}
   */
  public collapseItem(item: T): void {
    if (this.isItemParent(item)) {
      this.composer.setItemPropertyValue(item, 'expanded', false);
    }
  }

  /**
   * Expands all items.
   * @returns {void}
   */
  public expandAllItems(): void {
    this.parentItems.forEach((item) => this.expandItem(item));
  }

  /**
   * Collapses all items.
   * @returns {void}
   */
  public collapseAllItems(): void {
    this.parentItems.forEach((item) => this.collapseItem(item));
  }

  /**
   * Selects the item.
   * @param item Original data item
   * @returns `True` if the item is modified
   */
  public checkItem(item: T): boolean {
    return this._checkItem(item);
  }
  private _checkItem(item: T, manageRelationships = this.manageRelationships): boolean {
    if (this.canCheckItem(item)) {
      // Create unique timestamp base on the latest selection for sequential selection.
      const timestamp = Date.now();
      this.lastSelectedAt =
        this.lastSelectedAt && this.lastSelectedAt >= timestamp ? this.lastSelectedAt + 1 : timestamp;

      // Set item selected with timestamp
      this.composer.setItemPropertyValue(item, 'selected', true);
      this.composer.setItemPropertyValue(item, 'selectedAt', this.lastSelectedAt);
      if (manageRelationships) {
        this.forceUpdateOnPath(item);
        this.getItemDescendants(item).forEach((descendant) => this._checkItem(descendant, false));
      }
      return true;
    }
    return false;
  }

  /**
   * Deselects the item.
   * @param item Original data item
   * @returns `True` if the item is modified
   */
  public uncheckItem(item: T): boolean {
    return this._uncheckItem(item);
  }
  private _uncheckItem(item: T, manageRelationships = this.manageRelationships): boolean {
    if (this.canUncheckItem(item)) {
      this.composer.setItemPropertyValue(item, 'selected', false);
      if (manageRelationships) {
        this.forceUpdateOnPath(item);
        this.getItemDescendants(item).forEach((descendant) => this._uncheckItem(descendant, false));
      }
      this.updateItem(item);
      return true;
    }
    return false;
  }

  /**
   * Toggle the selected state of the item.
   * @param item Original data item
   * @returns `true` if the item is modified successfully.
   */
  public toggleItem(item: T): boolean {
    return this.checkItem(item) || this.uncheckItem(item);
  }

  /**
   * Selects all items.
   * @returns {void}
   */
  public checkAllItems(): void {
    this.editableItems.forEach((item) => this.checkItem(item));
  }

  /**
   * Deselects all items.
   * @returns {void}
   */
  public uncheckAllItems(): void {
    // uncheck items from top levels when manage relationships to avoid redundant re-renders
    const items = this.manageRelationships ? this.composer.queryItems(() => true, 0) : this.checkedItems;
    items.forEach((item) => this.uncheckItem(item));
  }
}
