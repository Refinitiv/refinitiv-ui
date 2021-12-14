import type { CollectionComposer } from '@refinitiv-ui/utils/lib/collection.js';

import { ListRenderer } from '../../list';
import { Renderer } from '../../list/renderer';
import type { Item, ItemData } from '../../item';

/**
 * Renders list items as `ef-item` elements.
 * Extends its behaviour from ListRenderer.
 */
export class ComboBoxRenderer extends Renderer {
  constructor (context?: unknown) {
    const listRenderer = new ListRenderer(context);

    super((item: ItemData, composer: CollectionComposer<ItemData>, element?: HTMLElement) => {
      // Extending renderer from listRenderer
      const el = listRenderer(item, composer, element) as Item;
      // Uses value as id for `aria-activedescendant` in combobox
      if (el.value !== 'undefined' && el.id !== el.value) {
        el.setAttribute('id', el.value);
      }
      return el;
    });
  }
}
