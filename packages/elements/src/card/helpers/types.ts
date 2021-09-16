import { OverlayMenuData } from '../../overlay-menu';

export type CardConfig = {
  /**
  * Configuration for side menu
  */
  menu?: {
    /**
     * Menu data object as defined in `overlay-menu`
     */
    data: OverlayMenuData;
  };
};
