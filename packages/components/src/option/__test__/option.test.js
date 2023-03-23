import { elementUpdated, expect, fixture } from '@refinitiv-ui/test-helpers';
// import element and theme
import '@refinitiv-ui/components/option';

describe('ui-option', () => {
  const option = '<ui-option>Default</ui-option>';
  const option_properties = '<ui-option value="abbr" selected>Test Properties</ui-option>';

  describe('DOM Structure', () => {
    it('Should have correct default Shadow DOM structure', async () => {
      const el = await fixture(option);
      await expect(el).shadowDom.to.equalSnapshot();
    });
    it('Should have correct properties Shadow DOM structure', async () => {
      const el = await fixture(option_properties);
      await expect(el).shadowDom.to.equalSnapshot();
    });
  });

  describe('Attributes', () => {
    describe('value', () => {
      it('value attribute should not reflected when property value has change', async () => {
        const el = await fixture(option_properties);
        el.value = '';
        await elementUpdated(el);
        await expect(el.getAttribute('value')).to.equal('abbr');
      });
    });

    describe('selected', () => {
      it('selected attribute should not reflected when property value has change', async () => {
        const el = await fixture(option_properties);
        el.selected = false;
        await elementUpdated(el);
        await expect(el.getAttribute('selected')).to.equal(null);
      });
    });
  });

  describe('Properties', () => {
    describe('value', () => {
      it('value property should be empty string by default', async () => {
        const el = await fixture(option);
        await expect(el.value).to.equal('', 'value');
      });
      it('value property should be reflected with attribute', async () => {
        const el = await fixture(option_properties);
        await expect(el.value).to.equal('abbr', 'value');
      });
    });

    describe('selected', () => {
      it('selected property should be false by default', async () => {
        const el = await fixture(option);
        await expect(el.selected).to.equal(false, 'selected');
      });
      it('selected property should be reflected with attribute', async () => {
        const el = await fixture(option_properties);
        await expect(el.selected).to.equal(true, 'selected');
      });
    });
  });
});
