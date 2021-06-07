import { elementUpdated, expect, fixture, isIE } from '@refinitiv-ui/test-helpers';
// import element and theme
import '@refinitiv-ui/elements/text-field';
import '@refinitiv-ui/elemental-theme/light/ef-text-field';

describe('TextField', () => {
  describe('TextField Selection Range', () => {

    it('Applies selectionStart', async function () {
      // will work locally, but fail on CI
      if (isIE()) {
        this.skip();
      }
      const el = await fixture('<ef-text-field value="some text to test"></ef-text-field>');
      el.focus();
      const input = el.shadowRoot.querySelector('[part=input]');
      const selectionStart = 5;
      el.selectionStart = selectionStart;
      await elementUpdated(el);
      expect(input.selectionStart).to.equal(selectionStart);
    });

    it('Applies selectionEnd', async function () {
      // will work locally, but fail on CI
      if (isIE()) {
        this.skip();
      }
      const el = await fixture('<ef-text-field value="some text to test"></ef-text-field>');
      el.focus();
      const input = el.shadowRoot.querySelector('[part=input]');
      const selectionEnd = 5;
      el.selectionEnd = selectionEnd;
      await elementUpdated(el);
      expect(input.selectionEnd).to.equal(selectionEnd);
    });

    it('Applies selectionStart and selectionEnd', async function () {
      // will work locally, but fail on CI
      if (isIE()) {
        this.skip();
      }
      const el = await fixture('<ef-text-field value="some text to test"></ef-text-field>');
      el.focus();
      const input = el.shadowRoot.querySelector('[part=input]');
      const selectionStart = 2;
      const selectionEnd = selectionStart;
      el.selectionStart = selectionEnd;
      el.selectionEnd = selectionEnd;
      await elementUpdated(el);
      expect(input.selectionStart).to.equal(selectionStart);
      expect(input.selectionEnd).to.equal(selectionEnd);
    });

    it('Applies selection range using API', async function () {
      // will work locally, but fail on CI
      if (isIE()) {
        this.skip();
      }
      const el = await fixture('<ef-text-field value="some text to test"></ef-text-field>');
      el.focus();
      const input = el.shadowRoot.querySelector('[part=input]');
      const selectionStart = 4;
      const selectionEnd = 4;
      el.setSelectionRange(selectionStart, selectionEnd);
      await elementUpdated(el);
      expect(input.selectionStart).to.equal(selectionStart);
      expect(input.selectionEnd).to.equal(selectionEnd);
    });

  });
});
