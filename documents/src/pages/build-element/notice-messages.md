<!--
title: Reporting errors and warnings
location: ./custom-components/notice-messages
type: page
layout: default
-->

# Notice Messages

When creating elements it's best to keep things simple and try to reduce any errors that may occur. However, your elements should feedback to developers via console log when necessary.

o> **Tip**:\
Try to implement flexibility into your element by handling invalid input in a way that least disrupts a user.
Also think about how developers could, unintentionally, pass invalid configuration to your element and how this should be handled.



## Do

- Keep a messsage short and concise
- Tell developer why they see this message e.g. when deprecated API is called
- Provide hints to guide developers how to fix / resolve the issue

## Don't

- Pollute console by showing too many or unnecessary messages
- Expose confidential information in the message such as secret token or user's sensitive information

## Helper for notice messages

Element Framework provides a way of showing uniform deprecation notices, when deprecated features are used in elements.

```ts
import { BasicElement, DeprecationNotice } from '@refinitiv-ui/core';

class MyElement extends BasicElement {

  private deprecationHopping = new DeprecationNotice(
    'The hopping feature has be replaced by skipping. Please use the latest API.',
    'https://a.support.link'
  )

  private showDeprecationHopping () {
    // you can some logic to check if deprecated features are being used
    if (!this.deprecationHopping.shown && deprecatedFeatureUsed) {
      this.deprecationHopping.show();
    }
  }
}
```

When more generic warning message is required, use `WarningNotice`.

```ts
import { BasicElement, WarningNotice } from '@refinitiv-ui/core';

class MyElement extends BasicElement {

  private warnInvalidFormat(value) {
      // show warning only once
      new WarningNotice(`The specified value "${value}" does not conform to the required format. The format is "yyyy-MM".`).once();
    }
}
```

