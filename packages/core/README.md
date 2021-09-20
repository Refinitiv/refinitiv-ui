# Core Components for Element Framework

Core functionality for building Element Framework elements, it exports the following classes:

## Basic Element

A base class for extending simple element that have minimal functionality.

```js
import { BasicElement, customElement } from '@refinitiv-ui/core';

@customElement('my-avatar')
class MyAvatar extends BasicElement {
  ...
}
```

## Control Element

A base class for extending control element, usually referred to as form elements. These controls have additional functionality, such as, disabled and read-only states.

```js
import { ControlElement, customElement } from '@refinitiv-ui/core';

@customElement('my-button')
class MyButton extends ControlElement {
  ...
}
```

## Responsive Element

A base class for extending element which needs to respond to their dimensions e.g data visualizations. The base class provides resize observer callback which will trigger whenever that the element's dimensions are changed.

```js
import { ResponsiveElement, customElement } from '@refinitiv-ui/core';

@customElement('my-chart')
class MyChart extends ResponsiveElement {
  ...
}
```

<br>

# Helper for Deprecation Notices

The core provides a way of showing uniform deprecation notices, when deprecated features are used in elements.

```js
import { BasicElement, DeprecationNotice } from '@refinitiv-ui/core';

class MyElement extends BasicElement {

  private deprecationNotice = new DeprecationNotice(
    'The feature of hopping has be replaced by skipping. Please update to use the latest API.',
    'https://a.support.link'
  )

  private showDeprecationNotice () {
    // you can some logic to check if deprecated features are being used
    if (!this.deprecationNotice.shown && deprecatedFeatureUsed) {
      this.deprecationNotice.show();
    }
  }

}
```

<br>

# Error Handling

All errors handling in the core should use the `GenericError` class. Also, where possible, you should provide an additional support URL. Additional error types can be added to `./src/errors/`.

```js
import { GenericError } from './src/errors/GenericError';

throw new GenericError(
  // Message
  'Something has gone wrong',
  // Support URL
  'https://support/error/something'
);
```
