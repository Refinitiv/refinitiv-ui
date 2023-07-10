<!--
type: page
title: Typography
location: ./styles/typography
layout: default
-->

# Typography

In accordance with LSEG Workspace's Halo Design System, the default font in your application should be Proxima Nova Fin. The font is a custom font created for Workspace that has been exhaustively researched and tested with users to support a superior reading experience. It will be applied automatically when you import native styles from EF themes.

For Japanese, Traditional Chinese, and Simplified Chinese, Halo theme has defined a standard font to be used for those languages. However, if the font is not available on users machine, default font that managed by operation system on user's machine will be used.

*>The font "Proxima Nova Fin" shall only be used within Refinitiv products or services. The copyright owner must approve any use of such font outside of Refinitiv products or services, which may be subject to a fee. Please see https://www.fontspring.com/lic/fontspring/webfont#license_text

x> Font styles in Halo theme are only Regular and Semi Bold. Do not use 'Italic' style due to the license on Proxima Nova Fin font. Bold typeface will be mapped to Semi Bold as it is not customised to render numerical text correctly.

::
```css
.semibold {
  font-weight: 500;
}
.fonts {
  font-size: 24px;
}
```
```html
<h6>Proxima Nova Fin Regular (400)</h6>
<div class="fonts">
A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
a b c d e f g h i j k l m n o p q r s t u v w x y z
0 1 2 3 4 5 6 7 8 9
</div>
<h6>Proxima Nova Fin Semibold (500, 600, 700)</h6>
<div class="fonts semibold">
A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
a b c d e f g h i j k l m n o p q r s t u v w x y z
0 1 2 3 4 5 6 7 8 9
</div>
```
```javascript
import './resources/core/index.js';
import { halo } from './theme-loader.js';
halo();
```
::

## Headings
Default Halo theme heading styles will apply to HTML Headings (h1-h6).

::
```html
<h1>Heading 1</h1>
<p>Regular, 44px, 3 rem, leading 50</p>
<h2>Heading 2</h2>
<p>Regular, 36px, 2.25 rem, leading 42</p>
<h3>Heading 3</h3>
<p>Regular, 28px, 1.75 rem, leading 34</p>
<h4>Heading 4</h4>
<p>Semibold, All capitals, 24px, 1.75 rem, leading 30</p>
<h5>Heading 5</h5>
<p>Semibold, All capitals, 18px, 1.25 rem, leading 24</p>
<h6>Heading 6</h6>
<p>Semibold, All capitals, 16px, 3 rem, leading 22</p>
```
```javascript
import './resources/core/index.js';
import { halo } from './theme-loader.js';
halo();
```
::

## Sub headings
Use sub heading below heading text to provide additional information.

::
```html
<h2>Leverage unparalleled analytical capabilities and insights</h2>
<h6>Discover how we can help mitigate risk, balance scalability and performance, and enable you to thrive in tough economic conditions.</h6>
```
```javascript
import './resources/core/index.js';
import { halo } from './theme-loader.js';
halo();
```
::

There are 3 variations of sub heading in Halo theme which you can use CSS to customize text to match with design specification below.

```css
.sub1 {
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 600;
  line-height: calc(22/16)
}
.sub2 {
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 600;
  line-height: calc(20/14)
}
.sub3 {
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 600;
  line-height: calc(18/12)
}
```

::
```css
.sub1 {
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 600;
  line-height: calc(22/16)
}
.sub2 {
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 600;
  line-height: calc(20/14)
}
.sub3 {
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 600;
  line-height: calc(18/12)
}
```
```html
<p class="sub1">Sub Heading 1</p>
<p>Semibold, All capitals, 16px, 1 rem, leading 22</p>
<p class="sub2">Sub Heading 2</p>
<p>Semibold, All capitals, 14px, 0.875 rem, leading 20</p>
<p class="sub3">Sub Heading 3</p>
<p>Semibold, All capitals, 12px, 0.75 rem, leading 18</p>
```
```javascript
import './resources/core/index.js';
import { halo } from './theme-loader.js';
halo();
```
::

## Body

In Halo theme, there are 5 variations of styles that you should use it for displaying general text content. By default, EF Halo theme will use 'body 3' style. You can use CSS to customize text to apply other body variations.

```css
.body1 {
  font-size: 16px;
  line-height: calc(22/16)
}
.body2 {
  font-size: 14px;
  line-height: calc(20/14)
}
.body3 {
  font-size: 12px;
  line-height: calc(18/12)
}
.body4 {
  font-size: 12px;
  font-weight: 600;
  line-height: calc(18/12)
}
.body5 {
  font-size: 14px;
  font-weight: 600;
  line-height: calc(20/14)
}
```

::
```css
.body1 {
  font-size: 16px;
  line-height: calc(22/16)
}
.body2 {
  font-size: 14px;
  line-height: calc(20/14)
}
.body3 {
  font-size: 12px;
  line-height: calc(18/12)
}
.body4 {
  font-size: 12px;
  font-weight: 600;
  line-height: calc(18/12)
}
.body5 {
  font-size: 14px;
  font-weight: 600;
  line-height: calc(20/14)
}
```
```html
<h5>Body 1 | Regular, 16px, 1 rem, leading 22</h5>
<p class="body1">We solve for your analytics needs with accurate data, comprehensive asset class coverage, sophisticated market-leading models and world-class global expertise.</p>
<h5>Body 2 | Regular, 14px, 0.875 rem, leading 20</h5>
<p class="body2">We solve for your analytics needs with accurate data, comprehensive asset class coverage, sophisticated market-leading models and world-class global expertise.</p>
<h5>Body 3 | Regular, 12px, 0.75 rem, leading 18</h5>
<p class="body3">We solve for your analytics needs with accurate data, comprehensive asset class coverage, sophisticated market-leading models and world-class global expertise.</p>
<h5>Body 4 | Semibold, 12px, 0.75 rem, leading 18</h5>
<p class="body4">We solve for your analytics needs with accurate data, comprehensive asset class coverage, sophisticated market-leading models and world-class global expertise.</p>
<h5>Body 5 | Semibold, 14px, 0.75 rem, leading 20</h5>
<p class="body5">We solve for your analytics needs with accurate data, comprehensive asset class coverage, sophisticated market-leading models and world-class global expertise.</p>
```
```javascript
import './resources/core/index.js';
import { halo } from './theme-loader.js';
halo();
```
::




::footer::
