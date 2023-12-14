import type { CollectionComposer, TreeDataItem } from '@refinitiv-ui/utils/collection.js';

export type TreeData<T extends TreeDataItem = TreeDataItem> = T[] | CollectionComposer<T> | null;
export type { TreeDataItem } from '@refinitiv-ui/utils/collection.js';

/**
 * Predicate callback
 * Matches item against filter function
 *
 * @param item Item to filter
 * @return Does item match filter
 */
export type TreeFilter<T extends TreeDataItem = TreeDataItem> = (item: T) => boolean;
