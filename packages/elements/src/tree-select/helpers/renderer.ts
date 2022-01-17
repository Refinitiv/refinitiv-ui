import type { CollectionComposer } from '@refinitiv-ui/utils/lib/collection.js';

import { TreeRenderer } from '../../tree/index.js';
import { Renderer } from '../../list/renderer.js';
import type { Item, ItemData } from '../../item';

/**
 * Renders tree items as `ef-item` elements.
 * Extends its behaviour from TreeRenderer.
 */
export class TreeSelectRenderer extends Renderer {
  constructor (context?: unknown) {
    const treeRenderer = new TreeRenderer(context);

    super((item: ItemData, composer: CollectionComposer<ItemData>, element?: HTMLElement) => {
      // Extending renderer from treeRenderer
      element = treeRenderer(item, composer, element) as Item;
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
