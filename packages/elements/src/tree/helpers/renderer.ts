import { DeprecationNotice } from '@refinitiv-ui/core';

import type { CollectionComposer } from '@refinitiv-ui/utils/collection.js';
import { uuid } from '@refinitiv-ui/utils/uuid.js';

import { getItemId } from '../../list/helpers/item-id.js';
import { Renderer } from '../../list/renderer.js';
import type { TreeItem } from '../elements/tree-item';
import { CheckedState, TreeManager, TreeManagerMode } from '../managers/tree-manager.js';
import type { TreeDataItem } from './types';

type RendererScope<T extends TreeDataItem> = {
  multiple?: boolean;
  noRelation?: boolean;
  manager?: TreeManager<T>;
  treeManager?: TreeManager<T>;
};

export const createTreeRenderer = <T extends TreeDataItem = TreeDataItem>(
  context?: unknown
): ((item: T, composer: CollectionComposer<T>, element?: HTMLElement) => HTMLElement) => {
  /**
   * Renderer key prefix, used in combination with item value to give unique id to each item
   */
  const key: string = uuid();

  return (
    item: T,
    composer: CollectionComposer<T>,
    element: HTMLElement = document.createElement('ef-tree-item')
  ): HTMLElement => {
    // cast type to element to not break List api.
    const _context = context as RendererScope<T> | undefined;
    const _element = element as TreeItem;
    const multiple = _context?.multiple === true;
    const noRelation = _context?.noRelation === true;
    const mode = !multiple || !noRelation ? TreeManagerMode.RELATIONAL : TreeManagerMode.INDEPENDENT;
    const manager = _context?.manager || _context?.treeManager || new TreeManager(composer, mode);

    _element.multiple = multiple;
    _element.item = item;
    _element.id = getItemId(key, item.value);
    _element.depth = composer.getItemDepth(item);
    _element.parent = manager.isItemParent(item);
    _element.expanded = manager.isItemExpanded(item);
    _element.checkedState =
      !multiple && _element.parent ? CheckedState.UNCHECKED : manager.getItemCheckedState(item);
    _element.icon = composer.getItemPropertyValue(item, 'icon');
    _element.label = composer.getItemPropertyValue(item, 'label') as string;
    _element.disabled = composer.getItemPropertyValue(item, 'disabled') === true;
    _element.readonly = composer.getItemPropertyValue(item, 'readonly') === true;
    _element.highlighted = composer.getItemPropertyValue(item, 'highlighted') === true;

    return _element;
  };
};

const deprecationNotice = new DeprecationNotice(
  'TreeRenderer is deprecated. Use createTreeRenderer instead.'
);

/**
 * @deprecate TreeRenderer is deprecated. Use createTreeRenderer instead.
 */
export class TreeRenderer extends Renderer {
  constructor(context?: unknown) {
    super(createTreeRenderer(context));
    deprecationNotice.show();
  }
}
