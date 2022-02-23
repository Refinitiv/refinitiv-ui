<!--
type: page
title: Theming
location: ./start/theming
layout: default
-->

# Theming
Applications in Refinitiv Workspace should use the Halo Design System theme to be fully compliant with branding guidelines. EF elements require their theme to initialize itself successfully in the application that they are used in.

## Halo Theme
The Halo Design System theme is provided with two variants; light and dark. An application can have only one variant while the app is running. See [Theme Switching](/guides/theme-switching) to learn how to toggle between light and dark themes in your application.

## Native Styles

The application is required to import native styles so that the correct typography and Element Frameworks global CSS variables are applied in an application.

```javascript
import '@refinitiv-ui/halo-theme/dark/imports/native-elements';
```

This package also includes some native element styles such as heading, a link, table, etc. They are **prepended** to a document's head section so they can be overridden later at the application level.

::footer::
