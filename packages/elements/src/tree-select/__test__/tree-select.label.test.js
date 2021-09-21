import { elementUpdated, expect, fixture } from '@refinitiv-ui/test-helpers';

// import element and theme
import '@refinitiv-ui/elements/tree-select';
import '@refinitiv-ui/elemental-theme/light/ef-tree-select';
import { nestedData } from './mock_data/nested';

describe('tree-select/Label', () => {
  describe('Label Test - Subset of ComboBox Tests', () => {

    it('Is blank by default', async () => {
      const el = await fixture('<ef-tree-select></ef-tree-select>');
      el.data = nestedData;
      await elementUpdated(el);
      expect(el.inputText).to.equal('', 'Input should be empty');
      const input = el.shadowRoot.querySelector('[part=input]');
      const selectionBadge = el.shadowRoot.querySelector('[part=selection-badge]');
      expect(input.value).to.equal('', 'Actual input value should match');
      expect(selectionBadge).to.equal(null, 'No inner badge');
    });

    it('Shows selected label - one item', async () => {
      const el = await fixture('<ef-tree-select></ef-tree-select>');
      const copiedData = JSON.parse(JSON.stringify(nestedData));
      copiedData[0].items[5].selected = true;
      el.data = copiedData;
      let selectedLabel = copiedData[0].items[5].label;
      expect(selectedLabel.length > 0).to.equal(true, 'Selected label should exist');
      expect(el.label).to.equal(selectedLabel, 'Input should be selected label');
      await elementUpdated(el);
      const input = el.shadowRoot.querySelector('[part=input]');
      expect(input.value).to.equal(selectedLabel, 'Actual input value should match');
      const selectionBadge = el.shadowRoot.querySelector('[part=selection-badge]');
      expect(selectionBadge).to.equal(null, 'No inner badge');
    });

    it('Shows multiple label', async () => {
      const el = await fixture('<ef-tree-select></ef-tree-select>');
      const copiedData = JSON.parse(JSON.stringify(nestedData));
      copiedData[0].items[3].selected = true;
      copiedData[0].items[5].selected = true;
      el.data = copiedData;
      await elementUpdated(el);
      const input = el.shadowRoot.querySelector('[part=input]');
      expect(input.value).to.equal('Republic of the Congo;  Djibouti', 'Actual input value should match');
      const selectionBadge = el.shadowRoot.querySelector('[part=selection-badge]');
      expect(selectionBadge.value.toString()).to.equal('2', 'badge is 2');
    });
  });
});
