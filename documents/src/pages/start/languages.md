<!--
type: page
title: Languages
description: Languages for localization packages
location: ./start/languages
layout: default
-->

# Languages

EF uses the global `lang` attribute to determine the font-family for different languages and to show localised messages in elements. Supporting languages are English, Deutsch, Japanese, Traditional Chinese and Simplified Chinese.

For more information about internationalization and how is it applied in different contexts see [Internationalization](/intl/internationalization).

```html
<html lang="ja-JP">
```

::
```css
body {
  background: none;
}
```
```html
<ef-panel spacing>
  <p>
    冬が来た。<br>
    白い樹樹の光を<br>
    体のうちに蓄積しておいて、<br>
    夜深く眠る<br>
  </p>
</ef-panel>
```
```javascript
/**
 * Import paths and theme-loader used for demonstration purposes
 */

import '/resources/elements/panel/index.js';
import { halo } from '/theme-loader.js';
halo('panel');

document.documentElement.setAttribute('lang', 'ja-JP');
```
::

```html
<html lang="zh-CN">
```

::
```css
body {
  background: none;
}
```
```html
<ef-panel spacing>
  <p>
    李绅 《悯农》<br>
    锄禾日当午<br>
    汗滴禾下土。<br>
    谁知盘中餐<br>
    粒粒皆辛苦。
  </p>
</ef-panel>
```
```javascript
/**
 * Import paths and theme-loader used for demonstration purposes
 */

import '/resources/elements/panel/index.js';
import { halo } from '/theme-loader.js';
halo('panel');

document.documentElement.setAttribute('lang', 'zh-CN');
```
::

::footer::
