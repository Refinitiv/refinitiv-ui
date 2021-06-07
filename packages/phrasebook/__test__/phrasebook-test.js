import { expect } from 'chai';
import { describe } from 'mocha';
import {
  Phrasebook
} from '../lib';

import { clearPhrasebook } from './utils';

// !!! Note: Phrasebook is a singleton so changes are incremental

const scope = 'test-scope';

const getDefaultPhrasebook = (locale) => {
  return {
    DEFAULT: 'Default ' + locale
  };
};

const getPhrasebook = (locale) => {
  return {
    PHRASEBOOK: 'Phrasebook ' + locale
  };
};

// stringify objects for comparison
const s = (obj) => {
  return JSON.stringify(obj);
};

// merge objects
const m = (obj1, obj2) => {
  return Object.assign({}, obj1, obj2);
};

describe('Phrasebook Test', () => {
  it('Can define default phrasebook for different locales', async () => {
    clearPhrasebook(); // phrasebook may be populated from other tests. Clear it

    Phrasebook.define('en', getDefaultPhrasebook('en'));
    Phrasebook.define('ru', getDefaultPhrasebook('ru'));
    Phrasebook.define('en-US', getDefaultPhrasebook('en-US'));

    expect(s(Phrasebook.get('en', scope))).to.equal(s(getDefaultPhrasebook('en')), 'en: default scope is wrong');
    expect(s(Phrasebook.get('ru', scope))).to.equal(s(getDefaultPhrasebook('ru')), 'ru: default scope is wrong');
    expect(s(Phrasebook.get('en-US', scope))).to.equal(s(getDefaultPhrasebook('en-US')), 'en-US: default scope is wrong');
  });

  it('Can define scoped phrasebook for different locales', async () => {
    Phrasebook.define('en', scope, getPhrasebook('en'));
    Phrasebook.define('ru', scope, getPhrasebook('ru'));
    Phrasebook.define('en-US', scope, getPhrasebook('en-US'));

    expect(s(Phrasebook.get('en', scope))).to.equal(s(m(getDefaultPhrasebook('en'), getPhrasebook('en'))), 'en: scope is wrong');
    expect(s(Phrasebook.get('ru', scope))).to.equal(s(m(getDefaultPhrasebook('ru'), getPhrasebook('ru'))), 'ru: scope is wrong');
    expect(s(Phrasebook.get('en-US', scope))).to.equal(s(m(getDefaultPhrasebook('en-US'), getPhrasebook('en-US'))), 'en-US: scope is wrong');
  });

  it('Can re-define a phrasebook translation', async () => {
    const newTranslation = {
      PHRASEBOOK: 'New Phrasebook'
    };
    Phrasebook.define('en', scope, newTranslation);
    expect(s(Phrasebook.get('en', scope))).to.equal(s(m(getDefaultPhrasebook('en'), newTranslation)), 'en: cannot redefine phrasebook');
  });

  it('Phrasebook should return correct values', async () => {
    expect(Phrasebook.get('it', scope)).to.equal(null, 'Unsupported phrasebook should return null');
    expect(s(Phrasebook.get('en', 'unknown-scope'))).to.equal(s(getDefaultPhrasebook('en')), 'Unknown scope should return default phrasebook for that locale');
  });

  it('Phrasebook supported method', async () => {
    expect(s(Phrasebook.supported())).to.equal(s(['en', 'ru', 'en-US']), 'Supported without arguments should return a list of all default supported locales');
    expect(s(Phrasebook.supported(scope))).to.equal(s(['en', 'ru', 'en-US']), 'Supported with scope should return a list of all supported locales for the scope');
    expect(s(Phrasebook.supported('unknown-scope'))).to.equal(s([]), 'Supported with unknown scope should return an empty list');
  });
});

describe('Phrasebook Subscriptions', () => {
  it('Can set and remove observables', async () => {
    const key = Phrasebook.observe(scope, () => {});
    expect(Phrasebook.observables.has(key)).to.equal(true, 'Object is not added to the list of observables');
    Phrasebook.disconnect(key);
    expect(Phrasebook.observables.has(key)).to.equal(false, 'Object is not removed from the list of observables');
  });

  it('Callback is run when phrasebook is defined', async () => {
    clearPhrasebook();
    let counter = 0;
    let locale;

    const key = Phrasebook.observe(scope, (publishLocale) => {
      locale = publishLocale;
      counter += 1;
    });

    Phrasebook.define('en', getDefaultPhrasebook('en'));
    expect(locale).to.equal('en', 'en: locale argument is not passed for default');
    expect(counter).to.equal(1, 'en: default phrasebook should dispatch a callback');

    Phrasebook.define('ru', getDefaultPhrasebook('ru'));
    expect(locale).to.equal('ru', 'ru: locale argument is not passed for default');
    expect(counter).to.equal(2, 'ru: default phrasebook should dispatch a callback');

    Phrasebook.define('en', scope, getPhrasebook('en'));
    expect(locale).to.equal('en', 'en: locale argument is not passed for scoped');
    expect(counter).to.equal(3, 'en: scoped phrasebook should dispatch a callback');

    Phrasebook.define('ru', scope, getPhrasebook('ru'));
    expect(locale).to.equal('ru', 'ru: locale argument is not passed for scoped');
    expect(counter).to.equal(4, 'ru: scoped phrasebook should dispatch a callback');

    Phrasebook.define('en', scope, getPhrasebook('en'));
    expect(counter).to.equal(5, 'en: redefined scope should dispatch a callback');

    Phrasebook.define('en', 'unknown-scope', getPhrasebook('en'));
    expect(counter).to.equal(5, 'Different scope should not dispatch a callback');

    Phrasebook.disconnect(key);
  });
});
