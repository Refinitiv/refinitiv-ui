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
      el = await fixture('<ef-pagination page-size="5" max="32" lang="en-gb"></ef-pagination>');
    });

    it('Should have default value of page at 1, pageSize at 10, max is empty', async () => {
      el = await fixture('<ef-pagination lang="en-gb"></ef-pagination>');
      expect(el.value).to.equal('1');
      expect(el.pageSize).to.equal('10');
      expect(el.max).to.equal('');
    });

    it('Calculates total page correctly', async () => {
      expect(el.pageSize).to.equal('5');
      expect(el.max).to.equal('32');
      expect(el.totalPage).to.equal(7);

      el.pageSize = '1';
      el.max = '0';
      await elementUpdated(el);
      expect(el.totalPage).to.equal(Infinity);

      el.pageSize = '1';
      el.max = '';
      await elementUpdated(el);
      expect(el.totalPage).to.equal(Infinity);

      el.pageSize = '4';
      el.max = '9';
      await elementUpdated(el);
      expect(el.totalPage).to.equal(3);
    });

    it('Should have page size set to 1 if set page size 0', async () => {
      el.pageSize = '0';
      await elementUpdated(el);
      expect(el.pageSize).to.equal('1');
      expect(el.max).to.equal('32');
      expect(el.totalPage).to.equal(Number.parseInt(el.max, 10));
    });

    it('Should reset page size set to 1 when page set to zero', async () => {
      el.value = '0';
      await elementUpdated(el);
      expect(el.value).to.equal('1');
    });

    it('Should reset page size set to 1 when page set is below 1', async () => {
      el.value = '-5';
      await elementUpdated(el);
      expect(el.value).to.equal('1');
    });

    it('Should reset page size set to total page number when page set is more than maximum page', async () => {
      el.value = '100';
      await elementUpdated(el);
      expect(el.value).to.equal('7');
    });

    it('Should reset page value to total page when max is change and page becomes more than total page', async () => {
      el.value = '5';
      await elementUpdated(el);
      expect(el.value).to.equal('5');

      el.max = '10';
      await elementUpdated(el);

      expect(el.value).to.not.equal('5');
      expect(el.value).to.equal('2');
    });

    it('Should reset page value to total page when page-size is change and page becomes more than total page', async () => {
      el.value = '5';
      await elementUpdated(el);
      expect(el.value).to.equal('5');

      el.pageSize = '20';
      await elementUpdated(el);

      expect(el.value).to.not.equal('5');
      expect(el.value).to.equal('2');
    });

    it('Should have total page set to 1 if page size value is more than total items', async () => {
      el.max = '32';
      el.pageSize = '40';
      await elementUpdated(el);
      expect(el.totalPage).to.equal(1);
    });

    it('Should be able to change page number by typing a number into the input', async () => {
      const textField = el.shadowRoot.querySelector('[part=input]');
      await triggerFocusFor(textField);
      await aTimeout(50);

      setTimeout(() => { textField.value = '3' });
      await aTimeout(50);

      setTimeout(() => textField.dispatchEvent(keyboardEvent('keydown', { key: 'Enter' })));
      await aTimeout(50);
      expect(el.value).to.equal('3');
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
      el = await fixture('<ef-pagination page-size="5" max="32" lang="en-gb"></ef-pagination>');
      inputPart = el.shadowRoot.querySelector('[part=input]');
      firstButton = el.shadowRoot.querySelector('#first');
      previousButton = el.shadowRoot.querySelector('#previous');
      nextButton = el.shadowRoot.querySelector('#next');
      lastButton = el.shadowRoot.querySelector('#last');
    });

    it('Should focus the element when input is focus', async () => {
      await triggerFocusFor(inputPart);
      expect(document.activeElement).to.equal(el);
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
      expect(inputPart.value).to.equal('1', 'Incorrect transform text input');

      inputPart.blur();
      setTimeout(() => {
        expect(inputPart.value).to.equal('Page 1 of 7', 'Incorrect transform text input');
      });

      await triggerFocusFor(inputPart);
      setTimeout(() => {
        expect(inputPart.value).to.equal('Page 7 of 7', 'Incorrect transform text input');
      });

      await triggerFocusFor(inputPart);
      setTimeout(() => {
        expect(inputPart.value).to.equal('7');
      });

      inputPart.blur();
      setTimeout(() => {
        expect(inputPart.value).to.equal('Page 7 of 7', 'Incorrect transform text input');
      });
    });
  });

  describe('Button State', () => {
    let el;
    let firstButton;
    let previousButton;
    let nextButton;
    let lastButton;

    beforeEach(async () => {
      el = await fixture(
        '<ef-pagination page-size=5 max=32 lang="en-gb"></ef-pagination>'
      );
      firstButton = el.shadowRoot.querySelector('#first');
      previousButton = el.shadowRoot.querySelector('#previous');
      nextButton = el.shadowRoot.querySelector('#next');
      lastButton = el.shadowRoot.querySelector('#last');
    });

    it('First and previous buttons should be disabled on the first page', async () => {
      el.value = '1';
      await elementUpdated(el);
      expect(firstButton.disabled).to.equal(true);
      expect(previousButton.disabled).to.equal(true);
      expect(nextButton.disabled).to.equal(false);
      expect(lastButton.disabled).to.equal(false);
    });

    it('Last and next buttons should be disabled on the last page', async () => {
      el.value = el.totalPage.toString();
      await elementUpdated(el);
      expect(firstButton.disabled).to.equal(false);
      expect(previousButton.disabled).to.equal(false);
      expect(nextButton.disabled).to.equal(true);
      expect(lastButton.disabled).to.equal(true);
    });

    it('Next button should be always enabled and last button should be always disabled when `max` attribute/property is not set', async () => {
      el.value = '1';
      el.removeAttribute('max');
      await elementUpdated(el);
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

    it('All buttons should be enabled if not first or last page', async () => {
      el.value = '2';
      await elementUpdated(el);
      expect(firstButton.disabled).to.equal(false);
      expect(previousButton.disabled).to.equal(false);
      expect(nextButton.disabled).to.equal(false);
      expect(lastButton.disabled).to.equal(false);
    });

    it('All buttons should be disabled if only have one page', async () => {
      el.pageSize = '1';
      el.max = '1';
      await elementUpdated(el);
      expect(firstButton.disabled).to.equal(true);
      expect(previousButton.disabled).to.equal(true);
      expect(nextButton.disabled).to.equal(true);
      expect(lastButton.disabled).to.equal(true);
    });
  });

  describe('Button Actions', () => {
    let el;
    let firstButton;
    let previousButton;
    let nextButton;
    let lastButton;

    beforeEach(async () => {
      el = await fixture('<ef-pagination page-size="5" max="32" lang="en-gb"></ef-pagination>');

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
      el.value = '3';
      await elementUpdated(el);
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

    it('Should go to the last page when current page is more than total page when page size changed', async () => {
      el.value = '5';
      el.pageSize = '10';
      await elementUpdated(el);
      expect(el.value).to.equal('4');
    });
  });

  describe('Events', () => {
    let el;
    let firstButton;
    let previousButton;
    let nextButton;
    let lastButton;

    beforeEach(async () => {
      el = await fixture('<ef-pagination page-size="5" max="32" lang="en-gb"></ef-pagination>');
      firstButton = el.shadowRoot.querySelector('#first');
      previousButton = el.shadowRoot.querySelector('#previous');
      nextButton = el.shadowRoot.querySelector('#next');
      lastButton = el.shadowRoot.querySelector('#last');
    });

    it('Should fire page-changed event when first button is click and page changes', async () => {
      el.value = '3';
      setTimeout(() => {
        firstButton.click();
      });
      const { detail } = await oneEvent(el, 'page-changed');

      expect(el.value).to.equal('1');
      expect(detail.value).to.equal('1');
    });

    it('Should fire page-changed event when next button is click and page changes', async () => {
      el.value = '1';
      setTimeout(() => {
        nextButton.click();
      });
      const { detail } = await oneEvent(el, 'page-changed');

      expect(el.value).to.equal('2');
      expect(detail.value).to.equal('2');
    });

    it('Should not fire page-changed event when next button is click but the page is already at the maximum page', async () => {
      let eventFired;
      el.value = '7';

      setTimeout(() => nextButton.click());

      try {
        await waitUntil(async () => await oneEvent(el, 'page-changed'), 'Event does not fire', { timeout: 0 });
        eventFired = true;
      } catch (error) {
        eventFired = false;
      }

      expect(el.value).to.equal('7');
      expect(eventFired).to.equal(false);
    });

    it('Should fire page-changed event when previous button is click and page changes', async () => {
      el.value = '4';
      setTimeout(() => {
        previousButton.click();
      });
      const { detail } = await oneEvent(el, 'page-changed');

      expect(el.value).to.equal('3');
      expect(detail.value).to.equal('3');
    });

    it('Should not fire page-changed event when previous button is click but the page is already at the minimum page', async () => {
      let eventFired;
      el.value = '1';

      setTimeout(() => previousButton.click());

      try {
        await waitUntil(async () => await oneEvent(el, 'page-changed'), 'Event does not fire', { timeout: 0 });
        eventFired = true;
      } catch (error) {
        eventFired = false;
      }

      expect(el.value).to.equal('1');
      expect(eventFired).to.equal(false);
    });

    it('Should fire page-changed event when last button is click and page changes', async () => {
      el.value = '4';
      setTimeout(() => {
        lastButton.click();
      });
      const { detail } = await oneEvent(el, 'page-changed');

      expect(el.value).to.equal('7');
      expect(detail.value).to.equal('7');
    });

    it('Should not fire page-changed event when page changes through attribute', async () => {
      let eventFired;
      setTimeout(() => el.setAttribute('page', '2'));

      try {
        await waitUntil(async () => await oneEvent(el, 'page-changed'), 'Event does not fire', { timeout: 0 });
        eventFired = true;
      } catch (error) {
        eventFired = false;
      }

      expect(el.value).to.equal('2');
      expect(eventFired).to.equal(false, 'Event must not be fired');
    });

    it('Should not fire page-changed event when page is changes through property', async () => {
      let eventFired;
      setTimeout(() => el.value = '2');

      try {
        await waitUntil(async () => await oneEvent(el, 'page-changed'), 'Event does not fire', { timeout: 0 });
        eventFired = true;
      } catch (error) {
        eventFired = false;
      }

      expect(eventFired).to.equal(false, 'Event must not be fired');
    });

    it('Should fire page-changed event when page changes through the text input', async () => {
      const textField = el.shadowRoot.querySelector('[part=input]');
      await triggerFocusFor(textField);
      await aTimeout(50);

      expect(el.value).to.equal('1', 'Initial page should be 1');

      setTimeout(() => { textField.value = '3' });
      await aTimeout(50);

      setTimeout(() => textField.dispatchEvent(keyboardEvent('keydown', { key: 'Enter' })));

      const { detail } = await oneEvent(el, 'page-changed');

      expect(el.value).to.equal('3');
      expect(detail.value).to.equal('3');
    });
  });

  describe('Public Methods', () => {
    let el;

    beforeEach(async () => {
      el = await fixture('<ef-pagination page-size="5" max="15" lang="en-gb"></ef-pagination>');
    });

    it('Should navigate to first page when first() is called', () => {
      el.value = '5';
      expect(el.value).to.equal('5');

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

    it('Should navigate to last page when last() is called', () => {
      el.last();
      expect(el.value).to.equal('3');
    });

    it('Should not navigate to last page when last() is called but `max` attribute/property is not set', async () => {
      el.value = '1';
      el.max = '';
      await elementUpdated(el);
      el.last();
      expect(el.value).to.equal('1');
    });

    it('Should navigate to previous page when previous() is called', () => {
      el.value = '3';
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
    });
  });
});
