import { DataItem } from './data-item.js';

export interface TreeDataItem extends DataItem {
  /**
   * Icon to show, when rendering the item.
   */
  icon?: string;

  /**
   * Label to show, when rendering the item.
   */
  label?: string;

  /**
   * Expanded state of child items.
   * If `true`, child items will be visible
   */
  expanded?: boolean;

  /**
   * Used for nested TreeDataItem.
   */
  items?: TreeDataItem[];
}
