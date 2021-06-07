import { fixture, expect, isIE } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/elements/number-field';
import '@refinitiv-ui/elemental-theme/light/ef-number-field';

const dispatchInputEvent = (el, input = '') => {
  el.inputEl.dispatchEvent(new Event('input', {
    data: input
  }));
};

const setInputValue = (el, input = '') => {
  el.inputValue += input;
  dispatchInputEvent(el, input);
};

describe('NumberField', () => {
  describe('Test Input', function () {
    it('Typing valid characters should update value', async function () {
      if (isIE()) {
        // These tests fail on CI for unknown reason
        this.skip();
      }
      const el = await fixture('<ef-number-field></ef-number-field>');
      setInputValue(el, '1');
      expect(el.value).to.be.equal('1');
      setInputValue(el, '2');
      expect(el.value).to.be.equal('12');
    });

    it('Invalid characters should be stripped', async function () {
      if (isIE()) {
        this.skip();
      }
      const el = await fixture('<ef-number-field></ef-number-field>');
      setInputValue(el, 'a');
      expect(el.value).to.be.equal('');
      setInputValue(el, '1');
      expect(el.value).to.be.equal('1');
      setInputValue(el, 'b');
      expect(el.value).to.be.equal('1');
    });

    it('Number can start with -', async function () {
      if (isIE()) {
        this.skip();
      }

      const el = await fixture('<ef-number-field></ef-number-field>');
      setInputValue(el, '-');
      expect(el.value).to.be.equal('');
      setInputValue(el, '1');
      expect(el.value).to.be.equal('-1');
      setInputValue(el, '-');
      expect(el.value).to.be.equal('-1');
    });

    it('Number can start with +', async function () {
      if (isIE()) {
        this.skip();
      }

      const el = await fixture('<ef-number-field></ef-number-field>');
      setInputValue(el, '+');
      expect(el.value).to.be.equal('');
      setInputValue(el, '1');
      expect(el.value).to.be.equal('+1');
      setInputValue(el, '+');
      expect(el.value).to.be.equal('+1');
    });

    it('Number can have only a single dot', async function () {
      if (isIE()) {
        this.skip();
      }

      const el = await fixture('<ef-number-field></ef-number-field>');
      setInputValue(el, '1');
      expect(el.value).to.be.equal('1');
      setInputValue(el, '.');
      expect(el.value).to.be.equal('1.');
      setInputValue(el, '.');
      expect(el.value).to.be.equal('1.');
      setInputValue(el, '1');
      expect(el.value).to.be.equal('1.1');
    });

    it('Number can have only a single e character', async function () {
      if (isIE()) {
        this.skip();
      }

      const el = await fixture('<ef-number-field></ef-number-field>');
      setInputValue(el, '1');
      expect(el.value).to.be.equal('1');
      setInputValue(el, 'e');
      expect(el.value).to.be.equal('');
      setInputValue(el, '1');
      expect(el.value).to.be.equal('1e1');
      setInputValue(el, 'e');
      expect(el.value).to.be.equal('1e1');
    });

    it('. cannot follow after e', async function () {
      if (isIE()) {
        this.skip();
      }

      const el = await fixture('<ef-number-field></ef-number-field>');
      setInputValue(el, '1e1');
      expect(el.value).to.be.equal('1e1');
      setInputValue(el, '.');
      expect(el.value).to.be.equal('');
    });

    it('e cannot be before .', async function () {
      if (isIE()) {
        this.skip();
      }

      const el = await fixture('<ef-number-field></ef-number-field>');
      setInputValue(el, '1.1');
      expect(el.value).to.be.equal('1.1');
      setInputValue(el, 'e');
      expect(el.value).to.be.equal('');
    });

    it('zeros after dot should not be stripped from value', async function () {
      if (isIE()) {
        this.skip();
      }

      const el = await fixture('<ef-number-field></ef-number-field>');
      setInputValue(el, '12.000');
      expect(el.value).to.be.equal('12.000');
    });

    it('Should be able to strip long sequence of characters', async function () {
      if (isIE()) {
        this.skip();
      }

      const el = await fixture('<ef-number-field></ef-number-field>');
      setInputValue(el, 'y1a92.n%^168\[].0.25/A£:3000');
      expect(el.value).to.be.equal('192.1680253000');
    });
  });
});
