import type { TreeDataItem } from '../helpers/types';
// eslint-disable-next-line import/extensions
import { CheckedState, TreeManager } from './tree-manager';

// TreeNode is expected to be used with TreeManager in tandem with Tree & Tree Select components.
// Accordingly, only accessor methods for TreeDataItem's props are implemented.
export class TreeNode<T extends TreeDataItem = TreeDataItem> {
  protected item: T;
  protected manager: TreeManager<T>;

  constructor(item: T, manager: TreeManager<T>) {
    this.item = item;
    this.manager = manager;
  }

  get icon(): string {
    return this.getPropertyValue('icon');
  }

  set icon(value: string) {
    this.setPropertyValue('icon', value);
  }

  get label(): string {
    return this.getPropertyValue('label');
  }

  set label(value: string) {
    this.setPropertyValue('label', value);
  }

  get value(): string {
    return this.getPropertyValue('value');
  }

  set value(value: string) {
    this.setPropertyValue('value', value);
  }

  get readonly(): boolean {
    return this.getPropertyValue('readonly');
  }

  set readonly(value: boolean) {
    this.setPropertyValue('readonly', value);
  }

  get highlighted(): boolean {
    return this.getPropertyValue('highlighted');
  }

  set highlighted(value: boolean) {
    this.setPropertyValue('highlighted', value);
  }

  get disabled(): boolean {
    return this.getPropertyValue('disabled');
  }

  set disabled(value: boolean) {
    this.setPropertyValue('disabled', value);
  }

  get selectedAt(): number {
    return this.getPropertyValue('selectedAt');
  }

  /**
   * Return selected state of the item.
   * If the item has any children, return `true` when all children are selected.
   * Otherwise, return `false`.
   * *NOTE: For indeterminate state support, use `getCheckedState()` instead.*
   */
  get selected(): boolean {
    const checkedState = this.manager.getItemCheckedState(this.item);
    return checkedState === CheckedState.CHECKED;
  }

  set selected(value: boolean) {
    if (value) {
      this.manager.checkItem(this.item);
    } else {
      this.manager.uncheckItem(this.item);
    }
  }

  // no setter due to a conflict with `hidden` usage in filterItems of Tree component
  get hidden(): boolean {
    return this.getPropertyValue('hidden');
  }

  get expanded() {
    return this.manager.isItemExpanded(this.item);
  }

  set expanded(value: boolean) {
    if (value) {
      this.manager.expandItem(this.item);
    } else {
      this.manager.collapseItem(this.item);
    }
  }

  getCheckedState(): CheckedState {
    return this.manager.getItemCheckedState(this.item);
  }

  getAncestors(): TreeNode<T>[] {
    const ancestors = this.manager.getItemAncestors(this.item);
    return ancestors.map((ancestor) => this.manager.getTreeNode(ancestor));
  }

  getChildren(): TreeNode<T>[] {
    const children = this.manager.getItemChildren(this.item);
    return children.map((child) => this.manager.getTreeNode(child));
  }

  getDescendants(): TreeNode<T>[] {
    const descendants = this.manager.getItemDescendants(this.item);
    return descendants.map((descendant) => this.manager.getTreeNode(descendant));
  }

  getParent(): TreeNode<T> | null {
    const parent = this.manager.getItemParent(this.item);
    return parent ? this.manager.getTreeNode(parent) : null;
  }

  isSelectable(): boolean {
    return this.manager.isItemCheckable(this.item);
  }

  isParent(): boolean {
    return this.manager.isItemParent(this.item);
  }

  isChild(): boolean {
    return this.manager.isItemChild(this.item);
  }

  rerender(): void {
    this.manager.updateItem(this.item);
  }

  private getPropertyValue<R>(prop: string): R {
    return this.manager.composer.getItemPropertyValue(this.item, prop) as R;
  }

  private setPropertyValue(prop: string, value: unknown) {
    return this.manager.composer.setItemPropertyValue(this.item, prop, value as T['string']);
  }
}
