<!--
type: page
title: Internationalization
description: Internationalization for application developers
location: ./intl/internationalization
layout: default
-->

# Internationalization

EF components support localization, including translated messages and formatting. In your app, setting the html `lang` attribute will trigger that language to be applied to relevant elements.

```html
<html lang="ja">
```

Alternatively, setting the `lang` attribute directly on elements will have the same effect.

@>`lang` on an element supersedes the html `lang`, meaning multiple languages can exist on the same page.

Currently, the following languages are supported:

| Language            | lang value |
| ------------------- | ---------- |
| English (default)   | `en`       |
| Japanese            | `ja`       |
| German              | `de`       |
| Simplified Chinese  | `zh`       |
| Traditional Chinese | `zh-Hant`  |

_** If an unsupported language is set, English is the default fallback._

## Regionals

Adding region country codes will format all numbers and dates accordingly. For region specific languages to be applied, there must be additional region translations for that language.

If no country code is applied, the browser default is used.

## Using in your app

EF elements are packaged with English translations only. The application developer must ensure that the additional languages are included, by importing any additional translation files.

The translation is selected using the following algorithm:

- if the element has the `lang` attribute defined and a translation exists, select it, otherwise
- if the `html` root element has the `lang` attribute defined and a translation exists, select it, otherwise
- if a `navigator.language` translation exists, select it, otherwise
- use the default English translation

There are many ways to load translations. Below are typical configurations, but it is up to the developer to pick the most appropriate solution.

### Static Imports

The simplest way is to include translations in a bundle, for instance:

``` js
// # translations.js

// ef-tree-select, Japanese and German locales
import '@refinitiv-ui/phrasebook/locale/ja/tree-select';
import '@refinitiv-ui/phrasebook/locale/de/tree-select';

// ef-pagination, Simplified and Traditional Chinese locales
import '@refinitiv-ui/phrasebook/locale/zh/pagination';
import '@refinitiv-ui/phrasebook/locale/zh-hant/pagination';
```

Including translations in such a way will increase the bundle size, but has the benefit that translations are available immediately on application load.

### Dynamic Import

If your application supports [dynamic module resolution](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import), you can load translations on demand.  For instance:

``` js
import { supportedLocales } from '@formatjs/intl-utils';

// load language from your app's service
App.Settings.Language.read(value => {
  // set html lang tag
  document.documentElement.lang = value;
  // resolve regional locale into support locale.
  // for instance: if value === 'de-AT', then locale = 'de'
  const locale = supportedLocales(['ja', 'de'], [value])[0];
  if (locale) {
    // use dynamic import. Element will update itself once locale is loaded
    import(`@refinitiv-ui/phrasebook/locale/${locale}/pagination`);
  }
});
```

### From The Server

You can store translations as JSON on the app server or CDN. In this case you may want to extract JSON content to upload to the server.

``` js
import { supportedLocales } from '@formatjs/intl-utils';
import { Phrasebook } from '@refinitiv-ui/phrasebook';

// resolve locale from HTML lang attribute or navigator language
const locale = supportedLocales(['ja', 'de'], [document.documentElement.lang || navigator.language])[0];

// fetch locale
fetch(`static/locale/${locale}/pagination.json`).then(translations => {
  // define translation within Phrasebook to be available for EF elements
  Phrasebook.define('de', 'ef-pagination', translations);
});
```

::footer::
