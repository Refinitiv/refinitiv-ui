import { EventEmitter } from '../event/event-emitter';
import { MicroTaskRunner } from '../async/micro-task-runner';
import { CollectionItem } from './collection-item';
import { flatten } from './flatten';

/**
 * Item which can be indexed by a string key
 */
interface IndexableItem {
  [index: string]: unknown;
}

/**
 * Internal query engine for returning all items.
 * Used for gathering items at specific depths.
 * @returns `true`
 */
const QUERY_ALL = (): true => true;

/**
 * Manages boolean states of a data collection,
 * toggling various item options in the most performant way possible.
 */
export class CollectionComposer<T extends CollectionItem = CollectionItem> extends EventEmitter {

  /**
   * The original data which is
   * passed into the constructor.
   */
  private readonly data: T[];

  private depths!: number[];

  /**
   * Scheduler used to emit events.
   */
  private emitter = new MicroTaskRunner();

  /**
   * Emits a modification event when
   * something has changed in the collection
   * @returns {void}
   */
  private emitModification = (): void => this.emit('modification', undefined);

  /**
   * Current key index to use for creating item keys.
   */
  private key = 0;

  /**
   * Items keys used for modifications.
   * Composite keys are created, using item key + property name.
   */
  private keys = new Map<T, string>();

  /**
   * Storage location for property changes.
   */
  private modifications = new Map<string, unknown>();

  /**
   * Initialisation timestamp
   */
  private timestamp = performance.now();

  /**
   * Storage location for change timestamps.
   */
  private timestamps = new Map<T, number>();

  /**
   * Collection of locked items
   */
  private vault = new Set<T>();

  constructor (data: T[] | CollectionComposer<T>) {
    super();
    if (data instanceof CollectionComposer) {
      this.data = this.clone(data);
    }
    else if (Array.isArray(data)) {
      this.data = data.slice();
    }
    else {
      throw new Error('CollectionComposer expects an array of data');
    }
  }

  /**
   * Returns the top level items only.
   * To get nested levels, use `getItemChildren()`.
   */
  private get topLevelItems (): readonly T[] {
    return this.queryItems(QUERY_ALL, 0);
  }

  /**
   * Collection of all items.
   * @returns Collection of data items
   */
  private get items (): T[] {
    if (!this._items) {
      const { items, depths } = flatten(this.data);
      this._items = items;
      this.depths = depths;
    }
    return this._items;
  }
  private _items?: T[];

  /**
   * Returns the size of the collection.
   * Nested structures will include all descendants.
   */
  public get size (): number {
    return this.items.length;
  }

  /**
   * Updates item timestamp and emits a modification event
   * @param item Original data item
   * @returns {void}
   */
  private registerItemModification (item: T): void {
    this.timestamps.set(item, performance.now());
    this.emitter.schedule(this.emitModification);
  }

  /**
   * Clones a composer instance,
   * copying data over into the current instance.
   * @param composer Composer to clone
   * @returns Copy of the original composer's data object
   */
  private clone (composer: CollectionComposer<T>): T[] {
    this._items = composer._items?.slice();
    this.depths = composer.depths?.slice();
    this.key = composer.key;
    this.keys = new Map(composer.keys);
    this.modifications = new Map(composer.modifications);
    this.timestamps = new Map(composer.timestamps);
    this.timestamp = composer.timestamp;
    this.vault = new Set(this.vault);
    return composer.data.slice();
  }

  /**
   * Returns the modification key for the item
   * @param item Original data item
   * @returns Unique item key
   */
  private getItemKey (item: T): string {
    if (!this.keys.has(item)) {
      const key = (this.key += 1).toString(36) + '.';
      this.keys.set(item, key);
    }
    return this.keys.get(item) as string;
  }

  /**
   * Returns the modification key for the item property
   * @param item Original data item
   * @param property Property name
   * @returns Unique item property key
   */
  private getItemPropertyKey<K extends keyof T> (item: T, property: K): string {
    return this.getItemKey(item) + property;
  }

  /**
   * Checks to see if the item is included in the composer
   * @param item Original data item to check
   * @returns True, if the item is valid.
   */
  private isValidItem (item: T): boolean {
    return this.items.includes(item);
  }

  /**
   * Checks to see if the item isn't included in the composer
   * @param item Original data item to check
   * @returns True, if the item is invalid.
   */
  private isInvalidItem (item: T): boolean {
    return !this.isValidItem(item);
  }

  /**
   * Gets the index range of the item.
   * This includes the indexes of all descendants.
   * @param item Original data item
   * @returns Start and end index range of item and descendants
   */
  private getItemIndexRange (item: T): { startIndex: number; endIndex: number } {
    const startIndex = this.items.indexOf(item);
    const endIndex = startIndex + this.getItemDescendants(item).length;
    return { startIndex, endIndex };
  }

  /**
   * Add a new item at a specified index with a specified depth
   * @param item Data item to add
   * @param index Index to place the item
   * @param [depth=0] Depth of the item
   * @returns {void}
   */
  private addItemAtIndex (item: T, index = this.items.length, depth = 0): void {
    this.items.splice(index, 0, item);
    this.depths.splice(index, 0, depth);
  }

