// import element and theme
import { CheckedState, TreeManager } from '@refinitiv-ui/elements/tree';

import '@refinitiv-ui/elemental-theme/light/ef-tree';

import { deepNestedData, multiLevelData } from './mock_data/data.js';

// const keyArrowUp = new KeyboardEvent('keydown', { key: 'ArrowUp' });
// const keyArrowDown = new KeyboardEvent('keydown', { key: 'ArrowDown' });
// const keyArrowLeft = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
// const keyArrowRight = new KeyboardEvent('keydown', { key: 'ArrowRight' });
// const keyEnter = new KeyboardEvent('keydown', { key: 'Enter' });

const sortTreeNode = (previousNode, currentNode) => previousNode.value < currentNode.value;

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
      expect(ancestors.length).to.be.equal(
        expectedAncestors.length,
        'ancestors and expect ancestors should have the same length'
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
      expect(allEqual).to.be.equal(true, 'ancestors and expect ancestors should be all equal');
    });

    it('should return an empty array for root item', function () {
      const manager = new TreeManager(multiLevelData);
      const treeNodes = manager.getTreeNodes();
      const targetNode = treeNodes.find((node) => node.value === 'l12');
      const ancestors = targetNode.getAncestors();

      expect(ancestors.length).to.be.equal(0, 'ancestor array length should be 0');
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

  // describe('getChildren method', function () {
  // });

  // describe('getDescendants method', function () {
  // });

  // describe('getParent method', function () {
  // });

  // describe('isSelectable method', function () {
  // });

  // describe('isChild method', function () {
  // });

  // describe('isParent method', function () {
  // });

  // describe('rerender method', function () {
  // });

  describe('accessor methods', function () {
    describe('value prop', function () {
      it('add', function () {
        const value = '1';
        const item = { label: 'one' };
        const manager = new TreeManager([item]);
        const treeNode = manager.getTreeNode(item);
        expect(treeNode.value).to.be.equal(undefined, 'value should be undefined');

        treeNode.value = value;
        expect(treeNode.value).to.be.equal(value, "value should be '1'");
        expect(manager.composer.getItemPropertyValue(item, 'value')).to.be.equal(
          value,
          "value in composer should be '1'"
        );
      });

      it('update', function () {
        const value = '1';
        const item = { label: 'one', value };
        const manager = new TreeManager([item]);
        const treeNode = manager.getTreeNode(item);
        expect(treeNode.value).to.be.equal('1', "value should be '1'");

        const newValue = '1 edited';
        treeNode.value = newValue;
        expect(treeNode.value).to.be.equal(newValue, "value should be '1 edited'");
        expect(manager.composer.getItemPropertyValue(item, 'value')).to.be.equal(
          newValue,
          "value in composer should be '1 edited'"
        );
      });
    });
  });

  // TODO: apply to Tree Select as well
  // describe('accessor methods with rendering', function () {
  //   describe('hidden prop', function () {
  //     it('read', function () {});

  //     it('add', function () {});

  //     it('update', function () {});

  //     it('remove', function () {});
  //   });
  // });
});
