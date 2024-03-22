// import element and theme
import { CheckedState, TreeManager } from '@refinitiv-ui/elements/tree';

import '@refinitiv-ui/elemental-theme/light/ef-tree';
import { aTimeout, elementUpdated, expect, fixture, nextFrame } from '@refinitiv-ui/test-helpers';

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
      expect(ancestors.length).to.be.equal(
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
      expect(allEqual).to.be.equal(true, 'ancestors and expected ancestors should be all equal');
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
      expect(children.length).to.be.equal(
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
      expect(allEqual).to.be.equal(true, 'children and expected children should be all equal');
    });

    it('should return an empty array for an item without children', function () {
      const manager = new TreeManager(multiLevelData);
      const treeNodes = manager.getTreeNodes();
      const targetNode = treeNodes.find((node) => node.value === 'l33');
      const children = targetNode.getChildren();

      expect(children.length).to.be.equal(0, 'children length should be 0');
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
      expect(descendants.length).to.be.equal(
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
      expect(allEqual).to.be.equal(true, 'descendants and expected descendants should be all equal');
    });

    it('should return an empty array for an item without descendants', function () {
      const manager = new TreeManager(multiLevelData);
      const treeNodes = manager.getTreeNodes();
      const targetNode = treeNodes.find((node) => node.value === 'l33');
      const descendants = targetNode.getDescendants();

      expect(descendants.length).to.be.equal(0, 'children length should be 0');
    });
  });

  describe('getParent method', function () {
    it('should return the parent of an item', function () {
      const manager = new TreeManager(multiLevelData);
      const treeNodes = manager.getTreeNodes();
      const targetNode = treeNodes.find((node) => node.value === 'l32');
      const parent = targetNode.getParent();
      const expectedParent = treeNodes.find((node) => node.value === 'l21');
      expect(parent.value).to.be.equal(
        expectedParent.value,
        'parent and expected parent should be all equal'
      );
    });

    it('should return null for root item', function () {
      const manager = new TreeManager(multiLevelData);
      const treeNodes = manager.getTreeNodes();
      const targetNode = treeNodes.find((node) => node.value === 'l11');
      const parent = targetNode.getParent();

      expect(parent).to.be.equal(null, 'parent should be null');
    });
  });

  describe('isSelectable method', function () {
    it('should return true for an item which is neither readonly nor disabled', function () {
      const manager = new TreeManager(flatData);
      const treeNodes = manager.getTreeNodes();
      const targetNode = treeNodes.find((node) => node.value === '1');
      expect(targetNode.isSelectable()).to.be.equal(
        true,
        'either readonly nor disabled item should be selectable'
      );
    });
    it('should return false for disabled item', function () {
      const manager = new TreeManager(flatData);
      const treeNodes = manager.getTreeNodes();
      const targetNode = treeNodes.find((node) => node.value === '3');
      expect(targetNode.isSelectable()).to.be.equal(false, 'disabled item should not be selectable');
    });
    it('should return false for read-only item', function () {
      const manager = new TreeManager(flatData);
      const treeNodes = manager.getTreeNodes();
      const targetNode = treeNodes.find((node) => node.value === '2');
      expect(targetNode.isSelectable()).to.be.equal(false, 'read-only item should not be selectable');
    });
  });

  describe('isChild method', function () {
    it('should return true for child item', function () {
      const manager = new TreeManager(multiLevelData);
      const treeNodes = manager.getTreeNodes();
      const targetNode = treeNodes.find((node) => node.value === 'l32');
      expect(targetNode.isChild()).to.be.equal(true, 'the item should be a child');
    });

    it('should return true for for an item which is a child & a parent at the same', function () {
      const manager = new TreeManager(multiLevelData);
      const treeNodes = manager.getTreeNodes();
      const targetNode = treeNodes.find((node) => node.value === 'l21');
      expect(targetNode.isChild()).to.be.equal(true, 'the item should be a child');
    });

    it('should return false for root item', function () {
      const manager = new TreeManager(multiLevelData);
      const treeNodes = manager.getTreeNodes();
      const targetNode = treeNodes.find((node) => node.value === 'l12');
      expect(targetNode.isChild()).to.be.equal(false, 'the item should not be a child');
    });
  });

  describe('isParent method', function () {
    it('should return true for parent item', function () {
      const manager = new TreeManager(multiLevelData);
      const treeNodes = manager.getTreeNodes();
      const targetNode = treeNodes.find((node) => node.value === 'l12');
      expect(targetNode.isParent()).to.be.equal(true, 'the item should be a parent');
    });

    it('should return true for for an item which is a child & a parent at the same', function () {
      const manager = new TreeManager(multiLevelData);
      const treeNodes = manager.getTreeNodes();
      const targetNode = treeNodes.find((node) => node.value === 'l21');
      expect(targetNode.isParent()).to.be.equal(true, 'the item should be a parent');
    });

    it('should return false for an item without children', function () {
      const manager = new TreeManager(multiLevelData);
      const treeNodes = manager.getTreeNodes();
      const targetNode = treeNodes.find((node) => node.value === 'l32');
      expect(targetNode.isParent()).to.be.equal(false, 'the item should not be a parent');
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

  describe('accessor methods', function () {
    describe('value prop', function () {
      it('should add value prop value', function () {
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

      it('should update value prop value', function () {
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
  describe('accessor methods with rendering', function () {
    describe('icon prop', function () {
      it('should read icon prop value', function () {
        const icon = 'flame';
        const item = { label: 'one', value: '1', icon };
        const manager = new TreeManager([item]);
        const treeNode = manager.getTreeNode(item);
        expect(treeNode.icon).to.be.equal(icon, `icon should be ${icon}`);
      });

      it('should add icon prop value', async function () {
        const el = await fixture('<ef-tree></ef-tree>');
        el.data = flatData;
        await elementUpdated(el);

        const index = 3;
        let iconPart = getIconPart(el.children[index]);
        expect(iconPart).to.equal(null, 'rendered icon should not exist');

        const treeNode = el.manager.getTreeNodes();
        const node = treeNode[index];
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

        const treeNode = el.manager.getTreeNodes();
        const node = treeNode[index];
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

        const treeNode = el.manager.getTreeNodes();
        const node = treeNode[index];
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
        expect(treeNode.label).to.be.equal(label, `label should be ${label}`);
      });

      // no add testing as initially item's label must be set

      it('should update label prop value', async function () {
        const el = await fixture('<ef-tree></ef-tree>');
        el.data = flatData;
        await elementUpdated(el);

        const index = 0;
        let labelContent = getLabelContent(el.children[index]);
        expect(labelContent).to.equal('Item 1', "rendered label should be 'Item 1'");

        const treeNode = el.manager.getTreeNodes();
        const node = treeNode[index];
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
          expect(treeNode.expanded).to.be.equal(false, 'item expanded should be false');
        });

        it('should read unset expanded as false for parent item', function () {
          const manager = new TreeManager(multiLevelData);
          const treeNodes = manager.getTreeNodes();
          const node = treeNodes.find((node) => node.value === 'l11');
          expect(node.expanded).to.be.equal(false, 'item expanded should be false');
        });

        it('should read expanded as-is for parent items', function () {
          const data = [
            { value: '1', label: 'one', expanded: false, items: [{ value: '1.1', label: 'one-one' }] }
          ];
          let manager = new TreeManager(data);
          let treeNodes = manager.getTreeNodes();
          const unexpandedParent = treeNodes.find((node) => node.value === '1');
          expect(unexpandedParent.expanded).to.be.equal(false, 'item expanded should be false');

          manager = new TreeManager(multiLevelData);
          treeNodes = manager.getTreeNodes();
          const expandedParent = treeNodes.find((node) => node.value === 'l21');
          expect(expandedParent.expanded).to.be.equal(true, 'item expanded should be true');
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
        const renderedExpanded = el.children[0].expanded;
        expect(renderedExpanded).to.be.equal(true, 'item should be rendered as expanded');
      });

      describe('update expanded prop', function () {
        it('should update expanded prop and update rendering for visible items', async function () {
          const el = await fixture('<ef-tree></ef-tree>');
          el.data = nestedData;
          await elementUpdated(el);

          const index = 0;
          expect(el.children[index].expanded).to.equal(true, 'item should be rendered as expanded');

          const treeNodes = el.manager.getTreeNodes();
          const node = treeNodes[index];
          node.expanded = false;
          await nextFrame();
          expect(el.children[index].expanded).to.be.equal(false, 'item should be rendered as unexpanded');
        });
        it('should update expanded prop and invisible items', function () {
          const manager = new TreeManager(multiLevelData);
          const treeNodes = manager.getTreeNodes();
          const node = treeNodes.find((node) => node.value === 'l21');
          expect(node.expanded).to.be.equal(true, 'item expanded should be true');

          node.expanded = false;
          expect(node.expanded).to.be.equal(false, 'item expanded should be false');
          const expanded = manager.composer.getItemPropertyValue(multiLevelData[0].items[0], 'expanded');
          expect(expanded).to.be.equal(false, 'item expanded should be false');
        });
      });
      //   no removal as false value present this stage already
    });

    // TODO: props could be undefined as well. Update typing accordingly
    //   describe('hidden prop', function () {
    //     it('read', function () {});

    //     it('add', function () {});

    //     it('update', function () {});

    //     it('remove', function () {});
    //   });

    // TODO: props could be undefined as well. Update typing accordingly
    //   describe('readonly prop', function () {
    //     it('read', function () {});

    //     it('add', function () {});

    //     it('update', function () {});

    //     it('remove', function () {});
    //   });

    // TODO: props could be undefined as well. Update typing accordingly
    //   describe('highlighted prop', function () {
    //     it('read', function () {});

    //     it('add', function () {});

    //     it('update', function () {});

    //     it('remove', function () {});
    //   });

    // TODO: props could be undefined as well. Update typing accordingly
    //   describe('selected prop', function () {
    //     it('read', function () {});

    //     it('add', function () {});

    //     it('update', function () {});

    //     it('remove', function () {});
    //   });

    //   describe('selectedAt prop', function () {
    //     it('read', function () {});

    //     it('add', function () {});

    //     it('update', function () {});

    //     it('remove', function () {});
    //   });

    // TODO: props could be undefined as well. Update typing accordingly
    //   describe('disabled prop', function () {
    //     it('read', function () {});

    //     it('add', function () {});

    //     it('update', function () {});

    //     it('remove', function () {});
    //   });
  });
});
