import type { CollectionComposer } from '@refinitiv-ui/utils/collection.js';

import type { Item, ItemData } from '../../item';
import type { OverlayMenu } from '../index';

export type NestedMenu = {
  menu: OverlayMenu;
  item: Item;
};

export type OverlayMenuData = ItemData[] | CollectionComposer<ItemData>;
