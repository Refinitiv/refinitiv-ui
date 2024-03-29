import type { CollectionComposer, DataItem } from '@refinitiv-ui/utils/collection.js';

import type { ItemData } from '../../item';
import type { TreeManager } from '../../tree';

/**
 * Predicate callback
 * Matches item against filter function
 *
 * @param item Item to filter
 * @return Does item match filter
 */
export type ComboBoxFilter<T extends DataItem = ItemData> = (
  item: T,
  context?: CollectionComposer<T> | TreeManager<T>
) => boolean;

export type ComboBoxData<T extends DataItem = ItemData> = T[] | Promise<T[]>;
