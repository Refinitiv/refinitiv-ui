import type { CollectionComposer, DataItem } from '@refinitiv-ui/utils/lib/collection.js';
import type { ItemData } from '../../item';

export type ListData<T extends DataItem = ItemData> = T[] | CollectionComposer<T> | null;
