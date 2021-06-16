import { CollectionComposer } from '@refinitiv-ui/utils';

import { OverlayMenu } from '../index';
import { Item, ItemData } from '../../item';

export type NestedMenu = {
  menu: OverlayMenu;
  item: Item;
};

export type OverlayMenuData = ItemData[] | CollectionComposer<ItemData>;
