<!-- 
title: Starter Templates
location: ./tools/starter-templates
type: page
layout: default
-->

# Starter Templates

## Getting Started

Use the following command to create a new element template to work with. If you're new to creating elements, it's best to start with the [tutorial](./tutorials/element).

```bash
npx create-efx efx-element
cd efx-element
npm install && npm start
```

*> Authors should be very careful when choosing the name of their element if they want to publish it later in a public package registry such as npm.
*>
*> Avoid using a name that is prefixed with `ef-`, such as `ef-element`. The `ef-` prefix is a reserved keyword used for foundational elements such as ef-button, ef-calendar, etc. The `efx-` prefix is preferred when creating a community element.

## Project Structure
Starter template provides a folder structure for your element which is ready for develop, build, test, demo and publish as a npm package.

```console
efx-element
├── LICENSE
├── README.md
├── index.html
├── package.json
├── scripts
│   └── jsx
│       ├── interface
│       │   ├── jsx.d.ts
│       │   └── jsxTemplate.d.ts
│       ├── jsxdts-generator.js
│       └── utils.js
├── src
│   └── efx-element.ts
├── test
│   ├── __snapshots__
│   │   └── efx-element.test.js
│   └── efx-element.test.js
├── themes
│   └── halo
│       ├── dark
│       │   ├── css
│       │   │   └── native-elements.css
│       │   ├── efx-element.js
│       │   ├── es5
│       │   │   └── all-elements.js
│       │   └── imports
│       │       ├── all-elements.js
│       │       ├── custom-elements.js
│       │       └── native-elements.js
│       ├── dark.js
│       ├── efx-element.less
│       ├── index.less
│       ├── light
│       │   ├── css
│       │   │   └── native-elements.css
│       │   ├── efx-element.js
│       │   ├── es5
│       │   │   └── all-elements.js
│       │   └── imports
│       │       ├── all-elements.js
│       │       ├── custom-elements.js
│       │       └── native-elements.js
│       └── light.js
├── tsconfig.json
└── web-test-runner.config.js
```

| File / Folder name          | Description                                                                     |
| --------------------------- | ------------------------------------------------------------------------------- |
| ./README.md                 | Element's documentation, including sample code, usage guide and API doc.        |
| ./index.html                | Demo page. Entry point when run `npm start`.                                    |
| ./scripts                   | Internal utility scripts e.g. script to generate jsx file of element for React. |
| ./src                       | Typescript code, business logic of element.                                     |
| ./test                      | Unit test and files for snapshot testing.                                       |
| ./themes                    | Element's theme LESS files and compilation output.                              |
| ./tsconfig.json             | Typescript configuration file.                                                  |
| ./web-test-runner.config.js | Configuration file for unit testing.                                            |

## NPM scripts

As part of starter template, some commands have been provided to facilitate development activities.

| Command          | Description                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------------- |
| start            | Run element's demo page using [Vite](https://vitejs.dev/).                                  |
| build            | Compile Typescript and output as ES Module, ES2020 syntax.                                  |
| build:themes     | Use EF's Theme Compiler to generate element's theme e.g. ./themes/halo/dark/efx-element.js. |
| build:theme-halo | Sub command to be called by `build:themes`.                                                 |
| prepare          | Run `build:themes` to ensure that element's theme is the latest before publishing.          |
| lint             | Run linting by using [eslint](https://eslint.org/).                                         |
| lint:fix         | Run linting and automatic fix all fixable errors.                                           |
| test             | Use web-test-runner with [playwright](https://modern-web.dev/docs/test-runner/browser-launchers/overview/#playwright) to test on Chrome, Firefox and Safari.              |
| test:watch       | Run unit test with debugging.                                                               |
| test:snapshots   | Generate element's DOM snapshots for snapshots testing.                                     |
| generate:jsx     | Generate JSX for this element for React.                                                    |
| prepublishOnly   | Run build and generate JSX before publishing.                                               |

