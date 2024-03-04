import { DeprecationNotice } from '@refinitiv-ui/core';

import type { CollectionComposer, DataItem } from '@refinitiv-ui/utils/collection.js';
import { uuid } from '@refinitiv-ui/utils/uuid.js';

import type { Item, ItemData, ItemType } from '../../item';
import { Renderer } from '../renderer.js';
import { getItemId } from './item-id.js';

/**
 * Basic render context
 */
type Context = {
  multiple?: boolean;
};

export const createListRenderer = <T extends DataItem = ItemData>(
  context?: unknown
): ((item: T, composer: CollectionComposer<T>, element?: HTMLElement) => HTMLElement) => {
  /**
   * Renderer key prefix, used in combination with item value to give unique id to each item
   */
  const key: string = uuid();
  return (item: T, composer: CollectionComposer<T>, element?: HTMLElement) => {
    /**
     * Element to render
     */
    const el = (element as Item) || document.createElement('ef-list-item');
    /**
     * Tooltip value to be used, if any.
     */
    const tooltip = composer.getItemPropertyValue(item, 'tooltip') as string;

    el.label = composer.getItemPropertyValue(item, 'label') as string;
    el.subLabel = composer.getItemPropertyValue(item, 'subLabel') as string;
    el.value = composer.getItemPropertyValue(item, 'value') as string;
    el.id = getItemId(key, el.value);
    el.icon = composer.getItemPropertyValue(item, 'icon') as string;
    el.highlighted = composer.getItemPropertyValue(item, 'highlighted') === true;
    el.selected = composer.getItemPropertyValue(item, 'selected') === true;
    el.disabled = composer.getItemPropertyValue(item, 'disabled') === true;
    el.hidden = composer.getItemPropertyValue(item, 'hidden') === true;
    el.type = composer.getItemPropertyValue(item, 'type') as ItemType;
    el.multiple = !!context && (context as Context).multiple === true;

    const itemRole = el.type === 'text' || !el.type ? 'option' : 'presentation';
    el.setAttribute('role', itemRole);
    tooltip ? el.setAttribute('title', tooltip) : el.removeAttribute('title');

    return el;
  };
};

const deprecationNotice = new DeprecationNotice(
  'ListRenderer is deprecated. Use createListRenderer instead.'
);

/**
 * Renders list items as `ef-item` elements.
 * This is the default renderer for lists.
 */
export class ListRenderer extends Renderer {
  constructor(context?: unknown) {
    /**
     * Create and return render function
     */
    super(createListRenderer(context));
    deprecationNotice.show();
  }
}
