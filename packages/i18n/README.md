# I18N

`@refinitiv-ui/i18n` provides wrappers and APIs around formatjs [IntlMessageFormat](https://formatjs.io/docs/intl-messageformat/) and `@refinitiv-ui/phrasebook`. In addition, it provides tools to observe `lang` attribute changes.

## Usage

Use with `@refinitiv-ui/translate` to translate Element Framework components.

## API Overview

`@refinitiv-ui/i18n` provides a set of APIs to facilities translations.

### t()

`t` function is used to get the translation message from **Phrasebook**. Please refer to `@refinitiv-ui/phrasebook` documentation on how to populate phrasebooks.

```js
// get translation for "element-scope" scope, "en" locale, "TRANSLATE_KEY" with options
const message = await t('element-scope', 'en', 'TRANSLATE_KEY', {
  option: 'value',
});
```

If the requested locale is not available, `t` always tries to resolve the translation from the default locale (`DEFAULT_LOCALE`). If translation cannot be found the requested _translation key_ is returned:

```js
// outputs 'TRANSLATION_KEY'
const message = await t('element-scope', 'unknown-LOCALE', 'TRANSLATION_KEY');
```

### LangAttributeObserver

It is common that translations are applied based on `lang` HTML attribute. Please see [Language tag syntax](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang) to get additional information.

`LangAttributeObserver` utilizes [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) to run a callback when `lang` attribute changes either on document level or on element level.

```html
<!-- Define document level locale -->
<html lang="en-GB">
  <body>
    <!-- This paragraph uses document locale -->
    <p id="first">This paragraph uses document locale</p>

    <!-- Define element level locale -->
    <p id="second" lang="ru">Этот параграф написан на русском.</p>
  </body>
</html>
```

```js
const paragraph1 = document.getElementById('first');
const paragraph2 = document.getElementById('second');

// start observing lang changes
LangAttributeObserver.observe(paragraph1, () => {
  console.log('First paragraph locale changes');
});
LangAttributeObserver.observe(paragraph2, () => {
  console.log('Second paragraph locale changes');
});

// Outputs: 'First paragraph locale changes'
document.documentElement.lang = 'it';

// Outputs: 'Second paragraph locale changes'
paragraph2.lang = 'es';
```

To stop observing `lang` changes and avoid memory leaks you **must** disconnect an element.

```js
LangAttributeObserver.disconnect(paragraph1);
LangAttributeObserver.disconnect(paragraph2);
```

### clearCache() and clearCachedRecord()

`@refinitiv-ui/i18n` caches translations for efficient re-use. In rare scenarios, you might need to clear the cache manually.

```js
// Clear all cached records
clearCache();

// Clear cached record for specific scope and locale
clearCachedRecord('element-scope', 'en');
```

### resolveLocale()

The function is used to get the most suitable locale for the scope by checking supported locales from Phrasebook.

```js
// If supported locales for "element-scope" are "['en', 'zh-Hant', 'zh-Hans']"
resolveLocale('element-scope', 'en'); // resolved as "en"
resolveLocale('element-scope', 'en-GB'); // resolved as "en"
resolveLocale('element-scope', 'en-US'); // resolved as "en"
resolveLocale('element-scope', 'ru'); // resolved as "". No matching locales
resolveLocale('element-scope', 'zh'); // resolved as "". No matching locales
resolveLocale('element-scope', 'zh-Hant'); // resolved as "zh-Hant"
resolveLocale('element-scope', 'zh-Hant-HK'); // resolved as "zh-Hant"
```

## Technical Details

### Locale resolution

`@refinitiv-ui/i18n` tries to match the best available locale or fallback to default if none is available.

For example, if the Phrasebooks defines the following locales: `['en', 'zh-Hant', 'zh-Hans']`. The list below shows how the locales will be resolved:

- en -> en
- en-GB -> en
- en-US -> en
- ru -> DEFAULT_LOCALE (en-GB) -> en
- zh -> DEFAULT_LOCALE (en-GB) -> en
- zh-Hant -> zh-Hant
- zh-Hant-HK -> zh-Hant

### Caching

Creating instances of `Intl` formats is an expensive operation. `@refinitiv-ui/i18n` re-uses [Intl Format Cache](https://www.npmjs.com/package/intl-format-cache) to memoise translations.

### Unicode Extension

Translate object supports [BCP47 unicode extensions](https://www.w3.org/International/multilingualweb/dublin/slides/23b-davis.pdf). You can provide unicode as part of `locale` or by passing `unicodeExtensions` to `t` function.

```html
<!-- English locale with Islamic Calendar and 24h time format -->
<html lang="en-u-hc-h24-ca-islamic"></html>
```

```js
const message = await t(
  'element-scope',
  'en',
  'TRANSLATE_KEY',
  {
    option: 'value',
  },
  {
    // English locale with Islamic Calendar and 24h time format
    unicodeExtensions: {
      hc: 'h24',
      ca: 'islamic',
    },
  }
);
```

Note that you cannot provide more than one list of unicode extensions. Therefore, if extensions are provided via html and JavaScript, the list is merged.

## References

You can get additional information about internationalization:

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
- https://formatjs.io/
- https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang
- https://messageformat.github.io/messageformat/page-guide

