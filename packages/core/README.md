# Element Framework / Core

This library provides core functionality for building Elements and exports the following classes:


### BasicElement
Used for simple elements that have minimal functionality.

```js
import { BasicElement, customElement } from '@refinitiv-ui/core';

@customElement('my-avatar')
class MyAvatar extends BasicElement {
  ...
}
```

---

### ControlElement
Used for control elements, ones usually referred to as form elements. These controls have additional functionality, such as, disabled and read-only states.

```js
import { ControlElement, customElement } from '@refinitiv-ui/core';

@customElement('my-button')
class MyButton extends ControlElement {
  ...
}
```

---

### ResponsiveElement
Used for creating elements which need to respond to their dimensions. Mainly grids, lists and data visualizations.

```js
import { ResponsiveElement, customElement } from '@refinitiv-ui/core';

@customElement('my-chart')
class MyChart extends ResponsiveElement {
  ...
}
```

---

### WidgetElement
Used for creating high-level widget elements. These elements usually have a data connection and can work by themselves, allowing integration into 

```js
import { WidgetElement, customElement } from '@refinitiv-ui/core';

@customElement('my-data-feed')
class MyDataFeed extends WidgetElement {
  ...
}
```

---

## Deprecation Notices

The core provides a way of showing uniform deprecation notices, when deprecated features are used in elements.

```js
import { BasicElement, DeprecationNotice } from '@refinitiv-ui/core';

class MyElement extends BasicElement {

  private deprecationNotice = new DerecationNotice(
    'The feature of hopping has be replaced by skipping. Please update to use the latest API.',
    'https://a.support.link'
  )

  private checkAndWarnAboutDeprecations () {
    // some logic to check if deprecated features are being used
    if (!this.deprecationNotice.shown && deprecatedFeatureUsed) {
      this.deprecationNotice.show();
    }
  }

}
```

---

## Error Handling

All errors handled in the core, should use the `GenericError` class provided and should, where possible, provide an additional support URL. Additional error types can be added to `./src/errors/`.

```js
import { GenericError } from './src/errors/GenericError';

throw new GenericError(
  // Message
  'Something has gone wrong',
  // Support URL
  'https://elf.int.refinitiv.com/error/something'
);
```