  /**
   * Removes an item at a specific index
   * @param index Index to remove from the collection
   * @returns {void}
   */
  private removeItemAtIndex (index: number): void {
    this.items.splice(index, 1);
    this.depths.splice(index, 1);
  }

  /**
   * Add new item to the main collection
   * @param item New data item
   * @return {void}
   */
  public addItem (item: T): void
  /**
   * Add new item to the main collection at a specific index
   * @param item New data item
   * @param index Index location to add the item
   * @return {void}
   */
  public addItem (item: T, index: number): void
  /**
   * Add new item to a parent collection
   * @param item New data item
   * @param parent Parent to add the item to
   * @return {void}
   */
  public addItem (item: T, parent: T): void
  /**
   * Add new item to a parent collection at a specific index
   * @param item New data item
   * @param parent Parent to add the item to
   * @param index Index location to add the item
   * @return {void}
   */
  public addItem (item: T, parent: T, index: number): void
  public addItem (item: T, parentOrIndex?: T | number, index: number = parentOrIndex as number): void {
    const parent = parentOrIndex && typeof parentOrIndex !== 'number' ? parentOrIndex : null;
    if (parent && this.isInvalidItem(parent)) {
      throw new Error('parent item does not belong to this composer');
    }
    /**
     * Collection of where the item should sit.
     */
    const collection = parent ? this.getItemChildren(parent) : this.topLevelItems;
    /**
     * Index of where to place the item in the collection.
     */
    const collectionIndex = typeof index === 'number' ? index : collection.length;
    /**
     * Sibling to insert before, if any.
     */
    const insertBefore = collection[collectionIndex];
    /**
     * Index of the parent item, if available.
     */
    const parentIndex = parent ? this.items.indexOf(parent) : -1;
    /**
     * Depth of the parent, if available.
     */
    const parentDepth = this.depths[parentIndex];
    /**
     * Depth of the child item.
     */
    const childDepth = parent ? parentDepth + 1 : 0;

    if (insertBefore) {
      // inserts the item in front of a sibling
      index = this.items.indexOf(insertBefore);
    }
    else if (parent) {
      // inserts an item at the end of the parent's items collection
      index = this.getItemIndexRange(parent).endIndex + 1;
    }
    else {
      // adds the item to the end of the collection (default)
      index = this.items.length;
    }

    this.addItemAtIndex(item, index, childDepth);
    this.registerItemModification(item);
  }
  
  /**
   * Removes a data item from the composer
   * @param item Data item to remove
   * @returns {void}
   */
  public removeItem (item: T): void {
    if (this.isInvalidItem(item)) {
      return;
    }
    for (const child of this.getItemChildren(item)) {
      this.removeItem(child);
    }
    this.removeItemAtIndex(this.items.indexOf(item));
    this.unlockItem(item); // Make sure the item is removed from vault
    this.removeItem(item); // Removes any silly multiple references
  }

  /**
   * Locks the item in the vault.
   * This prevents any future modifications.
   * @param item Original data item
   * @returns Whether the item was added or not
   */
  public lockItem (item: T): boolean {
    if (!this.vault.has(item)) {
      this.vault.add(item);
      this.registerItemModification(item);
      return true;
    }
    return false;
  }

  /**
   * Unlocks the item from the vault.
   * This enables any future modifications.
   * @param item Original data item
   * @returns Whether the item was removed or not
   */
  public unlockItem (item: T): boolean {
    if (this.vault.has(item)) {
      this.vault.delete(item);
      this.registerItemModification(item);
      return true;
    }
    return false;
  }

  /**
   * Determines if the item is locked.
   * @param item Original data item
   * @returns Locked state
   */
  public isItemLocked (item: T): boolean {
    return this.vault.has(item);
  }

  /**
   * Determines if the item has children
   * and is therefore a parent item.
   * @param item Original data item
   * @returns Whether the item is a parent or not
   */
  public isItemParent (item: T): boolean {
    const index = this.items.indexOf(item);
    const depth = this.depths[index];
    const nextDepth = this.depths[index + 1];
    return depth < nextDepth;
  }

  /**
   * Determines if the item has a parent
   * and is therefore a child item.
   * @param item Original data item
   * @returns Whether the item is a child or not
   */
  public isItemChild (item: T): boolean {
    return this.getItemDepth(item) > 0;
  }

  /**
   * Gets the property value of an item
   * @param item Original data item
   * @param property Property name to get the value of
   * @returns Value of the property
   */
  public getItemPropertyValue<K extends keyof T> (item: T, property: K): T[K] {
    let key = '';
    if (this.keys.has(item)) {
      key = this.getItemPropertyKey(item, property);
    }
    if (key && this.modifications.has(key)) {
      return this.modifications.get(key) as T[K];
    }
    return (item as T & IndexableItem)[property];
  }

