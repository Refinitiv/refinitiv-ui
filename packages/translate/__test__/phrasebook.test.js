import { fixture, expect, elementUpdated, aTimeout } from '@refinitiv-ui/test-helpers';
import '../lib/test/test-translate';
import {
  Phrasebook
} from '@refinitiv-ui/phrasebook';

describe('Phrasebook Dynamic Loading', () => {
  it('Element should update when new phrasebook arrives', async () => {
    const el = await fixture('<test-translate lang="de"></test-translate>');
    expect(el.defaultEl.innerText).to.equal('This is en locale', 'de: fallback locale');
    expect(el.customEl.innerText).to.equal('en: custom', 'de: custom t tag');

    setTimeout(() => {
      Phrasebook.define('de', 'test-translate', {
        DEFAULT: 'Dies ist de locale'
      });

      Phrasebook.define('de', 't-custom', {
        CUSTOM: 'de: custom'
      });
    }, 0);

    await aTimeout(10);
    await elementUpdated(el);
    expect(el.defaultEl.innerText).to.equal('Dies ist de locale', 'de: locale has been defined');
    expect(el.customEl.innerText).to.equal('de: custom', 'de: custom t tag has been defined');
  });
});
