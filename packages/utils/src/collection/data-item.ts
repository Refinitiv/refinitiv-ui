import { CollectionItem } from './collection-item.js';

/**
 * Basic-level data item,
 * used for all elements which accept a `data` property
 */
export interface DataItem extends CollectionItem {
  /**
   * Value of the data item.
   * This is usually the value which is returned,
   * when the item is selected.
   */
  value?: string;
  /**
   * Whether to show or hide
   * the item from the renderer.
   */
  hidden?: boolean;
  /**
   * Sets the item to be readonly.
   * Read only items cannot be selected by a user.
   */
  readonly?: boolean;
  /**
   * Sets the highlight state of the item.
   * This is usually used for navigating over items,
   * without affecting focus, or, highlighting a multiple selection.
   */
  highlighted?: boolean;
  /**
   * Sets the selection state of the item.
   * This is usually used for returning selected values.
   */
  selected?: boolean;
  /**
   * Sets the item to be disabled.
   * This completely prevents the
   * item from being interacted with.
   */
  disabled?: boolean;
}
