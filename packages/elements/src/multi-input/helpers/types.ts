import { CollectionItem } from '@refinitiv-ui/utils';

export type SelectionIndex = number | null;

export type MultiInputEvents = 'item-added' | 'item-removed' | 'item-error';

export type MultiInputData = MultiInputDataItem[];
export interface MultiInputDataItem extends CollectionItem {
  value: string;
  label: string;
  id?: string;
  readonly?: boolean;
  disabled?: boolean;
}
