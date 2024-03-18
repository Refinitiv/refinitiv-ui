import type { CollectionComposer, DataItem } from '@refinitiv-ui/utils/collection.js';

export type TreeData<T extends TreeDataItem = TreeDataItem> = T[] | CollectionComposer<T> | null;

export interface TreeDataItem extends DataItem {
  /**
   * Icon to show, when rendering the item.
   */
  icon?: string;

  /**
   * Label to show, when rendering the item.
   */
  label?: string;

  /**
   * Expanded state of child items.
   * If `true`, child items will be visible
   */
  expanded?: boolean;

  /**
   * Used for nested TreeDataItem.
   */
  items?: TreeDataItem[];
}

/**
 * Predicate callback
 * Matches item against filter function
 *
 * @param item Item to filter
 * @return Does item match filter
 */
export type TreeFilter<T extends TreeDataItem = TreeDataItem> = (
  item: T,
  composer: CollectionComposer<T>
) => boolean;
