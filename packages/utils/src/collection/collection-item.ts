/**
 * Low-level collection item.
 * This is the most basic type of object
 * that can be passed to the collection composer.
 */
export interface CollectionItem {
  /**
   * Additional keys which are forcefully injected into the item
   * will be allowed for flexibility, but will return an `unknown` type.
   */
  [key: string]: unknown;
  /**
   * Child items collection.
   * Used for nested data structures.
   * Override this property in sub interfaces with their own type to ensure nested type checking.
   * For example, `MyCollectionItem extends CollectionItem { items?: MyCollectionItem[]; }`
   */
  items?: CollectionItem[];
}
