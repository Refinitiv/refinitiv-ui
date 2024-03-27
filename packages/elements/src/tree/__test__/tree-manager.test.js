// import element and theme
import { createSandbox } from 'sinon';

import { TreeManager } from '@refinitiv-ui/elements/tree';

import { expect } from '@refinitiv-ui/test-helpers';

import { TreeNode } from '../../../lib/tree/managers/tree-node.js';
import { flatData } from './helpers/data.js';

describe('tree/Tree Manager', function () {
  describe('getTreeNodes method', function () {
    it('should return all items as TreeNode', function () {
      const manager = new TreeManager(flatData);
      const treeNodes = manager.getTreeNodes();
      const itemCount = flatData.length;
      expect(treeNodes.length).to.equal(itemCount, 'item count of input data & tree node should match');
      const allTreeNodes = treeNodes.every((treeNode) => treeNode instanceof TreeNode);
      expect(allTreeNodes).to.be.equal(true, 'all returned items should be a TreeNode');
    });

    it('should populate cache', function () {
      const manager = new TreeManager(flatData);
      manager.getTreeNodes();
      const itemCount = flatData.length;
      expect(manager.treeNodeCache.size).to.equal(
        itemCount,
        'item count of input data & cache size should match'
      );
    });

    it("should utilize cache once it's populated", function () {
      const sandbox = createSandbox();

      const manager = new TreeManager(flatData);
      const { treeNodeCache } = manager;
      // spy cache access
      sandbox.spy(treeNodeCache, 'get');

      // populate cache first
      manager.getTreeNodes();
      // cache action time
      manager.getTreeNodes();
      const expectedLength = flatData.length;
      const cacheGetCount = treeNodeCache.get.callCount;
      expect(cacheGetCount).to.equal(
        expectedLength,
        'cache get invocation count & input data count should match'
      );

      sandbox.restore();
    });
  });

  describe('getTreeNode method', function () {
    it('should return an item as TreeNode', function () {
      const targetIndex = -1;
      const lastItem = flatData.at(targetIndex);
      const manager = new TreeManager(flatData);
      const treeNode = manager.getTreeNode(lastItem);
      expect(treeNode.item).to.equal(lastItem, 'the TreeNode should be a proxy of the item');
      expect(treeNode instanceof TreeNode).to.be.equal(true, 'returned item should be a TreeNode');
    });

    it('should return null for non-existing item in TreeManager', function () {
      const mockItem = { value: 'one', label: '1' };
      const manager = new TreeManager(flatData);
      const treeNode = manager.getTreeNode(mockItem);
      expect(treeNode).to.equal(null, 'returned value should be null');
    });

    it('should populate cache', function () {
      const lastItem = flatData.at(-1);
      const manager = new TreeManager(flatData);
      manager.getTreeNode(lastItem);
      expect(manager.treeNodeCache.size).to.equal(1, 'cache size should be 1');

      const secondLastItem = flatData.at(-2);
      manager.getTreeNode(secondLastItem);
      expect(manager.treeNodeCache.size).to.equal(2, 'cache size should be 2');
    });

    it("should utilize cache once it's populated", function () {
      const sandbox = createSandbox();

      const lastItem = flatData.at(-1);
      const manager = new TreeManager(flatData);
      const { treeNodeCache } = manager;
      // spy cache access
      sandbox.spy(treeNodeCache, 'get');

      // populate cache first
      manager.getTreeNodes();
      // cache action time
      manager.getTreeNode(lastItem);
      const cacheGetCount = treeNodeCache.get.callCount;
      expect(cacheGetCount).to.equal(1, 'cache get invocation count should be 1');

      sandbox.restore();
    });
  });
});
