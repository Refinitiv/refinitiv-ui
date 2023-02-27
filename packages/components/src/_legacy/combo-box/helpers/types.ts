import type { DataItem } from '@refinitiv-ui/utils/collection.js';
import type { ItemData } from '../../item';

/**
 * Predicate callback
 * Matches item against filter function
 *
 * @param item Item to filter
 * @return Does item match filter
 */
export type ComboBoxFilter<T extends DataItem = ItemData> = (item: T) => boolean;

export type ComboBoxData<T extends DataItem = ItemData> = T[] | Promise<T[]>;
