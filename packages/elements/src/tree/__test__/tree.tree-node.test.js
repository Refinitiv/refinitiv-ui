// import element and theme
import { CheckedState, TreeManager, TreeManagerMode } from '@refinitiv-ui/elements/tree';

import '@refinitiv-ui/elemental-theme/light/ef-tree';
import { aTimeout, elementUpdated, expect, fixture, nextFrame } from '@refinitiv-ui/test-helpers';
import { uuid } from '@refinitiv-ui/utils/uuid.js';

import { getItemId } from '../../../lib/list/helpers/item-id.js';
import { deepNestedData, flatData, multiLevelData, nestedData } from './helpers/data.js';
import { getIconPart, getLabelContent, sortTreeNode } from './helpers/utils.js';

describe('tree/Tree Node', function () {
  describe('getAncestors method', function () {
    it('should return all ancestors of an item', function () {
      const manager = new TreeManager(deepNestedData);
      const treeNodes = manager.getTreeNodes();
      const targetNode = treeNodes.find((node) => node.value === '1.3.1.3');
      const ancestors = targetNode.getAncestors();
      const expectedAncestors = [
        treeNodes.find((node) => node.value === '1'),
        treeNodes.find((node) => node.value === '1.3'),
        treeNodes.find((node) => node.value === '1.3.1')
      ];
      // length equality check
      expect(ancestors.length).to.equal(
        expectedAncestors.length,
        'ancestors and expected ancestors should have the same length'
      );

      ancestors.sort(sortTreeNode);
      expectedAncestors.sort(sortTreeNode);
      let allEqual = true;
      for (let index = 0; index < expectedAncestors.length; index++) {
        const ancestor = ancestors[index];
        const expectedAncestor = expectedAncestors[index];
        if (ancestor.value !== expectedAncestor.value) {
          allEqual = false;
          break;
        }
      }
      // all element equality check
      expect(allEqual).to.equal(true, 'ancestors and expected ancestors should be all equal');
    });

    it('should return an empty array for root item', function () {
      const manager = new TreeManager(multiLevelData);
      const treeNodes = manager.getTreeNodes();
      const targetNode = treeNodes.find((node) => node.value === 'l12');
      const ancestors = targetNode.getAncestors();

      expect(ancestors.length).to.equal(0, 'ancestor array length should be 0');
    });
  });

  describe('getCheckedState method', function () {
    let manager;
    let treeNodes;
    before(function () {
      manager = new TreeManager(deepNestedData);
      treeNodes = manager.getTreeNodes();
    });

    it('should return CHECKED for selected item', function () {
      const treeNode = treeNodes.find((node) => node.value === '1.3.1.2');
      const state = treeNode.getCheckedState();
      expect(state).to.equal(CheckedState.CHECKED, 'item checked state should be CHECKED');
    });

    it('should return CHECKED for unselected item item with all selected children', function () {
      const treeNode = treeNodes.find((node) => node.value === '1.3.1');
      const state = treeNode.getCheckedState();
      expect(state).to.equal(CheckedState.CHECKED, 'item checked state should be CHECKED');
    });

    it('should return CHECKED for unselected item item with all selected grand children', function () {
      const treeNode = treeNodes.find((node) => node.value === '1.3');
      const state = treeNode.getCheckedState();
      expect(state).to.equal(CheckedState.CHECKED, 'item checked state should be CHECKED');
    });

    it('should return UNCHECKED for unselected item', function () {
      const treeNode = treeNodes.find((node) => node.value === '1.2');
      const state = treeNode.getCheckedState();
      expect(state).to.equal(CheckedState.UNCHECKED, 'item checked state should be UNCHECKED');
    });

    it('should return INDETERMINATE for unselected item with some checked children', function () {
      const treeNode = treeNodes.find((node) => node.value === '1');
      const state = treeNode.getCheckedState();
      expect(state).to.equal(CheckedState.INDETERMINATE, 'item checked state should be INDETERMINATE');
    });
  });

  describe('getChildren method', function () {
    it('should return all children of an item', function () {
      const manager = new TreeManager(multiLevelData);
      const treeNodes = manager.getTreeNodes();
      const targetNode = treeNodes.find((node) => node.value === 'l11');
      const children = targetNode.getChildren();
      const expectedChildren = [
        treeNodes.find((node) => node.value === 'l21'),
        treeNodes.find((node) => node.value === 'l22')
      ];
      // length equality check
      expect(children.length).to.equal(
        expectedChildren.length,
        'children and expected children should have the same length'
      );

      children.sort(sortTreeNode);
      expectedChildren.sort(sortTreeNode);
      let allEqual = true;
      for (let index = 0; index < expectedChildren.length; index++) {
        const child = children[index];
        const expectedChild = expectedChildren[index];
        if (child.value !== expectedChild.value) {
          allEqual = false;
          break;
        }
      }
      // all element equality check
      expect(allEqual).to.equal(true, 'children and expected children should be all equal');
    });

    it('should return an empty array for an item without children', function () {
      const manager = new TreeManager(multiLevelData);
      const treeNodes = manager.getTreeNodes();
      const targetNode = treeNodes.find((node) => node.value === 'l33');
      const children = targetNode.getChildren();

      expect(children.length).to.equal(0, 'children length should be 0');
    });
  });

  describe('getDescendants method', function () {
    it('should return all descendants of an item', function () {
      const manager = new TreeManager(multiLevelData);
      const treeNodes = manager.getTreeNodes();
      const targetNode = treeNodes.find((node) => node.value === 'l11');
      const descendants = targetNode.getDescendants();
      const expectedDescendants = [
        treeNodes.find((node) => node.value === 'l21'),
        treeNodes.find((node) => node.value === 'l22'),
        treeNodes.find((node) => node.value === 'l31'),
        treeNodes.find((node) => node.value === 'l32'),
        treeNodes.find((node) => node.value === 'l33')
      ];
      // length equality check
      expect(descendants.length).to.equal(
        expectedDescendants.length,
        'descendants and expected descendants should have the same length'
      );

      descendants.sort(sortTreeNode);
      expectedDescendants.sort(sortTreeNode);
      let allEqual = true;
      for (let index = 0; index < expectedDescendants.length; index++) {
        const descendant = descendants[index];
        const expectedDescendant = expectedDescendants[index];
        if (descendant.value !== expectedDescendant.value) {
          allEqual = false;
          break;
        }
      }
      // all element equality check
      expect(allEqual).to.equal(true, 'descendants and expected descendants should be all equal');
    });

    it('should return an empty array for an item without descendants', function () {
      const manager = new TreeManager(multiLevelData);
      const treeNodes = manager.getTreeNodes();
      const targetNode = treeNodes.find((node) => node.value === 'l33');
      const descendants = targetNode.getDescendants();

      expect(descendants.length).to.equal(0, 'children length should be 0');
    });
  });

  describe('getParent method', function () {
    it('should return the parent of an item', function () {
      const manager = new TreeManager(multiLevelData);
      const treeNodes = manager.getTreeNodes();
      const targetNode = treeNodes.find((node) => node.value === 'l32');
      const parent = targetNode.getParent();
      const expectedParent = treeNodes.find((node) => node.value === 'l21');
      expect(parent.value).to.equal(expectedParent.value, 'parent and expected parent should be all equal');
    });

    it('should return null for root item', function () {
      const manager = new TreeManager(multiLevelData);
      const treeNodes = manager.getTreeNodes();
      const targetNode = treeNodes.find((node) => node.value === 'l11');
      const parent = targetNode.getParent();

      expect(parent).to.equal(null, 'parent should be null');
    });
  });

  describe('isSelectable method', function () {
    it('should return true for an item which is neither readonly nor disabled', function () {
      const manager = new TreeManager(flatData);
      const treeNodes = manager.getTreeNodes();
      const targetNode = treeNodes.find((node) => node.value === '1');
      expect(targetNode.isSelectable()).to.equal(
        true,
        'either readonly nor disabled item should be selectable'
      );
    });
    it('should return false for disabled item', function () {
      const manager = new TreeManager(flatData);
      const treeNodes = manager.getTreeNodes();
      const targetNode = treeNodes.find((node) => node.value === '3');
      expect(targetNode.isSelectable()).to.equal(false, 'disabled item should not be selectable');
    });
    it('should return false for read-only item', function () {
      const manager = new TreeManager(flatData);
      const treeNodes = manager.getTreeNodes();
      const targetNode = treeNodes.find((node) => node.value === '2');
      expect(targetNode.isSelectable()).to.equal(false, 'read-only item should not be selectable');
    });
  });

  describe('isChild method', function () {
    it('should return true for child item', function () {
      const manager = new TreeManager(multiLevelData);
      const treeNodes = manager.getTreeNodes();
      const targetNode = treeNodes.find((node) => node.value === 'l32');
      expect(targetNode.isChild()).to.equal(true, 'the item should be a child');
    });

    it('should return true for for an item which is a child & a parent at the same', function () {
      const manager = new TreeManager(multiLevelData);
      const treeNodes = manager.getTreeNodes();
      const targetNode = treeNodes.find((node) => node.value === 'l21');
      expect(targetNode.isChild()).to.equal(true, 'the item should be a child');
    });

    it('should return false for root item', function () {
      const manager = new TreeManager(multiLevelData);
      const treeNodes = manager.getTreeNodes();
      const targetNode = treeNodes.find((node) => node.value === 'l12');
      expect(targetNode.isChild()).to.equal(false, 'the item should not be a child');
    });
  });

  describe('isParent method', function () {
    it('should return true for parent item', function () {
      const manager = new TreeManager(multiLevelData);
      const treeNodes = manager.getTreeNodes();
      const targetNode = treeNodes.find((node) => node.value === 'l12');
      expect(targetNode.isParent()).to.equal(true, 'the item should be a parent');
    });

    it('should return true for for an item which is a child & a parent at the same', function () {
      const manager = new TreeManager(multiLevelData);
      const treeNodes = manager.getTreeNodes();
      const targetNode = treeNodes.find((node) => node.value === 'l21');
      expect(targetNode.isParent()).to.equal(true, 'the item should be a parent');
    });

    it('should return false for an item without children', function () {
      const manager = new TreeManager(multiLevelData);
      const treeNodes = manager.getTreeNodes();
      const targetNode = treeNodes.find((node) => node.value === 'l32');
      expect(targetNode.isParent()).to.equal(false, 'the item should not be a parent');
    });
  });

  describe('rerender method', function () {
    it('should update timestamp of an item', async function () {
      const manager = new TreeManager(flatData);
      const treeNodes = manager.getTreeNodes();
      const targetNode = treeNodes.find((node) => node.value === '1');
      const oldTimestamp = manager.composer.getItemTimestamp(targetNode.item);
      await aTimeout(1); // make sure performance.now() returns a new value on all major browsers
      targetNode.rerender();
      const newTimestamp = manager.composer.getItemTimestamp(targetNode.item);
      expect(newTimestamp).to.be.greaterThan(
        oldTimestamp,
        'the new timestamp should be greater than the old one'
      );
    });
  });

  describe('accessor methods with rendering', function () {
    describe('value prop', function () {
      it('should add value prop value', function () {
        const value = '1';
        const item = { label: 'one' };
        const manager = new TreeManager([item]);
        const treeNode = manager.getTreeNode(item);
        expect(treeNode.value).to.equal(undefined, 'value should be undefined');

        treeNode.value = value;
        expect(treeNode.value).to.equal(value, `value should be ${value}`);
        expect(manager.composer.getItemPropertyValue(item, 'value')).to.equal(
          value,
          `value should be ${value}`
        );
      });

      it('should update value prop value', function () {
        const value = '1';
        const item = { label: 'one', value };
        const manager = new TreeManager([item]);
        const treeNode = manager.getTreeNode(item);
        expect(treeNode.value).to.equal('1', `value should be ${value}`);

        const newValue = '1 edited';
        treeNode.value = newValue;
        expect(treeNode.value).to.equal(newValue, `value should be ${newValue}`);
        expect(manager.composer.getItemPropertyValue(item, 'value')).to.equal(
          newValue,
          `value should be ${newValue}`
        );
      });
    });

    describe('icon prop', function () {
      it('should read icon prop value', function () {
        const icon = 'flame';
        const item = { label: 'one', value: '1', icon };
        const manager = new TreeManager([item]);
        const treeNode = manager.getTreeNode(item);
        expect(treeNode.icon).to.equal(icon, `icon should be ${icon}`);
      });

      it('should add icon prop value', async function () {
        const el = await fixture('<ef-tree></ef-tree>');
        el.data = flatData;
        await elementUpdated(el);

        const index = 3;
        let iconPart = getIconPart(el.children[index]);
        expect(iconPart).to.equal(null, 'rendered icon should not exist');

        const treeNodes = el.manager.getTreeNodes();
        const node = treeNodes[index];
        const icon = 'favorites';
        node.icon = icon;
        await nextFrame();
        iconPart = getIconPart(el.children[index]);
        expect(iconPart.attributes.icon.value).to.equal(icon, `rendered icon should be ${icon}`);
      });

      it('should update icon prop value', async function () {
        const el = await fixture('<ef-tree></ef-tree>');
        el.data = flatData;
        await elementUpdated(el);

        const index = 0;
        const elementIcon = getIconPart(el.children[index]);
        expect(elementIcon.attributes.icon.value).to.equal('info', 'rendered icon should be info');

        const treeNodes = el.manager.getTreeNodes();
        const node = treeNodes[index];
        const icon = 'flame';
        node.icon = icon;
        await nextFrame();
        expect(elementIcon.attributes.icon.value).to.equal(icon, `rendered icon should be ${icon}`);
      });

      it('should remove icon prop value', async function () {
        const el = await fixture('<ef-tree></ef-tree>');
        el.data = flatData;
        await elementUpdated(el);

        const index = 0;
        let elementIcon = getIconPart(el.children[index]);
        expect(elementIcon.attributes.icon.value).to.equal('info', 'rendered icon should be info');

        const treeNodes = el.manager.getTreeNodes();
        const node = treeNodes[index];
        node.icon = undefined;
        await nextFrame();
        elementIcon = getIconPart(el.children[index]);
        expect(elementIcon).to.equal(null, 'rendered icon should not exist');
      });
    });

    describe('label prop', function () {
      it('should read label prop value', function () {
        const label = 'one';
        const item = { value: '1', label };
        const manager = new TreeManager([item]);
        const treeNode = manager.getTreeNode(item);
        expect(treeNode.label).to.equal(label, `label should be ${label}`);
      });

      // no add testing as initially item's label must be set

      it('should update label prop value', async function () {
        const el = await fixture('<ef-tree></ef-tree>');
        el.data = flatData;
        await elementUpdated(el);

        const index = 0;
        let labelContent = getLabelContent(el.children[index]);
        expect(labelContent).to.equal('Item 1', "rendered label should be 'Item 1'");

        const treeNodes = el.manager.getTreeNodes();
        const node = treeNodes[index];
        const label = '1 edited';
        node.label = label;
        await nextFrame();
        labelContent = getLabelContent(el.children[index]);
        expect(labelContent).to.equal(label, `rendered label should be ${label}`);
      });

      // label are expected not to be removed
    });

    describe('expanded prop', function () {
      describe('read expanded prop', function () {
        it('should read expanded as false for non-parent items', function () {
          const item = { value: '1', label: 'one', expanded: true };
          const manager = new TreeManager([item]);
          const treeNode = manager.getTreeNode(item);
          expect(treeNode.expanded).to.equal(false, 'item expanded should be false');
        });

        it('should read unset expanded as false for parent item', function () {
          const manager = new TreeManager(multiLevelData);
          const treeNodes = manager.getTreeNodes();
          const node = treeNodes.find((node) => node.value === 'l11');
          expect(node.expanded).to.equal(false, 'item expanded should be false');
        });

        it('should read expanded as-is for parent items', function () {
          const data = [
            { value: '1', label: 'one', expanded: false, items: [{ value: '1.1', label: 'one-one' }] }
          ];
          let manager = new TreeManager(data);
          let treeNodes = manager.getTreeNodes();
          const unexpandedParent = treeNodes.find((node) => node.value === '1');
          expect(unexpandedParent.expanded).to.equal(false, 'item expanded should be false');

          manager = new TreeManager(multiLevelData);
          treeNodes = manager.getTreeNodes();
          const expandedParent = treeNodes.find((node) => node.value === 'l21');
          expect(expandedParent.expanded).to.equal(true, 'item expanded should be true');
        });
      });

      it('should add expanded prop value', async function () {
        const el = await fixture('<ef-tree></ef-tree>');
        el.data = multiLevelData;
        await elementUpdated(el);

        const index = 0;
        const treeNodes = el.manager.getTreeNodes();
        const node = treeNodes[index];
        node.expanded = true;
        await nextFrame();
        expect(el.children[index].expanded).to.equal(true, 'item should be rendered as expanded');
      });

      it('should update expanded prop value', async function () {
        const el = await fixture('<ef-tree></ef-tree>');
        el.data = nestedData;
        await elementUpdated(el);

        const index = 0;
        expect(el.children[index].expanded).to.equal(true, 'item should be rendered as expanded');

        const treeNodes = el.manager.getTreeNodes();
        const node = treeNodes[index];
        node.expanded = false;
        await nextFrame();
        expect(el.children[index].expanded).to.equal(false, 'item should be rendered as unexpanded');
      });

      // no removal as undefined & false value represent the same state
    });

    describe('hidden prop', function () {
      describe('read hidden prop', function () {
        it('should read hidden prop as-is', function () {
          const data = [
            { value: '1', label: 'one', hidden: false },
            { value: '2', label: 'two', hidden: true }
          ];
          const manager = new TreeManager(data);
          const treeNodes = manager.getTreeNodes();
          expect(treeNodes[0].hidden).to.equal(false, 'hidden should be false');
          expect(treeNodes[1].hidden).to.equal(true, 'hidden should be true');
        });

        it('should read unset hidden prop as false', function () {
          const data = [{ value: '1', label: 'one' }];
          const manager = new TreeManager(data);
          const treeNodes = manager.getTreeNodes();
          expect(treeNodes[0].hidden).to.equal(false, 'hidden should be false');
        });
      });
    });

    describe('readonly prop', function () {
      describe('read readonly prop', function () {
        it('should read readonly prop as-is', function () {
          const data = [
            { value: '1', label: 'one', readonly: false },
            { value: '2', label: 'two', readonly: true }
          ];
          const manager = new TreeManager(data);
          const treeNodes = manager.getTreeNodes();
          expect(treeNodes[0].readonly).to.equal(false, 'readonly should be false');
          expect(treeNodes[1].readonly).to.equal(true, 'readonly should be true');
        });

        it('should read unset readonly prop as false', function () {
          const data = [{ value: '1', label: 'one' }];
          const manager = new TreeManager(data);
          const treeNodes = manager.getTreeNodes();
          expect(treeNodes[0].readonly).to.equal(false, 'readonly should be false');
        });
      });

      it('should add readonly prop value', async function () {
        const el = await fixture('<ef-tree></ef-tree>');
        el.data = flatData;
        await elementUpdated(el);

        const index = 0;
        const treeNodes = el.manager.getTreeNodes();
        const node = treeNodes[index];
        node.readonly = true;
        await nextFrame();
        expect(el.children[index].readonly).to.equal(true, 'item should be rendered as read-only');
      });

      it('should update readonly prop value', async function () {
        const el = await fixture('<ef-tree></ef-tree>');
        el.data = flatData;
        await elementUpdated(el);

        const index = 1;
        expect(el.children[index].readonly).to.equal(true, 'item should be rendered as read-only');

        const treeNodes = el.manager.getTreeNodes();
        const node = treeNodes[index];
        node.readonly = false;
        await nextFrame();
        expect(el.children[index].readonly).to.equal(false, 'item should be rendered as editable');
      });

      // no removal as undefined & false value represent the same state
    });

    describe('highlighted prop', function () {
      describe('read highlighted prop', function () {
        it('should read highlighted prop as-is', function () {
          const data = [
            { value: '1', label: 'one', highlighted: false },
            { value: '2', label: 'two', highlighted: true }
          ];
          const manager = new TreeManager(data);
          const treeNodes = manager.getTreeNodes();
          expect(treeNodes[0].highlighted).to.equal(false, 'highlighted should be false');
          expect(treeNodes[1].highlighted).to.equal(true, 'highlighted should be true');
        });

        it('should read unset highlighted prop as false', function () {
          const data = [{ value: '1', label: 'one' }];
          const manager = new TreeManager(data);
          const treeNodes = manager.getTreeNodes();
          expect(treeNodes[0].highlighted).to.equal(false, 'highlighted should be false');
        });
      });

      it('should add highlighted prop value', async function () {
        const el = await fixture('<ef-tree></ef-tree>');
        el.data = flatData;
        await elementUpdated(el);

        const index = 0;
        const treeNodes = el.manager.getTreeNodes();
        const node = treeNodes[index];
        node.highlighted = true;
        await nextFrame();
        expect(el.children[index].highlighted).to.equal(true, 'item should be rendered as highlighted');
      });

      it('should update highlighted prop value', async function () {
        const el = await fixture('<ef-tree></ef-tree>');
        el.data = [
          { value: '1', label: 'one', highlighted: false },
          { value: '2', label: 'two', highlighted: true }
        ];
        await elementUpdated(el);

        const index = 1;
        expect(el.children[index].highlighted).to.equal(true, 'item should be rendered as highlighted');

        const treeNodes = el.manager.getTreeNodes();
        const node = treeNodes[index];
        node.highlighted = false;
        await nextFrame();
        expect(el.children[index].highlighted).to.equal(false, 'item should be rendered as not highlighted');
      });

      // no removal as undefined & false value represent the same state
    });

    describe('selected prop', function () {
      describe('read selected prop', function () {
        it('should read selected prop as-is', function () {
          const data = [
            { value: '1', label: 'one', selected: false },
            { value: '2', label: 'two', selected: true }
          ];
          const manager = new TreeManager(data);
          const treeNodes = manager.getTreeNodes();
          expect(treeNodes[0].selected).to.equal(false, 'selected should be false');
          expect(treeNodes[1].selected).to.equal(true, 'selected should be true');
        });

        it('should read unset selected prop as false', function () {
          const data = [{ value: '1', label: 'one' }];
          const manager = new TreeManager(data);
          const treeNodes = manager.getTreeNodes();
          expect(treeNodes[0].selected).to.equal(false, 'selected should be false');
        });
      });

      it('should add selected prop value', async function () {
        const el = await fixture('<ef-tree></ef-tree>');
        el.data = flatData;
        await elementUpdated(el);

        const index = 0;
        const treeNodes = el.manager.getTreeNodes();
        const node = treeNodes[index];
        node.selected = true;
        await nextFrame();
        expect(el.children[index].checked).to.equal(true, 'item should be rendered as selected');
      });

      it('should update selected prop value', async function () {
        const el = await fixture('<ef-tree></ef-tree>');
        el.data = flatData;
        await elementUpdated(el);

        const index = 3;
        expect(el.children[index].checked).to.equal(true, 'item should be rendered as selected');

        const treeNodes = el.manager.getTreeNodes();
        const node = treeNodes[index];
        node.selected = false;
        await nextFrame();
        expect(el.children[index].checked).to.equal(false, 'item should be rendered as not selected');
      });

      // no removal as undefined & false value represent the same state
    });

    describe('selectedAt prop', function () {
      let treeNodes;
      before(function () {
        const manager = new TreeManager(flatData);
        treeNodes = manager.getTreeNodes();
      });
      it('should read unset selectedAt as undefined', function () {
        expect(treeNodes[0].selectedAt).to.equal(undefined, 'selectedAt should be initially undefined');
        expect(treeNodes[3].selectedAt).to.equal(undefined, 'selectedAt should be initially undefined');
      });

      it('should update selectedAt upon selected prop update', async function () {
        treeNodes[0].selected = true;
        await nextFrame();
        const SelectedAt = treeNodes[0].selectedAt;
        expect(typeof SelectedAt).to.equal('number', 'selectedAt should be updated to number');
      });
    });

    describe('disabled prop', function () {
      describe('read disabled prop', function () {
        it('should read disabled prop as-is', function () {
          const data = [
            { value: '1', label: 'one', disabled: false },
            { value: '2', label: 'two', disabled: true }
          ];
          const manager = new TreeManager(data);
          const treeNodes = manager.getTreeNodes();
          expect(treeNodes[0].disabled).to.equal(false, 'disabled should be false');
          expect(treeNodes[1].disabled).to.equal(true, 'disabled should be true');
        });

        it('should read unset disabled prop as false', function () {
          const data = [{ value: '1', label: 'one' }];
          const manager = new TreeManager(data);
          const treeNodes = manager.getTreeNodes();
          expect(treeNodes[0].disabled).to.equal(false, 'disabled should be false');
        });
      });

      it('should add disabled prop value', async function () {
        const el = await fixture('<ef-tree></ef-tree>');
        el.data = flatData;
        await elementUpdated(el);

        const index = 0;
        const treeNodes = el.manager.getTreeNodes();
        const node = treeNodes[index];
        node.disabled = true;
        await nextFrame();
        expect(el.children[index].disabled).to.equal(true, 'item should be rendered as disabled');
      });

      it('should update disabled prop value', async function () {
        const el = await fixture('<ef-tree></ef-tree>');
        el.data = flatData;
        await elementUpdated(el);

        const index = 2;
        expect(el.children[index].disabled).to.equal(true, 'item should be rendered as disabled');

        const treeNodes = el.manager.getTreeNodes();
        const node = treeNodes[index];
        node.disabled = false;
        await nextFrame();
        expect(el.children[index].disabled).to.equal(false, 'item should be rendered as not disabled');
      });

      // no removal as undefined & false value represent the same state
    });
  });

  describe('custom renderer', function () {
    it('should be able to render items with custom renderer built with TreeNode', async function () {
      const el = await fixture('<ef-tree></ef-tree>');
      el.data = nestedData;

      const createTreeNodeRenderer = (scope) => {
        const key = uuid();

        let manager;
        let currentMode;
        let currentComposer;
        return (item, composer, element = document.createElement('ef-tree-item')) => {
          const multiple = !!scope && scope.multiple === true;
          const noRelation = !!scope && scope.noRelation === true;
          const mode = !multiple || !noRelation ? TreeManagerMode.RELATIONAL : TreeManagerMode.INDEPENDENT;

          if (currentComposer !== composer || currentMode !== mode) {
            currentMode = mode;
            currentComposer = composer;
            manager = new TreeManager(composer, mode);
          }

          const treeNode = manager.getTreeNode(item);
          element.multiple = multiple;
          element.item = item;
          element.id = getItemId(key, item.value);
          element.depth = treeNode.getDepth();
          element.parent = treeNode.isParent();
          element.expanded = treeNode.expanded;
          element.checkedState =
            !multiple && element.parent ? CheckedState.UNCHECKED : treeNode.getCheckedState();
          element.icon = treeNode.icon;
          element.label = treeNode.label;
          element.disabled = treeNode.disabled;
          element.readonly = treeNode.readonly;
          element.highlighted = treeNode.highlighted;

          return element;
        };
      };

      el.renderer = createTreeNodeRenderer();
      await elementUpdated(el);
      const expectedLength = 6;
      expect(el.children.length).to.equal(
        expectedLength,
        `there should be ${expectedLength} children rendered under Tree element`
      );
    });
  });
});
