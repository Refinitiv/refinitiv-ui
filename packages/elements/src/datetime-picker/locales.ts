import { Phrasebook } from '@refinitiv-ui/phrasebook';
import { resolveLocale, DEFAULT_LOCALE } from '@refinitiv-ui/i18n';
import type { Locale } from 'date-fns';

import enGB from 'date-fns/esm/locale/en-GB/index.js';
import enUS from 'date-fns/esm/locale/en-US/index.js';
import de from 'date-fns/esm/locale/de/index.js';
import es from 'date-fns/esm/locale/es/index.js';
import fr from 'date-fns/esm/locale/fr/index.js';
import it from 'date-fns/esm/locale/it/index.js';
import ja from 'date-fns/esm/locale/ja/index.js';
import ko from 'date-fns/esm/locale/ko/index.js';
import pl from 'date-fns/esm/locale/pl/index.js';
import ru from 'date-fns/esm/locale/ru/index.js';
import th from 'date-fns/esm/locale/th/index.js';
import zhCN from 'date-fns/esm/locale/zh-CN/index.js';

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
