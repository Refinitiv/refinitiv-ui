import { CollectionComposer, DataItem } from '@refinitiv-ui/utils';
import { ItemData } from '../../item';

export type ListData<T extends DataItem = ItemData> = T[] | CollectionComposer<T> | null;
