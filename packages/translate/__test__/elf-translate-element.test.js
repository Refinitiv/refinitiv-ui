import { elementUpdated, expect, fixture, nextFrame, replaceWhitespace } from '@refinitiv-ui/test-helpers';

import '../lib/test/test-translate.js';
import { getHTMLContent } from './utils.js';

describe('Elf Translate Element Lang Test', function () {
  it('en-GB: check directive translations', async function () {
    const el = await fixture('<test-translate lang="en-GB"></test-translate>');

    expect(el.defaultEl.innerText).to.equal('This is en locale', 'en-GB: default locale');
    expect(el.customEl.innerText).to.equal('en: custom', 'en-GB: custom t tag');
    expect(getHTMLContent(el.boldEl).trim()).to.equal(
      'HTML: Part of the text is in <b>bold</b> and <i>italic</i> font',
      'en-GB: HTML content'
    );
  });

  it('en-US: check directive translations', async function () {
    const el = await fixture('<test-translate lang="en-US"></test-translate>');

    expect(el.defaultEl.innerText).to.equal('This is en-US locale', 'en-US: default locale');
    expect(el.customEl.innerText).to.equal('enUS: custom', 'en-US: custom t tag');
    expect(getHTMLContent(el.boldEl).trim()).to.equal(
      'HTML: Part of the text is in <b>bold</b> and <i>italic</i> font',
      'en-US: HTML content'
    );
  });

  it('ru: check directive translations', async function () {
    const el = await fixture('<test-translate lang="ru"></test-translate>');
    expect(el.defaultEl.innerText).to.equal('Региональные настройки: ru', 'ru: default locale');
    expect(el.customEl.innerText).to.equal('ru: custom', 'ru: custom t tag');
    expect(getHTMLContent(el.boldEl).trim()).to.equal(
      'HTML: Часть этого текста написана <b>жирным</b> шрифтом и <i>курсивом</i>',
      'ru: HTML content'
    );
  });

  it('Check that translate can be used as property and attribute', async function () {
    const el = await fixture('<test-translate lang="en-GB" with-nested></test-translate>');
    expect(el.nestedEl.attribute).to.equal('Attribute: I am nested attribute');
    expect(el.nestedEl.property).to.equal('Property: I am nested property');
  });

  it('Check fallback language', async function () {
    const el = await fixture('<test-translate lang="it"></test-translate>');
    const enUSCAel = await fixture('<test-translate lang="en-ZA"></test-translate>');
    expect(el.defaultEl.innerText).to.equal(
      'This is en locale',
      'If locale does not exist fallback to default'
    );
    expect(enUSCAel.defaultEl.innerText).to.equal(
      'This is en locale',
      'Locale should fallback to upper level locale'
    );
  });

  it('Translations should change dynamically when lang changes', async function () {
    const el = await fixture('<test-translate lang="ru"></test-translate>');
    expect(el.defaultEl.innerText).to.equal('Региональные настройки: ru');
    el.lang = 'en';
    await elementUpdated(el);
    await nextFrame();
    expect(el.defaultEl.innerText).to.equal('This is en locale');
  });

  it('It should be possible to pass parameters to translation', async function () {
    const el = await fixture('<test-translate lang="en-GB" number="0"></test-translate>');
    expect(el.numberEl.innerText).to.equal('Long number: 0');
    el.number = 1000;
    await elementUpdated(el);
    await nextFrame();
    expect(el.numberEl.innerText).to.equal('Long number: 1,000');
    el.number = 1000000;
    await elementUpdated(el);
    await nextFrame();
    expect(el.numberEl.innerText).to.equal('Long number: 1,000,000');
  });

  it('Check plurals', async function () {
    const el = await fixture('<test-translate lang="en-GB" with-plurals></test-translate>');
    const ruEl = await fixture('<test-translate lang="ru" with-plurals></test-translate>');

    expect(el.plural0El.innerText).to.equal('Plural 0: there are no results');
    expect(el.plural1El.innerText).to.equal('Plural 1: there is one result');
    expect(el.plural2El.innerText).to.equal('Plural 2: there are 2 results');

    expect(ruEl.plural0El.innerText).to.equal('Plural 0: Нет результатов');
    expect(ruEl.plural1El.innerText).to.equal('Plural 1: Один результат');
    expect(ruEl.plural2El.innerText).to.equal('Plural 2: 2 результата');
  });

  it('Check currency', async function () {
    const elGB = await fixture('<test-translate lang="en-GB"></test-translate>');
    const elUS = await fixture('<test-translate lang="en-US"></test-translate>');
    const elRU = await fixture('<test-translate lang="ru"></test-translate>');

    expect(elGB.currencyEl.innerText).to.equal('Currency: the total is £1,000,000.00.', 'en-GB: currency');
    expect(elUS.currencyEl.innerText).to.equal('Currency: the total is $1,000,000.00.', 'en-US: currency');
    expect(elRU.currencyEl.innerText).to.equal('Currency: всего 1 000 000,00 ₽.', 'ru: currency');
  });

  it('Check numbers', async function () {
    const elGB = await fixture('<test-translate lang="en-GB"></test-translate>');
    const elUS = await fixture('<test-translate lang="en-US"></test-translate>');
    const elRU = await fixture('<test-translate lang="ru"></test-translate>');

    expect(elGB.numberEl.innerText).to.equal('Long number: 1,000,000', 'en-GB: number');
    expect(elUS.numberEl.innerText).to.equal('Long number: 1,000,000', 'en-US: number');
    expect(elRU.numberEl.innerText).to.equal('Long number: 1 000 000', 'ru: number');
  });

  it('Check dates', async function () {
    const elGB = await fixture('<test-translate lang="en-GB"></test-translate>');
    const elUS = await fixture('<test-translate lang="en-US"></test-translate>');
    const elRU = await fixture('<test-translate lang="ru"></test-translate>');

    /**
     * There is no comma between day and date in full date pattern of en-GB locale.
     * https://icu4c-demos.unicode.org/icu-bin/locexp?_=en_GB
     * Since only Safari 17.4+ & Chrome 125+ format it correctly,
     * both format are accepted until all browsers in our support scope format it correctly.
     */
    expect(elGB.dateEl.innerText).to.be.oneOf(
      [
        'Date: The date is: Tuesday, 21 July 2020, 23:59:50',
        'Date: The date is: Tuesday 21 July 2020, 23:59:50'
      ],
      'en-GB: date'
    );
    expect(replaceWhitespace(elUS.dateEl.innerText)).to.equal(
      'Date: The date is: Tuesday, July 21, 2020, 11:59:50 PM',
      'en-US: date'
    );
    expect(replaceWhitespace(elRU.dateEl.innerText)).to.equal(
      'Date: Дата: вторник, 21 июля 2020 г., 23:59:50',
      'ru: date'
    );
  });
});
