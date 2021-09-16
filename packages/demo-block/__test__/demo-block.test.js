import { fixture, expect } from '@refinitiv-ui/test-helpers';

// import element and theme
import '../lib/demo-block';

describe('DemoBlock', () => {
  describe('DOM structure', () => {
    it('DOM structure is correct', async () => {
      const el = await fixture(`
        <demo-block>
        </demo-block>
      `);
      expect(el).shadowDom.to.equalSnapshot();
    });
    it('DOM structure with tags is correct', async () => {
      const el = await fixture(`
        <demo-block tags="tag one, tag two">
        </demo-block>
      `);
      expect(el).shadowDom.to.equalSnapshot();
    });
    it('DOM structure with header is correct', async () => {
      const el = await fixture(`
        <demo-block header="Header text">
        </demo-block>
      `);
      expect(el).shadowDom.to.equalSnapshot();
    });
    it('DOM structure with layout is correct', async () => {
      const el = await fixture(`
        <demo-block layou="normal">
        </demo-block>
      `);
      expect(el).shadowDom.to.equalSnapshot();
    });
    it('DOM structure with custom height is correct', async () => {
      const el = await fixture(`
        <demo-block height="400px">
        </demo-block>
      `);

      expect(el.height).to.equal('400px');
      expect(el).shadowDom.to.equalSnapshot();
    });
  });

  describe('Functionality', () => {
    it('Should have ability to set tag', async () => {
      const el = await fixture(`
        <demo-block tags="tag name">
        </demo-block>
      `);

      const tag = el.shadowRoot.querySelector("[part='tag']");

      expect(tag).not.equal(null);
      expect(tag.textContent).to.equal('tag name');
    });
    it('Should have ability to set multiple tags', async () => {
      const el = await fixture(`
        <demo-block tags="tag 1, tag 2, tag 3 ">
        </demo-block>
      `);

      const tags = el.shadowRoot.querySelectorAll("[part='tag']");

      expect(tags.length).to.equal(3);
      tags.forEach((tag, index) => {
        expect(tag.textContent).to.equal(`tag ${index + 1}`);
      });
    });
    it('Should have ability to set demo header', async () => {
      const el = await fixture(`
        <demo-block header="Header text">
        </demo-block>
      `);

      const headerText = el.shadowRoot.querySelector('[part=header-label]');

      expect(headerText.textContent).to.equal('Header text');
    });
    it('Should be able to set custom height', async () => {
      const el = await fixture(`
        <demo-block height="400px">
        </demo-block>
      `);

      expect(el.height).to.equal('400px');
    });
  });
});

