// import element and theme
import '@refinitiv-ui/elements/tree-select';

import '@refinitiv-ui/elemental-theme/light/ef-tree-select';
import { elementUpdated, expect, fixture, nextFrame } from '@refinitiv-ui/test-helpers';

import { flatData } from './mock_data/flat.js';
import { multiLevelData } from './mock_data/multi-level.js';
import { getIconPart, getLabelContent, getTreeElPart } from './utils.js';

describe('tree-select/tree-node', function () {
  describe('accessor methods with rendering', function () {
    describe('icon prop', function () {
      // no read testing as it's covered by Tree component

      it('should add icon prop value', async function () {
        const el = await fixture('<ef-tree-select opened></ef-tree-select>');
        el.data = flatData;
        await elementUpdated(el);

        const index = 3;
        const treeElement = getTreeElPart(el);
        let iconPart = getIconPart(treeElement.children[index]);
        expect(iconPart).to.equal(null, 'rendered icon should not exist');

        const treeNodes = el.treeManager.getTreeNodes();
        const node = treeNodes[index];
        const icon = 'favorites';
        node.icon = icon;
        await nextFrame();
        iconPart = getIconPart(treeElement.children[index]);
        expect(iconPart.attributes.icon.value).to.equal(icon, `rendered icon should be ${icon}`);
      });

      it('should update icon prop value', async function () {
        const el = await fixture('<ef-tree-select opened></ef-tree-select>');
        el.data = [
          { value: '1', label: 'one', icon: 'info' },
          { value: '2', label: 'two' }
        ];
        await elementUpdated(el);

        const index = 0;
        const treeElement = getTreeElPart(el);
        const elementIcon = getIconPart(treeElement.children[index]);
        expect(elementIcon.attributes.icon.value).to.equal('info', 'rendered icon should be info');

        const treeNodes = el.treeManager.getTreeNodes();
        const node = treeNodes[index];
        const icon = 'flame';
        node.icon = icon;
        await nextFrame();
        expect(elementIcon.attributes.icon.value).to.equal(icon, `rendered icon should be ${icon}`);
      });

      it('should remove icon prop value', async function () {
        const el = await fixture('<ef-tree-select opened></ef-tree-select>');
        el.data = [
          { value: '1', label: 'one', icon: 'info' },
          { value: '2', label: 'two' }
        ];
        await elementUpdated(el);

        const index = 0;
        const treeElement = getTreeElPart(el);
        let elementIcon = getIconPart(treeElement.children[index]);
        expect(elementIcon.attributes.icon.value).to.equal('info', 'rendered icon should be info');

        const treeNodes = el.treeManager.getTreeNodes();
        const node = treeNodes[index];
        node.icon = undefined;
        await nextFrame();
        elementIcon = getIconPart(treeElement.children[index]);
        expect(elementIcon).to.equal(null, 'rendered icon should not exist');
      });
    });

    describe('label prop', function () {
      // no read testing as it's covered by Tree component

      // no add testing as initially item's label must be set

      it('should update label prop value', async function () {
        const el = await fixture('<ef-tree-select opened></ef-tree-select>');
        el.data = flatData;
        await elementUpdated(el);

        const index = 3;
        const treeElement = getTreeElPart(el);
        let labelContent = getLabelContent(treeElement.children[index]);
        expect(labelContent).to.equal('Austria', "rendered label should be 'Austria'");

        const treeNode = el.treeManager.getTreeNodes();
        const node = treeNode[index];
        const label = 'Austria - edited';
        node.label = label;
        await nextFrame();
        labelContent = getLabelContent(treeElement.children[index]);
        expect(labelContent).to.equal(label, `rendered label should be ${label}`);
      });

      // label are expected not to be removed
    });

    describe('expanded prop', function () {
      // no read testing as it's covered by Tree component

      it('should add expanded prop value', async function () {
        const el = await fixture('<ef-tree-select opened></ef-tree-select>');
        el.data = multiLevelData;
        await elementUpdated(el);

        const index = 0;
        const treeNodes = el.treeManager.getTreeNodes();
        const node = treeNodes[index];
        node.expanded = true;
        await nextFrame();

        const treeElement = getTreeElPart(el);
        expect(treeElement.children[index].expanded).to.be.equal(true, 'item should be rendered as expanded');
      });

      it('should update expanded prop value', async function () {
        const el = await fixture('<ef-tree-select opened></ef-tree-select>');
        el.data = [
          {
            value: '1',
            label: 'one',
            icon: 'info',
            expanded: true,
            items: [
              { value: '1.1', label: 'one-one' },
              { value: '1.2', label: 'one-two' }
            ]
          },
          { value: '2', label: 'two' }
        ];
        await elementUpdated(el);

        const index = 0;
        const treeElement = getTreeElPart(el);
        expect(treeElement.children[index].expanded).to.equal(true, 'item should be rendered as expanded');

        const treeNodes = el.treeManager.getTreeNodes();
        const node = treeNodes[index];
        node.expanded = false;
        await nextFrame();
        expect(treeElement.children[index].expanded).to.be.equal(
          false,
          'item should be rendered as unexpanded'
        );
      });

      // no removal as undefined & false value represent the same state
    });

    // no hidden prop testing as it's covered by Tree component

    describe('readonly prop', function () {
      // no read testing as it's covered by Tree component

      it('should add readonly prop value', async function () {
        const el = await fixture('<ef-tree-select opened></ef-tree-select>');
        el.data = flatData;
        await elementUpdated(el);

        const index = 0;
        const treeNodes = el.treeManager.getTreeNodes();
        const node = treeNodes[index];
        node.readonly = true;
        await nextFrame();
        const treeElement = getTreeElPart(el);
        expect(treeElement.children[index].readonly).to.be.equal(
          true,
          'item should be rendered as read-only'
        );
      });

      it('should update readonly prop value', async function () {
        const el = await fixture('<ef-tree-select opened></ef-tree-select>');
        el.data = [
          {
            value: '1',
            label: 'one',
            icon: 'info',
            readonly: true
          },
          { value: '2', label: 'two' }
        ];
        await elementUpdated(el);

        const index = 0;
        const treeElement = getTreeElPart(el);
        expect(treeElement.children[index].readonly).to.be.equal(
          true,
          'item should be rendered as read-only'
        );

        const treeNodes = el.treeManager.getTreeNodes();
        const node = treeNodes[index];
        node.readonly = false;
        await nextFrame();
        expect(treeElement.children[index].readonly).to.be.equal(
          false,
          'item should be rendered as editable'
        );
      });

      // no removal as undefined & false value represent the same state
    });

    describe('highlighted prop', function () {
      // no read testing as it's covered by Tree component

      it('should add highlighted prop value', async function () {
        const el = await fixture('<ef-tree-select opened></ef-tree-select>');
        el.data = flatData;
        await elementUpdated(el);

        const index = 3;
        const treeElement = getTreeElPart(el);
        const treeNodes = el.treeManager.getTreeNodes();
        const node = treeNodes[index];
        node.highlighted = true;
        await nextFrame();
        expect(treeElement.children[index].highlighted).to.be.equal(
          true,
          'item should be rendered as highlighted'
        );
      });

      it('should update highlighted prop value', async function () {
        const el = await fixture('<ef-tree-select opened></ef-tree-select>');
        el.data = flatData;
        await elementUpdated(el);
        // first element would be highlighted by default
        const index = 0;
        const treeElement = getTreeElPart(el);
        expect(treeElement.children[index].highlighted).to.be.equal(
          true,
          'item should be rendered as highlighted'
        );

        const treeNodes = el.treeManager.getTreeNodes();
        const node = treeNodes[index];
        node.highlighted = false;
        await nextFrame();
        expect(treeElement.children[index].highlighted).to.be.equal(
          false,
          'item should be rendered as not highlighted'
        );
      });

      // no removal as undefined & false value represent the same state
    });

    describe('selected prop', function () {
      // no read testing as it's covered by Tree component

      it('should add selected prop value', async function () {
        const el = await fixture('<ef-tree-select opened></ef-tree-select>');
        el.data = flatData;
        await elementUpdated(el);

        const index = 0;
        const treeNodes = el.treeManager.getTreeNodes();
        const node = treeNodes[index];
        node.selected = true;
        await nextFrame();
        const treeElement = getTreeElPart(el);
        expect(treeElement.children[index].checked).to.be.equal(true, 'item should be rendered as selected');
      });

      it('should update selected prop value', async function () {
        const el = await fixture('<ef-tree-select opened></ef-tree-select>');
        el.data = el.data = [
          { value: '1', label: 'one' },
          { value: '2', label: 'two', selected: true }
        ];
        await elementUpdated(el);

        const index = 1;
        const treeElement = getTreeElPart(el);
        expect(treeElement.children[index].checked).to.be.equal(true, 'item should be rendered as selected');

        const treeNodes = el.treeManager.getTreeNodes();
        const node = treeNodes[index];
        node.selected = false;
        await nextFrame();
        expect(treeElement.children[index].checked).to.be.equal(
          false,
          'item should be rendered as not selected'
        );
      });

      // no removal as undefined & false value represent the same state
    });

    // no selectedAt test as it's covered by Tree component

    describe('disabled prop', function () {
      // no read testing as it's covered by Tree component

      it('should add disabled prop value', async function () {
        const el = await fixture('<ef-tree-select opened></ef-tree-select>');
        el.data = flatData;
        await elementUpdated(el);

        const index = 0;
        const treeNodes = el.treeManager.getTreeNodes();
        const node = treeNodes[index];
        node.disabled = true;
        await nextFrame();
        const treeElement = getTreeElPart(el);
        expect(treeElement.children[index].disabled).to.be.equal(true, 'item should be rendered as disabled');
      });

      it('should update disabled prop value', async function () {
        const el = await fixture('<ef-tree-select opened></ef-tree-select>');
        el.data = el.data = [
          { value: '1', label: 'one' },
          { value: '2', label: 'two', disabled: true }
        ];
        await elementUpdated(el);

        const index = 1;
        const treeElement = getTreeElPart(el);
        expect(treeElement.children[index].disabled).to.be.equal(true, 'item should be rendered as disabled');

        const treeNodes = el.treeManager.getTreeNodes();
        const node = treeNodes[index];
        node.disabled = false;
        await nextFrame();
        expect(treeElement.children[index].disabled).to.be.equal(
          false,
          'item should be rendered as not disabled'
        );
      });

      // no removal as undefined & false value represent the same state
    });
  });
});
