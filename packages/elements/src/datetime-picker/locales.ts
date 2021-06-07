import { Phrasebook } from '@refinitiv-ui/phrasebook';
import { resolveLocale, DEFAULT_LOCALE } from '@refinitiv-ui/i18n';

import {
  Locale
} from 'date-fns';

import {
  enGB,
  enUS,
  de,
  es,
  fr,
  it,
  ja,
  ko,
  pl,
  ru,
  th,
  zhCN
} from 'date-fns/esm/locale';


// This file is a transition between using date-fns and Intl object to format dates
// As of now, use Phraseboook to just resolve languages and locales
// and match against the date-fns locales.

// match locales against date-fns
// This will be used with resolveLocale function
const globals = {};
const scope = 'ef-datetime-picker';
Phrasebook.define('en', scope, globals);
Phrasebook.define('en-GB', scope, globals);
Phrasebook.define('de', scope, globals);
Phrasebook.define('es', scope, globals);
Phrasebook.define('fr', scope, globals);
Phrasebook.define('it', scope, globals);
Phrasebook.define('ja', scope, globals);
Phrasebook.define('ko', scope, globals);
Phrasebook.define('pl', scope, globals);
Phrasebook.define('ru', scope, globals);
Phrasebook.define('th', scope, globals);
Phrasebook.define('zh', scope, globals);

type LangMap = {
  [key: string]: Locale;
}

const locales: LangMap = {
  'en': enUS,
  'en-GB': enGB,
  de,
  es,
  fr,
  it,
  ja,
  ko,
  pl,
  ru,
  th,
  'zh': zhCN
};

/**
 * Get date-fns locale or default locale
 * @param [locale] BCP47 locale tag
 * @returns DateFNS Locale object
 */
const getDateFNSLocale = (locale: string): Locale => {
  locale = resolveLocale(scope, locale) || DEFAULT_LOCALE;
  return locales[locale] || enUS;
};

export {
  getDateFNSLocale
};
