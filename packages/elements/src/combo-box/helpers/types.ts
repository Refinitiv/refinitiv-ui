import { DataItem } from '@refinitiv-ui/utils';

/**
 * Predicate callback
 *
 * Matches item against filter function
 *
 * @param item Item to filter
 * @return Does item match filter
 */
export type ComboBoxFilter<T extends DataItem> = (item: T) => boolean;


export type ComboBoxData<T> = T[] | Promise<T[]>;
