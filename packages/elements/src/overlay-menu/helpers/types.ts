import type { CollectionComposer } from '@refinitiv-ui/utils/collection.js';
import type { OverlayMenu } from '../index';
import type { Item, ItemData } from '../../item';

export type NestedMenu = {
  menu: OverlayMenu;
  item: Item;
};

export type OverlayMenuData = ItemData[] | CollectionComposer<ItemData>;
