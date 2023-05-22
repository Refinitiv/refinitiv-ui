import { expect } from '@refinitiv-ui/test-helpers';
import { Phrasebook } from '@refinitiv-ui/phrasebook';
import {
  t,
  clearCache,
  clearCachedRecord,
  DEFAULT_LOCALE
} from '../lib';
import { Memoiser } from '../lib/memoiser';
import { isMobile } from '@refinitiv-ui/utils/browser.js';

const scope = 'i18n-test';

// Define test phrasebooks
Phrasebook.define(DEFAULT_LOCALE, scope, {
  OK: 'default: OK',
  NUMBER: 'default: { count }'
});
Phrasebook.define('es', scope, {
  OK: 'es: OK',
  NUMBER: 'es: { count }'
});
Phrasebook.define('es-US', scope, {
  OK: 'es-US: OK',
  NUMBER: 'es-US: { count }'
});
Phrasebook.define('th', scope, {
  DATE: '{date, date, ::yyyy}'
});

describe('i18n Test', () => {
  it('Default locale must be defined', async () => {
    expect(DEFAULT_LOCALE).to.exist;
  });

  it('Can get a translated message in different locales', async () => {
    expect(await t(scope, DEFAULT_LOCALE, 'OK')).to.equal('default: OK');
    expect(await t(scope, 'es', 'OK')).to.equal('es: OK');
    expect(await t(scope, 'es-US', 'OK')).to.equal('es-US: OK');
  });

  it('Can get a translated message in different locales with parameters', async () => {
    expect(await t(scope, DEFAULT_LOCALE, 'NUMBER', { count: 1 })).to.equal('default: 1');
    expect(await t(scope, 'es', 'NUMBER', { count: 2 })).to.equal('es: 2');
    expect(await t(scope, 'es-US', 'NUMBER', { count: 3 })).to.equal('es-US: 3');
  });

  it('Can get a fallback translation if high level locale is defined', async () => {
    expect(await t(scope, 'es-ES', 'OK')).to.equal('es: OK'); // es-ES -> ES
  });

  it('Trying to get unknown locale should return the default locale', async () => {
    expect(await t(scope, 'un-LO', 'OK')).to.equal('default: OK');
    expect(await t(scope, '', 'OK')).to.equal('default: OK');
  });

  it('Trying to get unknown key should return the key', async () => {
    expect(await t(scope, DEFAULT_LOCALE, 'UNKNOWN_KEY')).to.equal('UNKNOWN_KEY');
  });
});

describe('Unicode extensions', () => {
  // test against 2020-Jan-01 00:00:00 local time
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setFullYear(2020, 0, 1);
  it('It should be possible to pass unicode extensions', async () => {
    // 2020 in Thai calendar is 2563
    expect(await t(scope, 'th', 'DATE', {
      date
    })).to.equal('พ.ศ. 2563');

    const message = await t(scope, 'th', 'DATE', {
      date
    }, {
      unicodeExtensions: {
        ca: 'gregory'
      }
    });

    // We do indexOf because in different environments and different browsers
    // the year might or might not contain Gregorian calendar prefix (ค.ศ.)
    expect(message.indexOf('2020') !== -1).to.equal(true, 'Gregorian calendar year should be 2020');
  });
  it('It should be possible to override unicode extensions', async function () {
    if (isMobile) this.skip(); // Prevent test fail in Android on BrowserStack
    // 2020 in Indian calendar from Thai perspective is 1941
    expect(await t(scope, 'th-u-ca-indian', 'DATE', {
      date
    })).to.equal('ม.ศ. 1941');

    const message = await t(scope, 'th-u-ca-indian', 'DATE', {
      date
    }, {
      unicodeExtensions: {
        ca: 'gregory'
      }
    });

    expect(message.indexOf('2020') !== -1).to.equal(true, 'Gregorian calendar year should be 2020');
  });
});

describe('Cache manipulation', () => {
  it('It should be possible to clear locale cache', async () => {
    await t(scope, DEFAULT_LOCALE, 'OK');
    expect(Memoiser.hasRecords()).to.equal(true, 't should use Memoiser to cache translation');
    clearCache();
    expect(Memoiser.hasRecords()).to.equal(false, 'clearCache should clear cached methods');
  });

  it('It should be possible to clear cached record', async () => {
    await t(scope, 'es', 'OK');
    clearCachedRecord(scope, 'es');
    expect(Memoiser.hasRecords()).to.equal(false, 'clearCachedRecord should clear cached record');
  });
});
