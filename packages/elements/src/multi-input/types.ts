import { CollectionItem } from '@refinitiv-ui/utils';

export type MultiInputEvents = 'item-added' | 'item-removed' | 'item-error';

export interface MultiDataItem extends CollectionItem {
  value: string;
  label: string;
  id?: string;
  readonly?: boolean;
  disabled?: boolean;
}