  /**
   * Sets the property value of an item
   * @param item Original data item
   * @param property Property name to set the value of
   * @param value New value of the property
   * @returns {void}
   */
  public setItemPropertyValue<K extends keyof T> (item: T, property: K, value: T[K]): void {
    if (this.isItemLocked(item)) {
      return; // do not modify a locked item
    }
    if (property === 'items') {
      throw new Error('\'items\' property is protected and cannot be set');
    }
    const key = this.getItemPropertyKey(item, property);
    const currentValue = this.getItemPropertyValue(item, property);
    if (currentValue !== value) {
      this.modifications.set(key, value);
      this.registerItemModification(item);
    }
  }

  /**
   * Gets the nested depth of the item.
   * @param item Original data item
   * @returns Depth of item
   */
  public getItemDepth (item: T): number {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      return this.depths[index];
    }
    return NaN;
  }

  /**
   * Gets the timestamp of when the item was last updated.
   * If no updates have occurred, the timestamp of composer creation is returned instead.
   * @param item Original data item
   * @returns Item timestamp
   */
  public getItemTimestamp (item: T): number {
    return this.timestamps.get(item) || this.timestamp;
  }

  /**
   * Updates the item timestamp,
   * causing an item modification without changing any properties.
   * @param item Original data item
   * @returns Latest item timestamp
   */
  public updateItemTimestamp (item: T): number {
    this.registerItemModification(item);
    return this.getItemTimestamp(item);
  }

  /**
   * Gets all items with a matching property value
   * @param property Property name
   * @param value Value to compare against
   * @param [depth=0] Depth of nested data to include
   * @returns Matched items
   */
  public queryItemsByPropertyValue<K extends keyof T> (property: K, value: T[K], depth = 0): readonly T[] {
    const result: T[] = [];
    for (let i = 0; i < this.items.length; i += 1) {
      const item = this.items[i];
      const itemDepth = this.depths[i];
      itemDepth <= depth && this.getItemPropertyValue(item, property) === value && result.push(item);
    }
    return Object.freeze(result);
  }

  /**
   * Query items, return results which are matched
   * against the comparison engine.
   * @param engine Comparison engine for matching results
   * @param [depth=0] Depth of nested data to include
   * @returns Matched items
   */
  public queryItems (engine: (item: T, composer: CollectionComposer<T>) => boolean, depth = 0): readonly T[] {
    const result: T[] = [];
    for (let i = 0; i < this.items.length; i += 1) {
      const item = this.items[i];
      const itemDepth = this.depths[i];
      itemDepth <= depth && engine(item, this) && result.push(item);
    }
    return Object.freeze(result);
  }

  /**
   * Gets the item parent, if available.
   * @param item Original data item
   * @returns The parent data item, or, `null`.
   */
  public getItemParent (item: T): T | null {
    let index = this.items.indexOf(item);
    while (index > 0) {
      const next = this.items[index -= 1];
      if (next.items?.includes(item)) {
        return next;
      }
    }
    return null;
  }

  /**
   * Gets the list of item ancestors.
   * @param item Original data item
   * @returns Array of data items in the order of shallowest to deepest
   */
  public getItemAncestors (item: T): readonly T[] {
    const result = [];
    let parent = this.getItemParent(item);
    while (parent) {
      result.unshift(parent);
      parent = this.getItemParent(parent);
    }
    return Object.freeze(result);
  }

  /**
   * Gets the list of item siblings.
   * @param item Original data item
   * @returns Array of sibling data items
   */
  public getItemSiblings (item: T): readonly T[] {
    let result: T[] = [];
    const parent = this.getItemParent(item);
    if (parent) {
      result = this.getItemChildren(parent).slice();
      result.splice(result.indexOf(item), 1);
    }
    else if (this.items.includes(item)) {
      result = this.topLevelItems.slice();
      result.splice(result.indexOf(item), 1);
    }
    return Object.freeze(result);
  }

  /**
   * Gets the list of item children.
   * @param item Original data item
   * @returns Array of child data items
   */
  public getItemChildren (item: T): readonly T[] {
    return this.getItemDescendants(item, 1);
  }

  /**
   * Gets the list of item descendants.
   * @param item Original data item
   * @param [depth=Infinity] Depth of nested data to include
   * @returns Array of data items in the order of shallowest to deepest
   */
  public getItemDescendants (item: T, depth = Infinity): readonly T[] {
    const result = [];
    /**
     * Parent index, if available.
     */
    const parentIndex = this.items.indexOf(item);
    /**
     * Parent depth, if available.
     */
    const parentDepth = this.depths[parentIndex];
    /**
     * Max depth
     */
    const maxDepth = parentDepth + depth;
    /**
     * Index to start retrieving descendants
     */
    const startIndex = parentIndex + 1;
    
    for (let i = startIndex; i > 0 && i < this.items.length; i += 1) {
      const depth = this.depths[i];
      if (depth <= parentDepth) {
        break;
      }
      if (depth <= maxDepth) {
        result.push(this.items[i]);
      }
    }

    return Object.freeze(result);
  }
}
