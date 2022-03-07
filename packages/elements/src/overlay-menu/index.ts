import {
  html,
  css,
  TemplateResult,
  CSSResultGroup,
  PropertyValues,
  TapEvent,
  WarningNotice
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { ifDefined } from '@refinitiv-ui/core/directives/if-defined.js';
import { VERSION } from '../version.js';
import { AnimationTaskRunner } from '@refinitiv-ui/utils/async.js';
import { CollectionComposer } from '@refinitiv-ui/utils/collection.js';
import { uuid } from '@refinitiv-ui/utils/uuid.js';

import '../icon/index.js';
import '../item/index.js';
import { Item, ItemData } from '../item/index.js';
import { Overlay, OverlayPosition, OverlayPositionTarget } from '../overlay/index.js';
import { applyLock } from '../overlay/managers/interaction-lock-manager.js';
import type { OverlayMenuData } from './helpers/types';
import { OpenedMenusManager } from './managers/menu-manager.js';

export type { OverlayMenuData };

/**
 * Overlay that supports single-level and multi-level menus
 * @fires item-trigger - Dispatched when user clicks on item
 * @fires opened-changed - Dispatched when when opened attribute changes internally. Prevent default to stop opening/closing pipeline
 *
 * @attr {boolean} opened - True if the menu is currently displayed
 * @prop {boolean} [opened=false] - True if the menu is currently displayed
 *
 * @attr {boolean} with-backdrop - True to show backdrop
 * @prop {boolean} [withBackdrop=false] - True to show backdrop
 *
 * @attr {boolean} no-cancel-on-esc-key - Set to true to disable canceling the overlay with the ESC key
 * @prop {boolean} [noCancelOnEscKey=false] - Set to true to disable canceling the overlay with the ESC key
 *
 * @attr {boolean} no-cancel-on-outside-click - Set to true to disable canceling the overlay by clicking outside it
 * @prop {boolean} [noCancelOnOutsideClick=false] - Set to true to disable canceling the overlay by clicking outside it
 *
 * @attr {boolean} lock-position-target - Set to true to lock position target
 * @prop {boolean} [lockPositionTarget=false] - Set to true to lock position target
 *
 * @prop {HTMLElement | null} [positionTarget=null] - Position next to the HTML element
 *
 * @attr {string} transition-style - Set the transition style
 * @prop {string | null} [transitionStyle=null] - Set the transition style
 *
 * @prop {string} [value=""] - Returns the first selected item from values.
 *
 * @attr {number | undefined} x - Set a specific x coordinate
 * @prop {number | undefined} x - Set a specific x coordinate
 *
 * @attr {number | undefined} y - Set a specific y coordinate
 * @prop {number | undefined} y - Set a specific y coordinate
 *
 * @attr {number} horizontal-offset - A pixel value that will be added to the position calculated on the horizontal axis. The offset will be applied either to the `left` or `right` depending on the `positionTarget`
 * @prop {number} [horizontalOffset=0] - A pixel value that will be added to the position calculated on the horizontal axis. The offset will be applied either to the `left` or `right` depending on the `positionTarget`
 *
 * @attr {number} vertical-offset - A pixel value that will be added to the position calculated on the vertical axis. The offset will be applied either to the `top` or `bottom` depending on the `positionTarget`
 * @prop {number} [verticalOffset=0] - A pixel value that will be added to the position calculated on the vertical axis. The offset will be applied either to the `top` or `bottom` depending on the `positionTarget`
 *
 * @attr {number} offset - A pixel value that will be added to the position calculated on the vertical or horizontal axis. The offset is applied dynamically depending on the `positionTarget`
 * @prop {number} offset - A pixel value that will be added to the position calculated on the vertical or horizontal axis. The offset is applied dynamically depending on the `positionTarget`
 *
 * @attr {Position[] | undefined} position - Set position and align against the attach target.
 * @prop {Position[] | undefined} position - Set position and align against the attach target.
 */
@customElement('ef-overlay-menu', {
  alias: 'emerald-popup-menu'
})
export class OverlayMenu extends Overlay {

  /**
   * Element version number
   * @returns version number
   */
  static get version (): string {
    return VERSION;
  }

  /**
   * A `CSSResultGroup` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @return CSS template
   */
  static get styles (): CSSResultGroup {
    return [
      super.styles,
      css`
        :host {
          overflow-y: auto;
          overflow-x: hidden;
        }
        :host([compact]:not([active])) { /* active is set in menu-manager */
          opacity: 0;
        }
      `
    ];
  }

  constructor () {
    super();
    /**
    * @ignore
    */
    this.withShadow = true;
    /**
    * @ignore
    */
    this.lockPositionTarget = true;
    /**
    * @ignore
    */
    this.focusBoundary = null;
    /**
    * @ignore
    */
    this.position = ['bottom-start', 'top-start'];
    /**
    * @ignore
    */
    this.toItem = this.toItem.bind(this);
    /**
    * @ignore
    */
    this.modificationUpdate = this.modificationUpdate.bind(this);
  }

  private dataDisconnectThrottler = new AnimationTaskRunner();
  private menuHighlightedItem?: Item;
  private oldPosition?: OverlayPosition[];
  private oldPositionTarget?: OverlayPositionTarget | HTMLElement | null;
  private oldInteractiveElements: HTMLElement[] = [];
  private menuIndex: { /* used to bind items to menus */
    [key: string]: {
      dataId: string;
      menu: OverlayMenu;
    };
  } = {};

  private composer = new CollectionComposer<ItemData>([]);
  private _data: OverlayMenuData | undefined;
  private parentDataItem?: ItemData; /* used to reference CC to get the correct collection */
  private lazyRendered = false; /* speed up rendering by not populating overlay on first load */

  /**
   * Switch to compact style menu
   */
  @property({ type: Boolean, reflect: true })
  public compact = false;

  /**
   * Array of item's values
   * @type {string[]}
   * @default []
   */
  @property({ type: Array, attribute: false })
  public get values (): string[] {
    return this.withData ? this.getDataValues() : this.getSlottedValues();
  }
  public set values (values: string[]) {
    const oldValues = this.values;
    if (String(values) === String(oldValues)) {
      return;
    }

    this.withData ? this.setDataValues(values) : this.setSlottedValues(values);
    this.requestUpdate('values', oldValues);
  }

  /**
   * Returns the first selected item value.
   */
  @property({ type: String })
  public get value (): string {
    return this.values.length > 0 ? this.values[0] : '';
  }
  public set value (value: string) {
    const valueToString = String(value);
    this.values = valueToString && value !== null ? [valueToString] : [];
  }

  /**
   * Construct the menu from data object.
   * Cannot be used with internal content
   * @type {OverlayMenuData|undefined}
   */
  @property({ type: Object, attribute: false })
  public get data (): OverlayMenuData | undefined {
    return this._data;
  }
  public set data (value: OverlayMenuData | undefined) {
    const oldValue = this._data;
    if (oldValue === value) {
      return;
    }
    else if (Array.isArray(value)) {
      value.forEach(function (item) {
        if (item && item.value !== undefined && item.value !== null) {
          item.value = String(item.value);
        }
      });
      this.composer = new CollectionComposer<ItemData>(value);
    }
    else if (value instanceof CollectionComposer) {
      this.composer = value;
    }
    else {
      new WarningNotice('ef-overlay-menu: invalid data provided').show();
      this.composer = new CollectionComposer<ItemData>([]);
    }
    this._data = value;

    this.composer.on(
      'modification', // Listen for modifications
      this.modificationUpdate // Update the template
    );

    this.requestUpdate('data', oldValue);
  }

  /**
   * A flag indicating that the menu is nested
   * Used for styling
   */
  @property({ type: Boolean, reflect: true })
  private nested = false;

  /**
   * Get values from data collection
   * @returns data values
   */
  private getDataValues (): string[] {
    const items = this.getDataDescendants();
    const selected = items.filter(item => this.composer.getItemPropertyValue(item, 'selected') === true);
    return selected.map(item => this.composer.getItemPropertyValue(item, 'value') || '');
  }

  /**
   * Set values to data collection
   * @param values data values
   * @returns {void}
   */
  private setDataValues (values: string[]): void {
    const items = this.getDataDescendants();
    items.forEach(item => {
      const value = this.composer.getItemPropertyValue(item, 'value') || '';
      const found = values.some(userValue => String(userValue) === value);
      this.composer.setItemPropertyValue(item, 'selected', found);
    });
  }

  /**
   * Get values from slotted element collection
   * @returns slotted item values
   */
  private getSlottedValues (): string[] {
    const items = this.getSlottedDescendants();
    const selected = items.filter(item => item.selected === true);
    return selected.map(item => item.value);
  }

  /**
   * Set values to slotted elements
   * @param values element values
   * @returns {void}
   */
  private setSlottedValues (values: string[]): void {
    const items = this.getSlottedDescendants();
    items.forEach(item => {
      item.selected = values.includes(item.value);
    });
  }

  /**
   * A flag to check whether menu is constructed from data
   * or from slotted content
   * It is not possible to combine two
   */
  private get withData (): boolean {
    return this._data !== undefined;
  }

  /**
   * True if menu is fully opened and is currently in focus
   */
  private get isActive (): boolean {
    return this.fullyOpened && OpenedMenusManager.isActiveMenu(this);
  }

  /**
   * Get descendant as data item
   * Valid only for CC
   * @returns descendant data item
   */
  private getDataDescendants (): ItemData[] {
    return (this.parentDataItem
      ? this.composer.getItemDescendants(this.parentDataItem, Infinity)
      : this.composer.queryItems(() => true, Infinity)) as ItemData[];
  }

  /**
   * Get descendant as item
   * Valid only for slotted
   * @param [parent=this] parent menu
   * @returns descendant item
   */
  private getSlottedDescendants (parent: OverlayMenu = this): Item[] {
    const items = parent.children;
    const descendants: Item[] = [];
    for (let i = 0; i < items.length; i += 1) {
      const item = items[i];
      if (item instanceof Item) {
        descendants.push(item);
        if (item.for) {
          const menu = document.getElementById(item.for);
          if (menu && menu instanceof OverlayMenu) {
            descendants.push(...this.getSlottedDescendants(menu));
          }
        }
      }
    }
    return descendants;
  }

  /**
   * Filter items out of children
   */
  private get items (): Item[] {
    const children = this.withData ? this.renderRoot.children : this.children;
    const items: Item[] = [];

    for (let i = 0; i < children.length; i += 1) {
      const item = children[i];
      if (item instanceof Item && this.isHighlightable(item)) {
        items.push(item);
      }
    }
    return items;
  }

  /**
   * Invoked when a component is removed from the document’s DOM.
   * @return {void}
   */
  public disconnectedCallback (): void {
    super.disconnectedCallback();
    this.disconnectNestedMenus();
  }

  /**
   * Called when the element’s DOM has been updated and rendered
   * @param changedProperties Properties that has changed
   * @returns shouldUpdate
   */
  protected shouldUpdate (changedProperties: PropertyValues): boolean {
    const shouldUpdate = super.shouldUpdate(changedProperties);

    return shouldUpdate
      || changedProperties.size === 0 /* this is to support empty requestUpdate() */
      || changedProperties.has('values')
      || changedProperties.has('data')
      || (this.opened && changedProperties.has('compact'))
      || (this.opened && changedProperties.has('modification'));
  }

  /**
   * Reflects property values to attributes and calls render to render DOM via lit-html.
   * @param changedProperties Properties which have changed
   * @return {void}
   */
  protected update (changedProperties: PropertyValues): void {
    if (changedProperties.has('opened')) {
      if (this.opened) {
        this.opening();
      }
      else {
        this.closing();
      }
    }

    if (changedProperties.has('data')) {
      this.constructDataMenus();
    }

    if (changedProperties.has('opened') && this.opened) {
      this.lazyRendered = true;
    }

    super.update(changedProperties);
  }

  /**
   * Called after the component is first rendered
   * @param changedProperties Properties which have changed
   * @return {void}
   */
  protected firstUpdated (changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);

    this.addEventListener('keydown', this.onKeyDown);
    this.addEventListener('keyup', this.onKeyUp);
    this.renderRoot.addEventListener('tap', (event) => this.onItemTap(event as TapEvent));
    this.renderRoot.addEventListener('mousemove', (event) => this.onItemMouseMove(event as MouseEvent)); /* listen shadow root to support data */
  }

  /**
   * Called after render life-cycle finished
   * @param changedProperties Properties which have changed
   * @return {void}
   */
  protected updated (changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (changedProperties.has('data')) {
      // Manages items constructed by constructDataMenus after they have been rendered
      this.onDataChange();
    }
  }

  /**
   * Run when the overlay has closed, managers are de-registered
   * and closing transition has finished
   * @return {void}
   */
  protected onClosed (): void {
    // do not keep light DOM nodes and disconnect on next render
    this.dataDisconnectThrottler.schedule(() => {
      this.disconnectNestedMenus();
    });

    this.setItemHighlight();
    this.restoreNestedProperties();

    super.onClosed();
  }

  /**
   * Restore properties back to original before bounding to parent menu
   * @returns {void}
   */
  private restoreNestedProperties (): void {
    if (this.nested) {
      this.nested = false;
      this.position = this.oldPosition;
      this.positionTarget = this.oldPositionTarget;
      this.interactiveElements = this.oldInteractiveElements;
      this.oldPositionTarget = undefined;
      this.oldPosition = undefined;
      this.oldInteractiveElements = [];
    }
  }

  /**
   * Selects all data from CollectionComposer
   * @return all MenuItems stored in CollectionComposer
   */
  private getAllComposedData (): ItemData[] {
    const items = this.parentDataItem
      ? this.composer.getItemChildren(this.parentDataItem)
      : this.composer.queryItems(() => true, 0);
    return items as ItemData[];
  }

  /**
   * Get menu depth from the collection composer
   * @returns depth
   */
  private getDataDepth (): number {
    return this.parentDataItem ? this.composer.getItemDepth(this.parentDataItem) + 1 : 0;
  }

  /**
   * Run while overlay is opening
   * @return {void}
   */
  private opening (): void {
    const parentMenuItem = OpenedMenusManager.getParentMenuItem(this);
    this.dataDisconnectThrottler.cancel();
    this.restoreNestedProperties();

    if (parentMenuItem) {
      this.nested = true;
      this.noCancelOnOutsideClick = true;
      this.oldPositionTarget = this.positionTarget;
      this.oldInteractiveElements = this.interactiveElements;
      this.oldPosition = this.position;
      let parentMenu = OpenedMenusManager.getParentMenu(this);
      if (!this.compact) {
        this.positionTarget = parentMenuItem;
        const interactiveElements: HTMLElement[] = [];
        while (parentMenu) {
          interactiveElements.push(parentMenu, ...parentMenu.interactiveElements);
          parentMenu = OpenedMenusManager.getParentMenu(parentMenu);
        }
        this.interactiveElements = (this.oldInteractiveElements || []).concat(interactiveElements);
        this.position = ['right-start', 'left-start'];
      }
      else {
        this.positionTarget = parentMenu?.positionTarget;
        this.position = parentMenu?.position;
      }

      // Managers are applied in shouldUpdate lifecycles (as not every property causes re-render)
      // The process must follow certain order (which is better not to touch)
      // `applyLock` fixes a problem when changes in properties above where not take into account
      applyLock();
    }
    this.registerMenu();
  }

  /**
   * Run while overlay is closing
   * @return {void}
   */
  private closing (): void {
    OpenedMenusManager.deregister(this);
  }

  /**
   * Run when modification has happened in CC
   * @returns {void}
   */
  private modificationUpdate (): void {
    this.constructDataMenus();
    this.requestUpdate();
  }

  /**
   * Construct menu items and nested menus from data object
   * @return {void}
   */
  private constructDataMenus (): void {
    const data = this.getAllComposedData();
    const depth = this.getDataDepth();

    const oldMenuIndex = this.menuIndex;
    this.menuIndex = {};

    // try to match existing menus via CC
    // this is true if modification are done via CC APIs
    const findMenuByDataItem = (dataItem: ItemData): OverlayMenu | undefined => {
      const menuId = (this.composer?.getItemPropertyValue(dataItem, 'for') || '') as string;
      return oldMenuIndex[menuId]?.menu;
    };

    // try to match existing menus by item value and depth
    // this happens if new data has been supplied, which might be identical
    const findMenuByDataId = (id: string): OverlayMenu | undefined => {
      for (const menuId in oldMenuIndex) {
        const { menu, dataId } = oldMenuIndex[menuId];
        if (dataId === id) {
          return menu;
        }
      }
    };

    data.forEach((dataItem, index) => {
      // has menu
      if (dataItem.items && dataItem.items.length) {
        const dataId = `${dataItem.value || index}-${depth}`;
        const menu = findMenuByDataItem(dataItem) || findMenuByDataId(dataId) || this.toOverlayMenu();
        menu.parentDataItem = dataItem;
        menu.data = this.composer;
        const menuId = menu.id;

        this.menuIndex[menuId] = {
          menu,
          dataId
        };
        delete oldMenuIndex[menuId];
        this.composer?.setItemPropertyValue(dataItem, 'for', menuId);
      }
    });

    // delete all non-required menus
    for (const menuId in oldMenuIndex) {
      const { menu } = oldMenuIndex[menuId];
      if (menu.parentNode) {
        menu.parentNode.removeChild(menu);
      }
    }
  }

  /**
   * Remove all nested menus from the light DOM
   * @return {void}
   */
  private disconnectNestedMenus (): void {
    for (const menuIndex in this.menuIndex) {
      const { menu } = this.menuIndex[menuIndex];
      menu.parentNode?.removeChild(menu);
    }
  }

  /**
   * This function must be called to register menu or menu items
   * @return {void}
   */
  private registerMenu (): void {
    if (this.opened) {
      OpenedMenusManager.register(this);
    }
  }

  /**
   * Fired when mouse move event happens
   * @param event Mouse move event
   * @return {void}
   */
  private onItemMouseMove (event: MouseEvent): void {
    if (!this.fullyOpened) {
      return;
    }

    const item = this.getItem(event.target);
    if (item) {
      // set focus on menu to reset item focus
      // happens only if move on item
      if (this.isActive) {
        if (document.activeElement !== this) {
          this.focus();
        }
        else {
          const renderRoot = this.renderRoot as ShadowRoot;
          if (renderRoot.activeElement) {
            (renderRoot.activeElement as HTMLElement).blur();
          }
        }
      }

      this.setItemHighlight(item);

      if (!this.compact) {
        this.setOpenedMenu(item);
      }
    }
  }

  /**
   * Provide keyboard item selection
   * @param event Keyup event
   * @return {void}
   */
  private onKeyUp (event: KeyboardEvent): void {
    if (!this.isActive || event.defaultPrevented) {
      return;
    }

    switch (event.key) {
      case ' ': // space
      case 'Spacebar': // space
      case 'Enter':
        this.onEnter();
        break;
      default:
        return;
    }

    event.preventDefault();
  }

  /**
   * Provide keyboard navigation
   * @param event Keydown event
   * @return {void}
   */
  private onKeyDown (event: KeyboardEvent): void {
    if (!this.isActive || event.defaultPrevented) {
      return;
    }

    switch (event.key) {
      case 'Down':
      case 'ArrowDown':
        this.focusElement(1, true);
        break;
      case 'Up':
      case 'ArrowUp':
        this.focusElement(-1, true);
        break;
      case 'Left':
      case 'ArrowLeft':
        this.onArrowLeft();
        break;
      case 'Right':
      case 'ArrowRight':
        this.onArrowRight();
        break;
      case 'Tab':
        this.focusElement(event.shiftKey ? -1 : 1, true);
        break;
      default:
        return;
    }

    event.preventDefault();
  }

  /**
   * Fired when mouse click event happens on the menu.
   * @param event Tap event
   * @return {void}
   */
  private onItemTap (event: TapEvent): void {
    const item = this.getItem(event.target);

    if (item) {
      // set highlighted item for mobile
      this.setItemHighlight(item);
      this.setOpenedMenu(item);
      this.dispatchItemTrigger(item);
    }
  }

  /**
   * Dispatch item trigger even
   * @param item Menu item
   * @returns {void}
   */
  private dispatchItemTrigger (item: Item): void {
    const event = new CustomEvent('item-trigger', {
      detail: {
        value: item.value
      },
      bubbles: true,
      composed: true
    });

    item.dispatchEvent(event);
  }

  /**
   * Run when back item is clicked in compact mode
   * @return {void}
   */
  private onBackItemTap (): void {
    if (!this.fullyOpened) {
      return;
    }
    this.setOpened(false);
  }

  /**
   * Run when mouse is over back item in compact mode
   * @return {void}
   */
  private onBackItemMouseMove (): void {
    if (!this.fullyOpened) {
      return;
    }

    this.setItemHighlight();
  }

  /**
   * Manually execute click if return key is pressed
   * @return {void}
   */
  private onEnter (): void {
    const menuHighlightedItem = this.menuHighlightedItem;

    if (menuHighlightedItem) {
      this.setOpenedMenu(menuHighlightedItem);
      menuHighlightedItem.click();
    }
  }

  /**
   * Highlight next or previous highlightable element if present
   * @param direction -1 - up/next; 1 - down/previous
   * @param [circular=false] Set to true to have circular navigation over items
   * @return {void}
   */
  private focusElement (direction: number, circular = false): void {
    const menuHighlightedItem = this.menuHighlightedItem;
    const children = this.items;

    const idx = menuHighlightedItem ? children.indexOf(menuHighlightedItem) : -1;

    let focusElement;
    if (direction === 1) {
      focusElement = idx === -1 ? children[0] : children[idx + 1];
    }
    else {
      focusElement = idx === -1 ? children[children.length - 1] : children[idx - 1];
    }

    if (circular && !focusElement) {
      focusElement = direction === 1 ? children[0] : children[children.length - 1];
    }

    if (focusElement) {
      focusElement.focus();
      this.setItemHighlight(focusElement);
      focusElement.scrollIntoView(false);
    }
  }

  /**
   * Run when left arrow is pressed.
   * Close current menu if possible
   * @return {void}
   */
  private onArrowLeft (): void {
    if (OpenedMenusManager.isNested(this)) {
      this.setOpened(false);
    }
  }

  /**
   * Run when right arrow is pressed.
   * Open menu if possible
   * @return {void}
   */
  private onArrowRight (): void {
    this.setOpenedMenu(this.menuHighlightedItem);
  }

  /**
   * Open/close nested menu
   * @param menuItem Item to open/close menu for. Undefined to close all opened nested menus
   * @return {void}
   */
  private setOpenedMenu (menuItem?: Item): void {
    const menu = menuItem && menuItem.for && this.menuIndex[menuItem.for] ? this.menuIndex[menuItem.for].menu : undefined;
    menu && this.insertNestedMenu(menu);

    OpenedMenusManager.toggleNestedMenuFor(this, menuItem);
  }

  /**
   * Highlight an item with all ancestors to the top menu
   * @param [item] An item to highlight
   * @return {void}
   */
  private setItemHighlight (item?: Item): void {
    if (this.menuHighlightedItem === item) {
      return;
    }

    if (this.menuHighlightedItem) {
      this.menuHighlightedItem.highlighted = false;
    }

    this.menuHighlightedItem = item;

    if (item) {
      item.highlighted = true;
    }
  }

  /**
   * Check whether an item can be highlighted
   * @param item Item to check
   * @return true of the item can be highlighted
   */
  private isHighlightable (item: Item): boolean {
    return item.highlightable && !!item.offsetHeight;
  }

  /**
   * Get first ef-item in the ancestor tree
   * @param target HTML element to start searching from
   * @return item item if found
   */
  private getItem (target: EventTarget | Node | null): Item | null {
    if (!target) {
      return null;
    }

    let node: Node | null = target as Node | null;
    const items = this.items;

    while (node) {
      if (node instanceof Item && items.includes(node)) {
        return node;
      }

      if (node === this) {
        return null;
      }

      node = node.parentNode;
    }

    return null;
  }

  /**
   * Run when `data` collection has been set or updated
   * @return {void}
   */
  private onDataChange (): void {
    // OpenedMenusManager.toggleNestedMenuFor(this);
    this.onMenuReHighlight();
  }

  /**
   * Run when the default slot items have changed
   * @return {void}
   */
  private onSlotChange (): void {
    // closes opened child menu if any
    // OpenedMenusManager.toggleNestedMenuFor(this);
    this.onMenuReHighlight();
  }

  /**
   * If data has changed, try to keep the highlighted item unless
   * highlighted item has been removed itself
   * @returns {void}
   */
  private onMenuReHighlight (): void {
    const highlighted = this.menuHighlightedItem;
    if (highlighted && !this.items.includes(highlighted)) {
      this.setItemHighlight();
    }
  }

  /**
   * Insert nested menu if it is not attached
   * For `data` menus only
   * @param menu Menu element
   * @return {void}
   */
  private insertNestedMenu (menu: OverlayMenu): void {
    if (menu.parentNode || !this.parentNode) {
      return;
    }

    if (this.nextElementSibling) {
      this.parentNode.insertBefore(menu, this.nextElementSibling);
    }
    else {
      this.parentNode.appendChild(menu);
    }
  }

  /**
   * Create overlay menu from items
   * Inherit properties from current menu
   * @return menu element
   */
  private toOverlayMenu (): OverlayMenu {
    const menu = document.createElement('ef-overlay-menu') as OverlayMenu;
    menu.transitionStyle = this.transitionStyle;
    menu.noCancelOnOutsideClick = true;
    menu.compact = this.compact;
    menu.id = uuid();
    return menu;
  }

  /**
   * Create template for menu item
   * @param item JSON object to parse
   * @return template result
   */
  private toItem (item: ItemData): TemplateResult {
    const composer = this.composer as CollectionComposer;
    const type = composer.getItemPropertyValue(item, 'type');

    if (type === 'divider') {
      return html`<ef-item type="divider"></ef-item>`;
    }

    const tooltip = composer.getItemPropertyValue(item, 'tooltip');
    const label = composer.getItemPropertyValue(item, 'label');
    const icon = composer.getItemPropertyValue(item, 'icon');

    if (type === 'header') {
      return html`<ef-item
        type="header"
        title=${ifDefined(tooltip || undefined)}
        .label=${label}
        .icon=${icon}></ef-item>`;
    }

    const disabled = composer.getItemPropertyValue(item, 'disabled');
    const selected = composer.getItemPropertyValue(item, 'selected');
    const readonly = composer.getItemPropertyValue(item, 'readonly');
    const subLabel = composer.getItemPropertyValue(item, 'subLabel');
    const value = composer.getItemPropertyValue(item, 'value');
    const forMenu = composer.getItemPropertyValue(item, 'for');
    const highlighted = composer.getItemPropertyValue(item, 'highlighted');

    // type text
    return html`<ef-item
      title=${ifDefined(tooltip || undefined)}
      ?disabled=${disabled}
      ?selected=${selected}
      ?highlighted=${highlighted}
      ?readonly=${readonly}
      .label=${label}
      .subLabel=${subLabel}
      .icon=${icon}
      .value=${value}
      .for=${ifDefined(forMenu || undefined)}>
    </ef-item>`;
  }

  /**
   * Construct items from data
   * @returns {TemplateResult} Template result
   */
  private get fromDataItems (): TemplateResult[] | undefined {
    if (!this.lazyRendered) {
      return;
    }

    return this.getAllComposedData().map(this.toItem);
  }

  /**
   * Construct back item for compact menu
   * @returns {TemplateResult} Template result
   */
  private compactBackItem (): TemplateResult | undefined {
    if (!this.compact || !OpenedMenusManager.isNested(this)) {
      return undefined;
    }

    return html`
      <ef-item part="menu-back" id="back" label="Back" @tap=${this.onBackItemTap} @mousemove=${this.onBackItemMouseMove}>
        <ef-icon slot="left" icon="left"></ef-icon>
      </ef-item>
    `;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @returns {TemplateResult} Render template
   */
  protected render (): TemplateResult {
    /**
     * Use JavaScript expressions to include property values in
     * the element template.
     */
    return html`
      ${this.compactBackItem()}
      ${this.withData ? this.fromDataItems : html`<slot @slotchange=${this.onSlotChange}></slot>`}
    `;
  }
}
