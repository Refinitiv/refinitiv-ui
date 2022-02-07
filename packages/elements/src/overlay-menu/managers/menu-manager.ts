import { AfterRenderTaskRunner } from '@refinitiv-ui/utils/async.js';
import { TapEvent } from '@refinitiv-ui/core';
import type { Item } from '../../item';
import { OverlayMenu } from '../index.js';
import type { NestedMenu } from '../helpers/types';
import { getOverlays } from '../../overlay/managers/zindex-manager.js';

/**
 * Overlay menu manager monitors menu nesting and ensures
 * that only a single menu tree can be opened
 */
abstract class OpenedMenusManager {
  private static focusThrottler = new AfterRenderTaskRunner();
  private static registry: Set<OverlayMenu> = new Set();
  private static crossMenu: Map<OverlayMenu, NestedMenu> = new Map();
  private static overlayStack: OverlayMenu[] = [];
  private static activeMenu?: OverlayMenu;

  /**
   * Get the sorted list of overlays by z-index
   */
  private static get overlays (): OverlayMenu[] {
    const openedMenus: OverlayMenu[] = [];
    const overlayLayers = getOverlays();

    overlayLayers.forEach(overlay => {
      if (overlay instanceof OverlayMenu && this.registry.has(overlay)) {
        openedMenus.push(overlay);
      }
    });

    return openedMenus;
  }

  /**
   * Run when tap event happened on document
   * @param event Tap start event
   * @returns {void}
   */
  private static closeOnOutsideOfMenuTap (event: TapEvent): void {
    const manager = OpenedMenusManager;
    const paths = [...event.composedPath()];
    while (paths.length) {
      const node = paths.shift();
      if (node instanceof OverlayMenu && manager.registry.has(node)) {
        return;
      }
    }
    const topMenu = manager.overlayStack[manager.overlayStack.length - 1];

    if (topMenu && !topMenu.noCancelOnOutsideClick) {
      manager.setOpened(topMenu, false);
    }
  }

  /**
   * Mark active menu with active attribute
   * This is required for compact menus to change styles
   * @returns {void}
   */
  private static setActiveMenu (): void {
    if (this.activeMenu) {
      this.activeMenu.removeAttribute('active');
    }

    this.activeMenu = this.overlayStack[0];
    if (this.activeMenu) {
      this.activeMenu.setAttribute('active', '');
    }
  }

  /**
   * A recursion function to close nested menus
   * @param parent Parent menu
   * @returns false if opened event is prevented
   */
  private static _closeMenuFor (parent: OverlayMenu): boolean {
    const childMenu = this.crossMenu.get(parent);
    if (childMenu) {
      const {
        menu
      } = childMenu;

      if (this.setOpened(menu, false)) {
        if (this._closeMenuFor(menu)) {
          this.crossMenu.delete(parent);
          return true;
        }
      }

      return false;
    }

    return true;
  }

  /**
   * Close all nested menus for parent menu
   * @param parent Parent menu
   * @returns false if opened event is prevented
   */
  private static closeMenuFor (parent: OverlayMenu): boolean {
    if (this._closeMenuFor(parent)) {
      this.focusThrottler.schedule(() => { /* must be throttled for IE11 */
        parent.opened && parent.focus();
      });
      return true;
    }

    return false;
  }

  /**
   * Set the state of menu
   * @param menu The menu
   * @param opened True to make menu opened
   * @returns false if event is prevented
   */
  private static setOpened (menu: OverlayMenu, opened: boolean): boolean {
    if (menu.opened !== opened) {
      const event = new CustomEvent('opened-changed', {
        cancelable: true,
        detail: {
          value: opened
        }
      });

      menu.dispatchEvent(event);

      if (event.defaultPrevented) {
        return false;
      }

      menu.opened = opened;
    }

    return true;
  }

  /**
  * Register the menu
  * Can be called multiple times if menu items collection has changed
  * @param menu Menu
  * @returns {void}
  */
  public static register (menu: OverlayMenu): void {
    if (!this.registry.size) {
      document.addEventListener('tapstart', this.closeOnOutsideOfMenuTap, {
        capture: true,
        passive: true
      });
    }

    this.registry.add(menu);
    this.overlayStack = this.overlays;
    this.setActiveMenu();
  }

  /**
  * Deregister the menu
  * @param menu Menu
  * @returns {void}
  */
  public static deregister (menu: OverlayMenu): void {
    const parentMenu = this.getParentMenu(menu);
    if (!this.closeMenuFor(parentMenu || menu)) {
      return;
    }
    this.crossMenu.delete(menu);
    this.registry.delete(menu);
    this.overlayStack = this.overlays;
    this.setActiveMenu();

    if (!this.registry.size) {
      const eventOptions = {
        capture: true,
        passive: true
      };

      document.removeEventListener('tapstart', this.closeOnOutsideOfMenuTap, eventOptions);
    }
  }

  /**
   * Try to open nested menu for provided item. If no item provided, close nested menu
   * @param parentMenu Parent menu
   * @param [item] Item to check menu for
   * @returns {void}
   */
  public static toggleNestedMenuFor (parentMenu: OverlayMenu, item?: Item): void {
    const crossMenu = this.crossMenu.get(parentMenu);

    if (crossMenu) {
      if (crossMenu.item === item) { /* same menu */
        return;
      }

      if (!this.closeMenuFor(parentMenu)) {
        return;
      }
    }

    if (!item) {
      this.closeMenuFor(parentMenu);
      return;
    }

    const menuId = item.getAttribute('for');
    if (!menuId) {
      return;
    }

    const menu = (parentMenu.getRootNode() as Document | ShadowRoot).getElementById(menuId); /* query within the scope */

    if (!menu || !(menu instanceof OverlayMenu)) {
      return;
    }

    if (this.setOpened(menu, true)) {
      this.crossMenu.set(parentMenu, {
        menu,
        item
      });
    }
  }

  /**
   * Get parent menu from child menu if any
   * @param childMenu menu to find parent for
   * @returns parent menu or undefined
   */
  public static getParentMenu (childMenu: OverlayMenu): OverlayMenu | undefined {
    let parentMenu: OverlayMenu | undefined;
    this.crossMenu.forEach(({ menu }, key) => {
      if (menu === childMenu) {
        parentMenu = key;
      }
    });

    return parentMenu;
  }

  /**
   * Get parent menu item from child menu if any
   * @param childMenu menu to find parent for
   * @returns parent menu item or undefined
   */
  public static getParentMenuItem (childMenu: OverlayMenu): Item | undefined {
    let parentItem: Item | undefined;
    this.crossMenu.forEach(({ item, menu }) => {
      if (menu === childMenu) {
        parentItem = item;
      }
    });

    return parentItem;
  }

  /**
   * Check if menu is nested, a.k.a. has parent menu
   * @param menu Menu to check
   * @returns true if menu is nested
   */
  public static isNested (menu: OverlayMenu): boolean {
    return this.getParentMenu(menu) !== undefined;
  }

  /**
   * Check if menu is active, a.k.a. it is to of z-index stack
   * @param menu Menu to check
   * @returns true if menu is active
   */
  public static isActiveMenu (menu: OverlayMenu): boolean {
    return this.overlayStack[0] === menu;
  }

  /**
   * Clear all manager items
   * @returns {void}
   */
  public static clear (): void {
    this.registry.forEach(menu => this.deregister(menu));
  }
}

export {
  OpenedMenusManager
};
