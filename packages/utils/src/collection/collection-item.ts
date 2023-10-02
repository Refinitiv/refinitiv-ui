/**
 * Low-level collection item.
 * This is the most basic type of object
 * that can be passed to the collection composer.
 */
export interface CollectionItem extends NestedItems<CollectionItem> {
  /**
   * Additional keys which are forcefully injected into the item
   * will be allowed for flexibility, but will return an `unknown` type.
   */
  [key: string]: unknown;
}

export interface NestedItems<T extends CollectionItem> {
  /**
   * Child items collection.
   * Used for nested data structures.
   */
  items?: T[];
}
