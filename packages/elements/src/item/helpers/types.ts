import type { DataItem } from '@refinitiv-ui/utils/collection.js';

export type ItemType = 'text' | 'header' | 'divider';

interface CommonItem extends DataItem {
  /**
   * Type of item. Value can be `text`, `header`, `divider`
   */
  type?: ItemType;
}

interface CommonLabelItem extends CommonItem {
  /**
   * The text for the label indicating the meaning of the item.
   */
  label: string;
  /**
   * Set the icon name from the ef-icon list
   */
  icon?: string;
  /**
   * Set the tooltip text
  */
  tooltip?: string;
}

/**
 * Maps to a text/generic type ef-item
 */
export interface ItemText extends CommonLabelItem {
  type?: 'text';
  /**
   * Value of the item
   */
  value: string;
  /**
   * The`subLabel` property represents the text beneath the label
   */
  subLabel?: string;
  /**
   * Specifies which element an item is bound to
   */
  for?: string;
}

/**
 * Maps to `ef-item[type=header]`
 */
export interface ItemHeader extends CommonLabelItem {
  type: 'header';
}

/**
 * Maps to `ef-item[type=divider]`
 */
export interface ItemDivider extends CommonItem {
  type: 'divider';
}

/**
 * Used to construct a collection of items
 */
export type ItemData = ItemText | ItemHeader | ItemDivider;
