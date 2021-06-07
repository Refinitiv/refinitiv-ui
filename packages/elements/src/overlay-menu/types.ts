import { Item, ItemData } from '../item';
import { CollectionComposer } from '@refinitiv-ui/utils';
import { OverlayMenu } from './index';

export type NestedMenu = {
  menu: OverlayMenu;
  item: Item;
};

export type OverlayMenuData = ItemData[] | CollectionComposer<ItemData>;
