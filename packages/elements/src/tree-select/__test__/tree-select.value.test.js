import { elementUpdated, expect, fixture } from '@refinitiv-ui/test-helpers';

// import element and theme
import '@refinitiv-ui/elements/tree-select';
import '@refinitiv-ui/elemental-theme/light/ef-tree-select';

const data1 = [{ items: [{ selected: true, value: '1' }] }];
const data2 = [{ items: [{ selected: true, value: '1' }, { selected: true, value: '2' }] }];

describe('tree-select/Value', () => {
  describe('Value Test', () => {

    it('Value/values is empty by default', async () => {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
      expect(el.value).to.equal('', 'Value should be empty');
      expect(el.values).to.be.empty;
    });

    it('Value/values is accurate when data is set with selections', async () => {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
      el.data = data2;
      await elementUpdated(el);
      expect(el.values).to.have.lengthOf(2);
      expect(el.value).to.equal(el.values[0], 'Value should be equal to the first value in the values collection');
    });

    it('Values stay in sync with data changes', async () => {
      const el = await fixture('<ef-tree-select lang="en-gb"></ef-tree-select>');
      expect(el.values).to.deep.equal([]);
      el.data = data1;
      await elementUpdated(el);
      expect(el.values).to.deep.equal(['1']);
      el.data = data2;
      await elementUpdated(el);
      expect(el.values).to.deep.equal(['1', '2']);
      el.data = [];
      await elementUpdated(el);
      expect(el.values).to.deep.equal([]);
    });

  });
});
