import {
  fixture,
  expect,
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

const elementFocused = async (el) => {
  await elementUpdated(el);
  await nextFrame();
  await nextFrame();
};

const elementBlurred = async (el) => {
  setTimeout(() => {
    el.focus(); // Firefox need focus before blur
    el.blur();
  });
  await oneEvent(el, 'blur');
  await elementUpdated(el);
  await aTimeout(50);
  await nextFrame();
}

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
    const max = '32'

    beforeEach(async () => {
      el = await fixture(`<ef-pagination max="${max}" lang="en-gb"></ef-pagination>`);
    });

    it('Should have default empty value when value attribute is unset', async () => {
      el = await fixture('<ef-pagination lang="en-gb"></ef-pagination>');
      expect(el.value).to.equal('');
    });

    it('Should be able to set a new value', async () => {
      let value = '1';
      el.value = value;
      await elementUpdated(el);
      expect(el.value).to.equal(value);

      value = '10';
      el.value = value;
      await elementUpdated(el);
      expect(el.value).to.equal(value);
    });

    it('Should be able to set value as number', async () => {
      let value = 10;
      el.value = value;
      await elementUpdated(el);
      expect(el.value).to.equal(value.toString());

      value = 20;
      el.value = value;
      await elementUpdated(el);
      expect(el.value).to.equal(value.toString());
    });

    it('Should reset page to empty when page is set by invalid', async () => {
      el.value = '0';
      await elementUpdated(el);
      expect(el.value).to.equal('');

      el.value = '-5';
      await elementUpdated(el);
      expect(el.value).to.equal('');

      el.value = 'Hello';
      await elementUpdated(el);
      expect(el.value).to.equal('');
    });

    it('Should keep page value when page is more than max', async () => {
      const value = '100';
      el.value = value;
      await elementUpdated(el);
      expect(el.value).to.equal(value);
    });
  });

  describe('Max Value', () => {
    let el;
    const value = '5'
    const max = '32'

    beforeEach(async () => {
      el = await fixture(`<ef-pagination value="${value}" max="${max}" lang="en-gb"></ef-pagination>`);
    });

    it('Should have default empty value when max attribute is unset', async () => {
      el = await fixture('<ef-pagination lang="en-gb"></ef-pagination>');
      expect(el.max).to.equal('');
    });

    it('Should be able to set a new max', async () => {
      let newMax = '2';
      el.max = newMax;
      await elementUpdated(el);
      expect(el.max).to.equal(newMax);

      newMax = 100;
      el.max = newMax;
      await elementUpdated(el);
      expect(el.max).to.equal(newMax.toString());
    });

    it('Should reset max to empty when max is set by invalid', async () => {
      el.max = '0';
      await elementUpdated(el);
      expect(el.max).to.equal('');

      el.max = '-5';
      await elementUpdated(el);
      expect(el.max).to.equal('');

      el.max = 'Hello';
      await elementUpdated(el);
      expect(el.max).to.equal('');
    });

    it('Should keep max value when set max less than the value', async () => {
      const newMax = '3';
      el.max = newMax;
      await elementUpdated(el);
      expect(el.value).to.equal(value);
      expect(el.max).to.equal(newMax);
    });
  })

  describe('Backwards compatibility', () => {
    it('Calculates total page correctly', async () => {
      const el = await fixture('<ef-pagination page-size="5" total-items="32" lang="en-gb"></ef-pagination>');
      expect(el.page).to.equal(el.value);
      expect(el.pageSize).to.equal('5');
      expect(el.totalItems).to.equal('32');

      el.pageSize = '4';
      el.totalItems = '9';
      await elementUpdated(el);
      expect(el.page).to.equal(el.value);
      expect(el.pageSize).to.equal('4');
      expect(el.totalItems).to.equal('9');
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

    it('Should transform the selected text input value when focus/blur', async () => {
      expect(inputPart.value).to.equal('Page 1 of 7', 'Incorrect transform text input');

      await triggerFocusFor(inputPart);
      await elementFocused(el);
      expect(inputPart.value).to.equal('1', 'Incorrect transform text input');

      await elementBlurred(inputPart);
      expect(inputPart.value).to.equal('Page 1 of 7', 'Incorrect transform text input');

      lastButton.click();
      await elementUpdated(el);
      await nextFrame();
      expect(inputPart.value).to.equal('Page 7 of 7', 'Incorrect transform text input');

      await triggerFocusFor(inputPart);
      await elementFocused(el);
      expect(inputPart.value).to.equal('7');

      await elementBlurred(inputPart);
      expect(inputPart.value).to.equal('Page 7 of 7', 'Incorrect transform text input');
    });

    it('Should transform the selected text input value when focus/blur. If max is not set.', async () => {
      el.max = '';
      await elementUpdated(el);
      await nextFrame();
      expect(inputPart.value).to.equal('Page 1', 'Incorrect transform text input');

      await triggerFocusFor(inputPart);
      await elementFocused(el);

      expect(inputPart.value).to.equal('1', 'Incorrect transform text input');

      await elementBlurred(inputPart);
      expect(inputPart.value).to.equal('Page 1', 'Incorrect transform text input');

      nextButton.click();
      await elementUpdated(el);
      await nextFrame();
      expect(inputPart.value).to.equal('Page 2', 'Incorrect transform text input');

      await triggerFocusFor(inputPart);
      await elementFocused(el);

      expect(inputPart.value).to.equal('2');

      await elementBlurred(inputPart);
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

      it('First, previous, and last buttons should be disabled initially', async () => {
        expect(firstButton.disabled).to.equal(true);
        expect(previousButton.disabled).to.equal(true);
        expect(nextButton.disabled).to.equal(false);
        expect(lastButton.disabled).to.equal(true);
      });

      it('Next button should be always enabled and last button should be always disabled when `max` attribute/property is unset', async () => {
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

  describe('Interactions', () => {
    let el;
    let firstButton;
    let previousButton;
    let nextButton;
    let lastButton;
    let inputPart;

    beforeEach(async () => {
      el = await fixture('<ef-pagination max="7" lang="en-gb"></ef-pagination>');
      inputPart = el.shadowRoot.querySelector('[part=input]');
      firstButton = el.shadowRoot.querySelector('#first');
      previousButton = el.shadowRoot.querySelector('#previous');
      nextButton = el.shadowRoot.querySelector('#next');
      lastButton = el.shadowRoot.querySelector('#last');
    });

    it('Should be able to change page number by typing a number and press enter key into the input', async () => {
      await triggerFocusFor(inputPart);
      await elementFocused(el);

      inputPart.value = '3';
      inputPart.dispatchEvent(keyboardEvent('keydown', { key: 'Enter' }));
      await elementUpdated(el);
      expect(el.value).to.equal('3');
    });

    it('Should be able to change page number by typing a number and press tab key into the input', async () => {
      await triggerFocusFor(inputPart);
      await elementFocused(el);

      inputPart.value = '5';
      inputPart.dispatchEvent(keyboardEvent('keydown', { key: 'Tab' }));
      await elementUpdated(el);
      expect(el.value).to.equal('5');
    });

    it('Should be able to change page number by typing a number and blur the input', async () => {
      await triggerFocusFor(inputPart);
      await elementFocused(el);

      inputPart.value = '6';
      await elementBlurred(inputPart);
      await elementUpdated(el);
      expect(el.value).to.equal('6');
    });

    it('Should reject change page if typing a invalid value', async () => {
      const value = '3';
      el.value = value;
      await elementUpdated(el);

      await triggerFocusFor(inputPart);
      await elementFocused(el);

      inputPart.value = 'Hello';
      inputPart.dispatchEvent(keyboardEvent('keydown', { key: 'Enter' }));
      await elementUpdated(el);
      expect(el.value).to.equal(value);
    });

    it('Should go to minimum page when typing less than 1', async () => {
      const value = '3';
      el.value = value;
      await elementUpdated(el);

      await triggerFocusFor(inputPart);
      await elementFocused(el);
      inputPart.value = '-5';
      inputPart.dispatchEvent(keyboardEvent('keydown', { key: 'Enter' }));
      await elementUpdated(el);
      expect(el.value).to.equal('1');

      el.value = value;
      await elementUpdated(el);

      await triggerFocusFor(inputPart);
      await elementFocused(el);
      inputPart.value = '0';
      inputPart.dispatchEvent(keyboardEvent('keydown', { key: 'Enter' }));
      await elementUpdated(el);
      expect(el.value).to.equal('1');
    });

    it('Should go to maximum page when typing more than max', async () => {
      await triggerFocusFor(inputPart);
      await elementFocused(el);
      inputPart.value = '100';
      inputPart.dispatchEvent(keyboardEvent('keydown', { key: 'Enter' }));
      await elementUpdated(el);
      expect(el.value).to.equal(el.max);
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
    });

    it('If page value is more than max, should go to minimum page when first button is clicked.', async () => {
      el.value = '100';
      await elementUpdated(el);
      firstButton.click();
      await elementUpdated(el);
      expect(el.value).to.equal('1');
    });

    it('If page value is more than max, should go to maximum page when previous button is clicked.', async () => {
      el.value = '100';
      await elementUpdated(el);
      previousButton.click();
      await elementUpdated(el);
      expect(el.value).to.equal(el.max);
    });
  });

  describe('Keyboard Navigation', () => {
    let el;
    let inputPart;

    beforeEach(async () => {
      el = await fixture('<ef-pagination max="7" lang="en-gb"></ef-pagination>');
      inputPart = el.shadowRoot.querySelector('[part=input]');
    });

    it('Should increase the input number when Arrow Up key is pressed in text-field', async () => {
      await triggerFocusFor(inputPart);
      expect(el.value).to.equal('');

      inputPart.dispatchEvent(keyboardEvent('keydown', { key: 'ArrowUp' }));
      expect(inputPart.value).to.equal('2');

      inputPart.dispatchEvent(keyboardEvent('keydown', { key: 'Up' }));
      expect(inputPart.value).to.equal('3');

      inputPart.dispatchEvent(keyboardEvent('keydown', { key: 'Enter' }));
      await elementUpdated(el);

      expect(el.value).to.equal('3');
    });

    it('Should decrease the input number when Arrow Down key is pressed in text-field', async () => {
      el.value = '7';
      await elementUpdated(el);
      expect(el.value).to.equal('7');

      await triggerFocusFor(inputPart);
      await elementUpdated(el);
      inputPart.dispatchEvent(keyboardEvent('keydown', { key: 'ArrowDown' }));
      expect(inputPart.value).to.equal('6');

      inputPart.dispatchEvent(keyboardEvent('keydown', { key: 'Down' }));
      expect(inputPart.value).to.equal('5');

      inputPart.dispatchEvent(keyboardEvent('keydown', { key: 'Enter' }));
      await elementUpdated(el);

      expect(el.value).to.equal('5');
    });

    it('Should update the input number to the first page when Home key is pressed in text-field', async () => {
      el.value = '7';
      await elementUpdated(el);
      expect(el.value).to.equal('7');

      await triggerFocusFor(inputPart);
      inputPart.dispatchEvent(keyboardEvent('keydown', { key: 'Home' }));
      expect(inputPart.value).to.equal('1');

      inputPart.dispatchEvent(keyboardEvent('keydown', { key: 'Enter' }));
      await elementUpdated(el);

      expect(el.value).to.equal('1');
    });

    it('Should update the input number to the last page when End key is pressed in text-field', async () => {
      await elementUpdated(el);
      expect(el.value).to.equal('');

      await triggerFocusFor(inputPart);
      inputPart.dispatchEvent(keyboardEvent('keydown', { key: 'End' }));
      expect(inputPart.value).to.equal('7');

      inputPart.dispatchEvent(keyboardEvent('keydown', { key: 'Enter' }));
      await elementUpdated(el);

      expect(el.value).to.equal('7');
    });

    it('Should blur the input when Enter key is pressed in text-field', async () => {
      await triggerFocusFor(inputPart);
      await elementFocused(el);
      expect(document.activeElement).to.equal(el);

      inputPart.dispatchEvent(keyboardEvent('keydown', { key: 'Enter' }));
      await elementUpdated(el);

      expect(document.activeElement).to.not.equal(el, 'It should blur the element');
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

    it('Should fire value-changed event when first button is clicked', async () => {
      el.value = '3';
      setTimeout(() => firstButton.click());
      const { detail } = await oneEvent(el, 'value-changed');
      expect(el.value).to.equal('1');
      expect(detail.value).to.equal('1');
    });

    it('Should fire value-changed event when next button is clicked', async () => {
      setTimeout(() => nextButton.click());
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
      const inputPart = el.shadowRoot.querySelector('[part=input]');
      await triggerFocusFor(inputPart);
      await elementFocused(el);


      setTimeout(() => { inputPart.value = '3' });
      await elementUpdated(el);
      setTimeout(() => inputPart.dispatchEvent(keyboardEvent('keydown', { key: 'Enter' })));

      const { detail } = await oneEvent(el, 'value-changed');
      expect(el.value).to.equal('3');
      expect(detail.value).to.equal('3');
    });
  });

  describe('Accessibility', () => {
    let el;
    let inputPart;
    let firstButton;
    let previousButton;
    let nextButton;
    let lastButton;

    beforeEach(async () => {
      el = await fixture('<ef-pagination value="5" max="7" lang="en-gb"></ef-pagination>');
      inputPart = el.shadowRoot.querySelector('[part=input]');
      firstButton = el.shadowRoot.querySelector('#first');
      previousButton = el.shadowRoot.querySelector('#previous');
      nextButton = el.shadowRoot.querySelector('#next');
      lastButton = el.shadowRoot.querySelector('#last');
    });

    it('Should pass common rules for accessibility', async () => {
      await expect(el).to.be.accessible({
        ignoredRules: [
          'label', // Already has `aria-labelledby`
          'aria-hidden-focus' // Issue: buttons in ef-button-bar not respect the tabindex of the host
        ],
      });
    });

    it('Should not access all buttons', async () => {
      el.shadowRoot.querySelectorAll('[part=buttons]').forEach(buttons => {
        expect(buttons.getAttribute('aria-hidden')).to.be.equal('true');
      });
    });

    it('Should set `aria-valuenow` attribute correctly on initialize', async () => {
      expect(inputPart.getAttribute('aria-valuenow')).to.be.equal('5');
    });

    it('Should update `aria-valuenow` attribute correctly when input value changed', async () => {
      await triggerFocusFor(inputPart);

      expect(inputPart.getAttribute('aria-valuenow')).to.be.equal('5');
      inputPart.dispatchEvent(keyboardEvent('keydown', { key: 'ArrowUp' }));
      expect(inputPart.getAttribute('aria-valuenow')).to.be.equal('6');
      inputPart.dispatchEvent(keyboardEvent('keydown', { key: 'ArrowUp' }));
      expect(inputPart.getAttribute('aria-valuenow')).to.be.equal('7');
      inputPart.dispatchEvent(keyboardEvent('keydown', { key: 'Home' }));
      expect(inputPart.getAttribute('aria-valuenow')).to.be.equal('1');
      inputPart.dispatchEvent(keyboardEvent('keydown', { key: 'End' }));
      expect(inputPart.getAttribute('aria-valuenow')).to.be.equal('7');
    });

    it('Should update `aria-valuemax` attribute correctly when max page chaged', async () => {
      expect(inputPart.getAttribute('aria-valuemax')).to.be.equal('7');
      el.setAttribute('max', '3');
      await elementUpdated(el);
      expect(inputPart.getAttribute('aria-valuemax')).to.be.equal('3');

      el.max = '10';
      await elementUpdated(el);
      expect(inputPart.getAttribute('aria-valuemax')).to.be.equal('10');

      el.max = '';
      await elementUpdated(el);
      expect(inputPart.getAttribute('aria-valuemax')).to.be.null;
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

    it('Should do nothing when last() is called when `max` attribute/property is unset', async () => {
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

    it('If page value is more than max, should go to minimum page when first() is called.', async () => {
      el.value = '100';
      await elementUpdated(el);
      el.first();
      await elementUpdated(el);
      expect(el.value).to.equal('1');
    });

    it('If page value is more than max, should go to maximum page when previous() is called.', async () => {
      el.value = '100';
      await elementUpdated(el);
      el.previous();
      await elementUpdated(el);
      expect(el.value).to.equal(el.max);
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
