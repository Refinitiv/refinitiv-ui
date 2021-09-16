import {
  Phrasebook
} from '@refinitiv-ui/phrasebook';

const en = {
  DEFAULT: 'This is en locale',
  BOLD: 'HTML: Part of the text is in <b>bold</b> and <i>italic</i> font',
  DATE: 'Date: The date is: {date, date, full}, {date, time, ::HH:mm:ss}',
  NESTED_ATTRIBUTE: 'Attribute: I am nested attribute',
  NESTED_PROPERTY: 'Property: I am nested property',
  PLURAL: 'Plural { count }: there { count, plural, =0 {are no results} one {is one result} other {are # results}}',
  NUMBER: 'Long number: { number, number }',
  CURRENCY: 'Currency: the total is {number, number, ::currency/GBP}.'
};

const enUS = {
  DEFAULT: 'This is en-US locale',
  BOLD: 'HTML: Part of the text is in <b>bold</b> and <i>italic</i> font',
  DATE: 'Date: The date is: {date, date, full}, {date, time, ::KK:mm:ss}',
  NESTED_ATTRIBUTE: 'Attribute: I am nested attribute',
  NESTED_PROPERTY: 'Property: I am nested property',
  PLURAL: 'Plural { count }: there { count, plural, =0 {are no results} one {is one result} other {are # results}}',
  NUMBER: 'Long number: { number, number }',
  CURRENCY: 'Currency: the total is {number, number, ::currency/USD}.'
};

const ru = {
  DEFAULT: 'Региональные настройки: ru',
  BOLD: 'HTML: Часть этого текста написана <b>жирным</b> шрифтом и <i>курсивом</i>',
  DATE: 'Date: Дата: {date, date, full}, {date, time, ::HH:mm:ss}',
  NESTED_ATTRIBUTE: 'Attribute: я вложенный аттрибут',
  NESTED_PROPERTY: 'Property: я вложенное свойство',
  PLURAL: 'Plural { count }: { count, plural, =0 {Нет результатов} one {Один результат} other {# результата}}',
  NUMBER: 'Long number: { number, number }',
  CURRENCY: 'Currency: всего {number, number, ::currency/RUB}.'
};

Phrasebook.define('en', 'test-translate', en);
Phrasebook.define('en-US', 'test-translate', enUS);
Phrasebook.define('ru', 'test-translate', ru);

// second scope
Phrasebook.define('en', 't-custom', {
  CUSTOM: 'en: custom'
});
Phrasebook.define('en-US', 't-custom', {
  CUSTOM: 'enUS: custom'
});
Phrasebook.define('ru', 't-custom', {
  CUSTOM: 'ru: custom'
});

// inherited scope
Phrasebook.define('en', 'test-inherited', {
  ...en,
  INHERIT: 'en: inherited'
});
Phrasebook.define('en-US', 'test-inherited', {
  ...enUS,
  INHERIT: 'enUS: inherited'
});
Phrasebook.define('ru', 'test-inherited', {
  ...ru,
  INHERIT: 'ru: inherited'
});
