import type { CollectionComposer, TreeDataItem } from '@refinitiv-ui/utils/collection.js';

type TreeData<T extends TreeDataItem = TreeDataItem> = T[] | CollectionComposer<T> | null;

/**
 * Predicate callback
 * Matches item against filter function
 *
 * @param item Item to filter
 * @return Does item match filter
 */
type TreeFilter<T extends TreeDataItem = TreeDataItem> = (item: T) => boolean;

export type { TreeDataItem, TreeFilter, TreeData };
