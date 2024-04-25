import type { TreeDataItem } from '../helpers/types';
import { CheckedState, TreeManager } from './tree-manager.js';

/**
 * `TreeNode` is expected to be used with `TreeManager` in tandem with Tree & Tree Select components.
 * Accordingly, only accessors for `TreeDataItem`'s properties are implemented.
 */
export class TreeNode<T extends TreeDataItem = TreeDataItem> {
  protected item: T;
  protected manager: TreeManager<T>;

  /**
   * @param item item to be managed
   * @param manager `TreeManager` of the item to be managed
   * @hidden this constructor should be used internally & only by `TreeManager`
   */
  constructor(item: T, manager: TreeManager<T>) {
    this.item = item;
    this.manager = manager;
  }

  /** Icon to show, when rendering the item. */
  public get icon(): string | undefined {
    return this.getPropertyValue('icon');
  }

  public set icon(icon: string | undefined) {
    this.setPropertyValue('icon', icon);
  }

  /** Label to show, when rendering the item. */
  public get label(): string {
    return this.getPropertyValue('label');
  }

  public set label(value: string) {
    this.setPropertyValue('label', value);
  }

  /**
   * Value of the data item.
   * This is usually the value which is returned,
   * when the item is selected.
   */
  public get value(): string {
    return this.getPropertyValue('value');
  }

  public set value(value: string) {
    this.setPropertyValue('value', value);
  }

  /**
   * Sets the item to be readonly.
   * Read only items cannot be selected by a user.
   */
  public get readonly(): boolean {
    return !!this.getPropertyValue('readonly');
  }

  public set readonly(value: boolean) {
    this.setPropertyValue('readonly', value);
  }

  /**
   * Sets the highlight state of the item.
   * This is usually used for navigating over items,
   * without affecting focus or multiple item selection.
   */
  public get highlighted(): boolean {
    return !!this.getPropertyValue('highlighted');
  }

  public set highlighted(value: boolean) {
    this.setPropertyValue('highlighted', value);
  }

  /**
   * Sets the item to be disabled.
   * This completely prevents the item from being interacted with.
   */
  public get disabled(): boolean {
    return !!this.getPropertyValue('disabled');
  }

  public set disabled(value: boolean) {
    this.setPropertyValue('disabled', value);
  }

  /**
   * Whether to show or hide the item from the renderer.
   * @readonly
   */
  // no setter due to a conflict with `hidden` usage in filterItems of Tree component.
  public get hidden(): boolean {
    return !!this.getPropertyValue('hidden');
  }

  /** Expanded state of child items. If `true`, child items will be visible. */
  public get expanded() {
    return this.manager.isItemExpanded(this.item);
  }

  public set expanded(value: boolean) {
    if (value) {
      this.manager.expandItem(this.item);
    } else {
      this.manager.collapseItem(this.item);
    }
  }

  /**
   * Timestamp indicating the order of sequential selection.
   * @readonly
   */
  public get selectedAt(): number | undefined {
    return this.getPropertyValue('selectedAt');
  }

  /**
   * Selection state of the item.
   * If its `TreeManager` is in relationship mode, value would be get/set hierarchically.
   * For instance, items with children would be considered selected when all children are selected.
   * <br>
   * <br>
   * For indeterminate state support, use `getCheckedState()` instead.
   */
  public get selected(): boolean {
    const checkedState = this.manager.getItemCheckedState(this.item);
    return checkedState === CheckedState.CHECKED;
  }

  public set selected(value: boolean) {
    if (value) {
      this.manager.checkItem(this.item);
    } else {
      this.manager.uncheckItem(this.item);
    }
  }

  /**
   * Return checked state of the item.
   * Apart from checked & unchecked state of `selected` accessor,
   * this method supports indeterminate state for items that some but not all of their children are selected.
   * @returns item checked state: `1` for checked, `0` for unchecked and `-1` for indeterminate
   */
  public getCheckedState(): CheckedState {
    return this.manager.getItemCheckedState(this.item);
  }

  public getAncestors(): TreeNode<T>[] {
    const ancestors = this.manager.getItemAncestors(this.item);
    return ancestors.map((ancestor) => this.manager.getTreeNode(ancestor) as TreeNode<T>);
  }

  public getChildren(): TreeNode<T>[] {
    const children = this.manager.getItemChildren(this.item);
    return children.map((child) => this.manager.getTreeNode(child) as TreeNode<T>);
  }

  public getDescendants(depth?: number): TreeNode<T>[] {
    const descendants = this.manager.getItemDescendants(this.item, depth);
    return descendants.map((descendant) => this.manager.getTreeNode(descendant) as TreeNode<T>);
  }

  public getParent(): TreeNode<T> | null {
    const parent = this.manager.getItemParent(this.item);
    return parent ? this.manager.getTreeNode(parent) : null;
  }

  public isSelectable(): boolean {
    return this.manager.isItemCheckable(this.item);
  }

  public isParent(): boolean {
    return this.manager.isItemParent(this.item);
  }

  public isChild(): boolean {
    return this.manager.isItemChild(this.item);
  }

  /**
   * Return the depth of the item starting from 0 for root items,
   * 1 for children of root items, 2 for grandchildren of root items and so on.
   * @returns depth of the item
   */
  public getDepth(): number {
    return this.manager.composer.getItemDepth(this.item);
  }

  /**
   * Request the item to be rerendered manually.
   * This should be unnecessary most of the time as rerender is internally triggered by property update already.
   * @returns {void}
   */
  public rerender(): void {
    this.manager.updateItem(this.item);
  }

  /**
   * Retrieve a value of the specified property.
   * @param prop property key
   * @returns property value
   */
  private getPropertyValue<R>(prop: string): R {
    return this.manager.composer.getItemPropertyValue(this.item, prop) as R;
  }

  /**
   * Set a value of the specified property.
   * @param prop property key
   * @param value property value
   * @returns {void}
   */
  private setPropertyValue(prop: string, value: unknown): void {
    return this.manager.composer.setItemPropertyValue(this.item, prop, value as T['string']);
  }
}
