import { DeprecationNotice } from '@refinitiv-ui/core';

import type { CollectionComposer, DataItem } from '@refinitiv-ui/utils/collection.js';

import type { ItemData } from '../../item';
import { createListRenderer } from '../../list/index.js';
import { Renderer } from '../../list/renderer.js';

export const createComboBoxRenderer = <T extends DataItem = ItemData>(context?: unknown) => {
  const listRenderer = createListRenderer<T>(context);

  return (item: T, composer: CollectionComposer<T>, element?: HTMLElement): HTMLElement => {
    // Extending renderer from listRenderer
    element = listRenderer(item, composer, element);
    const value = composer.getItemPropertyValue(item, 'value') as string;

    // Using value as id for `aria-activedescendant` in combobox
    if (value && element.id !== value) {
      element.id = value;
    } else if (!value && element.id) {
      element.removeAttribute('id');
    }

    return element;
  };
};

const deprecationNotice = new DeprecationNotice(
  'ComboRenderer is deprecated. Use createComboBoxRenderer instead.'
);

/**
 * Renders list items as `ef-item` elements.
 * Extends its behaviour from ListRenderer.
 * @deprecate ComboRenderer is deprecated. Use createComboBoxRenderer instead.
 */
export class ComboBoxRenderer extends Renderer {
  constructor(context?: unknown) {
    super(createComboBoxRenderer(context));
    deprecationNotice.show();
  }
}
