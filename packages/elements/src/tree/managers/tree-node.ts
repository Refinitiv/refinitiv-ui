import type { TreeDataItem } from '../helpers/types';
// eslint-disable-next-line import/extensions
import { CheckedState, TreeManager } from './tree-manager';

export class TreeNode<T extends TreeDataItem> {
  protected item: T;
  protected manager: TreeManager<T>;

  constructor(item: T, manager: TreeManager<T>) {
    this.item = item;
    this.manager = manager;
  }

  // TODO: TBD API
  // return all values of TreeNode as an object
  getValues() {
    const basicEntries = Object.entries(this.item).filter(([key, value]) => {
      return !['selectedAt', 'items'].includes(key);
    });
    return Object.fromEntries(basicEntries);
  }

  get selectedAt(): number {
    return this.manager.composer.getItemPropertyValue(this.item, 'selectedAt') as number;
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

  // readonly due to a conflict with `hidden` usage in filterItems of Tree component
  get hidden(): boolean {
    return this.manager.composer.getItemPropertyValue(this.item, 'hidden') as boolean;
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

  // required for tree manager's addItem() while keeping `item` protected
  addChild(item: T, index?: number): TreeNode<T> {
    return this.manager.addItem(item, this.item, index);
  }

  /**
   * remove the item from TreeManager
   * @return void
   */
  remove(): void {
    this.manager.removeItem(this.item);
  }
}

const nonBasicProps = ['selected', 'hidden', 'expanded', 'selectedAt', 'items'];

export const createTreeNode = <T extends TreeDataItem>(item: T, manager: TreeManager<T>): TreeNode<T> => {
  const handler = {
    get(target: TreeNode<T>, prop: string): unknown {
      if (nonBasicProps.includes(prop)) {
        return Reflect.get(target, prop);
      }
      return manager.composer.getItemPropertyValue(item, prop);
    },
    set(target: TreeNode<T>, prop: string, value: T[string]): boolean {
      if (nonBasicProps.includes(prop)) {
        return Reflect.set(target, prop, value);
      }
      manager.composer.setItemPropertyValue(item, prop, value);
      return true;
    }
  };
  const target = new TreeNode(item, manager);
  return new Proxy<TreeNode<T>>(target, handler);
};
