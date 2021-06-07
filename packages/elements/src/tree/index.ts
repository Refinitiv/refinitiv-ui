import {
  customElement,
  property,
  DeprecationNotice,
  PropertyValues,
  TapEvent
} from '@refinitiv-ui/core';
import { List } from '../list';
import { CollectionComposer } from '@refinitiv-ui/utils';
import { TreeManager, TreeManagerMode } from './tree-manager';
import { DefaultRenderer } from './default-renderer';
import { TreeItemData } from './tree-item-data';

export { DefaultRenderer };

const EXPAND_TOGGLE_ATTR = 'expand-toggle';

const selectAllDeprecation = new DeprecationNotice('selectAll is deprecated, use checkAll instead.');
const deselectAllDeprecation = new DeprecationNotice('deselectAll is deprecated, use uncheckAll instead.');

/**
 * Displays a tree structure
 * to be used for menus and group selections
 *
 * @fires value-changed - Fired when the users changed selection item.
 */
@customElement('ef-tree')
export class Tree<T extends TreeItemData = TreeItemData> extends List<T> {
  /**
   * Tree manager used for manipulation
   */
  private manager = new TreeManager<T>(this.composer);

  /**
   * Allows multiple items to be selected
   */
  @property({ type: Boolean })
  public multiple = false;

  /**
   * Breaks the relationship when multiple
   * selection mode is enabled
   */
  @property({ attribute: 'no-relation', type: Boolean })
  public noRelation = false;

  /**
   * Renderer used for generating tree items
   * @default
   */
  @property({ attribute: false })
  public renderer = new DefaultRenderer(this);

  /**
   * Expands all groups
   * @returns {void}
   */
  public expandAll (): void {
    this.manager.expandAllItems();
  }

  /**
   * Collapses all groups
   * @returns {void}
   */
  public collapseAll (): void {
    this.manager.collapseAllItems();
  }

  /**
   * Checks all editable items
   * @returns {void}
   */
  public checkAll (): void {
    if (!this.multiple) {
      throw new RangeError('You cannot check all items in single selection mode');
    }
    this.manager.checkAllItems();
  }

  /**
   * Checks all editable items
   * @returns {void}
   * @deprecated
   * @ignore
   */
  public selectAll (): void {
    selectAllDeprecation.once();
    this.checkAll();
  }

  /**
   * Unchecks all editable items
   * @returns {void}
   */
  public uncheckAll (): void {
    this.manager.uncheckAllItems();
  }

  /**
   * Unchecks all editable items
   * @returns {void}
   * @deprecated
   * @ignore
   */
  public deselectAll (): void {
    deselectAllDeprecation.once();
    this.uncheckAll();
  }

  /**
   * @override
   * @ignore
   */
  public selectItem (item: T): boolean {
    // Stateless tree
    if (this.stateless) {
      return false;
    }
    // Multiple selection
    if (this.multiple) {
      return this.manager.toggleItem(item);
    }
    // Single selection - expand/collapse group (parent)
    if (this.manager.isItemParent(item)) {
      this.toggleExpandedState(item);
      return false;
    }
    // Single selection - check item
    if (this.manager.checkItem(item)) {
      this.manager.checkedItems.forEach(checkedItem => {
        checkedItem !== item && this.manager.uncheckItem(checkedItem);
      });
      return true;
    }
    return false;
  }

  /**
   * Dispatches an event, detailing which item has recently changed it's expanded state.
   * @param item Data item of which the expanded property changed
   * @returns {void}
   */
  protected dispatchExpandedChangedEvent (item: T): void {
    /**
    * Expanded Changed Event
    * Fired when an item's expanded state has changed.
    *
    * Property `detail.value` is the current expanded state.
    * Property `detail.item` is the original data item of which the property has been modified.
    *
    * @event expanded-changed
    */
    const event = new CustomEvent('expanded-changed', {
      bubbles: false,
      cancelable: false,
      composed: true,
      detail: {
        value: this.manager.isItemExpanded(item),
        item
      }
    });
    this.dispatchEvent(event);
  }

