<!--
type: page
title: Custom Theme
location: ./guides/custom-theme
layout: default
-->

# Build Custom Theme

Theming in Element Framework is extensible. It allows you to create a custom theme by extending from Element Framework standard theme ([@refinitiv-ui/halo-theme](https://www.npmjs.com/package/@refinitiv-ui/halo-theme)).

## Tutorial

Download a sample custom theme project from [CodeSandbox](https://codesandbox.io/s/custom-theme-m9ssq4?file=/package.json) by using **File** > **Export to ZIP**

Run npm to install and build the theme.

```console
npm install
npm run build
```

Once theme is built successfully, it will generate output files in `./dark` and `./light` folder which will contain custom theme of every Element Framework components. 

In the custom theme project, it shows you how to customise theme to use `san-sarif` font, changed primary color and changed styles of `ef-toggle`.

Run `npm start` to launch demo page to see the changes.

To use the custom theme, you can publish it as npm module or include this project in your application to use it directly.

```javascript
import '@refinitiv-ui/elements/button';

// import your custom theme
import './custom-theme/dark/imports/native-elements.js';
import './custom-theme/dark/ef-toggle.js';
```

!> You can't use custom theme together with Halo theme within your project. It will result a duplicate styles error.

## Project structure

A structure of custom theme project is illustrated as below.

```console
├── src
│   ├── custom-elements
│   │   └── *.less
│   ├── native-elements
│   │   └── *.less
│   ├── variants
│   │   ├── dark
│   │   │    └── variables.less
│   │   └── light
│   │        └── variables.less
│   ├── colors.less
├── index.less
├── package.json
└── index.html
```

| File/Folder                   | Description                                                                               |
| ----------------------------- | ----------------------------------------------------------------------------------------- |
| src/custom-elements           | Component less file(s) that need to be customised                                         |
| src/native-elements           | Native styles that need to be customised                                                  |
| variants/dark/variables.less  | Customise value of base theme less variable and new less variables of your dark theme     |
| variants/light/variables.less | Customise value of base theme less variable and new less variables of your light theme    |
| src/colors.less               | Colour palette to use in your custom theme                                                |
| index.less                    | Less entry point which import base theme, colour palette and variables from each variants |


## Customise theme global variables

To customise styles for your theme, it is often done by overriding value of less global variables. For example, to change primary color for your dark theme, you can override value of `@scheme-color-primary` inside `./variants/dark/variables.less`.

In the sample custom theme project, it overrides theme primary colour, tertiary color and some colours of button for dark theme.

```less
@scheme-color-primary: @color-seafoam-400;
@scheme-color-tertiary: @color-gray-600;
@button-hover-background-color: @scheme-color-primary;
@button-pressed-background-color: @scheme-color-primary;
```

List of all less variables that you could override are in [Elemental Theme](https://github.com/Refinitiv/refinitiv-ui/blob/v6/packages/elemental-theme/src/variables.less) and [Halo Theme](https://github.com/Refinitiv/refinitiv-ui/blob/v6/packages/halo-theme/src/variants/dark/variables.less).

@> Elemental Theme is super base theme of every themes in Element Framework, including Halo Theme. With the same concept as creating custom theme, Halo Theme is created by extending from Elemental Theme and overriding less variables, [see example](https://github.com/Refinitiv/refinitiv-ui/blob/v6/packages/halo-theme/src/variants/dark/overrides.less).

## Customise theme native styles

Some styles are required to be applied in native HTML elements such as font-family. Those styles can be set in less files in `native-elements` folder. For example, in the custom theme sample project, font-family and padding are customised for body HTML tag.

```less
// import native component style from base theme
@import "@refinitiv-ui/halo-theme/src/native-elements/body";

// Customise native component style
body {
  padding: 20px;
  font-family: sans-serif;
}
```

## Customise component styles

When styles of components are needed to be customised, you can customise styles of an individual Element Framework component by adding less file(s) in `custom-elements` folder. In the custom theme sample project, it shows how you can customise styles of host and an internal part of `ef-toggle`.

```less
:host {
  border-radius: 10px;

  [part="toggle"] {
    &::after {
      border-radius: 50%;
    }
  }
}
```

You only need to create less file for components that you need to customise. Any components that do not need any customisation, theme compiler will automatically extends it directly from Halo Theme and output the files in `./dark` and `./light` folder.


