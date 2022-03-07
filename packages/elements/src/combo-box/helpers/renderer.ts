import type { CollectionComposer } from '@refinitiv-ui/utils/collection.js';

import { ListRenderer } from '../../list/index.js';
import { Renderer } from '../../list/renderer.js';
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
      element = listRenderer(item, composer, element) as Item;
      const value = composer.getItemPropertyValue(item, 'value') as string;

      // Using value as id for `aria-activedescendant` in combobox
      if (value && element.id !== value) {
        element.id = value;
      }
      else if (!value && element.id) {
        element.removeAttribute('id');
      }

      return element;
    });
  }
}
