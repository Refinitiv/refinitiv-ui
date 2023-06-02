import { uuid } from '@refinitiv-ui/utils/uuid.js';

import { getItemId } from '../../list/helpers/item-id.js';
import { Renderer } from '../../list/renderer.js';
import { CheckedState, TreeManager, TreeManagerMode } from '../managers/tree-manager.js';

import type { TreeDataItem } from './types';
import type { CollectionComposer } from '@refinitiv-ui/utils/collection.js';

type RendererScope = {
  multiple?: boolean;
  noRelation?: boolean;
};

export class TreeRenderer extends Renderer {
  constructor(scope?: unknown) {
    /**
     * Renderer key prefix, used in combination with item value to give unique id to each item
     */
    const key: string = uuid();

    let manager: TreeManager<TreeDataItem>;
    let currentMode: TreeManagerMode;
    let currentComposer: CollectionComposer<TreeDataItem>;

    super(
      (
        item: TreeDataItem,
        composer: CollectionComposer<TreeDataItem>,
        element = document.createElement('ef-tree-item')
      ): HTMLElement => {
        const multiple = !!scope && (scope as RendererScope).multiple === true;
        const noRelation = !!scope && (scope as RendererScope).noRelation === true;
        const mode = !multiple || !noRelation ? TreeManagerMode.RELATIONAL : TreeManagerMode.INDEPENDENT;

        if (currentComposer !== composer || currentMode !== mode) {
          currentMode = mode;
          currentComposer = composer;
          manager = new TreeManager(composer, mode);
        }

        element.multiple = multiple;
        element.item = item;
        element.id = getItemId(key, item.value);
        element.depth = composer.getItemDepth(item);
        element.parent = composer.getItemChildren(item).length > 0;
        element.expanded = manager.isItemExpanded(item);
        element.checkedState =
          !multiple && element.parent ? CheckedState.UNCHECKED : manager.getItemCheckedState(item);
        element.icon = composer.getItemPropertyValue(item, 'icon') as string;
        element.label = composer.getItemPropertyValue(item, 'label') as string;
        element.disabled = composer.getItemPropertyValue(item, 'disabled') === true;
        element.readonly = composer.getItemPropertyValue(item, 'readonly') === true;
        element.highlighted = composer.getItemPropertyValue(item, 'highlighted') === true;

        return element;
      }
    );
  }
}
