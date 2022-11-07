import { fixture, expect, elementUpdated, nextFrame } from '@refinitiv-ui/test-helpers';
import '../lib/test/test-translate';

describe('Elf Translate Document Lang Test', () => {
  it('Document language should be applied', async function () {
    document.documentElement.lang = 'ru';
    const el = await fixture('<test-translate></test-translate>');
    const enEl = await fixture('<test-translate lang="en"></test-translate>');

    expect(el.defaultEl.innerText).to.equal('Региональные настройки: ru');
    expect(enEl.defaultEl.innerText).to.equal('This is en locale', 'Document locale should not affect element locale');
  });

  it('Translations should change dynamically when document lang changes', async function () {
    document.documentElement.lang = 'ru';
    const el = await fixture('<test-translate></test-translate>');
    const enUSEl = await fixture('<test-translate lang="en-US"></test-translate>');

    document.documentElement.lang = 'en';
    await elementUpdated(el);
    await elementUpdated(enUSEl);
    await nextFrame();

    expect(el.defaultEl.innerText).to.equal('This is en locale');
    expect(enUSEl.defaultEl.innerText).to.equal('This is en-US locale', 'Document locale should not affect element locale');
  });
});
