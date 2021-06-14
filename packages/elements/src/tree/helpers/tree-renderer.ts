import { CollectionComposer } from '@refinitiv-ui/utils';
import { TreeItemData } from './types';
import { TreeManager, TreeManagerMode, CheckedState } from './tree-manager';

import { Renderer } from '../../list/renderer';

import '../elements/tree-item';
import { TreeItem } from '../elements/tree-item';

type RendererScope = {
  multiple?: boolean;
  noRelation?: boolean;
};

export class TreeRenderer extends Renderer {
  constructor (scope?: unknown) {
    let manager: TreeManager<TreeItemData>;
    let currentMode: TreeManagerMode;
    let currentComposer: CollectionComposer<TreeItemData>;
    super((item: TreeItemData, composer: CollectionComposer<TreeItemData>, element = document.createElement('ef-tree-item')): HTMLElement => {
      const el = element as TreeItem;
      const multiple = !!scope && (scope as RendererScope).multiple === true;
      const noRelation = !!scope && (scope as RendererScope).noRelation === true;
      const mode = !multiple || !noRelation ? TreeManagerMode.RELATIONAL : TreeManagerMode.INDEPENDENT;
      if (currentComposer !== composer || currentMode !== mode) {
        currentMode = mode;
        currentComposer = composer;
        manager = new TreeManager(composer, mode);
      }
      el.multiple = multiple;
      el.item = item;
      el.depth = composer.getItemDepth(item);
      el.parent = composer.getItemChildren(item).length > 0;
      el.expanded = manager.isItemExpanded(item);
      el.checkedState = !multiple && el.parent ? CheckedState.UNCHECKED : manager.getItemCheckedState(item);
      el.label = composer.getItemPropertyValue(item, 'label') as string;
      el.disabled = composer.getItemPropertyValue(item, 'disabled') === true;
      el.readonly = composer.getItemPropertyValue(item, 'readonly') === true;
      el.highlighted = composer.getItemPropertyValue(item, 'highlighted') === true;
      return el;
    });
  }
}
