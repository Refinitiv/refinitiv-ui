import { expect, fixture, html } from '@refinitiv-ui/test-helpers';
import { FocusableHelper } from '../../lib/utils/focusableHelper';
import { ifDefined } from '../../lib/directives/if-defined';

const createTabbableNodes = (tabindex1, tabindex2) => {
  return fixture(html`
  <div>
    <input tabindex=${ifDefined(tabindex1)} id="first-element" />
    <input tabindex=${ifDefined(tabindex2)} id="second-element" />
  </div>
  `);
};

describe('Test FocusableHelper', () => {

  describe('Test getTabbableNodes', () => {

    it('Test two elements without tabindex', async () => {
      const el = await createTabbableNodes();
      const firstNode = el.querySelector('#first-element');
      const secondNode = el.querySelector('#second-element');

      const nodes = FocusableHelper.getTabbableNodes(el);

      expect(nodes.length).to.equal(2, 'both children should be tabbable');
      expect(nodes[0]).to.equal(firstNode, 'First node need to be #first-element');
      expect(nodes[1]).to.equal(secondNode, 'Second node need to be #second-element');
    });

    it('Test two elements with tabindex 0', async () => {
      const el = await createTabbableNodes(0, 0);
      const firstNode = el.querySelector('#first-element');
      const secondNode = el.querySelector('#second-element');

      const nodes = FocusableHelper.getTabbableNodes(el);

      expect(nodes.length).to.equal(2, 'both children should be tabbable');
      expect(nodes[0]).to.equal(firstNode, 'First node need to be #first-element');
      expect(nodes[1]).to.equal(secondNode, 'Second node need to be #second-element');
    });

    it('Test two elements with tabindexes 1 and 2', async () => {
      const el = await createTabbableNodes(1, 2);
      const firstNode = el.querySelector('#first-element');
      const secondNode = el.querySelector('#second-element');

      const nodes = FocusableHelper.getTabbableNodes(el);

      expect(nodes.length).to.equal(2, 'both children should be tabbable');
      expect(nodes[0]).to.equal(firstNode, 'First node need to be #first-element');
      expect(nodes[1]).to.equal(secondNode, 'Second node need to be #second-element');
    });

    it('Test two elements with tabindexes 2 and 1', async () => {
      const el = await createTabbableNodes(2, 1);
      const firstNode = el.querySelector('#first-element');
      const secondNode = el.querySelector('#second-element');

      const nodes = FocusableHelper.getTabbableNodes(el);

      expect(nodes.length).to.equal(2, 'both children should be tabbable');
      expect(nodes[0]).to.equal(secondNode, 'First node need to be #second-element');
      expect(nodes[1]).to.equal(firstNode, 'Second node need to be #first-element');
    });

    it('Test two elements with tabindexes 0 and -1', async () => {
      const el = await createTabbableNodes(0, -1);
      const firstNode = el.querySelector('#first-element');

      const nodes = FocusableHelper.getTabbableNodes(el);

      expect(nodes.length).to.equal(1, 'One child should be tabbable');
      expect(nodes[0]).to.equal(firstNode, 'Node need to be #first-element');
    });

    it('Test two elements with tabindexes -1 and 0', async () => {
      const el = await createTabbableNodes(-1, 0);
      const secondNode = el.querySelector('#second-element');

      const nodes = FocusableHelper.getTabbableNodes(el);

      expect(nodes.length).to.equal(1, 'One child should be tabbable');
      expect(nodes[0]).to.equal(secondNode, 'Node need to be #second-element');
    });

  });

});
