<!--
title: Reporting errors and warnings
location: ./reporting-issues
type: page
-->

# Reporting Issues

When creating elements it's best to keep things simple and try to reduce any errors that may occur.

o> **Tip**:\
Try to implement flexibility into your element by handling invalid input in a way that least disrupts a user.
Also think about how developers could, unintentionally, pass invalid configuration to your element and how this should be handled.

Deciding on when to show a warning versus an error can be difficult. However, as a rule of thumb, it's best to show a warning when the issue can be handled in a way where your element can continue working.

## Warnings

Many of the foundational elements show warnings in the console when an invalid configuration has been passed, or, a deprecated feature is being used.

An example is when trying to set at non-numeric value to the number field.

::
```html
<ef-number-field value="abc"></ef-number-field>
```
```js
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/number-field';
import { halo } from '/theme-loader.js';
halo('number-field');
```
::

Element Framework provides modules for 

## Errors

@> Coming soon!

...