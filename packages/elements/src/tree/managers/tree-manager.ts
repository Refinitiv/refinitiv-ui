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

  // a cache map  of tree node improving performance
  private treeNodeCache = new Map<T, TreeNode<T>>();

  constructor(input: T[] | CollectionComposer<T>, mode = TreeManagerMode.RELATIONAL) {
    this.composer = input instanceof CollectionComposer ? input : new CollectionComposer(input);
    this.mode = mode;
  }

  /**
   * return all items as an array of TreeNode
   * @returns TreeNode<T>[]
   */
  public getTreeNodes(): TreeNode<T>[] {
    const result: TreeNode<T>[] = [];
    for (const item of this.items) {
      if (this.treeNodeCache.has(item)) {
        result.push(this.treeNodeCache.get(item) as TreeNode<T>);
        continue;
      }
      const treeNode = new TreeNode<T>(item, this);
      this.treeNodeCache.set(item, treeNode);
      result.push(treeNode);
    }
    return result;
  }

  /**
   * return TreeNode from an item
   * The main use case would be custom renderer implementation
   * @param item T
   * @returns TreeNode<T>[]
   */
  public getTreeNode(item: T): TreeNode<T> | null {
    if (this.treeNodeCache.has(item)) {
      return this.treeNodeCache.get(item) as TreeNode<T>;
    }

    const existingItems = this.composer.queryItems((_item: T) => item === _item);
    if (existingItems.length === 0) {
      return null;
    }

    const treeNode = new TreeNode<T>(item, this);
    this.treeNodeCache.set(item, treeNode);
    return treeNode;
  }

  // /**
  //  * add new item to `TreeManager` and return TreeNode for easy item management
  //  * @param {T} item an item to be added to `TreeManager`
  //  * @param {T | TreeNode<T>=} parent parent of the item
  //  * @param {number=} index index which the item should be added to
  //  * @returns TreeNode<T>
  //  */
  // public addItem(item: T, parent?: T | TreeNode<T>, index?: number): TreeNode<T> {
  //   if (parent instanceof TreeNode<T>) {
  //     return parent.addChild(item, index);
  //   }
  //   // TODO: find a better way resolving overload type issue
  //   if (parent && index !== undefined) {
  //     this.composer.addItem(item, parent, index);
  //   } else if (parent && index === undefined) {
  //     this.composer.addItem(item, parent);
  //   } else if (!parent && index !== undefined) {
  //     this.composer.addItem(item, index);
  //   } else {
  //     this.composer.addItem(item);
  //   }
  //   // force rerender the parent as it might become a parent for the first time
  //   if (parent instanceof TreeNode<T>) {
  //     parent.rerender();
  //   } else if (parent) {
  //     this.updateItem(parent);
  //   }

  //   const treeNode = new TreeNod<T>(item, this);
  //   this.treeNodeCache.set(item, treeNode);
  //   return treeNode;
  // }

  // public removeItem(item: T | TreeNode<T>) {
  //   if (item instanceof TreeNode<T>) {
  //     item.remove();
  //     return;
  //   }

  //   const parent = this.getItemParent(item);
  //   // Root item removal must be hidden first to trigger rerendering.
  //   // so that composer.unlock() would be called triggers rerender with timestamp update.
  //   // TODO: Is there a better way to do this? Simply trigger rerender?
  //   if (!parent) {
  //     this.excludeItem(item);
  //   }
  //   this.composer.removeItem(item);
  //   this.treeNodeCache.delete(item);
  //   // force rerender the parent as it might not be a parent anymore
  //   if (parent) {
  //     this.updateItem(parent);
  //   }
  // }

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
   * Return all items which have children
   */
  private get parentItems(): readonly T[] {
    return this.items.filter((item) => this.isItemParent(item));
  }

  /**
   * Returns all checked items.
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
   * Items which should be visibly displayed.
   * This can be used to render items.
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
   * Items which should be visibly displayed.
   * This can be used to render items.
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
   * Updates the data item, forcing a render
   * @param item Original data item
   * @returns {void}
   */
  public updateItem(item: T): void {
    this.composer.updateItemTimestamp(item);
  }

  /**
   * Includes an item as part of the tree.
   * @hidden `hidden` usage in filterItems of Tree component conflicts with this API
   * @param item Item to include
   * @returns `True` if the item is newly included
   */
  public includeItem(item: T): boolean {
    const result = this.composer.unlockItem(item);
    this.showItem(item); // Item must be unlocked first
    return result;
  }

  /**
   * Excludes an item as part of the tree.
   * @hidden `hidden` usage in filterItems of Tree component conflicts with this API
   * @param item Item to exclude
   * @returns `True` if the item is newly excluded
   */
  public excludeItem(item: T): boolean {
    this.hideItem(item);
    return this.composer.lockItem(item);
  }

  /**
   * Is the item checkable?
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
   * Is the item expanded?
   * @param item Original data item
   * @returns `True` if the item is expanded and its children should be visible
   */
  public isItemExpanded(item: T): boolean {
    return this.isItemParent(item) && this.composer.getItemPropertyValue(item, 'expanded') === true;
  }

  /**
   * Is the item a parent?
   * @param item Original data item
   * @returns `True` if the item has children
   */
  public isItemParent(item: T): boolean {
    return this.composer.isItemParent(item);
  }

  /**
   * Is the item a child?
   * @param item Original data item
   * @returns `True` if the item has a parent
   */
  public isItemChild(item: T): boolean {
    return this.composer.isItemChild(item);
  }

  /**
   * Calculates the checked stated of the item
   * @param item Original data item
   * @returns Checked state of the item
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
   * Gets an item's ancestors
   * @param item Original data item
   * @returns A list of ancestors
   */
  public getItemAncestors(item: T): readonly T[] {
    return this.composer.getItemAncestors(item);
  }

  /**
   * Gets an item's descendants
   * @param item Original data item
   * @param depth Depth to retrieve
   * @returns A list of descendants
   */
  public getItemDescendants(item: T, depth?: number): readonly T[] {
    return this.composer.getItemDescendants(item, depth);
  }

  /**
   * Gets an item's parent, if it has one.
   * @param item Original data item
   * @returns Item parent or `null`
   */
  public getItemParent(item: T): T | null {
    return this.composer.getItemParent(item);
  }

  /**
   * Gets an item's child collection
   * @param item Original data item
   * @returns A list of children
   */
  public getItemChildren(item: T): readonly T[] {
    return this.composer.getItemChildren(item);
  }

  /**
   * Expand an item to show its children
   * @param item Original data item
   * @returns {void}
   */
  public expandItem(item: T): void {
    if (this.isItemParent(item)) {
      this.composer.setItemPropertyValue(item, 'expanded', true);
    }
  }

  /**
   * Collapse an item to hide its children
   * @param item Original data item
   * @returns {void}
   */
  public collapseItem(item: T): void {
    if (this.isItemParent(item)) {
      this.composer.setItemPropertyValue(item, 'expanded', false);
    }
  }

  /**
   * Expands all items in the tree
   * @returns {void}
   */
  public expandAllItems(): void {
    this.parentItems.forEach((item) => this.expandItem(item));
  }

  /**
   * Collapses all items in the tree
   * @returns {void}
   */
  public collapseAllItems(): void {
    this.parentItems.forEach((item) => this.collapseItem(item));
  }

  /**
   * Checks the item
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
   * Unchecks the item
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
   * Toggles the item checked state
   * @param item Original data item
   * @returns `True` if the item is modified
   */
  public toggleItem(item: T): boolean {
    return this.checkItem(item) || this.uncheckItem(item);
  }

  /**
   * Checks all items
   * @returns {void}
   */
  public checkAllItems(): void {
    this.editableItems.forEach((item) => this.checkItem(item));
  }

  /**
   * Unchecks all items
   * @returns {void}
   */
  public uncheckAllItems(): void {
    // uncheck items from top levels when manage relationships to avoid redundant re-renders
    const items = this.manageRelationships ? this.composer.queryItems(() => true, 0) : this.checkedItems;
    items.forEach((item) => this.uncheckItem(item));
  }
}
