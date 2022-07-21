import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { Item } from '../../item/index.js';

/**
 * Extending from Item Class to provide ability to override tabIndex
 */
@customElement('ef-list-item')
export class ListItem extends Item {
  /**
   * Overriding Item tabIndex value, list should have only one focusable point.
   */
  protected readonly defaultTabIndex: number | null = null;
}

declare global {
  interface HTMLElementTagNameMap {
    'ef-list-item': ListItem;
  }
}

