import { Phrasebook } from '@refinitiv-ui/phrasebook';
import { CalendarLocaleScope } from './constants.js';

// While Intl can support literally all world languages
// for safety still limit the number of locales, for the following reasons
// 1) different browsers and OS support different locales, and the result might be different.
// 2) first day of week is different. Currently it is not possible to get this info out of Intl object
const globals = {
  VIEW_FORMAT: '{includeMonth, select, true {{includeEra, select, true {{ date, date, calendarMonthEra }} other {{ date, date, calendarMonth }}}} other {{ includeEra, select, true {{ date, date, calendarYearEra }} other {{ date, date, calendarYear }}}}}',
  FIRST_DAY_OF_WEEK: '1'
};

const en = globals;
const enUS = { ...en, FIRST_DAY_OF_WEEK: '0' };
const enCA = enUS;
const de = globals;
const es = globals;
const fr = globals;
const frCA = { ...fr, FIRST_DAY_OF_WEEK: '0' };
const it = globals;
const ja = globals;
const ko = { ...globals, FIRST_DAY_OF_WEEK: '0' };
const pl = globals;
const ru = globals;
const th = { ...globals, FIRST_DAY_OF_WEEK: '0' };
const zh = globals;
const ar = { ...globals, FIRST_DAY_OF_WEEK: '6' };

const scope = CalendarLocaleScope;
Phrasebook.define('en', scope, en);
Phrasebook.define('en-CA', scope, enCA);
Phrasebook.define('en-US', scope, enUS);
Phrasebook.define('de', scope, de);
Phrasebook.define('es', scope, es);
Phrasebook.define('fr', scope, fr);
Phrasebook.define('fr-CA', scope, frCA);
Phrasebook.define('it', scope, it);
Phrasebook.define('ja', scope, ja);
Phrasebook.define('ko', scope, ko);
Phrasebook.define('pl', scope, pl);
Phrasebook.define('ru', scope, ru);
Phrasebook.define('th', scope, th);
Phrasebook.define('zh', scope, zh);
Phrasebook.define('ar', scope, ar);
