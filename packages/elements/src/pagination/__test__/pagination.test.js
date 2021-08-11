import {
  fixture,
  expect,
  isIE,
  elementUpdated,
  oneEvent,
  triggerFocusFor,
  keyboardEvent,
  nextFrame,
  triggerBlurFor
} from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/elements/pagination';
import '@refinitiv-ui/elemental-theme/light/ef-pagination';

const itBrowser = isIE() ? xit : it;

describe('pagination/Pagination', () => {
  describe('Snapshots', () => {
    itBrowser('DOM structure is correct', async () => {
      const el = await fixture('<ef-pagination></ef-pagination>');
      expect(el).shadowDom.to.equalSnapshot();
    });
  });

  describe('Page Value', () => {
    let el;

    beforeEach(async () => {
      el = await fixture('<ef-pagination page-size="5" total-items="32"></ef-pagination>');
    });

    it('Should have default value of page at 1, pageSize at 10, totalItems at 10', async () => {
      el = await fixture('<ef-pagination></ef-pagination>');
      expect(el.page).to.equal('1');
      expect(el.pageSize).to.equal('10');
      expect(el.totalItems).to.equal('10');
    });
    it('Calculates total page correctly', async () => {
      expect(el.pageSize).to.equal('5');
      expect(el.totalItems).to.equal('32');
      expect(el.totalPage).to.equal(7);

      el.pageSize = '1';
      el.totalItems = '0';
      await elementUpdated(el);
      expect(el.totalPage).to.equal(1);

      el.pageSize = '4';
      el.totalItems = '9';
      await elementUpdated(el);
      expect(el.totalPage).to.equal(3);
    });
    it('Should have page size set to 1 if set page size 0', async () => {
      el.pageSize = '0';
      await elementUpdated(el);
      expect(el.pageSize).to.equal('1');
      expect(el.totalItems).to.equal('32');
      expect(el.totalPage).to.equal(Number.parseInt(el.totalItems, 10));
    });
    it('Should reset page size set to 1 when page set to zero', async () => {
      el.page = '0';
      await elementUpdated(el);
      expect(el.page).to.equal('1');
    });
    it('Should reset page size set to 1 when page set is below 1', async () => {
      el.page = '-5';
      await elementUpdated(el);
      expect(el.page).to.equal('1');
    });
    it('Should reset page size set to total page number when page set is more than maximum page', async () => {
      el.page = '100';
      await elementUpdated(el);
      expect(el.page).to.equal('7');
    });
    it('Should reset page value to total page when total-items is change and page becomes more than total page', async () => {
      el.page = '5';
      await elementUpdated(el);
      expect(el.page).to.equal('5');

      el.totalItems = '10';
      await elementUpdated(el);

      expect(el.page).to.not.equal('5');
      expect(el.page).to.equal('2');
    });
    it('Should reset page value to total page when page-size is change and page becomes more than total page', async () => {
      el.page = '5';
      await elementUpdated(el);
      expect(el.page).to.equal('5');

      el.pageSize = '20';
      await elementUpdated(el);

      expect(el.page).to.not.equal('5');
      expect(el.page).to.equal('2');
    });
    it('Should have total page set to 1 if page size value is more than total items', async () => {
      el.totalItems = '32';
      el.pageSize = '40';
      await elementUpdated(el);
      expect(el.totalPage).to.equal(1);
    });
    itBrowser('Should be able to change page number by typing a number into the input', async () => {
      const textField = el.shadowRoot.querySelector('[part=input]');
      await triggerFocusFor(textField);

      setTimeout(() => { textField.value = '3' });
      await elementUpdated(textField);

      setTimeout(() => textField.dispatchEvent(keyboardEvent('keydown', { key: 'Enter' })));
      await elementUpdated(textField);

      await nextFrame();
      await nextFrame();

      await triggerBlurFor(textField);

      await nextFrame();
      await nextFrame();

      expect(el.page).to.equal('3');
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
      el = await fixture('<ef-pagination page-size="5" total-items="32"></ef-pagination>');
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
      expect(document.activeElement).to.equal(el);

      setTimeout(() => inputPart.dispatchEvent(keyboardEvent('keydown', { key: 'Enter' })));

      await elementUpdated(inputPart);

      await nextFrame();
      await nextFrame();

      await triggerBlurFor(el);

      await nextFrame();
      await nextFrame();

      expect(document.activeElement).to.not.equal(el, 'It should blur the element');
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
        '<ef-pagination page-size=5 total-items=32></ef-pagination>'
      );
      firstButton = el.shadowRoot.querySelector('#first');
      previousButton = el.shadowRoot.querySelector('#previous');
      nextButton = el.shadowRoot.querySelector('#next');
      lastButton = el.shadowRoot.querySelector('#last');
    });
    it('First and previous buttons should be disabled on the first page', async () => {
      el.page = '1';
      await elementUpdated(el);
      expect(firstButton.disabled).to.equal(true);
      expect(previousButton.disabled).to.equal(true);
      expect(nextButton.disabled).to.equal(false);
      expect(lastButton.disabled).to.equal(false);
    });
    it('Last and next buttons should be disabled on the last page', async () => {
      el.page = el.totalPage.toString();
      await elementUpdated(el);
      expect(firstButton.disabled).to.equal(false);
      expect(previousButton.disabled).to.equal(false);
      expect(nextButton.disabled).to.equal(true);
      expect(lastButton.disabled).to.equal(true);
    });
    it('All buttons should be enabled if not first or last page', async () => {
      el.page = '2';
      await elementUpdated(el);
      expect(firstButton.disabled).to.equal(false);
      expect(previousButton.disabled).to.equal(false);
      expect(nextButton.disabled).to.equal(false);
      expect(lastButton.disabled).to.equal(false);
    });
    it('All buttons should be disabled if only have one page', async () => {
      el.pageSize = '1';
      el.totalItems = '1';
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
      el = await fixture('<ef-pagination page-size="5" total-items="32"></ef-pagination>');

      firstButton = el.shadowRoot.querySelector('#first');
      previousButton = el.shadowRoot.querySelector('#previous');
      nextButton = el.shadowRoot.querySelector('#next');
      lastButton = el.shadowRoot.querySelector('#last');
    });

    it('Should go to the first page when first button is clicked', async () => {
      el.page = '3';
      await elementUpdated(el);
      firstButton.click();
      await elementUpdated(el);
      expect(el.page).to.equal('1');
    });
    it('Should go to previous page when the previous button is clicked', async () => {
      el.page = '3';
      await elementUpdated(el);
      previousButton.click();
      await elementUpdated(el);
      expect(el.page).to.equal('2');
      previousButton.click();
      await elementUpdated(el);
      expect(el.page).to.equal('1');
      previousButton.click();
      await elementUpdated(el);
      expect(el.page).to.equal('1');
    });
    it('Should go to the last page when the last button is clicked', async () => {
      el.page = '3';
      await elementUpdated(el);
      lastButton.click();
      await elementUpdated(el);
      expect(el.page).to.equal('7');
    });
    it('Should go to the next page when the next button is clicked', async () => {
      el.page = '5';
      await elementUpdated(el);
      nextButton.click();
      await elementUpdated(el);
      expect(el.page).to.equal('6');
      nextButton.click();
      await elementUpdated(el);
      expect(el.page).to.equal('7');
      nextButton.click();
      await elementUpdated(el);
      expect(el.page).to.equal('7');
    });
    it('Should go to the last page when current page is more than total page when page size changed', async () => {
      el.page = '5';
      el.pageSize = '10';
      await elementUpdated(el);
      expect(el.page).to.equal('4');
    });
  });

  describe('Events', () => {
    let el;
    let firstButton;
    let previousButton;
    let nextButton;
    let lastButton;

    beforeEach(async () => {
      el = await fixture('<ef-pagination page-size="5" total-items="32"></ef-pagination>');
      firstButton = el.shadowRoot.querySelector('#first');
      previousButton = el.shadowRoot.querySelector('#previous');
      nextButton = el.shadowRoot.querySelector('#next');
      lastButton = el.shadowRoot.querySelector('#last');
    });

    it('Should fire page-changed event when first button is click and page changes', async () => {
      el.page = '3';
      setTimeout(() => {
        firstButton.click();
      });
      const { detail } = await oneEvent(el, 'page-changed');

      expect(el.page).to.equal('1');
      expect(detail.value).to.equal('1');
    });
    it('Should not fire page-changed event when next button is click but the page is already at the minimum page', () => {
      let eventNotFired = false;

      setTimeout(() => {
        nextButton.click();
      });

      oneEvent(el, 'page-changed')
        .catch(() => {
          eventNotFired = true;
        })
        .then(() => {
          expect(el.page).to.equal('1');
          expect(eventNotFired).to.equal(true);
        });
    });
    it('Should fire page-changed event when next button is click and page changes', async () => {
      el.page = '1';
      setTimeout(() => {
        nextButton.click();
      });
      const { detail } = await oneEvent(el, 'page-changed');

      expect(el.page).to.equal('2');
      expect(detail.value).to.equal('2');
    });
    it('Should not fire page-changed event when next button is click but the page is already at the maximum page', () => {
      let eventNotFired = false;

      el.page = '7';
      setTimeout(() => {
        nextButton.click();
      });

      oneEvent(el, 'page-changed')
        .catch(() => {
          eventNotFired = true;
        })
        .then(() => {
          expect(el.page).to.equal('7');
          expect(eventNotFired).to.equal(true);
        });
    });
    it('Should fire page-changed event when previous button is click and page changes', async () => {
      el.page = '4';
      setTimeout(() => {
        previousButton.click();
      });
      const { detail } = await oneEvent(el, 'page-changed');

      expect(el.page).to.equal('3');
      expect(detail.value).to.equal('3');
    });
    it('Should not fire page-changed event when previous button is click but the page is already at the minimum page', () => {
      let eventNotFired = false;

      el.page = '1';
      setTimeout(() => {
        previousButton.click();
      });

      oneEvent(el, 'page-changed')
        .catch(() => {
          eventNotFired = true;
        })
        .then(() => {
          expect(el.page).to.equal('1');
          expect(eventNotFired).to.equal(true);
        });
    });
    it('Should fire page-changed event when last button is click and page changes', async () => {
      el.page = '4';
      setTimeout(() => {
        lastButton.click();
      });
      const { detail } = await oneEvent(el, 'page-changed');

      expect(el.page).to.equal('7');
      expect(detail.value).to.equal('7');
    });
    it('Should not fire page-changed event when last button is click but the page is already at the maximum page', () => {
      let eventNotFired = false;

      el.page = '7';
      setTimeout(() => {
        previousButton.click();
      });

      oneEvent(el, 'page-changed')
        .catch(() => {
          eventNotFired = true;
        })
        .then(() => {
          expect(el.page).to.equal('7');
          expect(eventNotFired).to.equal(true);
        });
    });
    it('Should not fire page-changed event when page changes through attribute', () => {
      let eventNotFired = false;

      setTimeout(() => {
        el.setAttribute('page', '2');
      });

      oneEvent(el, 'page-changed')
        .catch(() => {
          eventNotFired = true;
        })
        .then(() => {
          expect(el.page).to.equal('2');
          expect(eventNotFired).to.equal(true);
        });
    });
    it('Should not fire page-changed event when page is changes through property', async () => {
      let eventNotFired = false;

      setTimeout(() => {
        el.page = '2';
      });

      oneEvent(el, 'page-changed')
        .catch(() => {
          eventNotFired = true;
        })
        .then(() => {
          expect(el.page).to.equal('2');
          expect(eventNotFired).to.equal(true);
        });
    });
    itBrowser('Should fire page-changed event when page changes through the text input', async () => {
      const textField = el.shadowRoot.querySelector('[part=input]');

      await triggerFocusFor(textField);

      expect(el.page).to.equal('1', 'Initial page should be 1');
      expect(textField.value).to.equal('1', 'Input value should change to current page number');

      setTimeout(() => {
        textField.value = '3';
      });
      await elementUpdated(textField);

      setTimeout(() => textField.dispatchEvent(keyboardEvent('keydown', { key: 'Enter' })));

      const { detail } = await oneEvent(el, 'page-changed');

      expect(el.page).to.equal('3');
      expect(detail.value).to.equal('3');
    });
  });

  describe('Public Methods', () => {
    let el;

    beforeEach(async () => {
      el = await fixture('<ef-pagination page-size="5" total-items="15"></ef-pagination>');
    });

    it('Should navigate to first page when first() is called', async () => {
      el.page = '5';
      expect(el.page).to.equal('5');

      el.first();
      expect(el.page).to.equal('1');
    });
    it('Should navigate to next page when next() is called', async () => {
      el.next();
      expect(el.page).to.equal('2');
      el.next();
      expect(el.page).to.equal('3');
      el.next();
      expect(el.page).to.equal('3', 'It should not go beyond the last page');
    });
    it('Should navigate to last page when last() is called', async () => {
      el.last();
      expect(el.page).to.equal('3');
    });
    it('Should navigate to previous page when previous() is called', async () => {
      el.page = '3';
      expect(el.page).to.equal('3');

      el.previous();
      expect(el.page).to.equal('2');
      el.previous();
      expect(el.page).to.equal('1');
      el.previous();
      expect(el.page).to.equal('1', 'It should not go less than the first page');
    });
    it('Should be able to change page via public functions even when control is disabled', async () => {
      el.disabled = true;

      el.next();
      expect(el.page).to.equal('2');
      el.next();
      expect(el.page).to.equal('3');
      el.next();
      expect(el.page).to.equal('3', 'It should not go beyond the last page');
      el.previous();
      expect(el.page).to.equal('2');
      el.previous();
      expect(el.page).to.equal('1');
      el.previous();
      expect(el.page).to.equal('1', 'It should not go less than the first page');
    });
  });

  describe('Responsive', () => {
    it('Should hide pagination info when the component width is smaller than provided responsive width', async () => {
      const el = await fixture('<ef-pagination page-size="5" total-items="32"></ef-pagination>');
      const infoPart = el.shadowRoot.querySelector('[part=info]');

      el.style.width = '100px';
      await elementUpdated(el);
      await elementUpdated(infoPart);
      expect(infoPart.style.display).to.equal('none');

      el.style.width = '1000px';
      await elementUpdated(el);
      await elementUpdated(infoPart);
      expect(infoPart.style.display).to.equal('block');
    });
  });
});