  /**
   * Handles tap event when composed path contains
   * an element with an `expand-toggle` attribute.
   * @param event Tap event to try and handle
   * @returns True or False depending if the event was handled
   */
  protected handleExpandCollapse (event: TapEvent): boolean {
    const containsToggle = event.composedPath().some((target) =>
      target instanceof HTMLElement && target.hasAttribute(EXPAND_TOGGLE_ATTR));
    const itemElement = containsToggle && this.findItemElementFromTarget(event.target);
    const item = itemElement && this.itemFromElement(itemElement);
    if (item) {
      this.toggleExpandedState(item);
      return true;
    }
    return false;
  }

  /**
   * @override
   */
  protected onTap (event: TapEvent): void {
    if (this.handleExpandCollapse(event)) {
      return;
    }
    super.onTap(event);
  }

  /**
   * @override
   */
  protected onKeyDown (event: KeyboardEvent): void {
    switch (event.key) {
      case 'Left':
      case 'ArrowLeft':
        this.left();
        break;
      case 'Right':
      case 'ArrowRight':
        this.right();
        break;
      default:
        return super.onKeyDown(event);
    }
    event.preventDefault();
  }

  /**
   * Performs left arrow keyboard action,
   * collapsing a group item if possible.
   * @returns {void}
   */
  protected left (): void {
    const item = this.highlightElement && this.itemFromElement(this.highlightElement);
    if (item && this.manager.isItemExpanded(item)) {
      this.manager.collapseItem(item);
      this.dispatchExpandedChangedEvent(item);
    }
  }

  /**
   * Performs right arrow keyboard action,
   * expanding a group item if possible.
   * @returns {void}
   */
  protected right (): void {
    const item = this.highlightElement && this.itemFromElement(this.highlightElement);
    if (item && !this.manager.isItemExpanded(item)) {
      this.manager.expandItem(item);
      this.dispatchExpandedChangedEvent(item);
    }
  }

  /**
   * Toggles the expanded state of an item.
   * Executed when a user taps on an item to expand/collapse the group.
   * @param item Original data item
   * @returns {void}
   */
  protected toggleExpandedState (item: T): void {
    if (this.manager.isItemExpanded(item)) {
      this.manager.collapseItem(item);
    }
    else {
      this.manager.expandItem(item);
    }
    this.dispatchExpandedChangedEvent(item);
  }

  /**
   * @override
   */
  protected queryItems (engine: (item: T, composer: CollectionComposer<T>) => boolean): readonly T[] {
    return this.composer.queryItems(engine, Infinity);
  }

  /**
   * @override
   */
  protected queryItemsByPropertyValue<K extends keyof T> (property: K, value: T[K]): readonly T[] {
    return this.composer.queryItemsByPropertyValue(property, value, Infinity);
  }

  /**
   * @override
   */
  protected update (changedProperties: PropertyValues): void {
    if (changedProperties.has('noRelation') || changedProperties.has('multiple')) {
      this.manager.setMode(this.mode);
    }
    super.update(changedProperties);
  }

  /**
   * Selected items in tree
   * @override
   * @type {string[]}
   */
  public get values (): string[] {
    return this.manager.checkedItems.map(item => {
      return this.composer.getItemPropertyValue(item, 'value') as string || '';
    });
  }
  public set values (value: string[]) {
    super.values = value;
  }

  /**
   * Data object to be used for creating tree
   * @override
   * @type {TreeManager<T>}
   */
  public get data (): T[] | CollectionComposer<T> | null {
    return super.data;
  }
  public set data (data: T[] | CollectionComposer<T> | null) {
    super.data = data;
    this.manager = new TreeManager<T>(this.composer, this.mode);
  }

  /**
   * @override
   */
  protected get renderItems (): readonly T[] {
    return this.manager.visibleItems;
  }

  /**
   * Mode to use in the tree manager
   */
  protected get mode (): TreeManagerMode {
    return !this.multiple || !this.noRelation
      ? TreeManagerMode.RELATIONAL : TreeManagerMode.INDEPENDENT;
  }
}
