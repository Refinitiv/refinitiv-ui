import { CollectionComposer, DataItem } from '@refinitiv-ui/utils';

export type TreeData<T extends TreeDataItem = TreeDataItem> = T[] | CollectionComposer<T> | null;

export interface TreeDataItem extends DataItem {
  /**
   * Label to show, when rendering the item.
   */
  label?: string;
  /**
   * Expanded state of child items.
   * If `true`, child items will be visible
   */
  expanded?: boolean;
}
