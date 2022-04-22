<!--
type: page
title: Styling
location: ./start/styling
layout: default
-->

# Applying Styles

Applications in Refinitiv Workspace should use the Halo Design System theme to be fully compliant with branding guidelines. EF elements require their themes to be loaded in order to initialize successfully.

## Halo Theme
The Halo Design System theme is provided with two variants; light and dark. An application can use only one variant while the app is running. See [Theme Switching](/guides/theme-switching) to learn how to toggle between light and dark themes in your application.

### Native Styles

The application is required to import native styles so that the correct typography and Element Frameworks global CSS variables are applied in an application.

```javascript
import '@refinitiv-ui/halo-theme/dark/imports/native-elements';
```

This package also includes some native element styles such as heading, a (links), table, etc.

o> Native element styles are **prepended** to a document's head section. This allows application styles to provide overrides if required.

::footer::
