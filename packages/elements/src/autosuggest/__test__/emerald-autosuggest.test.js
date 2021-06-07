import { elementUpdated, expect, isIE, nextFrame } from '@refinitiv-ui/test-helpers';
// import element and theme
import { itemHighlightable, itemRenderer } from '../../../lib/autosuggest/helpers/utils.js';
import '@refinitiv-ui/elemental-theme/light/ef-autosuggest';
import '@refinitiv-ui/elemental-theme/light/ef-text-field';
import { Autosuggest } from '@refinitiv-ui/elements/autosuggest';
import '@refinitiv-ui/elements/text-field';

import { createFixture, createInputElement } from './helpers/helpers';

describe('Autosuggest', () => {

  it('DOM structure is correct', async () => {
    await createInputElement();
    const el = await createFixture('snapshot');
    expect(el).shadowDom.to.equalSnapshot();
  });

  describe('Test Properties And Attributes Assign Value', async () => {
    let autoSuggest;
    let input;

    beforeEach(async () => {
      input = await createInputElement();
      autoSuggest = await createFixture();
    });

    describe('Test Attach Field', async () => {
      it('Test attach attribute and reflecting to property', async () => {
        expect(autoSuggest.hasAttribute('attach')).to.equal(false, 'By default attach does not exeists');

        autoSuggest.setAttribute('attach', '#input-element');

        expect(autoSuggest.getAttribute('attach')).to.equal('#input-element');
        expect(autoSuggest.attach).to.equal('#input-element', 'Attribute should reflect value to property');
      });

      it('Test attach property and reflecting to attribute', async () => {
        expect(autoSuggest.attach).to.equal(null, 'By default attach property does not exists');
        autoSuggest.attach = '#input-element';

        await elementUpdated(autoSuggest);

        expect(autoSuggest.getAttribute('attach')).to.equal(null, 'Property attach should not reflect value to attribute');
        expect(autoSuggest.attach).to.equal('#input-element');

        autoSuggest.attach = await createInputElement();
        await elementUpdated(autoSuggest);

        expect(autoSuggest.attach instanceof HTMLElement).to.equal(true, 'Should be able to attach HTMLElement directly');
      });
    });

    describe('Test requestOnFocus Field', async () => {
      it('Test request-on-focus attribute and reflecting to property', async () => {
        expect(autoSuggest.hasAttribute('request-on-focus')).to.equal(false, 'By default request-on-focus does not exists');

        autoSuggest.setAttribute('request-on-focus', '');

        expect(autoSuggest.hasAttribute('request-on-focus')).to.equal(true);
        expect(autoSuggest.requestOnFocus).to.be.equal(true, 'Attribute should reflect value to property');
      });

      it('Test requestOnFocus property and reflecting to attribute', async () => {
        expect(autoSuggest.requestOnFocus).to.equal(false, 'By default requestOnFocus property should be false');
        autoSuggest.requestOnFocus = true;

        await elementUpdated(autoSuggest);

        expect(autoSuggest.hasAttribute('request-on-focus')).to.equal(false, 'Property requestOnFocus should not reflect value to attribute');
        expect(autoSuggest.requestOnFocus).to.equal(true);
      });
    });

    describe('Test moreResults Field', async () => {
      it('Test more-results attribute and reflecting to property', async () => {
        expect(autoSuggest.hasAttribute('more-results')).to.equal(false, 'By default more-results does not exists');

        autoSuggest.setAttribute('more-results', '');

        expect(autoSuggest.hasAttribute('more-results')).to.equal(true);
        expect(autoSuggest.moreResults).to.be.equal(true, 'Attribute should reflect value to property');
      });

      it('Test moreResults property and reflecting to attribute', async () => {
        expect(autoSuggest.moreResults).to.equal(false, 'By default moreResults property should be false');
        autoSuggest.moreResults = true;

        await elementUpdated(autoSuggest);

        expect(autoSuggest.hasAttribute('more-results')).to.equal(true, 'Property moreResults should reflect value to attribute');
        expect(autoSuggest.moreResults).to.equal(true);
      });
    });

    describe('moreSearchText Field', async () => {
      it('Test more-search-text attribute and reflecting to property', async () => {
        expect(autoSuggest.getAttribute('more-search-text')).to.equal(null, 'By default more-search-text should not exists');

        autoSuggest.setAttribute('more-search-text', 'some-super-text');

        expect(autoSuggest.getAttribute('more-search-text')).to.equal('some-super-text');
        expect(autoSuggest.moreSearchText).to.be.equal('some-super-text', 'Attribute should reflect value to property');
      });

      it('Test moreSearchText property and reflecting to attribute', async () => {
        expect(autoSuggest.moreSearchText).to.equal(Autosuggest.defaultMoreSearchText, 'By default moreSearchText property should be defaultValue');
        autoSuggest.moreSearchText = 'some-super-text';

        await elementUpdated(autoSuggest);

        expect(autoSuggest.getAttribute('more-search-text')).to.equal(null, 'Property moreSearchText should not reflect value to attribute');
        expect(autoSuggest.moreSearchText).to.equal('some-super-text');
      });
    });

    describe('Test Loading Field', async () => {
      it('Test loading attribute and reflecting to property', async () => {
        expect(autoSuggest.hasAttribute('loading')).to.equal(false, 'By default loading does not exists');

        autoSuggest.setAttribute('loading', '');

        expect(autoSuggest.hasAttribute('loading')).to.equal(true);
        expect(autoSuggest.loading).to.be.equal(true, 'Attribute should reflect value to property');
      });

      it('Test loading property and reflecting to attribute', async () => {
        expect(autoSuggest.loading).to.equal(false, 'By default loading property should be false');
        autoSuggest.loading = true;

        await elementUpdated(autoSuggest);

        expect(autoSuggest.hasAttribute('loading')).to.equal(true, 'Property loading should reflect value to attribute');
        expect(autoSuggest.loading).to.equal(true);
      });
    });

    describe('Test Query Field', async () => {
      it('Test query attribute and reflecting to property', async function () {
        if (isIE()) {
          this.skip();
        }
        expect(autoSuggest.getAttribute('query')).to.equal(null, 'Attribute query should not exists');

        autoSuggest.setAttribute('query', 'some-super-text');

        expect(autoSuggest.getAttribute('query')).to.equal('some-super-text');
        expect(autoSuggest.query).to.be.equal(null, 'Attribute should not reflect value to property');
      });

      it('Test query property and reflecting to attribute', async () => {
        expect(autoSuggest.query).to.equal(null, 'By default query property should be null');
        autoSuggest.query = 'some-super-text';

        await elementUpdated(autoSuggest);

        expect(autoSuggest.hasAttribute('query')).to.equal(false, 'Property query should not reflect value to attribute');
        expect(autoSuggest.query).to.equal('some-super-text');

        autoSuggest.query = { value: 'some-super-search-text' };

        expect(typeof autoSuggest).to.equal('object', 'Query could be object');
      });
    });

    describe('Test debounceRate Field', async () => {
      it('Test debounce-rate attribute and reflecting to property', async () => {
        expect(autoSuggest.getAttribute('debounce-rate')).to.equal(null, 'By default debounce-rate should not exists');

        autoSuggest.setAttribute('debounce-rate', '200');

        expect(autoSuggest.getAttribute('debounce-rate')).to.equal('200');
        expect(autoSuggest.debounceRate).to.be.equal(200, 'Attribute should reflect value to property');
      });

      it('Test debounceRate property and reflecting to attribute', async () => {
        expect(autoSuggest.debounceRate).to.equal(Autosuggest.defaultDebounceRate, 'By default debounceRate property should be defaultValue');
        autoSuggest.debounceRate = 200;

        await elementUpdated(autoSuggest);

        expect(autoSuggest.getAttribute('debounce-rate')).to.equal(null, 'Property debounceRate should not reflect value to attribute');
        expect(autoSuggest.debounceRate).to.equal(200);
      });
    });

    describe('Test Renderer Field', async () => {
      it('Test renderer attribute and reflecting to property', async () => {
        expect(autoSuggest.getAttribute('renderer')).to.equal(null, 'Attribute renderer should not exists');

        autoSuggest.setAttribute('renderer', 'some-super-text');

        expect(autoSuggest.getAttribute('renderer')).to.equal('some-super-text');
        expect(autoSuggest.renderer).to.be.equal(itemRenderer, 'Attribute should not reflect value to property');
      });

      it('Test renderer property and reflecting to attribute', async () => {
        expect(autoSuggest.renderer).to.equal(itemRenderer, 'By default renderer property should be equal itemRenderer');
        const superRenderer = () => {
        };
        autoSuggest.renderer = superRenderer;

        await elementUpdated(autoSuggest);

        expect(autoSuggest.hasAttribute('renderer')).to.equal(false, 'Property renderer should not reflect value to attribute');
        expect(autoSuggest.renderer).to.equal(superRenderer);
      });
    });

    describe('Test Highlightable Field', async () => {
      it('Test highlightable attribute and reflecting to property', async () => {
        expect(autoSuggest.getAttribute('highlightable')).to.equal(null, 'Attribute highlightable should not exists');

        autoSuggest.setAttribute('highlightable', 'some-super-text');

        expect(autoSuggest.getAttribute('highlightable')).to.equal('some-super-text');
        expect(autoSuggest.highlightable).to.be.equal(itemHighlightable, 'Attribute should not reflect value to property');
      });

      it('Test highlightable property and reflecting to attribute', async () => {
        expect(autoSuggest.highlightable).to.equal(itemHighlightable, 'By default highlightable property should be equal itemHighlightable');
        const superHighlightable = () => {
        };
        autoSuggest.highlightable = superHighlightable;

        await elementUpdated(autoSuggest);

        expect(autoSuggest.hasAttribute('highlightable')).to.equal(false, 'Property highlightable should not reflect value to attribute');
        expect(autoSuggest.highlightable).to.equal(superHighlightable);
      });
    });

    describe('Test htmlRenderer Field', async () => {
      it('Test html-renderer attribute and reflecting to property', async () => {
        expect(autoSuggest.hasAttribute('html-renderer')).to.equal(false, 'By default html-renderer does not exists');

        autoSuggest.setAttribute('html-renderer', '');

        expect(autoSuggest.hasAttribute('html-renderer')).to.equal(true);
        expect(autoSuggest.htmlRenderer).to.be.equal(true, 'Attribute should reflect value to property');
      });

      it('Test htmlRenderer property and reflecting to attribute', async () => {
        expect(autoSuggest.htmlRenderer).to.equal(false, 'By default htmlRenderer property should be false');
        autoSuggest.htmlRenderer = true;

        await elementUpdated(autoSuggest);

        expect(autoSuggest.hasAttribute('html-renderer')).to.equal(false, 'Property htmlRenderer should not reflect value to attribute');
        expect(autoSuggest.htmlRenderer).to.equal(true);
      });
    });

    it('Test internals', async () => {
      autoSuggest.setAttribute('attach', '#input-element');

      await elementUpdated(autoSuggest);
      await nextFrame();

      // expect(autoSuggest.managed, 'managed is not true').to.equal(true);
      // expect(autoSuggest.horizontalAlign, 'horizontalAlign is not "left').to.equal('left');
      // expect(autoSuggest.verticalAlign, 'verticalAlign is not "auto').to.equal('auto');
      expect(autoSuggest.noCancelOnEscKey, 'noCancelOnEscKey is not true').to.equal(true);
      expect(autoSuggest.noCancelOnOutsideClick, 'noCancelOnOutsideClick is not true').to.equal(true);
      expect(autoSuggest.noAutofocus, 'noAutofocus is not true').to.equal(true);
      // expect(autoSuggest.autoResize, 'autoResize is not true').to.equal(true);
      expect(autoSuggest.noOverlap, 'noOverlap is not true').to.equal(true);
      // expect(autoSuggest.tabindex, 'tabindex is not -1').to.equal(-1);
      expect(autoSuggest.withShadow, 'withShadow is not false').to.equal(false);
      // expect(autoSuggest.scrollAction, 'scrollAction is not "lock"').to.equal('lock');

      expect(autoSuggest.attachTarget, 'Attach target is not resolved correctly').to.equal(input);
      expect(autoSuggest.positionTarget, 'Position target should be set to attach target by default').to.equal(input);

      // public methods
      expect(autoSuggest.onInputValueChange, 'onInputValueChange does not exist').to.exist;
      expect(autoSuggest.onInputKeyDown, 'onInputKeyDown does not exist').to.exist;
      expect(autoSuggest.onInputBlur, 'onInputBlur does not exist').to.exist;
      expect(autoSuggest.onInputFocus, 'onInputFocus does not exist').to.exist;
    });
  });
});
