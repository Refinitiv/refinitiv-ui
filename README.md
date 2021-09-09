# Element Framework (EF) V5

Element Framework is Refinitiv design system components that provides components and tooling with Refinitiv's design system to help product teams work faster and more efficiently.

# Documentation
Getting started and usage guide are available from this [documentation](https://cdn.ppe.refinitiv.com/public/apps/elf-docs/book/en/index.html).

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
In the event you would like to contribute to this repository, it is required that you read and sign the following:

* Individual Contributor License Agreement
* Entity Contributor License Agreement

Please email a signed and scanned copy to [RefinitivUIDev@refinitiv.com](mailto:RefinitivUIDev@refinitiv.com). If you require that a signed agreement has to be physically mailed to us, please email the request for a mailing address and we will get back to you on where you can send the signed documents.

# Developing
If you discover any issues with this project, please feel free to create an Issue. If you have coding suggestions that you would like to provide for review, please create a Pull Request. We will review issues and pull requests to determine any appropriate changes.

### Elements Monorepo

This is the monorepo for Element Framework elements, its supporting modules and tools.

* `packages` - All packages.
* `packages/elements` - Elements package.

### Setup development environment

Install npm@7 CLI:

```bash
npm install -g npm
```

Initialize project:

```bash
git clone git@git.sami.int.thomsonreuters.com:elf/refinitiv-ui.git
cd refinitiv-ui
npm install
```

Build all packages:

```bash
npm run build
```

### CLI Commands

The command-line interface tool that you can use to demo, develop, test, and maintain this repository

Run demo page of individual element:

``` bach
cd packages/elements
npm start button
```

or

``` bach
npm start button -w=@refinitiv-ui/elements
```

For simplicity, some commands reflected at the root level as well:

```bash
npm start button
```

### Commit prefixes

Commit prefixes must be written in a correct pattern when committing code into EF repositories. It will be used to determine running version when release the package and for generating changelogs.

| Prefix | Incremental Version | Usage |
|---|:---:|---|
| `BREAKING CHANGE(<package-name>):` | MAJOR | Changes that breaking existing public API.<br/>**BREAKING CHANGE(coral-button): cta attribute has been removed** |
| `feat(<package-name>):` | MINOR | A new feature.<br/>**feat(coral-button): element sings a song every Sunday** |
| `fix(<package-name>):` | PATCH | A bug fix.<br/>**fix(coral-button): auto-play issue (#39)**|
| `style(<package-name>):` | PATCH | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).<br/>**style(coral-button): removed trailing white space** |
| `docs(<package-name>):` | PATCH | Documentation only changes.<br/>**docs(coral-button): included complex sample to README** |
| `refactor(<package-name>):` | PATCH | A code change that neither fixes a bug nor adds a feature.<br/>**refactor(coral-button): changed song picker algorithm** |
| `performance(<package-name>):` | PATCH | A code change that improves performance.<br/>**performance(coral-button): lazy load internal DOM structure** |
| `test(<package-name>):` | PATCH | Add missing tests.<br/>**test(coral-button): increase code coverage to 85%** |
| `chore(<package-name>):` | PATCH | Changes to the build process, dependency updates and other maintenance-related commits.<br/>**chore(coral-button): upgrade dependencies** |
