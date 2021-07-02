# Element Framework Phrasebook

Phrasebook is a collection of APIs to define translations. In addition, the package provides locales for all core Element Framework components. The phrasebook is primarily designed to be used with `@refinitiv-ui/i18n` and `@refinitiv-ui/translate` packages.

## Phrasebook

Phrasebook is a singleton that contains all translations. The developer can get a translation or observe translation changes.

### Define new translation

All translations are defined per _locale_ and _scope_. _locale_ can be a top level locale (for instance en, ru, zn) or a region locale (for instance en-GB, uz-Cyrl-UZ). _scope_ is usually an element name. If the scope is not defined, the translations are considered as default and are accessible for every scope.

To define a default locale:

```js
Phrasebook.define('en', { OK: 'OK' });
Phrasebook.define('ru', { OK: 'Хорошо' });
```

To define a scoped locale:

```js
Phrasebook.define('en', 'ef-element', { TEST_ELEMENT: 'Test Element' });
Phrasebook.define('ru', 'ef-element', {
  TEST_ELEMENT: 'Элемент для тестирования',
});
```

You can get translations by calling `get` method. The response always includes scoped translations combined with default translations.

```js
// Get scoped translations. Outputs: { OK: 'OK', TEST_ELEMENT: 'Test Element' }
console.log(Phrasebook.get('en', 'ef-element'));

// Get default translations. Outputs: { OK: 'OK' }
console.log(Phrasebook.get('en'));
console.log(Phrasebook.get('en', 'unknown-element'));
```

You can get the list of supported locales for the scope by calling `supported` method:

```js
// Outputs: ['en', 'ru']
console.log(Phrasebook.supported('ef-element'));

// Outputs: []
console.log(Phrasebook.supported('unknown-element'));
```

### Observe Phrasebook

The main benefit of using Phrasebook is the ability to observe changes in translations. As soon as the translation changes or the new translation defined the callback function is called. This allows dynamic loading of translations (e.g. from CDN).

To observer translations:

```js
// Observe requires a unique key. Usually it is an HTML element, but can be any object, like Symbol
const element = document.createElement('ef-element');
Phrasebook.observe(element, 'ef-element', (locale) => {
  console.log(locale);
});

// Outputs: 'en'.
Phrasebook.define('en', 'ef-element', { TEST_ELEMENT: 'Test Element' });

// Publishing default calls callback as well. Outputs: 'ru'.
Phrasebook.define('ru', { OK: 'Хорошо' });
```

To stop observing translation use `disconnect` method. This is usually required when the element is removed from DOM tree.

```js
Phrasebook.disconnect(element);
```

## Core Element Translations

The package is deployed with all translations required by Element Framework components.

### Structure

Define locales inside `src\locale`. The following structure must be followed:

```text
locale/
|--[locale]/
|     |--[component-name].ts
|     |--shared.ts
```

You must ensure that all keys are populated for every locale.

### Format

The key is the reference with which to return the translation value.

Each translation value is in the [ICU format](http://userguide.icu-project.org/formatparse/messages).
A simpler formatting guide can be found at [messageformat](https://messageformat.github.io/messageformat/page-guide), or for an online checker: [Translate ICU messages](https://format-message.github.io/icu-message-format-for-translators/).

```ts
import { Phrasebook } from '../../';
import './shared';

const translations = {
  KEY_TO_USE:
    'Du hast {numPhotos, plural, =0 {keine Bilder.} =1 {ein Bild.} other {# Bilder.}}',
};

Phrasebook.define('de', 'emerald-color-dialog', translations);

export default translations;
```
