# Element Framework (EF) V5

[![Testing](https://github.com/Refinitiv/refinitiv-ui/actions/workflows/test.yml/badge.svg)](https://github.com/Refinitiv/refinitiv-ui/actions/workflows/test.yml)
[![Release](https://github.com/Refinitiv/refinitiv-ui/actions/workflows/release.yml/badge.svg?branch=main)](https://github.com/Refinitiv/refinitiv-ui/actions/workflows/release.yml?query=branch%3Amain+)

Element Framework is Refinitiv design system components that provides components and tooling with Refinitiv's design system to help product teams work faster and more efficiently.

# Documentation
Getting started and usage guide are available from this [documentation](https://ui.refinitiv.com).

# Packages
| Package                       | Version                                                                                                                               | Change Log                                                                                                                                                                 |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| @refinitiv-ui/configurations  | [![npm version](https://badgen.net/npm/v/@refinitiv-ui/configurations)](https://www.npmjs.com/package/@refinitiv-ui/configurations)   | [![change log](https://badgen.net/badge/icon/changelog/grey?icon=git&label)](https://github.com/Refinitiv/refinitiv-ui/blob/main/packages/configurations/CHANGELOG.md)  |
| @refinitiv-ui/core            | [![npm version](https://badgen.net/npm/v/@refinitiv-ui/core)](https://www.npmjs.com/package/@refinitiv-ui/core)                       | [![change log](https://badgen.net/badge/icon/changelog/grey?icon=git&label)](https://github.com/Refinitiv/refinitiv-ui/blob/main/packages/core/CHANGELOG.md)            |
| @refinitiv-ui/demo-block      | [![npm version](https://badgen.net/npm/v/@refinitiv-ui/demo-block)](https://www.npmjs.com/package/@refinitiv-ui/demo-block)           | [![change log](https://badgen.net/badge/icon/changelog/grey?icon=git&label)](https://github.com/Refinitiv/refinitiv-ui/blob/main/packages/demo-block/CHANGELOG.md)      |
| @refinitiv-ui/elemental-theme | [![npm version](https://badgen.net/npm/v/@refinitiv-ui/elemental-theme)](https://www.npmjs.com/package/@refinitiv-ui/elemental-theme) | [![change log](https://badgen.net/badge/icon/changelog/grey?icon=git&label)](https://github.com/Refinitiv/refinitiv-ui/blob/main/packages/elemental-theme/CHANGELOG.md) |
| @refinitiv-ui/elements        | [![npm version](https://badgen.net/npm/v/@refinitiv-ui/elements)](https://www.npmjs.com/package/@refinitiv-ui/elements)               | [![change log](https://badgen.net/badge/icon/changelog/grey?icon=git&label)](https://github.com/Refinitiv/refinitiv-ui/blob/main/packages/elements/CHANGELOG.md)        |
| @refinitiv-ui/halo-theme      | [![npm version](https://badgen.net/npm/v/@refinitiv-ui/halo-theme)](https://www.npmjs.com/package/@refinitiv-ui/halo-theme)           | [![change log](https://badgen.net/badge/icon/changelog/grey?icon=git&label)](https://github.com/Refinitiv/refinitiv-ui/blob/main/packages/halo-theme/CHANGELOG.md)      |
| @refinitiv-ui/i18n            | [![npm version](https://badgen.net/npm/v/@refinitiv-ui/i18n)](https://www.npmjs.com/package/@refinitiv-ui/i18n)                       | [![change log](https://badgen.net/badge/icon/changelog/grey?icon=git&label)](https://github.com/Refinitiv/refinitiv-ui/blob/main/packages/i18n/CHANGELOG.md)            |
| @refinitiv-ui/phrasebook      | [![npm version](https://badgen.net/npm/v/@refinitiv-ui/phrasebook)](https://www.npmjs.com/package/@refinitiv-ui/phrasebook)           | [![change log](https://badgen.net/badge/icon/changelog/grey?icon=git&label)](https://github.com/Refinitiv/refinitiv-ui/blob/main/packages/phrasebook/CHANGELOG.md)      |
| @refinitiv-ui/polyfills       | [![npm version](https://badgen.net/npm/v/@refinitiv-ui/polyfills)](https://www.npmjs.com/package/@refinitiv-ui/polyfills)             | [![change log](https://badgen.net/badge/icon/changelog/grey?icon=git&label)](https://github.com/Refinitiv/refinitiv-ui/blob/main/packages/polyfills/CHANGELOG.md)       |
| @refinitiv-ui/solar-theme     | [![npm version](https://badgen.net/npm/v/@refinitiv-ui/solar-theme)](https://www.npmjs.com/package/@refinitiv-ui/solar-theme)         | [![change log](https://badgen.net/badge/icon/changelog/grey?icon=git&label)](https://github.com/Refinitiv/refinitiv-ui/blob/main/packages/solar-theme/CHANGELOG.md)     |
| @refinitiv-ui/test-helpers    | [![npm version](https://badgen.net/npm/v/@refinitiv-ui/test-helpers)](https://www.npmjs.com/package/@refinitiv-ui/test-helpers)       | [![change log](https://badgen.net/badge/icon/changelog/grey?icon=git&label)](https://github.com/Refinitiv/refinitiv-ui/blob/main/packages/test-helpers/CHANGELOG.md)    |
| @refinitiv-ui/theme-compiler  | [![npm version](https://badgen.net/npm/v/@refinitiv-ui/theme-compiler)](https://www.npmjs.com/package/@refinitiv-ui/theme-compiler)   | [![change log](https://badgen.net/badge/icon/changelog/grey?icon=git&label)](https://github.com/Refinitiv/refinitiv-ui/blob/main/packages/theme-compiler/CHANGELOG.md)  |
| @refinitiv-ui/translate       | [![npm version](https://badgen.net/npm/v/@refinitiv-ui/translate)](https://www.npmjs.com/package/@refinitiv-ui/translate)             | [![change log](https://badgen.net/badge/icon/changelog/grey?icon=git&label)](https://github.com/Refinitiv/refinitiv-ui/blob/main/packages/translate/CHANGELOG.md)       |
| @refinitiv-ui/utils           | [![npm version](https://badgen.net/npm/v/@refinitiv-ui/utils)](https://www.npmjs.com/package/@refinitiv-ui/utils)                     | [![change log](https://badgen.net/badge/icon/changelog/grey?icon=git&label)](https://github.com/Refinitiv/refinitiv-ui/blob/main/packages/utils/CHANGELOG.md)           |


# License Information
License details can be found in the `LICENSE` file. It's available in each package inside `./packages/` directory. Code is governed by the Apache License, Version 2.0 except following packages which has special license for font files.

* `./packages/solar-theme`
* `./packages/halo-theme`

>The font "Proxima Nova Fin" shall only be used within Refinitiv products or services. The copyright owner must approve any use of such font outside of Refinitiv products or services, which may be subject to a fee. Please see https://www.fontspring.com/lic/fontspring/webfont#license_text
>
>Font styles in Halo theme are only Regular, Semi Bold and Bold. Do not use 'Itatic' style due to the license on Proxima Nova Fin font.

# Support
For questions or issues, please refer to documentation (see Documentation section above and [Q&A](https://community.developers.refinitiv.com/index.html) forum on Developer Community which supported by an active developer community.

# Contributing
We welcome and ❤ contribution in all forms: create issues, opening pull requests to make elements even better, or just being part of our development community.

## Create Issues
Issues are important to make the Element Framework better. If you discover any issues with this project, please feel free to create an Issue.
Please search though open and closed issues to see if a similar issue already exists. If not, open an issue and try to provide a minimal reproduction if you can.

## Pull Requests
In the event you have coding suggestions and you would like to create pull request to this repository, it is required that you read and sign the following:

* Individual Contributor License Agreement ([Download](https://github.com/Refinitiv/refinitiv-ui/blob/main/Workspace%20SDK%20Refinitiv-UI%20Individual%20Contributor%20License%20Agreement.pdf))
* Entity Contributor License Agreement ([Download](https://github.com/Refinitiv/refinitiv-ui/blob/main/Workspace%20SDK%20Refinitiv-UI%20Entity%20Contributor%20License%20Agreement.pdf))

Please email a signed and scanned copy to [RefinitivUIDev@refinitiv.com](mailto:RefinitivUIDev@refinitiv.com). If you require that a signed agreement has to be physically mailed to us, please email the request for a mailing address and we will get back to you on where you can send the signed documents.

We will review issues and pull requests to determine any appropriate changes.

## Developing

Element Framework is using monorepo. This repository has elements, supporting modules and tools. Each folder in `packages` is one NPM package.

* `packages/configurations` - Configuration file for element development e.g. eslint, typescript
* `packages/core` - Core module of element e.g. base classes, element registration
* `packages/demo-block` - Use in demo page of each element to demonstrate element's features
* `packages/elemental-theme` - Base theme to extend to design system theme e.g. Halo Theme
* `packages/elements` - All elements in Element Framework
* `packages/halo-theme` - Refinitiv design system theme
* `packages/i18n` - Wrappers and APIs of formatjs
* `packages/phrasebook` - All messages (english and non-english) that use within elements
* `packages/polyfills` - Curated polyfills for browsers that are not support web component natively
* `packages/solar-theme` - Legacy theme
* `packages/test-helpers` - Helpers function for unit testing of each elements
* `packages/theme-compiler` - LESS compiler for generating theme package
* `packages/translate` - Decorator for translations (i18n) in each element
* `packages/utils` - Utilities and shared functions

### Setup development environment

Install npm@7 CLI:

```bash
npm install -g npm
```

Initialize project:

```bash
git clone git@github.com:Refinitiv/refinitiv-ui.git
cd refinitiv-ui
npm install
```

Build all packages:

```bash
npm run build
```

### CLI Commands

The command-line interface tool that you can use to demo, develop, test, and maintain this repository. The command should be run at root level.

Run and serve the element or package:
```bash
npm run start button 
#or
npm run start demo-block
```
Run the unit test in specific element or package:
```bash
npm run test button -- <options>
```
Run the unit test on all packages:
```bash
npm run test:all
```
Run linting tools in specific a element or package:

```bash
npm run lint button -- <options>
#or
npm run lint demo-block -- <options>
```

Run linting tools in all elements or packages:

```bash
npm run lint:all
```

#### Options for unit test and linting command

| Option                | Description                                                                                                                                                                                                                                                      |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--browsers` or `-b`  | You can specific browser(s) to run the unit test. List of available browsers are following: `chrome`, `firefox` and `ie` <br>You can check the list of available browsers by add option `--help`.  <br>Usage: `npm run test button -- --browsers chrome firefox` |
| `--watch` or `-w`     | Run test and watch file change. <br>Usage: `npm run test button -- --watch`                                                                                                                                                                                      |
| `--snapshots` or `-s` | Update and prune snapshots (`--browsers` must be chrome). <br>Usage:`npm run test button -- --snapshots --browsers chrome`                                                                                                                                       |
| `--fix`  or `-f`      | Run linting and fix the issues that can lead to bugs or inconsistencies with code health and style. <br>Usage:`npm run test button --fix`                                                                                                                        |

### Commit prefixes

Commit prefixes must be written in a correct pattern when committing code into EF repositories. It will be used to determine running version when release the package and for generating changelogs.

| Prefix                             | Incremental Version | Usage                                                                                                                                                             |
| ---------------------------------- | :-----------------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BREAKING CHANGE(<package-name>):` |        MAJOR        | Changes that breaking existing public API.<br/>**BREAKING CHANGE(coral-button): cta attribute has been removed**                                                  |
| `feat(<package-name>):`            |        MINOR        | A new feature.<br/>**feat(coral-button): element sings a song every Sunday**                                                                                      |
| `fix(<package-name>):`             |        PATCH        | A bug fix.<br/>**fix(coral-button): auto-play issue (#39)**                                                                                                       |
| `style(<package-name>):`           |        PATCH        | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).<br/>**style(coral-button): removed trailing white space** |
| `docs(<package-name>):`            |        PATCH        | Documentation only changes.<br/>**docs(coral-button): included complex sample to README**                                                                         |
| `refactor(<package-name>):`        |        PATCH        | A code change that neither fixes a bug nor adds a feature.<br/>**refactor(coral-button): changed song picker algorithm**                                          |
| `performance(<package-name>):`     |        PATCH        | A code change that improves performance.<br/>**performance(coral-button): lazy load internal DOM structure**                                                      |
| `test(<package-name>):`            |        PATCH        | Add missing tests.<br/>**test(coral-button): increase code coverage to 85%**                                                                                      |
| `chore(<package-name>):`           |        PATCH        | Changes to the build process, dependency updates and other maintenance-related commits.<br/>**chore(coral-button): upgrade dependencies**                         |
