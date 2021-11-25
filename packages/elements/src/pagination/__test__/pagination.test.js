import {
  fixture,
  expect,
  isIE,
  elementUpdated,
  oneEvent,
  triggerFocusFor,
  keyboardEvent,
  aTimeout,
  waitUntil,
  nextFrame
} from '@refinitiv-ui/test-helpers';

// Translations polyfills
import '@formatjs/intl-locale/polyfill.iife';
import '@formatjs/intl-getcanonicallocales/polyfill.iife';
import '@formatjs/intl-pluralrules/polyfill.iife';
import '@formatjs/intl-pluralrules/locale-data/en';

import '@refinitiv-ui/elements/pagination';
import '@refinitiv-ui/elemental-theme/light/ef-pagination';

const updating = async (el) => {
  await elementUpdated(el);
  await aTimeout(50);
};

describe('pagination/Pagination', () => {
  describe('Snapshots', () => {
    it('DOM structure is correct', async () => {
      const el = await fixture('<ef-pagination lang="en-gb" lang="en-gb"></ef-pagination>');
      expect(el).shadowDom.to.equalSnapshot({
        ignoreAttributes: [{
          tags: ['ef-layout'], attributes: ['style', 'class']
        }]
      });
    });
  });

  describe('Page Value', () => {
    let el;

    beforeEach(async () => {
      el = await fixture('<ef-pagination max="32" lang="en-gb"></ef-pagination>');
    });

    it('Should have default value of page is empty, max is empty', async () => {
      el = await fixture('<ef-pagination lang="en-gb"></ef-pagination>');
      expect(el.value).to.equal('');
      expect(el.max).to.equal('');
    });

    it('Should reset page to empty when page set to zero', async () => {
      el.value = '0';
      await elementUpdated(el);
      expect(el.value).to.equal('');
    });

    it('Should reset page to empty when page set is below 1', async () => {
      el.value = '-5';
      await elementUpdated(el);
      expect(el.value).to.equal('');
    });

    it('Should show page even if page is more than max', async () => {
      el.value = '100';
      await elementUpdated(el);
      expect(el.value).to.equal('100');
    });

    it('Should reset max to empty when max set to zero but value is no change', async () => {
      const oldValue = '5';
      el.value = oldValue;
      await elementUpdated(el);
      expect(el.value).to.equal(oldValue);

      el.max = '0';
      await elementUpdated(el);
      expect(el.max).to.equal('');
      expect(el.value).to.equal(oldValue);
    });

    it('Should reset max to empty when max set is below 1 but value is no change', async () => {
      const oldValue = '5';
      el.value = oldValue;
      await elementUpdated(el);
      expect(el.value).to.equal(oldValue);

      el.max = '-5';
      await elementUpdated(el);
      expect(el.max).to.equal('');
      expect(el.value).to.equal(oldValue);
    });

    it('Should keep max value even if the max value is less than element value', async () => {
      el.value = '5';
      el.max = '10';
      await elementUpdated(el);

      el.max = '3';
      await elementUpdated(el);

      expect(el.value).to.equal('5');
      expect(el.max).to.equal('3');
    });

    it('Should be able to change page number by typing a number into the input', async () => {
      const textField = el.shadowRoot.querySelector('[part=input]');
      await triggerFocusFor(textField);
      await aTimeout(50);

      setTimeout(() => { textField.value = '3' });
      await updating(50);
      setTimeout(() => textField.dispatchEvent(keyboardEvent('keydown', { key: 'Enter' })));
      await updating(50);
      expect(el.value).to.equal('3');
    });
  });

  describe('Backward compat', () => {
    it('Calculates total page correctly', async () => {
      const el = await fixture('<ef-pagination page-size="5" total-items="32" lang="en-gb"></ef-pagination>');
      expect(el.pageSize).to.equal('5');
      expect(el.totalItems).to.equal('32');
      expect(el.internalMax).to.equal(7);

      el.pageSize = '4';
      el.totalItems = '9';
      await elementUpdated(el);
      expect(el.internalMax).to.equal(3);
    });
  });

  describe('Focus', () => {
    let el;
    let inputPart;
    let firstButton;
    let previousButton;
    let nextButton;
    let lastButton;

    beforeEach(async () => {
      el = await fixture('<ef-pagination max="7" lang="en-gb"></ef-pagination>');
      inputPart = el.shadowRoot.querySelector('[part=input]');
      firstButton = el.shadowRoot.querySelector('#first');
      previousButton = el.shadowRoot.querySelector('#previous');
      nextButton = el.shadowRoot.querySelector('#next');
      lastButton = el.shadowRoot.querySelector('#last');
    });

    it('Should blur the input when the next button is clicked', async () => {
      await triggerFocusFor(inputPart);
      nextButton.click();

      expect(el.querySelector('[part=input]:focus')).to.be.null;
    });
    it('Should blur the input when the last button is clicked', async () => {
      await triggerFocusFor(inputPart);
      lastButton.click();

      expect(el.querySelector('[part=input]:focus')).to.be.null;
    });
    it('Should blur the input when the previous button is clicked', async () => {
      await triggerFocusFor(inputPart);
      previousButton.click();

      expect(el.querySelector('[part=input]:focus')).to.be.null;
    });
    it('Should blur the input when the first button is clicked', async () => {
      await triggerFocusFor(inputPart);
      firstButton.click();

      expect(el.querySelector('[part=input]:focus')).to.be.null;
    });
    it('Should blur the input when Enter key is pressed in text-field', async () => {
      await triggerFocusFor(inputPart);
      await aTimeout(50);

      expect(document.activeElement).to.equal(el);

      setTimeout(() => inputPart.dispatchEvent(keyboardEvent('keydown', { key: 'Enter' })));
      await aTimeout(50);

      expect(document.activeElement).to.not.equal(el, 'It should blur the element');
    });

    it('Should transform the selected text input value when focus/blur', async () => {
      expect(inputPart.value).to.equal('Page 1 of 7', 'Incorrect transform text input');

      await triggerFocusFor(inputPart);
      await aTimeout(50);
      expect(inputPart.value).to.equal('1', 'Incorrect transform text input');

      setTimeout(() => {
        inputPart.focus(); // Firefox need focus before blur
        inputPart.blur();
      });
      await oneEvent(inputPart, 'blur');
      await updating(el);
      expect(inputPart.value).to.equal('Page 1 of 7', 'Incorrect transform text input');

      lastButton.click();
      await nextFrame();
      expect(inputPart.value).to.equal('Page 7 of 7', 'Incorrect transform text input');

      await triggerFocusFor(inputPart);
      await aTimeout(50);
      expect(inputPart.value).to.equal('7');

      setTimeout(() => {
        inputPart.focus(); // Firefox need focus before blur
        inputPart.blur();
      });
      await oneEvent(inputPart, 'blur');
      await updating(el);
      expect(inputPart.value).to.equal('Page 7 of 7', 'Incorrect transform text input');
    });

    it('Should transform the selected text input value when focus/blur. If max is not set.', async () => {
      el.max = '';
      await elementUpdated(el);
      expect(inputPart.value).to.equal('Page 1', 'Incorrect transform text input');

      await triggerFocusFor(inputPart);
      await aTimeout(50);
      expect(inputPart.value).to.equal('1', 'Incorrect transform text input');

      setTimeout(() => {
        inputPart.focus(); // Firefox need focus before blur
        inputPart.blur();
      });
      await oneEvent(inputPart, 'blur');
      await updating(el);
      expect(inputPart.value).to.equal('Page 1', 'Incorrect transform text input');

      nextButton.click();
      await nextFrame();
      expect(inputPart.value).to.equal('Page 2', 'Incorrect transform text input');

      await triggerFocusFor(inputPart);
      await aTimeout(50);
      expect(inputPart.value).to.equal('2');

      setTimeout(() => {
        inputPart.focus(); // Firefox need focus before blur
        inputPart.blur();
      });
      await oneEvent(inputPart, 'blur');
      await updating(el);
      expect(inputPart.value).to.equal('Page 2', 'Incorrect transform text input');
    });
  });

  describe('Button State', () => {
    let el;
    let firstButton;
    let previousButton;
    let nextButton;
    let lastButton;

    describe('default', () => {
      beforeEach(async () => {
        el = await fixture('<ef-pagination lang="en-gb"></ef-pagination>');
        firstButton = el.shadowRoot.querySelector('#first');
        previousButton = el.shadowRoot.querySelector('#previous');
        nextButton = el.shadowRoot.querySelector('#next');
        lastButton = el.shadowRoot.querySelector('#last');
      });

      it('First, previous, and last buttons should be disabled on the first page', async () => {
        expect(firstButton.disabled).to.equal(true);
        expect(previousButton.disabled).to.equal(true);
        expect(nextButton.disabled).to.equal(false);
        expect(lastButton.disabled).to.equal(true);
      });

      it('Next button should be always enabled and last button should be always disabled when `max` attribute/property is not set', async () => {
        el.value = '2';
        await elementUpdated(el);
        expect(firstButton.disabled).to.equal(false);
        expect(previousButton.disabled).to.equal(false);
        expect(nextButton.disabled).to.equal(false);
        expect(lastButton.disabled).to.equal(true);

        el.value = '1';
        el.max = '100';
        await elementUpdated(el);
        expect(nextButton.disabled).to.equal(false);
        expect(lastButton.disabled).to.equal(false);

        el.value = '99999';
        el.max = '';
        await elementUpdated(el);
        expect(nextButton.disabled).to.equal(false);
        expect(lastButton.disabled).to.equal(true);
      });

    });

    describe('Max', () => {
      beforeEach(async () => {
        el = await fixture('<ef-pagination lang="en-gb" max="7"></ef-pagination>');
        firstButton = el.shadowRoot.querySelector('#first');
        previousButton = el.shadowRoot.querySelector('#previous');
        nextButton = el.shadowRoot.querySelector('#next');
        lastButton = el.shadowRoot.querySelector('#last');
      });

      it('First and previous buttons should be disabled on the first page', async () => {
        expect(firstButton.disabled).to.equal(true);
        expect(previousButton.disabled).to.equal(true);
        expect(nextButton.disabled).to.equal(false);
        expect(lastButton.disabled).to.equal(false);
      });

      it('Last and next buttons should be disabled on the last page', async () => {
        el.value = el.max;
        await elementUpdated(el);
        expect(firstButton.disabled).to.equal(false);
        expect(previousButton.disabled).to.equal(false);
        expect(nextButton.disabled).to.equal(true);
        expect(lastButton.disabled).to.equal(true);
      });

      it('All buttons should be disabled if only have one page', async () => {
        el.max='1';
        await elementUpdated(el);
        expect(firstButton.disabled).to.equal(true);
        expect(previousButton.disabled).to.equal(true);
        expect(nextButton.disabled).to.equal(true);
        expect(lastButton.disabled).to.equal(true);
      });
    });
  });

  describe('Button Actions', () => {
    let el;
    let firstButton;
    let previousButton;
    let nextButton;
    let lastButton;

    beforeEach(async () => {
      el = await fixture('<ef-pagination max="7" lang="en-gb"></ef-pagination>');

      firstButton = el.shadowRoot.querySelector('#first');
      previousButton = el.shadowRoot.querySelector('#previous');
      nextButton = el.shadowRoot.querySelector('#next');
      lastButton = el.shadowRoot.querySelector('#last');
    });

    it('Should go to the first page when first button is clicked', async () => {
      el.value = '3';
      await elementUpdated(el);
      firstButton.click();
      await elementUpdated(el);
      expect(el.value).to.equal('1');
    });

    it('Should go to previous page when the previous button is clicked', async () => {
      el.value = '3';
      await elementUpdated(el);
      previousButton.click();
      await elementUpdated(el);
      expect(el.value).to.equal('2');
      previousButton.click();
      await elementUpdated(el);
      expect(el.value).to.equal('1');
      previousButton.click();
      await elementUpdated(el);
      expect(el.value).to.equal('1');
    });

    it('Should go to the last page when the last button is clicked', async () => {
      lastButton.click();
      await elementUpdated(el);
      expect(el.value).to.equal('7');
    });

    it('Should go to the next page when the next button is clicked', async () => {
      el.value = '5';
      await elementUpdated(el);
      nextButton.click();
      await elementUpdated(el);
      expect(el.value).to.equal('6');
      nextButton.click();
      await elementUpdated(el);
      expect(el.value).to.equal('7');
      nextButton.click();
      await elementUpdated(el);
      expect(el.value).to.equal('7');
    });
  });

  describe('Events', () => {
    let el;
    let firstButton;
    let previousButton;
    let nextButton;
    let lastButton;

    beforeEach(async () => {
      el = await fixture('<ef-pagination max="7" lang="en-gb"></ef-pagination>');
      firstButton = el.shadowRoot.querySelector('#first');
      previousButton = el.shadowRoot.querySelector('#previous');
      nextButton = el.shadowRoot.querySelector('#next');
      lastButton = el.shadowRoot.querySelector('#last');
    });
    afterEach(async () => {
      el = '';
      firstButton = '';
      previousButton = '';
      nextButton = '';
      lastButton = '';
    });

    it('Should fire value-changed event when first button is clicked', async () => {
      el.value = '3';
      setTimeout(() => {
        firstButton.click();
      });
      const { detail } = await oneEvent(el, 'value-changed');
      expect(el.value).to.equal('1');
      expect(detail.value).to.equal('1');
    });

    it('Should fire value-changed event when next button is clicked', async () => {
      setTimeout(() => {
        nextButton.click();
      });
      const { detail } = await oneEvent(el, 'value-changed');
      expect(el.value).to.equal('2');
      expect(detail.value).to.equal('2');
    });

    it('Should not fire value-changed event when next button is clicked but the page is already at the maximum page', async () => {
      let eventFired;
      el.value = '7';

      setTimeout(() => nextButton.click());

      try {
        await waitUntil(async () => await oneEvent(el, 'value-changed'), 'Event does not fire', { timeout: 0 });
        eventFired = true;
      } catch (error) {
        eventFired = false;
      }

      expect(el.value).to.equal('7');
      expect(eventFired).to.equal(false);
    });

    it('Should fire value-changed event when previous button is clicked', async () => {
      el.value = '4';
      setTimeout(() => {
        previousButton.click();
      });
      const { detail } = await oneEvent(el, 'value-changed');

      expect(el.value).to.equal('3');
      expect(detail.value).to.equal('3');
    });

    it('Should not fire value-changed event when previous button is clicked but the page is already at the minimum page', async () => {
      let eventFired;
      el.value = '1';

      setTimeout(() => previousButton.click());

      try {
        await waitUntil(async () => await oneEvent(el, 'value-changed'), 'Event does not fire', { timeout: 0 });
        eventFired = true;
      } catch (error) {
        eventFired = false;
      }

      expect(el.value).to.equal('1');
      expect(eventFired).to.equal(false);
    });

    it('Should fire value-changed event when last button is click and page changes', async () => {
      setTimeout(() => {
        lastButton.click();
      });
      const { detail } = await oneEvent(el, 'value-changed');
      expect(el.value).to.equal('7');
      expect(detail.value).to.equal('7');
    });

    it('Should not fire value-changed event when page is changed through attribute', async () => {
      let eventFired;
      setTimeout(() => el.setAttribute('page', '2'));

      try {
        await waitUntil(async () => await oneEvent(el, 'value-changed'), 'Event does not fire', { timeout: 0 });
        eventFired = true;
      } catch (error) {
        eventFired = false;
      }

      expect(el.value).to.equal('2');
      expect(eventFired).to.equal(false, 'Event must not be fired');
    });

    it('Should not fire value-changed event when page is changed through property', async () => {
      let eventFired;
      setTimeout(() => el.value = '2');

      try {
        await waitUntil(async () => await oneEvent(el, 'value-changed'), 'Event does not fire', { timeout: 0 });
        eventFired = true;
      } catch (error) {
        eventFired = false;
      }
      expect(el.value).to.equal('2');
      expect(eventFired).to.equal(false, 'Event must not be fired');
    });

    it('Should fire value-changed event when page is changed through the text input', async function () {
      const textField = el.shadowRoot.querySelector('[part=input]');
      await triggerFocusFor(textField);
      await aTimeout(50);

      setTimeout(() => { textField.value = '3' });
      await updating(el);
      setTimeout(() => textField.dispatchEvent(keyboardEvent('keydown', { key: 'Enter' })));

      const { detail } = await oneEvent(el, 'value-changed');
      expect(el.value).to.equal('3');
      expect(detail.value).to.equal('3');
    });
  });

  describe('Public Methods', () => {
    let el;

    beforeEach(async () => {
      el = await fixture('<ef-pagination lang="en-gb" max="3"></ef-pagination>');
    });

    it('Should navigate to first page when first() is called', async () => {
      el = await fixture('<ef-pagination lang="en-gb" value="5"></ef-pagination>');
      el.first();
      expect(el.value).to.equal('1');
    });

    it('Should navigate to next page when next() is called', () => {
      el.next();
      expect(el.value).to.equal('2');
      el.next();
      expect(el.value).to.equal('3');
      el.next();
      expect(el.value).to.equal('3', 'It should not go beyond the last page');
    });

    it('Should navigate to last page when last() is called', () => {
      el.last();
      expect(el.value).to.equal('3');
    });

    it('Should do nothing when last() is called and `max` is not set', async () => {
      el = await fixture('<ef-pagination lang="en-gb"></ef-pagination>');
      el.last();
      expect(el.value).to.equal('');
    });

    it('Should navigate to previous page when previous() is called', async () => {
      el = await fixture('<ef-pagination lang="en-gb" value="3"></ef-pagination>');
      expect(el.value).to.equal('3');

      el.previous();
      expect(el.value).to.equal('2');
      el.previous();
      expect(el.value).to.equal('1');
      el.previous();
      expect(el.value).to.equal('1', 'It should not go less than the first page');
    });

    it('Should be able to change page via public functions even when control is disabled', () => {
      el.disabled = true;

      el.next();
      expect(el.value).to.equal('2');
      el.next();
      expect(el.value).to.equal('3');
      el.next();
      expect(el.value).to.equal('3', 'It should not go beyond the last page');
      el.previous();
      expect(el.value).to.equal('2');
      el.previous();
      expect(el.value).to.equal('1');
      el.previous();
      expect(el.value).to.equal('1', 'It should not go less than the first page');
      el.last();
      expect(el.value).to.equal('3');
      el.first();
      expect(el.value).to.equal('1');
    });
  });
});
