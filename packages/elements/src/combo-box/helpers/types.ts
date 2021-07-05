import { DataItem } from '@refinitiv-ui/utils';
import { ItemData } from '../../item';

/**
 * Predicate callback
 * Matches item against filter function
 *
 * @param item Item to filter
 * @return Does item match filter
 */
export type ComboBoxFilter<T extends DataItem = ItemData> = (item: T) => boolean;

export type ComboBoxData<T extends DataItem = ItemData> = T[] | Promise<T[]>;
