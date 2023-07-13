import type { ItemData } from '../../item';
import type { CollectionComposer, DataItem } from '@refinitiv-ui/utils/collection.js';

export type ListData<T extends DataItem = ItemData> = T[] | CollectionComposer<T> | null;
