import type { TreeDataItem } from '../helpers/types';
// eslint-disable-next-line import/extensions
import { CheckedState, TreeManager } from './tree-manager';

const nonBasicProps = ['selected', 'hidden', 'expanded', 'selectedAt', 'items'];
// const noAccessorProps = ['items'];

export class TreeNode<T extends TreeDataItem> {
  protected item: T;
  protected manager: TreeManager<T>;

  // ? there should be need for this as modification event relies on scheduler already.
  // protected updatedKeys:string[] = [];

  constructor(item: T, manager: TreeManager<T>) {
    // Set reference item
    this.item = item;
    this.manager = manager;

    // accessor for basic props
    for (const key of Object.keys(this.item).filter((key) => !nonBasicProps.includes(key))) {
      // get accessor
      Object.defineProperty(this, key, {
        get: () => {
          return this.manager.composer.getItemPropertyValue(item, key);
        },
        set: (value: T[string]) => {
          // ? there should be no need to update this
          // if (this.item[key] === value) { return; }
          // this.item[key] = value;
          if (this.manager.composer.getItemPropertyValue(item, key) === value) {
            return;
          }
          this.manager.composer.setItemPropertyValue(this.item, key, value);
        }
      });
    }
  }

  // TODO: TBD API
  // return all values of TreeNode as an object
  getValues() {
    const basicEntries = Object.entries(this.item).filter(([key, value]) => {
      return !['selectedAt', 'items'].includes(key);
    });
    return Object.fromEntries(basicEntries);
  }

  get selectedAt() {
    return this.manager.composer.getItemPropertyValue(this.item, 'selectedAt');
  }

  /**
   * Return selected state of the item.
   * If the item has any children, return `true` when all children are selected.
   * Otherwise, return `false`.
   * *NOTE: For indeterminate state support, use `getCheckedState()` instead.*
   */
  get selected() {
    const checkedState = this.manager.getItemCheckedState(this.item);
    return checkedState === CheckedState.CHECKED;
  }

  set selected(value: T['selected']) {
    if (value) {
      this.manager.checkItem(this.item);
    } else {
      this.manager.uncheckItem(this.item);
    }
  }

  // readonly due to a conflict with `hidden` usage in filterItems of Tree component
  get hidden() {
    return this.manager.composer.getItemPropertyValue(this.item, 'hidden');
  }

  get expanded() {
    return this.manager.isItemExpanded(this.item);
  }

  set expanded(value: T['expanded']) {
    if (value) {
      this.manager.expandItem(this.item);
    } else {
      this.manager.collapseItem(this.item);
    }
  }

  getCheckedState() {
    return this.manager.getItemCheckedState(this.item);
  }

  // TODO: cache TreeManagerItem so that there is no need to create them every time?
  getAncestors() {
    const ancestors = this.manager.getItemAncestors(this.item);
    return ancestors.map((ancestor) => new TreeNode(ancestor, this.manager));
  }

  // TODO: cache TreeManagerItem so that there is no need to create them every time?
  getChildren() {
    const children = this.manager.getItemChildren(this.item);
    return children.map((child) => new TreeNode(child, this.manager));
  }

  // TODO: cache TreeManagerItem so that there is no need to create them every time?
  getDescendants() {
    const descendants = this.manager.getItemDescendants(this.item);
    return descendants.map((descendant) => new TreeNode(descendant, this.manager));
  }

  // TODO: cache TreeManagerItem so that there is no need to create them every time?
  getParent() {
    const parent = this.manager.getItemParent(this.item);
    return parent ? new TreeNode(parent, this.manager) : null;
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
