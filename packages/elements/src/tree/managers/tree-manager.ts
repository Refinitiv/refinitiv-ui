import type { CollectionComposer } from '@refinitiv-ui/utils/collection.js';

import type { TreeDataItem } from '../helpers/types';

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

  /**
   * @param composer CollectionComposer to be managed.
   * @param mode TreeManager mode which is Relational or Independent.
   */
  constructor(composer: CollectionComposer<T>, mode = TreeManagerMode.RELATIONAL) {
    this.composer = composer;
    this.mode = mode;
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
   * Return all items which have children
   */
  private get parentItems(): readonly T[] {
    return this.items.filter((item) => this.isItemParent(item));
  }

  /**
   * Returns selected items which selected property is true.
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
   * Returns items which selected prop can be changed.
   * The items don't include hided, disabled, readonly.
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
   * Returns current displayed items.
   * The items don't include hided, and children of unexpanded parent.
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
   * Sets the mode (algorithm) the manager should use
   * @param mode Tree manager mode
   * @returns {void}
   */
  public setMode(mode: TreeManagerMode): void {
    this.mode = mode;
    // Force update of all visible parent items, making sure any indeterminate states are remove.
    this.parentItems.forEach((item) => this.updateItem(item));
  }

  /**
   * Call to update the data item and emit event to render
   * @param item Original data item
   * @returns {void}
   */
  public updateItem(item: T): void {
    this.composer.updateItemTimestamp(item);
  }

  /**
   * Set hidden property of the item to false.
   * @param item Item to include
   * @returns `True` if the item is newly included
   */
  public includeItem(item: T): boolean {
    const result = this.composer.unlockItem(item);
    this.showItem(item); // Item must be unlocked first
    return result;
  }

  /**
   * Set hidden property of the item to true.
   * @param item Item to exclude
   * @returns `True` if the item is newly excluded
   */
  public excludeItem(item: T): boolean {
    this.hideItem(item);
    return this.composer.lockItem(item);
  }

  /**
   * Return if the selected property of item can be changed.
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
   * Return if the expanded property of item is true.
   * @param item Original data item
   * @returns `True` if the item is expanded and its children should be visible
   */
  public isItemExpanded(item: T): boolean {
    return this.isItemParent(item) && this.composer.getItemPropertyValue(item, 'expanded') === true;
  }

  /**
   * Returns if the item contains the child items.
   * @param item Original data item
   * @returns `True` if the item has children
   */
  public isItemParent(item: T): boolean {
    return this.composer.isItemParent(item);
  }

  /**
   * Returns if the item direct to the another item.
   * @param item Original data item
   * @returns `True` if the item has a parent
   */
  public isItemChild(item: T): boolean {
    return this.composer.isItemChild(item);
  }

  /**
   * Returns state which is selected, deselected or intermediate.
   * @param item Original data item
   * @returns Selected state of the item
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
   * Returns all parents items of the item.
   * @param item Original data item
   * @returns A list of ancestors
   */
  public getItemAncestors(item: T): readonly T[] {
    return this.composer.getItemAncestors(item);
  }

  /**
   * Returns all children items related to the item.
   * @param item Original data item
   * @param depth Depth to retrieve
   * @returns A list of descendants
   */
  public getItemDescendants(item: T, depth?: number): readonly T[] {
    return this.composer.getItemDescendants(item, depth);
  }

  /**
   * Returns the one upper level parents of the item.
   * @param item Original data item
   * @returns Item parent or `null`
   */
  public getItemParent(item: T): T | null {
    return this.composer.getItemParent(item);
  }

  /**
   * Returns the first depth children of the item.
   * @param item Original data item
   * @returns A list of children
   */
  public getItemChildren(item: T): readonly T[] {
    return this.composer.getItemChildren(item);
  }

  /**
   * Set expanded property of the item to true.
   * @param item Original data item
   * @returns {void}
   */
  public expandItem(item: T): void {
    if (this.isItemParent(item)) {
      this.composer.setItemPropertyValue(item, 'expanded', true);
    }
  }

  /**
   * Set expanded property of the item to false.
   * @param item Original data item
   * @returns {void}
   */
  public collapseItem(item: T): void {
    if (this.isItemParent(item)) {
      this.composer.setItemPropertyValue(item, 'expanded', false);
    }
  }

  /**
   * Set expanded property of all items to true.
   * @returns {void}
   */
  public expandAllItems(): void {
    this.parentItems.forEach((item) => this.expandItem(item));
  }

  /**
   * Set expanded property of all items to false.
   * @returns {void}
   */
  public collapseAllItems(): void {
    this.parentItems.forEach((item) => this.collapseItem(item));
  }

  /**
   * Set selected property of the item to true.
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
   * Set selected property of the item to false.
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
   * Switch selected property of the item to true or false.
   * @param item Original data item
   * @returns `True` if the item is modified
   */
  public toggleItem(item: T): boolean {
    return this.checkItem(item) || this.uncheckItem(item);
  }

  /**
   * Set selected property of all items to true.
   * @returns {void}
   */
  public checkAllItems(): void {
    this.editableItems.forEach((item) => this.checkItem(item));
  }

  /**
   * Set selected property of all items to false.
   * @returns {void}
   */
  public uncheckAllItems(): void {
    // uncheck items from top levels when manage relationships to avoid redundant re-renders
    const items = this.manageRelationships ? this.composer.queryItems(() => true, 0) : this.checkedItems;
    items.forEach((item) => this.uncheckItem(item));
  }
}
