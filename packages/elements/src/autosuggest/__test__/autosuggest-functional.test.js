import { elementUpdated, expect, isIE, nextFrame, oneEvent } from '@refinitiv-ui/test-helpers';

import {
  blurAction,
  createFixture,
  createInputElement,
  data,
  focusAction,
  inputAction, isFirefox,
  pressKey,
  tapAction
} from './helpers/helpers';

describe('autosuggest/Functional', () => {
  describe('Functionality', async () => {

    it('Attach target event are set and public functions fired and removed', async function () {
      // blur() method is not work well on firefox at all, while focus not work well on CI for IE11
      if (isIE() || isFirefox()) {
        this.skip();
      }
      const input = await createInputElement();
      const autoSuggest = await createFixture();

      let inputValueChange = 0;
      let inputFocus = 0;
      let inputBlur = 0;
      let inputKeyDown = 0;

      const onInputValueChange = () => inputValueChange++;
      const onInputFocus = () => inputFocus++;
      const onInputBlur = () => inputBlur++;
      const onInputKeyDown = () => inputKeyDown++;

      autoSuggest.onInputValueChange = onInputValueChange;
      autoSuggest.onInputFocus = onInputFocus;
      autoSuggest.onInputBlur = onInputBlur;
      autoSuggest.onInputKeyDown = onInputKeyDown;

      const manualActions = async () => {
        await focusAction(input);
        input.value = 'Test Me';
        await inputAction(input);
        await pressKey(input, 'ArrowDown');
        await blurAction(input);
      };

      setTimeout(() => {
        autoSuggest.setAttribute('attach', '#input-element');
      });

      const event = await oneEvent(autoSuggest, 'add-attach-target-events');
      expect(event.cancelable).to.equal(true);

      await manualActions();

      expect(inputValueChange, 'onInputValueChange was not run once').to.equal(1);
      expect(inputBlur, 'onInputBlur was not run once').to.equal(1);
      expect(inputFocus, 'onInputFocus was not run once').to.equal(1); // it's for CI
      expect(inputKeyDown, 'onInputKeyDown was not run once').to.equal(1);

      autoSuggest.attach = null;

      const removeListenersEvent = await oneEvent(autoSuggest, 'remove-attach-target-events');
      expect(removeListenersEvent.cancelable).to.equal(true);

      await manualActions();

      expect(inputValueChange, 'onInputValueChange was not run once').to.equal(1);
      expect(inputBlur, 'onInputBlur was not run once').to.equal(1);
      expect(inputFocus, 'onInputFocus was not run once').to.equal(1); // it's for CI
      expect(inputKeyDown, 'onInputKeyDown was not run once').to.equal(1);
    });

    it('Attach target event are not set and public functions not fired and removed', async () => {
      const input = await createInputElement();
      const autoSuggest = await createFixture();

      let inputValueChange = 0;
      let inputFocus = 0;
      let inputBlur = 0;
      let inputKeyDown = 0;
      let addTargetEvents = 0;
      let removeTargetEvents = 0;

      const onInputValueChange = () => inputValueChange++;
      const onInputFocus = () => inputFocus++;
      const onInputBlur = () => inputBlur++;
      const onInputKeyDown = () => inputKeyDown++;
      const onAddTargetEvents = () => addTargetEvents++;
      const onRemoveTargetEvents = () => removeTargetEvents++;

      autoSuggest.onInputValueChange = onInputValueChange;
      autoSuggest.onInputFocus = onInputFocus;
      autoSuggest.onInputBlur = onInputBlur;
      autoSuggest.onInputKeyDown = onInputKeyDown;

      const manualActions = async () => {
        await focusAction(input);
        input.value = 'Test Me';
        await inputAction(input);
        await pressKey(input, 'ArrowDown');
        await blurAction(input);
      };

      setTimeout(() => {
        autoSuggest.setAttribute('attach', '#faked-element');
      });

      autoSuggest.addEventListener('add-attach-target-events', onAddTargetEvents);
      autoSuggest.addEventListener('remove-attach-target-events', onRemoveTargetEvents);

      await nextFrame();
      await nextFrame();

      await manualActions();

      expect(inputValueChange, 'onInputValueChange was run').to.equal(0);
      expect(inputBlur, 'onInputBlur was run').to.equal(0);
      expect(inputFocus, 'onInputFocus was run').to.equal(0);
      expect(inputKeyDown, 'onInputKeyDown was run').to.equal(0);

      autoSuggest.attach = null;

      await manualActions();

      expect(inputValueChange, 'onInputValueChange was run').to.equal(0);
      expect(inputBlur, 'onInputBlur was run').to.equal(0);
      expect(inputFocus, 'onInputFocus was run').to.equal(0);
      expect(inputKeyDown, 'onInputKeyDown was run').to.equal(0);

      expect(addTargetEvents, 'onInputFocus was run').to.equal(0);
      expect(removeTargetEvents, 'onInputKeyDown was run').to.equal(0);
    }, 4000);

    it('Test suggestions-query and suggestions-fetch-requested', async function () {
      if (isIE()) {
        this.skip();
      }

      const input = await createInputElement();
      const autoSuggest = await createFixture('reason');

      await nextFrame();

      const queryReasons = [];
      const fetchReasons = [];
      const fetchQueries = [];

      autoSuggest.addEventListener('suggestions-query', ({ detail: { reason } }) => {
        queryReasons.push(reason);
      });

      autoSuggest.addEventListener('suggestions-fetch-requested', ({ detail: { reason, query } }) => {
        fetchReasons.push(reason);
        fetchQueries.push(query);

        if (reason === 'value-changed') {
          autoSuggest.suggestions = [data[0]];
          autoSuggest.moreResults = true;
        }
      });

      await focusAction(input);

      await elementUpdated(autoSuggest);
      await nextFrame();

      input.value = 'test';
      await inputAction(input);

      await elementUpdated(autoSuggest);
      await nextFrame();

      await pressKey(input, 'Escape');
      await pressKey(input, 'Enter');
      await pressKey(input, 'Escape');
      await pressKey(input, 'ArrowUp');
      await pressKey(input, 'Escape');
      await pressKey(input, 'ArrowDown');
      await pressKey(input, 'Escape');

      input.value = 'test2';
      await inputAction(input);

      await elementUpdated(autoSuggest);
      await nextFrame();

      await pressKey(input, 'Escape');

      await nextFrame();
      await nextFrame();

      if (autoSuggest.moreResultsItem) {
        await tapAction(autoSuggest.moreResultsItem);
      }

      await pressKey(input, 'Escape');

      await pressKey(input, 'Escape');

      await nextFrame();
      await nextFrame();

      expect(queryReasons[0], 'suggestions-query input-focus event is not fired or is wrong').to.equal('input-focus');
      expect(queryReasons[1], 'suggestions-query input-focus event is not fired or is wrong').to.equal('value-changed');
      expect(queryReasons[2], 'suggestions-query enter-pressed Enter Key event is not fired or is wrong').to.equal('enter-pressed');
      expect(queryReasons[3], 'suggestions-query suggestions-revealed Up Key event is not fired or is wrong').to.equal('suggestions-revealed');
      expect(queryReasons[4], 'suggestions-query suggestions-revealed Down Key event is not fired or is wrong').to.equal('suggestions-revealed');
      expect(queryReasons[5], 'suggestions-query value-changed event is not fired or is wrong').to.equal('value-changed');
      expect(queryReasons[6], 'suggestions-query escape-pressed event is not fired or is wrong').to.equal('escape-pressed');

      expect(fetchReasons[0], 'suggestions-fetch-requested input-focus event is not fired or is wrong').to.equal('input-focus');
      expect(fetchReasons[1], 'suggestions-fetch-requested value-changed event is not fired or is wrong').to.equal('value-changed');
      expect(fetchReasons[2], 'suggestions-fetch-requested value-changed event is not fired or is wrong').to.equal('value-changed');
      expect(fetchReasons[3], 'suggestions-fetch-requested more-results event is not fired or is wrong').to.equal('more-results');
      expect(fetchReasons[4], 'suggestions-fetch-requested escape-pressed event is not fired or is wrong').to.equal('escape-pressed');

      expect(fetchQueries[0], 'suggestions-fetch-requested input-focus event is not fired or is wrong').to.equal('');
      expect(fetchQueries[1], 'suggestions-fetch-requested value-changed event is not fired or is wrong').to.equal('test');
      expect(fetchQueries[2], 'suggestions-fetch-requested more-results event is not fired or is wrong').to.equal('test2');
      expect(fetchQueries[3], 'suggestions-fetch-requested more-results event is not fired or is wrong').to.equal('test2');
      expect(fetchQueries[4], 'suggestions-fetch-requested escape-pressed event is not fired or is wrong').to.equal('');
    }, 4000);

    it('Test opened, suggestions-clear-requested, item-select and item-highlight', async function () {
      if (isIE()) {
        this.skip();
      }
      const input = await createInputElement();
      const autoSuggest = await createFixture('navigation');

      autoSuggest.requestOnFocus = true;

      let highlightCount = 0;
      let selectCount = 0;
      let clearCount = 0;

      const highlightSpy = () => highlightCount++;
      const selectSpy = () => selectCount++;
      const clearSpy = () => clearCount++;

      let highlightedEvent = null;
      let selectedEvent = null;

      autoSuggest.addEventListener('item-highlight', highlightSpy);
      autoSuggest.addEventListener('item-select', selectSpy);
      autoSuggest.addEventListener('suggestions-clear-requested', clearSpy);

      autoSuggest.suggestions = data;

      await elementUpdated(autoSuggest);

      await focusAction(input);
      input.value = '';
      await inputAction(input);

      await elementUpdated(autoSuggest);
      await nextFrame();

      expect(autoSuggest.opened, 'Auto suggest should be opened when data is populated').to.equal(true);

      await nextFrame();
      await nextFrame();

      setTimeout(() => pressKey(input, 'ArrowDown'));

      await nextFrame();
      await nextFrame();

      if (isIE()) {
        return;
      }

      [highlightedEvent, selectedEvent] = await Promise.all([oneEvent(autoSuggest, 'item-highlight'), oneEvent(autoSuggest, 'item-select')]);

      await (async () => {
        if (isIE()) {
          return;
        }
        const { detail: { target, suggestion, oldTarget, oldSuggestion } } = highlightedEvent;

        expect(target, 'ArrowDown: incorrect highlighted element').to.equal(autoSuggest.children[0]);
        expect(suggestion, 'ArrowDown: incorrect highlighted suggestion').to.equal(data[0]);
        expect(oldTarget, 'ArrowDown: old target should not be intialy defined').not.to.exist;
        expect(oldSuggestion, 'ArrowDown: old suggestion should not be intialy defined').not.to.exist;
        expect(target, 'ArrowDown: item is not highlighted').to.equal(autoSuggest.querySelector('[highlighted]'));
      })();

      await (async () => {
        if (isIE()) {
          return;
        }
        const { detail: { method, target, suggestion, query } } = selectedEvent;

        expect(method, 'ArrowDown: incorrect method').to.equal('navigation');
        expect(target, 'ArrowDown: incorrect selected element').to.equal(autoSuggest.children[0]);
        expect(suggestion, 'ArrowDown: incorrect selected suggestion').to.equal(data[0]);
        expect(query, 'ArrowDown: incorrect query').to.equal('');
        expect(input.value, 'ArrowDown: input value is not changed').to.equal(data[0].label);
      })();

      expect(highlightCount, 'ArrowDown: item-highlight is not fired').to.equal(1);
      expect(selectCount, 'ArrowDown: item-select is not fired ').to.equal(1);
    }, 4000);

    it('Ensure that custom renderer works', async () => {
      const input = await createInputElement();
      const autoSuggest = await createFixture('custom-renderer');
      autoSuggest.requestOnFocus = true;

      let highlightCount = 0;
      let renderCount = 0;

      const highlightableSpy = () => highlightCount++;
      const rendererSpy = () => renderCount++;

      autoSuggest.highlightable = (suggestion, el) => {
        highlightableSpy();

        try {
          expect(suggestion, 'Suggestion is not passed to highlightable').to.exist;
          expect(el, 'Element is not passed to highlightable').to.exist;
        }
        catch (err) {
          throw new Error('Highlightable has failed: ' + err.message);
        }

        return true;
      };

      autoSuggest.renderer = (suggestion, query) => {
        rendererSpy();

        try {
          expect(suggestion, 'Suggestion is not passed to renderer').to.exist;
          expect(query, 'Query is not passed to renderer').to.equal(null);
        }
        catch (err) {
          throw new Error('Renderer has failed: ' + err.message);
        }

        const el = document.createElement('div');
        el.innerText = suggestion.label;

        return el;
      };

      autoSuggest.suggestions = data;
      await elementUpdated(autoSuggest);

      await focusAction(input);
      input.value = '';
      await inputAction(input);

      await nextFrame();

      if (isIE()) {
        return;
      }
      expect(highlightCount, 'highlightable was not called for every suggestion').to.equal(data.length);
      expect(renderCount, 'renderer was not called for every suggestion').to.equal(data.length);
      expect(autoSuggest.children.length, 'The number of items is wrong').to.equal(data.length);
    }, 4000);

    it('check suggest open on input with same query', async function () {
      if (isIE()) {
        this.skip();
      }
      const input = await createInputElement();
      const autoSuggest = await createFixture('request-on-focus');
      autoSuggest.moreResults = true;
      await elementUpdated(autoSuggest);
      autoSuggest.suggestions = [data[0]];
      await elementUpdated(autoSuggest);

      input.value = 'test';
      await inputAction(input);
      await focusAction(input);

      expect(autoSuggest.opened).to.equal(true, 'AutoSuggest is not opened');

      autoSuggest.opened = false;

      await nextFrame();
      await nextFrame();

      expect(autoSuggest.opened).to.equal(false, 'AutoSuggest is opened');

      await inputAction(input);

      expect(autoSuggest.opened).to.equal(true, 'AutoSuggest is not opened');
    }, 4000);

    it('check debounce rate is applied', async function () {
      if (isIE()) {
        this.skip();
      }
      const input = await createInputElement();
      const autoSuggest = await createFixture('request-on-focus');
      autoSuggest.moreResults = true;
      await elementUpdated(autoSuggest);
      autoSuggest.suggestions = [data[0]];
      await elementUpdated(autoSuggest);

      await focusAction(input);

      setTimeout(async () => {
        input.value = 'test';
        await inputAction(input);
      });

      const { detail: { reason } } = await oneEvent(autoSuggest, 'suggestions-query');

      expect(reason).to.equal('value-changed', 'value-changed is not fired');

      autoSuggest.debounceRate = 100;
      input.focus();
      await elementUpdated(autoSuggest);

      await nextFrame();
      await nextFrame();

      let callTime;
      let finishTime;

      setTimeout(async () => {
        callTime = Date.now();
        input.value = 'test1';
        await inputAction(input);
      });

      const event = await oneEvent(autoSuggest, 'suggestions-fetch-requested');
      finishTime = Date.now();

      expect(event.detail.reason).to.equal('value-changed', 'value-changed is not fired');
      expect(finishTime - callTime).to.greaterThan(autoSuggest.debounceRate, 'time less then debounceRate');
      expect(finishTime - callTime).to.lessThan(autoSuggest.debounceRate + 150, 'time to call much greater than debounceRate');
    }, 4000);

    it('the highlightable property returns true', async () => {
      const input = await createInputElement();
      const autoSuggest = await createFixture('navigation');
      autoSuggest.requestOnFocus = true;
      autoSuggest.suggestions = data;
      let highlightableCall = false;
      autoSuggest.highlightable = (suggestion, element) => {
        highlightableCall = true;
        return false;
      };
      const suggestLabel = 'Cornelius';
      await focusAction(input);
      input.value = suggestLabel;
      await inputAction(input);

      await elementUpdated(autoSuggest);
      await nextFrame();
      expect(highlightableCall).to.equal(true);
    });

    it('the highlightable property returns false', async function () {
      if (isIE()) {
        this.skip();
      }
      const input = await createInputElement();
      const autoSuggest = await createFixture('navigation');
      autoSuggest.requestOnFocus = true;
      let highlightableCall = false;
      autoSuggest.highlightable = (suggestion, element) => {
        highlightableCall = true;
        return true;
      };
      autoSuggest.suggestions = data;
      const suggestLabel = 'Cornelius';
      await focusAction(input);
      input.value = suggestLabel;
      await inputAction(input);

      await elementUpdated(autoSuggest);
      await nextFrame();

      expect(highlightableCall).to.equal(true);
    });

    it('press enter key in the text field', async () => {
      const input = await createInputElement();
      const autoSuggest = await createFixture('navigation');

      autoSuggest.suggestions = [data[0], data[1]];
      await elementUpdated(autoSuggest);

      const suggestLabel = 'Cornelius';

      await focusAction(input);
      input.value = suggestLabel;
      await inputAction(input);

      expect(autoSuggest.opened).to.equal(false);
      setTimeout(() => pressKey(input, 'Enter'));
      await oneEvent(autoSuggest, 'opened-changed');
      expect(autoSuggest.opened).to.equal(true);

      autoSuggest.opened = false;
      await elementUpdated(autoSuggest);

      setTimeout(() => pressKey(input, 'Return'));
      await oneEvent(autoSuggest, 'opened-changed');
      expect(autoSuggest.opened).to.equal(true);

      setTimeout(() => pressKey(input, 'Enter'));
      await oneEvent(autoSuggest, 'opened-changed');
      expect(autoSuggest.opened).to.equal(false);
    });

    it('press escape key in the text field', async () => {
      const input = await createInputElement();
      const autoSuggest = await createFixture('navigation');
      const suggestLabel = 'Cornelius';

      autoSuggest.suggestions = [data[0], data[1]];
      await elementUpdated(autoSuggest);

      await focusAction(input);
      input.value = suggestLabel;
      await inputAction(input);

      await nextFrame();
      await nextFrame();

      setTimeout(() => pressKey(input, 'Enter'));
      setTimeout(() => pressKey(input, 'Escape'));

      const selectEvent = await oneEvent(autoSuggest, 'item-select');

      expect(selectEvent.detail.query).to.equal('Cornelius');
    });

    it('input blur native method', async function () {
      // blur() method is not work well on firefox at all, while focus not work well on CI for IE11
      if (isIE() || isFirefox()) {
        this.skip();
      }
      const input = await createInputElement();
      const autoSuggest = await createFixture('navigation');
      const suggestLabel = 'Cornelius';

      autoSuggest.suggestions = [data[0], data[1]];
      await elementUpdated(autoSuggest);

      await focusAction(input);
      input.value = suggestLabel;
      await inputAction(input);

      await nextFrame();
      await nextFrame();

      setTimeout(() => pressKey(input, 'Enter'));

      await oneEvent(autoSuggest, 'opened-changed');
      expect(autoSuggest.opened).to.equal(true);

      await blurAction(input);
      await elementUpdated(autoSuggest);

      expect(autoSuggest.opened).to.equal(false);
    });

    it('check outside click', async () => {
      const input = await createInputElement();
      const autoSuggest = await createFixture('navigation');
      const suggestLabel = 'Cornelius';

      autoSuggest.suggestions = [data[0], data[1]];
      await elementUpdated(autoSuggest);

      await focusAction(input);
      input.value = suggestLabel;
      await inputAction(input);

      await nextFrame();
      await nextFrame();

      setTimeout(() => pressKey(input, 'Enter'));

      await oneEvent(autoSuggest, 'opened-changed');
      expect(autoSuggest.opened).to.equal(true);

      await elementUpdated(autoSuggest);
      await nextFrame();

      setTimeout(() => {
        document.dispatchEvent(new CustomEvent('tapstart'));
      });

      await oneEvent(autoSuggest, 'opened-changed');

      expect(autoSuggest.opened).to.equal(false);
    });

    it('press arrow up key in the text field', async () => {
      const input = await createInputElement();
      const autoSuggest = await createFixture('navigation');
      const suggestLabel = 'Cornelius';

      autoSuggest.suggestions = [data[0], data[1]];
      await elementUpdated(autoSuggest);

      await focusAction(input);
      input.value = suggestLabel;
      await inputAction(input);

      await nextFrame();
      await nextFrame();

      setTimeout(() => pressKey(input, 'Enter'));
      setTimeout(() => pressKey(input, 'ArrowUp'));

      const highlightEvent = await oneEvent(autoSuggest, 'item-highlight');

      expect(highlightEvent.detail.suggestion).to.eql(data[1]);

      autoSuggest.opened = false;
      await elementUpdated(autoSuggest);

      setTimeout(() => pressKey(input, 'ArrowUp'));

      const revealedEvent = await oneEvent(autoSuggest, 'suggestions-query');

      expect(revealedEvent.detail.reason).to.equal('suggestions-revealed');
    });

    it('press arrow down key in the text field', async function () {
      if (isIE()) {
        this.skip();
      }
      const input = await createInputElement();
      const autoSuggest = await createFixture('navigation');
      const suggestLabel = 'Cornelius';

      autoSuggest.suggestions = [data[0], data[1]];
      await elementUpdated(autoSuggest);

      await focusAction(input);
      input.value = suggestLabel;
      await inputAction(input);

      await nextFrame();
      await nextFrame();

      setTimeout(() => pressKey(input, 'Enter'));
      setTimeout(() => pressKey(input, 'ArrowDown'));

      const highlightEvent = await oneEvent(autoSuggest, 'item-highlight');

      expect(highlightEvent.detail.suggestion).to.eql(data[0]);

      autoSuggest.opened = false;
      await elementUpdated(autoSuggest);

      setTimeout(() => pressKey(input, 'ArrowDown'));

      const revealedEvent = await oneEvent(autoSuggest, 'suggestions-query');

      expect(revealedEvent.detail.reason).to.equal('suggestions-revealed');
    });

    it('render moreSearchText as a text', async function () {
      const autoSuggest = await createFixture('default');
      const text = '<div>xss</div>';
      autoSuggest.moreResults = true;
      autoSuggest.query = text;
      await elementUpdated(autoSuggest);
      const moreResultsText = autoSuggest.shadowRoot.querySelector('[part=more-results] [part=more-results-text] mark');
      expect(moreResultsText.innerText.trim()).to.equal(text);
      autoSuggest.moreSearchText = 'Results are {0} and {0}';
      await elementUpdated(autoSuggest);
      const moreResultsTexts = autoSuggest.shadowRoot.querySelectorAll('[part=more-results] [part=more-results-text] mark');
      expect(moreResultsTexts[0].innerText.trim()).to.equal(text);
      expect(moreResultsTexts[1].innerText.trim()).to.equal(text);
    });

    it('moreResults using shift + enter', async function () {
      if (isIE()) {
        this.skip();
      }
      const input = await createInputElement();
      const autoSuggest = await createFixture('navigation');
      autoSuggest.moreResults = true;
      const suggestLabel = 'Cornelius';

      autoSuggest.suggestions = [...data];
      await elementUpdated(autoSuggest);

      await focusAction(input);
      input.value = suggestLabel;
      await inputAction(input);

      await nextFrame();
      await nextFrame();

      setTimeout(() => pressKey(input, 'Enter'));

      await oneEvent(autoSuggest, 'opened-changed');
      expect(autoSuggest.opened).to.equal(true);

      await elementUpdated(autoSuggest);
      await nextFrame();

      setTimeout(() => pressKey(input, 'Enter', ['shift']));

      const event = await oneEvent(autoSuggest, 'suggestions-fetch-requested');

      expect(event.detail.reason).to.equal('more-results');
    });

    it('moreResults using enter', async function () {
      if (isIE()) {
        this.skip();
      }
      const input = await createInputElement();
      const autoSuggest = await createFixture('navigation');
      autoSuggest.moreResults = true;
      const suggestLabel = 'Cornelius';

      autoSuggest.suggestions = [...data];
      await elementUpdated(autoSuggest);

      await focusAction(input);
      input.value = suggestLabel;
      await inputAction(input);

      await nextFrame();
      await nextFrame();

      setTimeout(() => pressKey(input, 'Enter'));

      await oneEvent(autoSuggest, 'opened-changed');
      expect(autoSuggest.opened).to.equal(true);

      await elementUpdated(autoSuggest);
      await nextFrame();

      await pressKey(input, 'ArrowUp');

      setTimeout(() => pressKey(input, 'Enter'));

      const event = await oneEvent(autoSuggest, 'suggestions-fetch-requested');

      expect(event.detail.reason).to.equal('more-results');
    });

    it('check onItemMousedown', async function () {
      if (isIE()) {
        this.skip();
      }
      const input = await createInputElement();
      const autoSuggest = await createFixture('navigation');
      autoSuggest.moreResults = true;
      const suggestLabel = 'Cornelius';

      autoSuggest.suggestions = [...data];
      await elementUpdated(autoSuggest);

      await focusAction(input);
      input.value = suggestLabel;
      await inputAction(input);

      await nextFrame();
      await nextFrame();

      setTimeout(() => pressKey(input, 'Enter'));

      await oneEvent(autoSuggest, 'opened-changed');
      expect(autoSuggest.opened).to.equal(true);

      autoSuggest.focus();

      await elementUpdated(autoSuggest);
      await nextFrame();

      autoSuggest.dispatchEvent(new CustomEvent('tapstart', { bubbles: true }));

      await elementUpdated(autoSuggest);
      await nextFrame();

      expect(document.activeElement).to.equal(input);
    });

    it('Item should use item.label when it is disabled', async function () {
      if (isIE()) {
        this.skip();
      }
      const input = await createInputElement();
      const autoSuggest = await createFixture('navigation');
      const suggestLabel = 'Cornelius';

      const modifiedData = [...data];
      modifiedData[0].disabled = true;

      autoSuggest.suggestions = modifiedData;
      await elementUpdated(autoSuggest);

      await focusAction(input);
      input.value = suggestLabel;
      await inputAction(input);

      setTimeout(() => pressKey(input, 'Enter'));

      await oneEvent(autoSuggest, 'opened-changed');
      expect(autoSuggest.opened).to.equal(true);

      expect(autoSuggest.querySelector('ef-item').label).to.equal(modifiedData[0].label);
      expect(autoSuggest.querySelector('ef-item').disabled).to.equal(modifiedData[0].disabled);
    });

    it('Item should use item.value as display text when it is disabled and has no label', async function () {
      if (isIE()) {
        this.skip();
      }
      const input = await createInputElement();
      const autoSuggest = await createFixture('navigation');
      const suggestLabel = 'Cornelius';

      const modifiedData = [...data];
      modifiedData[0].disabled = true;
      modifiedData[0].label = undefined;
      modifiedData[0].value = 'Cornelius';

      autoSuggest.suggestions = modifiedData;
      await elementUpdated(autoSuggest);

      await focusAction(input);
      input.value = suggestLabel;
      await inputAction(input);

      setTimeout(() => pressKey(input, 'Enter'));

      await oneEvent(autoSuggest, 'opened-changed');
      expect(autoSuggest.opened).to.equal(true);

      expect(autoSuggest.querySelector('ef-item').label).to.equal(modifiedData[0].value);
      expect(autoSuggest.querySelector('ef-item').disabled).to.equal(modifiedData[0].disabled);
    });
  });
});
