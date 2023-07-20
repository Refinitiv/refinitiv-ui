import type { Item, ItemData } from '../../item';
import type { OverlayMenu } from '../index';
import type { CollectionComposer } from '@refinitiv-ui/utils/collection.js';

export type NestedMenu = {
  menu: OverlayMenu;
  item: Item;
};

export type OverlayMenuData = ItemData[] | CollectionComposer<ItemData>;
